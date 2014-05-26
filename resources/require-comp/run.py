#!/usr/bin/python

#written by tronhammer, sean murray

import glob
import os,sys
import fnmatch
import re
import json
import subprocess

# Take code in between markers and store them in a queue, following the file paths givien in defines and requires. Once at the end, begin building decending queue and wrapping file contents in encapsulated functions that bubble up from in order. Account for intro function, embedded requires and defines, and callback functions after requires are satisfied. Also handle third party: ie handlebars, less etc.

class BlockController:
    basePath = "../../www"
    configPath = "components/app/data/app.arch.json"
    entryPath = "app/app.js" # assumed baseUrl from arch is loaded, so don't need components/
    
    minifyScriptPath = "../node_modules/uglify-js/bin/uglifyjs"
    
    blockItems = [
        "require",
        "function"
    ]
    
    minifyBlacklist = [
        # "ember.js", 
        # "jquery.js",
        # "handlebars.js"
    ]
    
    fullScripts = [
        "./../www/components/../lib/bower_components/handlebars/handlebars.js ", 
        "./../www/components/../lib/bower_components/jquery/jquery.js",
        "../../www/components/../lib/bower_components/ember/ember.js"
    ]
    
    def __init__(self):
        BlockController.blockMap = BlockMap()
        
        for blockItemName in self.blockItems:
            blockClass = getattr(sys.modules["__main__"], "%sBlock" % blockItemName.capitalize() )
            BlockController.blockMap.loadBlockItem( blockClass() )
        
        BlockController.config = json.loads( open( BlockController.expandPath(self.configPath) , "r").read() )
    
    @staticmethod
    def expandPath(path):
        pathStruct = [BlockController.basePath]
        orig = "%s" % path
        
        if hasattr(BlockController, "config"):
            config = BlockController.config["requireConfig"]
            
            pathStruct.append( config["baseUrl"] )
            
            for fullPathVarName,fullPathVar in config["map"]["*"].items():
                if path == fullPathVarName:
                    path = fullPathVar
                    break
            
            for partialPathVarName,partialPathVar in config["paths"].items():
                expandable = re.search(r"(^|/)%s/" % partialPathVarName, path)
                if (expandable and expandable.group().strip("/") == partialPathVarName):
                    expanded = ""
                    
                    if expandable.start():
                        expanded = "%s/" % path[:expandable.start()+1]
                    
                    path = "%s%s/%s" % (expanded, partialPathVar, path[expandable.end():])
                    break
            
            if ( not path.split("/")[-1].split(".")[-1] in BlockController.config["fileTypes"]):
                path += ".js"
        
        pathStruct.append(path)
        
        return "/".join(pathStruct)
    
    @staticmethod
    def dep(path):
        fullPath = BlockController.expandPath(path)
        filename = fullPath.split("/")[-1]
        
        print("\n\n>>> Grabbing File ________ %s \n" % fullPath)
        
        content = open( fullPath , "r").read()
        
        if not filename in BlockController.minifyBlacklist and filename.split(".")[-1] == "js" and filename.split(".")[-2] != "min":
            print("We got a compilable js file!")
            minPath = "%s.min.js" % fullPath[:-2]
            allKeys = BlockController.blockMap.getCompileKeyMap()
            
            for blockKey,blockCompiledKey in allKeys:
                content = content.replace(blockKey, blockCompiledKey)
            
            open(minPath, "w").write(content)
            
            ret = subprocess.check_output([
                BlockController.minifyScriptPath, 
                minPath
            ])
            
            minContent = ret.decode('utf-8')
            
            open(minPath, "w").write(minContent)
            
            return BlockController.parse( 
                minContent,
                minPath,
                True
            )
        else:
            return BlockController.parse(content, fullPath=fullPath)
    
    @staticmethod   
    def parse(content, fullPath, compiled = False):
        print("rollen")
        hooks = BlockController.blockMap.hooks
        head = []
        body = []
        foot = []
        
        print("\nRunning pre checks")
        for runner in hooks["pre"]:
            head.append(runner(content, compiled))
        
        print("\nRunning content checks")
        for runner in hooks["run"]:
            body.append(runner(content, compiled))
        
        print("\nRunning post checks")
        for runner in hooks["post"]:
            foot.append(runner(content, compiled))
        
        
        # print("\n\nFINISHED RUNNING:")
        # print(head)
        # print(body)
        # print(foot)
        
        headCompiled = "".join(head)
        bodyCompiled = "".join(body)
        footCompiled = "".join(foot)
        
        evoke = "%s; %s; %s;" % (headCompiled, bodyCompiled, footCompiled)
        if (headCompiled == "" and bodyCompiled == "" and footCompiled == ""):
            evoke = content
        
        # if (fullPath in BlockController.fullScripts):
        #     evoke = content
        
        return """
            (function(){
                %s
            })();
        """ % (evoke)
        
class BlockMap:
    
    mapped = {}
    hooks = {
        "pre": [],
        "run": [],
        "post": []
    }
    
    def loadBlockItem(self, blockItem):
        self.mapped[ blockItem.name ] = blockItem
        self.hooks[ blockItem.hookTo ].append( blockItem.parse )
    
    def getCompileKeyMap(self):
        result = []
        for name,blockItem in self.mapped.items():
            result += blockItem.getKeyGroups()
        
        return result

class BlockItem:
    """Block Item"""
    
    openKey = "//#####----@"
    closeKey = "@----#####//"
    
    compiledOpenKey = "WINDOW._COMPILABLE_ITER_KEY_TOKEN(\""
    compiledCloseKey = "\")"
    
    startKey = "START"
    endKey = "END"
    
    hookTo = "run"
    
    def __init__(self):
        self.buildKeys( self.name )
    
    def buildKeys(self, name):
        cKey = self.closeKey
        oKey = self.openKey
        cKey.replace("/", "\/")
        oKey.replace("/", "\/")
        
        self.blockStartKey = "%s %s %s %s" % (oKey, name, self.startKey, cKey)
        self.blockEndKey = "%s %s %s %s" % (oKey, name, self.endKey, cKey)
        
        self.compiledBlockStartKey = "%s %s %s %s" % (self.compiledOpenKey, name, self.startKey, self.compiledCloseKey)
        self.compiledBlockEndKey = "%s %s %s %s" % (self.compiledOpenKey, name, self.endKey, self.compiledCloseKey)
        
        self.buildReg()
    
    def getKeyGroups(self):
        return [
            (self.blockStartKey, self.compiledBlockStartKey),
            (self.blockEndKey, self.compiledBlockEndKey)
        ]
    
    def getKeys(self):
        return (self.blockStartKey, self.blockEndKey)
        
    def getCompiledKeys(self):
        return (self.compiledBlockStartKey, self.compiledBlockEndKey)
    
    def getEscapedCompiledKeys(self):
        ok,ck = self.getCompiledKeys()
        ok = ok.replace("(", "\(").replace(")", "\)").replace('"', '\"')
        ck = ck.replace("(", "\(").replace(")", "\)").replace('"', '\"')
        return (ok,ck)
    
    def buildReg(self):
        ok,ck = self.getCompiledKeys()
        
        self.reg = re.compile(r"%s.*%s" % self.getKeys(), re.MULTILINE)
        self.compiledReg = re.compile(r"%s.*%s" % (ok.replace("(", "\(").replace(")", "\)").replace('"', '\"'),ck.replace("(", "\(").replace(")", "\)").replace('"', '\"')), re.MULTILINE)
        
    def parse(self, line, compiled = False):
        """Testo"""

        if compiled:
            startDel,endDel = self.getCompiledKeys()
            result = self.compiledReg.search( line.replace("\n", "") )
        else:
            startDel,endDel = self.getKeys()
            result = self.reg.search( line.replace("\n", "") )
        
        if result:
            return self.stringCleaner( result.group()[ len(startDel) : -len(endDel) ] )
        else:
            return None
        
    @staticmethod
    def stringCleaner(string):
        result = re.sub(r"\s+|\t", " ", string)
        return result.strip()
        

class GenericBlock(BlockItem):
    
    hookTo = "run"
    
    def __init__(self, name):
        self.name = name

        super().__init__()
    
class RequireBlock(BlockItem):
    name = "REQUIRE"
    
    def parse(self, line, compiled = False):
        content = super().parse(line, compiled)
        result = []
        
        if content:
            content = re.search(r"\[(.*)\]", content.replace("\n", "") )
            if content:
                content = content.group()
                reqs = json.loads(content)
        
                for required in reqs:
                    result.append(BlockController.dep(required))
        
        return ";".join(result)

class FunctionBlock(BlockItem):
    name = "FUNCTION"
    blockTypes = [
        "INTRO",
        "REQUIRED",
        "OUTRO",
        # "-*"
    ]
    
    def getKeyGroups(self):
        result = []
        for blockType in self.blockTypes:
            self.buildKeys( "%s %s" % (blockType, self.name) )
            result += [
                (self.blockStartKey, self.compiledBlockStartKey),
                (self.blockEndKey, self.compiledBlockEndKey)
            ]
        
        return result
    
    def parse(self, line, compiled = False):
        result = []
        for blockType in self.blockTypes:
            self.buildKeys( "%s %s" % (blockType, self.name) )
            content = super().parse(line, compiled)
            if content:
                if blockType == "REQUIRED":
                    print( content.split( self.openKey )[0] )
                    # result.append(BlockMap.mapped["REQUIRE"].parse(content)
                else:
                    result.append("(function(){ %s })();" % content)
            
        
        return ";\n".join(result)

if __name__ == "__main__":
    blockController = BlockController()
    
    open("main.compiled.js", "w").write(blockController.dep(blockController.entryPath) )
    
    # ret = subprocess.check_output([
    #     BlockController.minifyScriptPath, 
    #     "main.compiled.js"
    # ])
    # 
    # minContent = ret.decode('utf-8')
    # 
    # open("main.compiled.min.js", "w").write( minContent )
    
    