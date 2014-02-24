/*
* @name AddNewTeam
* @version 1.0
*
* Tweamy.view.AddNewTeam
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

Ext.define('Tweamy.view.AddNewTeam', {
	extend: 'Ext.Panel',
	xtype: 'addNewTeam',
	
	config: {
		
        fullscreen: true,
		id: 'addNewTeamId',
 	   	cls: 'detailed',
		layout: 'default',
        items: [
			{
                xtype: 'toolbar',
				id: 'addNewTeamToolbarId',
                docked: 'top',
                title: 'Nieuw Team',
				
				items: [
					{
	                    xtype: 'button',
	                    id: 'addTeamBtnId',

	                    docked: 'right',
	                	margin: '0.5em 1em 0em 0em',
						ui: 'plain',
	                    text: 'Gereed'
					}
				]
            },
			{
				xtype: 'fieldset',
				width: '95%',
				
                items: [
                    {
                        xtype: 'container',
                        layout: {
                            type: 'hbox'
                        },
                        items: [
                            {
                                xtype: 'image',
                                width: '10%',
                               	html: "<div class= 'imageFontClass'>&#xe650;</div>",
								margin: '0 10 0 10'
                            },
                            {
                                xtype: 'textfield',
                                width: '90 %',
                                id: 'companyNameId',
                                placeHolder: 'Organisatie (optioneel)',
								tabIndex: 1
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        layout: {
                            type: 'hbox'
                        },
                        items: [
                            {
                                xtype: 'image',
                                width: '10%',
                                html: "<div class= 'imageFontClass'>&#xe601;</div>",
								margin: '0 10 0 10'
                            },
                            {
                                xtype: 'textfield',
                                width: '90%',
                                id: 'teamNameId',
                                placeHolder: 'Teamnaam (vereist)',
								tabIndex: 2
                            }
                        ]
                    }
                ]
			}
		]
	}
});