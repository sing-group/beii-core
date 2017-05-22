var _stringify=require('babel-runtime/core-js/json/stringify');var _stringify2=_interopRequireDefault(_stringify);var _promise=require('babel-runtime/core-js/promise');var _promise2=_interopRequireDefault(_promise);var _regenerator=require('babel-runtime/regenerator');var _regenerator2=_interopRequireDefault(_regenerator);var _defineProperty=require('babel-runtime/core-js/object/define-property');var _defineProperty2=_interopRequireDefault(_defineProperty);Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;(0,_defineProperty2.default)(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();



















var _Config=require('../Config');var _Config2=_interopRequireDefault(_Config);

var _geojson=require('geojson');var _geojson2=_interopRequireDefault(_geojson);
var _moment=require('moment');var _moment2=_interopRequireDefault(_moment);

var _=require('./');
var _location=require('../location');var _location2=_interopRequireDefault(_location);

var _Error=require('../Error');var _Error2=_interopRequireDefault(_Error);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}var

DatasetService=function(){function DatasetService(){_classCallCheck(this,DatasetService);}_createClass(DatasetService,null,[{key:'getDataset',value:function getDataset(



datasetId){var forceUpdate=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false;var userPosition,currentDataset,dataset,r,datasetInfo,datasetBoundingBox,datasetName,datasetDesc,response,featuresCollection,locals,foundDataset;return _regenerator2.default.async(function getDataset$(_context){while(1){switch(_context.prev=_context.next){case 0:if(!(
datasetId==null)){_context.next=12;break;}_context.next=3;return _regenerator2.default.awrap(
_location2.default.getLocation());case 3:userPosition=_context.sent;
currentDataset=DatasetService.datasets.find(function(d){return d.contains(userPosition);});if(!(
currentDataset==null)){_context.next=7;break;}throw(
new _Error2.default("There are no available locals in your area.",_Error2.default.types.DATASET_NOT_FOUND));case 7:if(!

forceUpdate){_context.next=11;break;}
datasetId=currentDataset.id;_context.next=12;break;case 11:return _context.abrupt('return',

currentDataset);case 12:


dataset=DatasetService.datasets.find(function(d){return d.id===datasetId;});if(!(
dataset!=null&&!forceUpdate)){_context.next=15;break;}return _context.abrupt('return',
dataset);case 15:_context.next=17;return _regenerator2.default.awrap(


fetch('https://api.mapbox.com/datasets/v1/'+_Config2.default.mapboxStudioUsername+'/'+datasetId+'?access_token='+_Config2.default.accessToken));case 17:r=_context.sent;_context.next=20;return _regenerator2.default.awrap(
r.json());case 20:datasetInfo=_context.sent;if(!(
datasetInfo.message!=null)){_context.next=23;break;}throw(
new _Error2.default('Could not retrieve dataset: '+datasetInfo.message,_Error2.default.types.DATASET_NOT_FOUND));case 23:


datasetBoundingBox=datasetInfo.bounds;
datasetName=datasetInfo.name;
datasetDesc=datasetInfo.description||'';_context.next=28;return _regenerator2.default.awrap(

fetch('https://api.mapbox.com/datasets/v1/'+_Config2.default.mapboxStudioUsername+'/'+datasetId+'/features?access_token='+_Config2.default.accessToken));case 28:response=_context.sent;_context.next=31;return _regenerator2.default.awrap(
response.json());case 31:featuresCollection=_context.sent;if(!(
featuresCollection.message!=null)){_context.next=34;break;}throw(
new _Error2.default('Could not retrieve dataset: '+featuresCollection.message,_Error2.default.types.DATASET_NOT_FOUND));case 34:


locals=featuresCollection.features.map(function(v,i,a){
var schedules=v.properties.schedule.schedules.map(function(sch){return new _.Schedule(sch.start,sch.end,sch.schedule,sch.name);});
var exceptions=v.properties.schedule.exceptions.map(function(e){return new _.ExceptionalDay(e.date,e.openRanges,e.name);});
var schedule=new _.ComplexSchedule(schedules,exceptions);
return new _.Local(v.geometry.coordinates[1],
v.geometry.coordinates[0],
v.properties.name,
v.properties.description,
schedule,
v.properties.address,
v.id);
});
dataset=new _.Dataset(datasetId,locals,datasetName,datasetBoundingBox,datasetDesc);
foundDataset=null;if(!(
!forceUpdate&&(foundDataset=DatasetService.datasets.find(function(d){return d.id===datasetId;})))){_context.next=41;break;}return _context.abrupt('return',
foundDataset);case 41:

DatasetService.datasets=DatasetService.datasets.filter(function(d){return d.id!==datasetId;});
DatasetService.datasets.push(dataset);return _context.abrupt('return',
dataset);case 44:case'end':return _context.stop();}}},null,this);}},{key:'getDatasets',value:function getDatasets(){var



forceUpdate=arguments.length>0&&arguments[0]!==undefined?arguments[0]:false;var r,datasetList;return _regenerator2.default.async(function getDatasets$(_context2){while(1){switch(_context2.prev=_context2.next){case 0:_context2.next=2;return _regenerator2.default.awrap(
fetch('https://api.mapbox.com/datasets/v1/'+_Config2.default.mapboxStudioUsername+'?access_token='+_Config2.default.accessToken));case 2:r=_context2.sent;_context2.next=5;return _regenerator2.default.awrap(
r.json());case 5:datasetList=_context2.sent;if(!(
datasetList.message!=null)){_context2.next=8;break;}throw(
new _Error2.default('Could not retrieve the list of datasets: '+datasetList.message,_Error2.default.types.GENERAL));case 8:


if(forceUpdate){
DatasetService.datasets=DatasetService.datasets.filter(function(d){return datasetList.some(function(dd){return dd.id===d.id;});});
}return _context2.abrupt('return',

_promise2.default.all(datasetList.map(function(dataset){return DatasetService.getDataset(dataset.id,forceUpdate);})));case 10:case'end':return _context2.stop();}}},null,this);}},{key:'getBoundingBox',value:function getBoundingBox()


{
if(DatasetService.datasets.length==1){
return DatasetService.datasets[0].boundingBox;
}
return[];
}},{key:'generateDataset',value:function generateDataset()



{var size=arguments.length>0&&arguments[0]!==undefined?arguments[0]:200;var latBounds=arguments.length>1&&arguments[1]!==undefined?arguments[1]:[42.31502240670423,42.363907964820044];var lonBounds=arguments.length>2&&arguments[2]!==undefined?arguments[2]:[-7.896790525191136,-7.832820200505012];

function getRandom(min,max){
return Math.random()*(max-min)+min;
}

function getRandomDaySchedule(){var withNull=arguments.length>0&&arguments[0]!==undefined?arguments[0]:true;
var op=Math.floor(Math.random()*(withNull?3:2));
switch(op){
case 0:
return[["8:00","13:00"],["16:00","22:00"]];
case 1:
return[["9:00","21:00"]];
case 2:
return[];}

}

function getRandomWeekSchedule(){
var op=Math.floor(Math.random()*10);
if(op<=1){
var sch=getRandomDaySchedule(false);
return op?
[[],[],sch,sch,sch,sch,sch]:
[sch,sch,sch,sch,sch,[],[]];
}
return[0,1,2,3,4,5,6].map(function(day){return getRandomDaySchedule();});
}

function getRandomSchedule(){
var op=Math.floor(Math.random()*2);
switch(op){
case 0:
return[new _.Schedule(
(0,_moment2.default)().subtract(1,'days').startOf('day'),
null,
getRandomWeekSchedule(),
[],
'Default schedule')];
case 1:
case 2:
var changeOfSch=(0,_moment2.default)().add(2,'months').endOf('month');
return[
new _.Schedule(
(0,_moment2.default)().subtract(1,'days').startOf('day'),
changeOfSch,
getRandomWeekSchedule(),
[],
'Holidays'),
new _.Schedule(
changeOfSch.clone().add(1,'milliseconds'),
null,
getRandomWeekSchedule(),
[],
'Default schedule')];}


}

var locals=[];

for(var i=0;i<200;i++){
var schedule=getRandomSchedule();

var description="";
if(Math.floor(Math.random()*2)){
description="This is a mock description. This is a mock description. This is a mock description. This is a mock description. This is a mock description.";
}

var local=new _.Local(getRandom(latBounds[0],latBounds[1]),
getRandom(lonBounds[0],lonBounds[1]),
'fakeLocal'+i,
description,
schedule,
"address",
i+"");
locals.push(local);
}

var geojson=_geojson2.default.parse(locals,{Point:['latitude','longitude'],exclude:['id']});
console.log((0,_stringify2.default)(geojson,null,2));
return geojson;
}}]);return DatasetService;}();DatasetService.datasets=[];exports.default=DatasetService;