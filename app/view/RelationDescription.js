/*
* @name RelationDescription
* @version 1.0
*
* Tweamy.view.RelationDescription
*
* Copyright (c) 2013 Wizin
*
* @description <p></p>
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

Ext.define('Tweamy.view.RelationDescription', {
	extend: 'Ext.Panel',
	
	xtype: 'relationDescription',
	
	config: {
	    modal: true,
	    hideOnMaskTap: true,
	    centered: true,
		width: 700,
		height: 650,
		autoDestroy: true,
		
		behavourDescription: '',
		
        items: [
	        {
	            xtype: 'fieldset',
                id: 'fieldsetBehavourWith',
				title: 'Kenmerk van de relatie met',
				height: 90,
				
				items: [
					{
	                    xtype: 'list',
						disableSelection: true,
						store: 'TeamMemberRelStore',
						
	                    height: '2.3em',
	                    itemTpl: [
	                        '<div class=\'teamMember-wrapper\'>',
	                        '    <img  src=\'{photo_data}\'/>',
	                        '    <h2>{surname} {lastname}</h2>',
	                        '</div>'
	                    ]
					}
				]
	        },

			{
				xtype: 'container',
				id: 'descriptionWith',
				scrollable: true,
				height: 200,
				html: '<div class="stretch-container"><div id="stretch-offset"><ul><li>'+ '' +'</li></ul></div></div>'
			},
	
	        {
	            xtype: 'fieldset',
				id: 'fieldsetBehavourFrom',
				title: 'Kenmerk van de relatie vanuit ' + userProfile.surname + ' ' + userProfile.lastname,
				height: 90,

				items: [
					{
	                    xtype: 'list',
						disableSelection: true,
						store: 'relationFromStore',

	                    height: '2.3em',
	                    itemTpl: [
	                        '<div class=\'teamMember-wrapper\'>',
	                        '    <img  src=\'{photo}\'/>',
	                        '    <h2>{surName} {lastName}</h2>',
	                        '</div>'
	                    ]
					}
				]
	        },
			{
				xtype: 'container',
				scrollable: true,
				height: 200,
				html: '<div class=\'stretch-container\'><div id=\'stretch-offset\'><ul><li>Nog niet gedefinieerd.</li></ul></div></div>'
			},
		]
	},
	
	applyBehavourDescription: function (d) {
		return d;
	},
	
	initialize: function () {
        
        var store = Ext.data.StoreManager.lookup('TeamMemberRelStore');
            surname = store.getAt(0).getData().surname,
            lastname = store.getAt(0).getData().lastname;
            
		// Behavour description with a member 
		var cont = this.query('#descriptionWith')[0];
		
		cont.setHtml('<div class="stretch-container"><div id="stretch-offset"><ul><li>'+ this.getBehavourDescription() +'</li></ul></div></div>');
		
		cont = this.query('#fieldsetBehavourFrom')[0];
		cont.setTitle('Kenmerk van de relatie van ' + surname + ' ' + lastname + ' met ');
		
        cont = this.query('#fieldsetBehavourWith')[0];
		cont.setTitle('Kenmerk van de relatie van ' + userProfile.surname + ' ' + userProfile.lastname + ' met ');
	}
});