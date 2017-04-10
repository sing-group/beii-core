Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();



















var _Config=require('../Config');var _Config2=_interopRequireDefault(_Config);





var _geojson=require('geojson');var _geojson2=_interopRequireDefault(_geojson);

var _=require('./');
var _location=require('../location');var _location2=_interopRequireDefault(_location);

var _Error=require('../Error');var _Error2=_interopRequireDefault(_Error);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}var accessToken=_Config2.default.accessToken,mapboxStudioUsername=_Config2.default.mapboxStudioUsername;var

DatasetService=function(){function DatasetService(){_classCallCheck(this,DatasetService);}_createClass(DatasetService,null,[{key:'getDataset',value:function getDataset(



datasetId){var userPosition,currentDataset,dataset,r,datasetInfo,datasetBoundingBox,datasetName,response,featuresCollection,locals,foundDataset;return regeneratorRuntime.async(function getDataset$(_context){while(1){switch(_context.prev=_context.next){case 0:if(!(
datasetId==null)){_context.next=8;break;}_context.next=3;return regeneratorRuntime.awrap(
_location2.default.getLocation());case 3:userPosition=_context.sent;
currentDataset=DatasetService.datasets.find(function(d){return d.contains(userPosition);});if(!(
currentDataset==null)){_context.next=7;break;}throw(
new _Error2.default("There are no available locals in your area.",_Error2.default.types.DATASET_NOT_FOUND));case 7:return _context.abrupt('return',

currentDataset);case 8:

dataset=DatasetService.datasets.find(function(d){return d.id===datasetId;});if(!(
dataset!=null)){_context.next=11;break;}return _context.abrupt('return',
dataset);case 11:_context.next=13;return regeneratorRuntime.awrap(


fetch('https://api.mapbox.com/datasets/v1/'+mapboxStudioUsername+'/'+datasetId+'?access_token='+accessToken));case 13:r=_context.sent;_context.next=16;return regeneratorRuntime.awrap(
r.json());case 16:datasetInfo=_context.sent;if(!(
datasetInfo.message!=null)){_context.next=19;break;}throw(
new _Error2.default('Could not retrieve dataset: '+datasetInfo.message,_Error2.default.types.DATASET_NOT_FOUND));case 19:

datasetBoundingBox=datasetInfo.bounds;
datasetName=datasetInfo.name;_context.next=23;return regeneratorRuntime.awrap(

fetch('https://api.mapbox.com/datasets/v1/'+mapboxStudioUsername+'/'+datasetId+'/features?access_token='+accessToken));case 23:response=_context.sent;_context.next=26;return regeneratorRuntime.awrap(
response.json());case 26:featuresCollection=_context.sent;if(!(
featuresCollection.message!=null)){_context.next=29;break;}throw(
new _Error2.default('Could not retrieve dataset: '+featuresCollection.message,_Error2.default.types.DATASET_NOT_FOUND));case 29:


locals=featuresCollection.features.map(function(v,i,a){
return new _.Local(v.geometry.coordinates[1],
v.geometry.coordinates[0],
v.properties.name,
v.properties.description,
v.properties.schedule,
v.properties.address,
v.id);
});
dataset=new _.Dataset(datasetId,locals,datasetName,datasetBoundingBox);
foundDataset=null;if(!(
foundDataset=DatasetService.datasets.find(function(d){return d.id===datasetId;}))){_context.next=36;break;}return _context.abrupt('return',
foundDataset);case 36:

DatasetService.datasets.push(dataset);return _context.abrupt('return',
dataset);case 38:case'end':return _context.stop();}}},null,this);}},{key:'getDatasets',value:function getDatasets(){var r,datasetList;return regeneratorRuntime.async(function getDatasets$(_context2){while(1){switch(_context2.prev=_context2.next){case 0:_context2.next=2;return regeneratorRuntime.awrap(




fetch('https://api.mapbox.com/datasets/v1/'+mapboxStudioUsername+'?access_token='+accessToken));case 2:r=_context2.sent;_context2.next=5;return regeneratorRuntime.awrap(
r.json());case 5:datasetList=_context2.sent;if(!(
datasetList.message!=null)){_context2.next=9;break;}
console.log("aqui",datasetList);throw(
new _Error2.default('Could not retrieve the list of datasets: '+datasetList.message,_Error2.default.types.GENERAL));case 9:return _context2.abrupt('return',


Promise.all(datasetList.map(function(dataset){return DatasetService.getDataset(dataset.id);})));case 10:case'end':return _context2.stop();}}},null,this);}},{key:'getBoundingBox',value:function getBoundingBox()


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

function getRandomSchedule(){
var op=Math.floor(Math.random()*4);
switch(op){
case 0:
return"15:00-3:00";
case 1:
return"9:00-21:00";
case 2:
return[
null,
"9:00-15:00",
"10:30-22:00",
"10:30-22:00",
"10:30-22:00",
"9:00-18:00",
null];

case 3:
return[
"11:15-18:00",
"10:00-20:00",
"10:00-20:00",
"10:00-20:00",
"10:00-20:00",
"14:00-00:00",
"12:00-21:30"];}


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
console.log(JSON.stringify(geojson,null,2));
return geojson;
}}]);return DatasetService;}();DatasetService.datasets=[];exports.default=DatasetService;



DatasetService.getDatasets();