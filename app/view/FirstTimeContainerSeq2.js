/*
* @name FirstTimeContainerSeq2
* @version 1.0
*
* Tweamy.view.FirstTimeContainerSeq2
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

Ext.define('Tweamy.view.FirstTimeContainerSeq2', {
    extend: 'Ext.Panel',
	alias: ['widget.firstTimeContainerSeq2'],
	
    xtype: 'firstTimeContainerSeq2',

    config: {
       
        items: [
            {
				xtype: 'panel',
				height: '65%',
				
				items: [
					{
						html: '<div class=\'stretch-container\'><div id=\'stretch-offset\'><h2>Algemene voorwaarden</h2><ul><li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras posuere dolor id lorem suscipit adipiscing. Donec feugiat volutpat tincidunt. Praesent porta lectus est, vel vestibulum velit congue sit amet. Nunc ante dolor, hendrerit vitae ultrices in, imperdiet a eros. Duis augue massa, rutrum at aliquet ac, euismod sed erat. Suspendisse sed tincidunt eros. Donec venenatis justo libero, id aliquet neque venenatis sed. Quisque cursus ut tortor laoreet porta. Interdum et malesuada fames ac ante ipsum primis in faucibus. In sollicitudin, odio at fringilla tempor, leo lectus adipiscing lacus, sit amet consequat tortor tellus eget orci. Morbi sollicitudin elit at pulvinar ultrices.  Aliquam ac fringilla tellus. Aliquam nibh nibh, rhoncus in ligula eu, feugiat consectetur purus.</li><li>Morbi mattis augue volutpat ipsum condimentum, sit amet fringilla neque vehicula. Nulla rutrum mauris ac elit lacinia dictum. Sed lacinia at augue at hendrerit. Quisque ac nunc at massa semper aliquam sit amet quis augue. Nunc pellentesque malesuada quam, a ultricies erat sodales vitae. Sed pulvinar odio purus, vel posuere mauris ultrices eu. Morbi feugiat ornare sodales. Pellentesque pulvinar feugiat turpis et pretium. Curabitur quis leo neque. Ut gravida iaculis aliquet. Nam imperdiet sodales accumsan. Quisque lacinia felis nisi, in gravida nunc laoreet quis. Nullam sit amet pretium dui, id posuere nisi.</li></ul></div></div>',	
					}
				]				
            },
            {
				xtype: 'panel',
				height: '30%',
				id: 'extraTermsId',
				items: [
					{
		                xtype: 'fieldset',
		                margin: '0em 2em 2em 2em',
						//style: 'background-color: red',
		                //title: 'Mobiel netwerk',
						height: 140,
						
		                items: [
		                    {
		                        xtype: 'togglefield',
		                        id: 'mayUseCelNetworkId',
		                        itemId: 'mytogglefield1',
		                        label: 'Mobiel data toestaan',
		                        labelWidth: '75%',
		                        value: 1
		                    },
		                    {
		                        xtype: 'label',
		                        html: '<div class="extraTermsLbl">Schakel mobiele data uit om alleen Wi-Fi te gebruiken voor dataverkeer, zoals e-mail of het versturen en ontvangen van gegevens over het mobiele netwerk.</div>',
		                    	height: 10
							},
                            {
                                xtype: 'togglefield',
                                id: 'autoInlogId',
                                //styleHtmlContent: true,
                                label: 'Automatisch inloggen toestaan',
                                labelWidth: '75%',
                                value: 1
                            },
//                            {
//                                xtype: 'label',
//                                html: '<div class="extraTermsLbl">Met automatisch inloggen geeft u toestemming om uw gebruikersgegevens lokaal te bewaren, zodat u de inlog gegevens bij het opstarten niet elke keer opnieuw hoeft op te geven.</div>',
//                            }
		                ]
					},
		            {
		                xtype: 'container',
		                margin: '0em 2em 2em 2em',
		                items: [
		                    {
		                        xtype: 'segmentedbutton',
		                        centered: false,
		                        docked: 'right',
		                        id: 'segButtonTermsId',
		                        width: 300,
		                        items: [
		                            {
		                                xtype: 'button',
		                                id: 'declinedId',
		                                text: 'Niet akkoord',
										ui: 'plain',
										width: 150
		                            },
		                            {
		                                xtype: 'button',
		                                id: 'termsAcceptedId',
		                                text: 'Akkoord',
										ui: 'plain',
										width: 150
		                            }
		                        ]
		                    }
		                ]
		            }
				]
            }
			
/*           {
                xtype: 'container',
                flex: 0.6,
                layout: {
                    type: 'hbox'
                },
                items: [
                    {
                        xtype: 'fieldset',
                        flex: 0.8,
                        margin: '0em 2em 2em 2em',
                        title: 'Mobiel netwerk',
                        items: [
                            {
                                xtype: 'togglefield',
                                id: 'mayUseCelNetworkId',
                                itemId: 'mytogglefield1',
                                styleHtmlContent: true,
                                clearIcon: false,
                                label: 'Mobiel data toestaan',
                                labelWidth: '75%',
                                value: 1
                            },
                            {
                                xtype: 'label',
                                html: '<span>Schakel mobiele data uit om alleen Wi-Fi te gebruiken voor dataverkeer, zoals e-mail of het versturen en ontvangen van gegevens over het mobiele netwerk.</span>',
                                style: 'font-size: 0.9em',
                                styleHtmlContent: true
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        flex: 1,
                        margin: '0em 2em 2em 2em',
                        title: 'Toegang',
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
                                html: '<span>Met automatisch inloggen geeft u toestemming om uw gebruikersgegevens lokaal te bewaren, zodat u de inlog gegevens bij het opstarten niet elke keer opnieuw hoeft op te geven.</span>',
                                style: 'font-size: 0.9em',
                                styleHtmlContent: true
                            }
                        ]
                    }
                ]
            },
            {
                xtype: 'container',
                margin: '0em 2em 2em 2em',
                items: [
                    {
                        xtype: 'segmentedbutton',
                        centered: false,
                        docked: 'right',
                        id: 'segButtonTermsId',
                        width: 300,
                        items: [
                            {
                                xtype: 'button',
                                flex: 1,
                                id: 'declinedId',
                                text: 'Niet akkoord'
                            },
                            {
                                xtype: 'button',
                                flex: 1,
                                id: 'termsAcceptedId',
                                text: 'Akkoord'
                            }
                        ]
                    }
                ]
            } */
        ]
    }

});