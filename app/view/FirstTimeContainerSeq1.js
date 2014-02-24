/*
* @name FirstTimeContainerSeq1
* @version 1.0
*
* Tweamy.view.FirstTimeContainerSeq1
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

Ext.define('Tweamy.view.FirstTimeContainerSeq1', {
    extend: 'Ext.Panel',
	alias: ['widget.firstTimeContainerSeq1'],
	
    xtype: 'firstTimeContainerSeq1',

	config: {
		height: '100%',
		width: '100%',
		
		items: [
			{
				xtype: 'panel',
				
				height: '30%',
				html: '<div class=\'stretch-container\'><div id=\'stretch-offset\'><h1>Welkom bij Tweamy</h1><ul><li>Tweamy een applicatie die wordt gebruikt in teamverband om gedragsmatig inzicht te krijgen in een team, feedback te vragen en hierdoor het team als geheel en teamleden individueel effectiever te laten samenwerken.</li></ul></div></div>'	
			},
			{
				xtype: 'panel',
				
				height: '55%',
				html: '<div class=\'stretch-container\'><div id=\'stretch-offset\'><h2>Algemene voorwaarden</h2><ul><li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras posuere dolor id lorem suscipit adipiscing. Donec feugiat volutpat tincidunt. Praesent porta lectus est, vel vestibulum velit congue sit amet. Nunc ante dolor, hendrerit vitae ultrices in, imperdiet a eros. Duis augue massa, rutrum at aliquet ac, euismod sed erat. Suspendisse sed tincidunt eros. Donec venenatis justo libero, id aliquet neque venenatis sed. Quisque cursus ut tortor laoreet porta. Interdum et malesuada fames ac ante ipsum primis in faucibus. In sollicitudin, odio at fringilla tempor, leo lectus adipiscing lacus, sit amet consequat tortor tellus eget orci. Morbi sollicitudin elit at pulvinar ultrices.  Aliquam ac fringilla tellus. Aliquam nibh nibh, rhoncus in ligula eu, feugiat consectetur purus.</li><li>Morbi mattis augue volutpat ipsum condimentum, sit amet fringilla neque vehicula. Nulla rutrum mauris ac elit lacinia dictum. Sed lacinia at augue at hendrerit. Quisque ac nunc at massa semper aliquam sit amet quis augue. Nunc pellentesque malesuada quam, a ultricies erat sodales vitae. Sed pulvinar odio purus, vel posuere mauris ultrices eu. Morbi feugiat ornare sodales. Pellentesque pulvinar feugiat turpis et pretium. Curabitur quis leo neque. Ut gravida iaculis aliquet. Nam imperdiet sodales accumsan. Quisque lacinia felis nisi, in gravida nunc laoreet quis. Nullam sit amet pretium dui, id posuere nisi.</li></ul></div></div>',	
			},
            {
                xtype: 'panel',
				width: '95%',
				height: '15%',
                items: [
                    {
                        xtype: 'segmentedbutton',
						height: '2em',
						
                        centered: false,
                        docked: 'right',
                        id: 'segButtonTermsId',
                        width: 240,
                        items: [
                            {
                                xtype: 'button',
                                id: 'declinedId',
                                text: 'Niet akkoord',
								
								width: 120
                            },
                            {
                                xtype: 'button',
                                id: 'termsAcceptedId',
                                text: 'Akkoord',
								
								width: 120
                            }
                        ]
                    }
                ]
            }
		]
	}
});