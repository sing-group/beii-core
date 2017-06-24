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

import moment from 'moment'

import {Schedule} from './'
import {Position} from '../location'

export default class Local {

    latitude: number = 0
    longitude: number = 0
    name: string = ""
    description: string = ""
    schedule: Schedule[] = []
    address: string = ""
    id: string = ""

    constructor(lat: number, lon: number, name: string, desc: string, sch: Schedule[], addr: string, id: string){
        this.latitude = lat
        this.longitude = lon
        this.name = name
        this.description = desc
        this.schedule = sch
        this.address = addr
        this.id = id
    }

    toPosition(){
        return new Position(this.latitude, this.longitude)
    }

    getScheduleAt(date = moment()){
        return this.schedule.getScheduleAt(date)
    }

    isOpenAt(date = moment()): boolean {
        const schedule = this.schedule.getScheduleAt(date)

        if(schedule == null){
            return false
        } else {
            return schedule.isOpenAt(date)
        }
    }

    clone(){
        return new Local(this.latitude, this.longitude, this.name, this.description, this.schedule.clone(), this.address, this.id)
    }
}