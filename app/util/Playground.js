/*
* @name LocalStoreModel
* @version 1.0
*
* Tweamy.model.LocalStoreModel
*
* Copyright (c) 2013 Wizin
*
* @description <p>Local store data model</p>
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

Ext.define('Tweamy.util.Playground', {
   alternateClassName: 'Playground',

	requires: [
		'Tweamy.view.RelationWithPanel',
	],
    config: {
        height: 100,
		width: 100,
		
		centerX: 50,
		centerY: 50,
		teamName: '',
		
		canvasName: 'playground',
		
		members: new Array()
    },
	
	/**
	 * @Constant piRelationDef
	 * @type {string} The playground relation defintion interface.
	 * @private
	 **/
	
	PI_RELATION_DEF: 'data:image/png;base64,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',
	
	PI_SELF_IMAGE: 'data:image/png;base64,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',
	
	/**
	 */
	title: 'Tweamy - ',
	titleObject: null,
	
	constructor: function (config) {
		//@debug
		console.log('Playground: constructor');
		
		this.initConfig(config);
		
		return this;
	},
	
	applyMembers: function (m) {
		
		if (Object.prototype.toString.call(m) === '[object Array]') {
			return new Array();
		} else {
			var ar = this.getMembers();
			ar.push(m);
			return ar;
		}
	},
	
	applyTeamName: function (name) {
		if (this.titleObject) {
			this.titleObject.setText(this.title + name);
		}
		
		return name;
	},
	
	applyHeight: function (h) {
		this.setCenterY(Math.ceil(h / 2));
		return h;
	},
	
	applyWidth: function (w) {
		this.setCenterX(Math.ceil( w /2));
		return w;
	},
	
	applyCenterX: function (x) {
		return x;
	},
	
	applyCenterY: function (y) {
		return y;
	},
	
	/**
	 * @method init
	 * @param None
	 * @return {object} A reference to the canvas
	 * @public
	 *
	 * @description <p>Creates a reference to the canvas using fabric.js</p>
	 *
	 **/
	init: function () {
		//@debug
		console.log('Playground setup: init canvas');
		
		var c = new fabric.Canvas(this.getCanvasName());
		
		c.setDimensions({height: this.getHeight(), width: this.getWidth()});
		c.setBackgroundImage('/resources/images/canvas.png', c.renderAll.bind(c));
		
		this.titleObject = this.addTitle();
		
		var btn = this.addBtnRelSelf();
		c.add(this.titleObject, this.addProfileButton(c), this.addShortCutsButton(c), btn[0], btn[1]); 


		return c;
	},
	
	/**
	 * @method addMember
	 * @param None
	 * @return none
	 * @public
	 *
	 * @description <p>Adds new members to the canvas</p>
	 *
	 **/
	addMember: function (memberObject) {
	
		this.setMembers(memberObject);
		console.log(memberObject.getIdTeammember() + ' added to the playground');
		
		if (memberObject.isForground) {
			canvas.add(memberObject.getMember());
			this.getMembers()[this.getMembers().length - 1].calculateSegments(memberObject);
		} else {
            var dbase = new DatabaseSetup();
                dbase.setConnection(),
                me = this;
			
            var twDB = dbase.getConnection();
            twDB.transaction(function(tx) {
                tx.executeSql("select x_coord, y_coord, angle, radius, scale from teammember where id_teammember = ?", [memberObject.getIdTeammember()], function (tx, res) {
                    
                    var row = null;
                        
                    if (res.rows.length > 0) {
                        
                        row = res.rows.item(0);
                        
                        if (row.x_coord === -1) {
                            var angle = 0,
                                radAndScale = null;
                                
                            angle = me.generateAngle(),
                            radAndScale = me.radiusAndScale();
                            
                            var firstAnchor = me.circlePoints(me.getCenterX(), me.getCenterY(), angle, 120),
                                secAnchor = me.circlePoints(firstAnchor.x, firstAnchor.y, angle, radAndScale.r); 
                                
                                memberObject.setConfig({top: secAnchor.y, left: secAnchor.x, scale: radAndScale.s});
                                
                                while (me.intersectsObject(memberObject.getMember())) {
                                    angle = me.generateAngle();
                                    radAndScale = me.radiusAndScale();
                                    
                                    firstAnchor = me.circlePoints(me.getCenterX(), me.getCenterY(), angle, 120),
                                    secAnchor = me.circlePoints(firstAnchor.x, firstAnchor.y, angle, radAndScale.r); 
                                    
                                    memberObject.setConfig({top: secAnchor.y, left: secAnchor.x, scale: radAndScale.s});	
                                    console.log('Angle, radAndscale, secAnchor: ' + angle +', ' + radAndScale.s + ', ' + radAndScale.r + ', ' + secAnchor.x + ', ' + secAnchor.y);
                                };
                                
                                var endLine = me.circlePoints(firstAnchor.x, firstAnchor.y, angle, radAndScale.r - 50),
                                    line = me.makeUnrelatedLine([firstAnchor.x, firstAnchor.y, endLine.x, endLine.y]);
                                    line.set('userIdLine', userProfile.id);
                                    line.set('idTeammemberLine', memberObject.getIdTeammember());
                                
                                canvas.add(memberObject.getMember(), line);
                                me.correctLineIntersection(line);
                                tx.executeSql("update teammember set x_coord = ?, y_coord = ?, angle = ?, radius = ?, scale = ? where id_teammember = ?", 
                                              [secAnchor.x, secAnchor.y, angle, radAndScale.r, radAndScale.s, memberObject.getIdTeammember()]);
      
                        } else {
                            
                            var angle = row.angle,                            
                                firstAnchor = me.circlePoints(me.getCenterX(), me.getCenterY(), angle, 120);
                                
                            memberObject.setConfig({top: row.y_coord, left: row.x_coord, scale: row.scale});
                            
                            var endLine = me.circlePoints(firstAnchor.x, firstAnchor.y, angle, row.radius - 50),
                                line = me.makeUnrelatedLine([firstAnchor.x, firstAnchor.y, endLine.x, endLine.y]);
                                line.set('userIdLine', userProfile.id);
                                line.set('idTeammemberLine', memberObject.getIdTeammember());
                            
                            canvas.add(memberObject.getMember(), line);
                            me.correctLineIntersection(line);                      
                        }
                        
                        me.getMembers()[me.getMembers().length - 1].calculateSegments(memberObject);
                    }
                });
            });
            
			
		}
	},
	
	/**
	 * @method addTitle
	 * @param None
	 * @return {object} The title
	 * @private
	 *
	 * @description <p>Adds the title to the canvas</p>
	 *
	 **/
	addTitle: function () {
		
		// Playground title
		return new fabric.Text(this.title + this.getTeamName(), {
			fontSize: 50,
			shadow: APPLE_BLACK.setOpacity(0.1) + ' -5px 60px 10px',
			left: this.getWidth() / 2,
			top: 25,
			fill: APPLE_BLACK2,
			stroke: APPLE_BLACK,
			strokeWidth: 1,
			controlType: 'title',
			selectable: false
		});
	},
	
	/**
	 * @method addBtnRelationDef
	 * @param 
	 * @return {object} The title
	 * @private
	 *
	 * @description <p>Adds the title to the canvas</p>
	 *
	 **/
	addBtnRelSelf: function () {
		console.log('Create interface');
		// Create a dummy img element to convert the base64 image data
		// to a real image.
		var imgEl = document.createElement('img');
		imgEl.src = this.PI_RELATION_DEF;
		
		var imgEl2 = document.createElement('img');
		imgEl2.src = this.PI_SELF_IMAGE;
		
		var _top = screen.height - imgEl.height - imgEl2.height - 15,
			_left = screen.width - Math.ceil(imgEl.width / 1.5) + 10,
			
			imgShape = new fabric.Image(imgEl, {
			top: _top, left: _left, height: Math.ceil(imgEl.height / 1.2), width: Math.ceil(imgEl.width / 1.2),
			
			hasControls: false,
			hasBorders: false,
			lockMovementX: true,
			lockMovementY: true,
			
			twType: 'relDefBtn',
			controlType: 'button'		
		});
		imgShape.setShadow({
			color: 'rgba(0,0,0, 0.2)', offsetX: -5, offsetY: 5, blur: 40
		});
		imgShape.on('mouseup', function () {
			//@debug
			console.log('Playground event: mouseup button relation def');
			
			var dbase = new DatabaseSetup();
			dbase.setConnection();
			var twDB = dbase.getConnection(),
				me = this;
			
			// Select the users data
		    twDB.transaction(function(tx) {
			    tx.executeSql("select * from (is_member_of_team INNER JOIN teammember ON is_member_of_team.id_teammember = teammember.id_teammember) where id_team = ? and set_image = ?;", 
				[currentTeamId, 'Y'], 
				function(tx, res) {
					
					if (res.rows.length > 0) {
				        var row = null,

						store = Ext.data.StoreManager.lookup('TeamMemberImageStore');
						store.removeAll(true);
			        	
				        for (var i = 0; i < res.rows.length; i++) {
				        	//debugger;
							row = res.rows.item(i);
							if (row.id_teammember !== userProfile.id) {
					            var data = [ {
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
				        }
					
						// Create modal selection list
					
						Ext.Viewport.add(Ext.create('Tweamy.view.RelationWithPanel', {
							id_teammember: row.id_teammember
						}));
					}
				});
		    });
		});
		
		var _top2 = screen.height - imgEl2.height - 20,
			_left2 = screen.width - imgEl2.width - 12,
			
			imgShape2 = new fabric.Image(imgEl2, {
			top: _top2, left: _left2, height: Math.ceil(imgEl2.height / 1.2), width: Math.ceil(imgEl2.width / 1.2),
			
			hasControls: false,
			hasBorders: false,
			lockMovementX: true,
			lockMovementY: true,
			
			twType: 'selfImgBtn',
			controlType: 'button'			
		});
		imgShape2.setShadow({
			color: 'rgba(0,0,0, 0.2)', offsetX: -5, offsetY: 5, blur: 40
		});
		imgShape2.on('mouseup', function () {
			//@debug
			console.log('Playground event: mouseup button self image');
		});
		
		imgShape.setCoords();
		imgShape2.setCoords();
		
		return [imgShape, imgShape2];
	},

	
	/**
	 * @method addProfileButton
	 * @param None
	 * @return {object} The button
	 * @private
	 *
	 * @description <p>Adds a button to the canvas</p>
	 *
	 **/
	addProfileButton: function (c) {
		
		// Playground profile button
		var btnHidePlayground = new fabric.Path('M 25 20 l 15 15 l 15 -15');
		btnHidePlayground.set({ 
			stroke: APPLE_BLUE, 
			strokeWidth: 3, 
			fill: '',
			shadow: APPLE_BLACK.setOpacity(0.3) + ' -5px 60px 10px',
			
			hasControls: false,
			hasBorders: false
		});
		var btnHideArea = new fabric.Circle({ // To make selection area bigger
			radius: 30, top: 30, left: 39,
			
			fill: APPLE_WHITE.setOpacity(0.5),
			
			hasControls: false,
			hasBorders: false,
			
			visible: false
		});
		var btnHideSelected = new fabric.Path('M 25 20 l 15 15 l 15 -15');
		btnHideSelected.set({ 
			stroke: APPLE_GREY.setOpacity(0.5), 
			strokeWidth: 3, 
			
			
			fill: '', 
			//shadow: APPLE_BLUE + ' 0px 0px 40px',
			
			hasControls: false,
			hasBorders: false,
			
			visible: false
		});
		
		var btnHide = new fabric.Group([btnHideArea, btnHideSelected, btnHidePlayground]);
		btnHide.set({
			hasControls: false,
			hasBorders: false,
			
			lockMovementX: true,
			lockMovementY: true,
			
			controlType: 'button'
		});
		btnHide.setCoords();
		
		btnHide.on('mouseup', function (options) {
			//@debug
			console.log('Playground event: mouseup hide playground');
			this.getObjects()[1].set({visible: false});
			this.getObjects()[2].set({visible: true});
			c.renderAll();
			
			var playgroundEl = Ext.ComponentQuery.query('#main')[0],
				el = playgroundEl.element;
			
			var scale = 0.2;
			
		    Ext.Anim.run(el, new Ext.Anim({
		        duration: 1000,
		        easing: 'ease',
		        autoClear: false,
		        from: {
		            'opacity': 1,
		            '-moz-transform':    'matrix(' + 1 + ', 0.000, 0.000, ' + 1 + ', 0px, 0px)',
		            '-webkit-transform': 'matrix(' + 1 + ', 0.000, 0.000, ' + 1 + ', 0, 0)',
		            '-o-transform':      'matrix(' + 1 + ', 0.000, 0.000, ' + 1 + ', 0, 0)',
		            'transform':         'matrix(' + 1 + ', 0.000, 0.000, ' + 1 + ', 0, 0)'
		        },
		        to:{
		            'opacity': 0.7,
		            '-moz-transform':    'matrix(' + scale + ', 0.000, 0.000, ' + scale + ', 0px, 0px)',
		            '-webkit-transform': 'matrix(' + scale + ', 0.000, 0.000, ' + scale + ', 0, 0)',
		            '-o-transform':      'matrix(' + scale + ', 0.000, 0.000, ' + scale + ', 0, 0)',
		            'transform':         'matrix(' + scale + ', 0.000, 0.000, ' + scale + ', 0, 0)'
		        },
				after: function () {

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
				}
		    }));
			
			playgroundEl.setMasked({
				transparant: true,
				listeners: {
					tap: {
						fn: function () {
							playgroundEl.setMasked(false);
			
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
						},
						scope: this
					}
				}
			});
		});
		
		btnHide.on('mousedown', function (options) {
			this.getObjects()[1].set({visible: true});
			this.getObjects()[2].set({visible: false});
			c.renderAll();
		});
		
		return btnHide;
	},
	
	/**
	 * @method addShortCutsButton
	 * @param None
	 * @return {object} The button
	 * @private
	 *
	 * @description <p>Adds a button to the canvas for some short cuts</p>
	 *
	 **/
	addShortCutsButton: function (c) {
		
		// Playground shortcuts
		var btnShortCuts1 = new fabric.Circle({ // To make selection area bigger
			radius: 3, top: 20, left: this.getWidth() - 25,
			
			fill: APPLE_BLUE,
			shadow: APPLE_BLACK.setOpacity(0.3) + ' -5px 60px 10px',
			hasControls: false,
			hasBorders: false,
			
			lockMovementX: true,
			lockMovementY: true
		});
		var btnShortCuts2 = new fabric.Circle({ // To make selection area bigger
			radius: 3, top: 28, left: this.getWidth() - 25,
			
			fill: APPLE_BLUE,
			shadow: APPLE_BLACK.setOpacity(0.3) + ' -5px 60px 10px',
			hasControls: false,
			hasBorders: false,
			
			lockMovementX: true,
			lockMovementY: true
		});
		var btnShortCuts3 = new fabric.Circle({ // To make selection area bigger
			radius: 3, top: 36, left: this.getWidth() - 25,
			
			fill: APPLE_BLUE,
			shadow: APPLE_BLACK.setOpacity(0.3) + ' -5px 60px 10px',
			hasControls: false,
			hasBorders: false,
			
			lockMovementX: true,
			lockMovementY: true
		});
		var btnShortCutsArea = new fabric.Circle({ // To make selection area bigger
			radius: 30, top: 30, left: this.getWidth() - 25,
			
			fill: APPLE_WHITE.setOpacity(0.5),
			
			hasControls: false,
			hasBorders: false,
			
			lockMovementX: true,
			lockMovementY: true,
			
			visible: false
		});
		
		// Selection indication
		var btnShortCuts1a = new fabric.Circle({ // To make selection area bigger
			radius: 3, top: 20, left: this.getWidth() - 25,
			
			fill: APPLE_GREY,
			
			//shadow: APPLE_BLUE + ' 05px 0px 40px',
			hasControls: false,
			hasBorders: false,
			
			lockMovementX: true,
			lockMovementY: true
		});
		var btnShortCuts2a = new fabric.Circle({ // To make selection area bigger
			radius: 3, top: 28, left: this.getWidth() - 25,
			
			fill: APPLE_GREY,
			
			//shadow: APPLE_BLACK.setOpacity(0.3) + ' 05px 0px 40px',
			hasControls: false,
			hasBorders: false,
			
			lockMovementX: true,
			lockMovementY: true
		});
		var btnShortCuts3a = new fabric.Circle({ // To make selection area bigger
			radius: 3, top: 36, left: this.getWidth() - 25,
			
			fill: APPLE_GREY,
			
			//shadow: APPLE_BLUE + ' 05px 0px 40px',
			hasControls: false,
			hasBorders: false,
			
			lockMovementX: true,
			lockMovementY: true
		});
		var btnShortCutsSelected = new fabric.Group([btnShortCuts1a, btnShortCuts2a, btnShortCuts3a])
		btnShortCutsSelected.set({visible: false});
		
		
		var btnShortCuts = new fabric.Group([btnShortCutsArea, btnShortCutsSelected, btnShortCuts1, btnShortCuts2, btnShortCuts3]);
		btnShortCuts.set({
			shadow: APPLE_BLUE + ' 0px 0px 40px',
			hasControls: false,
			hasBorders: false,
			
			lockMovementX: true,
			lockMovementY: true,
			controlType: 'button'
		});
		btnShortCuts.setCoords();
		

		
		btnShortCuts.on('mouseup', function () {
			//@debug
			console.log('Playground event: mouseup short cuts playground');
			this.getObjects()[1].set({visible: false});
			this.getObjects()[2].set({visible: true});
			this.getObjects()[3].set({visible: true});
			this.getObjects()[4].set({visible: true});
			c.renderAll();
            
            var dbase = new DatabaseSetup();
            dbase.setConnection();
            dbase.create();
		});
		btnShortCuts.on('mousedown', function () {
			this.getObjects()[1].set({visible: true});
			this.getObjects()[2].set({visible: false});
			this.getObjects()[3].set({visible: false});
			this.getObjects()[4].set({visible: false});
			c.renderAll();
		});
		
		return btnShortCuts;
	},
	
	/**
	 * Generate a random angle between -30 .. 210 degress.
	 * The angle is used to place the members on the stage relative to
	 * the app user (placed in the center of the screen)
	 *
	 * @method generateAngle
	 * @private
	 * @param none
	 * @return {Integer} The angle in degrees 
	 **/
	generateAngle: function (from, to) {
		var f = -30, t = 240;
		if (from) {
			f = from;
		}
		
		if (to) {
			t = to;
		}
		return Math.ceil(Math.floor(Math.random() * t) + f);
	},
	
	/**
	 * Select a random radius and scale.
	 *
	 * @method radiusAndScale
	 * @private
	 * @param none
	 * @return {Object} radius and scale 
	 **/
	radiusAndScale: function () {
		var r = [{r: 100, s: 0.4}, {r: 160, s: 0.4}, {r: 220, s: 0.4}];
		
		return r[Math.floor(this.randomFromInterval(0, 2))];
	},
	
	/**
	 * Function to calculate a point on a circle based on a angle and
	 * the radius of a circle. If the angle is greather then PI or negative, 
	 * then the angle will be subtracted with PI/2 until the angle is between
	 * 0 and PI.
	 *
	 * @method anchorPoints
	 * @private
	 * @param {integer} cX, the x-coordinate of the origin.
	 * @param (integer) cY, the y-coordinate of the origin.
	 * @param (float) a, the angle in degrees (0 .. 180).
	 * @param {integer} r, the radius of the circle.
	 * @return {Object} x, y coords A point on a circle
	 *
	 */

	circlePoints: function (cX, cY, a, r) {
		var aRadians = 0,
			x = 0,
			y = 0;
		
		if (a > 210 || a < -30) return null;
	
		aRadians = a * Math.PI / 180;
	
		x = Math.ceil(cX + r * Math.cos(aRadians));
		y = Math.ceil(cY - r * Math.sin(aRadians));
	
		return {x: x, y: y};
	},
	
	/**
	 * Draw a line between two circles
	 *
	 * @method makeLine
	 * @private
	 * @param {Object} The coordinates (x,y) of the start and end point
	 * @return {Group} The line
	 **/
	
	makeUnrelatedLine: function (coords) {
		
		var line, beginPoint, endPoint;
		
		line = new fabric.Line(coords, {
			fill: '',
			stroke: APPLE_RED,
			
			strokeDashArray: [3, 3],
			strokeWidth: 1,
			selectable: false
		})
		
		return line;
	},
	
	makeRelatedLine: function (id) {
		canvas.forEachObject(function(obj) {
			
		    if (obj.idTeammemberLine === id) {
		    	var c = [obj.x1, obj.y1, obj.x2, obj.y2];
				
				var line = new fabric.Line(c, {
					fill: '',
					stroke: APPLE_RED,
			
					strokeWidth: 1,
					selectable: false
				})
				
				var circle = new fabric.Circle({
					radius: 2, top: c[3], left: c[2],
					
					fill: APPLE_RED,
			
					strokeWidth: 1,
					stroke: APPLE_RED
				});
				
				canvas.add(line, circle);
				
				canvas.remove(obj);
		    }
		});
	},
	
	/**
	 * Check of the object on the canvas intersect with each other.
	 * If so then find an other spot on the canvas.
	 *
	 * @method intersectsObject
	 * @private
	 * @param {Object} t, The target object on the canvas to check
	 * @return {boolean} True if there is a intersection otherwise false.
	 **/
	intersectsObject: function (t) {
		var intersects = false;
		
		t.setCoords(); 
		for (var i = 0; i < canvas.getObjects().length && !intersects; i++) {
		    if (canvas.getObjects()[i] !== t) {
		    	intersects = t.intersectsWithObject(canvas.getObjects()[i]);
                if (intersects) {
                    console.log('Target intersects!');
                }
		    }
		}
		
		return intersects;
	},
	
	/**
	 * Check of a line intersects with an object
	 * If so then move it backwards.
	 *
	 * @method correctLineIntersection
	 * @param {Object} t, The target object on the canvas to check
	 * @return none
	 **/
	correctLineIntersection: function (t) {
		
		for (var i = 0; i < canvas.getObjects().length; i++) {
		    if (canvas.getObjects()[i] !== t) {
		    	t.sendBackwards(true);
		    }
		}
	},
	
	/**
	 * @description Function to generate a rando number between two numbers (from and to).
	 *
	 * @Function randomFromInterval
	 * @param {integer} from, the number to start with.
	 * @param {integer} to, the maximum value of a random number.
	 * @return {integer} a random number between from and to.
	 *
	 */
	randomFromInterval: function (from,to)
	{
	    return Math.floor(Math.random()*(to-from+1)+from);
	},
	
	/**
	 * @description Function to generate a rando number between two numbers (from and to).
	 *
	 * @Function updateSegments
	 * @param none
	 * @return 
	 *
	 */
	updateSegments: function (arg)
	{
		if (Object.prototype.toString.call(arg) === '[object Array]') {
			// Args is an array of circle segments
			for (var i=0; i < arg.length; i++) {
				canvas.add(arg[i]);
			}
			canvas.renderAll();
		} else {
			// Args is a member id
			var id_teammember = arg;
			
			var m = this.getMembers();
			for (var i = 0; i < m.length; i++) {
				if (m[i].getIdTeammember() === id_teammember) {
					
					var segments = m[i].getImageSegments();
					
					for (var j = 0; j < segments.length; j++) {
						canvas.remove(segments[j]);
					}
					canvas.renderAll();
					
					m[i].calculateSegments(m[i]);
					break;
				}
			}
		}		
	},
	
	cleanCanvas: function () {
		
		for (var i = 0; i < canvas.getObjects().length; i++) {
		    if (canvas.getObjects()[i].controlType !== 'button' || canvas.getObjects()[i].controlType !== 'title') {
		    	canvas.remove(canvas.getObjects()[i]);
		    }
		}
	}
});