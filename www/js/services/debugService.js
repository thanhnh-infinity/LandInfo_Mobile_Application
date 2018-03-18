var myApp = angular.module("ionicApp");
myApp.service('debugService', function($http) {
    this.pushDebugReporting = function(report_data){
        console.log("Send Debug Report data")
        return $http({
                    method: 'POST',
                    url: LANDPKS_API_ENDPOINT,
                    headers: {'Content-type': 'application/x-www-form-urlencoded'},
                    transformRequest: function (obj) {
                      var str = []
                      for (var p in obj)
                        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
                      return str.join('&')
                    },
                    timeout: HTTP_TIME_OUT_CONNECTION,
                    data: {
                      action: 'PUT', object: 'debug_reporting',recorder_name: report_data.recorder_name, mobile_app_version : report_data.mobile_app_version ,list_landinfo_plots : report_data.list_landinfo_plots, list_landinfo_plots_landcover : report_data.list_landinfo_plots_landcover, pending_upload_landinfo_list : report_data.pending_upload_landinfo_list, pending_upload_landcover_records_list : report_data.pending_upload_landcover_records_list, pending_upload_landcover_records_not_enough_list : report_data.pending_upload_landcover_records_not_enough_list
                    }

              })
    }

    this.savePhotoFilesNamesTemp = function(plot,type,file_name){
      var photos_files_name = JSON.parse(window.localStorage.getItem(plot.name + "_PHOTO_FILE_NAMES"))
      if (isEmpty(photos_files_name)){
        photos_files_name = {"soil_pit_file":"","soil_sample_file":"","landscape_north_file":"","landscape_south_file":"","landscape_west_file":"","landscape_east_file":""}
      }
      if (type === "soil_sample"){
        photos_files_name.soil_sample_file = file_name  
      } else if (type === "soil_pit"){
        photos_files_name.soil_pit_file = file_name  
      } else if (type === "landscape_north"){
        photos_files_name.landscape_north_file = file_name
      } else if (type === "landscape_east"){
        photos_files_name.landscape_east_file = file_name
      } else if (type === "landscape_south"){
        photos_files_name.landscape_south_file = file_name
      } else if (type === "landscape_west"){
         photos_files_name.landscape_west_file = file_name
      }
      window.localStorage.setItem(plot.name + "_PHOTO_FILE_NAMES",JSON.stringify(photos_files_name))
    }
})