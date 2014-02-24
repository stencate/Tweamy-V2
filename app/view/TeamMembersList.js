/*
* @name TeamMembersList
* @version 1.0
*
* Tweamy.view.TeamMembersList
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

Ext.define('Tweamy.view.TeamMembersList', {
    extend: 'Ext.Panel',
    xtype: 'teamMembersList',

    config: {
        height: '100%',
       	id: 'teamMembersListId',
		cls: 'detailed',
        items: [
            {
                xtype: 'toolbar',
				id: 'teamMemberListToolbar',
                docked: 'top',
				
                items: [
                    {
                        xtype: 'button',
						ui: 'plain',
                        id: 'addNewTeamMemberId',
                        iconCls: 'icon-user-add'
                    },
                    {
                        xtype: 'button',
                        docked: 'right',
                        id: 'saveChangeTeamId',
                        margin: '0.5em 0.5em 0em 0em',
						ui: 'plain',
                        text: 'Gereed'
                    }
                ]
            },
			
			{
				xtype: 'container',
				margin: '0.5em',
		        items: [
					{
						xtype: 'fieldset',
						title: 'Team',
						height: '8em',
		                items: [
		                    {
		                        xtype: 'container',
		                        layout: {
		                            type: 'hbox'
		                        },
		                        items: [
		                            {
		                                xtype: 'image',
										id: 'imageId',
		                                width: '10%',
										html: "<div class= 'imageFontClass'>&#xe650;</div>"
		                            },
		                            {
		                                xtype: 'textfield',
		                                width: '90%',
		                                id: 'companyNameTmListId',
		                                placeHolder: 'Organisatie (optioneel)',
										tabIndex: 1
		                            }
		                        ]
		                    },
		                    {
		                        xtype: 'container',
		                        layout: {
		                            type: 'hbox'
		                        },
		                        items: [
		                            {
		                                xtype: 'image',
		                                width: '10%',
		                                html: "<div class= 'imageFontClass'>&#xe601;</div>"
		                            },
		                            {
		                                xtype: 'textfield',
		                                width: '90%',
		                                id: 'teamNameIdTmList',
		                                placeHolder: 'Teamnaam (vereist)',
										tabIndex: 2
		                            }
		                        ]
		                    }
		                ]
					}
				]
			},
			
            {
				xtype: 'fieldset',
				id: 'teamMembersFieldSetId',
				title: 'Teamleden',
				margin: '1em',
				height: 100,

				items: [
					{
		                xtype: 'list',
		                id: 'membersOfTeamListId',
		                height: '5em',
						disableSelection: true,
		                itemTpl: [
		                    '<div class=\'teamMemberList-wrapper\'>',
		                    '    <img  src=\'{photo}\'/>',
		                    '    <h2>{surname} {lastname}<span>{initiator}</span></h2>',
		                    '</div>'
		                ]	
					}
				]
            }
        ]
    },
	
	initialize: function () {
		this.callParent();
		console.log("Init teammembers list");
		
		// Define the model and store of the list of teammembers
		//
        Ext.define('teamMembersListModel', {
            extend: 'Ext.data.Model',
            config: {
                fields: ['idTeam', 'idTeamMember', 'surname', 'lastname', 'photo', 'initiator']
            }
        });

        var store = Ext.create('Ext.data.Store', {
	        autoLoad: true,
	        autoSync: true,
            model: 'teamMembersListModel',
			storeId: 'teamMembersListStore',
            data: [{surname: "Geen team aanwezig"}]
        });
		
		var tmp = Ext.ComponentQuery.query('#membersOfTeamListId')[0];
		tmp.setStore(store);
	},
	
    setFormDataTmList: function(record) {
        var f = Ext.ComponentQuery.query('#companyNameTmListId')[0];

        f.setValue(record.get('company_name'));

        f = Ext.ComponentQuery.query('#teamNameIdTmList')[0];
        f.setValue(record.get('team_name'));

    }

});