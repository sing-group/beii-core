Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();



















var _dataSet=require('../dataSet');
var _directions=require('../directions');
var _location=require('../location');

var _=require('./');

var _Palette=require('../Palette');var _Palette2=_interopRequireDefault(_Palette);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}var

AnnotationsService=function(){function AnnotationsService(){_classCallCheck(this,AnnotationsService);}_createClass(AnnotationsService,null,[{key:'localToAnnotation',value:function localToAnnotation(








local){
return new _.Annotation({
coordinates:[local.latitude,local.longitude],
type:'point',
title:local.name,
id:local.id+AnnotationsService.sufixes.LOCAL});

}},{key:'localArrayToAnnotation',value:function localArrayToAnnotation(

locals){
return locals.map(function(l){return AnnotationsService.localToAnnotation(l);});
}},{key:'datasetToAnnotation',value:function datasetToAnnotation(

dataset){
return dataset.locals.map(function(l){return AnnotationsService.localToAnnotation(l);});
}},{key:'routeToAnnotation',value:function routeToAnnotation(

route){
return new _.Annotation({
coordinates:route.coordinates.map(function(pos){return[pos.latitude,pos.longitude];}),
type:'polyline',
strokeColor:_Palette2.default.primary.basic,
strokeWidth:4,
strokeAlpha:.5,
id:route.type+AnnotationsService.sufixes.ROUTE});

}},{key:'positionToAnnotation',value:function positionToAnnotation(

position){
return new _.Annotation({
coordinates:[position.latitude,position.longitude],
type:'point',
id:position.latitude+';'+position.longitude+AnnotationsService.sufixes.POINT});

}},{key:'debugAnnotation',value:function debugAnnotation(

position){var color=arguments.length>1&&arguments[1]!==undefined?arguments[1]:_Palette2.default.primary.basic;
return new _.Annotation({
coordinates:[
[position.latitude-0.0001,position.longitude-0.0001],
[position.latitude+0.0001,position.longitude-0.0001],
[position.latitude+0.0001,position.longitude+0.0001],
[position.latitude-0.0001,position.longitude+0.0001],
[position.latitude-0.0001,position.longitude-0.0001]],

type:'polyline',
fillColor:color,
strokeColor:color,
id:position.latitude+';'+position.longitude+AnnotationsService.sufixes.DEBUG});

}}]);return AnnotationsService;}();AnnotationsService.sufixes={LOCAL:"_Local",ROUTE:"_Route",POINT:"_Point",DEBUG:"_Debug"};exports.default=AnnotationsService;