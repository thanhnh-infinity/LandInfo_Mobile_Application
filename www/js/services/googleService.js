var google_image = {flag:"", data :""}

var myApp = angular.module("ionicApp");
myApp.service('googleService', function($http,plotListService) {

  this.getGoogleMapImage = function(newPlot,recorder_name, isCurrentPlot){
    var centerData = newPlot.latitude + "," + newPlot.longitude
    var URL = GOOGLE_MAP_API_GET_IMAGE_PER_LOCATION + "?center=" + centerData + "&zoom=" + PARAMS_GOOGLE_MAP_IMAGE_ZOOM + "&size=" + PARAMS_GOOGLE_MAP_IMAGE_SIZE + "&maptype="+PARAMS_GOOGLE_MAP_MAP_TYPE+"&markers="+PARAMS_MAKER_LABEL_GOOGLE_MAP_IMAGE+"&key=" + GOOLGE_STATIC_MAP_API_KEY
     var image_file_name = newPlot.recorder_name + '_' + newPlot.real_name + '_google_map_' + Date.now() + '.jpg'

    function toDataURL(url, file_name, callback) {
      var xhr = new XMLHttpRequest();
      xhr.onload = function() {
        var reader = new FileReader();
        reader.onloadend = function() {
          callback(reader.result);
        }
        reader.readAsDataURL(xhr.response);
      };
      xhr.open('GET', url);
      xhr.responseType = 'blob';
      xhr.send();
    }

    toDataURL(URL, image_file_name ,function(dataUrl) {
        var LIST_PLOTS = JSON.parse(window.localStorage.getItem(recorder_name + '_' + 'LIST_LANDINFO_PLOTS'))
        newPlot.google_map_image_data = dataUrl
        newPlot.has_google_map_image_data = "GOOGLE_MAP_IMAGE"
        google_image.flag = newPlot.has_google_map_image_data
        google_image.data = newPlot.google_map_image_data
        for (var index = 0; index < LIST_PLOTS.length; index++) {
          var plot = LIST_PLOTS[index]
          if (plot.name == newPlot.name) {
            LIST_PLOTS[index].google_map_image_data = dataUrl
            LIST_PLOTS[index].has_google_map_image_data = "GOOGLE_MAP_IMAGE"

            window.localStorage.setItem(newPlot.recorder_name + '_' + 'LIST_LANDINFO_PLOTS', JSON.stringify(LIST_PLOTS))
            if (!isEmpty(isCurrentPlot) && isCurrentPlot) {
              window.localStorage.setItem('current_view_plot', JSON.stringify(LIST_PLOTS[index]));
            }
          }
        }

        var LIST_PLOTS = JSON.parse(window.localStorage.getItem(recorder_name + '_' + 'LIST_LANDINFO_PLOTS'))
        plotListService.updateCachedPlot(LIST_PLOTS, newPlot)
    })
  }
  this.getGoogleMapImageURL = function(newPlot){
    var centerData = newPlot.latitude + "," + newPlot.longitude
    var URL = GOOGLE_MAP_API_GET_IMAGE_PER_LOCATION + "?center=" + centerData + "&zoom=" + PARAMS_GOOGLE_MAP_IMAGE_ZOOM + "&size=" + PARAMS_GOOGLE_MAP_IMAGE_SIZE + "&maptype="+PARAMS_GOOGLE_MAP_MAP_TYPE+"&markers="+PARAMS_MAKER_LABEL_GOOGLE_MAP_IMAGE+"&key=" + GOOLGE_STATIC_MAP_API_KEY
    return URL
  }
});