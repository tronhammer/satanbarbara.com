#!/usr/bin/python
"""
	Creates database files based on JSON schema files.

    @package AutoGen
    @category Main
    @version 0.1.2b
    @since 0.1.1b
    @author Sean Murray <smurraysb@gmail.com>
    @copyright Tronnet
    @license GPLv2

        This program is free software; you can redistribute it and/or modify
        it under the terms of the GNU General Public License, version 2, as 
        published by the Free Software Foundation.

        This program is distributed in the hope that it will be useful,
        but WITHOUT ANY WARRANTY; without even the implied warranty of
        MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
        GNU General Public License for more details.

        You should have received a copy of the GNU General Public License
        along with this program; if not, write to the Free Software
        Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
"""

import os
import glob
import json

from mako.template import Template
from mako.lookup import TemplateLookup

class Logging:
	def p(self, msg):
		print msg

def JSONObjToPHPObj(attrVal, depth):
	depth = int(depth)+1
	if type(attrVal) == type({}):
		tabSpacing = "    "*depth
		tabCloseSpacing = "    "*(depth-1)
		return "array(\n%s%s\n%s)" % (
			tabSpacing, 
			(",\n"+tabSpacing).join( [('"%s" => %s' % (attrName, JSONObjToPHPObj(attrVal[attrName], depth)) ) for attrName in attrVal]),
			tabCloseSpacing
		)

	return '"'+str(attrVal)+'"'

def JSONObjToJSObj(attrVal, depth):
	depth = int(depth)+1
	if type(attrVal) == type({}):
		tabSpacing = "    "*depth
		tabCloseSpacing = "    "*(depth-1)
		return "{\n%s%s\n%s}" % (
			tabSpacing, 
			(",\n"+tabSpacing).join( [('"%s": %s' % (attrName, JSONObjToJSObj(attrVal[attrName], depth)) ) for attrName in attrVal]),
			tabCloseSpacing
		)

	return '"'+str(attrVal)+'"'

if __name__ == "__main__":

	ll = Logging()

	db = "mysql"
	codelang = "php"
	framework = "mvc"
	version = "5.5"
	fullBuild = ""

	ll.p("Loading template files...")

	templateDirectory = os.path.dirname(os.path.realpath(__file__)) + "/templates"
	template = Template( filename=templateDirectory + "/"+ db +"/"+ db +".table.tmpl")
	dbTemplate = Template( filename=templateDirectory + "/"+ db +"/"+ db +".db.tmpl")
	insertTemplate = Template( filename=templateDirectory + "/"+ db +"/"+ db +".insert.tmpl")

	controllerTemplate = Template( filename=templateDirectory + "/"+codelang+"/"+framework+"/"+codelang+".controller.tmpl")
	modelTemplate = Template( filename=templateDirectory + "/"+codelang+"/"+framework+"/"+codelang+".model.tmpl")
	objectTemplate = Template( filename=templateDirectory + "/"+codelang+"/"+framework+"/"+codelang+".object.tmpl")
	JSobjectTemplate = Template( filename=templateDirectory + "/js/angular/js.object.tmpl")

	DatabaseSchema = json.loads(open("Database.schema.json", "r").read());

	ll.p("Rending database sql...")

	build = dbTemplate.render(
		name=DatabaseSchema["name"],
		credentials=DatabaseSchema["meta"]["db"][ db ]["credentials"],
		meta=DatabaseSchema["meta"]["db"][ db ]
	).strip()

	fullBuild += "\n" + build


	builtFile = open("build/"+ db +"/sb.db.sql", "w");
	builtFile.write(build)

	tables = {}
	junctions = {}
	populates = {}

	filenames = glob.glob("*.json")

	filenames.remove("Database.schema.json")

	for filename in filenames:
		ll.p("Reading config file: " + filename)
		ObjectSchema = json.loads(open(filename, "r").read());
		ObjectName = ObjectSchema["name"]

		tables[ ObjectName ] = ObjectSchema

		ObjectReferences = {}

		if ObjectSchema["meta"]["db"][ db ][ version ].get("junction"):
			junctions[ObjectName] =  {
				"listingKey": ObjectSchema["listingKey"], 
				"mapping": ObjectSchema["meta"]["db"][ db ][ version ]["junction"]
			}
			ObjectReferences = ObjectSchema["meta"]["db"][ db ][ version ]["junction"]

		if ObjectSchema["meta"]["db"][ db ][ version ].get("populate"):
			populates[ ObjectName ] = {
				"table": ObjectSchema["listingKey"],
				"names":  [],
				"values": [],
			}
			for propName in ObjectSchema["properties"]:
				prop = ObjectSchema["properties"][ propName ]
				if prop.get("placeholder"):
					populates[ ObjectName ]["names"].append(propName)
					populates[ ObjectName ]["values"].append(prop["placeholder"])

		ll.p("Rending table sql...")

		build = template.render(
			db=DatabaseSchema,
			config=DatabaseSchema["meta"]["db"][ db ],
			listingKey=ObjectSchema["listingKey"], 
			meta=ObjectSchema["meta"]["db"][ db ][ version ],
			properties=list(ObjectSchema["properties"].values())
		).strip()

		fullBuild += "\n"+build

		builtFile = open("build/"+ db +"/sb."+ObjectSchema["listingKey"]+".sql", "w");
		builtFile.write(build)

		ll.p("Rending %s controller file..." % (ObjectName))

		try:
			controllerOverrideTemplate = Template( filename=templateDirectory + "/"+codelang+"/"+framework+"/overrides/"+codelang+".controller."+ObjectName+".tmpl")
		
			controllerBuild = controllerOverrideTemplate.render(
				ObjectName=ObjectName,
				listingKey=ObjectSchema["listingKey"]
			)
		except:
			controllerBuild = controllerTemplate.render(
				ObjectName=ObjectName,
				listingKey=ObjectSchema["listingKey"]
			)

		builtControllerFile = open("build/"+ codelang +"/"+ framework +"/controllers/"+ObjectName+"Controller.php", "w");
		builtControllerFile.write(controllerBuild)

		ll.p("Rending %s model file..." % (ObjectName))

		try:
			modileOverrideTemplate = Template( filename=templateDirectory + "/"+codelang+"/"+framework+"/mvc/overrides/"+codelang+".model."+ObjectName+".tmpl")
		
			modelBuild = modileOverrideTemplate.render(
				ObjectName=ObjectName,
				JSONObjToPHPObj=JSONObjToPHPObj,
				junctions=ObjectReferences,
				listingKey=ObjectSchema["listingKey"],
				db=DatabaseSchema,
				properties=ObjectSchema["properties"]
			)
		except:
			modelBuild = modelTemplate.render(
				ObjectName=ObjectName,
				JSONObjToPHPObj=JSONObjToPHPObj,
				junctions=ObjectReferences,
				listingKey=ObjectSchema["listingKey"],
				db=DatabaseSchema,
				properties=ObjectSchema["properties"]
			)

		builtModelFile = open("build/"+ codelang +"/"+ framework +"/models/"+ObjectName+"Model.php", "w");
		builtModelFile.write(modelBuild)

		ll.p("Rending %s object file..." % (ObjectName))

		try:
			objectOverrideTemplate = Template( filename=templateDirectory + "/"+codelang+"/"+framework+"/mvc/overrides/"+codelang+".object."+ObjectName+".tmpl")

			objectBuild = objectOverrideTemplate.render(
				ObjectName=ObjectName
			)		
		except:
			objectBuild = objectTemplate.render(
				ObjectName=ObjectName
			)

		builtObjectFile = open("build/"+ codelang +"/"+ framework +"/objects/"+ObjectName+".php", "w");
		builtObjectFile.write(objectBuild)
	
		JSobjectBuild = JSobjectTemplate.render(
			ObjectName=ObjectName,
			JSONObjToJSObj=JSONObjToJSObj,
			properties=ObjectSchema["properties"]
		)

		JSbuiltObjectFile = open("build/js/angular/objects/sb."+ObjectName+".js", "w");
		JSbuiltObjectFile.write(JSobjectBuild)

	for fromName in junctions:
		junction = junctions[ fromName ]

		for junctionName in junction["mapping"]:

			junction["meta"] = {
				"id": "id",
				"references": {
					"from": {
						"name": "from",
						"table": tables[ fromName ]["listingKey"]
					},
					"to": {
						"name": "to",
						"table": tables[ junction["mapping"][ junctionName ] ]["listingKey"]
					}
				},
				"indexes": {
					"uid": ["from", "to"]
				}
			}

			junctionProperties = {
				"id": {
					"type": "id",
					"name": "id",
					"description": "",
					"incremented": 1
				},
				"created": {
					"type": "timestamp",
					"name": "created",
					"description": "",
					"default": "NOW()"
				},
				"from": {
					"type": "id",
					"name": "from",
					"description": ""
				},
				"to": {
					"type": "id",
					"name": "to",
					"description": ""
				}
			}

			build = template.render(
				db=DatabaseSchema,
				config=DatabaseSchema["meta"]["db"][ db ],
				listingKey=junctionName, 
				meta=junction["meta"],
				properties=list(junctionProperties.values())
			).strip()

			fullBuild += "\n"+ build

			builtFile = open("build/"+ db +"/sb.junction."+junctionName+".sql", "w");
			builtFile.write(build)

	insertBuild = insertTemplate.render(
		populates=populates,
		db=DatabaseSchema
	)

	insertFile = open("build/"+ db +"/sb.inserts.sql", "w")
	insertFile.write( insertBuild)

	fullBuild += "\n" + insertBuild

	fullBuildFile = open("build/"+ db +"/sb.build.sql", "w")
	fullBuildFile.write( fullBuild )

	open("build/"+ codelang +"/"+ framework +"/models/BaseModel.php", "w").write(
		Template( filename=templateDirectory + "/"+codelang+"/"+framework+"/"+codelang+".model.base.tmpl").render()
	)
	open("build/"+ codelang +"/"+ framework +"/objects/BaseObject.php", "w").write(
		Template( filename=templateDirectory + "/"+codelang+"/"+framework+"/"+codelang+".object.base.tmpl").render()
	)

	open("build/"+ codelang +"/"+ framework +"/controllers/BaseController.php", "w").write(
		Template( filename=templateDirectory + "/"+codelang+"/"+framework+"/"+codelang+".controller.base.tmpl").render()
	)