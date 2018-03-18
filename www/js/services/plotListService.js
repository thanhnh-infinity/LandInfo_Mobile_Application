var myApp = angular.module("ionicApp");
myApp.service('plotListService', function($http) {
	this.pushPlotToCloud = function(newPlot, action){
	  //action = put for new plots.  action = update for existing plots
    /*
    if (!isEmpty(newPlot.google_map_image_data)){
      console.log("Check image is OK : " + newPlot.google_map_image_data.substring(1, 100))
    } else {
      console.log("No image found")
    }
    */
	  if (isEmpty(action)) {
	  	action = 'put';
	  }
	  var googleToken = ''

      
      if (isEmpty(newPlot.rock_fragment)) {
      	var rock_fragment = {'soil_horizon_1': '','soil_horizon_2': '','soil_horizon_3': '','soil_horizon_4': '','soil_horizon_5': '','soil_horizon_6': '','soil_horizon_7': ''}
      	newPlot.rock_fragment = rock_fragment
      }
      //newPlot.rock_fragment.soil_horizon_1 = '0-15%';
      if (isEmpty(newPlot.texture)) {
      	var texture = {'soil_horizon_1': '','soil_horizon_2': '','soil_horizon_3': '','soil_horizon_4': '','soil_horizon_5': '','soil_horizon_6': '','soil_horizon_7': ''}
      	newPlot.texture = texture
      }
      //Slope, rock_fragment and texture are hardcoded for now.  Remove them when the API has been updated
      //REMOVE THIS BLOCK WHEN API IS FIXED
      //***********************************
      //if(isEmpty(newPlot.slope)) 
      	//newPlot.slope = '0';
      //if(isEmpty(newPlot.texture.soil_horizon_1)) 
      	//newPlot.texture.soil_horizon_1 = 'SAND';
      //if(isEmpty(newPlot.rock_fragment.soil_horizon_1))
      	//newPlot.rock_fragment.soil_horizon_1 = '0-15%';

      //***********************************
      return $http({
                method: 'POST',
                url: LANDPKS_API_ENDPOINT,

                headers: {'Content-type': 'application/x-www-form-urlencoded',
                          'X-Auth-Token': googleToken},

                //headers: {'Content-type': 'application/x-www-form-urlencoded'},
                transformRequest: function (obj) {
                  var str = []
                  for (var p in obj)
                    str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
                  return str.join('&')
                },
                timeout: HTTP_TIME_OUT_CONNECTION,
                data: {
                  action: action, object: 'landinfo',version: LANDPKS_API_VERSION,source: 'landinfo_mobile_app',
                  name: newPlot.name, recorder_name: newPlot.recorder_name, test_plot: newPlot.test_plot,
                  organization: newPlot.organization, latitude: newPlot.latitude, longitude: newPlot.longitude,
                  city: '', modified_date: '', land_cover: newPlot.land_cover, grazed: newPlot.grazed,
                  grazing: newPlot.grazing, flooding: newPlot.flooding, slope: newPlot.slope, slope_shape: newPlot.slope_shape,
                  bedrock_depth: newPlot.bedrock_depth,stopped_digging_depth: newPlot.stopped_digging_depth,
                  rock_fragment_for_soil_horizon_1: newPlot.rock_fragment.soil_horizon_1,
                  rock_fragment_for_soil_horizon_2: newPlot.rock_fragment.soil_horizon_2,
                  rock_fragment_for_soil_horizon_3: newPlot.rock_fragment.soil_horizon_3,
                  rock_fragment_for_soil_horizon_4: newPlot.rock_fragment.soil_horizon_4,
                  rock_fragment_for_soil_horizon_5: newPlot.rock_fragment.soil_horizon_5,
                  rock_fragment_for_soil_horizon_6: newPlot.rock_fragment.soil_horizon_6,
                  rock_fragment_for_soil_horizon_7: newPlot.rock_fragment.soil_horizon_7,
                  texture_for_soil_horizon_1: newPlot.texture.soil_horizon_1,
                  texture_for_soil_horizon_2: newPlot.texture.soil_horizon_2,
                  texture_for_soil_horizon_3: newPlot.texture.soil_horizon_3,
                  texture_for_soil_horizon_4: newPlot.texture.soil_horizon_4,
                  texture_for_soil_horizon_5: newPlot.texture.soil_horizon_5,
                  texture_for_soil_horizon_6: newPlot.texture.soil_horizon_6,
                  texture_for_soil_horizon_7: newPlot.texture.soil_horizon_7,
                  surface_salt: newPlot.surface_salt, surface_cracking: newPlot.surface_cracking,
                  soil_pit_photo_url: newPlot.soil_pit_photo_url,soil_samples_photo_url: newPlot.soil_samples_photo_url,landscape_north_photo_url: newPlot.landscape_north_photo_url,
                  landscape_east_photo_url: newPlot.landscape_east_photo_url,landscape_south_photo_url: newPlot.landscape_south_photo_url,landscape_west_photo_url: newPlot.landscape_west_photo_url,notes: newPlot.notes, google_map_image_base64_data : ''
                }

              })

	}


	this.loadPlotsFromCache = function(email, recorder_name) {
		console.log('Caching & Syncing :  Get Data From Local Cache - NO NEWS')
		// console.log(window.localStorage.getItem(recorder_name + "_" + "LIST_LANDINFO_PLOTS"))
		var LIST_PLOTS = JSON.parse(window.localStorage.getItem(email + '_' + 'LIST_LANDINFO_PLOTS'))
       	LIST_PLOTS_SORTED = sortPlotsAlpha(LIST_PLOTS, email);

		return LIST_PLOTS_SORTED;
	};

	this.loadPlotsFromCloud = function(email) {
		var url = LANDPKS_API_ENDPOINT
		return $http.get(
			url,
			{
				params: {
					action: 'get',
					object: 'landinfo',
					recorder_name: email,
					display: '',
					delimiter: ',',
					count : LANDINFO_COUNT_PLOTS_LOAD,
					cursor : LANDINFO_PLOTS_LOAD_CURSOR,
					version: LANDPKS_API_VERSION,
					type:'get_by_recorder_name'
				},
				timeout: HTTP_TIME_OUT_CONNECTION
			})
	}
	this.loadPlotFromCloud = function(recorder_name, plot_name) {
		var url = LANDPKS_API_ENDPOINT
		return	$http.get(
			url,
			{
                params: {
                  action: 'get',
                  object: 'landinfo',
                  recorder_name: recorder_name,
                  name : plot_name,
                  display: '',
                  delimiter: ',',
                  version: LANDPKS_API_VERSION,
                  type: 'get_by_pair_name_recorder_name'
                },
                timeout: HTTP_TIME_OUT_CONNECTION
              })
	}
	this.loadLandCoverPLotsFromCloud = function(email) {
		var url = LANDPKS_API_ENDPOINT;
		return $http.get(
			url, 
			{
    			params: {
      			action: 'get',
      			object: 'landcover_landinfo',
      			recorder_name: email,
      			quantity: LANDINFO_COUNT_PLOTS_LOAD,
      			version: LANDPKS_API_VERSION
    		},
    		timeout: HTTP_TIME_OUT_CONNECTION
  		})
	}

	this.updateCachedPlot = function(JSONArray, newPlot) {
		for (var index = 0; index < JSONArray.length; index++) {
			var plot = JSONArray[index]
			if (plot.name == newPlot.name) {
				JSONArray[index] = newPlot
			}
		}
		window.localStorage.setItem(newPlot.recorder_name + '_' + 'LIST_LANDINFO_PLOTS', JSON.stringify(JSONArray))
		window.localStorage.setItem('current_view_plot', JSON.stringify(newPlot))
    //window.localStorage.setItem('current_view_plot', JSON.stringify(newPlot))
		//Update the PENDING_LIST if the plot is already in it.
		var PENDING_LIST = JSON.parse(window.localStorage.getItem(newPlot.recorder_name + '_PENDING_UPLOAD_LANDINFO_LIST'))
        if (!isEmpty(PENDING_LIST)) {
        	for (var index = 0; index < PENDING_LIST.length; index++) {
		    	if(PENDING_LIST[index].recorder_name.trim().toUpperCase() === newPlot.recorder_name.trim().toUpperCase()
				   && PENDING_LIST[index].name.trim().toUpperCase() === newPlot.name.trim().toUpperCase()){
		    		PENDING_LIST[index] = newPlot;
		    	}
			}
		}
		window.localStorage.setItem(newPlot.recorder_name + '_PENDING_UPLOAD_LANDINFO_LIST', JSON.stringify(PENDING_LIST))      
	}

	this.copyCoverToInfo = function(coverArray, infoArray) {
		for (var i = 0; i < infoArray.length; i++) {
			/*infoPlot = infoArray[i];
			infoArray[i].has_land_cover = false; 
        	infoArray[i].land_cover_data = {};
			for (var j = 0; j < coverArray.length; j++) {
				coverPlot = coverArray[j];
				if (coverPlot.recorder_name.trim().toUpperCase() === infoPlot.recorder_name.trim().toUpperCase()
	      			&& coverPlot.name.trim().toUpperCase() === infoPlot.name.trim().toUpperCase()){
					infoArray[i].has_land_cover = coverPlot.has_land_cover; 
        			infoArray[i].land_cover_data = coverPlot.land_cover_data;
				}
			}*/
			//initialize all in case some are missing
			infoArray[i].landCoverObject = 
			{
        		"id": infoArray[i].id, 
        		"name": infoArray[i].name, 
        		"recorder_name": infoArray[i].recorder_name, 
        		"has_land_cover": false, 
        		"land_cover_data": {}
    		}
    		for (var j = 0; j < coverArray.length; j++) {
    			if(coverArray[j].id == infoArray[i].id){
    				infoArray[i].landCoverObject = coverArray[j];
    			}
    		}
		}
		return infoArray;
	}
	
	this.updateCoverObject = function(existingCoverObject, newCoverObject) {
		if (existingCoverObject.has_land_cover == false && isEmpty(existingCoverObject.land_cover_data)){
			newCoverObject.has_land_cover = true
			return newCoverObject
		} else {
			if(isEmpty(existingCoverObject.land_cover_data.transect)) {
				existingCoverObject.land_cover_data.transect = [];
			}
			for (var index = 0;  index < newCoverObject.land_cover_data.transect.length; index++) {
				existingCoverObject.land_cover_data.transect.push(newCoverObject.land_cover_data.transect[index]);
			}
			existingCoverObject.has_land_cover = true
			return existingCoverObject
		}
	}

	/*prepare plots for display - sort alpha, set upload status */
	this.preparePlots = function(data, email, recorder_name) {
		localPlots = sortPlotsAlpha(data, email);
    console.log("Co chay day 111")
		setUploadStatus(localPlots);
		//updateOrganizationList(localPlots, listOfOrganizations, recorder_name);
		return localPlots;

	}

	function isPlotInCloud (plot) {
		if (plot.id === null || plot.id === '' || plot.id === 'null' || plot.id === 'undefined' || plot.isActived == true) {
			return false
		} else {
			return true
		}
	}

	/* Sort list of plots alphabetically */
	function sortPlotsAlpha(plotList, email) {

		var LIST_PLOTS_SORTED = plotList

		if (!isEmpty(LIST_PLOTS_SORTED) && LIST_PLOTS_SORTED != null) {
			if (LIST_PLOTS_SORTED.length > 0) {
				LIST_PLOTS_SORTED.sort(function (a, b) {
					if (getRealPlotName(email, a.name).toUpperCase().trim() < getRealPlotName(email, b.name).toUpperCase().trim()) return -1
						if (getRealPlotName(email, a.name).toUpperCase().trim() > getRealPlotName(email, b.name).toUpperCase().trim()) return 1
							return 0
					})
			}
		}
		return LIST_PLOTS_SORTED
	}

	/* Update the organisation list based on the plots */
	function updateOrganizationList(plotList, listOfOrganizations, recorder_name) {
		if (!isEmpty(plotList) && plotList.length > 0){
			var plots_length = plotList.length

			for(var i = 0 ; i < plots_length ; i++){
				/* Add Organization to List */
				var plot = plotList[i]
				var str_organization = plot.organization
				if (!isEmpty(str_organization) && !isExistedInArray(str_organization,listOfOrganizations)){
					listOfOrganizations.push(str_organization)
				}
				/* End add */
			}
			window.localStorage.setItem(recorder_name +"_LIST_OF_ORGANIZATIONS",JSON.stringify(listOfOrganizations))
		}
	}

	/* set the uploaded checkmark */
	function setUploadStatus(plotList) {
		if (!isEmpty(plotList) && plotList != null) {
			if (plotList.length > 0) {
				for (var index = 0; index < plotList.length; index++) {
					var plot = plotList[index]
					if (isPlotInCloud(plot) == true) {
						plotList[index].img_src = 'landinfo_img/lpks_green_checkmark.png'
					} else {
						plotList[index].img_src = 'landinfo_img/lpks_empty_checkmark.png'
					}
				}
			}
		}
	}

});