/*
* @name MainController
* @version 1.0
*
* Tweamy.controller.tablet.MainController
*
* Copyright (c) 2013 Wizin
*
* @description <p>Main tablet controller</p>
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

Ext.define('Tweamy.controller.tablet.MainController', {
	extend: 'Ext.app.Controller',
	
	// Private properties used for dragging main
	// @private
	scale: 1.0,
	prevScale: 1.0,
	prevOpacity: 1.0,
	
	requires: [
		'Tweamy.util.Playground',
		'Tweamy.view.tablet.TabletSplitview'
	],
	
	config: {
		views: [
			'Tweamy.view.tablet.Main'
		],
		
		refs: {

		},
		
		control:{
			
		}
	},
	
	/**
	 * 
	 * @function init
	 *	@param None
	 *	@return None
	 *	@public
	 *
	 *	@description <p>Called by the Controller's application to initialize the Controller. 
	 *				 <p>This is always called before the Application launches, giving the Controller a chance to run any pre-launch logic.</p> 
	 *				 <p>See also launch, which is called after the Application's launch function</p>
	 *
	**/
	init: function (){
		console.log("Main controller tablet init");
		
		// Create the canvas
		Ext.create('Ext.Container', {
			fullscreen: true,
			
			id: 'playgroundContainer',
			
			masked: {
               xtype: 'loadmask',
               message: 'Even geduld ....<hr>Het scherm wordt voorbereid.'
            },
			
			items: [
				{
					// Holds the master detail view in this case (Tablet) it will
					// be an iPad like splitview. At first you see only the Master.
			        xtype: 'tabletsplitview',
					id: 'userPanelLeftId',
			        left: 0,
			        height: '100%',
					width: '100%',
					layout: 'fit',
			        
			        zIndex: 1
				},
				{
					xtype: 'panel',	
					id: 'main',
					itemId: 'draggable',
					height: '100%',
					width: '100%',
					
					zIndex: 3,
					scrollable: false,
					draggable: 'vertical',	
						  
					html: "<canvas id='playground'></canvas>",
				}
			]
		});
		
		playground = new Playground({width: screen.width, height: screen.height});
		canvas = playground.init();
	},
	
	launch: function () {
		console.log('Main controller tablet launch');
		

	}
});
