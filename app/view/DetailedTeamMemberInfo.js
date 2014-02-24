/*
	Tweamy.view.DetailedTeamMemberInfo

	Description: Main view for tablets

	Version: "1.0", Build: "0"
	Date: august 2013

	Design & Development: Triple M IT
	by Stefan ten Cate

*/

Ext.define('Tweamy.view.DetailedTeamMemberInfo', {
	extend: 'Ext.Panel',
	xtype: 'detailedTeamMember',
	
	requires: [
	 	'Ext.device.Camera',
		'Ext.form.FieldSet',
		'Ext.field.Password',
		'Ext.Button'
	],
	config: {
        id: 'detailedTeamMemberPanelId',
		cls: 'detailed',
		changeCount: 0,
		
        items: [
            {
                xtype: 'toolbar',
				id: 'detailedTeamMemberInfoToolbarId',
                docked: 'top',
				
                items: [
					{
						xtype: 'button',
						id: 'refreshTeammemberBtnId',
						
						ui: 'plain',
						iconCls: 'icon-cw'
					},
					{
	                    xtype: 'button',
	                    id: 'saveChgTeammemberBtnId',

	                    docked: 'right',
                    	margin: '0.5em 1em 0em 0em',
						ui: 'plain',
	                    text: 'Gereed'
					}
                ]
            },
            {
            	xtype: 'container',
				layout: 'hbox',
				width: '100%',
				//height: '6.9em',
				
				items: [
		            {
		                xtype: 'fieldset',
		                id: 'accountPanelId',
						
		               	width: '75%',
		                title: 'Algemeen',
		                items: [
							{
	                            xtype: 'textfield',
	                            id: 'surNameDetId',
	                            labelWidth: '40%',
	                            tabIndex: 1,
	                            placeHolder: 'Voornaam vereist'
	                        },
	                        {
	                            xtype: 'textfield',
	                            id: 'lastNameDetId',
	                            labelWidth: '40%',
	                            tabIndex: 2,
	                            placeHolder: 'Achternaam vereist'
	                        },
	                        {
	                            xtype: 'textfield',
	                            id: 'phoneNumberDetId',
	                            component: {
	                                xtype: 'input',
	                                type: 'tel'
	                            },
	                            labelWidth: '40%',
	                            tabIndex: 3,
	                            placeHolder: 'Telefoonnummer optioneel'
	                        }
		                ]
		            },
					{
						xtype: 'container',
                        width: '25%',
                        centered: false,
                        layout: {
                            type: 'fit'
                        },
                        items: [
                            {
                                xtype: 'image',
                                centered: true,
                                docked: 'top',
                                height: 100,
                                id: 'teamMemberImageDetId',
                                width: 100,
                                src: 'resources/images/Person-64.png'
                            }
                        ]
					}
				]
            },
			{
            	xtype: 'container',
				layout: 'hbox',
				width: '100%',
				//height: '8.74em',
				
				items: [
					{
	                    xtype: 'fieldset',
						width: '75%',
	                    title: 'Gebruikersnaam',
	                    items: [
	                        {
	                            xtype: 'textfield',
	                            id: 'emailAdressDetId',
	                            labelWidth: '40%',
	                            tabIndex: 4,
	                            placeHolder: 'e-mail@bedrijf.com (vereist)'
	                        },
	                        {
	                            xtype: 'passwordfield',
	                            id: 'passwordDetId',
	                            labelWidth: '40%',
	                            tabIndex: 5,
	                            placeHolder: 'Nieuw wachtwoord'
	                        },
	                        {
	                            xtype: 'passwordfield',
	                            id: 'passwordRepDetId',
	                            tabIndex: 6,
	                            placeHolder: 'Bevestig nieuw wachtwoord'
	                        }
	                    ]
	                },
					{
						xtype: 'container',
						id: 'passwordResetId',
                        width: '25%',
                        items: [
                            {
                                xtype: 'button',
								id: 'btnPasswordReset',
                                centered: true,
                                ui: 'plain',
                                text: 'Vergeten'
                            }
                        ]
					}
				]
			},
			{
				xtype: 'toolbar',
				docked: 'bottom',
				
				id: 'detTeamMemberInfoToolbarBottomId',
				
				items: [
	                {
	                    xtype: 'button',
						id: 'albumDetTMI-Id',
						iconCls: 'icon-pictures',
	                    text: 'Album',
						ui: 'plain',
						
	                },
	                {
	                    xtype: 'button',
						id: 'cameraDetTMI-Id',
						iconCls: 'icon-camera',
						ui: 'plain',
						text: 'camera',
						
	                }
				]
			}
        ]
    },
	
	applyChangeCount: function (c) {
		console.log('Change count apply');
		return c;
	},
	
    setFormData: function(record) {
        var f = Ext.ComponentQuery.query('#surNameDetId')[0];

        f.setValue(record.get('surname'));

        f = Ext.ComponentQuery.query('#lastNameDetId')[0];
        f.setValue(record.get('lastname'));

        f = Ext.ComponentQuery.query('#phoneNumberDetId')[0];
        f.setValue(record.get('phonenumber'));

        f = Ext.ComponentQuery.query('#teamMemberImageDetId')[0];
        f.setSrc(record.get('photo_data'));

        f = Ext.ComponentQuery.query('#emailAdressDetId')[0];
        f.setValue(record.get('email_adress'));

        //f = Ext.ComponentQuery.query('#passwordDetId')[0];
        //f.setValue(record.get('password'));
    }

});