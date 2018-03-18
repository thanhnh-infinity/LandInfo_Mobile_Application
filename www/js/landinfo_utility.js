/******GLOBAL VARIABLE********************/
/*****************************************/
var HTTP_TIME_OUT_CONNECTION = 25000;
var HTTP_QUICK_CLIMATE_TIME_OUT = 10000;

/*****************************************/
function getStoppedCollectBedrockORStoppedDigging(bed_digging_value,texture,rock){
	if (isEmpty(bed_digging_value)){
		return "";
	} else {
		if (isEmpty(texture.soil_horizon_1) && isEmpty(rock.soil_horizon_1)){
			return "";
		} else if ((!isEmpty(texture.soil_horizon_1) && !isEmpty(rock.soil_horizon_1))
				    && (isEmpty(texture.soil_horizon_2) || isEmpty(rock.soil_horizon_2))
				        && (bed_digging_value >= 0 && bed_digging_value <=1)){
			return "LAYER_1";
		} else if ((!isEmpty(texture.soil_horizon_2) && !isEmpty(rock.soil_horizon_2))
				    && (isEmpty(texture.soil_horizon_3) || isEmpty(rock.soil_horizon_3))
				       && (bed_digging_value >= 1 && bed_digging_value <= 10)) {
			return "LAYER_2";
		} else if ((!isEmpty(texture.soil_horizon_3) && !isEmpty(rock.soil_horizon_3))
			        && (isEmpty(texture.soil_horizon_4) || isEmpty(rock.soil_horizon_4))
			           && (bed_digging_value >= 10 && bed_digging_value <= 20)) {
		   return "LAYER_3";
	    } else if ((!isEmpty(texture.soil_horizon_4) && !isEmpty(rock.soil_horizon_4))
	    			&& (isEmpty(texture.soil_horizon_5) || isEmpty(rock.soil_horizon_5))
	    			   && (bed_digging_value >= 20 && bed_digging_value <= 50)) {
	       return "LAYER_4";
	    } else if ((!isEmpty(texture.soil_horizon_5) && !isEmpty(rock.soil_horizon_5))
    		    	&& (isEmpty(texture.soil_horizon_6) || isEmpty(rock.soil_horizon_6))
    			       && (bed_digging_value >= 50 && bed_digging_value <= 70)) {
           return "LAYER_5";
	    } else if ((!isEmpty(texture.soil_horizon_6) && !isEmpty(rock.soil_horizon_6))
		        	&& (isEmpty(texture.soil_horizon_7) || isEmpty(rock.soil_horizon_7))
			           && (bed_digging_value >= 70 && bed_digging_value <= 100)) {
           return "LAYER_6";
        } else if ((!isEmpty(texture.soil_horizon_7) && !isEmpty(rock.soil_horizon_7))
		               && (bed_digging_value >= 100 && bed_digging_value <= 120)) {
           return "LAYER_7";
        } else {
           return "";
        }
	}
}

function check_valid_stopped_layer(current_layer,global_variable_stopped_layer){
	if (isEmpty(global_variable_stopped_layer)){
		return true;
	} else {
		if (current_layer === "LAYER_1"){
			if (global_variable_stopped_layer === "LAYER_1"
				|| global_variable_stopped_layer === "LAYER_2"
					|| global_variable_stopped_layer === "LAYER_3"
						|| global_variable_stopped_layer === "LAYER_4"
							|| global_variable_stopped_layer == "LAYER_5"
								|| global_variable_stopped_layer === "LAYER_6"
									|| global_variable_stopped_layer === "LAYER_7"
				){
				return true
			} else {
				return false
			}

		} else if (current_layer === "LAYER_2"){
			if (global_variable_stopped_layer === "LAYER_2"
				 || global_variable_stopped_layer === "LAYER_3"
					 || global_variable_stopped_layer === "LAYER_4"
						 || global_variable_stopped_layer === "LAYER_5"
							 || global_variable_stopped_layer === "LAYER_6"
								 || global_variable_stopped_layer === "LAYER_7") {
				return true;
			} else {
				return false;
			}
		} else if (current_layer === "LAYER_3"){
			if (global_variable_stopped_layer === "LAYER_3"
					 || global_variable_stopped_layer === "LAYER_4"
						 || global_variable_stopped_layer === "LAYER_5"
							 || global_variable_stopped_layer === "LAYER_6"
								 || global_variable_stopped_layer === "LAYER_7") {
				return true;
			} else {
				return false;
			}
		} else if (current_layer === "LAYER_4"){
			if (global_variable_stopped_layer === "LAYER_4"
					 || global_variable_stopped_layer === "LAYER_5"
						 || global_variable_stopped_layer === "LAYER_6"
							 || global_variable_stopped_layer === "LAYER_7") {
			   return true;
		   } else {
			   return false;
		   }
		} else if (current_layer === "LAYER_5"){
			if (global_variable_stopped_layer === "LAYER_5"
						 || global_variable_stopped_layer === "LAYER_6"
							 || global_variable_stopped_layer === "LAYER_7") {
			   return true;
		   } else {
			   return false;
		   }
		} else if (current_layer === "LAYER_6"){
			if (global_variable_stopped_layer === "LAYER_6"
							 || global_variable_stopped_layer === "LAYER_7") {
			   return true;
		   } else {
			   return false;
		   }
		} else if (current_layer === "LAYER_7"){
			if (global_variable_stopped_layer === "LAYER_7") {
			   return true;
		   } else {
			   return false;
		   }
	    } else {
	    	return false;
	    }
	}
};

function checkNetConnection(){
	 var xhr = new XMLHttpRequest();
	 var file = "http://api.landpotential.org";
	 var r = Math.round(Math.random() * 10000);
	 xhr.open('HEAD', file , false);
	 try {
	  xhr.send();
	  console.log(xhr.status);
	  if (xhr.status >= 200 && xhr.status < 304) {
	   return true;
		 //return false;
	  } else {
	   return false;
		 //return true;
	  }
	 } catch (e) {
		//return true;
	  return false;
	 }
};

function checkGoogleServiceConnection(){
	var xhr = new XMLHttpRequest();
	var file = "http://api.landpotential.org";
	var r = Math.round(Math.random() * 10000);
	 xhr.open('HEAD', file , false);
	 try {
	  xhr.send();
	  console.log(xhr.status);
	  if (xhr.status >= 200 && xhr.status < 304) {
	   return true;
	  } else {
	   return false;
	  }
	 } catch (e) {
	  return false;
	 }
};

function containsAllAscii(str) {
	//return  /^[a-zA-Z0-9!@#\$%\&*\)\(+=._-,]*$/.test(str);
	return true;
};

function check_dangerous_character(str){
	 test = /^[0-9a-zA-Z\)\(\!\@\#\&\$\*\<\>\?\-\_ ]+$/.test(str)
	 return !test
}


function upload_landinfo_photo(file_name,type,image_data,$http,$ionicLoading){
  $ionicLoading.show("Waiting for upload photo")
	$http({
		method: 'POST',
		url: LANDPKS_STATICS_FILE_UPLOAD_IMG,
		headers: {'Content-type': 'application/x-www-form-urlencoded'},
		transformRequest: function (obj) {
			var str = []
			for (var p in obj)
				str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
			return str.join('&')
		},
		timeout: 15000,
		data: { img_data: image_data, file_name: file_name, type: type },
	}).success(
		function (data, status, headers, config) {
			//console.log(data)
			$ionicLoading.hide()
			if (type.trim().toUpperCase() === 'SOIL_PIT') {
				seeToast2('Soil pit photo is uploaded successfully', 2000)
			} else if (type.trim().toUpperCase() === 'SOIL_SAMPLE') {
				seeToast2('Soil sample photo is uploaded successfully', 2000)
			} else if (type.trim().toUpperCase() === 'LANDSCAPE_NORTH') {
				seeToast2('Landscape north photo is uploaded successfully', 2000)
			} else if (type.trim().toUpperCase() === 'LANDSCAPE_SOUTH') {
				seeToast2('Landscape south photo is uploaded successfully', 2000)
			} else if (type.trim().toUpperCase() === 'LANDSCAPE_EAST') {
				seeToast2('Landscape east photo is uploaded successfully', 2000)
			} else if (type.trim().toUpperCase() === 'LANDSCAPE_WEST') {
				seeToast2('Landscape west photo is uploaded successfully', 2000)
			}
		}).error(function (err) {
			$ionicLoading.hide()
			if (type.trim().toUpperCase() === 'SOIL_PIT') {
				seeToast2('Error in upload file', 2000)
			} else if (type.trim().toUpperCase() === 'SOIL_SAMPLE') {
				seeToast2('Error in upload file', 2000)
			} else if (type.trim().toUpperCase() === 'LANDSCAPE_NORTH') {
				seeToast2('Error in upload file', 2000)
			} else if (type.trim().toUpperCase() === 'LANDSCAPE_SOUTH') {
				seeToast2('Error in upload file', 2000)
			} else if (type.trim().toUpperCase() === 'LANDSCAPE_EAST') {
				seeToast2('Error in upload file', 2000)
			} else if (type.trim().toUpperCase() === 'LANDSCAPE_WEST') {
				seeToast2('Error in upload file', 2000)
			}
	})
}

/***********************************************/
/* Location services NOT based on GPS and wifi */
/***********************************************/
function getLocationService_basedOn_IP(){
	var xhr = new XMLHttpRequest();
	var file = "http://ip-api.com/json";
	xhr.open('GET', file , false);
	try {
		xhr.send();
		if (xhr.status >= 200 && xhr.status < 304) {
		  var response = JSON.parse(xhr.responseText);
		  return response;
		} else {
			file = "https://freegeoip.net/json/";
			xhr.open('GET',file,false);
			try {
					var response = JSON.parse(xhr.responseText);
					response.lat = response.latitude;
					response.long = response.longitude;
					return response
			} catch (e){
				return null;
			}
		}
	} catch (e) {
		return null;
	}
}

function readDateTimeyyyymmdd_hhmmss_ForPhotos(byWay,data,keyword){
	/* if byWay == TIME_COLLECTION => data is full name of Photos
	   if byWay == EXIF => data is based64 String of Photos
	*/
	if (byWay === 'TIME_COLLECTION'){
		try {
			var timestamp_collected = data.substring(data.lastIndexOf(keyword) + keyword.length + 1,data.length-4)
			var date = new Date(parseInt(timestamp_collected))
			var strDate = date.toString()
			//return strDate	
			return strDate.substring(0, strDate.lastIndexOf("GMT"))
		} catch (e){
			console.log(e)
			return '1900:01:01 15:00:00'
		}
	} else if (byWay === 'EXIF') {
		var date;
		CordovaExif.readData(data, function(exifObject) {
		    date = exifObject.DateTime
				return date.toString()
		});
	} else {
		return '1900:01:01 15:00:00'
	}
}

function toDegrees (angle) {
  return angle * (180 / Math.PI);
}
function toRadians (angle) {
  return angle * (Math.PI / 180);
}

/*************************************************************/
/******  SERVICE FOR AWC CALCULATION *********************/
/*************************************************************/
function checkIsPossibleToCalAWC_Top100_Integrity(plot){
	 possible = true
	 /* Check integrity for data */
	 var i = 1
	 var consider_at_least_cal_awc_layer = 4 //20-50cm

	 plot_texture = plot.texture
	 plot_rock_fragment = plot.rock_fragment

	 while (i <= consider_at_least_cal_awc_layer){
	 	  if (isEmpty(plot_texture["soil_horizon_" + i]) || isEmpty(plot_rock_fragment["soil_horizon_" + i])){
				 return false
			}
			i++
	 }
	 return true
}

function checkIsPossCalAWC_BedRock(plot){
	bed_rock_depth = getBedRockDepth_Value(plot)
	if (bed_rock_depth == -9999 || bed_rock_depth > 20){
		return true
	} else {
		return false
	}
}

function checkIsPossibleToCalAWC_Top20_Integrity(plot){
	 possible = true
	 var i = 1
	 var consider_at_least_cal_awc_layer = 3 //10-20cm

	 plot_texture = plot.texture
	 plot_rock_fragment = plot.rock_fragment

	 while (i <= consider_at_least_cal_awc_layer){
	 	  if (isEmpty(plot_texture["soil_horizon_" + i]) || isEmpty(plot_rock_fragment["soil_horizon_" + i])){
				 return false
			}
			i++
	 }
	 return true
}

function checkIsPossibleToCalInfiltrationRate(plot){
	 possible = true
	 var i = 1
	 var consider_stop_cal_infil_layer = 3

	 plot_texture = plot.texture
	 plot_rock_fragment = plot.rock_fragment

	 while (i <= consider_stop_cal_infil_layer){
	 	  if (isEmpty(plot_texture["soil_horizon_" + i]) || isEmpty(plot_rock_fragment["soil_horizon_" + i])){
				 return false
			}
			i++
	 }
	 return true
}
function getUsedOrganicMatter_WithoutBedRockDepth(organic_matter,layer){
	om_adjust_4 = 0.60405
	om_adjust_5 = 0.31004
	om_adjust_6 = 0.23316

	/* SpreadSheet Update */
	//om_adjust_4 = om_adjust_4.toFixed(2)
	//om_adjust_5 = om_adjust_5.toFixed(2)
	//om_adjust_6 = om_adjust_6.toFixed(2)
	/**********************/


	if (!isEmpty(organic_matter)){
		 used_organic_matter = organic_matter
		 if (layer == 1 || layer == 2 || layer == 3){ //0-1cm and 1-10cm and 10-20cm
 		 	   used_organic_matter = organic_matter
		 } else if (layer == 4){ //20-50cm
		 	   used_organic_matter = organic_matter*om_adjust_4
		 } else if (layer == 5){ //50-70cm
		 	   used_organic_matter = organic_matter*om_adjust_5
		 } else if (layer == 6){ //70-100cm
		 	   used_organic_matter = organic_matter*om_adjust_6
		 } else if (layer == 7){
		 	   used_organic_matter = organic_matter*0.2
		 } else {
		 	   used_organic_matter = organic_matter
		 }
		 return used_organic_matter
	} else {
		return 0.01
	}
}

function getUsedOrganicMatter_WITH_BedRockDepth(organic_matter,i,bed_rock_depth){
	depths = getCen_LayerDepth(i)
	start_index = depths[0]+1
	end_index = bed_rock_depth+1
	sum_om_adjustment = 0
	for(var j = start_index; j < end_index;j++){
		//console.log("Tinh OM : " + ORGANIC_MATTER_ADJUSTMENT_DATA[j])
		sum_om_adjustment += ORGANIC_MATTER_ADJUSTMENT_DATA[j]
	}
	om_adjust = sum_om_adjustment / (end_index - start_index)
	return organic_matter*om_adjust
}

function getBedRockDepth_Value(plot){
	 bed_rock_depth_value = plot.bedrock_depth
	 if (isEmpty(bed_rock_depth_value) || isNaN(bed_rock_depth_value)){
	 	  return -9999
	 } else {
	 	  return bed_rock_depth_value
	 }
}

function get_Layer_Hit_BedRock(bed_rock_depth){
	if (bed_rock_depth >= 0 && bed_rock_depth <= 1){
		  return 1
	} else if (bed_rock_depth > 1 && bed_rock_depth <= 10){
		  return 2
	} else if (bed_rock_depth > 10 && bed_rock_depth <= 20){
		  return 3
	} else if (bed_rock_depth > 20 && bed_rock_depth <= 50){
		  return 4
	} else if (bed_rock_depth > 50 && bed_rock_depth <= 70){
		  return 5
	} else if (bed_rock_depth > 70 && bed_rock_depth <= 100){
      return 6
	} else if (bed_rock_depth > 100 && bed_rock_depth <= 120){
		  return 7
	} else {
		  return 6
	}
}

function getAWCValue_Top20_to1meter(plot,organic_matter){
	soil_profile_awc = 0.0 
	plot_texture = plot.texture
	plot_rock_fragment = plot.rock_fragment
	var i = 1
	consider_stop_cal_layer = 3 //10-20cm
	while (i <= consider_stop_cal_layer){
		used_organic_matter = 0.01
		layer_texture = ""
		layer_rock_fragment = ""

		if (isEmpty(plot_texture["soil_horizon_" + i]) || isEmpty(plot_rock_fragment["soil_horizon_" + i])){
				 break;
		}

		layer_texture = plot_texture["soil_horizon_" + i]
		layer_rock_fragment = plot_rock_fragment["soil_horizon_" + i]

		used_organic_matter = getUsedOrganicMatter_WithoutBedRockDepth(organic_matter,i)
		//console.log("OM " + i + " : " + used_organic_matter)
		l_texture_object = getTextureObjectFromTexture(layer_texture)
		l_rock_fragment_value =  getAVGRockFragmentValue(layer_rock_fragment)
		lawc = calculate_AWC_each_level(l_texture_object,l_rock_fragment_value,used_organic_matter)

		/* SpreadSheet Update */
		lawc = lawc/100
		/**********************/
		
		depths = getCen_LayerDepth(i)
		cm_lawc = lawc*(depths[1] - depths[0]) 
		soil_profile_awc += cm_lawc
		//console.log("cm lawc " + i + " : " + cm_lawc)
		i++	
	}
	
	return soil_profile_awc
}

function getAWCValue_Top100_to1meter(plot,organic_matter){
	soil_profile_awc = 0 
	plot_texture = plot.texture
	plot_rock_fragment = plot.rock_fragment
	var i = 1
	last_enter_texture = ""
	last_enter_rock_fragment = ""
  consider_stop_cal_layer = 6 //70-100cm
  used_organic_matter = 0.01
  //soil_profile_awc = {"Top20":0,"Top100":0}
  
  bed_rock_depth = getBedRockDepth_Value(plot)
  //console.log("Bed rock : " + bed_rock_depth)
  if (bed_rock_depth == -9999){
			consider_stop_cal_layer = 6 //70-100cm  	
  } else {
  	  consider_stop_cal_layer = get_Layer_Hit_BedRock(bed_rock_depth)
  }

  /* Simulate - and update later */
  if (consider_stop_cal_layer >= 7){
  	bed_rock_depth = -9999
  	consider_stop_cal_layer = 6
  }
  
  //console.log("stop at layer : " + consider_stop_cal_layer)

	while (i <= consider_stop_cal_layer){
		used_organic_matter = 0.01
		layer_texture = ""
		layer_rock_fragment = ""
		//depths = getCen_LayerDepth(i)

		if (isEmpty(plot_texture["soil_horizon_" + i]) || isEmpty(plot_rock_fragment["soil_horizon_" + i])){
			if (i < 7 && i > 1){
				layer_texture = last_enter_texture
				layer_rock_fragment = last_enter_rock_fragment
			} else {
				break;
			}
		} else {
			//Remember last values enter
			last_enter_texture = plot_texture["soil_horizon_" + i]
			last_enter_rock_fragment = plot_rock_fragment["soil_horizon_" + i]

			layer_texture = plot_texture["soil_horizon_" + i]
		  layer_rock_fragment = plot_rock_fragment["soil_horizon_" + i]			
		}

		if (bed_rock_depth == -9999){
			used_organic_matter = getUsedOrganicMatter_WithoutBedRockDepth(organic_matter,i)
		} else {
			if (i == consider_stop_cal_layer){
				used_organic_matter = getUsedOrganicMatter_WITH_BedRockDepth(organic_matter,i,bed_rock_depth)
			} else {
				used_organic_matter = getUsedOrganicMatter_WithoutBedRockDepth(organic_matter,i)
			}
		}
		
		//console.log("Thu nghiem : " + used_organic_matter + "  ; i = " + i)	

		l_texture_object = getTextureObjectFromTexture(layer_texture)
		//console.log("Soil data" + l_texture_object['sand'] + " ; " + l_texture_object['clay'])
		l_rock_fragment_value =  getAVGRockFragmentValue(layer_rock_fragment)
		//console.log("Rock data" + l_rock_fragment_value)
		lawc = calculate_AWC_each_level(l_texture_object,l_rock_fragment_value,used_organic_matter)
		

		/* SpreadSheet Update */
		lawc = lawc/100
		/**********************/
		//console.log("LAWC : " + lawc)

		depths = getCen_LayerDepth(i)

		if (bed_rock_depth == -9999){
			cm_lawc = lawc*(depths[1] - depths[0]) 	
		} else {
			if (i == consider_stop_cal_layer){
				cm_lawc = lawc*(bed_rock_depth - depths[0])
			} else {
				cm_lawc = lawc*(depths[1] - depths[0])
			}	
		}
		//console.log("CMLAWC : " + cm_lawc)
		soil_profile_awc += cm_lawc
		i++	
		//console.log("Use : " + layer_texture + " :: " + layer_rock_fragment + " :: " + l_rock_fragment_value + ":: " + depths[0] + "," + depths[1])

	}
	//console.log("AWC 100 " + soil_profile_awc)
	return soil_profile_awc
}

function getProfileInfiltrationRate(plot,organic_matter){
	 profile_infiltration_rate = 0
	 plot_texture = plot.texture
	 plot_rock_fragment = plot.rock_fragment
	 var i = 1
	 consider_stop_cal_layer = 3 //10-20cm
	 while (i <= consider_stop_cal_layer){
	 		
	 		if (isEmpty(plot_texture["soil_horizon_" + i]) || isEmpty(plot_rock_fragment["soil_horizon_" + i])){
				 break;
			}
			
			depths = getCen_LayerDepth(i)
			used_organic_matter = getUsedOrganicMatter_WithoutBedRockDepth(organic_matter,i)
			layer_texture = plot_texture["soil_horizon_" + i]
			layer_rock_fragment = plot_rock_fragment["soil_horizon_" + i]
			l_texture_object = getTextureObjectFromTexture(layer_texture)
			l_rock_fragment_value =  getAVGRockFragmentValue(layer_rock_fragment)
			ks = calculate_Infiltration_each_level(l_texture_object,l_rock_fragment_value,used_organic_matter)
			//console.log("KS : " + ks)
			cm_ks = ks*(depths[1] - depths[0]) 
			profile_infiltration_rate += cm_ks
			i++	
	 }
	 //console.log("Value : " + getCen_LayerDepth(consider_stop_cal_layer)[1])
	 return (profile_infiltration_rate / getCen_LayerDepth(consider_stop_cal_layer)[1])
}

function getCen_LayerDepth(index_layer){
	 value = [0,0]
	 switch (index_layer){
	 	 case 1:
	 	    value = [0,1];
	 	    break;
	 	 case 2:
	 	    value = [1,10];
	 	    break;
	 	 case 3:
	 	    value = [10,20];
	 	    break;
	 	 case 4:
	 	    value = [20,50];
	 	    break;         
	 	 case 5:
	 	    value = [50,70];
	 	    break;   
	 	 case 6:
	 	    value = [70,100];
	 	    break;
	 	 case 7:
	 	    value = [100,120];
	 	    break;      
	 }
	 return value
}

function calculate_Infiltration_each_level(l_texture_object,l_rock_fragment_value,organic_matter){
	ks = -999
	dec_sand = l_texture_object["sand"]
	dec_clay = l_texture_object["clay"]

	sfc1 = 0.278*dec_sand + 0.034*dec_clay + 0.022*organic_matter - 0.018*dec_sand*organic_matter - 0.027*dec_clay*organic_matter - 0.584*dec_sand*dec_clay + 0.078
	sfc = sfc1 + ((0.636*sfc1) - 0.107)

	//console.log("SFC :" + sfc)

	fc1 = (-0.251)*dec_sand + 0.195*dec_clay + 0.011*organic_matter + 0.006*dec_sand*organic_matter - 0.027*dec_clay*organic_matter + 0.452*dec_sand*dec_clay + 0.299
	fc = fc1 + (1.283*fc1*fc1 - 0.374*fc1 - 0.015)
	//console.log("FC :" + fc)

	wp1 = (-0.024)*dec_sand + 0.487*dec_clay + 0.006*organic_matter + 0.005*dec_sand*organic_matter - 0.013*dec_clay*organic_matter + 0.068*dec_sand*dec_clay + 0.031
	wp = wp1 + (0.14*wp1 - 0.02)
	//console.log("WP :" + wp)

	sasc = fc + sfc  - 0.097*dec_sand + 0.043
	//console.log("SASC :" + sasc)
	msd = (1 - sasc)*2.65
	//console.log("MSD :" + msd)

	/******Spreadsheet updated : Replace original rock fragment value to Gravels AB**********/
	gravels_T = l_rock_fragment_value
	matric_den_Z = msd
	bsd = (1 - gravels_T) / (1 - gravels_T*(1 - 1.5*(matric_den_Z / 2.65)))
	//console.log(bsd.toFixed(2))
	/****************************************************************************************/


	//bsd = (1 - l_rock_fragment_value) / (1 - l_rock_fragment_value*(1 - 1.5*(msd / 2.65)))
	//console.log("BSD :" + bsd)	
  
	//l_value = (Math.log(wp) - Math.log(fc)) / (Math.log(1500) - Math.log(33))
	  
	/****** SpreadSheet Update **********/
	l_value = Math.abs((Math.log(wp) - Math.log(fc)) / (Math.log(1500) - Math.log(33))).toFixed(2)
	//bsd = bsd.toFixed(2)
	  
	poc = (1 - (msd/2.65)).toFixed(2)
	pm_33 = (poc - fc).toFixed(2)
	ks = (1930*Math.pow(pm_33,3 - l_value)*bsd).toFixed(2)

	//console.log("PM 33 : " + pm_33)
	//console.log("L : " + l_value)
	//console.log("BSD : " + bsd)
	/***********************************/

	//ks = 1930*Math.pow(sasc,3 - l_value)*bsd
	//console.log("KS :" + l_value)
	return ks
}

function calculate_AWC_each_level(l_texture_object,l_rock_fragment_value,organic_matter){
	lawc = -999
	dec_sand = l_texture_object["sand"]
	dec_clay = l_texture_object["clay"]
	
	wp1 = (-0.024)*dec_sand + 0.487*dec_clay + 0.006*organic_matter + 0.005*dec_sand*organic_matter - 0.013*dec_clay*organic_matter + 0.068*dec_sand*dec_clay + 0.031
	wp = wp1 + (0.14*wp1 - 0.02)
	
    /* Spreadsheet updated : */
    wp = (wp*100).toFixed(2)
    //wp = wp.toFixed(2)
    /*************************/
	//console.log("--WP : " + wp)


	fc1 = (-0.251)*dec_sand + 0.195*dec_clay + 0.011*organic_matter + 0.006*dec_sand*organic_matter - 0.027*dec_clay*organic_matter + 0.452*dec_sand*dec_clay + 0.299
	fc = fc1 + (1.283*fc1*fc1 - 0.374*fc1 - 0.015)
    original_fc = fc
	/* Spreadsheet updated : */
    fc = (fc*100).toFixed(2)
    //fc = (fc).toFixed(2)
    /*************************/
    //console.log("--FC : " + fc)


    /*  Spreadsheet updated : Replace original rock fragment value to Gravels AB */
    gravels_T = l_rock_fragment_value.toFixed(2)
    sfc1 = 0.278*dec_sand + 0.034*dec_clay + 0.022*organic_matter - 0.018*dec_sand*organic_matter - 0.027*dec_clay*organic_matter - 0.584*dec_sand*dec_clay + 0.078
	sfc = sfc1 + ((0.636*sfc1) - 0.107)
	sasc = original_fc + sfc  - 0.097*dec_sand + 0.043
	msd = (1 - sasc)*2.65
	matric_den_Z = msd.toFixed(2)
	gravels_AB = ((matric_den_Z/2.65)*gravels_T)/(1-gravels_T*(1-matric_den_Z/2.65))
    lawc = (fc - wp)*(1 - gravels_AB)
    //console.log("Gravels T :  " + gravels_T)
    //console.log("Matric Den Z :  " + matric_den_Z)
    //console.log("Gravels AB : " + gravels_AB)
    /*************************/


	//lawc = (fc - wp)*(1 - l_rock_fragment_value)

	return lawc
}

function getAVGRockFragmentValue(text_rock_value){
	  if (isEmpty(text_rock_value))
        return 0
    if (text_rock_value.trim() === "0-15%")
        return 0.075
    else if (text_rock_value.trim() === "15-35%")
        return 0.25
    else if (text_rock_value.trim() === "35-60%")
        return 0.48
    else if (text_rock_value.trim() === ">60%")
        return 0.65
    else if (text_rock_value.trim() === "0-1%") 
    	  return 0.005
    else if (text_rock_value.trim() === "1-15%") 	
    	  return 0.08
    else
        return 0
}

function getTextureObjectFromTexture(texture_text){
	if (isEmpty(texture_text)){
		return {}
	}
	texture_text = texture_text.trim().toUpperCase()
	var match = $(GLOBAL_SOIL_TEXTURE_LOOKUP).filter(function (i,n){return n.texture===texture_text});
	//console.log(match[0])
	if (isEmpty(match) || isEmpty(match[0])){
		return {}
	}
  new_object = {"sand":0,"clay":0}
  new_object["sand"] = match[0]["sand"] / 100
  new_object["clay"] = match[0]["clay"] / 100
	return new_object
}


