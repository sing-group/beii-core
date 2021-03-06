var _defineProperty=require('babel-runtime/core-js/object/define-property');var _defineProperty2=_interopRequireDefault(_defineProperty);Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;(0,_defineProperty2.default)(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();



















var _=require('./');
var _location=require('../location');
var _moment=require('moment');var _moment2=_interopRequireDefault(_moment);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}var

Dataset=function(){







function Dataset(id,locals,name,boundingBox){var desc=arguments.length>4&&arguments[4]!==undefined?arguments[4]:'';_classCallCheck(this,Dataset);this.id="";this.locals=[];this.name="";this.description="";this.boundingBox=[];
this.id=id;
this.locals=locals;
this.name=name;
this.boundingBox=boundingBox;
this.description=desc;
}_createClass(Dataset,[{key:'contains',value:function contains(

position){
return(
position.latitude>this.boundingBox[1]&&
position.latitude<this.boundingBox[3]&&
position.longitude>this.boundingBox[0]&&
position.longitude<this.boundingBox[2]);

}},{key:'filterByOpen',value:function filterByOpen()

{var time=arguments.length>0&&arguments[0]!==undefined?arguments[0]:(0,_moment2.default)();
return new Dataset(this.id+'-OPEN',this.locals.filter(function(l){return l.isOpenAt(time);}),this.name,this.boundingBox,this.description);
}},{key:'getLocal',value:function getLocal(

id){
return this.locals.find(function(l){return l.id===id;});
}},{key:'clone',value:function clone()

{
return new Dataset(this.id,this.locals.map(function(l){return l.clone();}),this.name,this.boundingBox,this.description);
}}]);return Dataset;}();exports.default=Dataset;