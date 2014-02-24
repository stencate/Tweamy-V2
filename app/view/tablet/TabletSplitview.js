/*
	Tweamy.view.tablet.TabletSplitview

	Description: 

	Version: "1.0", Build: "0"
	Date: august 2013

	Design & Development: Triple M IT
	by Stefan ten Cate

*/

Ext.define('Tweamy.view.tablet.TabletSplitview', {
	extend: 'Ext.Panel',
	alias: ['widget.tabletsplitview'],
	xtype: 'tabletsplitview',
	
	requires: [
		'Tweamy.view.UserProfile',
		'Tweamy.view.DetailedTeamMemberInfo',
		'Tweamy.view.AddNewTeam',
		'Tweamy.view.TeamMembersList',
		'Tweamy.view.AboutTweamy',
		'Tweamy.view.SettingsPanel',
		'Tweamy.view.Help',
		'Tweamy.view.Terms',
		'Ext.Img'
	],
	
	config: {
		
		id: 'masterDetailContainerId',
		
		items:[
			{
				// Master
				id: 'masterContainer',
				xtype: 'userprofile',
				docked: 'left'
			},
			{
				// Detailed
				id: 'detailedPanel',
				xtype: 'panel',
				layout: {
					type: 'card',
					animation: {
						type: 'slide',
						direction: 'left',
						duration: 500
					}
				},
				width: '733px',
				
				items: [
		            {
		                xtype: 'panel',
						baseCls: 'empty-detailed',
		                items: [
							{
								xtype: 'image',
				                centered: true,
				                height: 100,
				                width: 100,
				                src: 'resources/images/logoWizin.png'
		                	}
						]
		            },
					{
						xtype: 'detailedTeamMember'
					},
					{
						xtype: 'addNewTeam'
					},
					{
						xtype: 'teamMembersList'
					},
					{
						xtype: 'settingsPanel'
					},
					{
						xtype: 'aboutTweamy'
					},
					{
						xtype: 'help'
					},
					{
						xtype: 'terms'
					}
		        ]
				
			}
		]
	}

});