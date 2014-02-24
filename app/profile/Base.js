/*
	Tweamy.profile.Base

	Description: Base profile 

	Version: "1.0", Build: "0"
	Date: august 2013

	Design & Development: Triple M IT
	by Stefan ten Cate

*/

Ext.define('Tweamy.profile.Base', {
  extend: 'Ext.app.Profile',

  launch: function () {

    console.log("Base profile");

    // Destroy the #appLoadingIndicator element
    Ext.fly('appLoadingIndicator').destroy();
   
  }

});