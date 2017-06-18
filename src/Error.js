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
        USER_NOT_FOUND: 'USER_NOT_FOUND',
        LIST_USERS_ERROR: 'LIST_USERS_ERROR',
        ACCESS_DENIED: 'ACCESS_DENIED',
        UNEXPECTED_ERROR: 'UNEXPECTED_ERROR',
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
        } else {
            return translations[language][this.type] || ''
        }
    }
}

const translations = {
  en: {
    ROUTE_NOT_FOUND: 'Sorry, no route was found',
    DATASET_NOT_FOUND: 'Region not found',
    DELETION_ERROR: 'An error has occurred while deleting',
    SAVE_DATASET_ERROR: 'Could not save the region',
    SAVE_LOCAL_ERROR: 'Could not save the local',
    USER_NOT_FOUND: 'User not found',
    LIST_USERS_ERROR: 'Could not load the list of users',
    ACCESS_DENIED: 'Access denied',
    UNEXPECTED_ERROR: 'An unexpected error has occurred, check the connection to the Internet',
  },
  es: {
    ROUTE_NOT_FOUND: 'Lo sentimos, no se ha encontrado ninguna ruta',
    DATASET_NOT_FOUND: 'No se encontró la región',
    DELETION_ERROR: 'Se ha producido un error al borrar el elemento',
    SAVE_DATASET_ERROR: 'No se pudo guardar la región',
    SAVE_LOCAL_ERROR: 'No se pudo guardar el local',
    USER_NOT_FOUND: 'No se encontró el usuario',
    LIST_USERS_ERROR: 'No se pudo cargar la lista de usuarios',
    ACCESS_DENIED: 'Acceso denegado',
    UNEXPECTED_ERROR: 'Ha ocurrido un error inesperado, comprueba la conexión a Internet',
  },
  gl: {
    ROUTE_NOT_FOUND: 'Sentímolo, non se atopou ningunha ruta',
    DATASET_NOT_FOUND: 'Non se atopou a rexión',
    DELETION_ERROR: 'Producíuse un erro ao borrar o elemento',
    SAVE_DATASET_ERROR: 'Non se puido gardala rexión',
    SAVE_LOCAL_ERROR: 'Non se puido gardar o local',
    USER_NOT_FOUND: 'Non se atopou o usuario',
    LIST_USERS_ERROR: 'Non se puido cargar a lista de usuarios',
    ACCESS_DENIED: 'Acceso denegado',
    UNEXPECTED_ERROR: 'Ocorreu un erro inesperado, comproba a conexión á Internet',
  }
}