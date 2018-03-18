angular.module('ionicApp.landinfo_controller', ['chart.js', 'ngCordova'])
  /****************************************/
  /*
   * Activity Settings
   */
  /****************************************/
  .factory('Scopes', function ($rootScope) {
    var mem = {}

    return {
      store: function (key, value) {
        $rootScope.$emit('scope.stored', key)
        mem[key] = value
      },
      get: function (key) {
        return mem[key]
      }
    }
  })

  .factory('Camera', ['$q', function ($q) {
    return {
      getPicture: function (options) {
        var q = $q.defer()

        navigator.camera.getPicture(function (result) {
          // Do any magic you need
          q.resolve(result)
        }, function (err) {
          q.reject(err)
        }, options)

        return q.promise
      }
    }
  }])

  .factory('aSyncWebServiceCall', function($http) {
    var uploadPhotos_in_Review = function(file_name, type, dataURL) {
        return
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
          timeout: 3500,
          data: { img_data: dataURL, file_name: file_name, type: type },
        }).then(function(result){
            return result.data;
        });
    };
    return { uploadPhotos_in_Review: uploadPhotos_in_Review };
  })


  .config(function ($compileProvider) {
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):|data:image\//)
  })
  /****************************************/
  /*
   * Manage Controller
   */
   /****************************************/
  // base controller containing common functions
  //include in other controllers by injecting $controller and then instantiate as
  //$controller('BaseLandInfoController', { $scope: $scope });
  .controller('BaseLandInfoController', function ($scope, $ionicPopup, $translate) {
        //$scope.syncNumber = 8;
    $scope.openHelp = function (messageKey) {
      var LANGUAGE_CONFIG = window.localStorage.getItem('GLOBAL_CONFIG_LANGUAGE')
      $translate.use(LANGUAGE_CONFIG)
      var infoMessage = $translate.instant(messageKey)

      var infoPopup = $ionicPopup.alert({
        title: 'Description',
        template: infoMessage
      })
      infoPopup.then(function (res) {
        infoPopup.close()
      })
    }

    })
   /** LandInfo App Information **/
   /****************************************/
   .controller('LandInfo_App_Information', function ($scope, $state, $translate) {
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

  /********************************************/
  /** Take_Photo_LandScape_Ctrl - OFF Compass**/
  /********************************************/
  .controller('Take_Photo_LandScape_Off_Compass_Ctrl', function ($scope, $state, $http, $ionicLoading, $cordovaCamera, $ionicPopup, $ionicPlatform, plotListService,$translate,debugService) {

    seeToast2('Compass Mode : Disable', 2000)
    var compassMode = false
    var landpks_phase = 0
    $scope.goBack = function () {
      $state.go('landpks.landinfo_photos')
    }
    var numberOfPhotos = 0

    var recorder_name = window.localStorage.getItem('current_email')
    var email = recorder_name
    var LIST_PLOTS = JSON.parse(window.localStorage.getItem(recorder_name + '_' + 'LIST_LANDINFO_PLOTS'))
    var newPlot = JSON.parse(window.localStorage.getItem('current_view_plot'))


    function presentCurrentStatus () {
      if (isEmpty(newPlot.landscape_north_photo_data_url) || newPlot.landscape_north_photo_data_url === 'landinfo_media/ic_na.png') {
        $scope.north_landscape_photo_status_img = 'landinfo_img/North.png'
      } else {
        $scope.north_landscape_photo_status_img = 'landinfo_img/North_tick.png'
        numberOfPhotos = numberOfPhotos + 1
      }
      if (isEmpty(newPlot.landscape_south_photo_data_url) || newPlot.landscape_south_photo_data_url ==='landinfo_media/ic_na.png') {
        $scope.south_landscape_photo_status_img = 'landinfo_img/South.png'
      } else {
        $scope.south_landscape_photo_status_img = 'landinfo_img/South_tick.png'
        numberOfPhotos = numberOfPhotos + 1
      }
      if (isEmpty(newPlot.landscape_east_photo_data_url) || newPlot.landscape_east_photo_data_url === 'landinfo_media/ic_na.png') {
        $scope.east_landscape_photo_status_img = 'landinfo_img/East.png'
      } else {
        $scope.east_landscape_photo_status_img = 'landinfo_img/East_tick.png'
        numberOfPhotos = numberOfPhotos + 1
      }
      if (isEmpty(newPlot.landscape_west_photo_data_url) || newPlot.landscape_west_photo_data_url === 'landinfo_media/ic_na.png') {
        $scope.west_landscape_photo_status_img = 'landinfo_img/West.png'
      } else {
        $scope.west_landscape_photo_status_img = 'landinfo_img/West_tick.png'
        numberOfPhotos = numberOfPhotos + 1
      }

    }

    presentCurrentStatus()

    $scope.changeCompassMode = function(){
      if (compassMode == false){
        compassMode = true
        $state.go('landpks.landinfo_take_photos_landscape_compass')
      } else {
        compassMode = false
      }
    }

    $scope.takePhotoForDirection = function(direction){
      if (direction === 'NORTH'){
        take_landscape_photo_and_upload('NORTH')
      } else if (direction === 'SOUTH'){
        take_landscape_photo_and_upload('SOUTH')
      } else if (direction === 'EAST'){
        take_landscape_photo_and_upload('EAST')
      } else if (direction === "WEST"){
        take_landscape_photo_and_upload('WEST')
      }
    }

    /********************************************************/
    function take_landscape_photo_and_upload (direction) {
      var options = {
        quality: 100,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: false,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 640,
        targetHeight: 480,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false,
        correctOrientation: true
      }

      var dataURL = ''
      $cordovaCamera.getPicture(options)
        .then(function (imageData) {
          dataURL = 'data:image/jpeg;base64,' + imageData
          Date.now = function () { return new Date().getTime();}
          if (direction === 'NORTH'){
            $scope.north_landscape_photo_status_img = 'landinfo_img/North_tick.png'
            numberOfPhotos = numberOfPhotos + 1
            var image_name = newPlot.name + '_landscape_north_' + Date.now() + '.jpg'
            writeToFile(image_name,dataURL)
            newPlot.landscape_north_photo_data_url = image_name

            seeToast2($translate.instant('landpks_app.landinfo_photos.landscape_north_image_created'),3000)
            newPlot.landscape_north_photo_url = ''
            window.localStorage.setItem('current_edit_plot', JSON.stringify(newPlot))
            plotListService.updateCachedPlot(LIST_PLOTS, newPlot)
            /* Save to temp */
            debugService.savePhotoFilesNamesTemp(newPlot,"landscape_north",image_name)
            if (numberOfPhotos >= 4){
                setTimeout(function(){
                   $state.go('landpks.landinfo_photos')
                }, 1000);
            } else {
                   $state.go('landpks.landinfo_take_photos_landscape_off_compass')
            }

          } else if (direction === 'SOUTH'){
            $scope.south_landscape_photo_status_img = 'landinfo_img/South_tick.png'
            numberOfPhotos = numberOfPhotos + 1
            var image_name = newPlot.name + '_landscape_south_' + Date.now() + '.jpg'
            writeToFile(image_name,dataURL)
            newPlot.landscape_south_photo_data_url = image_name

            seeToast2($translate.instant('landpks_app.landinfo_photos.landscape_south_image_created'),3000)
            newPlot.landscape_south_photo_url = ''
            window.localStorage.setItem('current_edit_plot', JSON.stringify(newPlot))
            plotListService.updateCachedPlot(LIST_PLOTS, newPlot)
            /* Save to temp */
            debugService.savePhotoFilesNamesTemp(newPlot,"landscape_south",image_name)
            if (numberOfPhotos >= 4){
                setTimeout(function(){
                   $state.go('landpks.landinfo_photos')
                }, 1000);
            } else {
                   $state.go('landpks.landinfo_take_photos_landscape_off_compass')
            }

          } else if (direction === 'EAST'){
            $scope.east_landscape_photo_status_img = 'landinfo_img/East_tick.png'
            numberOfPhotos = numberOfPhotos + 1
            var image_name = newPlot.name + '_landscape_east_' + Date.now() + '.jpg'
            writeToFile(image_name,dataURL)
            newPlot.landscape_east_photo_data_url = image_name

            seeToast2($translate.instant('landpks_app.landinfo_photos.landscape_east_image_created'),3000)
            newPlot.landscape_east_photo_url = ''
            window.localStorage.setItem('current_edit_plot', JSON.stringify(newPlot))
            plotListService.updateCachedPlot(LIST_PLOTS, newPlot)
            /* Save to temp */
            debugService.savePhotoFilesNamesTemp(newPlot,"landscape_east",image_name)
            if (numberOfPhotos >= 4){
                setTimeout(function(){
                   $state.go('landpks.landinfo_photos')
                }, 1000);
            } else {
                   $state.go('landpks.landinfo_take_photos_landscape_off_compass')
            }

          } else if (direction === 'WEST'){
            $scope.west_landscape_photo_status_img = 'landinfo_img/West_tick.png'
            numberOfPhotos = numberOfPhotos + 1
            var image_name = newPlot.name + '_landscape_west_' + Date.now() + '.jpg'

            writeToFile(image_name,dataURL)
            newPlot.landscape_west_photo_data_url = image_name

            seeToast2($translate.instant('landpks_app.landinfo_photos.landscape_east_image_created'),3000)
            newPlot.landscape_west_photo_url = ''
            window.localStorage.setItem('current_edit_plot', JSON.stringify(newPlot))
            plotListService.updateCachedPlot(LIST_PLOTS, newPlot)
            /* Save to temp */
            debugService.savePhotoFilesNamesTemp(newPlot,"landscape_west",image_name)
            if (numberOfPhotos >= 4){
                setTimeout(function(){
                   $state.go('landpks.landinfo_photos')
                }, 1000);
            } else {
                   $state.go('landpks.landinfo_take_photos_landscape_off_compass')
            }


          }
        }, function (error) {
            $ionicLoading.hide()
            console.log('Camera error : ' + angular.toJson(error))
      })

    }


  })

  /****************************************/
  /** Take_Photo_LandScape_Ctrl **/
  /****************************************/
  .controller('Take_Photo_LandScape_Compass_Ctrl', function ($scope, $state, $http, $ionicLoading, $cordovaCamera, $ionicPopup, $ionicPlatform, plotListService,$translate,debugService) {
    var landpks_phase = 0
    var compassMode = true
    seeToast2('Compass Mode : Enable', 2000)
    $scope.changeCompassMode = function(){
      if (compassMode == true){
        compassMode = false
        $state.go('landpks.landinfo_take_photos_landscape_off_compass')
      } else {
        compassMode = true
      }
    }

    $scope.goBack = function () {
      $state.go('landpks.landinfo_photos')
    }
    var numberOfPhotos = 0
    var isIOS = ionic.Platform.isIOS()
    var isAndroid = ionic.Platform.isAndroid()
    if (isIOS && !isAndroid) {
      $scope.currentPlatform = 'IOS'
    } else if (!isIOS && isAndroid) {
      $scope.currentPlatform = 'ANDROID'
    } else {
      $scope.currentPlatform = 'ANDROID'
    }
    window.localStorage.setItem('CURRENT_PAGE_FOR_BACK_BUTTON', 'TAKE_PHOTO_LANDSCAPE_COMPASS')


    var recorder_name = window.localStorage.getItem('current_email')
    var email = recorder_name
    var LIST_PLOTS = JSON.parse(window.localStorage.getItem(recorder_name + '_' + 'LIST_LANDINFO_PLOTS'))
    var newPlot = JSON.parse(window.localStorage.getItem('current_view_plot'))



    function presentCurrentStatus () {
      document.getElementById('txtNorth').setAttributeNS(null, 'fill', 'white')
      document.getElementById('txtEast').setAttributeNS(null, 'fill', 'white')
      document.getElementById('txtSouth').setAttributeNS(null, 'fill', 'white')
      document.getElementById('txtWest').setAttributeNS(null, 'fill', 'white')

      if (isEmpty(newPlot.landscape_north_photo_data_url) || newPlot.landscape_north_photo_data_url === 'landinfo_media/ic_na.png') {
        document.getElementById('txtNorth').setAttributeNS(null, 'fill', 'white')
      } else {
        document.getElementById('txtNorth').setAttributeNS(null, 'fill', 'lime')
        numberOfPhotos = numberOfPhotos + 1
      }
      if (isEmpty(newPlot.landscape_south_photo_data_url) || newPlot.landscape_south_photo_data_url ==='landinfo_media/ic_na.png') {
        document.getElementById('txtSouth').setAttributeNS(null, 'fill', 'white')
      } else {
        document.getElementById('txtSouth').setAttributeNS(null, 'fill', 'lime')
        numberOfPhotos = numberOfPhotos + 1

      }
      if (isEmpty(newPlot.landscape_east_photo_data_url) || newPlot.landscape_east_photo_data_url === 'landinfo_media/ic_na.png') {
        document.getElementById('txtEast').setAttributeNS(null, 'fill', 'white')
      } else {
        document.getElementById('txtEast').setAttributeNS(null, 'fill', 'lime')
        numberOfPhotos = numberOfPhotos + 1
      }
      if (isEmpty(newPlot.landscape_west_photo_data_url) || newPlot.landscape_west_photo_data_url === 'landinfo_media/ic_na.png') {
        document.getElementById('txtWest').setAttributeNS(null, 'fill', 'white')
      } else {
        document.getElementById('txtWest').setAttributeNS(null, 'fill', 'lime')
        numberOfPhotos = numberOfPhotos + 1
      }

    }

    presentCurrentStatus()

    /* For compass only */
    ;(function () {
      'use strict'
      // set to true for debugging output
      var debug = false
      // our current position
      var positionCurrent = {
        lat: null,
        lng: null,
        hng: null
      }

      // the outer part of the compass that rotates
      var rose = document.getElementById('rose')

      // elements that ouput our position
      var positionLat = document.getElementById('position-lat')
      var positionLng = document.getElementById('position-lng')
      var positionHng = document.getElementById('position-hng')

      // debug outputs
      var debugOrientation = document.getElementById('debug-orientation')
      var debugOrientationDefault = document.getElementById('debug-orientation-default')

      // info popup elements, pus buttons that open popups
      var popup = document.getElementById('popup')
      var popupContents = document.getElementById('popup-contents')
      var popupInners = document.querySelectorAll('.popup__inner')
      var btnsPopup = document.querySelectorAll('.btn-popup')

      var btnMap = document.getElementById('btn-map')


      // if we have shown the heading unavailable warning yet
      var warningHeadingShown = false

      // switches keeping track of our current app state
      var isOrientationLockable = false
      var isOrientationLocked = false
      var isNightMode = false

      // the orientation of the device on app load
      var defaultOrientation

      // browser agnostic orientation
      function getBrowserOrientation () {
        var orientation
        if (screen.orientation && screen.orientation.type) {
          orientation = screen.orientation.type
        } else {
          orientation = screen.orientation ||
          screen.mozOrientation ||
          screen.msOrientation
        }


        return orientation
      }

      function browserUnlockOrientation () {
        if (screen.orientation && screen.orientation.unlock) {
          screen.orientation.unlock()
        } else if (screen.unlockOrientation) {
          screen.unlockOrientation()
        } else if (screen.mozUnlockOrientation) {
          screen.mozUnlockOrientation()
        } else if (screen.msUnlockOrientation) {
          screen.msUnlockOrientation()
        }
      }

      // browser agnostic document.fullscreenElement
      function getBrowserFullscreenElement () {
        if (typeof document.fullscreenElement !== 'undefined') {
          return document.fullscreenElement
        } else if (typeof document.webkitFullscreenElement !== 'undefined') {
          return document.webkitFullscreenElement
        } else if (typeof document.mozFullScreenElement !== 'undefined') {
          return document.mozFullScreenElement
        } else if (typeof document.msFullscreenElement !== 'undefined') {
          return document.msFullscreenElement
        }
      }

      // browser agnostic document.documentElement.requestFullscreen
      function browserRequestFullscreen () {
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen()
        } else if (document.documentElement.webkitRequestFullscreen) {
          document.documentElement.webkitRequestFullscreen()
        } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen()
        } else if (document.documentElement.msRequestFullscreen) {
          document.documentElement.msRequestFullscreen()
        }
      }

      // browser agnostic document.documentElement.exitFullscreen
      function browserExitFullscreen () {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        }
      }

      // called on device orientation change
      function onHeadingChange (event) {
        var heading = event.alpha

        if (typeof event.webkitCompassHeading !== 'undefined') {
          heading = event.webkitCompassHeading; // iOS non-standard
        }

        var orientation = getBrowserOrientation()

        if (typeof heading !== 'undefined' && heading !== null) { // && typeof orientation !== "undefined") {
          // we have a browser that reports device heading and orientation

          if (debug) {
            debugOrientation.textContent = orientation
          }

          // what adjustment we have to add to rotation to allow for current device orientation
          var adjustment = 0
          if (defaultOrientation === 'landscape') {
            adjustment -= 90
          }

          if (typeof orientation !== 'undefined') {
            var currentOrientation = orientation.split('-')

            if (defaultOrientation !== currentOrientation[0]) {
              if (defaultOrientation === 'landscape') {
                adjustment -= 270
              } else {
                adjustment -= 90
              }
            }

            if (currentOrientation[1] === 'secondary') {
              adjustment -= 180
            }
          }

          positionCurrent.hng = heading + adjustment

          var phase = positionCurrent.hng < 0 ? 360 + positionCurrent.hng : positionCurrent.hng
          landpks_phase = 360 - phase | 0
          positionHng.textContent = (360 - phase | 0) + '°'

          // apply rotation to compass rose
          if (typeof rose.style.transform !== 'undefined') {
            rose.style.transform = 'rotateZ(' + positionCurrent.hng + 'deg)'
          } else if (typeof rose.style.webkitTransform !== 'undefined') {
            rose.style.webkitTransform = 'rotateZ(' + positionCurrent.hng + 'deg)'
          }
        } else {
          // device can't show heading

          positionHng.textContent = 'n/a'
          showHeadingWarning()
        }
      }

      function showHeadingWarning () {
        if (!warningHeadingShown) {
          //popupOpen('noorientation')
          warningHeadingShown = true
        }
      }

      function onFullscreenChange () {
        if (isOrientationLockable && getBrowserFullscreenElement()) {
          if (screen.orientation && screen.orientation.lock) {
            screen.orientation.lock(getBrowserOrientation()).then(function () {}).catch(function () {})
          }
        } else {
          lockOrientationRequest(false)
        }
      }

      function toggleOrientationLockable (lockable) {
        isOrientationLockable = lockable

        if (isOrientationLockable) {

        } else {

        }
      }

      function checkLockable () {
        if (screen.orientation && screen.orientation.lock) {
          screen.orientation.lock(getBrowserOrientation()).then(function () {
            toggleOrientationLockable(true)
            browserUnlockOrientation()
          }).catch(function (event) {
            if (event.code === 18) { // The page needs to be fullscreen in order to call lockOrientation(), but is lockable
              toggleOrientationLockable(true)
              browserUnlockOrientation(); // needed as chrome was locking orientation (even if not in fullscreen, bug??)
            } else { // lockOrientation() is not available on this device (or other error)
              toggleOrientationLockable(false)
            }
          })
        } else {
          toggleOrientationLockable(false)
        }
      }

      function lockOrientationRequest (doLock) {
        if (isOrientationLockable) {
          if (doLock) {
            browserRequestFullscreen()
            lockOrientation(true)
          } else {
            browserUnlockOrientation()
            browserExitFullscreen()
            lockOrientation(false)
          }
        }
      }

      function lockOrientation (locked) {
        if (locked) {
          // btnLockOrientation.classList.add("active")
        } else {
          // btnLockOrientation.classList.remove("active")
        }

        isOrientationLocked = locked
      }

      function toggleOrientationLock () {
        if (isOrientationLockable) {
          lockOrientationRequest(!isOrientationLocked)
        }
      }

      function locationUpdate (position) {
        positionCurrent.lat = position.coords.latitude
        positionCurrent.lng = position.coords.longitude

        positionLat.textContent = decimalToSexagesimal(positionCurrent.lat, 'lat')
        positionLng.textContent = decimalToSexagesimal(positionCurrent.lng, 'lng')
      }

      function locationUpdateFail (error) {
        positionLat.textContent = 'n/a'
        positionLng.textContent = 'n/a'
        console.log('location fail: ', error)
      }

      function setNightmode (on) {
        if (on) {
          // btnNightmode.classList.add("active")
        } else {
          // btnNightmode.classList.remove("active")
        }

        window.setTimeout(function () {
          if (on) {
            document.documentElement.classList.add('nightmode')
          } else {
            document.documentElement.classList.remove('nightmode')
          }
        }, 1)

        isNightMode = on
      }

      function toggleNightmode () {
        setNightmode(!isNightMode)
      }

      function openMap () {
        console.log('Degree : ' + landpks_phase)
        if (landpks_phase >= 0 && landpks_phase <= 15) {
          //$state.go('landpks.landinfo_take_photo_landscape_north_device')
          take_landscape_photo_and_upload('NORTH')
        } else if (landpks_phase >= 345 && landpks_phase <= 360) {
          //$state.go('landpks.landinfo_take_photo_landscape_north_device')
          take_landscape_photo_and_upload('NORTH')
        } else if (landpks_phase >= 165 && landpks_phase <= 195) {
          //$state.go('landpks.landinfo_take_photo_landscape_south_device')
          take_landscape_photo_and_upload('SOUTH')
        } else if (landpks_phase >= 255 && landpks_phase <= 285) {
          //$state.go('landpks.landinfo_take_photo_landscape_west_device')
          take_landscape_photo_and_upload('WEST')
        } else if (landpks_phase >= 75 && landpks_phase <= 105) {
          //$state.go('landpks.landinfo_take_photo_landscape_east_device')
          take_landscape_photo_and_upload('EAST')
        } else {
          var infoPopup = $ionicPopup.alert({
            cssClass: 'remove-title-class',
            template: 'Please align compass to one of the cardinal directions N, W, S, E'
          })
          infoPopup.then(function (res) {
            infoPopup.close()
          })
          return
        }
      }

      function decimalToSexagesimal (decimal, type) {
        var degrees = decimal | 0
        var fraction = Math.abs(decimal - degrees)
        var minutes = (fraction * 60) | 0
        var seconds = (fraction * 3600 - minutes * 60) | 0

        var direction = ''
        var positive = degrees > 0
        degrees = Math.abs(degrees)
        switch (type) {
          case 'lat':
            direction = positive ? 'N' : 'S'
            break
          case 'lng':
            direction = positive ? 'E' : 'W'
            break
        }

        return degrees + '° ' + minutes + "' " + seconds + '" ' + direction
      }

      if (screen.width > screen.height) {
        defaultOrientation = 'landscape'
      } else {
        defaultOrientation = 'portrait'
      }
      if (debug) {
        debugOrientationDefault.textContent = defaultOrientation
      }

      window.addEventListener('deviceorientation', onHeadingChange)

      document.addEventListener('fullscreenchange', onFullscreenChange)
      document.addEventListener('webkitfullscreenchange', onFullscreenChange)
      document.addEventListener('mozfullscreenchange', onFullscreenChange)
      document.addEventListener('MSFullscreenChange', onFullscreenChange)


      btnMap.addEventListener('click', openMap)


      navigator.geolocation.watchPosition(locationUpdate, locationUpdateFail, {
        enableHighAccuracy: false,
        maximumAge: 30000,
        timeout: 27000
      })

      setNightmode(false)
      checkLockable()
    }())

    /********************************************************/
    function take_landscape_photo_and_upload (direction) {
      var options = {
        quality: 100,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: false,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 640,
        targetHeight: 480,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false,
        correctOrientation: true
      }

      var dataURL = ''
      $cordovaCamera.getPicture(options)
        .then(function (imageData) {
          dataURL = 'data:image/jpeg;base64,' + imageData
          Date.now = function () { return new Date().getTime();}
          if (direction === 'NORTH'){
            document.getElementById('txtNorth').setAttributeNS(null, 'fill', 'lime')
            numberOfPhotos = numberOfPhotos + 1
            var image_name = newPlot.name + '_landscape_north_' + Date.now() + '.jpg'
            writeToFile(image_name,dataURL)
            newPlot.landscape_north_photo_data_url = image_name

            seeToast2($translate.instant('landpks_app.landinfo_photos.landscape_north_image_created'),3000)
            newPlot.landscape_north_photo_url = ''
            window.localStorage.setItem('current_edit_plot', JSON.stringify(newPlot))
            plotListService.updateCachedPlot(LIST_PLOTS, newPlot)
            /* Save to temp */
            debugService.savePhotoFilesNamesTemp(newPlot,"landscape_north",image_name)
            if (numberOfPhotos >= 4){
                setTimeout(function(){
                   $state.go('landpks.landinfo_photos')
                }, 1000);
            } else {
                   $state.go('landpks.landinfo_take_photos_landscape_compass')
            }
          } else if (direction === 'SOUTH'){
            document.getElementById('txtSouth').setAttributeNS(null, 'fill', 'lime')

            numberOfPhotos = numberOfPhotos + 1
            var image_name = newPlot.name + '_landscape_south_' + Date.now() + '.jpg'
            writeToFile(image_name,dataURL)
            newPlot.landscape_south_photo_data_url = image_name

            seeToast2($translate.instant('landpks_app.landinfo_photos.landscape_south_image_created'),3000)
            newPlot.landscape_south_photo_url = ''
            window.localStorage.setItem('current_edit_plot', JSON.stringify(newPlot))
            plotListService.updateCachedPlot(LIST_PLOTS, newPlot)
            /* Save to temp */
            debugService.savePhotoFilesNamesTemp(newPlot,"landscape_south",image_name)
            if (numberOfPhotos >= 4){
                setTimeout(function(){
                   $state.go('landpks.landinfo_photos')
                }, 1000);
            } else {
                   $state.go('landpks.landinfo_take_photos_landscape_compass')
            }
          } else if (direction === 'EAST'){
            document.getElementById('txtEast').setAttributeNS(null, 'fill', 'lime')

            numberOfPhotos = numberOfPhotos + 1
            var image_name = newPlot.name + '_landscape_east_' + Date.now() + '.jpg'
            console.log("So luong anh : " + numberOfPhotos)
            writeToFile(image_name,dataURL)
            newPlot.landscape_east_photo_data_url = image_name

            seeToast2($translate.instant('landpks_app.landinfo_photos.landscape_east_image_created'),3000)
            newPlot.landscape_east_photo_url = ''
            window.localStorage.setItem('current_edit_plot', JSON.stringify(newPlot))
            plotListService.updateCachedPlot(LIST_PLOTS, newPlot)
            /* Save to temp */
            debugService.savePhotoFilesNamesTemp(newPlot,"landscape_east",image_name)
            if (numberOfPhotos >= 4){
                setTimeout(function(){
                   $state.go('landpks.landinfo_photos')
                }, 1000);
            } else {
                   $state.go('landpks.landinfo_take_photos_landscape_compass')
            }
          } else if (direction === 'WEST'){
            document.getElementById('txtWest').setAttributeNS(null, 'fill', 'lime')

            numberOfPhotos = numberOfPhotos + 1
            var image_name = newPlot.name + '_landscape_west_' + Date.now() + '.jpg'
            writeToFile(image_name,dataURL)
            newPlot.landscape_west_photo_data_url = image_name

            seeToast2($translate.instant('landpks_app.landinfo_photos.landscape_east_image_created'),3000)
            newPlot.landscape_west_photo_url = ''
            window.localStorage.setItem('current_edit_plot', JSON.stringify(newPlot))
            plotListService.updateCachedPlot(LIST_PLOTS, newPlot)
            /* Save to temp */
            debugService.savePhotoFilesNamesTemp(newPlot,"landscape_west",image_name)
            if (numberOfPhotos >= 4){
                setTimeout(function(){
                   $state.go('landpks.landinfo_photos')
                }, 1000);
            } else {
                   $state.go('landpks.landinfo_take_photos_landscape_compass')
            }

          }
        }, function (error) {
            $ionicLoading.hide()
            console.log('Camera error : ' + angular.toJson(error))
      })

    }
  })

  /****************************************/
  /***** Guide Me Soil Texture Ctrl********/
  .controller('Guide_Me_Soil_Texture_Ctrl', function ($scope, $state, $ionicPopup, $ionicPlatform, $rootScope, plotListService) {
    window.localStorage.setItem('CURRENT_PAGE_FOR_BACK_BUTTON', 'GUIDE_ME_SOIL_TEXTURE_PAGE')
    var recorder_name = window.localStorage.getItem('current_email')
    var email = recorder_name
    var LIST_PLOTS = JSON.parse(window.localStorage.getItem(recorder_name + '_' + 'LIST_LANDINFO_PLOTS'))
    var newPlot = JSON.parse(window.localStorage.getItem('current_view_plot'))

    var layer_name = window.localStorage.getItem('current_layer_name')
    console.log("layer_name " + layer_name)

    var METRIC_CONFIG = window.localStorage.getItem('GLOBAL_CONFIG_METRICS_UNITS')
    $scope.GLOBAL_METRIC_CONFIG = METRIC_CONFIG

    if (METRIC_CONFIG === UNITED_STATES_METRIC_STANDARD){
      $scope.label_smaller_2_5cm = '< 2.5cm'
      $scope.label_2_5_to_5cm = '2.5 - 5cm'
      $scope.label_greter_5_cm = '> 5cm'
    } else if (METRIC_CONFIG === ENGLISH_METRIC_STANDARD){
      $scope.label_smaller_2_5cm = '< 1in'
      $scope.label_2_5_to_5cm = '1 - 2in'
      $scope.label_greter_5_cm = '> 2in'
    } else {
      $scope.label_smaller_2_5cm = '< 2.5cm'
      $scope.label_2_5_to_5cm = '2.5 - 5cm'
      $scope.label_greter_5_cm = '> 5cm'
    }

    document.getElementById('soil_form_a_ball').style.visibility = 'visible'
    document.getElementById('soil_form_a_ribbon').style.visibility = 'hidden'
    document.getElementById('length_of_ribbon').style.visibility = 'hidden'
    document.getElementById('soil_feel').style.visibility = 'hidden'
    document.getElementById('btnSelect').style.visibility = 'hidden'
    var length_of_ribbon = ''

    $scope.selectTexture_GuideMe = function () {
      var textture_value_guide_me = document.getElementById('textureValue').innerHTML
      if (!isEmpty(textture_value_guide_me)) {
        textture_value_guide_me = textture_value_guide_me.trim().toUpperCase()
        console.log(textture_value_guide_me)

        if (layer_name === 'soil_horizon_1') {
          newPlot.texture.soil_horizon_1 = textture_value_guide_me
          if (!isEmpty(newPlot.rock_fragment.soil_horizon_1) && !isEmpty(newPlot.texture.soil_horizon_1)) {
            newPlot.isSoilLayer_1_Completed = true
            newPlot.isSoilLayersCompleted = true
          } else {
            newPlot.isSoilLayer_1_Completed = false
            newPlot.isSoilLayersCompleted = false
          }
        } else if (layer_name === 'soil_horizon_2') {
          newPlot.texture.soil_horizon_2 = textture_value_guide_me
          if (!isEmpty(newPlot.rock_fragment.soil_horizon_2) && !isEmpty(newPlot.texture.soil_horizon_2)) {
            newPlot.isSoilLayer_2_Completed = true
            newPlot.isSoilLayersCompleted = true
          } else {
            newPlot.isSoilLayer_2_Completed = false
            newPlot.isSoilLayersCompleted = false
          }
        } else if (layer_name === 'soil_horizon_3') {
          newPlot.texture.soil_horizon_3 = textture_value_guide_me
          if (!isEmpty(newPlot.rock_fragment.soil_horizon_3) && !isEmpty(newPlot.texture.soil_horizon_3)) {
            newPlot.isSoilLayer_3_Completed = true
            newPlot.isSoilLayersCompleted = true
          } else {
            newPlot.isSoilLayer_3_Completed = false
            newPlot.isSoilLayersCompleted = false
          }
        } else if (layer_name === 'soil_horizon_4') {
          newPlot.texture.soil_horizon_4 = textture_value_guide_me
          if (!isEmpty(newPlot.rock_fragment.soil_horizon_4) && !isEmpty(newPlot.texture.soil_horizon_4)) {
            newPlot.isSoilLayer_4_Completed = true
            newPlot.isSoilLayersCompleted = true
          } else {
            newPlot.isSoilLayer_4_Completed = false
            newPlot.isSoilLayersCompleted = false
          }
        } else if (layer_name === 'soil_horizon_5') {
          newPlot.texture.soil_horizon_5 = textture_value_guide_me
          if (!isEmpty(newPlot.rock_fragment.soil_horizon_5) && !isEmpty(newPlot.texture.soil_horizon_5)) {
            newPlot.isSoilLayer_5_Completed = true
            newPlot.isSoilLayersCompleted = true
          } else {
            newPlot.isSoilLayer_5_Completed = false
            newPlot.isSoilLayersCompleted = false
          }
        } else if (layer_name === 'soil_horizon_6') {
          newPlot.texture.soil_horizon_6 = textture_value_guide_me
          if (!isEmpty(newPlot.rock_fragment.soil_horizon_6) && !isEmpty(newPlot.texture.soil_horizon_6)) {
            newPlot.isSoilLayer_6_Completed = true
            newPlot.isSoilLayersCompleted = true
          } else {
            newPlot.isSoilLayer_6_Completed = false
            newPlot.isSoilLayersCompleted = false
          }
        } else if (layer_name === 'soil_horizon_7') {
          newPlot.texture.soil_horizon_7 = textture_value_guide_me
          if (!isEmpty(newPlot.rock_fragment.soil_horizon_7) && !isEmpty(newPlot.texture.soil_horizon_7)) {
            newPlot.isSoilLayer_7_Completed = true
            newPlot.isSoilLayersCompleted = true
          } else {
            newPlot.isSoilLayer_7_Completed = false
            newPlot.isSoilLayersCompleted = false
          }
        }

        //updatePlotExist(newPlot.real_name, newPlot.recorder_name, LIST_PLOTS, newPlot)
        //window.localStorage.setItem(email + '_' + 'LIST_LANDINFO_PLOTS', JSON.stringify(LIST_PLOTS))
        //window.localStorage.setItem('current_view_plot', JSON.stringify(newPlot))
        if (newPlot.status != 'CREATED'){
          newPlot.status = 'NOT_SYNCHRONIZED';
        }

        plotListService.updateCachedPlot(LIST_PLOTS, newPlot)

        $rootScope.$ionicGoBack()

      } else {
        aler('error texture')
      }
    }

    $scope.openHelp = function (item) {
      var template_doc = ''
      if (item === 'SOIL_FORM_A_BALL') {
        if (!window.cordova){
          template_doc = '<video width="100%" autoplay loop><source src="landinfo_media/movie/SoilBallHQ.mp4" type="video/mp4"></video>'
        } else if (window.cordova && ionic.Platform.isAndroid()) {
          //alert("Thiet bi : " + device.model);
          if (device.model === "GT-S7710"){
            template_doc = '<video width="100%" autoplay loop><source src="http://128.123.177.13/APEX/External_PHP_Project/LandInfo_Videos/videos/SoilBallHQ.mp4"></video>'
          } else {
            template_doc = '<video width="100%" autoplay loop><source src="landinfo_media/movie/SoilBallHQ.mp4" type="video/mp4"></video>'
          }
        } else if (window.cordova && ionic.Platform.isIOS()) {
          template_doc = '<video width="100%" autoplay loop><source src="landinfo_media/movie/SoilBallHQ.mp4" type="video/mp4"></video>'
        }

        document.getElementById('yesSoilFormABall').style = 'color:green'
        document.getElementById('noSoilFormABall').style = 'color:red'

      } else if (item === 'SOIL_FROM_A_RIBBON') {
        if (!window.cordova){
          template_doc = '<video width="100%" autoplay loop><source src="landinfo_media/movie/RibbonHQ.mp4" type="video/mp4"></video>'
        } else if (window.cordova && ionic.Platform.isAndroid()) {
          if (device.model === "GT-S7710"){
            template_doc = '<video width="100%" autoplay loop><source src="http://128.123.177.13/APEX/External_PHP_Project/LandInfo_Videos/videos/RibbonHQ.mp4"></video>'
          } else {
            template_doc = '<video width="100%" autoplay loop><source src="landinfo_media/movie/RibbonHQ.mp4" type="video/mp4"></video>'
          }
        } else if (window.cordova && ionic.Platform.isIOS()) {
          template_doc = '<video width="100%" autoplay loop><source src="landinfo_media/movie/RibbonHQ.mp4" type="video/mp4"></video>'
        }

        document.getElementById('yesSoilFormARibbon').style = 'color:green'
        document.getElementById('noSoilFormARibbon').style = 'color:red'
      } else if (item === 'LENGTH_OF_RIBBON') {
        template_doc = '<img  src="landinfo_media/rock_fragment_volume/Ribbon_Length.png" style="max-width:100%;"/>'
      } else if (item === 'SOIL_FEEL') {
        if (!window.cordova){
          template_doc = '<video width="100%"  autoplay loop><source src="landinfo_media/movie/SmoothHQ.mp4" type="video/mp4"></video>'
        } else if (window.cordova && ionic.Platform.isAndroid()) {
          if (device.model === 'GT-S7710'){
              template_doc = '<video width="100%"  autoplay loop><source src="http://128.123.177.13/APEX/External_PHP_Project/LandInfo_Videos/videos/SmoothHQ.mp4"></video>'
          } else {
              template_doc = '<video width="100%"  autoplay loop><source src="landinfo_media/movie/SmoothHQ.mp4" type="video/mp4"></video>'
          }
        } else if (window.cordova && ionic.Platform.isIOS()) {
          template_doc = '<video width="100%"  autoplay loop><source src="landinfo_media/movie/SmoothHQ.mp4" type="video/mp4"></video>'
        }

        document.getElementById('gritty_soil_feel').style = 'color:red'
        document.getElementById('not_soil_feel').style = 'color:green'
        document.getElementById('smooth_soil_feel').style = 'color:orange'
      }
      if (window.cordova) {
        var myPopup = $ionicPopup.show({
          template: template_doc,
          cssClass: 'custom-popup',
          buttons: [
            {
              text: '<b>OK</b>',
              type: 'button-balanced',
              onTap: function (e) {
                return
              }
            },
          ]
        })
        myPopup.then(function (res) {
          console.log('Tapped!', res)
        })
      } else {
        var myPopup = $ionicPopup.show({
          template: template_doc,
          cssClass: 'custom-popup-web',
          buttons: [
            {
              text: '<b>OK</b>',
              type: 'button-balanced',
              onTap: function (e) {
                return
              }
            },

          ]
        })
        myPopup.then(function (res) {
          console.log('Tapped!', res)
        })
      }
    }


    $scope.clickSoilFormABall = function (item) {
      console.log(item)
      if (item === 'NO') {
        document.getElementById('textureValue').innerHTML = 'Sand'
        document.getElementById('btnSelect').style.visibility = 'visible'

        document.getElementById('soil_form_a_ball').style.visibility = 'visible'
        document.getElementById('soil_form_a_ribbon').style.visibility = 'hidden'
        document.getElementById('length_of_ribbon').style.visibility = 'hidden'
        document.getElementById('soil_feel').style.visibility = 'hidden'
      } else {
        document.getElementById('textureValue').innerHTML = ''
        document.getElementById('btnSelect').style.visibility = 'hidden'

        document.getElementById('soil_form_a_ball').style.visibility = 'visible'
        document.getElementById('soil_form_a_ribbon').style.visibility = 'visible'
        document.getElementById('length_of_ribbon').style.visibility = 'hidden'
        document.getElementById('soil_feel').style.visibility = 'hidden'
      }
    }

    $scope.clickSoilFormARibbon = function (item) {
      if (item === 'NO') {
        document.getElementById('textureValue').innerHTML = 'Loamy sand'
        document.getElementById('btnSelect').style.visibility = 'visible'

        document.getElementById('soil_form_a_ball').style.visibility = 'visible'
        document.getElementById('soil_form_a_ribbon').style.visibility = 'visible'
        document.getElementById('length_of_ribbon').style.visibility = 'hidden'
        document.getElementById('soil_feel').style.visibility = 'hidden'
      } else {
        document.getElementById('textureValue').innerHTML = ''
        document.getElementById('btnSelect').style.visibility = 'hidden'

        document.getElementById('soil_form_a_ball').style.visibility = 'visible'
        document.getElementById('soil_form_a_ribbon').style.visibility = 'visible'
        document.getElementById('length_of_ribbon').style.visibility = 'visible'
        document.getElementById('soil_feel').style.visibility = 'hidden'
      }
    }

    $scope.clickLengthOfRibbon = function (item) {
      document.getElementById('textureValue').innerHTML = ''
      document.getElementById('btnSelect').style.visibility = 'hidden'
      document.getElementById('soil_form_a_ball').style.visibility = 'visible'
      document.getElementById('soil_form_a_ribbon').style.visibility = 'visible'
      document.getElementById('length_of_ribbon').style.visibility = 'visible'
      document.getElementById('soil_feel').style.visibility = 'visible'

      if (item === '2.5') {
        length_of_ribbon = '2.5'
      } else if (item === '2.5-5') {
        length_of_ribbon = '2.5-5'
      } else if (item === '5') {
        length_of_ribbon = '5'
      }
      document.getElementById('optGritty').checked = false
      document.getElementById('optNot').checked = false
      document.getElementById('optSmooth').checked = false
    }

    $scope.clickSoilFeel = function (item) {
      document.getElementById('btnSelect').style.visibility = 'visible'
      document.getElementById('soil_form_a_ball').style.visibility = 'visible'
      document.getElementById('soil_form_a_ribbon').style.visibility = 'visible'
      document.getElementById('length_of_ribbon').style.visibility = 'visible'
      document.getElementById('soil_feel').style.visibility = 'visible'

      if (item === 'GRITTY') {
        if (length_of_ribbon === '2.5') {
          document.getElementById('textureValue').innerHTML = 'Sandy loam'
        } else if (length_of_ribbon === '2.5-5') {
          document.getElementById('textureValue').innerHTML = 'Sandy clay loam'
        } else if (length_of_ribbon === '5') {
          document.getElementById('textureValue').innerHTML = 'Sandy clay'
        }
      } else if (item === 'NOT_GRITTY_SMOOTH') {
        if (length_of_ribbon === '2.5') {
          document.getElementById('textureValue').innerHTML = 'Loam'
        } else if (length_of_ribbon === '2.5-5') {
          document.getElementById('textureValue').innerHTML = 'Clay loam'
        } else if (length_of_ribbon === '5') {
          document.getElementById('textureValue').innerHTML = 'Clay'
        }
      } else if (item === 'SMOOTH') {
        if (length_of_ribbon === '2.5') {
          document.getElementById('textureValue').innerHTML = 'Silt loam'
        } else if (length_of_ribbon === '2.5-5') {
          document.getElementById('textureValue').innerHTML = 'Silty clay loam'
        } else if (length_of_ribbon === '5') {
          document.getElementById('textureValue').innerHTML = 'Silty clay'
        }
      }
    }

  })
  /****************************************/
  /** Take_Photo_LandScape_Ctrl **/
  /****************************************/
  .controller('Take_Photo_LandScape_Ctrl', function ($scope, $state,$http,$ionicLoading) {
    var typeBrowser = getTypeWebBrowser()
    // if (typeBrowser == "DEVICE") {
    if (window.cordova) {
      console.log("no longer using this code")
    } else {
      /* Run on browser */
      /* Visible all */
      document.getElementById('aTagNorth').style.visibility = 'visible'
      document.getElementById('aTagEast').style.visibility = 'visible'
      document.getElementById('aTagSouth').style.visibility = 'visible'
      document.getElementById('aTagWest').style.visibility = 'visible'

      $scope.navigator_landscape_north = 'landpks.landinfo_take_photo_landscape_north_browser'
      $scope.navigator_landscape_east = 'landpks.landinfo_take_photo_landscape_east_browser'
      $scope.navigator_landscape_south = 'landpks.landinfo_take_photo_landscape_south_browser'
      $scope.navigator_landscape_west = 'landpks.landinfo_take_photo_landscape_west_browser'
    }

    var newPlot = JSON.parse(window.localStorage.getItem('current_edit_plot'))
    $scope.landscape_north_photo_data_url = newPlot.landscape_north_photo_data_url
    $scope.landscape_east_photo_data_url = newPlot.landscape_east_photo_data_url
    $scope.landscape_south_photo_data_url = newPlot.landscape_south_photo_data_url
    $scope.landscape_west_photo_data_url = newPlot.landscape_west_photo_data_url
    $scope.goBack = function () {
      $state.go('landpks.landinfo_photos')
    }

    document.getElementById('northUpload').onchange = function(){
        var filesSelected = document.getElementById("northUpload").files;
        if (filesSelected.length > 0)
        {
           var fileToLoad = filesSelected[0];
           if (fileToLoad.type.match("image.*"))
           {
               var fileReader = new FileReader();
               fileReader.onload = function(fileLoadedEvent)
               {
                   document.getElementById('northImage').src = fileLoadedEvent.target.result
                   var image_data = fileLoadedEvent.target.result
                   /* Upload to Server */
                   var image_name = newPlot.recorder_name + '_' + newPlot.real_name + '_landscape_north_' + Date.now() + '.jpg'
                   upload_landinfo_photo(image_name,'landscape_north',image_data,$http,$ionicLoading)
                   /* End upload */

                   /* Save data to main object */
                   var full_link = LANDPKS_LANDINFO_IMAGES_STORE_DIR + 'landscape_north/' + image_name
                   //console.log(full_link)
                   newPlot.landscape_north_photo_data_url = full_link.trim()
                   newPlot.landscape_north_photo_url = full_link.trim()
                   window.localStorage.setItem('current_edit_plot', JSON.stringify(newPlot))
               };
               fileReader.readAsDataURL(fileToLoad);
           }
        }
    };

    document.getElementById('eastUpload').onchange = function(){
        var filesSelected = document.getElementById("eastUpload").files;
        if (filesSelected.length > 0)
        {
           var fileToLoad = filesSelected[0];
           if (fileToLoad.type.match("image.*"))
           {
               var fileReader = new FileReader();
               fileReader.onload = function(fileLoadedEvent)
               {
                   document.getElementById('eastImage').src = fileLoadedEvent.target.result
                   var image_data = fileLoadedEvent.target.result
                   /* Upload to Server */
                   var image_name = newPlot.recorder_name + '_' + newPlot.real_name + '_landscape_east_' + Date.now() + '.jpg'
                   upload_landinfo_photo(image_name,'landscape_east',image_data,$http,$ionicLoading)
                   /* End upload */

                   /* Save data to main object */
                   var full_link = LANDPKS_LANDINFO_IMAGES_STORE_DIR + 'landscape_east/' + image_name
                   //console.log(full_link)
                   newPlot.landscape_east_photo_data_url = full_link.trim()
                   newPlot.landscape_east_photo_url = full_link.trim()
                   window.localStorage.setItem('current_edit_plot', JSON.stringify(newPlot))
               };
               fileReader.readAsDataURL(fileToLoad);
           }
        }
    };

    document.getElementById('southUpload').onchange = function(){
        var filesSelected = document.getElementById("southUpload").files;
        if (filesSelected.length > 0)
        {
           var fileToLoad = filesSelected[0];
           if (fileToLoad.type.match("image.*"))
           {
               var fileReader = new FileReader();
               fileReader.onload = function(fileLoadedEvent)
               {
                   document.getElementById('southImage').src = fileLoadedEvent.target.result
                   var image_data = fileLoadedEvent.target.result
                   /* Upload to Server */
                   var image_name = newPlot.recorder_name + '_' + newPlot.real_name + '_landscape_south_' + Date.now() + '.jpg'
                   upload_landinfo_photo(image_name,'landscape_south',image_data,$http,$ionicLoading)
                   /* End upload */

                   /* Save data to main object */
                   var full_link = LANDPKS_LANDINFO_IMAGES_STORE_DIR + 'landscape_south/' + image_name
                   //console.log(full_link)
                   newPlot.landscape_south_photo_data_url = full_link.trim()
                   newPlot.landscape_south_photo_url = full_link.trim()
                   window.localStorage.setItem('current_edit_plot', JSON.stringify(newPlot))
               };
               fileReader.readAsDataURL(fileToLoad);
           }
        }
    };

    document.getElementById('westUpload').onchange = function(){
        var filesSelected = document.getElementById("westUpload").files;
        if (filesSelected.length > 0)
        {
           var fileToLoad = filesSelected[0];
           if (fileToLoad.type.match("image.*"))
           {
               var fileReader = new FileReader();
               fileReader.onload = function(fileLoadedEvent)
               {
                   document.getElementById('westImage').src = fileLoadedEvent.target.result
                   var image_data = fileLoadedEvent.target.result
                   /* Upload to Server */
                   var image_name = newPlot.recorder_name + '_' + newPlot.real_name + '_landscape_west_' + Date.now() + '.jpg'
                   upload_landinfo_photo(image_name,'landscape_west',image_data,$http,$ionicLoading)
                   /* End upload */

                   /* Save data to main object */
                   var full_link = LANDPKS_LANDINFO_IMAGES_STORE_DIR + 'landscape_west/' + image_name
                   //console.log(full_link)
                   newPlot.landscape_west_photo_data_url = full_link.trim()
                   newPlot.landscape_west_photo_url = full_link.trim()
                   window.localStorage.setItem('current_edit_plot', JSON.stringify(newPlot))
               };
               fileReader.readAsDataURL(fileToLoad);
           }
        }
    };
  })

  .controller('Take_Photo_LandScape_North_Device_Ctrl', function ($scope, $state, $ionicLoading, $http, $cordovaCamera, $ionicPopup) {
    var newPlot = JSON.parse(window.localStorage.getItem('current_edit_plot'))
    if (!isEmpty(newPlot.landscape_north_photo_url)) {
      $scope.pictureURL = newPlot.landscape_north_photo_url
    } else {
      $scope.pictureURL = 'http://placehold.it/300x300'
    }
    var options = {
      quality: 100,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: false,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 640,
      targetHeight: 480,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false,
      correctOrientation: true
    }
    var dataURL = ''
    $scope.takePicture = function () {
      $cordovaCamera.getPicture(options)
        .then(function (imageData) {
          $scope.pictureURL = 'data:image/jpeg;base64,' + imageData
          dataURL = $scope.pictureURL
          Date.now = function () { return new Date().getTime();}
          var image_name = newPlot.recorder_name + '_' + newPlot.real_name + '_landscape_north_' + Date.now() + '.jpg'

          self_upload(image_name, 'landscape_north', dataURL)
        }, function (error) {
          $ionicLoading.hide()
          console.log('Camera error : ' + angular.toJson(error))
        })
    }

    function self_upload (file_name, type, dataURL) {
      $ionicLoading.show({
        template: 'Uploading LandScape North photo. Please wait...'
      })
      $http({
        method: 'POST',
        url: LANDPKS_STATICS_FILE_UPLOAD_IMG,
        headers: {'Content-type': 'application/x-www-form-urlencoded'},
        timeout: HTTP_TIME_OUT_CONNECTION,
        transformRequest: function (obj) {
          var str = []
          for (var p in obj)
            str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
          return str.join('&')
        },
        data: { img_data: dataURL, file_name: file_name, type: type },
      }).success(
        function (data, status, headers, config) {
          newPlot.landscape_north_photo_data_url = data.trim()
          newPlot.landscape_north_photo_url = data.trim()
          window.localStorage.setItem('current_edit_plot', JSON.stringify(newPlot))
          $ionicLoading.hide()
          $state.go('landpks.landinfo_take_photos_landscape_compass')
        }).error(function (err) {
          $ionicLoading.hide()
          var infoPopup = $ionicPopup.alert({
              cssClass: 'remove-title-class',
              template: 'Error in upload image'
          })
          infoPopup.then(function (res) {
              infoPopup.close()
          })
          return
      })
    }
  })

  .controller('Take_Photo_LandScape_North_Browser_Ctrl', function ($scope, $state, $ionicLoading, $http, $ionicPopup) {
    var typeBrowser = getTypeWebBrowser()
    if (typeBrowser != 'FIREFOX') {
      var infoPopup = $ionicPopup.alert({
        cssClass: 'remove-title-class',
        template: TAKE_PHOTO_ERROR_MESSAGE_ON_WEB_APP
      })
      infoPopup.then(function (res) {
        infoPopup.close()
      })
    }
    var newPlot = JSON.parse(window.localStorage.getItem('current_edit_plot'))
    var canvas = document.getElementById('canvas')
    var context = canvas.getContext('2d')
    var video = document.getElementById('video')

    try{
        navigator.getMedia = (navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia)

        navigator.getMedia(
          {
            video: true,
            audio: false
          },
          function (stream) {
            if (navigator.mozGetUserMedia) {
              video.mozSrcObject = stream
            } else {
              var vendorURL = window.URL || window.webkitURL
              video.src = vendorURL.createObjectURL(stream)
            }
            video.play()
          },
          function (err) {
            console.log('An error occured! ' + err)
          }
        )

        video.addEventListener('canplay', function (ev) {
          if (!streaming) {
            streaming = true
          }
        }, false)
    } catch (e){
        console.log(e)
    }

    function self_upload (file_name, type) {
      $ionicLoading.show({
        template: 'Uploading LandScape North photo. Please wait...'
      })
      context.drawImage(video, 0, 0, LANDPKS_LANDINFO_IMAGE_WIDTH_SIZE, LANDPKS_LANDINFO_IMAGE_HEIGHT_SIZE)
      var dataURL = canvas.toDataURL(LANDPKS_LANDINFO_IMAGE_FILE_EXTENTION, LANDPKS_LANDINFO_IMAGE_QUALITY_1)
      var imageData = dataURL
      $http({
        method: 'POST',
        url: LANDPKS_STATICS_FILE_UPLOAD_IMG,
        headers: {'Content-type': 'application/x-www-form-urlencoded'},
        timeout: HTTP_TIME_OUT_CONNECTION,
        transformRequest: function (obj) {
          var str = []
          for (var p in obj)
            str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
          return str.join('&')
        },
        data: { img_data: imageData, file_name: file_name, type: type },
      }).success(
        function (data, status, headers, config) {
          $ionicLoading.hide()
          newPlot.landscape_north_photo_data_url = data.trim()
          newPlot.landscape_north_photo_url = data.trim()
          window.localStorage.setItem('current_edit_plot', JSON.stringify(newPlot))
          $state.go('landpks.landinfo_take_photos_landscape')
        }).error(function (err) {
          $ionicLoading.hide()
          var infoPopup = $ionicPopup.alert({
            cssClass: 'remove-title-class',
            template: 'Error in upload image' + err.error
          })
          infoPopup.then(function (res) {
            infoPopup.close()
          })
          return
      })
    }

    // Trigger photo take
    document.getElementById('snap').addEventListener('click', function () {
      Date.now = function () { return new Date().getTime(); }
      var image_name = newPlot.recorder_name + '_' + newPlot.real_name + '_landscape_north_' + Date.now() + '.jpg'
      self_upload(image_name, 'landscape_north')
    })
  })

  .controller('Take_Photo_LandScape_East_Device_Ctrl', function ($scope, $state, $ionicLoading, $http, $cordovaCamera, $ionicPopup) {
    var newPlot = JSON.parse(window.localStorage.getItem('current_edit_plot'))
    if (!isEmpty(newPlot.landscape_east_photo_url)) {
      $scope.pictureURL = newPlot.landscape_east_photo_url
    } else {
      $scope.pictureURL = 'http://placehold.it/300x300'
    }
    var options = {
      quality: 100,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: false,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 640,
      targetHeight: 480,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false,
      correctOrientation: true
    }
    var dataURL = ''
    $scope.takePicture = function () {
      $cordovaCamera.getPicture(options)
        .then(function (imageData) {
          $scope.pictureURL = 'data:image/jpeg;base64,' + imageData
          dataURL = $scope.pictureURL

          Date.now = function () { return new Date().getTime();}
          var image_name = newPlot.recorder_name + '_' + newPlot.real_name + '_landscape_east_' + Date.now() + '.jpg'

          self_upload(image_name, 'landscape_east', dataURL)
        }, function (error) {
          console.log('Camera error : ' + angular.toJson(error))
        })
    }

    function self_upload (file_name, type, dataURL) {
      $ionicLoading.show({
        template: 'Uploading LandScape East photo. Please wait...'
      })

      $http({
        method: 'POST',
        url: LANDPKS_STATICS_FILE_UPLOAD_IMG,
        headers: {'Content-type': 'application/x-www-form-urlencoded'},
        timeout: HTTP_TIME_OUT_CONNECTION,
        transformRequest: function (obj) {
          var str = []
          for (var p in obj)
            str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
          return str.join('&')
        },
        data: { img_data: dataURL, file_name: file_name, type: type },
      }).success(
        function (data, status, headers, config) {
          newPlot.landscape_east_photo_data_url = data.trim()
          newPlot.landscape_east_photo_url = data.trim()
          window.localStorage.setItem('current_edit_plot', JSON.stringify(newPlot))
          $ionicLoading.hide()
          $state.go('landpks.landinfo_take_photos_landscape_compass')
        }).error(function (err) {
        $ionicLoading.hide()
        var infoPopup = $ionicPopup.alert({
          cssClass: 'remove-title-class',
          template: 'Error in upload image'
        })
        infoPopup.then(function (res) {
          infoPopup.close()
        })
        return
      })
    }
  })

  .controller('Take_Photo_LandScape_East_Browser_Ctrl', function ($scope, $state, $ionicLoading, $http, $ionicPopup) {
    var typeBrowser = getTypeWebBrowser()
    if (typeBrowser != 'FIREFOX') {
      var infoPopup = $ionicPopup.alert({
        cssClass: 'remove-title-class',
        template: TAKE_PHOTO_ERROR_MESSAGE_ON_WEB_APP
      })
      infoPopup.then(function (res) {
        infoPopup.close()
      })
    }
    var newPlot = JSON.parse(window.localStorage.getItem('current_edit_plot'))
    var canvas = document.getElementById('canvas')
    var context = canvas.getContext('2d')
    var video = document.getElementById('video')
    try{
        navigator.getMedia = (navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia)

        navigator.getMedia(
          {
            video: true,
            audio: false
          },
          function (stream) {
            if (navigator.mozGetUserMedia) {
              video.mozSrcObject = stream
            } else {
              var vendorURL = window.URL || window.webkitURL
              video.src = vendorURL.createObjectURL(stream)
            }
            video.play()
          },
          function (err) {
            console.log('An error occured! ' + err)
          }
        )

        video.addEventListener('canplay', function (ev) {
          if (!streaming) {
            streaming = true
          }
        }, false)
    } catch (e){
        console.log(e)
    }

    function self_upload (file_name, type) {
      $ionicLoading.show({
        template: 'Uploading LandScape East photo. Please wait...'
      })
      context.drawImage(video, 0, 0, LANDPKS_LANDINFO_IMAGE_WIDTH_SIZE, LANDPKS_LANDINFO_IMAGE_HEIGHT_SIZE)
      var dataURL = canvas.toDataURL(LANDPKS_LANDINFO_IMAGE_FILE_EXTENTION, LANDPKS_LANDINFO_IMAGE_QUALITY_1)
      var imageData = dataURL
      $http({
        method: 'POST',
        url: LANDPKS_STATICS_FILE_UPLOAD_IMG,
        headers: {'Content-type': 'application/x-www-form-urlencoded'},
        timeout: HTTP_TIME_OUT_CONNECTION,
        transformRequest: function (obj) {
          var str = []
          for (var p in obj)
            str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
          return str.join('&')
        },
        data: { img_data: imageData, file_name: file_name, type: type },
      }).success(
        function (data, status, headers, config) {
          $ionicLoading.hide()
          newPlot.landscape_east_photo_data_url = data.trim()
          newPlot.landscape_east_photo_url = data.trim()
          window.localStorage.setItem('current_edit_plot', JSON.stringify(newPlot))
          $state.go('landpks.landinfo_take_photos_landscape')
        }).error(function (err) {
          $ionicLoading.hide()
          var infoPopup = $ionicPopup.alert({
            cssClass: 'remove-title-class',
            template: 'Error in upload image ' + err.error
          })
          infoPopup.then(function (res) {
            infoPopup.close()
          })
          return
      })
    }

    // Trigger photo take
    document.getElementById('snap').addEventListener('click', function () {
      Date.now = function () { return new Date().getTime(); }
      var image_name = newPlot.recorder_name + '_' + newPlot.real_name + '_landscape_east_' + Date.now() + '.jpg'
      self_upload(image_name, 'landscape_east')
    })
  })

  .controller('Take_Photo_LandScape_South_Device_Ctrl', function ($scope, $state, $ionicLoading, $http, $cordovaCamera, $ionicPopup) {
    var newPlot = JSON.parse(window.localStorage.getItem('current_edit_plot'))
    if (!isEmpty(newPlot.landscape_south_photo_url)) {
      $scope.pictureURL = newPlot.landscape_south_photo_url
    } else {
      $scope.pictureURL = 'http://placehold.it/300x300'
    }
    var options = {
      quality: 100,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: false,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 640,
      targetHeight: 480,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false,
      correctOrientation: true
    }
    var dataURL = ''
    $scope.takePicture = function () {
      $cordovaCamera.getPicture(options)
        .then(function (imageData) {
          $scope.pictureURL = 'data:image/jpeg;base64,' + imageData
          dataURL = $scope.pictureURL
          Date.now = function () { return new Date().getTime();}
          var image_name = newPlot.recorder_name + '_' + newPlot.real_name + '_landscape_south_' + Date.now() + '.jpg'
          self_upload(image_name, 'landscape_south', dataURL)
        }, function (error) {
          console.log('Camera error : ' + angular.toJson(error))
        })
    }

    function self_upload (file_name, type, dataURL) {
      $ionicLoading.show({
        template: 'Uploading LandScape South photo. Please wait...'
      })

      $http({
        method: 'POST',
        url: LANDPKS_STATICS_FILE_UPLOAD_IMG,
        headers: {'Content-type': 'application/x-www-form-urlencoded'},
        timeout: HTTP_TIME_OUT_CONNECTION,
        transformRequest: function (obj) {
          var str = []
          for (var p in obj)
            str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
          return str.join('&')
        },
        data: { img_data: dataURL, file_name: file_name, type: type },
      }).success(
        function (data, status, headers, config) {
          $ionicLoading.hide()
          newPlot.landscape_south_photo_data_url = data.trim()
          newPlot.landscape_south_photo_url = data.trim()
          window.localStorage.setItem('current_edit_plot', JSON.stringify(newPlot))
          $state.go('landpks.landinfo_take_photos_landscape_compass')
        }).error(function (err) {
        $ionicLoading.hide()
        var infoPopup = $ionicPopup.alert({
          cssClass: 'remove-title-class',
          template: 'Error in upload image ' + err.error
        })
        infoPopup.then(function (res) {
          infoPopup.close()
        })
        return
      })
    }
  })

  .controller('Take_Photo_LandScape_South_Browser_Ctrl', function ($scope, $state, $ionicLoading, $http, $ionicPopup) {
    var typeBrowser = getTypeWebBrowser()
    if (typeBrowser != 'FIREFOX') {
      var infoPopup = $ionicPopup.alert({
        cssClass: 'remove-title-class',
        template: TAKE_PHOTO_ERROR_MESSAGE_ON_WEB_APP
      })
      infoPopup.then(function (res) {
        infoPopup.close()
      })
    }
    var newPlot = JSON.parse(window.localStorage.getItem('current_edit_plot'))
    var canvas = document.getElementById('canvas')
    var context = canvas.getContext('2d')
    var video = document.getElementById('video')

    try{
        navigator.getMedia = (navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia)

        navigator.getMedia(
         {
           video: true,
           audio: false
         },
         function (stream) {
           if (navigator.mozGetUserMedia) {
             video.mozSrcObject = stream
           } else {
             var vendorURL = window.URL || window.webkitURL
             video.src = vendorURL.createObjectURL(stream)
           }
           video.play()
         },
         function (err) {
           console.log('An error occured! ' + err)
         }
        )

        video.addEventListener('canplay', function (ev) {
         if (!streaming) {
           streaming = true
         }
        }, false)
  } catch (e){
        console.log(e)
  }

  function self_upload (file_name, type) {
      $ionicLoading.show({
        template: 'Uploading LandScape South photo. Please wait...'
      })
      context.drawImage(video, 0, 0, LANDPKS_LANDINFO_IMAGE_WIDTH_SIZE, LANDPKS_LANDINFO_IMAGE_HEIGHT_SIZE)
      var dataURL = canvas.toDataURL(LANDPKS_LANDINFO_IMAGE_FILE_EXTENTION, LANDPKS_LANDINFO_IMAGE_QUALITY_1)
      var imageData = dataURL
      $http({
        method: 'POST',
        url: LANDPKS_STATICS_FILE_UPLOAD_IMG,
        headers: {'Content-type': 'application/x-www-form-urlencoded'},
        timeout: HTTP_TIME_OUT_CONNECTION,
        transformRequest: function (obj) {
          var str = []
          for (var p in obj)
            str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
          return str.join('&')
        },
        data: { img_data: imageData, file_name: file_name, type: type },
      }).success(
        function (data, status, headers, config) {
          $ionicLoading.hide()
          newPlot.landscape_south_photo_data_url = data.trim()
          newPlot.landscape_south_photo_url = data.trim()
          window.localStorage.setItem('current_edit_plot', JSON.stringify(newPlot))
          $state.go('landpks.landinfo_take_photos_landscape')
        }).error(function (err) {
          $ionicLoading.hide()
          var infoPopup = $ionicPopup.alert({
            cssClass: 'remove-title-class',
            template: 'Error in upload photo ' + err.error
          })
          infoPopup.then(function (res) {
            infoPopup.close()
          })
          return
      })
    }

    // Trigger photo take
    document.getElementById('snap').addEventListener('click', function () {
      Date.now = function () { return new Date().getTime(); }
      var image_name = newPlot.recorder_name + '_' + newPlot.real_name + '_landscape_south_' + Date.now() + '.jpg'
      self_upload(image_name, 'landscape_south')
    })
  })

  .controller('Take_Photo_LandScape_West_Device_Ctrl', function ($scope, $state, $ionicLoading, $http, $cordovaCamera, $ionicPopup) {
    var newPlot = JSON.parse(window.localStorage.getItem('current_edit_plot'))
    if (!isEmpty(newPlot.landscape_west_photo_url)) {
      $scope.pictureURL = newPlot.landscape_west_photo_url
    } else {
      $scope.pictureURL = 'http://placehold.it/300x300'
    }
    var options = {
      quality: 100,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: false,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 640,
      targetHeight: 480,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false,
      correctOrientation: true
    }
    var dataURL = ''
    $scope.takePicture = function () {
      $cordovaCamera.getPicture(options)
        .then(function (imageData) {
          $scope.pictureURL = 'data:image/jpeg;base64,' + imageData
          dataURL = $scope.pictureURL

          Date.now = function () { return new Date().getTime();}
          var image_name = newPlot.recorder_name + '_' + newPlot.real_name + '_landscape_west_' + Date.now() + '.jpg'

          self_upload(image_name, 'landscape_west', dataURL)
        }, function (error) {
          console.log('Camera error : ' + angular.toJson(error))
        })
    }

    function self_upload (file_name, type, dataURL) {
      $ionicLoading.show({
        template: 'Uploading LandScape West photo. Please wait...'
      })

      $http({
        method: 'POST',
        url: LANDPKS_STATICS_FILE_UPLOAD_IMG,
        headers: {'Content-type': 'application/x-www-form-urlencoded'},
        timeout: HTTP_TIME_OUT_CONNECTION,
        transformRequest: function (obj) {
          var str = []
          for (var p in obj)
            str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
          return str.join('&')
        },
        data: { img_data: dataURL, file_name: file_name, type: type },
      }).success(
        function (data, status, headers, config) {
          $ionicLoading.hide()
          newPlot.landscape_west_photo_data_url = data.trim()
          newPlot.landscape_west_photo_url = data.trim()
          window.localStorage.setItem('current_edit_plot', JSON.stringify(newPlot))
          $state.go('landpks.landinfo_take_photos_landscape_compass')
        }).error(function (err) {
        $ionicLoading.hide()
        var infoPopup = $ionicPopup.alert({
          cssClass: 'remove-title-class',
          template: 'Error in upload photo ' + err.error
        })
        infoPopup.then(function (res) {
          infoPopup.close()
        })
        return
      })
    }
  })

  .controller('Take_Photo_LandScape_West_Browser_Ctrl', function ($scope, $state, $ionicLoading, $http, $ionicPopup) {
    var typeBrowser = getTypeWebBrowser()
    if (typeBrowser != 'FIREFOX') {
      var infoPopup = $ionicPopup.alert({
        cssClass: 'remove-title-class',
        template: TAKE_PHOTO_ERROR_MESSAGE_ON_WEB_APP
      })
      infoPopup.then(function (res) {
        infoPopup.close()
      })
    // infoPopup.close()
    }
    var newPlot = JSON.parse(window.localStorage.getItem('current_edit_plot'))
    var canvas = document.getElementById('canvas')
    var context = canvas.getContext('2d')
    var video = document.getElementById('video')
    try{
        navigator.getMedia = (navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia)

        navigator.getMedia(
          {
            video: true,
            audio: false
          },
          function (stream) {
            if (navigator.mozGetUserMedia) {
              video.mozSrcObject = stream
            } else {
              var vendorURL = window.URL || window.webkitURL
              video.src = vendorURL.createObjectURL(stream)
            }
            video.play()
          },
          function (err) {
            console.log('An error occured! ' + err)
          }
        )

        video.addEventListener('canplay', function (ev) {
          if (!streaming) {
            streaming = true
          }
        }, false)
    } catch (e){
        console.log(e)
    }


    function self_upload (file_name, type) {
      $ionicLoading.show({
        template: 'Uploading LandScape West photo. Please wait...'
      })
      context.drawImage(video, 0, 0, LANDPKS_LANDINFO_IMAGE_WIDTH_SIZE, LANDPKS_LANDINFO_IMAGE_HEIGHT_SIZE)
      var dataURL = canvas.toDataURL(LANDPKS_LANDINFO_IMAGE_FILE_EXTENTION, LANDPKS_LANDINFO_IMAGE_QUALITY_1)
      var imageData = dataURL
      $http({
        method: 'POST',
        url: LANDPKS_STATICS_FILE_UPLOAD_IMG,
        headers: {'Content-type': 'application/x-www-form-urlencoded'},
        timeout: HTTP_TIME_OUT_CONNECTION,
        transformRequest: function (obj) {
          var str = []
          for (var p in obj)
            str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
          return str.join('&')
        },
        data: { img_data: imageData, file_name: file_name, type: type },
      }).success(
        function (data, status, headers, config) {
          $ionicLoading.hide()
          newPlot.landscape_west_photo_data_url = data.trim()
          newPlot.landscape_west_photo_url = data.trim()
          window.localStorage.setItem('current_edit_plot', JSON.stringify(newPlot))
          $state.go('landpks.landinfo_take_photos_landscape')
        }).error(function (err) {
          $ionicLoading.hide()
          var infoPopup = $ionicPopup.alert({
            cssClass: 'remove-title-class',
            template: 'Error in upload image ' + err.error
          })
          infoPopup.then(function (res) {
            infoPopup.close()
          })
          return
      })
    }

    // Trigger photo take
    document.getElementById('snap').addEventListener('click', function () {
      Date.now = function () { return new Date().getTime(); }
      var image_name = newPlot.recorder_name + '_' + newPlot.real_name + '_landscape_west_' + Date.now() + '.jpg'
      self_upload(image_name, 'landscape_west')
    })
  })

  /****************************************/
  /** List account Controller **/
  /****************************************/
  .controller('AboutCtrl', function ($scope, $translate) {
      /* Translate */
      var LANGUAGE_CONFIG = window.localStorage.getItem('GLOBAL_CONFIG_LANGUAGE')
      $translate.use(LANGUAGE_CONFIG)
      $scope.labels = {}
      $scope.labels.title = $translate.instant('landpks_app.app_about.title')
      $scope.labels.app_info = $translate.instant('landpks_app.app_about.app_info')
      $scope.labels.data_policy = $translate.instant('landpks_app.app_about.data_policy')
      $scope.labels.license = $translate.instant('landpks_app.app_about.license')
   })

  /****************************************/
  /** List Account Controller **/
  /****************************************/
  .controller('ListAccountsCtrl', function ($scope, $state, $http, Scopes, $ionicHistory,$ionicPlatform,$translate) {
    console.log("ListAccountsCtrl...")
    /* Translate */
    var LANGUAGE_CONFIG = window.localStorage.getItem('GLOBAL_CONFIG_LANGUAGE')
    $translate.use(LANGUAGE_CONFIG)
    $scope.labels = {}
    $scope.labels.title = $translate.instant('landpks_app.app_accounts.title')
    $scope.labels.select_account = $translate.instant('landpks_app.app_accounts.select_account')
    $scope.labels.add_account = $translate.instant('landpks_app.app_accounts.add_account')


    var listAuthentication = window.localStorage.getItem('AUTHENTICATION_LIST_LANDPKS')
    window.localStorage.setItem('CURRENT_PAGE_FOR_BACK_BUTTON','LIST_ACCOUNT_LANDINFO_PAGE')
    if (!isEmpty(listAuthentication)) {
      var jsonObjAuth = JSON.parse(listAuthentication)
      $scope.accounts = jsonObjAuth['authentication']
    } else {
      $scope.accounts = []
    }
    function clearCache () {
      $ionicHistory.clearCache()
    }
    $scope.selectAccount = function (account) {
      window.localStorage.setItem('current_json_auth_data', account.json_auth_data)
      window.localStorage.setItem('current_email', account.email)
      window.localStorage.setItem('current_password', account.password)
      window.localStorage.setItem('current_time_assign_token_at',account.time_assign_token_at)
      window.localStorage.setItem('current_time_expired_token_in_range',account.time_expired_token_in_range)
      window.localStorage.setItem('current_google_refresh_token',account.google_refresh_token)
      window.localStorage.setItem('current_json_auth_data_landcover', account.json_auth_data)
      window.localStorage.setItem('current_email_landcover', account.email)
      window.localStorage.setItem('current_password_landcover', account.password)
      window.localStorage.setItem('current_time_assign_token_at_landcover',account.time_assign_token_at)
      window.localStorage.setItem('current_time_expired_token_in_range_landcover',account.time_expired_token_in_range)

      window.localStorage.setItem('PREVIOUS_PAGE', 'ACCOUNTS_PAGE')
      $state.go('landpks.landinfo_plots')
    }
    /***********************************************/
    /*$ionicPlatform.registerBackButtonAction(function (event) {
      var current_page_for_back_button = window.localStorage.getItem('CURRENT_PAGE_FOR_BACK_BUTTON')
      window.localStorage.setItem('CURRENT_PAGE_FOR_BACK_BUTTON', 'EMPTY')
      if (current_page_for_back_button === 'LIST_ACCOUNT_LANDINFO_PAGE') {
        $state.go('landpks.landinfo_settings');
        return
      } else {
        return
      }
    }, 400)  */
  }) // End ListAccountsCtrl

  /****************************************/
  /** Settings Controller **/
  /****************************************/
  .controller('SettingsCtrl', function ($scope, $state, $http, Scopes, $ionicHistory, $ionicPopup, $ionicPlatform,$translate) {

    /* Translate */
    var LANGUAGE_CONFIG = window.localStorage.getItem('GLOBAL_CONFIG_LANGUAGE')
    $translate.use(LANGUAGE_CONFIG)
    $scope.labels = {}
    $scope.labels.title = $translate.instant('landpks_app.app_setting.title')
    $scope.labels.accounts = $translate.instant('landpks_app.app_setting.accounts')
    $scope.labels.select_app = $translate.instant('landpks_app.app_setting.select_app')
    $scope.labels.application_setting = $translate.instant('landpks_app.app_setting.application_setting')
    $scope.labels.about = $translate.instant('landpks_app.app_setting.about')
    $scope.labels.logout = $translate.instant('landpks_app.app_setting.logout')

    window.localStorage.setItem('PREVIOUS_PAGE_FOR_SELECT_APP','LANDINFO_SETTING')
    window.localStorage.setItem('CURRENT_PAGE_FOR_BACK_BUTTON', 'SETTING_LANDINFO_PAGE')
    $scope.landinfo_logout = function () {

      var objAuth = window.localStorage.getItem('AUTHENTICATION_LIST_LANDPKS')
      var email = window.localStorage.getItem('current_email')
      if (!isEmpty(objAuth) && !isEmpty(email)) {
        var listAuthentication = JSON.parse(objAuth)
        if (checkExist(email, listAuthentication['authentication']) == true) {
          logOutMessage =replaceAll($translate.instant('landpks_app.app_setting.logout_message'),'%s',email);

          var confirmPopup = $ionicPopup.confirm({
            title: $translate.instant('landpks_app.app_setting.logout_title'),
            template: logOutMessage
          })

          confirmPopup.then(function (res) {
            if (res) {
              confirmPopup.close()
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

                    window.localStorage.removeItem('current_json_auth_data')
                    window.localStorage.removeItem('current_email')
                    window.localStorage.removeItem('current_password')

                    window.localStorage.removeItem('current_json_auth_data_landcover')
                    window.localStorage.removeItem('current_email_landcover')
                    window.localStorage.removeItem('current_password_landcover')
                  }
                }
              }

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

                window.plugins.googleplus.logout(
                  function (msg) {
                    console.log("DISCONNECTED : " + msg)
                  },
                  function (msg) {
                    console.log("DISCONNECT FAILURE : " + msg)
                  }
              );
              }
              $ionicHistory.clearCache()
              $ionicHistory.clearHistory()
              $state.go('landpks.landinfo_accounts')
            } else {
              return
            }
          })
        } else {
          var infoPopup = $ionicPopup.alert({
            cssClass: 'remove-title-class',
            template: 'Account ' + email + ' is sign out already !'
          })
          infoPopup.then(function (res) {
            infoPopup.close()
          })
          return
        }
      } else {
        var infoPopup = $ionicPopup.alert({
          cssClass: 'remove-title-class',
          template: 'Account is sign out already !'
        })
        infoPopup.then(function (res) {
          infoPopup.close()
        })
        return
      }
    }

  }) // End Setting

  /****************************************/
  /** Clear Controller **/
  /****************************************/
  .controller('ClearCtrl', function ($scope, $ionicHistory) {
    console.log('Clear Everything')
    window.localStorage.clear()
    $ionicHistory.clearCache()
    $ionicHistory.clearHistory()
  }) // End ClearCtrl

  /****************************************/
  /** Plots Map Controller **/
  /****************************************/
  .controller('PlotsMapCtrl', function ($scope, $state, $compile, $ionicPopup, Scopes, $ionicPlatform,$ionicLoading,$translate, $ionicHistory) {

    $scope.$on("$ionicView.beforeEnter", function() {
      $ionicHistory.clearCache(['landpks.landinfo_site-home'])
      //$ionicHistory.clearHistory();
    });
    /* Translate */
    var LANGUAGE_CONFIG = window.localStorage.getItem('GLOBAL_CONFIG_LANGUAGE')
    $translate.use(LANGUAGE_CONFIG)

    load_message = $translate.instant('landinfo_app.plot_map.loading_message')
    $ionicLoading.show({
      delay:100,
      template: load_message
    })
    window.localStorage.setItem('CURRENT_PAGE_FOR_BACK_BUTTON', 'PLOTS_MAP_PAGE')

    function fAvgLat (JSONArrayPlots) {
      var sumLat = 0
      for (var index = 0; index < JSONArrayPlots.length; index++) {
        var latitude = parseFloat(JSONArrayPlots[index].latitude)
        sumLat = sumLat + latitude
      }

      return parseFloat(sumLat / JSONArrayPlots.length)
    }

    function fAvgLong (JSONArrayPlots) {
      var sumLong = 0
      for (var index = 0; index < JSONArrayPlots.length; index++) {
        var longitude = parseFloat(JSONArrayPlots[index].longitude)
        sumLong = sumLong + longitude
      }

      return parseFloat(sumLong / JSONArrayPlots.length)
    }

    function isPlotInCloud (plot) {
      if (plot.id === null || plot.id === '' || plot.id === 'null' || plot.id === 'undefined' || plot.isActived == true) {
        return false
      } else {
        return true
      }
    }
    $scope.viewPlotResult = function(plot) {
      $scope.selectedPlot = plot
      if (isPlotInCloud(plot) == true) {
        Scopes.store('ListPlotsCtrl_Scope', $scope)
        window.localStorage.setItem('PREVIOUS_PAGE', 'LIST_PLOT_PAGE')
        window.localStorage.setItem('current_view_plot', JSON.stringify(plot))
        $ionicHistory.nextViewOptions({
          disableBack: true
        });
        $state.go('landpks.landinfo_site-home')
      } else {
        if (!isEmpty(plot.status) && (plot.status === 'CREATED' || plot.status === 'NOT_SYNCHRONIZED')) {
           window.localStorage.setItem('current_edit_plot', JSON.stringify(plot))
           window.localStorage.setItem('PREVIOUS_PAGE', 'LIST_PLOT_PAGE')
           window.localStorage.setItem('PREVIOUS_PAGE_CONNECT', 'LANDINFO_LIST_PLOT_PAGE')
           $state.go('landpks.landinfo_results_section_pending_upload')
        } else {
           window.localStorage.setItem('current_edit_plot', JSON.stringify(plot))
           window.localStorage.setItem('PREVIOUS_PAGE', 'LIST_PLOT_PAGE')
           window.localStorage.setItem('PREVIOUS_PAGE_CONNECT', 'LANDINFO_LIST_PLOT_PAGE')
           $state.go('landpks.landinfo_newplot')
        }
      }

    };
    $scope.init = function () {

      function setMapSize(){
        var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        document.getElementById('map').style.height = h - 45;
        document.getElementById('map').style.width = w;
      }

      setMapSize();
      function bindInfoWindow (marker, map, infoWindow, html) {
        google.maps.event.addListener(marker, 'click', function () {
          infoWindow.setContent(html)
          infoWindow.open(map, marker)
          map.setCenter(marker.getPosition());
        })

        google.maps.event.addListener(map, 'click', function (event) {
          infoWindow.close()
        })

        google.maps.event.addDomListener(window, 'resize', function() {
          setMapSize();
        });
      }

      function getLandCoverIcon (cover) {
        switch (cover) {
          case 'tree cover, >25% canopy': // land_use_cover_fragment_land_cover_1
            return 'landinfo_media/landcover_images/ic_tree_selected.png'

          case 'shrub cover, >50% cover': // land_use_cover_fragment_land_cover_2
            return 'landinfo_media/landcover_images/ic_shrub_selected.png'

          case 'grassland, >50% grass': // land_use_cover_fragment_land_cover_3
            return 'landinfo_media/landcover_images/ic_grass_land_selected.png'

          case 'savanna, 10-20% tree cover': // land_use_cover_fragment_land_cover_4
            return 'landinfo_media/landcover_images/ic_savanna_selected.png'

          case 'garden/mixed': // land_use_cover_fragment_land_cover_5
            return 'landinfo_media/landcover_images/ic_garden_mixed_selected.png'

          case 'cropland': // land_use_cover_fragment_land_cover_6
            return 'landinfo_media/landcover_images/ic_cropland_selected.png'

          case 'developed': // land_use_cover_fragment_land_cover_7
            return 'landinfo_media/landcover_images/ic_developed_selected.png'

          case 'barren, <5% veg cover': // land_use_cover_fragment_land_cover_8
            return 'landinfo_media/landcover_images/ic_barren_selected.png'

          case 'water': // land_use_cover_fragment_land_cover_9
            return 'landinfo_media/landcover_images/ic_water_selected.png'

          default: // unknown
            return 'landinfo_media/landcover_images/ic_unknown.png'
        }
      }
      var onSuccess = function (position) {
        /* Pin current location on Map display - different icon/color - center map on this location */
        var currentLat = position.coords.latitude
        var currentLong = position.coords.longitude
        var myLatLong
        if (window.cordova) {
          myLatlng = new google.maps.LatLng(currentLat, currentLong)
        } else {
          myLatlng = new google.maps.LatLng(currentLat, currentLong)
        }
        var mapOptions = {}

        mapOptions = {
              center: myLatlng,
              zoom: 10,
              mapTypeId: google.maps.MapTypeId.TERRAIN,
              mapTypeControl: true,
              mapTypeControlOptions: {
                  style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                  position: google.maps.ControlPosition.TOP_CENTER
              },
              zoomControl: true,
              zoomControlOptions: {
                      position: google.maps.ControlPosition.LEFT_TOP
              },
        }

        var map = new google.maps.Map(document.getElementById('map'),
          mapOptions)
        var infowindow = new google.maps.InfoWindow
        var currentHtml = '<b>' + $translate.instant('landinfo_app.plot_map.current_location') +'</b>' +
          '<br/>' + $translate.instant('landinfo_common.latitude') + ': ' + parseFloat(currentLat).toFixed(5) +
          '<br/>' + $translate.instant('landinfo_common.longitude') + ': ' + parseFloat(currentLong).toFixed(5)
        var currentLocation = {lat: currentLat, lng: currentLong};
        var image = {
            url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png", // url
            scaledSize: new google.maps.Size(52, 52), // scaled size
        };

        var marker = new google.maps.Marker({
          position: currentLocation,
          map: map,
          icon:image,
          title: 'Current Location'
        })
        bindInfoWindow(marker, map, infowindow, currentHtml)

        /* Pin landinfo plots in list in Map */
        var email = window.localStorage.getItem('current_email')
        var LIST_PLOTS = JSON.parse(window.localStorage.getItem(email + '_' + 'LIST_LANDINFO_PLOTS'))
        $ionicLoading.hide()
        if (!isEmpty(LIST_PLOTS) && LIST_PLOTS.length > 0){
          for (var index = 0; index < LIST_PLOTS.length; index++) {
              var plot = LIST_PLOTS[index]
              // if (isPlotInCloud(plot) && (plot.test_plot === "FALSE" || plot.test_plot === "false" || plot.test_plot == false)){
              if (isPlotInCloud(plot)) {
                var name = plot.name
                var recorder_name = plot.recorder_name
                var lat = plot.latitude
                var lng = plot.longitude

                var slope = plot.slope
                var slope_shape = plot.slope_shape
                var land_cover = plot.land_cover
                var grazed = plot.grazed
                var flooding = plot.flooding
                var surface_cracking = plot.surface_cracking
                var surface_salt = plot.surface_salt

                var texture_for_soil_horizon_1 = plot.texture.soil_horizon_1
                var texture_for_soil_horizon_2 = plot.texture.soil_horizon_2
                var texture_for_soil_horizon_3 = plot.texture.soil_horizon_3
                var texture_for_soil_horizon_4 = plot.texture.soil_horizon_4
                var texture_for_soil_horizon_5 = plot.texture.soil_horizon_5
                var texture_for_soil_horizon_6 = plot.texture.soil_horizon_6
                var texture_for_soil_horizon_7 = plot.texture.soil_horizon_7

                var rock_fragment_for_soil_horizon_1 = plot.rock_fragment.soil_horizon_1
                var rock_fragment_for_soil_horizon_2 = plot.rock_fragment.soil_horizon_2
                var rock_fragment_for_soil_horizon_3 = plot.rock_fragment.soil_horizon_3
                var rock_fragment_for_soil_horizon_4 = plot.rock_fragment.soil_horizon_4
                var rock_fragment_for_soil_horizon_5 = plot.rock_fragment.soil_horizon_5
                var rock_fragment_for_soil_horizon_6 = plot.rock_fragment.soil_horizon_6
                var rock_fragment_for_soil_horizon_7 = plot.rock_fragment.soil_horizon_7

                var elevation
                if (!isEmpty(plot.geospatial_data)) {
                  if (!isEmpty(plot.geospatial_data.gdal_elevation)) {
                    elevation = parseFloat(plot.geospatial_data.gdal_elevation).toFixed(0)
                  } else {
                    elevation = ''
                  }
                } else {
                  elevation = ''
                }

                var avg_annual_precipitation
                if (!isEmpty(plot.climate)) {
                  if (!isEmpty(plot.climate.precipitation)) {
                    if (!isEmpty(plot.climate.precipitation.annual)) {
                      avg_annual_precipitation = parseFloat(plot.climate.precipitation.annual).toFixed(0)
                    } else {
                      avg_annual_precipitation = ''
                    }
                  } else {
                    avg_annual_precipitation = ''
                  }
                } else {
                  avg_annual_precipitation = ''
                }

                var fao_lgp
                if (!isEmpty(plot.geospatial_data)) {
                  if (!isEmpty(plot.geospatial_data.gdal_fao_lgp)) {
                    fao_lgp = plot.geospatial_data.gdal_fao_lgp
                  } else {
                    fao_lgp = ''
                  }
                } else {
                  fao_lgp = ''
                }

                var aridity_index = ''
                if (!isEmpty(plot.geospatial_data)) {
                  if (!isEmpty(plot.geospatial_data.gdal_aridity_index)) {
                    aridity_index = parseFloat(plot.geospatial_data.gdal_aridity_index).toFixed(4)
                  } else {
                    aridity_index = ''
                  }
                } else {
                  aridity_index = ''
                }

                var awc = ''

                if (!isEmpty(plot.analytic_data_soil)) {
                  if (!isEmpty(plot.analytic_data_soil.awc_soil_profile_awc)) {
                    awc = parseFloat(plot.analytic_data_soil.awc_soil_profile_awc).toFixed(4)
                  } else {
                    awc = ''
                  }
                } else {
                  awc = ''
                }
                var point = new google.maps.LatLng(
                  parseFloat(lat),
                  parseFloat(lng)
                )

                //check to see if config is metric or imperial
                var METRIC_CONFIG = window.localStorage.getItem('GLOBAL_CONFIG_METRICS_UNITS')
                if (METRIC_CONFIG === ENGLISH_METRIC_STANDARD){
                  if (elevation != ''){
                    elevation = parseFloat(convertUStoEN(elevation,UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,METRIC_METERS,METRIC_FEET)).toFixed(2)
                  }
                  if (avg_annual_precipitation != ''){
                    avg_annual_precipitation = parseFloat(convertUStoEN(avg_annual_precipitation/10,UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,METRIC_CENTIMES,METRIC_INCHES)).toFixed(2)
                  }
                  if (awc != ''){
                    awc = parseFloat(convertUStoEN(awc,UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,METRIC_CENTIMES,METRIC_INCHES)).toFixed(4)
                  }
                  var contentString = "<div><b>"+$translate.instant('landinfo_common.name')+": </b>" + getRealPlotName(recorder_name, name) +
                  "<br/><b>"+$translate.instant('landinfo_common.latitude')+": </b>" + parseFloat(lat).toFixed(5) +
                  "<br/><b>"+$translate.instant('landinfo_common.longitude')+": </b>"  + parseFloat(lng).toFixed(5) +
                  "<br/><b>"+$translate.instant('landinfo_app.plot_map.elevation')+" (ft): </b>"  + elevation +
                  "<br/><b>"+$translate.instant('landinfo_app.plot_map.avg_annual_precip')+" (in): </b>" + avg_annual_precipitation +
                  "<br/><b>"+$translate.instant('landinfo_app.plot_map.fao') + ": </b>" + fao_lgp +
                  "<br/><b>"+$translate.instant('landinfo_app.plot_map.aridity')+": </b>" + aridity_index +
                  "<br/><b>"+$translate.instant('landinfo_app.plot_map.awc')+" (in): </b>" + awc +
                  "<br/><button class='button button-icon icon ion-document-text' style='color:green' ng-click='viewPlotResult(" + JSON.stringify(plot) + ")'> "+$translate.instant('landinfo_app.plot_map.btn_view')+"</button></div>";

                } else {
                  var contentString = "<div><b>" + $translate.instant('landinfo_common.name') + ": </b>" + getRealPlotName(recorder_name, name) +
                  "<br/><b>"+$translate.instant('landinfo_common.latitude')+": </b>" + parseFloat(lat).toFixed(5) +
                  "<br/><b>"+$translate.instant('landinfo_common.longitude')+": </b>"  + parseFloat(lng).toFixed(5) +
                  "<br/><b>"+$translate.instant('landinfo_app.plot_map.elevation')+" (m): </b>"  + elevation +
                  "<br/><b>"+$translate.instant('landinfo_app.plot_map.avg_annual_precip')+" (mm): </b>" + avg_annual_precipitation +
                  "<br/><b>"+$translate.instant('landinfo_app.plot_map.fao')+": </b>" + fao_lgp +
                  "<br/><b>"+$translate.instant('landinfo_app.plot_map.aridity')+": </b>" + aridity_index +
                  "<br/><b>"+$translate.instant('landinfo_app.plot_map.awc')+" (cm): </b>" + awc +
                  "<br/><button class='button button-icon icon ion-document-text' style='color:green' ng-click='viewPlotResult(" + JSON.stringify(plot) + ")'> "+$translate.instant('landinfo_app.plot_map.btn_view')+"</button></div>";
                }

                  var compiled = $compile(contentString)($scope);
                  var marker = new google.maps.Marker({
                  position: point,
                  map: map,
                  title: 'LandInfo Plots Map'
                })
                bindInfoWindow(marker, map, infowindow, compiled[0])
              }
          }
        }
        $ionicLoading.hide()
        //seeToast2("Latitude : " + position.coords.latitude + "<br/> Longitude : " +position.coords.longitude+ "<br/> Accuracy : " +position.coords.accuracy +"m", 4000)
        seeToast2($translate.instant('landinfo_common.latitude') + " : " + position.coords.latitude.toFixed(5) + "<br/> " + $translate.instant('landinfo_common.longitude') + " : " +position.coords.longitude.toFixed(5))
      }
      function onError (error) {
        console.log("********GEO ERROR*********")
        console.log(error.code + ':' + error.message)
        if (error.message.indexOf('Only secure origins are allowed') == 0
            || error.message.indexOf('User denied Geolocation') == 0
            || error.message.indexOf('Origin does not have permission to use Geolocation service') == 0
            || error.message.indexOf('Network location provider') == 0) {
            var newMethodResponse = getLocationService_basedOn_IP()
            var myLatlng
            var currentLat
            var currentLong
            if (isEmpty(newMethodResponse)){
              if (window.cordova) {
                myLatlng = new google.maps.LatLng(-25.027830, 65.447186)
              } else {
                myLatlng = new google.maps.LatLng(-25.027830, 38.447186)
              }
            } else {
              currentLat = newMethodResponse.lat
              currentLong = newMethodResponse.lon
              if (window.cordova) {
                myLatlng = new google.maps.LatLng(currentLat, currentLong)
              } else {
                myLatlng = new google.maps.LatLng(currentLat, currentLong)
              }
            }
            mapOptions = {
                  center: myLatlng,
                  zoom: 4,
                  mapTypeId: google.maps.MapTypeId.ROADMAP,
                  mapTypeControl: true,
                  mapTypeControlOptions: {
                      style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                      position: google.maps.ControlPosition.TOP_CENTER
                  },
                  zoomControl: true,
                  zoomControlOptions: {
                          position: google.maps.ControlPosition.LEFT_TOP
                  },
            }
            var map = new google.maps.Map(document.getElementById('map'),
              mapOptions)
            var infowindow = new google.maps.InfoWindow
            if (!isEmpty(newMethodResponse)){
                var currentHtml = '<b>Current Location</b>' +
                  '<br/>Latitude: ' + parseFloat(currentLat).toFixed(5) +
                  '<br/>Longitude: ' + parseFloat(currentLong).toFixed(5)
                var currentLocation = {lat: currentLat, lng: currentLong};
                var image = {
                    url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png", // url
                    scaledSize: new google.maps.Size(52, 52), // scaled size
                };

                var marker = new google.maps.Marker({
                  position: currentLocation,
                  map: map,
                  icon:image,
                  title: 'Current Locaion'
                })
                bindInfoWindow(marker, map, infowindow, currentHtml)
            }
            /* Pin landinfo plots in list in Map */
            var email = window.localStorage.getItem('current_email')
            var LIST_PLOTS = JSON.parse(window.localStorage.getItem(email + '_' + 'LIST_LANDINFO_PLOTS'))
            $ionicLoading.hide()
            if (!isEmpty(LIST_PLOTS) && LIST_PLOTS.length > 0){
              for (var index = 0; index < LIST_PLOTS.length; index++) {
              var plot = LIST_PLOTS[index]
              // if (isPlotInCloud(plot) && (plot.test_plot === "FALSE" || plot.test_plot === "false" || plot.test_plot == false)){
              if (isPlotInCloud(plot)) {
                var name = plot.name
                var recorder_name = plot.recorder_name
                var lat = plot.latitude
                var lng = plot.longitude

                var slope = plot.slope
                var slope_shape = plot.slope_shape
                var land_cover = plot.land_cover
                var grazed = plot.grazed
                var flooding = plot.flooding
                var surface_cracking = plot.surface_cracking
                var surface_salt = plot.surface_salt

                var texture_for_soil_horizon_1 = plot.texture.soil_horizon_1
                var texture_for_soil_horizon_2 = plot.texture.soil_horizon_2
                var texture_for_soil_horizon_3 = plot.texture.soil_horizon_3
                var texture_for_soil_horizon_4 = plot.texture.soil_horizon_4
                var texture_for_soil_horizon_5 = plot.texture.soil_horizon_5
                var texture_for_soil_horizon_6 = plot.texture.soil_horizon_6
                var texture_for_soil_horizon_7 = plot.texture.soil_horizon_7

                var rock_fragment_for_soil_horizon_1 = plot.rock_fragment.soil_horizon_1
                var rock_fragment_for_soil_horizon_2 = plot.rock_fragment.soil_horizon_2
                var rock_fragment_for_soil_horizon_3 = plot.rock_fragment.soil_horizon_3
                var rock_fragment_for_soil_horizon_4 = plot.rock_fragment.soil_horizon_4
                var rock_fragment_for_soil_horizon_5 = plot.rock_fragment.soil_horizon_5
                var rock_fragment_for_soil_horizon_6 = plot.rock_fragment.soil_horizon_6
                var rock_fragment_for_soil_horizon_7 = plot.rock_fragment.soil_horizon_7

                var elevation
                if (!isEmpty(plot.geospatial_data)) {
                  if (!isEmpty(plot.geospatial_data.gdal_elevation)) {
                    elevation = parseFloat(plot.geospatial_data.gdal_elevation).toFixed(0)
                  } else {
                    elevation = ''
                  }
                } else {
                  elevation = ''
                }

                var avg_annual_precipitation
                if (!isEmpty(plot.climate)) {
                  if (!isEmpty(plot.climate.precipitation)) {
                    if (!isEmpty(plot.climate.precipitation.annual)) {
                      avg_annual_precipitation = parseFloat(plot.climate.precipitation.annual).toFixed(0)
                    } else {
                      avg_annual_precipitation = ''
                    }
                  } else {
                    avg_annual_precipitation = ''
                  }
                } else {
                  avg_annual_precipitation = ''
                }

                var fao_lgp
                if (!isEmpty(plot.geospatial_data)) {
                  if (!isEmpty(plot.geospatial_data.gdal_fao_lgp)) {
                    fao_lgp = plot.geospatial_data.gdal_fao_lgp
                  } else {
                    fao_lgp = ''
                  }
                } else {
                  fao_lgp = ''
                }

                var aridity_index = ''
                if (!isEmpty(plot.geospatial_data)) {
                  if (!isEmpty(plot.geospatial_data.gdal_aridity_index)) {
                    aridity_index = parseFloat(plot.geospatial_data.gdal_aridity_index).toFixed(4)
                  } else {
                    aridity_index = ''
                  }
                } else {
                  aridity_index = ''
                }

                var awc = ''

                if (!isEmpty(plot.analytic_data_soil)) {
                  if (!isEmpty(plot.analytic_data_soil.awc_soil_profile_awc)) {
                    awc = parseFloat(plot.analytic_data_soil.awc_soil_profile_awc).toFixed(4)
                  } else {
                    awc = ''
                  }
                } else {
                  awc = ''
                }
                var point = new google.maps.LatLng(
                  parseFloat(lat),
                  parseFloat(lng)
                )
                //check to see if config is metric or imperial
                var METRIC_CONFIG = window.localStorage.getItem('GLOBAL_CONFIG_METRICS_UNITS')
                if (METRIC_CONFIG === ENGLISH_METRIC_STANDARD){
                  if (elevation != ''){
                    elevation = parseFloat(convertUStoEN(elevation,UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,METRIC_METERS,METRIC_FEET)).toFixed(2)
                  }
                  if (avg_annual_precipitation != ''){
                    avg_annual_precipitation = parseFloat(convertUStoEN(avg_annual_precipitation/10,UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,METRIC_CENTIMES,METRIC_INCHES)).toFixed(2)
                  }
                  if (awc != ''){
                    awc = parseFloat(convertUStoEN(awc,UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,METRIC_CENTIMES,METRIC_INCHES)).toFixed(4)
                  }
                  var html = "<div><b>"+$translate.instant('landinfo_common.name')+": </b>" + getRealPlotName(recorder_name, name) +
                  "<br/><b>"+$translate.instant('landinfo_common.latitude')+": </b>" + parseFloat(lat).toFixed(5) +
                  "<br/><b>"+$translate.instant('landinfo_common.longitude')+": </b>"  + parseFloat(lng).toFixed(5) +
                  "<br/><b>"+$translate.instant('landinfo_app.plot_map.elevation')+" (ft): </b>"  + elevation +
                  "<br/><b>"+$translate.instant('landinfo_app.plot_map.avg_annual_precip')+" (in): </b>" + avg_annual_precipitation +
                  "<br/><b>"+$translate.instant('landinfo_app.plot_map.fao') + ": </b>" + fao_lgp +
                  "<br/><b>"+$translate.instant('landinfo_app.plot_map.aridity')+": </b>" + aridity_index +
                  "<br/><b>"+$translate.instant('landinfo_app.plot_map.awc')+" (in): </b>" + awc +
                  "<br/><button class='button button-icon icon ion-document-text' style='color:green' ng-click='viewPlotResult(" + JSON.stringify(plot) + ")'> "+$translate.instant('landinfo_app.plot_map.btn_view')+"</button></div>";
                } else {
                  var html = "<div><b>" + $translate.instant('landinfo_common.name') + ": </b>" + getRealPlotName(recorder_name, name) +
                  "<br/><b>"+$translate.instant('landinfo_common.latitude')+": </b>" + parseFloat(lat).toFixed(5) +
                  "<br/><b>"+$translate.instant('landinfo_common.longitude')+": </b>"  + parseFloat(lng).toFixed(5) +
                  "<br/><b>"+$translate.instant('landinfo_app.plot_map.elevation')+" (m): </b>"  + elevation +
                  "<br/><b>"+$translate.instant('landinfo_app.plot_map.avg_annual_precip')+" (mm): </b>" + avg_annual_precipitation +
                  "<br/><b>"+$translate.instant('landinfo_app.plot_map.fao')+": </b>" + fao_lgp +
                  "<br/><b>"+$translate.instant('landinfo_app.plot_map.aridity')+": </b>" + aridity_index +
                  "<br/><b>"+$translate.instant('landinfo_app.plot_map.awc')+" (cm): </b>" + awc +
                  "<br/><button class='button button-icon icon ion-document-text' style='color:green' ng-click='viewPlotResult(" + JSON.stringify(plot) + ")'> "+$translate.instant('landinfo_app.plot_map.btn_view')+"</button></div>";
                }

                var marker = new google.maps.Marker({
                  position: point,
                  map: map,
                  title: 'LandInfo Plots Map'
                })
                bindInfoWindow(marker, map, infowindow, html)
              }
            }
            }
            $ionicLoading.hide()
        } else {
            $ionicLoading.hide()
            var infoPopup = $ionicPopup.alert({
                 cssClass: 'remove-title-class',
                 template: 'Cannot show plots map at the moment'
            })
            infoPopup.then(function (res) {
                 infoPopup.close()
            })
        }
      }
      var isIOS = ionic.Platform.isIOS()
      var isAndroid = ionic.Platform.isAndroid()
      if (window.cordova) {
          if (!isIOS && isAndroid){
              cordova.plugins.diagnostic.isLocationEnabled(function(enabled) {
                  console.log("Location is " + (enabled ? "enabled" : "disabled"));
                  if (enabled){
                     navigator.geolocation.getCurrentPosition(onSuccess, onError, LOCATION_SERVICE_OPTION)
                  } else {
                     cordova.plugins.diagnostic.switchToLocationSettings();
                     $ionicLoading.hide()
                     var infoPopup = $ionicPopup.alert({
                        cssClass: 'remove-title-class',
                        template: 'Cannot get Location.  Please try again'
                     })
                      infoPopup.then(function (res) {
                        infoPopup.close()
                        $ionicHistory.clearCache()
                        $state.go('landpks.landinfo_plots')
                      }) 
                  }
              }, function(error) {
                  alert("The following error occurred: " + error);
              });
          } else if (!isAndroid && isIOS){
              navigator.geolocation.getCurrentPosition(onSuccess, onError, LOCATION_SERVICE_OPTION)
          }
      } else {
          navigator.geolocation.getCurrentPosition(onSuccess, onError, LOCATION_SERVICE_OPTION)
      }
      //navigator.geolocation.getCurrentPosition(onSuccess, onError)
    }

    $scope.map = map
    $scope.getClimate = function () {
      $state.go('landpks.landinfo_quick_climate')
    }


  })

  /****************************************/
  /** Quick Climate Ctrl **/
  /****************************************/
  .controller('QuickClimateCtrl', function ($scope, $state, $http, $ionicLoading, $cordovaNetwork, $ionicPopup, $ionicPlatform, $ionicHistory, $controller) {
    $controller('BaseLandInfoController', { $scope: $scope });
    $ionicLoading.show({
      template: 'Fetching climate data for current location...'
    })

    $scope.goBack = function () {
      window.localStorage.setItem('PREVIOUS_PAGE', 'QUICK_CLIMATE_PAGE')
      $state.go('landpks.landinfo_plots')
    }

    var METRIC_CONFIG = window.localStorage.getItem('GLOBAL_CONFIG_METRICS_UNITS')
    $scope.GLOBAL_METRIC_CONFIG = METRIC_CONFIG


    window.localStorage.setItem('CURRENT_PAGE_FOR_BACK_BUTTON', 'QUICK_CLIMATE_PAGE')
    /* Check network */
    if (checkNetConnection() === true) {
      geoLocation()
    } else {
      $ionicLoading.hide()
      var infoPopup = $ionicPopup.alert({
        cssClass: 'remove-title-class',
        template: UNABLE_GET_QUICK_CLIMATE
      })
      infoPopup.then(function (res) {
        infoPopup.close()
        window.localStorage.setItem('PREVIOUS_PAGE', 'QUICK_CLIMATE_PAGE')
        $state.go('landpks.landinfo_plots')
      })
      return
    }

    /* Check network */
    function geoLocation () {
      var onSuccess = function (position) {

        lat = position.coords.latitude
        lon = position.coords.longitude

        var url = LANDPKS_API_ENDPOINT
        $http.get(url, {
          params: {
            action: 'get',
            object: 'climate',
            latitude: lat,
            longitude: lon,
            data_source: 'world_clim',
            version: LANDPKS_API_VERSION
          },
          timeout: HTTP_QUICK_CLIMATE_TIME_OUT
        }).success(function (data) {
          $scope.plots = data
          var plots = $scope.plots

          if (METRIC_CONFIG === UNITED_STATES_METRIC_STANDARD){
            $scope.label_elevation_unit = "m"
            $scope.label_avg_annual_pre_unit = "mm"
            $scope.label_precipication_graph = 'Precipitation (mm)'
            $scope.label_degree = "°C"
          } else if (METRIC_CONFIG === ENGLISH_METRIC_STANDARD){
            var ftGdal_Elevation = parseFloat(convertUStoEN($scope.plots.geospatial_data.gdal_elevation,UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,METRIC_METERS,METRIC_FEET))
            $scope.plots.geospatial_data.gdal_elevation_ft = ftGdal_Elevation.toFixed(0)
            $scope.plots.climate.precipitation.annual_in = parseFloat(convertUStoEN($scope.plots.climate.precipitation.annual/10,UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,METRIC_CENTIMES,METRIC_INCHES))
            $scope.label_precipication_graph = 'Precipitation (in)'
            $scope.label_degree = "°F"
          } else {
            $scope.label_elevation_unit = "m"
            $scope.label_avg_annual_pre_unit = "mm"
            $scope.label_precipication_graph = 'Precipitation (mm)'
            $scope.label_degree = "°C"
          }


          // console.log($scope.plots)
          $scope.labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
          $scope.series = ['Series A']
          $scope.captions = ['Climate']

          if (METRIC_CONFIG === UNITED_STATES_METRIC_STANDARD){
              $scope.data = [
                [plots.climate.precipitation.january.toFixed(0),
                  plots.climate.precipitation.february.toFixed(0),
                  plots.climate.precipitation.march.toFixed(0),
                  plots.climate.precipitation.april.toFixed(0),
                  plots.climate.precipitation.may.toFixed(0),
                  plots.climate.precipitation.june.toFixed(0),
                  plots.climate.precipitation.july.toFixed(0),
                  plots.climate.precipitation.august.toFixed(0),
                  plots.climate.precipitation.september.toFixed(0),
                  plots.climate.precipitation.october.toFixed(0),
                  plots.climate.precipitation.november.toFixed(0),
                  plots.climate.precipitation.december.toFixed(0)],
              ]
          } else if (METRIC_CONFIG === ENGLISH_METRIC_STANDARD){
            $scope.data = [
              [ parseFloat(convertUStoEN(plots.climate.precipitation.january/10,UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,METRIC_CENTIMES,METRIC_INCHES)).toFixed(1),
                parseFloat(convertUStoEN(plots.climate.precipitation.february/10,UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,METRIC_CENTIMES,METRIC_INCHES)).toFixed(1),
                parseFloat(convertUStoEN(plots.climate.precipitation.march/10,UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,METRIC_CENTIMES,METRIC_INCHES)).toFixed(1),
                parseFloat(convertUStoEN(plots.climate.precipitation.april/10,UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,METRIC_CENTIMES,METRIC_INCHES)).toFixed(1),
                parseFloat(convertUStoEN(plots.climate.precipitation.may/10,UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,METRIC_CENTIMES,METRIC_INCHES)).toFixed(1),
                parseFloat(convertUStoEN(plots.climate.precipitation.june/10,UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,METRIC_CENTIMES,METRIC_INCHES)).toFixed(1),
                parseFloat(convertUStoEN(plots.climate.precipitation.july/10,UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,METRIC_CENTIMES,METRIC_INCHES)).toFixed(1),
                parseFloat(convertUStoEN(plots.climate.precipitation.august/10,UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,METRIC_CENTIMES,METRIC_INCHES)).toFixed(1),
                parseFloat(convertUStoEN(plots.climate.precipitation.september/10,UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,METRIC_CENTIMES,METRIC_INCHES)).toFixed(1),
                parseFloat(convertUStoEN(plots.climate.precipitation.october/10,UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,METRIC_CENTIMES,METRIC_INCHES)).toFixed(1),
                parseFloat(convertUStoEN(plots.climate.precipitation.november/10,UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,METRIC_CENTIMES,METRIC_INCHES)).toFixed(1),
                parseFloat(convertUStoEN(plots.climate.precipitation.december/10,UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,METRIC_CENTIMES,METRIC_INCHES)).toFixed(1)],
            ]
          } else {
              $scope.data = [
                [plots.climate.precipitation.january.toFixed(0),
                  plots.climate.precipitation.february.toFixed(0),
                  plots.climate.precipitation.march.toFixed(0),
                  plots.climate.precipitation.april.toFixed(0),
                  plots.climate.precipitation.may.toFixed(0),
                  plots.climate.precipitation.june.toFixed(0),
                  plots.climate.precipitation.july.toFixed(0),
                  plots.climate.precipitation.august.toFixed(0),
                  plots.climate.precipitation.september.toFixed(0),
                  plots.climate.precipitation.october.toFixed(0),
                  plots.climate.precipitation.november.toFixed(0),
                  plots.climate.precipitation.december.toFixed(0)],
              ]
          }

          $scope.names = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
          $scope.number = ['Min Temp', 'Avg Temp', 'Max Temp']
          $scope.linedata = []

          if (METRIC_CONFIG === UNITED_STATES_METRIC_STANDARD){
              $scope.linedata = [
                  [plots.climate.min_temperature.january.toFixed(1),
                   plots.climate.min_temperature.february.toFixed(1),
                   plots.climate.min_temperature.march.toFixed(1),
                   plots.climate.min_temperature.april.toFixed(1),
                   plots.climate.min_temperature.may.toFixed(1),
                   plots.climate.min_temperature.june.toFixed(1),
                   plots.climate.min_temperature.july.toFixed(1),
                   plots.climate.min_temperature.august.toFixed(1),
                   plots.climate.min_temperature.september.toFixed(1),
                   plots.climate.min_temperature.october.toFixed(1),
                   plots.climate.min_temperature.november.toFixed(1),
                   plots.climate.min_temperature.december.toFixed(1)]
                , [plots.climate.average_temperature.january.toFixed(1),
                   plots.climate.average_temperature.february.toFixed(1),
                   plots.climate.average_temperature.march.toFixed(1),
                   plots.climate.average_temperature.april.toFixed(1),
                   plots.climate.average_temperature.may.toFixed(1),
                   plots.climate.average_temperature.june.toFixed(1),
                   plots.climate.average_temperature.july.toFixed(1),
                   plots.climate.average_temperature.august.toFixed(1),
                   plots.climate.average_temperature.september.toFixed(1),
                   plots.climate.average_temperature.october.toFixed(1),
                   plots.climate.average_temperature.november.toFixed(1),
                   plots.climate.average_temperature.december.toFixed(1)]
                , [plots.climate.max_temperature.january.toFixed(1),
                   plots.climate.max_temperature.february.toFixed(1),
                   plots.climate.max_temperature.march.toFixed(1),
                   plots.climate.max_temperature.april.toFixed(1),
                   plots.climate.max_temperature.may.toFixed(1),
                   plots.climate.max_temperature.june.toFixed(1),
                   plots.climate.max_temperature.july.toFixed(1),
                   plots.climate.max_temperature.august.toFixed(1),
                   plots.climate.max_temperature.september.toFixed(1),
                   plots.climate.max_temperature.october.toFixed(1),
                   plots.climate.max_temperature.november.toFixed(1),
                   plots.climate.max_temperature.december.toFixed(1)]
              ]
          } else if (METRIC_CONFIG === ENGLISH_METRIC_STANDARD) {
            $scope.linedata = [
                [parseFloat(convertUStoEN(plots.climate.min_temperature.january.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                 parseFloat(convertUStoEN(plots.climate.min_temperature.february.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                 parseFloat(convertUStoEN(plots.climate.min_temperature.march.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                 parseFloat(convertUStoEN(plots.climate.min_temperature.april.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                 parseFloat(convertUStoEN(plots.climate.min_temperature.may.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                 parseFloat(convertUStoEN(plots.climate.min_temperature.june.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                 parseFloat(convertUStoEN(plots.climate.min_temperature.july.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                 parseFloat(convertUStoEN(plots.climate.min_temperature.august.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                 parseFloat(convertUStoEN(plots.climate.min_temperature.september.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                 parseFloat(convertUStoEN(plots.climate.min_temperature.october.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                 parseFloat(convertUStoEN(plots.climate.min_temperature.november.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                 parseFloat(convertUStoEN(plots.climate.min_temperature.december.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1)]
              , [parseFloat(convertUStoEN(plots.climate.average_temperature.january.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                 parseFloat(convertUStoEN(plots.climate.average_temperature.february.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                 parseFloat(convertUStoEN(plots.climate.average_temperature.march.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                 parseFloat(convertUStoEN(plots.climate.average_temperature.april.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                 parseFloat(convertUStoEN(plots.climate.average_temperature.may.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                 parseFloat(convertUStoEN(plots.climate.average_temperature.june.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                 parseFloat(convertUStoEN(plots.climate.average_temperature.july.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                 parseFloat(convertUStoEN(plots.climate.average_temperature.august.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                 parseFloat(convertUStoEN(plots.climate.average_temperature.september.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                 parseFloat(convertUStoEN(plots.climate.average_temperature.october.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                 parseFloat(convertUStoEN(plots.climate.average_temperature.november.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                 parseFloat(convertUStoEN(plots.climate.average_temperature.december.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1)]
              , [parseFloat(convertUStoEN(plots.climate.max_temperature.january.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                 parseFloat(convertUStoEN(plots.climate.max_temperature.february.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                 parseFloat(convertUStoEN(plots.climate.max_temperature.march.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                 parseFloat(convertUStoEN(plots.climate.max_temperature.april.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                 parseFloat(convertUStoEN(plots.climate.max_temperature.may.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                 parseFloat(convertUStoEN(plots.climate.max_temperature.june.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                 parseFloat(convertUStoEN(plots.climate.max_temperature.july.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                 parseFloat(convertUStoEN(plots.climate.max_temperature.august.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                 parseFloat(convertUStoEN(plots.climate.max_temperature.september.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                 parseFloat(convertUStoEN(plots.climate.max_temperature.october.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                 parseFloat(convertUStoEN(plots.climate.max_temperature.november.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                 parseFloat(convertUStoEN(plots.climate.max_temperature.december.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1)]
            ]
          } else {
              $scope.linedata = [
                [plots.climate.min_temperature.january.toFixed(1),
                 plots.climate.min_temperature.february.toFixed(1),
                 plots.climate.min_temperature.march.toFixed(1),
                 plots.climate.min_temperature.april.toFixed(1),
                 plots.climate.min_temperature.may.toFixed(1),
                 plots.climate.min_temperature.june.toFixed(1),
                 plots.climate.min_temperature.july.toFixed(1),
                 plots.climate.min_temperature.august.toFixed(1),
                 plots.climate.min_temperature.september.toFixed(1),
                 plots.climate.min_temperature.october.toFixed(1),
                 plots.climate.min_temperature.november.toFixed(1),
                 plots.climate.min_temperature.december.toFixed(1)]
              , [plots.climate.average_temperature.january.toFixed(1),
                 plots.climate.average_temperature.february.toFixed(1),
                 plots.climate.average_temperature.march.toFixed(1),
                 plots.climate.average_temperature.april.toFixed(1),
                 plots.climate.average_temperature.may.toFixed(1),
                 plots.climate.average_temperature.june.toFixed(1),
                 plots.climate.average_temperature.july.toFixed(1),
                 plots.climate.average_temperature.august.toFixed(1),
                 plots.climate.average_temperature.september.toFixed(1),
                 plots.climate.average_temperature.october.toFixed(1),
                 plots.climate.average_temperature.november.toFixed(1),
                 plots.climate.average_temperature.december.toFixed(1)]
              , [plots.climate.max_temperature.january.toFixed(1),
                 plots.climate.max_temperature.february.toFixed(1),
                 plots.climate.max_temperature.march.toFixed(1),
                 plots.climate.max_temperature.april.toFixed(1),
                 plots.climate.max_temperature.may.toFixed(1),
                 plots.climate.max_temperature.june.toFixed(1),
                 plots.climate.max_temperature.july.toFixed(1),
                 plots.climate.max_temperature.august.toFixed(1),
                 plots.climate.max_temperature.september.toFixed(1),
                 plots.climate.max_temperature.october.toFixed(1),
                 plots.climate.max_temperature.november.toFixed(1),
                 plots.climate.max_temperature.december.toFixed(1)]
            ]
          }

          $scope.temp_line_options = {
            animation: false,
            datasetFill: false,
            datasetStrokeWidth: 3,
            multiTooltipTemplate: function(obj) {
              if (METRIC_CONFIG === UNITED_STATES_METRIC_STANDARD){
                  return obj.label + ': ' + obj.value + ' °C';
              } else if (METRIC_CONFIG === ENGLISH_METRIC_STANDARD){
                  return obj.label + ': ' + obj.value + ' °F';
              } else {
                  return obj.label + ': ' + obj.value + ' °C';
              }

            }
          }

          $scope.precip_bar_options = {
            animation: false,
            tooltipTemplate: function(obj) {
              if (METRIC_CONFIG === UNITED_STATES_METRIC_STANDARD){
                return obj.label + ': ' + obj.value + ' mm';
              } else if (METRIC_CONFIG === ENGLISH_METRIC_STANDARD){
                return obj.label + ': ' + obj.value + ' in';
              } else {
                return obj.label + ': ' + obj.value + ' mm';
              }
            }
          }
          $scope.precip_bar_colors = [{fillColor: ['#97bbcd'], strokeColor: ['#000']}]

          $ionicLoading.hide()
          $scope.onClick = function (points, evt) {
            console.log(points, evt)
          }
        }).error(function (err) {
          $ionicLoading.hide()
          var infoPopup = $ionicPopup.alert({
            cssClass: 'remove-title-class',
            template: UNABLE_GET_QUICK_CLIMATE
          })
          infoPopup.then(function (res) {
            infoPopup.close()
            $state.go('landpks.landinfo_plots')
          })
          return
        })
      }

      function onError (error) {
        //console.log(error.message)
        if (error.message.indexOf('Only secure origins are allowed') == 0
            || error.message.indexOf('Origin does not have permission to use Geolocation service') == 0
             || error.message.indexOf('Network location provider') == 0
             || error.message.indexOf('User denied Geolocation') == 0 ) {
          var newMethodResponse = getLocationService_basedOn_IP()

          if (isEmpty(newMethodResponse)){
            $ionicLoading.hide()
            var infoPopup = $ionicPopup.alert({
              cssClass: 'remove-title-class',
              template: UNABLE_GET_QUICK_CLIMATE
            })
            infoPopup.then(function (res) {
              infoPopup.close()
              $state.go('landpks.landinfo_plots')
            })
          }
          /*
          $ionicLoading.show({
            template: 'Fetching climate data for current location...'
          })
          */
          var url = LANDPKS_API_ENDPOINT
          $http.get(url, {
            params: {
              action: 'get',
              object: 'climate',
              latitude: newMethodResponse.lat,
              longitude: newMethodResponse.lon,
              data_source: 'world_clim',
              version: LANDPKS_API_VERSION
            },
            timeout: HTTP_QUICK_CLIMATE_TIME_OUT
          }).success(function (data) {
            $scope.plots = data
            var plots = $scope.plots

            if (METRIC_CONFIG === UNITED_STATES_METRIC_STANDARD){
              $scope.label_elevation_unit = "m"
              $scope.label_avg_annual_pre_unit = "mm"
              $scope.label_precipication_graph = 'Precipitation (mm)'
              $scope.label_degree = "°C"
            } else if (METRIC_CONFIG === ENGLISH_METRIC_STANDARD){
              var ftGdal_Elevation = parseFloat(convertUStoEN($scope.plots.geospatial_data.gdal_elevation,UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,METRIC_METERS,METRIC_FEET))
              $scope.plots.geospatial_data.gdal_elevation_ft = ftGdal_Elevation.toFixed(0)
              $scope.plots.climate.precipitation.annual_in = parseFloat(convertUStoEN($scope.plots.climate.precipitation.annual/10,UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,METRIC_CENTIMES,METRIC_INCHES))
              $scope.label_precipication_graph = 'Precipitation (in)'
              $scope.label_degree = "°F"
            } else {
              $scope.label_elevation_unit = "m"
              $scope.label_avg_annual_pre_unit = "mm"
              $scope.label_precipication_graph = 'Precipitation (mm)'
              $scope.label_degree = "°C"
            }

            $scope.labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            $scope.series = ['Series A']
            $scope.captions = ['Climate']

            if (METRIC_CONFIG === UNITED_STATES_METRIC_STANDARD){
                $scope.data = [
                  [plots.climate.precipitation.january.toFixed(0),
                    plots.climate.precipitation.february.toFixed(0),
                    plots.climate.precipitation.march.toFixed(0),
                    plots.climate.precipitation.april.toFixed(0),
                    plots.climate.precipitation.may.toFixed(0),
                    plots.climate.precipitation.june.toFixed(0),
                    plots.climate.precipitation.july.toFixed(0),
                    plots.climate.precipitation.august.toFixed(0),
                    plots.climate.precipitation.september.toFixed(0),
                    plots.climate.precipitation.october.toFixed(0),
                    plots.climate.precipitation.november.toFixed(0),
                    plots.climate.precipitation.december.toFixed(0)],
                ]
            } else if (METRIC_CONFIG === ENGLISH_METRIC_STANDARD){
              $scope.data = [
                [ parseFloat(convertUStoEN(plots.climate.precipitation.january/10,UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,METRIC_CENTIMES,METRIC_INCHES)).toFixed(1),
                  parseFloat(convertUStoEN(plots.climate.precipitation.february/10,UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,METRIC_CENTIMES,METRIC_INCHES)).toFixed(1),
                  parseFloat(convertUStoEN(plots.climate.precipitation.march/10,UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,METRIC_CENTIMES,METRIC_INCHES)).toFixed(1),
                  parseFloat(convertUStoEN(plots.climate.precipitation.april/10,UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,METRIC_CENTIMES,METRIC_INCHES)).toFixed(1),
                  parseFloat(convertUStoEN(plots.climate.precipitation.may/10,UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,METRIC_CENTIMES,METRIC_INCHES)).toFixed(1),
                  parseFloat(convertUStoEN(plots.climate.precipitation.june/10,UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,METRIC_CENTIMES,METRIC_INCHES)).toFixed(1),
                  parseFloat(convertUStoEN(plots.climate.precipitation.july/10,UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,METRIC_CENTIMES,METRIC_INCHES)).toFixed(1),
                  parseFloat(convertUStoEN(plots.climate.precipitation.august/10,UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,METRIC_CENTIMES,METRIC_INCHES)).toFixed(1),
                  parseFloat(convertUStoEN(plots.climate.precipitation.september/10,UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,METRIC_CENTIMES,METRIC_INCHES)).toFixed(1),
                  parseFloat(convertUStoEN(plots.climate.precipitation.october/10,UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,METRIC_CENTIMES,METRIC_INCHES)).toFixed(1),
                  parseFloat(convertUStoEN(plots.climate.precipitation.november/10,UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,METRIC_CENTIMES,METRIC_INCHES)).toFixed(1),
                  parseFloat(convertUStoEN(plots.climate.precipitation.december/10,UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,METRIC_CENTIMES,METRIC_INCHES)).toFixed(1)],
              ]
            } else {
                $scope.data = [
                  [plots.climate.precipitation.january.toFixed(0),
                    plots.climate.precipitation.february.toFixed(0),
                    plots.climate.precipitation.march.toFixed(0),
                    plots.climate.precipitation.april.toFixed(0),
                    plots.climate.precipitation.may.toFixed(0),
                    plots.climate.precipitation.june.toFixed(0),
                    plots.climate.precipitation.july.toFixed(0),
                    plots.climate.precipitation.august.toFixed(0),
                    plots.climate.precipitation.september.toFixed(0),
                    plots.climate.precipitation.october.toFixed(0),
                    plots.climate.precipitation.november.toFixed(0),
                    plots.climate.precipitation.december.toFixed(0)],
                ]
            }

            $scope.names = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            $scope.number = ['Min Temp', 'Avg Temp', 'Max Temp']

            $scope.linedata = []

            if (METRIC_CONFIG === UNITED_STATES_METRIC_STANDARD){
                $scope.linedata = [
                    [plots.climate.min_temperature.january.toFixed(1),
                     plots.climate.min_temperature.february.toFixed(1),
                     plots.climate.min_temperature.march.toFixed(1),
                     plots.climate.min_temperature.april.toFixed(1),
                     plots.climate.min_temperature.may.toFixed(1),
                     plots.climate.min_temperature.june.toFixed(1),
                     plots.climate.min_temperature.july.toFixed(1),
                     plots.climate.min_temperature.august.toFixed(1),
                     plots.climate.min_temperature.september.toFixed(1),
                     plots.climate.min_temperature.october.toFixed(1),
                     plots.climate.min_temperature.november.toFixed(1),
                     plots.climate.min_temperature.december.toFixed(1)]
                  , [plots.climate.average_temperature.january.toFixed(1),
                     plots.climate.average_temperature.february.toFixed(1),
                     plots.climate.average_temperature.march.toFixed(1),
                     plots.climate.average_temperature.april.toFixed(1),
                     plots.climate.average_temperature.may.toFixed(1),
                     plots.climate.average_temperature.june.toFixed(1),
                     plots.climate.average_temperature.july.toFixed(1),
                     plots.climate.average_temperature.august.toFixed(1),
                     plots.climate.average_temperature.september.toFixed(1),
                     plots.climate.average_temperature.october.toFixed(1),
                     plots.climate.average_temperature.november.toFixed(1),
                     plots.climate.average_temperature.december.toFixed(1)]
                  , [plots.climate.max_temperature.january.toFixed(1),
                     plots.climate.max_temperature.february.toFixed(1),
                     plots.climate.max_temperature.march.toFixed(1),
                     plots.climate.max_temperature.april.toFixed(1),
                     plots.climate.max_temperature.may.toFixed(1),
                     plots.climate.max_temperature.june.toFixed(1),
                     plots.climate.max_temperature.july.toFixed(1),
                     plots.climate.max_temperature.august.toFixed(1),
                     plots.climate.max_temperature.september.toFixed(1),
                     plots.climate.max_temperature.october.toFixed(1),
                     plots.climate.max_temperature.november.toFixed(1),
                     plots.climate.max_temperature.december.toFixed(1)]
                ]
            } else if (METRIC_CONFIG === ENGLISH_METRIC_STANDARD) {
              $scope.linedata = [
                  [parseFloat(convertUStoEN(plots.climate.min_temperature.january.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                   parseFloat(convertUStoEN(plots.climate.min_temperature.february.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                   parseFloat(convertUStoEN(plots.climate.min_temperature.march.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                   parseFloat(convertUStoEN(plots.climate.min_temperature.april.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                   parseFloat(convertUStoEN(plots.climate.min_temperature.may.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                   parseFloat(convertUStoEN(plots.climate.min_temperature.june.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                   parseFloat(convertUStoEN(plots.climate.min_temperature.july.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                   parseFloat(convertUStoEN(plots.climate.min_temperature.august.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                   parseFloat(convertUStoEN(plots.climate.min_temperature.september.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                   parseFloat(convertUStoEN(plots.climate.min_temperature.october.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                   parseFloat(convertUStoEN(plots.climate.min_temperature.november.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                   parseFloat(convertUStoEN(plots.climate.min_temperature.december.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1)]
                , [parseFloat(convertUStoEN(plots.climate.average_temperature.january.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                   parseFloat(convertUStoEN(plots.climate.average_temperature.february.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                   parseFloat(convertUStoEN(plots.climate.average_temperature.march.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                   parseFloat(convertUStoEN(plots.climate.average_temperature.april.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                   parseFloat(convertUStoEN(plots.climate.average_temperature.may.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                   parseFloat(convertUStoEN(plots.climate.average_temperature.june.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                   parseFloat(convertUStoEN(plots.climate.average_temperature.july.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                   parseFloat(convertUStoEN(plots.climate.average_temperature.august.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                   parseFloat(convertUStoEN(plots.climate.average_temperature.september.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                   parseFloat(convertUStoEN(plots.climate.average_temperature.october.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                   parseFloat(convertUStoEN(plots.climate.average_temperature.november.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                   parseFloat(convertUStoEN(plots.climate.average_temperature.december.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1)]
                , [parseFloat(convertUStoEN(plots.climate.max_temperature.january.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                   parseFloat(convertUStoEN(plots.climate.max_temperature.february.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                   parseFloat(convertUStoEN(plots.climate.max_temperature.march.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                   parseFloat(convertUStoEN(plots.climate.max_temperature.april.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                   parseFloat(convertUStoEN(plots.climate.max_temperature.may.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                   parseFloat(convertUStoEN(plots.climate.max_temperature.june.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                   parseFloat(convertUStoEN(plots.climate.max_temperature.july.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                   parseFloat(convertUStoEN(plots.climate.max_temperature.august.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                   parseFloat(convertUStoEN(plots.climate.max_temperature.september.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                   parseFloat(convertUStoEN(plots.climate.max_temperature.october.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                   parseFloat(convertUStoEN(plots.climate.max_temperature.november.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                   parseFloat(convertUStoEN(plots.climate.max_temperature.december.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1)]
              ]
            } else {
                $scope.linedata = [
                  [plots.climate.min_temperature.january.toFixed(1),
                   plots.climate.min_temperature.february.toFixed(1),
                   plots.climate.min_temperature.march.toFixed(1),
                   plots.climate.min_temperature.april.toFixed(1),
                   plots.climate.min_temperature.may.toFixed(1),
                   plots.climate.min_temperature.june.toFixed(1),
                   plots.climate.min_temperature.july.toFixed(1),
                   plots.climate.min_temperature.august.toFixed(1),
                   plots.climate.min_temperature.september.toFixed(1),
                   plots.climate.min_temperature.october.toFixed(1),
                   plots.climate.min_temperature.november.toFixed(1),
                   plots.climate.min_temperature.december.toFixed(1)]
                , [plots.climate.average_temperature.january.toFixed(1),
                   plots.climate.average_temperature.february.toFixed(1),
                   plots.climate.average_temperature.march.toFixed(1),
                   plots.climate.average_temperature.april.toFixed(1),
                   plots.climate.average_temperature.may.toFixed(1),
                   plots.climate.average_temperature.june.toFixed(1),
                   plots.climate.average_temperature.july.toFixed(1),
                   plots.climate.average_temperature.august.toFixed(1),
                   plots.climate.average_temperature.september.toFixed(1),
                   plots.climate.average_temperature.october.toFixed(1),
                   plots.climate.average_temperature.november.toFixed(1),
                   plots.climate.average_temperature.december.toFixed(1)]
                , [plots.climate.max_temperature.january.toFixed(1),
                   plots.climate.max_temperature.february.toFixed(1),
                   plots.climate.max_temperature.march.toFixed(1),
                   plots.climate.max_temperature.april.toFixed(1),
                   plots.climate.max_temperature.may.toFixed(1),
                   plots.climate.max_temperature.june.toFixed(1),
                   plots.climate.max_temperature.july.toFixed(1),
                   plots.climate.max_temperature.august.toFixed(1),
                   plots.climate.max_temperature.september.toFixed(1),
                   plots.climate.max_temperature.october.toFixed(1),
                   plots.climate.max_temperature.november.toFixed(1),
                   plots.climate.max_temperature.december.toFixed(1)]
              ]
            }

            $scope.temp_line_options = {
              animation: false,
              datasetFill: false,
              datasetStrokeWidth: 3,
              multiTooltipTemplate: function(obj) {
                if (METRIC_CONFIG === UNITED_STATES_METRIC_STANDARD){
                    return obj.label + ': ' + obj.value + ' °C';
                } else if (METRIC_CONFIG === ENGLISH_METRIC_STANDARD){
                    return obj.label + ': ' + obj.value + ' °F';
                } else {
                    return obj.label + ': ' + obj.value + ' °C';
                }
              }
            }

            $scope.precip_bar_options = {
              animation: false,
              tooltipTemplate: function(obj) {
                if (METRIC_CONFIG === UNITED_STATES_METRIC_STANDARD){
                  return obj.label + ': ' + obj.value + ' mm';
                } else if (METRIC_CONFIG === ENGLISH_METRIC_STANDARD){
                  return obj.label + ': ' + obj.value + ' in';
                } else {
                  return obj.label + ': ' + obj.value + ' mm';
                }
              }
            }

            $scope.precip_bar_colors = [{fillColor: ['#0000FF'], strokeColor: ['#0000FF']}]

            $ionicLoading.hide()
            $scope.onClick = function (points, evt) {
              console.log(points, evt)
            }
          }).error(function (err) {
            $ionicLoading.hide()
            var infoPopup = $ionicPopup.alert({
              cssClass: 'remove-title-class',
              template: UNABLE_GET_QUICK_CLIMATE
            })
            infoPopup.then(function (res) {
              infoPopup.close()
              $state.go('landpks.landinfo_plots')
            })
            return
          })
        } else if (error.message.indexOf('User denied Geolocation') == 0) {
          var newMethodResponse = getLocationService_basedOn_IP()

          if (isEmpty(newMethodResponse)){
            $ionicLoading.hide()
            var infoPopup = $ionicPopup.alert({
              cssClass: 'remove-title-class',
              template: UNABLE_GET_QUICK_CLIMATE
            })
            infoPopup.then(function (res) {
              infoPopup.close()
              $state.go('landpks.landinfo_plots')
            })
          }

          /*
          $ionicLoading.show({
            template: 'Fetching climate data for current location...'
          })
          */
          var url = LANDPKS_API_ENDPOINT
          $http.get(url, {
            params: {
              action: 'get',
              object: 'climate',
              latitude: newMethodResponse.lat,
              longitude: newMethodResponse.lon,
              data_source: 'world_clim',
              version: LANDPKS_API_VERSION
            },
            timeout: HTTP_QUICK_CLIMATE_TIME_OUT
          }).success(function (data) {
            $scope.plots = data
            var plots = $scope.plots

            if (METRIC_CONFIG === UNITED_STATES_METRIC_STANDARD){
              $scope.label_elevation_unit = "m"
              $scope.label_avg_annual_pre_unit = "mm"
              $scope.label_precipication_graph = 'Precipitation (mm)'
              $scope.label_degree = "°C"
            } else if (METRIC_CONFIG === ENGLISH_METRIC_STANDARD){
              var ftGdal_Elevation = parseFloat(convertUStoEN($scope.plots.geospatial_data.gdal_elevation,UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,METRIC_METERS,METRIC_FEET))
              $scope.plots.geospatial_data.gdal_elevation_ft = ftGdal_Elevation.toFixed(0)
              $scope.plots.climate.precipitation.annual_in = parseFloat(convertUStoEN($scope.plots.climate.precipitation.annual/10,UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,METRIC_CENTIMES,METRIC_INCHES))
              $scope.label_precipication_graph = 'Precipitation (in)'
              $scope.label_degree = "°F"
            } else {
              $scope.label_elevation_unit = "m"
              $scope.label_avg_annual_pre_unit = "mm"
              $scope.label_precipication_graph = 'Precipitation (mm)'
              $scope.label_degree = "°C"
            }

            $scope.labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            $scope.series = ['Series A']
            $scope.captions = ['Climate']

            if (METRIC_CONFIG === UNITED_STATES_METRIC_STANDARD){
                $scope.data = [
                  [plots.climate.precipitation.january.toFixed(0),
                    plots.climate.precipitation.february.toFixed(0),
                    plots.climate.precipitation.march.toFixed(0),
                    plots.climate.precipitation.april.toFixed(0),
                    plots.climate.precipitation.may.toFixed(0),
                    plots.climate.precipitation.june.toFixed(0),
                    plots.climate.precipitation.july.toFixed(0),
                    plots.climate.precipitation.august.toFixed(0),
                    plots.climate.precipitation.september.toFixed(0),
                    plots.climate.precipitation.october.toFixed(0),
                    plots.climate.precipitation.november.toFixed(0),
                    plots.climate.precipitation.december.toFixed(0)],
                ]
            } else if (METRIC_CONFIG === ENGLISH_METRIC_STANDARD){
              $scope.data = [
                [ parseFloat(convertUStoEN(plots.climate.precipitation.january/10,UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,METRIC_CENTIMES,METRIC_INCHES)).toFixed(1),
                  parseFloat(convertUStoEN(plots.climate.precipitation.february/10,UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,METRIC_CENTIMES,METRIC_INCHES)).toFixed(1),
                  parseFloat(convertUStoEN(plots.climate.precipitation.march/10,UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,METRIC_CENTIMES,METRIC_INCHES)).toFixed(1),
                  parseFloat(convertUStoEN(plots.climate.precipitation.april/10,UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,METRIC_CENTIMES,METRIC_INCHES)).toFixed(1),
                  parseFloat(convertUStoEN(plots.climate.precipitation.may/10,UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,METRIC_CENTIMES,METRIC_INCHES)).toFixed(1),
                  parseFloat(convertUStoEN(plots.climate.precipitation.june/10,UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,METRIC_CENTIMES,METRIC_INCHES)).toFixed(1),
                  parseFloat(convertUStoEN(plots.climate.precipitation.july/10,UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,METRIC_CENTIMES,METRIC_INCHES)).toFixed(1),
                  parseFloat(convertUStoEN(plots.climate.precipitation.august/10,UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,METRIC_CENTIMES,METRIC_INCHES)).toFixed(1),
                  parseFloat(convertUStoEN(plots.climate.precipitation.september/10,UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,METRIC_CENTIMES,METRIC_INCHES)).toFixed(1),
                  parseFloat(convertUStoEN(plots.climate.precipitation.october/10,UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,METRIC_CENTIMES,METRIC_INCHES)).toFixed(1),
                  parseFloat(convertUStoEN(plots.climate.precipitation.november/10,UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,METRIC_CENTIMES,METRIC_INCHES)).toFixed(1),
                  parseFloat(convertUStoEN(plots.climate.precipitation.december/10,UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,METRIC_CENTIMES,METRIC_INCHES)).toFixed(1)],
              ]
            } else {
                $scope.data = [
                  [plots.climate.precipitation.january.toFixed(0),
                    plots.climate.precipitation.february.toFixed(0),
                    plots.climate.precipitation.march.toFixed(0),
                    plots.climate.precipitation.april.toFixed(0),
                    plots.climate.precipitation.may.toFixed(0),
                    plots.climate.precipitation.june.toFixed(0),
                    plots.climate.precipitation.july.toFixed(0),
                    plots.climate.precipitation.august.toFixed(0),
                    plots.climate.precipitation.september.toFixed(0),
                    plots.climate.precipitation.october.toFixed(0),
                    plots.climate.precipitation.november.toFixed(0),
                    plots.climate.precipitation.december.toFixed(0)],
                ]
            }

            $scope.names = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            $scope.number = ['Min Temp', 'Avg Temp', 'Max Temp']

            $scope.linedata = []

            if (METRIC_CONFIG === UNITED_STATES_METRIC_STANDARD){
                $scope.linedata = [
                    [plots.climate.min_temperature.january.toFixed(1),
                     plots.climate.min_temperature.february.toFixed(1),
                     plots.climate.min_temperature.march.toFixed(1),
                     plots.climate.min_temperature.april.toFixed(1),
                     plots.climate.min_temperature.may.toFixed(1),
                     plots.climate.min_temperature.june.toFixed(1),
                     plots.climate.min_temperature.july.toFixed(1),
                     plots.climate.min_temperature.august.toFixed(1),
                     plots.climate.min_temperature.september.toFixed(1),
                     plots.climate.min_temperature.october.toFixed(1),
                     plots.climate.min_temperature.november.toFixed(1),
                     plots.climate.min_temperature.december.toFixed(1)]
                  , [plots.climate.average_temperature.january.toFixed(1),
                     plots.climate.average_temperature.february.toFixed(1),
                     plots.climate.average_temperature.march.toFixed(1),
                     plots.climate.average_temperature.april.toFixed(1),
                     plots.climate.average_temperature.may.toFixed(1),
                     plots.climate.average_temperature.june.toFixed(1),
                     plots.climate.average_temperature.july.toFixed(1),
                     plots.climate.average_temperature.august.toFixed(1),
                     plots.climate.average_temperature.september.toFixed(1),
                     plots.climate.average_temperature.october.toFixed(1),
                     plots.climate.average_temperature.november.toFixed(1),
                     plots.climate.average_temperature.december.toFixed(1)]
                  , [plots.climate.max_temperature.january.toFixed(1),
                     plots.climate.max_temperature.february.toFixed(1),
                     plots.climate.max_temperature.march.toFixed(1),
                     plots.climate.max_temperature.april.toFixed(1),
                     plots.climate.max_temperature.may.toFixed(1),
                     plots.climate.max_temperature.june.toFixed(1),
                     plots.climate.max_temperature.july.toFixed(1),
                     plots.climate.max_temperature.august.toFixed(1),
                     plots.climate.max_temperature.september.toFixed(1),
                     plots.climate.max_temperature.october.toFixed(1),
                     plots.climate.max_temperature.november.toFixed(1),
                     plots.climate.max_temperature.december.toFixed(1)]
                ]
            } else if (METRIC_CONFIG === ENGLISH_METRIC_STANDARD) {
              $scope.linedata = [
                  [parseFloat(convertUStoEN(plots.climate.min_temperature.january.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                   parseFloat(convertUStoEN(plots.climate.min_temperature.february.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                   parseFloat(convertUStoEN(plots.climate.min_temperature.march.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                   parseFloat(convertUStoEN(plots.climate.min_temperature.april.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                   parseFloat(convertUStoEN(plots.climate.min_temperature.may.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                   parseFloat(convertUStoEN(plots.climate.min_temperature.june.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                   parseFloat(convertUStoEN(plots.climate.min_temperature.july.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                   parseFloat(convertUStoEN(plots.climate.min_temperature.august.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                   parseFloat(convertUStoEN(plots.climate.min_temperature.september.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                   parseFloat(convertUStoEN(plots.climate.min_temperature.october.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                   parseFloat(convertUStoEN(plots.climate.min_temperature.november.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                   parseFloat(convertUStoEN(plots.climate.min_temperature.december.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1)]
                , [parseFloat(convertUStoEN(plots.climate.average_temperature.january.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                   parseFloat(convertUStoEN(plots.climate.average_temperature.february.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                   parseFloat(convertUStoEN(plots.climate.average_temperature.march.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                   parseFloat(convertUStoEN(plots.climate.average_temperature.april.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                   parseFloat(convertUStoEN(plots.climate.average_temperature.may.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                   parseFloat(convertUStoEN(plots.climate.average_temperature.june.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                   parseFloat(convertUStoEN(plots.climate.average_temperature.july.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                   parseFloat(convertUStoEN(plots.climate.average_temperature.august.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                   parseFloat(convertUStoEN(plots.climate.average_temperature.september.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                   parseFloat(convertUStoEN(plots.climate.average_temperature.october.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                   parseFloat(convertUStoEN(plots.climate.average_temperature.november.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                   parseFloat(convertUStoEN(plots.climate.average_temperature.december.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1)]
                , [parseFloat(convertUStoEN(plots.climate.max_temperature.january.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                   parseFloat(convertUStoEN(plots.climate.max_temperature.february.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                   parseFloat(convertUStoEN(plots.climate.max_temperature.march.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                   parseFloat(convertUStoEN(plots.climate.max_temperature.april.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                   parseFloat(convertUStoEN(plots.climate.max_temperature.may.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                   parseFloat(convertUStoEN(plots.climate.max_temperature.june.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                   parseFloat(convertUStoEN(plots.climate.max_temperature.july.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                   parseFloat(convertUStoEN(plots.climate.max_temperature.august.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                   parseFloat(convertUStoEN(plots.climate.max_temperature.september.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                   parseFloat(convertUStoEN(plots.climate.max_temperature.october.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                   parseFloat(convertUStoEN(plots.climate.max_temperature.november.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                   parseFloat(convertUStoEN(plots.climate.max_temperature.december.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1)]
              ]
            } else {
                $scope.linedata = [
                  [plots.climate.min_temperature.january.toFixed(1),
                   plots.climate.min_temperature.february.toFixed(1),
                   plots.climate.min_temperature.march.toFixed(1),
                   plots.climate.min_temperature.april.toFixed(1),
                   plots.climate.min_temperature.may.toFixed(1),
                   plots.climate.min_temperature.june.toFixed(1),
                   plots.climate.min_temperature.july.toFixed(1),
                   plots.climate.min_temperature.august.toFixed(1),
                   plots.climate.min_temperature.september.toFixed(1),
                   plots.climate.min_temperature.october.toFixed(1),
                   plots.climate.min_temperature.november.toFixed(1),
                   plots.climate.min_temperature.december.toFixed(1)]
                , [plots.climate.average_temperature.january.toFixed(1),
                   plots.climate.average_temperature.february.toFixed(1),
                   plots.climate.average_temperature.march.toFixed(1),
                   plots.climate.average_temperature.april.toFixed(1),
                   plots.climate.average_temperature.may.toFixed(1),
                   plots.climate.average_temperature.june.toFixed(1),
                   plots.climate.average_temperature.july.toFixed(1),
                   plots.climate.average_temperature.august.toFixed(1),
                   plots.climate.average_temperature.september.toFixed(1),
                   plots.climate.average_temperature.october.toFixed(1),
                   plots.climate.average_temperature.november.toFixed(1),
                   plots.climate.average_temperature.december.toFixed(1)]
                , [plots.climate.max_temperature.january.toFixed(1),
                   plots.climate.max_temperature.february.toFixed(1),
                   plots.climate.max_temperature.march.toFixed(1),
                   plots.climate.max_temperature.april.toFixed(1),
                   plots.climate.max_temperature.may.toFixed(1),
                   plots.climate.max_temperature.june.toFixed(1),
                   plots.climate.max_temperature.july.toFixed(1),
                   plots.climate.max_temperature.august.toFixed(1),
                   plots.climate.max_temperature.september.toFixed(1),
                   plots.climate.max_temperature.october.toFixed(1),
                   plots.climate.max_temperature.november.toFixed(1),
                   plots.climate.max_temperature.december.toFixed(1)]
              ]
            }

            $scope.temp_line_options = {
              animation: false,
              datasetFill: false,
              datasetStrokeWidth: 3,
              multiTooltipTemplate: function(obj) {
                if (METRIC_CONFIG === UNITED_STATES_METRIC_STANDARD){
                    return obj.label + ': ' + obj.value + ' °C';
                } else if (METRIC_CONFIG === ENGLISH_METRIC_STANDARD){
                    return obj.label + ': ' + obj.value + ' °F';
                } else {
                    return obj.label + ': ' + obj.value + ' °C';
                }
              }
            }

            $scope.precip_bar_options = {
              animation: false,
              tooltipTemplate: function(obj) {
                if (METRIC_CONFIG === UNITED_STATES_METRIC_STANDARD){
                  return obj.label + ': ' + obj.value + ' mm';
                } else if (METRIC_CONFIG === ENGLISH_METRIC_STANDARD){
                  return obj.label + ': ' + obj.value + ' in';
                } else {
                  return obj.label + ': ' + obj.value + ' mm';
                }
              }
            }

            $scope.precip_bar_colors = [{fillColor: ['#0000FF'], strokeColor: ['#0000FF']}]

            $ionicLoading.hide()
            $scope.onClick = function (points, evt) {
              console.log(points, evt)
            }
          }).error(function (err) {
            $ionicLoading.hide()
            var infoPopup = $ionicPopup.alert({
              cssClass: 'remove-title-class',
              template: UNABLE_GET_QUICK_CLIMATE
            })
            infoPopup.then(function (res) {
              infoPopup.close()
              $state.go('landpks.landinfo_plots')
            })
            return
          })
        } else {
          $ionicLoading.hide()
          var infoPopup = $ionicPopup.alert({
            cssClass: 'remove-title-class',
            template: UNABLE_GET_QUICK_CLIMATE
          })
          infoPopup.then(function (res) {
            infoPopup.close()
            $state.go('landpks.landinfo_plots')
          })
        }

      }
      var isIOS = ionic.Platform.isIOS()
      var isAndroid = ionic.Platform.isAndroid()
      if (window.cordova) {
          if (!isIOS && isAndroid){
              cordova.plugins.diagnostic.isLocationEnabled(function(enabled) {
                  console.log("Location is " + (enabled ? "enabled" : "disabled"));
                  if (enabled){
                     navigator.geolocation.getCurrentPosition(onSuccess, onError,  LOCATION_SERVICE_OPTION)
                  } else {
                     cordova.plugins.diagnostic.switchToLocationSettings();
                     $ionicLoading.hide()
                     var infoPopup = $ionicPopup.alert({
                           cssClass: 'remove-title-class',
                           template: 'Cannot get Location.  Please try again'
                     })
                      infoPopup.then(function (res) {
                          infoPopup.close()
                          $ionicHistory.clearCache()
                          $state.go('landpks.landinfo_plots') 
                      })
                  }
              }, function(error) {
                  alert("The following error occurred: " + error);
              });
          } else if (!isAndroid && isIOS){
              navigator.geolocation.getCurrentPosition(onSuccess, onError,  LOCATION_SERVICE_OPTION)
          }
      } else {
          navigator.geolocation.getCurrentPosition(onSuccess, onError,  LOCATION_SERVICE_OPTION)
      }

      //navigator.geolocation.getCurrentPosition(onSuccess, onError)
    }

  })

  /****************************************/
  /** DummyCtrl **/
  /****************************************/
  .controller('DummyCtrl', function ($scope) {
    $scope.title = 'Landinfo'
  })


  /***************************************/
  /*** Accelerometer_Ctrl **/
  /***************************************/
  .controller('Accelerometer_Horizon_Ctrl', function ($scope, $state, $ionicHistory, $ionicPopup, $ionicPlatform, plotListService) {

    window.localStorage.setItem('CURRENT_PAGE_FOR_BACK_BUTTON', 'ACCELEROMETER_PAGE')
    if (window.cordova) {
      screen.lockOrientation('landscape')
    }

    $scope.sight_line = 'landinfo_media/accelerometer_images/transparent.sight_line_horizon.png'
    $scope.btn_click_src = 'landinfo_media/accelerometer_images/big_red_button_horizon.png'
    $scope.slope_percentage = 0
    $scope.slope_degree = 0
    var final_degree = 0
    var final_slope_percent = 0

    var lock = false
    var slope_percentage = 0
    runAccelerometer()
    function runAccelerometer () {
      if (window.DeviceOrientationEvent) {
        console.log('DeviceOrientation is supported')
        // Listen for the deviceorientation event and handle the raw data
        window.addEventListener('deviceorientation', function (eventData) {
          // gamma is the left-to-right tilt in degrees, where right is positive
          var tiltLR = eventData.gamma
          // beta is the front-to-back tilt in degrees, where front is positive
          var tiltFB = eventData.beta
          // alpha is the compass direction the device is facing in degrees
          var dir = eventData.alpha
          var norm_of_g = Math.sqrt(tiltLR * tiltLR + tiltFB * tiltFB + dir * dir)
          var g_0 = tiltLR / norm_of_g
          var g_1 = tiltFB / norm_of_g
          var g_2 = dir / norm_of_g
          // var inclination = Math.round((Math.acos(g_2))*180 / Math.PI)
          var rotation = Math.atan2(g_0, g_1) * 180 / Math.PI
          final_degree = rotation + 90
          final_slope_percent = 0
          var degree_display = Math.abs(final_degree.toFixed(0))
          document.getElementById('slope_degree').innerHTML = '(' + degree_display + '<sup>0</sup>)'
          if (final_degree >= 0 && final_degree <= 90) {
            final_slope_percent = Math.min(Math.abs(Math.round(Math.tan(toRadians(Math.abs(final_degree))) * 100)),200)

            //final_slope_percent = Math.round((final_degree / 90) * 100)
            document.getElementById('slope_percentage').innerHTML = final_slope_percent + '%'
          }
          if (final_degree < 0 && final_degree >= -90) {
            //final_slope_percent = Math.round((Math.abs(final_degree) / 90) * 100)
            final_slope_percent = Math.min(Math.abs(Math.round(Math.tan(toRadians(Math.abs(final_degree))) * 100)),200)
            document.getElementById('slope_percentage').innerHTML = final_slope_percent + '%'
          }
        }, false)
      } else {
        console.log('Not supported accelerometer')
      }
    }

    $scope.click_lock_button = function () {
      if ($scope.btn_click_src === 'landinfo_media/accelerometer_images/big_red_button_horizon.png') {
        lock = true
        $scope.btn_click_src = 'landinfo_media/accelerometer_images/big_green_button_horizon.png'
      } else {
        lock = false
        $scope.btn_click_src = 'landinfo_media/accelerometer_images/big_red_button_horizon.png'
      }
      if (lock == false) {
        runAccelerometer()
      } else if (lock == true) {
        slope_percentage = document.getElementById('slope_percentage').innerHTML

        var confirmPopup = $ionicPopup.confirm({
          title: 'Confirm',
          template: 'Do you want to use this value ? Slope = ' + slope_percentage
        })
        confirmPopup.then(function (res) {
          if (res) {
            confirmPopup.close()

            var recorder_name = window.localStorage.getItem('current_email')
            var newPlot = JSON.parse(window.localStorage.getItem('current_view_plot'))
            var LIST_PLOTS = JSON.parse(window.localStorage.getItem(recorder_name + '_' + 'LIST_LANDINFO_PLOTS'))

            newPlot.slope = slope_percentage
            newPlot.isSlopeDoing = true
            //window.localStorage.setItem('current_view_plot', JSON.stringify(newPlot))
            if (newPlot.status != 'CREATED'){
              newPlot.status = 'NOT_SYNCHRONIZED';
            }
            plotListService.updateCachedPlot(LIST_PLOTS, newPlot);
            if (window.cordova) {
              screen.unlockOrientation()
            }

            $state.go('landpks.landinfo_slope')
          } else {

            $scope.btn_click_src = 'landinfo_media/accelerometer_images/big_red_button_horizon.png'
            return
          }
        })
      }
    }

  })
  /***************************************/
  /*** AddPlot_Slope_Ctrl **/
  /***************************************/
  .controller('DataInput_Slope_Ctrl', function ($scope, $state, $ionicPopup, $ionicPlatform, plotListService) {
    $scope.slope_flat = 'landinfo_media/slope_images/ic_slope_flat.png'
    $scope.slope_gentle = 'landinfo_media/slope_images/ic_slope_gentle.png'
    $scope.slope_moderate = 'landinfo_media/slope_images/ic_slope_moderate.png'
    $scope.slope_rolling = 'landinfo_media/slope_images/ic_slope_rolling.png'
    $scope.slope_hilly = 'landinfo_media/slope_images/ic_slope_hilly.png'
    $scope.slope_steep = 'landinfo_media/slope_images/ic_slope_steep.png'
    $scope.slope_verysteep = 'landinfo_media/slope_images/ic_slope_very_steep.png'
    var slopeCategories = {"flat":'0-2%', "gentle":'3-5%', "moderate":'6-10%', "rolling":'11-15%', "hilly":'16-30%', "steep":'31-60%', "verysteep":'60-100%'}

    var recorder_name = window.localStorage.getItem('current_email')
    var email = recorder_name
    var LIST_PLOTS = JSON.parse(window.localStorage.getItem(recorder_name + '_' + 'LIST_LANDINFO_PLOTS'))
    var currentPlot = JSON.parse(window.localStorage.getItem('current_view_plot'));

    //see if the slope came from the slope meter (it will not be in the category)
    if (currentPlot.slope != undefined ){
      var slopeKey = currentPlot.slope.split(' ')[0].toLowerCase();
      if (!(slopeKey in slopeCategories)){
        $scope.measuredSlope = currentPlot.slope;
      } else {
        var slopeImg = document.getElementById(slopeKey);
        if (slopeImg != undefined){
          slopeImg.classList.add("lpks-img-active");
        }
        $scope.categorizedSlope = currentPlot.slope;
      }

    }

    $scope.slope_Meter = function () {
      if (window.cordova) {
        Slope_part1_data = ''
        $state.go('landpks.landinfo_accelerometer_horizon')
      } else {
        var infoPopup = $ionicPopup.alert({
          cssClass: 'remove-title-class',
          template: 'Slope meter is not available for Web App'
        })
        infoPopup.then(function (res) {
          infoPopup.close()
        })
        return
      }
    }
    $scope.selectSlope = function(item) {

      //do we already have a slope that was set with the meter (ie. not in the category list)
      if ($scope.measuredSlope != undefined && $scope.measuredSlope != 'undefined') { 
        var confirmPopup = $ionicPopup.confirm({
          cssClass: 'remove-title-class',
          template: 'Are you sure you want to override the slope meter value?',
          cancelText: 'No',
          okText: 'Yes'

        })

        confirmPopup.then(function (res) {
          if(res){
            $scope.measuredSlope = undefined
            setSlope(item)
          } else {
            //do nothing
            return;
          }
        })
      } else {
        setSlope(item)
      }
    }

    function setSlope(item){
      for ( key in slopeCategories){
        var slopeImg = document.getElementById(key);
        if (slopeImg != undefined){
          slopeImg.classList.remove("lpks-img-active");
        }
      }

      var selectedImg = document.getElementById(item);
      selectedImg.classList.add("lpks-img-active");
      $scope.categorizedSlope = item + " " + slopeCategories[item];
      seeToast2($scope.categorizedSlope, 1500)
      currentPlot.slope = item + " " + slopeCategories[item];
      if (currentPlot.status != 'CREATED'){
        currentPlot.status = 'NOT_SYNCHRONIZED';
      }
      plotListService.updateCachedPlot(LIST_PLOTS, currentPlot);

    }

  })
  /****************************************/
  /** DataInput_LandUse_Ctrl **/
  /****************************************/
  .controller('DataInput_LandUse_Ctrl', function ($scope, $state, $ionicPopup, $ionicPlatform, $translate, plotListService) {
    $scope.landuse_current_grazed = 'landinfo_media/landuse_images/ic_cattle_grazing.png'
    $scope.landuse_current_not_grazed = 'landinfo_media/landuse_images/ic_not_grazed.png'

    $scope.landuse_current_cattle = 'landinfo_media/landuse_images/ic_cattle_grazing.png'
    $scope.landuse_current_goat = 'landinfo_media/landuse_images/ic_goat_grazing.png'
    $scope.landuse_current_horse = 'landinfo_media/landuse_images/ic_horse_grazing.png'
    $scope.landuse_current_pig = 'landinfo_media/landuse_images/ic_pig_grazing.png'
    $scope.landuse_current_sheep = 'landinfo_media/landuse_images/ic_sheep_grazing.png'
    $scope.landuse_current_wildlife = 'landinfo_media/landuse_images/ic_wildlife_grazing.png'
    $scope.landuse_current_us_wildlife = 'landinfo_media/landuse_images/ic_us_wildlife_grazing.png'


    var grazingCategories = ["CATTLE", "GOAT", "SHEEP", "WILDLIFE", "HORSE", "PIG", "US_WILDLIFE"];
    var grazingToast = {"CATTLE": "landinfo_common.cattle", "GOAT":"landinfo_common.goat", "SHEEP": "landinfo_common.sheep", "WILDLIFE": "landinfo_common.wildlife", "HORSE":"landinfo_common.horse", "PIG":"landinfo_common.pig", "US_WILDLIFE":"landinfo_common.us_wildlife"};

    var recorder_name = window.localStorage.getItem('current_email')
    var email = recorder_name
    var currentPlot = JSON.parse(window.localStorage.getItem('current_view_plot'))
    var LIST_PLOTS = JSON.parse(window.localStorage.getItem(recorder_name + '_' + 'LIST_LANDINFO_PLOTS'))
    //console.log(window.localStorage.getItem('current_view_plot'))
    var grazed = currentPlot.grazed;
    var  savedGrazingCategories;

    if (currentPlot.grazing != undefined ) {
      savedGrazingCategories = currentPlot.grazing.split(',');
    }else {
      savedGrazingCategories = [];
    }

    initDisplay();

    function initDisplay() {
      //Check to see if we have an existing landUse value and set appropriate image
      if (typeof grazed != 'undefined' && !isEmpty(grazed)) {
        if (grazed == "TRUE"){
          //var grazedImg = document.getElementById('grazed');
          //grazedImg.classList.add("lpks-img-active")
          for (key in savedGrazingCategories) {
            if (grazingCategories.includes(savedGrazingCategories[key])){
              var grazeImg = document.getElementById(savedGrazingCategories[key]).classList.add('lpks-img-active');
            }
          }

        } else {
          var notGrazedImg =document.getElementById('notGrazed').classList.toggle('lpks-img-active');;
        }
      }
    }

    $scope.selectGrazing = function(item) {
      var notGrazedImg = document.getElementById('notGrazed').classList.toggle('lpks-img-active');
      var grazeCategories = document.getElementById('grazeCategories')
      currentPlot.grazing = "";
      savedGrazingCategories = []
      if (document.getElementById('notGrazed').classList.contains('lpks-img-active')) {
        seeToast2($translate.instant('landinfo_common.not_grazed'), 1500)
        currentPlot.grazed = "FALSE"
        for (key in grazingCategories){
          document.getElementById(grazingCategories[key]).classList.remove('lpks-img-active')
        }
      } else {
        seeToast2($translate.instant('landinfo_common.grazed'), 1500)
        currentPlot.grazed = "TRUE"
      }
      plotListService.updateCachedPlot(LIST_PLOTS, currentPlot);

    }

    $scope.select_LandUse_Grazing = function(item) {
      currentPlot.grazed = "TRUE"
      var notGrazedImg = document.getElementById('notGrazed').classList.remove('lpks-img-active');
      var selectedImg = document.getElementById(item).classList.toggle('lpks-img-active');

      if (savedGrazingCategories.indexOf(item) == -1) {
        if (savedGrazingCategories == 'NONE'){
          console.log("reset");
          savedGrazingCategories = []
        }
        savedGrazingCategories.push(item);
        savedGrazingCategories.sort();
      } else {
        savedGrazingCategories.splice(savedGrazingCategories.indexOf(item), 1);
      }
      currentPlot.grazing = savedGrazingCategories.toString()
      if (currentPlot.status != 'CREATED'){
        currentPlot.status = 'NOT_SYNCHRONIZED';
      }
      console.log(currentPlot.grazed)
      console.log(currentPlot.grazing)
      seeToast2($translate.instant(grazingToast[item]), 1500)
      plotListService.updateCachedPlot(LIST_PLOTS, currentPlot);

    }


  })

  /****************************************/
  /** AddPlot_Slopeshape_Ctrl **/
  /****************************************/
  .controller('DataInput_Slopeshape_Ctrl', function ($scope, $state, $ionicPopup, $ionicPlatform, plotListService) {
    $scope.slopeshape_downslopeconcave = 'landinfo_media/slopeshape_images/ic_downslopeconcave.png'
    $scope.slopeshape_downslopeconvex = 'landinfo_media/slopeshape_images/ic_downslopeconvex.png'
    $scope.slopeshape_downslopeflat = 'landinfo_media/slopeshape_images/ic_downslopeflat.png'
    $scope.slopeshape_crossslopeconcave = 'landinfo_media/slopeshape_images/ic_crossslopeconcave.png'
    $scope.slopeshape_crossslopeconvex = 'landinfo_media/slopeshape_images/ic_crossslopeconvex.png'
    $scope.slopeshape_crossslopeflat = 'landinfo_media/slopeshape_images/ic_crossslopeflat.png'

    var recorder_name = window.localStorage.getItem('current_email')
    var email = recorder_name
    var currentPlot = JSON.parse(window.localStorage.getItem('current_view_plot'))
    var LIST_PLOTS = JSON.parse(window.localStorage.getItem(recorder_name + '_' + 'LIST_LANDINFO_PLOTS'))
    if (typeof currentPlot.slope_shape != 'undefined' && !isEmpty(currentPlot.slope_shape)) {
      var savedSlopeShape = currentPlot.slope_shape.split(',')
    } else {
      var savedSlopeShape = ["",""]
    }

    initDisplay();

    function initDisplay() {
      //Check to see if we have an existing sloe shape and set appropriate images
      //if (typeof currentPlot.slope_shape != 'undefined') {
        //var savedSlopeShape = currentPlot.slope_shape.split(',')
        if (savedSlopeShape[0].length > 0) {
          var downImg = document.getElementById('DOWN_'+ savedSlopeShape[0]);
          if (!isEmpty(downImg)){
            downImg.classList.add('lpks-img-active')
          }
        }
        if (savedSlopeShape[1].length > 0) {
          console.log("across " + savedSlopeShape[1].length)
          var acrossImg = document.getElementById('ACROSS_'+ savedSlopeShape[1]);

          if (!isEmpty(acrossImg)){
            acrossImg.classList.add('lpks-img-active')
          }
        }
      //}
    }

    $scope.selectDownSlope = function (item) {
      var downElements = ['DOWN_CONCAVE', 'DOWN_CONVEX', 'DOWN_LINEAR']
      for (key in downElements){
        if (key != item){
          document.getElementById(downElements[key]).classList.remove("lpks-img-active");
        }
      }
      document.getElementById('DOWN_'+ item).classList.toggle("lpks-img-active");

      if (savedSlopeShape[0] != item) {
        savedSlopeShape[0] = item
      } else {
        savedSlopeShape[0] = "" ;
      }
      currentPlot.slope_shape = savedSlopeShape.toString();
      if (currentPlot.status != 'CREATED'){
        currentPlot.status = 'NOT_SYNCHRONIZED';
      }
      seeToast2(item, 1500)

      plotListService.updateCachedPlot(LIST_PLOTS, currentPlot);
    }

    $scope.selectAcrossSlope = function (item) {
      var acrossElements = ['ACROSS_CONCAVE', 'ACROSS_CONVEX', 'ACROSS_LINEAR']
      for (key in acrossElements){
        if (key != item){
          document.getElementById(acrossElements[key]).classList.remove("lpks-img-active");
        }
      }
      document.getElementById('ACROSS_'+ item).classList.toggle("lpks-img-active");
      if (savedSlopeShape[1] != item) {
        savedSlopeShape[1] = item
      } else {
        savedSlopeShape[1] = "" ;
      }
      currentPlot.slope_shape = savedSlopeShape.toString();
      if (currentPlot.status != 'CREATED'){
        currentPlot.status = 'NOT_SYNCHRONIZED';
      }
      seeToast2(item, 1500)

      plotListService.updateCachedPlot(LIST_PLOTS, currentPlot);
    }


  })
  /****************************************/
  /** AddPlot_Soilcondition_Ctrl **/
  /****************************************/
  .controller('DataInput_Soilcondition_Ctrl', function ($scope, $state, $ionicPopup, $ionicPlatform, plotListService) {

    $scope.soilcondition_soilcracks = 'landinfo_media/soilcondition_images/ic_soil_cracks.png'
    $scope.soilcondition_surfacesalt = 'landinfo_media/soilcondition_images/ic_surface_salt.png'
    $scope.soilcondition_nosoilcracks = 'landinfo_media/soilcondition_images/ic_no_soil_cracks.png'
    $scope.soilcondition_nosurfacesalt = 'landinfo_media/soilcondition_images/ic_no_surface_salt.png'

    var recorder_name = window.localStorage.getItem('current_email')
    var LIST_PLOTS = JSON.parse(window.localStorage.getItem(recorder_name + '_' + 'LIST_LANDINFO_PLOTS'))
    var currentPlot = JSON.parse(window.localStorage.getItem('current_view_plot'))
    var cracked = currentPlot.surface_cracking;
    var salted = currentPlot.surface_salt;

    var crackedMapping = { true:"cracked", false:"notCracked"};
    var saltMapping = {true:"salted", false:"notSalted"};

    //load the correct toast strings
    var METRIC_CONFIG = window.localStorage.getItem('GLOBAL_CONFIG_METRICS_UNITS')
    message_surface_crack = LINFO_SCON_P_VERTICAL
    message_no_surface_crack = LINFO_SCON_P_NO_VERTICAL
    if (METRIC_CONFIG === ENGLISH_METRIC_STANDARD){
      message_surface_crack = LINFO_SCON_P_VERTICAL_EN
      message_no_surface_crack = LINFO_SCON_P_NO_VERTICAL_EN
    }

    initDisplay()

    function initDisplay() {

      if (typeof cracked != 'undefined' && cracked !== "") {
        if (cracked == "TRUE"){
          var crackedImg = document.getElementById("cracked");
          crackedImg.classList.add("lpks-img-active");
        } else {
          var notCrackedImg = document.getElementById("notCracked");
          notCrackedImg.classList.add("lpks-img-active");
        }
      }
      if (typeof salted != 'undefined' && salted !== "") {
        if (salted == "TRUE"){
          var saltedImg = document.getElementById("salted");
          saltedImg.classList.add("lpks-img-active");
        } else {
          var notSaltedImg = document.getElementById("notSalted");
          notSaltedImg.classList.add("lpks-img-active");
        }
      }
    }



    $scope.selectCracking = function (item) {
      for (key in crackedMapping) {
        document.getElementById(crackedMapping[key]).classList.remove("lpks-img-active")
      }
      document.getElementById(crackedMapping[item]).classList.add("lpks-img-active")
      if(item){
        cracked = "TRUE"
        seeToast2(message_surface_crack, 1500)
      } else  {
        cracked = "FALSE"
        seeToast2(message_no_surface_crack, 1500)
      }
      if ( currentPlot.surface_cracking != cracked) {
        currentPlot.surface_cracking = cracked;
        if (currentPlot.status != 'CREATED'){
          currentPlot.status = 'NOT_SYNCHRONIZED';
        }
        plotListService.updateCachedPlot(LIST_PLOTS, currentPlot);
      }
    }

    $scope.selectSalt = function (item) {
      for (key in saltMapping) {
        document.getElementById(saltMapping[key]).classList.remove("lpks-img-active")
      }
      document.getElementById(saltMapping[item]).classList.add("lpks-img-active")
      if(item){
        salted = "TRUE"
        seeToast2('salt on soil surface', 2000)
      } else  {
        salted = "FALSE"
        seeToast2('no salt on soil surface', 2000)
      }
      if ( currentPlot.surface_salt != salted) {
        currentPlot.surface_salt = salted;
        if (currentPlot.status != 'CREATED'){
          currentPlot.status = 'NOT_SYNCHRONIZED';
        }
        plotListService.updateCachedPlot(LIST_PLOTS, currentPlot);
      }
    }

  })

  /****************************************/
  /** AddPlot_Photos_Ctrl **/
  /****************************************/
  .controller('AddPlot_Photos_Ctrl', function ($scope, $state, $http, $ionicLoading, $cordovaCamera, $ionicPopup, $ionicPlatform, plotListService, $translate,debugService) {
    window.localStorage.setItem('CURRENT_PAGE_FOR_BACK_BUTTON', 'ADDPLOT_PHOTOS_LANDINFO_PAGE')
    $scope.data = {}
    var recorder_name = window.localStorage.getItem('current_email')
    var email = recorder_name
    var LIST_PLOTS = JSON.parse(window.localStorage.getItem(recorder_name + '_' + 'LIST_LANDINFO_PLOTS'))
    var newPlot = JSON.parse(window.localStorage.getItem('current_view_plot'))

    //console.log(newPlot)
    $scope.plot_name = newPlot.real_name
    $scope.data.notes = newPlot.notes

    var LANGUAGE_CONFIG = window.localStorage.getItem('GLOBAL_CONFIG_LANGUAGE')
    $translate.use(LANGUAGE_CONFIG)
    //$scope.labels.title = $translate.instant('landinfo_app.list_plot.title')

    if (window.cordova){
      var PHOTO_OPTIONS = {
        quality: 100,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: false,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 640,
        targetHeight: 480,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false,
        correctOrientation: true
      }
    }

    /* Get backup file names */
    photos_files_name = JSON.parse(window.localStorage.getItem(newPlot.name + "_PHOTO_FILE_NAMES"))
    if (isEmpty(photos_files_name)){
      photos_files_name = {"soil_pit_file":"","soil_sample_file":"","landscape_north_file":"","landscape_south_file":"","landscape_west_file":"","landscape_east_file":""}
    }

    var soil_pit_photo_data_url = newPlot.soil_pit_photo_data_url
    if (isEmpty(soil_pit_photo_data_url) || soil_pit_photo_data_url === 'landinfo_media/ic_na.png') {
      if (isEmpty(photos_files_name.soil_pit_file)){
        soil_pit_photo_data_url = ''
        document.getElementById('img_soil_pit_photo').style.display = 'none'  
      } else {
        document.getElementById('img_soil_pit_photo').style.display = 'block'
        document.getElementById("txtSoilPit_Image_Filename").innerHTML = " " +  readDateTimeyyyymmdd_hhmmss_ForPhotos('TIME_COLLECTION',photos_files_name.soil_pit_file,'soil_pit')
        newPlot.soil_pit_photo_data_url = photos_files_name.soil_pit_file
        if (window.cordova){
            readFromFile(photos_files_name.soil_pit_file, function (data) {
                $scope.soil_pit_photo_data_url = data;
            });
        }  
      }
    } else {
      document.getElementById('img_soil_pit_photo').style.display = 'block'
      if (soil_pit_photo_data_url.substring(0,23) === 'data:image/jpeg;base64,') {
        $scope.soil_pit_photo_data_url = soil_pit_photo_data_url
      } else {
        document.getElementById("txtSoilPit_Image_Filename").innerHTML = " " +  readDateTimeyyyymmdd_hhmmss_ForPhotos('TIME_COLLECTION',soil_pit_photo_data_url,'soil_pit')
        if (window.cordova){
              readFromFile(soil_pit_photo_data_url, function (data) {
                  $scope.soil_pit_photo_data_url = data;
              });
        } else {
          $scope.soil_pit_photo_data_url = soil_pit_photo_data_url
        }
      }
    }

    if (!isEmpty(newPlot.soil_pit_photo_url) && newPlot.soil_pit_photo_url.substring(0,4) === 'http'){
      document.getElementById("iUploadPit").className = "icon ion-android-cloud-done"
      document.getElementById("iUploadPit_2").style.visibility = "visible"
    } else {
      document.getElementById("iUploadPit_2").style.visibility = "hidden"
    }

    var soil_sample_photo_data_url = newPlot.soil_sample_photo_data_url
    if (isEmpty(soil_sample_photo_data_url) || soil_sample_photo_data_url === 'landinfo_media/ic_na.png') {
      if (isEmpty(photos_files_name.soil_sample_file)){
         soil_sample_photo_data_url = ''
         document.getElementById('img_soil_sample_photo').style.display = 'none'
      } else {
         document.getElementById("txtSoilSample_Image_Filename").innerHTML = " " +  readDateTimeyyyymmdd_hhmmss_ForPhotos('TIME_COLLECTION',photos_files_name.soil_sample_file,'soil_sample')
         document.getElementById('img_soil_sample_photo').style.display = 'block'
         newPlot.soil_sample_photo_data_url = photos_files_name.soil_sample_file
         if (window.cordova){
            readFromFile(photos_files_name.soil_sample_file, function (data) {
                $scope.soil_sample_photo_data_url = data;
            });
         }  
      }
    } else {
      document.getElementById('img_soil_sample_photo').style.display = 'block'
      if (soil_sample_photo_data_url.substring(0,23) === 'data:image/jpeg;base64,') {
        $scope.soil_sample_photo_data_url = soil_sample_photo_data_url
      } else {
        document.getElementById("txtSoilSample_Image_Filename").innerHTML = " " +  readDateTimeyyyymmdd_hhmmss_ForPhotos('TIME_COLLECTION',soil_sample_photo_data_url,'soil_sample')
        if (window.cordova){
          readFromFile(soil_sample_photo_data_url, function (data) {
              $scope.soil_sample_photo_data_url = data;
          });

        } else {
          $scope.soil_sample_photo_data_url = soil_sample_photo_data_url
        }
      }
    }
    if (!isEmpty(newPlot.soil_samples_photo_url) && newPlot.soil_samples_photo_url.substring(0,4) === 'http'){
      document.getElementById("iUploadSample").className = "icon ion-android-cloud-done"
      document.getElementById("iUploadSample_2").style.visibility = "visible"
    } else {
      document.getElementById("iUploadSample_2").style.visibility = "hidden"
    }

    var landscape_north_photo_data_url = newPlot.landscape_north_photo_data_url
    if (isEmpty(landscape_north_photo_data_url) || landscape_north_photo_data_url === 'landinfo_media/ic_na.png') {
      document.getElementById('aUploadNorth').style.display = 'none'
      if (isEmpty(photos_files_name.landscape_north_file)){
         landscape_north_photo_data_url = ''
         document.getElementById('img_landscape_north').style.display = 'none'
      } else {
         document.getElementById("txtNorth_LandScape_Image_Filename").innerHTML = "North : " +  readDateTimeyyyymmdd_hhmmss_ForPhotos('TIME_COLLECTION',photos_files_name.landscape_north_file,'landscape_north')
         document.getElementById('img_landscape_north').style.display = 'block'
         newPlot.landscape_north_photo_data_url = photos_files_name.landscape_north_file
         if (window.cordova){
            readFromFile(photos_files_name.landscape_north_file, function (data) {
                $scope.landscape_north_photo_data_url = data;
            });
         }  
      }

    } else {
      document.getElementById('img_landscape_north').style.display = 'block'
      document.getElementById('aUploadNorth').style.display = 'block'
      if (landscape_north_photo_data_url.substring(0,23) === 'data:image/jpeg;base64,') {

        $scope.landscape_north_photo_data_url = landscape_north_photo_data_url
      } else {
        document.getElementById("txtNorth_LandScape_Image_Filename").innerHTML = "North : " +  readDateTimeyyyymmdd_hhmmss_ForPhotos('TIME_COLLECTION',landscape_north_photo_data_url,'landscape_north')
        if (window.cordova){
          readFromFile(landscape_north_photo_data_url, function (data) {

              $scope.landscape_north_photo_data_url = data;
          });
        } else {
          $scope.landscape_north_photo_data_url = landscape_north_photo_data_url
        }
      }
    }
    if (!isEmpty(newPlot.landscape_north_photo_url) && newPlot.landscape_north_photo_url.substring(0,4) === 'http'){
      document.getElementById("iUploadNorth").className = "icon ion-android-cloud-done"
      document.getElementById("iUploadNorth_2").style.visibility = "visible"
    } else {
      document.getElementById("iUploadNorth_2").style.visibility = "hidden"
    }


    var landscape_east_photo_data_url = newPlot.landscape_east_photo_data_url
    if (isEmpty(landscape_east_photo_data_url) || landscape_east_photo_data_url === 'landinfo_media/ic_na.png') {
      
      document.getElementById('aUploadEast').style.display = 'none'

      if (isEmpty(photos_files_name.landscape_east_file)){
         landscape_east_photo_data_url = ''
         document.getElementById('img_landscape_east').style.display = 'none'
      } else {
         document.getElementById("txtEast_LandScape_Image_Filename").innerHTML = "East : " +  readDateTimeyyyymmdd_hhmmss_ForPhotos('TIME_COLLECTION',photos_files_name.landscape_east_file,'landscape_east')
         document.getElementById('img_landscape_east').style.display = 'block'
         newPlot.landscape_east_photo_data_url = photos_files_name.landscape_east_file
         if (window.cordova){
            readFromFile(photos_files_name.landscape_east_file, function (data) {
                $scope.landscape_east_photo_data_url = data;
            });
         }  
      }
    } else {
      document.getElementById('img_landscape_east').style.display = 'block'
      document.getElementById('aUploadEast').style.display = 'block'
      if (landscape_east_photo_data_url.substring(0,23) === 'data:image/jpeg;base64,') {
        $scope.landscape_east_photo_data_url = landscape_east_photo_data_url
      } else {
        document.getElementById("txtEast_LandScape_Image_Filename").innerHTML = "East : " +  readDateTimeyyyymmdd_hhmmss_ForPhotos('TIME_COLLECTION',landscape_east_photo_data_url,'landscape_east')
        if (window.cordova){
          readFromFile(landscape_east_photo_data_url, function (data) {
              $scope.landscape_east_photo_data_url = data;
          });
        } else {
          $scope.landscape_east_photo_data_url = landscape_east_photo_data_url
        }
      }
    }
    if (!isEmpty(newPlot.landscape_east_photo_url) && newPlot.landscape_east_photo_url.substring(0,4) === 'http'){
      document.getElementById("iUploadEast").className = "icon ion-android-cloud-done"
      document.getElementById("iUploadEast_2").style.visibility = "visible"
    } else {
      document.getElementById("iUploadEast_2").style.visibility = "hidden"
    }


    var landscape_south_photo_data_url = newPlot.landscape_south_photo_data_url
    if (isEmpty(landscape_south_photo_data_url) || landscape_south_photo_data_url === 'landinfo_media/ic_na.png') {
      
      document.getElementById('aUploadSouth').style.display = 'none'

      if (isEmpty(photos_files_name.landscape_south_file)){
         landscape_south_photo_data_url = ''
         document.getElementById('img_landscape_south').style.display = 'none'
      } else {
         document.getElementById("txtSouth_LandScape_Image_Filename").innerHTML = "South : " +  readDateTimeyyyymmdd_hhmmss_ForPhotos('TIME_COLLECTION',photos_files_name.landscape_south_file,'landscape_south')
         document.getElementById('img_landscape_south').style.display = 'block'
         newPlot.landscape_south_photo_data_url = photos_files_name.landscape_south_file
         if (window.cordova){
            readFromFile(photos_files_name.landscape_south_file, function (data) {
                $scope.landscape_south_photo_data_url = data;
            });
         }  
      }
    } else {
      document.getElementById('img_landscape_south').style.display = 'block'
      document.getElementById('aUploadSouth').style.display = 'block'
      if (landscape_south_photo_data_url.substring(0,23) === 'data:image/jpeg;base64,') {
        $scope.landscape_south_photo_data_url = landscape_south_photo_data_url
      } else {
        document.getElementById("txtSouth_LandScape_Image_Filename").innerHTML = "South : " +  readDateTimeyyyymmdd_hhmmss_ForPhotos('TIME_COLLECTION',landscape_south_photo_data_url,'landscape_south')
        if (window.cordova){
          readFromFile(landscape_south_photo_data_url, function (data) {
              $scope.landscape_south_photo_data_url = data;
          });
        } else {
          $scope.landscape_south_photo_data_url = landscape_south_photo_data_url
        }
      }
    }
    if (!isEmpty(newPlot.landscape_south_photo_url) && newPlot.landscape_south_photo_url.substring(0,4) === 'http'){
      document.getElementById("iUploadSouth").className = "icon ion-android-cloud-done"
      document.getElementById("iUploadSouth_2").style.visibility = "visible"
    } else {
      document.getElementById("iUploadSouth_2").style.visibility = "hidden"
    }


    var landscape_west_photo_data_url = newPlot.landscape_west_photo_data_url
    if (isEmpty(landscape_west_photo_data_url) || landscape_west_photo_data_url === 'landinfo_media/ic_na.png') {
      
      document.getElementById('aUploadWest').style.display = 'none'

      if (isEmpty(photos_files_name.landscape_west_file)){
         landscape_west_photo_data_url = ''
         document.getElementById('img_landscape_west').style.display = 'none'
      } else {
         document.getElementById("txtWest_LandScape_Image_Filename").innerHTML = "West : " +  readDateTimeyyyymmdd_hhmmss_ForPhotos('TIME_COLLECTION',photos_files_name.landscape_west_file,'landscape_east')
         document.getElementById('img_landscape_west').style.display = 'block'
         newPlot.landscape_west_photo_data_url = photos_files_name.landscape_west_file
         if (window.cordova){
            readFromFile(photos_files_name.landscape_west_file, function (data) {
                $scope.landscape_west_photo_data_url = data;
            });
         }  
      }
    } else {
      document.getElementById('img_landscape_west').style.display = 'block'
      document.getElementById('aUploadWest').style.display = 'block'
      if (landscape_west_photo_data_url.substring(0,23) === 'data:image/jpeg;base64,') {
        $scope.landscape_west_photo_data_url = landscape_west_photo_data_url
      } else {
        document.getElementById("txtWest_LandScape_Image_Filename").innerHTML = "West : " +  readDateTimeyyyymmdd_hhmmss_ForPhotos('TIME_COLLECTION',landscape_west_photo_data_url,'landscape_west')
        if (window.cordova){
          readFromFile(landscape_west_photo_data_url, function (data) {
              $scope.landscape_west_photo_data_url = data;
          });
        } else {
          $scope.landscape_west_photo_data_url = landscape_west_photo_data_url
        }
      }
    }
    if (!isEmpty(newPlot.landscape_west_photo_url) && newPlot.landscape_west_photo_url.substring(0,4) === 'http'){
      document.getElementById("iUploadWest").className = "icon ion-android-cloud-done"
      document.getElementById("iUploadWest_2").style.visibility = "visible"
    } else {
      document.getElementById("iUploadWest_2").style.visibility = "hidden"
    }




    /* Control Navigator for Photos */
    if (window.cordova) {
      $scope.navigator_soil_pit_photo = 'landpks.landinfo_take_photo_soil_pit_device'
      $scope.navigator_soil_sample_photo = 'landpks.landinfo_take_photo_soil_sample_device'
      $scope.navigator_landscape_photos = 'landpks.landinfo_take_photos_landscape_compass'
      $scope.user_end_point = 'DEVICE'
    } else {
      $scope.navigator_soil_pit_photo = 'landpks.landinfo_take_photo_soil_pit_browser'
      $scope.navigator_soil_sample_photo = 'landpks.landinfo_take_photo_soil_sample_browser'
      $scope.navigator_landscape_photos = 'landpks.landinfo_take_photos_landscape'
      $scope.user_end_point = 'BROWSER'
    }

    /* Control uploaded image */
    $scope.uploadAllPhotos = function(item){
      var confirmPopup = $ionicPopup.confirm({
              title: 'Confirm',
              template: "Do you want to upload all photos to cloud ?"
      })

      confirmPopup.then(function (res) {
          confirmPopup.close()
          if (res) {

              /* Save change to able sync button */
              if (newPlot.status != 'CREATED'){
                newPlot.status = 'NOT_SYNCHRONIZED';
              }
              
              //console.log("Change New Plot Status" + newPlot.status)
              //console.log(newPlot)

              if (window.cordova){
                  // Upload Soil Pit
                  var image_name_soil_pit = newPlot.soil_pit_photo_data_url
                  if (!isEmpty(image_name_soil_pit)){
                    readFromFile(image_name_soil_pit, function (data) {
                        if (!isEmpty(data) && data.substring(0,23) === 'data:image/jpeg;base64,') {
                            if (checkNetConnection()){
                              self_upload(image_name_soil_pit,"SOIL_PIT".toUpperCase(),data)
                            } else {
                             var infoPopup = $ionicPopup.alert({
                               cssClass: 'remove-title-class',
                               template: 'No network connection. Try it later'
                             })
                             infoPopup.then(function (res) {
                              infoPopup.close()
                             })
                            return
                          }
                        }
                    });
                  }

                  //Upload Soil Sample
                  var image_name_soil_sample = newPlot.soil_sample_photo_data_url
                  if (!isEmpty(image_name_soil_sample)){
                      readFromFile(image_name_soil_sample, function (data) {
                          if (!isEmpty(data) && data.substring(0,23) === 'data:image/jpeg;base64,') {
                            if (checkNetConnection()){
                               self_upload(image_name_soil_sample,"SOIL_SAMPLE".toUpperCase(),data)
                            } else {
                               var infoPopup = $ionicPopup.alert({
                                 cssClass: 'remove-title-class',
                                 template: 'No network connection. Try it later'
                               })
                               infoPopup.then(function (res) {
                                infoPopup.close()
                               })
                              return
                            }
                          }
                      });
                  }

                  //Upload LandScape North
                  var image_name_north = newPlot.landscape_north_photo_data_url
                  if (!isEmpty(image_name_north)){
                    readFromFile(image_name_north, function (data) {
                        if (!isEmpty(data) && data.substring(0,23) === 'data:image/jpeg;base64,') {
                          if (checkNetConnection()){
                             self_upload(image_name_north,"LANDSCAPE_NORTH".toUpperCase(),data)
                          } else {
                             var infoPopup = $ionicPopup.alert({
                               cssClass: 'remove-title-class',
                               template: 'No network connection. Try it later'
                             })
                             infoPopup.then(function (res) {
                              infoPopup.close()
                             })
                            return
                          }
                        }
                    });
                  }

                  //Upload LandScape South
                  image_name_south = newPlot.landscape_south_photo_data_url
                  if (!isEmpty(image_name_south)){
                    readFromFile(image_name_south, function (data) {
                        if (!isEmpty(data) && data.substring(0,23) === 'data:image/jpeg;base64,') {
                          if (checkNetConnection()){
                             self_upload(image_name_south,"LANDSCAPE_SOUTH".toUpperCase(),data)
                          } else {
                             var infoPopup = $ionicPopup.alert({
                               cssClass: 'remove-title-class',
                               template: 'No network connection. Try it later'
                             })
                             infoPopup.then(function (res) {
                              infoPopup.close()
                             })
                            return
                          }
                        }
                    });
                  }


                  //Upload LandScape East
                  image_name_east = newPlot.landscape_east_photo_data_url
                  if (!isEmpty(image_name_east)){
                    readFromFile(image_name_east, function (data) {
                        if (!isEmpty(data) && data.substring(0,23) === 'data:image/jpeg;base64,') {
                          if (checkNetConnection()){
                             self_upload(image_name_east,"LANDSCAPE_EAST".toUpperCase(),data)
                          } else {
                             var infoPopup = $ionicPopup.alert({
                               cssClass: 'remove-title-class',
                               template: 'No network connection. Try it later'
                             })
                             infoPopup.then(function (res) {
                              infoPopup.close()
                             })
                            return
                          }
                        }
                    });
                  }


                  //Upload LandScape west
                  image_name_west = newPlot.landscape_west_photo_data_url
                  if (!isEmpty(image_name_west)){
                    readFromFile(image_name_west, function (data) {
                        if (!isEmpty(data) && data.substring(0,23) === 'data:image/jpeg;base64,') {
                          if (checkNetConnection()){
                             self_upload(image_name_west,"LANDSCAPE_WEST".toUpperCase(),data)
                          } else {
                             var infoPopup = $ionicPopup.alert({
                               cssClass: 'remove-title-class',
                               template: 'No network connection. Try it later'
                             })
                             infoPopup.then(function (res) {
                              infoPopup.close()
                             })
                            return
                          }
                        }
                    });
                  }

                  // Create local object to remember all photos file name
                  photos_files_name = JSON.parse(window.localStorage.getItem(newPlot.name + "_PHOTO_FILE_NAMES"))
                  if (isEmpty(photos_files_name)){
                    photos_files_name = {"soil_pit_file":"","soil_sample_file":"","landscape_north_file":"","landscape_south_file":"","landscape_west_file":"","landscape_east_file":""}
                  }
                  photos_files_name.soil_pit_file = image_name_soil_pit
                  photos_files_name.soil_sample_file = image_name_soil_sample
                  photos_files_name.landscape_north_file = image_name_north
                  photos_files_name.landscape_east_file = image_name_east
                  photos_files_name.landscape_south_file = image_name_south
                  photos_files_name.landscape_west_file = image_name_west
                  window.localStorage.setItem(newPlot.name + "_PHOTO_FILE_NAMES",JSON.stringify(photos_files_name))
              }
          }
      })
    }
    $scope.uploadPhotoToCloud = function(item) {
      if (item === 'soil_pit'){

          var confirmPopup = $ionicPopup.confirm({
              title: 'Confirm',
              template: "Do you want to upload Soil Pit photo to cloud ?"
          })

          confirmPopup.then(function (res) {
            confirmPopup.close()
            if (res) {
              if (window.cordova){
                  var image_name = newPlot.soil_pit_photo_data_url
                  if (!isEmpty(image_name)){
                    readFromFile(image_name, function (data) {
                        if (!isEmpty(data) && data.substring(0,23) === 'data:image/jpeg;base64,') {
                            if (checkNetConnection()){
                              self_upload(image_name,item.trim().toUpperCase(),data)
                            } else {
                             var infoPopup = $ionicPopup.alert({
                               cssClass: 'remove-title-class',
                               template: 'No network connection. Try it later'
                             })
                             infoPopup.then(function (res) {
                              infoPopup.close()
                             })
                            return
                          }

                        } else {
                            var infoPopup = $ionicPopup.alert({
                              cssClass: 'remove-title-class',
                              template: 'Error in upload image. Data is not existed'
                            })
                            infoPopup.then(function (res) {
                              infoPopup.close()
                            })
                            return
                        }
                    });
                  }
              }
            }
          })
      } else if (item === 'soil_sample'){
          var confirmPopup = $ionicPopup.confirm({
              title: 'Confirm',
              template: "Do you want to upload Soil Sample photo to cloud ?"
          })
          confirmPopup.then(function (res) {
            confirmPopup.close()
            if (res) {
              if (window.cordova){
                  var image_name = newPlot.soil_sample_photo_data_url
                  if (!isEmpty(image_name)){
                    readFromFile(image_name, function (data) {
                        if (!isEmpty(data) && data.substring(0,23) === 'data:image/jpeg;base64,') {
                          if (checkNetConnection()){
                             self_upload(image_name,item.trim().toUpperCase(),data)
                          } else {
                             var infoPopup = $ionicPopup.alert({
                               cssClass: 'remove-title-class',
                               template: 'No network connection. Try it later'
                             })
                             infoPopup.then(function (res) {
                              infoPopup.close()
                             })
                            return
                          }
                        } else {
                            var infoPopup = $ionicPopup.alert({
                              cssClass: 'remove-title-class',
                              template: 'Error in upload image. Data is not existed'
                            })
                            infoPopup.then(function (res) {
                              infoPopup.close()
                            })
                            return
                        }
                    });
                  }
              }
            }
          })
      } else {
          var image_name = ""
          if (item.trim().toUpperCase() === "LANDSCAPE_NORTH"){
              image_name = newPlot.landscape_north_photo_data_url
          } else if (item.trim().toUpperCase() === "LANDSCAPE_SOUTH") {
              image_name = newPlot.landscape_south_photo_data_url
          } else if (item.trim().toUpperCase() === "LANDSCAPE_EAST"){
              image_name = newPlot.landscape_east_photo_data_url
          } else if (item.trim().toUpperCase() === "LANDSCAPE_WEST"){
              image_name = newPlot.landscape_west_photo_data_url
          }

          var confirmPopup = $ionicPopup.confirm({
              title: 'Confirm',
              template: "Do you want to upload " + item.toUpperCase() + " photo to cloud ?"
          })
          confirmPopup.then(function (res) {
            confirmPopup.close()
            if (res) {
              if (window.cordova){
                  if (!isEmpty(image_name)){
                    readFromFile(image_name, function (data) {
                        if (!isEmpty(data) && data.substring(0,23) === 'data:image/jpeg;base64,') {
                          if (checkNetConnection()){
                             self_upload(image_name,item.trim().toUpperCase(),data)
                          } else {
                             var infoPopup = $ionicPopup.alert({
                               cssClass: 'remove-title-class',
                               template: 'No network connection. Try it later'
                             })
                             infoPopup.then(function (res) {
                              infoPopup.close()
                             })
                            return
                          }
                        } else {
                            var infoPopup = $ionicPopup.alert({
                              cssClass: 'remove-title-class',
                              template: 'Error in upload image. Data is not existed'
                            })
                            infoPopup.then(function (res) {
                              infoPopup.close()
                            })
                            return
                        }
                    });
                  }
              }
            }
          })
      }
    }

    /* Main function : Self Upload */
    function self_upload (file_name, type, dataURL) {
      if (type.trim().toUpperCase() === 'SOIL_PIT') {
        $ionicLoading.show({
          template: 'Uploading photos. Please wait... '
        })
      } else if (type.trim().toUpperCase() === 'SOIL_SAMPLE') {
        $ionicLoading.show({
          template: 'Uploading photos. Please wait...'
        })
      } else {
        $ionicLoading.show({
          template: 'Uploading photos. Please wait...'
        })
      }

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
        timeout: HTTP_TIME_OUT_CONNECTION,
        data: { img_data: dataURL, file_name: file_name, type: type },
      }).success(
        function (data, status, headers, config) {
          $ionicLoading.hide()
          if (type.trim().toUpperCase() === 'SOIL_PIT') {
            newPlot.soil_pit_photo_url = data.trim()
            //seeToast2($translate.instant('landpks_app.landinfo_photos.pit_toast_image_uploaded'),3000)
            document.getElementById("iUploadPit").className = "icon ion-android-cloud-done"
            document.getElementById("iUploadPit_2").style.visibility = "visible"

          } else if (type.trim().toUpperCase() === 'SOIL_SAMPLE') {
            newPlot.soil_samples_photo_url = data.trim()
            //seeToast2($translate.instant('landpks_app.landinfo_photos.sample_toast_image_uploaded'),3000)
            document.getElementById("iUploadSample").className = "icon ion-android-cloud-done"
            document.getElementById("iUploadSample_2").style.visibility = "visible"
          } else if (type.trim().toUpperCase() === 'LANDSCAPE_NORTH'){
            newPlot.landscape_north_photo_url = data.trim()
            //seeToast2($translate.instant('landpks_app.landinfo_photos.landscape_north_image_uploaded'),3000)
            document.getElementById("iUploadNorth").className = "icon ion-android-cloud-done"
            document.getElementById("iUploadNorth_2").style.visibility = "visible"
          } else if (type.trim().toUpperCase() === 'LANDSCAPE_SOUTH') {
            newPlot.landscape_south_photo_url = data.trim()
            //seeToast2($translate.instant('landpks_app.landinfo_photos.landscape_south_image_uploaded'),3000)
            document.getElementById("iUploadSouth").className = "icon ion-android-cloud-done"
            document.getElementById("iUploadSouth_2").style.visibility = "visible"
          } else if (type.trim().toUpperCase() === 'LANDSCAPE_EAST') {
            newPlot.landscape_east_photo_url = data.trim()
            //seeToast2($translate.instant('landpks_app.landinfo_photos.landscape_east_image_uploaded'),3000)
            document.getElementById("iUploadEast").className = "icon ion-android-cloud-done"
            document.getElementById("iUploadEast_2").style.visibility = "visible"
          } else if (type.trim().toUpperCase() === 'LANDSCAPE_WEST') {
            newPlot.landscape_west_photo_url = data.trim()
            //seeToast2($translate.instant('landpks_app.landinfo_photos.landscape_west_image_uploaded'),3000)
            document.getElementById("iUploadWest").className = "icon ion-android-cloud-done"
            document.getElementById("iUploadWest_2").style.visibility = "visible"
          }
          seeToast2($translate.instant('landpks_app.landinfo_photos.all_photos_uploaded'),3000)
          document.getElementById("iUploadAll").className = "icon ion-android-cloud-done"
          window.localStorage.setItem('current_edit_plot', JSON.stringify(newPlot))
          window.localStorage.setItem('current_view_plot', JSON.stringify(newPlot))
          plotListService.updateCachedPlot(LIST_PLOTS, newPlot)
          return
        }).error(function (err) {
          $ionicLoading.hide()
          var infoPopup = $ionicPopup.alert({
            cssClass: 'remove-title-class',
            template: 'Error in upload image. No network' + err.error
          })
          infoPopup.then(function (res) {
            infoPopup.close()
          })
          return
      })
    }

    $scope.goto_TakePicture_SoilSamplePhoto = function () {
      if (window.cordova) {

        
        Date.now = function () { return new Date().getTime(); }
        var image_name = newPlot.name + '_soil_sample_' + Date.now() + '.jpg'
        

        if (!isEmpty($scope.soil_sample_photo_data_url)) {
          var confirmPopup = $ionicPopup.confirm({
            title: 'Confirm',
            template: $translate.instant('landpks_app.landinfo_photos.sample_confirm_message')
          })

          confirmPopup.then(function (res) {
            confirmPopup.close()
            if (res) {
              confirmPopup.close()
              var dataURL = ''
              $cordovaCamera.getPicture(PHOTO_OPTIONS)
                .then(function (imageData) {
                  $scope.soil_sample_photo_data_url = 'data:image/jpeg;base64,' + imageData
                  dataURL = $scope.soil_sample_photo_data_url
                  writeToFile(image_name,dataURL)
                  newPlot.soil_sample_photo_data_url = image_name

                  seeToast2($translate.instant('landpks_app.landinfo_photos.sample_toast_image_created'),3000)
                  newPlot.soil_samples_photo_url = ''
                  document.getElementById('img_soil_sample_photo').style.display = 'block'
                  document.getElementById("txtSoilSample_Image_Filename").innerHTML = " " +  readDateTimeyyyymmdd_hhmmss_ForPhotos('TIME_COLLECTION',image_name,'soil_sample')
                  document.getElementById("iUploadSample").className = "icon ion-ios-cloud-upload"
                  document.getElementById("iUploadSample_2").style.visibility = "hidden"
                  window.localStorage.setItem('current_edit_plot', JSON.stringify(newPlot))
                  plotListService.updateCachedPlot(LIST_PLOTS, newPlot)

                  /* Save to temp */
                  debugService.savePhotoFilesNamesTemp(newPlot,"soil_sample",image_name)

                  $state.go('landpks.landinfo_photos')

                }, function (error) {
                  console.log('Camera error : ' + angular.toJson(error))
                })
            } else {
              return false
            }
          })
        } else {
          var dataURL = ''

          $cordovaCamera.getPicture(PHOTO_OPTIONS)
            .then(function (imageData) {
              $scope.soil_sample_photo_data_url = 'data:image/jpeg;base64,' + imageData
              dataURL = $scope.soil_sample_photo_data_url
              writeToFile(image_name,dataURL)
              newPlot.soil_sample_photo_data_url = image_name

              seeToast2($translate.instant('landpks_app.landinfo_photos.sample_toast_image_created'),3000)
              newPlot.soil_samples_photo_url = ''
              document.getElementById('img_soil_sample_photo').style.display = 'block'
              document.getElementById("txtSoilSample_Image_Filename").innerHTML = " " +  readDateTimeyyyymmdd_hhmmss_ForPhotos('TIME_COLLECTION',image_name,'soil_sample')
              document.getElementById("iUploadSample").className = "icon ion-ios-cloud-upload"
              document.getElementById("iUploadSample_2").style.visibility = "hidden"
              window.localStorage.setItem('current_edit_plot', JSON.stringify(newPlot))
              plotListService.updateCachedPlot(LIST_PLOTS, newPlot)

              /* Save to temp */
              debugService.savePhotoFilesNamesTemp(newPlot,"soil_sample",image_name)

              $state.go('landpks.landinfo_photos')

            }, function (error) {
              console.log('Camera error : ' + angular.toJson(error))
            })
        }
      } else {
        /* Deprecated soon - No more work for Web App */
        if (!isEmpty($scope.soil_sample_photo_data_url)) {
          var confirmPopup = $ionicPopup.confirm({
            title: 'Confirm',
            template: 'This will permanently delete the current soil sample photo for this plot. Are you sure you want to clear this data ? This cannot be undone'
          })

          confirmPopup.then(function (res) {
            if (res) {
              confirmPopup.close()
              $state.go('landpks.landinfo_take_photo_soil_sample_browser')
            } else {
              return false
            }
          })
        } else {
          $state.go('landpks.landinfo_take_photo_soil_sample_browser')
        }
      }
    }

    $scope.goto_TakePicture_SoilPitPhoto = function () {
      if (window.cordova) {

       
        Date.now = function () { return new Date().getTime(); }
        var image_name = newPlot.name + '_soil_pit_' + Date.now() + '.jpg'
       

        if (!isEmpty($scope.soil_pit_photo_data_url)) {
          var confirmPopup = $ionicPopup.confirm({
            title: 'Confirm',
            template: $translate.instant('landpks_app.landinfo_photos.pit_confirm_message')
          })

          confirmPopup.then(function (res) {
            confirmPopup.close()
            if (res) {
              confirmPopup.close()
              var dataURL = ''
              $cordovaCamera.getPicture(PHOTO_OPTIONS)
                .then(function (imageData) {
                  $scope.soil_pit_photo_data_url = 'data:image/jpeg;base64,' + imageData
                  dataURL = $scope.soil_pit_photo_data_url
                  /* Store image to file newPlot.soil_pit_photo_file */
                  writeToFile(image_name,dataURL)
                  newPlot.soil_pit_photo_data_url = image_name

                  seeToast2($translate.instant('landpks_app.landinfo_photos.pit_toast_image_created'),3000)
                  newPlot.soil_pit_photo_url = ''
                  document.getElementById('img_soil_pit_photo').style.display = 'block'
                  document.getElementById("txtSoilPit_Image_Filename").innerHTML = " " +  readDateTimeyyyymmdd_hhmmss_ForPhotos('TIME_COLLECTION',image_name,'soil_pit')
                  document.getElementById("iUploadPit").className = "icon ion-ios-cloud-upload"
                  document.getElementById("iUploadPit_2").style.visibility = "hidden"
                  window.localStorage.setItem('current_edit_plot', JSON.stringify(newPlot))
                  plotListService.updateCachedPlot(LIST_PLOTS, newPlot)

                  /* Save to temp */
                  debugService.savePhotoFilesNamesTemp(newPlot,"soil_pit",image_name)

                  $state.go('landpks.landinfo_photos')

                }, function (error) {
                  console.log('Camera error : ' + angular.toJson(error))
                })
            } else {
              return false
            }
          })
        } else {
          var dataURL = ''
          $cordovaCamera.getPicture(PHOTO_OPTIONS)
            .then(function (imageData) {
              $scope.soil_pit_photo_data_url = 'data:image/jpeg;base64,' + imageData
              dataURL = $scope.soil_pit_photo_data_url
              writeToFile(image_name,dataURL)
              newPlot.soil_pit_photo_data_url = image_name

              seeToast2($translate.instant('landpks_app.landinfo_photos.pit_toast_image_created'),3000)
              newPlot.soil_pit_photo_url = ''
              document.getElementById('img_soil_pit_photo').style.display = 'block'
              document.getElementById("txtSoilPit_Image_Filename").innerHTML = " " +  readDateTimeyyyymmdd_hhmmss_ForPhotos('TIME_COLLECTION',image_name,'soil_pit')
              document.getElementById("iUploadPit").className = "icon ion-ios-cloud-upload"
              document.getElementById("iUploadPit_2").style.visibility = "hidden"
              window.localStorage.setItem('current_edit_plot', JSON.stringify(newPlot))
              plotListService.updateCachedPlot(LIST_PLOTS, newPlot)

              /* Save to temp */
              debugService.savePhotoFilesNamesTemp(newPlot,"soil_pit",image_name)

              $state.go('landpks.landinfo_photos')

            }, function (error) {
              console.log('Camera error : ' + angular.toJson(error))
            })
        }
      } else {
        /* Deprecated soon - No more work for Web App */
        if (!isEmpty($scope.soil_pit_photo_data_url)) {
          var confirmPopup = $ionicPopup.confirm({
            title: 'Confirm',
            template: 'This will permanently delete the current soil pit photo for this plot. Are you sure you want to clear this data ? This cannot be undone'
          })

          confirmPopup.then(function (res) {
            if (res) {
              confirmPopup.close()
              $state.go('landpks.landinfo_take_photo_soil_pit_browser')
            } else {
              return false
            }
          })
        } else {
          $state.go('landpks.landinfo_take_photo_soil_pit_browser')
        }
      }
    }

    $scope.goToCompass_LandScape = function () {
      if (!isEmpty($scope.landscape_north_photo_data_url)
        || !isEmpty($scope.landscape_south_photo_data_url)
        || !isEmpty($scope.landscape_east_photo_data_url)
        || !isEmpty($scope.landscape_west_photo_data_url)
      ) {
        var confirmPopup = $ionicPopup.confirm({
          title: 'Confirm',
          template: $translate.instant('landpks_app.landinfo_photos.landscape_confirm_message')
        })

        confirmPopup.then(function (res) {
          if (res) {
            confirmPopup.close()
            newPlot.landscape_north_photo_data_url = ''
            newPlot.landscape_north_photo_url = ''
            newPlot.landscape_south_photo_data_url = ''
            newPlot.landscape_south_photo_url = ''
            newPlot.landscape_east_photo_data_url = ''
            newPlot.landscape_east_photo_url = ''
            newPlot.landscape_west_photo_data_url = ''
            newPlot.landscape_west_photo_url =''
            window.localStorage.setItem('current_edit_plot', JSON.stringify(newPlot))
            window.localStorage.setItem('current_view_plot', JSON.stringify(newPlot))
            if (window.cordova) {
              $state.go('landpks.landinfo_take_photos_landscape_off_compass')
            } else {
              $state.go('landpks.landinfo_take_photos_landscape')
            }
          } else {
            return false
          }
        })
      } else {
        if (window.cordova) {
          $state.go('landpks.landinfo_take_photos_landscape_off_compass')
        } else {
          $state.go('landpks.landinfo_take_photos_landscape')
        }
      }
    }

    $scope.completeAddPlot_Photos = function (item) {
      newPlot = JSON.parse(window.localStorage.getItem('current_edit_plot'))
      if (!isEmpty(newPlot.soil_pit_photo_data_url)
        || !isEmpty(newPlot.soil_sample_photo_data_url)
        || !isEmpty(newPlot.landscape_north_photo_data_url)
        || !isEmpty(newPlot.landscape_east_photo_data_url)
        || !isEmpty(newPlot.landscape_south_photo_data_url)
        || !isEmpty(newPlot.landscape_west_photo_data_url)
      ) {
        newPlot.isPhotosDoing = true
        //newPlot.isPhotosCompleted = true
      }

      if (!isEmpty(newPlot.soil_pit_photo_data_url)
        && !isEmpty(newPlot.soil_sample_photo_data_url)
        && !isEmpty(newPlot.landscape_north_photo_data_url)
        && !isEmpty(newPlot.landscape_east_photo_data_url)
        && !isEmpty(newPlot.landscape_south_photo_data_url)
        && !isEmpty(newPlot.landscape_west_photo_data_url)
      ) {
        //newPlot.isPhotosDoing = true
        newPlot.isPhotosCompleted = true
      } else {
        newPlot.isPhotosCompleted = false
      }

      newPlot.notes = $scope.data.notes

      updatePlotExist(newPlot.real_name, newPlot.recorder_name, LIST_PLOTS, newPlot)
      window.localStorage.setItem(email + '_' + 'LIST_LANDINFO_PLOTS', JSON.stringify(LIST_PLOTS))
      window.localStorage.setItem('current_edit_plot', JSON.stringify(newPlot))
      if (item === 'NEWPLOT_PAGE') {
        // window.localStorage.setItem("PREVIOUS_PAGE_CONNECT","LANDINFO_ADDPLOT_PHOTOS_PAGE")
        $state.go('landpks.landinfo_newplot')
      } else if (item === 'SOILLAYERS_PAGE') {
        $state.go('landpks.landinfo_soillayers')
      } else if (item === 'REVIEW_PAGE') {
        $state.go('landpks.landinfo_review')
      } else {
        // window.localStorage.setItem("PREVIOUS_PAGE_CONNECT","LANDINFO_ADDPLOT_PHOTOS_PAGE")
        $state.go('landpks.landinfo_newplot')
      }
    }

    $scope.showNotesPopup = function () {
      var myPopup = $ionicPopup.show({
        template: '<textarea cols="40" rows="5" ng-model="data.notes" value="{{data.notes}}"></textarea>',
        title: '<p align="left">Notes for ' + $scope.plot_name + '</p>',
        scope: $scope,
        buttons: [
          {
            text: 'Cancel',
            onTap: function (e) {
              $scope.data.notes = newPlot.notes
              return
            }
          },
          {
            text: '<b>Save</b>',
            type: 'button-positive',
            onTap: function (e) {
              if (!$scope.data.notes) {
              } else {
                return $scope.data.notes
              }
            }
          },

        ]
      })
      myPopup.then(function (res) {
        console.log('Tap')
      })
    }

    document.getElementById('soilPitUpload').onchange = function(){
        var filesSelected = document.getElementById("soilPitUpload").files;
        if (filesSelected.length > 0)
        {
           var fileToLoad = filesSelected[0];

           //var fileType = fileToLoad["type"]
           if (fileToLoad.type.match("image.*"))
           {
               var fileReader = new FileReader();
               fileReader.onload = function(fileLoadedEvent)
               {
                   document.getElementById('img_soil_pit_photo').src = fileLoadedEvent.target.result
                   //document.getElementById('img_soil_pit_photo').src = fileLoadedEvent.target.result
                   var image_data = fileLoadedEvent.target.result
                   /* Upload to Server */
                   var image_name = newPlot.recorder_name + '_' + newPlot.real_name + '_soil_pit_' + Date.now() + '.jpg'
                   upload_landinfo_photo(image_name,'soil_pit',image_data,$http,$ionicLoading)
                   /* End upload */

                   /* Save data to main object */
                   var full_link = LANDPKS_LANDINFO_IMAGES_STORE_DIR + 'soil_pit/' + image_name
                   newPlot.soil_pit_photo_data_url = full_link.trim()
                   //newPlot.soil_pit_photo_data_url = image_data
                   newPlot.soil_pit_photo_url = full_link.trim()
                   //newPlot.soil_pit_photo_url = image_data

                   window.localStorage.setItem('current_edit_plot', JSON.stringify(newPlot))
                   document.getElementById("txtSoilPit_Image_Filename").innerHTML = " " +  readDateTimeyyyymmdd_hhmmss_ForPhotos('TIME_COLLECTION',newPlot.soil_pit_photo_data_url,'soil_pit')
                   //$state.reload()
               };
               fileReader.readAsDataURL(fileToLoad);

           } else {
             var fullPath = this.value
             var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
             var filename = fullPath.substring(startIndex);
             if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
               filename = filename.substring(1);
             }
             var infoPopup = $ionicPopup.alert({
               cssClass: 'remove-title-class',
               template: 'Selected file ' + filename + ' is not image file. Please select other file'
             })
             infoPopup.then(function (res) {
               infoPopup.close()
             })
             return
           }
        }
    };

    document.getElementById('soilSampleUpload').onchange = function(){
        var filesSelected = document.getElementById("soilSampleUpload").files;
        if (filesSelected.length > 0)
        {
           var fileToLoad = filesSelected[0];
           if (fileToLoad.type.match("image.*"))
           {
               var fileReader = new FileReader();
               fileReader.onload = function(fileLoadedEvent)
               {
                   document.getElementById('img_soil_sample_photo').src = fileLoadedEvent.target.result
                   var image_data = fileLoadedEvent.target.result
                   /* Upload to Server */
                   var image_name = newPlot.recorder_name + '_' + newPlot.real_name + '_soil_sample_' + Date.now() + '.jpg'
                   upload_landinfo_photo(image_name,'soil_sample',image_data,$http,$ionicLoading)
                   /* End upload */

                   /* Save data to main object */
                   var full_link = LANDPKS_LANDINFO_IMAGES_STORE_DIR + 'soil_sample/' + image_name
                   newPlot.soil_sample_photo_data_url = full_link.trim()
                   newPlot.soil_samples_photo_url = full_link.trim()

                   window.localStorage.setItem('current_edit_plot', JSON.stringify(newPlot))
                   document.getElementById("txtSoilSample_Image_Filename").innerHTML = " " +  readDateTimeyyyymmdd_hhmmss_ForPhotos('TIME_COLLECTION',newPlot.soil_sample_photo_data_url,'soil_sample')
                   //$state.reload()
               };
               fileReader.readAsDataURL(fileToLoad);

           } else {
             var fullPath = this.value
             var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
             var filename = fullPath.substring(startIndex);
             if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
               filename = filename.substring(1);
             }
             var infoPopup = $ionicPopup.alert({
               cssClass: 'remove-title-class',
               template: 'Selected file ' + filename + ' is not image file. Please select other file'
             })
             infoPopup.then(function (res) {
               infoPopup.close()
             })
             return
           }
        }
    };
  })
  /****************************************/
  /** Take_Photo_Soil_Pit_Device_Ctrl **/
  /****************************************/
  .controller('Take_Photo_Soil_Pit_Device_Ctrl', function ($scope, $state, $ionicLoading, $http, $cordovaCamera, $ionicHistory, $ionicPopup) {
    // if (window.cordova){
    //    screen.lockOrientation('portrait')
    // }
    var newPlot = JSON.parse(window.localStorage.getItem('current_edit_plot'))
    if (!isEmpty(newPlot.soil_pit_photo_url)) {
      $scope.pictureURL = newPlot.soil_pit_photo_url
    } else {
      $scope.pictureURL = 'http://placehold.it/300x300'
    }
    var options = {
      quality: 100,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: false,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 640,
      targetHeight: 480,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false,
      correctOrientation: true
    }
    var dataURL = ''
    $scope.takePicture = function () {
      $cordovaCamera.getPicture(options)
        .then(function (imageData) {
          $scope.pictureURL = 'data:image/jpeg;base64,' + imageData
          dataURL = $scope.pictureURL
        }, function (error) {
          console.log('Camera error : ' + angular.toJson(error))
        })
    }

    function self_upload (file_name, type) {
      $ionicLoading.show({
        template: 'Uploading soil pit photo. Please wait...'
      })

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
        timeout: HTTP_TIME_OUT_CONNECTION,
        data: { img_data: dataURL, file_name: file_name, type: type },
      }).success(
        function (data, status, headers, config) {
          $ionicLoading.hide()
          newPlot.soil_pit_photo_data_url = data.trim()
          newPlot.soil_pit_photo_url = data.trim()
          window.localStorage.setItem('current_edit_plot', JSON.stringify(newPlot))
          $ionicHistory.clearCache()
          $state.go('landpks.landinfo_photos')
        }).error(function (err) {
        $ionicLoading.hide()
        var infoPopup = $ionicPopup.alert({
          cssClass: 'remove-title-class',
          template: 'Error in upload image' + err.error
        })
        infoPopup.then(function (res) {
          infoPopup.close()
        })
        return
      })
    }

    $scope.saveSoilPitPicture = function () {
      if (!isEmpty(newPlot.soil_pit_photo_url)) {
        var confirm_save = confirm('Do you want to change soil pit photo ?')
        if (confirm_save === true) {
          var image_name = newPlot.recorder_name + '_' + newPlot.real_name + '_soil_pit.jpg'
          self_upload(image_name, 'soil_pit')
        } else {
          return
        }
      } else {
        var image_name = newPlot.recorder_name + '_' + newPlot.real_name + '_soil_pit.jpg'
        self_upload(image_name, 'soil_pit')
      }
    }
  })
  /****************************************/
  /** Take_Photo_Soil_Sample_Device_Ctrl **/
  /****************************************/
  .controller('Take_Photo_Soil_Sample_Device_Ctrl', function ($scope, $state, $ionicLoading, $http, $cordovaCamera, $ionicHistory, $ionicPopup) {
    // if (window.cordova){
    //    screen.lockOrientation('portrait')
    // }
    var newPlot = JSON.parse(window.localStorage.getItem('current_edit_plot'))
    if (!isEmpty(newPlot.soil_samples_photo_url)) {
      $scope.pictureURL = newPlot.soil_samples_photo_url
    } else {
      $scope.pictureURL = 'http://placehold.it/300x300'
    }
    var options = {
      quality: 100,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: false,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 640,
      targetHeight: 480,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false,
      correctOrientation: true
    }
    var dataURL = ''
    $scope.takePicture = function () {
      $cordovaCamera.getPicture(options)
        .then(function (imageData) {
          $scope.pictureURL = 'data:image/jpeg;base64,' + imageData
          dataURL = $scope.pictureURL
        }, function (error) {
          console.log('Camera error : ' + angular.toJson(error))
        })
    }

    function self_upload (file_name, type) {
      $ionicLoading.show({
        template: 'Uploading soil sample photo. Please wait...'
      })

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
        timeout: HTTP_TIME_OUT_CONNECTION,
        data: { img_data: dataURL, file_name: file_name, type: type },
      }).success(
        function (data, status, headers, config) {
          $ionicLoading.hide()
          newPlot.soil_sample_photo_data_url = data.trim()
          newPlot.soil_samples_photo_url = data.trim()
          window.localStorage.setItem('current_edit_plot', JSON.stringify(newPlot))
          $ionicHistory.clearCache()
          $state.go('landpks.landinfo_photos')
        }).error(function (err) {
        $ionicLoading.hide()
        var infoPopup = $ionicPopup.alert({
          cssClass: 'remove-title-class',
          template: 'Error in upload image' + err.error
        })
        infoPopup.then(function (res) {
          infoPopup.close()
        })
        return
      })
    }

    $scope.saveSoilSamplePicture = function () {
      if (!isEmpty(newPlot.soil_samples_photo_url)) {
        var confirm_save = confirm('Do you want to change soil sample photo ?')
        if (confirm_save === true) {
          var image_name = newPlot.recorder_name + '_' + newPlot.real_name + '_soil_sample.jpg'
          self_upload(image_name, 'soil_sample')
        } else {
          return
        }
      } else {
        var image_name = newPlot.recorder_name + '_' + newPlot.real_name + '_soil_sample.jpg'
        self_upload(image_name, 'soil_sample')
      }
    }
  })
  /****************************************/
  /** Take_Photo_Soil_Pit_Browser_Ctrl **/
  /****************************************/
  .controller('Take_Photo_Soil_Pit_Browser_Ctrl', function ($scope, $state, $http, $ionicLoading, $ionicPopup) {
    var typeBrowser = getTypeWebBrowser()
    if (typeBrowser != 'FIREFOX') {
      var infoPopup = $ionicPopup.alert({
        cssClass: 'remove-title-class',
        template: TAKE_PHOTO_ERROR_MESSAGE_ON_WEB_APP
      })
      infoPopup.then(function (res) {
        infoPopup.close()
      })
    }
    var newPlot = JSON.parse(window.localStorage.getItem('current_edit_plot'))
    var canvas = document.getElementById('canvas')
    var context = canvas.getContext('2d')
    var video = document.getElementById('video')
    var streaming = false
    var access_token = ''
    /* Test thu nghiem */
    try{
        navigator.getMedia = (navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia)

        navigator.getMedia(
          {
            video: true,
            audio: false
          },
          function (stream) {
            if (navigator.mozGetUserMedia) {
              video.mozSrcObject = stream
            } else {
              var vendorURL = window.URL || window.webkitURL
              video.src = vendorURL.createObjectURL(stream)
            }
            video.play()
          },
          function (err) {
            console.log('An error occured! ' + err)
          }
        )

        video.addEventListener('canplay', function (ev) {
          if (!streaming) {
            streaming = true
          }
        }, false)
      } catch (e){
        console.log(e)
      }

    function self_upload (file_name, type) {
      $ionicLoading.show({
        template: 'Uploading soil pit photo. Please wait...'
      })
      context.drawImage(video, 0, 0, LANDPKS_LANDINFO_IMAGE_WIDTH_SIZE, LANDPKS_LANDINFO_IMAGE_HEIGHT_SIZE)
      var dataURL = canvas.toDataURL(LANDPKS_LANDINFO_IMAGE_FILE_EXTENTION, LANDPKS_LANDINFO_IMAGE_QUALITY_1)
      var imageData = dataURL
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
        timeout: HTTP_TIME_OUT_CONNECTION,
        data: { img_data: imageData, file_name: file_name, type: type },
      }).success(
        function (data, status, headers, config) {
          $ionicLoading.hide()
          newPlot.soil_pit_photo_data_url = data.trim()
          newPlot.soil_pit_photo_url = data.trim()
          window.localStorage.setItem('current_edit_plot', JSON.stringify(newPlot))
          $state.go('landpks.landinfo_photos')
        }).error(function (err) {
          $ionicLoading.hide()
          var infoPopup = $ionicPopup.alert({
            cssClass: 'remove-title-class',
            template: 'Error in upload photo ' + err.error
          })
          infoPopup.then(function (res) {
            infoPopup.close()
          })
          return
      })
    }

    // Trigger photo take
    document.getElementById('snap').addEventListener('click', function () {
      Date.now = function () { return new Date().getTime(); }
      var image_name = newPlot.recorder_name + '_' + newPlot.real_name  + '_soil_pit_' + Date.now() + '.jpg'
      self_upload(image_name, 'soil_pit')
    })
  })
  /****************************************/
  /** Take_Photo_Soil_Sample_Ctrl **/
  /****************************************/
  .controller('Take_Photo_Soil_Sample_Browser_Ctrl', function ($scope, $state, $http, $ionicLoading, $ionicPopup) {
    var typeBrowser = getTypeWebBrowser()
    if (typeBrowser != 'FIREFOX') {
      var infoPopup = $ionicPopup.alert({
        cssClass: 'remove-title-class',
        template: TAKE_PHOTO_ERROR_MESSAGE_ON_WEB_APP
      })
      infoPopup.then(function (res) {
        infoPopup.close()
      })
    }
    var newPlot = JSON.parse(window.localStorage.getItem('current_edit_plot'))
    var canvas = document.getElementById('canvas')
    var context = canvas.getContext('2d')
    var video = document.getElementById('video')

    /*
    var videoObj = { 'video': true }
    var errBack = function (error) {
      console.log(error)
      console.log('Video capture error: ' + error.code)
    }

    if (navigator.getUserMedia) { // Standard
      navigator.getUserMedia(videoObj, function (stream) {
        video.src = stream
        video.play()
      }, errBack)
    } else if (navigator.webkitGetUserMedia) { // WebKit-prefixed
      navigator.webkitGetUserMedia(videoObj, function (stream) {
        video.src = window.webkitURL.createObjectURL(stream)
        video.play()
      }, errBack)
    } else if (navigator.mozGetUserMedia) { // Firefox-prefixed
      navigator.mozGetUserMedia(videoObj, function (stream) {
        video.src = window.URL.createObjectURL(stream)
        video.play()
      }, errBack)
    }
    */
    try{
        navigator.getMedia = (navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia)

        navigator.getMedia(
          {
            video: true,
            audio: false
          },
          function (stream) {
            if (navigator.mozGetUserMedia) {
              video.mozSrcObject = stream
            } else {
              var vendorURL = window.URL || window.webkitURL
              video.src = vendorURL.createObjectURL(stream)
            }
            video.play()
          },
          function (err) {
            console.log('An error occured! ' + err)
          }
        )

        video.addEventListener('canplay', function (ev) {
          if (!streaming) {
            streaming = true
          }
        }, false)
    } catch (e){
        console.log(e)
    }

    function self_upload (file_name, type) {
      $ionicLoading.show({
        template: 'Uploading soil sample photo. Please wait...'
      })
      context.drawImage(video, 0, 0, LANDPKS_LANDINFO_IMAGE_WIDTH_SIZE, LANDPKS_LANDINFO_IMAGE_HEIGHT_SIZE)
      var dataURL = canvas.toDataURL(LANDPKS_LANDINFO_IMAGE_FILE_EXTENTION, LANDPKS_LANDINFO_IMAGE_QUALITY_1)
      var imageData = dataURL
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
        timeout: HTTP_TIME_OUT_CONNECTION,
        data: { img_data: imageData, file_name: file_name, type: type },
      }).success(
        function (data, status, headers, config) {
          $ionicLoading.hide()
          newPlot.soil_sample_photo_data_url = data.trim()
          newPlot.soil_samples_photo_url = data.trim()
          window.localStorage.setItem('current_edit_plot', JSON.stringify(newPlot))
          $state.go('landpks.landinfo_photos')
        }).error(function (err) {
          $ionicLoading.hide()
          var infoPopup = $ionicPopup.alert({
            cssClass: 'remove-title-class',
            template: 'Error in upload photo ' + err.error
          })
          infoPopup.then(function (res) {
            infoPopup.close()
          })
          return
      })
    }

    // Trigger photo take
    document.getElementById('snap').addEventListener('click', function () {
      Date.now = function () { return new Date().getTime(); }
      var image_name = newPlot.recorder_name + '_' + newPlot.real_name + '_soil_sample_' +  Date.now() + '.jpg'
      self_upload(image_name, 'soil_sample')
    })
  })

  /****************************************/
  /** AddPlot_LandCover_Ctrl **/
  /****************************************/
  .controller('DataInput_LandCover_Ctrl', function ($scope, $state, $ionicPopup, $ionicPlatform, $translate, plotListService) {
    //var flooded = document.getElementById("flooded");
    //flooded.classList.add("lpks-img-active");
    //flooded.style.border = "5px solid black";

    var cover = {
      "TREE":'landinfo_media/landcover_images/ic_tree.png',
      "SHRUBLAND":"landinfo_media/landcover_images/ic_shrub.png",
      "GRASSLAND":"landinfo_media/landcover_images/ic_grass_land.png",
      "SAVANNA":"landinfo_media/landcover_images/ic_savanna.png",
      "GARDEN/MIXED":"landinfo_media/landcover_images/ic_garden_mixed.png",
      "CROPLAND":"landinfo_media/landcover_images/ic_cropland.png",
      "DEVELOPED":"landinfo_media/landcover_images/ic_developed.png",
      "BARREN":"landinfo_media/landcover_images/ic_barren.png",
      "WATER":"landinfo_media/landcover_images/ic_water.png"
    };
    var coverToast = {
      "TREE":'landinfo_common.tree',
      "SHRUBLAND":"landinfo_common.shrubland",
      "GRASSLAND":"landinfo_common.grassland",
      "SAVANNA":"landinfo_common.savanna",
      "GARDEN/MIXED":"landinfo_common.garden",
      "CROPLAND":"landinfo_common.cropland",
      "DEVELOPED":"landinfo_common.developed",
      "BARREN":"landinfo_common.barren",
      "WATER":"landinfo_common.water"
    };
    var flood = {
      true:"landinfo_media/landcover_images/ic_flooded.png",
      false:"landinfo_media/landcover_images/ic_not_flooded.png"
    }
    $scope.landcover_current_flooded = 'landinfo_media/landcover_images/ic_flooded.png'
    $scope.landcover_current_no_flooded = 'landinfo_media/landcover_images/ic_not_flooded.png'

    $scope.landcover_current_tree = 'landinfo_media/landcover_images/ic_tree.png'
    $scope.landcover_current_shrub = 'landinfo_media/landcover_images/ic_shrub.png'
    $scope.landcover_current_grass_land = 'landinfo_media/landcover_images/ic_grass_land.png'
    $scope.landcover_current_savana = 'landinfo_media/landcover_images/ic_savanna.png'
    $scope.landcover_current_garden_mixed = 'landinfo_media/landcover_images/ic_garden_mixed.png'
    $scope.landcover_current_cropland = 'landinfo_media/landcover_images/ic_cropland.png'
    $scope.landcover_current_developed = 'landinfo_media/landcover_images/ic_developed.png'
    $scope.landcover_current_barren = 'landinfo_media/landcover_images/ic_barren.png'
    $scope.landcover_current_water = 'landinfo_media/landcover_images/ic_water.png'



    var recorder_name = window.localStorage.getItem('current_email')
    var email = recorder_name
    var currentPlot = JSON.parse(window.localStorage.getItem('current_view_plot'))
    var LIST_PLOTS = JSON.parse(window.localStorage.getItem(recorder_name + '_' + 'LIST_LANDINFO_PLOTS'))

    $scope.plot_name = currentPlot.name
    initDisplay()


    function initDisplay() {
      //Check to see if we have an existing floooding value and set appropriate image
      var flooding_data = currentPlot.flooding;
      if (typeof flooding_data != 'undefined' && !isEmpty(flooding_data)) {
        flooding_data = flooding_data.trim().toUpperCase()
        if (flooding_data == "TRUE"){
          var flooded = document.getElementById("flooded");
          flooded.classList.add("lpks-img-active");
        } else {
          var notFlooded = document.getElementById("not-flooded");
          notFlooded.classList.add("lpks-img-active");
        }
      }

      //Check to see if we have an existing cover value and set appropriate image
      var cover_data = currentPlot.land_cover;
      console.log(cover_data);
      if (typeof cover_data != 'undefined' && !isEmpty(cover_data)) {
        cover_data = cover_data.trim().toUpperCase()
        var cover_img = document.getElementById(cover_data);
        if( cover_img != undefined && !isEmpty(cover_img) ){
          cover_img.classList.add("lpks-img-active")
        }
      }
    }


    $scope.selectFlood = function (item) {
      var flooded = document.getElementById("flooded");
      var notFlooded = document.getElementById("not-flooded");
      switch (item) {
        case 'flooded':
          flooded.classList.add("lpks-img-active");
          notFlooded.classList.remove("lpks-img-active");
          seeToast2($translate.instant('landinfo_common.flooding'), 2000)
          if (currentPlot.flooding != "TRUE" ) {
            currentPlot.flooding = "TRUE";
            if (currentPlot.status != 'CREATED'){
              currentPlot.status = 'NOT_SYNCHRONIZED';
            }
            plotListService.updateCachedPlot(LIST_PLOTS, currentPlot);
          }
          break
        case 'not_flooded':
          flooded.classList.remove("lpks-img-active");
          notFlooded.classList.add("lpks-img-active");
          seeToast2($translate.instant('landinfo_common.no_flooding'), 2000)
          if (currentPlot.flooding != "FALSE" ) {
            currentPlot.flooding = "FALSE";
            if (currentPlot.status != 'CREATED'){
              currentPlot.status = 'NOT_SYNCHRONIZED';
            }
            plotListService.updateCachedPlot(LIST_PLOTS, currentPlot);
          }
        break
      }
    }

    $scope.selectCover = function (item) {
      seeToast2($translate.instant(coverToast[item]), 2000)
      for(key in cover){
        var coverImg = document.getElementById(key);
        coverImg.classList.remove("lpks-img-active");
      }
      var activeCoverImg =document.getElementById(item);
      activeCoverImg.classList.add("lpks-img-active");
      if (currentPlot.land_cover  != item ) {
        currentPlot.land_cover  = item
        if (currentPlot.status != 'CREATED'){
          currentPlot.status = 'NOT_SYNCHRONIZED';
        }
        plotListService.updateCachedPlot(LIST_PLOTS, currentPlot);
      }
    }


  })
  /****************************************/
  /** Add a new Plot **/
  /****************************************/
  .controller('AddPlot_PlotID_Ctrl', function ($scope, $state, $ionicHistory, $ionicPopup, $ionicLoading, $ionicPlatform, $ionicHistory, locationService, plotListService, googleService,$controller) {
    var email = window.localStorage.getItem('current_email')
    if (isEmpty(email)){
      var infoPopup = $ionicPopup.alert({
        cssClass: 'remove-title-class',
        template: 'Please sign-in with a Google account to create a new site'
      })
      infoPopup.then(function (res) {
        infoPopup.close()
        $state.go('landpks.landpks_login')
      })
      return
    }
    $scope.latitude = "searching"
    $scope.longitude = "searching"
    $scope.loc_accuracy = "searching..."
    $scope.$on("$ionicView.beforeEnter", function() {
      //get the latitude and longitude
      locationService.getLocation().then(function(data) {
        $scope.latitude = data[0].toFixed(5);
        $scope.longitude = data[1].toFixed(5);
        $scope.loc_accuracy = data[2].toFixed(0);
      }).catch(function(error) {
        $scope.error = 'unable to get location';
        var infoPopup = $ionicPopup.alert({
          cssClass: 'remove-title-class',
          template: 'Cannot obtain location.</br>Please ensure location services are enabled'
        })
        infoPopup.then(function (res) {
          infoPopup.close()
        })
      });
    });

    var typeBrowser = getTypeWebBrowser()
    //var $scope.detectPlatform = ""
    if (!window.cordova){ //Chay bang browser
      if (typeBrowser === 'SAFARI' || typeBrowser === 'DEVICE'){
        typeBrowser = 'SAFARI'
        /* Using select 2 */
      }
    } else { //Chay bang thiet bi
      var isIOS = ionic.Platform.isIOS()
      if (isIOS){
        typeBrowser = 'IOS'
      }
    }
    $scope.detectPlatform = typeBrowser

    $controller('BaseLandInfoController', { $scope: $scope });


    function checkExistName (recorder_name, name, JSONArray) {
      var hasMatch = false
      if (isEmpty(JSONArray)) {
        return false
      }

      for (var index = 0; index < JSONArray.length; index++) {
        var plot = JSONArray[index]
        var newName = recorder_name + '-' + name
        if (plot.name.trim() === newName.trim() || plot.name.trim() === name.trim()) {
          hasMatch = true
          break
        }
      }
      return hasMatch
    }

    function isEmptry (value) {
      if (value === null || value === 'undefined' || value === '' || value === 'null' || value === 'NULL') {
        return true
      }
      return false
    }

    $scope.validateLatitude = function () {
      var latitude = document.getElementById('latitude').value
      console.log(latitude)
      if (typeof Number(latitude) === 'number' && latitude > 90) {
        document.getElementById('latitude').value = 90
      } else if (typeof Number(latitude) === 'number' && latitude < -90) {
        document.getElementById('latitude').value = -90
      } else {
        if (isNaN(latitude)) {
          document.getElementById('latitude').value = 0
        }
      }
    }

    $scope.validateLongitude = function () {
      // console.log("Deo hieu")
      var longitude = document.getElementById('longitude').value
      // console.log(longitude)
      if (typeof Number(longitude) === 'number' && longitude > 180) {
        document.getElementById('longitude').value = 180
      } else if (typeof Number(longitude) === 'number' && longitude < -180) {
        document.getElementById('longitude').value = -180
      } else {
        if (isNaN(longitude)) {
          document.getElementById('longitude').value = 0
        }
      }
    }

    function validateAscii_complete (str) {
      return containsAllAscii(str)
    }

    $scope.validateText = function (event, item) {
      var key = event.keyCode || event.which
      //console.log('Click : ' + key)
      //console.log('Item : ' + item)
      if (key == 13 || key == 9) {

        if (item === 'name') {

          document.getElementById('organization').focus()
        } else if (item === 'org') {
          document.getElementById('latitude').focus()
        } else if (item === 'lat') {
          document.getElementById('longitude').focus()
        } else if (item === 'long') {
          document.getElementById('name').focus()
        }
      }

      var key = event.keyCode || event.which
      var inp = String.fromCharCode(event.keyCode || event.which)
      if (key != 0 && key != 229) {
        //console.log(':' + inp + ':')
        if (containsAllAscii(inp) === false) {
          if (key == 8 || key == 46 || key == 32 || key == 189) {
          } else {
            if (event.preventDefault) {
              event.preventDefault() // normal browsers
            } else {
              e.returnValue = false // IE
            }
          }
        }
      } else {
      }
    }

    $scope.validateNumber = function (event, item) {
      var key = event.keyCode || event.which
      console.log('Number : ' + key)
      if (key == 13 || key == 9) {
        if (item === 'name') {
          document.getElementById('organization').focus()
        } else if (item === 'org') {
          document.getElementById('latitude').focus()
        } else if (item === 'lat') {
          document.getElementById('longitude').focus()
        } else if (item === 'long') {
          document.getElementById('name').focus()
        }
      }

      // console.log(key)
      if ((key < 48 || key > 57) && key != 190 && key != 8 && key != 189) {
        if (event.preventDefault) {
          event.preventDefault()
        } else {
          e.returnValue = false
        }
      }
    }

    $scope.getLocation = function () {
      console.log("Check GPS")
      console.log("End (one):" + currentWatchID)
      var isIOS = ionic.Platform.isIOS()
      var isAndroid = ionic.Platform.isAndroid()

      navigator.geolocation.clearWatch(currentWatchID)
      $scope.updateLatitude = $scope.latitude;
      $scope.updateLongitude = $scope.longitude;
      $scope.updateAccuracy = $scope.loc_accuracy;

      if (window.cordova) {
        if (!isIOS && isAndroid){
          cordova.plugins.diagnostic.isLocationEnabled(function(enabled) {
            console.log("Location is " + (enabled ? "enabled" : "disabled"));
            if (enabled){
              currentWatchID = navigator.geolocation.watchPosition(onSuccessWatch, onErrorWatch,  LOCATION_SERVICE_OPTION)
            } else {
              seeToast2('Please enable location services', 000)
              var infoPopup = $ionicPopup.alert({
                cssClass: 'remove-title-class',
                template: 'Cannot obtain location.</br>Please ensure location services are enabled'
              })
              infoPopup.then(function (res) {
                infoPopup.close()
              })
                //cordova.plugins.diagnostic.switchToLocationSettings();
              }
            }, function(error) {
              alert("The following error occurred: " + error);
            });
        } else if (!isAndroid && isIOS){
          currentWatchID = navigator.geolocation.watchPosition(onSuccessWatch, onErrorWatch,  LOCATION_SERVICE_OPTION)
        }
      } else {
        console.log("Web")
        currentWatchID = navigator.geolocation.watchPosition(onSuccessWatch, onErrorWatch,  LOCATION_SERVICE_OPTION)
      }
      
      function onSuccessWatch(position) {
        console.log("update : " + position.coords.accuracy)
        if($scope.updateAccuracy === "searching..." || $scope.updateAccuracy > position.coords.accuracy) {
          $scope.$apply(function () {
            $scope.updateLatitude = position.coords.latitude.toFixed(5);
            $scope.updateLongitude = position.coords.longitude.toFixed(5);
            $scope.updateAccuracy = position.coords.accuracy.toFixed(0) ; 
          });
        }
      }

      function onErrorWatch(error) {
        console.log("err " + error)
        navigator.geolocation.clearWatch(currentWatchID)
        if (error.message.indexOf('Only secure origins are allowed') == 0
          || error.message.indexOf('Origin does not have permission to use Geolocation service') == 0
          || error.message.indexOf('Network location provider') == 0
          || error.message.indexOf('User denied Geolocation') == 0) {

            var newMethodResponse = getLocationService_basedOn_IP()
            if (isEmpty(newMethodResponse)){
              alert('Cannot get current geo-location');
              var infoPopup = $ionicPopup.alert({
                cssClass: 'remove-title-class',
                template: 'Cannot obtain location.</br>Please ensure location services are enabled'
              })
              infoPopup.then(function (res) {
                infoPopup.close()
              })
            } else {
              $scope.$apply(function () {
                console.log("updating...")
                $scope.updateLatitude = newMethodResponse.lat.toFixed(5);
                $scope.updateLongitude = newMethodResponse.lon.toFixed(5);
                $scope.updateAccuracy = 90 ; 
              });
            }
        }
      }
      /*locationService.getLocation().then(function(data) {

        $scope.updateLatitude = data[0];
        $scope.updateLongitude = data[1];
        $scope.updateAccuracy = data[2] + " m";

        console.log($scope.updateLongitude + " " + $scope.updateLatitude)
      }).catch(function() {
        $scope.error = 'unable to get location';
      });*/
      var myPopup = $ionicPopup.show({
        template: '<div style="text-align: center;"><ion-spinner icon="ripple" class="spinner-balanced"></ion-spinner> </div><div>latitude : {{updateLatitude}}</div><div>longitude : {{updateLongitude}}</div><br/><div>Accuracy : {{updateAccuracy}} m</div> ',
        title: '<p align="left">Obtain Location</p>',
        scope: $scope,
        buttons: [
          { text: 'Cancel',
            onTap: function (e) {
              console.log("End (cancel) " + currentWatchID)
              navigator.geolocation.clearWatch(currentWatchID)
              return
            }
          },
          {
            text: '<b>Use</b>',
            type: 'button-positive',
            onTap: function (e) {
              $scope.latitude = $scope.updateLatitude;
              document.getElementById('latitude').value = $scope.updateLatitude;
              $scope.longitude = $scope.updateLongitude;
              document.getElementById('longitude').value = $scope.updateLongitude;
              console.log("USING " + $scope.updateLatitude + " " + $scope.latitude)
              console.log("End (use) " + currentWatchID)
              $scope.loc_accuracy = $scope.updateAccuracy
              navigator.geolocation.clearWatch(currentWatchID)
              return;
            }
          },

        ]
      })
    }

    $scope.backArrowClick = function() {
        console.log("End " + currentWatchID)
        navigator.geolocation.clearWatch(currentWatchID)
        $scope.completeAddPlot_PlotID('NEWPLOT_PAGE');
    };




    //if (window.localStorage.getItem('PREVIOUS_PAGE') != 'ADD_PLOT_ADD_NEW') {

      // Collect data PlotID
      $scope.completeAddPlot_PlotID = function (item) {
        var strPlotName = document.getElementById('name').value
        if (!isEmpty(strPlotName)){
          strPlotName = strPlotName.trim()
        }
        var strOrg = ''

        /* Update new organization if need */
        recorder_name = window.localStorage.getItem('current_email')
        /* Update default organization */
        window.localStorage.setItem(recorder_name +"_DEFAULT_ORGANIZATIO_NAME_FOR_RECORDER",strOrg)
        //console.log(listOfOrganizations)
        if (validateAscii_complete(strPlotName) === false) {
          var infoPopup = $ionicPopup.alert({
            cssClass: 'remove-title-class',
            template: 'Site Name contains non-ascii. Please remove non-ascii characters'
          })
          infoPopup.then(function (res) {
            infoPopup.close()
          })
          return
        }


        if (isEmpty(document.getElementById('name').value.trim())) {
          var infoPopup = $ionicPopup.alert({
            cssClass: 'remove-title-class',
            template: 'A Site Name is required.'
          })
          infoPopup.then(function (res) {
            infoPopup.close()
          })
          return
        }
        if (isEmpty(document.getElementById('latitude').value.trim()) || isEmpty(document.getElementById('longitude').value.trim()) || isNaN(Number(document.getElementById('latitude').value.trim())) || isNaN(Number(document.getElementById('longitude').value.trim())) ) {
          var infoPopup = $ionicPopup.alert({
            cssClass: 'remove-title-class',
            template: 'Latitude and Longitude are required.'
          })
          infoPopup.then(function (res) {
            infoPopup.close()
          })
          return
        }

        recorder_name = window.localStorage.getItem('current_email')
        email = recorder_name
        latitude = document.getElementById('latitude').value
        longitude = document.getElementById('longitude').value
        name = document.getElementById('name').value
        if (!isEmpty(name)){
          name = name.trim()
        }
        if (check_dangerous_character(name)){
           var infoPopup = $ionicPopup.alert({
            cssClass: 'remove-title-class',
            template: 'Site Name contains invalid characters. Please remove invalid characters'
           })
            infoPopup.then(function (res) {
              infoPopup.close()
            })
           return
        }
        var LIST_PLOTS = JSON.parse(window.localStorage.getItem(recorder_name + '_' + 'LIST_LANDINFO_PLOTS'))
        if (isEmpty(LIST_PLOTS)) {
          LIST_PLOTS = []
        }
        if (checkExistName(recorder_name, name, LIST_PLOTS) == false) {

          organization = document.getElementById('organization').value

          if ($scope.bTestOrNonTestPlot == true){
            testPlot = true
          } else {
            testPlot = false
          }

          if (!isEmptry(name) && !isEmptry(recorder_name)) {
            isActived = true
          } else {
            isActived = false
          }

          if (!isEmptry(name) && !isEmptry(recorder_name) && !isEmptry(latitude) && !isEmptry(longitude) && !isEmptry(testPlot)) {
            isPlotIDCompleted = true
          } else {
            isPlotIDCompleted = false
          }
          newPlot_PlotID = {isActived: isActived, isPlotIDCompleted: isPlotIDCompleted, name: name, test_plot: testPlot, recorder_name: recorder_name, organization: organization,latitude: latitude, longitude: longitude}

          if (isActived == true && !isEmpty(name)) {
            $scope.newPlot_PlotID = newPlot_PlotID
            var newPlot = {
              //isActived: isActived,
              //isPlotIDCompleted: isPlotIDCompleted,
              isLandCoverDoing: false,
              isLandCoverCompleted: false,
              //isLandUseDoing: false,
              //isLandUseCompleted: false,
              //isSlopeCompleted: false,
              //isSlopeDoing: false,
              //isSlopeShapeCompleted: false,
              //isSlopeShapeDoing: false,
              //isSoilConditionCompleted: false,
              //isSoilConditionDoing: false,
              //isSoilLayersCompleted: false,
              //isSoilLayersDoing: false,
              isPhotosCompleted: false,
              isPhotosDoing: false,
              id: '',
              name: recorder_name + '-' + name,
              real_name: name,
              recorder_name: recorder_name,
              test_plot: testPlot, organization: organization,
              latitude: Number(latitude),
              longitude: Number(longitude),
              notes: '',
              has_land_cover:false,
              land_cover_data:{},
              status: 'CREATED'
            }
            //add an empty landCoverObject
            //************************************************************************
            var obj = {}
            obj.recorder_name = recorder_name
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
            obj.land_cover_data.name = recorder_name + '-' + name
            obj.land_cover_data.recorder_name = recorder_name
            obj.dominant_nonwoody_species = ''
            obj.dominant_woody_species = ''
            obj.dominant_nonwoody_species_2 = ''
            obj.dominant_woody_species_2 = ''
            obj.img_src = 'img/lpks_empty_checkmark.png'
            obj.need_init = false
            obj.name = recorder_name + '-' + name
            //window.localStorage.setItem('current_plot_name_landcover', obj.name)
            //window.localStorage.setItem('current_plot_data_landcover', JSON.stringify(obj))
            //window.localStorage.setItem('current_edit_plot_landcover', JSON.stringify(obj))
            //window.localStorage.setItem('current_action_landcover', 'ADD_NEW')
            newPlot.landCoverObject = obj;
            //************************************************************************
            newPlot.googleMapImageURL = googleService.getGoogleMapImageURL(newPlot)

            //if (checkExistName(recorder_name, name, LIST_PLOTS) == false) {
            //add the plot to the cached plots
            LIST_PLOTS.push(newPlot)
            window.localStorage.setItem(email + '_' + 'LIST_LANDINFO_PLOTS', JSON.stringify(LIST_PLOTS))
            window.localStorage.setItem('current_view_plot', JSON.stringify(newPlot))

            //push plot to the cloud or add to background push
            if (checkNetConnection() === true) {

              $ionicLoading.show({
                delay:100,
                template: 'Saving Site...'
              })


              plotListService.pushPlotToCloud(newPlot, 'put')
              .success(
                function (data, status, headers, config) {

                  /* Step 1 : Delete current editing plot in Main List */
                  deleteLandInfoPlotInArray_2(newPlot.name,newPlot.recorder_name,LIST_PLOTS)
                  /* Step 2 : load new cloud plot */
                  console.log(newPlot.recorder_name + ":  " + newPlot.name)
                  /* Test */
                  plotListService.loadPlotFromCloud(newPlot.recorder_name, newPlot.name)
                  .success(
                    function(data) {
                      console.log("Success. New Cloud Plot : " + JSON.stringify(data[0]))
                      if (!isEmpty(data) && data.length >= 1){
                        //add landcover object
                        //data[0].has_land_cover = false;
                        //data[0].land_cover_data = {}
                        //console.log("Success. New Cloud Plot : " + JSON.stringify(data[0]))
                        //************************************************************************
                        var obj = {}
                        obj.recorder_name = recorder_name
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
                        obj.land_cover_data.recorder_name = recorder_name
                        obj.dominant_nonwoody_species = ''
                        obj.dominant_woody_species = ''
                        obj.dominant_nonwoody_species_2 = ''
                        obj.dominant_woody_species_2 = ''
                        obj.img_src = 'img/lpks_empty_checkmark.png'
                        obj.need_init = false
                        obj.name = data[0].name
                        window.localStorage.setItem('current_plot_name_landcover', obj.name)
                        window.localStorage.setItem('current_plot_data_landcover', JSON.stringify(obj))
                        window.localStorage.setItem('current_edit_plot_landcover', JSON.stringify(obj))
                        window.localStorage.setItem('current_action_landcover', 'ADD_NEW')
                        data[0].landCoverObject = obj;
                        //************************************************************************
                        data[0].googleMapImageURL = googleService.getGoogleMapImageURL(data[0])
                        LIST_PLOTS.push(data[0])
                      }
                      
                      window.localStorage.setItem(recorder_name + '_' + 'LIST_LANDINFO_PLOTS',JSON.stringify(LIST_PLOTS))
                      window.localStorage.setItem('current_view_plot', JSON.stringify(data[0]));




                      $ionicLoading.hide();
                      $ionicHistory.nextViewOptions({
                        disableBack: true,
                        disableAnimate: true,
                        historyRoot: true
                      });
                      $ionicHistory.clearCache();
                      $ionicHistory.clearHistory();
                      
                      $state.go('landpks.landinfo_site-home')
                    })
                  .error(
                    function () {
                      plotListService.updateCachedPlot(LIST_PLOTS, newPlot);
                      addPendingLandInfoPlotToQueue(newPlot);
                    })
                })
              .error(
                function (err) {
                  console.log("error pushing to cloud : " + err.error);
                  //close ionic loading and load plot in background
                  $ionicLoading.hide();
                  if (!isEmpty(err.error) && err.error.trim() === '[Recorder_name + name] pair is existed in system. Please select another') {
                    message = "[Recorder_name  + plot name] pair already exists in system. Please select another plot name."
                    var infoPopup = $ionicPopup.alert({
                      cssClass: 'remove-title-class',
                      template: message
                    })
                    infoPopup.then(function (res) {
                      deleteLandInfoPlotInArray_2(newPlot.name,newPlot.recorder_name,LIST_PLOTS)
                      window.localStorage.setItem(email + '_' + 'LIST_LANDINFO_PLOTS', JSON.stringify(LIST_PLOTS))
                      window.localStorage.setItem('current_view_plot', JSON.stringify({}))
                      return;
                    })
                  } else {
                    var infoPopup = $ionicPopup.alert({
                      cssClass: 'remove-title-class',
                      template: 'Your plot cannot be saved to the cloud at this time</br>' + err.error
                    })
                    infoPopup.then(function (res) {
                      //store plot on device and upload in background
                      plotListService.updateCachedPlot(LIST_PLOTS, newPlot);
                      addPendingLandInfoPlotToQueue(newPlot);
                      $ionicHistory.nextViewOptions({
                        disableBack: true,
                        disableAnimate: true,
                        historyRoot: true
                      });
                      $ionicHistory.clearCache();
                      $ionicHistory.clearHistory();
                      
                      $state.go('landpks.landinfo_site-home')
                    })
                  }
                  return
                })
            } else {
              //store plot on device and upload in background
              plotListService.updateCachedPlot(LIST_PLOTS, newPlot)
              addPendingLandInfoPlotToQueue(newPlot)
              var infoPopup = $ionicPopup.alert({
                cssClass: 'remove-title-class',
                template: 'Plot has been marked for background upload. You will receive a notification when results are available'
              })
              infoPopup.then(function (res) {
                console.log('Add Plot to queue')
                $ionicHistory.nextViewOptions({
                  disableBack: true,
                  disableAnimate: true,
                  historyRoot: true
                });
                $ionicHistory.clearCache();
                $ionicHistory.clearHistory();
                $state.go('landpks.landinfo_site-home')
              })
            }
          } else {
            var infoPopup = $ionicPopup.alert({
              cssClass: 'remove-title-class',
              template: 'A Site Name is required.'
            })
            infoPopup.then(function (res) {
              infoPopup.close()
            })
            return
          }
        } else {
          var infoPopup = $ionicPopup.alert({
            cssClass: 'remove-title-class',
            template: 'A plot with this name already exists.'
          })
          infoPopup.then(function (res) {
            infoPopup.close()
          })
          return
        }

      }

  })

  /****************************************/
  /** ListPlotsCtrl Controller **/
  /****************************************/
  .controller('ListPlotsCtrl', function ($scope, $state, $http, Scopes, $ionicHistory, $ionicLoading, $ionicPopup,$ionicPlatform,$timeout, $stateParams, plotListService, $compile,$translate, $cordovaLocalNotification, $ionicHistory) {
    console.log('ListPlotsCtrl ****')

    checkAppInit()
    $scope.$on("$ionicView.beforeEnter", function() {
      checkAppInit()
      var email = window.localStorage.getItem('current_email')
      var recorder_name = window.localStorage.getItem('current_email')
      //display is cached, reload plots each time to check for changes.
      $scope.plots = plotListService.loadPlotsFromCache(email, recorder_name);
    })

    /* Translate */
    var LANGUAGE_CONFIG = window.localStorage.getItem('GLOBAL_CONFIG_LANGUAGE')
    $translate.use(LANGUAGE_CONFIG)
    $scope.labels = {}
    $scope.labels.title = $translate.instant('landinfo_app.list_plot.title')
    $scope.labels.latitude = $translate.instant('landinfo_common.latitude')
    $scope.labels.longitude = $translate.instant('landinfo_common.longitude')
    $scope.labels.upload_date = $translate.instant('landinfo_app.list_plot.upload_date')


    window.localStorage.setItem('CURRENT_PAGE_FOR_BACK_BUTTON','LIST_PLOT_LANDINFO_PAGE')
    window.localStorage.setItem('PREVIOUS_PAGE_FOR_SELECT_APP','LANDINFO_LIST')

    //$scope.data = {
      //showDelete: false
    //};


    //console.log()
    var email = window.localStorage.getItem('current_email')

    if (isEmpty(email)){
      var infoPopup = $ionicPopup.alert({
        cssClass: 'remove-title-class',
        template: 'Please select an account in the list provided or login with a new Google account to access and enter data'
      })
      infoPopup.then(function (res) {
        infoPopup.close()
        $ionicHistory.clearCache()
        $state.go('landpks.landinfo_accounts')
      })
      return
    }

    var recorder_name = email
    //console.log('LIST of ' + email)

    var listOfOrganizations = JSON.parse(window.localStorage.getItem(recorder_name +"_LIST_OF_ORGANIZATIONS"))
    if (isEmpty(listOfOrganizations)){
      listOfOrganizations = []
    }
    //console.log(listOfOrganizations)

    //var refresh = window.localStorage.getItem('LANDINFO_LIST_HAS_BEEN_REFRESHED')
    //if (!isEmpty(refresh)){
      //if (refresh === 'TRUE'){
        //  window.localStorage.setItem('PREVIOUS_PAGE', 'LOGIN_PAGE')
      //}
    //}


    //var previous_page = window.localStorage.getItem('PREVIOUS_PAGE')
    /* Should be Processed Caching Data in HERE */


    $ionicLoading.show({
      template: 'Loading plot data...'
    })

    console.log("LOADING PLOTS")
    clearAllCache()
    $scope.plots = plotListService.loadPlotsFromCache(email, recorder_name);
    //console.log(JSON.stringify($scope.plots))
    $ionicLoading.hide()


    function isPlotInCloud (plot) {
      if (plot.id === null || plot.id === '' || plot.id === 'null' || plot.id === 'undefined' || plot.isActived == true) {
        return false
      } else {
        return true
      }
    }

    $scope.plotname = function (name) {
      var email = window.localStorage.getItem('current_email')
      if(!isEmpty(name) && !isEmpty(email)){
        var str = name.length
        var emaillength = email.length + 1
        var finalstr = name.substring(emaillength, str)
        return finalstr
      }
      else return ""
    };

    $scope.selectPlot = function (plot) {
      console.log("plot name " + plot.name)
      window.localStorage.setItem('current_view_plot', JSON.stringify(plot))

      $state.go('landpks.landinfo_site-home')
      /*$scope.selectedPlot = plot
      if (isPlotInCloud(plot) == true) {
        Scopes.store('ListPlotsCtrl_Scope', $scope)
        window.localStorage.setItem('PREVIOUS_PAGE', 'LIST_PLOT_PAGE')
        window.localStorage.setItem('current_view_plot', JSON.stringify(plot))
        $state.go('landpks.landinfo_site-home')
      } else {
        if (!isEmpty(plot.status) && plot.status === 'UPLOADING'){
           window.localStorage.setItem('current_edit_plot', JSON.stringify(plot))
           window.localStorage.setItem('PREVIOUS_PAGE', 'LIST_PLOT_PAGE')
           window.localStorage.setItem('PREVIOUS_PAGE_CONNECT', 'LANDINFO_LIST_PLOT_PAGE')
           $state.go('landpks.landinfo_results_section_pending_upload')
        } else {
           window.localStorage.setItem('current_edit_plot', JSON.stringify(plot))
           window.localStorage.setItem('PREVIOUS_PAGE', 'LIST_PLOT_PAGE')
           window.localStorage.setItem('PREVIOUS_PAGE_CONNECT', 'LANDINFO_LIST_PLOT_PAGE')
           $state.go('landpks.landinfo_newplot')
        }*/

    };

    $scope.confirmDelete = function(plot_id,plot_name,plot_recorder_name){
      var email = window.localStorage.getItem('current_email')
      //if (!isEmpty(plot_id) && Number(plot_id) && (Number(plot_id) >= 1)){
        /*
        var LIST_LANDINFO_PLOTS_RESULT = JSON.parse(window.localStorage.getItem(email + '_' + 'LIST_LANDINFO_PLOTS'))
        var LIST_LANDINFO_LANDCOVER_PLOTS_RESULT = JSON.parse(window.localStorage.getItem(email + '_LIST_LANDINFO_PLOTS_LANDCOVER'))
        var confirmPopup = $ionicPopup.confirm({
          cssClass: 'remove-title-class',
          template: PLOT_DELETE_ON_CLOUDS_MESSAGE,
          cancelText: 'No',
          okText: 'Yes'
        })
        confirmPopup.then(function (res) {
          if (res) {
            confirmPopup.close()
            if (checkNetConnection() == true){
                var googleToken = ''
                if (checkGoogleAuthKey_StillWorking() == true){
                  googleToken = window.localStorage.getItem('current_json_auth_data')
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
                    template: 'Application is required to refresh Google Authentication to delete this Plot. Please re-do again'
                  })
                  infoPopup.then(function (res) {
                    infoPopup.close()
                  })
                  return
                }

                var delete_on_cloud = false
                $http({
                  method: 'POST',
                  url: LANDPKS_API_ENDPOINT,
                  headers: {'Content-type': 'application/x-www-form-urlencoded',
                            'X-Auth-Token': googleToken},
                  timeout: HTTP_TIME_OUT_CONNECTION,
                  data: 'action=delete&object=landinfo&version='
                        + LANDPKS_API_VERSION
                        + '&type=delete_by_id&id='
                        + plot_id
                        + '&delete_permanent=0',
                }).success(
                  function (data, status, headers, config) {
                      if (Number(data.id) == plot_id && data.status === 'archived'){
                        console.log(data)
                        console.log('Delete successfully on cloud')
                        delete_on_cloud = true
                      }
                }).error(function (err) {
                      delete_on_cloud = false
                })
            } else {

                confirmPopup.close()

                var infoPopup = $ionicPopup.alert({
                  cssClass: 'remove-title-class',
                  template: 'Device is offline. Cannot delete this plot'
                })
                infoPopup.then(function (res) {
                  infoPopup.close()
                })
                return
            }


            $("div.item-options").addClass("invisible");
            $("div.item-content").css("transform", "");

            var resultDeleted = deleteLandInfoPlotInArray_2(plot_name, email, LIST_LANDINFO_PLOTS_RESULT)
            var lancoverDeleted = deleteLandInfoPlotInArray_2(plot_name, email, LIST_LANDINFO_LANDCOVER_PLOTS_RESULT)
            if (resultDeleted == true && lancoverDeleted == true) {
              window.localStorage.setItem(email + '_' + 'LIST_LANDINFO_PLOTS', JSON.stringify(LIST_LANDINFO_PLOTS_RESULT))
              window.localStorage.setItem(email + '_' + 'LIST_LANDINFO_PLOTS_LANDCOVER', JSON.stringify(LIST_LANDINFO_LANDCOVER_PLOTS_RESULT))
              var LIST_PLOTS_SORTED = LIST_LANDINFO_PLOTS_RESULT
              if (!isEmpty(LIST_PLOTS_SORTED) && LIST_PLOTS_SORTED != null) {
                if (LIST_PLOTS_SORTED.length > 0) {
                  LIST_PLOTS_SORTED.sort(function (a, b) {
                    if (getRealPlotName(email, a.name).toUpperCase().trim() < getRealPlotName(email, b.name).toUpperCase().trim()) return -1
                    if (getRealPlotName(email, a.name).toUpperCase().trim() > getRealPlotName(email, b.name).toUpperCase().trim()) return 1
                    return 0
                  })
                }
              }
              $scope.plots = LIST_PLOTS_SORTED

            } else {
              var infoPopup = $ionicPopup.alert({
                cssClass: 'remove-title-class',
                template: 'Cannot delete this plot'
              })
              infoPopup.then(function (res) {
                infoPopup.close()
              })
            }
          } else {
            console.log('Cancel')
            return
          }
        })
        */
      //} else {
        /* In device only */
        var LIST_LANDINFO_PLOTS_RESULT = JSON.parse(window.localStorage.getItem(email + '_' + 'LIST_LANDINFO_PLOTS'))
        var LIST_LANDINFO_LANDCOVER_PLOTS_RESULT = JSON.parse(window.localStorage.getItem(email + '_LIST_LANDINFO_PLOTS_LANDCOVER'))
        var confirmPopup = $ionicPopup.confirm({
          title: 'WARNING!',
          template: PLOT_DELETE_ON_DEVICE_MESSAGE,
          cancelText: 'No',
          okText: 'Yes'
        })
        confirmPopup.then(function (res) {
          if (res) {
            confirmPopup.close()
            $("div.item-options").addClass("invisible");
            $("div.item-content").css("transform", "");
            var resultDeleted = deleteLandInfoPlotInArray_2(plot_name, email, LIST_LANDINFO_PLOTS_RESULT)
            var landcoverDelete = deleteLandInfoPlotInArray_2(plot_name, email, LIST_LANDINFO_LANDCOVER_PLOTS_RESULT)
            if (resultDeleted == true && landcoverDelete == true) {
              window.localStorage.setItem(email + '_' + 'LIST_LANDINFO_PLOTS', JSON.stringify(LIST_LANDINFO_PLOTS_RESULT))
              window.localStorage.setItem(email + '_' + 'LIST_LANDINFO_PLOTS_LANDCOVER', JSON.stringify(LIST_LANDINFO_LANDCOVER_PLOTS_RESULT))
              var LIST_PLOTS_SORTED = LIST_LANDINFO_PLOTS_RESULT
              if (!isEmpty(LIST_PLOTS_SORTED) && LIST_PLOTS_SORTED != null) {
                if (LIST_PLOTS_SORTED.length > 0) {
                  LIST_PLOTS_SORTED.sort(function (a, b) {
                    if (getRealPlotName(email, a.name).toUpperCase().trim() < getRealPlotName(email, b.name).toUpperCase().trim()) return -1
                    if (getRealPlotName(email, a.name).toUpperCase().trim() > getRealPlotName(email, b.name).toUpperCase().trim()) return 1
                    return 0
                  })
                }
              }
              $scope.plots = LIST_PLOTS_SORTED
            } else {
              var infoPopup = $ionicPopup.alert({
                cssClass: 'remove-title-class',
                template: 'Cannot delete this plot'
              })
              infoPopup.then(function (res) {
                infoPopup.close()
              })
              return
            }
          } else {
            console.log('Cancel')
            return
          }
        })
      //}
    };

    $scope.getClimate = function () {
      $state.go('landpks.landinfo_quick_climate')
    };

    $scope.getEpicPrediction = function () {
      $state.go('landpksepic.landinfo_epic_prediction')
    };

    $scope.addNewPlot = function () {
      window.localStorage.setItem('PREVIOUS_PAGE_CONNECT', 'LANDINFO_LIST_PLOT_PAGE')
      $state.go('landpks.landinfo_newplot_temp')
    };

    function clearAllCache () {
      console.log('Clear Cache')
      $ionicHistory.clearCache()
    };

    $timeout(function () {
        $('div.item-content.ng-binding').css({'padding-right':'10px'});
    }, 0, false);

    function checkAppInit() {
      console.log("checkAppInit")
      /* COFFEE - Thu nghiem */
      /* Set up list of LandInfo Plot = Server to submit plot running background waif for internet */
      var recorder_name = window.localStorage.getItem('current_email')
      var pending_upload_landinfo_list = JSON.parse(window.localStorage.getItem(recorder_name + '_PENDING_UPLOAD_LANDINFO_LIST'))
      var pending_upload_landcover_records_list = JSON.parse(window.localStorage.getItem(recorder_name + '_PENDING_UPLOAD_LANDCOVER_RECORDS_LIST'))
      var pending_upload_landcover_records_NOT_ENOUGH_list = JSON.parse(window.localStorage.getItem(recorder_name + '_PENDING_UPLOAD_LANDCOVER_RECORDS_NOT_ENOUGH_LIST'))

      if (isEmpty(pending_upload_landinfo_list) || pending_upload_landinfo_list.length <= 0){
        var emptyList = []
        window.localStorage.setItem(recorder_name + '_PENDING_UPLOAD_LANDINFO_LIST',JSON.stringify(emptyList))
      }

      if (isEmpty(pending_upload_landcover_records_list) || pending_upload_landcover_records_list.length <= 0){
        var emptyList = []
        window.localStorage.setItem(recorder_name + '_PENDING_UPLOAD_LANDCOVER_RECORDS_LIST',JSON.stringify(emptyList))
      }

      if (isEmpty(pending_upload_landcover_records_NOT_ENOUGH_list) || pending_upload_landcover_records_NOT_ENOUGH_list.length <= 0){
        var emptyList = []
        window.localStorage.setItem(recorder_name + '_PENDING_UPLOAD_LANDCOVER_RECORDS_NOT_ENOUGH_LIST',JSON.stringify(emptyList))
      }

      /* Start Backgroud service - Google Token Refresh */
      //if (RUN_GOOGLE_CHECK_TOKEN_PROCESS === false){
        //console.log("Start run Google Token Refresh")
        //background_process_update_google_token($http)
      //} else {
        //console.log("Google Token Refresh is Running")
      //}
      /* End */
      console.log("Status : " + RUN_BACKGROUND_PROCESS_TO_SUBMIT_PLOT)

      if (RUN_BACKGROUND_PROCESS_TO_SUBMIT_PLOT === false){
        setTimeout(function () {
            /* Start background service - For LandInfo */
            background_service_submit_pending_plots_list($http,$ionicPopup,$cordovaLocalNotification, plotListService)
            /* End Backgroud service */
        }, 15000)
      } else {
        console.log("Backgroud process to submit plot is working!")
      }
      /**  End COFFEE **/

      $scope.device = ''
      if (window.cordova) {
        $scope.device = 'DEVICE'
      } else {
        $scope.device = 'WEB'
      }
    }
  })


/****************************************/
/** Epic Prediction Ctrl **/
/****************************************/
.controller('EpicPredictionCtrl', function ($scope, $state, $http, $ionicLoading, $cordovaNetwork, $ionicPopup, $ionicPlatform, $stateParams) {
  $ionicLoading.show({
    template: 'Fetching epic prediction for current location...'
  })

  $scope.goBack = function () {
    window.localStorage.setItem('PREVIOUS_PAGE', 'EPIC_PREDICTION_PAGE')
    $state.go('landpks.landinfo_plots')
  }

  window.localStorage.setItem('CURRENT_PAGE_FOR_BACK_BUTTON', 'EPIC_PREDICTION_PAGE')
  /* Check network */
  if (checkNetConnection() === true) {
    epicPrediction()
  } else {
    var infoPopup = $ionicPopup.alert({
      cssClass: 'remove-title-class',
      template: 'Unable to get Epic Model data at this time'
    })
    infoPopup.then(function (res) {
      infoPopup.close()
      window.localStorage.setItem('PREVIOUS_PAGE', 'EPIC_PREDICTION_PAGE')
      $state.go('landpks.landinfo_plots')
    })
    return
  }
  slopeImgs = ["landinfo_media/slope_images/ic_slope_flat.png","landinfo_media/slope_images/ic_slope_gentle.png","landinfo_media/slope_images/ic_slope_moderate.png","landinfo_media/slope_images/ic_slope_hilly.png","landinfo_media/slope_images/ic_slope_rolling.png","landinfo_media/slope_images/ic_slope_steep.png","landinfo_media/slope_images/ic_slope_very_steep.png"];
  slopeLabels = [' 0-1.15 degrees (0-2%)','1.5-2.8 degrees (3-5%)','2.8-5.7 degress (6-10%)','5.7-8.5 degrees (11-15%)','8.5-16 degrees (16-30%)','16-31 degrees (31-60%)']

  /* Check network */
  function epicPrediction () {
    if ($stateParams.lon === null || $stateParams.lon.length == 0 || $stateParams.lat === null || $stateParams.lat.length == 0)
    {
      onSuccess = function (position) {
        lat = position.coords.latitude
        lon = position.coords.longitude
        //console.log("****** Acuracy : " + position.coords.accuracy)
        //lat = -7.771105
        //lon = 35.512532
        runEpicModel(lat, lon)
      }
      onError = function (position) {
        console.log("Cannot determine location")
      }
      var isIOS = ionic.Platform.isIOS()
      var isAndroid = ionic.Platform.isAndroid()
      if (window.cordova) {
          if (!isIOS && isAndroid){
              cordova.plugins.diagnostic.isLocationEnabled(function(enabled) {
                  console.log("Location is " + (enabled ? "enabled" : "disabled"));
                  if (enabled){
                     navigator.geolocation.getCurrentPosition(onSuccess, onError, LOCATION_SERVICE_OPTION)
                  } else {
                     cordova.plugins.diagnostic.switchToLocationSettings();
                  }
              }, function(error) {
                  alert("The following error occurred: " + error);
              });
          } else if (!isAndroid && isIOS){
              navigator.geolocation.getCurrentPosition(onSuccess, onError, LOCATION_SERVICE_OPTION)
          }
      } else {
          navigator.geolocation.getCurrentPosition(onSuccess, onError, LOCATION_SERVICE_OPTION)
      }
      //navigator.geolocation.getCurrentPosition(onSuccess, onError)
    } else {
      runEpicModel($stateParams.lat, $stateParams.lon)
    }

  }

  function runEpicModel(lat, lon) {
    console.log(lat + " " + lon)
    var url = LANDPKS_API_ENDPOINT
        $http.get(url, {
          params: {
            action: 'get',
            object: 'epic',
            latitude: lat,
            longitude: lon,
            version: LANDPKS_API_VERSION
          },
          timeout: HTTP_TIME_OUT_CONNECTION
        })
        .success(function (data) {
          console.log("success")
          if(data[0] == "not in epic region"){
            $ionicLoading.hide()
            var infoPopup = $ionicPopup.alert({
              cssClass: 'remove-title-class',
              template: 'Epic model is not yet available in your region'
            })
              infoPopup.then(function (res) {
              infoPopup.close()
              $state.go('landpks.landinfo_plots')
            })
            return
          }
          yieldPlots = [];
          erosionPlots = [];
          riskPlots = [];
          $scope.series = ['Series A']
          $scope.captions = ['Climate']
          $scope.epic_bar_options = {
            animation: false,
            scaleShowLabels: false,
            tooltipTemplate: function(obj) {
              console.log(obj.label + ': ' + obj.value)
              return obj.label + ': ' + obj.value;
            }
          }
          for (slopeIndex = 0; slopeIndex < data[0].length; slopeIndex++){
            var yield = [];
            var erosion = [];
            var risk = [];
            var labels = [];
            var soilURLS = []
            var soilPercentages = []

            data.forEach(function(soilElement, soilIndex) {
              labels.push(soilElement[0][2]);
              soilURLS.push(soilElement[0][3])
              soilPercentages.push(soilElement[0][4])
              yield.push(data[soilIndex][slopeIndex][5]);
              erosion.push(data[soilIndex][slopeIndex][6]);
              risk.push(data[soilIndex][slopeIndex][7]);
            });
            yieldPlots.push(yield);
            erosionPlots.push(erosion);
            riskPlots.push(risk);
          }
          $scope.labels = labels;
          $scope.soilURLS = soilURLS;
          $scope.soilPercentages = soilPercentages;
          $scope.yield_plots = yieldPlots
          $scope.erosion_plots = erosionPlots
          $scope.risk_plots = riskPlots
          $scope.yield_data = [$scope.yield_plots[0],]
          $scope.erosion_data = [$scope.erosion_plots[0],]
          $scope.risk_data = [$scope.risk_plots[0],]
          if (window.localStorage.getItem('GLOBAL_CONFIG_COLOR_CHARTS') == true || window.localStorage.getItem('GLOBAL_CONFIG_COLOR_CHARTS') == 'true'){
              $scope.epic_bar_colors = [{fillColor: ['#73C774'], strokeColor: ['#1d7a37']}]
          } else {
              $scope.epic_bar_colors = [{fillColor: ['#000'], strokeColor: ['#000']}]
          }

          //slopeImgs = ["landinfo_media/slope_images/ic_slope_flat.png","landinfo_media/slope_images/ic_slope_gentle.png","landinfo_media/slope_images/ic_slope_hilly.png","landinfo_media/slope_images/ic_slope_moderate.png","landinfo_media/slope_images/ic_slope_rolling.png","landinfo_media/slope_images/ic_slope_steep.png","landinfo_media/slope_images/ic_slope_very_steep.png"];
          $scope.slopeImg = slopeImgs[0]
          $scope.slopeLabel = slopeLabels[0]
          document.getElementById("bar").style.display = "block"
          document.getElementById("no_data_bar").style.display = "none"
          document.getElementById("slopeID").value = 1;
          $ionicLoading.hide()
          //$scope.onClick = function (points, evt) {
          //    console.log(points, evt)
          //}

        })
        .error(function (err) {
          $ionicLoading.hide()
          var infoPopup = $ionicPopup.alert({
            cssClass: 'remove-title-class',
            template: 'Unable to get run EPIC prediction at this time.'
          })
          infoPopup.then(function (res) {
            infoPopup.close()
            $state.go('landpks.landinfo_plots')
          })
          return
        })
  }
  /***********************************************/
  /*$ionicPlatform.registerBackButtonAction(function (event) {
    var current_page_for_back_button = window.localStorage.getItem('CURRENT_PAGE_FOR_BACK_BUTTON')
    window.localStorage.setItem('CURRENT_PAGE_FOR_BACK_BUTTON', 'EMPTY')
    if (current_page_for_back_button === 'EPIC_PREDICTION_PAGE') {
      $scope.goBack()
      return
    } else {
      return
    }
  }, 400)*/

  $scope.changeEpicSlope = function () {
    var slopeID = document.getElementById('slopeID').value;
    $scope.yield_data = [$scope.yield_plots[slopeID-1],];
    $scope.erosion_data = [$scope.erosion_plots[slopeID-1],];
    $scope.risk_data = [$scope.risk_plots[slopeID-1],];
    $scope.slopeImg = slopeImgs[slopeID-1];
    $scope.slopeLabel = slopeLabels[slopeID-1];
  };
  $scope.openSoilURL = function(soilURL) {
    var ref = cordova.InAppBrowser.open(soilURL, '_blank', 'location=yes');
  };

})
.controller('EpicInputCtrl', function($scope, $state) {

  $scope.latloninput = {
    lat: '',
    lon : ''
  };

  $scope.submitLatLon = function(form) {
    if(form.$valid) {
      //$state.go('home');
      console.log($scope.latloninput.lat);
      console.log($scope.latloninput.lon);
      $state.go('landpks.landinfo_epic_prediction', { lat: $scope.latloninput.lat, lon: $scope.latloninput.lon})
    }

  };

})

.controller('siteHome', function($scope, $state, $ionicHistory, $ionicLoading, $ionicPopup, $controller, $http, plotListService, googleService,$translate) {

  console.log("siteHome controller")
      
  $controller('BaseLandInfoController', { $scope: $scope });


  var METRIC_CONFIG = window.localStorage.getItem('GLOBAL_CONFIG_METRICS_UNITS')
  $scope.GLOBAL_METRIC_CONFIG = METRIC_CONFIG

  //console.log(window.localStorage.getItem('current_view_plot'))
  var viewPlot = JSON.parse(window.localStorage.getItem('current_view_plot'));
  var recorder_name = window.localStorage.getItem('current_email');
  var LIST_PLOTS = JSON.parse(window.localStorage.getItem(recorder_name + '_' + 'LIST_LANDINFO_PLOTS'));

  //console.log(JSON.stringify(viewPlot))

  var str = viewPlot.name.length
  var email = window.localStorage.getItem('current_email')
  var emaillength = email.length + 1
  var finalstr = viewPlot.name.substring(emaillength, str)

  $scope.plot_name = finalstr
  $scope.plot = viewPlot
  //console.log("Showing site : " + window.localStorage.getItem('current_view_plot'))

  $scope.$on("$ionicView.beforeEnter", function() {
    if ( $ionicHistory.backView() === null) {
      $scope.backView = "landpks.landinfo_plots"
    }
    //get the plot again.  It may have changed.
    viewPlot = JSON.parse(window.localStorage.getItem('current_view_plot'))
    METRIC_CONFIG = window.localStorage.getItem('GLOBAL_CONFIG_METRICS_UNITS')
    $scope.GLOBAL_METRIC_CONFIG = METRIC_CONFIG

    /* Back to default */
    document.getElementById('idOMValue').value = 1.0
    document.getElementById('txtOrganicMatter').innerHTML = "1.0"

    if(!isEmpty(viewPlot.texture)){
      defaultOM_Percent = 1.0
      $scope.defaultOM_Percent = defaultOM_Percent
      //defaultOM_Value = defaultOM_Percent / 100
      defaultOM_Value = defaultOM_Percent
      $scope.modelOMValue = defaultOM_Percent
      $scope.awc_unit = "cm"
      $scope.infil_unit = "mm/hr"
      if (METRIC_CONFIG === UNITED_STATES_METRIC_STANDARD){
        //console.log("Value of " + checkIsPossibleToCalAWC(viewPlot))
        integrity_100_check = checkIsPossibleToCalAWC_Top100_Integrity(viewPlot)
        integrity_20_check = checkIsPossibleToCalAWC_Top20_Integrity(viewPlot)
        bedrock_check = checkIsPossCalAWC_BedRock(viewPlot)
        infil_check = checkIsPossibleToCalInfiltrationRate(viewPlot)

        if (integrity_20_check && bedrock_check){
          document.getElementById("displayErrorAWC_Top20").innerHTML = ""
          $scope.new_soil_profile_awc_top20 = getAWCValue_Top20_to1meter(viewPlot,defaultOM_Value).toFixed(1)
        } else if (!integrity_20_check && bedrock_check){
          $scope.new_soil_profile_awc_top20 = ""
          document.getElementById("displayErrorAWC_Top20").innerHTML = "Add Soil Data to 20cm (8in)" 
        } else if (integrity_20_check && !bedrock_check){
          $scope.new_soil_profile_awc_top20 = ""
          document.getElementById("displayErrorAWC_Top20").innerHTML = "Unable to calculate <= 20cm (8in)" 
        } else if (!integrity_20_check && !bedrock_check){
          $scope.new_soil_profile_awc_top20 = ""
          document.getElementById("displayErrorAWC_Top20").innerHTML = "Unable to calculate <= 20cm (8in)" 
        }

        if (integrity_100_check && bedrock_check){
          document.getElementById("displayErrorAWC_Top100").innerHTML = ""
          $scope.new_soil_profile_awc_top100 = getAWCValue_Top100_to1meter(viewPlot,defaultOM_Value).toFixed(1)
        } else if (!integrity_100_check && bedrock_check){
          $scope.new_soil_profile_awc_top100 = ""
          document.getElementById("displayErrorAWC_Top100").innerHTML = "Add Soil Data to 50cm (20in)" 
        } else if (integrity_100_check && !bedrock_check){
          $scope.new_soil_profile_awc_top100 = ""
          document.getElementById("displayErrorAWC_Top100").innerHTML = "Unable to calculate <= 20cm (8in)" 
        } else if (!integrity_100_check && !bedrock_check){
          $scope.new_soil_profile_awc_top100 = ""
          document.getElementById("displayErrorAWC_Top100").innerHTML = "Unable to calculate <= 20cm (8in)" 
        } 
          
        if (infil_check && bedrock_check){
          document.getElementById("displayErrorInfil").innerHTML = ""
          $scope.infiltration_rate = getProfileInfiltrationRate(viewPlot,defaultOM_Value).toFixed(0)
        } else if (!infil_check && bedrock_check){
          $scope.infiltration_rate = ""
          document.getElementById("displayErrorInfil").innerHTML = "Add Soil Data to 20cm (8in)"
        } else if (infil_check && !bedrock_check) {
          $scope.infiltration_rate = ""
          document.getElementById("displayErrorInfil").innerHTML = "Unable to calculate <= 20cm (8in)"
        } else if (!infil_check && !bedrock_check){
          $scope.infiltration_rate = ""
          document.getElementById("displayErrorInfil").innerHTML = "Unable to calculate <= 20cm (8in)"
        }
        $scope.awc_unit = "cm"
        $scope.infil_unit = "mm/hr"
        $scope.textureDepthArray =  ["0-1", "1-10", "10-20", "20-50", "50-70", "70-100", "100-120"]
        $scope.textureDepthUnit = "cm"
      } else if (METRIC_CONFIG === ENGLISH_METRIC_STANDARD){

        integrity_100_check = checkIsPossibleToCalAWC_Top100_Integrity(viewPlot)
        bedrock_check = checkIsPossCalAWC_BedRock(viewPlot)
        infil_check = checkIsPossibleToCalInfiltrationRate(viewPlot)
        integrity_20_check = checkIsPossibleToCalAWC_Top20_Integrity(viewPlot)

        if (integrity_20_check && bedrock_check){
           document.getElementById("displayErrorAWC_Top20").innerHTML = ""
           $scope.new_soil_profile_awc_top20 = parseFloat(convertUStoEN(getAWCValue_Top20_to1meter(viewPlot,defaultOM_Value),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,METRIC_CENTIMES,METRIC_INCHES)).toFixed(1)
        } else if (!integrity_20_check && bedrock_check){
           $scope.new_soil_profile_awc_top20 = ""
           document.getElementById("displayErrorAWC_Top20").innerHTML = "Add Soil Data to 20cm (8in)" 
        } else if (integrity_20_check && !bedrock_check){
           $scope.new_soil_profile_awc_top20 = ""
           document.getElementById("displayErrorAWC_Top20").innerHTML = "Unable to calculate <= 20cm (8in)" 
        } else if (!integrity_20_check && !bedrock_check){
           $scope.new_soil_profile_awc_top20 = ""
           document.getElementById("displayErrorAWC_Top20").innerHTML = "Unable to calculate <= 20cm (8in)" 
        }

        if (integrity_100_check && bedrock_check){
           document.getElementById("displayErrorAWC_Top100").innerHTML = ""
           $scope.new_soil_profile_awc_top100 = parseFloat(convertUStoEN(getAWCValue_Top100_to1meter(viewPlot,defaultOM_Value),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,METRIC_CENTIMES,METRIC_INCHES)).toFixed(1)
        } else if (!integrity_100_check && bedrock_check){
           $scope.new_soil_profile_awc_top100 = ""
           document.getElementById("displayErrorAWC_Top100").innerHTML = "Add Soil Data to 50cm (20in)" 
        } else if (integrity_100_check && !bedrock_check){
           $scope.new_soil_profile_awc_top100 = ""
           document.getElementById("displayErrorAWC_Top100").innerHTML = "Unable to calculate <= 20cm (8in)" 
        } else if (!integrity_100_check && !bedrock_check){
           $scope.new_soil_profile_awc_top100 = ""
           document.getElementById("displayErrorAWC_Top100").innerHTML = "Unable to calculate <= 20cm (8in)" 
        } 

        
        if (infil_check && bedrock_check){
          document.getElementById("displayErrorInfil").innerHTML = ""
          $scope.infiltration_rate = parseFloat(convertUStoEN(getProfileInfiltrationRate(viewPlot,defaultOM_Value)/10,UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,METRIC_CENTIMES,METRIC_INCHES)).toFixed(0)
        } else if (!infil_check && bedrock_check) {
           $scope.infiltration_rate = ""
           document.getElementById("displayErrorInfil").innerHTML = "Add Soil Data to 20cm (8in)"
        } else if (infil_check && !bedrock_check){
           $scope.infiltration_rate = ""
           document.getElementById("displayErrorInfil").innerHTML = "Unable to calculate <= 20cm (8in)"
        } else if (!infil_check && !bedrock_check){
           $scope.infiltration_rate = ""
           document.getElementById("displayErrorInfil").innerHTML = "Unable to calculate <= 20cm (8in)"
        }
        $scope.awc_unit = "in"
        $scope.infil_unit = "in/hr"
        $scope.textureDepthArray =  ["0-0.5", "0.5-4", "4-8", "8-20", "20-28", "28-40", "40-47"]
        $scope.textureDepthUnit = "in"
      }
    }

  
    //console.log(JSON.stringify(viewPlot))
    $scope.plot = viewPlot;
    $scope.landCoverReviewArray = []
    if (!isEmpty(viewPlot.landCoverObject) && !isEmpty(viewPlot.landCoverObject.has_land_cover)){
      if (viewPlot.landCoverObject.has_land_cover == true && !isEmpty(viewPlot.landCoverObject.land_cover_data) && viewPlot.landCoverObject.land_cover_data.transect.length > 0 ) {
        $scope.landCoverReviewArray = getDistictConsiderData(viewPlot.landCoverObject);
      }
    }

    var str = viewPlot.name.length
    var email = window.localStorage.getItem('current_email')
    var emaillength = email.length + 1
    var finalstr = viewPlot.name.substring(emaillength, str)

    $scope.plot_name = finalstr

    var elevation =''
    if (!isEmpty(viewPlot.geospatial_data) && !isEmpty(viewPlot.geospatial_data.gdal_elevation)) {
      elevation = parseFloat(viewPlot.geospatial_data.gdal_elevation).toFixed(0)
      if (METRIC_CONFIG === ENGLISH_METRIC_STANDARD){
        elevation = parseFloat(convertUStoEN(elevation,UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,METRIC_METERS,METRIC_FEET)).toFixed(2)
      }
    }
    $scope.elevation = elevation;
    //see if plot need to be synchronized
    if (viewPlot.status =='CREATED' || viewPlot.status =='NOT_SYNCHRONIZED') {
      $scope.syncRequired = true;
    } else {
      $scope.syncRequired = false;
    }
    if (isEmpty(viewPlot.texture)) {
      $scope.showTextureMessage = true
    } else {
      $scope.showTextureMessage = false
    }

    /* hide the climate details */
    var details = document.getElementById("climateDetails");
    var detailsUpArrow = document.getElementById("climateDetailsUp");
    var detailsDownArrow = document.getElementById("climateDetailsDown");
    details.style.display = 'none';
    detailsUpArrow.style.visibility = "hidden"
    detailsDownArrow.style.visibility = "visible"
    $scope.showHideClimate("")

  });



  /* Translate */
  var LANGUAGE_CONFIG = window.localStorage.getItem('GLOBAL_CONFIG_LANGUAGE')
  $translate.use(LANGUAGE_CONFIG)



  $scope.changeOMValue = function() {
     var OMValue = parseFloat(document.getElementById('idOMValue').value)
     //var decOMValue = OMValue/100
     var decOMValue = OMValue
     document.getElementById('txtOrganicMatter').innerHTML = OMValue

     if (METRIC_CONFIG === UNITED_STATES_METRIC_STANDARD){
        integrity_20_check = checkIsPossibleToCalAWC_Top20_Integrity(viewPlot)
        integrity_100_check = checkIsPossibleToCalAWC_Top100_Integrity(viewPlot)
        bedrock_check = checkIsPossCalAWC_BedRock(viewPlot)
        infil_check = checkIsPossibleToCalInfiltrationRate(viewPlot)

        if (integrity_20_check && bedrock_check){
          document.getElementById("displayErrorAWC_Top20").innerHTML = ""
          $scope.new_soil_profile_awc_top20 = getAWCValue_Top20_to1meter(viewPlot,decOMValue).toFixed(1)
        } else if (!integrity_20_check && bedrock_check){
          $scope.new_soil_profile_awc_top20 = ""
          document.getElementById("displayErrorAWC_Top20").innerHTML = "Add Soil Data to 20cm (8in)" 
        } else if (integrity_20_check && !bedrock_check){
          $scope.new_soil_profile_awc_top20 = ""
          document.getElementById("displayErrorAWC_Top20").innerHTML = "Unable to calculate <= 20cm (8in)" 
        } else if (!integrity_20_check && !bedrock_check){
          $scope.new_soil_profile_awc_top20 = ""
          document.getElementById("displayErrorAWC_Top20").innerHTML = "Unable to calculate <= 20cm (8in)" 
        }

        if (integrity_100_check && bedrock_check){
          document.getElementById("displayErrorAWC_Top100").innerHTML = ""
          $scope.new_soil_profile_awc_top100 = getAWCValue_Top100_to1meter(viewPlot,decOMValue).toFixed(1)
        } else if (!integrity_100_check && bedrock_check){
          $scope.new_soil_profile_awc_top100 = ""
          document.getElementById("displayErrorAWC_Top100").innerHTML = "Add Soil Data to 50cm (20in)" 
        } else if (integrity_100_check && !bedrock_check){
          $scope.new_soil_profile_awc_top100 = ""
          document.getElementById("displayErrorAWC_Top100").innerHTML = "Unable to calculate <= 20cm (8in)" 
        } else if (!integrity_100_check && !bedrock_check){
          $scope.new_soil_profile_awc_top100 = ""
          document.getElementById("displayErrorAWC_Top100").innerHTML = "Unable to calculate <= 20cm (8in)" 
        }  
          
        if (infil_check && bedrock_check){
          document.getElementById("displayErrorInfil").innerHTML = ""
          $scope.infiltration_rate = getProfileInfiltrationRate(viewPlot,decOMValue).toFixed(0)
        } else if (!infil_check && bedrock_check){
          $scope.infiltration_rate = ""
          document.getElementById("displayErrorInfil").innerHTML = "Add Soil Data to 20cm (8in)"
        } else if (infil_check && !bedrock_check) {
          $scope.infiltration_rate = ""
          document.getElementById("displayErrorInfil").innerHTML = "Unable to calculate <= 20cm (8in)"
        } else if (!infil_check && !bedrock_check) {
          $scope.infiltration_rate = ""
          document.getElementById("displayErrorInfil").innerHTML = "Unable to calculate <= 20cm (8in)"
        }
        
     } else if (METRIC_CONFIG === ENGLISH_METRIC_STANDARD){
        integrity_100_check = checkIsPossibleToCalAWC_Top100_Integrity(viewPlot)
        bedrock_check = checkIsPossCalAWC_BedRock(viewPlot)
        infil_check = checkIsPossibleToCalInfiltrationRate(viewPlot)
        integrity_20_check = checkIsPossibleToCalAWC_Top20_Integrity(viewPlot)

        if (integrity_20_check && bedrock_check){
           document.getElementById("displayErrorAWC_Top20").innerHTML = ""
           $scope.new_soil_profile_awc_top20 = parseFloat(convertUStoEN(getAWCValue_Top20_to1meter(viewPlot,decOMValue),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,METRIC_CENTIMES,METRIC_INCHES)).toFixed(1)
        } else if (!integrity_20_check && bedrock_check){
           $scope.new_soil_profile_awc_top20 = ""
           document.getElementById("displayErrorAWC_Top20").innerHTML = "Add Soil Data to 20cm (8in)" 
        } else if (integrity_20_check && !bedrock_check){
           $scope.new_soil_profile_awc_top20 = ""
           document.getElementById("displayErrorAWC_Top20").innerHTML = "Unable to calculate <= 20cm (8in)" 
        } else if (!integrity_20_check && !bedrock_check){
           $scope.new_soil_profile_awc_top20 = ""
           document.getElementById("displayErrorAWC_Top20").innerHTML = "Unable to calculate <= 20cm (8in)" 
        }

        if (integrity_100_check && bedrock_check){
           document.getElementById("displayErrorAWC_Top100").innerHTML = ""
           $scope.new_soil_profile_awc_top100 = parseFloat(convertUStoEN(getAWCValue_Top100_to1meter(viewPlot,decOMValue),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,METRIC_CENTIMES,METRIC_INCHES)).toFixed(1)
        } else if (!integrity_100_check && bedrock_check){
           $scope.new_soil_profile_awc_top100 = ""
           document.getElementById("displayErrorAWC_Top100").innerHTML = "Add Soil Data to 50cm (20in)" 
        } else if (integrity_100_check && !bedrock_check){
           $scope.new_soil_profile_awc_top100 = ""
           document.getElementById("displayErrorAWC_Top100").innerHTML = "Unable to calculate <= 20cm (8in)" 
        } else if (!integrity_100_check && !bedrock_check){
           $scope.new_soil_profile_awc_top100 = ""
           document.getElementById("displayErrorAWC_Top100").innerHTML = "Unable to calculate <= 20cm (8in)" 
        }  

        
        if (infil_check && bedrock_check){
          document.getElementById("displayErrorInfil").innerHTML = ""
          $scope.infiltration_rate = parseFloat(convertUStoEN(getProfileInfiltrationRate(viewPlot,decOMValue)/10,UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,METRIC_CENTIMES,METRIC_INCHES)).toFixed(0)
        } else if (!infil_check && bedrock_check) {
           $scope.infiltration_rate = ""
           document.getElementById("displayErrorInfil").innerHTML = "Add Soil Data to 20cm (8in)"
        } else if (infil_check && !bedrock_check){
           $scope.infiltration_rate = ""
           document.getElementById("displayErrorInfil").innerHTML = "Unable to calculate <= 20cm (8in)"
        } else if (!infil_check && !bedrock_check){
           $scope.infiltration_rate = ""
           document.getElementById("displayErrorInfil").innerHTML = "Unable to calculate <= 20cm (8in)"
        }
     }
  }

  $scope.synchronize  = function() {

      if (checkNetConnection() === true) {
        sync_timeout = 0
        /* Add API get Google Map Image based on Lat/long */
        //if (!isEmpty(viewPlot.google_map_image_data) && viewPlot.google_map_image_data.substring(0,10) == "data:image"){
        //   console.log("Get image from Cache")
        //   sync_timeout = 0
        //} else {
        //   console.log("Get image from GOOGLE API")
        //   googleService.getGoogleMapImage(viewPlot,recorder_name,true)
        //   sync_timeout = 2000
        //}

        $ionicLoading.show({
          delay:100,
          template: 'Synchronizing Site data...'
        })
        var action = 'update'
        if (viewPlot.status == 'CREATED')
          action = 'put'
        //**********************
        setTimeout(function (){
          plotListService.pushPlotToCloud(viewPlot, action)
          .success(
            function (data, status, headers, config) {
              console.log("successful update")
              /* Step 1 : Delete current editing plot in Main List */
              deleteLandInfoPlotInArray_2(viewPlot.name,viewPlot.recorder_name,LIST_PLOTS)
              /* Step 2 : load new cloud plot */
              plotListService.loadPlotFromCloud(viewPlot.recorder_name, viewPlot.name)
              .success(
                function(data) {
                  //console.log("Success. Updated Cloud Plot : " + JSON.stringify(data[0]))
                  if (!isEmpty(data) && data.length >= 1){
                    LIST_PLOTS.push(data[0])
                  }

                  //window.localStorage.setItem(recorder_name + '_' + 'LIST_LANDINFO_PLOTS',JSON.stringify(LIST_PLOTS))
                  //window.localStorage.setItem('current_view_plot', JSON.stringify(data[0]));
                  newViewPlot = data[0];
                  newViewPlot.googleMapImageURL = googleService.getGoogleMapImageURL(newViewPlot)
                  newViewPlot.landCoverObject = viewPlot.landCoverObject;
                  viewPlot = newViewPlot;
                  
                  plotListService.updateCachedPlot(LIST_PLOTS, viewPlot);

                  //console.log(google_image)
                  $scope.plot = viewPlot;
                  //everything updated successfully.  remove sync flag
                  $scope.syncRequired = false;
                  $ionicLoading.hide();
                  //$state.go('landpks.landinfo_site-home')
                })
              .error(
                function (err) {
                  console.log("error : " + err)
                  //nothing to do,
              })
            }
          )
          .error(
            function (err) {
              console.log("error pushing to cloud : " + err.error);
              //close ionic loading and load plot in background
              $ionicLoading.hide();
              if (!isEmpty(err.error) && err.error.trim() === '[Recorder_name + name] pair is existed in system. Please select another') {
                message = "[Recorder_name  + plot name] pair already exists in system. Please select another plot name."
                var infoPopup = $ionicPopup.alert({
                  cssClass: 'remove-title-class',
                  template: message
                })
                infoPopup.then(function (res) {
                  return;
                })
              }
              var infoPopup = $ionicPopup.alert({
                cssClass: 'remove-title-class',
                template: 'Your plot cannot be saved to the cloud at this time</br>' + err.error
              })
              infoPopup.then(function (res) {
                //store plot on device and upload in background
                //viewPlot.status = "UPLOADING";
                viewPlot.has_google_map_image_data = google_image.flag
                viewPlot.google_map_image_data = google_image.data
                plotListService.updateCachedPlot(LIST_PLOTS, viewPlot);
                addPendingLandInfoPlotToQueue(viewPlot);
                $state.go('landpks.landinfo_site-home')
              })
              return
            })
        }, sync_timeout);
      } else {
        //store plot on device and upload in background
        //viewPlot.status = "UPLOADING"
        viewPlot.has_google_map_image_data = google_image.flag
        viewPlot.google_map_image_data = google_image.data
        plotListService.updateCachedPlot(LIST_PLOTS, viewPlot)
        addPendingLandInfoPlotToQueue(viewPlot)
        var infoPopup = $ionicPopup.alert({
          cssClass: 'remove-title-class',
          template: 'Plot has been marked for background upload. You will receive a notification when results are available'
        })
        infoPopup.then(function (res) {
          console.log('Add Plot to queue')
          $state.go('landpks.landinfo_site-home')
        })
      }
  };

  $scope.showHideDetails = function(divID) {
      var details = document.getElementById(divID);
      var detailsUpArrow = document.getElementById(divID+"Up");
      var detailsDownArrow = document.getElementById(divID+"Down");

      if (details.style.display === 'none') {
          details.style.display = 'block';
          detailsDownArrow.style.visibility = "hidden"
          detailsUpArrow.style.visibility = "visible"
      } else {
          details.style.display = 'none';
          detailsUpArrow.style.visibility = "hidden"
          detailsDownArrow.style.visibility = "visible"
      }

  };

  $scope.showHideLandCoverResult = function(divID, date) {
      
      $scope.showHideDetails(divID)
      //do nothing else if they're closing the display
      if (document.getElementById(divID).style.display === "none") {
        return;
      }
      //do nothing if the data is already populated
      if (!isEmpty($scope.plantCoverValues)){
        return
      }
      //else populate all date displays
      //setup the units.  This could probably all be moved to a resource and loaded at startup instead
      var METRIC_CONFIG = window.localStorage.getItem('GLOBAL_CONFIG_METRICS_UNITS')
      $scope.GLOBAL_METRIC_CONFIG = METRIC_CONFIG

      var label_10cm = '<10cm'
      var label_10_50cm = '10-50cm'
      var label_50cm_1m = '50cm-1m'
      var label_1_2_m = '1-2m'
      var label_2_3_m = '2-3m'
      var label_3_m = '>3m'
      if (METRIC_CONFIG === UNITED_STATES_METRIC_STANDARD){
        $scope.label_10cm = label_10cm
        $scope.label_10_50cm = label_10_50cm
        $scope.label_50cm_1m = label_50cm_1m
        $scope.label_1_2_m = label_1_2_m
        $scope.label_2_3_m = label_2_3_m
        $scope.label_3_m = label_3_m
      } else if (METRIC_CONFIG === ENGLISH_METRIC_STANDARD){
        $scope.label_10cm = '<4in'
        $scope.label_10_50cm = '4-19.7in'
        $scope.label_50cm_1m = '19.7in-3.3ft'
        $scope.label_1_2_m = '3.3ft-6.6ft'
        $scope.label_2_3_m = '6.6ft-9.8ft'
        $scope.label_3_m = '>9.8ft'
      } else {
        $scope.label_10cm = label_10cm
        $scope.label_10_50cm = label_10_50cm
        $scope.label_50cm_1m = label_50cm_1m
        $scope.label_1_2_m = label_1_2_m
        $scope.label_2_3_m = label_2_3_m
        $scope.label_3_m = label_3_m
      }
      var landCoverPlot = viewPlot.landCoverObject;
      //var selectedLandCoverPlot = copyCurrentViewLandCoverObjectData(landCoverPlot, date)
      //var transect = selectedLandCoverPlot.land_cover_data.transect
      var totalNumberTransect = 20;

      var dateArray = getDistictConsiderData(landCoverPlot);
      for (key in dateArray){
        console.log("populating Date Array : " + dateArray[key])
        var selectedLandCoverPlot = copyCurrentViewLandCoverObjectData(landCoverPlot, dateArray[key])
        var transect = selectedLandCoverPlot.land_cover_data.transect

        var displayObject = populateCoverData(selectedLandCoverPlot, transect, dateArray[key])
        //console.log("displayObject : " + JSON.stringify(displayObject))
        if (isEmpty($scope.coverValues)) {
          $scope.coverValues = {}
        }
        $scope.coverValues[dateArray[key]] = [displayObject['coverData']['totalCover']+" %", displayObject['coverData']['bareGround']+" %", displayObject['coverData']['foliarCover']+" %", displayObject['coverData']['totalHerb']+" %", displayObject['coverData']['totalWood']+" %", displayObject['coverData']['totalRock']+" %"]

        if (isEmpty($scope.coverBarValues)) {
          $scope.coverBarValues = {}
        }
        $scope.coverBarValues[dateArray[key]] = [[displayObject['coverData']['totalCover'], displayObject['coverData']['bareGround'], displayObject['coverData']['foliarCover'], displayObject['coverData']['totalHerb'], displayObject['coverData']['totalWood'], displayObject['coverData']['totalRock']],]
        fillColorArray=["#ef473a", "#886aea", "#ffc900", "#33cd5f", "#11c1f3", "#d6d6d6"];
        strokeColorArray=["#ff1200", "#886aea", "#ffc900", "#33cd5f", "#11c1f3", "#d6d6d6"];
        buttonColorArray=["#ef473a", "#886aea", "#ffc900", "#33cd5f", "#11c1f3", "#d6d6d6"];

        $scope.coverLabels = ["Total cover", "Bare ground", "Foliar cover", "Herbaceous litter", "Woody litter", "Rock fragment"]
        $scope.coverLabelsGraph = ["","","","","",""]

        $scope.coverBarColors = [{fillColor: fillColorArray, strokeColor: strokeColorArray, buttonColors: buttonColorArray}]
        $scope.coverCaption = ['Cover']
        $scope.fillColorArray = fillColorArray
        $scope.coverBarOptions = {
          animation: false,
          tooltipTemplate: function(obj) {
            return obj.value;
          }
        }
        /*done with cover data*/

        /* set plantCover table and plot data into scope */
        if (isEmpty($scope.plantCoverValues)) {
          $scope.plantCoverValues = {}
        }
        $scope.plantCoverValues[dateArray[key]] = [displayObject['plantCoverData']['totalTree']+" %", displayObject['plantCoverData']['reShrubs']+" %", displayObject['plantCoverData']['totalSubShrubs']+" %", displayObject['plantCoverData']['totalPlantBase']+" %", displayObject['plantCoverData']['totalPerennialGrasses']+" %", displayObject['plantCoverData']['totalAnnuals']+" %"]
        displayObject['plantCoverData']['totalTree']
        if (isEmpty($scope.plantCoverBarValues)) {
          $scope.plantCoverBarValues = {}
        }
        $scope.plantCoverBarValues[dateArray[key]] = [[displayObject['plantCoverData']['totalTree'], displayObject['plantCoverData']['reShrubs'], displayObject['plantCoverData']['totalSubShrubs'], displayObject['plantCoverData']['totalPlantBase'], displayObject['plantCoverData']['totalPerennialGrasses'], displayObject['plantCoverData']['totalAnnuals']],]

        $scope.plantCoverLabels = ["Tree", "Shrub", "Sub-shrub", "Plant base", "Perennial grass", "Annual plant"]
        $scope.plantCoverLabelsGraph = ["","","","","",""]
        $scope.plantCoverBarColors = [{fillColor: fillColorArray, strokeColor: strokeColorArray, buttonColors: buttonColorArray}]
        $scope.plantCoverCaption = ['Cover']
        $scope.plantCoverBarOptions = {
          animation: false,
          tooltipTemplate: function(obj) {
            return obj.value;
          }
        }
        /* end plantCover */
        /* set canopy height table and plot data into scope */
        if (isEmpty($scope.canopyValues)) {
          $scope.canopyValues = {}
        }
        $scope.canopyValues[dateArray[key]] = [displayObject['canopyData']['h10_cm']+" %" , displayObject['canopyData']['h10_50_cm']+" %", displayObject['canopyData']['h50_cm_1_m']+" %", displayObject['canopyData']['h1_2_m']+" %", displayObject['canopyData']['h2_3_m']+" %", displayObject['canopyData']['h3_m']+" %"]

        if (isEmpty($scope.canopyBarValues)) {
          $scope.canopyBarValues = {}
        }
        $scope.canopyBarValues[dateArray[key]] = [[displayObject['canopyData']['h10_cm'] , displayObject['canopyData']['h10_50_cm'], displayObject['canopyData']['h50_cm_1_m'], displayObject['canopyData']['h1_2_m'], displayObject['canopyData']['h2_3_m'], displayObject['canopyData']['h3_m']],]

        $scope.canopyLabels = [label_10cm, label_10_50cm, label_50cm_1m, label_1_2_m, label_2_3_m, label_3_m]
        $scope.canopyLabelsGraph = ["","","","","",""]
        $scope.canopyBarColors = [{fillColor: fillColorArray, strokeColor: strokeColorArray, buttonColors: buttonColorArray}]
        $scope.canopyCaption = ['Cover']
        $scope.canopyBarOptions = {
          animation: false,
          tooltipTemplate: function(obj) {
            return obj.value;
          }
        }

        if (isEmpty($scope.canopyGapValue)) {
          $scope.canopyGapValue = {}
        }
        if(!isEmpty(displayObject['canopyGap'])){
          $scope.canopyGapValue[dateArray[key]] = displayObject['canopyGap'] + " %"
        } else {
          $scope.canopyGapValue[dateArray[key]] = "0 %"
        }
        if (isEmpty($scope.basalGapValue)) {
          $scope.basalGapValue = {}
        }
        if(!isEmpty(displayObject['basalGap'])){
          $scope.basalGapValue[dateArray[key]] = displayObject['basalGap'] + " %"
        } else {
          $scope.basalGapValue[dateArray[key]] = "0 %"
        }

      }
      


      //end unit setup
      /**************************/

      //populateCoverData(selectedLandCoverPlot, transect, date)

  }

    $scope.showHideLandCoverTrend = function(divID) {

      $scope.showHideDetails(divID)
      if (document.getElementById(divID).style.display === "none") {
        return;
      }
      var totalCoverTrend = []
      var bareGroundTrend = []
      var foliarCoverTrend = []
      var totalHerbTrend = []
      var totalWoodTrend = []
      var totalRockTrend = []

      var totalTreeTrend = []
      var reShrubsTrend = []
      var totalSubShrubsTrend = []
      var totalPlantBaseTrend = []
      var totalPerennialGrassesTrend = []
      var totalAnnualsTrend = []

      var canopy_10_Trend = []
      var canopy_10_50_Trend = []
      var canopy_50_1_Trend = []
      var canopy_1_2_Trend = []
      var canopy_2_3_Trend = []
      var canopy_3_Trend = []

      var canopyGapTrend = []
      var basalGapTrend = []

      var dateLabel = []
      var landCoverPlot = viewPlot.landCoverObject;
      var totalNumberTransect = 20;
      var dateArray = getDistictConsiderData(landCoverPlot);
      for (key in dateArray){
        var selectedLandCoverPlot = copyCurrentViewLandCoverObjectData(landCoverPlot, dateArray[key])
        var transect = selectedLandCoverPlot.land_cover_data.transect

        var displayObject = populateCoverData(selectedLandCoverPlot, transect, dateArray[key])
        totalCoverTrend.push(displayObject['coverData']['totalCover'])
        bareGroundTrend.push(displayObject['coverData']['bareGround'])
        foliarCoverTrend.push(displayObject['coverData']['foliarCover'])
        totalHerbTrend.push(displayObject['coverData']['totalHerb'])
        totalWoodTrend.push(displayObject['coverData']['totalWood'])
        totalRockTrend.push(displayObject['coverData']['totalRock'])

        totalTreeTrend.push(displayObject['plantCoverData']['totalTree'])
        reShrubsTrend.push(displayObject['plantCoverData']['reShrubs'])
        totalSubShrubsTrend.push(displayObject['plantCoverData']['totalSubShrubs'])
        totalPlantBaseTrend.push(displayObject['plantCoverData']['totalPlantBase'])
        totalPerennialGrassesTrend.push(displayObject['plantCoverData']['totalPerennialGrasses'])
        totalAnnualsTrend.push(displayObject['plantCoverData']['totalAnnuals'])

        canopy_10_Trend.push(displayObject['canopyData']['h10_cm'])
        canopy_10_50_Trend.push(displayObject['canopyData']['h10_50_cm'])
        canopy_50_1_Trend.push(displayObject['canopyData']['h50_cm_1_m'])
        canopy_1_2_Trend.push(displayObject['canopyData']['h1_2_m'])
        canopy_2_3_Trend.push(displayObject['canopyData']['h2_3_m'])
        canopy_3_Trend.push(displayObject['canopyData']['h3_m'])

        canopyGapTrend.push(displayObject['canopyGap'])
        basalGapTrend.push(displayObject['basalGap'])

        dateLabel.push(dateArray[key])

      }
      console.log(bareGroundTrend)
      console.log(foliarCoverTrend)
      $scope.coverTrendData = [
            totalCoverTrend
          , bareGroundTrend
          , foliarCoverTrend
          , totalHerbTrend
          , totalWoodTrend
          , totalRockTrend
        ]
      $scope.plantCoverTrendData = [
            totalTreeTrend
          , reShrubsTrend
          , totalSubShrubsTrend
          , totalPlantBaseTrend
          , totalPerennialGrassesTrend
          , totalAnnualsTrend
        ]
      $scope.canopyTrendData = [
          canopy_10_Trend
          , canopy_10_50_Trend
          , canopy_50_1_Trend
          , canopy_1_2_Trend
          , canopy_2_3_Trend
          , canopy_3_Trend
        ]
      $scope.gapTrendData = [
          canopyGapTrend
          , basalGapTrend
        ]
      $scope.trendColorArray = ['#97BBCD', '#DCDCDC', '#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360']  
      
      //$scope.coverTrendColors=["#ef473a", "#886aea", "#ffc900", "#33cd5f", "#11c1f3", "#d6d6d6"];
      fillColorArray=["#ef473a", "#886aea", "#ffc900", "#33cd5f", "#11c1f3", "#d6d6d6"];
      strokeColorArray=["#ff1200", "#886aea", "#ffc900", "#33cd5f", "#11c1f3", "#d6d6d6"];
      buttonColorArray=["#ef473a", "#886aea", "#ffc900", "#33cd5f", "#11c1f3", "#d6d6d6"];

      $scope.coverTrendColors = {lineColor: fillColorArray, strokeColor: strokeColorArray, buttonColors: buttonColorArray}
      $scope.myColors = ["#ef473a", "#886aea", "#ffc900", "#33cd5f", "#11c1f3", "#d6d6d6"];


      $scope.coverTrendLabels = dateLabel
      $scope.trend_line_options = {
        animation: false,
        datasetFill: false,
        datasetStrokeWidth: 3,
        multiTooltipTemplate: function(obj) {
          return obj.value ;
        }
      }
      
      $scope.coverLabels = ['Total', 'Bare', 'Foliar', 'Herb', 'Wood', 'Rock']
      $scope.plantCoverLabels = ["tree", "shrub", "Sub-shrub", "Plant base", "Perennial grass", "Annual plant"]
      //$scope.canopyTrendLabels = [displayObject['canopyData']['h10_cm']+" %" , displayObject['canopyData']['h10_50_cm']+" %", displayObject['canopyData']['h50_cm_1_m']+" %", displayObject['canopyData']['h1_2_m']+" %", displayObject['canopyData']['h2_3_m']+" %", displayObject['canopyData']['h3_m']+" %"]
      var METRIC_CONFIG = window.localStorage.getItem('GLOBAL_CONFIG_METRICS_UNITS')
      $scope.canopyTrendLabels = ['<10cm', '10-50cm', '50cm-1m', '1-2m', '2-3m', '>3m']
      if (METRIC_CONFIG === ENGLISH_METRIC_STANDARD){
        $scope.canopyTrendLabels = ['<4in', '4-19.7in', '19.7in-3.3ft', '3.3ft-6.6ft', '6.6ft-9.8ft', '>9.8ft']
      }
      $scope.gapTrendLabels = ["Canopy Gap", "Basal Gap"]
    }

    $scope.showHideClimate = function(divID) {
      if(!isEmpty(divID) && divID !== ""  ){
        $scope.showHideDetails(divID)
        if (document.getElementById(divID).style.display === "none") {
          return;
        }
      }
      var METRIC_CONFIG = window.localStorage.getItem('GLOBAL_CONFIG_METRICS_UNITS')
      $scope.precip_bar_options = {
        animation: false,
        tooltipTemplate: function(obj) {
          return obj.label + ': ' + obj.value + ' mm';
        }
      }
      $scope.label_precipication_graph = 'Precipitation (mm)'
      if (METRIC_CONFIG === ENGLISH_METRIC_STANDARD) {
        $scope.precip_bar_options = {
          animation: false,
          tooltipTemplate: function(obj) {
            return obj.label + ': ' + obj.value + ' in';
          }
        }
        $scope.label_precipication_graph = 'Precipitation (in)'
      } 

      $scope.precip_bar_colors = [{fillColor: ['#97bbcd'], strokeColor: ['#000']}]
      //$scope.selectedPlot = ListPlotsCtrl_Scope.selectedPlot
      $scope.labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      $scope.series = ['Series A']
      $scope.captions = ['Climate']

      try{
        /* Validate climate precipitation */
        if (isEmpty(viewPlot.climate) || isEmpty(viewPlot.climate.precipitation)) {

          $scope.data = [
            [null,null,null,null,null,null,null,null,null,null,null,null],
          ]
          document.getElementById("bar").style.display = "none"
          document.getElementById("no_data_bar").style.display = "block"
        } else {
          if (METRIC_CONFIG === UNITED_STATES_METRIC_STANDARD){
            $scope.data = [
              [viewPlot.climate.precipitation.january.toFixed(0),
                viewPlot.climate.precipitation.february.toFixed(0),
                viewPlot.climate.precipitation.march.toFixed(0),
                viewPlot.climate.precipitation.april.toFixed(0),
                viewPlot.climate.precipitation.may.toFixed(0),
                viewPlot.climate.precipitation.june.toFixed(0),
                viewPlot.climate.precipitation.july.toFixed(0),
                viewPlot.climate.precipitation.august.toFixed(0),
                viewPlot.climate.precipitation.september.toFixed(0),
                viewPlot.climate.precipitation.october.toFixed(0),
                viewPlot.climate.precipitation.november.toFixed(0),
                viewPlot.climate.precipitation.december.toFixed(0)
              ],
            ]
          } else if (METRIC_CONFIG === ENGLISH_METRIC_STANDARD) {
            $scope.data = [
              [parseFloat(convertUStoEN(viewPlot.climate.precipitation.january.toFixed(0)/10,UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,METRIC_CENTIMES,METRIC_INCHES)).toFixed(1),
               parseFloat(convertUStoEN(viewPlot.climate.precipitation.february.toFixed(0)/10,UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,METRIC_CENTIMES,METRIC_INCHES)).toFixed(1),
               parseFloat(convertUStoEN(viewPlot.climate.precipitation.march.toFixed(0)/10,UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,METRIC_CENTIMES,METRIC_INCHES)).toFixed(1),
               parseFloat(convertUStoEN(viewPlot.climate.precipitation.april.toFixed(0)/10,UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,METRIC_CENTIMES,METRIC_INCHES)).toFixed(1),
               parseFloat(convertUStoEN(viewPlot.climate.precipitation.may.toFixed(0)/10,UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,METRIC_CENTIMES,METRIC_INCHES)).toFixed(1),
               parseFloat(convertUStoEN(viewPlot.climate.precipitation.june.toFixed(0)/10,UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,METRIC_CENTIMES,METRIC_INCHES)).toFixed(1),
               parseFloat(convertUStoEN(viewPlot.climate.precipitation.july.toFixed(0)/10,UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,METRIC_CENTIMES,METRIC_INCHES)).toFixed(1),
               parseFloat(convertUStoEN(viewPlot.climate.precipitation.august.toFixed(0)/10,UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,METRIC_CENTIMES,METRIC_INCHES)).toFixed(1),
               parseFloat(convertUStoEN(viewPlot.climate.precipitation.september.toFixed(0)/10,UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,METRIC_CENTIMES,METRIC_INCHES)).toFixed(1),
               parseFloat(convertUStoEN(viewPlot.climate.precipitation.october.toFixed(0)/10,UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,METRIC_CENTIMES,METRIC_INCHES)).toFixed(1),
               parseFloat(convertUStoEN(viewPlot.climate.precipitation.november.toFixed(0)/10,UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,METRIC_CENTIMES,METRIC_INCHES)).toFixed(1),
               parseFloat(convertUStoEN(viewPlot.climate.precipitation.december.toFixed(0)/10,UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,METRIC_CENTIMES,METRIC_INCHES)).toFixed(1)
              ],
            ]
          } else {
            $scope.data = [
              [viewPlot.climate.precipitation.january.toFixed(0),
                viewPlot.climate.precipitation.february.toFixed(0),
                viewPlot.climate.precipitation.march.toFixed(0),
                viewPlot.climate.precipitation.april.toFixed(0),
                viewPlot.climate.precipitation.may.toFixed(0),
                viewPlot.climate.precipitation.june.toFixed(0),
                viewPlot.climate.precipitation.july.toFixed(0),
                viewPlot.climate.precipitation.august.toFixed(0),
                viewPlot.climate.precipitation.september.toFixed(0),
                viewPlot.climate.precipitation.october.toFixed(0),
                viewPlot.climate.precipitation.november.toFixed(0),
                viewPlot.climate.precipitation.december.toFixed(0)
              ],
            ]
          }
          document.getElementById("bar").style.display = "block"
          document.getElementById("no_data_bar").style.display = "none"
        }
      } catch(e){

      }

      $scope.temp_line_options = {
        animation: false,
        datasetFill: false,
        datasetStrokeWidth: 3,
        multiTooltipTemplate: function(obj) {
          if (METRIC_CONFIG === UNITED_STATES_METRIC_STANDARD){
            return obj.label + ': ' + obj.value + ' °C';
          } else if (METRIC_CONFIG === ENGLISH_METRIC_STANDARD){
            return obj.label + ': ' + obj.value + ' °F';
          } else {
            return obj.label + ': ' + obj.value + ' °C';
          }
        }
      }
      if (METRIC_CONFIG === ENGLISH_METRIC_STANDARD){
        $scope.temp_line_options = {
          animation: false,
          datasetFill: false,
          datasetStrokeWidth: 3,
          scaleOverride: true,
          scaleSteps: 5,
          scaleStepWidth: 20,
          scaleStartValue: 0,
          multiTooltipTemplate: function(obj) {
            if (METRIC_CONFIG === UNITED_STATES_METRIC_STANDARD){
              return obj.label + ': ' + obj.value + ' °C';
            } else if (METRIC_CONFIG === ENGLISH_METRIC_STANDARD){
              return obj.label + ': ' + obj.value + ' °F';
            } else {
              return obj.label + ': ' + obj.value + ' °C';
            }
          }
        }
      }
      $scope.names = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      $scope.number = ['Min Temp', 'Avg Temp', 'Max Temp']


      $scope.label_elevation_unit = "m"
      $scope.label_avg_annual_pre_unit = "mm"
      $scope.label_precipication_graph = 'Precipitation (mm)'
      $scope.label_degree = "°C"
      if (METRIC_CONFIG === ENGLISH_METRIC_STANDARD){
        $scope.label_precipication_graph = 'Precipitation (in)'
        $scope.label_degree = "°F"
        $scope.annualPrecip_in = parseFloat(convertUStoEN(viewPlot.climate.precipitation.annual.toFixed(0)/10,UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,METRIC_CENTIMES,METRIC_INCHES)).toFixed(2)
      }

      /* Validate climate precipitation */
      var max_data = []
      var check_max_tem = true

      if (isEmpty(viewPlot.climate) || isEmpty(viewPlot.climate.max_temperature)) {

        check_max_tem = false
        max_data = [null,null,null,null,null,null,null,null,null,null,null,null]
      } else {
        try {

            if (METRIC_CONFIG === UNITED_STATES_METRIC_STANDARD){
                  max_data = [viewPlot.climate.max_temperature.january.toFixed(1),
                              viewPlot.climate.max_temperature.february.toFixed(1),
                              viewPlot.climate.max_temperature.march.toFixed(1),
                              viewPlot.climate.max_temperature.april.toFixed(1),
                              viewPlot.climate.max_temperature.may.toFixed(1),
                              viewPlot.climate.max_temperature.june.toFixed(1),
                              viewPlot.climate.max_temperature.july.toFixed(1),
                              viewPlot.climate.max_temperature.august.toFixed(1),
                              viewPlot.climate.max_temperature.september.toFixed(1),
                              viewPlot.climate.max_temperature.october.toFixed(1),
                              viewPlot.climate.max_temperature.november.toFixed(1),
                              viewPlot.climate.max_temperature.december.toFixed(1)]
            } else if (METRIC_CONFIG === ENGLISH_METRIC_STANDARD){
                max_data = [parseFloat(convertUStoEN(viewPlot.climate.max_temperature.january.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                            parseFloat(convertUStoEN(viewPlot.climate.max_temperature.february.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                            parseFloat(convertUStoEN(viewPlot.climate.max_temperature.march.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                            parseFloat(convertUStoEN(viewPlot.climate.max_temperature.april.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                            parseFloat(convertUStoEN(viewPlot.climate.max_temperature.may.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                            parseFloat(convertUStoEN(viewPlot.climate.max_temperature.june.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                            parseFloat(convertUStoEN(viewPlot.climate.max_temperature.july.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                            parseFloat(convertUStoEN(viewPlot.climate.max_temperature.august.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                            parseFloat(convertUStoEN(viewPlot.climate.max_temperature.september.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                            parseFloat(convertUStoEN(viewPlot.climate.max_temperature.october.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                            parseFloat(convertUStoEN(viewPlot.climate.max_temperature.november.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                            parseFloat(convertUStoEN(viewPlot.climate.max_temperature.december.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1)]
            } else {
                max_data = [viewPlot.climate.max_temperature.january.toFixed(1),
                          viewPlot.climate.max_temperature.february.toFixed(1),
                          viewPlot.climate.max_temperature.march.toFixed(1),
                          viewPlot.climate.max_temperature.april.toFixed(1),
                          viewPlot.climate.max_temperature.may.toFixed(1),
                          viewPlot.climate.max_temperature.june.toFixed(1),
                          viewPlot.climate.max_temperature.july.toFixed(1),
                          viewPlot.climate.max_temperature.august.toFixed(1),
                          viewPlot.climate.max_temperature.september.toFixed(1),
                          viewPlot.climate.max_temperature.october.toFixed(1),
                          viewPlot.climate.max_temperature.november.toFixed(1),
                          viewPlot.climate.max_temperature.december.toFixed(1)]
            }
            check_max_tem = true
        } catch (e){
            console.log(e)
            max_data = [null,null,null,null,null,null,null,null,null,null,null,null]
            check_max_tem = false
        }
      }

      /* Validate climate precipitation */
      var avg_data = []
      var check_avg_temp = true
      if (isEmpty(viewPlot.climate) || isEmpty(viewPlot.climate.average_temperature)) {

        avg_data = [null,null,null,null,null,null,null,null,null,null,null,null]
        check_avg_temp = false
      } else {
        try {
          if (METRIC_CONFIG === UNITED_STATES_METRIC_STANDARD){
              avg_data = [viewPlot.climate.average_temperature.january.toFixed(1),
                          viewPlot.climate.average_temperature.february.toFixed(1),
                          viewPlot.climate.average_temperature.march.toFixed(1),
                          viewPlot.climate.average_temperature.april.toFixed(1),
                          viewPlot.climate.average_temperature.may.toFixed(1),
                          viewPlot.climate.average_temperature.june.toFixed(1),
                          viewPlot.climate.average_temperature.july.toFixed(1),
                          viewPlot.climate.average_temperature.august.toFixed(1),
                          viewPlot.climate.average_temperature.september.toFixed(1),
                          viewPlot.climate.average_temperature.october.toFixed(1),
                          viewPlot.climate.average_temperature.november.toFixed(1),
                          viewPlot.climate.average_temperature.december.toFixed(1)]
          } else if (METRIC_CONFIG === ENGLISH_METRIC_STANDARD){
              avg_data = [parseFloat(convertUStoEN(viewPlot.climate.average_temperature.january.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                        parseFloat(convertUStoEN(viewPlot.climate.average_temperature.february.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                        parseFloat(convertUStoEN(viewPlot.climate.average_temperature.march.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                        parseFloat(convertUStoEN(viewPlot.climate.average_temperature.april.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                        parseFloat(convertUStoEN(viewPlot.climate.average_temperature.may.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                        parseFloat(convertUStoEN(viewPlot.climate.average_temperature.june.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                        parseFloat(convertUStoEN(viewPlot.climate.average_temperature.july.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                        parseFloat(convertUStoEN(viewPlot.climate.average_temperature.august.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                        parseFloat(convertUStoEN(viewPlot.climate.average_temperature.september.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                        parseFloat(convertUStoEN(viewPlot.climate.average_temperature.october.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                        parseFloat(convertUStoEN(viewPlot.climate.average_temperature.november.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                        parseFloat(convertUStoEN(viewPlot.climate.average_temperature.december.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1)]
          } else {
              avg_data = [viewPlot.climate.average_temperature.january.toFixed(1),
                        viewPlot.climate.average_temperature.february.toFixed(1),
                        viewPlot.climate.average_temperature.march.toFixed(1),
                        viewPlot.climate.average_temperature.april.toFixed(1),
                        viewPlot.climate.average_temperature.may.toFixed(1),
                        viewPlot.climate.average_temperature.june.toFixed(1),
                        viewPlot.climate.average_temperature.july.toFixed(1),
                        viewPlot.climate.average_temperature.august.toFixed(1),
                        viewPlot.climate.average_temperature.september.toFixed(1),
                        viewPlot.climate.average_temperature.october.toFixed(1),
                        viewPlot.climate.average_temperature.november.toFixed(1),
                        viewPlot.climate.average_temperature.december.toFixed(1)]
          }

          check_avg_temp = true
        } catch(e){
          avg_data = [null,null,null,null,null,null,null,null,null,null,null,null]
          check_avg_temp = false
        }
      }

      /* Validate climate precipitation */
      var min_data = []
      var check_min_temp = true
      if (isEmpty(viewPlot.climate) || isEmpty(viewPlot.climate.min_temperature)) {

        min_data = [null,null,null,null,null,null,null,null,null,null,null,null]
        check_min_temp = false
      } else {
        try {
          if (METRIC_CONFIG === UNITED_STATES_METRIC_STANDARD){
              min_data = [viewPlot.climate.min_temperature.january.toFixed(1),
                          viewPlot.climate.min_temperature.february.toFixed(1),
                          viewPlot.climate.min_temperature.march.toFixed(1),
                          viewPlot.climate.min_temperature.april.toFixed(1),
                          viewPlot.climate.min_temperature.may.toFixed(1),
                          viewPlot.climate.min_temperature.june.toFixed(1),
                          viewPlot.climate.min_temperature.july.toFixed(1),
                          viewPlot.climate.min_temperature.august.toFixed(1),
                          viewPlot.climate.min_temperature.september.toFixed(1),
                          viewPlot.climate.min_temperature.october.toFixed(1),
                          viewPlot.climate.min_temperature.november.toFixed(1),
                          viewPlot.climate.min_temperature.december.toFixed(1)]
          } else if (METRIC_CONFIG === ENGLISH_METRIC_STANDARD){
              min_data = [parseFloat(convertUStoEN(viewPlot.climate.min_temperature.january.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                          parseFloat(convertUStoEN(viewPlot.climate.min_temperature.february.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                          parseFloat(convertUStoEN(viewPlot.climate.min_temperature.march.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                          parseFloat(convertUStoEN(viewPlot.climate.min_temperature.april.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                          parseFloat(convertUStoEN(viewPlot.climate.min_temperature.may.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                          parseFloat(convertUStoEN(viewPlot.climate.min_temperature.june.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                          parseFloat(convertUStoEN(viewPlot.climate.min_temperature.july.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                          parseFloat(convertUStoEN(viewPlot.climate.min_temperature.august.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                          parseFloat(convertUStoEN(viewPlot.climate.min_temperature.september.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                          parseFloat(convertUStoEN(viewPlot.climate.min_temperature.october.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                          parseFloat(convertUStoEN(viewPlot.climate.min_temperature.november.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1),
                          parseFloat(convertUStoEN(viewPlot.climate.min_temperature.december.toFixed(1),UNITED_STATES_METRIC_STANDARD,ENGLISH_METRIC_STANDARD,DEGREE_C,DEGREE_F)).toFixed(1)]
          } else {
              min_data = [viewPlot.climate.min_temperature.january.toFixed(1),
                        viewPlot.climate.min_temperature.february.toFixed(1),
                        viewPlot.climate.min_temperature.march.toFixed(1),
                        viewPlot.climate.min_temperature.april.toFixed(1),
                        viewPlot.climate.min_temperature.may.toFixed(1),
                        viewPlot.climate.min_temperature.june.toFixed(1),
                        viewPlot.climate.min_temperature.july.toFixed(1),
                        viewPlot.climate.min_temperature.august.toFixed(1),
                        viewPlot.climate.min_temperature.september.toFixed(1),
                        viewPlot.climate.min_temperature.october.toFixed(1),
                        viewPlot.climate.min_temperature.november.toFixed(1),
                        viewPlot.climate.min_temperature.december.toFixed(1)]
          }

          check_min_temp = true
        } catch (e){
          min_data = [null,null,null,null,null,null,null,null,null,null,null,null]
          check_min_temp = false
        }
      }
        $scope.linedata = [
            min_data
          , avg_data
          , max_data
        ]

        try {
          if (check_min_temp === false && check_max_tem === false && check_avg_temp === false){
            document.getElementById("line").style.display = "none"
            document.getElementById("no_temp").style.display = "block"
          } else {
            document.getElementById("line").style.display = "block"
            document.getElementById("no_temp").style.display = "none"
          }
        } catch (e){

        }

    }

    $scope.showHideLandInfo = function(divID) {
      $scope.showHideDetails(divID)
      if (document.getElementById(divID).style.display === "none") {
        return;
      }
      //$scope.textureDepthArray = ["0-1", "1-10", "10-20", "20-50", "50-70", "70-100", "100-120"]
    }
    function populateCoverData(selectedLandCoverPlot, transect, date) {
      //*******************************************************
      //copy and paste from LandCoverController.  Needs cleanup
      //*******************************************************

      /* Calculate summary data */
      var totalNumberTransect = 20;
      for (var index = 0 ; index < totalNumberTransect ; index++){
          var stick_segment = transect[index].segment.stick_segment
          transect[index].segment.summary.annuals_total = calculateOffline_2(ANNUAL_PLANT_NAME_UPPER,stick_segment)
          transect[index].segment.summary.bare_total = calculateOffline_2(BARE_NAME_UPPER,stick_segment)
          transect[index].segment.summary.herb_litter_total = calculateOffline_2(HERB_LITTER_NAME_UPPER,stick_segment)
          transect[index].segment.summary.perennial_grasses_total = calculateOffline_2(PERENNIAL_GRASSES_NAME_UPPER,stick_segment)
          transect[index].segment.summary.plant_base_total = calculateOffline_2(PLANT_BASE_NAME_UPPER,stick_segment)
          transect[index].segment.summary.rock_total = calculateOffline_2(ROCK_FRAGMENT_NAME_UPPER,stick_segment)
          transect[index].segment.summary.shrubs_total = calculateOffline_2(SHRUBS_NAME_UPPER,stick_segment) - calculateOffline_2(SUB_SHRUBS_NAME_UPPER,stick_segment)
          transect[index].segment.summary.sub_shrubs_total = calculateOffline_2(SUB_SHRUBS_NAME_UPPER,stick_segment)
          transect[index].segment.summary.trees_total =calculateOffline_2(TREES_NAME_UPPER,stick_segment)
          transect[index].segment.summary.wood_litter_total = calculateOffline_2(WOOD_LITTER_NAME_UPPER,stick_segment)
      }
      /* Calculate sum of bare_total - Bare Ground - Total Cover - of this Plot Name */
      var bare_ground_1_percent = 0
      for (var index = 0; index < totalNumberTransect; index++) {
        var segment = transect[index].segment
        var summary = segment.summary
        bare_ground_1_percent = bare_ground_1_percent + summary.bare_total
      }
      ver_cover_percent = 100 - bare_ground_1_percent

      $scope.total_cover = ver_cover_percent + ' %'
      $scope.bare_ground = bare_ground_1_percent + ' %'

      /* Calucate total shrubs, bare, sub-shrubs, pereninnal grasses */
      var total_perennial_grasses = 0
      var bare_ground_2 = 0
      var total_tree = 0
      var total_shrubs = 0
      var total_sub_shrubs = 0
      var total_plant_base = 0
      var total_annuals = 0
      var total_herb = 0
      var total_wood = 0
      var total_rock = 0

      for (var index = 0; index < totalNumberTransect; index++) {
        var segment = transect[index].segment
        var summary = segment.summary
        total_perennial_grasses = total_perennial_grasses + summary.perennial_grasses_total
        bare_ground_2 = bare_ground_2 + summary.bare_total
        total_tree = total_tree + summary.trees_total
        total_shrubs = total_shrubs + summary.shrubs_total
        total_sub_shrubs = total_sub_shrubs + summary.sub_shrubs_total
        if (!isEmpty(summary.plant_base_total)) {
          total_plant_base = total_plant_base + summary.plant_base_total
        }
        total_annuals = total_annuals + summary.annuals_total
        total_herb = total_herb + summary.herb_litter_total
        total_wood = total_wood + summary.wood_litter_total
        total_rock = total_rock + summary.rock_total
      }

      $scope.herb_litter = total_herb + ' %'
      $scope.woody_litter = total_wood + ' %'
      $scope.rock = total_rock + ' %'

      $scope.trees = total_tree + ' %'
      //var reShrubs = total_shrubs - total_sub_shrubs
      var reShrubs = total_shrubs
      $scope.shrubs = reShrubs + ' %'
      $scope.sub_shrubs = total_sub_shrubs + ' %'

      //var foliar_cover = total_tree + reShrubs + total_sub_shrubs + total_annuals + total_perennial_grasses

      /* Calculate foliar count */
      var foliar_cover =  0
      var temp_count = 0
      for (var index = 0 ; index < totalNumberTransect ; index++){
          var stick_segment = transect[index].segment.stick_segment
          var stick_segment_0 = stick_segment[0].cover
          var stick_segment_1 = stick_segment[1].cover
          var stick_segment_2 = stick_segment[2].cover
          var stick_segment_3 = stick_segment[3].cover
          var stick_segment_4 = stick_segment[4].cover

          temp_count = (stick_segment_0.match(/Trees/g) || []).length + (stick_segment_0.match(/Sub-shrubs and perennial forbs/g) || []).length + (stick_segment_0.match(/Shrubs/g) || []).length +
                 (stick_segment_0.match(/Perennial grasses/g) || []).length + (stick_segment_0.match(/Annual plants/g) || []).length;
          foliar_cover = temp_count > 0 ? foliar_cover + 1 : foliar_cover;

          temp_count = (stick_segment_1.match(/Trees/g) || []).length + (stick_segment_1.match(/Sub-shrubs and perennial forbs/g) || []).length + (stick_segment_1.match(/Shrubs/g) || []).length +
                 (stick_segment_1.match(/Perennial grasses/g) || []).length + (stick_segment_1.match(/Annual plants/g) || []).length;
          foliar_cover = temp_count > 0 ? foliar_cover + 1 : foliar_cover;

          temp_count = (stick_segment_2.match(/Trees/g) || []).length + (stick_segment_2.match(/Sub-shrubs and perennial forbs/g) || []).length + (stick_segment_2.match(/Shrubs/g) || []).length +
                 (stick_segment_2.match(/Perennial grasses/g) || []).length + (stick_segment_2.match(/Annual plants/g) || []).length;
          foliar_cover = temp_count > 0 ? foliar_cover + 1 : foliar_cover;

          temp_count = (stick_segment_3.match(/Trees/g) || []).length + (stick_segment_3.match(/Sub-shrubs and perennial forbs/g) || []).length + (stick_segment_3.match(/Shrubs/g) || []).length +
                 (stick_segment_3.match(/Perennial grasses/g) || []).length + (stick_segment_3.match(/Annual plants/g) || []).length;
          foliar_cover = temp_count > 0 ? foliar_cover + 1 : foliar_cover;

          temp_count = (stick_segment_4.match(/Trees/g) || []).length + (stick_segment_4.match(/Sub-shrubs and perennial forbs/g) || []).length + (stick_segment_4.match(/Shrubs/g) || []).length +
                 (stick_segment_4.match(/Perennial grasses/g) || []).length + (stick_segment_4.match(/Annual plants/g) || []).length;
          foliar_cover = temp_count > 0 ? foliar_cover + 1 : foliar_cover;
      }

      $scope.foliar_cover = foliar_cover + ' %'
      $scope.plant_base = total_plant_base + ' %'
      $scope.perennial_grass = total_perennial_grasses + ' %'
      $scope.annual = total_annuals + ' %'



      /* Calculate canopy_gap_percent and basal_gap_percent */
      var count_canopy_gap_true = 0
      var count_basal_gap_true = 0
      var count_canopy_height_10cm = 0
      var count_canopy_height_10_50cm = 0
      var count_canopy_height_50cm_1m = 0
      var count_canopy_height_1_2_m = 0
      var count_canopy_height_2_3_m = 0
      var count_canopy_height_3m = 0

      for (var index = 0; index < totalNumberTransect; index++) {
        var segment = transect[index].segment
        if (segment.canopy_gap.trim().toUpperCase() == 'TRUE' || segment.canopy_gap == true) {
          count_canopy_gap_true = count_canopy_gap_true + 1
        }
        if (segment.basal_gap.trim().toUpperCase() == 'TRUE' || segment.basal_gap == true) {
          count_basal_gap_true = count_basal_gap_true + 1
        }
        if (segment.canopy_height.trim().toUpperCase() == '<10CM') {
          count_canopy_height_10cm = count_canopy_height_10cm + 1
        } else if (segment.canopy_height.trim().toUpperCase() == '10-50CM') {
          count_canopy_height_10_50cm = count_canopy_height_10_50cm + 1
        } else if (segment.canopy_height.trim().toUpperCase() == '50CM-1M') {
          count_canopy_height_50cm_1m = count_canopy_height_50cm_1m + 1
        } else if (segment.canopy_height.trim().toUpperCase() == '1-2M') {
          count_canopy_height_1_2_m = count_canopy_height_1_2_m + 1
        } else if (segment.canopy_height.trim().toUpperCase() == '2-3M') {
          count_canopy_height_2_3_m = count_canopy_height_2_3_m + 1
        } else if (segment.canopy_height.trim().toUpperCase() == '>3M') {
          count_canopy_height_3m = count_canopy_height_3m + 1
        } else {
        }
      }

      /* Calculate canopy_hight_percent 6 */
      var canopy_height_10cm_percent = ((count_canopy_height_10cm / totalNumberTransect) * 100).toFixed(0)
      $scope.h10_cm = canopy_height_10cm_percent + ' %'
      var canopy_height_10cm_50cm_percent = ((count_canopy_height_10_50cm / totalNumberTransect) * 100).toFixed(0)
      $scope.h10_50_cm = canopy_height_10cm_50cm_percent + ' %'
      var canopy_height_50cm_1m_percent = ((count_canopy_height_50cm_1m / totalNumberTransect) * 100).toFixed(0)
      $scope.h50_cm_1_m = canopy_height_50cm_1m_percent + ' %'
      var canopy_height_1m_2m_percent = ((count_canopy_height_1_2_m / totalNumberTransect) * 100).toFixed(0)
      $scope.h1_2_m = canopy_height_1m_2m_percent + ' %'
      var canopy_height_2m_3m_percent = ((count_canopy_height_2_3_m / totalNumberTransect) * 100).toFixed(0)
      $scope.h2_3_m = canopy_height_2m_3m_percent + ' %'
      var canopy_height_3m_percent = ((count_canopy_height_3m / totalNumberTransect) * 100).toFixed(0)
      $scope.h3_m = canopy_height_3m_percent + ' %'

      var canopy_gap_percent = ((count_canopy_gap_true / totalNumberTransect) * 100).toFixed(0)
      var basal_gap_percent = ((count_basal_gap_true / totalNumberTransect) * 100).toFixed(0)
      //$scope.canopyGap = canopy_gap_percent
      //$scope.basalGap = basal_gap_percent

      /* Calculate species_1 and species_2 percent */
      var total_species_of_interest_1_count = 0
      var total_species_of_interest_2_count = 0
      var bCheck_Complete_Species_Or_not = true
      for (var index = 0; index < totalNumberTransect; index++) {
        var segment = transect[index].segment

        /* Bo sung them de N/A cho un-complete species_1 and species_2 density */
        if (segment.species_of_interest_1_count == 0 && segment.species_of_interest_2_count == 0){
          bCheck_Complete_Species_Or_not = false
        }
        /* End */

        total_species_of_interest_1_count = total_species_of_interest_1_count + segment.species_of_interest_1_count
        total_species_of_interest_2_count = total_species_of_interest_2_count + segment.species_of_interest_2_count
      }

      var species_of_interest_1_count_percent = (total_species_of_interest_1_count / totalNumberTransect)
      //$scope.dominant_woody = transect[0].dominant_woody_species
      $scope.dominant_woody = getDominantWoody(transect)
      $scope.dominant_woody_2 = getDominantWoody_2(transect)

      var temp_species_1_count_per = window.localStorage.getItem(selectedLandCoverPlot.name + '_' + date + '_species_1_percent')
      var temp_species_2_count_per = window.localStorage.getItem(selectedLandCoverPlot.name + '_' + date + '_species_2_percent')

      if (isEmpty(temp_species_1_count_per)){
          if (species_of_interest_1_count_percent > 0 && bCheck_Complete_Species_Or_not == true){
              document.getElementById("superscript_woody").style.visibility = "visible"
              if (METRIC_CONFIG === UNITED_STATES_METRIC_STANDARD){
                 $scope.species_1_percent = species_of_interest_1_count_percent
                 $scope.species_unit = "m"
              } else if (METRIC_CONFIG === ENGLISH_METRIC_STANDARD){
                 $scope.species_1_percent = (parseFloat(species_of_interest_1_count_percent) / 10.76391).toFixed(4)
                 $scope.species_unit = "ft"
              } else {
                 $scope.species_1_percent = species_of_interest_1_count_percent
                 $scope.species_unit = "m"
              }

          } else {
              //document.getElementById("superscript_woody").style.visibility = "hidden"
              $scope.species_1_percent = 'N/A'
          }
      } else {
          //document.getElementById("superscript_woody").style.visibility = "visible"
          $scope.species_1_percent = temp_species_1_count_per
      }


      var species_of_interest_2_count_percent = (total_species_of_interest_2_count / totalNumberTransect)
      //$scope.dominant_nonwoody = transect[0].dominant_nonwoody_species
      $scope.dominant_nonwoody = getDominantNonWoody(transect)
      $scope.dominant_nonwoody_2 = getDominantNonWoody_2(transect)

      if (isEmpty(temp_species_2_count_per)){
        if (species_of_interest_2_count_percent > 0 && bCheck_Complete_Species_Or_not == true){
          //document.getElementById("superscript_non_woody").style.visibility = "visible"
          if (METRIC_CONFIG === UNITED_STATES_METRIC_STANDARD){
             $scope.species_2_percent = species_of_interest_2_count_percent
             $scope.species_unit = "m"
          } else if (METRIC_CONFIG === ENGLISH_METRIC_STANDARD){
             $scope.species_2_percent = (parseFloat(species_of_interest_2_count_percent) / 10.76391).toFixed(4)
             $scope.species_unit = "ft"
          } else {
             $scope.species_2_percent = species_of_interest_2_count_percent
             $scope.species_unit = "m"
          }

        } else {
          //document.getElementById("superscript_non_woody").style.visibility = "hidden"
          $scope.species_2_percent = 'N/A'
        }
      } else {
        //document.getElementById("superscript_non_woody").style.visibility = "visible"
        $scope.species_2_percent = temp_species_2_count_per
      }

      //*******************************************************
      //END COPY/PASTE
      //*******************************************************
      /* set cover table and plot data into scope */
      var displayObject = {};
      displayObject['coverData'] = {}
      displayObject['coverData']['totalCover'] = ver_cover_percent
      displayObject['coverData']['bareGround'] = bare_ground_1_percent
      displayObject['coverData']['foliarCover'] = foliar_cover
      displayObject['coverData']['totalHerb'] = total_herb
      displayObject['coverData']['totalWood'] = total_wood
      displayObject['coverData']['totalRock'] = total_rock
      displayObject['plantCoverData'] = {}
      displayObject['plantCoverData']['totalTree'] = total_tree
      displayObject['plantCoverData']['reShrubs'] = reShrubs
      displayObject['plantCoverData']['totalSubShrubs'] = total_sub_shrubs
      displayObject['plantCoverData']['totalPlantBase'] = total_plant_base
      displayObject['plantCoverData']['totalPerennialGrasses'] = total_perennial_grasses
      displayObject['plantCoverData']['totalAnnuals'] = total_annuals
      displayObject['canopyData'] = {}
      displayObject['canopyData']['h10_cm'] = canopy_height_10cm_percent
      displayObject['canopyData']['h10_50_cm'] = canopy_height_10cm_50cm_percent
      displayObject['canopyData']['h50_cm_1_m'] = canopy_height_50cm_1m_percent
      displayObject['canopyData']['h1_2_m'] = canopy_height_1m_2m_percent
      displayObject['canopyData']['h2_3_m'] = canopy_height_2m_3m_percent
      displayObject['canopyData']['h3_m'] = canopy_height_3m_percent
      displayObject['canopyGap'] = canopy_gap_percent
      displayObject['basalGap'] = basal_gap_percent
      displayObject['dominantWoody'] = getDominantWoody(transect)
      displayObject['dominantNonWoody'] = getDominantNonWoody(transect)
      displayObject['species1Percent'] = $scope.species_1_percent
      displayObject['species2Percent'] = $scope.species_2_percent
      displayObject['speciesUnit'] = $scope.species_unit

      return displayObject;
    }
    $scope.selectCoverPlot = function (date) {
      var selectedPlot = viewPlot
      var plot_id = viewPlot.ID
      var plot_name = viewPlot.name

      window.localStorage.setItem('current_plot_id_landcover', plot_id)
      window.localStorage.setItem('current_plot_name_landcover', plot_name)
      window.localStorage.setItem('current_plot_data_landcover', JSON.stringify(viewPlot.landCoverObject))
      window.localStorage.setItem('current_action_landcover', 'ADD_NEW')
      window.localStorage.removeItem('current_landcover_date')
      window.localStorage.removeItem('current_edit_plot_landcover')

      if (!isEmpty(viewPlot.landCoverObject) && viewPlot.landCoverObject.has_land_cover == true ) {
        if (!isEmpty(date)){
          window.localStorage.setItem('current_action_landcover', 'VIEW_OLD')
          window.localStorage.setItem('current_landcover_date', date)
        } else if (!isEmpty(viewPlot.landCoverObject.edit_land_cover_data) && viewPlot.landCoverObject.is_EDIT_OLD == "TRUE") {
          window.localStorage.setItem('current_action_landcover', 'EDIT_OLD')
        } else {
          window.localStorage.setItem('current_action_landcover', 'ADD_OLD')
        }
      }
      //console.log("*************************")
      //console.log(window.localStorage.getItem('current_action_landcover'))
      //console.log(window.localStorage.getItem('current_edit_plot_landcover'))

      $state.go('landpks.landcover_main_transect')
    }

    $scope.confirmDelete = function(){
      if (checkNetConnection() == true) {
        var recorder_name = window.localStorage.getItem('current_email')
        var LIST_PLOTS = JSON.parse(window.localStorage.getItem(recorder_name + '_' + 'LIST_LANDINFO_PLOTS'))
        
        var confirmPopup = $ionicPopup.confirm({
          cssClass: 'remove-title-class',
          template: PLOT_DELETE_ON_CLOUDS_MESSAGE,
          cancelText: 'No',
          okText: 'Yes'
        })
        confirmPopup.then(function (res) {
          if (res) {
            confirmPopup.close()
            if (checkNetConnection() == true){
                var googleToken = ''
                $http({
                  method: 'POST',
                  url: LANDPKS_API_ENDPOINT,
                  headers: {'Content-type': 'application/x-www-form-urlencoded',
                            'X-Auth-Token': googleToken},
                  timeout: HTTP_TIME_OUT_CONNECTION,
                  data: 'action=delete&object=landinfo&version='
                        + LANDPKS_API_VERSION
                        + '&type=delete_by_id&id='
                        + viewPlot.id
                        + '&delete_permanent=0&'
                        + 'recorder_name='+recorder_name,
                }).success(
                  function (data, status, headers, config) {
                      if (Number(data.id) == viewPlot.id && data.status === 'archived'){
                        var resultDeleted = deleteLandInfoPlotInArray_2(viewPlot.name, recorder_name, LIST_PLOTS)
                        if (resultDeleted == true) {
                          window.localStorage.setItem(recorder_name + '_' + 'LIST_LANDINFO_PLOTS', JSON.stringify(LIST_PLOTS))
                          $state.go('landpks.landinfo_plots')
                        } else {
                          var infoPopup = $ionicPopup.alert({
                            cssClass: 'remove-title-class',
                            template: 'Cannot delete this plot'
                          })
                          infoPopup.then(function (res) {
                            infoPopup.close()
                          })
                        }

                      }
                }).error(function (err) {
                      console.log("err " + JSON.stringify(err))
                })
            } else {

                confirmPopup.close()

                var infoPopup = $ionicPopup.alert({
                  cssClass: 'remove-title-class',
                  template: 'Device is offline. Cannot delete this plot'
                })
                infoPopup.then(function (res) {
                  infoPopup.close()
                })
                return
            }
          } else {
            console.log('Cancel')
            return
          }
        })
        
      } else {
        var infoPopup = $ionicPopup.alert({
          cssClass: 'remove-title-class',
          template: 'Cannot delete plot when device is offline'
        })
        infoPopup.then(function (res) {
          infoPopup.close()
        })
      }
    }
})

.controller('siteData', function($scope, $state, $ionicHistory, $ionicLoading, $ionicPlatform, $ionicPopup, $controller, $http, plotListService,googleService) {

  $controller('BaseLandInfoController', { $scope: $scope });
  //console.log("pending cover list :  " + window.localStorage.getItem(recorder_name + '_PENDING_UPLOAD_LANDCOVER_RECORDS_LIST'))
  var viewPlot = JSON.parse(window.localStorage.getItem('current_view_plot'));
  var recorder_name = window.localStorage.getItem('current_email')
  var LIST_PLOTS = JSON.parse(window.localStorage.getItem(recorder_name + '_' + 'LIST_LANDINFO_PLOTS'))
  //console.log("siteData - current_view_plot : " + window.localStorage.getItem('current_view_plot'))

  var str = viewPlot.name.length
  var email = window.localStorage.getItem('current_email')
  var emaillength = email.length + 1
  var finalstr = viewPlot.name.substring(emaillength, str)
  $scope.plot_name = finalstr
  //var d = new Date();

  $scope.$on("$ionicView.beforeEnter", function() {
    //get the plot again.  It may have changed.
    viewPlot = JSON.parse(window.localStorage.getItem('current_view_plot'));
    //console.log(window.localStorage.getItem('current_view_plot'))
    var str = viewPlot.name.length
    var email = window.localStorage.getItem('current_email')
    var emaillength = email.length + 1
    var finalstr = viewPlot.name.substring(emaillength, str)
    $scope.plot_name = finalstr

    $scope.landCoverReviewArray = []
    if (!isEmpty(viewPlot.landCoverObject) && !isEmpty(viewPlot.landCoverObject.has_land_cover)){
      if (viewPlot.landCoverObject.has_land_cover == true && !isEmpty(viewPlot.landCoverObject.land_cover_data) && viewPlot.landCoverObject.land_cover_data.transect.length > 0 ) {
        $scope.landCoverReviewArray = getDistictConsiderData(viewPlot.landCoverObject);
      }
    }

    //see if plot need to be synchronized
    if (viewPlot.status =='CREATED' || viewPlot.status =='NOT_SYNCHRONIZED') {
      $scope.syncRequired = true;
    } else {
      $scope.syncRequired = false;
    }

  });

  $scope.synchronize  = function() {

    if (checkNetConnection() === true) {
      sync_timeout = 0
      /* Add API get Google Map Image based on Lat/long */
      //if (!isEmpty(viewPlot.google_map_image_data) && viewPlot.google_map_image_data.substring(0,10) == "data:image"){
      //   console.log("Get image from Cache")
      //   sync_timeout = 0
      //} else {
         /* Add API get Google Map Image based on Lat/long */
      //   console.log("get image from Google API")
      //   googleService.getGoogleMapImage(viewPlot,recorder_name,true)
      //   sync_timeout = 2000
      //}


      $ionicLoading.show({
        delay:100,
        template: 'Synchronizing Site data...'
      })
      var action = 'update'
      if (viewPlot.status == 'CREATED')
        action = 'put'
      //**********************
      setTimeout(function (){
        plotListService.pushPlotToCloud(viewPlot, action)
          .success(
            function (data, status, headers, config) {
              console.log("successful update")
              /* Step 1 : Delete current editing plot in Main List */
              deleteLandInfoPlotInArray_2(viewPlot.name,viewPlot.recorder_name,LIST_PLOTS)
              /* Step 2 : load new cloud plot */
              plotListService.loadPlotFromCloud(viewPlot.recorder_name, viewPlot.name)
              .success(
                function(data) {
                  //console.log("Success. Updated Cloud Plot : " + JSON.stringify(data[0]))
                  if (!isEmpty(data) && data.length >= 1){
                    LIST_PLOTS.push(data[0])
                  }
                  //window.localStorage.setItem(recorder_name + '_' + 'LIST_LANDINFO_PLOTS',JSON.stringify(LIST_PLOTS))
                  //window.localStorage.setItem('current_view_plot', JSON.stringify(data[0]));
                  newViewPlot = data[0];
                  newViewPlot.googleMapImageURL = googleService.getGoogleMapImageURL(newViewPlot)
                  
                  newViewPlot.landCoverObject = viewPlot.landCoverObject;
                  viewPlot = newViewPlot;

                  plotListService.updateCachedPlot(LIST_PLOTS, viewPlot);

                  //console.log(google_image)
                  $scope.plot = viewPlot;
                  //everything updated successfully.  remove sync flag
                  $scope.syncRequired = false;
                  $ionicLoading.hide();
                  //$state.go('landpks.landinfo_site-home')
                })
              .error(
                function (err) {
                  console.log("error : " + err)
                  //nothing to do,
              })
            }
          )
          .error(
            function (err) {
              console.log("error pushing to cloud : " + err);
              //close ionic loading and load plot in background
              $ionicLoading.hide();
              if (!isEmpty(err.error) && err.error.trim() === '[Recorder_name + name] pair is existed in system. Please select another') {
                message = "[Recorder_name  + plot name] pair already exists in system. Please select another plot name."
                var infoPopup = $ionicPopup.alert({
                  cssClass: 'remove-title-class',
                  template: message
                })
                infoPopup.then(function (res) {
                  return;
                })
              }
              var infoPopup = $ionicPopup.alert({
                cssClass: 'remove-title-class',
                template: 'Your plot cannot be saved to the cloud at this time</br>' + err.error
              })
              infoPopup.then(function (res) {
                //store plot on device and upload in background
                //viewPlot.status = "UPLOADING";
                viewPlot.has_google_map_image_data = google_image.flag
                viewPlot.google_map_image_data = google_image.data
                plotListService.updateCachedPlot(LIST_PLOTS, viewPlot);
                addPendingLandInfoPlotToQueue(viewPlot);
                $state.go('landpks.landinfo_site-home')
              })
              return
            })
      }, sync_timeout);
    } else {
      //store plot on device and upload in background
      //viewPlot.status = "UPLOADING"
      viewPlot.has_google_map_image_data = google_image.flag
      viewPlot.google_map_image_data = google_image.data
      plotListService.updateCachedPlot(LIST_PLOTS, viewPlot)
      addPendingLandInfoPlotToQueue(viewPlot)
      var infoPopup = $ionicPopup.alert({
        cssClass: 'remove-title-class',
        template: 'Plot has been marked for background upload. You will receive a notification when results are available'
      })
      infoPopup.then(function (res) {
        $state.go('landpks.landinfo_site-home')
      })
    }
  };

  $scope.testPlot = true;


  $scope.selectCoverPlot = function (date) {
      var selectedPlot = viewPlot
      var plot_id = viewPlot.ID
      var plot_name = viewPlot.name
      console.log("selectCoverPLot : " + plot_name)

      window.localStorage.setItem('current_plot_id_landcover', plot_id)
      window.localStorage.setItem('current_plot_name_landcover', plot_name)
      window.localStorage.setItem('current_plot_data_landcover', JSON.stringify(viewPlot.landCoverObject))
      window.localStorage.setItem('current_action_landcover', 'ADD_NEW')
      window.localStorage.removeItem('current_landcover_date')
      window.localStorage.removeItem('current_edit_plot_landcover')

      if (!isEmpty(viewPlot.landCoverObject) && viewPlot.landCoverObject.has_land_cover == true ) {
        if (!isEmpty(date)){
          window.localStorage.setItem('current_action_landcover', 'VIEW_OLD')
          window.localStorage.setItem('current_landcover_date', date)
        } else if (!isEmpty(viewPlot.landCoverObject.edit_land_cover_data) && viewPlot.landCoverObject.is_EDIT_OLD == "TRUE") {
          window.localStorage.setItem('current_action_landcover', 'EDIT_OLD')
        } else {
          window.localStorage.setItem('current_action_landcover', 'ADD_OLD')
        }
      }
      //console.log("*************************")
      //console.log(window.localStorage.getItem('current_action_landcover'))
      //console.log(window.localStorage.getItem('current_edit_plot_landcover'))

      $state.go('landpks.landcover_main_transect')
    }

    $scope.showNotesPopup = function () {
      $scope.data = {}
      $scope.data.notes = viewPlot.notes;
      var myPopup = $ionicPopup.show({
        template: '<textarea cols="40" rows="5" ng-model="data.notes" value="{{data.notes}}"></textarea>',
        title: '<p align="left">Notes for ' + $scope.plot_name + '</p>',
        scope: $scope,
        buttons: [
          { text: 'Cancel',
            onTap: function (e) {
              //$scope.data.notes = newPlot.notes
              return
            }
          },
          {
            text: '<b>Save</b>',
            type: 'button-positive',
            onTap: function (e) {
              if (!$scope.data.notes) {
              } else {
                return $scope.data.notes
              }
            }
          },

        ]
      })
      myPopup.then(function (res) {
        console.log('Tapped!', res)
        if (!isEmpty(res) && res !== viewPlot.notes) {
          console.log("We need to update the notes")
          viewPlot.notes = res;
          if (viewPlot.status != 'CREATED'){
            viewPlot.status = 'NOT_SYNCHRONIZED';
          }
          $scope.syncRequired = true;
          plotListService.updateCachedPlot(LIST_PLOTS, viewPlot);
        }
      })
    }

    $scope.confirmDelete = function(){
      if (checkNetConnection() == true) {
        var recorder_name = window.localStorage.getItem('current_email')
        var LIST_PLOTS = JSON.parse(window.localStorage.getItem(recorder_name + '_' + 'LIST_LANDINFO_PLOTS'))
        
        var confirmPopup = $ionicPopup.confirm({
          cssClass: 'remove-title-class',
          template: PLOT_DELETE_ON_CLOUDS_MESSAGE,
          cancelText: 'No',
          okText: 'Yes'
        })
        confirmPopup.then(function (res) {
          if (res) {
            confirmPopup.close()
            if (checkNetConnection() == true){
                var googleToken = ''
                $http({
                  method: 'POST',
                  url: LANDPKS_API_ENDPOINT,
                  headers: {'Content-type': 'application/x-www-form-urlencoded',
                            'X-Auth-Token': googleToken},
                  timeout: HTTP_TIME_OUT_CONNECTION,
                  data: 'action=delete&object=landinfo&version='
                        + LANDPKS_API_VERSION
                        + '&type=delete_by_id&id='
                        + viewPlot.id
                        + '&delete_permanent=0&'
                        + 'recorder_name='+recorder_name,
                }).success(
                  function (data, status, headers, config) {
                      if (Number(data.id) == viewPlot.id && data.status === 'archived'){
                        var resultDeleted = deleteLandInfoPlotInArray_2(viewPlot.name, recorder_name, LIST_PLOTS)
                        if (resultDeleted == true) {
                          window.localStorage.setItem(recorder_name + '_' + 'LIST_LANDINFO_PLOTS', JSON.stringify(LIST_PLOTS))
                          $state.go('landpks.landinfo_plots')
                        } else {
                          var infoPopup = $ionicPopup.alert({
                            cssClass: 'remove-title-class',
                            template: 'Cannot delete this plot'
                          })
                          infoPopup.then(function (res) {
                            infoPopup.close()
                          })
                        }

                      }
                }).error(function (err) {
                      console.log("err " + JSON.stringify(err))
                })
            } else {

                confirmPopup.close()

                var infoPopup = $ionicPopup.alert({
                  cssClass: 'remove-title-class',
                  template: 'Device is offline. Cannot delete this plot'
                })
                infoPopup.then(function (res) {
                  infoPopup.close()
                })
                return
            }
          } else {
            console.log('Cancel')
            return
          }
        })
        
      } else {
        var infoPopup = $ionicPopup.alert({
          cssClass: 'remove-title-class',
          template: 'Cannot delete plot when device is offline'
        })
        infoPopup.then(function (res) {
          infoPopup.close()
        })
      }
    }



})

.controller('DataInput_Texture_Ctrl', function($scope, $state, $ionicPopup, $stateParams, $ionicHistory, $controller, plotListService) {
  $controller('BaseLandInfoController', { $scope: $scope });
  var textures = ["", "SAND","LOAMY SAND","SANDY LOAM","SILT LOAM","LOAM","SANDY CLAY LOAM","SILTY CLAY LOAM","CLAY LOAM","SANDY CLAY","SILTY CLAY","CLAY"]
  //var layers = {"soil_horizon_1":"0-1cm","soil_horizon_2":"1-10cm","soil_horizon_3":"10-20cm","soil_horizon_4":"20-50cm","soil_horizon_5":"50-70cm","soil_horizon_6":"70-100cm","soil_horizon_7":"100-120cm"}
  
  var METRIC_CONFIG = window.localStorage.getItem('GLOBAL_CONFIG_METRICS_UNITS')
  var layersArray = ['soil_horizon_1','soil_horizon_2','soil_horizon_3','soil_horizon_4','soil_horizon_5','soil_horizon_6','soil_horizon_7']
  metricLayers = {"soil_horizon_1":LABEL_0_1CM_US,"soil_horizon_2":LABEL_1_10CM_US,"soil_horizon_3":LABEL_10_20CM_US,"soil_horizon_4":LABEL_20_50CM_US,"soil_horizon_5":LABEL_50_70CM_US,"soil_horizon_6":LABEL_70_100CM_US,"soil_horizon_7":LABEL_100_120CM_US}
  layers = metricLayers;
  
  var metricTabLabels = [0, 1, 10, 20, 50, 70, 100, 120];
  $scope.tabLabels = metricTabLabels
  if (METRIC_CONFIG === ENGLISH_METRIC_STANDARD) {
    layers = {"soil_horizon_1":LABEL_0_1CM_EN,"soil_horizon_2":LABEL_1_10CM_EN,"soil_horizon_3":LABEL_10_20CM_EN,"soil_horizon_4":LABEL_20_50CM_EN,"soil_horizon_5":LABEL_50_70CM_EN,"soil_horizon_6":LABEL_70_100CM_EN,"soil_horizon_7":LABEL_100_120CM_EN}
    $scope.tabLabels = [0, 0.5, 4, 8, 20, 28, 40, 47]
  }

  var rockFragmentIDs = {"Rock_Fragment_1":"0-1%", "Rock_Fragment_15":"1-15%", "Rock_Fragment_35":"15-35%", "Rock_Fragment_60":"35-60%", "Rock_Fragment_90":">60%"};
  var rockFragmentMapping = {"0-1%":1, "0-15%":15, "1-15%":15, "15-35%":35, "35-60%":60, ">60%":90}
  
  var recorder_name = window.localStorage.getItem('current_email')
  var view_plot = JSON.parse(window.localStorage.getItem('current_view_plot'))
  var LIST_PLOTS = JSON.parse(window.localStorage.getItem(recorder_name + '_' + 'LIST_LANDINFO_PLOTS'))

  //if (!isEmpty($stateParams.layer)){
    //var activeSoilHorizon = $stateParams.layer
  //} else {
    //var activeSoilHorizon = "soil_horizon_1";
  //}
  //console.log(activeSoilHorizon)

  var activeSoilHorizon = 'soil_horizon_1';
  $scope.textures = textures;

  $scope.textureFilter = {
    selectedOption: ""
  };
  $scope.bedrockFilter = {
    selectedOption: ""
  };

  $scope.showSoilHorizonInfo = function () {
    document.getElementById('soilHorizonInfo').style.display = 'block'
    document.getElementById('soilHorizonForm').style.display = 'none'
    var layertab = document.getElementById('soil_horizon_help');
    layertab.classList.remove("layertab-inactive");
    layertab.classList.add("layertab-active");
    for(key in layers){
      var layertabID = key;
      layertab = document.getElementById(layertabID);
      layertab.classList.remove("layertab-active");
      layertab.classList.add("layertab-inactive");
    }
  }

  $scope.selectLayer = function (selectLayerID) {
    //set the active soilHorizon
    activeSoilHorizon = selectLayerID
    //make sure the form components are visible
    //document.getElementById('soilHorizonInfo').style.display = 'none'
    document.getElementById('soilHorizonForm').style.display = 'block'
    //set this layer as active and all other as inactive
    setSelectDisplay(selectLayerID);
  }

  $scope.selectRockFragment = function (rockFragmentID) {
    //disable all images except selected
    for (key in rockFragmentIDs) {
      document.getElementById(key).classList.remove("lpks-img-active");
    }
    document.getElementById(rockFragmentID).classList.add("lpks-img-active");
    //if the image changed update the cached plot
    if (isEmpty(view_plot.rock_fragment)) {
      var rock_fragment = {'soil_horizon_1': '','soil_horizon_2': '','soil_horizon_3': '','soil_horizon_4': '','soil_horizon_5': '','soil_horizon_6': '','soil_horizon_7': ''}
      view_plot.rock_fragment = rock_fragment
    }
    if (view_plot.rock_fragment[activeSoilHorizon] !== rockFragmentIDs[rockFragmentID]) {
      view_plot.rock_fragment[activeSoilHorizon] = rockFragmentIDs[rockFragmentID]
      if (view_plot.status != 'CREATED'){
        view_plot.status = 'NOT_SYNCHRONIZED';
      }

      plotListService.updateCachedPlot(LIST_PLOTS, view_plot)
    }

  }

  $scope.selectTexture = function(textureValue) {
    if (isEmpty(view_plot.texture)) {
      var texture = {'soil_horizon_1': '','soil_horizon_2': '','soil_horizon_3': '','soil_horizon_4': '','soil_horizon_5': '','soil_horizon_6': '','soil_horizon_7': ''}
      view_plot.texture = texture
    }

    view_plot.texture[activeSoilHorizon] = textureValue;
    if (view_plot.status != 'CREATED'){
      view_plot.status = 'NOT_SYNCHRONIZED';
    }

    plotListService.updateCachedPlot(LIST_PLOTS, view_plot)
  }
  $scope.selectBedrock = function(bedrockObj) {
    bedrockValue = ""
    if (!isEmpty(bedrockObj)) {
      bedrockValue = bedrockObj.value;
    }

    var bedrockLayers = ['soil_horizon_1','soil_horizon_2','soil_horizon_3','soil_horizon_4','soil_horizon_5','soil_horizon_6','soil_horizon_7']
    var showConfirmation = false;
    if (!isEmpty(bedrockValue) && bedrockValue.value !==""){
      if (bedrockValue == "clear") {
        for (i = 0; i < bedrockLayers.length; i++) {
          document.getElementById(bedrockLayers[i]).style.visibility = 'visible'
        } 
        view_plot.bedrock_depth = bedrockValue
        if (view_plot.status != 'CREATED'){
            view_plot.status = 'NOT_SYNCHRONIZED';
          }

        plotListService.updateCachedPlot(LIST_PLOTS, view_plot)
      } else {
        var confirmPopup = $ionicPopup.confirm({
           title: 'Bedrock Confirmation',
           template: 'Setting a bedrock value removes Texture and Rock Fragment data for all deeper layers.</br>Proceed?'
         });

         confirmPopup.then(function(res) {
          if(res) {
            for (i = bedrockLayers.indexOf(activeSoilHorizon)+1; i < bedrockLayers.length; i++) {
              view_plot.texture[bedrockLayers[i]] = "";
              view_plot.rock_fragment[bedrockLayers[i]] = "";
              document.getElementById(bedrockLayers[i]).style.visibility = 'hidden'
            }
            view_plot.bedrock_depth = bedrockValue
            if (view_plot.status != 'CREATED'){
                view_plot.status = 'NOT_SYNCHRONIZED';
              }

            plotListService.updateCachedPlot(LIST_PLOTS, view_plot)
            currentArray = $scope.bedrockArray
            if (currentArray[0].value !== "clear"){
              currentArray.unshift({'value': "clear", 'label': "clear"})         
              $scope.bedrockArray = currentArray;
            }
            
          } else {
            return;
          }
         });       
      }
    }
  }

  $scope.$on("$ionicView.afterEnter", function() {
    //refresh the plot.  GumeMe might have chaged it.

    view_plot = JSON.parse(window.localStorage.getItem('current_view_plot'))

    //show the help or the first layer
    //**********************************************
    //Leaving this code here for when we're ready to add the info tab back in
    //**********************************************
    //document.getElementById('soilHorizonInfo').style.display = 'block'
    //document.getElementById('soilHorizonForm').style.display = 'none'
    //var layertab = document.getElementById('soil_horizon_help');
    //layertab.classList.remove("layertab-inactive");
    //layertab.classList.add("layertab-active");

    /*for(key in layers){
      var layertabID = key;
      var layertab = document.getElementById(layertabID);
      layertab.classList.remove("layertab-active");
      layertab.classList.add("layertab-inactive");
      var layertabIcon = document.getElementById(layertabID+"_icon");
      layertabIcon.classList.remove("assertive", "balanced", "dark");

      if (isLayerComplete(layertabID)) {
        layertabIcon.classList.add("balanced");
      } else {
        layertabIcon.classList.add("dark");
      }

    }*/
    //check the units.  Settings may have changed
    METRIC_CONFIG = window.localStorage.getItem('GLOBAL_CONFIG_METRICS_UNITS')
    layersArray = ['soil_horizon_1','soil_horizon_2','soil_horizon_3','soil_horizon_4','soil_horizon_5','soil_horizon_6','soil_horizon_7']
    metriclayers = {"soil_horizon_1":LABEL_0_1CM_US,"soil_horizon_2":LABEL_1_10CM_US,"soil_horizon_3":LABEL_10_20CM_US,"soil_horizon_4":LABEL_20_50CM_US,"soil_horizon_5":LABEL_50_70CM_US,"soil_horizon_6":LABEL_70_100CM_US,"soil_horizon_7":LABEL_100_120CM_US}
    $scope.bedrockDepth_label = "Bedrock Depth (cm)" 
    layers = metricLayers;
    var metricTabLabels = [0, 1, 10, 20, 50, 70, 100, 120];
    $scope.tabLabels = metricTabLabels
    if (METRIC_CONFIG === ENGLISH_METRIC_STANDARD) {
      layers = {"soil_horizon_1":LABEL_0_1CM_EN,"soil_horizon_2":LABEL_1_10CM_EN,"soil_horizon_3":LABEL_10_20CM_EN,"soil_horizon_4":LABEL_20_50CM_EN,"soil_horizon_5":LABEL_50_70CM_EN,"soil_horizon_6":LABEL_70_100CM_EN,"soil_horizon_7":LABEL_100_120CM_EN}
      $scope.tabLabels = [0, 0.5, 4, 8, 20, 28, 40, 47]
      $scope.bedrockDepth_label = "Bedrock Depth (in)"
    }
    //if coming from guide me there should be an active layer
    if(!isEmpty(window.localStorage.getItem('current_layer_name') && window.localStorage.getItem('current_layer_name') in layers)) {
      var activeSoilHorizon = window.localStorage.getItem('current_layer_name');
      setSelectDisplay(window.localStorage.getItem('current_layer_name'))
      window.localStorage.removeItem('current_layer_name')
    } else {
      var activeSoilHorizon = 'soil_horizon_1';
      setSelectDisplay('soil_horizon_1')
    }
    //set the texture for this soil_horizon
    $scope.textureFilter.selectedOption = "";
    if (view_plot.texture !== 'undefined' && !isEmpty(view_plot.texture)) {
      //$scope.textureValue = view_plot.texture[soilHorizonID];
      //document.getElementById('textureID').value = view_plot.texture[soilHorizonID];
      $scope.textureFilter.selectedOption = view_plot.texture[activeSoilHorizon];
    }
//    $scope.bedrockFilter.selectedOption = view_plot.bedrock_depth;
    if(!isEmpty(view_plot.bedrock_depth) && view_plot.bedrock_depth >= 0 ){
      //find the layer that contains the Bedrock and hide all deeper layers/tabs
      for (i=1; i< metricTabLabels.length -1; i++){
        if (view_plot.bedrock_depth < metricTabLabels[i]) {
          document.getElementById(layersArray[i]).style.visibility = 'hidden'
        }
      }
    }

  });

  $scope.$on("$ionicView.beforeLeave", function() {
    //Do we need to do anything before leaving the view?
  });

  function setSelectDisplay(soilHorizonID) {
    //set the help layer inactive
    //var layertab = document.getElementById('soil_horizon_help');
    //layertab.classList.remove("layertab-active");
    //layertab.classList.add("layertab-inactive");
    //set all layers inactive
    for(key in layers){
      var layertabID = key;
      var layertab = document.getElementById(layertabID);
      layertab.classList.remove("layertab-active");
      layertab.classList.add("layertab-inactive");
      var layertabIcon = document.getElementById(layertabID+"_icon");
      layertabIcon.classList.remove("balanced", "dark");
      if (isLayerComplete(layertabID)) {
        layertabIcon.classList.add("balanced");
      } else {
        layertabIcon.classList.add("dark");
      }

    }
    //set the page title
    layerLabel = "Depth : " + layers[soilHorizonID];
    $scope.layerLabel = layerLabel;

    //set the active tab
    var layertab = document.getElementById(soilHorizonID);
    layertab.classList.remove("layertab-inactive");
    layertab.classList.add("layertab-active");
    var layertabIcon = document.getElementById(soilHorizonID+"_icon");
    //layertabIcon.classList.remove("balanced", "dark");
    //layertabIcon.classList.add("assertive");

    //set the texture for this soil_horizon
    $scope.textureFilter.selectedOption = "";
    if (view_plot.texture !== 'undefined' && !isEmpty(view_plot.texture)) {
      //$scope.textureValue = view_plot.texture[soilHorizonID];
      //document.getElementById('textureID').value = view_plot.texture[soilHorizonID];
      $scope.textureFilter.selectedOption = view_plot.texture[soilHorizonID];
    }

    //clear all selected rock fragment images and set image for this soil_horizon
    for(key in rockFragmentMapping){
      var fragmentID = "Rock_Fragment_"+rockFragmentMapping[key];
      var fragmentImg = document.getElementById(fragmentID);
      fragmentImg.classList.remove("lpks-img-active");
    }
    if (view_plot.rock_fragment !== 'undefined' && !isEmpty(view_plot.rock_fragment)) {
      var rock_fragment_selected = view_plot.rock_fragment[soilHorizonID];
      if (rock_fragment_selected in rockFragmentMapping) {
        var rockFragmentSelectedImgID = "Rock_Fragment_"+ rockFragmentMapping[rock_fragment_selected];
        var rockFragmentSelectedImg = document.getElementById(rockFragmentSelectedImgID);
        rockFragmentSelectedImg.classList.add("lpks-img-active");
      }
    }
    //show help as inactive
    //var layertab = document.getElementById('soil_horizon_help');
    //layertab.classList.remove("layertab-active");
    //layertab.classList.add("layertab-inactive");

    //setup bedrock dropdown and the selected value
    startDepth =  metricTabLabels[Object.keys(metricLayers).indexOf(soilHorizonID)];
    endDepth =  metricTabLabels[Object.keys(metricLayers).indexOf(soilHorizonID) + 1 ];

    var bedrockArray = [
        {'value': "clear", 'label': "clear"}
      ]
    var selectedBedrock = {}
    for (i=startDepth; i<= endDepth; i++) {
      bedrockArray.push({'value': i, 'label': i})
    }
    //set the selected value if it's in ths layer

    
    var METRIC_CONFIG = window.localStorage.getItem('GLOBAL_CONFIG_METRICS_UNITS')
    if (METRIC_CONFIG === ENGLISH_METRIC_STANDARD) {
      for (i=1; i < bedrockArray.length; i++){
        bedrockArray[i].label = (bedrockArray[i].label * 0.3937).toFixed(2)
      }
    }
    var data = bedrockArray.findIndex( function( ele ) { 
      return ele.value === view_plot.bedrock_depth;
    } );

    if(data != undefined && !isEmpty(data) && data > 0 ){
      selectedBedrock = bedrockArray[data];
    } else {
      bedrockArray.splice(0,1)
    }
    $scope.bedrockArray = bedrockArray; 
    $scope.selectedBedrock = selectedBedrock;

    if(!isEmpty(view_plot.bedrock_depth) && view_plot.bedrock_depth >= 0 ){
      //find the layer that contains the Bedrock and hide all deeper layers/tabs
      for (i=1; i< metricTabLabels.length -1; i++){
        if (view_plot.bedrock_depth < metricTabLabels[i]) {
          document.getElementById(layersArray[i]).style.visibility = 'hidden'
        }
      }
    } 

  }

  function isLayerComplete (layerID) {
    if(!isEmpty(view_plot.texture) && !isEmpty(view_plot.rock_fragment)) {
      if (!isEmpty(view_plot.texture[layerID]) && !isEmpty(view_plot.rock_fragment[layerID])) {
        return true;
      }
    }
    return false;
  }
  $scope.goToGuideMeAction = function () {
    window.localStorage.setItem('current_layer_name', activeSoilHorizon)
    $state.go('landpks.landinfo_guide_me_soil_texture')
  }

})

  .controller('soilWeb', function ($scope, $state, $translate, $http, $sce) {
    var viewPlot = JSON.parse(window.localStorage.getItem('current_view_plot'));
    var url = 'https://casoilresource.lawr.ucdavis.edu/soil_web/list_components.php?lon='+viewPlot.longitude+'&lat='+viewPlot.latitude
    $scope.url = url;
    //url = 'https://www.cnn.com'
    console.log($scope.url)
    $scope.trustSrc = function(src) {
      //console.log("trust : " + $sce.trustAsResourceUrl(src))
      return $sce.trustAsResourceUrl(src);
    }
  })




