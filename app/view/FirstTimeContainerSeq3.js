/*
* @name FirstTimeContainerSeq3
* @version 1.0
*
* Tweamy.view.FirstTimeContainerSeq3
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

Ext.define('Tweamy.view.FirstTimeContainerSeq3', {
    extend: 'Ext.Panel',
	alias: ['widget.firstTimeContainerSeq3'],
	
    xtype: 'firstTimeContainerSeq3',

    config: {
		height: '100%',
		width: '100%',
        layout: {
            type: 'vbox'
        },
        items: [
            {
                xtype: 'container',
                flex: 1,
                layout: {
                    type: 'hbox'
                },
                items: [
                    {
                        xtype: 'container',
                        flex: 1,
                        margin: '2em 0em 2em 2em',
                        items: [
                            {
                                xtype: 'fieldset',
                                title: 'Algemeen',
                                items: [
                                    {
                                        xtype: 'textfield',
                                        id: 'surName',
                                        itemId: 'mytextfield',
                                        label: 'Voornaam',
                                        labelWidth: '40%',
                                        tabIndex: 1,
                                        placeHolder: 'vereist'
                                    },
                                    {
                                        xtype: 'textfield',
                                        id: 'lastName',
                                        itemId: 'mytextfield1',
                                        label: 'Achternaam',
                                        labelWidth: '40%',
                                        tabIndex: 2,
                                        placeHolder: 'vereist'
                                    },
                                    {
                                        xtype: 'textfield',
                                        id: 'phoneNumber',
                                        component: {
                                            xtype: 'input',
                                            type: 'tel'
                                        },
                                        label: 'telefoonnummer',
                                        labelWidth: '40%',
                                        tabIndex: 3,
                                        placeHolder: 'optioneel'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        flex: 0.3,
                        border: 2,
                        margin: '2em 2em 2em 2em',
                        layout: {
                            type: 'vbox'
                        },
                        items: [
                            {
                                xtype: 'container',
                                flex: 1,
                                margin: '0em 0em 2em 0em',
                                items: [
                                    {
                                        xtype: 'image',
                                        centered: true,
                                        docked: 'top',
                                        height: '150px',
                                        id: 'usersPhotoId',
                                        width: '150px',
                                        src: 'resources/images/Person-64.png'
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                items: [
                                    {
                                        xtype: 'button',
                                        id: 'cameraId',
                                        styleHtmlContent: true,
                                        ui: 'plain',
                                        width: 60,
                                        iconCls: 'icon-camera',
										action: 'takePicture'
                                    },
                                    {
                                        xtype: 'button',
                                        docked: 'right',
                                        height: 30,
                                        id: 'albumId',
                                        ui: 'plain',
                                        width: 100,
                                        text: 'Album',
										action: 'showAlbum'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                xtype: 'container',
                flex: 1,
                layout: {
                    type: 'hbox'
                },
                items: [
                    {
                        xtype: 'container',
                        flex: 1,
                        margin: '0em 0em 2em 2em',
                        items: [
                            {
                                xtype: 'fieldset',
                                title: 'Gebruikersnaam',
                                items: [
                                    {
                                        xtype: 'textfield',
                                        id: 'emailAdress',
                                        label: 'E-mail',
                                        labelWidth: '40%',
                                        tabIndex: 4,
                                        placeHolder: 'e-mail@bedrijf.com (vereist)'
                                    },
                                    {
                                        xtype: 'passwordfield',
                                        id: 'password',
                                        label: 'Wachtwoord',
                                        labelWidth: '40%',
                                        tabIndex: 5,
                                        placeHolder: 'vereist'
                                    },
                                    {
                                        xtype: 'passwordfield',
                                        id: 'passwordRep',
                                        label: 'Bevestig wachtwoord',
										labelWidth: '40%',
                                        tabIndex: 6,
                                        placeHolder: 'vereist'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        flex: 0.3,
                        margin: '0em 2em 2em 2em'
                    }
                ]
            },
            {
                xtype: 'container',
                flex: 0.2,
                margin: '0em 2em 2em 2em',
                items: [
                    {
                        xtype: 'button',
                        docked: 'right',
                        height: 30,
                        id: 'readyToUseId',
                        ui: 'plain',
                        width: 120,
                        text: 'Gereed'
                    }
                ]
            }
        ]
    }

});