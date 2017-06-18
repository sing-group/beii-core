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
}else{
return translations[language][this.type]||'';
}
}}]);return BEIIError;}();BEIIError.types={GENERAL:'GENERAL',WRONG_PARAMETERS:'WRONG_PARAMETERS',ROUTE_NOT_FOUND:'ROUTE_NOT_FOUND',DATASET_NOT_FOUND:'DATASET_NOT_FOUND',DISTANCES_NOT_CALCULATED:'DISTANCES_NOT_CALCULATED',DELETION_ERROR:'DELETION_ERROR',SAVE_DATASET_ERROR:'SAVE_DATASET_ERROR',SAVE_LOCAL_ERROR:'SAVE_LOCAL_ERROR',USER_NOT_FOUND:'USER_NOT_FOUND',LIST_USERS_ERROR:'LIST_USERS_ERROR',ACCESS_DENIED:'ACCESS_DENIED',UNEXPECTED_ERROR:'UNEXPECTED_ERROR'};exports.default=BEIIError;


var translations={
en:{
ROUTE_NOT_FOUND:'Sorry, no route was found',
DATASET_NOT_FOUND:'Region not found',
DELETION_ERROR:'An error has occurred while deleting',
SAVE_DATASET_ERROR:'Could not save the region',
SAVE_LOCAL_ERROR:'Could not save the local',
USER_NOT_FOUND:'User not found',
LIST_USERS_ERROR:'Could not load the list of users',
ACCESS_DENIED:'Access denied',
UNEXPECTED_ERROR:'An unexpected error has occurred, check the connection to the Internet'},

es:{
ROUTE_NOT_FOUND:'Lo sentimos, no se ha encontrado ninguna ruta',
DATASET_NOT_FOUND:'No se encontró la región',
DELETION_ERROR:'Se ha producido un error al borrar el elemento',
SAVE_DATASET_ERROR:'No se pudo guardar la región',
SAVE_LOCAL_ERROR:'No se pudo guardar el local',
USER_NOT_FOUND:'No se encontró el usuario',
LIST_USERS_ERROR:'No se pudo cargar la lista de usuarios',
ACCESS_DENIED:'Acceso denegado',
UNEXPECTED_ERROR:'Ha ocurrido un error inesperado, comprueba la conexión a Internet'},

gl:{
ROUTE_NOT_FOUND:'Sentímolo, non se atopou ningunha ruta',
DATASET_NOT_FOUND:'Non se atopou a rexión',
DELETION_ERROR:'Producíuse un erro ao borrar o elemento',
SAVE_DATASET_ERROR:'Non se puido gardala rexión',
SAVE_LOCAL_ERROR:'Non se puido gardar o local',
USER_NOT_FOUND:'Non se atopou o usuario',
LIST_USERS_ERROR:'Non se puido cargar a lista de usuarios',
ACCESS_DENIED:'Acceso denegado',
UNEXPECTED_ERROR:'Ocorreu un erro inesperado, comproba a conexión á Internet'}};