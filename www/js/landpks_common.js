function getRealPlotName(recorder_name,mix_name){
	var str = mix_name.length;
	var email = recorder_name;
	var emaillength = email.length + 1;
	var finalstr = mix_name.substring(emaillength,str);
	return finalstr;
};

function updateAuthExist_3(email, auth_key,time_start,time_end,time_range, JSONArray) {
	for (var index = 0; index < JSONArray.length; index++) {
		var auth = JSONArray[index]
		if (auth.email == email) {
			JSONArray[index].json_auth_data = auth_key
			//JSONArray[index].code = code
			JSONArray[index].time_assign_token_at = time_start
			JSONArray[index].time_expired_token_at = time_end
			JSONArray[index].time_expired_token_in_range = time_range
		}
	}
}

function checkGoogleAuthKey_StillWorking(){
	var current_time_assign_token_at = parseInt(window.localStorage.getItem('current_time_assign_token_at'))
	var current_time_token_in_range = parseInt(window.localStorage.getItem('current_time_expired_token_in_range'))
	var current_time = new Date().getTime() / 1000
	if ((current_time - current_time_assign_token_at) > (current_time_token_in_range - 100)){
		 return false
	} else {
		 return true
	}
}

function isUsingByDevice() {
	if (window.cordova) {
		return true;
	} else {
		return false;
	}
};

function getTypeWebBrowser() {
	var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
    var isFirefox = typeof InstallTrigger !== 'undefined';
    var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
    var isChrome = !!window.chrome && !isOpera;
    var isIE = /*@cc_on!@*/false || !!document.documentMode;
    if (isFirefox == true && isChrome == false && isOpera == false && isSafari == false && isIE == false) {
    	return "FIREFOX";
    } else if (isFirefox == false && isChrome == true && isOpera == false && isSafari == false && isIE == false) {
    	return "CHROME";
    } else if (isFirefox == false && isChrome == false && isOpera == true && isSafari == false && isIE == false) {
    	return "OPERA";
    } else if (isFirefox == false && isChrome == false && isOpera == false && isSafari == true && isIE == false) {
    	return "SAFARI";
    } else if (isFirefox == false && isChrome == false && isOpera == false && isSafari == false && isIE == true) {
    	return "IE";
    } else {
    	return "DEVICE";
    }
};

function checkExist(value, JSONArray){
		var hasMatch =false;
		for (var index = 0; index < JSONArray.length; index++) {
		    var auth = JSONArray[index];
		    if(auth.email == value){
		      hasMatch = true;
		      break;
		    }
		}
		return hasMatch;
};


function seeToast2(message, duration) {
	    toastr.remove();
			toastr.options = {
					  "closeButton": false,
					  "debug": false,
					  "newestOnTop": false,
					  "progressBar": false,
					  "positionClass": "toast-bottom-center",
					  "preventDuplicates": false,
					  "onclick": null,
					  "timeOut": "1500",
					  "extendedTimeOut": "0"

			 };
		 	toastr.info(message);
};


function updatePlotExist(name,recorder_name,JSONArray,newPlot){
	for (var index = 0; index < JSONArray.length; index++) {
		var plot = JSONArray[index];
		if(plot.recorder_name === recorder_name && plot.real_name === name){
		     JSONArray[index] = newPlot;
		}
	}
};

function isPlotInCloud(plot){
	if (plot.id === null || plot.id === '' || plot.id === 'null' || plot.id === 'undefined' || plot.isActived == true){
		return false;
	} else {
		return true;
	}
};

function getListPlotInLocalCache(JSONArray){
	for (var index = 0; index < JSONArray.length; index++) {
	    var plot = JSONArray[index];
	    if (!isPlotInCloud(plot)){
	    	deleteLandInfoPlotInArrayt(plot.name,plot.recorder_name,JSONArray);
	    }
	}
	return JSONArray;
};

function deleteLandInfoPlotInArrayt(name,recorder_name,JSONArray){
	for (var index = 0; index < JSONArray.length; index++) {
	    var plot = JSONArray[index];
	    if(plot.recorder_name.trim().toUpperCase() === recorder_name.trim().toUpperCase()
			   && plot.real_name.trim().toUpperCase() === name.trim().toUpperCase()){
	       if (index > - 1){
	    	   JSONArray.splice(index, 1);
	    	   return true;
	       } else{
	    	   return false;
	       }
	    }
	}
	return false;
};

function deleteLandInfoPlotInArray_2(name,recorder_name,JSONArray){
	//console.log(JSONArray)
	if (isEmpty(JSONArray) || JSONArray.length <= 0){
		console.log("Co vao day khong ??")
		return true
	}

	for (var index = 0; index < JSONArray.length; index++) {
	    var plot = JSONArray[index];
	    if(plot.recorder_name.trim().toUpperCase() === recorder_name.trim().toUpperCase()
			   && plot.name.trim().toUpperCase() === name.trim().toUpperCase()){
	       if (index > - 1){
	    	   JSONArray.splice(index, 1);
	    	   return true;
	       } else{
	    	   return false;
	       }
	    }
	}
	return true
};

function isEmptyObj(value){
  if (Object.keys(value).length <= 0 && JSON.stringify(value) === JSON.stringify({})) {
		return true;
	}
	return false;
}

function isEmpty(value){
	if (value == null || value == "undefined" || value == "" || value == 'null' || value == 'NULL' || value == 'NaN' ) {
    	return true;
  }
	return false;
};

function getListComponents(string,char){
	var partsOfStr = string.split(char);
	return partsOfStr;
};

function replaceAll(string,occur,replace){
	return string.replace(new RegExp(occur, 'g'), replace);
}

function getNumberValueFromString(string){
		string = string.replace(">","");
		string = string.replace("<","");
		string = string.replace("cm","");
		string = string.replace("m","");
		return string;
};

function convertUStoEN(value,fromStandard,toStandard,fromMetric,toMetric){
	if (fromStandard === UNITED_STATES_METRIC_STANDARD && toStandard === ENGLISH_METRIC_STANDARD){
		/* Convert from CM to Inch */
		if (fromMetric === METRIC_CENTIMES && toMetric === METRIC_INCHES){
			try {
				if (value === 0){
					return 0
				}
				inchValue = parseFloat(value) / 2.54
				return inchValue.toFixed(4)
			} catch (ex){
				return 0
			}
		}

		/* Convert from M to Feet */
		if (fromMetric === METRIC_METERS && toMetric === METRIC_FEET){
			try {
				if (value === 0){
					return 0
				}
				feetValue = ((parseFloat(value) * 100) / 2.54) / 12
				return feetValue.toFixed(4)
			} catch (ex){
				return 0
			}
		}

		/* Conver from C to F */
		if (fromMetric === DEGREE_C && toMetric === DEGREE_F){
			try {
				if (value === 0){
					return 32
				}
				fValue = parseFloat(value)*1.8 + 32
				return fValue.toFixed(4)
			} catch (ex){
				return 0
			}
		}
	}
	return null
};
