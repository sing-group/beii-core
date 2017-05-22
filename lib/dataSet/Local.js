var _defineProperty=require('babel-runtime/core-js/object/define-property');var _defineProperty2=_interopRequireDefault(_defineProperty);Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;(0,_defineProperty2.default)(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();



















var _moment=require('moment');var _moment2=_interopRequireDefault(_moment);

var _=require('./');
var _location=require('../location');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}var

Local=function(){









function Local(lat,lon,name,desc,sch,addr,id){_classCallCheck(this,Local);this.latitude=0;this.longitude=0;this.name="";this.description="";this.schedule=[];this.address="";this.id="";
this.latitude=lat;
this.longitude=lon;
this.name=name;
this.description=desc;
this.schedule=sch;
this.address=addr;
this.id=id;
}_createClass(Local,[{key:'toPosition',value:function toPosition()

{
return new _location.Position(this.latitude,this.longitude);
}},{key:'getScheduleAt',value:function getScheduleAt()

{var date=arguments.length>0&&arguments[0]!==undefined?arguments[0]:(0,_moment2.default)();var forceReturnSchedule=arguments.length>1&&arguments[1]!==undefined?arguments[1]:true;
return this.schedule.getScheduleAt(date,forceReturnSchedule);
}},{key:'isOpenAt',value:function isOpenAt()

{var date=arguments.length>0&&arguments[0]!==undefined?arguments[0]:(0,_moment2.default)();
var schedule=this.schedule.getScheduleAt(date,false);

if(schedule==null){
return false;
}else{
return schedule.isOpenAt(date);
}
}},{key:'clone',value:function clone()

{
return new Local(this.latitude,this.longitude,this.name,this.description,this.schedule.clone(),this.address,this.id);
}}]);return Local;}();exports.default=Local;