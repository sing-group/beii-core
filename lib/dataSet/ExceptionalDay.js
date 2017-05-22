var _stringify=require('babel-runtime/core-js/json/stringify');var _stringify2=_interopRequireDefault(_stringify);var _defineProperty=require('babel-runtime/core-js/object/define-property');var _defineProperty2=_interopRequireDefault(_defineProperty);var _iterator=require('babel-runtime/core-js/symbol/iterator');var _iterator2=_interopRequireDefault(_iterator);var _symbol=require('babel-runtime/core-js/symbol');var _symbol2=_interopRequireDefault(_symbol);Object.defineProperty(exports,"__esModule",{value:true});var _slicedToArray=function(){function sliceIterator(arr,i){var _arr=[];var _n=true;var _d=false;var _e=undefined;try{for(var _i=arr[typeof _symbol2.default==='function'?_iterator2.default:'@@iterator'](),_s;!(_n=(_s=_i.next()).done);_n=true){_arr.push(_s.value);if(i&&_arr.length===i)break;}}catch(err){_d=true;_e=err;}finally{try{if(!_n&&_i["return"])_i["return"]();}finally{if(_d)throw _e;}}return _arr;}return function(arr,i){if(Array.isArray(arr)){return arr;}else if((typeof _symbol2.default==='function'?_iterator2.default:'@@iterator')in Object(arr)){return sliceIterator(arr,i);}else{throw new TypeError("Invalid attempt to destructure non-iterable instance");}};}();var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;(0,_defineProperty2.default)(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();



















var _moment=require('moment');var _moment2=_interopRequireDefault(_moment);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}var

ExceptionalDay=function(){





function ExceptionalDay(date){var openRanges=arguments.length>1&&arguments[1]!==undefined?arguments[1]:[];var name=arguments.length>2&&arguments[2]!==undefined?arguments[2]:'';_classCallCheck(this,ExceptionalDay);this.name='';this.date=null;this.openRanges=[];
this.name=name;
if(typeof date==='string'){
this.date=(0,_moment2.default)(date);
}else{
this.date=date;
}
if(openRanges.some(function(_ref){var _ref2=_slicedToArray(_ref,2),open=_ref2[0],close=_ref2[1];return(
(0,_moment2.default)(open,'HH:mm').isSameOrAfter((0,_moment2.default)(close,'HH:mm'),'minutes'));})){
throw new Error('Invalid exceptional day');
}
this.openRanges=openRanges;
}_createClass(ExceptionalDay,[{key:'clone',value:function clone()

{
return new ExceptionalDay(this.date.clone(),JSON.parse((0,_stringify2.default)(this.openRanges)),this.name);
}}]);return ExceptionalDay;}();exports.default=ExceptionalDay;