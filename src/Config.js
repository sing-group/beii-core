/**
 *    This file is part of BEII
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

export default class Config {

/** The used access token must have, at least, the following scopes:
 * styles:tiles
 * styles:read
 * fonts:read
 * datasets:read
 * datasets:list
 * 
 * More info here: https://www.mapbox.com/api-documentation/#access-tokens
 */
 static accessToken = ''
 static mapboxStudioUsername = ''
}
