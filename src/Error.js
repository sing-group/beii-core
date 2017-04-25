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

export default class BEIIError {

    static types = {
        GENERAL: 'GENERAL',
        WRONG_PARAMETERS: 'WRONG_PARAMETERS',
        ROUTE_NOT_FOUND: 'ROUTE_NOT_FOUND',
        DATASET_NOT_FOUND: 'DATASET_NOT_FOUND',
        DISTANCES_NOT_CALCULATED: 'DISTANCES_NOT_CALCULATED',
        DELETION_ERROR: 'DELETION_ERROR',
        SAVE_DATASET_ERROR: 'SAVE_DATASET_ERROR',
        SAVE_LOCAL_ERROR: 'SAVE_LOCAL_ERROR',
    }

    type = null
    msg = ""
    stack = null

    constructor(msg = "", type = BEIIError.types.GENERAL){
        this.type = type
        this.msg = msg
        this.stack = (new Error()).stack
    }

    printToUser(language = 'en'){
        if (translations[language] == null) {
            return "No such language: " + language
        }
        switch(this.type){
            case BEII.types.ROUTE_NOT_FOUND: {
                return translations[language]['ROUTE_NOT_FOUND']
            }
            case BEII.types.DELETION_ERROR: {
                return translations[language]['DELETION_ERROR']
            }
            case BEII.types.SAVE_DATASET_ERROR: {
                return translations[language]['SAVE_DATASET_ERROR']
            }
            case BEII.types.SAVE_LOCAL_ERROR: {
                return translations[language]['SAVE_LOCAL_ERROR']
            }
            default: {
                return ""
            }
        }
    }
}

const translations = {
  en: {
    ROUTE_NOT_FOUND: 'Sorry, no route was found',
    DELETION_ERROR: 'An error has occurred',
    SAVE_DATASET_ERROR: 'Could not save the region',
    SAVE_LOCAL_ERROR: 'Could not save the local',
  },
  es: {
    ROUTE_NOT_FOUND: 'Lo sentimos, no se ha encontrado ninguna ruta',
    DELETION_ERROR: 'Ha habido un error',
    SAVE_DATASET_ERROR: 'No se pudo guardar la región',
    SAVE_LOCAL_ERROR: 'No se pudo guardar el local',
  },
  gl: {
    ROUTE_NOT_FOUND: 'Sentímolo, non se atopou ningunha ruta',
    DELETION_ERROR: 'Houbo un erro',
    SAVE_DATASET_ERROR: 'Non se puido gardala rexión',
    SAVE_LOCAL_ERROR: 'Non se puido gardar o local',
  }
}