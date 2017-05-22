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
import Schedule from './Schedule'

/**
 * ComplexSchedule shape
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

export default class ComplexSchedule {

    schedules = []
    exceptions = []
    
    constructor(schs, excs){
        this.schedules = schs
        this.exceptions = excs

    }

    getMainSchedule(){
        const mainSchedule = this.schedules
                                    .find((sch) =>
                                            sch.isMainSchedule() == true)
        if (mainSchedule != null){
            return mainSchedule
        } else {
            return null
        }
    }

    getScheduleAt(date = moment(), forceReturnSchedule = true){
        const weekExceptions = this.getExceptionalDaysAtWeekOf(date)
        let schedule = this.schedules
                                .find(sch =>
                                        sch.isMainSchedule() === false && sch.takesEffectAt(date))
        if(schedule == null){
            if (forceReturnSchedule == true){
                schedule = this.getMainSchedule()
            } else {
                return null
            }
        }

        if (schedule == null){
            return Schedule.getClosedSchedule()
        } else {
            const finalSchedule = schedule.clone()

            weekExceptions.forEach(e => finalSchedule.week[e.date.weekday()] = e.openRanges)
            
            return finalSchedule
        }
    }

    getExceptionalDaysAtWeekOf(date = moment()){
        const startOfWeek = date.clone().startOf('week')
        const endOfWeek = date.clone().endOf('week')

        const weekExceptions = this.exceptions.filter(ex => ex.date.isBetween(startOfWeek, endOfWeek, null, '[]'))

        if (weekExceptions != null){
            return weekExceptions
        } else {
            return []
        }
    }

    isOpenAt(date = moment()){

    }

    clone(){
        return new ComplexSchedule(this.schedules.map(sch => sch.clone()), this.exceptions.map(e => e.clone()))
    }

    static openRangeToDates(openRange){
        const [opening, closing] = openRange

        let openingTime = null
        let closingTime = null

        if (opening != null){
          openingTime = moment(opening, 'HH:mm').toDate()
        }
        if (closing != null){
          closingTime = moment(closing, 'HH:mm').toDate()
        }
        return [openingTime, closingTime]
    }
}