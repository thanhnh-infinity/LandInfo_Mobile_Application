/********************/
/* Global variable */
/********************/

/*******Commoon***************/
var icon_green_checkmark = "img/lpks_green_checkmark.png";
var icon_empty_checkmark = "img/lpks_empty_checkmark.png";
var icon_yellow_checkmark = "img/lpks_yellow_checkmark.png";

/*******Transect Cover********/


/** For STICK **/
var STICK_1  = "STICK_1";
var STICK_2  = "STICK_2";
var STICK_3  = "STICK_3";
var STICK_4  = "STICK_4";
var STICK_5  = "STICK_5";

/** For Sub-shrubs and perennial forbs **/
var sub_shrubs_name_normal = "Sub-shrubs and perennial forbs";
var SUB_SHRUBS_NAME_UPPER = "SUB-SHRUBS AND PERENNIAL FORBS";
var icon_sub_shrubs_normal = "media/transect_cover_img/ic_sub_shrub.png";
var icon_sub_shrubs_selected = "media/transect_cover_img/ic_sub_shrub_selected.png";
var icon_sub_shrubs_disabled = "media/transect_cover_img/ic_sub_shrub_disabled.png";

/** For Trees **/
var trees_name_normal = "Trees";
var TREES_NAME_UPPER = "TREES";
var icon_trees_normal = "media/transect_cover_img/ic_tree.png";
var icon_trees_selected = "media/transect_cover_img/ic_tree_selected.png";
var icon_trees_disabled = "media/transect_cover_img/ic_tree_disabled.png";

/** For Shrubs **/
var shrubs_name_normal = "Shrubs";
var SHRUBS_NAME_UPPER = "SHRUBS";
var icon_shrubs_normal = "media/transect_cover_img/ic_shrub.png";
var icon_shrubs_selected = "media/transect_cover_img/ic_shrub_selected.png";
var icon_shrubs_disabled = "media/transect_cover_img/ic_shrub_disabled.png";

/** For Rock fragment **/
var rock_fragment_name_normal = "Rock fragment";
var ROCK_FRAGMENT_NAME_UPPER = "ROCK FRAGMENT";
var icon_rock_fragment_normal = "media/transect_cover_img/ic_rock.png";
var icon_rock_fragment_selected = "media/transect_cover_img/ic_rock_selected.png";
var icon_rock_fragment_disabled = "media/transect_cover_img/ic_rock_disabled.png";

/** For Perennial grasses **/
var perennial_grasses_name_normal = "Perennial grasses";
var PERENNIAL_GRASSES_NAME_UPPER = "PERENNIAL GRASSES";
var icon_perennial_grasses_normal = "media/transect_cover_img/ic_perennial_grass.png";
var icon_perennial_grasses_selected = "media/transect_cover_img/ic_perennial_grass_selected.png";
var icon_perennial_grasses_disabled = "media/transect_cover_img/ic_perennial_grass_disabled.png";

/** For Wood Litter**/
var wood_litter_name_normal = "Wood Litter";
var WOOD_LITTER_NAME_UPPER = "WOOD LITTER";
var icon_wood_litter_normal = "media/transect_cover_img/ic_wood_litter.png";
var icon_wood_litter_selected = "media/transect_cover_img/ic_wood_litter_selected.png";
var icon_wood_litter_disabled = "media/transect_cover_img/ic_wood_litter_disabled.png";

/** For Herb Litter**/
var herb_litter_name_normal = "Herb Litter";
var HERB_LITTER_NAME_UPPER = "HERB LITTER";
var icon_herb_litter_normal = "media/transect_cover_img/ic_herb_litter.png";
var icon_herb_litter_selected = "media/transect_cover_img/ic_herb_litter_selected.png";
var icon_herb_litter_disabled = "media/transect_cover_img/ic_herb_litter_disabled.png";

/** For Annual plants **/
var annual_plant_name_normal = "Annual plants";
var ANNUAL_PLANT_NAME_UPPER = "ANNUAL PLANTS";
var icon_annual_plant_normal = "media/transect_cover_img/ic_annual.png";
var icon_annual_plant_selected = "media/transect_cover_img/ic_annual_selected.png";
var icon_annual_plant_disabled = "media/transect_cover_img/ic_annual_disabled.png";

/** For Bare **/
var bare_name_normal = "Bare";
var BARE_NAME_UPPER = "BARE";
var icon_bare_normal = "media/transect_cover_img/ic_bare.png";
var icon_bare_selected = "media/transect_cover_img/ic_bare_selected.png";
var icon_bare_disabled = "media/transect_cover_img/ic_bare_disabled.png";

/** For Plant Base **/
var plant_base_name_normal = "Plant base";
var PLANT_BASE_NAME_UPPER = "PLANT BASE";
var icon_plant_base_normal = "media/transect_cover_img/ic_plant_base.png";
var icon_plant_base_selected = "media/transect_cover_img/ic_plant_base_selected.png";
var icon_plant_base_disabled = "media/transect_cover_img/ic_plant_base_disabled.png";

/* End  Global variable */

function calculateOffline_2(item,stick_segment){
	if (isEmpty(stick_segment)){
		return 0
	} else {
		var count = 0 ;
		if (!isEmpty(stick_segment[0])){
			 count = count + (stick_segment[0].cover.trim().toUpperCase().match(new RegExp(item, "g")) || []).length
		}
		if (!isEmpty(stick_segment[1])){
			 count = count + (stick_segment[1].cover.trim().toUpperCase().match(new RegExp(item, "g")) || []).length
		}
		if (!isEmpty(stick_segment[2])){
			 count = count + (stick_segment[2].cover.trim().toUpperCase().match(new RegExp(item, "g")) || []).length
		}
		if (!isEmpty(stick_segment[3])){
			 count = count + (stick_segment[3].cover.trim().toUpperCase().match(new RegExp(item, "g")) || []).length
		}
		if (!isEmpty(stick_segment[4])){
			 count = count + (stick_segment[4].cover.trim().toUpperCase().match(new RegExp(item, "g")) || []).length
		}
		return count
	}
}

function calculateOffline(item,stick_segment){
		if (isEmpty(stick_segment)){
			return 0
		} else {
			var count = 0 ;
			if (!isEmpty(stick_segment[0])){
				if (stick_segment[0].cover.trim().toUpperCase().indexOf(item) > -1){
					count = count + 1
				}
			}
			if (!isEmpty(stick_segment[1])){
				if (stick_segment[1].cover.trim().toUpperCase().indexOf(item) > -1){
					count = count + 1
				}
			}
			if (!isEmpty(stick_segment[2])){
				if (stick_segment[2].cover.trim().toUpperCase().indexOf(item) > -1){
					count = count + 1
				}
			}
			if (!isEmpty(stick_segment[3])){
				if (stick_segment[3].cover.trim().toUpperCase().indexOf(item) > -1){
					count = count + 1
				}
			}
			if (!isEmpty(stick_segment[4])){
				if (stick_segment[4].cover.trim().toUpperCase().indexOf(item) > -1){
					count = count + 1
				}
			}
			return count
		}
}

function get_LandCover_LandInfo_Object(recorder_name,name,JSONArray){
	if (!isEmpty(JSONArray) && JSONArray.length > 0){
		for(var index = 0 ; index < JSONArray.length ; index ++){
			var obj = JSONArray[index];
			if (obj.recorder_name.trim().toUpperCase() === recorder_name.trim().toUpperCase()
		      && obj.name.trim().toUpperCase() === name.trim().toUpperCase()){
							return obj;
			}
		}
		return {};
	} else {
		return {};
	}
}

function getDominantWoody(JSONArray){
	if (isEmpty(JSONArray)){
		return "";
	}
	if (JSONArray.lenth <= 0){
		return "";
	}
	for(var index = 0 ; index < JSONArray.length ; index++){
		var object = JSONArray[index];
		if (!isEmpty(object.dominant_woody_species)){
			return object.dominant_woody_species;
		}
	}
	return "";
}

function getDominantWoody_2(JSONArray){
	if (isEmpty(JSONArray)){
		return "";
	}
	if (JSONArray.lenth <= 0){
		return "";
	}
	for(var index = 0 ; index < JSONArray.length ; index++){
		var object = JSONArray[index];
		if (!isEmpty(object.dominant_woody_species_2)){
			return object.dominant_woody_species_2;
		}
	}
	return "";
}

function getDominantNonWoody(JSONArray){
	if (isEmpty(JSONArray)){
		return "";
	}
	if (JSONArray.lenth <= 0){
		return "";
	}
	for(var index = 0 ; index < JSONArray.length ; index++){
		var object = JSONArray[index];
		if (!isEmpty(object.dominant_nonwoody_species)){
			return object.dominant_nonwoody_species;
		}
	}
	return "";
}

function getDominantNonWoody_2(JSONArray){
	if (isEmpty(JSONArray)){
		return "";
	}
	if (JSONArray.lenth <= 0){
		return "";
	}
	for(var index = 0 ; index < JSONArray.length ; index++){
		var object = JSONArray[index];
		if (!isEmpty(object.dominant_nonwoody_species_2)){
			return object.dominant_nonwoody_species_2;
		}
	}
	return "";
}

function definedSingleEditingLandCoverObjectData(complex_landcover){
	var single_landcover = {};
	single_landcover.id = complex_landcover.id;
	single_landcover.has_land_cover = complex_landcover.has_land_cover;
	single_landcover.img_src = complex_landcover.img_src;
	single_landcover.name = complex_landcover.name;
	single_landcover.recorder_name = complex_landcover.recorder_name;
	single_landcover.land_cover_data = complex_landcover.edit_land_cover_data;
	return single_landcover;
}

function copyCurrentViewLandCoverObjectData(complex_current_plot,consider_date){
	var current_view_plot_landcover = {};
	current_view_plot_landcover.has_land_cover = complex_current_plot.has_land_cover;
	current_view_plot_landcover.id = complex_current_plot.id;
	current_view_plot_landcover.img_src = complex_current_plot.img_src;
	current_view_plot_landcover.name = complex_current_plot.name;
	current_view_plot_landcover.land_cover_data = {};
	current_view_plot_landcover.recorder_name = complex_current_plot.recorder_name;
	current_view_plot_landcover.land_cover_data.date = complex_current_plot.land_cover_data.date;
	current_view_plot_landcover.land_cover_data.name = complex_current_plot.land_cover_data.name;
	current_view_plot_landcover.land_cover_data.recorder_name = complex_current_plot.land_cover_data.recorder_name;
	current_view_plot_landcover.land_cover_data.transect = [];

	for(var index = 0 ; index < complex_current_plot.land_cover_data.transect.length ; index++){
		  var determine_date = "";
		  if (!isEmpty(complex_current_plot.land_cover_data.transect[index].date))
			{
				 determine_date = complex_current_plot.land_cover_data.transect[index].date.trim();
			} else {
				 determine_date = complex_current_plot.land_cover_data.transect[index].segment.time.substring(0,complex_current_plot.land_cover_data.transect[index].segment.time.indexOf(" "));
			}

			if (determine_date.trim().toUpperCase() === consider_date.trim().toUpperCase()){
				current_view_plot_landcover.land_cover_data.transect.push(complex_current_plot.land_cover_data.transect[index]);
			}
	}
	console.log(current_view_plot_landcover.land_cover_data.transect.length);
	return current_view_plot_landcover;
};

function checkEnough20TransectSegemens_followDate(plot,con_date){
	var transect = plot.land_cover_data.transect;
	var count = 0
	for(var index = 0 ; index < plot.land_cover_data.transect.length ; index++){
		if (con_date.trim() === plot.land_cover_data.transect[index].date.trim()){
			count+=1
		}
	}
	if (count == 20){
		//console.log("Du 20")
		return true
	} else{
		return false
	}
}

function getDistictConsiderData(plot){
	var transect = plot.land_cover_data.transect;
	var array_consider_date = [];
	for(var index = 0 ; index < plot.land_cover_data.transect.length ; index++){
		var consider_date = "";
		if (!isEmpty(plot.land_cover_data.transect[index].date)) {
		   consider_date = plot.land_cover_data.transect[index].date.trim();
		} else {
			 consider_date = plot.land_cover_data.transect[index].segment.time.substring(0,plot.land_cover_data.transect[index].segment.time.indexOf(" "));
		}
		if (!isExistedInArray(consider_date,array_consider_date)
		    && checkEnough20TransectSegemens_followDate(plot,consider_date)){
			array_consider_date.push(consider_date);
		}
	}
	return array_consider_date;
};

function getNotesForColOfTransect(plot){
	var transect = plot.land_cover_data.transect;
  var array_notes_by_date = [];
	var array_dates = getDistictConsiderData(plot)
	for(var i = 0 ; i < array_dates.length ; i++){
    var consider_date = array_dates[i]
		for(var index = 0 ; index < plot.land_cover_data.transect.length ; index++){
				if (plot.land_cover_data.transect[index].date.trim() === consider_date.trim()){
					var consider_notes = "";
					if (!isEmpty(plot.land_cover_data.transect[index].notes)) {
						 consider_notes = plot.land_cover_data.transect[index].notes.trim();
					}
					if (!isEmpty(consider_notes) && !isExitedInArray_Notes_Of_Date({'notes' :consider_notes,'date': consider_date},array_notes_by_date)){
						array_notes_by_date.push({'notes' :consider_notes,'date': consider_date});
					}
				}
	   }
	 }
 	 return array_notes_by_date;
};

function isExitedInArray_Notes_Of_Date(item,array){
	var existed = false;
	for(var index = 0 ; index < array.length ; index++){
		if (item['date'].trim().toUpperCase() === array[index]['date'].trim().toUpperCase()){
			existed  = true;
			break;
		}
	}
	return existed;
}

function isExistedInArray(item,array){
	var existed = false;
	for(var index = 0 ; index < array.length ; index++){
		if (item.trim().toUpperCase() === array[index].trim().toUpperCase()){
			existed  = true;
			break;
		}
	}
	return existed;
}



function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
};

function addItem(array, item){
		var existed = false;
		for(var index = 0 ; index < array.length ; index++){
			if (array[index].toUpperCase().trim() == item.toUpperCase().trim()){
				existed = true;
			}
		}

		if (existed == false){
			array.push(item);
		}
		return array;
	};
function removeItem(array, item){
		var index = array.indexOf(item);
		if (index > -1){
			array.splice(index,1);
		}
		return array;
};

function getDefaultObject(direction,range){
	var obj = {
                "direction": "" + direction + "",
								"date" : "",
                "dominant_woody_species": "",
                "dominant_nonwoody_species": "",
								"dominant_woody_species_2": "",
                "dominant_nonwoody_species_2": "",
                "species_of_interest_1": "",
                "species_of_interest_2": "",
                "segment": {
                    "range": "" + range + "",
                    "time": "",
										"date": "",
                    "canopy_height": "",
                    "canopy_gap": "",
                    "basal_gap": "",
                    "species_1_density": 0,
                    "species_2_density": 0,
                    "species_of_interest_1_count": 0,
                    "species_of_interest_2_count": 0,
										"flag_status_species_1_blank_zero": -1,
                    "flag_status_species_2_blank_zero": -1,
                    //"species_of_interest_1_count": -1,
                    //"species_of_interest_2_count": -1,
                    "species_list": "",
                    "stick_segment": {
                        "0": {
                            "index": 0,
                            "cover": ""
                        },
                        "1": {
                            "index": 1,
                            "cover": ""
                        },
                        "2": {
                            "index": 2,
                            "cover": ""
                        },
                        "3": {
                            "index": 3,
                            "cover": ""
                        },
                        "4": {
                            "index": 4,
                            "cover": ""
                        }
                    },
                    "summary": {
                        "bare_total": 0,
                        "trees_total": 0,
                        "shrubs_total": 0,
                        "sub_shrubs_total": 0,
                        "plant_base_total":0,
                        "perennial_grasses_total": 0,
                        "annuals_total": 0,
                        "herb_litter_total": 0,
                        "wood_litter_total": 0,
                        "rock_total": 0
                    }
                }
	};

	return obj;
}

Date.prototype.yyyymmdd = function() {
   var yyyy = this.getFullYear().toString();
   var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
   var dd  = this.getDate().toString();
   return yyyy + "-" + (mm[1]?mm:"0"+mm[0]) + "-" + (dd[1]?dd:"0"+dd[0]); // padding
};



function getRealPlotName(recorder_name,mix_name){
	var str = mix_name.length;
	var email = recorder_name;
	var emaillength = email.length + 1;
	var finalstr = mix_name.substring(emaillength,str);
	return finalstr;
};


function updatePlot_2(JSONArray,current_plot){
	for (var index = 0; index < JSONArray.length; index++) {
		var plot = JSONArray[index];
		if(plot.recorder_name === current_plot.recorder_name && plot.name === current_plot.name){
		     JSONArray[index] = current_plot;
		}
	}
}


function update_LandCover_Plot_3(JSONArray, current_landcover_plot){
	if (isEmpty(JSONArray) || JSONArray.length <= 0){
    return false
  } else {
		for (var index = 0; index < JSONArray.length; index++) {
			var plot = JSONArray[index];
			if(plot.recorder_name.trim().toUpperCase() === current_landcover_plot.recorder_name.trim().toUpperCase()
				&& plot.name.trim().toUpperCase() === current_landcover_plot.name.trim().toUpperCase()
			  && plot.land_cover_data.date.trim() === current_landcover_plot.land_cover_data.date.trim()){
			     JSONArray[index] = current_landcover_plot;
			}
		}
	}
}

function checkExist_PlotInArray(object,JSONArray){
	if (isEmpty(JSONArray) && isEmpty(object)){
		return true;
	}

	if (isEmpty(JSONArray) && !isEmpty(object)){
		return false
	}

	for(var index = 0 ; index < JSONArray.length; index++){
		var consider_object = JSONArray[index];
		if (object.recorder_name.trim().toUpperCase() === consider_object.recorder_name.trim().toUpperCase()
	      && object.name.trim().toUpperCase() === consider_object.name.trim().toUpperCase()){
						return true;
		}
	}
	return false;
};

function getLandCover_LandInfo_Object_From_List(name, recorder_name, JSONArray){
	if (isEmpty(JSONArray) || JSONArray.length <= 0){
		return null
	} else {
		for(var index = 0 ; index < JSONArray.length ; index++){
			var consider_object = JSONArray[index]
			if (recorder_name.trim().toUpperCase() === consider_object.recorder_name.trim().toUpperCase()
		      && name.trim().toUpperCase() === consider_object.name.trim().toUpperCase()){
							return consider_object;
			}
		}
		return null
	}
}

function getNewObject_LandCover_LandInfo(name,recorder_name) {
	var obj = {
		  "has_land_cover":false,
			"id":-1,
			"img_src":"img/lpks_empty_checkmark.png",
			"name":name,
			"recorder_name":recorder_name,
			"land_cover_data":{}
	};
	return obj;
}

function delete_ALandCoverDataCollection_ForPlot_ByNamRecorderNameDate($http,consider_submitting_plot,googleTokenKey){
	console.log("delete nao")
	$http({
		method: 'POST',
		url: LANDPKS_API_ENDPOINT,
		headers: {'Content-type': 'application/x-www-form-urlencoded',
							'X-Auth-Token': googleTokenKey},
		timeout: HTTP_TIME_OUT_CONNECTION,
		data: 'action=delete&object=landcover&version='
					+ LANDPKS_API_VERSION
					+ '&type=delete_by_name_recorder_name_date&recorder_name='
					+ consider_submitting_plot.recorder_name
					+ '&name=' + consider_submitting_plot.name
					+ '&date=' + consider_submitting_plot.land_cover_data.date
					+ '&delete_permanent=1',
	}).success(
		function (data, status, headers, config) {
				console.log(data)
				return true
	}).error(function (err) {
		    console.log("Sao lai loi day")
				console.log(err.error)
				return false
	})
}

/* Function to insert new Transect-Segement LandCover data */
function func_submitLandCover_aTransectSegmentPart($http,
																consider_submitting_plot,
																submit_transect,
																submit_segment,
																submit_do_wo_species,
																submit_do_nonwo_species,
																submit_do_wo_species_2,
																submit_do_nonwo_species_2,
															  googleTokenKey){
	var landcover_data = consider_submitting_plot.land_cover_data
	var transect_data = consider_submitting_plot.land_cover_data.transect

	for (var i = 0; i < 20; i++) {
		/* Upload Transect-Segement in condition */
		if (!isEmpty(transect_data[i].direction.trim())
			  && !isEmpty(transect_data[i].segment.range)
				&& (transect_data[i].direction.trim().toUpperCase() === submit_transect.trim().toUpperCase())
				&& (transect_data[i].segment.range.trim().toUpperCase() === submit_segment.trim().toUpperCase())){
					//console.log("Consider Submit : " + submit_transect.trim().toUpperCase() + " : " + submit_segment.trim().toUpperCase())
					/* Preprocessing before submit */
					if (isEmpty(transect_data[i].segment.canopy_gap)) {
						transect_data[i].segment.canopy_gap = 'FALSE'
					}
					if (isEmpty(transect_data[i].segment.basal_gap)) {
						transect_data[i].segment.basal_gap = 'FALSE'
					}
					/* End Preprocessing */
					$http({
						method: 'POST',
						url: LANDPKS_API_ENDPOINT,
						headers: {'Content-type': 'application/x-www-form-urlencoded',
											'X-Auth-Token':googleTokenKey},

						transformRequest: function (obj) {
							var str = []
							for (var p in obj)
								str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
							//console.log(str)
							return str.join('&')
						},
						timeout: HTTP_TIME_OUT_CONNECTION,
						data: {
							action: 'put',
							object: 'landcover',
							version: LANDPKS_API_VERSION,
							source: 'landcover_mobile_app',
							date: consider_submitting_plot.land_cover_data.date,
							name: consider_submitting_plot.name,
							recorder_name: consider_submitting_plot.recorder_name,
							notes : consider_submitting_plot.notes,
							landinfo_plot_id: consider_submitting_plot.id,
							transect: transect_data[i].direction,
							segment: transect_data[i].segment.range,
							canopy_height: transect_data[i].segment.canopy_height,
							canopy_gap: transect_data[i].segment.canopy_gap,
							basal_gap: transect_data[i].segment.basal_gap,
							species_of_interest_1_count: transect_data[i].segment.species_of_interest_1_count,
							species_of_interest_2_count: transect_data[i].segment.species_of_interest_2_count,
							species_1_density: transect_data[i].segment.species_of_interest_1_count,
							species_2_density: transect_data[i].segment.species_of_interest_2_count,
							species_of_interest_1: transect_data[i].species_of_interest_1,
							species_of_interest_2: transect_data[i].species_of_interest_2,
							dominant_woody_species: submit_do_wo_species,
							dominant_woody_species_2: submit_do_wo_species_2,
							dominant_nonwoody_species: submit_do_nonwo_species,
							dominant_nonwoody_species_2: submit_do_nonwo_species_2,
							stick_segment_0: transect_data[i].segment.stick_segment[0].cover,
							stick_segment_1: transect_data[i].segment.stick_segment[1].cover,
							stick_segment_2: transect_data[i].segment.stick_segment[2].cover,
							stick_segment_3: transect_data[i].segment.stick_segment[3].cover,
							stick_segment_4: transect_data[i].segment.stick_segment[4].cover
						}
					}).success(
						function (data, status, headers, config) {
							//console.log("success : " + status + " " + submit_transect+ " " + submit_segment,)
							return true
					}).error(function (err) {
							detail_error =  err
							console.log("error : " + JSON.stringify(err))
							return false
					})
		}
	}
	//console.log("Co loi truong qua trinh Submit - 404 - " + submit_transect + " : " + submit_segment)
	//return false
}

function getMessageTransectSegments_Completed(consider_submitting_plot){
	var message = "Segments "
	if (consider_submitting_plot.isComplete_North_5m === true && !isEmpty(consider_submitting_plot.isComplete_North_5m)) {
		message = message + ' North 5m ;'
	}
	if (consider_submitting_plot.isComplete_North_10m === true && !isEmpty(consider_submitting_plot.isComplete_North_10m)) {
		message = message + ' North 10m ;'
	}
	if (consider_submitting_plot.isComplete_North_15m === true && !isEmpty(consider_submitting_plot.isComplete_North_15m)) {
		message = message + ' North 15m ;'
	}
	if (consider_submitting_plot.isComplete_North_20m === true && !isEmpty(consider_submitting_plot.isComplete_North_20m)) {
		message = message + ' North 20m ;'
	}
	if (consider_submitting_plot.isComplete_North_25m === true && !isEmpty(consider_submitting_plot.isComplete_North_25m)) {
		message = message + ' North 25m ;'
	}

	/* Check south transect */
	if (consider_submitting_plot.isComplete_South_5m === true && !isEmpty(consider_submitting_plot.isComplete_South_5m)) {
		message = message + ' South 5m ;'
	}
	if (consider_submitting_plot.isComplete_South_10m === true && !isEmpty(consider_submitting_plot.isComplete_South_10m)) {
		message = message + ' South 10m ;'
	}
	if (consider_submitting_plot.isComplete_South_15m === true && !isEmpty(consider_submitting_plot.isComplete_South_15m)) {
		message = message + ' South 15m ;'
	}
	if (consider_submitting_plot.isComplete_South_20m === true && !isEmpty(consider_submitting_plot.isComplete_South_20m)) {
		message = message + ' South 20m ;'
	}
	if (consider_submitting_plot.isComplete_South_25m === true && !isEmpty(consider_submitting_plot.isComplete_South_25m)) {
		message = message + ' South 25m ;'
	}

	/* Check east transect */
	if (consider_submitting_plot.isComplete_East_5m === true && !isEmpty(consider_submitting_plot.isComplete_East_5m)) {
		message = message + ' East 5m ;'
	}
	if (consider_submitting_plot.isComplete_East_10m === true && !isEmpty(consider_submitting_plot.isComplete_East_10m)) {
		message = message + ' East 10m ;'
	}
	if (consider_submitting_plot.isComplete_East_15m === true && !isEmpty(consider_submitting_plot.isComplete_East_15m)) {
		message = message + ' East 15m ;'
	}
	if (consider_submitting_plot.isComplete_East_20m === true && !isEmpty(consider_submitting_plot.isComplete_East_20m)) {
		message = message + ' East 20m ;'
	}
	if (consider_submitting_plot.isComplete_East_25m === true && !isEmpty(consider_submitting_plot.isComplete_East_25m)) {
		message = message + ' East 25m ;'
	}

	/* Check west transect */
	if (consider_submitting_plot.isComplete_West_5m === true && !isEmpty(consider_submitting_plot.isComplete_West_5m)) {
		message = message + ' West 5m ;'
	}
	if (consider_submitting_plot.isComplete_West_10m === true && !isEmpty(consider_submitting_plot.isComplete_West_10m)) {
		message = message + ' West 10m ;'
	}
	if (consider_submitting_plot.isComplete_West_15m === true && !isEmpty(consider_submitting_plot.isComplete_West_15m)) {
		message = message + ' West 15m ;'
	}
	if (consider_submitting_plot.isComplete_West_20m === true && !isEmpty(consider_submitting_plot.isComplete_West_20m)) {
		message = message + ' West 20m ;'
	}
	if (consider_submitting_plot.isComplete_West_25m === true && !isEmpty(consider_submitting_plot.isComplete_West_25m)) {
		message = message + ' West 25m ;'
	}

	return message;
}

function getMessageTransectSegments_IN_Complete(consider_submitting_plot){
	var message = ""
	if (consider_submitting_plot.isComplete_North_5m === false || isEmpty(consider_submitting_plot.isComplete_North_5m)) {
		message = message + ' North 5m ;'
	}
	if (consider_submitting_plot.isComplete_North_10m === false || isEmpty(consider_submitting_plot.isComplete_North_10m)) {
		message = message + ' North 10m ;'
	}
	if (consider_submitting_plot.isComplete_North_15m === false || isEmpty(consider_submitting_plot.isComplete_North_15m)) {
		message = message + ' North 15m ;'
	}
	if (consider_submitting_plot.isComplete_North_20m === false || isEmpty(consider_submitting_plot.isComplete_North_20m)) {
		message = message + ' North 20m ;'
	}
	if (consider_submitting_plot.isComplete_North_25m === false || isEmpty(consider_submitting_plot.isComplete_North_25m)) {
		message = message + ' North 25m ;'
	}

	/* Check south transect */
	if (consider_submitting_plot.isComplete_South_5m === false || isEmpty(consider_submitting_plot.isComplete_South_5m)) {
		message = message + ' South 5m ;'
	}
	if (consider_submitting_plot.isComplete_South_10m === false || isEmpty(consider_submitting_plot.isComplete_South_10m)) {
		message = message + ' South 10m ;'
	}
	if (consider_submitting_plot.isComplete_South_15m === false || isEmpty(consider_submitting_plot.isComplete_South_15m)) {
		message = message + ' South 15m ;'
	}
	if (consider_submitting_plot.isComplete_South_20m === false || isEmpty(consider_submitting_plot.isComplete_South_20m)) {
		message = message + ' South 20m ;'
	}
	if (consider_submitting_plot.isComplete_South_25m === false || isEmpty(consider_submitting_plot.isComplete_South_25m)) {
		message = message + ' South 25m ;'
	}

	/* Check east transect */
	if (consider_submitting_plot.isComplete_East_5m === false || isEmpty(consider_submitting_plot.isComplete_East_5m)) {
		message = message + ' East 5m ;'
	}
	if (consider_submitting_plot.isComplete_East_10m === false || isEmpty(consider_submitting_plot.isComplete_East_10m)) {
		message = message + ' East 10m ;'
	}
	if (consider_submitting_plot.isComplete_East_15m === false || isEmpty(consider_submitting_plot.isComplete_East_15m)) {
		message = message + ' East 15m ;'
	}
	if (consider_submitting_plot.isComplete_East_20m === false || isEmpty(consider_submitting_plot.isComplete_East_20m)) {
		message = message + ' East 20m ;'
	}
	if (consider_submitting_plot.isComplete_East_25m === false || isEmpty(consider_submitting_plot.isComplete_East_25m)) {
		message = message + ' East 25m ;'
	}

	/* Check west transect */
	if (consider_submitting_plot.isComplete_West_5m === false || isEmpty(consider_submitting_plot.isComplete_West_5m)) {
		message = message + ' West 5m ;'
	}
	if (consider_submitting_plot.isComplete_West_10m === false || isEmpty(consider_submitting_plot.isComplete_West_10m)) {
		message = message + ' West 10m ;'
	}
	if (consider_submitting_plot.isComplete_West_15m === false || isEmpty(consider_submitting_plot.isComplete_West_15m)) {
		message = message + ' West 15m ;'
	}
	if (consider_submitting_plot.isComplete_West_20m === false || isEmpty(consider_submitting_plot.isComplete_West_20m)) {
		message = message + ' West 20m ;'
	}
	if (consider_submitting_plot.isComplete_West_25m === false || isEmpty(consider_submitting_plot.isComplete_West_25m)) {
		message = message + ' West 25m ;'
	}

	return message;
}

function checkLandCover_Record_isCompleted_FullCases(landcover_record){
	var check = 0
	var check_north_5m;
	var check_north_10m;
	var check_north_15m;
	var check_north_20m;
	var check_north_25m;

	if (isEmpty(landcover_record.isComplete_North_5m)){
		check_north_5m = 0
	} else {
		if (landcover_record.isComplete_North_5m === true) {
			check_north_5m = 1
		} else {
			check_north_5m = -1
		}
	}

	if (isEmpty(landcover_record.isComplete_North_10m)){
		check_north_10m = 0
	} else {
		if (landcover_record.isComplete_North_10m === true) {
			check_north_10m = 1
		} else {
			check_north_10m = -1
		}
	}

	if (isEmpty(landcover_record.isComplete_North_15m)){
		check_north_15m = 0
	} else {
		if (landcover_record.isComplete_North_15m === true) {
			check_north_15m = 1
		} else {
			check_north_15m = -1
		}
	}

	if (isEmpty(landcover_record.isComplete_North_20m)){
		check_north_20m = 0
	} else {
		if (landcover_record.isComplete_North_20m === true) {
			check_north_20m = 1
		} else {
			check_north_20m = -1
		}
	}

	if (isEmpty(landcover_record.isComplete_North_25m)){
		check_north_25m = 0
	} else {
		if (landcover_record.isComplete_North_25m === true) {
			check_north_25m = 1
		} else {
			check_north_25m = -1
		}
	}

	var check_south_5m;
	var check_south_10m;
	var check_south_15m;
	var check_south_20m;
	var check_south_25m;
	/* Check south transect */
	if (isEmpty(landcover_record.isComplete_South_5m)){
		check_south_5m = 0
	} else {
		if (landcover_record.isComplete_South_5m === true) {
			check_south_5m = 1
		} else {
			check_south_5m = -1
		}
	}
	if (isEmpty(landcover_record.isComplete_South_10m)){
		check_south_10m = 0
	} else {
		if (landcover_record.isComplete_South_10m === true) {
			check_south_10m = 1
		} else {
			check_south_10m = -1
		}
	}
	if (isEmpty(landcover_record.isComplete_South_15m)){
		check_south_15m = 0
	} else {
		if (landcover_record.isComplete_South_15m === true) {
			check_south_15m = 1
		} else {
			check_south_15m = -1
		}
	}
	if (isEmpty(landcover_record.isComplete_South_20m)){
		check_south_20m = 0
	} else {
		if (landcover_record.isComplete_South_20m === true) {
			check_south_20m = 1
		} else {
			check_south_20m = -1
		}
	}
	if (isEmpty(landcover_record.isComplete_South_25m)){
		check_south_25m = 0
	} else {
		if (landcover_record.isComplete_South_25m === true) {
			check_south_25m = 1
		} else {
			check_south_25m = -1
		}
	}


	var check_east_5m;
	var check_east_10m;
	var check_east_15m;
	var check_east_20m;
	var check_east_25m;
	/* Check east transect */
	if (isEmpty(landcover_record.isComplete_East_5m)){
		check_east_5m = 0
	} else {
		if (landcover_record.isComplete_East_5m === true) {
			check_east_5m = 1
		} else {
			check_east_5m = -1
		}
	}
	if (isEmpty(landcover_record.isComplete_East_10m)){
		check_east_10m = 0
	} else {
		if (landcover_record.isComplete_East_10m === true) {
			check_east_10m = 1
		} else {
			check_east_10m = -1
		}
	}
	if (isEmpty(landcover_record.isComplete_East_15m)){
		check_east_15m = 0
	} else {
		if (landcover_record.isComplete_East_15m === true) {
			check_east_15m = 1
		} else {
			check_east_15m = -1
		}
	}
	if (isEmpty(landcover_record.isComplete_East_20m)){
		check_east_20m = 0
	} else {
		if (landcover_record.isComplete_East_20m === true) {
			check_east_20m = 1
		} else {
			check_east_20m = -1
		}
	}
	if (isEmpty(landcover_record.isComplete_East_25m)){
		check_east_25m = 0
	} else {
		if (landcover_record.isComplete_East_25m === true) {
			check_east_25m = 1
		} else {
			check_east_25m = -1
		}
	}

	var check_west_5m;
	var check_west_10m;
	var check_west_15m;
	var check_west_20m;
	var check_west_25m;
	/* Check west transect */
	if (isEmpty(landcover_record.isComplete_West_5m)){
		check_west_5m = 0
	} else {
		if (landcover_record.isComplete_West_5m === true) {
			check_west_5m = 1
		} else {
			check_west_5m = -1
		}
	}
	if (isEmpty(landcover_record.isComplete_West_10m)){
		check_west_10m = 0
	} else {
		if (landcover_record.isComplete_West_10m === true) {
			check_west_10m = 1
		} else {
			check_west_10m = -1
		}
	}
	if (isEmpty(landcover_record.isComplete_West_15m)){
		check_west_15m = 0
	} else {
		if (landcover_record.isComplete_West_15m === true) {
			check_west_15m = 1
		} else {
			check_west_15m = -1
		}
	}
	if (isEmpty(landcover_record.isComplete_West_20m)){
		check_west_20m = 0
	} else {
		if (landcover_record.isComplete_West_20m === true) {
			check_west_20m = 1
		} else {
			check_west_20m = -1
		}
	}
	if (isEmpty(landcover_record.isComplete_West_25m)){
		check_west_25m = 0
	} else {
		if (landcover_record.isComplete_West_25m === true) {
			check_west_25m = 1
		} else {
			check_west_25m = -1
		}
	}

	if (check_north_5m == 0 && check_north_10m == 0 && check_north_15m == 0 && check_north_20m == 0 && check_north_25m == 0 &&
	    check_south_5m == 0 && check_south_10m == 0 && check_south_15m == 0 && check_south_20m == 0 && check_south_25m == 0 &&
			check_east_5m == 0 && check_east_10m == 0 && check_east_15m == 0 && check_east_20m == 0 && check_east_25m == 0 &&
			check_west_5m == 0 && check_west_10m == 0 && check_west_15m == 0 && check_west_20m == 0 && check_west_25m == 0
		) {
			check = "FRESHED"
	} else if (check_north_5m == 1 && check_north_10m == 1 && check_north_15m == 1 && check_north_20m == 1 && check_north_25m == 1 &&
	    			 check_south_5m == 1 && check_south_10m == 1 && check_south_15m == 1 && check_south_20m == 1 && check_south_25m == 1 &&
						 check_east_5m == 1 && check_east_10m == 1 && check_east_15m == 1 && check_east_20m == 1 && check_east_25m == 1 &&
						 check_west_5m == 1 && check_west_10m == 1 && check_west_15m == 1 && check_west_20m == 1 && check_west_25m == 1
		        ){
			check = "FULL_ALL"
	} else if (check_north_5m == -1 && check_north_10m == -1 && check_north_15m == -1 && check_north_20m == -1 && check_north_25m == -1 &&
		    			 check_south_5m == -1 && check_south_10m == -1 && check_south_15m == -1 && check_south_20m == -1 && check_south_25m == -1 &&
							 check_east_5m == -1 && check_east_10m == -1 && check_east_15m == -1 && check_east_20m == -1 && check_east_25m == -1 &&
							 check_west_5m == -1 && check_west_10m == -1 && check_west_15m == -1 && check_west_20m == -1 && check_west_25m == -1
			        ){
			check = "MESS_ALL"
	} else if (check_north_5m == 1 || check_north_10m == 1 || check_north_15m == 1 || check_north_20m == 1 || check_north_25m == 1 ||
	    			 check_south_5m == 1 || check_south_10m == 1 || check_south_15m == 1 || check_south_20m == 1 || check_south_25m == 1 ||
						 check_east_5m == 1 || check_east_10m == 1 || check_east_15m == 1 || check_east_20m == 1 || check_east_25m == 1 ||
						 check_west_5m == 1 || check_west_10m == 1 || check_west_15m == 1 || check_west_20m == 1 || check_west_25m == 1
		        ){
			check = "FULL_SOME"
	} else if (check_north_5m == -1 || check_north_10m == -1 || check_north_15m == -1 || check_north_20m == -1 || check_north_25m == -1 ||
		    			 check_south_5m == -1 || check_south_10m == -1 || check_south_15m == -1 || check_south_20m == -1 || check_south_25m == -1 ||
							 check_east_5m == -1 || check_east_10m == -1 || check_east_15m == -1 || check_east_20m == -1 || check_east_25m == -1 ||
							 check_west_5m == -1 || check_west_10m == -11 || check_west_15m == -1 || check_west_20m == -1 || check_west_25m == -1
			        ){
			check = "MESS_SOME"
	} else {
		check = "UNKNOWN"
	}

	return check;
}

/* Procedure to submit LandCover data collection */
function procedure_submitALandCoverDataCollection_ForPlot_ONLINE($scope,$ionicPopup,$ionicLoading,$http,consider_submitting_plot,fullorNot){
	    var completeMessage = getMessageTransectSegments_Completed(consider_submitting_plot)
			var restMessage = getMessageTransectSegments_IN_Complete(consider_submitting_plot)
			var confirmPopup = $ionicPopup.confirm({
				title: 'Confirm',
				template: restMessage + ' segments have not been completed, calculation will be displayed when all segments have been completed. <br/><br/>'  + completeMessage + ' are ready for submission. Do you want to submit them ? '
			})
			confirmPopup.then(function (res) {
				if (res) {
					confirmPopup.close()
					var count = 0
					$ionicLoading.show({
						template: 'Submitting Plot. Please wait...'
					})
					var landcover_data = consider_submitting_plot.land_cover_data
					var transect_data = consider_submitting_plot.land_cover_data.transect
					var dominant_woody_value_species =  document.getElementById('dominant_woody').value
					var dominant_woody_value_species_2 =  document.getElementById('dominant_woody_2').value
					var dominant_nonwoody_value_species = document.getElementById('dominant_nonwoody').value
					var dominant_nonwoody_value_species_2 = document.getElementById('dominant_nonwoody_2').value

					//console.log(transect_data.length)
					//return

					/* Check Token de make POST request 20160812 */
					var googleToken = ''
					/*if (checkGoogleAuthKey_StillWorking() == true){
						googleToken = window.localStorage.getItem('current_json_auth_data_landcover')
						console.log("Su dung Token :")
						console.log(googleToken)
					} else {
						if (window.cordova){
							refresh_GoogleToken_Auth1_DEVICE($http)
						} else {
							refresh_GoogleToken_Auth1_Web()
						}
						var infoPopup = $ionicPopup.alert({
							cssClass: 'remove-title-class',
							template: 'Application is requred to refresh Google Authentication to submit Plot. Please re-click submit button again'
						})
						infoPopup.then(function (res) {
							infoPopup.close()
						})
						$ionicLoading.hide()
						return
					}*/


					/* Submit */
					if (fullorNot === "NOT_FULL_DATA") {

						/* Make Delete firstly */
						var delete_result = delete_ALandCoverDataCollection_ForPlot_ByNamRecorderNameDate($http,consider_submitting_plot,googleToken)

						setTimeout(
							function(){
									/* New process - submit each transect-segment */
									var re_sub_North_5m = false
									var re_sub_North_10m = false
									var re_sub_North_15m = false
									var re_sub_North_20m = false
									var re_sub_North_25m = false
									var re_sub_East_5m = false
									var re_sub_East_10m = false
									var re_sub_East_15m = false
									var re_sub_East_20m = false
									var re_sub_East_25m = false
									var re_sub_South_5m = false
									var re_sub_South_10m = false
									var re_sub_South_15m = false
									var re_sub_South_20m = false
									var re_sub_South_25m = false
									var re_sub_West_5m = false
									var re_sub_West_10m = false
									var re_sub_West_15m = false
									var re_sub_West_20m = false
									var re_sub_West_25m = false
									/* North */
									if ((!isEmpty(consider_submitting_plot.isComplete_North_5m))
											&& (consider_submitting_plot.isComplete_North_5m === true)){
												re_sub_North_5m = func_submitLandCover_aTransectSegmentPart($http,consider_submitting_plot,"NORTH","5m",dominant_woody_value_species,dominant_nonwoody_value_species,dominant_woody_value_species_2,dominant_nonwoody_value_species_2,googleToken)
									}
									if ((!isEmpty(consider_submitting_plot.isComplete_North_10m))
											&& (consider_submitting_plot.isComplete_North_10m === true)){
												re_sub_North_10m = func_submitLandCover_aTransectSegmentPart($http,consider_submitting_plot,"NORTH","10m",dominant_woody_value_species,dominant_nonwoody_value_species,dominant_woody_value_species_2,dominant_nonwoody_value_species_2,googleToken)
									}
									if ((!isEmpty(consider_submitting_plot.isComplete_North_15m))
											&& (consider_submitting_plot.isComplete_North_15m === true)){
												re_sub_North_15m = func_submitLandCover_aTransectSegmentPart($http,consider_submitting_plot,"NORTH","15m",dominant_woody_value_species,dominant_nonwoody_value_species,dominant_woody_value_species_2,dominant_nonwoody_value_species_2,googleToken)
									}
									if ((!isEmpty(consider_submitting_plot.isComplete_North_20m))
											&& (consider_submitting_plot.isComplete_North_20m === true)){
												re_sub_North_20m = func_submitLandCover_aTransectSegmentPart($http,consider_submitting_plot,"NORTH","20m",dominant_woody_value_species,dominant_nonwoody_value_species,dominant_woody_value_species_2,dominant_nonwoody_value_species_2,googleToken)
									}
									if ((!isEmpty(consider_submitting_plot.isComplete_North_25m))
											&& (consider_submitting_plot.isComplete_North_25m === true)){
												re_sub_North_25m = func_submitLandCover_aTransectSegmentPart($http,consider_submitting_plot,"NORTH","25m",dominant_woody_value_species,dominant_nonwoody_value_species,dominant_woody_value_species_2,dominant_nonwoody_value_species_2,googleToken)
									}
									/* East */
									if ((!isEmpty(consider_submitting_plot.isComplete_East_5m))
											&& (consider_submitting_plot.isComplete_East_5m === true)){
												re_sub_East_5m = func_submitLandCover_aTransectSegmentPart($http,consider_submitting_plot,"EAST","5m",dominant_woody_value_species,dominant_nonwoody_value_species,dominant_woody_value_species_2,dominant_nonwoody_value_species_2,googleToken)
									}
									if ((!isEmpty(consider_submitting_plot.isComplete_East_10m))
											&& (consider_submitting_plot.isComplete_East_10m === true)){
												re_sub_East_10m = func_submitLandCover_aTransectSegmentPart($http,consider_submitting_plot,"EAST","10m",dominant_woody_value_species,dominant_nonwoody_value_species,dominant_woody_value_species_2,dominant_nonwoody_value_species_2,googleToken)
									}
									if ((!isEmpty(consider_submitting_plot.isComplete_East_15m))
											&& (consider_submitting_plot.isComplete_East_15m === true)){
												re_sub_East_15m = func_submitLandCover_aTransectSegmentPart($http,consider_submitting_plot,"EAST","15m",dominant_woody_value_species,dominant_nonwoody_value_species,dominant_woody_value_species_2,dominant_nonwoody_value_species_2,googleToken)
									}
									if ((!isEmpty(consider_submitting_plot.isComplete_East_20m))
											&& (consider_submitting_plot.isComplete_East_20m === true)){
												re_sub_East_20m = func_submitLandCover_aTransectSegmentPart($http,consider_submitting_plot,"EAST","20m",dominant_woody_value_species,dominant_nonwoody_value_species,dominant_woody_value_species_2,dominant_nonwoody_value_species_2,googleToken)
									}
									if ((!isEmpty(consider_submitting_plot.isComplete_East_25m))
											&& (consider_submitting_plot.isComplete_East_25m === true)){
												re_sub_East_25m = func_submitLandCover_aTransectSegmentPart($http,consider_submitting_plot,"EAST","25m",dominant_woody_value_species,dominant_nonwoody_value_species,dominant_woody_value_species_2,dominant_nonwoody_value_species_2,googleToken)
									}
									/* South */
									if ((!isEmpty(consider_submitting_plot.isComplete_South_5m))
											&& (consider_submitting_plot.isComplete_South_5m === true)){
												re_sub_South_5m = func_submitLandCover_aTransectSegmentPart($http,consider_submitting_plot,"SOUTH","5m",dominant_woody_value_species,dominant_nonwoody_value_species,dominant_woody_value_species_2,dominant_nonwoody_value_species_2,googleToken)
									}
									if ((!isEmpty(consider_submitting_plot.isComplete_South_10m))
											&& (consider_submitting_plot.isComplete_South_10m === true)){
												re_sub_South_10m = func_submitLandCover_aTransectSegmentPart($http,consider_submitting_plot,"SOUTH","10m",dominant_woody_value_species,dominant_nonwoody_value_species,dominant_woody_value_species_2,dominant_nonwoody_value_species_2,googleToken)
									}
									if ((!isEmpty(consider_submitting_plot.isComplete_South_15m))
											&& (consider_submitting_plot.isComplete_South_15m === true)){
												re_sub_South_15m = func_submitLandCover_aTransectSegmentPart($http,consider_submitting_plot,"SOUTH","15m",dominant_woody_value_species,dominant_nonwoody_value_species,dominant_woody_value_species_2,dominant_nonwoody_value_species_2,googleToken)
									}
									if ((!isEmpty(consider_submitting_plot.isComplete_South_20m))
											&& (consider_submitting_plot.isComplete_South_20m === true)){
												re_sub_South_20m = func_submitLandCover_aTransectSegmentPart($http,consider_submitting_plot,"SOUTH","20m",dominant_woody_value_species,dominant_nonwoody_value_species,dominant_woody_value_species_2,dominant_nonwoody_value_species_2,googleToken)
									}
									if ((!isEmpty(consider_submitting_plot.isComplete_South_25m))
											&& (consider_submitting_plot.isComplete_South_25m === true)){
												re_sub_South_25m = func_submitLandCover_aTransectSegmentPart($http,consider_submitting_plot,"SOUTH","25m",dominant_woody_value_species,dominant_nonwoody_value_species,dominant_woody_value_species_2,dominant_nonwoody_value_species_2,googleToken)
									}

									/* West */
									if ((!isEmpty(consider_submitting_plot.isComplete_West_5m))
											&& (consider_submitting_plot.isComplete_West_5m === true)){
												re_sub_West_5m = func_submitLandCover_aTransectSegmentPart($http,consider_submitting_plot,"WEST","5m",dominant_woody_value_species,dominant_nonwoody_value_species,dominant_woody_value_species_2,dominant_nonwoody_value_species_2,googleToken)
									}
									if ((!isEmpty(consider_submitting_plot.isComplete_West_10m))
											&& (consider_submitting_plot.isComplete_West_10m === true)){
												re_sub_West_10m = func_submitLandCover_aTransectSegmentPart($http,consider_submitting_plot,"WEST","10m",dominant_woody_value_species,dominant_nonwoody_value_species,dominant_woody_value_species_2,dominant_nonwoody_value_species_2,googleToken)
									}
									if ((!isEmpty(consider_submitting_plot.isComplete_West_15m))
											&& (consider_submitting_plot.isComplete_West_15m === true)){
												re_sub_West_15m = func_submitLandCover_aTransectSegmentPart($http,consider_submitting_plot,"WEST","15m",dominant_woody_value_species,dominant_nonwoody_value_species,dominant_woody_value_species_2,dominant_nonwoody_value_species_2,googleToken)
									}
									if ((!isEmpty(consider_submitting_plot.isComplete_West_20m))
											&& (consider_submitting_plot.isComplete_West_20m === true)){
												re_sub_West_20m = func_submitLandCover_aTransectSegmentPart($http,consider_submitting_plot,"WEST","20m",dominant_woody_value_species,dominant_nonwoody_value_species,dominant_woody_value_species_2,dominant_nonwoody_value_species_2,googleToken)
									}
									if ((!isEmpty(consider_submitting_plot.isComplete_West_25m))
											&& (consider_submitting_plot.isComplete_West_25m === true)){
												re_sub_West_25m = func_submitLandCover_aTransectSegmentPart($http,consider_submitting_plot,"WEST","25m",dominant_woody_value_species,dominant_nonwoody_value_species,dominant_woody_value_species_2,dominant_nonwoody_value_species_2,googleToken)
									}
									console.log('Outer : ' + re_sub_North_5m)
									setTimeout(
										function(){
											  var completedSubmitMessage = "Submitted successfully ! ";
												$ionicLoading.hide()
												console.log('Insert DONE')
												console.log('Inner : ' + re_sub_North_5m)
												//North
												if (re_sub_North_5m === true){
													completedSubmitMessage = completedSubmitMessage + "North 5m ;"
												}
												console.log(completedSubmitMessage + " " + re_sub_North_5m)
												if (re_sub_North_10m === true){
													completedSubmitMessage = completedSubmitMessage + "North 10m ;"
												}
												if (re_sub_North_15m === true){
													completedSubmitMessage = completedSubmitMessage + "North 15m ;"
												}
												if (re_sub_North_20m === true){
													completedSubmitMessage = completedSubmitMessage + "North 20m ;"
												}
												if (re_sub_North_25m === true){
													completedSubmitMessage = completedSubmitMessage + "North 25m ;"
												}
												//South
												if (re_sub_South_5m === true){
													completedSubmitMessage = completedSubmitMessage + "South 5m ;"
												}
												if (re_sub_South_10m === true){
													completedSubmitMessage = completedSubmitMessage + "South 10m ;"
												}
												if (re_sub_South_15m === true){
													completedSubmitMessage = completedSubmitMessage + "South 15m ;"
												}
												if (re_sub_South_20m === true){
													completedSubmitMessage = completedSubmitMessage + "South 20m ;"
												}
												if (re_sub_South_25m === true){
													completedSubmitMessage = completedSubmitMessage + "South 25m ;"
												}
												//East
												if (re_sub_East_5m === true){
													completedSubmitMessage = completedSubmitMessage + "East 5m ;"
												}
												if (re_sub_East_10m === true){
													completedSubmitMessage = completedSubmitMessage + "East 10m ;"
												}
												if (re_sub_East_15m === true){
													completedSubmitMessage = completedSubmitMessage + "East 15m ;"
												}
												if (re_sub_East_20m === true){
													completedSubmitMessage = completedSubmitMessage + "East 20m ;"
												}
												if (re_sub_East_25m === true){
													completedSubmitMessage = completedSubmitMessage + "East 25m ;"
												}
												//West
												if (re_sub_West_5m === true){
													completedSubmitMessage = completedSubmitMessage + "West 5m ;"
												}
												if (re_sub_West_10m === true){
													completedSubmitMessage = completedSubmitMessage + "West 10m ;"
												}
												if (re_sub_West_15m === true){
													completedSubmitMessage = completedSubmitMessage + "West 15m ;"
												}
												if (re_sub_West_20m === true){
													completedSubmitMessage = completedSubmitMessage + "West 20m ;"
												}
												if (re_sub_West_25m === true){
													completedSubmitMessage = completedSubmitMessage + "West 25m ;"
												}

												console.log(completedSubmitMessage)

												if (completedSubmitMessage === "Submitted successfully ! "){
													  completedSubmitMessage = "No segement has been submitted. Please re-submit again"
												} else {
														completedSubmitMessage += " segments has been submitted"
												}

												//consider_submitting_plot.current_local_landcover_submitted_status = true
												//var recorder_name_inside = window.localStorage.getItem('current_email_landcover')
										    //var LIST_PLOTS_INSIDE = JSON.parse(window.localStorage.getItem(recorder_name_inside + '_' + 'LIST_LANDINFO_PLOTS_LANDCOVER'))
												//updatePlot_2(LIST_PLOTS_INSIDE, consider_submitting_plot)
												//console.log(consider_submitting_plot)
												//window.localStorage.setItem(recorder_name_inside + '_' + 'LIST_LANDINFO_PLOTS_LANDCOVER', JSON.stringify(LIST_PLOTS_INSIDE))

												var current_plot_2 = JSON.parse(window.localStorage.getItem('current_plot_data_landcover'))
		                    var current_edit_plot_landcover_2 = JSON.parse(window.localStorage.getItem('current_edit_plot_landcover'))
		                    if (!isEmpty(current_plot_2)){
		                      current_plot_2.current_local_landcover_submitted_status = true
		                    }

		                    if (!isEmpty(current_edit_plot_landcover_2)){
		                        current_edit_plot_landcover_2.current_local_landcover_submitted_status = true
		                    }
		                    window.localStorage.setItem('current_plot_data_landcover',JSON.stringify(current_plot_2))
		                    window.localStorage.setItem('current_edit_plot_landcover',JSON.stringify(current_edit_plot_landcover_2))

												var infoPopup = $ionicPopup.alert({
								          cssClass: 'remove-title-class',
								          template: 'Submitted successfully !'
								        })
								        infoPopup.then(function (res) {
								          infoPopup.close()
								        })
												return
										}
							   , 5000);
							}, 2000);

				  } else if (fullorNot === "FULL_DATA_20") {
								/* Submit all 20 transect-segment === Cai nay chac se khong bao gio chay vao */
								var recorder_name = window.localStorage.getItem('current_email_landcover')
						    var LIST_PLOTS = JSON.parse(window.localStorage.getItem(recorder_name + '_' + 'LIST_LANDINFO_PLOTS_LANDCOVER'))

								var submit_each_part_result = true
								var detail_error = {}
								for (var i = 0; i < 20; i++) {
									/* Preprocessing before submit */
									if (isEmpty(transect_data[i].segment.canopy_gap)) {
										transect_data[i].segment.canopy_gap = 'FALSE'
									}
									if (isEmpty(transect_data[i].segment.basal_gap)) {
										transect_data[i].segment.basal_gap = 'FALSE'
									}
									/* End Preprocessing */
									$http({
										method: 'POST',
										url: LANDPKS_API_ENDPOINT,
										headers: {'Content-type': 'application/x-www-form-urlencoded',
															'X-Auth-Token':googleToken},

										transformRequest: function (obj) {
											var str = []
											for (var p in obj)
												str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
											console.log(str)
											return str.join('&')
										},
										timeout: HTTP_TIME_OUT_CONNECTION,
										data: {
											action: 'put', object: 'landcover',version: LANDPKS_API_VERSION,source: 'landcover_mobile_app',
											date: consider_submitting_plot.land_cover_data.date,
											name: consider_submitting_plot.name, recorder_name: consider_submitting_plot.recorder_name,
											notes : consider_submitting_plot.notes,
											landinfo_plot_id: consider_submitting_plot.id, transect: transect_data[i].direction,
											segment: transect_data[i].segment.range, canopy_height: transect_data[i].segment.canopy_height, canopy_gap: transect_data[i].segment.canopy_gap,
											basal_gap: transect_data[i].segment.basal_gap, species_of_interest_1_count: transect_data[i].segment.species_of_interest_1_count,
											species_of_interest_2_count: transect_data[i].segment.species_of_interest_2_count, species_1_density: transect_data[i].segment.species_of_interest_1_count,
											species_2_density: transect_data[i].segment.species_of_interest_2_count,
											species_of_interest_1: transect_data[i].species_of_interest_1,
											species_of_interest_2: transect_data[i].species_of_interest_2,
											dominant_woody_species: dominant_woody_value_species,
											dominant_woody_species_2: dominant_woody_value_species_2,
											dominant_nonwoody_species: dominant_nonwoody_value_species,
											dominant_nonwoody_species_2: dominant_nonwoody_value_species_2,
											stick_segment_0: transect_data[i].segment.stick_segment[0].cover,
											stick_segment_1: transect_data[i].segment.stick_segment[1].cover,stick_segment_2: transect_data[i].segment.stick_segment[2].cover,
											stick_segment_3: transect_data[i].segment.stick_segment[3].cover, stick_segment_4: transect_data[i].segment.stick_segment[4].cover
										}
									}).success(
										function (data, status, headers, config) {
											console.log(status)

										}).error(function (err) {
											detail_error =  err
											submit_each_part_result = false
											return
										})
								}

								setTimeout(
									function(){
										if (submit_each_part_result == true){
												$ionicLoading.hide()
												consider_submitting_plot.has_land_cover = true
												consider_submitting_plot.current_local_landcover_submitted_status = false
												consider_submitting_plot.landcover_transects_status = "CLEAN"
												consider_submitting_plot.dominant_woody_species = dominant_woody_value_species
												consider_submitting_plot.dominant_woody_species_2 = dominant_woody_value_species_2
												consider_submitting_plot.dominant_nonwoody_species = dominant_nonwoody_value_species
												consider_submitting_plot.dominant_nonwoody_species_2 = dominant_nonwoody_value_species_2
												for(var index = 0 ; index < 20 ; index++){
													consider_submitting_plot.land_cover_data.transect[index].dominant_woody_species = dominant_woody_value_species
													consider_submitting_plot.land_cover_data.transect[index].dominant_woody_species_2 = dominant_woody_value_species_2
													consider_submitting_plot.land_cover_data.transect[index].dominant_nonwoody_species = dominant_nonwoody_value_species
													consider_submitting_plot.land_cover_data.transect[index].dominant_nonwoody_species_2 = dominant_nonwoody_value_species_2
												}



												updatePlot_2(LIST_PLOTS, consider_submitting_plot)
												window.localStorage.setItem('submitted_recorder_name', consider_submitting_plot.recorder_name)
												window.localStorage.setItem('submitted_plot_name', consider_submitting_plot.name)
												console.log('Update current caching data')
												window.localStorage.setItem(recorder_name + '_' + 'LIST_LANDINFO_PLOTS_LANDCOVER', JSON.stringify(LIST_PLOTS))
												window.localStorage.setItem('PREVIOUS_PAGE_LANDCOVER', 'ADD_NEW_LANDCOVER_DATA_SUCCESS')
												console.log('Insert DONE')

												window.localStorage.setItem('current_view_plot_after_submit_landcover',JSON.stringify(consider_submitting_plot))
												window.localStorage.setItem('landcover_submit_time_status','ONLINE')
												$state.go('landpks.landcover_site_summary_temp')
										} else {
												$ionicLoading.hide()
												var err_message = ""
												if (isEmpty(detail_error)){
													err_message = ""
												} else {
													err_message = detail_error.error
												}
												var infoPopup = $ionicPopup.alert({
													cssClass: 'remove-title-class',
													template: 'Error in submit LandCover data. Please try it again. Detail : ' + err_message
												})
												infoPopup.then(function (res) {
													infoPopup.close()
												})
										}
									}
						, 4000);
				} else {
					alert("There is NO Case for this workflow !!!. App works in-correctly.")
					return
				}
		} else {
			 confirmPopup.close()
			 return
		}
	})
}



/* Submit LandCover data Offline */
function procedure_submitALandCoverDataCollection_ForPlot_OFFLINE($scope,$ionicPopup,$ionicLoading,$http,consider_submitting_plot,fullorNot){
	if (fullorNot === "NOT_FULL_DATA") {
		/* consider final dominant_woody_species and dominant_nonwoody_species */
		consider_submitting_plot.dominant_woody_species = document.getElementById('dominant_woody').value
		consider_submitting_plot.dominant_woody_species_2 = document.getElementById('dominant_woody_2').value
		consider_submitting_plot.dominant_nonwoody_species = document.getElementById('dominant_nonwoody').value
		consider_submitting_plot.dominant_nonwoody_species_2 = document.getElementById('dominant_nonwoody_2').value

		/* Add to Queue */
		addPending_NOT_ENOUGH_LandCoverRecord_ToQueue(consider_submitting_plot)

		/* Xu ly phan rac */
		//var recorder_name = window.localStorage.getItem('current_email_landcover')
		//var LIST_PLOTS = JSON.parse(window.localStorage.getItem(recorder_name + '_' + 'LIST_LANDINFO_PLOTS_LANDCOVER'))
		//updatePlot_2(LIST_PLOTS, consider_submitting_plot)
		seeToast2('Transect data has been marked for background upload. Upload process will be completed when device is online', 2000)
	} else if (fullorNot === "FULL_DATA_20") {

	} else {
		console.log("Fail ! Do not have this case")
		return
	}
}
