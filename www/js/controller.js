angular.module('ionicApp.controller',['chart.js'])

/****************************************/
/*
 * Activity Settings
 */
/****************************************/
.factory('Scopes', function ($rootScope) {
    var mem = {};
 
    return {
        store: function (key, value) {
            $rootScope.$emit('scope.stored', key);
            mem[key] = value;
        },
        get: function (key) {
            return mem[key];
        }
    };
})
/****************************************/
/*
 * Manage Controller
 */
/****************************************/
/****************************************/
/** List Account Controller **/
/****************************************/
.controller('ListAccountsCtrl', function($scope, $state, $http, Scopes, $ionicHistory) {
	var listAuthentication = window.localStorage.getItem("AUTHENTICATION_LIST");
	var jsonObjAuth = JSON.parse(listAuthentication);
	$scope.accounts = jsonObjAuth['authentication'];
	function clearCache() {
		$ionicHistory.clearCache();
		//$ionicHistory.clearHistory();
	}
	$scope.selectAccount = function(account){
		window.localStorage.setItem("current_json_auth_data", account.json_auth_data);
		window.localStorage.setItem("current_email",account.email);
		window.localStorage.setItem("current_password",account.password);
		//clearCache();   
		window.localStorage.setItem("PREVIOUS_PAGE","ACCOUNTS_PAGE");
		$state.go('landinfo.plots');
	};
}) // End ListAccountsCtrl

/****************************************/
/** Settings Controller **/
/****************************************/
.controller('SettingsCtrl', function($scope, $state, $http, Scopes,$ionicHistory) {
	console.log("Click Setting");
	$ionicHistory.clearCache();
}) // End Setting

/****************************************/
/** Results Section Controller **/
/****************************************/
.controller('Results_Section_Ctrl', function($scope, $state) {
	console.log("Result Section Ctrl");
	$scope.review_status_img_src = "img/check-mark-th.png";
	//$scope.review_status_img_src = "img/check-mark-white-th.png";	
	$scope.results_status_img_src = "img/check-mark-th.png";
}) // End Results Section Controller

/****************************************/
/** Clear Controller **/
/****************************************/
.controller('ClearCtrl', function($scope,$ionicHistory) {
  console.log("Clear Everything");
  window.localStorage.clear();
  $ionicHistory.clearCache();
  $ionicHistory.clearHistory();
}) // End ClearCtrl

/****************************************/
/** Plots Map Controller **/
/****************************************/
.controller('PlotsMapCtrl', function($scope, $state, $compile) {
	
	function fAvgLat(JSONArrayPlots){
		var sumLat = 0;
		//var sumLong = 0;
		for (var index = 0; index < JSONArrayPlots.length; index++) {
			var latitude =  parseFloat(JSONArrayPlots[index].latitude);
			//var longitude =  parseFloat(JSONArray[index].longitude);
			sumLat = sumLat + latitude;
			//sumLong = sumLong + longitude;
		}
		
		return parseFloat(sumLat / JSONArrayPlots.length);
	};
	
	function fAvgLong(JSONArrayPlots){
		//var sumLat = 0;
		var sumLong = 0;
		for (var index = 0; index < JSONArrayPlots.length; index++) {
			//var latitude =  parseFloat(JSONArrayPlots[index].latitude);
			var longitude =  parseFloat(JSONArrayPlots[index].longitude);
			//sumLat = sumLat + latitude;
			sumLong = sumLong + longitude;
		}
		
		return parseFloat(sumLong / JSONArrayPlots.length);
	};
	
	function isPlotInCloud(plot){
		if (plot.id === null || plot.id === '' || plot.id === 'null' || plot.id === 'undefined' || plot.isActived == true){
			return false;
		} else {
			return true;
		}
    };	
	
	$scope.init = function() {
		
		function bindInfoWindow(marker, map, infoWindow, html) {
			  
	  	      google.maps.event.addListener(marker, 'click', function() {
	  	        infoWindow.setContent(html);
	  	        infoWindow.open(map, marker);
	  	      });
	  	};
		
	  	
	  	function getLandCoverIcon(cover){
			switch(cover) {
						case "tree cover, >25% canopy": //land_use_cover_fragment_land_cover_1
							return "media/landcover_images/ic_tree_selected.png";
							
						case "shrub cover, >50% cover"://land_use_cover_fragment_land_cover_2
							return "media/landcover_images/ic_shrub_selected.png";
							
						case "grassland, >50% grass"://land_use_cover_fragment_land_cover_3
							return "media/landcover_images/ic_grass_land_selected.png";
							
						case "savanna, 10-20% tree cover"://land_use_cover_fragment_land_cover_4
							return "media/landcover_images/ic_savanna_selected.png";
							
						case "garden/mixed"://land_use_cover_fragment_land_cover_5
							return "media/landcover_images/ic_garden_mixed_selected.png";
							
						case "cropland"://land_use_cover_fragment_land_cover_6
							return "media/landcover_images/ic_cropland_selected.png";
							
						case "developed"://land_use_cover_fragment_land_cover_7
							return "media/landcover_images/ic_developed_selected.png";
							
						case "barren, <5% veg cover"://land_use_cover_fragment_land_cover_8
							return "media/landcover_images/ic_barren_selected.png";
							
						case "water"://land_use_cover_fragment_land_cover_9
							return "media/landcover_images/ic_water_selected.png";		
							
						default://unknown
							return "media/landcover_images/ic_unknown.png";
			}
		};
	  	
	  	
        var myLatlng = new google.maps.LatLng(-18.027830, 28.447186);
        var mapOptions = {
          center: myLatlng,
          zoom: 4,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map"),
            mapOptions);
     
        var infowindow = new google.maps.InfoWindow;

    	var email = window.localStorage.getItem('current_email');
    	console.log(email);
	    var LIST_PLOTS = JSON.parse(window.localStorage.getItem(email + "_" + "LIST_LANDINFO_PLOTS"));
	    for(var index = 0 ; index < LIST_PLOTS.length ; index++){
	    	var plot = LIST_PLOTS[index];
	    	if (isPlotInCloud(plot)){
		    	var name = plot.name;
	            var recorder_name = plot.recorder_name;
	            var lat = plot.latitude;
	            var lng = plot.longitude;
	            
				var slope =  plot.slope;
				var slope_shape =  plot.slope_shape;
				var land_cover =  plot.land_cover;
				var grazed =  plot.grazed;
				var flooding =  plot.flooding;
				var surface_cracking = plot.surface_cracking;
				var surface_salt =  plot.surface_salt;
				  
			    var texture_for_soil_horizon_1 = plot.texture.soil_horizon_1;
				var texture_for_soil_horizon_2 = plot.texture.soil_horizon_2;
				var texture_for_soil_horizon_3 = plot.texture.soil_horizon_3;
				var texture_for_soil_horizon_4 = plot.texture.soil_horizon_4;
				var texture_for_soil_horizon_5 = plot.texture.soil_horizon_5;
				var texture_for_soil_horizon_6 = plot.texture.soil_horizon_6;
				var texture_for_soil_horizon_7 = plot.texture.soil_horizon_7;
				  
				var rock_fragment_for_soil_horizon_1 = plot.rock_fragment.soil_horizon_1;
				var rock_fragment_for_soil_horizon_2 = plot.rock_fragment.soil_horizon_2;
				var rock_fragment_for_soil_horizon_3 = plot.rock_fragment.soil_horizon_3;
				var rock_fragment_for_soil_horizon_4 = plot.rock_fragment.soil_horizon_4;
				var rock_fragment_for_soil_horizon_5 = plot.rock_fragment.soil_horizon_5;
				var rock_fragment_for_soil_horizon_6 = plot.rock_fragment.soil_horizon_6;
				var rock_fragment_for_soil_horizon_7 = plot.rock_fragment.soil_horizon_7;
				  
	            var point = new google.maps.LatLng(
	                parseFloat(lat),
	                parseFloat(lng)
	            );
		    	
	            
	            var html = "<b>Plot Name : </b>" + name +
				  "<br/> <b>Lat : </b>" + parseFloat(lat).toFixed(3) + 
				  "<br/><b>Long : </b>" + parseFloat(lng).toFixed(3) +
				  "<br/><b>Land Cover : </b>" + land_cover+'<img src= "'+ getLandCoverIcon(land_cover) + '" alt="icon" width ="140" height="140" vertical-align ="middle" style="float:right;">'+
				   "<br/><b>Land Use : </b>" + 
				   '<ul style="display: table-cell; vertical-align: top;">'+
				   "<li><b>Livestock Grazing? </b>" + grazed + "</li>" +
				   "<li><b>Standing Water? </b>" + flooding+ "</li>" +
				   "</ul>"+
				  "<b>Slope : </b>" + slope + 
				  "<br/><b>Slope shape : </b>" + slope_shape+
				   "<br/><b>Soil Conditions : </b>" + 
				   '<ul style="display: table-cell; vertical-align: top;">'+
				   "<li><b>Vertical cracks in soil profile? </b>" + surface_cracking + "</li>" +
				   "<li><b>Salt on soil surface? </b>" + surface_salt+ "</li>" +
				   "</ul>"+
				   "<b>Soil Layers </b>" + 
				   '<ul style="display: table-cell; vertical-align: top;">'+
				   "<li><b>0-1 cm </b>"+ '<ul style="display: table-cell; vertical-align: top;">' +
					"<li><b>Texture: </b>" + texture_for_soil_horizon_1 +"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Rock fragments: </b>"+ rock_fragment_for_soil_horizon_1+ "</li>" +
				   "</ul></li>"+				   
				   "<li><b>1-10 cm </b>"+ '<ul style="display: table-cell; vertical-align: top;">' +
					"<li><b>Texture: </b>" + texture_for_soil_horizon_2 +"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Rock fragments: </b>"+ rock_fragment_for_soil_horizon_2+ "</li>" +
				   "</ul></li>"+
				   "<li><b>10-20 cm </b>"+ '<ul style="display: table-cell; vertical-align: top;">' +
					"<li><b>Texture: </b>" + texture_for_soil_horizon_3 +"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Rock fragments: </b>"+ rock_fragment_for_soil_horizon_3+ "</li>" +
				   "</ul></li>"+
				   "<li><b>20-50 cm </b>"+ '<ul style="display: table-cell; vertical-align: top;">' +
					"<li><b>Texture: </b>" + texture_for_soil_horizon_4 +"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Rock fragments: </b>"+ rock_fragment_for_soil_horizon_4+ "</li>" +
				   "</ul></li>"+
				   "<li><b>50-70 cm </b>"+ '<ul style="display: table-cell; vertical-align: top;">' +
					"<li><b>Texture: </b>" + texture_for_soil_horizon_5 +"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Rock fragments: </b>"+ rock_fragment_for_soil_horizon_5+ "</li>" +
				   "</ul></li>"+
				   "<li><b>70-100 cm </b>"+ '<ul style="display: table-cell; vertical-align: top;">' +
				   "<li><b>Texture: </b>" + texture_for_soil_horizon_6 +"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Rock fragments: </b>"+ rock_fragment_for_soil_horizon_6+ "</li>" +
				   "</ul></li>"+
				   "<li><b>100-120 cm </b>"+ '<ul style="display: table-cell; vertical-align: top;">' +
				   "<li><b>Texture: </b>" + texture_for_soil_horizon_7 +"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Rock fragments: </b>"+ rock_fragment_for_soil_horizon_7+ "</li>" +
				   "</ul></li>"+
				   "</ul>";
		    	
		        var marker = new google.maps.Marker({
		          position: point,
		          map: map,
		          title: 'LandInfo Plots Map'
		        });
		        bindInfoWindow(marker, map, infowindow, html);
	    	}
	    }
        $scope.map = map;
	};
	
	$scope.getClimate = function(){
		$state.go('landinfo.quick_climate');
	};
})

/****************************************/
/** HomeTab Controller **/
/****************************************/
.controller('HomeTabCtrl', function($scope,$state) {
	console.log("HomeTab ");
	$scope.getClimate = function(){
		$state.go('landinfo.quick_climate');
	};
}) // End HomeTabCtrl


/****************************************/
/** ReviewSelectedPlot Controller **/
/****************************************/
.controller('ReviewSelectedPlotCtrl', function($scope, $state, $http, Scopes) {
	var ListPlotsCtrl_Scope = Scopes.get('ListPlotsCtrl_Scope');
	
	$scope.name = ListPlotsCtrl_Scope.selectedPlot.name;
	$scope.selectedPlot = ListPlotsCtrl_Scope.selectedPlot;
	console.log($scope.selectedPlot);
    $scope.labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug','Sep','Oct','Nov','Dec'];
    $scope.series = ['Series A'];
    $scope.captions = ['Climate'];

    $scope.data = [
       [ListPlotsCtrl_Scope.selectedPlot.climate.precipitation.january, ListPlotsCtrl_Scope.selectedPlot.climate.precipitation.february, ListPlotsCtrl_Scope.selectedPlot.climate.precipitation.march, ListPlotsCtrl_Scope.selectedPlot.climate.precipitation.april, ListPlotsCtrl_Scope.selectedPlot.climate.precipitation.may, ListPlotsCtrl_Scope.selectedPlot.climate.precipitation.june, ListPlotsCtrl_Scope.selectedPlot.climate.precipitation.july, ListPlotsCtrl_Scope.selectedPlot.climate.precipitation.august,ListPlotsCtrl_Scope.selectedPlot.climate.precipitation.september,ListPlotsCtrl_Scope.selectedPlot.climate.precipitation.october,ListPlotsCtrl_Scope.selectedPlot.climate.precipitation.november,ListPlotsCtrl_Scope.selectedPlot.climate.precipitation.december],
 ];

    $scope.names = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug','Sep','Oct','Nov','Dec'];
    $scope.number = ['Max Temp', 'Avg Temp','Min Temp'];
    $scope.linedata = [
    
    [ListPlotsCtrl_Scope.selectedPlot.climate.max_temperature.january, ListPlotsCtrl_Scope.selectedPlot.climate.max_temperature.february, ListPlotsCtrl_Scope.selectedPlot.climate.max_temperature.march, ListPlotsCtrl_Scope.selectedPlot.climate.max_temperature.april, ListPlotsCtrl_Scope.selectedPlot.climate.max_temperature.may, ListPlotsCtrl_Scope.selectedPlot.climate.max_temperature.june, ListPlotsCtrl_Scope.selectedPlot.climate.max_temperature.july, ListPlotsCtrl_Scope.selectedPlot.climate.max_temperature.august,ListPlotsCtrl_Scope.selectedPlot.climate.max_temperature.september,ListPlotsCtrl_Scope.selectedPlot.climate.max_temperature.october,ListPlotsCtrl_Scope.selectedPlot.climate.max_temperature.november,ListPlotsCtrl_Scope.selectedPlot.climate.max_temperature.december]
  ,  [ListPlotsCtrl_Scope.selectedPlot.climate.average_temperature.january, ListPlotsCtrl_Scope.selectedPlot.climate.average_temperature.february, ListPlotsCtrl_Scope.selectedPlot.climate.average_temperature.march, ListPlotsCtrl_Scope.selectedPlot.climate.average_temperature.april, ListPlotsCtrl_Scope.selectedPlot.climate.average_temperature.may, ListPlotsCtrl_Scope.selectedPlot.climate.average_temperature.june, ListPlotsCtrl_Scope.selectedPlot.climate.average_temperature.july, ListPlotsCtrl_Scope.selectedPlot.climate.average_temperature.august,ListPlotsCtrl_Scope.selectedPlot.climate.average_temperature.september,ListPlotsCtrl_Scope.selectedPlot.climate.average_temperature.october,ListPlotsCtrl_Scope.selectedPlot.climate.average_temperature.november,ListPlotsCtrl_Scope.selectedPlot.climate.average_temperature.december]
,   [ListPlotsCtrl_Scope.selectedPlot.climate.min_temperature.january, ListPlotsCtrl_Scope.selectedPlot.climate.min_temperature.february, ListPlotsCtrl_Scope.selectedPlot.climate.min_temperature.march, ListPlotsCtrl_Scope.selectedPlot.climate.min_temperature.april, ListPlotsCtrl_Scope.selectedPlot.climate.min_temperature.may, ListPlotsCtrl_Scope.selectedPlot.climate.min_temperature.june, ListPlotsCtrl_Scope.selectedPlot.climate.min_temperature.july, ListPlotsCtrl_Scope.selectedPlot.climate.min_temperature.august,ListPlotsCtrl_Scope.selectedPlot.climate.min_temperature.september,ListPlotsCtrl_Scope.selectedPlot.climate.min_temperature.october,ListPlotsCtrl_Scope.selectedPlot.climate.min_temperature.november,ListPlotsCtrl_Scope.selectedPlot.climate.min_temperature.december]

  ];
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };
  	
	var str = ListPlotsCtrl_Scope.selectedPlot.name.length;
		//var email = document.getElementById("email").value;
	    var email = window.localStorage.getItem('current_email');
		var emaillength = email.length + 1;
		var finalstr = name.substring(emaillength,str);
		//console.log(finalstr);
		
	$scope.names1 = [finalstr];
    $scope.awcseries = ['Series A'];
    $scope.awccaptions = ['AWC Soil Profile'];

    $scope.awcdata = [
       [ListPlotsCtrl_Scope.selectedPlot.analytic_data_soil.awc_soil_profile_awc],
    ];

    $scope.plotname = function(name){
		var str = name.length;
		//var email = document.getElementById("email").value;
		var email = window.localStorage.getItem('current_email');
		var emaillength = email.length + 1;
		var finalstr = name.substring(emaillength,str);
		
		return finalstr;
	};

}) // End ReviewSelectedPlotCtrl

/****************************************/
/** Quick Climate Ctrl **/
/****************************************/
.controller('QuickClimateCtrl', function($scope,$state,$http,$ionicLoading) {
	
     geoLocation();
     function geoLocation()
	 {
    	$ionicLoading.show({
   		  template: 'Fetching climate data for current location...'
        }); 
		var onSuccess = function(position) {
	
           lat = position.coords.latitude;
           lon =  position.coords.longitude ;       
           //console.log("Get data : " + lat + ":" + lon);
    	   $http.get('http://128.123.177.21:8080/query', {
				params : {
					action : "get",
					object : "climate",
					latitude : lat,
					longitude : lon,
					data_source : "world_clim",
					version : ""
				}
			}).success(function(data) {
		
		       $scope.plots = data;
		       var plots =  $scope.plots;
		       //console.log($scope.plots);
		       $scope.labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug','Sep','Oct','Nov','Dec'];
   			   $scope.series = ['Series A'];
    		   $scope.captions = ['Climate'];

			   $scope.data = [
			       [plots.climate.precipitation.january, plots.climate.precipitation.february, plots.climate.precipitation.march, plots.climate.precipitation.april, plots.climate.precipitation.may, plots.climate.precipitation.june, plots.climate.precipitation.july, plots.climate.precipitation.august,plots.climate.precipitation.september,plots.climate.precipitation.october,plots.climate.precipitation.november,plots.climate.precipitation.december],
			   ];

			   $scope.names = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug','Sep','Oct','Nov','Dec'];
			   $scope.number = ['Max Temp', 'Avg Temp','Min Temp'];
			   $scope.linedata = [
					    [plots.climate.max_temperature.january, plots.climate.max_temperature.february, plots.climate.max_temperature.march, plots.climate.max_temperature.april, plots.climate.max_temperature.may, plots.climate.max_temperature.june, plots.climate.max_temperature.july, plots.climate.max_temperature.august,plots.climate.max_temperature.september,plots.climate.max_temperature.october,plots.climate.max_temperature.november,plots.climate.max_temperature.december]
					   ,[plots.climate.average_temperature.january, plots.climate.average_temperature.february, plots.climate.average_temperature.march, plots.climate.average_temperature.april, plots.climate.average_temperature.may, plots.climate.average_temperature.june, plots.climate.average_temperature.july, plots.climate.average_temperature.august,plots.climate.average_temperature.september,plots.climate.average_temperature.october,plots.climate.average_temperature.november,plots.climate.average_temperature.december]
					   ,[plots.climate.min_temperature.january, plots.climate.min_temperature.february, plots.climate.min_temperature.march, plots.climate.min_temperature.april, plots.climate.min_temperature.may,plots.climate.min_temperature.june, plots.climate.min_temperature.july, plots.climate.min_temperature.august,plots.climate.min_temperature.september,plots.climate.min_temperature.october,plots.climate.min_temperature.november,plots.climate.min_temperature.december]

			   ];
			   
			 
			   $ionicLoading.hide();
			   $scope.onClick = function (points, evt) {
			    console.log(points, evt);
			   };
            }).error(function(err) {
            	$ionicLoading.hide();
				//alert(err.error);
            	alert("Unable to get climate data at this time");
            	$state.go('landinfo.home');
			});
			
     };
     function onError(error) {
        $ionicLoading.hide(); 
        //alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
        alert("Unable to get climate data at this time");
        $state.go('landinfo.home');
     }
     navigator.geolocation.getCurrentPosition(onSuccess, onError);
	}
})

/****************************************/
/** DummyCtrl **/
/****************************************/

.controller('DummyCtrl',function($scope){
	$scope.title = 'Landinfo';
})
/****************************************/
/** AddPlot_Edit_Ctrl **/
/****************************************/
.controller('AddPlot_Edit_Ctrl',function($scope,$state,$ionicHistory){
	
	var newPlot = JSON.parse(window.localStorage.getItem("current_edit_plot"));
	if (newPlot.isPlotIDCompleted == true){
		$scope.plot_id_img_src = "img/check-mark-th.png";
	} else {
		$scope.plot_id_img_src = "img/check-mark-white-th.png";	
	}
	
	if (newPlot.isLandCoverCompleted == true){
		$scope.plot_landcover_img_src = "img/check-mark-th.png";
	} else {
		$scope.plot_landcover_img_src = "img/check-mark-white-th.png";	
	}
	
	if (newPlot.isLandUseCompleted == true){
		$scope.plot_landuse_img_src = "img/check-mark-th.png";
	} else {
		$scope.plot_landuse_img_src = "img/check-mark-white-th.png";	
	}
	
	if (newPlot.isSlopeCompleted == true){
		$scope.plot_slope_img_src = "img/check-mark-th.png";
	} else {
		$scope.plot_slope_img_src = "img/check-mark-white-th.png";	
	}
	
	if (newPlot.isSlopeShapeCompleted == true){
		$scope.plot_slopeshape_img_src = "img/check-mark-th.png";
	} else {
		$scope.plot_slopeshape_img_src = "img/check-mark-white-th.png";	
	}
	
	if (newPlot.isSoilConditionCompleted == true){
		$scope.plot_soilcondition_img_src = "img/check-mark-th.png";
	} else {
		$scope.plot_soilcondition_img_src = "img/check-mark-white-th.png";	
	}
	
	if (newPlot.isSoilLayersCompleted == true){
		$scope.plot_soillayers_img_src = "img/check-mark-th.png";
	} else {
		$scope.plot_soillayers_img_src = "img/check-mark-white-th.png";	
	}
	
	if (newPlot.isPhotosCompleted == true){
		$scope.plot_photos_img_src = "img/check-mark-th.png";
	} else {
		$scope.plot_photos_img_src = "img/check-mark-white-th.png";	
	}
	
	if (newPlot.isReviewCompleted == true){
		$scope.plot_review_img_src = "img/check-mark-th.png";
	} else {
		$scope.plot_review_img_src = "img/check-mark-white-th.png";	
	}
	
	$scope.gotoAddPlot_Edit_PlotID = function(){
		window.localStorage.setItem("PREVIOUS_PAGE","ADD_PLOT_EDIT");
		$state.go('landinfo.plotid');
	},

	$scope.myGoBack = function() {
		 console.log("Go back");
		 //$ionicHistory.clearCache();
         $state.go('landinfo.plots');
    };
	
    $ionicHistory.nextViewOptions({
    	  disableAnimate: true,
    	  disableBack: true
    });
	
		
})
/****************************************/
/** AddPlot_AddNew_Ctrl **/
/****************************************/
.controller('AddPlot_AddNew_Ctrl',function($scope,$ionicHistory){
	window.localStorage.setItem("PREVIOUS_PAGE","ADD_PLOT_ADD_NEW");
})


/****************************************/
/** AddPlot_LandUse_Ctrl **/
/****************************************/
.controller('AddPlot_Slope_Ctrl',function($scope,$state){
	
})

/****************************************/
/** AddPlot_LandUse_Ctrl **/
/****************************************/
.controller('AddPlot_LandUse_Ctrl',function($scope,$state){
	function updatePlotExist(name,recorder_name,JSONArray,newPlot){
		for (var index = 0; index < JSONArray.length; index++) {
		    var plot = JSONArray[index];
		    if(plot.recorder_name === recorder_name && plot.real_name === name){
		        JSONArray[index] = newPlot;
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
	
	function isEmpty(value){
		if (value == null || value == "undefined" || value == "" || value == 'null' || value == 'NULL') {
	    	return true;
	    } 
		return false;
	};
	
	function presentStatus(item1,item2){
		item1 = item1.toUpperCase().trim();
		if (item1=="TRUE"){
			$scope.landuse_current_grazed = "media/landuse_images/ic_grazed_selected.png";
			$scope.landuse_current_not_grazed = "media/landuse_images/ic_not_grazed.png";
			
			for(var index = 0 ; index < item2.length ; index ++){
				if (item2[index] == "CATTLE"){
					$scope.landuse_current_cattle = "media/landuse_images/ic_cattle_grazing_selected.png";
				} else if (item2[index] == "GOAT") {
					$scope.landuse_current_goat = "media/landuse_images/ic_goat_grazing_selected.png";
				} else if (item2[index] == "SHEEP") {
					$scope.landuse_current_sheep = "media/landuse_images/ic_sheep_grazing_selected.png";
				} else if (item2[index] == "WILDLIFE") {
					$scope.landuse_current_wildlife = "media/landuse_images/ic_wildlife_grazing_selected.png";
				}
			}
			
		} else {
			$scope.landuse_current_grazed = "media/landuse_images/ic_grazed.png";
			$scope.landuse_current_not_grazed = "media/landuse_images/ic_not_grazed_selected.png";
			
			$scope.landuse_current_cattle = "media/landuse_images/ic_cattle_grazing_disabled.png"; 
			$scope.landuse_current_goat = "media/landuse_images/ic_goat_grazing_disabled.png";
			$scope.landuse_current_sheep = "media/landuse_images/ic_sheep_grazing_disabled.png";
			$scope.landuse_current_wildlife= "media/landuse_images/ic_wildlife_grazing_disabled.png";
		}
	}
	
	
	
	var recorder_name = window.localStorage.getItem('current_email');
	var email = recorder_name;
	var LIST_PLOTS = JSON.parse(window.localStorage.getItem(recorder_name + "_" + "LIST_LANDINFO_PLOTS"));
	var newPlot = JSON.parse(window.localStorage.getItem("current_edit_plot"));
	
	console.log(newPlot);
	var landuse_grazed = "false";
	var landuse_grazing = [];
	$scope.plot_name = newPlot.real_name;
	
	$scope.landuse_current_grazed = "media/landuse_images/ic_grazed.png"; 
	$scope.landuse_current_not_grazed = "media/landuse_images/ic_not_grazed.png"; 
	
	$scope.landuse_current_cattle = "media/landuse_images/ic_cattle_grazing.png"; 
	$scope.landuse_current_goat = "media/landuse_images/ic_goat_grazing.png";
	$scope.landuse_current_sheep = "media/landuse_images/ic_sheep_grazing.png";
	$scope.landuse_current_wildlife= "media/landuse_images/ic_wildlife_grazing.png";
	
	/* Pre-processing LandUse data */
	if (newPlot.isLandUseDoing == null || newPlot.isLandUseDoing == 'null' || newPlot.isLandUseDoing == 'undefined' || newPlot.isLandUseDoing == '' ||  newPlot.isLandUseDoing == false){
		/* New One */
		
	} else if (newPlot.isLandUseDoing == true){
		/* Edit old one */
		landuse_grazed = newPlot.grazed;
		landuse_grazing_string = newPlot.grazing;
		landuse_grazing = landuse_grazing_string.split(",");
		presentStatus(landuse_grazed,landuse_grazing);
		newPlot.isLandUseDoing = true;
	}
	
	$scope.select_LandUse_Grazed = function(item){
		switch(item){
			case "grazed":
				$scope.landuse_current_grazed = "media/landuse_images/ic_grazed_selected.png"; 
				$scope.landuse_current_not_grazed = "media/landuse_images/ic_not_grazed.png"; 
				
				$scope.landuse_current_cattle = "media/landuse_images/ic_cattle_grazing.png"; 
				$scope.landuse_current_goat = "media/landuse_images/ic_goat_grazing.png";
				$scope.landuse_current_sheep = "media/landuse_images/ic_sheep_grazing.png";
				$scope.landuse_current_wildlife= "media/landuse_images/ic_wildlife_grazing.png";
				
				landuse_grazed = "true";
				break;
			case "not_grazed":
				$scope.landuse_current_grazed = "media/landuse_images/ic_grazed.png"; 
				$scope.landuse_current_not_grazed = "media/landuse_images/ic_not_grazed_selected.png"; 
				
				$scope.landuse_current_cattle = "media/landuse_images/ic_cattle_grazing_disabled.png"; 
				$scope.landuse_current_goat = "media/landuse_images/ic_goat_grazing_disabled.png";
				$scope.landuse_current_sheep = "media/landuse_images/ic_sheep_grazing_disabled.png";
				$scope.landuse_current_wildlife= "media/landuse_images/ic_wildlife_grazing_disabled.png";
				landuse_grazed = "false";
				landuse_grazing = [];
				break;
				
		}
	};
	
	
	$scope.select_LandUse_Grazing = function(item){
		if (landuse_grazed.toUpperCase().trim() == "TRUE") {
			if (item.toUpperCase().trim() == "CATTLE"){
				if ($scope.landuse_current_cattle == "media/landuse_images/ic_cattle_grazing.png"){
					$scope.landuse_current_cattle = "media/landuse_images/ic_cattle_grazing_selected.png";
					landuse_grazing = addItem(landuse_grazing,"CATTLE");
				} else {
					$scope.landuse_current_cattle = "media/landuse_images/ic_cattle_grazing.png";
					landuse_grazing = removeItem(landuse_grazing,"CATTLE");
				}
				console.log(landuse_grazing);
			} else if (item.toUpperCase().trim() == "GOAT") {
				if ($scope.landuse_current_goat == "media/landuse_images/ic_goat_grazing.png"){
					$scope.landuse_current_goat = "media/landuse_images/ic_goat_grazing_selected.png";
					landuse_grazing = addItem(landuse_grazing,"GOAT");
				} else {
					$scope.landuse_current_goat = "media/landuse_images/ic_goat_grazing.png";
					landuse_grazing = removeItem(landuse_grazing,"GOAT");
				}
				console.log(landuse_grazing);
			} else if (item.toUpperCase().trim() == "SHEEP") {
				if ($scope.landuse_current_sheep == "media/landuse_images/ic_sheep_grazing.png"){
					$scope.landuse_current_sheep = "media/landuse_images/ic_sheep_grazing_selected.png";
					landuse_grazing = addItem(landuse_grazing,"SHEEP");
				} else {
					$scope.landuse_current_sheep = "media/landuse_images/ic_sheep_grazing.png";
					landuse_grazing = removeItem(landuse_grazing,"SHEEP");
				}
				console.log(landuse_grazing);
			} else if (item.toUpperCase().trim() == "WILDLIFE") {
				if ($scope.landuse_current_wildlife== "media/landuse_images/ic_wildlife_grazing.png"){
					$scope.landuse_current_wildlife = "media/landuse_images/ic_wildlife_grazing_selected.png";
					landuse_grazing = addItem(landuse_grazing,"WILDLIFE");
				} else {
					$scope.landuse_current_wildlife = "media/landuse_images/ic_wildlife_grazing.png";
					landuse_grazing = removeItem(landuse_grazing,"WILDLIFE");
				}
				console.log(landuse_grazing);
			} else {
				//Do not change
			}
		} else {
			// Do nothing
		}
		
	};
	
	
	$scope.completeAddPlot_LandUse = function(){
		if (landuse_grazed == null || landuse_grazed == 'null' || landuse_grazed == 'undefined' || landuse_grazed == ''){
			//newPlot.land_cover = "";
		} else {
			newPlot.grazed = landuse_grazed;		
			newPlot.isLandUseDoing = true;
		}
		
		if (landuse_grazed.toUpperCase().trim() == 'TRUE'){
			newPlot.grazing = landuse_grazing.toString();
		} else {
			newPlot.grazing = "NONE";
		}
		
		if (!isEmpty(newPlot.grazed)){
			if (newPlot.grazed.toUpperCase().trim() == "TRUE" && !isEmpty(newPlot.grazing)){
				newPlot.isLandUseCompleted = true;
			} else if (newPlot.grazed.toUpperCase().trim() == "FALSE"){
				newPlot.isLandUseCompleted = true;
			} else {
				newPlot.isLandUseCompleted = false;
			}
		}
		updatePlotExist(newPlot.real_name,newPlot.recorder_name,LIST_PLOTS,newPlot);
		window.localStorage.setItem(email + "_" + "LIST_LANDINFO_PLOTS", JSON.stringify(LIST_PLOTS));
		window.localStorage.setItem("current_edit_plot",JSON.stringify(newPlot));
		$state.go('landinfo.newplot');
	};
})

/****************************************/
/** AddPlot_LandCover_Ctrl **/
/****************************************/
.controller('AddPlot_LandCover_Ctrl',function($scope,$state){
	
	function updatePlotExist(name,recorder_name,JSONArray,newPlot){
		for (var index = 0; index < JSONArray.length; index++) {
		    var plot = JSONArray[index];
		    if(plot.recorder_name === recorder_name && plot.real_name === name){
		        JSONArray[index] = newPlot;
		    }
		}
	}
	
	function presentStatus(item1,item2){
		item1 = item1.toUpperCase().trim();
		switch(item1) {
				case "TREE": 
					$scope.landcover_current_tree = "media/landcover_images/ic_tree_selected.png";
					$scope.landcover_current_shrub = "media/landcover_images/ic_shrub.png"; 
					$scope.landcover_current_grass_land = "media/landcover_images/ic_grass_land.png"; 
					$scope.landcover_current_savana = "media/landcover_images/ic_savanna.png"; 
					$scope.landcover_current_garden_mixed = "media/landcover_images/ic_garden_mixed.png"; 
					$scope.landcover_current_cropland = "media/landcover_images/ic_cropland.png";
					$scope.landcover_current_developed = "media/landcover_images/ic_developed.png"; 
					$scope.landcover_current_barren = "media/landcover_images/ic_barren.png";
					$scope.landcover_current_water = "media/landcover_images/ic_water.png";
					
					break;
				case "SHRUBLAND": 
					$scope.landcover_current_tree = "media/landcover_images/ic_tree.png";
					$scope.landcover_current_shrub = "media/landcover_images/ic_shrub_selected.png"; 
					$scope.landcover_current_grass_land = "media/landcover_images/ic_grass_land.png"; 
					$scope.landcover_current_savana = "media/landcover_images/ic_savanna.png"; 
					$scope.landcover_current_garden_mixed = "media/landcover_images/ic_garden_mixed.png"; 
					$scope.landcover_current_cropland = "media/landcover_images/ic_cropland.png";
					$scope.landcover_current_developed = "media/landcover_images/ic_developed.png"; 
					$scope.landcover_current_barren = "media/landcover_images/ic_barren.png";
					$scope.landcover_current_water = "media/landcover_images/ic_water.png";
					
					break;
				case "GRASSLAND": 
					$scope.landcover_current_tree = "media/landcover_images/ic_tree.png";
					$scope.landcover_current_shrub = "media/landcover_images/ic_shrub.png"; 
					$scope.landcover_current_grass_land = "media/landcover_images/ic_grass_land_selected.png"; 
					$scope.landcover_current_savana = "media/landcover_images/ic_savanna.png"; 
					$scope.landcover_current_garden_mixed = "media/landcover_images/ic_garden_mixed.png"; 
					$scope.landcover_current_cropland = "media/landcover_images/ic_cropland.png";
					$scope.landcover_current_developed = "media/landcover_images/ic_developed.png"; 
					$scope.landcover_current_barren = "media/landcover_images/ic_barren.png";
					$scope.landcover_current_water = "media/landcover_images/ic_water.png";
					
					break;
				case "SAVANNA": 
					$scope.landcover_current_tree = "media/landcover_images/ic_tree.png";
					$scope.landcover_current_shrub = "media/landcover_images/ic_shrub.png"; 
					$scope.landcover_current_grass_land = "media/landcover_images/ic_grass_land.png"; 
					$scope.landcover_current_savana = "media/landcover_images/ic_savanna_selected.png"; 
					$scope.landcover_current_garden_mixed = "media/landcover_images/ic_garden_mixed.png"; 
					$scope.landcover_current_cropland = "media/landcover_images/ic_cropland.png";
					$scope.landcover_current_developed = "media/landcover_images/ic_developed.png"; 
					$scope.landcover_current_barren = "media/landcover_images/ic_barren.png";
					$scope.landcover_current_water = "media/landcover_images/ic_water.png";
					
					break;
				case "GARDEN/MIXED": 
					$scope.landcover_current_tree = "media/landcover_images/ic_tree.png";
					$scope.landcover_current_shrub = "media/landcover_images/ic_shrub.png"; 
					$scope.landcover_current_grass_land = "media/landcover_images/ic_grass_land.png"; 
					$scope.landcover_current_savana = "media/landcover_images/ic_savanna.png"; 
					$scope.landcover_current_garden_mixed = "media/landcover_images/ic_garden_mixed_selected.png"; 
					$scope.landcover_current_cropland = "media/landcover_images/ic_cropland.png";
					$scope.landcover_current_developed = "media/landcover_images/ic_developed.png"; 
					$scope.landcover_current_barren = "media/landcover_images/ic_barren.png";
					$scope.landcover_current_water = "media/landcover_images/ic_water.png";
					
					break;
				case "CROPLAND": 
					$scope.landcover_current_tree = "media/landcover_images/ic_tree.png";
					$scope.landcover_current_shrub = "media/landcover_images/ic_shrub.png"; 
					$scope.landcover_current_grass_land = "media/landcover_images/ic_grass_land.png"; 
					$scope.landcover_current_savana = "media/landcover_images/ic_savanna.png"; 
					$scope.landcover_current_garden_mixed = "media/landcover_images/ic_garden_mixed.png"; 
					$scope.landcover_current_cropland = "media/landcover_images/ic_cropland_selected.png";
					$scope.landcover_current_developed = "media/landcover_images/ic_developed.png"; 
					$scope.landcover_current_barren = "media/landcover_images/ic_barren.png";
					$scope.landcover_current_water = "media/landcover_images/ic_water.png";
					
					break;
				case "DEVELOPED": 
					$scope.landcover_current_tree = "media/landcover_images/ic_tree.png";
					$scope.landcover_current_shrub = "media/landcover_images/ic_shrub.png"; 
					$scope.landcover_current_grass_land = "media/landcover_images/ic_grass_land.png"; 
					$scope.landcover_current_savana = "media/landcover_images/ic_savanna.png"; 
					$scope.landcover_current_garden_mixed = "media/landcover_images/ic_garden_mixed.png"; 
					$scope.landcover_current_cropland = "media/landcover_images/ic_cropland.png";
					$scope.landcover_current_developed = "media/landcover_images/ic_developed_selected.png"; 
					$scope.landcover_current_barren = "media/landcover_images/ic_barren.png";
					$scope.landcover_current_water = "media/landcover_images/ic_water.png";
					
					break;
				case "BARREN": 
					$scope.landcover_current_tree = "media/landcover_images/ic_tree.png";
					$scope.landcover_current_shrub = "media/landcover_images/ic_shrub.png"; 
					$scope.landcover_current_grass_land = "media/landcover_images/ic_grass_land.png"; 
					$scope.landcover_current_savana = "media/landcover_images/ic_savanna.png"; 
					$scope.landcover_current_garden_mixed = "media/landcover_images/ic_garden_mixed.png"; 
					$scope.landcover_current_cropland = "media/landcover_images/ic_cropland.png";
					$scope.landcover_current_developed = "media/landcover_images/ic_developed.png"; 
					$scope.landcover_current_barren = "media/landcover_images/ic_barren_selected.png";
					$scope.landcover_current_water = "media/landcover_images/ic_water.png";
					
					break;
				case "WATER": 
					$scope.landcover_current_tree = "media/landcover_images/ic_tree.png";
					$scope.landcover_current_shrub = "media/landcover_images/ic_shrub.png"; 
					$scope.landcover_current_grass_land = "media/landcover_images/ic_grass_land.png"; 
					$scope.landcover_current_savana = "media/landcover_images/ic_savanna.png"; 
					$scope.landcover_current_garden_mixed = "media/landcover_images/ic_garden_mixed.png"; 
					$scope.landcover_current_cropland = "media/landcover_images/ic_cropland.png";
					$scope.landcover_current_developed = "media/landcover_images/ic_developed.png"; 
					$scope.landcover_current_barren = "media/landcover_images/ic_barren.png";
					$scope.landcover_current_water = "media/landcover_images/ic_water_selected.png";
					
					break;
		}
		
		if (!isEmptry(item2)){
			if (item2 == "true" || item2 == "TRUE" || item2.toUpperCase().trim() == "TRUE"){
					$scope.landcover_current_flooded = "media/landcover_images/ic_flooded_selected.png"; 
					$scope.landcover_current_no_flooded = "media/landcover_images/ic_not_flooded.png"; 
			} else {
					$scope.landcover_current_flooded = "media/landcover_images/ic_flooded.png"; 
					$scope.landcover_current_no_flooded = "media/landcover_images/ic_not_flooded_selected.png"; 
			}	
		}
		
	};
	
	function isEmptry(value){
		if (value == null || value == "undefined" || value == "" || value == 'null' || value == 'NULL') {
	    	return true;
	    } 
		return false;
	};
	
	
	var recorder_name = window.localStorage.getItem('current_email');
	var email = recorder_name;
	var LIST_PLOTS = JSON.parse(window.localStorage.getItem(recorder_name + "_" + "LIST_LANDINFO_PLOTS"));
	var newPlot = JSON.parse(window.localStorage.getItem("current_edit_plot"));
	
	console.log(newPlot);
	var landcover_part1_data = "";
	var landcover_part2_data = "";
	var flooding_data = "";
	$scope.plot_name = newPlot.real_name;
	
	$scope.landcover_current_tree = "media/landcover_images/ic_tree.png"; 
	$scope.landcover_current_shrub = "media/landcover_images/ic_shrub.png"; 
	$scope.landcover_current_grass_land = "media/landcover_images/ic_grass_land.png"; 
	$scope.landcover_current_savana = "media/landcover_images/ic_savanna.png"; 
	$scope.landcover_current_garden_mixed = "media/landcover_images/ic_garden_mixed.png"; 
	$scope.landcover_current_cropland = "media/landcover_images/ic_cropland.png";
	$scope.landcover_current_water = "media/landcover_images/ic_water.png";
	$scope.landcover_current_developed = "media/landcover_images/ic_developed.png"; 
	$scope.landcover_current_barren = "media/landcover_images/ic_barren.png"; 
	$scope.landcover_current_flooded = "media/landcover_images/ic_flooded.png"; 
	$scope.landcover_current_no_flooded = "media/landcover_images/ic_not_flooded.png"; 
	
	/* Pre-processing LandCover data */
	if (newPlot.isLandCoverDoing == null || newPlot.isLandCoverDoing == 'null' || newPlot.isLandCoverDoing == 'undefined' || newPlot.isLandCoverDoing == '' ||  newPlot.isLandCoverDoing == false){
		/* New One */
		
	} else if (newPlot.isLandCoverDoing == true){
		/* Edit old one */
		landcover_current_plot_data = newPlot.land_cover;
		flooding_current_plot_data = newPlot.flooding;
		presentStatus(landcover_current_plot_data,flooding_current_plot_data);
		newPlot.isLandCoverDoing = true;
	} 
	
	$scope.completeAddPlot_LandCover = function(){
		if (landcover_part1_data == null || landcover_part1_data == 'null' || landcover_part1_data == 'undefined' || landcover_part1_data == ''){
			//newPlot.land_cover = "";
		} else {
			newPlot.land_cover = landcover_part1_data;		
			newPlot.isLandCoverDoing = true;
		}
		
		
		if (!isEmptry(flooding_data)){
			newPlot.flooding = flooding_data;
			newPlot.isLandCoverDoing = true;
		}
		
		if (!isEmptry(newPlot.land_cover) && (!isEmptry(newPlot.flooding))){
			newPlot.isLandCoverCompleted = true;
		}

		updatePlotExist(newPlot.real_name,newPlot.recorder_name,LIST_PLOTS,newPlot);
		window.localStorage.setItem(email + "_" + "LIST_LANDINFO_PLOTS", JSON.stringify(LIST_PLOTS));
		window.localStorage.setItem("current_edit_plot",JSON.stringify(newPlot));
		$state.go('landinfo.newplot');
	};
	
	$scope.selectFlood = function(item){
		switch(item){
			case "flooded":
				$scope.landcover_current_flooded = "media/landcover_images/ic_flooded_selected.png"; 
				$scope.landcover_current_no_flooded = "media/landcover_images/ic_not_flooded.png"; 
				flooding_data = "true";
				break;
			case "not_flooded":
				$scope.landcover_current_flooded = "media/landcover_images/ic_flooded.png"; 
				$scope.landcover_current_no_flooded = "media/landcover_images/ic_not_flooded_selected.png"; 
				flooding_data = "false";
				break;
				
		}
	};
	
	$scope.selectPart1 = function(item){
		switch(item) {
			case "tree": 
				$scope.landcover_current_tree = "media/landcover_images/ic_tree_selected.png";
				$scope.landcover_current_shrub = "media/landcover_images/ic_shrub.png"; 
				$scope.landcover_current_grass_land = "media/landcover_images/ic_grass_land.png"; 
				$scope.landcover_current_savana = "media/landcover_images/ic_savanna.png"; 
				$scope.landcover_current_garden_mixed = "media/landcover_images/ic_garden_mixed.png"; 
				$scope.landcover_current_cropland = "media/landcover_images/ic_cropland.png";
				$scope.landcover_current_developed = "media/landcover_images/ic_developed.png"; 
				$scope.landcover_current_barren = "media/landcover_images/ic_barren.png";
				$scope.landcover_current_water = "media/landcover_images/ic_water.png";
				landcover_part1_data = "tree";
				break;
			case "shrubland": 
				$scope.landcover_current_tree = "media/landcover_images/ic_tree.png";
				$scope.landcover_current_shrub = "media/landcover_images/ic_shrub_selected.png"; 
				$scope.landcover_current_grass_land = "media/landcover_images/ic_grass_land.png"; 
				$scope.landcover_current_savana = "media/landcover_images/ic_savanna.png"; 
				$scope.landcover_current_garden_mixed = "media/landcover_images/ic_garden_mixed.png"; 
				$scope.landcover_current_cropland = "media/landcover_images/ic_cropland.png";
				$scope.landcover_current_developed = "media/landcover_images/ic_developed.png"; 
				$scope.landcover_current_barren = "media/landcover_images/ic_barren.png";
				$scope.landcover_current_water = "media/landcover_images/ic_water.png";
				landcover_part1_data = "shrubland";
				break;
			case "grassland": 
				$scope.landcover_current_tree = "media/landcover_images/ic_tree.png";
				$scope.landcover_current_shrub = "media/landcover_images/ic_shrub.png"; 
				$scope.landcover_current_grass_land = "media/landcover_images/ic_grass_land_selected.png"; 
				$scope.landcover_current_savana = "media/landcover_images/ic_savanna.png"; 
				$scope.landcover_current_garden_mixed = "media/landcover_images/ic_garden_mixed.png"; 
				$scope.landcover_current_cropland = "media/landcover_images/ic_cropland.png";
				$scope.landcover_current_developed = "media/landcover_images/ic_developed.png"; 
				$scope.landcover_current_barren = "media/landcover_images/ic_barren.png";
				$scope.landcover_current_water = "media/landcover_images/ic_water.png";
				landcover_part1_data = "grassland";
				break;
			case "savanna": 
				$scope.landcover_current_tree = "media/landcover_images/ic_tree.png";
				$scope.landcover_current_shrub = "media/landcover_images/ic_shrub.png"; 
				$scope.landcover_current_grass_land = "media/landcover_images/ic_grass_land.png"; 
				$scope.landcover_current_savana = "media/landcover_images/ic_savanna_selected.png"; 
				$scope.landcover_current_garden_mixed = "media/landcover_images/ic_garden_mixed.png"; 
				$scope.landcover_current_cropland = "media/landcover_images/ic_cropland.png";
				$scope.landcover_current_developed = "media/landcover_images/ic_developed.png"; 
				$scope.landcover_current_barren = "media/landcover_images/ic_barren.png";
				$scope.landcover_current_water = "media/landcover_images/ic_water.png";
				landcover_part1_data = "savanna";
				break;
			case "garden/mixed": 
				$scope.landcover_current_tree = "media/landcover_images/ic_tree.png";
				$scope.landcover_current_shrub = "media/landcover_images/ic_shrub.png"; 
				$scope.landcover_current_grass_land = "media/landcover_images/ic_grass_land.png"; 
				$scope.landcover_current_savana = "media/landcover_images/ic_savanna.png"; 
				$scope.landcover_current_garden_mixed = "media/landcover_images/ic_garden_mixed_selected.png"; 
				$scope.landcover_current_cropland = "media/landcover_images/ic_cropland.png";
				$scope.landcover_current_developed = "media/landcover_images/ic_developed.png"; 
				$scope.landcover_current_barren = "media/landcover_images/ic_barren.png";
				$scope.landcover_current_water = "media/landcover_images/ic_water.png";
				landcover_part1_data = "garden/mixed";
				break;
			case "cropland": 
				$scope.landcover_current_tree = "media/landcover_images/ic_tree.png";
				$scope.landcover_current_shrub = "media/landcover_images/ic_shrub.png"; 
				$scope.landcover_current_grass_land = "media/landcover_images/ic_grass_land.png"; 
				$scope.landcover_current_savana = "media/landcover_images/ic_savanna.png"; 
				$scope.landcover_current_garden_mixed = "media/landcover_images/ic_garden_mixed.png"; 
				$scope.landcover_current_cropland = "media/landcover_images/ic_cropland_selected.png";
				$scope.landcover_current_developed = "media/landcover_images/ic_developed.png"; 
				$scope.landcover_current_barren = "media/landcover_images/ic_barren.png";
				$scope.landcover_current_water = "media/landcover_images/ic_water.png";
				landcover_part1_data = "cropland";
				break;
			case "developed": 
				$scope.landcover_current_tree = "media/landcover_images/ic_tree.png";
				$scope.landcover_current_shrub = "media/landcover_images/ic_shrub.png"; 
				$scope.landcover_current_grass_land = "media/landcover_images/ic_grass_land.png"; 
				$scope.landcover_current_savana = "media/landcover_images/ic_savanna.png"; 
				$scope.landcover_current_garden_mixed = "media/landcover_images/ic_garden_mixed.png"; 
				$scope.landcover_current_cropland = "media/landcover_images/ic_cropland.png";
				$scope.landcover_current_developed = "media/landcover_images/ic_developed_selected.png"; 
				$scope.landcover_current_barren = "media/landcover_images/ic_barren.png";
				$scope.landcover_current_water = "media/landcover_images/ic_water.png";
				landcover_part1_data = "developed";
				break;
			case "barren": 
				$scope.landcover_current_tree = "media/landcover_images/ic_tree.png";
				$scope.landcover_current_shrub = "media/landcover_images/ic_shrub.png"; 
				$scope.landcover_current_grass_land = "media/landcover_images/ic_grass_land.png"; 
				$scope.landcover_current_savana = "media/landcover_images/ic_savanna.png"; 
				$scope.landcover_current_garden_mixed = "media/landcover_images/ic_garden_mixed.png"; 
				$scope.landcover_current_cropland = "media/landcover_images/ic_cropland.png";
				$scope.landcover_current_developed = "media/landcover_images/ic_developed.png"; 
				$scope.landcover_current_barren = "media/landcover_images/ic_barren_selected.png";
				$scope.landcover_current_water = "media/landcover_images/ic_water.png";
				landcover_part1_data = "barren";
				break;
			case "water": 
				$scope.landcover_current_tree = "media/landcover_images/ic_tree.png";
				$scope.landcover_current_shrub = "media/landcover_images/ic_shrub.png"; 
				$scope.landcover_current_grass_land = "media/landcover_images/ic_grass_land.png"; 
				$scope.landcover_current_savana = "media/landcover_images/ic_savanna.png"; 
				$scope.landcover_current_garden_mixed = "media/landcover_images/ic_garden_mixed.png"; 
				$scope.landcover_current_cropland = "media/landcover_images/ic_cropland.png";
				$scope.landcover_current_developed = "media/landcover_images/ic_developed.png"; 
				$scope.landcover_current_barren = "media/landcover_images/ic_barren.png";
				$scope.landcover_current_water = "media/landcover_images/ic_water_selected.png";
				landcover_part1_data = "water";
				break;
		}	
	};
	
	
})
/****************************************/
/** AddPlot_PlotID_Ctrl **/
/****************************************/
.controller('AddPlot_PlotID_Ctrl',function($scope,$state,$ionicHistory){
	function checkExistName(recorder_name,name, JSONArray){
		var hasMatch =false;
		for (var index = 0; index < JSONArray.length; index++) {
		    var plot = JSONArray[index];
		    var newName = recorder_name + "-" + name;
		    if(plot.name.trim() === newName.trim() || plot.name.trim() === name.trim()){
		      hasMatch = true;
		      break;
		    }
		}
		return hasMatch;
	};
	
	function isEmptry(value){
		if (value === null || value === "undefined" || value === "" || value === 'null' || value === 'NULL') {
	    	return true;
	    } 
		return false;
	};
	
	
	function updatePlotExist(name,recorder_name,JSONArray,newPlot){
		for (var index = 0; index < JSONArray.length; index++) {
		    var plot = JSONArray[index];
		    if(plot.recorder_name === recorder_name && plot.real_name === name){
		        JSONArray[index] = newPlot;
		    }
		}
	}
	
	$scope.getLocation = function() {
    	document.getElementById('latitude').type = "text";
    	document.getElementById('longitude').type = "text";
    	document.getElementById('latitude').style.color = "red";
    	document.getElementById('longitude').style.color = "red";
    	document.getElementById('latitude').value = "obtaining...";
    	document.getElementById('longitude').value = "obtaining...";
    	document.getElementById('btnObtainGPS').innerHTML = "Cancel GPS fix";
    	var onSuccess = function(position) {
    		document.getElementById('latitude').type = "number";
        	document.getElementById('longitude').type = "number";
    		document.getElementById('latitude').style.color = "black";
        	document.getElementById('longitude').style.color = "black";
            document.getElementById('latitude').value = position.coords.latitude;
        	document.getElementById('longitude').value = position.coords.longitude ;
        	document.getElementById('btnObtainGPS').innerHTML = "Obtain GPS fix"; 
    	};
    	
    	function onError(error) {
    		document.getElementById('latitude').value = "";
        	document.getElementById('longitude').value = "";
            alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
        }
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    };
	
	if (window.localStorage.getItem("PREVIOUS_PAGE") === "ADD_PLOT_ADD_NEW") {
		$scope.recorder_name = window.localStorage.getItem('current_email');
	    
	    
	    //Collect data PlotID
	    $scope.completeAddPlot_PlotID = function() {
	    	recorder_name = window.localStorage.getItem('current_email');
	    	email = recorder_name;
		    latitude = document.getElementById('latitude').value;
		    longitude = document.getElementById('longitude').value;
		    name = document.getElementById('name').value;
		    var LIST_PLOTS = JSON.parse(window.localStorage.getItem(recorder_name + "_" + "LIST_LANDINFO_PLOTS"));
		    if (checkExistName(recorder_name,name,LIST_PLOTS) == false){
			    organization = document.getElementById('organization').value;
			    if (document.getElementById('chkTestPlotYes').checked == true) {
			    	testPlot = true;
			    } else if (document.getElementById('chkTestPlotNo').checked == true) {
			    	testPlot = false;
			    } else {
			    	testPlot = true;
			    }
	
			    if (!isEmptry(name) && !isEmptry(recorder_name)){
			    	isActived = true;
			    } else {
			    	isActived = false;
			    }
			    
			    if (!isEmptry(name) && !isEmptry(recorder_name) && !isEmptry(latitude) && !isEmptry(longitude) && !isEmptry(testPlot)){
			    	isPlotIDCompleted = true;
			    } else {
			    	isPlotIDCompleted = false;
			    }
			    newPlot_PlotID = {isActived:isActived, isPlotIDCompleted : isPlotIDCompleted ,name:name, test_plot:testPlot, recorder_name:recorder_name, organization:organization,latitude : latitude, longitude : longitude};
			    
			    if (isActived == true){
				    $scope.newPlot_PlotID = newPlot_PlotID;
				    var newPlot = {isActived:isActived, isPlotIDCompleted : isPlotIDCompleted, id:"",name:recorder_name + "-" + name, real_name:name ,recorder_name:recorder_name, test_plot:testPlot, organization : organization, latitude:latitude, longitude:longitude};
				    if (checkExistName(recorder_name,name,LIST_PLOTS) == false) {
				    	LIST_PLOTS.push(newPlot);
						window.localStorage.setItem(email + "_" + "LIST_LANDINFO_PLOTS", JSON.stringify(LIST_PLOTS));
						window.localStorage.setItem("current_edit_plot",JSON.stringify(newPlot));
						$state.go('landinfo.newplot');
				    }
		        } else {
		        	alert("have not completed");
		        }
		    } else {
		    	alert("Plot Name is already used. Please try other name");
		    }
	    };
	    
		
	} else if (window.localStorage.getItem("PREVIOUS_PAGE") === "ADD_PLOT_EDIT"){
		var newPlot = JSON.parse(window.localStorage.getItem("current_edit_plot"));
		var recorder_name = window.localStorage.getItem('current_email');
		$scope.recorder_name = recorder_name;
		var email = recorder_name;
		document.getElementById('name').value = newPlot.real_name;
		document.getElementById('name').setAttribute("disabled","disabled");
		document.getElementById('organization').value = newPlot.organization;
		var organization = newPlot.organization;
		if (newPlot.test_plot == true){
			document.getElementById('chkTestPlotYes').checked = true;
			document.getElementById('chkTestPlotNo').checked = false;
		} else {
			document.getElementById('chkTestPlotYes').checked = false;
			document.getElementById('chkTestPlotNo').checked = true;
		}
		var testPlot = newPlot.test_plot;
		document.getElementById('latitude').value = newPlot.latitude;
		document.getElementById('longitude').value = newPlot.longitude;
		
		$scope.completeAddPlot_PlotID = function() {
			 var LIST_PLOTS = JSON.parse(window.localStorage.getItem(recorder_name + "_" + "LIST_LANDINFO_PLOTS"));
			 var name = document.getElementById('name').value;
			 var organization = document.getElementById('organization').value;
			 
			 if (document.getElementById('chkTestPlotYes').checked == true) {
			    	testPlot = true;
			 } else if (document.getElementById('chkTestPlotNo').checked == true) {
			    	testPlot = false;
			 } else {
			    	testPlot = true;
			 }
			 
			 var latitude = document.getElementById('latitude').value;
		     var longitude = document.getElementById('longitude').value;
			
			 if (!isEmptry(name) && !isEmptry(recorder_name) && !isEmptry(latitude) && !isEmptry(longitude) && !isEmptry(testPlot)){
			    	isPlotIDCompleted = true;
			 } else {
			    	isPlotIDCompleted = false;
			 }
			 
			 //var newPlot = {isActived:true, isPlotIDCompleted : isPlotIDCompleted, id:"",name:recorder_name + "-" + name, real_name:name ,recorder_name:recorder_name, test_plot:testPlot, organization : organization, latitude:latitude, longitude:longitude};
			 newPlot.isActived = true;
			 newPlot.isPlotIDCompleted = isPlotIDCompleted;
			 newPlot.name = recorder_name + "-" + name;
			 newPlot.recorder_name = recorder_name;
			 newPlot.id = "";
			 newPlot.real_name = name;
			 newPlot.test_plot = testPlot;
			 newPlot.organization= organization;
			 newPlot.latitude =latitude;
			 newPlot.longitude = longitude;
			 if (checkExistName(recorder_name,name,LIST_PLOTS) == true) {
				    updatePlotExist(name,recorder_name,LIST_PLOTS,newPlot);
					window.localStorage.setItem(email + "_" + "LIST_LANDINFO_PLOTS", JSON.stringify(LIST_PLOTS));
					window.localStorage.setItem("current_edit_plot",JSON.stringify(newPlot));
					$state.go('landinfo.newplot');
			 }
		};
	}    
})


/****************************************/
/** ListPlotsCtrl Controller **/
/****************************************/
.controller('ListPlotsCtrl', function($scope,$state, $http, Scopes, $ionicHistory,$ionicLoading) {
    $scope.title = 'Landinfo';
		
		
    function isPlotInCloud(plot){
			if (plot.id === null || plot.id === '' || plot.id === 'null' || plot.id === 'undefined' || plot.isActived == true){
				return false;
			} else {
				return true;
			}
    }		
		
	var email = window.localStorage.getItem('current_email');
	console.log("LIST of " + email);
	var previous_page = window.localStorage.getItem("PREVIOUS_PAGE");
	
	/* Should be Processed Caching Data in HERE */
	
	$ionicLoading.show({
	      template: 'Loading plots data...'
	});
	 
	if (previous_page === "LOGIN_PAGE") {
	   console.log("Get Data From API");
	   $http.get('http://128.123.177.21:8080/query', {
			params : {
				action : "get",
				object : "landinfo",
				recorder_name : email,
				display : "",
				delimiter : ",",
				version : ""
			}
		}).success(function(data) {
	
	       $scope.plots = data;
	       console.log($scope.plots.length);
	       
	       for(var index = 0 ; index < $scope.plots.length; index ++){
				var plot = $scope.plots[index];
				if (isPlotInCloud(plot) == true){
					$scope.plots[index].img_src = "img/check-mark-th.png";
				} else {
					$scope.plots[index].img_src = "img/check-mark-white-th.png";
				}
			}
	       
	       $ionicLoading.hide();
	       if($scope.plots.length === 0) {
	    	   window.localStorage.setItem("PREVIOUS_PAGE","LIST_PLOT_PAGE");
			   $state.go('landinfo.home');
		   }
		   else 
		   {
			   var localPlots = JSON.stringify(data);	
			   window.localStorage.setItem(email + "_" + "LIST_LANDINFO_PLOTS", localPlots);
		   }
		}).error(function(err) {
			$ionicLoading.hide();
			alert(err.error);
		});
	} else {
		clearAllCache();
		console.log("Get Data From Cache");
		$scope.plots = {};
		$scope.plots = JSON.parse(window.localStorage.getItem(email + "_" + "LIST_LANDINFO_PLOTS"));
		
		for(var index = 0 ; index < $scope.plots.length; index ++){
			var plot = $scope.plots[index];
			if (isPlotInCloud(plot) == true){
				$scope.plots[index].img_src = "img/check-mark-th.png";
			} else {
				$scope.plots[index].img_src = "img/check-mark-white-th.png";
			}
		}
		
		console.log($scope.plots);
		$ionicLoading.hide();
	}

    $scope.plotname = function(name){
		var str = name.length;
		var email = window.localStorage.getItem('current_email');
		var emaillength = email.length + 1;
		var finalstr = name.substring(emaillength,str);
		return finalstr;
	},


	$scope.selectPlot = function(plot){
		$scope.selectedPlot = plot;
		if (isPlotInCloud(plot) == true){
			Scopes.store('ListPlotsCtrl_Scope', $scope);
			window.localStorage.setItem("PREVIOUS_PAGE","LIST_PLOT_PAGE");
			$state.go('landinfo.results-section');
		} else {
			window.localStorage.setItem("current_edit_plot",JSON.stringify(plot));
			window.localStorage.setItem("PREVIOUS_PAGE","LIST_PLOT_PAGE");
			$state.go('landinfo.newplot');
		}
	},


	$scope.getClimate = function(){
		$state.go('landinfo.quick_climate');
	};		

	function clearAllCache() {
		console.log("Clear Cache");
		$ionicHistory.clearCache();
	}

}) // End ListPlotsCtrl
/****************************************/
/** SignIn Controller **/
/****************************************/
.controller('SignInCtrl', function($scope, $state, $http, Scopes, $ionicHistory,$ionicLoading) {
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
	}
	
	function updateAuthExist(email,auth_key,JSONArray){
		for (var index = 0; index < JSONArray.length; index++) {
		    var auth = JSONArray[index];
		    if(auth.email == email){
		        JSONArray[index].json_auth_data = auth_key;
		    }
		}
	}

	function clearAllCache() {
		console.log("Clear Cache");
		$ionicHistory.clearCache();
		//$ionicHistory.clearHistory();
	}
	
	/* Test before click login */
	$scope.signIn = function(email, password) {
		        $ionicLoading.show({
		           template: 'Logging in...'
		        });
				var email = document.getElementById("email").value;
				var password = document.getElementById("password").value;				
				clearAllCache();
				$http({
					    method: 'POST',
					    url: "http://128.123.177.21:8080/auth/api_login",
					    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
					    transformRequest: function(obj) {
					        var str = [];
					        for(var p in obj)
					        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
					        return str.join("&");
					    },
					    data: {email: email, password: password}
				}).success(
						function(data, status, headers, config) {
							var localData = JSON.stringify(data);
							
							var objAuth = window.localStorage.getItem("AUTHENTICATION_LIST");
							if (objAuth === null || objAuth === 'null'){
								var listAuthentication = { authentication : []};
								listAuthentication.authentication.push({
									"email" : email,
									"password" : password,
									"json_auth_data" : localData
								});
							} else {
								var listAuthentication = JSON.parse(objAuth);
								if (checkExist(email, listAuthentication['authentication']) == false){
									listAuthentication['authentication'].push({
										"email" : email,
										"password" : password,
										"json_auth_data" : localData
									});
								} else {
									console.log("Update");
									updateAuthExist(email,localData,listAuthentication['authentication']);
								}	
							}
							window.localStorage.setItem("current_json_auth_data", localData);
							window.localStorage.setItem("current_email",email);
							window.localStorage.setItem("current_password",password);

							window.localStorage.setItem("AUTHENTICATION_LIST",JSON.stringify(listAuthentication));
							window.localStorage.setItem("PREVIOUS_PAGE","LOGIN_PAGE");
							$ionicLoading.hide();
							$state.go('landinfo.plots');
						
						}).error(function(err) {
							$ionicLoading.hide();
					        alert(err.error,'Authentication Error');
				});  // End HTTP POST LOGIN
	}; // End SignIn
}); // End Controller SignInCtrl