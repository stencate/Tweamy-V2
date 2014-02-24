/*
	Tweamy.store.TeamMemberStore

	Description: 

	Version: "1.0", Build: "0"
	Date: august 2013

	Design & Development: Triple M IT
	by Stefan ten Cate

*/

Ext.define('Tweamy.store.TeamMemberImageStore', {
    extend: 'Ext.data.Store',

    requires: [
        'Tweamy.model.TeammemberModel'
    ],

    config: {
        model: 'Tweamy.model.TeammemberModel',
		autoLoad: true,
		autoSync: true,
        storeId: 'TeamMemberImageStore',
        proxy: {
            type: 'memory'
        }
    }
});