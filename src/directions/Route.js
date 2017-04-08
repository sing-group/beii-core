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

import {Position} from '../location'

export default class Route {

    coordinates: Position[] = null
    type = ""

    constructor(r, type, isTrip = false){
        if (!isTrip){
            this.coordinates = r.routes[0].geometry.coordinates.map( (v, i, a) => {
                return new Position(v[1], v[0])
            })
        } else {
            this.coordinates = r.trips[0].geometry.coordinates.map( (v, i, a) => {
                return new Position(v[1], v[0])
            })
        }
        this.type = type
    }
}