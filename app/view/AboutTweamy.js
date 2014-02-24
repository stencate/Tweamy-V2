/*
	Tweamy.view.AboutTweamy

	Description: 

	Version: "1.0", Build: "0"
	Date: august 2013

	Design & Development: Triple M IT
	by Stefan ten Cate

*/

Ext.define('Tweamy.view.AboutTweamy', {
	extend: 'Ext.Panel',
	xtype: 'aboutTweamy',
	
	config: {
		
        fullscreen: true,
		id: 'aboutTweamyId',
 	   	cls: 'detailed',
		layout: 'default',
        items: [
			{
                xtype: 'toolbar',
				id: 'aboutTweamyToolbarId',
                docked: 'top',
                title: 'Over Tweamy'
            },
			{
				xtype: 'container',
				scrollable: true,
				height: '60%',
				html: '<div class=\'stretch-container\'><div id=\'stretch-offset\'>Tweamy een applicatie die wordt gebruikt in teamverband om gedragsmatig inzicht te krijgen in een team, feedback te vragen en hierdoor het team als geheel en teamleden individueel effectiever te laten samenwerken.</div></div>'
			},
			{
				xtype: 'container',
				scrollable: true,
				height: '40%',
				html: '<div class=\'stretch-container\'><div id=\'stretch-offset\'>Copyright 2013 WIZIN<span><br><br>Software en Interface ontwerp<br>Triple M IT<span><br>Stefan ten Cate</div></div>'
			}
		]
	}
});