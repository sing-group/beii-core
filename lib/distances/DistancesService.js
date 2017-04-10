Object.defineProperty(exports,"__esModule",{value:true});var _slicedToArray=function(){function sliceIterator(arr,i){var _arr=[];var _n=true;var _d=false;var _e=undefined;try{for(var _i=arr[typeof Symbol==='function'?Symbol.iterator:'@@iterator'](),_s;!(_n=(_s=_i.next()).done);_n=true){_arr.push(_s.value);if(i&&_arr.length===i)break;}}catch(err){_d=true;_e=err;}finally{try{if(!_n&&_i["return"])_i["return"]();}finally{if(_d)throw _e;}}return _arr;}return function(arr,i){if(Array.isArray(arr)){return arr;}else if((typeof Symbol==='function'?Symbol.iterator:'@@iterator')in Object(arr)){return sliceIterator(arr,i);}else{throw new TypeError("Invalid attempt to destructure non-iterable instance");}};}();var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();



















var _Error=require('../Error');var _Error2=_interopRequireDefault(_Error);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}var

DistancesService=function(){function DistancesService(){_classCallCheck(this,DistancesService);}_createClass(DistancesService,null,[{key:'orderByDuration',value:function orderByDuration(_ref){var _ref2=_slicedToArray(_ref,3),

position=_ref2[0],destinations=_ref2[1],transportMode=_ref2[2];var queryCoords,response,distances,orderedDests;return regeneratorRuntime.async(function orderByDuration$(_context){while(1){switch(_context.prev=_context.next){case 0:if(!(
destinations==null||destinations.length<=1)){_context.next=2;break;}throw(
new _Error2.default('At least one destination is required.',_Error2.default.types.WRONG_PARAMETERS));case 2:


destinations.unshift(position);
queryCoords=destinations.map(function(d){return d.longitude+','+d.latitude;}).join(';');_context.next=6;return regeneratorRuntime.awrap(

fetch('http://router.project-osrm.org/table/v1/'+transportMode+'/'+queryCoords+'?sources=0'));case 6:response=_context.sent;_context.next=9;return regeneratorRuntime.awrap(
response.json());case 9:distances=_context.sent;if(!(
distances.code!=='Ok')){_context.next=12;break;}throw(
new _Error2.default('Could not retrieve distances matrix. Error code: '+distances.code,_Error2.default.types.DISTANCES_NOT_CALCULATED));case 12:


orderedDests=distances.
destinations.
map(function(v,i,a){
return{
latitude:v.location[1],
longitude:v.location[0],


distance:distances.durations[0][i]};

}).
sort(function(a,b){return a.distance-b.distance;});return _context.abrupt('return',

orderedDests);case 14:case'end':return _context.stop();}}},null,this);}}]);return DistancesService;}();exports.default=DistancesService;