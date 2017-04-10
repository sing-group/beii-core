Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}var



















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
default:{
return"";
}}

}}]);return BEIIError;}();BEIIError.types={GENERAL:'GENERAL',WRONG_PARAMETERS:'WRONG_PARAMETERS',ROUTE_NOT_FOUND:'ROUTE_NOT_FOUND',DATASET_NOT_FOUND:'DATASET_NOT_FOUND',DISTANCES_NOT_CALCULATED:'DISTANCES_NOT_CALCULATED'};exports.default=BEIIError;


var translations={
en:{
ROUTE_NOT_FOUND:'Sorry, no route was found'},

es:{
ROUTE_NOT_FOUND:'Lo sentimos, no se ha encontrado ninguna ruta'},

gl:{
ROUTE_NOT_FOUND:'Sentímolo, non se atopou ningunha ruta'}};