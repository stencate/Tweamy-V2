/**
 * A simple store for image URIs/sources for various images, which we get using
 * the device API.
 */
Ext.define('Tweamy.store.Images', {
    extend: 'Ext.data.Store',

    config: {
        fields: ['src']
    }
});
