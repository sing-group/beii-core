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

import I18n from 'react-native-i18n'

export default class BEIIError {

    static types = {
        GENERAL: 'GENERAL',
        WRONG_PARAMETERS: 'WRONG_PARAMETERS',
        ROUTE_NOT_FOUND: 'ROUTE_NOT_FOUND',
        DATASET_NOT_FOUND: 'DATASET_NOT_FOUND',
        DISTANCES_NOT_CALCULATED: 'DISTANCES_NOT_CALCULATED',
    }

    type = null
    msg = ""
    stack = null

    constructor(msg = "", type = BEIIError.types.GENERAL){
        this.type = type
        this.msg = msg
        this.stack = (new Error()).stack
    }

    printToUser(){
        switch(this.type){
            case BEII.types.ROUTE_NOT_FOUND: {
                return I18n.t('ROUTE_NOT_FOUND')
            }
            default: {
                return ""
            }
        }
    }
}

// Enable fallbacks if you want `en-US` and `en-GB` to fallback to `en`
I18n.fallbacks = true

I18n.translations = {
  en: {
    ...I18n.translations.en,
    ROUTE_NOT_FOUND: 'Sorry, no route was found',
  },
  es: {
    ...I18n.translations.es,
    ROUTE_NOT_FOUND: 'Lo sentimos, no se ha encontrado ninguna ruta',
  },
  gl: {
    ...I18n.translations.gl,
    ROUTE_NOT_FOUND: 'Sentímolo, non se atopou ningunha ruta',
  }
}