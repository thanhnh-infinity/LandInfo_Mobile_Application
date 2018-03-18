function isExistedInArray2(object, JSONArray){
  if (isEmpty(JSONArray) || JSONArray.length <= 0){
    return false
  } else {
    for(var index = 0 ; index < JSONArray.length; index++){
  		var consider_object = JSONArray[index];
  		if (object.recorder_name.trim().toUpperCase() === consider_object.recorder_name.trim().toUpperCase()
  	      && object.name.trim().toUpperCase() === consider_object.name.trim().toUpperCase()){
  						return true;
  		}
  	}
  	return false;
  }
}

function updatePendingLandInfoPlotToQueue(object, JSONArray){
  for(var index = 0 ; index < JSONArray.length; index++){
      var consider_object = JSONArray[index];
      if (object.recorder_name.trim().toUpperCase() === consider_object.recorder_name.trim().toUpperCase()
          && object.name.trim().toUpperCase() === consider_object.name.trim().toUpperCase()){
              JSONArray[index] = object;
      }
    }
    return JSONArray;
}

function addPendingLandInfoPlotToQueue(LandInfo_newPlot){
  var recorder_name = window.localStorage.getItem('current_email')
  var pending_upload_landinfo_list = JSON.parse(window.localStorage.getItem(recorder_name + '_PENDING_UPLOAD_LANDINFO_LIST'))
  if (!isExistedInArray2(LandInfo_newPlot,pending_upload_landinfo_list)){
    pending_upload_landinfo_list.push(LandInfo_newPlot)
  } else {
    pending_upload_landinfo_list = updatePendingLandInfoPlotToQueue(LandInfo_newPlot,pending_upload_landinfo_list);
  }
  window.localStorage.setItem(recorder_name + '_PENDING_UPLOAD_LANDINFO_LIST',JSON.stringify(pending_upload_landinfo_list))
}

function try_upload_photo_last_time (file_name, type, dataURL, $http) {
  try{
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
      data: { img_data: dataURL, file_name: file_name, type: type },
    }).success(
      function (data, status, headers, config) {
        //alert("URL : " + data)
        if (type.trim().toUpperCase() === 'SOIL_PIT') {
          //console.log('sucess soil pit')
        } else if (type.trim().toUpperCase() === 'SOIL_SAMPLE') {
          //newPlot.soil_sample_photo_url = data.trim()
        } else if (type.trim().toUpperCase() === 'LANDSCAPE_NORTH') {
          //newPlot.landscape_north_photo_url = data.trim()
        } else if (type.trim().toUpperCase() === 'LANDSCAPE_SOUTH') {
          //newPlot.landscape_south_photo_url = data.trim()
        } else if (type.trim().toUpperCase() === 'LANDSCAPE_EAST') {
          //newPlot.landscape_east_photo_url = data.trim()
        } else if (type.trim().toUpperCase() === 'LANDSCAPE_WEST') {
          //newPlot.landscape_west_photo_url = data.trim()
        }
        //window.localStorage.setItem('current_edit_plot', JSON.stringify(newPlot))

      }).error(function (err) {
        //alert("LOI LOI")
        if (type.trim().toUpperCase() === 'SOIL_PIT') {
          //newPlot.soil_pit_photo_url = ''
        } else if (type.trim().toUpperCase() === 'SOIL_SAMPLE') {
          //newPlot.soil_sample_photo_url = ''
        } else if (type.trim().toUpperCase() === 'LANDSCAPE_NORTH') {
          //newPlot.landscape_north_photo_url = ''
        } else if (type.trim().toUpperCase() === 'LANDSCAPE_SOUTH') {
          //newPlot.landscape_south_photo_url = ''
        } else if (type.trim().toUpperCase() === 'LANDSCAPE_EAST') {
          //newPlot.landscape_east_photo_url = ''
        } else if (type.trim().toUpperCase() === 'LANDSCAPE_WEST') {
          //newPlot.landscape_west_photo_url = ''
        }
        //window.localStorage.setItem('current_edit_plot', JSON.stringify(newPlot))

    })
  } catch (e){
    //alert(e)
  }
}

function startBackGroundProcess(LandInfo_newPlot){
  addPendingLandInfoPlotToQueue(LandInfo_newPlot)
}

function background_service_submit_plot(plot,$http,$ionicPopup,$cordovaLocalNotification, plotListService, googleService){
  try{
      console.log('Consider submit ' + plot.name + ":" + plot.recorder_name)

      var recorder_name = window.localStorage.getItem('current_email')
      
      if (plot.status == 'NOT_SYNCHRONIZED') {
        var ACTION = 'update'
      } else {
        var ACTION = 'put'
      }

      if(!isEmpty(plot.rock_fragment)) {
        /* Update rock fragment if problem */
        if (plot.rock_fragment.soil_horizon_1 === '60-90%'){
           plot.rock_fragment.soil_horizon_1 = '>60%'
        }
        if (plot.rock_fragment.soil_horizon_2 === '60-90%'){
           plot.rock_fragment.soil_horizon_2 = '>60%'
        }
        if (plot.rock_fragment.soil_horizon_3 === '60-90%'){
           plot.rock_fragment.soil_horizon_3 = '>60%'
        }
        if (plot.rock_fragment.soil_horizon_4 === '60-90%'){
           plot.rock_fragment.soil_horizon_4 = '>60%'
        }
        if (plot.rock_fragment.soil_horizon_5 === '60-90%'){
           plot.rock_fragment.soil_horizon_5 = '>60%'
        }
        if (plot.rock_fragment.soil_horizon_6 === '60-90%'){
           plot.rock_fragment.soil_horizon_6 = '>60%'
        }
        if (plot.rock_fragment.soil_horizon_7 === '60-90%'){
           plot.rock_fragment.soil_horizon_7 = '>60%'
        }
      }

      //sync_timeout = 2000 
      /* Add API get Google Map Image based on Lat/long */
      //if (!isEmpty(plot.google_map_image_data) && plot.google_map_image_data.substring(0,10) === "data:image"){
      //   console.log("Get image from Cache")
      //   sync_timeout = 0
      //} else {  
      //   /* Add API get Google Map Image based on Lat/long */
      //   console.log("get image from Google API")
      //   googleService.getGoogleMapImage(viewPlot,recorder_name)
      //   sync_timeout = 2000 
      //}

      //setTimeout(function (){
        plotListService.pushPlotToCloud(plot, ACTION)
          .success(
             function (data, status, headers, config) {
                //console.log("Uploaded success ")
                //console.log(data)

                var LIST_PLOTS = JSON.parse(window.localStorage.getItem(recorder_name + '_' + 'LIST_LANDINFO_PLOTS'))
                var PENDING_LIST = JSON.parse(window.localStorage.getItem(recorder_name + '_PENDING_UPLOAD_LANDINFO_LIST'))
                
                /* Step 1 : Delete current editing plot in Main List */
                deleteLandInfoPlotInArray_2(plot.name,plot.recorder_name,LIST_PLOTS)
                deleteLandInfoPlotInArray_2(plot.name,plot.recorder_name,PENDING_LIST)
                if (PENDING_LIST.length <= 0) {
                  PENDING_LIST = []
                }
                window.localStorage.setItem(recorder_name + '_PENDING_UPLOAD_LANDINFO_LIST', JSON.stringify(PENDING_LIST))
                /* Step 2 : load new cloud plot */
                plotListService.loadPlotFromCloud(plot.recorder_name,plot.name)
                .success(function (data) {

                  if (!isEmpty(data) && data.length >= 1){
                    //if this is a new plot init cover object
                    if (ACTION == 'put'){
                      //create an empty landcover plot
                      var obj = {}
                      obj.recorder_name = plot.recorder_name
                      obj.id = -1
                      obj.has_land_cover = false
                      var object_north_5m = getDefaultObject('NORTH', '5m')
                      var object_north_10m = getDefaultObject('NORTH', '10m')
                      var object_north_15m = getDefaultObject('NORTH', '15m')
                      var object_north_20m = getDefaultObject('NORTH', '20m')
                      var object_north_25m = getDefaultObject('NORTH', '25m')
                      var object_east_5m = getDefaultObject('EAST', '5m')
                      var object_east_10m = getDefaultObject('EAST', '10m')
                      var object_east_15m = getDefaultObject('EAST', '15m')
                      var object_east_20m = getDefaultObject('EAST', '20m')
                      var object_east_25m = getDefaultObject('EAST', '25m')
                      var object_south_5m = getDefaultObject('SOUTH', '5m')
                      var object_south_10m = getDefaultObject('SOUTH', '10m')
                      var object_south_15m = getDefaultObject('SOUTH', '15m')
                      var object_south_20m = getDefaultObject('SOUTH', '20m')
                      var object_south_25m = getDefaultObject('SOUTH', '25m')
                      var object_west_5m = getDefaultObject('WEST', '5m')
                      var object_west_10m = getDefaultObject('WEST', '10m')
                      var object_west_15m = getDefaultObject('WEST', '15m')
                      var object_west_20m = getDefaultObject('WEST', '20m')
                      var object_west_25m = getDefaultObject('WEST', '25m')
                      obj.land_cover_data = {}
                      obj.land_cover_data.transect = []
                      obj.land_cover_data.transect = [object_north_5m, object_north_10m, object_north_15m, object_north_20m, object_north_25m, object_east_5m, object_east_10m, object_east_15m, object_east_20m, object_east_25m, object_south_5m, object_south_10m, object_south_15m, object_south_20m, object_south_25m, object_west_5m, object_west_10m, object_west_15m, object_west_20m, object_west_25m]
                      d = new Date()
                      var current_date = d.yyyymmdd()
                      obj.land_cover_data.date = current_date
                      obj.land_cover_data.name = data[0].name
                      obj.land_cover_data.recorder_name = plot.recorder_name
                      obj.dominant_nonwoody_species = ''
                      obj.dominant_woody_species = ''
                      obj.dominant_nonwoody_species_2 = ''
                      obj.dominant_woody_species_2 = ''
                      obj.img_src = 'img/lpks_empty_checkmark.png'
                      obj.need_init = false
                      obj.name = data[0].name
                      data[0].landCoverObject = obj;
                      LIST_PLOTS.push(data[0])
                    } else {
                      data[0].landCoverObject = plot.landCoverObject;
                      for (var index = 0; index < LIST_PLOTS.length; index++) {
                        var tstPlot = LIST_PLOTS[index]
                        if (tstPlot.name == data[0].name) {
                          LIST_PLOTS[index] = data[0]
                        }
                      }
                    }
          
                  }

                  window.localStorage.setItem(plot.recorder_name + '_' + 'LIST_LANDINFO_PLOTS', JSON.stringify(LIST_PLOTS))
    
                  
                  /* Should be change to Push Notification */
                  //alert('LandInfo plot ' + plot.name + ' has been uploaded')
                  var landinfo_id = data[0].id
                  if (isNaN(landinfo_id)){
                    landinfo_id = 1
                  }
                  if (window.cordova){
                    try {
                      var now = new Date().getTime();
                      var time_set = new Date(now);
                      $cordovaLocalNotification.schedule({
                  					id: landinfo_id,
                            date: time_set,
                  					text: 'LandInfo plot ' + plot.name + ' has been uploaded',
                  					title: 'LandPKS'
                  		}).then(function () {
                  				  //alert('Notification working well !')
                            console.log('Notifiation works well')
                  	  });
                    } catch (e) {
                      //alert(e)
                      console.log(e)
                    }
                  } else {
                    var infoPopup = $ionicPopup.alert({
                      cssClass: 'remove-title-class',
                      template: 'LandInfo plot ' + plot.name + ' has been uploaded'
                    })
                    infoPopup.then(function (res) {
                      infoPopup.close()
                    })
                  }


                }).error(function (err) {
                  console.log('Error 121')
                })

          }).error(function (err) {
            console.log("Submit fail " + err.error)
            var d_d = false
            if (err.error.trim() === '[Recorder_name + name] pair is existed in system. Please select another') {
                d_d = true
            }

            /* In the case that submit fail */
            var LIST_PLOTS = JSON.parse(window.localStorage.getItem(recorder_name + '_' + 'LIST_LANDINFO_PLOTS'))
            var PENDING_LIST = JSON.parse(window.localStorage.getItem(recorder_name + '_PENDING_UPLOAD_LANDINFO_LIST'))

            if (d_d == false ){


                /* Step 1 : Upload plot in Plot List is UPLOADED_ERROR */
                plot.status = "UPLOADED_ERROR"
                updatePlotExist(plot.real_name, plot.recorder_name, LIST_PLOTS, plot)
                window.localStorage.setItem(recorder_name + '_' + 'LIST_LANDINFO_PLOTS',JSON.stringify(LIST_PLOTS))

                /* Step 2 : Remove error plot out of queue */
                deleteLandInfoPlotInArray_2(plot.name,plot.recorder_name,PENDING_LIST)
                if (PENDING_LIST.length <= 0){
                  PENDING_LIST = []
                }
                window.localStorage.setItem(recorder_name + '_PENDING_UPLOAD_LANDINFO_LIST',JSON.stringify(PENDING_LIST))

                /* Step 3 : Display error for warning users */
                var infoPopup = $ionicPopup.alert({
                  cssClass: 'remove-title-class',
                  template: 'Submit LandInfo ' + plot.name + ' has error. This plot needs to re-submit again. Detail error : ' + err.error
                })
                infoPopup.then(function (res) {
                  infoPopup.close()
                })
            } else {
                /* Step 2 : Remove error plot out of queue */
                deleteLandInfoPlotInArray_2(plot.name,plot.recorder_name,PENDING_LIST)
                if (PENDING_LIST.length <= 0){
                  PENDING_LIST = []
                }
                window.localStorage.setItem(recorder_name + '_PENDING_UPLOAD_LANDINFO_LIST',JSON.stringify(PENDING_LIST))
            }
            return
          })
      //}, sync_timeout);      
  } catch (e){
    console.log("Error " + e)

    /* In the case that submit fail */
    var LIST_PLOTS = JSON.parse(window.localStorage.getItem(recorder_name + '_' + 'LIST_LANDINFO_PLOTS'))
    var PENDING_LIST = JSON.parse(window.localStorage.getItem(recorder_name + '_PENDING_UPLOAD_LANDINFO_LIST'))

    /* Step 1 : Upload plot in Plot List is UPLOADED_ERROR */
    plot.status = "UPLOADED_ERROR"
    updatePlotExist(plot.real_name, plot.recorder_name, LIST_PLOTS, plot)
    window.localStorage.setItem(recorder_name + '_' + 'LIST_LANDINFO_PLOTS',JSON.stringify(LIST_PLOTS))

    /* Step 2 : Remove error plot out of queue */
    deleteLandInfoPlotInArray_2(plot.name,plot.recorder_name,PENDING_LIST)
    if (PENDING_LIST.length <= 0){
      PENDING_LIST = []
    }
    window.localStorage.setItem(recorder_name + '_PENDING_UPLOAD_LANDINFO_LIST',JSON.stringify(PENDING_LIST))

    /* Step 3 : Display error for warning users */
    var infoPopup = $ionicPopup.alert({
      cssClass: 'remove-title-class',
      template: 'Submit LandInfo ' + plot.name + ' has error. This plot needs to re-submit again. Detail error : ' + e
    })
    infoPopup.then(function (res) {
      infoPopup.close()
    })
  }
}



function workerLoop($http,$ionicPopup,$cordovaLocalNotification, plotListService){
  try {
    setTimeout(function () {
      try{
        //if (checkGoogleAuthKey_StillWorking() == true){
          /* Logic here */
          var recorder_name = window.localStorage.getItem('current_email')
          var LIST_PLOTS = JSON.parse(window.localStorage.getItem(recorder_name + '_' + 'LIST_LANDINFO_PLOTS'))
          for (plot in LIST_PLOTS){
            
            if (LIST_PLOTS[plot].status == 'CREATED' || LIST_PLOTS[plot].status == 'NOT_SYNCHRONIZED' ) {
              //console.log("Pushing Plot " + LIST_PLOTS[plot].name )
              background_service_submit_plot(LIST_PLOTS[plot],$http,$ionicPopup,$cordovaLocalNotification, plotListService)
              workerLoop($http,$ionicPopup,$cordovaLocalNotification, plotListService);
              break
            } 
          }
          
        ///} else {

        //}
       } catch (e){
         console.log(e)
       }
    }, 20000)
  } catch (e){

  }
}

function background_service_submit_pending_plots_list($http,$ionicPopup,$cordovaLocalNotification, plotListService){
  RUN_BACKGROUND_PROCESS_TO_SUBMIT_PLOT = true
  setInterval(
     function(){
       try {
         var recorder_name = window.localStorage.getItem('current_email')
         console.log("Background process - Has Network - Submit Plot")
         if (checkNetConnection() === true){
           console.log("Background process - Has Network - Submit Plot")
           var PENDING_LIST = JSON.parse(window.localStorage.getItem(recorder_name + '_PENDING_UPLOAD_LANDINFO_LIST'))
           var PENDING_LANDCOVER_RECORDS = JSON.parse(window.localStorage.getItem(recorder_name + '_PENDING_UPLOAD_LANDCOVER_RECORDS_LIST'))
           var PENDING_LANDCOVER_NOT_ENOUGH_RECORDS = JSON.parse(window.localStorage.getItem(recorder_name + '_PENDING_UPLOAD_LANDCOVER_RECORDS_NOT_ENOUGH_LIST'))
           /* Background for LandInfo */

           if (!isEmpty(PENDING_LIST) && PENDING_LIST.length > 0){

             console.log("Background process - LANDINFO - Has Network - Submit Plot")
             RUN_BACKGROUND_PROCESS_TO_SUBMIT_PLOT = true
             if (PENDING_LIST.length == 1){
               var consider_submit_plot = PENDING_LIST[0]
               background_service_submit_plot(consider_submit_plot,$http,$ionicPopup,$cordovaLocalNotification, plotListService)
             } else {
               workerLoop($http,$ionicPopup,$cordovaLocalNotification, plotListService)
             }

           } else {
             console.log("Background process - LANDINFO - Nothing to Submit")
           }


           if (!isEmpty(PENDING_LANDCOVER_RECORDS) && PENDING_LANDCOVER_RECORDS.length >= 0){
             console.log(PENDING_LANDCOVER_RECORDS)
             console.log("Background process - LANDCOVER - Has Network - Submit Plot")
             RUN_BACKGROUND_PROCESS_TO_SUBMIT_PLOT = true
             if (PENDING_LANDCOVER_RECORDS.length == 1){
               var landcover_object = PENDING_LANDCOVER_RECORDS[0]
               background_service_submit_landcover_record(landcover_object,$http,$ionicPopup,$cordovaLocalNotification)
               console.log("LandCover Upload")
             } else {
               workerLandCoverLoop($http,$ionicPopup,$cordovaLocalNotification)
               console.log("LandCover Upload Many")
             }
           } else {
             console.log("Background process - LANDCOVER - Nothing to Submit")
           }
            if (!isEmpty(PENDING_LANDCOVER_NOT_ENOUGH_RECORDS) && PENDING_LANDCOVER_NOT_ENOUGH_RECORDS.length >= 0){
              console.log(PENDING_LANDCOVER_NOT_ENOUGH_RECORDS)
              console.log("Background process - LANDCOVER (NOT ENOUGH) - Has Network - Submit Plot")
              RUN_BACKGROUND_PROCESS_TO_SUBMIT_PLOT = true
              if (PENDING_LANDCOVER_NOT_ENOUGH_RECORDS.length == 1){
                var landcover_object = PENDING_LANDCOVER_NOT_ENOUGH_RECORDS[0]
                background_service_submit_landcover_NOT_ENOUGH_record(landcover_object,$http,$ionicPopup,$cordovaLocalNotification)
                console.log("LandCover (NOT ENOUGH) Upload")
              } else {
                workerLandCover_NOT_ENOUGH_Loop($http,$ionicPopup,$cordovaLocalNotification)
                console.log("LandCover (NOT ENOUGH) Upload Many")
              }
            } else {
              console.log("Background process - LANDCOVER (NOT ENOUGH) - Nothing to Submit")
            }
         } else {
           console.log("Background process - LANDINFO + LANDCOVER (Both Full and Not Enough)+ GOOGLETOKEN - NO NETWORK")
         }
       } catch (e) {
         console.log("error when running background service")
         console.log(e)
       }

     }, 200000
  );
}

/*************************************************************/
/****** BACKGROUND SERVICE FOR LANDCOVER *********************/
/*************************************************************/
function workerLandCoverLoop($http,$ionicPopup,$cordovaLocalNotification){
  try {
    setTimeout(function () {
      try{
        //if (checkGoogleAuthKey_StillWorking() == true){
           /* Logic here */
           var recorder_name = window.localStorage.getItem('current_email')
           var PENDING_LANDCOVER_LIST = JSON.parse(window.localStorage.getItem(recorder_name + '_PENDING_UPLOAD_LANDCOVER_RECORDS_LIST'))
           var consider_landcover_object = PENDING_LANDCOVER_LIST[0]
           console.log("Worker : " + consider_landcover_object.name)
           background_service_submit_landcover_record(consider_landcover_object,$http,$ionicPopup,$cordovaLocalNotification)

           /* End logic */
           if (!isEmpty(PENDING_LANDCOVER_LIST) && PENDING_LANDCOVER_LIST.length > 0) {
              workerLandCoverLoop($http,$ionicPopup,$cordovaLocalNotification);
           }
        //} else {

        //}
       } catch (e){
         console.log(e)
       }
    }, 20000)
  } catch (e){

  }
}

function workerLandCover_NOT_ENOUGH_Loop($http,$ionicPopup,$cordovaLocalNotification){
  try {
    setTimeout(function () {
      try{
        //if (checkGoogleAuthKey_StillWorking() == true){
           /* Logic here */
           var recorder_name = window.localStorage.getItem('current_email')
           var PENDING_LANDCOVER_NOT_ENOUGH_LIST = JSON.parse(window.localStorage.getItem(recorder_name + '_PENDING_UPLOAD_LANDCOVER_RECORDS_NOT_ENOUGH_LIST'))
           var consider_landcover_object = PENDING_LANDCOVER_NOT_ENOUGH_LIST[0]
           if (!isEmpty(consider_landcover_object.name) && !isEmpty(consider_landcover_object)){
             console.log("Worker (not enough) : " + consider_landcover_object.name)
           }
           background_service_submit_landcover_NOT_ENOUGH_record(consider_landcover_object,$http,$ionicPopup,$cordovaLocalNotification)

           /* End logic */
           if (!isEmpty(PENDING_LANDCOVER_NOT_ENOUGH_LIST) && PENDING_LANDCOVER_NOT_ENOUGH_LIST.length > 0) {
              workerLandCover_NOT_ENOUGH_Loop($http,$ionicPopup,$cordovaLocalNotification);
           }
        //} else {

        //}
       } catch (e){
         console.log(e)
       }
    }, 20000)
  } catch (e){

  }
}

function background_service_submit_landcover_NOT_ENOUGH_record(landcover_object,$http,$ionicPopup,$cordovaLocalNotification){
  try{
    var landcover_data = landcover_object.land_cover_data
    var transect_data = landcover_object.land_cover_data.transect

    var dominant_woody_value_species = landcover_object.dominant_woody_species
    var dominant_nonwoody_value_species = landcover_object.dominant_nonwoody_species
    var dominant_woody_value_species_2 = landcover_object.dominant_woody_species_2
    var dominant_nonwoody_value_species_2 = landcover_object.dominant_nonwoody_species_2

    var  googleToken = window.localStorage.getItem('current_json_auth_data_landcover')
    var notes_data = ''
    if (isEmpty(landcover_object.notes)){
      notes_data = ''
    } else {
      notes_data = landcover_object.notes
    }

    var delete_result = delete_ALandCoverDataCollection_ForPlot_ByNamRecorderNameDate($http,landcover_object,googleToken)
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

    setTimeout(
      function(){

          try{
                /* North */
                if ((!isEmpty(landcover_object.isComplete_North_5m))
                    && (landcover_object.isComplete_North_5m === true)){
                      //var re_sub_North_5m = false
                      re_sub_North_5m = func_submitLandCover_aTransectSegmentPart($http,landcover_object,"NORTH","5m",dominant_woody_value_species,dominant_nonwoody_value_species,dominant_woody_value_species_2,dominant_nonwoody_value_species_2,googleToken)
                      //console.log(re_sub_North_5m)
                }
                if ((!isEmpty(landcover_object.isComplete_North_10m))
                    && (landcover_object.isComplete_North_10m === true)){
                      re_sub_North_10m = func_submitLandCover_aTransectSegmentPart($http,landcover_object,"NORTH","10m",dominant_woody_value_species,dominant_nonwoody_value_species,dominant_woody_value_species_2,dominant_nonwoody_value_species_2,googleToken)
                      //console.log(re_sub_North_10m)
                }
                if ((!isEmpty(landcover_object.isComplete_North_15m))
                    && (landcover_object.isComplete_North_15m === true)){
                      re_sub_North_15m = func_submitLandCover_aTransectSegmentPart($http,landcover_object,"NORTH","15m",dominant_woody_value_species,dominant_nonwoody_value_species,dominant_woody_value_species_2,dominant_nonwoody_value_species_2,googleToken)
                      //console.log(re_sub_North_15m)
                }
                if ((!isEmpty(landcover_object.isComplete_North_20m))
                    && (landcover_object.isComplete_North_20m === true)){
                      re_sub_North_20m = func_submitLandCover_aTransectSegmentPart($http,landcover_object,"NORTH","20m",dominant_woody_value_species,dominant_nonwoody_value_species,dominant_woody_value_species_2,dominant_nonwoody_value_species_2,googleToken)
                }
                if ((!isEmpty(landcover_object.isComplete_North_25m))
                    && (landcover_object.isComplete_North_25m === true)){
                      re_sub_North_25m = func_submitLandCover_aTransectSegmentPart($http,landcover_object,"NORTH","25m",dominant_woody_value_species,dominant_nonwoody_value_species,dominant_woody_value_species_2,dominant_nonwoody_value_species_2,googleToken)
                }
                /* East */
                if ((!isEmpty(landcover_object.isComplete_East_5m))
                    && (landcover_object.isComplete_East_5m === true)){
                      re_sub_East_5m = func_submitLandCover_aTransectSegmentPart($http,landcover_object,"EAST","5m",dominant_woody_value_species,dominant_nonwoody_value_species,dominant_woody_value_species_2,dominant_nonwoody_value_species_2,googleToken)
                }
                if ((!isEmpty(landcover_object.isComplete_East_10m))
                    && (landcover_object.isComplete_East_10m === true)){
                      re_sub_East_10m = func_submitLandCover_aTransectSegmentPart($http,landcover_object,"EAST","10m",dominant_woody_value_species,dominant_nonwoody_value_species,dominant_woody_value_species_2,dominant_nonwoody_value_species_2,googleToken)
                }
                if ((!isEmpty(landcover_object.isComplete_East_15m))
                    && (landcover_object.isComplete_East_15m === true)){
                      re_sub_East_15m = func_submitLandCover_aTransectSegmentPart($http,landcover_object,"EAST","15m",dominant_woody_value_species,dominant_nonwoody_value_species,dominant_woody_value_species_2,dominant_nonwoody_value_species_2,googleToken)
                }
                if ((!isEmpty(landcover_object.isComplete_East_20m))
                    && (landcover_object.isComplete_East_20m === true)){
                      re_sub_East_20m = func_submitLandCover_aTransectSegmentPart($http,landcover_object,"EAST","20m",dominant_woody_value_species,dominant_nonwoody_value_species,dominant_woody_value_species_2,dominant_nonwoody_value_species_2,googleToken)
                }
                if ((!isEmpty(landcover_object.isComplete_East_25m))
                    && (landcover_object.isComplete_East_25m === true)){
                      re_sub_East_25m = func_submitLandCover_aTransectSegmentPart($http,landcover_object,"EAST","25m",dominant_woody_value_species,dominant_nonwoody_value_species,dominant_woody_value_species_2,dominant_nonwoody_value_species_2,googleToken)
                }
                /* South */
                if ((!isEmpty(landcover_object.isComplete_South_5m))
                    && (landcover_object.isComplete_South_5m === true)){
                      re_sub_South_5m = func_submitLandCover_aTransectSegmentPart($http,landcover_object,"SOUTH","5m",dominant_woody_value_species,dominant_nonwoody_value_species,dominant_woody_value_species_2,dominant_nonwoody_value_species_2,googleToken)
                }
                if ((!isEmpty(landcover_object.isComplete_South_10m))
                    && (landcover_object.isComplete_South_10m === true)){
                      re_sub_South_10m = func_submitLandCover_aTransectSegmentPart($http,landcover_object,"SOUTH","10m",dominant_woody_value_species,dominant_nonwoody_value_species,dominant_woody_value_species_2,dominant_nonwoody_value_species_2,googleToken)
                }
                if ((!isEmpty(landcover_object.isComplete_South_15m))
                    && (landcover_object.isComplete_South_15m === true)){
                      re_sub_South_15m = func_submitLandCover_aTransectSegmentPart($http,landcover_object,"SOUTH","15m",dominant_woody_value_species,dominant_nonwoody_value_species,dominant_woody_value_species_2,dominant_nonwoody_value_species_2,googleToken)
                }
                if ((!isEmpty(landcover_object.isComplete_South_20m))
                    && (landcover_object.isComplete_South_20m === true)){
                      re_sub_South_20m = func_submitLandCover_aTransectSegmentPart($http,landcover_object,"SOUTH","20m",dominant_woody_value_species,dominant_nonwoody_value_species,dominant_woody_value_species_2,dominant_nonwoody_value_species_2,googleToken)
                }
                if ((!isEmpty(landcover_object.isComplete_South_25m))
                    && (landcover_object.isComplete_South_25m === true)){
                      re_sub_South_25m = func_submitLandCover_aTransectSegmentPart($http,landcover_object,"SOUTH","25m",dominant_woody_value_species,dominant_nonwoody_value_species,dominant_woody_value_species_2,dominant_nonwoody_value_species_2,googleToken)
                }

                /* West */
                if ((!isEmpty(landcover_object.isComplete_West_5m))
                    && (landcover_object.isComplete_West_5m === true)){
                      re_sub_West_5m = func_submitLandCover_aTransectSegmentPart($http,landcover_object,"WEST","5m",dominant_woody_value_species,dominant_nonwoody_value_species,dominant_woody_value_species_2,dominant_nonwoody_value_species_2,googleToken)
                }
                if ((!isEmpty(landcover_object.isComplete_West_10m))
                    && (landcover_object.isComplete_West_10m === true)){
                      re_sub_West_10m = func_submitLandCover_aTransectSegmentPart($http,landcover_object,"WEST","10m",dominant_woody_value_species,dominant_nonwoody_value_species,dominant_woody_value_species_2,dominant_nonwoody_value_species_2,googleToken)
                }
                if ((!isEmpty(landcover_object.isComplete_West_15m))
                    && (landcover_object.isComplete_West_15m === true)){
                      re_sub_West_15m = func_submitLandCover_aTransectSegmentPart($http,landcover_object,"WEST","15m",dominant_woody_value_species,dominant_nonwoody_value_species,dominant_woody_value_species_2,dominant_nonwoody_value_species_2,googleToken)
                }
                if ((!isEmpty(landcover_object.isComplete_West_20m))
                    && (landcover_object.isComplete_West_20m === true)){
                      re_sub_West_20m = func_submitLandCover_aTransectSegmentPart($http,landcover_object,"WEST","20m",dominant_woody_value_species,dominant_nonwoody_value_species,dominant_woody_value_species_2,dominant_nonwoody_value_species_2,googleToken)
                }
                if ((!isEmpty(landcover_object.isComplete_West_25m))
                    && (landcover_object.isComplete_West_25m === true)){
                      re_sub_West_25m = func_submitLandCover_aTransectSegmentPart($http,landcover_object,"WEST","25m",dominant_woody_value_species,dominant_nonwoody_value_species,dominant_woody_value_species_2,dominant_nonwoody_value_species_2,googleToken)
                }

                /* Deque */
                var recorder_name = window.localStorage.getItem('current_email')
                var PENDING_LANDCOVER_NOT_ENOUGH_RECORDS = JSON.parse(window.localStorage.getItem(recorder_name + '_PENDING_UPLOAD_LANDCOVER_RECORDS_NOT_ENOUGH_LIST'))
                deleteLandInfoPlotInArray_2(landcover_object.name,landcover_object.recorder_name,PENDING_LANDCOVER_NOT_ENOUGH_RECORDS)
                if (PENDING_LANDCOVER_NOT_ENOUGH_RECORDS.length <= 0){
                  PENDING_LANDCOVER_NOT_ENOUGH_RECORDS = []
                }
                window.localStorage.setItem(recorder_name + '_PENDING_UPLOAD_LANDCOVER_RECORDS_NOT_ENOUGH_LIST',JSON.stringify(PENDING_LANDCOVER_NOT_ENOUGH_RECORDS))

                /* Step 4 : Display notification */
                if (window.cordova){
                      try {
                        var now = new Date().getTime();
                        var time_set = new Date(now);
                        $cordovaLocalNotification.schedule({
                              id: parseInt(now),
                              date: time_set,
                              text: 'LandCover ' + landcover_object.name + ' has been uploaded',
                              title: 'LandPKS'
                        }).then(function () {
                              //alert('Notification working well !')
                              console.log('Notifiation works well')
                        });
                      } catch (e) {
                        console.log(e)
                      }
                 } else {
                      //seeToast2('LandCover, some segments of  ' + landcover_object.name + ' has been uploaded', 6000)

                      var infoPopup = $ionicPopup.alert({
                        cssClass: 'remove-title-class',
                        template: 'LandCover, some segments of  ' + landcover_object.name + ' has been uploaded'
                      })
                      infoPopup.then(function (res) {
                        infoPopup.close()
                      })

                 }

          } catch (e){
                console.log("Catch exception to allow eligibtle action === 1")
                //console.log(re_sub_North_5m)
                //console.log(re_sub_North_10m)
          }
      }, 2000);

      console.log("---Tai sao ko den duoc day ???---")
      //console.log(re_sub_North_5m)
      //console.log(re_sub_North_10m)

  } catch(e){
    console.log("Catch exception to allow eligibtle action === 2")
    //console.log(re_sub_North_5m)
    //console.log(re_sub_North_10m)
  }
}

function background_service_submit_landcover_record(landcover_object,$http,$ionicPopup,$cordovaLocalNotification){
  try{

    var landcover_data = landcover_object.land_cover_data
    var transect_data = landcover_object.land_cover_data.transect

    var dominant_woody_value_species = landcover_object.dominant_woody_species
    var dominant_nonwoody_value_species = landcover_object.dominant_nonwoody_species
    var dominant_woody_value_species_2 = landcover_object.dominant_woody_species_2
    var dominant_nonwoody_value_species_2 = landcover_object.dominant_nonwoody_species_2

    var  googleToken = window.localStorage.getItem('current_json_auth_data_landcover')

    var notes_data = ''
    if (isEmpty(landcover_object.notes)){
      notes_data = ''
    } else {
      notes_data = landcover_object.notes
    }

    var delete_result = delete_ALandCoverDataCollection_ForPlot_ByNamRecorderNameDate($http,landcover_object,googleToken)

    setTimeout(
      function(){
        var count = 0
        for (var i = 0; i < 20; i++) {
          /* Preprocessing before submit */
          if (isEmpty(transect_data[i].segment.canopy_gap)) {
            transect_data[i].segment.canopy_gap = ''
          }
          if (isEmpty(transect_data[i].segment.basal_gap)) {
            transect_data[i].segment.basal_gap = ''
          }
          /* End Preprocessing */
          $http({
            method: 'POST',
            url: LANDPKS_API_ENDPOINT,

            headers: {'Content-type': 'application/x-www-form-urlencoded',
                      'X-Auth-Token':googleToken},

            //headers: {'Content-type': 'application/x-www-form-urlencoded'},
            transformRequest: function (obj) {
              var str = []
              for (var p in obj)
                str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
              console.log(str)
              return str.join('&')
            },
            timeout: HTTP_TIME_OUT_CONNECTION,
            data: {
              action: 'put', object: 'landcover',version: LANDPKS_API_VERSION,source: 'landcover_mobile_app', date: landcover_object.land_cover_data.date,
              name: landcover_object.name, recorder_name: landcover_object.recorder_name,
              notes: notes_data,
              landinfo_plot_id: landcover_object.id, transect: transect_data[i].direction,
              segment: transect_data[i].segment.range, canopy_height: transect_data[i].segment.canopy_height, canopy_gap: transect_data[i].segment.canopy_gap,
              basal_gap: transect_data[i].segment.basal_gap, species_of_interest_1_count: transect_data[i].segment.species_of_interest_1_count,
              species_of_interest_2_count: transect_data[i].segment.species_of_interest_2_count, species_1_density: transect_data[i].segment.species_of_interest_1_count,
              species_2_density: transect_data[i].segment.species_of_interest_2_count,
              species_of_interest_1: transect_data[i].species_of_interest_1,
              species_of_interest_2: transect_data[i].species_of_interest_2,
              //dominant_woody_species: transect_data[i].dominant_woody_species,
              dominant_woody_species: dominant_woody_value_species,
              dominant_woody_species_2: dominant_woody_value_species_2,
              //dominant_nonwoody_species: transect_data[i].dominant_nonwoody_species,
              dominant_nonwoody_species: dominant_nonwoody_value_species,
              dominant_nonwoody_species_2: dominant_nonwoody_value_species_2,
              stick_segment_0: transect_data[i].segment.stick_segment[0].cover,
              stick_segment_1: transect_data[i].segment.stick_segment[1].cover,stick_segment_2: transect_data[i].segment.stick_segment[2].cover,
              stick_segment_3: transect_data[i].segment.stick_segment[3].cover, stick_segment_4: transect_data[i].segment.stick_segment[4].cover
            }
          }).success(
            function (data, status, headers, config) {
              console.log(status)
              count = count + 1
              /* Upload success */
          }).error(function (err) {
              console.log(err.error)
          })
        }

        /* Step 2 : Update to current LandCover List */
        
        var recorder_name = window.localStorage.getItem('current_email')
        var LIST_PLOTS = JSON.parse(window.localStorage.getItem(recorder_name + '_' + 'LIST_LANDINFO_PLOTS'))
        var submitted_landInfo_object = []

        if (!isEmpty(LIST_PLOTS)) {
          for(var index = 0 ; index < LIST_PLOTS.length ; index++){
            var consider_object = LIST_PLOTS[index]
            if (landcover_object.recorder_name.trim().toUpperCase() === consider_object.recorder_name.trim().toUpperCase()
              && landcover_object.name.trim().toUpperCase() === consider_object.name.trim().toUpperCase()){
              submitted_landInfo_object = consider_object
            }
          }
        }

        if (!isEmpty(submitted_landInfo_object.landCoverObject.status) && submitted_landInfo_object.landCoverObject.status === 'UPLOADING'){
          console.log("Thay doi lai trang thai la UPLOADED " + submitted_landInfo_object.name)
          submitted_landInfo_object.landCoverObject.has_land_cover = true;
          submitted_landInfo_object.landCoverObject.status = ''
          submitted_landInfo_object.landCoverObject.img_src = 'img/lpks_green_checkmark.png'
          delete submitted_landInfo_object.landCoverObject["edit_land_cover_data"]
          delete submitted_landInfo_object.landCoverObject["edit_land_cover_status"]
          submitted_landInfo_object.landCoverObject.is_EDIT_OLD = "FALSE"       
                              
          updatePlot_2(LIST_PLOTS, submitted_landInfo_object)
          window.localStorage.setItem(recorder_name + '_' + 'LIST_LANDINFO_PLOTS', JSON.stringify(LIST_PLOTS))
        }

        window.localStorage.setItem('PREVIOUS_PAGE_LANDCOVER', 'ADD_NEW_LANDCOVER_DATA_SUCCESS')

        console.log('Insert DONE')

        /* Step 3 : Remove out of Pending List */
        var PENDING_LANDCOVER_LIST = JSON.parse(window.localStorage.getItem(recorder_name + '_PENDING_UPLOAD_LANDCOVER_RECORDS_LIST'))
        deleteLandInfoPlotInArray_2(landcover_object.name,landcover_object.recorder_name,PENDING_LANDCOVER_LIST)
        if (PENDING_LANDCOVER_LIST.length <= 0){
          PENDING_LANDCOVER_LIST = []
        }
        window.localStorage.setItem(recorder_name + '_PENDING_UPLOAD_LANDCOVER_RECORDS_LIST',JSON.stringify(PENDING_LANDCOVER_LIST))

        /* Step 4 : Display notification */
        if (window.cordova){
              try {
                var now = new Date().getTime();
                var time_set = new Date(now);
                $cordovaLocalNotification.schedule({
                      id: parseInt(now),
                      date: time_set,
                      text: 'LandCover ' + landcover_object.name + ' has been uploaded',
                      title: 'LandPKS'
                }).then(function () {
                      //alert('Notification working well !')
                      console.log('Notifiation works well')
                });
              } catch (e) {
                console.log(e)
              }
         } else {
              var infoPopup = $ionicPopup.alert({
                cssClass: 'remove-title-class',
                template: 'LandCover plot ' + landcover_object.name + ' has been uploaded'
              })
              infoPopup.then(function (res) {
                infoPopup.close()
              })
         }
    }, 2000);
  } catch (e) {
    console.log(e)
  }
}

function isExistedInArray_LandCover(object, JSONArray){
  if (isEmpty(JSONArray) || JSONArray.length <= 0){
    return false
  } else {
    for(var index = 0 ; index < JSONArray.length; index++){
  		var consider_object = JSONArray[index];
  		if (object.recorder_name.trim().toUpperCase() === consider_object.recorder_name.trim().toUpperCase()
  	      && object.name.trim().toUpperCase() === consider_object.name.trim().toUpperCase()
          && object.land_cover_data.date.trim() === consider_object.land_cover_data.date.trim()){
  						return true;
  		}
  	}
  	return false;
  }
}

/* 20170303 */
function addPending_NOT_ENOUGH_LandCoverRecord_ToQueue(LandCover_Record){
  var recorder_name = window.localStorage.getItem('current_email')
  var pending_upload_landcover_records_NOT_ENOUGH_list = JSON.parse(window.localStorage.getItem(recorder_name + '_PENDING_UPLOAD_LANDCOVER_RECORDS_NOT_ENOUGH_LIST'))
  if (!isExistedInArray_LandCover(LandCover_Record,pending_upload_landcover_records_NOT_ENOUGH_list)){
    /* Add new one to pending list */
    pending_upload_landcover_records_NOT_ENOUGH_list.push(LandCover_Record)
  } else {
    /* Update current landcover plot in list by new one */
    update_LandCover_Plot_3(pending_upload_landcover_records_NOT_ENOUGH_list,LandCover_Record)
  }
  window.localStorage.setItem(recorder_name + '_PENDING_UPLOAD_LANDCOVER_RECORDS_NOT_ENOUGH_LIST',JSON.stringify(pending_upload_landcover_records_NOT_ENOUGH_list))
  //console.log(JSON.parse(window.localStorage.getItem(recorder_name + '_PENDING_UPLOAD_LANDCOVER_RECORDS_NOT_ENOUGH_LIST')))
}

/* Old One */
function addPending_LandCoverRecord_ToQueue(LandCover_Record){
  var recorder_name = window.localStorage.getItem('current_email')
  var pending_upload_landcover_records_list = JSON.parse(window.localStorage.getItem(recorder_name + '_PENDING_UPLOAD_LANDCOVER_RECORDS_LIST'))
  if (!isExistedInArray_LandCover(LandCover_Record,pending_upload_landcover_records_list)){
    console.log("Consider push LandCover")
    console.log(LandCover_Record)
    pending_upload_landcover_records_list.push(LandCover_Record)
  }
  window.localStorage.setItem(recorder_name + '_PENDING_UPLOAD_LANDCOVER_RECORDS_LIST',JSON.stringify(pending_upload_landcover_records_list))
  console.log(JSON.parse(window.localStorage.getItem(recorder_name + '_PENDING_UPLOAD_LANDCOVER_RECORDS_LIST')))
}

/***********************************************************************/
/****** BACKGROUND SERVICE TO REFRESH GOOGLE TOKEN *********************/
/***********************************************************************/
/*function background_process_update_google_token($http){
  RUN_GOOGLE_CHECK_TOKEN_PROCESS = true
  console.log("Google Token Refresh in the first time")
  var current_time_assign_token_at = parseInt(window.localStorage.getItem('current_time_assign_token_at'))
  var current_time_token_in_range = parseInt(window.localStorage.getItem('current_time_expired_token_in_range'))
  var current_time = new Date().getTime() / 1000

  //console.log(current_time_assign_token_at)
  //console.log(current_time_token_in_range)
  //console.log(current_time)
  if ((current_time - current_time_assign_token_at) > (current_time_token_in_range - 100)){
    //Token is Expired
    if (checkNetConnection() === true){
          console.log("Background process 3 : Check Google Token - Token is expired : Access to get New Token")
          if (window.cordova){
            refresh_GoogleToken_Auth1_DEVICE($http)
          } else {
            refresh_GoogleToken_Auth1_Web()
          }
    } else {
          console.log("Background process 3 : No NETWORK - Cannot get new Token")
    }

  } else {
    console.log("Background process 3 - Token is STILL Working well - Do not need to do anything")
  }


  setInterval(
     function(){
       try {
         var recorder_name = window.localStorage.getItem('current_email')
         if (checkNetConnection() === true){
           console.log("Background process 3 - Has Network - Check current Token is Expired OR NOT")
           var current_time_assign_token_at = parseInt(window.localStorage.getItem('current_time_assign_token_at'))
           var current_time_token_in_range = parseInt(window.localStorage.getItem('current_time_expired_token_in_range'))
           var current_time = new Date().getTime() / 1000

           if ((current_time - current_time_assign_token_at) > (current_time_token_in_range - 600)){
             //Token is Expired
             console.log("Token is expired : Access to get New Token")
             if (window.cordova){
               refresh_GoogleToken_Auth1_DEVICE($http)
             } else {
               refresh_GoogleToken_Auth1_Web()
             }
           } else {
             console.log("Background process 3 - Token is STILL Working well - Do not need to do anything")
           }
         } else {
           console.log("Background process 3 - NO Network - Cannot Update Token")
         }
       } catch (e) {
         console.log("error when running background update google token")
         console.log(e)
       }

     }, 300000
  );
}
*/
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

function refresh_GoogleToken_Auth1_DEVICE($http){
  var listAuth = JSON.parse(window.localStorage.getItem('AUTHENTICATION_LIST_LANDPKS'))
	var current_email = window.localStorage.getItem('current_email')
        var google_refresh_token = window.localStorage.getItem('current_google_refresh_token')
        var token = ''
	var time_assign_token_at = ''
	var time_expired_token_at = ''
	var time_expired_token_in_range = ''

        $http({
          method: "POST",
          url: "https://www.googleapis.com/oauth2/v4/token",
          headers: {'Content-type': 'application/x-www-form-urlencoded'},
          transformRequest: function (obj) {
            var str = []
            for (var p in obj)
              str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
            return str.join('&')
          },
          timeout: 20000,
          data : {client_secret : GOOGLE_CLIENT_SECRET,grant_type:'refresh_token',refresh_token:google_refresh_token,client_id:GOOGLE_CLIENT_ID}
          }).success(function(result) {
            token = result.access_token
            var current_time = new Date().getTime() / 1000
            var time_assign_token_at = current_time
            var time_expired_token_at = current_time + parseInt(result.expires_in)
            var time_expired_token_in_range = result.expires_in
  	    console.log("====Token is Refreshed Already======")
  	    console.log(JSON.stringify(result))
            /* Update for List */
            updateAuthExist_3(current_email, token,time_assign_token_at,time_expired_token_at,time_expired_token_in_range, listAuth['authentication'])
            window.localStorage.setItem('AUTHENTICATION_LIST_LANDPKS', JSON.stringify(listAuth))

            /* Update for current varibale */
            window.localStorage.setItem('current_json_auth_data_landcover', token)
            window.localStorage.setItem('current_time_assign_token_at_landcover',time_assign_token_at)
            window.localStorage.setItem('current_time_expired_token_in_range_landcover',time_expired_token_in_range)

            window.localStorage.setItem('current_json_auth_data', token)
            window.localStorage.setItem('current_time_assign_token_at',time_assign_token_at)
            window.localStorage.setItem('current_time_expired_token_in_range',time_expired_token_in_range)
         }).error(function(data, status) {
            //If this fails, which it does for iOS,  try to silently log the user in again
            if (window.cordova && window.cordova.plugins && window.plugins.googleplus) {
           window.plugins.googleplus.trySilentLogin(
             {'webClientId': GOOGLE_CLIENT_ID,
             'offline': true
             },
          function (obj) {
            var email =  obj.email;
            var password = obj.userId;
            var idToken = obj.idToken;
            var access_token = obj.accessToken;
            var refresh_token = obj.refreshToken;
            var serverAuthCode = obj.serverAuthCode;
            var expires_in = 3600;
            saveLoginCredentials(email, password, idToken, access_token, refresh_token, expires_in)
            
          },
          function (msg) {
          }
        );
      } else {
        console.log("GOOGLE LOGIN Not Ready")
      }

  });

}

    function updateAuthExist_2(email, auth_key,code,time_start,time_end,time_range, google_refresh_token, JSONArray) {
      for (var index = 0; index < JSONArray.length; index++) {
        var auth = JSONArray[index]
        if (auth.email == email) {
          JSONArray[index].json_auth_data = auth_key
          JSONArray[index].code = code
          JSONArray[index].time_assign_token_at = time_start
          JSONArray[index].time_expired_token_at = time_end
          JSONArray[index].time_expired_token_in_range = time_range
          JSONArray[index].google_refresh_token = google_refresh_token
        }
      }
    }

     function saveLoginCredentials(email, password, idToken, access_token, refresh_token, expires_in){

        var current_time = new Date().getTime() / 1000

        var time_assign_token_at = current_time
        var time_expired_token_at = current_time + parseInt(expires_in)
        var time_expired_token_in_range = expires_in

        var objAuth = window.localStorage.getItem('AUTHENTICATION_LIST_LANDPKS')
        if (objAuth === null || objAuth === 'null') {
          var listAuthentication = { authentication: []}
          listAuthentication.authentication.push({
            'email': email,
            'password': password,
            'json_auth_data': access_token,
            'code': idToken,
            'time_assign_token_at' : time_assign_token_at,
            'time_expired_token_at' : time_expired_token_at,
            'time_expired_token_in_range' : time_expired_token_in_range,
            'google_refresh_token': refresh_token
          })
        } else {
          var listAuthentication = JSON.parse(objAuth)
          if (checkExist(email, listAuthentication['authentication']) == false) {
            listAuthentication['authentication'].push({
              'email': email,
              'password': password,
              'json_auth_data': access_token,
              'code': idToken,
              'time_assign_token_at' : time_assign_token_at,
              'time_expired_token_at' : time_expired_token_at,
              'time_expired_token_in_range' : time_expired_token_in_range,
              'google_refresh_token': refresh_token
            })
          } else {
            console.log('Update')
            //updateAuthExist(email, localData, listAuthentication['authentication'])
            updateAuthExist_2(email,access_token,idToken,time_assign_token_at,time_expired_token_at,time_expired_token_in_range, refresh_token, listAuthentication['authentication'])
          }
        }

        window.localStorage.setItem('current_json_auth_data_landcover', access_token)
        window.localStorage.setItem('current_email_landcover', email)
        window.localStorage.setItem('current_password_landcover', password)
        window.localStorage.setItem('current_time_assign_token_at_landcover',time_assign_token_at)
        window.localStorage.setItem('current_time_expired_token_in_range_landcover',time_expired_token_in_range)

        window.localStorage.setItem('current_google_refresh_token',refresh_token)

        window.localStorage.setItem('current_json_auth_data', access_token)
        window.localStorage.setItem('current_email', email)
        window.localStorage.setItem('current_password', password)
        window.localStorage.setItem('current_time_assign_token_at',time_assign_token_at)
        window.localStorage.setItem('current_time_expired_token_in_range',time_expired_token_in_range)

        window.localStorage.setItem('AUTHENTICATION_LIST_LANDPKS', JSON.stringify(listAuthentication))
        window.localStorage.setItem('PREVIOUS_PAGE_LANDCOVER', 'LOGIN_PAGE')
        window.localStorage.setItem('PREVIOUS_PAGE', 'LOGIN_PAGE')

      }

function refresh_GoogleToken_Auth1_Web(){
	var listAuth = JSON.parse(window.localStorage.getItem('AUTHENTICATION_LIST_LANDPKS'))
	var current_email = window.localStorage.getItem('current_email')
	var params = {
		'client_id': GOOGLE_CLIENT_ID,
		'immediate' : true,
		'response_type':'token',
		'scope': GOOGLE_SINGIN_SCOPES
	}
	var token = ''
	var time_assign_token_at = ''
	var time_expired_token_at = ''
	var time_expired_token_in_range = ''
  try {
  	gapi.auth.authorize(params, function(result){
  		token = result.access_token
  		time_assign_token_at = result.issued_at
  		time_expired_token_at = result.expires_at
  		time_expired_token_in_range = result.expires_in
  		console.log("====Token is Refreshed Already======")
  		console.log(JSON.stringify(result))
      /* Update for List */
      updateAuthExist_3(current_email, token,time_assign_token_at,time_expired_token_at,time_expired_token_in_range, listAuth['authentication'])
      window.localStorage.setItem('AUTHENTICATION_LIST_LANDPKS', JSON.stringify(listAuth))

      /* Update for current varibale */
      window.localStorage.setItem('current_json_auth_data_landcover', token)
      window.localStorage.setItem('current_time_assign_token_at_landcover',time_assign_token_at)
      window.localStorage.setItem('current_time_expired_token_in_range_landcover',time_expired_token_in_range)

      window.localStorage.setItem('current_json_auth_data', token)
      window.localStorage.setItem('current_time_assign_token_at',time_assign_token_at)
      window.localStorage.setItem('current_time_expired_token_in_range',time_expired_token_in_range)
  	})
  } catch (e){
    console.log(e)
  }
}

function bSleep(milliseconds) {
  var start = new Date().getTime();
  console.log("Vao sleep")
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      console.log("Thoat sleep")
      break;
    }
  }
};
