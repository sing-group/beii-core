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

import {Local} from './'
import {Position} from '../location'
import moment from 'moment'

export default class Dataset {
    
    id: string = "";
    locals: Local[] = []
    name: string = ""
    description: string = "";
    boundingBox: number[] = []

    constructor (id: string, locals: Local[], name: string, boundingBox: number[], desc: string = ''){
        this.id = id
        this.locals = locals
        this.name = name
        this.boundingBox = boundingBox
        this.description = desc
    }

    contains(position: Position){
        return (
            position.latitude > this.boundingBox[1] &&
            position.latitude < this.boundingBox[3] &&
            position.longitude > this.boundingBox[0] &&
            position.longitude < this.boundingBox[2]
        )
    }

    filterByOpen(time = moment()){
        return new Dataset(this.id+'-OPEN', this.locals.filter( l => l.isOpenAt(time)), this.name, this.boundingBox, this.description)
    }

    getLocal(id){
        return this.locals.find( l => l.id === id )
    }
}