var _promise=require('babel-runtime/core-js/promise');var _promise2=_interopRequireDefault(_promise);var _defineProperty=require('babel-runtime/core-js/object/define-property');var _defineProperty2=_interopRequireDefault(_defineProperty);Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;(0,_defineProperty2.default)(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}



















var _=require('./');function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}var

LocationService=function(){function LocationService(){_classCallCheck(this,LocationService);}_createClass(LocationService,null,[{key:'getLocation',value:function getLocation()



{var _this=this;
return new _promise2.default(function(resolve,reject){
navigator.geolocation.getCurrentPosition(
function(position){
console.log('Position obtained from native geolocation: ',position);
resolve(new _.Position(position.coords.latitude,position.coords.longitude));
},
function(error){
if(_this.fallback!=null){
resolve(_this.fallback());
}else{
reject(error);
}
},
{enableHighAccuracy:true,timeout:20000,maximumAge:1000});

});
}}]);return LocationService;}();LocationService.fallback=null;exports.default=LocationService;