/*
* @name TeammemberModel
* @version 1.0
*
* Tweamy.model.TeammemberModel
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
//	        tx.executeSql("CREATE TABLE IF NOT EXISTS teammember (id_teammember INTEGER PRIMARY KEY ASC AUTOINCREMENT, surname TEXT (128), lastname TEXT (128), photo TEXT (128), photo_data BLOB DEFAULT null, phonenumber TEXT (45), email_adress TEXT (128), password TEXT (128), terms_accepted TEXT(1), autologin TEXT(1), may_use_cel TEXT(1), set_image TEXT(1) DEFAULT 'N')");

/**
 *
 *
 */

Ext.define('Tweamy.model.TeammemberModel', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            {name: 'id_teammember', 	type: 'int'},
			{name: 'surname',			type: 'string'},
			{name: 'lastname', 			type: 'string'},
			{name: 'photo', 			type: 'string'},
			{name: 'photo_data', 		type: 'string'},
			{name: 'phonenumber', 		type: 'string'},
			{name: 'email_adress', 		type: 'string'},
			{name: 'password', 			type: 'string'},
			{name: 'terms_accepted', 	type: 'string', defaultValue: 'N'},
			{name: 'autologin', 		type: 'string', defaultValue: 'Y'},
			{name: 'may_use_cel', 		type: 'string', defaultValue: 'Y'},
			{name: 'set_image', 		type: 'string', defaultValue: 'N'},
			{name: 'created', 			type: 'string'}	// To be sure to get the exact date time stamp from the server
        ],
		
//		validations: [
//			{type: 'presence',  field: 'surname', message: 'Voornaam is verplicht.', type: 'severe'},
//			{type: 'presence',  field: 'lastname', message: 'Achternaam is verplicht.', type: 'severe'},
//			{type: 'presence',  field: 'email_adress', message: 'E-mail adres is verplicht.', type: 'severe'},
//			{type: 'format',  field: 'email_adress',
//				matcher: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
//				message: 'Geen correct e-mail adress.', type: 'severe'}
//		]
    }
});