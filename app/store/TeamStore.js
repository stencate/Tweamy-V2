/*
	Tweamy.store.TeamStore

	Description: 

	Version: "1.0", Build: "0"
	Date: august 2013

	Design & Development: Triple M IT
	by Stefan ten Cate

*/

Ext.define('Tweamy.store.TeamStore', {
    extend: 'Ext.data.Store',

    requires: [
        'Tweamy.model.TeamModel'
    ],

    config: {
        model: 'Tweamy.model.TeamModel',
		autoLoad: true,
		autoSync: true,
        storeId: 'TeamStore',
        proxy: {
            type: 'memory'
        }
    }
});