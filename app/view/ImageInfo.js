/*
	Tweamy.view.Terms

	Description: 

	Version: "1.0", Build: "0"
	Date: august 2013

	Design & Development: Triple M IT
	by Stefan ten Cate

*/

Ext.define('Tweamy.view.ImageInfo', {
	extend: 'Ext.Panel',
	xtype: 'imageInfo',
	
	config: {
		
        fullscreen: false,
		
	    modal: true,
	    hideOnMaskTap: true,
	    centered: true,
		width: 700,
		height: 650,
		
        items: [
			{
                xtype: 'toolbar',
				id: 'imageInfoTitlebarId',
                docked: 'top',
                title: 'Uitleg van gedragskenmerken'
            },
			{
				xtype: 'container',
				scrollable: true,
				height: '100%',
				//html: '<div class=\'stretch-container\'><div id=\'stretch-offset\'><ul><li>Resultaatgericht: Is intrinsiek gemotiveerd, stelt ambitieuze en haalbare doelen, vertaalt die naar concrete resultaten en werkt hier efficiënt en effectief naar toe.</li><li>Inspirerend: Weet enthousiasme en bezieling los te maken en stimuleert de persoonlijke groei van anderen.</li><li>Relatiegericht: Maakt verbinding met mensen en onderhoudt open, warme en gelijkwaardige relaties.</li><li>Zelfontplooiing: Gericht op persoonlijke groei waarbij kennis, inzicht en feedback worden gebruikt en zelfreflectie wordt toegepast.</li><li>Bevestiging zoeken: Vraagt direct en indirect goedkeuring, steun en waardering van anderen.</li><li>Traditioneel: Handelt volgens gewoontes en regels, zoekt en houdt vast aan bestaande patronen, normen en waarden. Is plichtsgetrouw.</li><li>Volgzaam: Laat zijn doelen door anderen bepalen en laat zich leiden in het bereiken ervan.</li><li>Anoniem : Is stil of kort van stof, laat zijn werkelijke mening en gevoelens niet snel merken, leidt de aandacht van zichzelf af.</li><li>Kritisch: Uit zich negatief of neerbuigend, oordeelt en veroordeelt, is achterdochtig en ziet overal fouten.</li><li>Dominant: Legt zijn wil aan anderen op, overheerst, stuurt, wil bepalend zijn.</li><li>De beste willen zijn: Wil beter zijn dan een ander, strijdvaardig, is bereid om hiervoor relaties op het spel te zetten, vergelijkt met anderen.</li><li>Perfectionistisch: Wil geen fouten maken, streeft perfecte oplossingen en resultaten na, gericht op de eigen taakuitvoering, het moet altijd beter.</li></ul></div></div>'
			}
			
		]
	},
    
    initialize: function() {

        console.log('Initialize image info');
		var dbase = new DatabaseSetup();
			dbase.setConnection(),
			me = this;
        
		var twDB = dbase.getConnection();
        
        try {
            twDB.transaction(function(tx) {
                tx.executeSql("select id_behavior_characteristics, characteristic, abbreviation, dom_behavior_characteristics.description as descr, dom_behaviour.id_behaviour as id_beh from dom_behaviour inner join dom_behavior_characteristics on dom_behaviour.id_behaviour = dom_behavior_characteristics.id_behaviour order by characteristic", [], function (tx, res) {
                    
                    var row = null,
					   container = me.getItems().items[1],
                        strStart = '<div class=\'stretch-container\'><div id=\'stretch-offset\'><ul><li>',
                        strMid = '</li><li>',
                        strEnd = '</li></ul></div></div>';
                
				    if (res.rows.length > 0) {
					   for (i = 0; i < res.rows.length; i++) {
                            row = res.rows.item(i);
                            if (i < res.rows.length - 1) {
                                strStart += row.characteristic + ': ' + row.descr + strMid;
                            } else {
                                strStart += row.characteristic + ': ' + row.descr;
                            }
                        }
                    
                        strStart += strEnd;
                    
                        container.setHtml(strStart);
                    }
                });
            });
        } catch(e) {
            console.log("SQL Error on image info: " + e.message);
        }			 	
    }
});