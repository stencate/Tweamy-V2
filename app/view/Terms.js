/*
	Tweamy.view.Terms

	Description: 

	Version: "1.0", Build: "0"
	Date: august 2013

	Design & Development: Triple M IT
	by Stefan ten Cate

*/

Ext.define('Tweamy.view.Terms', {
	extend: 'Ext.Panel',
	xtype: 'terms',
	
	requires: [
		'Ext.field.Toggle'
	],
	
	config: {
		
        fullscreen: true,
		id: 'termsId',
 	   	cls: 'detailed',
		layout: 'default',
		height: '100%',
        items: [
			{
                xtype: 'toolbar',
				id: 'termsToolbarId',
                docked: 'top',
                title: 'Algemene voorwaarden'
            },
			{
				xtype: 'container',
				scrollable: true,
				height: '90%',
				html: '<div class=\'stretch-container\'><div id=\'stretch-offset\'><ul><li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras posuere dolor id lorem suscipit adipiscing. Donec feugiat volutpat tincidunt. Praesent porta lectus est, vel vestibulum velit congue sit amet. Nunc ante dolor, hendrerit vitae ultrices in, imperdiet a eros. Duis augue massa, rutrum at aliquet ac, euismod sed erat. Suspendisse sed tincidunt eros. Donec venenatis justo libero, id aliquet neque venenatis sed. Quisque cursus ut tortor laoreet porta. Interdum et malesuada fames ac ante ipsum primis in faucibus. In sollicitudin, odio at fringilla tempor, leo lectus adipiscing lacus, sit amet consequat tortor tellus eget orci. Morbi sollicitudin elit at pulvinar ultrices.  Aliquam ac fringilla tellus. Aliquam nibh nibh, rhoncus in ligula eu, feugiat consectetur purus.</li><li>Morbi mattis augue volutpat ipsum condimentum, sit amet fringilla neque vehicula. Nulla rutrum mauris ac elit lacinia dictum. Sed lacinia at augue at hendrerit. Quisque ac nunc at massa semper aliquam sit amet quis augue. Nunc pellentesque malesuada quam, a ultricies erat sodales vitae. Sed pulvinar odio purus, vel posuere mauris ultrices eu. Morbi feugiat ornare sodales. Pellentesque pulvinar feugiat turpis et pretium. Curabitur quis leo neque. Ut gravida iaculis aliquet. Nam imperdiet sodales accumsan. Quisque lacinia felis nisi, in gravida nunc laoreet quis. Nullam sit amet pretium dui, id posuere nisi.</li></ul></div></div>'
			},
			{
                xtype: 'container',
                height: '10%',
                modal: false,
                items: [
                    {
                        xtype: 'togglefield',
						docked: 'right',
                        margin: '0.5em 0.5em 0.5em 0em',
                        styleHtmlContent: true,
                        width: '12em',
                        label: 'Geaccepteerd',
                        labelWidth: '60%',
                        value: 1,
                        readOnly: true
                    }
                ]
            }
			
		]
	}
});