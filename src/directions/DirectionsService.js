/*
 *    This file is part of BEII-core
 *    Copyright (C) 2017  Pablo González Suárez, Miguel Reboiro Jato and Pablo Vega Villaamil
 *
 *    BEII-core is free software: you can redistribute it and/or modify
 *    it under the terms of the GNU General Public License as published by
 *    the Free Software Foundation, either version 3 of the License, or
 *    (at your option) any later version.
 *
 *    This program is distributed in the hope that it will be useful,
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *    GNU General Public License for more details.
 *
 *    You should have received a copy of the GNU General Public License
 *    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

 // @flow

import {accessToken} from '../../config'

import {Route} from './'
import {Position} from '../location'
import {Dataset} from '../dataSet'

import Error from '../Error'

export default class DirectionsService {

    
    static types = {
        GO_FAST: 'GO_FAST',
        GO_TO_LOCAL: 'GO_TO_LOCAL',
        GO_TO: 'GO_TO',
    }

    static async getRoute([{ origin, destination, orderedDestinations = [], destinationIndex = 1 }, type, transportMode = 'driving']){

        let coords = origin.longitude + ',' + origin.latitude + ';' + destination.longitude + ',' + destination.latitude
        
        let routeResponse = await fetch(`https://api.mapbox.com/directions/v5/mapbox/${transportMode}/${coords}?geometries=geojson&access_token=${accessToken}`)
        let route = await routeResponse.json()
        while (route.message != null && destinationIndex < orderedDestinations.length){
            destinationIndex+=1
            destination = orderedDestinations[destinationIndex]
            coords = origin.longitude + ',' + origin.latitude + ';' + destination.longitude + ',' + destination.latitude
            console.log("An error occurred, re-routing to next local")
            routeResponse = await fetch(`https://api.mapbox.com/directions/v5/mapbox/${transportMode}/${coords}?geometries=geojson&access_token=${accessToken}`)
            route = await routeResponse.json()
        }
        if (route.message != null){
            throw new Error(`Could not retrieve route from ${origin} to any destination: ${route.message}`, Error.types.ROUTE_NOT_FOUND)
        }

        return new Route(route, type)
    }

    static async getRelevantWaypoints(origin: Position, destination: Position, dataset: Dataset, {distance = 100, quantity = 23, transportMode} = {}){
        function distanceBetween(p1: Position, p2: Position) {
            const {latitude: lat1, longitude: lon1} = p1
            const {latitude: lat2, longitude: lon2} = p2

            const p = 0.017453292519943295;    // Math.PI / 180
            const c = Math.cos;
            const a = 0.5 - c((lat2 - lat1) * p)/2 + 
                    c(lat1 * p) * c(lat2 * p) * 
                    (1 - c((lon2 - lon1) * p))/2;

            return 12742000 * Math.asin(Math.sqrt(a)); // 2 * R * 1000; R = 6371000 m
        }


        const diameter = distanceBetween(origin, destination)
        const center = new Position((origin.latitude + destination.latitude)/2, (origin.longitude + destination.longitude)/2)
        let nearLocals = dataset.locals.filter( l => distanceBetween(center, l.toPosition()) <= diameter/2 + distance )

        if (nearLocals.length <= quantity){
            return nearLocals
        } else {
            const directRoute = await DirectionsService.getRoute([{origin, destination}, null, transportMode])
            function distanceToRoute(point: Position, route: Route){
                return Math.min(...route.coordinates.map(c => distanceBetween(point, c)))
            }
            return nearLocals
                        .sort( (a, b) => distanceToRoute(a.toPosition(), directRoute) - distanceToRoute(b.toPosition(), directRoute))
                        .slice(0, quantity)
        }
    }

    static async getRouteWithWaypoints({ origin, destination, waypoints, type, transportMode = 'driving', distance = 100 }){

        if (waypoints != null && !Array.isArray(waypoints) || waypoints.length <= 0 || waypoints.length > 23){
            throw new Error(`Invalid waypoints object: ${waypoints}`, Error.types.WRONG_PARAMETERS)
        }
        const points = [origin, ...waypoints, destination]
        const coords = points.map(p => p.longitude + ',' + p.latitude).join(';')
        const radiuses = points.map(p => distance).join(';')
        
        const uri = `http://router.project-osrm.org/trip/v1/${transportMode}/${coords}?source=first&destination=last&radiuses=${radiuses}&geometries=geojson&roundtrip=false`

        const routeResponse = await fetch(uri)
        const route = await routeResponse.json()
        
        if (route.message != null){
            throw new Error(`Could not retrieve route from ${origin} to any destination: ${route.message}`, Error.types.ROUTE_NOT_FOUND)
        }

        return new Route(route, type, true)
    }
}