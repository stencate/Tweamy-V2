/*
* @name SettingsPanel
* @version 1.0
*
* Tweamy.view.SettingsPanel
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

Ext.define('Tweamy.view.SettingsPanel', {
	extend: 'Ext.Panel',
	xtype: 'settingsPanel',
	
	requires: [
		'Ext.field.Toggle'
	],
	
	config: {
		
        fullscreen: true,
		id: 'settingsPanelId',
 	   	cls: 'detailed',
		layout: 'default',
		height: '100%',
        items: [
			{
                xtype: 'toolbar',
				id: 'settingsPanelToolbarId',
                docked: 'top',
                title: 'Instellingen'
            },
			{
                xtype: 'fieldset',
                margin: '0em 2em 2em 2em',
				//style: 'background-color: red',
                title: 'Mobiel netwerk',
				height: 150,
				
                items: [
                    {
                        xtype: 'togglefield',
                        id: 'mayUseCelNetworkId',
                        itemId: 'mytogglefield1',
						styleHtmlContent: true,
                        label: 'Mobiel data toestaan',
                        labelWidth: '75%',
                        value: 1
                    },
                    {
                        xtype: 'label',
                        html: '<div class="extraTermsLbl">Schakel mobiele data uit om alleen Wi-Fi te gebruiken voor dataverkeer, zoals e-mail of het versturen en ontvangen van gegevens over het mobiele netwerk.</div>',
					}
                ]
			},
			{
                xtype: 'fieldset',
                margin: '0em 2em 2em 2em',
				//style: 'background-color: red',
                title: 'Inloggen',
				height: 150,
				
                items: [
	                {
	                    xtype: 'togglefield',
	                    id: 'autoInlogId',
	                    styleHtmlContent: true,
	                    label: 'Automatisch inloggen toestaan',
	                    labelWidth: '75%',
	                    value: 1
	                },
	                {
	                    xtype: 'label',
	                    html: '<div class="extraTermsLbl">Met automatisch inloggen geeft u toestemming om uw gebruikersgegevens lokaal te bewaren, zodat u de inlog gegevens bij het opstarten niet elke keer opnieuw hoeft op te geven.</div>',
	                }
				]
			}
			
		]
	}
});