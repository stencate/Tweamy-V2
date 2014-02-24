/*
* @name MainController
* @version 1.0
*
* Tweamy.controller.MainController
*
* Copyright (c) 2013 Wizin
*
* @description <p>Main app controller</p>
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

Ext.define('Tweamy.controller.MainController', {
	extend: 'Ext.app.Controller',
	

	
	requires: [
		'Tweamy.util.DatabaseSetup',
		'Ext.device.Camera',
		'Ext.device.Contacts'
	],
	
	config: {
		views: [
			'Tweamy.view.IntroSequence',
			'Tweamy.view.ImageInfo',
			'Tweamy.view.RelationDescription',
			'Tweamy.view.ImageGallery',
			'Tweamy.view.ContactsPanel'
		],
		
		refs: {
			selfMirrorImagePanel: 'selfMirrorImage',
            declinedTerms: 'button#declinedId',
            acceptedTerms: 'button#termsAcceptedId',
			declinedAcceptedBut: 'segmentedbutton#segButtonTermsId',
			main: '#main',
			detailed: '#detailedPanel',
			detailedTeamMemberPanel: '#detailedTeamMemberPanelId',
			saveTeammemberChgBtn: '#saveChgTeammemberBtnId'
		},
		
		control:{
			'selfMirrorImage': {
				hide: 'onHideSelfMirrorImage',
				initialize: 'onInitSelfMirrorImage'
			},
			'selfMirrorImage button': {
				tap: 'onBtnMemberImageInfo'
			},
			'selfMirrorImage sliderfield': {
				change: 'onSliderChange'
			},
			'imageInfo': {
				hide: 'onHideImageInfo'
			},
			'relationWithPanel': {
				hide: 'onHideRelationWithPanel'
			},
			'relationWithPanel list': {
				select: 'onSelectRelationWith'
			},
			'relationDescription': {
				hide: 'onHideRelationDescription'
			},
			'#readyToUseId': {
				tap: 'onBtnReadyToUse'
			},
			'#segButtonTermsId': {
				toggle: 'onToggleTerms'
			},
			'#main': {
				initialize: 'prepareDraggableMain'
			},
			'userprofile list': {
				select: 'onUserProfileListSelect'
			},
			'#saveChgTeammemberBtnId': {
				tap: 'onBtnSaveChgTeammember'
			},
			'#refreshTeammemberBtnId': {
				tap: 'onBtnRefreshTeammembers'
			},
			'#detailedTeamMemberPanelId textfield': {
				change: 'onChgTeammemberFields',
				blur: 'onLosingFocusTeammemberFields'
			},
			'firstTimeContainerSeq3 button[action=showAlbum]': {
				tap: 'onTapAlbum'
			},
			'firstTimeContainerSeq3 button[action=takePicture]': {
				tap: 'onTapTakePicture'
			},
			'imageGallery': {
				hide: 'onHideImageGallery'
			},
			'#albumDetTMI-Id': {
				tap: 'onTapAlbum'
			},
			'#cameraDetTMI-Id': {
				tap: 'onTapTakePicture'
			},
			'#btnAddTeamId': {
				tap: 'onButtomAddNewTeam'
			},
			'#addTeamBtnId': {
				tap: 'onTapButtonAddTeam'
			},
			'#addNewTeamMemberId': {
				tap: 'onAddNewTeammember'
			}
		}
	},
	
	/**
	 * 
	 * @function init
	 *	@param None
	 *	@return None
	 *
	 *	@description <p>Called by the Controller's application to initialize the Controller. 
	 *				 <p>This is always called before the Application launches, giving the Controller a chance to run any pre-launch logic.</p> 
	 *				 <p>See also launch, which is called after the Application's launch function</p>
	 *
	**/
	init: function (){
		console.log("Main controler init");
		
		//
		// First things first
		//
		// Check if the user has used Tweamy before
		// 
		//

		var firstTime = true,
		    localstore = Ext.getStore("LocalStore");

		//	Check if first time usage is applicable
		//
		localstore.load();
		var index = localstore.find('key', 'firstTime');

		if (index != -1) {
		    firstTime = localstore.getAt(index).get('value') === 'N' ? false : true;
		}
		
		
		//@debug
		console.log('Database setup: Tweamy.controller.tablet.MainController');
		//firstTime = true;
		
		var dbase = new DatabaseSetup();
		dbase.setConnection();
		
		if (firstTime) {
			
		    userProfile.firstTime = firstTime;
			
			localstore.removeAll();
		    localstore.add({key: 'firstTime', value: 'N'});
			
		    localstore.sync();
						
			dbase.create();
			
		    // ➢ First time usage.
		    //		- 	Short explanation about Tweamy.
		    //		- 	Terms of agreement.
		    //		- 	Tweamy asks the user to create a profile (firstname, lastname, phone number [optional], e-mail adress
		    //			and password.
		    //
		    //
		    //	After the registration process the the user (teammember) profile will be stored (also on the server side)
		    // 
		    //
			var twDB = dbase.getConnection();
			
			twDB.transaction(function(tx) {
				
				tx.executeSql("select max(id_teammember) as id from teammember;", null, function(tx, res) {
					
					
					var id_teammember = 1;
					if (res.rows.length > 0) {
						if (res.rows.item(0).id !== null) {
							id_teammember = res.rows.item(0).id;
						}
					}
					
			        userProfile.id = id_teammember;
			        localstore.add({key: 'id', value: 1});
			        localstore.sync();
					
					console.log('Select max id_teammember: ' + id_teammember);
				    //	Show intro sequence
					introSeq = Ext.Viewport.add(Ext.create('Ext.Panel', {
				
						fullscreen: false,
						height: screen.height * FLOATING_SCREEN_SCALE,
						width: screen.width * FLOATING_SCREEN_SCALE,
						centered: true,
						modal: true,
				
						items: [
							{xtype: 'introSequence', idTeammember: userProfile.id}
						]
				
					}));
				});
			});
			
		} else {
			
			// Get the users id for querying the database
		    var index = localstore.find('key', 'id'),

	        id = localstore.getAt(index).get('value');
		    userProfile.id = parseInt(id, 10);
			
			var twDB = dbase.getConnection();
			
			// Select the users data
		    twDB.transaction(function(tx) {
		        tx.executeSql("select * from teammember where id_teammember = ?;", [userProfile.id], function(tx, res) {

		            console.log("TeamMember user profile");

		            var row = res.rows.item(0);

		            userProfile.emailAdress = row.email_adress;
		            userProfile.mayUseCel = row.may_use_cel == 'Y' ? true : false;
		            userProfile.autoLogin = row.autologin == 'Y' ? true : false;
		            userProfile.termsAccepted = row.terms_accepted == 'Y' ? true : false;
					userProfile.surname = row.surname;
					userProfile.lastname = row.lastname;
					
		        },	function(e) {
	                console.log("SQL Error on launch, firsttime = false: " + e.message);
	            });
				
				tx.executeSql("select * from is_member_of_team where id_teammember = ?;", [userProfile.id], function(tx, res) {
					
					var teams = new Array();
                    for (i = 0; i < res.rows.length; i++) {
                        // Each row is a standard JavaScript array indexed by
                        // column names.
                        row = res.rows.item(i);
						teams.push(row.id_team);
                    }
					
					userProfile.teams = teams;
				});
				
			    tx.executeSql("select team.id_team as id_team, team_name from is_member_of_team inner join team on is_member_of_team.id_team = Team.id_team where is_member_of_team.id_teammember = ? order by team.id_team LIMIT 1", 
				[userProfile.id], function(tx, res) {
					
					if (res.rows.length > 0) {
						row = res.rows.item(0);
						currentTeamId = row.id_team;
					} else {
						currentTeamId = -1;
					}
				});
		    });
		}
		
		// Synchronize local and remote database
	},
	
	onHideSelfMirrorImage: function (me, eOpts) {
		console.log('Destroy SelfMirrorImage');
		
		var id = me.getId_teammember();
		me.destroy();
		
		playground.updateSegments(id);
	},
	
	onInitSelfMirrorImage: function (me, eOpts) {		
		console.log ('onInitSelfMirrorImage');
		
		this.getSelfMirrorImagePanel().query('toolbar')[0].setTitle(this.getSelfMirrorImagePanel().isForground ? 'Zelfbeeld van' : 'Spiegel van');
		
		var dbase = new DatabaseSetup();
		dbase.setConnection();
		var twDB = dbase.getConnection();
		
		twDB.transaction(function(tx) {
			tx.executeSql("select score, behaviour, abbreviation, characteristic, profile.id_behaviour as id_beh, profile.id_behavior_characteristics as id_beh_char from profile inner join dom_behaviour inner join dom_behavior_characteristics on profile.id_behaviour = dom_behaviour.id_behaviour and profile.id_behavior_characteristics =  dom_behavior_characteristics.id_behavior_characteristics where id_team = ? and id_teammember = ? and self_image = ?;",
			[currentTeamId, me.getId_teammember(), me.isForground ? 'Y' : 'N'], function(tx, res) {
				
				var row = null,
					rowSliderId = '',
					sl = null;
				
				if (res.rows.length > 0) {
			        for (i = 0; i < res.rows.length; i++) {
			            // Each row is a standard JavaScript array indexed by
			            // column names.
			            row = res.rows.item(i);
						rowSliderId = row.abbreviation + '-' + row.id_beh + '-' + row.id_beh_char;
				
						sl = Ext.ComponentQuery.query('#' + rowSliderId)[0];
						sl.setValue(row.score);
					}
				}
			});
		});
	},
	
	onHideImageInfo: function (me, eOpts) {
		console.log('Destroy ImageInfo');
		me.destroy();
	},
	
	onHideImageGallery: function (me, eOpts) {
		console.log('Destroy image gallery');
		me.destroy();
	},
	
	onBtnMemberImageInfo: function (button, e, eOpts) {
		console.log('Info image tap');
		
		Ext.Viewport.add(Ext.create('Tweamy.view.ImageInfo', {fullscreen: false}));
	},
	
	onSliderChange: function (slider, sl, thumb, newValue, oldValue, eOpts) {
		
		console.log ('Slider change: ' + newValue + ', ID: ' + slider.getId());
		
		var imageSum = 0,
			imageItemsAr = slider.up('fieldset').getItems().items,
			seg = new Array(),
			
			memberConfig = slider.getParent().getParent().getParent().config,
			id_teammember = memberConfig.id_teammember,
			selfImage = memberConfig.forground ? 'Y' : 'N',
			sliderId = slider.getId(),
			sliderValue = newValue,
		
			sliderIdAr = sliderId.split('-'),
			behCharId = parseInt(sliderIdAr[2], 10),
			behId = 0;
		
		// Initialize Segments
		for (var i = 0; i < 3; i++) {
			seg.push({behId: i + 1, score: 0});
		}

		for (var i = 0; i < imageItemsAr.length; i++) {

			switch (imageItemsAr[i].getItems().items[0].getId().slice(0,2)) {
			case 'BL' :
				seg[0].score += imageItemsAr[i].getItems().items[0].getValue()[0];
				break;

			case 'OL' :
				seg[1].score += imageItemsAr[i].getItems().items[0].getValue()[0];
				break;

			case 'VB' :
				seg[2].score += imageItemsAr[i].getItems().items[0].getValue()[0];
				break;
			}
		}
		
		var dbase = new DatabaseSetup();
		dbase.setConnection();
		var twDB = dbase.getConnection();
		
		twDB.transaction(function(tx) {
			
			// Update users profile
			tx.executeSql("update profile set score = ? where id_team = ? and id_teammember = ? and self_image = ? and id_behavior_characteristics = ?",
			[sliderValue, currentTeamId, id_teammember, selfImage, behCharId]);
			
			//Update total score for each behaviour
			for (var i = 0; i < seg.length; i++) {
				
				tx.executeSql("update behaviour_score set behaviour_score = ? where id_team = ? and id_teammember = ? and id_behaviour = ?",
				[seg[i].score, currentTeamId, id_teammember, seg[i].behId]);				
			}
			
			tx.executeSql("update teammember set set_image = 'Y' where id_teammember = ?", [id_teammember]);
		});
	},
	
	onHideRelationWithPanel: function (me, eOpts) {
		console.log('Destroy Relation with panel');
		me.destroy();
	},
	
	onHideRelationDescription: function (me, eOpts) {
		console.log('Destroy RelationDescription');
		me.destroy();
	},
	
	onSelectRelationWith: function (dataview, record, eOpts) {
		console.log('list rel def selected');
		
		var dbase = new DatabaseSetup();
			dbase.setConnection();
			
		var twDB = dbase.getConnection();
		twDB.transaction(function(tx) {
	    	tx.executeSql("select * from behaviour_score inner join dom_behaviour on behaviour_score.id_behaviour = dom_behaviour.id_behaviour where id_team = ? and id_teammember = ? order by behaviour_score desc;", 
				[currentTeamId, record.getData().id_teammember], 
				function(tx, res) {
					
					var row = null,
						behDef1 = '', behDef2 = '';
						
					if (res.rows.length > 0) {
	                    for (i = 0; i < res.rows.length - 1; i++) {
	                        // Each row is a standard JavaScript array indexed by
	                        // column names.
	                        row = res.rows.item(i);
							behDef1 += row.abbreviation + '-';
						}
						behDef1 += res.rows.item(res.rows.length - 1).abbreviation;
						
				    	tx.executeSql("select * from behaviour_score inner join dom_behaviour on behaviour_score.id_behaviour = dom_behaviour.id_behaviour where id_team = ? and id_teammember = ? order by behaviour_score desc;", 
							[currentTeamId, userProfile.id], 
							function(tx, res) {
								
								if (res.rows.length > 0) {
				                    for (i = 0; i < res.rows.length - 1; i++) {
				                        // Each row is a standard JavaScript array indexed by
				                        // column names.
				                        row = res.rows.item(i);
										behDef2 += row.abbreviation + '-';
									}
									behDef2 += res.rows.item(res.rows.length - 1).abbreviation;
									
							    	tx.executeSql("select * from dom_relation_definition where behavour_comb1 = ? and behavour_comb2 = ?", 
										[behDef1, behDef2], 
										function(tx, res) {
										
											var behDescription = res.rows.item(0).description;
											
									    	tx.executeSql("select * from teammember where id_teammember = ?", 
												[userProfile.id], 
												function(tx, res) {
													
													var row = res.rows.item(0);
													
											        Ext.define('relationFromModel', {
											            extend: 'Ext.data.Model',
											            config: {
											                fields: ['idTeam', 'idTeamMember', 'surName', 'lastName', 'photo']
											            }
											        });

											        var store1 = Ext.create('Ext.data.Store', {
												        autoLoad: true,
												        autoSync: true,
											            model: 'relationFromModel',
														storeId: 'relationFromStore',
											            data: [{idTeam: currentTeamId, idTeamMember: row.id_teammember, surName: row.surname, lastName: row.lastname, photo: row.photo}]
											        });
		
													var store = Ext.data.StoreManager.lookup('TeamMemberRelStore');
		
														store.removeAll(true);
											    		store.add(record.getData());
														
													Ext.Viewport.add(Ext.create('Tweamy.view.RelationDescription', {
														behavourDescription: behDescription
													}));
													
											});
											
										
									});
								}
						});
					}
				});
		});
	},
	
	onBtnReadyToUse: function (button, eOpts){
		console.log('Ready to use');
		
		var inputFields = button.up('panel').query('textfield'),
			img = button.up('panel').query('image')[0];
		
		store = Ext.data.StoreManager.lookup('TeamMemberStore');
		store.removeAll(true);
       
        var data = [ {
			id_teammember: -1,
            surname: inputFields[0].getValue(), 
            lastname: inputFields[1].getValue(), 
            phonenumber: inputFields[2].getValue(), 
            email_adress: inputFields[3].getValue(), 
            terms_accepted: userProfile.termsAccepted ? 'Y' : 'N', 
            password: inputFields[4].getValue(), 
            photo_data: img.getSrc(),
			autologin: 'Y',
			may_use_cel: 'Y'
		} ];
		store.add(data);
		
		var repPassword = inputFields[5].getValue()
		
		var error = {
            surname: '', 
            lastname: '', 
            email_adress: '',
            terms_accepted: '', 
            password: '',
			repPassword: ''
		}, 
			errorCnt = 0;
		
		if (data[0].surname === '') {
			error.surname = 'Voornaam is een verplicht veld.'
			inputFields[0].setCls('error-indication');
			errorCnt++;
		} else {
			inputFields[0].setCls('ok-indication');
		}
		
		if (data[0].lastname === '') {
			error.lastname = 'Achternaam is een verplicht veld.'
			inputFields[1].setCls('error-indication');
			errorCnt++;
		} else {
			inputFields[1].setCls('ok-indication');
		}
		
		if (data[0].email_adress === '') {
			error.email_adress = 'E-mail adres is een verplicht veld.'
			inputFields[3].setCls('error-indication');
			errorCnt++;
		} else {
			var re = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");
			var m = re.exec(data[0].email_adress);
			
			if (m !== null && m.length > 0) {
				inputFields[3].setCls('ok-indication');
			} else {
				error.email_adress = 'Geen geldig E-mail adres ingevoerd.'
				inputFields[3].setCls('error-indication');
				errorCnt++;
				Ext.Msg.alert('E-mail adres', error.email_adress, Ext.emptyFn);
			}
			
		}
		
		if (data[0].password === '') {
			error.password = 'Wachtwoord is een verplicht veld.'
			inputFields[4].setCls('error-indication');
			errorCnt++;
		} else {
			inputFields[4].setCls('ok-indication');
		}
		
		if (repPassword === '') {
			error.repPassword = 'Wachtwoord bevestiging is een verplicht veld.'
			inputFields[5].setCls('error-indication');
			errorCnt++;
		} else {
			inputFields[5].setCls('ok-indication');
		}
		
		if (data[0].terms_accepted === 'N') {
			error.terms_accepted = 'Algemen voorwaarden niet geaccepteerd,'
			errorCnt++;
			
			Ext.Msg.alert('Algemene voorwaarden', 'Om met Tweamy te kunnen werken moet u de algemene voorwaarden accepteren.', Ext.emptyFn);
		} 
		
		if (errorCnt === 0) {
			// Store member in the database
			var dbase = new DatabaseSetup();
			dbase.setConnection();
		
			var twDB = dbase.getConnection();
		
			twDB.transaction( function(tx) {
				
				userProfile.emailAdress = inputFields[3].getValue();
	            userProfile.mayUseCel = true;
	            userProfile.autoLogin = true;
	            
				userProfile.surname = inputFields[0].getValue();
				userProfile.lastname = inputFields[1].getValue()
				
				imgArray.push({id: userProfile.emailAdress, src: img.getSrc()});
				
				tx.executeSql("INSERT INTO teammember (id_teammember, surname, lastname, photo, phonenumber, email_adress, password, terms_accepted, autologin, may_use_cel, photo_data) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);", 
				[userProfile.id, inputFields[0].getValue(), inputFields[1].getValue(), null, inputFields[2].getValue(), inputFields[3].getValue(), inputFields[4].getValue(), userProfile.termsAccepted ? 'Y' : 'N', "Y", "Y", img.getSrc()]);
				
				// Update the canvas
				// There is only one member
				var m = playground.getMembers()[0].getMember();
				
				m.idTeammember = userProfile.id;
				m.getObjects()[1].getElement().src = img.getSrc();
				canvas.renderAll();
			});
            
			introSeq.destroy();
		}
		//debugger;
	},
	
	onToggleTerms: function (segmentedbutton, button, isPressed, eOpts) {
		console.log('Terms button');
		
        //
        // Terms of agreement accepted??
        //
        // What to do if not
        if (this.getDeclinedAcceptedBut().isPressed(this.getDeclinedTerms())) {
            userProfile.termsAccepted = false;
        } else {
            userProfile.termsAccepted = true;
        }
		
		console.log('Terms accepted: ' + userProfile.termsAccepted);
	},
	
	prepareDraggableMain: function () {
		console.log("prepareDraggableMain");
		// Prepare the main container (titlebar & playground) to be draggable
		//
		var draggable = this.getMain().draggableBehavior.getDraggable();
		
		draggable.setConstraint({
			min: {x: 0, y: 0},
			max: {x: 777, y:1033}
		});
		
		draggable.on({
			scope: this,
			//buffer: 10,
			dragstart: this.onDragStart,
			drag: this.onDragMain,
			dragend: this.onDragEnd			
		});
	},
	
	onDragStart: function(component, e, offsetX, offsetY, eOpts) {
        console.log('drag start: ' + offsetX + ', ' + offsetY);
		
		prevScale = 1.0;
		prevOpacity = 1.0;
		
		isAnimated = true;
		 
        return true;
    },

	onDragMain: function(component, e, offsetX, offsetY, eOpts) {
        console.log('drag');
		
		var el = this.getMain().element,
			scale = (1 - (e.pageY / 600));
		
		if (scale < 0.2) {
			scale = 0.2;
		}
			
		this.scale = scale;
		
	    Ext.Anim.run(el, new Ext.Anim({
	        duration: 1,
	        easing: 'ease',
	        autoClear: false,
	        from: {
	            'opacity': prevOpacity,
	            '-moz-transform':    'matrix(' + prevScale + ', 0.000, 0.000, ' + prevScale + ', 0px, 0px)',
	            '-webkit-transform': 'matrix(' + prevScale + ', 0.000, 0.000, ' + prevScale + ', 0, 0)',
	            '-o-transform':      'matrix(' + prevScale + ', 0.000, 0.000, ' + prevScale + ', 0, 0)',
	            'transform':         'matrix(' + prevScale + ', 0.000, 0.000, ' + prevScale + ', 0, 0)'
	        },
	        to:{
	            'opacity': 0.7,
	            '-moz-transform':    'matrix(' + scale + ', 0.000, 0.000, ' + scale + ', 0px, 0px)',
	            '-webkit-transform': 'matrix(' + scale + ', 0.000, 0.000, ' + scale + ', 0, 0)',
	            '-o-transform':      'matrix(' + scale + ', 0.000, 0.000, ' + scale + ', 0, 0)',
	            'transform':         'matrix(' + scale + ', 0.000, 0.000, ' + scale + ', 0, 0)'
	        },
			after: function () {
				prevScale = scale;
				prevOpacity = 0.7;
			}
	    }));
     },
	
	onDragEnd: function(component, e, offsetX, offsetY, eOpts) {
        console.log('drag end: ' + this.scale);
		
		var el = this.getMain().element;
		
		if (this.scale > 0.2) {
			this.revealMain();
		} else {
			Ext.Anim.run(el, new Ext.Anim({
		        duration: 500,
		        easing: 'ease',
		        autoClear: false,
		        from: {
		        },
		        to:{
		            'opacity': 0.7,
		            '-moz-transform':    'matrix(0.2, 0.000, 0.000, 0.2, -350px, 200px)',
		            '-webkit-transform': 'matrix(0.2, 0.000, 0.000, 0.2, -350, 200)',
		            '-o-transform':      'matrix(0.2, 0.000, 0.000, 0.2, -350, 200)',
		            'transform':         'matrix(0.2, 0.000, 0.000, 0.2, -350, 200)'
		        }
		    }));
		
			this.getMain().setMasked({
				transparant: true,
				listeners: {
					tap: {
						fn: this.revealMain,
						scope: this
					}
				}
			});
		}
  	},
	
	moveMainTo: function (offset, callback) {
		console.log("move main to");
		
		// Move the main container (titlebar and playgound) to the right or reset to its origin
		//
		var el = this.getMain().element;
		
		offset = offset && Ext.isNumber(offset) ? offset : 0;
		
		Ext.Anim.run(el, new Ext.Anim({
			duration: 250,
			easing: 'ease',
			autoClear: false,
			from: {},
			to: {
				'transform': 'translate(' + offset + 'px, 0px)',
				'-ms-transform': 'translate(' + offset + 'px, 0px)', 		/* IE 9 */
				'-webkit-transform': 'translate(' + offset + 'px, 0px)' 	/* Safari and Chrome */
			}
		}));
		
		
		
	},
	
	//@deprecated
	onButtonShowUserProfile: function () {
		console.log("Show user profile");
		
		if (isUserprofileShown) {
			// Move back to top left position
			this.moveMainTo(0);
			isUserprofileShown = false;
			
		} else {
			// Move to the right and show user profile
			console.log("width left: " + this.getLeft().element.getWidth());
			
			this.getDetailed().setWidth(this.getLeft().element.getWidth() - this.getMaster().element.getWidth() + 'px');
			this.moveMainTo(this.getMaster().element.getWidth());
			isUserprofileShown = true;
		}
	},
	
	revealMain: function () {
		console.log('Reveal main');
		// Show main (titlebar and playground) with its original proportions
		//
		
		var el = this.getMain().element;
		
		if (isAnimated) {
			this.getMain().setMasked(false);
			
			Ext.Anim.run(el, new Ext.Anim({
			            duration: 750,
			            easing: 'ease',
			            autoClear: false,
			            from: {

			            },
			            to:{
			                'opacity': 1.0,
			                'background-color': 'none',
			                'transform': 'scale(1, 1)', 
			                '-moz-transform': 'scale(1, 1)',
			                '-webkit-transform': 'scale(1, 1)',
			                '-o-transform': 'scale(1, 1)'
			            }
			}));
			isAnimated = false;
			isUserprofileShown = false;
		}
		
	},
	
	onUserProfileListSelect: function (dataview, record, eOpts) {
		console.log('User profile: ' + dataview.get('id'));
		/*
        Deselect all selected list items if one is selected
        */
		
        var id = dataview.get('id'),
			panel = dataview.up('container').up('container').query('list');
		    
        for (var i = 0; i < panel.length; i++) {
            if (id != panel[i].id) {
                panel[i].deselectAll(true);
            }
        }

		/*
		Depending on the selected list show the associated
		detailed form
		*/
		if (!isAnimated) {
			// Reference to the main DOM element (titlebar and playground included)
	    	var el = this.getMain().element;
			
		    // Shrink the play ground and move it aside. If it is
		    // not already shrunken.
		    isAnimated = true;

		    Ext.Anim.run(el, new Ext.Anim({
		        duration: 1000,
		        easing: 'ease',
		        autoClear: false,
		        from: {
		            'transform': 'scale(1, 1)', 
		            '-moz-transform': 'scale(1, 1)',
		            '-webkit-transform': 'scale(1, 1)',
		            '-o-transform': 'scale(1, 1)'
		        },
		        to:{
		            'opacity': 0.7,
		            '-moz-transform':    'matrix(0.2, 0.000, 0.000, 0.2, -350px, 200px)',
		            '-webkit-transform': 'matrix(0.2, 0.000, 0.000, 0.2, -350, 200)',
		            '-o-transform':      'matrix(0.2, 0.000, 0.000, 0.2, -350, 200)',
		            'transform':         'matrix(0.2, 0.000, 0.000, 0.2, -350, 200)'
		        },
		    }));

			this.getMain().setMasked({
				transparant: true,
				listeners: {
					tap: {
						fn: this.revealMain,
						scope: this
					}
				}
			});
		}
		
		switch (id) {
			
			case 'teamMemberListId':
				
				var name = record.get('surname') + ' ' + record.get('lastname'),
					t = Ext.ComponentQuery.query('#detailedTeamMemberPanelId > toolbar')[0];
					
				t.setTitle(name);
				
				t = Ext.ComponentQuery.query('#detailedTeamMemberPanelId')[0];
				t.setFormData(record);
				
				t = Ext.ComponentQuery.query('#saveChgTeammemberBtnId')[0];
				//t.setHidden(true);
				
				this.getDetailed().setActiveItem(1);
				break;
			
			case 'teamListId':
				
				var me = this,
					bar = Ext.ComponentQuery.query('#topToolbar')[0],
					t = Ext.ComponentQuery.query('#teamMembersListId')[0];
					
				
				playground.setTeamName(record.getData().teamName);
				t.setFormDataTmList(record);
				
				t = Ext.ComponentQuery.query('#teamMembersListId toolbar')[0];
				t.setTitle('Team - ' + record.getData().team_name);
				
	            // Select all the members of a team
				var dbase = new DatabaseSetup();
					dbase.setConnection();
			
				var twDB = dbase.getConnection();
	            twDB.transaction(function(tx) {
	                tx.executeSql("select * from is_member_of_team INNER JOIN teammember ON is_member_of_team.id_teammember = teammember.id_teammember where id_team = ?;", 
					[record.get('id_team')], function(tx, res) {

	                    var string = "", i, row,
	                       	store = Ext.ComponentQuery.query('#membersOfTeamListId')[0].getStore();
							
						store.removeAll(true);

	                    for (i = 0; i < res.rows.length; i++) {
	                        // Each row is a standard JavaScript array indexed by
	                        // column names.
	                        row = res.rows.item(i);
	                        store.add({idTeam: row.id_team, idTeamMember: row.id_teammember, surname: row.surname, lastname: row.lastname, photo: row.photo_data, initiator: row.who_is_initiator > 0 ? '&#xe640;' : ''});
	                    }
						store.sync();
						
	                    var t = Ext.ComponentQuery.query('#teamMembersFieldSetId')[0],
							tl = Ext.ComponentQuery.query('#membersOfTeamListId')[0];

			            //Set the height of list
			            var h = store.getCount() * 2.3 + 2.5;
			            t.setHeight(h.toString() + "em");
						tl.setHeight(h.toString() + "em");
						
	                    me.getDetailed().setActiveItem(3);
						
						if (currentTeamId !== record.get('id_team')) {
							currentTeamId = record.get('id_team');
							
							// Update playground
							
						}
	                });

	            },	function(e) {
	                console.log("SQL Error on launch: " + e.message);
	            }
	            );
				
				break;
				
			case 'otherListId':
				var txt = record.get('otherText');
				
				switch (txt) {
					
					case 'Instellingen':
						this.getDetailed().setActiveItem(4);
						break;
					
					case 'Over Tweamy':
						
						this.getDetailed().setActiveItem(5);
						break;
						
					case 'Help':
						
						this.getDetailed().setActiveItem(6);
						break;
						
					case 'Algemene voorwaarden':
						
						this.getDetailed().setActiveItem(7);
						break;
				}
				break;
		}
	},
	
	onBtnSaveChgTeammember: function (button, e, eOpts) {
		// Get a reference to the panel and select all the textfields for validation
		//
		var txtFields = this.getDetailedTeamMemberPanel().query('textfield'),
			re = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"),
			error = false,
			errorText = '';
			
		for (var i= 0; i < txtFields.length; i++) {
			
			switch (txtFields[i].id) {
				case 'surNameDetId':
					if (txtFields[i].getValue() === '') {
						txtFields[i].setCls('error-indication');
						error = true;
					} else {
						txtFields[i].removeCls('error-indication');
					}
				
					break;
				
				case 'lastNameDetId':
					if (txtFields[i].getValue() === '') {
						txtFields[i].setCls('error-indication');
						error = true;
					} else {
						txtFields[i].removeCls('error-indication');
					}
				
					break;
				
				case 'emailAdressDetId':
					if (txtFields[i].getValue() === '') {
						txtFields[i].setCls('error-indication');
						error = true;
					} else {
						var m = re.exec(txtFields[i].getValue());
						if (m !== null && m.length > 0) {
							txtFields[i].removeCls('error-indication');
						} else {
							errorText = 'Geen geldig E-mail adres ingevoerd.';
							error = true;
							txtFields[i].setCls('error-indication');
							Ext.Msg.alert('E-mail adres', errorText, Ext.emptyFn);
						}
					
					}
				
					break;
				 
				default:
				
					var pswField = this.getDetailedTeamMemberPanel().query('#passwordDetId')[0],
						pswRepField = this.getDetailedTeamMemberPanel().query('#passwordRepDetId')[0];
				
					if (pswField.getValue() === '' && pswRepField.getValue() !== '') {
						errorText = 'Nieuw wachtwoord kan niet leeg zijn als bevestigen wachtwoord is ingevuld.';
						error = true;
						pswField.setCls('error-indication');
						Ext.Msg.alert('Nieuw wachtwoord', errorText, Ext.emptyFn);
					} else {
						if (pswField.getValue() !== '' && pswRepField.getValue() !== '') {
							if (pswField.getValue() !== pswRepField.getValue()) {
								errorText = 'Nieuw wachtwoord en wachtwoord bevestiging zijn niet gelijk.';
								error = true;
								pswRepField.setCls('error-indication-psw');
								pswField.setCls('error-indication');
								Ext.Msg.alert('Nieuw wachtwoord', errorText, Ext.emptyFn);
							} else {
								txtFields[i].removeCls('error-indication');
								pswField.removeCls('error-indication');
								pswRepField.removeCls('error-indication');		
								pswRepField.removeCls('error-indication-psw');	
							}
						} else {
							if (pswField.getValue() !== '' && pswRepField.getValue() === '') {
								errorText = 'Wachtwoord bevestigen is verplicht als er een nieuw wachtwoord is ingevuld.';
								error = true;
								pswRepField.setCls('error-indication');
								Ext.Msg.alert('Nieuw wachtwoord', errorText, Ext.emptyFn);
							} else {
								txtFields[i].removeCls('error-indication');
								pswField.removeCls('error-indication');
								pswRepField.removeCls('error-indication');		
								pswRepField.removeCls('error-indication-psw');								
							}
						}
					} 
					
					break;
			}
		}
		
		if (!error) {
			// Update store and database
			var dbase = new DatabaseSetup();
				dbase.setConnection(),
				me = this;
			
			var twDB = dbase.getConnection();
			twDB.transaction(function(tx) {
				//photo_data= ?,
			    tx.executeSql("update teammember set surname = ?, lastname = ?, phonenumber = ?, email_adress = ? where id_teammember = ?;", 
				[txtFields[0].getValue(), txtFields[1].getValue(), txtFields[2].getValue(), txtFields[3].getValue(), userProfile.id], function (tx) {
				    
					tx.executeSql("select * from teammember where id_teammember = ?;", 
						[userProfile.id], 
						function(tx, res) {
					
					        console.log("TeamMember select");
					
					        var row = res.rows.item(0),

								store = Ext.data.StoreManager.lookup('TeamMemberStore');
								
						    store.removeAll(true);
							
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
							Ext.ComponentQuery.query('#teamMemberListId')[0].refresh();
							
							Ext.ComponentQuery.query('#detailedTeamMemberPanelId > toolbar')[0].setTitle(row.surname + ' ' + row.lastname);
				    });
					
				});
				
				
				if (txtFields[4].getValue() !== '') {
				    tx.executeSql("update teammember set password = ? where id_teammember = ?;", 
					[txtFields[4].getValue(), userProfile.id]);
					txtFields[4].setValue('');
					txtFields[5].setValue('');
				}
			});
		}		
	},
	
	onChgTeammemberFields: function (textfield, newValue, oldValue, eOpts) {
        //
		//debugger;
		var errorText = '',
			re = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");
			
		console.log('Old: ' + oldValue + ', new: ' + newValue);
								
		switch (textfield.id) {
			case 'surNameDetId':
				if (newValue === '') {
					errorText = 'Voornaam is een verplicht veld.';
					textfield.setCls('error-indication');
				} else {
					textfield.removeCls('error-indication');
				}
				
				break;
				
			case 'lastNameDetId':
				if (newValue === '') {
					errorText = 'Achternaam is een verplicht veld.';
					textfield.setCls('error-indication');
				} else {
					textfield.removeCls('error-indication');
				}
				
				break;
				
			case 'emailAdressDetId':
				if (newValue === '') {
					errorText = 'E-mail adres is een verplicht veld.';
					textfield.setCls('error-indication');
				} else {
					var m = re.exec(newValue);
					if (m !== null && m.length > 0) {
						textfield.removeCls('error-indication');
					} else {
						errorText = 'Geen geldig E-mail adres ingevoerd.';
						textfield.setCls('error-indication');
						Ext.Msg.alert('E-mail adres', errorText, Ext.emptyFn);
					}
					
				}
				
				break;
				 
			default:
				
				var pswField = this.getDetailedTeamMemberPanel().query('#passwordDetId')[0],
					pswRepField = this.getDetailedTeamMemberPanel().query('#passwordRepDetId')[0];
				
				if (pswField.getValue() === '' && pswRepField.getValue() !== '') {
					errorText = 'Nieuw wachtwoord kan niet leeg zijn als bevestigen wachtwoord is ingevuld.';
					pswField.setCls('error-indication');
					Ext.Msg.alert('Nieuw wachtwoord', errorText, Ext.emptyFn);
				} else {
					if (pswField.getValue() !== '' && pswRepField.getValue() !== '') {
						if (pswField.getValue() !== pswRepField.getValue()) {
							errorText = 'Nieuw wachtwoord en wachtwoord bevestiging zijn niet gelijk.';
							pswRepField.setCls('error-indication-psw');
							pswField.setCls('error-indication');
							Ext.Msg.alert('Nieuw wachtwoord', errorText, Ext.emptyFn);
						}
					} else {
						textfield.removeCls('error-indication');
						pswField.removeCls('error-indication');
						pswRepField.removeCls('error-indication');
						pswRepField.removeCls('error-indication-psw');
					}
				} 
					
				break;
		} 
	},
	
	onLosingFocusTeammemberFields: function (textfield, e, eOpts) {
		var pswField = this.getDetailedTeamMemberPanel().query('#passwordDetId')[0];
		
		if (textfield.id === 'passwordRepDetId') {
			if (pswField.getValue() !== '' && textfield.getValue() === '' && textfield.id !== 'passwordDetId') {
				errorText = 'Wachtwoord bevestigen is verplicht als er een nieuw wachtwoord is ingevuld.';
				textfield.setCls('error-indication');
				Ext.Msg.alert('Nieuw wachtwoord', errorText, Ext.emptyFn);
			}
		}
	},
	
	onBtnRefreshTeammembers: function (button, e, eOpts) {
		var dbase = new DatabaseSetup();
			dbase.setConnection(),
			me = this;
			
		var twDB = dbase.getConnection();
		twDB.transaction(function(tx) {
		    tx.executeSql("select * from teammember where id_teammember = ?;", [userProfile.id], function(tx, res) {
					
		        console.log("TeamMember select");
				
		        var row = res.rows.item(0),
					txtFields = me.getDetailedTeamMemberPanel().query('textfield');
				
				for (var i = 0; i < txtFields.length; i++) {
					txtFields[i].updateValue('');
					
					if (txtFields[i].id === 'surNameDetId') {
						txtFields[i].updateValue(row.surname);
					} else {
						if (txtFields[i].id === 'lastNameDetId') {
							txtFields[i].updateValue(row.lastname);
						} else {
							if (txtFields[i].id === 'phoneNumberDetId') {
								txtFields[i].updateValue(row.phonenumber);
							} else {
								if (txtFields[i].id === 'emailAdressDetId') {
									txtFields[i].updateValue(row.email_adress);
								} 
							}
						}
					}
				}
			});
		});			
	},
	
	onTapAlbum: function (button, e, eOpts) {
		console.log('Album button tapped');
		
		var btnId = button.getId(),
		    imgId = btnId === 'albumDetTMI-Id' ? 'teamMemberImageDetId' : 'usersPhotoId',
			gall = Ext.create('Tweamy.view.ImageGallery');
		
		gall.setImageTag(imgId);
		Ext.Viewport.add(gall);
		
		Ext.device.Camera.capture({
		    // Other options for source are: 'camera' & 'album'
		    // http://docs.sencha.com/touch/2.0.2/#!/api/Ext.device.camera.Abstract-method-capture
		    source: 'album',
		    destination: 'data',
 
		    success: function(imagedata) {
				
				var img = Ext.getCmp(imgId);
				
				if (imagedata.indexOf('http') > -1) {
					img.setSrc(imagedata);
					img.setHeight(150);
					img.setWidth(150);
				} else {
					img.setSrc('data:image/png;base64,' +imagedata);
				}
		    },
 
		    failure: function() {
		        Ext.Msg.alert('Error', 'There was an error when acquiring the picture.');
		    },
		    scope: this
		});
	},
	
	onTapTakePicture: function (button, e, eOpts) {
		console.log('CAMERA button tapped');
		
		var btnId = button.getId(),
		    imgId = btnId === 'cameraDetTMI-Id' ? 'teamMemberImageDetId' : 'usersPhotoId';
			
		Ext.device.Camera.capture({
		    // Other options for source are: 'camera' & 'album'
		    // http://docs.sencha.com/touch/2.0.2/#!/api/Ext.device.camera.Abstract-method-capture
		    source: 'camera',
		    destination: 'data',
 
		    success: function(imagedata) {
				
				var img = Ext.getCmp(imgId);
				
				if (imagedata.indexOf('http') > -1) {
					img.setSrc(imagedata);
					img.setHeight(150);
					img.setWidth(150);
				} else {
					img.setSrc('data:image/png;base64,' +imagedata);
				}
		    },
 
		    failure: function() {
		        Ext.Msg.alert('Error', 'There was an error when acquiring the picture.');
		    },
		    scope: this
		});
	},
	
	onButtomAddNewTeam: function (button, e, eOpts) {
		console.log("Add new team");
		
		// Reference to the main DOM element (titlebar and playground included)
		var el = this.getMain().element;

		/*
		Depending on the selected list show the associated
		detailed form
		*/
		if (!isAnimated) {

		    // Shrink the play ground and move it aside. If it is
		    // not already shrunken.
		    isAnimated = true;

		    Ext.Anim.run(el, new Ext.Anim({
		        duration: 1000,
		        easing: 'ease',
		        autoClear: false,
		        from: {
		            'transform': 'scale(1, 1)', 
		            '-moz-transform': 'scale(1, 1)',
		            '-webkit-transform': 'scale(1, 1)',
		            '-o-transform': 'scale(1, 1)'
		        },
		        to:{
		            'opacity': 0.7,
		            '-moz-transform':    'matrix(0.2, 0.000, 0.000, 0.2, -350px, 200px)',
		            '-webkit-transform': 'matrix(0.2, 0.000, 0.000, 0.2, -350, 200)',
		            '-o-transform':      'matrix(0.2, 0.000, 0.000, 0.2, -350, 200)',
		            'transform':         'matrix(0.2, 0.000, 0.000, 0.2, -350, 200)'
		        },
		    }));

			this.getMain().setMasked({
				transparant: true,
				listeners: {
					tap: {
						fn: this.revealMain,
						scope: this
					}
				}
			});
		}
		
		var panel = Ext.ComponentQuery.query('userprofile')[0].query('list');
        for (var i = 0; i < panel.length; i++) {
			panel[i].deselectAll(true);
        }
		
		this.getDetailed().setActiveItem(2);
	},
	
	onTapButtonAddTeam: function (button, e, eOpts) {
        console.log("Add team");

        var txtField = button.up('panel').query('textfield'),
			error = false;
		
		if (txtField[1].getValue() === '') {
			txtField[1].setCls('error-indication');
			error = true;
		} else {
			txtField[1].removeCls('error-indication');
		}

       if (!error) {
		   //	Save the data
		   this.saveTeamData(txtField);
        }
		
	},
	
	saveTeamData: function(values) {
        console.log("Save team");

		var dbase = new DatabaseSetup();
			dbase.setConnection();
			
		var twDB = dbase.getConnection();
		twDB.transaction(function(tx) {
			// Select a new idTeam number
			
		    tx.executeSql("select max(id_team) as newId from team",
		    null, function(tx, res) {
		    	
				var newId = 1
				
				if (res.rows.length > 0) {
					if (res.rows.item(0).newId !== null) {
						newId = res.rows.item(0).newId + 1;
					}
				}
				currentTeamId = newId;
				
	        	var tmList = Ext.ComponentQuery.query('#teamListId')[0],

		        //	Get associated store and update if necessary
		        //
	            store = Ext.data.StoreManager.lookup('TeamStore'),

	            rec = [{
					id_team: newId,
	                company_name: values[0].getValue(),
	                team_name: values[1].getValue(),
					initiator: '&#xe640;'
	            }];

		        //	Check if the 'No team there' text still in the store
		        //
				

		        store.add(rec);
		        //tmListStore.sync();


		        //Set the height of list
		        var h = store.getCount() * 2.3;
		        tmList.setHeight(h.toString() + "em");

		        //	make it selectable
		        //

		        tmList.setDisabled(false);
		        tmList.setDisableSelection(false);
        

		        // Update database
		        //
				tx.executeSql("INSERT INTO team (id_team, team_name, company_name) VALUES (?, ?, ?)", 
				[newId, values[1].getValue(), values[0].getValue()]);
				tx.executeSql("INSERT INTO is_member_of_team (id_team, id_teammember, who_is_initiator) VALUES (?, ?, ?)", 
				[newId, userProfile.id, userProfile.id]);
		    });
		});
    },
	
	onAddNewTeammember: function (button, e, eOpts) {
		console.log('Add new teammembers');
		
		Ext.Viewport.add(Ext.create('Tweamy.view.ContactsPanel'));
	}
});

