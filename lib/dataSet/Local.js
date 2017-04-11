var _defineProperty=require('babel-runtime/core-js/object/define-property');var _defineProperty2=_interopRequireDefault(_defineProperty);Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;(0,_defineProperty2.default)(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();



















var _moment=require('moment');var _moment2=_interopRequireDefault(_moment);

var _location=require('../location');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}var

Local=function(){









function Local(lat,lon,name,desc,sch,addr,id){_classCallCheck(this,Local);this.latitude=0;this.longitude=0;this.name="";this.description="";this.schedule="";this.address="";this.id="";
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
}},{key:'isOpenAt',value:function isOpenAt()

{var date=arguments.length>0&&arguments[0]!==undefined?arguments[0]:(0,_moment2.default)();
var schedule=this.getOpenHoursAt(date);

if(schedule==null){
return false;
}

var openingTime=this.getOpeningTime(schedule,date);
var closingTime=this.getClosingTime(schedule,date);

var boundary=date.clone().hours(6).minutes(0);
if(date.isAfter(boundary)){
if(closingTime.isBefore(openingTime)){
closingTime.add(1,'days');
}
}else{
if(closingTime.isBefore(openingTime)){
openingTime.subtract(1,'days');
}
}

return date.isBetween(openingTime,closingTime,null,'[]');
}},{key:'getOpenHoursAt',value:function getOpenHoursAt()

{var date=arguments.length>0&&arguments[0]!==undefined?arguments[0]:(0,_moment2.default)();
if(Array.isArray(this.schedule)){
var boundary=date.clone().hours(6).minutes(0);
if(date.isAfter(boundary)){
return this.schedule[date.weekday()];
}else{
return this.schedule[boundary.subtract(1,'days').weekday()];
}
}else{
return this.schedule;
}
}},{key:'getUsualHours',value:function getUsualHours()

{
if(Array.isArray(this.schedule)){
return null;
}else{
return this.schedule;
}
}},{key:'getOpeningTime',value:function getOpeningTime(

schedule){var date=arguments.length>1&&arguments[1]!==undefined?arguments[1]:(0,_moment2.default)();
var opening=(0,_moment2.default)(schedule.split('-')[0],'HH:mm');
return date.hours(opening.hours()).minutes(opening.minutes());
}},{key:'getClosingTime',value:function getClosingTime(

schedule){var date=arguments.length>1&&arguments[1]!==undefined?arguments[1]:(0,_moment2.default)();
var closing=(0,_moment2.default)(schedule.split('-')[1],'HH:mm');
return date.hours(closing.hours()).minutes(closing.minutes());
}}]);return Local;}();exports.default=Local;