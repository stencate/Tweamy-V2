/*
* @name Global
* @version 1.0
*
* 
*
* Copyright (c) 2013 Wizin
*
* @description <p>Global constant declarations</p>
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

/**
 * @const {String} Colors
 * @global
 *
 * @description <p>Apple color definitions in rgb() values. To use a transparant color: COLOR.setOpacity(opacity), with opacity between 0 and 1.</p>
 *
 **/
APPLE_BLUE = 'rgb(1, 124, 254)';
APPLE_BLUE_LIGHT = 'rgb(90, 198, 255)';
APPLE_RED = 'rgb(255, 62, 62)';
APPLE_ORANGE = 'rgb(246, 135, 17)';
APPLE_YELLOW = 'rgb(255, 224, 0)';
APPLE_GREEN = 'rgb(58, 196, 0)';
APPLE_BLACK = 'rgb(31, 31, 31)';
APPLE_BLACK2 = 'rgb(43, 43, 43)';
APPLE_GREY = 'rgb(188, 189, 193)';
APPLE_PURPLE = 'rbg(150, 61, 151)';
APPLE_WHITE = 'rgb(239, 239, 238)';

FLOATING_SCREEN_SCALE = 0.8;
/**
 * @property {object} userProfile
 * @global
 * @public
 *
 * @description <p>The user profile prperty keeps several frequently used values. As id, email adress, first time usgage, may use cell phone. auto login, if the user accepted the terms, if the user has been verified.</p>
 *
 **/
userProfile = {
	id:-1, 
	emailAdress: "", 
	firstTime: false, 
	mayUseCelNet: true, 
	autoLogin: true, 
	termsAccepted: false,
	verified: true,
	teams: null
};

/**
 * @property {object} imgArray
 * @global
 * @public
 *
 * @description <p>An array with images in base64 code</p>
 *
 **/
imgArray = new Array();
imgArray.push({id: 'namelessPerson', src: 'data:image/png;base64,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'});

isAnimated = true;
isUserprofileShown = false;

/**
 * @property {object} currentTeamId
 * @global
 * @public
 *
 * @description <p>The currently selected id of a team.</p>
 *
 **/
currentTeamId = -1;
/**
 * Extra String method: setOpacity
 *
 **/
String.prototype.setOpacity = function (opacity) {
	
	return 'rgba(' + this.slice(this.indexOf('(') + 1, this.lastIndexOf(')')) + ',' + opacity.toString() + ')';
};

/*
 * New Array method: getById
 *
 */
Array.prototype.getById = function (id)
{
	for (i = 0; i < this.length; i++)
	{
		if (this [i].id === id) {
			return this [i];
		}
	}
	
	// Id not found
	return null;
};

function generatepassword(plength){
	temp=''
	for (i=0;i<plength;i++)
	temp+=keylist.charAt(Math.floor(Math.random()*keylist.length))
	return temp
}