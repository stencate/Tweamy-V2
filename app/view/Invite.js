/*
	Tweamy.view.Invite

	Description: 

	Version: "1.0", Build: "0"
	Date: august 2013

	Design & Development: Triple M IT
	by Stefan ten Cate

*/

Ext.define('Tweamy.view.Invite', {
	extend: 'Ext.Panel',
	xtype: 'invite',
	alias:'widget.invitePanel',
	
	config: {
		id: 'inviteMembersId',
		modal: true,
		hideOnMaskTap: true,
		centered: true,
		width: '75%',
		height: '90%',
		
		items: [
			{
                xtype: 'toolbar',
                docked: 'top',
                title: 'Nieuwe teamleden uitnodigen'
			},
			{
				xtype: 'container',
				height: '100%'
			}
		]
	}
});