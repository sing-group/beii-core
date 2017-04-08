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
const { accessToken: aT } = Config

import {Position} from '../location'

export default class GeocodingService {

  static search(
                  query,
                  callback,
                  {
                    endpoint = 'https://api.tiles.mapbox.com',
                    source = 'mapbox.places',
                    accessToken = aT,
                    proximity = '',
                    bbox = '',
                    types = '',
                  } = {}
                ) {
    const searchTime = new Date();
    const uri = endpoint + '/geocoding/v5/' +
      source + '/' + encodeURIComponent(query) + '.json' +
      '?access_token=' + accessToken +
      (proximity ? '&proximity=' + proximity : '') +
      (bbox ? '&bbox=' + bbox : '') +
      (types ? '&types=' + encodeURIComponent(types) : '');

    async function doSearch(uri){
      const response = await fetch(uri)
      return await response.json()
    }

    doSearch(uri)
      .then( body => callback(body, searchTime))
      .catch( e => console.log(e))
  }

  static getPosition(result){
    return new Position(result.center[1], result.center[0])
  }
}