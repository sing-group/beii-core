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

/**
 * Schedule shape
 *
 * start: date when this schedule takes effect (inclusive)
 * end: date when this schedule stops taking effect (inclusive)
 *
 * Week-lenght schedule
 * week = [
 *  x7 day-lenght schedule
 *  [
 *      [ openingTime, closingTime ], Single period within a day
 *      ...
 *  ],
 *  ...
 * ]
 */

export default class Schedule {

    name = ''
    start = null
    end = null

    schedule = [
        [],
        [],
        [],
        [],
        [],
        [],
        [],
    ]
    
    constructor(start, end, week, name = ''){
        this.name = name
        if(typeof start === 'string'){
            this.start = moment(start)
        } else {
            this.start = start
        }
        if(typeof end === 'string'){
            this.end = moment(end)
        } else {
            this.end = end
        }

        if (
            !Array.isArray(week)
            || week.length !== 7
        ){
            throw new Error('Invalid week, cannot create the schedule')
        }
        this.week = week
    }

    get week () {
        return this.schedule
    }

    set week (week) {
        return this.schedule = week
    }

    isMainSchedule(){
        return this.end == null
    }

    getDay(day){
        return this.week[day]
    }

    takesEffectAt(date = moment()){
        return date.isBetween(this.start, this.end, null, '[]')
    }

    isOpenAt(date = moment()){
        if (!this.takesEffectAt(date)){
            return false
        }

        const askedDay = this.getDay(date.weekday())

        if( askedDay.length === 0 ){
            return false
        }

        function openClosePairContains([opening, closing], date = moment()){
            const newDate = moment(date.format('HH:mm'), 'HH:mm')
            const openingTime = moment(opening, 'HH:mm')
            const closingTime = moment(closing, 'HH:mm')

            return date.isBetween(openingTime, closingTime, 'minutes', '[]')
        }

        return askedDay.some(openClosePair => openClosePairContains(openClosePair, date))
    }

    isDifferentEachDay(){
        return !this.week
                        .filter(day => day.length > 0)
                        .every((day, i, days) => i == 0 || i !== 0 && JSON.stringify(day) === JSON.stringify(days[0]))
    }

    clone(){
        const clonedStart = (this.start != null)? this.start.clone(): null
        const clonedEnd = (this.end != null)? this.end.clone(): null
        return new Schedule(clonedStart, clonedEnd, JSON.parse(JSON.stringify(this.week)), this.name)
    }

    static getClosedSchedule(){
        return new Schedule(moment().subtract(10, 'year'), moment().add(10, 'year'), [[],[],[],[],[],[],[]])
    }
}