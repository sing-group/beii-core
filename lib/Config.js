var _regenerator=require('babel-runtime/regenerator');var _regenerator2=_interopRequireDefault(_regenerator);var _defineProperty=require('babel-runtime/core-js/object/define-property');var _defineProperty2=_interopRequireDefault(_defineProperty);Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;(0,_defineProperty2.default)(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();



















var _dataSet=require('./dataSet');var _dataSet2=_interopRequireDefault(_dataSet);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}var

Config=function(){function Config(){_classCallCheck(this,Config);}_createClass(Config,null,[{key:'init',value:function init(){return _regenerator2.default.async(function init$(_context){while(1){switch(_context.prev=_context.next){case 0:return _context.abrupt('return',














_dataSet2.default.getDatasets());case 1:case'end':return _context.stop();}}},null,this);}}]);return Config;}();Config.accessToken='';Config.mapboxStudioUsername='';exports.default=Config;