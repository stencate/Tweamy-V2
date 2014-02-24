/*
* @name Member
* @version 1.0
*
* Tweamy.util.Member
*
* Copyright (c) 2013 Wizin
*
* @description <p>Member (user) graphical representation</p>
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

Ext.define('Tweamy.util.Member', {
	mixins: ['Ext.mixin.Observable'],
	
	alternateClassName: 'Member',
	xType: 'memberType',
	
	config: {
		idTeammember: -1,
		
		photo: '',
		top: 0,
		left: 0,
		scale: 1,
		
		forground: true,
		objectType: 'member',
		
		member: null,
		
		imageSet: 'N',
		imageSegments: new Array()
	},
	
	requires: [
		'Tweamy.view.SelfMirrorImagePanel',
		'Tweamy.util.DatabaseSetup'
	],
	
	isForground: true,
	isMember: true,
	

	
	constructor: function (config) {
		//@debug
		console.log('Init member');
		
		this.initConfig(config);	
		
		return this;
	},
	
	applyForground: function(f) {
		this.isForground = f;
		
		return f;
	},
	
	applyImageSet: function (i) {
		return i;
	},
	
	applyObjectType: function (ot) {
		this.isMember = (ot === 'member' ? true : false);
		
		return ot;
	},
	
	applyPhoto: function (photo) {
		return photo;
	},
	
	applyTop: function (t) {
		if (this.getMember()) {
			this.getMember().set({top: t});
		}
		
		return Math.ceil(t);
	},
	
	applyLeft: function (l) {
		if (this.getMember()) {
			this.getMember().set({left: l});
		}
		
		return Math.ceil(l);
	},
	
	applyScale: function (s) {
		if (this.getMember()) {
			this.getMember().set({scaleX: s});
			this.getMember().set({scaleY: s - 0.02});
		}
		return s;
	},
	
	applyIdTeammember: function (id) {
		return id;
	},
	
	applyMember: function (photo) {
		
		if (photo !== undefined && photo !== null) {
			this.setPhoto(photo);
		}
		
		// Create a dummy img element to convert the base64 image data
		// to a real image.
		var imgEl = document.createElement('img');
		imgEl.src = imgArray.getById(this.getPhoto()).src;
		
		// The teammember shapes
		var circle, shadow, innerRing, outerRing;

		if (true) {
			circle = new fabric.Circle({
				radius: 75, top: 100, left: 100
			});
			circle.setGradient('fill', {
				x1: 0, y1: circle.height, x2: circle.width, y2: circle.height / 8,
				colorStops: {
					0: '#ffb300',
					0.7: '#ffc640',
					1: '#f0ffb0'
				}
			});
		} else {
			circle = new fabric.Circle({
				radius: 75, top: 100, left: 100
			});
			circle.setGradient('fill', {
				x1: 0, y1: circle.height, x2: circle.width, y2: circle.height / 8,
				colorStops: {
					0: '#b00000',
					0.7: '#f08060',
					1: '#e8e8e8'
				}
			});
		}

		circle.setShadow({
			color: 'rgba(0,0,0, 0.3)', offsetX: -50, offsetY: 70, blur: 40
		});

		imgShape = new fabric.Image(imgEl, {
			top: 100, left: 100,
			clipTo: function (ctx) {
				ctx.arc(0, 0, 50, 0, Math.PI * 2, true);
			}
		});

		innerRing = new fabric.Circle({
			radius: 90, top: 100, left: 100,
			fill: 'rgba(0,0,0,0)',
	
			strokeWidth: 1,
			stroke: '#F0F0F0'
		});

		outerRing = new fabric.Circle({
			radius: 105, top: 100, left: 100,
			fill: 'rgba(0,0,0,0)',
	
			strokeWidth: 1,
			stroke: '#F0F0F0'
		});
			
		var m = new fabric.Group([circle, imgShape, innerRing, outerRing]);
		m.set({
			top: this.getTop(),
			left: this.getLeft(),
			
			selectable: true, 
			
			hasControls: false,
			hasBorders: false,
			lockMovementX: true,
			lockMovementY: true,
			
			scaleX: this.getScale(),
			scaleY: this.getScale() - 0.02,
			forground: this.isForground, 
			isMember: this.isMember,
			idTeammember: this.getIdTeammember(),
			controlType: 'member'
		});
			
		m.setCoords();
		
 		m.on('mouseup', function (options) {
			console.log('Mouse up event member: ' + this.idTeammember);
 			
			var dbase = new DatabaseSetup();
			dbase.setConnection();
			var twDB = dbase.getConnection(),
				me = this;
			
			// Select the users data
		    twDB.transaction(function(tx) {
			    tx.executeSql("select * from teammember where id_teammember = ?;", 
					[me.idTeammember], 
					function(tx, res) {
								
				        var row = res.rows.item(0),
							store = Ext.data.StoreManager.lookup('TeamMemberImageStore'),
				        
			            	data = [ {
								id_teamMember: row.id_teammember,
				                surname: row.surname, 
				                lastname: row.lastname, 
				                phonenumber: row.phonenumber, 
				                email_adress: row.email_adress, 
				                terms_accepted: row.terms_accepted, 
				                password: row.password, 
								photo: row.photo,
				                photo_data: row.photo_data ,
								autologin: row.autologin,
								may_use_cel: row.may_use_cel,
								set_image: row.set_image
							} ];
					
					store.removeAll(true);
			        store.add(data);
					
					Ext.Viewport.add(Ext.create('Tweamy.view.SelfMirrorImagePanel', {
						id_teammember: row.id_teammember,
						forground: me.forground
					}));
					
				});
		    });
		   
 		});		
		
		return m;
	},
	
	applyImageSegments: function (is) {
		console.log('Apply image segments');
		
		if (is.length === 0) {
			return new Array();
		} else {
			var ar = this.getImageSegments();
			for (var i = 0; i < is.length; i++) {
				ar.push(is[i]);
			}
			
			return ar;
		}
	},
	
	calculateSegments: function (me) {
		console.log('Calculate segments for: ' + me.getIdTeammember());
		var dbase = new DatabaseSetup();
			dbase.setConnection();
		
		var twDB = dbase.getConnection();
		twDB.transaction(function(tx) {
		    tx.executeSql("select score, behaviour, abbreviation, characteristic, profile.id_behaviour as id_beh, profile.id_behavior_characteristics as id_beh_char from profile inner join dom_behaviour inner join dom_behavior_characteristics on profile.id_behaviour = dom_behaviour.id_behaviour and profile.id_behavior_characteristics =  dom_behavior_characteristics.id_behavior_characteristics where id_team = ? and id_teammember = ? and self_image = ?;",
		    [currentTeamId, me.getIdTeammember(), me.isForground ? 'Y' : 'N'], function(tx, res) {
				
				console.log('Data fetch for: ' + me.getIdTeammember());
				var row = null;
				
				var imageSum = 0,
					seg = new Array(),
					segment = new Array();
				
                /***
                 *  APPLE_RED corresponds with BL (Bovenliggend gedrag)
                 *  APPLE_GREEN corresponds with VB (Verbindend gedrag)
                 *  APPLE_BLUE corresponds with OL (Onderliggend gedrag)
                 */
				var color = [APPLE_RED, APPLE_GREEN, APPLE_BLUE];
				
				// Initialize Segments
				for (var i = 0; i < 3; i++) {
					seg.push(0);
				}
				
				if (res.rows.length > 0) {
                    for (i = 0; i < res.rows.length; i++) {
                        // Each row is a standard JavaScript array indexed by
                        // column names.
                        row = res.rows.item(i);
						
					imageSum += row.score;
					switch (row.abbreviation) {
						case 'BL' :
							seg[0] += row.score;
							break;

						case 'VB' :
							seg[1] += row.score;
							break;

						case 'OL' :
							seg[2] += row.score;
							break;
						}
					}
					console.log('BL-OL-VB score and sum are: ' + seg[0] + ', ' + seg[1] + ', ' + seg[2] + ', ' + imageSum);
					
					var sumAngle = 0;
					for (var i = 0; i < seg.length; i++) {
						var s = {angle: 0, color: ''},
							angle = Math.round(seg[i] / imageSum * 360);

						if (angle > 180) {

							sumAngle += 180;
							segment.push({angle: 180, color: color[i]});

							sumAngle += angle - 180;
							segment.push({angle: angle - 180, color: color[i]});

						} else {
							sumAngle += angle;
							segment.push({angle: angle, color: color[i]});
						}
					}		
					//debugger;
					var radius = me.getMember().getObjects()[me.isForground ? 2 : 3].radius * me.getScale(),
						centerX = me.getLeft(),
						centerY= me.getTop();
				    var arcStart = {x: centerX + radius, y: centerY};
					
					var is = me.drawImageSegments(arcStart, {x: centerX, y: centerY}, radius, segment, me.isForground);
					
					me.setImageSegments(is);
					playground.updateSegments(is);
					
					if (!me.isForground) {
						// So we have segments thus change the relation line to related
						playground.makeRelatedLine(me.getIdTeammember());
					}
				}
		    });
		});
	},
	
	/**
	 * @method arcCircle
	 * @param {object} X, Y coordinates, {integer} radius, {object} segment
	 * @return none
	 * @private
	 *
	 * @description <p></p>
	 *
	 **/
	drawImageSegments: function (arcStart, center, radius, segment, forground) {
		
		/* Calulation only valid if the central angle is between 0 and 180 degrees. 
		 * If the angle is greater than 180 degress we will draw a so called large Arc.
		 * 
		 */
	
		var sumAngle = 0,
			segs = new Array();
			
		for (var i = 0; i < segment.length; i++) {
			var p = new fabric.Path('M 422,384 A90,90 0 0,1 180,0', { fill: '', stroke: segment[i].color, strokeWidth: forground ? 4 : 2 });
		
			var segAngleRad = segment[i].angle * Math.PI / 180;
		
			sumAngle += segment[i].angle;
			var segAngleRad = (sumAngle) * Math.PI / 180;
		
			console.log('sumAngle: ' + sumAngle + ' angle: ' + segment[i].angle);
		
			p.path[0][1] = arcStart.x;
			p.path[0][2] = arcStart.y;

			p.path[1][1] = radius;
			p.path[1][2] = radius;

		    p.path[1][4] = 0;
		    p.path[1][5] = 1;

		    p.path[1][6] =  center.x + Math.round((Math.cos(segAngleRad) * radius) * 10) / 10;
		    p.path[1][7] =  center.y + Math.round((radius * Math.sin(segAngleRad)) * 10) / 10;
		
		
			p.selectable = false;
			console.log('Path M: ' + p.path[0]);
			console.log('Path A: ' + p.path[1]);
		
			// Set next start point for the next Arc
			arcStart = {x: p.path[1][6], y: p.path[1][7]};
			
			segs.push(p);
		}
		
		return segs;
	},
	
});