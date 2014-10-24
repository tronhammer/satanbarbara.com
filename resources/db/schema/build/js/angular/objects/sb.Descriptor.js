;(function(module){
	"use strict";

	module.factory("$Descriptor", ["$rootScope", function($rootScope) {
		var Descriptor = function(data){
			$.extend(this, {
				"id": null,
				"associations": {},
				"persistent": false,
				"data": {},
				"cache": {}
			});

			this.set(data);
		};

		$.extend(Descriptor.prototype, {
			"target": "Descriptor",
			"key": "descriptors",

			"attrs": {
                "archived": {
                    "description": "",
                    "generator": "system",
                    "default": 0,
                    "restricted": "True",
                    "label": "Archived",
                    "placeholder": "0",
                    "type": "boolean",
                    "name": "archived"
                },
                "description": {
                    "description": "",
                    "generator": "user",
                    "default": "",
                    "max": 4000,
                    "label": "Description",
                    "type": "string",
                    "placeholder": "SO awesome!",
                    "name": "description"
                },
                "created": {
                    "description": "Time when entry was made.",
                    "generator": "db",
                    "type": "timestamp",
                    "required": "True",
                    "label": "Created",
                    "placeholder": "2014-11-25 04:34:00 pm",
                    "name": "created"
                },
                "deleted": {
                    "description": "0",
                    "generator": "system",
                    "default": 0,
                    "restricted": "True",
                    "label": "Deleted",
                    "placeholder": "",
                    "type": "boolean",
                    "name": "deleted"
                },
                "id": {
                    "description": "",
                    "generator": "db",
                    "incremented": "True",
                    "label": "Unique ID",
                    "unique": "True",
                    "type": "id",
                    "name": "id"
                },
                "name": {
                    "description": "",
                    "generator": "user",
                    "min": 3,
                    "default": "",
                    "max": 255,
                    "required": "True",
                    "label": "Name",
                    "type": "string",
                    "unique": "True",
                    "placeholder": "awesome",
                    "name": "name"
                }
            },

			"required": [
			
					"name"
			
			],

			"userSettable": [
			
					"description"
			
					, "name"
			
			],

			"userVisible": [
			
					"description"
			
					, "created"
			
					, "id"
			
					, "name"
			
			],

			"junctions": {
        
    },

			"set": function(data){
				var _this = this;
				if (!data){
					return;
				}
				
				if (data.id){
					this.id = data.id;
					delete data.id;
				}

				if (data.assocs){
					this["associations"] = data.assocs;
					delete data.assocs;
				}
				
				console.log("Calling setter for Descriptor")

				$.each(data, function(key, val){
					if (_this.userSettable.indexOf( key ) !== -1){
						_this.data[ key ] = val;
					}
				});
			},
			"get": function(name){
				return name=="id" ? this.id : this.data[name];
			},
			"getSettables": function(){
				if (this.cache.userGenerated){
					return this.cache.userGenerated;
				} else {
					var userGenerated = {};
	
					for (var attrName in this.attrs){
						var attr = this.attrs[attrName];
						if (attr.generator == "user"){
							userGenerated[attrName] = attr;
						}
					}

					return userGenerated;
				}

			}
		});

		return Descriptor;
	}]);


	module.service("DescriptorController", ["$Descriptor", "$rootScope", "$rest", function($Descriptor, $rootScope, $rest) {

		/**
		 * For debugging purposes only, remove in production.
		 * @type {[type]}
		 */
		window._DescriptorController = this;

		$.extend(this, {
			"objects": {},
			"sorts": {},
			"ids": [],
			"wrapper": function(callback){
				var _this = this;
				return function(data){
					callback.call(_this, this, data);
				};
			},
			"save": function(self, data){
				console.log("saving Descriptor object");
				var data = self.data;

				data.target = "Descriptor";

				$rest.create(data);
			},
			"load": function(){
		        $rest.getData({"target": "Descriptor", "assocs": 1}, [function(data, identifier){
		        	if (identifier == "loadDescriptorObjects" && data.descriptors){
		        		for(var id in data.descriptors.all){
			        		this.objects[id] = this.factory(data.descriptors.all[ id ]);
		        		}

		        		this.sorts = data.descriptors.sorts;

		        		$rootScope.$broadcast("loadedNewDescriptorObjects", this);
		        	}
		        	console.log("will with work");
		        }, "loadDescriptorObjects", this]);
			},


			"factory": function(data){
				console.log("Creating Descriptor object with controller factory!");
				var Descriptor;
				if (data && data.id && this.objects[ data.id ]){
					Descriptor = this.objects[ data.id ];
				} else {
					Descriptor = new $Descriptor(data);

					$.extend(Descriptor, {
						"save": this.wrapper(this.save)
					});

					if (data && data.id){
						this.objects[ data.id ] = Descriptor;
					}
				}

				return Descriptor;
			},
		});
	}]);
})(window.SB.module);