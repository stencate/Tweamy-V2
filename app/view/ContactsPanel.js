/*
* @name ImageGallery
* @version 1.0
*
* Tweamy.view.ImageGallery
*
* Copyright (c) 2013 Wizin
*
* @description <p>Member (user) graphical representation</p>
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

Ext.define('Tweamy.view.ContactsPanel', {
    extend: 'Ext.Panel',
	alias: ['widget.contactsPanel'],
	
    xtype: 'contactsPanel',

	requires: [
		'Ext.device.Contacts'
	],
	
    config: {
		
	    modal: true,
	    hideOnMaskTap: true,
	    centered: true,
		width: 600,
		height: 300,
		autoDestroy: true,
		
		items: [
			{
	            xtype: 'toolbar',
				id: 'imageGalleryToolbarlId',
                docked: 'top',
				title: 'Beschikbare contacten'
			},
			{
	            xtype: 'list',
				height: 300,
	            itemTpl: '{first} {last}',
	            store: {
	                fields: ['first', 'last'],
	                data: //Ext.device.Contacts.getContacts()
					[
		                {
		                    first: 'Robert',
		                    last: 'Dougan',
		                    emails: {
		                        work: 'rob@sencha.com'
		                    }
		                },
		                {
		                    first: 'Jamie',
		                    last: 'Avins',
		                    emails: {
		                        work: 'jamie@sencha.com'
		                    }
		                }
		            ]
	            }
            }
		]
    },
	
	initialize: function () {
		this.callParent();
		
	}
});