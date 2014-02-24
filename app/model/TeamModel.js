/*
* @name TeamModel
* @version 1.0
*
* Tweamy.model.TeamModel
*
* Copyright (c) 2013 Wizin
*
* @description <p>Team model</p>
*
* Design and Implementation
* 
* @author <a href="mailto:stefan.ten.cate@triplemit.nl">Stefan ten Cate</a>
* @company <a href="http://triplemit.nl">Triple M IT</a>
*
*
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
* 
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/

/**
 *
 *
 */

Ext.define('Tweamy.model.TeamModel', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            {name: 'id_team', 				type: 'int'},
			{name: 'team_name',				type: 'string'},
			{name: 'company_name', 			type: 'string'},
			{name: 'created', 				type: 'string'},	// To be sure to get the exact time stamp from the server
			{name: 'teamreport_requested', 	type: 'string', defaultValue: 'N'},
			{name: 'date_requested', 		type: 'string'},	// To be sure to get the exact time stamp from the server
			{name: 'payment_succeeded', 	type: 'string', defaultValue: 'N'},
			{name: 'initiator',				type: 'string', defaultValue: ''}
        ],
		
//		validations: [
//			{type: 'presence',  field: 'team_name', message: 'Teamnaam is verplicht.', type: 'severe'}
//		]
    }
});