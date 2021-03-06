/*
 *    This file is part of BEII-core
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

import moment from 'moment'
require('moment/locale/es')

import AnnotationsService, {Annotation} from './annotations'
import DatasetService, {Dataset, Local, ComplexSchedule, Schedule, ExceptionalDay} from './dataSet'
import DirectionsService, {Route} from './directions'
import DistancesService from './distances'
import GeocodingService from './geocoding'
import LocationService, {Location} from './location'
import Error from './Error'
import Config from './Config'

export {AnnotationsService, Annotation}
export {DatasetService, Dataset, Local, ComplexSchedule, Schedule, ExceptionalDay}
export {DirectionsService, Route}
export {DistancesService}
export {GeocodingService}
export {LocationService, Location}
export {Error}
export default Config