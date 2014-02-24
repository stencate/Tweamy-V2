/*
	Tweamy.profile.Phone

	Description: Profile settings for phones

	Version: "1.0", Build: "0"
	Date: august 2013

	Design & Development: Triple M IT
	by Stefan ten Cate

*/

Ext.define('Tweamy.profile.Phone', {
	extend: 'Tweamy.profile.Base',
	
	config: {
		name: 'Phone',
		
		views: ['Main'],
        
        controllers: [
			'MainController'
		]
	},
    
	isActive: function(){
		console.log("Phone active");
		return Ext.os.is('Phone');
	},
	
	launch: function(){
		console.log("Phone profile launch");
		this.callParent();
		
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();
		
		// Populate the playground. 
		// If its the first time the user uses this app then we will display only one empty member.
		// In al other cases the stage will be built depending on the progress of the teambuilding proces.
		if (userProfile.firstTime) {
			
			var memb = new Member({
				idTeammember: userProfile.id,
				photo: 'namelessPerson',
				top: Math.ceil(playground.getHeight() / 2),
				left: Math.ceil(playground.getWidth() / 2),
				imageSet: 'N'
			});
			
			memb.setMember();
			playground.addMember(memb);
			
			// Remove the loading mask
			Ext.ComponentQuery.query('#playgroundContainer')[0].setMasked(false);
		} else {
			
			var dbase = new DatabaseSetup();
			dbase.setConnection();
			
			var twDB = dbase.getConnection();
			
			twDB.transaction(function(tx) {
			    //
			    //	Select the user from the database
			    //
				
			    tx.executeSql("select id_teammember, email_adress, photo_data, set_image from teammember where id_teammember = ?;", 
					[userProfile.id], 
					function(tx, res) {

				        console.log("TeamMember select");
						
				        var row = res.rows.item(0);
							
						imgArray.push({id: row.email_adress, src: row.photo_data});
						
						var memb = new Member({
							idTeammember: userProfile.id,
							photo: row.email_adress,
							top: Math.ceil(playground.getHeight() / 2),
							left: Math.ceil(playground.getWidth() / 2),
							imageSet: row.set_image
						});
			
						memb.setMember();
						
						playground.addMember(memb);
						canvas.renderAll();
			    });
				
			    //
			    // Select the first team he or she belongs to
			    //
				
			    tx.executeSql("select id_team, team_name from team where id_team = ?", 
				[currentTeamId], function(tx, res) {
					
					var row;
					
			        if (res.rows.length > 0) {
			        	
						row = res.rows.item(0);
						playground.setTeamName(row.team_name);
						canvas.renderAll();
						
						// Select the members of Team with idTeam
					    tx.executeSql("select teammember.id_teammember as id_teammember, email_adress, photo_data, set_image from is_member_of_team inner join teammember on is_member_of_team.id_teammember = teammember.id_teammember where is_member_of_team.id_team = ?", 
						[row.id_team], function(tx, res) {
							
							var row;
							
							if (res.rows.length > 0) {
			                    for (var i = 0; i < res.rows.length; i++) {
			                        
			                        row = res.rows.item(i);
									
									if (userProfile.id !== row.id_teammember) {
										imgArray.push({id: row.email_adress, src: row.photo_data});
										
										var tm = new Member({
											idTeammember: row.id_teammember,
											forground: false,
											photo: row.email_adress,
											imageSet: row.set_image
										});
			
										tm.setMember();

										playground.addMember(tm);
										canvas.renderAll();
									}
								}
							}
							// Remove the loading mask
							Ext.ComponentQuery.query('#playgroundContainer')[0].setMasked(false);
						});
			        } else {
						// Remove the loading mask
						Ext.ComponentQuery.query('#playgroundContainer')[0].setMasked(false);
			        }
					
				});
			});
			
			
		}
		
	}
});