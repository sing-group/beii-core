/*
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

type AnnotationType = {
    coordinates: number[]|number[][]; // required. For type polyline and polygon must be an array of arrays. For type point, single array with 2 coordinates
    type: 'point'|'polyline'|'polygon'; // required. One of 'point', 'polyline' or 'polygon'
    title?: string; // optional. Title string. Appears when marker pressed
    subtitle?: string; // optional. Subtitle string. Appears when marker pressed
    fillAlpha?: number; // optional. number. Only for type=polygon. Controls the opacity of the polygon
    fillColor?: string; // optional. string. Only for type=polygon. CSS color (#rrggbb). Controls the fill color of the polygon
    strokeAlpha?: number; // optional. number. Only for type=polygon or type=polyline. Controls the opacity of the line
    strokeColor?: string; // optional. string. Only for type=polygon or type=polyline. CSS color (#rrggbb). Controls line color.
    strokeWidth?: number; // optional. number. Only for type=polygon or type=polyline. Controls line width.
    id: string; // required. string. Unique identifier used for adding or selecting an annotation.
    annotationImage?: { // optional. Marker image for type=point
        source: {
            uri: string // required. string. Either remote image URL or the name (without extension) of a bundled image
        };
        height: number; // required. number. Image height
        width: number // required. number. Image width
    };
    rightCalloutAccessory?: { // optional. iOS only. Clickable image that appears when type=point marker pressed
        source: {
            uri: string // required. string. Either remote image URL or the name (without extension) of a bundled image
        };
        height: number; // required. number. Image height
        width: number // required. number. Image width
    }
}

export default class Annotation {

    constructor({ coordinates, type, title, subtitle, fillAlpha, fillColor, strokeAlpha, strokeColor,
                    strokeWidth, id, annotationImage, rightCalloutAccessory }: AnnotationType) {
        this.coordinates = coordinates
        this.type = type
        this.title = title
        this.subtitle = subtitle
        this.fillAlpha = fillAlpha
        this.fillColor = fillColor
        this.strokeAlpha = strokeAlpha
        this.strokeColor = strokeColor
        this.strokeWidth = strokeWidth
        this.id = id
        this.annotationImage = annotationImage
        this.rightCalloutAccessory = rightCalloutAccessory
    }
}