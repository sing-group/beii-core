var _defineProperty=require('babel-runtime/core-js/object/define-property');var _defineProperty2=_interopRequireDefault(_defineProperty);var _iterator=require('babel-runtime/core-js/symbol/iterator');var _iterator2=_interopRequireDefault(_iterator);var _symbol=require('babel-runtime/core-js/symbol');var _symbol2=_interopRequireDefault(_symbol);Object.defineProperty(exports,"__esModule",{value:true});var _slicedToArray=function(){function sliceIterator(arr,i){var _arr=[];var _n=true;var _d=false;var _e=undefined;try{for(var _i=arr[typeof _symbol2.default==='function'?_iterator2.default:'@@iterator'](),_s;!(_n=(_s=_i.next()).done);_n=true){_arr.push(_s.value);if(i&&_arr.length===i)break;}}catch(err){_d=true;_e=err;}finally{try{if(!_n&&_i["return"])_i["return"]();}finally{if(_d)throw _e;}}return _arr;}return function(arr,i){if(Array.isArray(arr)){return arr;}else if((typeof _symbol2.default==='function'?_iterator2.default:'@@iterator')in Object(arr)){return sliceIterator(arr,i);}else{throw new TypeError("Invalid attempt to destructure non-iterable instance");}};}();var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;(0,_defineProperty2.default)(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();



















var _moment=require('moment');var _moment2=_interopRequireDefault(_moment);
var _Schedule=require('./Schedule');var _Schedule2=_interopRequireDefault(_Schedule);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}var


















ComplexSchedule=function(){




function ComplexSchedule(schs,excs){_classCallCheck(this,ComplexSchedule);this.schedules=[];this.exceptions=[];
this.schedules=schs;
this.exceptions=excs;

}_createClass(ComplexSchedule,[{key:'getMainSchedule',value:function getMainSchedule()

{
var mainSchedule=this.schedules.
find(function(sch){return(
sch.isMainSchedule()==true);});
if(mainSchedule!=null){
return mainSchedule;
}else{
return null;
}
}},{key:'getScheduleAt',value:function getScheduleAt()

{var date=arguments.length>0&&arguments[0]!==undefined?arguments[0]:(0,_moment2.default)();var forceReturnSchedule=arguments.length>1&&arguments[1]!==undefined?arguments[1]:true;
var weekExceptions=this.getExceptionalDaysAtWeekOf(date);
var schedule=this.schedules.
find(function(sch){return(
sch.isMainSchedule()===false&&sch.takesEffectAt(date));});
if(schedule==null){
if(forceReturnSchedule==true){
schedule=this.getMainSchedule();
}else{
return null;
}
}

if(schedule==null){
return _Schedule2.default.getClosedSchedule();
}else{
var finalSchedule=schedule.clone();

weekExceptions.forEach(function(e){return finalSchedule.week[e.date.weekday()]=e.openRanges;});

return finalSchedule;
}
}},{key:'getExceptionalDaysAtWeekOf',value:function getExceptionalDaysAtWeekOf()

{var date=arguments.length>0&&arguments[0]!==undefined?arguments[0]:(0,_moment2.default)();
var startOfWeek=date.clone().startOf('week');
var endOfWeek=date.clone().endOf('week');

var weekExceptions=this.exceptions.filter(function(ex){return ex.date.isBetween(startOfWeek,endOfWeek,null,'[]');});

if(weekExceptions!=null){
return weekExceptions;
}else{
return[];
}
}},{key:'isOpenAt',value:function isOpenAt()

{var date=arguments.length>0&&arguments[0]!==undefined?arguments[0]:(0,_moment2.default)();

}},{key:'clone',value:function clone()

{
return new ComplexSchedule(this.schedules.map(function(sch){return sch.clone();}),this.exceptions.map(function(e){return e.clone();}));
}}],[{key:'openRangeToDates',value:function openRangeToDates(

openRange){var _openRange=_slicedToArray(
openRange,2),opening=_openRange[0],closing=_openRange[1];

var openingTime=null;
var closingTime=null;

if(opening!=null){
openingTime=(0,_moment2.default)(opening,'HH:mm').toDate();
}
if(closing!=null){
closingTime=(0,_moment2.default)(closing,'HH:mm').toDate();
}
return[openingTime,closingTime];
}}]);return ComplexSchedule;}();exports.default=ComplexSchedule;