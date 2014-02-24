/*
* @name UserProfile
* @version 1.0
*
* Tweamy.view.UserProfile
*
* Copyright (c) 2013 Wizin
*
* @description <p></p>
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

Ext.define('Tweamy.view.UserProfile', {
	extend: 'Ext.Container',
	xtype: 'userprofile',
	
	requires: [
		'Ext.Label',
		'Ext.dataview.List'
	],
	
	config: {
		id: 'userProfileId',
		width: 300,
		scrollable: 'vertical',
		zIndex: 1,
		modal: false,
		
		items: [
			{
                xtype: 'container',
                modal: false,
                items: [
                    {
                        xtype: 'container',
                        baseCls: 'list-divider',
                        items: [
                            {
                                xtype: 'label',
                                html: 'Account',
                                padding: '0.25em 0em 0em 0.5em'
                            }
                        ]
                    },
                    {
                        xtype: 'list',
						store: 'TeamMemberStore',
                        id: 'teamMemberListId',

                        height: '2.3em',
                        itemTpl: [
                            '<div class=\'teamMember-wrapper\'>',
                            '    <img  src=\'{photo_data}\'/>',
                            '    <h2>{surname} {lastname}</h2>',
                            '</div>'
                        ]
                    }
                ]
            },
            {
                xtype: 'container',
                items: [
                    {
                        xtype: 'container',
                        baseCls: 'list-divider',
                        layout: {
                            type: 'hbox'
                        },
                        items: [
                            {
                                xtype: 'label',
                                html: 'Team(s)',
                                padding: '0.25em 0em 0em 0.5em',
								width: '75%'
                            },
                            {
                                xtype: 'button',
                                id: 'btnAddTeamId',
                                ui: 'plain',
								width : '25%',
								iconCls: 'icon-plus3'
                            }
                        ]
                    },
                    {
                        xtype: 'list',
						store: 'TeamStore',
                        height: '7.8em',
						
                        id: 'teamListId',
                        itemTpl: [
                            '<div class=\'team-wrapper\'>',
                            '    <span>&#xe601;</span>',
                            '    <h3>{team_name}<sup>{initiator}</sup></h3>',
                            '    <p>{company_name}</p>',
                            '</div>'
                        ]
                    }
                ]
            },
            {
                xtype: 'container',
                items: [
                    {
                        xtype: 'container',
                        baseCls: 'list-divider',
                        padding: '0.25em 0em 0em 0.5em',
                        items: [
                            {
                                xtype: 'label',
                                html: 'Overige Informatie'
                            }
                        ]
                    },
                    {
                        xtype: 'list',
                        height: '10em',
						
                        id: 'otherListId',
                        itemTpl: [
                            '<div class=\'other-wrapper\'><h2>{otherText}</h2><p>{termsAccpeted}</p></div>'
                        ]
                    }
                ]
            }
		]
	},
	
	initialize: function() {
		this.callParent();
		
		console.log("Init userprofile");
		var dbase = new DatabaseSetup();
		dbase.setConnection();
		
		var twDB = dbase.getConnection();
		
		twDB.transaction(function(tx) {
		    //
		    //	Select the user from the database
		    //
		    tx.executeSql("select * from teammember where id_teammember = ?;", 
				[userProfile.id], 
				function(tx, res) {
					
		        console.log("TeamMember select");
				if (res.rows.length > 0) {
			        var row = res.rows.item(0),

						store = Ext.data.StoreManager.lookup('TeamMemberStore'),
						        
			            data = [ {
							id_teammember: row.id_teammember,
			                surname: row.surname, 
			                lastname: row.lastname, 
			                phonenumber: row.phonenumber, 
			                email_adress: row.email_adress, 
			                terms_accepted: row.terms_accepted, 
			                password: row.password, 
			                photo_data: row.photo_data ,
							autologin: row.autologin,
							may_use_cel: row.may_use_cel
						} ];

			        store.add(data);
				}
		    });

		    //
		    // Select the team(s) he or she belongs to
		    //
		    tx.executeSql("select * from is_member_of_team inner join team on is_member_of_team.id_team = Team.id_team where is_member_of_team.id_teammember = ?",
		    [userProfile.id], function(tx, res) {

		        console.log("Team select");

		        var string = "", i, row, teamName = "",
		            tmList = Ext.ComponentQuery.query("#teamListId")[0],
					titleBar = Ext.ComponentQuery.query('#topToolbar')[0],

			        store = Ext.data.StoreManager.lookup('TeamStore');
					
		        if (res.rows.length > 0) {

		            //Set the height of list
		            var h = res.rows.length * 2.3;
		            tmList.setHeight(h.toString() + "em");

		            store.removeAll(true);

		            for (i = 0; i < res.rows.length; i++) {
		                // Each row is a standard JavaScript array indexed by
		                // column names.
		                row = res.rows.item(i);

			            data = [ {
							id_team: row.id_team, 
							team_name: row.team_name, 
							company_name: row.company_name,
							initiator: row.who_is_initiator > 0 ? '&#xe640;' : ''
						} ];

			        	store.add(data);
					};

		            console.log("team: " + row.team_name + ", " + row.company_name + "\n");
		            
		        } else {
		            tmList.setHeight('2.375em');
		            tmList.setDisabled(true);
		            tmList.setDisableSelection(true);
		            tmList.setOnItemDisclosure(false);
		        }
		    });

		    var tmList = Ext.ComponentQuery.query("#otherListId")[0];

		    Ext.define('otherModel', {
		        extend: 'Ext.data.Model',
		        config: {
		            fields: ['otherText', 'termsAccpeted']
		        }
		    });

		    //
		    //	Set the other information
		    //
		    var store = Ext.create('Ext.data.Store', {
		        model: 'otherModel',
		        data: [{otherText: 'Instellingen', termsAccpeted: ''}, {otherText: 'Over Tweamy', termsAccpeted: ''}, {otherText: 'Help', termsAccpeted: ''}, {otherText: 'Algemene voorwaarden', termsAccpeted: '&#xe611;'}]
		    });

		    var h = store.getCount() * 2.3;
		    tmList.setHeight(h.toString() + "em");
		    tmList.setStore(store);

		});
	}
});