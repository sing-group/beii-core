Object.defineProperty(exports,"__esModule",{value:true});



















var _location=require("../location");function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}var

Route=




function Route(r,type){var isTrip=arguments.length>2&&arguments[2]!==undefined?arguments[2]:false;_classCallCheck(this,Route);this.coordinates=null;this.type="";
if(!isTrip){
this.coordinates=r.routes[0].geometry.coordinates.map(function(v,i,a){
return new _location.Position(v[1],v[0]);
});
}else{
this.coordinates=r.trips[0].geometry.coordinates.map(function(v,i,a){
return new _location.Position(v[1],v[0]);
});
}
this.type=type;
};exports.default=Route;