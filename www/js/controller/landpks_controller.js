angular.module('ionicApp.landpks_controller', ['chart.js', 'ngCordova'])

  .factory('updateTabsView', [function() {
        return  {
          home: "Home",
          map:"Map",
          climate:"Climate",
          settings:"Settings"
        };
  }])


  .controller('LandPKS_Select_Apps_Ctrl', function ($scope, $state, $ionicPopup, $ionicPlatform, $http, $cordovaLocalNotification,$cordovaOauth,$translate) {
console.log('LandPKS_Select_Apps_Ctrl')


    $scope.refresh_go_to = function (des) {
      if (des === 'LANDINFO_LIST') {
        $state.go('landpks.landinfo_plots')
      } else if (des === 'LANDCOVER_LIST') {
        $state.go('landcover.landcover_landinfo_plots')
      }
    }

    $scope.goBack = function(){

      if (window.cordova){
          var isIOS = ionic.Platform.isIOS()
          var isAndroid = ionic.Platform.isAndroid()
          if (isAndroid && !isIOS){
            var confirmPopup = $ionicPopup.confirm({
              title: 'Confirm',
              template: 'Do you want to quit LandPKS application ?'
            })

            confirmPopup.then(function (res) {
              if (res) {
                navigator.app.exitApp()
              } else {
                window.localStorage.setItem('CURRENT_PAGE_FOR_BACK_BUTTON', 'LANDPKS_SELECT_APPS')
                return;
              }
            })

          } else if (isIOS && !isAndroid){
            var infoPopup = $ionicPopup.alert({
              cssClass: 'remove-title-class',
              template: 'iOS device does not allow to exit running application.'
            })
            infoPopup.then(function (res) {
              infoPopup.close()
            })
            return
          }
      } else {
        var previous = window.localStorage.getItem('PREVIOUS_PAGE_FOR_SELECT_APP')
        if (previous === "LANDINFO_SETTING"){
          $state.go('landpks.landinfo_settings')
        } else if (previous === "LANDCOVER_SETTING"){
          $state.go('landpks.landcover_settings')
        } else if (previous === 'LANDCOVER_LIST'){
          $state.go('landcover.landcover_landinfo_plots')
        } else if (previous === 'LANDINFO_LIST'){
          $state.go('landpks.landinfo_plots')
        } else {
        }
      }

    }


  })
  /****************************************/
  /** Clear Controller **/
  /****************************************/
  .controller('LandPKS_Clear_Ctrl', function ($scope, $ionicHistory,$ionicPopup) {
    console.log('Clear Everything')
    window.localStorage.clear()
    $ionicHistory.clearCache()
    $ionicHistory.clearHistory()
  })
  /****************************************/
  /** landPKS application setting Controller **/
  /****************************************/
  .controller('LandPKS_Application_Setting', function ($scope,$state,$translate,updateTabsView,$ionicPopup,debugService,$ionicLoading) {
    var LANGUAGE_CONFIG = window.localStorage.getItem('GLOBAL_CONFIG_LANGUAGE')
    $translate.use(LANGUAGE_CONFIG)
    $scope.selectedLanguage = LANGUAGE_CONFIG
    $scope.labels = {}
    /* Set up language */
    updateLabelsLanguage()

    var METRIC_CONFIG = window.localStorage.getItem('GLOBAL_CONFIG_METRICS_UNITS')
    if (METRIC_CONFIG === UNITED_STATES_METRIC_STANDARD){
      $scope.label_country_metric = $translate.instant('landpks_app.application_setting.unit_source_me')
      $scope.bUSorENMetric = false
    } else if (METRIC_CONFIG === ENGLISH_METRIC_STANDARD){
      $scope.label_country_metric = $translate.instant('landpks_app.application_setting.unit_source_en')
      $scope.bUSorENMetric = true
    } else {
      $scope.label_country_metric = $translate.instant('landpks_app.application_setting.unit_source_me')
      $scope.bUSorENMetric = false
    }

    $scope.changeMetricCountry = function() {
      if ($scope.bUSorENMetric == false){
        $scope.bUSorENMetric = true
        $scope.label_country_metric = $translate.instant('landpks_app.application_setting.unit_source_en')
        seeToast2($translate.instant('landpks_app.application_setting.unit_source_en'), 2000)
        window.localStorage.setItem("GLOBAL_CONFIG_METRICS_UNITS",ENGLISH_METRIC_STANDARD)
      } else {
        $scope.bUSorENMetric = false
        $scope.label_country_metric = $translate.instant('landpks_app.application_setting.unit_source_me')
        seeToast2($translate.instant('landpks_app.application_setting.unit_source_me'), 2000)
        window.localStorage.setItem("GLOBAL_CONFIG_METRICS_UNITS",UNITED_STATES_METRIC_STANDARD)
      }

    }

    $scope.send_debug_report = function(){
        if (checkNetConnection()){
            var report_data = {}
            var recorder_name = window.localStorage.getItem('current_email');
            report_data.recorder_name = window.localStorage.getItem('current_email');
            report_data.mobile_app_version = LANDPKS_MOBILE_APP_VERSION;
            report_data.list_landinfo_plots = window.localStorage.getItem(recorder_name + '_LIST_LANDINFO_PLOTS');
            report_data.list_landinfo_plots_landcover = window.localStorage.getItem(recorder_name + '_LIST_LANDINFO_PLOTS_LANDCOVER')
            report_data.pending_upload_landinfo_list = window.localStorage.getItem(recorder_name + '_PENDING_UPLOAD_LANDINFO_LIST')
            report_data.pending_upload_landcover_records_list = window.localStorage.getItem(recorder_name + '_PENDING_UPLOAD_LANDCOVER_RECORDS_LIST')
            report_data.pending_upload_landcover_records_not_enough_list = window.localStorage.getItem(recorder_name + '_PENDING_UPLOAD_LANDCOVER_RECORDS_NOT_ENOUGH_LIST')


            $ionicLoading.show({
              delay:100,
              template: 'Sending debug reports...'
            })

            debugService.pushDebugReporting(report_data)
            .success(
              function (data, status, headers, config) {
                  $ionicLoading.hide();
                  var infoPopup = $ionicPopup.alert({
                    cssClass: 'remove-title-class',
                    template: $translate.instant('landpks_app.application_setting.success_debug_message') + data.log_id
                  })
                  infoPopup.then(function (res) {
                    infoPopup.close()
                  })
                  return
              })
            .error(
              function (err) {
                  $ionicLoading.hide();
                  var infoPopup = $ionicPopup.alert({
                    cssClass: 'remove-title-class',
                    template: $translate.instant('landpks_app.application_setting.error_debug_message') + err.error
                  })
                  infoPopup.then(function (res) {
                    infoPopup.close()
                  })
                  return
              })

        } else {
            var infoPopup = $ionicPopup.alert({
              cssClass: 'remove-title-class',
              template: $translate.instant('landpks_app.application_setting.no_network')
            })
            infoPopup.then(function (res) {
              infoPopup.close()
            })
            return
        }
    }

    $scope.selectLanguage = function(language_code){
        if (!isEmpty(language_code)){
          LANGUAGE_CONFIG = language_code
          window.localStorage.setItem('GLOBAL_CONFIG_LANGUAGE',LANGUAGE_CONFIG)
          $translate.use(LANGUAGE_CONFIG)
          updateLabelsLanguage()
        }
    }

    //console.log("HOME MAP : " + window.localStorage.getItem('GLOBAL_CONFIG_HOMEPAGE_MAP'))

    var mapPlots =(window.localStorage.getItem('GLOBAL_CONFIG_HOMEPAGE_MAP') == 'true');
    var colorCharts = (window.localStorage.getItem('GLOBAL_CONFIG_COLOR_CHARTS') == 'true');


    var settings = {mapPlots: mapPlots, colorCharts: colorCharts, displayed_language:LANGUAGE_CONFIG}

    $scope.settings = settings;

    $scope.changeMapPlots = function() {
      console.log("mapPlots : "  + $scope.settings.mapPlots)
      if ($scope.settings.mapPlots == false){
        window.localStorage.setItem("GLOBAL_CONFIG_HOMEPAGE_MAP",false)
      } else {
        window.localStorage.setItem("GLOBAL_CONFIG_HOMEPAGE_MAP", true)
      }

    }
    $scope.changeColorCharts = function() {
      console.log("colorCharts : "  + $scope.settings.colorCharts)
      if ($scope.settings.colorCharts == false){
        window.localStorage.setItem("GLOBAL_CONFIG_COLOR_CHARTS",false)
      } else {
        window.localStorage.setItem("GLOBAL_CONFIG_COLOR_CHARTS", true)
      }

    }
    //console.log("HOME MAP : " + window.localStorage.getItem('GLOBAL_CONFIG_HOMEPAGE_MAP'))
    //console.log("COLOR CHARTS : " + window.localStorage.getItem('GLOBAL_CONFIG_COLOR_CHARTS'))

    $scope.toggleTestChecked = true;
     $scope.changeToggleTest = function() {
      //console.log($scope.toggleTestChecked)
    }

    function updateLabelsLanguage(){
      $scope.labels.app_setting_title = $translate.instant('landpks_app.application_setting.title')
      $scope.labels.unit = $translate.instant('landpks_app.application_setting.units')
      $scope.labels.language = $translate.instant('landpks_app.application_setting.language')
      $scope.labels.map_plot = $translate.instant('landpks_app.application_setting.map_plot')
      $scope.labels.color_chart = $translate.instant('landpks_app.application_setting.color_chart')
      $scope.label_country_metric = $translate.instant('landpks_app.application_setting.unit_source_me')
      $scope.label_country_metric = $translate.instant('landpks_app.application_setting.unit_source_en')

      /* For Tabs */
      $scope.tabs = {}
      $scope.tabs.label = updateTabsView
      $scope.tabs.label.home = $translate.instant('landpks_app.tabs.label.home')
      $scope.tabs.label.map = $translate.instant('landpks_app.tabs.label.map')
      $scope.tabs.label.climate = $translate.instant('landpks_app.tabs.label.climate')
      $scope.tabs.label.settings = $translate.instant('landpks_app.tabs.label.settings')



    }
  })
  /****************************************/
  /** LandPKS App Information **/
  /****************************************/
  .controller('LandPKS_App_Information', function ($scope, $state) {
     /* Translate */
     var LANGUAGE_CONFIG = window.localStorage.getItem('GLOBAL_CONFIG_LANGUAGE')
     $translate.use(LANGUAGE_CONFIG)
     $scope.labels = {}
     $scope.labels.title = $translate.instant('landpks_app.app_info.title')
     $scope.labels.app_name_title = $translate.instant('landpks_app.app_info.app_name_title')
     $scope.labels.app_name_data = $translate.instant('landpks_app.app_info.app_name_data')
     $scope.labels.app_version_title = $translate.instant('landpks_app.app_info.app_version_title')
     $scope.labels.publish_data = $translate.instant('landpks_app.app_info.publish_data')
     $scope.labels.api_version_title = $translate.instant('landpks_app.app_info.api_version_title')

     $scope.landpks_app_version = LANDPKS_MOBILE_APP_VERSION
     $scope.landpks_app_publish_date = LANDPKS_MOBIEL_APP_PUBLISH_DATE
  })
  /****************************************/
  /** Entry_Page_Ctrl **/
  /****************************************/
  .controller('LandPKS_Entry_Page_Ctrl', function ($scope, $state, $ionicPopup) {
    // if (window.cordova){
    //    screen.lockOrientation('portrait')
    // }

    var firstTimeUse = window.localStorage.getItem("firstTimeUse");
    if (!isEmpty(firstTimeUse) && firstTimeUse === 'no')
    {
      $scope.showSlideBox = false;
    } else {
      $scope.showSlideBox = true;
    }

    $scope.landpks_app_version = LANDPKS_MOBILE_APP_VERSION
    $scope.fromEntryPage_Goto = function (item) {
      window.localStorage.setItem('firstTimeUse','no');
      if (item.trim().toUpperCase() === 'LOGIN_PAGE') {
        $state.go('landpks.landpks_login')
      } else if (item.trim().toUpperCase() === 'DATA_POLICY') {
        // window.localStorage.setItem("PREVIOUS_PAGE","ENTRY_PAGE")
        $state.go('landpks.landinfo_data_policy')
      } else if (item.trim().toUpperCase() === 'ABOUT') {
        // window.localStorage.setItem("PREVIOUS_PAGE","ENTRY_PAGE")
        $state.go('landpks.landinfo_app_information')
      } else if (item.trim().toUpperCase() === 'WEB_SITE') {
        window.open('http://landpotential.org', '_system', 'location=no')
      }
      return
    }
  })
  /****************************************/
  /** LandPKS SignIn Controller **/
  /****************************************/
  .controller('LandPKS_SignIn_Ctrl', function ($scope, $state, $http, $ionicHistory, $ionicLoading, $cordovaOauth, $ionicPopup, $location, $translate, plotListService, googleService) {

    /* Translate */
    var LANGUAGE_CONFIG = window.localStorage.getItem('GLOBAL_CONFIG_LANGUAGE')
    console.log(LANGUAGE_CONFIG)
    $scope.labels = {}
    $scope.labels.sign_in_with_google = $translate.instant('landpks_common.sign_in_with_google')

    /* Check source using*/
    var typeBrowser = getTypeWebBrowser()

    if (window.cordova) {
      document.getElementById('loginGoogleDevice').style.display = 'block'
      document.getElementById('loginGoogleWebBrowser').style.display = 'none'
    } else {
      document.getElementById('loginGoogleDevice').style.display = 'none'
      document.getElementById('loginGoogleWebBrowser').style.display = 'block'
    }

    function checkExist (value, JSONArray) {
      var hasMatch = false
      for (var index = 0; index < JSONArray.length; index++) {
        var auth = JSONArray[index]
        if (auth.email == value) {
          hasMatch = true
          break
        }
      }
      return hasMatch
    }

    function updateAuthExist (email, auth_key, JSONArray) {
      for (var index = 0; index < JSONArray.length; index++) {
        var auth = JSONArray[index]
        if (auth.email == email) {
          JSONArray[index].json_auth_data = auth_key
        }
      }
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

    function clearAllCache () {
      console.log('Clear Cache')
      $ionicHistory.clearCache()
    // $ionicHistory.clearHistory()
    }

    $scope.googleSignIn_Device_2 = function() {

      //check for a network connection
      console.log("Vao 1")
      if (checkGoogleServiceConnection() === false) {
        var infoPopup = $ionicPopup.alert({
          cssClass: 'remove-title-class',
          template: 'No Network conection. Please check your network connection and try again'
        })
        infoPopup.then(function (res) {
          infoPopup.close()
        })
        return
      }

      if (window.cordova && window.cordova.plugins && window.plugins.googleplus) {
        //console.log("Vao 3")
        window.plugins.googleplus.login(
          {'webClientId': GOOGLE_CLIENT_ID
        },
          function (obj) {
            var email =  obj.email;
            var idToken = obj.idToken;
            var password = obj.userId;
            var access_token = obj.accessToken;
            var refresh_token = obj.refreshToken;
            var serverAuthCode = obj.serverAuthCode;
            var expires_in = obj.expires_in;
            
            console.log("Google obj : " + JSON.stringify(obj))
            
            //*********************************
            //******Load the users plots*******
            console.log('1st Time After Login Device: get data from API - Refresh data - all data from Cloud')
            $ionicLoading.show({
              template: '<div style="text-align: center;"><ion-spinner icon="bubbles" class="spinner-balanced"></ion-spinner> </div><div>Fetching LandInfo data...<div>'
            })
            plotListService.loadPlotsFromCloud(email)
            .success(function (infodata) {
              //now get the LandCover data
              plotListService.loadLandCoverPLotsFromCloud(email)
              .success(function (coverdata) {
                var landInfoData = {}
                if (LANDPKS_COL_API_VERSION_HAS_CURSOR.indexOf(LANDPKS_API_VERSION) != -1){
                  landInfoData = infodata.data
                } else if (LANDPKS_API_VERSION === '0.1'){
                  landInfoData = infodata
                }
                if (!isEmpty(landInfoData) && landInfoData.length > 0 &&  !isEmpty(coverdata) && coverdata.length > 0) {
                  landInfoData = plotListService.copyCoverToInfo(coverdata, landInfoData)
                }

                if (!isEmpty(landInfoData) && landInfoData != null && landInfoData.length > 0) {
                  for (var index = 0; index < landInfoData.length; index++) {
                    landInfoData[index].googleMapImageURL = googleService.getGoogleMapImageURL(landInfoData[index])
                  }                   
                }
                
                var localPlots = JSON.stringify(landInfoData)
              
                $ionicLoading.hide()
                $ionicHistory.nextViewOptions({
                  disableBack: true,
                  disableAnimate: true,
                  historyRoot: true
                });
                $ionicHistory.clearCache();
                $ionicHistory.clearHistory();
                
                window.localStorage.setItem('current_email', email)
                window.localStorage.setItem(email + '_' + 'LIST_LANDINFO_PLOTS', localPlots)

                saveLoginCredentials(email, password, idToken, access_token, refresh_token, 3600)
                $state.go('landpks.landinfo_plots');
              }).error(function (err) {
                //error retrieving cover plot
                $ionicLoading.hide()
                window.plugins.googleplus.logout(
                  function (msg) {
                    console.log("DISCONNECTED : " + msg)
                  },
                  function (msg) {
                    console.log("DISCONNECT FAILURE : " + msg)
                  }
                );
                window.localStorage.removeItem(email + '_' + 'LIST_LANDINFO_PLOTS')
                window.localStorage.removeItem(email + '_' + 'LIST_LANDINFO_PLOTS_LANDCOVER')

                window.localStorage.removeItem('current_json_auth_data')
                window.localStorage.removeItem('current_email')
                window.localStorage.removeItem('current_password')

                window.localStorage.removeItem('current_json_auth_data_landcover')
                window.localStorage.removeItem('current_email_landcover')
                window.localStorage.removeItem('current_password_landcover')

                var infoPopup = $ionicPopup.alert({
                  cssClass: 'remove-title-class',
                  template: 'There was a problem loading you data.  Please sign-in again'
                })
                infoPopup.then(function (res) {
                  infoPopup.close()
                })
                return
              })


            })
            .error(function (err) {
              //error retrieving landInfo plots
              $ionicLoading.hide()
              console.log(err)
              
              $ionicLoading.hide()
                window.plugins.googleplus.logout(
                  function (msg) {
                    console.log("DISCONNECTED : " + msg)
                  },
                  function (msg) {
                    console.log("DISCONNECT FAILURE : " + msg)
                  }
                );
                window.localStorage.removeItem(email + '_' + 'LIST_LANDINFO_PLOTS')
                window.localStorage.removeItem(email + '_' + 'LIST_LANDINFO_PLOTS_LANDCOVER')

                window.localStorage.removeItem('current_json_auth_data')
                window.localStorage.removeItem('current_email')
                window.localStorage.removeItem('current_password')

                window.localStorage.removeItem('current_json_auth_data_landcover')
                window.localStorage.removeItem('current_email_landcover')
                window.localStorage.removeItem('current_password_landcover')

                var infoPopup = $ionicPopup.alert({
                  cssClass: 'remove-title-class',
                  template: 'There was a problem loading you data.  Please sign-in again'
                })
                infoPopup.then(function (res) {
                  infoPopup.close()
                })
                return
              })

            //***************************//
            //****Done loading plots******
          },
          function (msg) {
            //login failed
            var infoPopup = $ionicPopup.alert({
              title: 'Alert',
              template: 'Authentication Error! Please try again' + msg
            })
              infoPopup.then(function (res) {
              infoPopup.close()
            })
          }
        );
      } else {
        console.log("GOOGLE LOGIN Not Ready")
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


    }

    /* Test Login with Google Account */
    $scope.googleSignIn_WebBrowser = function () {
      /* Check Google connection network */
      if (checkGoogleServiceConnection() === false) {
        var infoPopup = $ionicPopup.alert({
          cssClass: 'remove-title-class',
          template: LPKS_NOTTIFICATION_NO_NETWORK_LOG_IN
        })
        infoPopup.then(function (res) {
          infoPopup.close()
        })
        return
      }

      var params = {
        'clientid': '254673914223-tv4pvoig9ouql2puvsuigmiuabaj87u8.apps.googleusercontent.com',
        'cookiepolicy': 'single_host_origin',
        'callback': loginCallBack,
        'approvalprompt': 'force',
        'scope': 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile'
      }
      console.log(gapi)
      gapi.client.setApiKey('AIzaSyCUYSNGMdVkeinZik6YiCyAQcuI0vIqjZk')
      gapi.auth.signIn(params)



      function loginCallBack (result) {
        console.log(result)
        var email = ''
        var password = ''
        var localData = ''
        var code = ''
        var time_assign_token_at = ''
        var time_expired_token_at = ''
        var time_expired_token_in_range = ''

        if (result.status.google_logged_in === true) {
          console.log('Access Token : ' + result.access_token)
          /* Request to get Email */
          $http({
            method: 'GET',
            url: 'https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=' + result.access_token,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
          }).success(
            function (data, status, headers, config) {
              email = data.email
              password = data.id
              localData = result.access_token
              code = result.code
              time_assign_token_at = result.issued_at
              time_expired_token_at = result.expires_at
              time_expired_token_in_range = result.expires_in

              var objAuth = window.localStorage.getItem('AUTHENTICATION_LIST_LANDPKS')
              if (objAuth === null || objAuth === 'null') {
                var listAuthentication = { authentication: []}
                listAuthentication.authentication.push({
                  'email': email,
                  'password': password,
                  'json_auth_data': localData,
                  'code': code,
                  'time_assign_token_at' : time_assign_token_at,
                  'time_expired_token_at' : time_expired_token_at,
                  'time_expired_token_in_range' : time_expired_token_in_range,
                  'google_refresh_token': 'UNKNOWN'
                })
              } else {
                var listAuthentication = JSON.parse(objAuth)
                if (checkExist(email, listAuthentication['authentication']) == false) {
                  listAuthentication['authentication'].push({
                    'email': email,
                    'password': password,
                    'json_auth_data': localData,
                    'code': code,
                    'time_assign_token_at' : time_assign_token_at,
                    'time_expired_token_at' : time_expired_token_at,
                    'time_expired_token_in_range' : time_expired_token_in_range,
                    'google_refresh_token': 'UNKNOWN'
                  })
                } else {
                  console.log('Update')
                  updateAuthExist_2(email, localData,code,time_assign_token_at,time_expired_token_at,time_expired_token_in_range, 'UNKNOWN', listAuthentication['authentication'])
                }
              }
              //window.localStorage.setItem('current_json_auth_data_landcover', localData)
              //window.localStorage.setItem('current_email_landcover', email)
              //window.localStorage.setItem('current_password_landcover', password)
              //window.localStorage.setItem('current_time_assign_token_at_landcover',time_assign_token_at)
              //window.localStorage.setItem('current_time_expired_token_in_range_landcover',time_expired_token_in_range)




              //window.localStorage.setItem('PREVIOUS_PAGE_LANDCOVER', 'LOGIN_PAGE')
              //window.localStorage.setItem('PREVIOUS_PAGE', 'LOGIN_PAGE')

              //***************************//
              //Load the users plots
              console.log('1st Time After Login Web: get data from API - Refresh data - all data from Cloud')
              $ionicLoading.show({
                template: 'Loading plot data...'
              })
              plotListService.loadPlotsFromCloud(email)
              .success(function (infodata) {
                console.log("LandInfo plots loaded from cloud successfully")
                //now get the LandCover data
                plotListService.loadLandCoverPLotsFromCloud(email)
                .success(function (coverdata) {
                  console.log("LandCover plots loaded from cloud successfully")
                  var landInfoData = {}
                  if (LANDPKS_COL_API_VERSION_HAS_CURSOR.indexOf(LANDPKS_API_VERSION) != -1){
                    landInfoData = infodata.data
                  } else if (LANDPKS_API_VERSION === '0.1'){
                    landInfoData = infodata
                  }



                  if (!isEmpty(landInfoData) && landInfoData.length > 0 ) {
                    landInfoData = plotListService.copyCoverToInfo(coverdata, landInfoData)
                  }

                  window.localStorage.setItem('current_json_auth_data', localData)
                  window.localStorage.setItem('current_email', email)
                  window.localStorage.setItem('current_password', password)
                  window.localStorage.setItem('current_time_assign_token_at',time_assign_token_at)
                  window.localStorage.setItem('current_time_expired_token_in_range',time_expired_token_in_range)

                  window.localStorage.setItem('AUTHENTICATION_LIST_LANDPKS', JSON.stringify(listAuthentication))

                  if (!isEmpty(landInfoData) && landInfoData != null && landInfoData.length > 0) {
                    for (var index = 0; index < landInfoData.length; index++) {
                      landInfoData[index].googleMapImageURL = googleService.getGoogleMapImageURL(landInfoData[index])
                    }                   
                  }
                  var localPlots = JSON.stringify(landInfoData)
                  window.localStorage.setItem(email + '_' + 'LIST_LANDINFO_PLOTS', localPlots)

                  $ionicLoading.hide()
                  $ionicHistory.clearCache()
                  $state.go('landpks.landinfo_plots')

                }).error(function (err) {
                  console.log(err)
                })


              })
              .error(function (err) {

                $ionicLoading.hide()
                console.log("error loading ploats from cloud : " + err)
                window.localStorage.setItem('LANDINFO_LIST_HAS_BEEN_REFRESHED','TRUE')
                window.localStorage.setItem('PREVIOUS_PAGE', 'LOGIN_PAGE')

                //get the plots from the cache
                $scope.plots = plotListService.loadPlotsFromCache(email, email);

                if (isEmpty(err)) {
                  var infoPopup = $ionicPopup.alert({
                    cssClass: 'remove-title-class',
                    template: 'Network is not connected or the response time from server is too long. Plots in device cannot be synced with global datastore. It can be done when network is connected'
                  })
                  infoPopup.then(function (res) {
                    infoPopup.close()
                  })
                  return
                } else {
                  var infoPopup = $ionicPopup.alert({
                    cssClass: 'remove-title-class',
                    template: err.error
                  })
                  infoPopup.then(function (res) {
                    infoPopup.close()
                  })
                  return
                }

              })
              //***************************//

            }).error(function (err) {
            var infoPopup = $ionicPopup.alert({
              title: 'Alert',
              template: 'Authentication Error ! Please try again ' + err.error
            })
            infoPopup.then(function (res) {
              infoPopup.close()
            })
          })
        } else {
          var infoPopup = $ionicPopup.alert({
            title: 'Alert',
            template: 'Authentication Error ! Please re-try again : Reason : ' + result.status.google_logged_in + "| Detail : " + JSON.stringify(result)
          })
          infoPopup.then(function (res) {
            infoPopup.close()
          })
        }
      }
    }

    if (typeof String.prototype.startsWith != 'function') {
      String.prototype.startsWith = function (str) {
        return this.indexOf(str) == 0
      }
    }
  })
  .controller('TabsController', function($scope, $ionicActionSheet, $state, $ionicPopup,$translate,updateTabsView) {

    /* Translate */
    var LANGUAGE_CONFIG = window.localStorage.getItem('GLOBAL_CONFIG_LANGUAGE')
    $translate.use(LANGUAGE_CONFIG)
    if (isEmpty(updateTabsView) || isEmpty(updateTabsView.home) || isEmpty(updateTabsView.climate) || isEmpty(updateTabsView.map) || isEmpty(updateTabsView.settings) ){
      $scope.tabs = {}
      $scope.tabs.label = {}
      $scope.tabs.label.home = $translate.instant('landpks_app.tabs.label.home')
      $scope.tabs.label.map = $translate.instant('landpks_app.tabs.label.map')
      $scope.tabs.label.climate = $translate.instant('landpks_app.tabs.label.climate')
      $scope.tabs.label.settings = $translate.instant('landpks_app.tabs.label.settings')
    } else {
      $scope.tabs = {}
      $scope.tabs.label = updateTabsView
    }

    $scope.openEpicActionSheet = function() {
      $ionicActionSheet.show({
       buttons: [
         { text: 'Use current location' },
         { text: 'Enter Lat/Long' }
       ],
       titleText: 'EPIC prediction is currently only supported in Iringa',
       cancelText: 'Cancel',
       cancel: function() {
            // add cancel code..
          },
       buttonClicked: function(index) {
         if (index == 0){
            $state.go('landpks.landinfo_epic_prediction');
         } else {
            $state.go('landpks.landinfo_epic_input');
         }
         return true;
       }
     });
    }
    $scope.openNewPlot = function() {
      var email = window.localStorage.getItem('current_email')

      if (isEmpty(email)){
        var infoPopup = $ionicPopup.alert({
          cssClass: 'remove-title-class',
          template: 'You must login to add a plot.  Please select an account in the list provided or login with a new Google account.'
        })
        infoPopup.then(function (res) {
          infoPopup.close()
          $state.go('landpks.landinfo_accounts')
        })
        return
      }
      $state.go('landpks.landinfo_newplot_temp');
    }
  })
