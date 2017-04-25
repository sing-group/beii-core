var _defineProperty=require('babel-runtime/core-js/object/define-property');var _defineProperty2=_interopRequireDefault(_defineProperty);Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;(0,_defineProperty2.default)(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}var



















BEIIError=function(){
















function BEIIError(){var msg=arguments.length>0&&arguments[0]!==undefined?arguments[0]:"";var type=arguments.length>1&&arguments[1]!==undefined?arguments[1]:BEIIError.types.GENERAL;_classCallCheck(this,BEIIError);this.type=null;this.msg="";this.stack=null;
this.type=type;
this.msg=msg;
this.stack=new Error().stack;
}_createClass(BEIIError,[{key:'printToUser',value:function printToUser()

{var language=arguments.length>0&&arguments[0]!==undefined?arguments[0]:'en';
if(translations[language]==null){
return"No such language: "+language;
}
switch(this.type){
case BEII.types.ROUTE_NOT_FOUND:{
return translations[language]['ROUTE_NOT_FOUND'];
}
case BEII.types.DELETION_ERROR:{
return translations[language]['DELETION_ERROR'];
}
case BEII.types.SAVE_DATASET_ERROR:{
return translations[language]['SAVE_DATASET_ERROR'];
}
case BEII.types.SAVE_LOCAL_ERROR:{
return translations[language]['SAVE_LOCAL_ERROR'];
}
default:{
return"";
}}

}}]);return BEIIError;}();BEIIError.types={GENERAL:'GENERAL',WRONG_PARAMETERS:'WRONG_PARAMETERS',ROUTE_NOT_FOUND:'ROUTE_NOT_FOUND',DATASET_NOT_FOUND:'DATASET_NOT_FOUND',DISTANCES_NOT_CALCULATED:'DISTANCES_NOT_CALCULATED',DELETION_ERROR:'DELETION_ERROR',SAVE_DATASET_ERROR:'SAVE_DATASET_ERROR',SAVE_LOCAL_ERROR:'SAVE_LOCAL_ERROR'};exports.default=BEIIError;


var translations={
en:{
ROUTE_NOT_FOUND:'Sorry, no route was found',
DELETION_ERROR:'An error has occurred',
SAVE_DATASET_ERROR:'Could not save the region',
SAVE_LOCAL_ERROR:'Could not save the local'},

es:{
ROUTE_NOT_FOUND:'Lo sentimos, no se ha encontrado ninguna ruta',
DELETION_ERROR:'Ha habido un error',
SAVE_DATASET_ERROR:'No se pudo guardar la región',
SAVE_LOCAL_ERROR:'No se pudo guardar el local'},

gl:{
ROUTE_NOT_FOUND:'Sentímolo, non se atopou ningunha ruta',
DELETION_ERROR:'Houbo un erro',
SAVE_DATASET_ERROR:'Non se puido gardala rexión',
SAVE_LOCAL_ERROR:'Non se puido gardar o local'}};