var myApp = angular.module("ionicApp");
var currentWatchID = null
myApp.factory('locationService', function($http, $q) {

	var isIOS = ionic.Platform.isIOS()
	var isAndroid = ionic.Platform.isAndroid()

	return {
		getLocation: function() {
			var defer = $q.defer();

			var onSuccess = function (position) {
				//navigator.geolocation.clearWatch(currentWathID)
				defer.resolve([position.coords.latitude, position.coords.longitude, position.coords.accuracy])
			}
			function onError (error) {
				console.log("error")
				if (error.message.indexOf('Only secure origins are allowed') == 0
					|| error.message.indexOf('Origin does not have permission to use Geolocation service') == 0
					|| error.message.indexOf('Network location provider') == 0
					|| error.message.indexOf('User denied Geolocation') == 0) {

					var newMethodResponse = getLocationService_basedOn_IP()
					if (isEmpty(newMethodResponse)){
						defer.reject('Cannot get current geo-location');
					} else {
						defer.resolve([newMethodResponse.lat, newMethodResponse.lon, 90])
					}

				}
				defer.reject(error);

			}
			if (window.cordova) {
				if (!isIOS && isAndroid){
					cordova.plugins.diagnostic.isLocationEnabled(function(enabled) {
						console.log("Location is " + (enabled ? "enabled" : "disabled"));
						if (enabled){
							navigator.geolocation.getCurrentPosition(onSuccess, onError,  LOCATION_SERVICE_OPTION)
							//currentWatchID = navigator.geolocation.getCurrentPosition(onSuccess, onError,  LOCATION_SERVICE_OPTION)
						} else {
							seeToast2('Please enable location services', 3000)
								//cordova.plugins.diagnostic.switchToLocationSettings();
								defer.reject('Cannot get current geo-location')
							}
						}, function(error) {
							alert("The following error occurred: " + error);
						});
				} else if (!isAndroid && isIOS){
					navigator.geolocation.getCurrentPosition(onSuccess, onError,  LOCATION_SERVICE_OPTION)
					//currentWatchID = navigator.geolocation.watchPosition(onSuccess, onError,  LOCATION_SERVICE_OPTION)
				}
			} else {
				console.log("Web")
				navigator.geolocation.getCurrentPosition(onSuccess, onError,  LOCATION_SERVICE_OPTION)
				//currentWatchID = navigator.geolocation.watchPosition(onSuccess, onError,  LOCATION_SERVICE_OPTION)
			}
			return defer.promise
		}
	}

});