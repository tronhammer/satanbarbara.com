
window._req_guid = 0;
window._req_map = {};
window._req_store = [];
window.__require = require;
window.require = function(data, callback){
	if (typeof callback != "function"){
		console.warn("dang, require doesnt have a callback", callback)
		// throw "REQUIRE CALLED WITHOUT CALLBACK FUNCTION";
	}
	if (!(data instanceof Array)){
		console.warn("dang, require doesnt have data", data)
		// throw "REQUIRE CALLED WITHOUT DATA ARRAY";
	}
	
	if (arguments.length > 2){
		console.warn("Require called with more than 2 arguments")
	}
	
	var args = arguments,
		guid = ++window._req_guid;
	
	window._req_map[guid] = {
		id: guid,
		type: "require",
		data: data, 
		callback: callback,
		ret: args
	};
	
	window._req_store.push(guid);
	
	if (typeof callback == "function"){
		args[1] = function(){
			window._req_map[guid].ret = arguments;
			if (typeof window._req_map[guid].callback == "function"){
				return window._req_map[guid].callback.apply(this, arguments);
			}
		}
	}
	
	return window.__require.apply(this, args);
}
for(i in __require){ 
	require[i] = __require[i];
}

window.__define = define;
window.define = function(){
	var args = arguments,
		guid = ++window._req_guid,
		name, deps, callback, callbackPost;
	
	switch(["none", "single", "double", "triple"][args.length]){
		case "single":
			callback = args[0]
			break;
		
		case "double":
			deps = args[0];
			callback = args[1];
			callbackPost = 1;
			break;
			
		case "triple":
			name = args[0];
			deps = args[1];
			callback = args[2];
			callbackPost = 2;
			break
		
		default:
			console.warn("Argument length not in define map!");
	}
	
	window._req_map[guid] = {
		id: guid,
		type: "define",
		deps: deps,
		callback: callback,
		ret: args,
		name: name
	};
	
	window._req_store.push(guid);
	
	if (callbackPost){
		args[callbackPost] = function(){
			window._req_map[guid].ret = arguments;
			if (typeof window._req_map[guid].callback == "function"){
				return window._req_map[guid].callback.apply(this, arguments);
			}
		}
	}
	
	return window.__define.apply(this, arguments);
};
for(i in __define){ 
	define[i] = __define[i];
}

window._getRequireList = function(){
	return window._req_store.map(function(guid){
		return window._req_map[guid];
	});
}

window._req_runner_top = function(){
	_req_arg_mapper()


	deps = _req_def_converter()
	mixed = window._req_map

	a = window._req_compile(mixed[1].callback.toString());

	window._parse_loaders(a[0], mixed[1].deps)
}

window._req_norm_path = function(path){ 
	var realpath=path, 
		type;
	if (path.indexOf("!") !== -1) {
		type = path.split("!")[0];
		realpath = path.split("!")[1];
	}
	
	if (realpath in SB.arch.requireConfig.map["*"]){
		realpath = SB.arch.requireConfig.map["*"][realpath];
	}
	
	for (subpath in SB.arch.requireConfig.paths){
		var exp = RegExp("(^|\/)"+subpath, "gi");
		realpath = realpath.replace(exp, SB.arch.requireConfig.paths[subpath]);
	}
	
	var dels = realpath.split("/")
	
	if (dels[0] != SB.arch.requireConfig.baseUrl){
		realpath = SB.arch.requireConfig.baseUrl + "/" + realpath;
	}
	
	return realpath
}

window._clean_type_convert_map = {
	"less": function(pathKey){
		return "undefined";
	},
	"hb": function(pathKey){
		var deps = window._req_all_deps;
		var escapedContent = deps[pathKey].replace(/\s+|\n|\t/gim, " ").replace(/"/gim, '\\"');
		return "Handlebars.compile(\""+ escapedContent +"\")";
	},
	"json": function(pathKey){
		var deps = window._req_all_deps;
		return JSON.stringify( deps[pathKey] );
	}
}

window._loaders_parsed = {};
window._parse_loaders = function(content, reqs){
	var deps = window._req_all_deps, loaders;
	loaders = reqs.map(function(path){
		func = window._clean_type_convert_map[ path.split("!")[0] ];
		if (func){
			return func(path);
		} else {
			// Loaders can't end with a semicolon as it will end an argument list for a function call.
			if (path in window._loaders_parsed){
				return window._loaders_parsed[path];
			} else {
				innerContent = window._req_compile( window._clean_ret_data("require", deps[path]) );
				if (innerContent.substr(0,10)=="(function("){
					return (window._loaders_parsed[path] = innerContent);
				} else {
					return (window._loaders_parsed[path] = "/**\n * @SELF_INVOKING\n */\n(function(){ " + innerContent + "; })()");
				}
			}
		}
	});
	
	return "\n/**\n * @LOADED_FUNCTION\n*/\n\n (" + content + ")(\n\n/**\n * -------> LODADERS <------\n */\n\n\n"+loaders.join(",\n\n/** @LOADER */")+"\n)";
}

window._clean_ret_data = function(key, data){
	var keys = ["require", "define"];
	var primeKey = key+"(function(){";
	var deps = window._req_all_deps;
	data = data.trim();
	if (data.indexOf(primeKey) === 0){ //.replace(/\s+|\n|\t/gim, " ")
		return "("+ data.substring(key.length+1, data.length-2) + ")()";
	} else if (data.substr(0,key.length+1) == key+"("){
		data = data.substr(key.length+1).trim();
		var reqs = JSON.parse(data.match(/^\[[^\]]*\]/gim)[0]);
		data = data.replace(/^\[[^\]]*\],/gim, "").trim()
		
		if (data.substr(-2) == "})"){
			data = data.substring(0, data.length-1)
		}
		
		if (data.substr(-3) == "});"){
			data = data.substring(0, data.length-2)
		}
		
		return window._parse_loaders(data, reqs);
	} else {
		for (var i=0; i < keys.length; i++) {
			pkey = keys[i];
			if (data.indexOf(pkey+"(function(){") === 0 || data.substr(0,pkey.length+1) == pkey+"("){
				return data;
			}
		}
		
		if (data.substr(0,10)=="(function("){
			return data;
		} else {
			return "/**\n * @SELF_INVOKING\n */\n(function(){ "+data+" })()";
		}
	}
}

window._def_obj_map = {};
window._req_obj_map = {};
window._req_compiler_runner = function(content, o, c, embedded){
	var blocks=[],
		temp = content,
		pos = 0,
		incPos = 0;
	while((openPos = temp.indexOf(o)) && openPos !== -1){
		blocks[pos] = {
			pos: pos++,
			openPos: incPos + openPos,
			o: o,
			c: c
		};
		incPos += openPos + o.length;
		temp = temp.substr(openPos + o.length)
	
		if (pos < 0 || pos > 20){
			break;
		}
	}

	temp = content;
	incPos = 0;
	if (!embedded){
		pos = 0;
	}
	while((closePos = temp.indexOf(c)) && closePos !== -1 && (embedded && pos || !embedded)){
		if (embedded){
			blocks[--pos]["closePos"] = incPos + closePos;
		} else {
			blocks[pos++]["closePos"] = incPos + closePos;
		}
		incPos += closePos + c.length;
		temp = temp.substr(closePos + c.length)

		if (pos < 0 || pos > 20){
			break;
		}
	}
	
	return blocks.map(function(obj){
		obj.content = content.substring( obj.openPos + o.length, obj.closePos );
		return obj;
	})
}

window._no_more = 100;
window._go_level = 0;
window._outs = []
window._req_compile = function(content){
	var last = ""
	window._go_level++;
	try{
		if (!--window._no_more){
			return false;
		}
		
		var oReqKey = "//#####----@ REQUIRE START @----#####//";
		var cReqKey = "//#####----@ REQUIRE END @----#####//";
		var oFuncKey = "//#####----@ REQUIRED FUNCTION START @----#####//";
		var cFuncKey = "//#####----@ REQUIRED FUNCTION END @----#####//";

		var requireBlocks = window._req_compiler_runner(content, oReqKey, cReqKey)
		var requireFunctionBlocks = window._req_compiler_runner(content, oFuncKey, cFuncKey, true)
		
		if (requireFunctionBlocks.length == 1 && !requireBlocks.length){
			var open = content.substring(0, requireFunctionBlocks[0].openPos)
			var body = requireFunctionBlocks[0].content
			var close = content.substring(requireFunctionBlocks[0].closePos + cFuncKey.length)
			last = open+body+close;
		} else if (requireFunctionBlocks.length && requireBlocks.length){
			var grand = "";

			var wrappers = requireFunctionBlocks.map(function(reqBlock, curReqBlockPos) { 
				if (curReqBlockPos == 0){
					var openStartPos =  0;
						openEndPos = requireBlocks[curReqBlockPos].openPos,
						closeStartPos = requireFunctionBlocks[curReqBlockPos+1].closePos + cFuncKey.length,
						closeEndPos = undefined;
					
					return {
						open: content.substring(openStartPos, openEndPos),
						close: content.substring(closeStartPos, closeEndPos).trim().substr(3)
					}
				} else if (curReqBlockPos == requireFunctionBlocks.length -1){
					var openStartPos = requireFunctionBlocks[curReqBlockPos].openPos + oFuncKey.length,
						openEndPos = requireFunctionBlocks[curReqBlockPos].closePos,
						closeStartPos = 0,
						closeEndPos = 0;
					return {
						open: "("+requireBlocks[curReqBlockPos-1].content.substring(requireBlocks[curReqBlockPos-1].content.indexOf("function(")) + content.substring(openStartPos, openEndPos),
						close: content.substring(closeStartPos, closeEndPos).trim().substr(3) +"})()"
					}
				} else {
					var openStartPos = requireFunctionBlocks[curReqBlockPos].openPos + oFuncKey.length,
						openEndPos = requireBlocks[curReqBlockPos].openPos,
						closeStartPos = requireFunctionBlocks[curReqBlockPos+1].closePos + cFuncKey.length,
						closeEndPos = reqBlock.closePos;
					return {
						open: requireBlocks[curReqBlockPos-1].content.substring(requireBlocks[curReqBlockPos-1].content.indexOf("function(")) + content.substring(openStartPos, openEndPos),
						close: content.substring(closeStartPos, closeEndPos).trim().substr(3) +"})()"
					}
				}
			})
			
			wrappers.reverse();
			requireFunctionBlocks.reverse();
			requireBlocks.reverse();

			var out = requireFunctionBlocks.map(function(reqBlock, curReqBlockPos) { 
				var blockContent = reqBlock.content;
				var contentPosEndPos = reqBlock.content.indexOf( oReqKey );
				
				// Trim the fat.
				if (contentPosEndPos !== -1){
					blockContent = reqBlock.content.substring(0, contentPosEndPos);
				}
				
				if (requireBlocks[curReqBlockPos]) {
					blockContent = (requireBlocks[curReqBlockPos].content + blockContent + "})");
					var cleanBlockContent = window._clean_ret_data("require", blockContent);
					
					return cleanBlockContent;
					
				} else {
					// if (data.substr(0,10)=="(function("){
					// 	cleanBlockContent = blockContent;
					// } else {
						// cleanBlockContent = blockContent.substring(reqBlock.openPos, reqBlock.closePos);
					// }
					return "";
				}
				
				// var open = content.substring(0, requireFunctionBlocks[0].openPos).trim()
				// var body = requireFunctionBlocks[0].content.trim()
				// var close = content.substring(requireFunctionBlocks[0].closePos + requireFunctionBlocks[0].c.length).trim()
				// last = open+body+close;
	
		
				// var embeddedRequireBlocks = window._req_compiler_runner(cleanedBlockContent, "//#####----@ REQUIRE START @----#####//", "//#####----@ REQUIRE END @----#####//")
				// var embeddedRequireFunctionBlocks = window._req_compiler_runner(cleanedBlockContent, "//#####----@ REQUIRED FUNCTION START @----#####//", "//#####----@ REQUIRED FUNCTION END @----#####//", true)
				// 				
				// embeddedRequireBlocks.map(function(emReqBlock, i){
				// 	var open = content.substring(0, emReqBlock.openPos ).trim();
				// 	var close = content.substr( embeddedRequireFunctionBlocks[i].closePos + embeddedRequireFunctionBlocks[i].c.length ).trim();
				// 	emContent = (open + last + close).trim();
				// 	return (content=window._clean_ret_data("require", emContent));
				// });
				// 
				// embeddedRequireFunctionBlocks.map(function(){
				// 	var open = content.substring(0, embeddedRequireFunctionBlocks[0].openPos ).trim();
				// 	var body = content.substring(embeddedRequireFunctionBlocks[0].openPos + embeddedRequireFunctionBlocks[0].o.length, embeddedRequireFunctionBlocks[0].closePos ).trim();
				// 	var close = content.substr( embeddedRequireFunctionBlocks[0].closePos + embeddedRequireFunctionBlocks[0].c.length ).trim().substr(2);
				// 	emContent = (open + body + close).trim()
				// 	return (content=window._clean_ret_data("require", emContent));
				// });
			});
			
			window._outs.push({
				out: out,
				content: content,
				requireBlocks: requireBlocks,
				requireFunctionBlocks: requireFunctionBlocks,
				wrappers: wrappers
			});
			
			out.reverse().map(function(wrappedContent, i){
				last = wrappers[i].open + last + wrappedContent + wrappers[i].close;
			});
		} else {
			last = content
		}
	
	} catch(e){
		console.log("WTF", e);
	}
	
	window._go_level--;
	return last
}

window._req_def_converter = function(){
	window._req_all_deps = $.extend({}, window._def_obj_map, window._req_obj_map);
	for (depName in window._req_all_deps){
		if (depName.split("!").length == 1){
			var dep = window._req_all_deps[depName].trim();
			if (dep.substr(0,7) == "require"){
   			 	// deps[depName] = window._clean_ret_data("require", dep);
			} else {
   			 	window._req_all_deps[depName] = window._clean_ret_data("define", dep);
			}
		}
	}
	
	return window._req_all_deps;
}

window._req_mapper_bl = {
	"require": 1, 
	"module": 1
};

window._req_map_getting = 0;

window._req_arg_mapper = function(){
	var list = window._getRequireList();
	
	$("body").append( $("<textarea>").css({height:400, width: 600, left: "35%", position: "relative", top: "200px"}).attr("id", "source"))
	
	
	arg_map = list.map(function(obj){
		return {
			"require": function(obj){
				mapped={};
				
				obj.data.map(function(argName, argPos){ 
					
					realpath = window._req_norm_path(argName);
					console.log("getting ", realpath)
					
					splits = realpath.split("/");
					splits2 = splits[ splits.length - 1 ].split(".")
					noFile = splits2[ splits2.length ] == "less";
					
					!(argName in window._req_obj_map) 
					&& !(argName in window._req_mapper_bl)
					&& ++window._req_map_getting
					&& !noFile
					&& $.ajax({ 
						url: realpath
					}).success(function(data){
						console.log("GOT ", argName);
						window._req_map_getting--;
						window._req_obj_map[argName] = data;
					}).fail(function(e){
						console.warn("GETTING "+argName+" FAILED! RETRYING!!", arguments)
						if (e && e.responseText){
							data = e.responseText;
							console.log("GOT ", argName);
							window._req_map_getting--;
							window._req_obj_map[argName] = data;
						} else {
							$.ajax({ 
								url: realpath +".js"
							}).success(function(data){
								console.log("GOT ", argName);
								window._req_map_getting--;
								window._req_obj_map[argName] = data;
							}).fail(function(e){
								if (e && e.responseText){
									data = e.responseText;
									console.log("GOT ", argName);
									window._req_map_getting--;
									window._req_obj_map[argName] = data;
								}
							})
						}
					});
					
					mapped[argName] = obj.ret[argPos]
				});
			
				obj.mapped = mapped;
				
				return mapped
			},
			"define": function(obj){
				obj.deps && obj.deps.map(function(path){
					realpath = window._req_norm_path(path);
					console.log("getting ", realpath)
					
					splits = realpath.split("/");
					splits2 = splits[ splits.length - 1 ].split(".")
					noFile = splits2[ splits2.length ] == "less";
					
					!(path in window._def_obj_map) 
					&& !(path in window._req_mapper_bl)
					&& ++window._req_map_getting
					&& !noFile
					&& $.ajax({ 
						url: realpath
					}).success(function(data){
						window._req_map_getting--;
						window._def_obj_map[path] = data;
					}).fail(function(e){
						console.warn("GETTING "+path+" FAILED! RETRYING!!", arguments)
						if (e && e.responseText){
							data = e.responseText;
							console.log("GOT ", argName);
							window._req_map_getting--;
							window._req_obj_map[path] = data;
						} else {
							$.ajax({ 
								url: realpath +".js"
							}).success(function(data){
								window._req_map_getting--;
								window._def_obj_map[path] = data;
							}).fail(function(e){
								if (e && e.responseText){
									data = e.responseText;
									console.log("GOT ", argName);
									window._req_map_getting--;
									window._req_obj_map[path] = data;
								}
							})
						}
					});
				});
			}
		}[obj.type](obj);
	}).uniq().sort();
	
	if (arg_map[ arg_map.length - 1] === undefined){
		arg_map.pop()
	}
	
	return arg_map;
}
