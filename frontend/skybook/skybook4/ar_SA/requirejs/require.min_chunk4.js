.shift();if(args[0]===null){return onError(makeError('mismatch','Mismatched anonymous define() module: '+
args[args.length-1]));}else{callGetModule(args);}}
context.defQueueMap={};}
context={config:config,contextName:contextName,registry:registry,defined:defined,urlFetched:urlFetched,defQueue:defQueue,defQueueMap:{},Module:Module,makeModuleMap:makeModuleMap,nextTick:req.nextTick,onError:onError,configure:function(cfg){if(cfg.baseUrl){if(cfg.baseUrl.charAt(cfg.baseUrl.length-1)!=='/'){cfg.baseUrl+='/';}}
if(typeof cfg.urlArgs==='string'){var urlArgs=cfg.urlArgs;cfg.urlArgs=function(id,url){return(url.indexOf('?')===-1?'?':'&')+urlArgs;};}
var shim=config.shim,objs={paths:true,bundles:true,config:true,map:true};eachProp(cfg,function(value,prop){if(objs[prop]){if(!config[prop]){config[prop]={};}
mixin(config[prop],value,true,true);}else{config[prop]=value;}});if(cfg.bundles){eachProp(cfg.bundles,function(value,prop){each(value,function(v){if(v!==prop){bundlesMap[v]=prop;}});});}
if(cfg.shim){eachProp(cfg.shim,function(value,id){if(isArray(value)){value={deps:value};}
if((value.exports||value.init)&&!value.exportsFn){value.exportsFn=context.makeShimExports(value);}
shim[id]=value;});config.shim=shim;}
if(cfg.packages){each(cfg.packages,function(pkgObj){var location,name;pkgObj=typeof pkgObj==='string'?{name:pkgObj}:pkgObj;name=pkgObj.name;location=pkgObj.location;if(location){config.paths[name]=pkgObj.location;}
config.pkgs[name]=pkgObj.name+'/'+(pkgObj.main||'main').replace(currDirRegExp,'').replace(jsSuffixRegExp,'');});}
eachProp(registry,function(mod,id){if(!mod.inited&&!mod.map.unnormalized){mod.map=makeModuleMap(id,null,true);}});if(cfg.deps||cfg.callback){context.require(cfg.deps||[],cfg.callback);}},makeShimExports:function(value){function fn(){var ret;if(value.init){ret=value.init.apply(global,arguments);}
return ret||(value.exports&&getGlobal(value.exports));}
return fn;},makeRequire:function(relMap,options){options=options||{};function localRequire(deps,callback,errback){var id,map,requireMod;if(options.enableBuildCallback&&callback&&isFunction(callback)){callback.__requireJsBuild=true;}
if(typeof deps==='string'){if(isFunction(callback)){return onError(makeError('requireargs','Invalid require call'),errback);}
if(relMap&&hasProp(handlers,deps)){return handlers[deps](registry[relMap.id]);}
if(req.get){return req.get(context,deps,relMap,localRequire);}
map=makeModuleMap(deps,relMap,false,true);id=map.id;if(!hasProp(defined,id)){return onError(makeError('notloaded','Module name "'+
id+'" has not been loaded yet for context: '+
contextName+
(relMap?'':'. Use require([])')));}
return defined[id];}
intakeDefines();context.nextTick(function(){intakeDefines();requireMod=getModule(makeModuleMap(null,relMap));requireMod.skipMap=options.skipMap;requireMod.init(deps,callback,errback,{enabled:true});checkLoaded();});return localRequire;}
mixin(localRequire,{isBrowser:isBrowser,toUrl:function(moduleNamePlusExt){var ext,index=moduleNamePlusExt.lastIndexOf('.'),segment=moduleNamePlusExt.split('/')[0],isRelative=segment==='.'||segment==='..';if(index!==-1&&(!isRelative||index>1)){ext=moduleNamePlusExt.substring(index,moduleNamePlusExt.length);moduleNamePlusExt=moduleNamePlusExt.substring(0,index);}
return context.nameToUrl(normalize(moduleNamePlusExt,relMap&&relMap.id,true),ext,true);},defined:function(id){return hasProp(defined,makeModuleMap(id,relMap,false,true).id);},specified:function(id){id=makeModuleMap(id,relMap,false,true).id;return hasProp(defined,id)||hasProp(registry,id);}});if(!relMap){localRequire.undef=function(id){takeGlobalQueue();var map=makeModuleMap(id,relMap,true),mod=getOwn(registry,id);mod.undefed=true;removeScript(id);delete defined[id];delete urlFetched[map.url];delete undefEvents[id];eachReverse(defQueue,function(args,i){if(args[0]===id){defQueue.splice(i,1);}});delete context.defQueueMap[id];if(mod){if(mod.events.defined){undefEvents[id]=mod.events;}
cleanRegistry(id);}};}
return localRequire;},enable:function(depMap){var mod=getOwn(registry,depMap.id);if(mod){getModule(depMap).enable();}},completeLoad:function(moduleName){var found,args,mod,shim=getOwn(config.shim,moduleName)||{},shExports=shim.exports;takeGlobalQueue();while(defQueue.length){args=defQueue.shift();if(args[0]===null){args[0]=moduleName;if(found){break;}
found=true;}else if(args[0]===moduleName){found=true;}
callGetModule(args);}
context.defQueueMap={};mod=getOwn(registry,moduleName);if(!found&&!hasProp(defined,moduleName)&&mod&&!mod.inited){if(config.enforceDefine&&(!shExports||!getGlobal(shExports))){if(hasPathFallback(moduleName)){return;}
return onError(makeError('nodefine','No define call for '+moduleName,null,[moduleName]));}
callGetModule([moduleName,(shim.deps||[]),shim.exportsFn]);}
checkLoaded();},nameToUrl:function(moduleName,ext,skipExt){var paths,syms,i,parentModule,url,parentPath,bundleId,pkgMain=getOwn(config.pkgs,moduleName);if(pkgMain){moduleName=pkgMain;}
bundleId=getOwn(bundlesMap,moduleName);if(bundleId){return context.nameToUrl(bundleId,ext,skipExt);}
if(req.jsExtRegExp.test(moduleName)){url=moduleName+(ext||'');}else{paths=config.paths;syms=moduleName.split('/');for(i=syms.length;i>0;i-=1){parentModule=syms.slice(0,i).join('/');parentPath=getOwn(paths,parentModule);if(parentPath){if(isArray(parent