angular.module('ionicApp', ['ionic','ionicApp.landcover_controller','ionicApp.landinfo_controller','ionicApp.landpks_controller','ngCordova','pascalprecht.translate'])

/*
.config(function ($locationProvider) {
  $locationProvider.html5Mode(true);
})
*/

.config(['$translateProvider',function ($translateProvider) {
  $translateProvider.translations('en', LPKS_METADATA_EN);
  $translateProvider.translations('sp', LPKS_METADATA_SP);
  $translateProvider.preferredLanguage('en');
}])

.config(['$httpProvider', function($httpProvider) {
   //$httpProvider.defaults.withCredentials = true;
   $httpProvider.defaults.headers.common = {};
   $httpProvider.defaults.headers.post = {};
   $httpProvider.defaults.headers.put = {};
   $httpProvider.defaults.headers.patch = {};
}])


.config(function($stateProvider, $urlRouterProvider) {
  
  $stateProvider
  .state('landpks.landcover_main_transect', {
      url: "/landcover_main_transect",
      cache: false,
      views: {
        'home-tab': {
          templateUrl: "templates/main_transect.html",
          controller: 'LandCover_Main_Transect_Ctrl'
        }
      }
   })
   .state('landpks.landcover_north_transect', {
      url: "/landcover_north_transect",
      cache: false,
      views: {
        'home-tab': {
          templateUrl: "templates/north_transect.html",
          controller: 'LandCover_North_Transect_Ctrl'
        }
      }
   })
   .state('landpks.landcover_east_transect', {
      url: "/landcover_east_transect",
      cache: false,
      views: {
        'home-tab': {
          templateUrl: "templates/east_transect.html",
          controller: 'LandCover_East_Transect_Ctrl'
        }
      }
   })
  .state('landpks.landcover_south_transect', {
      url: "/landcover_south_transect",
      cache: false,
      views: {
        'home-tab': {
          templateUrl: "templates/south_transect.html",
          controller: 'LandCover_South_Transect_Ctrl'
        }
      }
   })
   .state('landpks.landcover_west_transect', {
      url: "/landcover_west_transect",
      cache: false,
      views: {
        'home-tab': {
          templateUrl: "templates/west_transect.html",
          controller: 'LandCover_West_Transect_Ctrl'
        }
      }
   })
   .state('landpks.landcover_transect_cover', {
      url: "/landcover_transect_cover",
      cache: false,
      views: {
        'home-tab': {
          templateUrl: "templates/transect_cover.html",
          controller: 'LandCover_Transect_Cover_Ctrl'
        }
      }
   })
   .state('landpks.landcover_transect_height_gap', {
      url: "/landcover_transect_height_gap",
      cache: false,
      views: {
        'home-tab': {
          templateUrl: "templates/transect_height_gap.html",
          controller: 'LandCover_Transect_Height_Gap_Ctrl'
        }
      }
   })
    .state('landpks.landinfo_site-home', {
      url: "/landinfo_site-home",
      cache: true,
      views: {
        'home-tab': {
          templateUrl: "landinfo_templates/siteHome.html",
          controller: 'siteHome',
          title: "view Title"
        }
      },
      title: "state Title"
    })
    .state('landpks.landinfo_site-data', {
      url: "/landinfo_site-data",
      cache: true,
      views: {
        'home-tab': {
          templateUrl: "landinfo_templates/siteData.html",
          controller: 'siteData'
        }
      }
    })
    .state('landpks.landinfo_soil-web', {
      url: "/landinfo_soil-web",
      cache: false,
      views: {
        'home-tab': {
          templateUrl: "landinfo_templates/soil-web.html",
          controller: 'soilWeb'
        }
      }
    })
    .state('landpks.landinfo_site-texture', {
      url: "/landinfo_site-texture:layer",
      cache: true,
      views: {
        'home-tab': {
          templateUrl: "landinfo_templates/siteTexture.html",
          controller: 'DataInput_Texture_Ctrl'
        }
      }
    })
    .state('landpks.landinfo_guide_me_soil_texture', {
      url: "/landinfo_guide_me_soil_texture",
      views: {
        'home-tab': {
          templateUrl: "landinfo_templates/guide_me_soil_texture.html",
          controller: 'Guide_Me_Soil_Texture_Ctrl'
        }
      }
    })
    .state('landpks.landinfo_landcover', {
      url: "/landinfo_landcover",
      cache: false,
      views: {
        'home-tab': {
          templateUrl: "landinfo_templates/landcover_horizontal.html",
          controller: 'DataInput_LandCover_Ctrl'
        }
      }
    })
    .state('landpks.landinfo_landuse', {
      url: "/landinfo_landuse",
      cache: false,
      views: {
        'home-tab': {
          templateUrl: "landinfo_templates/landuse.html",
          controller: 'DataInput_LandUse_Ctrl'
        }
      }
    })

    .state('landpks.landinfo_slope', {
      url: "/landinfo_slope",
      cache: false,
      views: {
        'home-tab': {
          templateUrl: "landinfo_templates/slope.html",
          controller: 'DataInput_Slope_Ctrl'
        }
      }
    })
    .state('landpks.landinfo_slopeshape', {
      url: "/landinfo_slopeshape",
      cache: false,
      views: {
        'home-tab': {
          templateUrl: "landinfo_templates/slopeshape.html",
          controller: 'DataInput_Slopeshape_Ctrl'

        }
      }
    })
    .state('landpks.landinfo_soilcondition', {
      url: "/landinfo_soilcondition",
      cache: false,
      views: {
        'home-tab': {
          templateUrl: "landinfo_templates/soilcondition.html",
          controller: 'DataInput_Soilcondition_Ctrl'

        }
      }
    })
    .state('landpks.landinfo_accelerometer', {
      url: "/landinfo_accelerometer",
      views: {
        'home-tab': {
          templateUrl: "landinfo_templates/accelerometer.html",
          controller: 'Accelerometer_Ctrl'

        }
      }
    })
    .state('landpks.landinfo_accelerometer_horizon', {
      url: "/landinfo_accelerometer_horizon",
      views: {
        'home-tab': {
          templateUrl: "landinfo_templates/accelerometer_horizon.html",
          controller: 'Accelerometer_Horizon_Ctrl'

        }
      }
    })
    .state('landpks.landinfo_photos', {
      url: "/landinfo_photos",
      cache: false,
      views: {
        'home-tab': {
          templateUrl: "landinfo_templates/photos.html",
          controller: 'AddPlot_Photos_Ctrl'
        }
      }
    })
  .state('landpks.landinfo_quick_climate', {
      url: "/landinfo_quick_climate",
      cache: false,
      views: {
        'climate-tab': {
          templateUrl: "landinfo_templates/quick_climate.html",
          controller: 'QuickClimateCtrl'
        }
      }
    })
  .state('landpks.landinfo_take_photo_soil_pit_browser', {
      url: "/landinfo_take_photo_soil_pit_browser",
      views: {
        'home-tab': {
          templateUrl: "landinfo_templates/take_photo_soil_pit_browser.html",
          controller: 'Take_Photo_Soil_Pit_Browser_Ctrl'

        }
      }
    })
  .state('landpks.landinfo_take_photo_soil_pit_device', {
      url: "/landinfo_take_photo_soil_pit_device",
      views: {
        'home-tab': {
          templateUrl: "landinfo_templates/take_photo_soil_pit_device.html",
          controller: 'Take_Photo_Soil_Pit_Device_Ctrl'

        }
      }
    })
  .state('landpks.landinfo_take_photo_soil_sample_browser', {
      url: "/landinfo_take_photo_soil_sample_browser",
      views: {
        'home-tab': {
          templateUrl: "landinfo_templates/take_photo_soil_sample_browser.html",
          controller: 'Take_Photo_Soil_Sample_Browser_Ctrl'

        }
      }
    })
   .state('landpks.landinfo_take_photo_soil_sample_device', {
      url: "/landinfo_take_photo_soil_sample_device",
      views: {
        'home-tab': {
          templateUrl: "landinfo_templates/take_photo_soil_sample_device.html",
          controller: 'Take_Photo_Soil_Sample_Device_Ctrl'

        }
      }
    })
   .state('landpks.landinfo_take_photos_landscape', {
      url: "/landinfo_take_photos_landscape",
      cache: false,
      views: {
        'home-tab': {
          templateUrl: "landinfo_templates/take_photos_landscape.html",
          controller: 'Take_Photo_LandScape_Ctrl'

        }
      }
    })
   .state('landpks.landinfo_take_photos_landscape_compass', {
      url: "/landinfo_take_photos_landscape_compass",
      cache: false,
      views: {
        'home-tab': {
          templateUrl: "landinfo_templates/take_photos_landscape_compass.html",
          controller: 'Take_Photo_LandScape_Compass_Ctrl'

        }
      }
    })
    .state('landpks.landinfo_take_photos_landscape_off_compass', {
       url: "/landinfo_take_photos_landscape_off_compass",
       cache: false,
       views: {
         'home-tab': {
           templateUrl: "landinfo_templates/take_photos_landscape_off_compass.html",
           controller: 'Take_Photo_LandScape_Off_Compass_Ctrl'

         }
       }
     })
   .state('landpks.landinfo_take_photo_landscape_north_browser', {
      url: "/landinfo_take_photo_landscape_north_browser",
      cache: false,
      views: {
        'home-tab': {
          templateUrl: "landinfo_templates/take_photo_landscape_north_browser.html",
          controller: 'Take_Photo_LandScape_North_Browser_Ctrl'

        }
      }
    })
    .state('landpks.landinfo_take_photo_landscape_north_device', {
      url: "/landinfo_take_photo_landscape_north_device",
      cache: false,
      views: {
        'home-tab': {
          templateUrl: "landinfo_templates/take_photo_landscape_north_device.html",
          controller: 'Take_Photo_LandScape_North_Device_Ctrl'

        }
      }
    })
   .state('landpks.landinfo_take_photo_landscape_east_browser', {
      url: "/landinfo_take_photo_landscape_east_browser",
      cache: false,
      views: {
        'home-tab': {
          templateUrl: "landinfo_templates/take_photo_landscape_east_browser.html",
          controller: 'Take_Photo_LandScape_East_Browser_Ctrl'

        }
      }
    })
    .state('landpks.landinfo_take_photo_landscape_east_device', {
      url: "/landinfo_take_photo_landscape_east_device",
      cache: false,
      views: {
        'home-tab': {
          templateUrl: "landinfo_templates/take_photo_landscape_east_device.html",
          controller: 'Take_Photo_LandScape_East_Device_Ctrl'

        }
      }
    })
   .state('landpks.landinfo_take_photo_landscape_south_browser', {
      url: "/landinfo_take_photo_landscape_south_browser",
      cache: false,
      views: {
        'home-tab': {
          templateUrl: "landinfo_templates/take_photo_landscape_south_browser.html",
          controller: 'Take_Photo_LandScape_South_Browser_Ctrl'

        }
      }
    })
    .state('landpks.landinfo_take_photo_landscape_south_device', {
      url: "/landinfo_take_photo_landscape_south_device",
      cache: false,
      views: {
        'home-tab': {
          templateUrl: "landinfo_templates/take_photo_landscape_south_device.html",
          controller: 'Take_Photo_LandScape_South_Device_Ctrl'

        }
      }
    })
    .state('landpks.landinfo_take_photo_landscape_west_browser', {
      url: "/landinfo_take_photo_landscape_west_browser",
      cache: false,
      views: {
        'home-tab': {
          templateUrl: "landinfo_templates/take_photo_landscape_west_browser.html",
          controller: 'Take_Photo_LandScape_West_Browser_Ctrl'

        }
      }
    })
    .state('landpks.landinfo_take_photo_landscape_west_device', {
      url: "/landinfo_take_photo_landscape_west_device",
      cache: false,
      views: {
        'home-tab': {
          templateUrl: "landinfo_templates/take_photo_landscape_west_device.html",
          controller: 'Take_Photo_LandScape_West_Device_Ctrl'

        }
      }
    })
    /* Abstract view For LandInfo*/
    .state('landpks', {
      url: "/landpks",
      cache : false,
      abstract : true,
      templateUrl: "templates/tabs.html",
      controller: "TabsController"
    })
    /***********************************************/
    /*Views for main plot/map screen (home tab) */
    /***********************************************/
    /* For LandInfo */
    .state('landpks.landinfo_plots', {
      url: "/landinfo_plots",
      cache: true,
      views: {
        'home-tab': {
          templateUrl: "landinfo_templates/plots.html",
          controller: 'ListPlotsCtrl'
        }
      }
    })
    .state('landpks.landinfo_plots_map', {
      url: "/landinfo_plots_map",
      cache: true,
      views: {
        'map-tab': {
          templateUrl: "landinfo_templates/plots_map.html",
          controller: 'PlotsMapCtrl'
        }
      }
    })
    /**************************/
    /* Views for settings tab */
    /**************************/
    .state('landpks.landinfo_settings', {
        url: "/landinfo_settings",
        cache:false,
        views: {
          'settings-tab': {
            templateUrl: "landinfo_templates/settings.html",
            controller: 'SettingsCtrl'
          }
        }
    })
    .state('landpks.landpks_app_setting', {
        url: "/landpks_app_setting",
        cache:false,
        views: {
          'settings-tab': {
            templateUrl: "landpks_templates/landpks_application_setting.html",
            controller: 'LandPKS_Application_Setting'
          }
        }
    })
    .state('landpks.landinfo_accounts', {
      url: "/landinfo_accounts",
      cache: false,
      views: {
        'settings-tab': {
          templateUrl: "landinfo_templates/accounts.html",
          controller: 'ListAccountsCtrl'
        }
      }
    })
    .state('landpks.landinfo_about', {
      url: "/landinfo_about",
      cache:false,
      views: {
        'settings-tab': {
          templateUrl: "landinfo_templates/about.html",
          controller: 'AboutCtrl'
        }
      }
    })
    .state('landpks.landinfo_license', {
      url: "/landinfo_license",
      views: {
        'settings-tab': {
          templateUrl: "landinfo_templates/license.html"
        }
      }
    })
   .state('landpks.landinfo_app_information', {
      url: "/landinfo_app_information",
      cache : false,
      views: {
        'settings-tab': {
          templateUrl: "landinfo_templates/app_information.html",
          controller: 'LandInfo_App_Information'
        }
      }
    })
   .state('landpks.landinfo_data_policy', {
      url: "/landinfo_data_policy",
      views: {
        'settings-tab': {
          templateUrl: "landinfo_templates/data_policy.html" 
        }
      }
    })
   .state('landpks.landpks_login', {
        url: "/landpks_login",
        cache: false,
        views: {
          'home-tab': {
            templateUrl: "landpks_templates/login.html",
            controller: 'LandPKS_SignIn_Ctrl'
          }
        }
    })
    .state('landpks.landpks_app_information', {
      url: "/landpks_app_information",
      views: {
        'about-tab': {
          templateUrl: "landpks_templates/landpks_app_information.html",
          controller: "LandPKS_App_Information"
        }
      }
    })
    .state('landpks.landpks_data_policy', {
      url: "/landpks_data_policy",
      views: {
        'about-tab': {
          templateUrl: "landpks_templates/landpks_data_policy.html"
        }
      }
    })
    /**********************/
    /* New Plot view*/
    /**********************/
    .state('landpks.landinfo_plotid', {
      url: "/landinfo_plotid",
      cache: false,
      views: {
        'home-tab': {
          templateUrl: "landinfo_templates/plotid.html",
          controller: 'AddPlot_PlotID_Ctrl'
        }
      }
    })
    .state('landpks.clear', {
        url: "/clear",
        views: {
          'home-tab': {
            templateUrl: "templates/clear.html",
            controller: 'LandPKS_Clear_Ctrl'
          }
        }
     })
     .state('landpks.landpks_entry_page', {
       url: "/landpks_entry_page",
       cache: false,
       views: {
         'home-tab': {
           templateUrl: "landpks_templates/landpks_entry_page.html",
           controller: 'LandPKS_Entry_Page_Ctrl'
         }
       }
     })
    .state('landpks.landinfo_epic_input', {
      url: "/landinfo_epic_input",
      cache: false,
      views: {
        'epic-tab': {
          templateUrl: "landinfo_templates/epic_input.html",
          controller: 'EpicInputCtrl'
        }
      }
    })
    .state('landpks.landinfo_epic_prediction', {
      url: "/landinfo_epic_prediction:lat/:lon",
      cache: false,
      views: {
        'epic-tab': {
          templateUrl: "landinfo_templates/epic_prediction.html",
          controller: 'EpicPredictionCtrl'
        }
      }
    });
  /* Start application */
  var listAuthentication = window.localStorage.getItem("AUTHENTICATION_LIST_LANDPKS");
  //console.log("Test " + listAuthentication);
  var metric_units = window.localStorage.getItem("GLOBAL_CONFIG_METRICS_UNITS");
  if (isEmpty(metric_units)){
     window.localStorage.setItem("GLOBAL_CONFIG_METRICS_UNITS",UNITED_STATES_METRIC_STANDARD)
     metric_units = UNITED_STATES_METRIC_STANDARD
  } else {
     if ((metric_units.trim().toUpperCase() !== UNITED_STATES_METRIC_STANDARD) && (metric_units.trim().toUpperCase() !== ENGLISH_METRIC_STANDARD)){
       window.localStorage.setItem("GLOBAL_CONFIG_METRICS_UNITS",UNITED_STATES_METRIC_STANDARD)
       metric_units = UNITED_STATES_METRIC_STANDARD
     }
  }

  var display_language = window.localStorage.getItem('GLOBAL_CONFIG_LANGUAGE')
  if (isEmpty(display_language)){
     window.localStorage.setItem("GLOBAL_CONFIG_LANGUAGE","en")
  } else {
     window.localStorage.setItem("GLOBAL_CONFIG_LANGUAGE",display_language)
  }

  //console.log("Metrics : " + window.localStorage.getItem("GLOBAL_CONFIG_METRICS_UNITS"))
  if (isEmpty(window.localStorage.getItem("GLOBAL_CONFIG_HOMEPAGE_MAP")) ){
    window.localStorage.setItem("GLOBAL_CONFIG_HOMEPAGE_MAP", false)
  }
  if (isEmpty(window.localStorage.getItem("GLOBAL_CONFIG_COLOR_CHARTS")) ){
    window.localStorage.setItem("GLOBAL_CONFIG_COLOR_CHARTS", false)
  }

  var firstTimeUse = window.localStorage.getItem("firstTimeUse");
  
  if(!isEmpty(firstTimeUse) && firstTimeUse == 'no') {
    if (listAuthentication === null || listAuthentication === 'null'){
       $urlRouterProvider.otherwise("/landpks/landpks_entry_page");
    } else {
       var jsonObjAuth = JSON.parse(listAuthentication);

       if (jsonObjAuth['authentication'].length == 1){
         window.localStorage.setItem("current_json_auth_data_landcover", jsonObjAuth['authentication'][0].json_auth_data);
         window.localStorage.setItem("current_email_landcover",jsonObjAuth['authentication'][0].email);
         window.localStorage.setItem("current_password_landcover",jsonObjAuth['authentication'][0].password);
         window.localStorage.setItem('current_time_assign_token_at_landcover',jsonObjAuth['authentication'][0].time_assign_token_at)
         window.localStorage.setItem('current_time_expired_token_in_range_landcover',jsonObjAuth['authentication'][0].time_expired_token_in_range)

         window.localStorage.setItem('current_google_refresh_token',jsonObjAuth['authentication'][0].google_refresh_token)

         window.localStorage.setItem("current_json_auth_data", jsonObjAuth['authentication'][0].json_auth_data);
         window.localStorage.setItem("current_email",jsonObjAuth['authentication'][0].email);
         window.localStorage.setItem("current_password",jsonObjAuth['authentication'][0].password);
         window.localStorage.setItem('current_time_assign_token_at',jsonObjAuth['authentication'][0].time_assign_token_at)
         window.localStorage.setItem('current_time_expired_token_in_range',jsonObjAuth['authentication'][0].time_expired_token_in_range)

         $urlRouterProvider.otherwise("/landpks/landinfo_plots");
       } else {
         $urlRouterProvider.otherwise("/landpks/landinfo_plots");
       }
    }
  } else {
    
    //we want to force first time logings for version 3 to login and update the cached objects.
    if (window.cordova && window.cordova.plugins && window.plugins.googleplus) {
      window.plugins.googleplus.logout(
        function (msg) {
          console.log("DISCONNECTED : " + msg)
        },
        function (msg) {
          console.log("DISCONNECT FAILURE : " + msg)
        }
    );
    }
    var objAuth = window.localStorage.getItem('AUTHENTICATION_LIST_LANDPKS')
    var email = window.localStorage.getItem('current_email')
    if (!isEmpty(objAuth) && !isEmpty(email)) {
      var listAuthentication = JSON.parse(objAuth)
      if (checkExist(email, listAuthentication['authentication']) == true) {
        for (var index = 0; index < listAuthentication['authentication'].length; index++) {
          var account = listAuthentication['authentication'][index]
          if (account.email == email) {
            if (index > - 1) {
              // console.log("Remove")
              listAuthentication['authentication'].splice(index, 1)
              window.localStorage.setItem('AUTHENTICATION_LIST_LANDPKS', JSON.stringify(listAuthentication))

              /* Delete list data that related with this account LandInfo and LandCover */
              window.localStorage.removeItem(email + '_' + 'LIST_LANDINFO_PLOTS')
              window.localStorage.removeItem(email + '_' + 'LIST_LANDINFO_PLOTS_LANDCOVER')
              window.localStorage.removeItem(email + '_' + '_PENDING_UPLOAD_LANDINFO_LIST')
              window.localStorage.removeItem(email + '_' + '_PENDING_UPLOAD_LANDCOVER_RECORDS_LIST')
              window.localStorage.removeItem(email + '_' + '_PENDING_UPLOAD_LANDCOVER_RECORDS_NOT_ENOUGH_LIST')
              
              window.localStorage.removeItem('current_json_auth_data')
              window.localStorage.removeItem('current_email')
              window.localStorage.removeItem('current_password')

              window.localStorage.removeItem('current_json_auth_data_landcover')
              window.localStorage.removeItem('current_email_landcover')
              window.localStorage.removeItem('current_password_landcover')
            }
          }
        }
      }
    }
    $urlRouterProvider.otherwise("/landpks/landpks_entry_page");

  }
})
.run(function($ionicPlatform){
  $ionicPlatform.ready().then(function (){
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
       //cordova.plugins.Keyboard.disableScroll(true);
    }
    //if(window.StatusBar) {
      //StatusBar.styleDefault();
    //}
  })
})
.directive('hideTabs', function($rootScope) {
    return {
        restrict: 'A',
        link: function($scope, $el) {
            $rootScope.hideTabs = true;
            $scope.$on('$destroy', function() {
                $rootScope.hideTabs = false;
            });
        }
    };
})

;
