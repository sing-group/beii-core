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

import { 
    accessToken,
    mapboxStudioUsername
} from '../config'

import GeoJSON from 'geojson'

import {Dataset, Local} from './'
import LocationService, {Position} from '../location'

import Error from '../Error'

export default class DatasetService {

    static datasets: Dataset[] = []

    static async getDataset(datasetId): Promise<Dataset>|Dataset{
        if (datasetId == null){
            const userPosition = await LocationService.getLocation()
            const currentDataset = DatasetService.datasets.find(d => d.contains(userPosition))
            if (currentDataset == null){
                throw new Error("There are no available locals in your area.", Error.types.DATASET_NOT_FOUND)
            }
            return currentDataset
        }
        let dataset = DatasetService.datasets.find( d => d.id === datasetId)
        if (dataset != null){
            return dataset
        }

        const r = await fetch(`https://api.mapbox.com/datasets/v1/${mapboxStudioUsername}/${datasetId}?access_token=${accessToken}`)
        const datasetInfo = await r.json()
        if (datasetInfo.message != null){
            throw new Error('Could not retrieve dataset: ' + datasetInfo.message, Error.types.DATASET_NOT_FOUND)
        }
        const datasetBoundingBox = datasetInfo.bounds
        const datasetName = datasetInfo.name

        const response = await fetch(`https://api.mapbox.com/datasets/v1/${mapboxStudioUsername}/${datasetId}/features?access_token=${accessToken}`)
        const featuresCollection = await response.json()
        if (featuresCollection.message != null){
            throw new Error('Could not retrieve dataset: ' + featuresCollection.message, Error.types.DATASET_NOT_FOUND)
        }
        
        const locals = featuresCollection.features.map( (v, i, a) => {
            return new Local(v.geometry.coordinates[1],
                             v.geometry.coordinates[0],
                             v.properties.name,
                             v.properties.description,
                             v.properties.schedule,
                             v.properties.address,
                             v.id)
        })
        dataset = new Dataset(datasetId, locals, datasetName, datasetBoundingBox)
        let foundDataset = null
        if (foundDataset = DatasetService.datasets.find( d => d.id === datasetId)){
            return foundDataset
        } else {
            DatasetService.datasets.push(dataset)
            return dataset
        }
    }

    static async getDatasets(): Promise<Dataset[]>|Dataset[]{
        const r = await fetch(`https://api.mapbox.com/datasets/v1/${mapboxStudioUsername}?access_token=${accessToken}`)
        const datasetList = await r.json()
        if (datasetList.message != null){
            console.log("aqui",datasetList)
            throw new Error('Could not retrieve the list of datasets: ' + datasetList.message, Error.types.GENERAL)
        }

        return Promise.all(datasetList.map(dataset => DatasetService.getDataset(dataset.id)))
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

        function getRandomSchedule() {
            const op = Math.floor(Math.random() * 4)
            switch (op) {
                case 0:
                    return "15:00-3:00"
                case 1:
                    return "9:00-21:00"
                case 2:
                    return [
                        null,
                        "9:00-15:00",
                        "10:30-22:00",
                        "10:30-22:00",
                        "10:30-22:00",
                        "9:00-18:00",
                        null,
                    ]
                case 3:
                    return [
                        "11:15-18:00",
                        "10:00-20:00",
                        "10:00-20:00",
                        "10:00-20:00",
                        "10:00-20:00",
                        "14:00-00:00",
                        "12:00-21:30",
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

DatasetService.getDatasets()