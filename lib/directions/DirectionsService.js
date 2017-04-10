Object.defineProperty(exports,"__esModule",{value:true});var _slicedToArray=function(){function sliceIterator(arr,i){var _arr=[];var _n=true;var _d=false;var _e=undefined;try{for(var _i=arr[typeof Symbol==='function'?Symbol.iterator:'@@iterator'](),_s;!(_n=(_s=_i.next()).done);_n=true){_arr.push(_s.value);if(i&&_arr.length===i)break;}}catch(err){_d=true;_e=err;}finally{try{if(!_n&&_i["return"])_i["return"]();}finally{if(_d)throw _e;}}return _arr;}return function(arr,i){if(Array.isArray(arr)){return arr;}else if((typeof Symbol==='function'?Symbol.iterator:'@@iterator')in Object(arr)){return sliceIterator(arr,i);}else{throw new TypeError("Invalid attempt to destructure non-iterable instance");}};}();var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();



















var _Config=require('../Config');var _Config2=_interopRequireDefault(_Config);


var _=require('./');
var _location=require('../location');
var _dataSet=require('../dataSet');

var _Error=require('../Error');var _Error2=_interopRequireDefault(_Error);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++){arr2[i]=arr[i];}return arr2;}else{return Array.from(arr);}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}var accessToken=_Config2.default.accessToken;var

DirectionsService=function(){function DirectionsService(){_classCallCheck(this,DirectionsService);}_createClass(DirectionsService,null,[{key:'getRoute',value:function getRoute(_ref){var _ref2=_slicedToArray(_ref,3),_ref2$=_ref2[0],








origin=_ref2$.origin,destination=_ref2$.destination,_ref2$$orderedDestina=_ref2$.orderedDestinations,orderedDestinations=_ref2$$orderedDestina===undefined?[]:_ref2$$orderedDestina,_ref2$$destinationInd=_ref2$.destinationIndex,destinationIndex=_ref2$$destinationInd===undefined?1:_ref2$$destinationInd,type=_ref2[1],_ref2$2=_ref2[2],transportMode=_ref2$2===undefined?'driving':_ref2$2;var coords,routeResponse,route;return regeneratorRuntime.async(function getRoute$(_context){while(1){switch(_context.prev=_context.next){case 0:

coords=origin.longitude+','+origin.latitude+';'+destination.longitude+','+destination.latitude;_context.next=3;return regeneratorRuntime.awrap(

fetch('https://api.mapbox.com/directions/v5/mapbox/'+transportMode+'/'+coords+'?geometries=geojson&access_token='+accessToken));case 3:routeResponse=_context.sent;_context.next=6;return regeneratorRuntime.awrap(
routeResponse.json());case 6:route=_context.sent;case 7:if(!(
route.message!=null&&destinationIndex<orderedDestinations.length)){_context.next=20;break;}
destinationIndex+=1;
destination=orderedDestinations[destinationIndex];
coords=origin.longitude+','+origin.latitude+';'+destination.longitude+','+destination.latitude;
console.log("An error occurred, re-routing to next local");_context.next=14;return regeneratorRuntime.awrap(
fetch('https://api.mapbox.com/directions/v5/mapbox/'+transportMode+'/'+coords+'?geometries=geojson&access_token='+accessToken));case 14:routeResponse=_context.sent;_context.next=17;return regeneratorRuntime.awrap(
routeResponse.json());case 17:route=_context.sent;_context.next=7;break;case 20:if(!(

route.message!=null)){_context.next=22;break;}throw(
new _Error2.default('Could not retrieve route from '+origin+' to any destination: '+route.message,_Error2.default.types.ROUTE_NOT_FOUND));case 22:return _context.abrupt('return',


new _.Route(route,type));case 23:case'end':return _context.stop();}}},null,this);}},{key:'getRelevantWaypoints',value:function getRelevantWaypoints(


origin,destination,dataset){var _ref3=arguments.length>3&&arguments[3]!==undefined?arguments[3]:{},_ref3$distance=_ref3.distance,distance=_ref3$distance===undefined?100:_ref3$distance,_ref3$quantity=_ref3.quantity,quantity=_ref3$quantity===undefined?23:_ref3$quantity,transportMode=_ref3.transportMode;var
distanceBetween,diameter,center,nearLocals,directRoute,





















distanceToRoute;return regeneratorRuntime.async(function getRelevantWaypoints$(_context2){while(1){switch(_context2.prev=_context2.next){case 0:distanceBetween=function distanceBetween(p1,p2){var lat1=p1.latitude,lon1=p1.longitude;var lat2=p2.latitude,lon2=p2.longitude;var p=0.017453292519943295;var c=Math.cos;var a=0.5-c((lat2-lat1)*p)/2+c(lat1*p)*c(lat2*p)*(1-c((lon2-lon1)*p))/2;return 12742000*Math.asin(Math.sqrt(a));};diameter=distanceBetween(origin,destination);center=new _location.Position((origin.latitude+destination.latitude)/2,(origin.longitude+destination.longitude)/2);nearLocals=dataset.locals.filter(function(l){return distanceBetween(center,l.toPosition())<=diameter/2+distance;});if(!(nearLocals.length<=quantity)){_context2.next=8;break;}return _context2.abrupt('return',nearLocals);case 8:distanceToRoute=function distanceToRoute(point,route){
return Math.min.apply(Math,_toConsumableArray(route.coordinates.map(function(c){return distanceBetween(point,c);})));
};_context2.next=11;return regeneratorRuntime.awrap(DirectionsService.getRoute([{origin:origin,destination:destination},null,transportMode]));case 11:directRoute=_context2.sent;return _context2.abrupt('return',
nearLocals.
sort(function(a,b){return distanceToRoute(a.toPosition(),directRoute)-distanceToRoute(b.toPosition(),directRoute);}).
slice(0,quantity));case 13:case'end':return _context2.stop();}}},null,this);}},{key:'getRouteWithWaypoints',value:function getRouteWithWaypoints(_ref4){var



origin=_ref4.origin,destination=_ref4.destination,waypoints=_ref4.waypoints,type=_ref4.type,_ref4$transportMode=_ref4.transportMode,transportMode=_ref4$transportMode===undefined?'driving':_ref4$transportMode,_ref4$distance=_ref4.distance,distance=_ref4$distance===undefined?100:_ref4$distance;var points,coords,radiuses,uri,routeResponse,route;return regeneratorRuntime.async(function getRouteWithWaypoints$(_context3){while(1){switch(_context3.prev=_context3.next){case 0:if(!(

waypoints!=null&&!Array.isArray(waypoints)||waypoints.length<=0||waypoints.length>23)){_context3.next=2;break;}throw(
new _Error2.default('Invalid waypoints object: '+waypoints,_Error2.default.types.WRONG_PARAMETERS));case 2:

points=[origin].concat(_toConsumableArray(waypoints),[destination]);
coords=points.map(function(p){return p.longitude+','+p.latitude;}).join(';');
radiuses=points.map(function(p){return distance;}).join(';');

uri='http://router.project-osrm.org/trip/v1/'+transportMode+'/'+coords+'?source=first&destination=last&radiuses='+radiuses+'&geometries=geojson&roundtrip=false';_context3.next=8;return regeneratorRuntime.awrap(

fetch(uri));case 8:routeResponse=_context3.sent;_context3.next=11;return regeneratorRuntime.awrap(
routeResponse.json());case 11:route=_context3.sent;if(!(

route.message!=null)){_context3.next=14;break;}throw(
new _Error2.default('Could not retrieve route from '+origin+' to any destination: '+route.message,_Error2.default.types.ROUTE_NOT_FOUND));case 14:return _context3.abrupt('return',


new _.Route(route,type,true));case 15:case'end':return _context3.stop();}}},null,this);}}]);return DirectionsService;}();DirectionsService.types={GO_FAST:'GO_FAST',GO_TO_LOCAL:'GO_TO_LOCAL',GO_TO:'GO_TO'};exports.default=DirectionsService;