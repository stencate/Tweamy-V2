/*
	Tweamy.view.Help

	Description: 

	Version: "1.0", Build: "0"
	Date: august 2013

	Design & Development: Triple M IT
	by Stefan ten Cate

*/

Ext.define('Tweamy.view.Help', {
	extend: 'Ext.Panel',
	xtype: 'help',
	
	config: {
		
        fullscreen: true,
		id: 'helpId',
 	   	cls: 'detailed',
		layout: 'default',
        items: [
			{
                xtype: 'toolbar',
				id: 'helpToolbarId',
                docked: 'top',
                title: 'Help'
            },
			{
				xtype: 'container',
				scrollable: true,
				height: '100%',
				html: '<div class=\'stretch-container\'><div id=\'stretch-offset\'><ul><li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li><li>Cras posuere dolor id lorem suscipit adipiscing. Donec feugiat volutpat tincidunt. Praesent porta lectus est, vel vestibulum velit congue sit amet. Nunc ante dolor, hendrerit vitae ultrices in, imperdiet a eros. Duis augue massa, rutrum at aliquet ac, euismod sed erat. Suspendisse sed tincidunt eros. Donec venenatis justo libero, id aliquet neque venenatis sed. Quisque cursus ut tortor laoreet porta. Interdum et malesuada fames ac ante ipsum primis in faucibus. In sollicitudin, odio at fringilla tempor, leo lectus adipiscing lacus, sit amet consequat tortor tellus eget orci. Morbi sollicitudin elit at pulvinar ultrices.  Aliquam ac fringilla tellus. Aliquam nibh nibh, rhoncus in ligula eu, feugiat consectetur purus.</li><li>Morbi mattis augue volutpat ipsum condimentum, sit amet fringilla neque vehicula. Nulla rutrum mauris ac elit lacinia dictum. Sed lacinia at augue at hendrerit. Quisque ac nunc at massa semper aliquam sit amet quis augue. Nunc pellentesque malesuada quam, a ultricies erat sodales vitae. Sed pulvinar odio purus, vel posuere mauris ultrices eu. Morbi feugiat ornare sodales. Pellentesque pulvinar feugiat turpis et pretium. Curabitur quis leo neque. Ut gravida iaculis aliquet. Nam imperdiet sodales accumsan. Quisque lacinia felis nisi, in gravida nunc laoreet quis. Nullam sit amet pretium dui, id posuere nisi.</li></ul></div></div>'
			}
		]
	}
});