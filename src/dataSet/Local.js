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

import {Position} from '../location'

export default class Local {

    latitude: number = 0
    longitude: number = 0
    name: string = ""
    description: string = ""
    schedule: string|string[] = ""
    address: string = ""
    id: string = ""

    constructor(lat: number, lon: number, name: string, desc: string, sch: string|string[], addr: string, id: string){
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

    isOpenAt(date = moment()): boolean {
        const schedule = this.getOpenHoursAt(date)

        if(schedule == null){
            return false
        }

        const openingTime = this.getOpeningTime(schedule, date)
        const closingTime = this.getClosingTime(schedule, date)

        let boundary = date.clone().hours(6).minutes(0)
        if (date.isAfter(boundary)){
            if (closingTime.isBefore(openingTime)){
                closingTime.add(1, 'days')
            }
        } else {
            if (closingTime.isBefore(openingTime)){
                openingTime.subtract(1, 'days')
            }
        }

        return date.isBetween(openingTime, closingTime, null, '[]')
    }

    getOpenHoursAt(date = moment()): string {
        if (Array.isArray(this.schedule)){
            let boundary = date.clone().hours(6).minutes(0)
            if (date.isAfter(boundary)){
                return this.schedule[date.weekday()]
            } else {
                return this.schedule[boundary.subtract(1, 'days').weekday()]
            }
        } else {
            return this.schedule
        }
    }

    getUsualHours(): string {
        if (Array.isArray(this.schedule)){
            return null
        } else {
            return this.schedule
        }
    }
    
    getOpeningTime(schedule: string, date = moment()){
        const opening = moment(schedule.split('-')[0], 'HH:mm')
        return date.hours(opening.hours()).minutes(opening.minutes())
    }
    
    getClosingTime(schedule: string, date = moment()){
        const closing = moment(schedule.split('-')[1], 'HH:mm')
        return date.hours(closing.hours()).minutes(closing.minutes())
    }
}