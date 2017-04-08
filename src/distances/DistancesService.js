/*
 *    This file is part of BEII
 *    Copyright (C) 2017  Pablo González Suárez, Miguel Reboiro Jato and Pablo Vega Villaamil
 *
 *    BEII is free software: you can redistribute it and/or modify
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

import Error from '../Error'

export default class DistancesService {

    static async orderByDuration([position, destinations, transportMode]) {
        if (destinations == null || destinations.length <= 1) {
            throw new Error('At least one destination is required.', Error.types.WRONG_PARAMETERS)
        }
        
        destinations.unshift(position)
        const queryCoords = destinations.map(d => d.longitude +','+ d.latitude).join(';')

        const response = await fetch(`http://router.project-osrm.org/table/v1/${transportMode}/${queryCoords}?sources=0`)
        const distances = await response.json()
        if (distances.code !== 'Ok'){
            throw new Error(`Could not retrieve distances matrix. Error code: ${distances.code}`, Error.types.DISTANCES_NOT_CALCULATED)
        }
        
        const orderedDests = distances
                            .destinations
                            .map((v, i, a) => {
                                return {
                                    latitude: v.location[1],
                                    longitude: v.location[0],
                                    // latitude: coords[i].latitude,
                                    // latitude: coords[i].longitude,
                                    distance: distances.durations[0][i]
                                }
                            })
                            .sort( (a,b) => { return a.distance - b.distance })

        return orderedDests
    }
}