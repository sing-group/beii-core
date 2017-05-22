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

import Config from '../Config'

import GeoJSON from 'geojson'
import moment from 'moment'

import {Dataset, Local, ComplexSchedule, Schedule, ExceptionalDay} from './'
import LocationService, {Position} from '../location'

import Error from '../Error'

export default class DatasetService {

    static datasets= []

    static async getDataset(datasetId, forceUpdate = false){
        if (datasetId == null){
            const userPosition = await LocationService.getLocation()
            const currentDataset = DatasetService.datasets.find(d => d.contains(userPosition))
            if (currentDataset == null){
                throw new Error("There are no available locals in your area.", Error.types.DATASET_NOT_FOUND)
            }
            if (forceUpdate){
                datasetId = currentDataset.id
            } else {
                return currentDataset
            }
        }
        let dataset = DatasetService.datasets.find( d => d.id === datasetId)
        if (dataset != null && !forceUpdate){
            return dataset
        }

        const r = await fetch(`https://api.mapbox.com/datasets/v1/${Config.mapboxStudioUsername}/${datasetId}?access_token=${Config.accessToken}`)
        const datasetInfo = await r.json()
        if (datasetInfo.message != null){
            throw new Error('Could not retrieve dataset: ' + datasetInfo.message, Error.types.DATASET_NOT_FOUND)
        }
        
        const datasetBoundingBox = datasetInfo.bounds
        const datasetName = datasetInfo.name
        const datasetDesc = datasetInfo.description || ''

        const response = await fetch(`https://api.mapbox.com/datasets/v1/${Config.mapboxStudioUsername}/${datasetId}/features?access_token=${Config.accessToken}`)
        const featuresCollection = await response.json()
        if (featuresCollection.message != null){
            throw new Error('Could not retrieve dataset: ' + featuresCollection.message, Error.types.DATASET_NOT_FOUND)
        }

        const locals = featuresCollection.features.map( (v, i, a) => {
            const schedules = v.properties.schedule.schedules.map(sch => new Schedule(sch.start, sch.end, sch.schedule, sch.name))
            const exceptions = v.properties.schedule.exceptions.map(e => new ExceptionalDay(e.date, e.openRanges, e.name))
            const schedule = new ComplexSchedule(schedules, exceptions)
            return new Local(v.geometry.coordinates[1],
                             v.geometry.coordinates[0],
                             v.properties.name,
                             v.properties.description,
                             schedule,
                             v.properties.address,
                             v.id)
        })
        dataset = new Dataset(datasetId, locals, datasetName, datasetBoundingBox, datasetDesc)
        let foundDataset = null
        if (!forceUpdate && (foundDataset = DatasetService.datasets.find( d => d.id === datasetId))){
            return foundDataset
        } else {
            DatasetService.datasets = DatasetService.datasets.filter(d => d.id !== datasetId)
            DatasetService.datasets.push(dataset)
            return dataset
        }
    }

    static async getDatasets(forceUpdate = false){
        const r = await fetch(`https://api.mapbox.com/datasets/v1/${Config.mapboxStudioUsername}?access_token=${Config.accessToken}`)
        const datasetList = await r.json()
        if (datasetList.message != null){
            throw new Error('Could not retrieve the list of datasets: ' + datasetList.message, Error.types.GENERAL)
        }

        if (forceUpdate){
            DatasetService.datasets = DatasetService.datasets.filter(d => datasetList.some(dd => dd.id === d.id))
        }
        
        return Promise.all(datasetList.map(dataset => DatasetService.getDataset(dataset.id, forceUpdate)))
    }

    static getBoundingBox(){
        if (DatasetService.datasets.length == 1){
            return DatasetService.datasets[0].boundingBox
        }
        return []
    }

    static generateDataset(size=200,
                    latBounds = [42.31502240670423, 42.363907964820044],
                    lonBounds = [-7.896790525191136, -7.832820200505012]) {

        function getRandom(min, max) {
            return Math.random() * (max - min) + min;
        }

        function getRandomDaySchedule(withNull = true) {
            const op = Math.floor(Math.random() * (withNull? 3: 2))
            switch (op) {
                case 0:
                    return [["8:00","13:00"], ["16:00","22:00"]]
                case 1:
                    return [["9:00","21:00"]]
                case 2:
                    return []
            }
        }

        function getRandomWeekSchedule() {
            const op = Math.floor(Math.random() * 10)
            if(op <= 1){
                const sch = getRandomDaySchedule(false)
                return op?
                    [[], [], sch, sch, sch, sch, sch,]
                    : [sch, sch, sch, sch, sch, [], [],]
            }
            return [0,1,2,3,4,5,6].map(day => getRandomDaySchedule())
        }
        
        function getRandomSchedule() {
            const op = Math.floor(Math.random() * 2)
            switch (op) {
                case 0:
                    return [new Schedule(
                                    moment().subtract(1, 'days').startOf('day'),
                                    null,
                                    getRandomWeekSchedule(),
                                    [],
                                    'Default schedule')]
                case 1:
                case 2:
                    const changeOfSch = moment().add(2, 'months').endOf('month')
                    return [
                        new Schedule(
                                moment().subtract(1, 'days').startOf('day'),
                                changeOfSch,
                                getRandomWeekSchedule(),
                                [],
                                'Holidays'),
                        new Schedule(
                                changeOfSch.clone().add(1, 'milliseconds'),
                                null,
                                getRandomWeekSchedule(),
                                [],
                                'Default schedule'),
                    ]
            }
        }

        const locals = []

        for (let i = 0; i < 200; i++) {
            const schedule = getRandomSchedule();

            let description = "";
            if (Math.floor(Math.random() * 2)){
                description = "This is a mock description. This is a mock description. This is a mock description. This is a mock description. This is a mock description."
            }

            const local = new Local(getRandom(latBounds[0], latBounds[1]),
                                  getRandom(lonBounds[0], lonBounds[1]),
                                  'fakeLocal'+i,
                                  description,
                                  schedule,
                                  "address",
                                  i+"")
            locals.push(local)
        }

        const geojson = GeoJSON.parse(locals, {Point: ['latitude', 'longitude'], exclude: ['id']})
        console.log(JSON.stringify(geojson, null, 2))
        return geojson
    }
}