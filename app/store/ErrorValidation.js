/*
	Tweamy.store.ErrorValidation

	Description: 

	Version: "1.0", Build: "0"
	Date: august 2013

	Design & Development: Triple M IT
	by Stefan ten Cate

*/

Ext.define('Tweamy.store.ErrorValidation', {
    extend: 'Ext.data.Store',

    requires: [
        'Tweamy.model.ErrorRecord'
    ],

    config: {
        autoLoad: true,
        autoSync: true,
        model: 'Tweamy.model.ErrorRecord',
        storeId: 'ErrorValidation',
        proxy: {
            type: 'memory'
        }
    }
});