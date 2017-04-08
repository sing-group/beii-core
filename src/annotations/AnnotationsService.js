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

import {Dataset, Local} from '../dataSet'
import {Route} from '../directions'
import {Position} from '../location'

import {Annotation} from './'

import Palette from '../../Palette'

export default class AnnotationsService {

    static sufixes = {
        LOCAL: "_Local",
        ROUTE: "_Route",
        POINT: "_Point",
        DEBUG: "_Debug",
    }

    static localToAnnotation(local: Local) {
        return new Annotation({
            coordinates: [local.latitude, local.longitude],
            type: 'point',
            title: local.name,
            id: local.id + AnnotationsService.sufixes.LOCAL
        })
    }
    
    static localArrayToAnnotation(locals: Local[]) {
        return locals.map( l => AnnotationsService.localToAnnotation(l) )
    }
    
    static datasetToAnnotation(dataset: Dataset) {
        return dataset.locals.map( l => AnnotationsService.localToAnnotation(l) )
    }

    static routeToAnnotation(route: Route) {
        return new Annotation({
        coordinates: route.coordinates.map(pos => [pos.latitude, pos.longitude]),
        type: 'polyline',
        strokeColor: Palette.primary.basic,
        strokeWidth: 4,
        strokeAlpha: .5,
        id: route.type + AnnotationsService.sufixes.ROUTE
      })
    }

    static positionToAnnotation(position: Position) {
        return new Annotation({
            coordinates: [position.latitude, position.longitude],
            type: 'point',
            id: position.latitude + ';' + position.longitude + AnnotationsService.sufixes.POINT
        })
    }

    static debugAnnotation(position, color = Palette.primary.basic){
        return new Annotation({
            coordinates: [
                [position.latitude-0.0001, position.longitude-0.0001],
                [position.latitude+0.0001, position.longitude-0.0001],
                [position.latitude+0.0001, position.longitude+0.0001],
                [position.latitude-0.0001, position.longitude+0.0001],
                [position.latitude-0.0001, position.longitude-0.0001]
                ],
            type: 'polyline',
            fillColor: color,
            strokeColor: color,
            id: position.latitude + ';' + position.longitude + AnnotationsService.sufixes.DEBUG
        })
    }
}