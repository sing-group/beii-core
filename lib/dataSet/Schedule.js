var _stringify=require('babel-runtime/core-js/json/stringify');var _stringify2=_interopRequireDefault(_stringify);var _defineProperty=require('babel-runtime/core-js/object/define-property');var _defineProperty2=_interopRequireDefault(_defineProperty);var _iterator=require('babel-runtime/core-js/symbol/iterator');var _iterator2=_interopRequireDefault(_iterator);var _symbol=require('babel-runtime/core-js/symbol');var _symbol2=_interopRequireDefault(_symbol);Object.defineProperty(exports,"__esModule",{value:true});var _slicedToArray=function(){function sliceIterator(arr,i){var _arr=[];var _n=true;var _d=false;var _e=undefined;try{for(var _i=arr[typeof _symbol2.default==='function'?_iterator2.default:'@@iterator'](),_s;!(_n=(_s=_i.next()).done);_n=true){_arr.push(_s.value);if(i&&_arr.length===i)break;}}catch(err){_d=true;_e=err;}finally{try{if(!_n&&_i["return"])_i["return"]();}finally{if(_d)throw _e;}}return _arr;}return function(arr,i){if(Array.isArray(arr)){return arr;}else if((typeof _symbol2.default==='function'?_iterator2.default:'@@iterator')in Object(arr)){return sliceIterator(arr,i);}else{throw new TypeError("Invalid attempt to destructure non-iterable instance");}};}();var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;(0,_defineProperty2.default)(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();



















var _moment=require('moment');var _moment2=_interopRequireDefault(_moment);

var _location=require('../location');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}var


















Schedule=function(){















function Schedule(start,end,week){var name=arguments.length>3&&arguments[3]!==undefined?arguments[3]:'';_classCallCheck(this,Schedule);this.name='';this.start=null;this.end=null;this.schedule=[[],[],[],[],[],[],[]];
this.name=name;
if(typeof start==='string'){
this.start=(0,_moment2.default)(start);
}else{
this.start=start;
}
if(typeof end==='string'){
this.end=(0,_moment2.default)(end);
}else{
this.end=end;
}

if(
!Array.isArray(week)||
week.length!==7)
{
throw new Error('Invalid week, cannot create the schedule');
}
this.week=week;
}_createClass(Schedule,[{key:'isMainSchedule',value:function isMainSchedule()









{
return this.end==null;
}},{key:'getDay',value:function getDay(

day){
return this.week[day];
}},{key:'takesEffectAt',value:function takesEffectAt()

{var date=arguments.length>0&&arguments[0]!==undefined?arguments[0]:(0,_moment2.default)();
return date.isBetween(this.start,this.end,null,'[]');
}},{key:'isOpenAt',value:function isOpenAt()

{var date=arguments.length>0&&arguments[0]!==undefined?arguments[0]:(0,_moment2.default)();
if(!this.takesEffectAt(date)){
return false;
}

var askedDay=this.getDay(date.weekday());

if(askedDay.length===0){
return false;
}

function openClosePairContains(_ref){var _ref2=_slicedToArray(_ref,2),opening=_ref2[0],closing=_ref2[1];var date=arguments.length>1&&arguments[1]!==undefined?arguments[1]:(0,_moment2.default)();
var newDate=(0,_moment2.default)(date.format('HH:mm'),'HH:mm');
var openingTime=(0,_moment2.default)(opening,'HH:mm');
var closingTime=(0,_moment2.default)(closing,'HH:mm');

return date.isBetween(openingTime,closingTime,'minutes','[]');
}

return askedDay.some(function(openClosePair){return openClosePairContains(openClosePair,date);});
}},{key:'isDifferentEachDay',value:function isDifferentEachDay()

{
return!this.week.
filter(function(day){return day.length>0;}).
every(function(day,i,days){return i==0||i!==0&&(0,_stringify2.default)(day)===(0,_stringify2.default)(days[0]);});
}},{key:'clone',value:function clone()

{
var clonedStart=this.start!=null?this.start.clone():null;
var clonedEnd=this.end!=null?this.end.clone():null;
return new Schedule(clonedStart,clonedEnd,JSON.parse((0,_stringify2.default)(this.week)),this.name);
}},{key:'week',get:function get(){return this.schedule;},set:function set(week){return this.schedule=week;}}],[{key:'getClosedSchedule',value:function getClosedSchedule()

{
return new Schedule((0,_moment2.default)().subtract(10,'year'),(0,_moment2.default)().add(10,'year'),[[],[],[],[],[],[],[]]);
}}]);return Schedule;}();exports.default=Schedule;