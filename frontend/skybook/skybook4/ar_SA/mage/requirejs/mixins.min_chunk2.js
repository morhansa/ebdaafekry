lugin(name){return'mixins!'+name;}
function removeBaseUrl(url,config){var baseUrl=config.baseUrl||'',index=url.indexOf(baseUrl);if(~index){url=url.substring(baseUrl.length-index);}
return url;}
function getPath(name,config){var url=unbundledContext.require.toUrl(name);return removeBaseUrl(url,config);}
function isRelative(name){return!!~name.indexOf('./');}
function applyMixins(target){var mixins=Array.prototype.slice.call(arguments,1);mixins.forEach(function(mixin){target=mixin(target);});return target;}
rjsMixins={load:function(name,req,onLoad,config){v