/*
* @name SelfMirrorImagePanel
* @version 1.0
*
* Tweamy.view.SelfMirrorImagePanel
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

Ext.define('Tweamy.view.SelfMirrorImagePanel', {
	extend: 'Ext.Panel',
	
	xtype: 'selfMirrorImage',
	
	config: {		
	    modal: true,
	    hideOnMaskTap: true,
	    centered: true,
		width: 700,
		height: 600,
		autoDestroy: true,
		
		forground: null,
		id_teammember: -1,
		
		items: [
			{
                xtype: 'toolbar',
				id: 'titlebarMemberImageId',
				
                docked: 'top',
				//title: this.isForground ? 'Zelfbeeld van' : 'Spiegel van',
                items: [
					{
                        xtype: 'button',
                        id: 'btnMemberImageInfo',
                        ui: 'plain',
						docked: 'right',
						iconCls: 'icon-info'
					}
				]
			},
            {
                xtype: 'fieldset',
				items: [
					{
                        xtype: 'list',
						store: 'TeamMemberImageStore',

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
				xtype: 'fieldset',
				itemId: 'fieldsetImageId',
				items: [

				]
			}
		]
	},
	
	isForground: null,
	
	applyForground: function (f) {
		this.isForground = f;
		return f;
	},
	
	applyId_teammember: function (i) {
		return i;
	},
	
	initialize: function () {
		console.log('Initialize sel mirror image');
		var dbase = new DatabaseSetup();
			dbase.setConnection(),
			me = this;
			
		var twDB = dbase.getConnection();
		twDB.transaction(function(tx) {
			tx.executeSql("select id_behavior_characteristics, characteristic, abbreviation, dom_behaviour.id_behaviour as id_beh from dom_behaviour inner join dom_behavior_characteristics on dom_behaviour.id_behaviour = dom_behavior_characteristics.id_behaviour order by characteristic", null, function (tx, res) {
			 	
				var row = null,
					slFieldset = me.getItems().items[2];
					
				if (res.rows.length > 0) {
					for (i = 0; i < res.rows.length; i++) {
						row = res.rows.item(i);

						var sliderId = row.abbreviation+ '-' + row.id_beh + '-' + row.id_behavior_characteristics,
							sliderName = row.characteristic;
							
							if (i === 0) {
								var slContainer = Ext.create('Ext.Container', {
									xtype: 'container',
									cls: 'sliderextended',
									items: [
									{
										xtype: 'sliderfield',
										id: sliderId,
									    label: sliderName,
									    value: 50,
									    minValue: 0,
									    maxValue: 100,
										html: "<div class='labelAbove'><div class='part'>Niet</div><div class='part'>Soms</div><div class='part'>Regelmatig</div><div class='clear'>Heel vaak</div></div>"
									}
									]
								});
								slFieldset.add(slContainer);
							} else {
								var slContainer = Ext.create('Ext.Container', {
									xtype: 'container',
									cls: 'sliderextended',
									items: [
									{
										xtype: 'sliderfield',
										id: sliderId,
									    label: sliderName,
									    value: 50,
									    minValue: 0,
									    maxValue: 100,
										//html: "<div class='labelAbove'><div class='part'>Niet</div><div class='part'>Soms</div><div class='part'>Regelmatig</div><div class='clear'>Heel vaak</div></div>"
									}
									]
								});
								slFieldset.add(slContainer);
							}
							
					 }
				 }
				 tx.executeSql("select * from profile where id_team = ? and id_teammember = ?", [currentTeamId, me.getId_teammember()], function (tx, res) {
					 
					 var row = null;
					 
					 if (res.rows.length === 0) {
						 // Insert behavour into profile table
						 tx.executeSql("select id_behaviour, id_behavior_characteristics from dom_behavior_characteristics", null, function (tx, res) {
			 				var row = null;
							
			 				if (res.rows.length > 0) {
			 					for (i = 0; i < res.rows.length; i++) {
									row = res.rows.item(i);
									try {
										tx.executeSql("INSERT INTO profile (id_team, id_teammember, id_behaviour_score, id_behaviour, id_behavior_characteristics, self_image, score) VALUES (?, ?, ?, ?, ?, ?, ?)", 
										[currentTeamId, me.getId_teammember(), row.id_behaviour, row.id_behaviour, row.id_behavior_characteristics, me.isForground ? 'Y' : 'N', 50]);
									} catch (err) {
										console.log('SQl Error: ' + err.message);
									}
								}
							}
						 });					 	
					 }
				 });
			 });
		});
	}
	
});
