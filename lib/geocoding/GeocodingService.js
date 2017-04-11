var _regenerator=require('babel-runtime/regenerator');var _regenerator2=_interopRequireDefault(_regenerator);var _defineProperty=require('babel-runtime/core-js/object/define-property');var _defineProperty2=_interopRequireDefault(_defineProperty);Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;(0,_defineProperty2.default)(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();



















var _Config=require('../Config');var _Config2=_interopRequireDefault(_Config);


var _location=require('../location');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}var aT=_Config2.default.accessToken;var

GeocodingService=function(){function GeocodingService(){_classCallCheck(this,GeocodingService);}_createClass(GeocodingService,null,[{key:'search',value:function search(


query,
callback)








{var _ref=arguments.length>2&&arguments[2]!==undefined?arguments[2]:{},_ref$endpoint=_ref.endpoint,endpoint=_ref$endpoint===undefined?'https://api.tiles.mapbox.com':_ref$endpoint,_ref$source=_ref.source,source=_ref$source===undefined?'mapbox.places':_ref$source,_ref$accessToken=_ref.accessToken,accessToken=_ref$accessToken===undefined?aT:_ref$accessToken,_ref$proximity=_ref.proximity,proximity=_ref$proximity===undefined?'':_ref$proximity,_ref$bbox=_ref.bbox,bbox=_ref$bbox===undefined?'':_ref$bbox,_ref$types=_ref.types,types=_ref$types===undefined?'':_ref$types;
var searchTime=new Date();
var uri=endpoint+'/geocoding/v5/'+
source+'/'+encodeURIComponent(query)+'.json'+
'?access_token='+accessToken+(
proximity?'&proximity='+proximity:'')+(
bbox?'&bbox='+bbox:'')+(
types?'&types='+encodeURIComponent(types):'');

function doSearch(uri){var response;return _regenerator2.default.async(function doSearch$(_context){while(1){switch(_context.prev=_context.next){case 0:_context.next=2;return _regenerator2.default.awrap(
fetch(uri));case 2:response=_context.sent;_context.next=5;return _regenerator2.default.awrap(
response.json());case 5:return _context.abrupt('return',_context.sent);case 6:case'end':return _context.stop();}}},null,this);}


doSearch(uri).
then(function(body){return callback(body,searchTime);}).
catch(function(e){return console.log(e);});
}},{key:'getPosition',value:function getPosition(

result){
return new _location.Position(result.center[1],result.center[0]);
}}]);return GeocodingService;}();exports.default=GeocodingService;