angular.module('ionicApp.landcover_controller', ['chart.js', 'ngCordova'])
/****************************************/
/*
 * Manage Controller
 */
/****************************************/

  /****************************************/
  /** North Transect Controller **/
  /****************************************/
  .controller('LandCover_North_Transect_Ctrl', function ($scope, $state,$ionicPlatform, $ionicHistory) {
    window.localStorage.setItem('CURRENT_PAGE_FOR_BACK_BUTTON', 'LANDCOVER_NORTH_TRANSECT_PAGE')
    var plot_name = window.localStorage.getItem('current_plot_name_landcover')
    var recorder_name = window.localStorage.getItem('current_email_landcover')
    var display_plot_name = window.localStorage.getItem('current_display_plot_name_landcover')
    $scope.plot_name = display_plot_name
    var current_action = window.localStorage.getItem('current_action_landcover')
    var current_plot = {}
    if (current_action == 'ADD_NEW' || current_action == 'EDIT_NEW') {
      current_plot = JSON.parse(window.localStorage.getItem('current_plot_data_landcover'))
    } else if (current_action === 'VIEW_OLD') {
      //console.log('North view_plot_landcover')
      current_plot = JSON.parse(window.localStorage.getItem('current_view_plot_landcover'))
    } else if (current_action === 'ADD_OLD' || current_action === 'EDIT_OLD') {
      //console.log('Kho nhat - lam viec voi - North - ADD_OLD')
      current_plot = JSON.parse(window.localStorage.getItem('current_edit_plot_landcover'))
    } else {
      //console.log('ERROR')
    }
    /* Filter data */

    /* Define Label based on METRICS */
    var METRIC_CONFIG = window.localStorage.getItem('GLOBAL_CONFIG_METRICS_UNITS')
    $scope.GLOBAL_METRIC_CONFIG = METRIC_CONFIG
    if (METRIC_CONFIG === UNITED_STATES_METRIC_STANDARD){
       $scope.label_5m = LABEL_SEGMENT_5M_US
       $scope.label_10m = LABEL_SEGMENT_10M_US
       $scope.label_15m = LABEL_SEGMENT_15M_US
       $scope.label_20m = LABEL_SEGMENT_20M_US
       $scope.label_25m = LABEL_SEGMENT_25M_US
    } else if (METRIC_CONFIG === ENGLISH_METRIC_STANDARD){
       $scope.label_5m = LABEL_SEGMENT_5M_EN
       $scope.label_10m = LABEL_SEGMENT_10M_EN
       $scope.label_15m = LABEL_SEGMENT_15M_EN
       $scope.label_20m = LABEL_SEGMENT_20M_EN
       $scope.label_25m = LABEL_SEGMENT_25M_EN
    } else {
      $scope.label_5m = LABEL_SEGMENT_5M_US
      $scope.label_10m = LABEL_SEGMENT_10M_US
      $scope.label_15m = LABEL_SEGMENT_15M_US
      $scope.label_20m = LABEL_SEGMENT_20M_US
      $scope.label_25m = LABEL_SEGMENT_25M_US
    }

    if (current_action == 'ADD_NEW' || current_action == 'EDIT_NEW') {
      if (!isEmpty(current_plot.isComplete_North_5m) && current_plot.isComplete_North_5m === true) {
        $scope.status_north_5m = icon_green_checkmark
      } else {
        $scope.status_north_5m = icon_empty_checkmark
      }
      if (!isEmpty(current_plot.isComplete_North_10m) && current_plot.isComplete_North_10m === true) {
        $scope.status_north_10m = icon_green_checkmark
      } else {
        $scope.status_north_10m = icon_empty_checkmark
      }
      if (!isEmpty(current_plot.isComplete_North_15m) && current_plot.isComplete_North_15m === true) {
        $scope.status_north_15m = icon_green_checkmark
      } else {
        $scope.status_north_15m = icon_empty_checkmark
      }
      if (!isEmpty(current_plot.isComplete_North_20m) && current_plot.isComplete_North_20m === true) {
        $scope.status_north_20m = icon_green_checkmark
      } else {
        $scope.status_north_20m = icon_empty_checkmark
      }
      if (!isEmpty(current_plot.isComplete_North_25m) && current_plot.isComplete_North_25m === true) {
        $scope.status_north_25m = icon_green_checkmark
      } else {
        $scope.status_north_25m = icon_empty_checkmark
      }
    } else if (current_action == 'ADD_OLD' || current_action === 'EDIT_OLD') {
      if (!isEmpty(current_plot.isComplete_North_5m) && current_plot.isComplete_North_5m === true) {
        $scope.status_north_5m = icon_green_checkmark
      } else {
        $scope.status_north_5m = icon_empty_checkmark
      }
      if (!isEmpty(current_plot.isComplete_North_10m) && current_plot.isComplete_North_10m === true) {
        $scope.status_north_10m = icon_green_checkmark
      } else {
        $scope.status_north_10m = icon_empty_checkmark
      }
      if (!isEmpty(current_plot.isComplete_North_15m) && current_plot.isComplete_North_15m === true) {
        $scope.status_north_15m = icon_green_checkmark
      } else {
        $scope.status_north_15m = icon_empty_checkmark
      }
      if (!isEmpty(current_plot.isComplete_North_20m) && current_plot.isComplete_North_20m === true) {
        $scope.status_north_20m = icon_green_checkmark
      } else {
        $scope.status_north_20m = icon_empty_checkmark
      }
      if (!isEmpty(current_plot.isComplete_North_25m) && current_plot.isComplete_North_25m === true) {
        $scope.status_north_25m = icon_green_checkmark
      } else {
        $scope.status_north_25m = icon_empty_checkmark
      }
    } else if (current_action == 'VIEW_OLD') {
      if (!isEmpty(current_plot.isComplete_North_5m) && current_plot.isComplete_North_5m === true) {
        $scope.status_north_5m = icon_green_checkmark
      } else {
        $scope.status_north_5m = icon_empty_checkmark
      }
      if (!isEmpty(current_plot.isComplete_North_10m) && current_plot.isComplete_North_10m === true) {
        $scope.status_north_10m = icon_green_checkmark
      } else {
        $scope.status_north_10m = icon_empty_checkmark
      }
      if (!isEmpty(current_plot.isComplete_North_15m) && current_plot.isComplete_North_15m === true) {
        $scope.status_north_15m = icon_green_checkmark
      } else {
        $scope.status_north_15m = icon_empty_checkmark
      }
      if (!isEmpty(current_plot.isComplete_North_20m) && current_plot.isComplete_North_20m === true) {
        $scope.status_north_20m = icon_green_checkmark
      } else {
        $scope.status_north_20m = icon_empty_checkmark
      }
      if (!isEmpty(current_plot.isComplete_North_25m) && current_plot.isComplete_North_25m === true) {
        $scope.status_north_25m = icon_green_checkmark
      } else {
        $scope.status_north_25m = icon_empty_checkmark
      }
    }

    if (current_action == 'VIEW_OLD' && current_plot.has_land_cover == true) {
      $scope.status_north_5m = icon_green_checkmark
      $scope.status_north_10m = icon_green_checkmark
      $scope.status_north_15m = icon_green_checkmark
      $scope.status_north_20m = icon_green_checkmark
      $scope.status_north_25m = icon_green_checkmark
    }

    $scope.goToSegment = function (direction, segment) {
      if (segment == 'm5') {
        segment = '5m'
      } else if (segment == 'm10') {
        segment = '10m'
      } else if (segment == 'm15') {
        segment = '15m'
      } else if (segment == 'm20') {
        segment = '20m'
      } else if (segment == 'm25') {
        segment = '25m'
      }
      window.localStorage.setItem('current_segment_landcover', segment)
      window.localStorage.setItem('current_transect_landcover', 'NORTH')
      $ionicHistory.nextViewOptions({
        disableBack: true
      });
      $state.go('landpks.landcover_transect_cover')
    }

    $scope.goBack = function () {
      window.localStorage.setItem('PREVIOUS_PAGE_LANDCOVER', 'NORTH_TRANSECT')
      $state.go('landpks.landcover_main_transect')
    }

    /***********************************************/
    $ionicPlatform.registerBackButtonAction(function (event) {
      var current_page_for_back_button = window.localStorage.getItem('CURRENT_PAGE_FOR_BACK_BUTTON')
      window.localStorage.setItem('CURRENT_PAGE_FOR_BACK_BUTTON', 'EMPTY')
      if (current_page_for_back_button === 'LANDCOVER_NORTH_TRANSECT_PAGE') {
        $scope.goBack()
        return
      } else {
        return
      }
    }, 400)

  })
  // End North_Transect_Ctrl
  /****************************************/
  /** East Transect Controller **/
  /****************************************/
  .controller('LandCover_East_Transect_Ctrl', function ($scope, $state, $ionicPlatform, $ionicHistory) {
    window.localStorage.setItem('CURRENT_PAGE_FOR_BACK_BUTTON', 'LANDCOVER_EAST_TRANSECT_PAGE')
    var plot_name = window.localStorage.getItem('current_plot_name_landcover')
    var recorder_name = window.localStorage.getItem('current_email_landcover')
    var display_plot_name = window.localStorage.getItem('current_display_plot_name_landcover')
    $scope.plot_name = display_plot_name

    var current_action = window.localStorage.getItem('current_action_landcover')

    var current_plot = {}
    if (current_action == 'ADD_NEW' || current_action == 'EDIT_NEW') {
      current_plot = JSON.parse(window.localStorage.getItem('current_plot_data_landcover'))
    } else if (current_action === 'VIEW_OLD') {
      //console.log('East view_plot_landcover')
      current_plot = JSON.parse(window.localStorage.getItem('current_view_plot_landcover'))
    } else if (current_action === 'ADD_OLD' || current_action === 'EDIT_OLD') {
      //console.log('Kho nhat - lam viec voi - East - ADD_OLD')
      current_plot = JSON.parse(window.localStorage.getItem('current_edit_plot_landcover'))
    } else {
      //console.log('ERROR')
    }

    /* Define Label based on METRICS */
    var METRIC_CONFIG = window.localStorage.getItem('GLOBAL_CONFIG_METRICS_UNITS')
    $scope.GLOBAL_METRIC_CONFIG = METRIC_CONFIG
    if (METRIC_CONFIG === UNITED_STATES_METRIC_STANDARD){
       $scope.label_5m = LABEL_SEGMENT_5M_US
       $scope.label_10m = LABEL_SEGMENT_10M_US
       $scope.label_15m = LABEL_SEGMENT_15M_US
       $scope.label_20m = LABEL_SEGMENT_20M_US
       $scope.label_25m = LABEL_SEGMENT_25M_US
    } else if (METRIC_CONFIG === ENGLISH_METRIC_STANDARD){
       $scope.label_5m = LABEL_SEGMENT_5M_EN
       $scope.label_10m = LABEL_SEGMENT_10M_EN
       $scope.label_15m = LABEL_SEGMENT_15M_EN
       $scope.label_20m = LABEL_SEGMENT_20M_EN
       $scope.label_25m = LABEL_SEGMENT_25M_EN
    } else {
      $scope.label_5m = LABEL_SEGMENT_5M_US
      $scope.label_10m = LABEL_SEGMENT_10M_US
      $scope.label_15m = LABEL_SEGMENT_15M_US
      $scope.label_20m = LABEL_SEGMENT_20M_US
      $scope.label_25m = LABEL_SEGMENT_25M_US
    }

    if (current_action == 'ADD_NEW' || current_action == 'EDIT_NEW') {
      if (!isEmpty(current_plot.isComplete_East_5m) && current_plot.isComplete_East_5m === true) {
        $scope.status_east_5m = icon_green_checkmark
      } else {
        $scope.status_east_5m = icon_empty_checkmark
      }
      if (!isEmpty(current_plot.isComplete_East_10m) && current_plot.isComplete_East_10m === true) {
        $scope.status_east_10m = icon_green_checkmark
      } else {
        $scope.status_east_10m = icon_empty_checkmark
      }
      if (!isEmpty(current_plot.isComplete_East_15m) && current_plot.isComplete_East_15m === true) {
        $scope.status_east_15m = icon_green_checkmark
      } else {
        $scope.status_east_15m = icon_empty_checkmark
      }
      if (!isEmpty(current_plot.isComplete_East_20m) && current_plot.isComplete_East_20m === true) {
        $scope.status_east_20m = icon_green_checkmark
      } else {
        $scope.status_east_20m = icon_empty_checkmark
      }
      if (!isEmpty(current_plot.isComplete_East_25m) && current_plot.isComplete_East_25m === true) {
        $scope.status_east_25m = icon_green_checkmark
      } else {
        $scope.status_east_25m = icon_empty_checkmark
      }
    } else if (current_action == 'ADD_OLD' || current_action === 'EDIT_OLD') {
      if (!isEmpty(current_plot.isComplete_East_5m) && current_plot.isComplete_East_5m === true) {
        $scope.status_east_5m = icon_green_checkmark
      } else {
        $scope.status_east_5m = icon_empty_checkmark
      }
      if (!isEmpty(current_plot.isComplete_East_10m) && current_plot.isComplete_East_10m === true) {
        $scope.status_east_10m = icon_green_checkmark
      } else {
        $scope.status_east_10m = icon_empty_checkmark
      }
      if (!isEmpty(current_plot.isComplete_East_15m) && current_plot.isComplete_East_15m === true) {
        $scope.status_east_15m = icon_green_checkmark
      } else {
        $scope.status_east_15m = icon_empty_checkmark
      }
      if (!isEmpty(current_plot.isComplete_East_20m) && current_plot.isComplete_East_20m === true) {
        $scope.status_east_20m = icon_green_checkmark
      } else {
        $scope.status_east_20m = icon_empty_checkmark
      }
      if (!isEmpty(current_plot.isComplete_East_25m) && current_plot.isComplete_East_25m === true) {
        $scope.status_east_25m = icon_green_checkmark
      } else {
        $scope.status_east_25m = icon_empty_checkmark
      }
    } else if (current_action == 'VIEW_OLD') {
      $scope.status_east_5m = icon_green_checkmark
      $scope.status_east_10m = icon_green_checkmark
      $scope.status_east_15m = icon_green_checkmark
      $scope.status_east_20m = icon_green_checkmark
      $scope.status_east_25m = icon_green_checkmark
    }

    if (current_action == 'VIEW_OLD' && current_plot.has_land_cover == true) {
      $scope.status_east_5m = icon_green_checkmark
      $scope.status_east_10m = icon_green_checkmark
      $scope.status_east_15m = icon_green_checkmark
      $scope.status_east_20m = icon_green_checkmark
      $scope.status_east_25m = icon_green_checkmark
    }

    $scope.goToSegment = function (direction, segment) {
      window.localStorage.setItem('current_segment_landcover', segment)
      window.localStorage.setItem('current_transect_landcover', 'EAST')
      $ionicHistory.nextViewOptions({
        disableBack: true
      });
      $state.go('landpks.landcover_transect_cover')
    }

    $scope.goBack = function () {
      window.localStorage.setItem('PREVIOUS_PAGE_LANDCOVER', 'EAST_TRANSECT')
      $state.go('landpks.landcover_main_transect')
    }

    /***********************************************/
    $ionicPlatform.registerBackButtonAction(function (event) {
      var current_page_for_back_button = window.localStorage.getItem('CURRENT_PAGE_FOR_BACK_BUTTON')
      window.localStorage.setItem('CURRENT_PAGE_FOR_BACK_BUTTON', 'EMPTY')
      if (current_page_for_back_button === 'LANDCOVER_EAST_TRANSECT_PAGE') {
        $scope.goBack()
        return
      } else {
        return
      }
    }, 400)

  })
  // End East_Transect_Ctrl
  /****************************************/
  /** South Transect Controller **/
  /****************************************/
  .controller('LandCover_South_Transect_Ctrl', function ($scope, $state, $ionicPlatform, $ionicHistory) {
    window.localStorage.setItem('CURRENT_PAGE_FOR_BACK_BUTTON', 'LANDCOVER_SOUTH_TRANSECT_PAGE')
    var plot_name = window.localStorage.getItem('current_plot_name_landcover')
    var recorder_name = window.localStorage.getItem('current_email_landcover')
    var display_plot_name = window.localStorage.getItem('current_display_plot_name_landcover')
    $scope.plot_name = display_plot_name

    var current_action = window.localStorage.getItem('current_action_landcover')

    var current_plot = {}
    if (current_action == 'ADD_NEW' || current_action == 'EDIT_NEW') {
      current_plot = JSON.parse(window.localStorage.getItem('current_plot_data_landcover'))
    } else if (current_action === 'VIEW_OLD') {
      //console.log('South view_plot_landcover')
      current_plot = JSON.parse(window.localStorage.getItem('current_view_plot_landcover'))
    } else if (current_action === 'ADD_OLD' || current_action === 'EDIT_OLD') {
      //console.log('Kho nhat - lam viec voi - South - ADD_OLD')
      current_plot = JSON.parse(window.localStorage.getItem('current_edit_plot_landcover'))
    } else {
      //console.log('ERROR')
    }

    /* Define Label based on METRICS */
    var METRIC_CONFIG = window.localStorage.getItem('GLOBAL_CONFIG_METRICS_UNITS')
    $scope.GLOBAL_METRIC_CONFIG = METRIC_CONFIG
    if (METRIC_CONFIG === UNITED_STATES_METRIC_STANDARD){
       $scope.label_5m = LABEL_SEGMENT_5M_US
       $scope.label_10m = LABEL_SEGMENT_10M_US
       $scope.label_15m = LABEL_SEGMENT_15M_US
       $scope.label_20m = LABEL_SEGMENT_20M_US
       $scope.label_25m = LABEL_SEGMENT_25M_US
    } else if (METRIC_CONFIG === ENGLISH_METRIC_STANDARD){
       $scope.label_5m = LABEL_SEGMENT_5M_EN
       $scope.label_10m = LABEL_SEGMENT_10M_EN
       $scope.label_15m = LABEL_SEGMENT_15M_EN
       $scope.label_20m = LABEL_SEGMENT_20M_EN
       $scope.label_25m = LABEL_SEGMENT_25M_EN
    } else {
      $scope.label_5m = LABEL_SEGMENT_5M_US
      $scope.label_10m = LABEL_SEGMENT_10M_US
      $scope.label_15m = LABEL_SEGMENT_15M_US
      $scope.label_20m = LABEL_SEGMENT_20M_US
      $scope.label_25m = LABEL_SEGMENT_25M_US
    }


    if (current_action == 'ADD_NEW' || current_action == 'EDIT_NEW') {
      if (!isEmpty(current_plot.isComplete_South_5m) && current_plot.isComplete_South_5m === true) {
        $scope.status_south_5m = icon_green_checkmark
      } else {
        $scope.status_south_5m = icon_empty_checkmark
      }
      if (!isEmpty(current_plot.isComplete_South_10m) && current_plot.isComplete_South_10m === true) {
        $scope.status_south_10m = icon_green_checkmark
      } else {
        $scope.status_south_10m = icon_empty_checkmark
      }
      if (!isEmpty(current_plot.isComplete_South_15m) && current_plot.isComplete_South_15m === true) {
        $scope.status_south_15m = icon_green_checkmark
      } else {
        $scope.status_south_15m = icon_empty_checkmark
      }
      if (!isEmpty(current_plot.isComplete_South_20m) && current_plot.isComplete_South_20m === true) {
        $scope.status_south_20m = icon_green_checkmark
      } else {
        $scope.status_south_20m = icon_empty_checkmark
      }
      if (!isEmpty(current_plot.isComplete_South_25m) && current_plot.isComplete_South_25m === true) {
        $scope.status_south_25m = icon_green_checkmark
      } else {
        $scope.status_south_25m = icon_empty_checkmark
      }
    } else if (current_action == 'ADD_OLD' || current_action === 'EDIT_OLD') {
      if (!isEmpty(current_plot.isComplete_South_5m) && current_plot.isComplete_South_5m === true) {
        $scope.status_south_5m = icon_green_checkmark
      } else {
        $scope.status_south_5m = icon_empty_checkmark
      }
      if (!isEmpty(current_plot.isComplete_South_10m) && current_plot.isComplete_South_10m === true) {
        $scope.status_south_10m = icon_green_checkmark
      } else {
        $scope.status_south_10m = icon_empty_checkmark
      }
      if (!isEmpty(current_plot.isComplete_South_15m) && current_plot.isComplete_South_15m === true) {
        $scope.status_south_15m = icon_green_checkmark
      } else {
        $scope.status_south_15m = icon_empty_checkmark
      }
      if (!isEmpty(current_plot.isComplete_South_20m) && current_plot.isComplete_South_20m === true) {
        $scope.status_south_20m = icon_green_checkmark
      } else {
        $scope.status_south_20m = icon_empty_checkmark
      }
      if (!isEmpty(current_plot.isComplete_South_25m) && current_plot.isComplete_South_25m === true) {
        $scope.status_south_25m = icon_green_checkmark
      } else {
        $scope.status_south_25m = icon_empty_checkmark
      }
    } else if (current_action == 'VIEW_OLD') {
      $scope.status_south_5m = icon_green_checkmark
      $scope.status_south_10m = icon_green_checkmark
      $scope.status_south_15m = icon_green_checkmark
      $scope.status_south_20m = icon_green_checkmark
      $scope.status_south_25m = icon_green_checkmark
    }

    if (current_action == 'VIEW_OLD' && current_plot.has_land_cover == true) {
      $scope.status_south_5m = icon_green_checkmark
      $scope.status_south_10m = icon_green_checkmark
      $scope.status_south_15m = icon_green_checkmark
      $scope.status_south_20m = icon_green_checkmark
      $scope.status_south_25m = icon_green_checkmark
    }

    $scope.goToSegment = function (direction, segment) {
      window.localStorage.setItem('current_segment_landcover', segment)
      window.localStorage.setItem('current_transect_landcover', 'SOUTH')
      $ionicHistory.nextViewOptions({
        disableBack: true
      });
      $state.go('landpks.landcover_transect_cover')
    }

    $scope.goBack = function () {
      window.localStorage.setItem('PREVIOUS_PAGE_LANDCOVER', 'SOUTH_TRANSECT')
      $state.go('landpks.landcover_main_transect')
    }

    /***********************************************/
    $ionicPlatform.registerBackButtonAction(function (event) {
      var current_page_for_back_button = window.localStorage.getItem('CURRENT_PAGE_FOR_BACK_BUTTON')
      window.localStorage.setItem('CURRENT_PAGE_FOR_BACK_BUTTON', 'EMPTY')
      if (current_page_for_back_button === 'LANDCOVER_SOUTH_TRANSECT_PAGE') {
        $scope.goBack()
        return
      } else {
        return
      }
    }, 400)
  })
  // End South_Transect_Ctrl
  /****************************************/
  /** West Transect Controller **/
  /****************************************/
  .controller('LandCover_West_Transect_Ctrl', function ($scope, $state, $ionicPlatform, $ionicHistory) {
    window.localStorage.setItem('CURRENT_PAGE_FOR_BACK_BUTTON', 'LANDCOVER_WEST_TRANSECT_PAGE')
    var plot_name = window.localStorage.getItem('current_plot_name_landcover')
    var recorder_name = window.localStorage.getItem('current_email_landcover')
    var display_plot_name = window.localStorage.getItem('current_display_plot_name_landcover')
    $scope.plot_name = display_plot_name

    var current_action = window.localStorage.getItem('current_action_landcover')

    var current_plot = {}
    if (current_action == 'ADD_NEW' || current_action == 'EDIT_NEW') {
      current_plot = JSON.parse(window.localStorage.getItem('current_plot_data_landcover'))
    } else if (current_action === 'VIEW_OLD') {
      //console.log('West view_plot_landcover')
      current_plot = JSON.parse(window.localStorage.getItem('current_view_plot_landcover'))
    } else if (current_action === 'ADD_OLD' || current_action === 'EDIT_OLD') {
      //console.log('Kho nhat - lam viec voi - West - ADD_OLD')
      current_plot = JSON.parse(window.localStorage.getItem('current_edit_plot_landcover'))
    } else {
      //console.log('ERROR')
    }

    /* Define Label based on METRICS */
    var METRIC_CONFIG = window.localStorage.getItem('GLOBAL_CONFIG_METRICS_UNITS')
    $scope.GLOBAL_METRIC_CONFIG = METRIC_CONFIG
    if (METRIC_CONFIG === UNITED_STATES_METRIC_STANDARD){
       $scope.label_5m = LABEL_SEGMENT_5M_US
       $scope.label_10m = LABEL_SEGMENT_10M_US
       $scope.label_15m = LABEL_SEGMENT_15M_US
       $scope.label_20m = LABEL_SEGMENT_20M_US
       $scope.label_25m = LABEL_SEGMENT_25M_US
    } else if (METRIC_CONFIG === ENGLISH_METRIC_STANDARD){
       $scope.label_5m = LABEL_SEGMENT_5M_EN
       $scope.label_10m = LABEL_SEGMENT_10M_EN
       $scope.label_15m = LABEL_SEGMENT_15M_EN
       $scope.label_20m = LABEL_SEGMENT_20M_EN
       $scope.label_25m = LABEL_SEGMENT_25M_EN
    } else {
      $scope.label_5m = LABEL_SEGMENT_5M_US
      $scope.label_10m = LABEL_SEGMENT_10M_US
      $scope.label_15m = LABEL_SEGMENT_15M_US
      $scope.label_20m = LABEL_SEGMENT_20M_US
      $scope.label_25m = LABEL_SEGMENT_25M_US
    }

    //console.log(current_action)
    if (current_action == 'ADD_NEW' || current_action == 'EDIT_NEW') {
      if (!isEmpty(current_plot.isComplete_West_5m) && current_plot.isComplete_West_5m === true) {
        $scope.status_west_5m = icon_green_checkmark
      } else {
        $scope.status_west_5m = icon_empty_checkmark
      }

      if (!isEmpty(current_plot.isComplete_West_10m) && current_plot.isComplete_West_10m === true) {
        $scope.status_west_10m = icon_green_checkmark
      } else {
        $scope.status_west_10m = icon_empty_checkmark
      }
      if (!isEmpty(current_plot.isComplete_West_15m) && current_plot.isComplete_West_15m === true) {
        $scope.status_west_15m = icon_green_checkmark
      } else {
        $scope.status_west_15m = icon_empty_checkmark
      }

      if (!isEmpty(current_plot.isComplete_West_20m) && current_plot.isComplete_West_20m === true) {
        $scope.status_west_20m = icon_green_checkmark
      } else {
        $scope.status_west_20m = icon_empty_checkmark
      }
      if (!isEmpty(current_plot.isComplete_West_25m) && current_plot.isComplete_West_25m === true) {
        $scope.status_west_25m = icon_green_checkmark
      } else {
        $scope.status_west_25m = icon_empty_checkmark
      }
    } else if (current_action == 'ADD_OLD' || current_action === 'EDIT_OLD') {
      if (!isEmpty(current_plot.isComplete_West_5m) && current_plot.isComplete_West_5m === true) {
        $scope.status_west_5m = icon_green_checkmark
      } else {
        $scope.status_west_5m = icon_empty_checkmark
      }

      if (!isEmpty(current_plot.isComplete_West_10m) && current_plot.isComplete_West_10m === true) {
        $scope.status_west_10m = icon_green_checkmark
      } else {
        $scope.status_west_10m = icon_empty_checkmark
      }
      if (!isEmpty(current_plot.isComplete_West_15m) && current_plot.isComplete_West_15m === true) {
        $scope.status_west_15m = icon_green_checkmark
      } else {
        $scope.status_west_15m = icon_empty_checkmark
      }

      if (!isEmpty(current_plot.isComplete_West_20m) && current_plot.isComplete_West_20m === true) {
        $scope.status_west_20m = icon_green_checkmark
      } else {
        $scope.status_west_20m = icon_empty_checkmark
      }
      if (!isEmpty(current_plot.isComplete_West_25m) && current_plot.isComplete_West_25m === true) {
        $scope.status_west_25m = icon_green_checkmark
      } else {
        $scope.status_west_25m = icon_empty_checkmark
      }
    } else if (current_action == 'VIEW_OLD') {
      $scope.status_west_5m = icon_green_checkmark
      $scope.status_west_10m = icon_green_checkmark
      $scope.status_west_15m = icon_green_checkmark
      $scope.status_west_20m = icon_green_checkmark
      $scope.status_west_25m = icon_green_checkmark
    }

    if (current_action == 'VIEW_OLD' && current_plot.has_land_cover == true) {
    }

    $scope.goToSegment = function (direction, segment) {
      window.localStorage.setItem('current_segment_landcover', segment)
      window.localStorage.setItem('current_transect_landcover', 'WEST')
      $ionicHistory.nextViewOptions({
        disableBack: true
      });
      $state.go('landpks.landcover_transect_cover')
    }

    $scope.goBack = function () {
      window.localStorage.setItem('PREVIOUS_PAGE_LANDCOVER', 'WEST_TRANSECT')
      $state.go('landpks.landcover_main_transect')
    }

    /***********************************************/
    $ionicPlatform.registerBackButtonAction(function (event) {
      var current_page_for_back_button = window.localStorage.getItem('CURRENT_PAGE_FOR_BACK_BUTTON')
      window.localStorage.setItem('CURRENT_PAGE_FOR_BACK_BUTTON', 'EMPTY')
      if (current_page_for_back_button === 'LANDCOVER_WEST_TRANSECT_PAGE') {
        $scope.goBack()
        return
      } else {
        return
      }
    }, 400)
  })
  // End West_Transect_Ctrl
  /****************************************/
  /** East Transect Controller **/
  /****************************************/
  .controller('LandCover_Transect_Height_Gap_Ctrl', function ($scope, $state, $ionicPopup, $ionicPlatform) {
    window.localStorage.setItem('CURRENT_PAGE_FOR_BACK_BUTTON', 'LANDCOVER_TRANSECT_HEIGHT_GAP_PAGE')
    
    var plot_name = window.localStorage.getItem('current_plot_name_landcover')
    var recorder_name = window.localStorage.getItem('current_email_landcover')
    var display_plot_name = window.localStorage.getItem('current_display_plot_name_landcover')
    $scope.plot_name = display_plot_name

    var current_action = window.localStorage.getItem('current_action_landcover')

    var current_plot = {}
    var full_current_plot = {}
    full_current_plot = JSON.parse(window.localStorage.getItem('current_plot_data_landcover'))
    if (current_action == 'ADD_NEW' || current_action == 'EDIT_NEW') {
      current_plot = JSON.parse(window.localStorage.getItem('current_plot_data_landcover'))
    } else if (current_action === 'VIEW_OLD') {
      //console.log('Cover - View_PLOT-LandCover')
      current_plot = JSON.parse(window.localStorage.getItem('current_view_plot_landcover'))
    } else if (current_action === 'ADD_OLD' || current_action === 'EDIT_OLD') {
      //console.log('Cover - Edit Plot LandCover')
      current_plot = JSON.parse(window.localStorage.getItem('current_edit_plot_landcover'))
    } else {
      //console.log('ERROR')
    }

    var current_transect = window.localStorage.getItem('current_transect_landcover')
    var current_segment = window.localStorage.getItem('current_segment_landcover')
    $scope.transect_direction = current_transect
    var METRIC_CONFIG = window.localStorage.getItem('GLOBAL_CONFIG_METRICS_UNITS')
    $scope.GLOBAL_METRIC_CONFIG = METRIC_CONFIG
    if (METRIC_CONFIG === UNITED_STATES_METRIC_STANDARD){
        $scope.segment = current_segment
    } else if (METRIC_CONFIG === ENGLISH_METRIC_STANDARD) {
        if (current_segment === '5m'){
          $scope.segment = LABEL_SEGMENT_5M_EN
        } else if (current_segment === '10m'){
          $scope.segment = LABEL_SEGMENT_10M_EN
        } else if (current_segment === '15m'){
          $scope.segment = LABEL_SEGMENT_15M_EN
        } else if (current_segment === '20m'){
          $scope.segment = LABEL_SEGMENT_20M_EN
        } else if (current_segment === '25m'){
          $scope.segment = LABEL_SEGMENT_25M_EN
        } else {
          $scope.segment = current_segment
        }
    } else {
        $scope.segment = current_segment
    }

    //console.log(current_plot)

    var tran_canopy_height = ''
    var bo_canopy_gap = 'FALSE'
    var bo_basal_gap = 'FALSE'
    //console.log('Transect Height Gap')
    //console.log(current_action)
    if (current_action == 'VIEW_OLD') {
      presentStatus_AddNew_Action()
      presentStatus_ViewOld_Action()
    } else if (current_action == 'ADD_NEW') {
      presentStatus_AddNew_Action()
    } else if (current_action == 'EDIT_NEW') {
      presentStatus_ViewOld_Action()
      unlockCount()
    } else if (current_action == 'ADD_OLD') {
      presentStatus_AddNew_Action()
    } else if (current_action == 'EDIT_OLD') {
      presentStatus_ViewOld_Action()
      unlockCount()
    } else {
    }

    function unlockCount () {
      document.getElementById('species_1_count').readOnly = false
      document.getElementById('species_2_count').readOnly = false
      document.getElementById('species_1').readOnly = false
      document.getElementById('species_2').readOnly = false
    }

    document.getElementById('species_1_count').addEventListener('keypress', function (evt) {
      if (evt.which < 48 || evt.which > 57) {
        evt.preventDefault()
      }
    })

    document.getElementById('species_2_count').addEventListener('keypress', function (evt) {
      if (evt.which < 48 || evt.which > 57) {
        evt.preventDefault()
      }
    })

    $scope.initNumberSpecies = function (item) {
      if (item === 1 || item === '1') {
        if (isEmpty(document.getElementById('species_1_count').value)) {
          document.getElementById('species_1_count').value = ''
          $scope.species_1_count = ''
        }
      } else if (item === 2 || item === '2') {
        if (isEmpty(document.getElementById('species_2_count').value)) {
          document.getElementById('species_2_count').value = ''
          $scope.species_2_count = ''
        }
      }
    }

    $scope.checkAndNext = function(event,item){
        var key = event.keyCode || event.which
        if (key == 13 || key == 9) {
          //console.log(item);
          if (item === 'species_1') {
            document.getElementById('species_1_count').focus()
            /*
            if (isEmpty(document.getElementById('species_1_count').value) || parseInt(document.getElementById('species_1_count').value) == 0 || document.getElementById('species_1_count').value == '0') {
              $scope.species_1_count = ''
              document.getElementById('species_1_count').value = ''
            }
            */
            if (isEmpty(document.getElementById('species_1_count').value)) {
              $scope.species_1_count = ''
              document.getElementById('species_1_count').value = ''
            }
          } else if (item === 'species_2') {
            document.getElementById('species_2_count').focus()
            if (isEmpty(document.getElementById('species_2_count').value) ) {
              document.getElementById('species_2_count').value = ''
              $scope.species_2_count = ''
            }
          }
        }
    }

    $scope.validateSpecies = function (event, item) {
      //console.log('Receive action : ' + document.getElementById('species_1_count').value)
      if (item == 1 || item == '1') {
        var key = event.keyCode || event.which
        //console.log(key)
        if (key == 13 || key == 9) {
            document.getElementById('species_2').focus()
        }

        var obj_species_1 = document.getElementById('species_1_count').value
        if (isEmpty(obj_species_1)) {
          document.getElementById('species_1_count').value = ''
        } else {
          if (isNaN(obj_species_1)) {
            document.getElementById('species_1_count').value = ''
          } else {
            var species_1_number = Number(obj_species_1)
            if (species_1_number < 0) {
              document.getElementById('species_1_count').value = 0
            }
          }
        }
      }



      if (item == 2 || item == '2') {
        var key = event.keyCode || event.which
        if (key == 13 || key == 9) {
            document.getElementById('species_1').focus()
        }

        var obj_species_2 = document.getElementById('species_2_count').value
        if (isEmpty(obj_species_2)) {
          document.getElementById('species_2_count').value = ''
        } else {
          if (isNaN(obj_species_2)) {
            document.getElementById('species_2_count').value = ''
          } else {
            var species_2_number = Number(obj_species_2)
            if (species_2_number < 0) {
              document.getElementById('species_2_count').value = 0
            }
          }
        }
      }
    }



    $scope.goBack = function () {

      if (current_transect == 'NORTH') {
        $state.go('landpks.landcover_north_transect')
      } else if (current_transect == 'EAST') {
        $state.go('landpks.landcover_east_transect')
      } else if (current_transect == 'SOUTH') {
        $state.go('landpks.landcover_south_transect')
      } else if (current_transect == 'WEST') {
        $state.go('landpks.landcover_west_transect')
      } else {
        $state.go('landpks.landcover_main_transect')
      }
    }

    setUp_Ticker()

    function setUp_Ticker(){
      /* For Cover */
      /* NORTH */
      if (current_transect.trim().toUpperCase() === 'NORTH' && current_segment.trim().toUpperCase() === '5M'){
        if (current_plot.isComplete_North_5m === true){
          $scope.cover_status_img_src = icon_green_checkmark
        } else {
          $scope.cover_status_img_src = icon_empty_checkmark
        }
        if (current_plot.isComplete_North_5m_Height_Gap === true){
          $scope.height_gap_status_img_src = icon_green_checkmark
        } else {
          $scope.height_gap_status_img_src = icon_empty_checkmark
        }
      }
      if (current_transect.trim().toUpperCase() === 'NORTH' && current_segment.trim().toUpperCase() === '10M'){
        if (current_plot.isComplete_North_10m === true){
          $scope.cover_status_img_src = icon_green_checkmark
        } else {
          $scope.cover_status_img_src = icon_empty_checkmark
        }
        if (current_plot.isComplete_North_10m_Height_Gap === true){
          $scope.height_gap_status_img_src = icon_green_checkmark
        } else {
          $scope.height_gap_status_img_src = icon_empty_checkmark
        }
      }
      if (current_transect.trim().toUpperCase() === 'NORTH' && current_segment.trim().toUpperCase() === '15M'){
        if (current_plot.isComplete_North_15m === true){
          $scope.cover_status_img_src = icon_green_checkmark
        } else {
          $scope.cover_status_img_src = icon_empty_checkmark
        }
        if (current_plot.isComplete_North_15m_Height_Gap === true){
          $scope.height_gap_status_img_src = icon_green_checkmark
        } else {
          $scope.height_gap_status_img_src = icon_empty_checkmark
        }
      }
      if (current_transect.trim().toUpperCase() === 'NORTH' && current_segment.trim().toUpperCase() === '20M'){
        if (current_plot.isComplete_North_20m === true){
          $scope.cover_status_img_src = icon_green_checkmark
        } else {
          $scope.cover_status_img_src = icon_empty_checkmark
        }
        if (current_plot.isComplete_North_20m_Height_Gap === true){
          $scope.height_gap_status_img_src = icon_green_checkmark
        } else {
          $scope.height_gap_status_img_src = icon_empty_checkmark
        }
      }
      if (current_transect.trim().toUpperCase() === 'NORTH' && current_segment.trim().toUpperCase() === '25M'){
        if (current_plot.isComplete_North_25m === true){
          $scope.cover_status_img_src = icon_green_checkmark
        } else {
          $scope.cover_status_img_src = icon_empty_checkmark
        }
        if (current_plot.isComplete_North_25m_Height_Gap === true){
          $scope.height_gap_status_img_src = icon_green_checkmark
        } else {
          $scope.height_gap_status_img_src = icon_empty_checkmark
        }
      }

      /* SOUTH */
      if (current_transect.trim().toUpperCase() === 'SOUTH' && current_segment.trim().toUpperCase() === '5M'){
        if (current_plot.isComplete_South_5m === true){
          $scope.cover_status_img_src = icon_green_checkmark
        } else {
          $scope.cover_status_img_src = icon_empty_checkmark
        }
        if (current_plot.isComplete_South_5m_Height_Gap === true){
          $scope.height_gap_status_img_src = icon_green_checkmark
        } else {
          $scope.height_gap_status_img_src = icon_empty_checkmark
        }
      }
      if (current_transect.trim().toUpperCase() === 'SOUTH' && current_segment.trim().toUpperCase() === '10M'){
        if (current_plot.isComplete_South_10m === true){
          $scope.cover_status_img_src = icon_green_checkmark
        } else {
          $scope.cover_status_img_src = icon_empty_checkmark
        }
        if (current_plot.isComplete_South_10m_Height_Gap === true){
          $scope.height_gap_status_img_src = icon_green_checkmark
        } else {
          $scope.height_gap_status_img_src = icon_empty_checkmark
        }
      }
      if (current_transect.trim().toUpperCase() === 'SOUTH' && current_segment.trim().toUpperCase() === '15M'){
        if (current_plot.isComplete_South_15m === true){
          $scope.cover_status_img_src = icon_green_checkmark
        } else {
          $scope.cover_status_img_src = icon_empty_checkmark
        }
        if (current_plot.isComplete_South_15m_Height_Gap === true){
          $scope.height_gap_status_img_src = icon_green_checkmark
        } else {
          $scope.height_gap_status_img_src = icon_empty_checkmark
        }
      }
      if (current_transect.trim().toUpperCase() === 'SOUTH' && current_segment.trim().toUpperCase() === '20M'){
        if (current_plot.isComplete_South_20m === true){
          $scope.cover_status_img_src = icon_green_checkmark
        } else {
          $scope.cover_status_img_src = icon_empty_checkmark
        }
        if (current_plot.isComplete_South_20m_Height_Gap === true){
          $scope.height_gap_status_img_src = icon_green_checkmark
        } else {
          $scope.height_gap_status_img_src = icon_empty_checkmark
        }
      }
      if (current_transect.trim().toUpperCase() === 'SOUTH' && current_segment.trim().toUpperCase() === '25M'){
        if (current_plot.isComplete_South_25m === true){
          $scope.cover_status_img_src = icon_green_checkmark
        } else {
          $scope.cover_status_img_src = icon_empty_checkmark
        }
        if (current_plot.isComplete_South_25m_Height_Gap === true){
          $scope.height_gap_status_img_src = icon_green_checkmark
        } else {
          $scope.height_gap_status_img_src = icon_empty_checkmark
        }
      }


      /* EAST */
      if (current_transect.trim().toUpperCase() === 'EAST' && current_segment.trim().toUpperCase() === '5M'){
        if (current_plot.isComplete_East_5m === true){
          $scope.cover_status_img_src = icon_green_checkmark
        } else {
          $scope.cover_status_img_src = icon_empty_checkmark
        }
        if (current_plot.isComplete_East_5m_Height_Gap === true){
          $scope.height_gap_status_img_src = icon_green_checkmark
        } else {
          $scope.height_gap_status_img_src = icon_empty_checkmark
        }
      }
      if (current_transect.trim().toUpperCase() === 'EAST' && current_segment.trim().toUpperCase() === '10M'){
        if (current_plot.isComplete_East_10m === true){
          $scope.cover_status_img_src = icon_green_checkmark
        } else {
          $scope.cover_status_img_src = icon_empty_checkmark
        }
        if (current_plot.isComplete_East_10m_Height_Gap === true){
          $scope.height_gap_status_img_src = icon_green_checkmark
        } else {
          $scope.height_gap_status_img_src = icon_empty_checkmark
        }
      }
      if (current_transect.trim().toUpperCase() === 'EAST' && current_segment.trim().toUpperCase() === '15M'){
        if (current_plot.isComplete_East_15m === true){
          $scope.cover_status_img_src = icon_green_checkmark
        } else {
          $scope.cover_status_img_src = icon_empty_checkmark
        }
        if (current_plot.isComplete_East_15m_Height_Gap === true){
          $scope.height_gap_status_img_src = icon_green_checkmark
        } else {
          $scope.height_gap_status_img_src = icon_empty_checkmark
        }
      }
      if (current_transect.trim().toUpperCase() === 'EAST' && current_segment.trim().toUpperCase() === '20M'){
        if (current_plot.isComplete_East_20m === true){
          $scope.cover_status_img_src = icon_green_checkmark
        } else {
          $scope.cover_status_img_src = icon_empty_checkmark
        }
        if (current_plot.isComplete_East_20m_Height_Gap === true){
          $scope.height_gap_status_img_src = icon_green_checkmark
        } else {
          $scope.height_gap_status_img_src = icon_empty_checkmark
        }
      }
      if (current_transect.trim().toUpperCase() === 'EAST' && current_segment.trim().toUpperCase() === '25M'){
        if (current_plot.isComplete_East_25m === true){
          $scope.cover_status_img_src = icon_green_checkmark
        } else {
          $scope.cover_status_img_src = icon_empty_checkmark
        }
        if (current_plot.isComplete_East_25m_Height_Gap === true){
          $scope.height_gap_status_img_src = icon_green_checkmark
        } else {
          $scope.height_gap_status_img_src = icon_empty_checkmark
        }
      }


      /* WEST */
      if (current_transect.trim().toUpperCase() === 'WEST' && current_segment.trim().toUpperCase() === '5M'){
        if (current_plot.isComplete_West_5m === true){
          $scope.cover_status_img_src = icon_green_checkmark
        } else {
          $scope.cover_status_img_src = icon_empty_checkmark
        }
        if (current_plot.isComplete_West_5m_Height_Gap === true){
          $scope.height_gap_status_img_src = icon_green_checkmark
        } else {
          $scope.height_gap_status_img_src = icon_empty_checkmark
        }
      }
      if (current_transect.trim().toUpperCase() === 'WEST' && current_segment.trim().toUpperCase() === '10M'){
        if (current_plot.isComplete_West_10m === true){
          $scope.cover_status_img_src = icon_green_checkmark
        } else {
          $scope.cover_status_img_src = icon_empty_checkmark
        }
        if (current_plot.isComplete_West_10m_Height_Gap === true){
          $scope.height_gap_status_img_src = icon_green_checkmark
        } else {
          $scope.height_gap_status_img_src = icon_empty_checkmark
        }
      }
      if (current_transect.trim().toUpperCase() === 'WEST' && current_segment.trim().toUpperCase() === '15M'){
        if (current_plot.isComplete_West_15m === true){
          $scope.cover_status_img_src = icon_green_checkmark
        } else {
          $scope.cover_status_img_src = icon_empty_checkmark
        }
        if (current_plot.isComplete_West_15m_Height_Gap === true){
          $scope.height_gap_status_img_src = icon_green_checkmark
        } else {
          $scope.height_gap_status_img_src = icon_empty_checkmark
        }
      }
      if (current_transect.trim().toUpperCase() === 'WEST' && current_segment.trim().toUpperCase() === '20M'){
        if (current_plot.isComplete_West_20m === true){
          $scope.cover_status_img_src = icon_green_checkmark
        } else {
          $scope.cover_status_img_src = icon_empty_checkmark
        }
        if (current_plot.isComplete_West_20m_Height_Gap === true){
          $scope.height_gap_status_img_src = icon_green_checkmark
        } else {
          $scope.height_gap_status_img_src = icon_empty_checkmark
        }
      }
      if (current_transect.trim().toUpperCase() === 'WEST' && current_segment.trim().toUpperCase() === '25M'){
        if (current_plot.isComplete_West_25m === true){
          $scope.cover_status_img_src = icon_green_checkmark
        } else {
          $scope.cover_status_img_src = icon_empty_checkmark
        }
        if (current_plot.isComplete_West_25m_Height_Gap === true){
          $scope.height_gap_status_img_src = icon_green_checkmark
        } else {
          $scope.height_gap_status_img_src = icon_empty_checkmark
        }
      }
    }


    function consider_height_gap_status_each_transect_segment(){
      /* 20160714 - Add flag current_plot.isComplete_<direction>_<segment>_height_gap is True or false */
      /* For NORTH */
      if (current_transect.trim().toUpperCase() === 'NORTH' && current_segment.trim().toUpperCase() === '5M'){
        if (!isEmpty(tran_canopy_height)
            && !isEmpty(bo_canopy_gap)
            && !isEmpty(bo_basal_gap)
            && !isEmpty(document.getElementById('species_1').value)
            && !isEmpty(document.getElementById('species_2').value)
            && !isEmpty(document.getElementById('species_1_count').value)
            && (document.getElementById('species_1_count').value != 0)
            && (document.getElementById('species_2_count').value != 0)
            && !isEmpty(document.getElementById('species_2_count').value)){
              current_plot.isComplete_North_5m_Height_Gap = true
        } else {
          current_plot.isComplete_North_5m_Height_Gap = false
        }
      }
      if (current_transect.trim().toUpperCase() === 'NORTH' && current_segment.trim().toUpperCase() === '10M'){
        if (!isEmpty(tran_canopy_height)
            && !isEmpty(bo_canopy_gap)
            && !isEmpty(bo_basal_gap)
            && !isEmpty(document.getElementById('species_1').value)
            && !isEmpty(document.getElementById('species_2').value)
            && !isEmpty(document.getElementById('species_1_count').value)
            && (document.getElementById('species_1_count').value != 0)
            && (document.getElementById('species_2_count').value != 0)
            && !isEmpty(document.getElementById('species_2_count').value)){
              current_plot.isComplete_North_10m_Height_Gap = true
        } else {
          current_plot.isComplete_North_10m_Height_Gap = false
        }
      }
      if (current_transect.trim().toUpperCase() === 'NORTH' && current_segment.trim().toUpperCase() === '15M'){
        if (!isEmpty(tran_canopy_height)
            && !isEmpty(bo_canopy_gap)
            && !isEmpty(bo_basal_gap)
            && !isEmpty(document.getElementById('species_1').value)
            && !isEmpty(document.getElementById('species_2').value)
            && !isEmpty(document.getElementById('species_1_count').value)
            && (document.getElementById('species_1_count').value != 0)
            && (document.getElementById('species_2_count').value != 0)
            && !isEmpty(document.getElementById('species_2_count').value)){
              current_plot.isComplete_North_15m_Height_Gap = true
        } else {
          current_plot.isComplete_North_15m_Height_Gap = false
        }
      }
      if (current_transect.trim().toUpperCase() === 'NORTH' && current_segment.trim().toUpperCase() === '20M'){
        if (!isEmpty(tran_canopy_height)
            && !isEmpty(bo_canopy_gap)
            && !isEmpty(bo_basal_gap)
            && !isEmpty(document.getElementById('species_1').value)
            && !isEmpty(document.getElementById('species_2').value)
            && !isEmpty(document.getElementById('species_1_count').value)
            && (document.getElementById('species_1_count').value != 0)
            && (document.getElementById('species_2_count').value != 0)
            && !isEmpty(document.getElementById('species_2_count').value)){
              current_plot.isComplete_North_20m_Height_Gap = true
        } else {
          current_plot.isComplete_North_20m_Height_Gap = false
        }
      }
      if (current_transect.trim().toUpperCase() === 'NORTH' && current_segment.trim().toUpperCase() === '25M'){
        if (!isEmpty(tran_canopy_height)
            && !isEmpty(bo_canopy_gap)
            && !isEmpty(bo_basal_gap)
            && !isEmpty(document.getElementById('species_1').value)
            && !isEmpty(document.getElementById('species_2').value)
            && !isEmpty(document.getElementById('species_1_count').value)
            && (document.getElementById('species_1_count').value != 0)
            && (document.getElementById('species_2_count').value != 0)
            && !isEmpty(document.getElementById('species_2_count').value)){
              current_plot.isComplete_North_25m_Height_Gap = true
        } else {
          current_plot.isComplete_North_25m_Height_Gap = false
        }
      }

      /* For SOUTH */
      if (current_transect.trim().toUpperCase() === 'SOUTH' && current_segment.trim().toUpperCase() === '5M'){
        if (!isEmpty(tran_canopy_height)
            && !isEmpty(bo_canopy_gap)
            && !isEmpty(bo_basal_gap)
            && !isEmpty(document.getElementById('species_1').value)
            && !isEmpty(document.getElementById('species_2').value)
            && !isEmpty(document.getElementById('species_1_count').value)
            && (document.getElementById('species_1_count').value != 0)
            && (document.getElementById('species_2_count').value != 0)
            && !isEmpty(document.getElementById('species_2_count').value)){
              current_plot.isComplete_South_5m_Height_Gap = true
        } else {
          current_plot.isComplete_South_5m_Height_Gap = false
        }
      }
      if (current_transect.trim().toUpperCase() === 'NORTH' && current_segment.trim().toUpperCase() === '10M'){
        if (!isEmpty(tran_canopy_height)
            && !isEmpty(bo_canopy_gap)
            && !isEmpty(bo_basal_gap)
            && !isEmpty(document.getElementById('species_1').value)
            && !isEmpty(document.getElementById('species_2').value)
            && !isEmpty(document.getElementById('species_1_count').value)
            && (document.getElementById('species_1_count').value != 0)
            && (document.getElementById('species_2_count').value != 0)
            && !isEmpty(document.getElementById('species_2_count').value)){
              current_plot.isComplete_South_10m_Height_Gap = true
        } else {
          current_plot.isComplete_South_10m_Height_Gap = false
        }
      }
      if (current_transect.trim().toUpperCase() === 'SOUTH' && current_segment.trim().toUpperCase() === '15M'){
        if (!isEmpty(tran_canopy_height)
            && !isEmpty(bo_canopy_gap)
            && !isEmpty(bo_basal_gap)
            && !isEmpty(document.getElementById('species_1').value)
            && !isEmpty(document.getElementById('species_2').value)
            && !isEmpty(document.getElementById('species_1_count').value)
            && (document.getElementById('species_1_count').value != 0)
            && (document.getElementById('species_2_count').value != 0)
            && !isEmpty(document.getElementById('species_2_count').value)){
              current_plot.isComplete_South_15m_Height_Gap = true
        } else {
          current_plot.isComplete_South_15m_Height_Gap = false
        }
      }
      if (current_transect.trim().toUpperCase() === 'SOUTH' && current_segment.trim().toUpperCase() === '20M'){
        if (!isEmpty(tran_canopy_height)
            && !isEmpty(bo_canopy_gap)
            && !isEmpty(bo_basal_gap)
            && !isEmpty(document.getElementById('species_1').value)
            && !isEmpty(document.getElementById('species_2').value)
            && !isEmpty(document.getElementById('species_1_count').value)
            && (document.getElementById('species_1_count').value != 0)
            && (document.getElementById('species_2_count').value != 0)
            && !isEmpty(document.getElementById('species_2_count').value)){
              current_plot.isComplete_South_20m_Height_Gap = true
        } else {
          current_plot.isComplete_South_20m_Height_Gap = false
        }
      }
      if (current_transect.trim().toUpperCase() === 'SOUTH' && current_segment.trim().toUpperCase() === '25M'){
        if (!isEmpty(tran_canopy_height)
            && !isEmpty(bo_canopy_gap)
            && !isEmpty(bo_basal_gap)
            && !isEmpty(document.getElementById('species_1').value)
            && !isEmpty(document.getElementById('species_2').value)
            && !isEmpty(document.getElementById('species_1_count').value)
            && (document.getElementById('species_1_count').value != 0)
            && (document.getElementById('species_2_count').value != 0)
            && !isEmpty(document.getElementById('species_2_count').value)){
              current_plot.isComplete_South_25m_Height_Gap = true
        } else {
          current_plot.isComplete_South_25m_Height_Gap = false
        }
      }

      /* For EAST */
      if (current_transect.trim().toUpperCase() === 'EAST' && current_segment.trim().toUpperCase() === '5M'){
        if (!isEmpty(tran_canopy_height)
            && !isEmpty(bo_canopy_gap)
            && !isEmpty(bo_basal_gap)
            && !isEmpty(document.getElementById('species_1').value)
            && !isEmpty(document.getElementById('species_2').value)
            && !isEmpty(document.getElementById('species_1_count').value)
            && (document.getElementById('species_1_count').value != 0)
            && (document.getElementById('species_2_count').value != 0)
            && !isEmpty(document.getElementById('species_2_count').value)){

              current_plot.isComplete_East_5m_Height_Gap = true
        } else {
          current_plot.isComplete_East_5m_Height_Gap = false
        }
      }
      if (current_transect.trim().toUpperCase() === 'EAST' && current_segment.trim().toUpperCase() === '10M'){
        if (!isEmpty(tran_canopy_height)
            && !isEmpty(bo_canopy_gap)
            && !isEmpty(bo_basal_gap)
            && !isEmpty(document.getElementById('species_1').value)
            && !isEmpty(document.getElementById('species_2').value)
            && !isEmpty(document.getElementById('species_1_count').value)
            && (document.getElementById('species_1_count').value != 0)
            && (document.getElementById('species_2_count').value != 0)
            && !isEmpty(document.getElementById('species_2_count').value)){
              current_plot.isComplete_East_10m_Height_Gap = true
        } else {
          current_plot.isComplete_East_10m_Height_Gap = false
        }
      }
      if (current_transect.trim().toUpperCase() === 'EAST' && current_segment.trim().toUpperCase() === '15M'){
        if (!isEmpty(tran_canopy_height)
            && !isEmpty(bo_canopy_gap)
            && !isEmpty(bo_basal_gap)
            && !isEmpty(document.getElementById('species_1').value)
            && !isEmpty(document.getElementById('species_2').value)
            && !isEmpty(document.getElementById('species_1_count').value)
            && (document.getElementById('species_1_count').value != 0)
            && (document.getElementById('species_2_count').value != 0)
            && !isEmpty(document.getElementById('species_2_count').value)){
              current_plot.isComplete_East_15m_Height_Gap = true
        } else {
          current_plot.isComplete_East_15m_Height_Gap = false
        }
      }
      if (current_transect.trim().toUpperCase() === 'EAST' && current_segment.trim().toUpperCase() === '20M'){
        if (!isEmpty(tran_canopy_height)
            && !isEmpty(bo_canopy_gap)
            && !isEmpty(bo_basal_gap)
            && !isEmpty(document.getElementById('species_1').value)
            && !isEmpty(document.getElementById('species_2').value)
            && !isEmpty(document.getElementById('species_1_count').value)
            && (document.getElementById('species_1_count').value != 0)
            && (document.getElementById('species_2_count').value != 0)
            && !isEmpty(document.getElementById('species_2_count').value)){
              current_plot.isComplete_East_20m_Height_Gap = true
        } else {
          current_plot.isComplete_East_20m_Height_Gap = false
        }
      }
      if (current_transect.trim().toUpperCase() === 'EAST' && current_segment.trim().toUpperCase() === '25M'){
        if (!isEmpty(tran_canopy_height)
            && !isEmpty(bo_canopy_gap)
            && !isEmpty(bo_basal_gap)
            && !isEmpty(document.getElementById('species_1').value)
            && !isEmpty(document.getElementById('species_2').value)
            && !isEmpty(document.getElementById('species_1_count').value)
            && (document.getElementById('species_1_count').value != 0)
            && (document.getElementById('species_2_count').value != 0)
            && !isEmpty(document.getElementById('species_2_count').value)){
              current_plot.isComplete_East_25m_Height_Gap = true
        } else {
          current_plot.isComplete_East_25m_Height_Gap = false
        }
      }

      /* For WEST */
      if (current_transect.trim().toUpperCase() === 'WEST' && current_segment.trim().toUpperCase() === '5M'){
        if (!isEmpty(tran_canopy_height)
            && !isEmpty(bo_canopy_gap)
            && !isEmpty(bo_basal_gap)
            && !isEmpty(document.getElementById('species_1').value)
            && !isEmpty(document.getElementById('species_2').value)
            && !isEmpty(document.getElementById('species_1_count').value)
            && (document.getElementById('species_1_count').value != 0)
            && (document.getElementById('species_2_count').value != 0)
            && !isEmpty(document.getElementById('species_2_count').value)){
              current_plot.isComplete_West_5m_Height_Gap = true
        } else {
          current_plot.isComplete_West_5m_Height_Gap = false
        }
      }
      if (current_transect.trim().toUpperCase() === 'WEST' && current_segment.trim().toUpperCase() === '10M'){
        if (!isEmpty(tran_canopy_height)
            && !isEmpty(bo_canopy_gap)
            && !isEmpty(bo_basal_gap)
            && !isEmpty(document.getElementById('species_1').value)
            && !isEmpty(document.getElementById('species_2').value)
            && !isEmpty(document.getElementById('species_1_count').value)
            && (document.getElementById('species_1_count').value != 0)
            && (document.getElementById('species_2_count').value != 0)
            && !isEmpty(document.getElementById('species_2_count').value)){
              current_plot.isComplete_West_10m_Height_Gap = true
        } else {
          current_plot.isComplete_West_10m_Height_Gap = false
        }
      }
      if (current_transect.trim().toUpperCase() === 'WEST' && current_segment.trim().toUpperCase() === '15M'){
        if (!isEmpty(tran_canopy_height)
            && !isEmpty(bo_canopy_gap)
            && !isEmpty(bo_basal_gap)
            && !isEmpty(document.getElementById('species_1').value)
            && !isEmpty(document.getElementById('species_2').value)
            && !isEmpty(document.getElementById('species_1_count').value)
            && (document.getElementById('species_1_count').value != 0)
            && (document.getElementById('species_2_count').value != 0)
            && !isEmpty(document.getElementById('species_2_count').value)){
              current_plot.isComplete_West_15m_Height_Gap = true
        } else {
          current_plot.isComplete_West_15m_Height_Gap = false
        }
      }
      if (current_transect.trim().toUpperCase() === 'WEST' && current_segment.trim().toUpperCase() === '20M'){
        if (!isEmpty(tran_canopy_height)
            && !isEmpty(bo_canopy_gap)
            && !isEmpty(bo_basal_gap)
            && !isEmpty(document.getElementById('species_1').value)
            && !isEmpty(document.getElementById('species_2').value)
            && !isEmpty(document.getElementById('species_1_count').value)
            && (document.getElementById('species_1_count').value != 0)
            && (document.getElementById('species_2_count').value != 0)
            && !isEmpty(document.getElementById('species_2_count').value)){
              current_plot.isComplete_West_20m_Height_Gap = true
        } else {
          current_plot.isComplete_West_20m_Height_Gap = false
        }
      }
      if (current_transect.trim().toUpperCase() === 'WEST' && current_segment.trim().toUpperCase() === '25M'){
        if (!isEmpty(tran_canopy_height)
            && !isEmpty(bo_canopy_gap)
            && !isEmpty(bo_basal_gap)
            && !isEmpty(document.getElementById('species_1').value)
            && !isEmpty(document.getElementById('species_2').value)
            && !isEmpty(document.getElementById('species_1_count').value)
            && (document.getElementById('species_1_count').value != 0)
            && (document.getElementById('species_2_count').value != 0)
            && !isEmpty(document.getElementById('species_2_count').value)){
              current_plot.isComplete_West_25m_Height_Gap = true
        } else {
          current_plot.isComplete_West_25m_Height_Gap = false
        }
      }
      /* End Add */
    }

    function presentStatus_ViewOld_Action () {

      var transect = current_plot.land_cover_data.transect
      var numberTransect = current_plot.land_cover_data.transect.length
      for (var i = 0; i < numberTransect; i++) {
        if (!isEmpty(current_plot.dominant_woody_species)
          && isEmpty(transect[i].dominant_woody_species)) {
          transect[i].dominant_woody_species = current_plot.dominant_woody_species
        }

        if (!isEmpty(current_plot.dominant_woody_species_2)
          && isEmpty(transect[i].dominant_woody_species_2)) {
          transect[i].dominant_woody_species_2 = current_plot.dominant_woody_species_2
        }

        if (!isEmpty(current_plot.dominant_nonwoody_species)
          && isEmpty(transect[i].dominant_nonwoody_species)) {
          transect[i].dominant_nonwoody_species = current_plot.dominant_nonwoody_species
        }

        if (!isEmpty(current_plot.dominant_nonwoody_species_2)
          && isEmpty(transect[i].dominant_nonwoody_species_2)) {
          transect[i].dominant_nonwoody_species_2 = current_plot.dominant_nonwoody_species_2
        }

        if (transect[i].direction.trim().toUpperCase() == current_transect.trim().toUpperCase()) {
          if (transect[i].segment.range.trim().toUpperCase() == current_segment.trim().toUpperCase()) {
            if (!isEmpty(transect[i].species_of_interest_1)){
                $scope.species_1 = transect[i].species_of_interest_1
            } else {
                if (current_action === 'VIEW_OLD'){
                  $scope.species_1 = ''
                } else {
                  $scope.species_1 = current_plot.land_cover_data.temp_species_1_name
                }

            }

            // $scope.species_1 = transect[i].dominant_woody_species
            if (transect[i].segment.species_of_interest_1_count > 0){
              $scope.species_1_count = transect[i].segment.species_of_interest_1_count
            } else if (transect[i].segment.species_of_interest_1_count == 0
                       && transect[i].segment.flag_status_species_1_blank_zero == -1){
              $scope.species_1_count = ''
            } else if (transect[i].segment.species_of_interest_1_count == 0
                       && transect[i].segment.flag_status_species_1_blank_zero == 1){
              $scope.species_1_count = 0
            } else {
              $scope.species_1_count = ''
            }


            if (!isEmpty(transect[i].species_of_interest_2)){
                $scope.species_2 = transect[i].species_of_interest_2
            } else {
                if (current_action === 'VIEW_OLD'){
                  $scope.species_2 = ''
                } else {
                  $scope.species_2 = current_plot.land_cover_data.temp_species_2_name
                }

            }
            // $scope.species_2 = transect[i].dominant_nonwoody_species
            if (transect[i].segment.species_of_interest_2_count > 0){
              $scope.species_2_count = transect[i].segment.species_of_interest_2_count
            } else if (transect[i].segment.species_of_interest_2_count == 0
                       && transect[i].segment.flag_status_species_2_blank_zero == -1){
              $scope.species_2_count = ''
            } else if (transect[i].segment.species_of_interest_2_count == 0
                       && transect[i].segment.flag_status_species_2_blank_zero == 1){
              $scope.species_2_count = 0
            } else {
              $scope.species_2_count = ''
            }

            // console.log(transect[i].segment.basal_gap)
            if (isEmpty(transect[i].segment.basal_gap)) {
              bo_basal_gap = ''
              $scope.basal_gap_image = 'media/transect_height_gap_img/old/ic_basal_gap.png'
              $scope.no_basal_gap_image = 'media/transect_height_gap_img/old/ic_no_basal_gap.png'
            } else {
              if (transect[i].segment.basal_gap == true || transect[i].segment.basal_gap.trim().toUpperCase() == 'TRUE') {
                bo_basal_gap = 'TRUE'
                $scope.basal_gap_image = 'media/transect_height_gap_img/old/ic_basal_gap_selected.png'
                $scope.no_basal_gap_image = 'media/transect_height_gap_img/old/ic_no_basal_gap.png'
              } else if (transect[i].segment.basal_gap == false || transect[i].segment.basal_gap.trim().toUpperCase() == 'FALSE') {
                bo_basal_gap = 'FALSE'
                $scope.basal_gap_image = 'media/transect_height_gap_img/old/ic_basal_gap.png'
                $scope.no_basal_gap_image = 'media/transect_height_gap_img/old/ic_no_basal_gap_selected.png'
              } else {
                bo_basal_gap = 'FALSE'
                $scope.basal_gap_image = 'media/transect_height_gap_img/old/ic_basal_gap.png'
                $scope.no_basal_gap_image = 'media/transect_height_gap_img/old/ic_no_basal_gap_selected.png'
              }
            }

            if (isEmpty(transect[i].segment.canopy_gap)) {
              bo_canopy_gap = ''
              $scope.canopy_gap_image = 'media/transect_height_gap_img/old/ic_canopy_gap.png'
              $scope.no_canopy_gap_image = 'media/transect_height_gap_img/old/ic_no_canopy_gap.png'
            } else {
              if (transect[i].segment.canopy_gap == true || transect[i].segment.canopy_gap.trim().toUpperCase() == 'TRUE') {
                bo_canopy_gap = 'TRUE'
                $scope.canopy_gap_image = 'media/transect_height_gap_img/old/ic_canopy_gap_selected.png'
                $scope.no_canopy_gap_image = 'media/transect_height_gap_img/old/ic_no_canopy_gap.png'
              } else if (transect[i].segment.canopy_gap == false || transect[i].segment.canopy_gap.trim().toUpperCase() == 'FALSE') {
                bo_canopy_gap = 'FALSE'
                $scope.canopy_gap_image = 'media/transect_height_gap_img/old/ic_canopy_gap.png'
                $scope.no_canopy_gap_image = 'media/transect_height_gap_img/old/ic_no_canopy_gap_selected.png'
              } else {
                bo_canopy_gap = 'FALSE'
                $scope.canopy_gap_image = 'media/transect_height_gap_img/old/ic_canopy_gap.png'
                $scope.no_canopy_gap_image = 'media/transect_height_gap_img/old/ic_no_canopy_gap_selected.png'
              }
            }

            if (transect[i].segment.canopy_height.trim().toUpperCase() == '<10CM') {
              tran_canopy_height = '<10cm'
              $scope.height_smaller_10_cm_image = 'media/transect_height_gap_img/old/ic_height_01_selected.png'
              $scope.height_10_50_cm_image = 'media/transect_height_gap_img/old/ic_height_02.png'
              $scope.height_50_cm_1_m_image = 'media/transect_height_gap_img/old/ic_height_03.png'
              $scope.height_1_2_m_image = 'media/transect_height_gap_img/old/ic_height_04.png'
              $scope.height_2_3_m_image = 'media/transect_height_gap_img/old/ic_height_05.png'
              $scope.height_bigger_3_m_image = 'media/transect_height_gap_img/old/ic_height_06.png'
            } else if (transect[i].segment.canopy_height.trim().toUpperCase() == '10-50CM') {
              tran_canopy_height = '10-50cm'
              $scope.height_smaller_10_cm_image = 'media/transect_height_gap_img/old/ic_height_01.png'
              $scope.height_10_50_cm_image = 'media/transect_height_gap_img/old/ic_height_02_selected.png'
              $scope.height_50_cm_1_m_image = 'media/transect_height_gap_img/old/ic_height_03.png'
              $scope.height_1_2_m_image = 'media/transect_height_gap_img/old/ic_height_04.png'
              $scope.height_2_3_m_image = 'media/transect_height_gap_img/old/ic_height_05.png'
              $scope.height_bigger_3_m_image = 'media/transect_height_gap_img/old/ic_height_06.png'
            } else if (transect[i].segment.canopy_height.trim().toUpperCase() == '50CM-1M') {
              tran_canopy_height = '50cm-1m'
              $scope.height_smaller_10_cm_image = 'media/transect_height_gap_img/old/ic_height_01.png'
              $scope.height_10_50_cm_image = 'media/transect_height_gap_img/old/ic_height_02.png'
              $scope.height_50_cm_1_m_image = 'media/transect_height_gap_img/old/ic_height_03_selected.png'
              $scope.height_1_2_m_image = 'media/transect_height_gap_img/old/ic_height_04.png'
              $scope.height_2_3_m_image = 'media/transect_height_gap_img/old/ic_height_05.png'
              $scope.height_bigger_3_m_image = 'media/transect_height_gap_img/old/ic_height_06.png'
            } else if (transect[i].segment.canopy_height.trim().toUpperCase() == '1-2M') {
              tran_canopy_height = '1-2m'
              $scope.height_smaller_10_cm_image = 'media/transect_height_gap_img/old/ic_height_01.png'
              $scope.height_10_50_cm_image = 'media/transect_height_gap_img/old/ic_height_02.png'
              $scope.height_50_cm_1_m_image = 'media/transect_height_gap_img/old/ic_height_03.png'
              $scope.height_1_2_m_image = 'media/transect_height_gap_img/old/ic_height_04_selected.png'
              $scope.height_2_3_m_image = 'media/transect_height_gap_img/old/ic_height_05.png'
              $scope.height_bigger_3_m_image = 'media/transect_height_gap_img/old/ic_height_06.png'
            } else if (transect[i].segment.canopy_height.trim().toUpperCase() == '2-3M') {
              tran_canopy_height = '2-3m'
              $scope.height_smaller_10_cm_image = 'media/transect_height_gap_img/old/ic_height_01.png'
              $scope.height_10_50_cm_image = 'media/transect_height_gap_img/old/ic_height_02.png'
              $scope.height_50_cm_1_m_image = 'media/transect_height_gap_img/old/ic_height_03.png'
              $scope.height_1_2_m_image = 'media/transect_height_gap_img/old/ic_height_04.png'
              $scope.height_2_3_m_image = 'media/transect_height_gap_img/old/ic_height_05_selected.png'
              $scope.height_bigger_3_m_image = 'media/transect_height_gap_img/old/ic_height_06.png'
            } else if (transect[i].segment.canopy_height.trim().toUpperCase() == '>3M') {
              tran_canopy_height = '>3m'
              $scope.height_smaller_10_cm_image = 'media/transect_height_gap_img/old/ic_height_01.png'
              $scope.height_10_50_cm_image = 'media/transect_height_gap_img/old/ic_height_02.png'
              $scope.height_50_cm_1_m_image = 'media/transect_height_gap_img/old/ic_height_03.png'
              $scope.height_1_2_m_image = 'media/transect_height_gap_img/old/ic_height_04.png'
              $scope.height_2_3_m_image = 'media/transect_height_gap_img/old/ic_height_05.png'
              $scope.height_bigger_3_m_image = 'media/transect_height_gap_img/old/ic_height_06_selected.png'
            } else {
              tran_canopy_height = ''
              $scope.height_smaller_10_cm_image = 'media/transect_height_gap_img/old/ic_height_01.png'
              $scope.height_10_50_cm_image = 'media/transect_height_gap_img/old/ic_height_02.png'
              $scope.height_50_cm_1_m_image = 'media/transect_height_gap_img/old/ic_height_03.png'
              $scope.height_1_2_m_image = 'media/transect_height_gap_img/old/ic_height_04.png'
              $scope.height_2_3_m_image = 'media/transect_height_gap_img/old/ic_height_05.png'
              $scope.height_bigger_3_m_image = 'media/transect_height_gap_img/old/ic_height_06.png'
            }
          }
        }
      }
    }

    function presentStatus_AddNew_Action () {
      $scope.height_smaller_10_cm_image = 'media/transect_height_gap_img/old/ic_height_01.png'
      $scope.height_10_50_cm_image = 'media/transect_height_gap_img/old/ic_height_02.png'
      $scope.height_50_cm_1_m_image = 'media/transect_height_gap_img/old/ic_height_03.png'
      $scope.height_1_2_m_image = 'media/transect_height_gap_img/old/ic_height_04.png'
      $scope.height_2_3_m_image = 'media/transect_height_gap_img/old/ic_height_05.png'
      $scope.height_bigger_3_m_image = 'media/transect_height_gap_img/old/ic_height_06.png'

      $scope.basal_gap_image = 'media/transect_height_gap_img/old/ic_basal_gap.png'
      $scope.no_basal_gap_image = 'media/transect_height_gap_img/old/ic_no_basal_gap.png'
      $scope.canopy_gap_image = 'media/transect_height_gap_img/old/ic_canopy_gap.png'
      $scope.no_canopy_gap_image = 'media/transect_height_gap_img/old/ic_no_canopy_gap.png'

      $scope.species_1_count = ''
      $scope.species_1 = ''
      document.getElementById('species_1_count').value = ''
      $scope.species_2_count = ''
      document.getElementById('species_2_count').value = ''
      $scope.species_2 = ''
    }

    $scope.select_basal_canopy = function (item) {
      if ((current_action.trim().toUpperCase() === 'ADD_NEW')
        || (current_action.trim().toUpperCase() === 'EDIT_NEW')
        || (current_action.trim().toUpperCase() === 'ADD_OLD')
        || (current_action.trim().toUpperCase() === 'EDIT_OLD')) {
        if (item.trim().toUpperCase() == 'BASAL') {
          if ($scope.basal_gap_image === 'media/transect_height_gap_img/old/ic_basal_gap.png') {
            bo_basal_gap = 'TRUE'
            $scope.basal_gap_image = 'media/transect_height_gap_img/old/ic_basal_gap_selected.png'
            $scope.no_basal_gap_image = 'media/transect_height_gap_img/old/ic_no_basal_gap.png'
            seeToast2('Basal gap', 2000)
          } else if ($scope.basal_gap_image === 'media/transect_height_gap_img/old/ic_basal_gap_selected.png') {
            bo_basal_gap = ''
            $scope.basal_gap_image = 'media/transect_height_gap_img/old/ic_basal_gap.png'
          // $scope.no_basal_gap_image = "media/transect_height_gap_img/old/ic_no_basal_gap.png"
          }
        }
        if (item.trim().toUpperCase() == 'NO_BASAL') {
          if ($scope.no_basal_gap_image === 'media/transect_height_gap_img/old/ic_no_basal_gap.png') {
            bo_basal_gap = 'FALSE'
            $scope.basal_gap_image = 'media/transect_height_gap_img/old/ic_basal_gap.png'
            $scope.no_basal_gap_image = 'media/transect_height_gap_img/old/ic_no_basal_gap_selected.png'
            seeToast2('No basal gap', 2000)
          } else if ($scope.no_basal_gap_image === 'media/transect_height_gap_img/old/ic_no_basal_gap_selected.png') {
            bo_basal_gap = ''
            $scope.no_basal_gap_image = 'media/transect_height_gap_img/old/ic_no_basal_gap.png'
          }
        }
        if (item.trim().toUpperCase() == 'CANOPY') {
          if ($scope.canopy_gap_image === 'media/transect_height_gap_img/old/ic_canopy_gap.png') {
            bo_canopy_gap = 'TRUE'
            $scope.canopy_gap_image = 'media/transect_height_gap_img/old/ic_canopy_gap_selected.png'
            $scope.no_canopy_gap_image = 'media/transect_height_gap_img/old/ic_no_canopy_gap.png'
            seeToast2('Canopy gap', 2000)
          } else if ($scope.canopy_gap_image === 'media/transect_height_gap_img/old/ic_canopy_gap_selected.png') {
            bo_canopy_gap = ''
            $scope.canopy_gap_image = 'media/transect_height_gap_img/old/ic_canopy_gap.png'
          }
        }
        if (item.trim().toUpperCase() == 'NO_CANOPY') {
          if ($scope.no_canopy_gap_image === 'media/transect_height_gap_img/old/ic_no_canopy_gap.png') {
            bo_canopy_gap = 'FALSE'
            $scope.canopy_gap_image = 'media/transect_height_gap_img/old/ic_canopy_gap.png'
            $scope.no_canopy_gap_image = 'media/transect_height_gap_img/old/ic_no_canopy_gap_selected.png'
            seeToast2('No canopy gap', 2000)
          } else if ($scope.no_canopy_gap_image === 'media/transect_height_gap_img/old/ic_no_canopy_gap_selected.png') {
            bo_canopy_gap = ''
            $scope.no_canopy_gap_image = 'media/transect_height_gap_img/old/ic_no_canopy_gap.png'
          }
        }
      // console.log(bo_canopy_gap)
      } else {
        console.log('Lock because VIEW_OLD')
        return
      }
    }

    $scope.select_height = function (height) {
      if ((current_action.trim().toUpperCase() === 'ADD_NEW')
        || (current_action.trim().toUpperCase() === 'EDIT_NEW')
        || (current_action.trim().toUpperCase() === 'ADD_OLD')
        || (current_action.trim().toUpperCase() === 'EDIT_OLD')) {
        /* Display data */
        if (height.trim().toUpperCase() == '<10CM') {
          if ($scope.height_smaller_10_cm_image === 'media/transect_height_gap_img/old/ic_height_01.png') {
            tran_canopy_height = '<10cm'
            tran_canopy_height_in = '<4in'
            $scope.height_smaller_10_cm_image = 'media/transect_height_gap_img/old/ic_height_01_selected.png'
            $scope.height_10_50_cm_image = 'media/transect_height_gap_img/old/ic_height_02.png'
            $scope.height_50_cm_1_m_image = 'media/transect_height_gap_img/old/ic_height_03.png'
            $scope.height_1_2_m_image = 'media/transect_height_gap_img/old/ic_height_04.png'
            $scope.height_2_3_m_image = 'media/transect_height_gap_img/old/ic_height_05.png'
            $scope.height_bigger_3_m_image = 'media/transect_height_gap_img/old/ic_height_06.png'
          } else {
            tran_canopy_height = ''
            tran_canopy_height_in = ''
            $scope.height_smaller_10_cm_image = 'media/transect_height_gap_img/old/ic_height_01.png'

            $scope.height_10_50_cm_image = 'media/transect_height_gap_img/old/ic_height_02.png'
            $scope.height_50_cm_1_m_image = 'media/transect_height_gap_img/old/ic_height_03.png'
            $scope.height_1_2_m_image = 'media/transect_height_gap_img/old/ic_height_04.png'
            $scope.height_2_3_m_image = 'media/transect_height_gap_img/old/ic_height_05.png'
            $scope.height_bigger_3_m_image = 'media/transect_height_gap_img/old/ic_height_06.png'
          }
        } else if (height.trim().toUpperCase() == '10-50CM') {
          if ($scope.height_10_50_cm_image === 'media/transect_height_gap_img/old/ic_height_02.png') {
            tran_canopy_height = '10-50cm'
            tran_canopy_height_in = '4-19.7in'
            $scope.height_smaller_10_cm_image = 'media/transect_height_gap_img/old/ic_height_01.png'
            $scope.height_10_50_cm_image = 'media/transect_height_gap_img/old/ic_height_02_selected.png'
            $scope.height_50_cm_1_m_image = 'media/transect_height_gap_img/old/ic_height_03.png'
            $scope.height_1_2_m_image = 'media/transect_height_gap_img/old/ic_height_04.png'
            $scope.height_2_3_m_image = 'media/transect_height_gap_img/old/ic_height_05.png'
            $scope.height_bigger_3_m_image = 'media/transect_height_gap_img/old/ic_height_06.png'
          } else {
            tran_canopy_height = ''
            tran_canopy_height_in = ''
            $scope.height_smaller_10_cm_image = 'media/transect_height_gap_img/old/ic_height_01.png'
            $scope.height_10_50_cm_image = 'media/transect_height_gap_img/old/ic_height_02.png'
            $scope.height_50_cm_1_m_image = 'media/transect_height_gap_img/old/ic_height_03.png'
            $scope.height_1_2_m_image = 'media/transect_height_gap_img/old/ic_height_04.png'
            $scope.height_2_3_m_image = 'media/transect_height_gap_img/old/ic_height_05.png'
            $scope.height_bigger_3_m_image = 'media/transect_height_gap_img/old/ic_height_06.png'
          }
        } else if (height.trim().toUpperCase() == '50CM-1M') {
          if ($scope.height_50_cm_1_m_image === 'media/transect_height_gap_img/old/ic_height_03.png') {
            tran_canopy_height = '50cm-1m'
            tran_canopy_height_in = '19.7in-3.3ft'
            $scope.height_smaller_10_cm_image = 'media/transect_height_gap_img/old/ic_height_01.png'
            $scope.height_10_50_cm_image = 'media/transect_height_gap_img/old/ic_height_02.png'
            $scope.height_50_cm_1_m_image = 'media/transect_height_gap_img/old/ic_height_03_selected.png'
            $scope.height_1_2_m_image = 'media/transect_height_gap_img/old/ic_height_04.png'
            $scope.height_2_3_m_image = 'media/transect_height_gap_img/old/ic_height_05.png'
            $scope.height_bigger_3_m_image = 'media/transect_height_gap_img/old/ic_height_06.png'
          } else {
            tran_canopy_height = ''
            tran_canopy_height_in = ''
            $scope.height_smaller_10_cm_image = 'media/transect_height_gap_img/old/ic_height_01.png'
            $scope.height_10_50_cm_image = 'media/transect_height_gap_img/old/ic_height_02.png'
            $scope.height_50_cm_1_m_image = 'media/transect_height_gap_img/old/ic_height_03.png'
            $scope.height_1_2_m_image = 'media/transect_height_gap_img/old/ic_height_04.png'
            $scope.height_2_3_m_image = 'media/transect_height_gap_img/old/ic_height_05.png'
            $scope.height_bigger_3_m_image = 'media/transect_height_gap_img/old/ic_height_06.png'
          }
        } else if (height.trim().toUpperCase() == '1-2M') {
          if ($scope.height_1_2_m_image === 'media/transect_height_gap_img/old/ic_height_04.png') {
            tran_canopy_height = '1-2m'
            tran_canopy_height_in = '3.3ft-6.6ft'
            $scope.height_smaller_10_cm_image = 'media/transect_height_gap_img/old/ic_height_01.png'
            $scope.height_10_50_cm_image = 'media/transect_height_gap_img/old/ic_height_02.png'
            $scope.height_50_cm_1_m_image = 'media/transect_height_gap_img/old/ic_height_03.png'
            $scope.height_1_2_m_image = 'media/transect_height_gap_img/old/ic_height_04_selected.png'
            $scope.height_2_3_m_image = 'media/transect_height_gap_img/old/ic_height_05.png'
            $scope.height_bigger_3_m_image = 'media/transect_height_gap_img/old/ic_height_06.png'
          } else {
            tran_canopy_height = ''
            tran_canopy_height_in = ''
            $scope.height_smaller_10_cm_image = 'media/transect_height_gap_img/old/ic_height_01.png'
            $scope.height_10_50_cm_image = 'media/transect_height_gap_img/old/ic_height_02.png'
            $scope.height_50_cm_1_m_image = 'media/transect_height_gap_img/old/ic_height_03.png'
            $scope.height_1_2_m_image = 'media/transect_height_gap_img/old/ic_height_04.png'
            $scope.height_2_3_m_image = 'media/transect_height_gap_img/old/ic_height_05.png'
            $scope.height_bigger_3_m_image = 'media/transect_height_gap_img/old/ic_height_06.png'
          }
        } else if (height.trim().toUpperCase() == '2-3M') {
          if ($scope.height_2_3_m_image === 'media/transect_height_gap_img/old/ic_height_05.png') {
            tran_canopy_height = '2-3m'
            tran_canopy_height_in = '6.6ft-9.8ft'
            $scope.height_smaller_10_cm_image = 'media/transect_height_gap_img/old/ic_height_01.png'
            $scope.height_10_50_cm_image = 'media/transect_height_gap_img/old/ic_height_02.png'
            $scope.height_50_cm_1_m_image = 'media/transect_height_gap_img/old/ic_height_03.png'
            $scope.height_1_2_m_image = 'media/transect_height_gap_img/old/ic_height_04.png'
            $scope.height_2_3_m_image = 'media/transect_height_gap_img/old/ic_height_05_selected.png'
            $scope.height_bigger_3_m_image = 'media/transect_height_gap_img/old/ic_height_06.png'
          } else {
            tran_canopy_height = ''
            tran_canopy_height_in = ''
            $scope.height_smaller_10_cm_image = 'media/transect_height_gap_img/old/ic_height_01.png'
            $scope.height_10_50_cm_image = 'media/transect_height_gap_img/old/ic_height_02.png'
            $scope.height_50_cm_1_m_image = 'media/transect_height_gap_img/old/ic_height_03.png'
            $scope.height_1_2_m_image = 'media/transect_height_gap_img/old/ic_height_04.png'
            $scope.height_2_3_m_image = 'media/transect_height_gap_img/old/ic_height_05.png'
            $scope.height_bigger_3_m_image = 'media/transect_height_gap_img/old/ic_height_06.png'
          }
        } else if (height.trim().toUpperCase() == '>3M') {
          if ($scope.height_bigger_3_m_image === 'media/transect_height_gap_img/old/ic_height_06.png') {
            tran_canopy_height = '>3m'
            tran_canopy_height_in = '>9.8ft'
            $scope.height_smaller_10_cm_image = 'media/transect_height_gap_img/old/ic_height_01.png'
            $scope.height_10_50_cm_image = 'media/transect_height_gap_img/old/ic_height_02.png'
            $scope.height_50_cm_1_m_image = 'media/transect_height_gap_img/old/ic_height_03.png'
            $scope.height_1_2_m_image = 'media/transect_height_gap_img/old/ic_height_04.png'
            $scope.height_2_3_m_image = 'media/transect_height_gap_img/old/ic_height_05.png'
            $scope.height_bigger_3_m_image = 'media/transect_height_gap_img/old/ic_height_06_selected.png'
          } else {
            tran_canopy_height = ''
            tran_canopy_height_in = ''
            $scope.height_smaller_10_cm_image = 'media/transect_height_gap_img/old/ic_height_01.png'
            $scope.height_10_50_cm_image = 'media/transect_height_gap_img/old/ic_height_02.png'
            $scope.height_50_cm_1_m_image = 'media/transect_height_gap_img/old/ic_height_03.png'
            $scope.height_1_2_m_image = 'media/transect_height_gap_img/old/ic_height_04.png'
            $scope.height_2_3_m_image = 'media/transect_height_gap_img/old/ic_height_05.png'
            $scope.height_bigger_3_m_image = 'media/transect_height_gap_img/old/ic_height_06.png'
          }
        }
        if (METRIC_CONFIG === UNITED_STATES_METRIC_STANDARD){
          if (!isEmpty(tran_canopy_height)) {
            seeToast2(tran_canopy_height, 2000)
          }
        } else if (METRIC_CONFIG === ENGLISH_METRIC_STANDARD) {
          if (!isEmpty(tran_canopy_height_in)) {
            seeToast2(tran_canopy_height_in, 2000)
          }
        } else {
          if (!isEmpty(tran_canopy_height)) {
            seeToast2(tran_canopy_height, 2000)
          }
        }
      } else {
        //console.log('Lock because VIEW_OLD')
        return
      }
    }

    $scope.gotoTransect_Cover = function () {
      if (current_action.trim().toUpperCase() === 'VIEW_OLD') {
        $state.go('landpks.landcover_transect_cover')
      } else {
        if (isEmpty(tran_canopy_height)) {
        }

        /* Remember species_1_name / species_2_name for all screen */
        var species_1_name = document.getElementById('species_1').value.trim()
        if (!isEmpty(species_1_name)){
          current_plot.land_cover_data.temp_species_1_name = species_1_name
        }
        var species_2_name = document.getElementById('species_2').value.trim()
        if (!isEmpty(species_2_name)){
          current_plot.land_cover_data.temp_species_2_name = species_2_name
        }

        if (!isEmpty(tran_canopy_height)) {
          if ((tran_canopy_height.trim().toUpperCase() != '<10CM')
            && (tran_canopy_height.trim().toUpperCase() != '10-50CM')
            && (tran_canopy_height.trim().toUpperCase() != '50CM-1M')
            && (tran_canopy_height.trim().toUpperCase() != '1-2M')
            && (tran_canopy_height.trim().toUpperCase() != '2-3M')
            && (tran_canopy_height.trim().toUpperCase() != '>3M')
          ) {
            var infoPopup = $ionicPopup.alert({
              title: 'Confirm',
              template: 'Please input correct canopy height'
            })
            infoPopup.then(function (res) {
              infoPopup.close()
            })
            return
          }
        }

        var obj_species_1 = document.getElementById('species_1_count').value
        if (isEmpty(obj_species_1)) {
          //document.getElementById('species_1_count').value = ''
        } else {
          if (isNaN(obj_species_1)) {
            var infoPopup = $ionicPopup.alert({
              cssClass: 'remove-title-class',
              template: 'Input count of dominant woody species is in-correct, please input possitive integer number'
            })
            infoPopup.then(function (res) {
              infoPopup.close()
            })
            return
          } else {
            var species_1_number = Number(obj_species_1)
            if (species_1_number < 0) {
              var infoPopup = $ionicPopup.alert({
                cssClass: 'remove-title-class',
                template: 'Input count of dominant woody species is in-correct, please input possitive integer number'
              })
              infoPopup.then(function (res) {
                infoPopup.close()
              })
              return
            }
            if (species_1_number % 1 != 0) {
              var infoPopup = $ionicPopup.alert({
                cssClass: 'remove-title-class',
                template: 'Input count of dominant woody species is in-correct, please input possitive integer number'
              })
              infoPopup.then(function (res) {
                infoPopup.close()
              })
              return
            }
          }
        }

        var obj_species_2 = document.getElementById('species_2_count').value
        if (isEmpty(obj_species_2)) {
          //document.getElementById('species_2_count').value = ''
        } else {
          if (isNaN(obj_species_2)) {
            var infoPopup = $ionicPopup.alert({
              cssClass: 'remove-title-class',
              template: 'Input count of dominant non-woody species is in-correct, please input possitive integer number'
            })
            infoPopup.then(function (res) {
              infoPopup.close()
            })
            return
          } else {
            var species_2_number = Number(obj_species_2)
            if (species_2_number < 0) {
              var infoPopup = $ionicPopup.alert({
                cssClass: 'remove-title-class',
                template: 'Input count of dominant non-woody species is in-correct, please input possitive integer number'
              })
              infoPopup.then(function (res) {
                infoPopup.close()
              })
              return
            }
            if (species_2_number % 1 != 0) {
              var infoPopup = $ionicPopup.alert({
                cssClass: 'remove-title-class',
                template: 'Input count of dominant non-woody species is in-correct, please input possitive integer number'
              })
              infoPopup.then(function (res) {
                infoPopup.close()
              })
              return
            }
          }
        }

        //console.log('Sure ?')
        //console.log(current_plot)
        var transect = current_plot.land_cover_data.transect
        var numberTransect = current_plot.land_cover_data.transect.length

        for (var i = 0; i < numberTransect; i++) {
          if (transect[i].direction.trim().toUpperCase() == current_transect.trim().toUpperCase()) {
            if (transect[i].segment.range.trim().toUpperCase() == current_segment.trim().toUpperCase()) {
              /* Store species 1 name */
              var species_1_name = document.getElementById('species_1').value.trim()
              if (!isEmpty(species_1_name)) {
                current_plot.land_cover_data.transect[i].species_of_interest_1 = species_1_name
              }
              /* Store species 2 name */
              var species_2_name = document.getElementById('species_2').value.trim()
              if (!isEmpty(species_2_name)) {
                current_plot.land_cover_data.transect[i].species_of_interest_2 = species_2_name
              }
              /* Store species 1 count */
              var species_1_count = document.getElementById('species_1_count').value

              if (!isEmpty(species_1_count) && !isNaN(species_1_count)) {
                current_plot.land_cover_data.transect[i].segment.species_1_density = Number(species_1_count)
                current_plot.land_cover_data.transect[i].segment.species_of_interest_1_count = Number(species_1_count)
                current_plot.land_cover_data.transect[i].segment.flag_status_species_1_blank_zero = 1
              } else {
                current_plot.land_cover_data.transect[i].segment.species_1_density = Number(0)
                current_plot.land_cover_data.transect[i].segment.flag_status_species_1_blank_zero = -1
                current_plot.land_cover_data.transect[i].segment.species_of_interest_1_count = Number(0)
              }

              /* Store species 2 count */
              var species_2_count = document.getElementById('species_2_count').value

              if (!isEmpty(species_2_count) && !isNaN(species_2_count)) {
                current_plot.land_cover_data.transect[i].segment.species_2_density = Number(species_2_count)
                current_plot.land_cover_data.transect[i].segment.species_of_interest_2_count = Number(species_2_count)
                current_plot.land_cover_data.transect[i].segment.flag_status_species_2_blank_zero = 1
              } else {
                current_plot.land_cover_data.transect[i].segment.species_2_density = Number(0)
                current_plot.land_cover_data.transect[i].segment.species_of_interest_2_count = Number(0)
                current_plot.land_cover_data.transect[i].segment.flag_status_species_2_blank_zero = -1
              }

              /* Store Canopy Height */
              if (!isEmpty(tran_canopy_height)) {
                current_plot.land_cover_data.transect[i].segment.canopy_height = tran_canopy_height
              } else {
                current_plot.land_cover_data.transect[i].segment.canopy_height = ''
              }

              /* Store Basal and Canopy */
              if (isEmpty(bo_canopy_gap)) {
                current_plot.land_cover_data.transect[i].segment.canopy_gap = ''
              } else {
                if (bo_canopy_gap === 'TRUE') {
                  current_plot.land_cover_data.transect[i].segment.canopy_gap = 'TRUE'
                } else if (bo_canopy_gap === 'FALSE') {
                  current_plot.land_cover_data.transect[i].segment.canopy_gap = 'FALSE'
                } else {
                  current_plot.land_cover_data.transect[i].segment.canopy_gap = 'FALSE'
                }
              }

              if (isEmpty(bo_basal_gap)) {
                current_plot.land_cover_data.transect[i].segment.basal_gap = ''
              } else {
                if (bo_basal_gap == 'TRUE') {
                  current_plot.land_cover_data.transect[i].segment.basal_gap = 'TRUE'
                } else if (bo_basal_gap == 'FALSE') {
                  current_plot.land_cover_data.transect[i].segment.basal_gap = 'FALSE'
                } else {
                  current_plot.land_cover_data.transect[i].segment.basal_gap = 'FALSE'
                }
              }
            }
          }
        }

        consider_height_gap_status_each_transect_segment()

        if (current_action === 'ADD_NEW' || current_action === 'EDIT_NEW') {
          window.localStorage.setItem('current_plot_data_landcover', JSON.stringify(current_plot))
        } else if (current_action === 'ADD_OLD' || current_action === 'EDIT_OLD') {
          window.localStorage.setItem('current_edit_plot_landcover', JSON.stringify(current_plot))
          full_current_plot.edit_land_cover_data = current_plot.land_cover_data
          full_current_plot.is_ADD_OLD = 'FALSE'
          full_current_plot.is_EDIT_OLD = 'TRUE'
          window.localStorage.setItem('current_plot_data_landcover', JSON.stringify(full_current_plot))
        }

        if (current_action == 'VIEW_OLD') {
          current_action = 'VIEW_OLD'
        } else if (current_action == 'ADD_NEW') {
          current_action = 'EDIT_NEW'
        } else if (current_action == 'ADD_OLD') {
          current_action = 'EDIT_OLD'
        }

        window.localStorage.setItem('current_action_landcover', current_action)
        $state.go('landpks.landcover_transect_cover')
      }
    }



    $scope.completeAddData_Transect = function () {
      //console.log("completeAddData_Transect-height")
      if (current_action.trim().toUpperCase() === 'VIEW_OLD') {

        if (current_transect == 'NORTH') {
          $state.go('landpks.landcover_north_transect')
        } else if (current_transect == 'EAST') {
          $state.go('landpks.landcover_east_transect')
        } else if (current_transect == 'SOUTH') {
          $state.go('landpks.landcover_south_transect')
        } else if (current_transect == 'WEST') {
          $state.go('landpks.landcover_west_transect')
        } else {
          $state.go('landpks.landcover_main_transect')
        }
      } else {
        //console.log(tran_canopy_height)
        if (isEmpty(tran_canopy_height)) {
          // alert("Please input canopy height !")
          // return
        }

        /* Remember species_1_name / species_2_name for all screen */
        var species_1_name = document.getElementById('species_1').value.trim()
        if (!isEmpty(species_1_name)){
          current_plot.land_cover_data.temp_species_1_name = species_1_name
        }
        var species_2_name = document.getElementById('species_2').value.trim()
        if (!isEmpty(species_2_name)){
          current_plot.land_cover_data.temp_species_2_name = species_2_name
        }

        if (!isEmpty(tran_canopy_height)) {
          if ((tran_canopy_height.trim().toUpperCase() != '<10CM')
            && (tran_canopy_height.trim().toUpperCase() != '10-50CM')
            && (tran_canopy_height.trim().toUpperCase() != '50CM-1M')
            && (tran_canopy_height.trim().toUpperCase() != '1-2M')
            && (tran_canopy_height.trim().toUpperCase() != '2-3M')
            && (tran_canopy_height.trim().toUpperCase() != '>3M')
          ) {
            alert('Please input correct canopy height')
            return
          }
        }

        var obj_species_1 = document.getElementById('species_1_count').value
        if (isEmpty(obj_species_1)) {
          //document.getElementById('species_1_count').value = ''
        } else {
          if (isNaN(obj_species_1)) {
            alert('Input count of dominant woody species is in-correct, please input possitive integer number')
            return
          } else {
            var species_1_number = Number(obj_species_1)
            if (species_1_number < 0) {
              alert('Input count of dominant woody species is in-correct, please input possitive integer number')
              return
            }
            if (species_1_number % 1 != 0) {
              alert('Input count of dominant woody species is in-correct, please input possitive integer number')
              return
            }
          }
        }

        var obj_species_2 = document.getElementById('species_2_count').value
        if (isEmpty(obj_species_2)) {
          //document.getElementById('species_2_count').value = ''
        } else {
          if (isNaN(obj_species_2)) {
            alert('Input count of dominant non-woody species is in-correct, please input possitive integer number')
            return
          } else {
            var species_2_number = Number(obj_species_2)
            if (species_2_number < 0) {
              alert('Input count of dominant non-woody species is in-correct, please input possitive integer number')
              return
            }
            if (species_2_number % 1 != 0) {
              alert('Input count of dominant non-woody species is in-correct, please input possitive integer number')
              return
            }
          }
        }

        //console.log('Sure ?')
        //console.log(current_plot)
        var transect = current_plot.land_cover_data.transect
        var numberTransect = current_plot.land_cover_data.transect.length

        for (var i = 0; i < numberTransect; i++) {
          if (transect[i].direction.trim().toUpperCase() == current_transect.trim().toUpperCase()) {
            if (transect[i].segment.range.trim().toUpperCase() == current_segment.trim().toUpperCase()) {
              /* Store species 1 name */
              var species_1_name = document.getElementById('species_1').value.trim()
              if (!isEmpty(species_1_name)) {
                current_plot.land_cover_data.transect[i].species_of_interest_1 = species_1_name
              }
              /* Store species 2 name */
              var species_2_name = document.getElementById('species_2').value.trim()
              if (!isEmpty(species_2_name)) {
                current_plot.land_cover_data.transect[i].species_of_interest_2 = species_2_name
              }
              /* Store species 1 count */
              var species_1_count = document.getElementById('species_1_count').value
              if (!isEmpty(species_1_count) && !isNaN(species_1_count)) {
                current_plot.land_cover_data.transect[i].segment.species_1_density = Number(species_1_count)
                current_plot.land_cover_data.transect[i].segment.species_of_interest_1_count = Number(species_1_count)
                current_plot.land_cover_data.transect[i].segment.flag_status_species_1_blank_zero = 1
              } else {
                current_plot.land_cover_data.transect[i].segment.species_1_density = Number(0)
                current_plot.land_cover_data.transect[i].segment.species_of_interest_1_count = Number(0)
                current_plot.land_cover_data.transect[i].segment.flag_status_species_1_blank_zero = -1
              }

              /* Store species 2 count */
              var species_2_count = document.getElementById('species_2_count').value
              if (!isEmpty(species_2_count) && !isNaN(species_2_count)) {
                current_plot.land_cover_data.transect[i].segment.species_2_density = Number(species_2_count)
                current_plot.land_cover_data.transect[i].segment.species_of_interest_2_count = Number(species_2_count)
                current_plot.land_cover_data.transect[i].segment.flag_status_species_2_blank_zero = 1
              } else {
                current_plot.land_cover_data.transect[i].segment.species_2_density = Number(0)
                current_plot.land_cover_data.transect[i].segment.species_of_interest_2_count = Number(0)
                current_plot.land_cover_data.transect[i].segment.flag_status_species_2_blank_zero = -1
              }

              /* Store Canopy Height */
              if (!isEmpty(tran_canopy_height)) {
                current_plot.land_cover_data.transect[i].segment.canopy_height = tran_canopy_height
              } else {
                current_plot.land_cover_data.transect[i].segment.canopy_height = ''
              }

              /* Store Basal and Canopy */
              if (isEmpty(bo_canopy_gap)) {
                current_plot.land_cover_data.transect[i].segment.canopy_gap = ''
              } else {
                if (bo_canopy_gap === 'TRUE') {
                  current_plot.land_cover_data.transect[i].segment.canopy_gap = 'TRUE'
                } else if (bo_canopy_gap === 'FALSE') {
                  current_plot.land_cover_data.transect[i].segment.canopy_gap = 'FALSE'
                } else {
                  current_plot.land_cover_data.transect[i].segment.canopy_gap = 'FALSE'
                }
              }

              if (isEmpty(bo_basal_gap)) {
                current_plot.land_cover_data.transect[i].segment.basal_gap = ''
              } else {
                if (bo_basal_gap === 'TRUE') {
                  current_plot.land_cover_data.transect[i].segment.basal_gap = 'TRUE'
                } else if (bo_basal_gap === 'FALSE') {
                  current_plot.land_cover_data.transect[i].segment.basal_gap = 'FALSE'
                } else {
                  current_plot.land_cover_data.transect[i].segment.basal_gap = 'FALSE'
                }
              }
            }
          }
        }

        consider_height_gap_status_each_transect_segment()

        if (current_action === 'ADD_NEW' || current_action === 'EDIT_NEW') {
          window.localStorage.setItem('current_plot_data_landcover', JSON.stringify(current_plot))
        } else if (current_action === 'ADD_OLD' || current_action === 'EDIT_OLD') {
          window.localStorage.setItem('current_edit_plot_landcover', JSON.stringify(current_plot))
          full_current_plot.edit_land_cover_data = current_plot.land_cover_data
          full_current_plot.is_ADD_OLD = 'FALSE'
          full_current_plot.is_EDIT_OLD = 'TRUE'
          window.localStorage.setItem('current_plot_data_landcover', JSON.stringify(full_current_plot))
        }
        if (current_action == 'VIEW_OLD') {
          current_action = 'VIEW_OLD'
        } else if (current_action == 'ADD_NEW') {
          current_action = 'EDIT_NEW'
        } else if (current_action === 'ADD_OLD') {
          current_action = 'EDIT_OLD'
        }

        window.localStorage.setItem('current_action_landcover', current_action)

        if (current_transect == 'NORTH') {
          $state.go('landpks.landcover_north_transect')
        } else if (current_transect == 'EAST') {
          $state.go('landpks.landcover_east_transect')
        } else if (current_transect == 'SOUTH') {
          $state.go('landpks.landcover_south_transect')
        } else if (current_transect == 'WEST') {
          $state.go('landpks.landcover_west_transect')
        } else {
          $state.go('landpks.landcover_main_transect')
        }
      }
    }

    /* Bo sung de bo default 0 */


    $ionicPlatform.registerBackButtonAction(function (event) {
      var current_page_for_back_button = window.localStorage.getItem('CURRENT_PAGE_FOR_BACK_BUTTON')
      if (current_page_for_back_button === 'LANDCOVER_TRANSECT_HEIGHT_GAP_PAGE') {
        var confirmPopup = $ionicPopup.confirm({
          cssClass: 'remove-title-class',
          template: 'Discard changes ? (hint: use Up to save).',
          cancelText: 'No',
          okText: 'Yes'
        })
        confirmPopup.then(function (res) {
          if (res) {
            window.localStorage.setItem('CURRENT_PAGE_FOR_BACK_BUTTON', 'EMPTY')
            confirmPopup.close()
            
            if (current_transect == 'NORTH') {
              $state.go('landpks.landcover_north_transect')
            } else if (current_transect == 'EAST') {
              $state.go('landpks.landcover_east_transect')
            } else if (current_transect == 'SOUTH') {
              $state.go('landpks.landcover_south_transect')
            } else if (current_transect == 'WEST') {
              $state.go('landpks.landcover_west_transect')
            } else {
              $state.go('landpks.landcover_main_transect')
            }
            return
          } else {
            //console.log('Cancel')
            return
          }
        })
        return
      } else {
        return
      }
    }, 400)
  })
  /****************************************/
  /** East Transect Controller **/
  /****************************************/
  .controller('LandCover_Transect_Cover_Ctrl', function ($scope, $state, $ionicPopup, $ionicPlatform, $ionicHistory) {
    window.localStorage.setItem('CURRENT_PAGE_FOR_BACK_BUTTON', 'LANDCOVER_TRANSECT_COVER_PAGE')

    var plot_name = window.localStorage.getItem('current_plot_name_landcover')
    var recorder_name = window.localStorage.getItem('current_email_landcover')
    var display_plot_name = window.localStorage.getItem('current_display_plot_name_landcover')
    $scope.plot_name = display_plot_name
    // var current_plot = JSON.parse(window.localStorage.getItem("current_plot_data_landcover"))
    var current_action = window.localStorage.getItem('current_action_landcover')

    var current_plot = {}
    var full_current_plot = JSON.parse(window.localStorage.getItem('current_plot_data_landcover'))
    if (isEmpty(full_current_plot.edit_land_cover_status)) {
      full_current_plot.edit_land_cover_status = {}
    }
    if (current_action == 'ADD_NEW' || current_action == 'EDIT_NEW') {
      current_plot = JSON.parse(window.localStorage.getItem('current_plot_data_landcover'))
    } else if (current_action === 'VIEW_OLD') {
      //console.log('Cover - View_PLOT-LandCover')
      current_plot = JSON.parse(window.localStorage.getItem('current_view_plot_landcover'))
    } else if (current_action === 'ADD_OLD' || current_action === 'EDIT_OLD') {
      //console.log('Cover - Edit Plot LandCover')
      current_plot = JSON.parse(window.localStorage.getItem('current_edit_plot_landcover'))
    } else {
      //console.log('ERROR')
    }

    /* Define Label based on METRICS */
    var METRIC_CONFIG = window.localStorage.getItem('GLOBAL_CONFIG_METRICS_UNITS')
    $scope.GLOBAL_METRIC_CONFIG = METRIC_CONFIG
    if (METRIC_CONFIG === UNITED_STATES_METRIC_STANDARD){
       $scope.label_10cm = '10cm'
       $scope.label_30cm = '30cm'
       $scope.label_50cm = '50cm'
       $scope.label_70cm = '70cm'
       $scope.label_90cm = '90cm'
    } else if (METRIC_CONFIG === ENGLISH_METRIC_STANDARD){
       $scope.label_10cm = '3.9in'
       $scope.label_30cm = '11.8in'
       $scope.label_50cm = '19.7in'
       $scope.label_70cm = '27.6in'
       $scope.label_90cm = '35.4in'
    } else {
       $scope.label_10cm = '10cm'
       $scope.label_30cm = '30cm'
       $scope.label_50cm = '50cm'
       $scope.label_70cm = '70cm'
       $scope.label_90cm = '90cm'
    }

    var current_transect = window.localStorage.getItem('current_transect_landcover')
    var current_segment = window.localStorage.getItem('current_segment_landcover')

    $scope.transect_direction = current_transect

    if (METRIC_CONFIG === UNITED_STATES_METRIC_STANDARD){
        $scope.segment = current_segment
    } else if (METRIC_CONFIG === ENGLISH_METRIC_STANDARD) {
        if (current_segment === '5m'){
          $scope.segment = LABEL_SEGMENT_5M_EN
        } else if (current_segment === '10m'){
          $scope.segment = LABEL_SEGMENT_10M_EN
        } else if (current_segment === '15m'){
          $scope.segment = LABEL_SEGMENT_15M_EN
        } else if (current_segment === '20m'){
          $scope.segment = LABEL_SEGMENT_20M_EN
        } else if (current_segment === '25m'){
          $scope.segment = LABEL_SEGMENT_25M_EN
        } else {
          $scope.segment = current_segment
        }
    } else {
        $scope.segment = current_segment
    }

    var stick_1_bare = false
    var stick_2_bare = false
    var stick_3_bare = false
    var stick_4_bare = false
    var stick_5_bare = false

    initPage()

    if (current_action == 'VIEW_OLD') {
      presentStatus_AddNew_Action()
      presentStatus_ViewOld_Action()
    } else if (current_action == 'ADD_NEW') {
      //console.log('Transect Cover')
      //console.log(current_plot)
      presentStatus_AddNew_Action()
    } else if (current_action == 'EDIT_NEW') {
      presentStatus_ViewOld_Action()
    } else if (current_action == 'ADD_OLD') {
      presentStatus_AddNew_Action()
    } else if (current_action == 'EDIT_OLD') {
      presentStatus_ViewOld_Action()
    } else {
    }

    function initPage () {
      $scope.stick_segment_1_bare_image = icon_bare_normal
      $scope.stick_segment_1_tree_image = icon_trees_normal
      $scope.stick_segment_1_shrub_image = icon_shrubs_normal
      $scope.stick_segment_1_sub_shrub_image = icon_sub_shrubs_normal
      $scope.stick_segment_1_plant_base_image = icon_plant_base_normal
      $scope.stick_segment_1_perennial_grass_image = icon_perennial_grasses_normal
      $scope.stick_segment_1_annual_grass_image = icon_annual_plant_normal
      $scope.stick_segment_1_herb_image = icon_herb_litter_normal
      $scope.stick_segment_1_woody_image = icon_wood_litter_normal
      $scope.stick_segment_1_rock_image = icon_rock_fragment_normal

      $scope.stick_segment_2_bare_image = icon_bare_normal
      $scope.stick_segment_2_tree_image = icon_trees_normal
      $scope.stick_segment_2_shrub_image = icon_shrubs_normal
      $scope.stick_segment_2_sub_shrub_image = icon_sub_shrubs_normal
      $scope.stick_segment_2_plant_base_image = icon_plant_base_normal
      $scope.stick_segment_2_perennial_grass_image = icon_perennial_grasses_normal
      $scope.stick_segment_2_annual_grass_image = icon_annual_plant_normal
      $scope.stick_segment_2_herb_image = icon_herb_litter_normal
      $scope.stick_segment_2_woody_image = icon_wood_litter_normal
      $scope.stick_segment_2_rock_image = icon_rock_fragment_normal

      $scope.stick_segment_3_bare_image = icon_bare_normal
      $scope.stick_segment_3_tree_image = icon_trees_normal
      $scope.stick_segment_3_shrub_image = icon_shrubs_normal
      $scope.stick_segment_3_sub_shrub_image = icon_sub_shrubs_normal
      $scope.stick_segment_3_plant_base_image = icon_plant_base_normal
      $scope.stick_segment_3_perennial_grass_image = icon_perennial_grasses_normal
      $scope.stick_segment_3_annual_grass_image = icon_annual_plant_normal
      $scope.stick_segment_3_herb_image = icon_herb_litter_normal
      $scope.stick_segment_3_woody_image = icon_wood_litter_normal
      $scope.stick_segment_3_rock_image = icon_rock_fragment_normal

      $scope.stick_segment_4_bare_image = icon_bare_normal
      $scope.stick_segment_4_tree_image = icon_trees_normal
      $scope.stick_segment_4_shrub_image = icon_shrubs_normal
      $scope.stick_segment_4_sub_shrub_image = icon_sub_shrubs_normal
      $scope.stick_segment_4_plant_base_image = icon_plant_base_normal
      $scope.stick_segment_4_perennial_grass_image = icon_perennial_grasses_normal
      $scope.stick_segment_4_annual_grass_image = icon_annual_plant_normal
      $scope.stick_segment_4_herb_image = icon_herb_litter_normal
      $scope.stick_segment_4_woody_image = icon_wood_litter_normal
      $scope.stick_segment_4_rock_image = icon_rock_fragment_normal

      $scope.stick_segment_5_bare_image = icon_bare_normal
      $scope.stick_segment_5_tree_image = icon_trees_normal
      $scope.stick_segment_5_shrub_image = icon_shrubs_normal
      $scope.stick_segment_5_sub_shrub_image = icon_sub_shrubs_normal
      $scope.stick_segment_5_plant_base_image = icon_plant_base_normal
      $scope.stick_segment_5_perennial_grass_image = icon_perennial_grasses_normal
      $scope.stick_segment_5_annual_grass_image = icon_annual_plant_normal
      $scope.stick_segment_5_herb_image = icon_herb_litter_normal
      $scope.stick_segment_5_woody_image = icon_wood_litter_normal
      $scope.stick_segment_5_rock_image = icon_rock_fragment_normal
    }

    $scope.gotoTransectHeightGap = function () {
      if (current_action.trim().toUpperCase() === 'VIEW_OLD') {
        $ionicHistory.nextViewOptions({
          disableBack: true
        });
        $state.go('landpks.landcover_transect_height_gap')
      } else {
        //console.log('Next ?')
        var transect = current_plot.land_cover_data.transect
        var numberTransect = current_plot.land_cover_data.transect.length
        for (var i = 0; i < numberTransect; i++) {
          if (transect[i].direction.trim().toUpperCase() == current_transect.trim().toUpperCase()) {
            if (transect[i].segment.range.trim().toUpperCase() == current_segment.trim().toUpperCase()) {
              if (!isEmpty(transect[i].segment.stick_segment[0].cover)
                && !isEmpty(transect[i].segment.stick_segment[1].cover)
                && !isEmpty(transect[i].segment.stick_segment[2].cover)
                && !isEmpty(transect[i].segment.stick_segment[3].cover)
                && !isEmpty(transect[i].segment.stick_segment[4].cover)) {
                if (current_transect.trim().toUpperCase() == 'NORTH') {
                  if (current_segment.trim().toUpperCase() == '5M') {
                    current_plot.isComplete_North_5m = true
                    full_current_plot.edit_land_cover_status.isComplete_North_5m = true
                  } else if (current_segment.trim().toUpperCase() == '10M') {
                    current_plot.isComplete_North_10m = true
                    full_current_plot.edit_land_cover_status.isComplete_North_10m = true
                  } else if (current_segment.trim().toUpperCase() == '15M') {
                    current_plot.isComplete_North_15m = true
                    full_current_plot.edit_land_cover_status.isComplete_North_15m = true
                  } else if (current_segment.trim().toUpperCase() == '20M') {
                    current_plot.isComplete_North_20m = true
                    full_current_plot.edit_land_cover_status.isComplete_North_20m = true
                  } else if (current_segment.trim().toUpperCase() == '25M') {
                    current_plot.isComplete_North_25m = true
                    full_current_plot.edit_land_cover_status.isComplete_North_25m = true
                  } else {
                  }
                } else if (current_transect.trim().toUpperCase() == 'SOUTH') {
                  if (current_segment.trim().toUpperCase() == '5M') {
                    current_plot.isComplete_South_5m = true
                    full_current_plot.edit_land_cover_status.isComplete_South_5m = true
                  } else if (current_segment.trim().toUpperCase() == '10M') {
                    current_plot.isComplete_South_10m = true
                    full_current_plot.edit_land_cover_status.isComplete_South_10m = true
                  } else if (current_segment.trim().toUpperCase() == '15M') {
                    current_plot.isComplete_South_15m = true
                    full_current_plot.edit_land_cover_status.isComplete_South_15m = true
                  } else if (current_segment.trim().toUpperCase() == '20M') {
                    current_plot.isComplete_South_20m = true
                    full_current_plot.edit_land_cover_status.isComplete_South_20m = true
                  } else if (current_segment.trim().toUpperCase() == '25M') {
                    current_plot.isComplete_South_25m = true
                    full_current_plot.edit_land_cover_status.isComplete_South_25m = true
                  } else {
                  }
                } else if (current_transect.trim().toUpperCase() == 'EAST') {
                  if (current_segment.trim().toUpperCase() == '5M') {
                    current_plot.isComplete_East_5m = true
                    full_current_plot.edit_land_cover_status.isComplete_East_5m = true
                  } else if (current_segment.trim().toUpperCase() == '10M') {
                    current_plot.isComplete_East_10m = true
                    full_current_plot.edit_land_cover_status.isComplete_East_10m = true
                  } else if (current_segment.trim().toUpperCase() == '15M') {
                    current_plot.isComplete_East_15m = true
                    full_current_plot.edit_land_cover_status.isComplete_East_15m = true
                  } else if (current_segment.trim().toUpperCase() == '20M') {
                    current_plot.isComplete_East_20m = true
                    full_current_plot.edit_land_cover_status.isComplete_East_20m = true
                  } else if (current_segment.trim().toUpperCase() == '25M') {
                    current_plot.isComplete_East_25m = true
                    full_current_plot.edit_land_cover_status.isComplete_East_25m = true
                  } else {
                  }
                } else if (current_transect.trim().toUpperCase() == 'WEST') {
                  if (current_segment.trim().toUpperCase() == '5M') {
                    current_plot.isComplete_West_5m = true
                    full_current_plot.edit_land_cover_status.isComplete_West_5m = true
                  } else if (current_segment.trim().toUpperCase() == '10M') {
                    current_plot.isComplete_West_10m = true
                    full_current_plot.edit_land_cover_status.isComplete_West_10m = true
                  } else if (current_segment.trim().toUpperCase() == '15M') {
                    current_plot.isComplete_West_15m = true
                    full_current_plot.edit_land_cover_status.isComplete_West_15m = true
                  } else if (current_segment.trim().toUpperCase() == '20M') {
                    current_plot.isComplete_West_20m = true
                    full_current_plot.edit_land_cover_status.isComplete_West_20m = true
                  } else if (current_segment.trim().toUpperCase() == '25M') {
                    current_plot.isComplete_West_25m = true
                    full_current_plot.edit_land_cover_status.isComplete_West_25m = true
                  } else {
                  }
                } else {
                }
              } else {
                if (current_transect.trim().toUpperCase() == 'NORTH') {
                  if (current_segment.trim().toUpperCase() == '5M') {
                    current_plot.isComplete_North_5m = false
                    full_current_plot.edit_land_cover_status.isComplete_North_5m = false
                  } else if (current_segment.trim().toUpperCase() == '10M') {
                    current_plot.isComplete_North_10m = false
                    full_current_plot.edit_land_cover_status.isComplete_North_10m = false
                  } else if (current_segment.trim().toUpperCase() == '15M') {
                    current_plot.isComplete_North_15m = false
                    full_current_plot.edit_land_cover_status.isComplete_North_15m = false
                  } else if (current_segment.trim().toUpperCase() == '20M') {
                    current_plot.isComplete_North_20m = false
                    full_current_plot.edit_land_cover_status.isComplete_North_20m = false
                  } else if (current_segment.trim().toUpperCase() == '25M') {
                    current_plot.isComplete_North_25m = false
                    full_current_plot.edit_land_cover_status.isComplete_North_25m = false
                  } else {
                  }
                } else if (current_transect.trim().toUpperCase() == 'SOUTH') {
                  if (current_segment.trim().toUpperCase() == '5M') {
                    current_plot.isComplete_South_5m = false
                    full_current_plot.edit_land_cover_status.isComplete_South_5m = false
                  } else if (current_segment.trim().toUpperCase() == '10M') {
                    current_plot.isComplete_South_10m = false
                    full_current_plot.edit_land_cover_status.isComplete_South_10m = false
                  } else if (current_segment.trim().toUpperCase() == '15M') {
                    current_plot.isComplete_South_15m = false
                    full_current_plot.edit_land_cover_status.isComplete_South_15m = false
                  } else if (current_segment.trim().toUpperCase() == '20M') {
                    current_plot.isComplete_South_20m = false
                    full_current_plot.edit_land_cover_status.isComplete_South_20m = false
                  } else if (current_segment.trim().toUpperCase() == '25M') {
                    current_plot.isComplete_South_25m = false
                    full_current_plot.edit_land_cover_status.isComplete_South_25m = false
                  } else {
                  }
                } else if (current_transect.trim().toUpperCase() == 'EAST') {
                  if (current_segment.trim().toUpperCase() == '5M') {
                    current_plot.isComplete_East_5m = false
                    full_current_plot.edit_land_cover_status.isComplete_East_5m = false
                  } else if (current_segment.trim().toUpperCase() == '10M') {
                    current_plot.isComplete_East_10m = false
                    full_current_plot.edit_land_cover_status.isComplete_East_10m = false
                  } else if (current_segment.trim().toUpperCase() == '15M') {
                    current_plot.isComplete_East_15m = false
                    full_current_plot.edit_land_cover_status.isComplete_East_15m = false
                  } else if (current_segment.trim().toUpperCase() == '20M') {
                    current_plot.isComplete_East_20m = false
                    full_current_plot.edit_land_cover_status.isComplete_East_20m = false
                  } else if (current_segment.trim().toUpperCase() == '25M') {
                    current_plot.isComplete_East_25m = false
                    full_current_plot.edit_land_cover_status.isComplete_East_25m = false
                  } else {
                  }
                } else if (current_transect.trim().toUpperCase() == 'WEST') {
                  if (current_segment.trim().toUpperCase() == '5M') {
                    current_plot.isComplete_West_5m = false
                    full_current_plot.edit_land_cover_status.isComplete_West_5m = false
                  } else if (current_segment.trim().toUpperCase() == '10M') {
                    current_plot.isComplete_West_10m = false
                    full_current_plot.edit_land_cover_status.isComplete_West_10m = false
                  } else if (current_segment.trim().toUpperCase() == '15M') {
                    current_plot.isComplete_West_15m = false
                    full_current_plot.edit_land_cover_status.isComplete_West_15m = false
                  } else if (current_segment.trim().toUpperCase() == '20M') {
                    current_plot.isComplete_West_20m = false
                    full_current_plot.edit_land_cover_status.isComplete_West_20m = false
                  } else if (current_segment.trim().toUpperCase() == '25M') {
                    current_plot.isComplete_West_25m = false
                    full_current_plot.edit_land_cover_status.isComplete_West_25m = false
                  } else {
                  }
                } else {
                }
              }
            }
          }
        }
        if (current_action === 'ADD_NEW' || current_action === 'EDIT_NEW') {
          window.localStorage.setItem('current_plot_data_landcover', JSON.stringify(current_plot))
        } else if (current_action === 'ADD_OLD' || current_action === 'EDIT_OLD') {
          window.localStorage.setItem('current_edit_plot_landcover', JSON.stringify(current_plot))
          full_current_plot.edit_land_cover_data = current_plot.land_cover_data
          full_current_plot.is_ADD_OLD = 'FALSE'
          full_current_plot.is_EDIT_OLD = 'TRUE'
          window.localStorage.setItem('current_plot_data_landcover', JSON.stringify(full_current_plot))
        }

        if (current_action == 'VIEW_OLD') {
          current_action = 'VIEW_OLD'
        } else if (current_action == 'ADD_NEW') {
          current_action = 'EDIT_NEW'
        } else if (current_action === 'ADD_OLD') {
          current_action = 'EDIT_OLD'
        }

        window.localStorage.setItem('current_action_landcover', current_action)
        $ionicHistory.nextViewOptions({
          disableBack: true
        });
        $state.go('landpks.landcover_transect_height_gap')
      }
    }

    function validHeighGap (segment) {
      if (!isEmpty(segment.canopy_height)) {
        /*
        if ((segment.canopy_height.trim().toUpperCase() == "<10CM")
        		|| (segment.canopy_height.trim().toUpperCase() == "10-50CM")
        		|| (segment.canopy_height.trim().toUpperCase() == "50CM-1M")
        		|| (segment.canopy_height.trim().toUpperCase() == "1-2M")
        		|| (segment.canopy_height.trim().toUpperCase() == "2-3M")
        		|| (segment.canopy_height.trim().toUpperCase() == ">3M")
        		){
        	if (!isEmpty(segment.canopy_gap)
        			&& !isEmpty(segment.basal_gap)
        			&& !isEmpty(segment.species_of_interest_1_count)
        			&& !isEmpty(segment.species_of_interest_2_count)
        			){
        		return true
        	} else {
        		return false
        	}
        } else {
        	return false
        }
        */
        return true
      } else {
        return true
      }
    }

    $scope.completeAddData_Transect = function () {
      //console.log("completeAddData_Transect-cover")
      if (current_action.trim().toUpperCase() === 'VIEW_OLD') {

        if (current_transect == 'NORTH') {
          $state.go('landpks.landcover_north_transect')
        } else if (current_transect == 'EAST') {
          $state.go('landpks.landcover_east_transect')
        } else if (current_transect == 'SOUTH') {
          $state.go('landpks.landcover_south_transect')
        } else if (current_transect == 'WEST') {
          $state.go('landpks.landcover_west_transect')
        } else {
          $state.go('landpks.landcover_main_transect')
        }
      } else {
        //console.log('Sure ?')
        var transect = current_plot.land_cover_data.transect
        var numberTransect = current_plot.land_cover_data.transect.length
        for (var i = 0; i < numberTransect; i++) {
          if (transect[i].direction.trim().toUpperCase() == current_transect.trim().toUpperCase()) {
            if (transect[i].segment.range.trim().toUpperCase() == current_segment.trim().toUpperCase()) {
              if (!isEmpty(transect[i].segment.stick_segment[0].cover)
                && !isEmpty(transect[i].segment.stick_segment[1].cover)
                && !isEmpty(transect[i].segment.stick_segment[2].cover)
                && !isEmpty(transect[i].segment.stick_segment[3].cover)
                && !isEmpty(transect[i].segment.stick_segment[4].cover)
                && validHeighGap(transect[i].segment)) {
                if (current_transect.trim().toUpperCase() == 'NORTH') {
                  if (current_segment.trim().toUpperCase() == '5M') {
                    current_plot.isComplete_North_5m = true
                    full_current_plot.edit_land_cover_status.isComplete_North_5m = true
                  // console.log(full_current_plot.edit_land_cover_status)
                  } else if (current_segment.trim().toUpperCase() == '10M') {
                    current_plot.isComplete_North_10m = true
                    full_current_plot.edit_land_cover_status.isComplete_North_10m = true
                  // console.log(full_current_plot.edit_land_cover_status)
                  } else if (current_segment.trim().toUpperCase() == '15M') {
                    current_plot.isComplete_North_15m = true
                    full_current_plot.edit_land_cover_status.isComplete_North_15m = true
                  // console.log(full_current_plot.edit_land_cover_status)
                  } else if (current_segment.trim().toUpperCase() == '20M') {
                    current_plot.isComplete_North_20m = true
                    full_current_plot.edit_land_cover_status.isComplete_North_20m = true
                  } else if (current_segment.trim().toUpperCase() == '25M') {
                    current_plot.isComplete_North_25m = true
                    full_current_plot.edit_land_cover_status.isComplete_North_25m = true
                  } else {
                  }
                } else if (current_transect.trim().toUpperCase() == 'SOUTH') {
                  if (current_segment.trim().toUpperCase() == '5M') {
                    current_plot.isComplete_South_5m = true
                    full_current_plot.edit_land_cover_status.isComplete_South_5m = true
                  } else if (current_segment.trim().toUpperCase() == '10M') {
                    current_plot.isComplete_South_10m = true
                    full_current_plot.edit_land_cover_status.isComplete_South_10m = true
                  } else if (current_segment.trim().toUpperCase() == '15M') {
                    current_plot.isComplete_South_15m = true
                    full_current_plot.edit_land_cover_status.isComplete_South_15m = true
                  } else if (current_segment.trim().toUpperCase() == '20M') {
                    current_plot.isComplete_South_20m = true
                    full_current_plot.edit_land_cover_status.isComplete_South_20m = true
                  } else if (current_segment.trim().toUpperCase() == '25M') {
                    current_plot.isComplete_South_25m = true
                    full_current_plot.edit_land_cover_status.isComplete_South_25m = true
                  } else {
                  }
                } else if (current_transect.trim().toUpperCase() == 'EAST') {
                  if (current_segment.trim().toUpperCase() == '5M') {
                    current_plot.isComplete_East_5m = true
                    full_current_plot.edit_land_cover_status.isComplete_East_5m = true
                  } else if (current_segment.trim().toUpperCase() == '10M') {
                    current_plot.isComplete_East_10m = true
                    full_current_plot.edit_land_cover_status.isComplete_East_10m = true
                  } else if (current_segment.trim().toUpperCase() == '15M') {
                    current_plot.isComplete_East_15m = true
                    full_current_plot.edit_land_cover_status.isComplete_East_15m = true
                  } else if (current_segment.trim().toUpperCase() == '20M') {
                    current_plot.isComplete_East_20m = true
                    full_current_plot.edit_land_cover_status.isComplete_East_20m = true
                  } else if (current_segment.trim().toUpperCase() == '25M') {
                    current_plot.isComplete_East_25m = true
                    full_current_plot.edit_land_cover_status.isComplete_East_25m = true
                  } else {
                  }
                } else if (current_transect.trim().toUpperCase() == 'WEST') {
                  if (current_segment.trim().toUpperCase() == '5M') {
                    current_plot.isComplete_West_5m = true
                    full_current_plot.edit_land_cover_status.isComplete_West_5m = true
                  } else if (current_segment.trim().toUpperCase() == '10M') {
                    current_plot.isComplete_West_10m = true
                    full_current_plot.edit_land_cover_status.isComplete_West_10m = true
                  } else if (current_segment.trim().toUpperCase() == '15M') {
                    current_plot.isComplete_West_15m = true
                    full_current_plot.edit_land_cover_status.isComplete_West_15m = true
                  } else if (current_segment.trim().toUpperCase() == '20M') {
                    current_plot.isComplete_West_20m = true
                    full_current_plot.edit_land_cover_status.isComplete_West_20m = true
                  } else if (current_segment.trim().toUpperCase() == '25M') {
                    current_plot.isComplete_West_25m = true
                    full_current_plot.edit_land_cover_status.isComplete_West_25m = true
                  } else {
                  }
                } else {
                }
              } else {
                if (current_transect.trim().toUpperCase() == 'NORTH') {
                  if (current_segment.trim().toUpperCase() == '5M') {
                    current_plot.isComplete_North_5m = false
                    full_current_plot.edit_land_cover_status.isComplete_North_5m = false
                  } else if (current_segment.trim().toUpperCase() == '10M') {
                    current_plot.isComplete_North_10m = false
                    full_current_plot.edit_land_cover_status.isComplete_North_10m = false
                  } else if (current_segment.trim().toUpperCase() == '15M') {
                    current_plot.isComplete_North_15m = false
                    full_current_plot.edit_land_cover_status.isComplete_North_15m = false
                  } else if (current_segment.trim().toUpperCase() == '20M') {
                    current_plot.isComplete_North_20m = false
                    full_current_plot.edit_land_cover_status.isComplete_North_20m = false
                  } else if (current_segment.trim().toUpperCase() == '25M') {
                    current_plot.isComplete_North_25m = false
                    full_current_plot.edit_land_cover_status.isComplete_North_25m = false
                  } else {
                  }
                } else if (current_transect.trim().toUpperCase() == 'SOUTH') {
                  if (current_segment.trim().toUpperCase() == '5M') {
                    current_plot.isComplete_South_5m = false
                    full_current_plot.edit_land_cover_status.isComplete_South_5m = false
                  } else if (current_segment.trim().toUpperCase() == '10M') {
                    current_plot.isComplete_South_10m = false
                    full_current_plot.edit_land_cover_status.isComplete_South_10m = false
                  } else if (current_segment.trim().toUpperCase() == '15M') {
                    current_plot.isComplete_South_15m = false
                    full_current_plot.edit_land_cover_status.isComplete_South_15m = false
                  } else if (current_segment.trim().toUpperCase() == '20M') {
                    current_plot.isComplete_South_20m = false
                    full_current_plot.edit_land_cover_status.isComplete_South_20m = false
                  } else if (current_segment.trim().toUpperCase() == '25M') {
                    current_plot.isComplete_South_25m = false
                    full_current_plot.edit_land_cover_status.isComplete_South_25m = false
                  } else {
                  }
                } else if (current_transect.trim().toUpperCase() == 'EAST') {
                  if (current_segment.trim().toUpperCase() == '5M') {
                    current_plot.isComplete_East_5m = false
                    full_current_plot.edit_land_cover_status.isComplete_East_5m = false
                  } else if (current_segment.trim().toUpperCase() == '10M') {
                    current_plot.isComplete_East_10m = false
                    full_current_plot.edit_land_cover_status.isComplete_East_10m = false
                  } else if (current_segment.trim().toUpperCase() == '15M') {
                    current_plot.isComplete_East_15m = false
                    full_current_plot.edit_land_cover_status.isComplete_East_15m = false
                  } else if (current_segment.trim().toUpperCase() == '20M') {
                    current_plot.isComplete_East_20m = false
                    full_current_plot.edit_land_cover_status.isComplete_East_20m = false
                  } else if (current_segment.trim().toUpperCase() == '25M') {
                    current_plot.isComplete_East_25m = false
                    full_current_plot.edit_land_cover_status.isComplete_East_25m = false
                  } else {
                  }
                } else if (current_transect.trim().toUpperCase() == 'WEST') {
                  if (current_segment.trim().toUpperCase() == '5M') {
                    current_plot.isComplete_West_5m = false
                    full_current_plot.edit_land_cover_status.isComplete_West_5m = false
                  } else if (current_segment.trim().toUpperCase() == '10M') {
                    current_plot.isComplete_West_10m = false
                    full_current_plot.edit_land_cover_status.isComplete_West_10m = false
                  } else if (current_segment.trim().toUpperCase() == '15M') {
                    current_plot.isComplete_West_15m = false
                    full_current_plot.edit_land_cover_status.isComplete_West_15m = false
                  } else if (current_segment.trim().toUpperCase() == '20M') {
                    current_plot.isComplete_West_20m = false
                    full_current_plot.edit_land_cover_status.isComplete_West_20m = false
                  } else if (current_segment.trim().toUpperCase() == '25M') {
                    current_plot.isComplete_West_25m = false
                    full_current_plot.edit_land_cover_status.isComplete_West_25m = false
                  } else {
                  }
                } else {
                }
              }
            }
          }
        }
        if (current_action === 'ADD_NEW' || current_action === 'EDIT_NEW') {
          window.localStorage.setItem('current_plot_data_landcover', JSON.stringify(current_plot))
        } else if (current_action === 'ADD_OLD' || current_action === 'EDIT_OLD') {
          window.localStorage.setItem('current_edit_plot_landcover', JSON.stringify(current_plot))
          full_current_plot.edit_land_cover_data = current_plot.land_cover_data
          full_current_plot.is_ADD_OLD = 'FALSE'
          full_current_plot.is_EDIT_OLD = 'TRUE'
          window.localStorage.setItem('current_plot_data_landcover', JSON.stringify(full_current_plot))
        }

        if (current_action == 'VIEW_OLD') {
          current_action = 'VIEW_OLD'
        } else if (current_action == 'ADD_NEW') {
          current_action = 'EDIT_NEW'
        } else if (current_action == 'ADD_OLD') {
          current_action = 'EDIT_OLD'
        }

        window.localStorage.setItem('current_action_landcover', current_action)

        if (current_transect == 'NORTH') {
          $state.go('landpks.landcover_north_transect')
        } else if (current_transect == 'EAST') {
          $state.go('landpks.landcover_east_transect')
        } else if (current_transect == 'SOUTH') {
          $state.go('landpks.landcover_south_transect')
        } else if (current_transect == 'WEST') {
          $state.go('landpks.landcover_west_transect')
        } else {
          $state.go('landpks.landcover_main_transect')
        }
      }
    }

    function setUp_Ticker(){
      /* For Cover */
      /* NORTH */
      if (current_transect.trim().toUpperCase() === 'NORTH' && current_segment.trim().toUpperCase() === '5M'){
        if (current_plot.isComplete_North_5m === true){
          $scope.cover_status_img_src = icon_green_checkmark
        } else {
          $scope.cover_status_img_src = icon_empty_checkmark
        }
        if (current_plot.isComplete_North_5m_Height_Gap === true){
          $scope.height_gap_status_img_src = icon_green_checkmark
        } else {
          $scope.height_gap_status_img_src = icon_empty_checkmark
        }
      }
      if (current_transect.trim().toUpperCase() === 'NORTH' && current_segment.trim().toUpperCase() === '10M'){
        if (current_plot.isComplete_North_10m === true){
          $scope.cover_status_img_src = icon_green_checkmark
        } else {
          $scope.cover_status_img_src = icon_empty_checkmark
        }
        if (current_plot.isComplete_North_10m_Height_Gap === true){
          $scope.height_gap_status_img_src = icon_green_checkmark
        } else {
          $scope.height_gap_status_img_src = icon_empty_checkmark
        }
      }
      if (current_transect.trim().toUpperCase() === 'NORTH' && current_segment.trim().toUpperCase() === '15M'){
        if (current_plot.isComplete_North_15m === true){
          $scope.cover_status_img_src = icon_green_checkmark
        } else {
          $scope.cover_status_img_src = icon_empty_checkmark
        }
        if (current_plot.isComplete_North_15m_Height_Gap === true){
          $scope.height_gap_status_img_src = icon_green_checkmark
        } else {
          $scope.height_gap_status_img_src = icon_empty_checkmark
        }
      }
      if (current_transect.trim().toUpperCase() === 'NORTH' && current_segment.trim().toUpperCase() === '20M'){
        if (current_plot.isComplete_North_20m === true){
          $scope.cover_status_img_src = icon_green_checkmark
        } else {
          $scope.cover_status_img_src = icon_empty_checkmark
        }
        if (current_plot.isComplete_North_20m_Height_Gap === true){
          $scope.height_gap_status_img_src = icon_green_checkmark
        } else {
          $scope.height_gap_status_img_src = icon_empty_checkmark
        }
      }
      if (current_transect.trim().toUpperCase() === 'NORTH' && current_segment.trim().toUpperCase() === '25M'){
        if (current_plot.isComplete_North_25m === true){
          $scope.cover_status_img_src = icon_green_checkmark
        } else {
          $scope.cover_status_img_src = icon_empty_checkmark
        }
        if (current_plot.isComplete_North_25m_Height_Gap === true){
          $scope.height_gap_status_img_src = icon_green_checkmark
        } else {
          $scope.height_gap_status_img_src = icon_empty_checkmark
        }
      }

      /* SOUTH */
      if (current_transect.trim().toUpperCase() === 'SOUTH' && current_segment.trim().toUpperCase() === '5M'){
        if (current_plot.isComplete_South_5m === true){
          $scope.cover_status_img_src = icon_green_checkmark
        } else {
          $scope.cover_status_img_src = icon_empty_checkmark
        }
        if (current_plot.isComplete_South_5m_Height_Gap === true){
          $scope.height_gap_status_img_src = icon_green_checkmark
        } else {
          $scope.height_gap_status_img_src = icon_empty_checkmark
        }
      }
      if (current_transect.trim().toUpperCase() === 'SOUTH' && current_segment.trim().toUpperCase() === '10M'){
        if (current_plot.isComplete_South_10m === true){
          $scope.cover_status_img_src = icon_green_checkmark
        } else {
          $scope.cover_status_img_src = icon_empty_checkmark
        }
        if (current_plot.isComplete_South_10m_Height_Gap === true){
          $scope.height_gap_status_img_src = icon_green_checkmark
        } else {
          $scope.height_gap_status_img_src = icon_empty_checkmark
        }
      }
      if (current_transect.trim().toUpperCase() === 'SOUTH' && current_segment.trim().toUpperCase() === '15M'){
        if (current_plot.isComplete_South_15m === true){
          $scope.cover_status_img_src = icon_green_checkmark
        } else {
          $scope.cover_status_img_src = icon_empty_checkmark
        }
        if (current_plot.isComplete_South_15m_Height_Gap === true){
          $scope.height_gap_status_img_src = icon_green_checkmark
        } else {
          $scope.height_gap_status_img_src = icon_empty_checkmark
        }
      }
      if (current_transect.trim().toUpperCase() === 'SOUTH' && current_segment.trim().toUpperCase() === '20M'){
        if (current_plot.isComplete_South_20m === true){
          $scope.cover_status_img_src = icon_green_checkmark
        } else {
          $scope.cover_status_img_src = icon_empty_checkmark
        }
        if (current_plot.isComplete_South_20m_Height_Gap === true){
          $scope.height_gap_status_img_src = icon_green_checkmark
        } else {
          $scope.height_gap_status_img_src = icon_empty_checkmark
        }
      }
      if (current_transect.trim().toUpperCase() === 'SOUTH' && current_segment.trim().toUpperCase() === '25M'){
        if (current_plot.isComplete_South_25m === true){
          $scope.cover_status_img_src = icon_green_checkmark
        } else {
          $scope.cover_status_img_src = icon_empty_checkmark
        }
        if (current_plot.isComplete_South_25m_Height_Gap === true){
          $scope.height_gap_status_img_src = icon_green_checkmark
        } else {
          $scope.height_gap_status_img_src = icon_empty_checkmark
        }
      }


      /* EAST */
      if (current_transect.trim().toUpperCase() === 'EAST' && current_segment.trim().toUpperCase() === '5M'){
        if (current_plot.isComplete_East_5m === true){
          $scope.cover_status_img_src = icon_green_checkmark
        } else {
          $scope.cover_status_img_src = icon_empty_checkmark
        }
        if (current_plot.isComplete_East_5m_Height_Gap === true){
          $scope.height_gap_status_img_src = icon_green_checkmark
        } else {
          $scope.height_gap_status_img_src = icon_empty_checkmark
        }
      }
      if (current_transect.trim().toUpperCase() === 'EAST' && current_segment.trim().toUpperCase() === '10M'){
        if (current_plot.isComplete_East_10m === true){
          $scope.cover_status_img_src = icon_green_checkmark
        } else {
          $scope.cover_status_img_src = icon_empty_checkmark
        }
        if (current_plot.isComplete_East_10m_Height_Gap === true){
          $scope.height_gap_status_img_src = icon_green_checkmark
        } else {
          $scope.height_gap_status_img_src = icon_empty_checkmark
        }
      }
      if (current_transect.trim().toUpperCase() === 'EAST' && current_segment.trim().toUpperCase() === '15M'){
        if (current_plot.isComplete_East_15m === true){
          $scope.cover_status_img_src = icon_green_checkmark
        } else {
          $scope.cover_status_img_src = icon_empty_checkmark
        }
        if (current_plot.isComplete_East_15m_Height_Gap === true){
          $scope.height_gap_status_img_src = icon_green_checkmark
        } else {
          $scope.height_gap_status_img_src = icon_empty_checkmark
        }
      }
      if (current_transect.trim().toUpperCase() === 'EAST' && current_segment.trim().toUpperCase() === '20M'){
        if (current_plot.isComplete_East_20m === true){
          $scope.cover_status_img_src = icon_green_checkmark
        } else {
          $scope.cover_status_img_src = icon_empty_checkmark
        }
        if (current_plot.isComplete_East_20m_Height_Gap === true){
          $scope.height_gap_status_img_src = icon_green_checkmark
        } else {
          $scope.height_gap_status_img_src = icon_empty_checkmark
        }
      }
      if (current_transect.trim().toUpperCase() === 'EAST' && current_segment.trim().toUpperCase() === '25M'){
        if (current_plot.isComplete_East_25m === true){
          $scope.cover_status_img_src = icon_green_checkmark
        } else {
          $scope.cover_status_img_src = icon_empty_checkmark
        }
        if (current_plot.isComplete_East_25m_Height_Gap === true){
          $scope.height_gap_status_img_src = icon_green_checkmark
        } else {
          $scope.height_gap_status_img_src = icon_empty_checkmark
        }
      }


      /* WEST */
      if (current_transect.trim().toUpperCase() === 'WEST' && current_segment.trim().toUpperCase() === '5M'){
        if (current_plot.isComplete_West_5m === true){
          $scope.cover_status_img_src = icon_green_checkmark
        } else {
          $scope.cover_status_img_src = icon_empty_checkmark
        }
        if (current_plot.isComplete_West_5m_Height_Gap === true){
          $scope.height_gap_status_img_src = icon_green_checkmark
        } else {
          $scope.height_gap_status_img_src = icon_empty_checkmark
        }
      }
      if (current_transect.trim().toUpperCase() === 'WEST' && current_segment.trim().toUpperCase() === '10M'){
        if (current_plot.isComplete_West_10m === true){
          $scope.cover_status_img_src = icon_green_checkmark
        } else {
          $scope.cover_status_img_src = icon_empty_checkmark
        }
        if (current_plot.isComplete_West_10m_Height_Gap === true){
          $scope.height_gap_status_img_src = icon_green_checkmark
        } else {
          $scope.height_gap_status_img_src = icon_empty_checkmark
        }
      }
      if (current_transect.trim().toUpperCase() === 'WEST' && current_segment.trim().toUpperCase() === '15M'){
        if (current_plot.isComplete_West_15m === true){
          $scope.cover_status_img_src = icon_green_checkmark
        } else {
          $scope.cover_status_img_src = icon_empty_checkmark
        }
        if (current_plot.isComplete_West_15m_Height_Gap === true){
          $scope.height_gap_status_img_src = icon_green_checkmark
        } else {
          $scope.height_gap_status_img_src = icon_empty_checkmark
        }
      }
      if (current_transect.trim().toUpperCase() === 'WEST' && current_segment.trim().toUpperCase() === '20M'){
        if (current_plot.isComplete_West_20m === true){
          $scope.cover_status_img_src = icon_green_checkmark
        } else {
          $scope.cover_status_img_src = icon_empty_checkmark
        }
        if (current_plot.isComplete_West_20m_Height_Gap === true){
          $scope.height_gap_status_img_src = icon_green_checkmark
        } else {
          $scope.height_gap_status_img_src = icon_empty_checkmark
        }
      }
      if (current_transect.trim().toUpperCase() === 'WEST' && current_segment.trim().toUpperCase() === '25M'){
        if (current_plot.isComplete_West_25m === true){
          $scope.cover_status_img_src = icon_green_checkmark
        } else {
          $scope.cover_status_img_src = icon_empty_checkmark
        }
        if (current_plot.isComplete_West_25m_Height_Gap === true){
          $scope.height_gap_status_img_src = icon_green_checkmark
        } else {
          $scope.height_gap_status_img_src = icon_empty_checkmark
        }
      }
    }

    function presentStatus_ViewOld_Action () {
      var BARE = bare_name_normal
      var TREE = trees_name_normal
      var SHRUBS = shrubs_name_normal
      var SUB_SHRUBS = sub_shrubs_name_normal
      var PLANT_BASE = plant_base_name_normal
      var PERENNIAL = perennial_grasses_name_normal
      var ANNUAL = annual_plant_name_normal
      var HERB = herb_litter_name_normal
      var WOOD = wood_litter_name_normal
      var ROCK = rock_fragment_name_normal

      var transect = current_plot.land_cover_data.transect
      var numberTransect = current_plot.land_cover_data.transect.length
      for (var i = 0; i < numberTransect; i++) {
        if (transect[i].direction.trim().toUpperCase() == current_transect.trim().toUpperCase()) {
          if (transect[i].segment.range.trim().toUpperCase() == current_segment.trim().toUpperCase()) {
            var count_stick_segment = transect[i].segment.stick_segment.length
            //console.log(transect[i].segment.stick_segment)
            for (var j = 0; j < 5; j++) {
              var string_cover = transect[i].segment.stick_segment[j].cover.trim()
              //console.log('Catch : ' + j + ':' + string_cover)
              if (j == 0) {
                if (string_cover.indexOf(BARE) > -1) {
                  $scope.stick_segment_1_bare_image = icon_bare_selected
                  stick_1_bare = true
                  $scope.stick_segment_1_tree_image = icon_trees_disabled
                  $scope.stick_segment_1_shrub_image = icon_shrubs_disabled
                  $scope.stick_segment_1_sub_shrub_image = icon_sub_shrubs_disabled
                  $scope.stick_segment_1_plant_base_image = icon_plant_base_disabled
                  $scope.stick_segment_1_perennial_grass_image = icon_perennial_grasses_disabled
                  $scope.stick_segment_1_annual_grass_image = icon_annual_plant_disabled
                  $scope.stick_segment_1_herb_image = icon_herb_litter_disabled
                  $scope.stick_segment_1_woody_image = icon_wood_litter_disabled
                  $scope.stick_segment_1_rock_image = icon_rock_fragment_disabled
                }
                if (string_cover.indexOf(TREE) > -1) {
                  $scope.stick_segment_1_tree_image = icon_trees_selected
                }
                if (string_cover.indexOf(SHRUBS) > -1) {
                  $scope.stick_segment_1_shrub_image = icon_shrubs_selected
                }
                if (string_cover.indexOf(SUB_SHRUBS) > -1) {
                  $scope.stick_segment_1_sub_shrub_image = icon_sub_shrubs_selected
                }
                if (string_cover.indexOf(PLANT_BASE) > -1) {
                  $scope.stick_segment_1_plant_base_image = icon_plant_base_selected
                }
                if (string_cover.indexOf(PERENNIAL) > -1) {
                  $scope.stick_segment_1_perennial_grass_image = icon_perennial_grasses_selected
                }
                if (string_cover.indexOf(ANNUAL) > -1) {
                  $scope.stick_segment_1_annual_grass_image = icon_annual_plant_selected
                }
                if (string_cover.indexOf(HERB) > -1) {
                  $scope.stick_segment_1_herb_image = icon_herb_litter_selected
                }
                if (string_cover.indexOf(WOOD) > -1) {
                  $scope.stick_segment_1_woody_image = icon_wood_litter_selected
                }
                if (string_cover.indexOf(ROCK) > -1) {
                  $scope.stick_segment_1_rock_image = icon_rock_fragment_selected
                }
              }
              if (j == 1) {
                if (string_cover.indexOf(BARE) > -1) {
                  $scope.stick_segment_2_bare_image = icon_bare_selected
                  stick_2_bare = true

                  $scope.stick_segment_2_tree_image = icon_trees_disabled
                  $scope.stick_segment_2_shrub_image = icon_shrubs_disabled
                  $scope.stick_segment_2_sub_shrub_image = icon_sub_shrubs_disabled
                  $scope.stick_segment_2_plant_base_image = icon_plant_base_disabled
                  $scope.stick_segment_2_perennial_grass_image = icon_perennial_grasses_disabled
                  $scope.stick_segment_2_annual_grass_image = icon_annual_plant_disabled
                  $scope.stick_segment_2_herb_image = icon_herb_litter_disabled
                  $scope.stick_segment_2_woody_image = icon_wood_litter_disabled
                  $scope.stick_segment_2_rock_image = icon_rock_fragment_disabled
                }
                if (string_cover.indexOf(TREE) > -1) {
                  $scope.stick_segment_2_tree_image = icon_trees_selected
                }
                if (string_cover.indexOf(SHRUBS) > -1) {
                  $scope.stick_segment_2_shrub_image = icon_shrubs_selected
                }
                if (string_cover.indexOf(SUB_SHRUBS) > -1) {
                  $scope.stick_segment_2_sub_shrub_image = icon_sub_shrubs_selected
                }
                if (string_cover.indexOf(PLANT_BASE) > -1) {
                  $scope.stick_segment_2_plant_base_image = icon_plant_base_selected
                }
                if (string_cover.indexOf(PERENNIAL) > -1) {
                  $scope.stick_segment_2_perennial_grass_image = icon_perennial_grasses_selected
                }
                if (string_cover.indexOf(ANNUAL) > -1) {
                  $scope.stick_segment_2_annual_grass_image = icon_annual_plant_selected
                }
                if (string_cover.indexOf(HERB) > -1) {
                  $scope.stick_segment_2_herb_image = icon_herb_litter_selected
                }
                if (string_cover.indexOf(WOOD) > -1) {
                  $scope.stick_segment_2_woody_image = icon_wood_litter_selected
                }
                if (string_cover.indexOf(ROCK) > -1) {
                  $scope.stick_segment_2_rock_image = icon_rock_fragment_selected
                }
              }
              if (j == 2) {
                if (string_cover.indexOf(BARE) > -1) {
                  $scope.stick_segment_3_bare_image = icon_bare_selected
                  stick_3_bare = true
                  $scope.stick_segment_3_tree_image = icon_trees_disabled
                  $scope.stick_segment_3_shrub_image = icon_shrubs_disabled
                  $scope.stick_segment_3_sub_shrub_image = icon_sub_shrubs_disabled
                  $scope.stick_segment_3_plant_base_image = icon_plant_base_disabled
                  $scope.stick_segment_3_perennial_grass_image = icon_perennial_grasses_disabled
                  $scope.stick_segment_3_annual_grass_image = icon_annual_plant_disabled
                  $scope.stick_segment_3_herb_image = icon_herb_litter_disabled
                  $scope.stick_segment_3_woody_image = icon_wood_litter_disabled
                  $scope.stick_segment_3_rock_image = icon_rock_fragment_disabled
                }
                if (string_cover.indexOf(TREE) > -1) {
                  $scope.stick_segment_3_tree_image = icon_trees_selected
                }
                if (string_cover.indexOf(SHRUBS) > -1) {
                  $scope.stick_segment_3_shrub_image = icon_shrubs_selected
                }
                if (string_cover.indexOf(SUB_SHRUBS) > -1) {
                  $scope.stick_segment_3_sub_shrub_image = icon_sub_shrubs_selected
                }
                if (string_cover.indexOf(PLANT_BASE) > -1) {
                  $scope.stick_segment_3_plant_base_image = icon_plant_base_selected
                }
                if (string_cover.indexOf(PERENNIAL) > -1) {
                  $scope.stick_segment_3_perennial_grass_image = icon_perennial_grasses_selected
                }
                if (string_cover.indexOf(ANNUAL) > -1) {
                  $scope.stick_segment_3_annual_grass_image = icon_annual_plant_selected
                }
                if (string_cover.indexOf(HERB) > -1) {
                  $scope.stick_segment_3_herb_image = icon_herb_litter_selected
                }
                if (string_cover.indexOf(WOOD) > -1) {
                  $scope.stick_segment_3_woody_image = icon_wood_litter_selected
                }
                if (string_cover.indexOf(ROCK) > -1) {
                  $scope.stick_segment_3_rock_image = icon_rock_fragment_selected
                }
              }
              if (j == 3) {
                if (string_cover.indexOf(BARE) > -1) {
                  $scope.stick_segment_4_bare_image = icon_bare_selected
                  stick_4_bare = true
                  $scope.stick_segment_4_tree_image = icon_trees_disabled
                  $scope.stick_segment_4_shrub_image = icon_shrubs_disabled
                  $scope.stick_segment_4_sub_shrub_image = icon_sub_shrubs_disabled
                  $scope.stick_segment_4_plant_base_image = icon_plant_base_disabled
                  $scope.stick_segment_4_perennial_grass_image = icon_perennial_grasses_disabled
                  $scope.stick_segment_4_annual_grass_image = icon_annual_plant_disabled
                  $scope.stick_segment_4_herb_image = icon_herb_litter_disabled
                  $scope.stick_segment_4_woody_image = icon_wood_litter_disabled
                  $scope.stick_segment_4_rock_image = icon_rock_fragment_disabled
                }
                if (string_cover.indexOf(TREE) > -1) {
                  $scope.stick_segment_4_tree_image = icon_trees_selected
                }
                if (string_cover.indexOf(SHRUBS) > -1) {
                  $scope.stick_segment_4_shrub_image = icon_shrubs_selected
                }
                if (string_cover.indexOf(SUB_SHRUBS) > -1) {
                  $scope.stick_segment_4_sub_shrub_image = icon_sub_shrubs_selected
                }
                if (string_cover.indexOf(PLANT_BASE) > -1) {
                  $scope.stick_segment_4_plant_base_image = icon_plant_base_selected
                }
                if (string_cover.indexOf(PERENNIAL) > -1) {
                  $scope.stick_segment_4_perennial_grass_image = icon_perennial_grasses_selected
                }
                if (string_cover.indexOf(ANNUAL) > -1) {
                  $scope.stick_segment_4_annual_grass_image = icon_annual_plant_selected
                }
                if (string_cover.indexOf(HERB) > -1) {
                  $scope.stick_segment_4_herb_image = icon_herb_litter_selected
                }
                if (string_cover.indexOf(WOOD) > -1) {
                  $scope.stick_segment_4_woody_image = icon_wood_litter_selected
                }
                if (string_cover.indexOf(ROCK) > -1) {
                  $scope.stick_segment_4_rock_image = icon_rock_fragment_selected
                }
              }
              if (j == 4) {
                if (string_cover.indexOf(BARE) > -1) {
                  $scope.stick_segment_5_bare_image = icon_bare_selected
                  stick_5_bare = true
                  $scope.stick_segment_5_tree_image = icon_trees_disabled
                  $scope.stick_segment_5_shrub_image = icon_shrubs_disabled
                  $scope.stick_segment_5_sub_shrub_image = icon_sub_shrubs_disabled
                  $scope.stick_segment_5_plant_base_image = icon_plant_base_disabled
                  $scope.stick_segment_5_perennial_grass_image = icon_perennial_grasses_disabled
                  $scope.stick_segment_5_annual_grass_image = icon_annual_plant_disabled
                  $scope.stick_segment_5_herb_image = icon_herb_litter_disabled
                  $scope.stick_segment_5_woody_image = icon_wood_litter_disabled
                  $scope.stick_segment_5_rock_image = icon_rock_fragment_disabled
                }
                if (string_cover.indexOf(TREE) > -1) {
                  $scope.stick_segment_5_tree_image = icon_trees_selected
                }
                if (string_cover.indexOf(SHRUBS) > -1) {
                  $scope.stick_segment_5_shrub_image = icon_shrubs_selected
                }
                if (string_cover.indexOf(SUB_SHRUBS) > -1) {
                  $scope.stick_segment_5_sub_shrub_image = icon_sub_shrubs_selected
                }
                if (string_cover.indexOf(PLANT_BASE) > -1) {
                  $scope.stick_segment_5_plant_base_image = icon_plant_base_selected
                }
                if (string_cover.indexOf(PERENNIAL) > -1) {
                  $scope.stick_segment_5_perennial_grass_image = icon_perennial_grasses_selected
                }
                if (string_cover.indexOf(ANNUAL) > -1) {
                  $scope.stick_segment_5_annual_grass_image = icon_annual_plant_selected
                }
                if (string_cover.indexOf(HERB) > -1) {
                  $scope.stick_segment_5_herb_image = icon_herb_litter_selected
                }
                if (string_cover.indexOf(WOOD) > -1) {
                  $scope.stick_segment_5_woody_image = icon_wood_litter_selected
                }
                if (string_cover.indexOf(ROCK) > -1) {
                  $scope.stick_segment_5_rock_image = icon_rock_fragment_selected
                }
              }
            }
          }
        }
      }


      //$scope.cover_status_img_src = icon_green_checkmark
      //$scope.height_gap_status_img_src = icon_green_checkmark
      setUp_Ticker()
    }

    function presentStatus_AddNew_Action () {
      $scope.stick_segment_1_bare_image = icon_bare_normal
      $scope.stick_segment_2_bare_image = icon_bare_normal
      $scope.stick_segment_3_bare_image = icon_bare_normal
      $scope.stick_segment_4_bare_image = icon_bare_normal
      $scope.stick_segment_5_bare_image = icon_bare_normal

      $scope.stick_segment_1_tree_image = icon_trees_normal
      $scope.stick_segment_2_tree_image = icon_trees_normal
      $scope.stick_segment_3_tree_image = icon_trees_normal
      $scope.stick_segment_4_tree_image = icon_trees_normal
      $scope.stick_segment_5_tree_image = icon_trees_normal

      $scope.stick_segment_1_shrub_image = icon_shrubs_normal
      $scope.stick_segment_2_shrub_image = icon_shrubs_normal
      $scope.stick_segment_3_shrub_image = icon_shrubs_normal
      $scope.stick_segment_4_shrub_image = icon_shrubs_normal
      $scope.stick_segment_5_shrub_image = icon_shrubs_normal

      $scope.stick_segment_1_sub_shrub_image = icon_sub_shrubs_normal
      $scope.stick_segment_2_sub_shrub_image = icon_sub_shrubs_normal
      $scope.stick_segment_3_sub_shrub_image = icon_sub_shrubs_normal
      $scope.stick_segment_4_sub_shrub_image = icon_sub_shrubs_normal
      $scope.stick_segment_5_sub_shrub_image = icon_sub_shrubs_normal

      $scope.stick_segment_1_plant_base_image = icon_plant_base_normal
      $scope.stick_segment_2_plant_base_image = icon_plant_base_normal
      $scope.stick_segment_3_plant_base_image = icon_plant_base_normal
      $scope.stick_segment_4_plant_base_image = icon_plant_base_normal
      $scope.stick_segment_5_plant_base_image = icon_plant_base_normal

      $scope.stick_segment_1_perennial_grass_image = icon_perennial_grasses_normal
      $scope.stick_segment_2_perennial_grass_image = icon_perennial_grasses_normal
      $scope.stick_segment_3_perennial_grass_image = icon_perennial_grasses_normal
      $scope.stick_segment_4_perennial_grass_image = icon_perennial_grasses_normal
      $scope.stick_segment_5_perennial_grass_image = icon_perennial_grasses_normal

      $scope.stick_segment_1_annual_grass_image = icon_annual_plant_normal
      $scope.stick_segment_2_annual_grass_image = icon_annual_plant_normal
      $scope.stick_segment_3_annual_grass_image = icon_annual_plant_normal
      $scope.stick_segment_4_annual_grass_image = icon_annual_plant_normal
      $scope.stick_segment_5_annual_grass_image = icon_annual_plant_normal

      $scope.stick_segment_1_herb_image = icon_herb_litter_normal
      $scope.stick_segment_2_herb_image = icon_herb_litter_normal
      $scope.stick_segment_3_herb_image = icon_herb_litter_normal
      $scope.stick_segment_4_herb_image = icon_herb_litter_normal
      $scope.stick_segment_5_herb_image = icon_herb_litter_normal

      $scope.stick_segment_1_woody_image = icon_wood_litter_normal
      $scope.stick_segment_2_woody_image = icon_wood_litter_normal
      $scope.stick_segment_3_woody_image = icon_wood_litter_normal
      $scope.stick_segment_4_woody_image = icon_wood_litter_normal
      $scope.stick_segment_5_woody_image = icon_wood_litter_normal

      $scope.stick_segment_1_rock_image = icon_rock_fragment_normal
      $scope.stick_segment_2_rock_image = icon_rock_fragment_normal
      $scope.stick_segment_3_rock_image = icon_rock_fragment_normal
      $scope.stick_segment_4_rock_image = icon_rock_fragment_normal
      $scope.stick_segment_5_rock_image = icon_rock_fragment_normal

      $scope.cover_status_img_src = icon_empty_checkmark
      $scope.height_gap_status_img_src = icon_empty_checkmark
    }

    /* Action Select Bare */
    $scope.select_Bare = function (stick) {
      if (current_action == 'ADD_NEW' || current_action == 'EDIT_NEW'
        || current_action === 'ADD_OLD' || current_action === 'EDIT_OLD') {
        //console.log('Bare ' + stick)
        var image_url = ''
        if (stick.trim().toUpperCase() === STICK_1) {
          image_url = $scope.stick_segment_1_bare_image
        } else if (stick.trim().toUpperCase() === STICK_2) {
          image_url = $scope.stick_segment_2_bare_image
        } else if (stick.trim().toUpperCase() === STICK_3) {
          image_url = $scope.stick_segment_3_bare_image
        } else if (stick.trim().toUpperCase() === STICK_4) {
          image_url = $scope.stick_segment_4_bare_image
        } else if (stick.trim().toUpperCase() === STICK_5) {
          image_url = $scope.stick_segment_5_bare_image
        }

        if (image_url === icon_bare_normal) {
          /* Load in */
          //console.log('Load')
          seeToast2('Bare ground', 2000)
          var transect_data = current_plot.land_cover_data.transect
          if (!isEmpty(transect_data) && transect_data.length == 20) {
            for (var i = 0; i < 20; i++) {
              if (transect_data[i].direction.trim().toUpperCase() === current_transect.trim().toUpperCase() &&
                transect_data[i].segment.range.trim().toUpperCase() === current_segment.trim().toUpperCase()) {
                transect_data[i].dominant_woody_species = current_plot.dominant_woody_species
                transect_data[i].dominant_woody_species_2 = current_plot.dominant_woody_species_2
                transect_data[i].dominant_nonwoody_species = current_plot.dominant_nonwoody_species
                transect_data[i].dominant_nonwoody_species_2 = current_plot.dominant_nonwoody_species_2

                if (stick.trim().toUpperCase() === STICK_1) {
                  transect_data[i].segment.stick_segment[0].index = 0
                  transect_data[i].segment.stick_segment[0].cover = bare_name_normal
                  /*
                  if (isEmpty(transect_data[i].segment.stick_segment[0].cover)){
                  	transect_data[i].segment.stick_segment[0].cover = bare_name_normal
                  } else {
                  	if (transect_data[i].segment.stick_segment[0].cover.trim().toUpperCase().indexOf(",") > -1){
                  		var array_covers = transect_data[i].segment.stick_segment[0].cover.split(",")
                  		array_covers = addItem(array_covers,bare_name_normal)
                  		transect_data[i].segment.stick_segment[0].cover = array_covers.toString()
                  	} else {
                  		if (transect_data[i].segment.stick_segment[0].cover.trim().toUpperCase().indexOf(BARE_NAME_UPPER) > -1){
                  		  console.log("Da co - Ko them nua")
                  		} else {
                  		  var array_covers = []
                  		  array_covers = addItem(array_covers,transect_data[i].segment.stick_segment[0].cover)
                  		  array_covers = addItem(array_covers,bare_name_normal)
                  		  transect_data[i].segment.stick_segment[0].cover = array_covers.toString()
                  		}
                  	}
                  }
                  */
                  $scope.stick_segment_1_bare_image = icon_bare_selected

                  stick_1_bare = true
                  $scope.stick_segment_1_tree_image = icon_trees_disabled
                  $scope.stick_segment_1_shrub_image = icon_shrubs_disabled
                  $scope.stick_segment_1_sub_shrub_image = icon_sub_shrubs_disabled
                  $scope.stick_segment_1_plant_base_image = icon_plant_base_disabled
                  $scope.stick_segment_1_perennial_grass_image = icon_perennial_grasses_disabled
                  $scope.stick_segment_1_annual_grass_image = icon_annual_plant_disabled
                  $scope.stick_segment_1_herb_image = icon_herb_litter_disabled
                  $scope.stick_segment_1_woody_image = icon_wood_litter_disabled
                  $scope.stick_segment_1_rock_image = icon_rock_fragment_disabled
                } else if (stick.trim().toUpperCase() === STICK_2) {
                  transect_data[i].segment.stick_segment[1].index = 1
                  transect_data[i].segment.stick_segment[1].cover = bare_name_normal
                  /*
									if (isEmpty(transect_data[i].segment.stick_segment[1].cover)){
										transect_data[i].segment.stick_segment[1].cover = bare_name_normal
									} else {
										if (transect_data[i].segment.stick_segment[1].cover.trim().toUpperCase().indexOf(",") > -1){
											var array_covers = transect_data[i].segment.stick_segment[1].cover.split(",")
											array_covers = addItem(array_covers,bare_name_normal)
											transect_data[i].segment.stick_segment[1].cover = array_covers.toString()
										} else {
											if (transect_data[i].segment.stick_segment[1].cover.trim().toUpperCase().indexOf(BARE_NAME_UPPER) > -1){
											  console.log("Da co - Ko them nua")
											} else {
											  var array_covers = []
											  array_covers = addItem(array_covers,transect_data[i].segment.stick_segment[1].cover)
											  array_covers = addItem(array_covers,bare_name_normal)
											  transect_data[i].segment.stick_segment[1].cover = array_covers.toString()
											}
										}
									}
									*/
                  $scope.stick_segment_2_bare_image = icon_bare_selected

                  stick_2_bare = true
                  $scope.stick_segment_2_tree_image = icon_trees_disabled
                  $scope.stick_segment_2_shrub_image = icon_shrubs_disabled
                  $scope.stick_segment_2_sub_shrub_image = icon_sub_shrubs_disabled
                  $scope.stick_segment_2_plant_base_image = icon_plant_base_disabled
                  $scope.stick_segment_2_perennial_grass_image = icon_perennial_grasses_disabled
                  $scope.stick_segment_2_annual_grass_image = icon_annual_plant_disabled
                  $scope.stick_segment_2_herb_image = icon_herb_litter_disabled
                  $scope.stick_segment_2_woody_image = icon_wood_litter_disabled
                  $scope.stick_segment_2_rock_image = icon_rock_fragment_disabled
                } else if (stick.trim().toUpperCase() === STICK_3) {
                  transect_data[i].segment.stick_segment[2].index = 2
                  transect_data[i].segment.stick_segment[2].cover = bare_name_normal
                  /*
									if (isEmpty(transect_data[i].segment.stick_segment[2].cover)){
										transect_data[i].segment.stick_segment[2].cover = bare_name_normal
									} else {
										if (transect_data[i].segment.stick_segment[2].cover.trim().toUpperCase().indexOf(",") > -1){
											var array_covers = transect_data[i].segment.stick_segment[2].cover.split(",")
											array_covers = addItem(array_covers,bare_name_normal)
											transect_data[i].segment.stick_segment[2].cover = array_covers.toString()
										} else {
											if (transect_data[i].segment.stick_segment[2].cover.trim().toUpperCase().indexOf(BARE_NAME_UPPER) > -1){
											  console.log("Da co - Ko them nua")
											} else {
											  var array_covers = []
											  array_covers = addItem(array_covers,transect_data[i].segment.stick_segment[2].cover)
											  array_covers = addItem(array_covers,bare_name_normal)
											  transect_data[i].segment.stick_segment[2].cover = array_covers.toString()
											}
										}
									}
									*/
                  $scope.stick_segment_3_bare_image = icon_bare_selected

                  stick_3_bare = true
                  $scope.stick_segment_3_tree_image = icon_trees_disabled
                  $scope.stick_segment_3_shrub_image = icon_shrubs_disabled
                  $scope.stick_segment_3_sub_shrub_image = icon_sub_shrubs_disabled
                  $scope.stick_segment_3_plant_base_image = icon_plant_base_disabled
                  $scope.stick_segment_3_perennial_grass_image = icon_perennial_grasses_disabled
                  $scope.stick_segment_3_annual_grass_image = icon_annual_plant_disabled
                  $scope.stick_segment_3_herb_image = icon_herb_litter_disabled
                  $scope.stick_segment_3_woody_image = icon_wood_litter_disabled
                  $scope.stick_segment_3_rock_image = icon_rock_fragment_disabled
                } else if (stick.trim().toUpperCase() === STICK_4) {
                  transect_data[i].segment.stick_segment[3].index = 3
                  transect_data[i].segment.stick_segment[3].cover = bare_name_normal
                  /*
									if (isEmpty(transect_data[i].segment.stick_segment[3].cover)){
										transect_data[i].segment.stick_segment[3].cover = bare_name_normal
									} else {
										if (transect_data[i].segment.stick_segment[3].cover.trim().toUpperCase().indexOf(",") > -1){
											var array_covers = transect_data[i].segment.stick_segment[3].cover.split(",")
											array_covers = addItem(array_covers,bare_name_normal)
											transect_data[i].segment.stick_segment[3].cover = array_covers.toString()
										} else {
											if (transect_data[i].segment.stick_segment[3].cover.trim().toUpperCase().indexOf(BARE_NAME_UPPER) > -1){
											  console.log("Da co - Ko them nua")
											} else {
											  var array_covers = []
											  array_covers = addItem(array_covers,transect_data[i].segment.stick_segment[3].cover)
											  array_covers = addItem(array_covers,bare_name_normal)
											  transect_data[i].segment.stick_segment[3].cover = array_covers.toString()
											}
										}
									}
									*/
                  $scope.stick_segment_4_bare_image = icon_bare_selected

                  stick_4_bare = true
                  $scope.stick_segment_4_tree_image = icon_trees_disabled
                  $scope.stick_segment_4_shrub_image = icon_shrubs_disabled
                  $scope.stick_segment_4_sub_shrub_image = icon_sub_shrubs_disabled
                  $scope.stick_segment_4_plant_base_image = icon_plant_base_disabled
                  $scope.stick_segment_4_perennial_grass_image = icon_perennial_grasses_disabled
                  $scope.stick_segment_4_annual_grass_image = icon_annual_plant_disabled
                  $scope.stick_segment_4_herb_image = icon_herb_litter_disabled
                  $scope.stick_segment_4_woody_image = icon_wood_litter_disabled
                  $scope.stick_segment_4_rock_image = icon_rock_fragment_disabled
                } else if (stick.trim().toUpperCase() === STICK_5) {
                  transect_data[i].segment.stick_segment[4].index = 4
                  transect_data[i].segment.stick_segment[4].cover = bare_name_normal
                  /*
									if (isEmpty(transect_data[i].segment.stick_segment[4].cover)){
										transect_data[i].segment.stick_segment[4].cover = bare_name_normal
									} else {
										if (transect_data[i].segment.stick_segment[4].cover.trim().toUpperCase().indexOf(",") > -1){
											var array_covers = transect_data[i].segment.stick_segment[4].cover.split(",")
											array_covers = addItem(array_covers,bare_name_normal)
											transect_data[i].segment.stick_segment[4].cover = array_covers.toString()
										} else {
											if (transect_data[i].segment.stick_segment[4].cover.trim().toUpperCase().indexOf(BARE_NAME_UPPER) > -1){
											  console.log("Da co - Ko them nua")
											} else {
											  var array_covers = []
											  array_covers = addItem(array_covers,transect_data[i].segment.stick_segment[4].cover)
											  array_covers = addItem(array_covers,bare_name_normal)
											  transect_data[i].segment.stick_segment[4].cover = array_covers.toString()
											}
										}
									}
									*/
                  $scope.stick_segment_5_bare_image = icon_bare_selected

                  stick_5_bare = true
                  $scope.stick_segment_5_tree_image = icon_trees_disabled
                  $scope.stick_segment_5_shrub_image = icon_shrubs_disabled
                  $scope.stick_segment_5_sub_shrub_image = icon_sub_shrubs_disabled
                  $scope.stick_segment_5_plant_base_image = icon_plant_base_disabled
                  $scope.stick_segment_5_perennial_grass_image = icon_perennial_grasses_disabled
                  $scope.stick_segment_5_annual_grass_image = icon_annual_plant_disabled
                  $scope.stick_segment_5_herb_image = icon_herb_litter_disabled
                  $scope.stick_segment_5_woody_image = icon_wood_litter_disabled
                  $scope.stick_segment_5_rock_image = icon_rock_fragment_disabled
                } else {
                  console.log('Error 1442')
                }

                break
              }
            }
          } else {
            console.log('error to construct transect')
          }
          // console.log(transect_data)
          /* Consider select bare */

        } else {
          /* Unload */
          //console.log('Unload')
          var transect_data = current_plot.land_cover_data.transect
          if (!isEmpty(transect_data) && transect_data.length == 20) {
            for (var i = 0; i < 20; i++) {
              if (transect_data[i].direction.trim().toUpperCase() === current_transect.trim().toUpperCase() &&
                transect_data[i].segment.range.trim().toUpperCase() === current_segment.trim().toUpperCase()) {
                transect_data[i].dominant_woody_species = current_plot.dominant_woody_species
                transect_data[i].dominant_woody_species_2 = current_plot.dominant_woody_species_2
                transect_data[i].dominant_nonwoody_species = current_plot.dominant_nonwoody_species
                transect_data[i].dominant_nonwoody_species_2 = current_plot.dominant_nonwoody_species_2

                if (stick.trim().toUpperCase() === STICK_1) {
                  transect_data[i].segment.stick_segment[0].index = 0
                  if (isEmpty(transect_data[i].segment.stick_segment[0].cover)) {
                  } else {
                    if (transect_data[i].segment.stick_segment[0].cover.trim().toUpperCase().indexOf(',') > -1) {
                      var array_covers = transect_data[i].segment.stick_segment[0].cover.split(',')
                      array_covers = removeItem(array_covers, bare_name_normal)
                      transect_data[i].segment.stick_segment[0].cover = array_covers.toString()
                    } else {
                      if (transect_data[i].segment.stick_segment[0].cover.trim().toUpperCase().indexOf(BARE_NAME_UPPER) > -1) {
                        transect_data[i].segment.stick_segment[0].cover = ''
                      }
                    }
                  }
                  $scope.stick_segment_1_bare_image = icon_bare_normal

                  stick_1_bare = false
                  $scope.stick_segment_1_tree_image = icon_trees_normal
                  $scope.stick_segment_1_shrub_image = icon_shrubs_normal
                  $scope.stick_segment_1_sub_shrub_image = icon_sub_shrubs_normal
                  $scope.stick_segment_1_plant_base_image = icon_plant_base_normal
                  $scope.stick_segment_1_perennial_grass_image = icon_perennial_grasses_normal
                  $scope.stick_segment_1_annual_grass_image = icon_annual_plant_normal
                  $scope.stick_segment_1_herb_image = icon_herb_litter_normal
                  $scope.stick_segment_1_woody_image = icon_wood_litter_normal
                  $scope.stick_segment_1_rock_image = icon_rock_fragment_normal
                } else if (stick.trim().toUpperCase() === STICK_2) {
                  transect_data[i].segment.stick_segment[1].index = 1
                  if (isEmpty(transect_data[i].segment.stick_segment[1].cover)) {
                  } else {
                    if (transect_data[i].segment.stick_segment[1].cover.trim().toUpperCase().indexOf(',') > -1) {
                      var array_covers = transect_data[i].segment.stick_segment[1].cover.split(',')
                      array_covers = removeItem(array_covers, bare_name_normal)
                      transect_data[i].segment.stick_segment[1].cover = array_covers.toString()
                    } else {
                      if (transect_data[i].segment.stick_segment[1].cover.trim().toUpperCase().indexOf(BARE_NAME_UPPER) > -1) {
                        transect_data[i].segment.stick_segment[1].cover = ''
                      }
                    }
                  }
                  $scope.stick_segment_2_bare_image = icon_bare_normal
                  stick_2_bare = false
                  $scope.stick_segment_2_tree_image = icon_trees_normal
                  $scope.stick_segment_2_shrub_image = icon_shrubs_normal
                  $scope.stick_segment_2_sub_shrub_image = icon_sub_shrubs_normal
                  $scope.stick_segment_2_plant_base_image = icon_plant_base_normal
                  $scope.stick_segment_2_perennial_grass_image = icon_perennial_grasses_normal
                  $scope.stick_segment_2_annual_grass_image = icon_annual_plant_normal
                  $scope.stick_segment_2_herb_image = icon_herb_litter_normal
                  $scope.stick_segment_2_woody_image = icon_wood_litter_normal
                  $scope.stick_segment_2_rock_image = icon_rock_fragment_normal
                } else if (stick.trim().toUpperCase() === STICK_3) {
                  transect_data[i].segment.stick_segment[2].index = 2
                  if (isEmpty(transect_data[i].segment.stick_segment[2].cover)) {
                  } else {
                    if (transect_data[i].segment.stick_segment[2].cover.trim().toUpperCase().indexOf(',') > -1) {
                      var array_covers = transect_data[i].segment.stick_segment[2].cover.split(',')
                      array_covers = removeItem(array_covers, bare_name_normal)
                      transect_data[i].segment.stick_segment[2].cover = array_covers.toString()
                    } else {
                      if (transect_data[i].segment.stick_segment[2].cover.trim().toUpperCase().indexOf(BARE_NAME_UPPER) > -1) {
                        transect_data[i].segment.stick_segment[2].cover = ''
                      }
                    }
                  }
                  $scope.stick_segment_3_bare_image = icon_bare_normal
                  stick_3_bare = false
                  $scope.stick_segment_3_tree_image = icon_trees_normal
                  $scope.stick_segment_3_shrub_image = icon_shrubs_normal
                  $scope.stick_segment_3_sub_shrub_image = icon_sub_shrubs_normal
                  $scope.stick_segment_3_plant_base_image = icon_plant_base_normal
                  $scope.stick_segment_3_perennial_grass_image = icon_perennial_grasses_normal
                  $scope.stick_segment_3_annual_grass_image = icon_annual_plant_normal
                  $scope.stick_segment_3_herb_image = icon_herb_litter_normal
                  $scope.stick_segment_3_woody_image = icon_wood_litter_normal
                  $scope.stick_segment_3_rock_image = icon_rock_fragment_normal
                } else if (stick.trim().toUpperCase() === STICK_4) {
                  transect_data[i].segment.stick_segment[3].index = 3
                  if (isEmpty(transect_data[i].segment.stick_segment[3].cover)) {
                  } else {
                    if (transect_data[i].segment.stick_segment[3].cover.trim().toUpperCase().indexOf(',') > -1) {
                      var array_covers = transect_data[i].segment.stick_segment[3].cover.split(',')
                      array_covers = removeItem(array_covers, bare_name_normal)
                      transect_data[i].segment.stick_segment[3].cover = array_covers.toString()
                    } else {
                      if (transect_data[i].segment.stick_segment[3].cover.trim().toUpperCase().indexOf(BARE_NAME_UPPER) > -1) {
                        transect_data[i].segment.stick_segment[3].cover = ''
                      }
                    }
                  }
                  $scope.stick_segment_4_bare_image = icon_bare_normal

                  stick_4_bare = false
                  $scope.stick_segment_4_tree_image = icon_trees_normal
                  $scope.stick_segment_4_shrub_image = icon_shrubs_normal
                  $scope.stick_segment_4_sub_shrub_image = icon_sub_shrubs_normal
                  $scope.stick_segment_4_plant_base_image = icon_plant_base_normal
                  $scope.stick_segment_4_perennial_grass_image = icon_perennial_grasses_normal
                  $scope.stick_segment_4_annual_grass_image = icon_annual_plant_normal
                  $scope.stick_segment_4_herb_image = icon_herb_litter_normal
                  $scope.stick_segment_4_woody_image = icon_wood_litter_normal
                  $scope.stick_segment_4_rock_image = icon_rock_fragment_normal
                } else if (stick.trim().toUpperCase() === STICK_5) {
                  transect_data[i].segment.stick_segment[4].index = 4
                  if (isEmpty(transect_data[i].segment.stick_segment[4].cover)) {
                  } else {
                    if (transect_data[i].segment.stick_segment[4].cover.trim().toUpperCase().indexOf(',') > -1) {
                      var array_covers = transect_data[i].segment.stick_segment[4].cover.split(',')
                      array_covers = removeItem(array_covers, bare_name_normal)
                      transect_data[i].segment.stick_segment[4].cover = array_covers.toString()
                    } else {
                      if (transect_data[i].segment.stick_segment[4].cover.trim().toUpperCase().indexOf(BARE_NAME_UPPER) > -1) {
                        transect_data[i].segment.stick_segment[4].cover = ''
                      }
                    }
                  }
                  $scope.stick_segment_5_bare_image = icon_bare_normal

                  stick_5_bare = false
                  $scope.stick_segment_5_tree_image = icon_trees_normal
                  $scope.stick_segment_5_shrub_image = icon_shrubs_normal
                  $scope.stick_segment_5_sub_shrub_image = icon_sub_shrubs_normal
                  $scope.stick_segment_5_plant_base_image = icon_plant_base_normal
                  $scope.stick_segment_5_perennial_grass_image = icon_perennial_grasses_normal
                  $scope.stick_segment_5_annual_grass_image = icon_annual_plant_normal
                  $scope.stick_segment_5_herb_image = icon_herb_litter_normal
                  $scope.stick_segment_5_woody_image = icon_wood_litter_normal
                  $scope.stick_segment_5_rock_image = icon_rock_fragment_normal
                } else {
                  console.log('Error 2990')
                }
              }
            }
          } else {
            console.log('error to construct transect')
          }
        }
        current_plot.land_cover_data.transect = transect_data
      } else {
        //console.log('Action ' + current_action)
        //console.log('Bare : ' + stick)
      }
      //console.log('After Bare Select !')
      //console.log(current_plot.land_cover_data.transect)
    }

    /* Action Select Trees */
    $scope.select_Tree = function (stick) {
      if (current_action == 'ADD_NEW' || current_action == 'EDIT_NEW'
        || current_action === 'ADD_OLD' || current_action === 'EDIT_OLD') {
        //console.log('Trees ' + stick)
        var image_url = ''
        if (stick.trim().toUpperCase() === STICK_1) {
          if (stick_1_bare == true) {
            //console.log('Not-Allowed by Bare')
            return
          }
          image_url = $scope.stick_segment_1_tree_image
        } else if (stick.trim().toUpperCase() === STICK_2) {
          if (stick_2_bare == true) {
            //console.log('Not-Allowed by Bare')
            return
          }
          image_url = $scope.stick_segment_2_tree_image
        } else if (stick.trim().toUpperCase() === STICK_3) {
          if (stick_3_bare == true) {
            //console.log('Not-Allowed by Bare')
            return
          }
          image_url = $scope.stick_segment_3_tree_image
        } else if (stick.trim().toUpperCase() === STICK_4) {
          if (stick_4_bare == true) {
            //console.log('Not-Allowed by Bare')
            return
          }
          image_url = $scope.stick_segment_4_tree_image
        } else if (stick.trim().toUpperCase() === STICK_5) {
          if (stick_5_bare == true) {
            //console.log('Not-Allowed by Bare')
            return
          }
          image_url = $scope.stick_segment_5_tree_image
        }

        if (image_url === icon_trees_normal) {
          /* Load in */
          //console.log('Load')
          seeToast2('Tree ', 2000)
          var transect_data = current_plot.land_cover_data.transect
          if (!isEmpty(transect_data) && transect_data.length == 20) {
            for (var i = 0; i < 20; i++) {
              if (transect_data[i].direction.trim().toUpperCase() === current_transect.trim().toUpperCase() &&
                transect_data[i].segment.range.trim().toUpperCase() === current_segment.trim().toUpperCase()) {
                transect_data[i].dominant_woody_species = current_plot.dominant_woody_species
                transect_data[i].dominant_woody_species_2 = current_plot.dominant_woody_species_2
                transect_data[i].dominant_nonwoody_species = current_plot.dominant_nonwoody_species
                transect_data[i].dominant_nonwoody_species_2 = current_plot.dominant_nonwoody_species_2

                if (stick.trim().toUpperCase() === STICK_1) {
                  transect_data[i].segment.stick_segment[0].index = 0
                  if (isEmpty(transect_data[i].segment.stick_segment[0].cover)) {
                    transect_data[i].segment.stick_segment[0].cover = trees_name_normal
                  } else {
                    if (transect_data[i].segment.stick_segment[0].cover.trim().toUpperCase().indexOf(',') > -1) {
                      var array_covers = transect_data[i].segment.stick_segment[0].cover.split(',')
                      array_covers = addItem(array_covers, trees_name_normal)
                      transect_data[i].segment.stick_segment[0].cover = array_covers.toString()
                    } else {
                      if (transect_data[i].segment.stick_segment[0].cover.trim().toUpperCase().indexOf(TREES_NAME_UPPER) > -1) {
                        //console.log('Da co - Ko them nua')
                      } else {
                        var array_covers = []
                        array_covers = addItem(array_covers, transect_data[i].segment.stick_segment[0].cover)
                        array_covers = addItem(array_covers, trees_name_normal)
                        transect_data[i].segment.stick_segment[0].cover = array_covers.toString()
                      }
                    }
                  }
                  $scope.stick_segment_1_tree_image = icon_trees_selected
                } else if (stick.trim().toUpperCase() === STICK_2) {
                  transect_data[i].segment.stick_segment[1].index = 1
                  if (isEmpty(transect_data[i].segment.stick_segment[1].cover)) {
                    transect_data[i].segment.stick_segment[1].cover = trees_name_normal
                  } else {
                    if (transect_data[i].segment.stick_segment[1].cover.trim().toUpperCase().indexOf(',') > -1) {
                      var array_covers = transect_data[i].segment.stick_segment[1].cover.split(',')
                      array_covers = addItem(array_covers, trees_name_normal)
                      transect_data[i].segment.stick_segment[1].cover = array_covers.toString()
                    } else {
                      if (transect_data[i].segment.stick_segment[1].cover.trim().toUpperCase().indexOf(TREES_NAME_UPPER) > -1) {
                        //console.log('Da co - Ko them nua')
                      } else {
                        var array_covers = []
                        array_covers = addItem(array_covers, transect_data[i].segment.stick_segment[1].cover)
                        array_covers = addItem(array_covers, trees_name_normal)
                        transect_data[i].segment.stick_segment[1].cover = array_covers.toString()
                      }
                    }
                  }
                  $scope.stick_segment_2_tree_image = icon_trees_selected
                } else if (stick.trim().toUpperCase() === STICK_3) {
                  transect_data[i].segment.stick_segment[2].index = 2
                  if (isEmpty(transect_data[i].segment.stick_segment[2].cover)) {
                    transect_data[i].segment.stick_segment[2].cover = trees_name_normal
                  } else {
                    if (transect_data[i].segment.stick_segment[2].cover.trim().toUpperCase().indexOf(',') > -1) {
                      var array_covers = transect_data[i].segment.stick_segment[2].cover.split(',')
                      array_covers = addItem(array_covers, trees_name_normal)
                      transect_data[i].segment.stick_segment[2].cover = array_covers.toString()
                    } else {
                      if (transect_data[i].segment.stick_segment[2].cover.trim().toUpperCase().indexOf(TREES_NAME_UPPER) > -1) {
                        //console.log('Da co - Ko them nua')
                      } else {
                        var array_covers = []
                        array_covers = addItem(array_covers, transect_data[i].segment.stick_segment[2].cover)
                        array_covers = addItem(array_covers, trees_name_normal)
                        transect_data[i].segment.stick_segment[2].cover = array_covers.toString()
                      }
                    }
                  }
                  $scope.stick_segment_3_tree_image = icon_trees_selected
                } else if (stick.trim().toUpperCase() === STICK_4) {
                  transect_data[i].segment.stick_segment[3].index = 3
                  if (isEmpty(transect_data[i].segment.stick_segment[3].cover)) {
                    transect_data[i].segment.stick_segment[3].cover = trees_name_normal
                  } else {
                    if (transect_data[i].segment.stick_segment[3].cover.trim().toUpperCase().indexOf(',') > -1) {
                      var array_covers = transect_data[i].segment.stick_segment[3].cover.split(',')
                      array_covers = addItem(array_covers, trees_name_normal)
                      transect_data[i].segment.stick_segment[3].cover = array_covers.toString()
                    } else {
                      if (transect_data[i].segment.stick_segment[3].cover.trim().toUpperCase().indexOf(TREES_NAME_UPPER) > -1) {
                        //console.log('Da co - Ko them nua')
                      } else {
                        var array_covers = []
                        array_covers = addItem(array_covers, transect_data[i].segment.stick_segment[3].cover)
                        array_covers = addItem(array_covers, trees_name_normal)
                        transect_data[i].segment.stick_segment[3].cover = array_covers.toString()
                      }
                    }
                  }
                  $scope.stick_segment_4_tree_image = icon_trees_selected
                } else if (stick.trim().toUpperCase() === STICK_5) {
                  transect_data[i].segment.stick_segment[4].index = 4
                  if (isEmpty(transect_data[i].segment.stick_segment[4].cover)) {
                    transect_data[i].segment.stick_segment[4].cover = trees_name_normal
                  } else {
                    if (transect_data[i].segment.stick_segment[4].cover.trim().toUpperCase().indexOf(',') > -1) {
                      var array_covers = transect_data[i].segment.stick_segment[4].cover.split(',')
                      array_covers = addItem(array_covers, trees_name_normal)
                      transect_data[i].segment.stick_segment[4].cover = array_covers.toString()
                    } else {
                      if (transect_data[i].segment.stick_segment[4].cover.trim().toUpperCase().indexOf(TREES_NAME_UPPER) > -1) {
                        //console.log('Da co - Ko them nua')
                      } else {
                        var array_covers = []
                        array_covers = addItem(array_covers, transect_data[i].segment.stick_segment[4].cover)
                        array_covers = addItem(array_covers, trees_name_normal)
                        transect_data[i].segment.stick_segment[4].cover = array_covers.toString()
                      }
                    }
                  }
                  $scope.stick_segment_5_tree_image = icon_trees_selected
                } else {
                  console.log('Error 1442 Tree')
                }

                break
              }
            }
          } else {
            console.log('error to construct transect')
          }
          // console.log(transect_data)

        } else {
          /* Unload */
          //console.log('Unload')
          var transect_data = current_plot.land_cover_data.transect
          if (!isEmpty(transect_data) && transect_data.length == 20) {
            for (var i = 0; i < 20; i++) {
              if (transect_data[i].direction.trim().toUpperCase() === current_transect.trim().toUpperCase() &&
                transect_data[i].segment.range.trim().toUpperCase() === current_segment.trim().toUpperCase()) {
                transect_data[i].dominant_woody_species = current_plot.dominant_woody_species
                transect_data[i].dominant_woody_species_2 = current_plot.dominant_woody_species_2
                transect_data[i].dominant_nonwoody_species = current_plot.dominant_nonwoody_species
                transect_data[i].dominant_nonwoody_species_2 = current_plot.dominant_nonwoody_species_2

                if (stick.trim().toUpperCase() === STICK_1) {
                  transect_data[i].segment.stick_segment[0].index = 0
                  if (isEmpty(transect_data[i].segment.stick_segment[0].cover)) {
                  } else {
                    if (transect_data[i].segment.stick_segment[0].cover.trim().toUpperCase().indexOf(',') > -1) {
                      var array_covers = transect_data[i].segment.stick_segment[0].cover.split(',')
                      array_covers = removeItem(array_covers, trees_name_normal)
                      transect_data[i].segment.stick_segment[0].cover = array_covers.toString()
                    } else {
                      if (transect_data[i].segment.stick_segment[0].cover.trim().toUpperCase().indexOf(TREES_NAME_UPPER) > -1) {
                        transect_data[i].segment.stick_segment[0].cover = ''
                      }
                    }
                  }
                  $scope.stick_segment_1_tree_image = icon_trees_normal
                } else if (stick.trim().toUpperCase() === STICK_2) {
                  transect_data[i].segment.stick_segment[1].index = 1
                  if (isEmpty(transect_data[i].segment.stick_segment[1].cover)) {
                  } else {
                    if (transect_data[i].segment.stick_segment[1].cover.trim().toUpperCase().indexOf(',') > -1) {
                      var array_covers = transect_data[i].segment.stick_segment[1].cover.split(',')
                      array_covers = removeItem(array_covers, trees_name_normal)
                      transect_data[i].segment.stick_segment[1].cover = array_covers.toString()
                    } else {
                      if (transect_data[i].segment.stick_segment[1].cover.trim().toUpperCase().indexOf(TREES_NAME_UPPER) > -1) {
                        transect_data[i].segment.stick_segment[1].cover = ''
                      }
                    }
                  }
                  $scope.stick_segment_2_tree_image = icon_trees_normal
                } else if (stick.trim().toUpperCase() === STICK_3) {
                  transect_data[i].segment.stick_segment[2].index = 2
                  if (isEmpty(transect_data[i].segment.stick_segment[2].cover)) {
                  } else {
                    if (transect_data[i].segment.stick_segment[2].cover.trim().toUpperCase().indexOf(',') > -1) {
                      var array_covers = transect_data[i].segment.stick_segment[2].cover.split(',')
                      array_covers = removeItem(array_covers, trees_name_normal)
                      transect_data[i].segment.stick_segment[2].cover = array_covers.toString()
                    } else {
                      if (transect_data[i].segment.stick_segment[2].cover.trim().toUpperCase().indexOf(TREES_NAME_UPPER) > -1) {
                        transect_data[i].segment.stick_segment[2].cover = ''
                      }
                    }
                  }
                  $scope.stick_segment_3_tree_image = icon_trees_normal
                } else if (stick.trim().toUpperCase() === STICK_4) {
                  transect_data[i].segment.stick_segment[3].index = 3
                  if (isEmpty(transect_data[i].segment.stick_segment[3].cover)) {
                  } else {
                    if (transect_data[i].segment.stick_segment[3].cover.trim().toUpperCase().indexOf(',') > -1) {
                      var array_covers = transect_data[i].segment.stick_segment[3].cover.split(',')
                      array_covers = removeItem(array_covers, trees_name_normal)
                      transect_data[i].segment.stick_segment[3].cover = array_covers.toString()
                    } else {
                      if (transect_data[i].segment.stick_segment[3].cover.trim().toUpperCase().indexOf(TREES_NAME_UPPER) > -1) {
                        transect_data[i].segment.stick_segment[3].cover = ''
                      }
                    }
                  }
                  $scope.stick_segment_4_tree_image = icon_trees_normal
                } else if (stick.trim().toUpperCase() === STICK_5) {
                  transect_data[i].segment.stick_segment[4].index = 4
                  if (isEmpty(transect_data[i].segment.stick_segment[4].cover)) {
                  } else {
                    if (transect_data[i].segment.stick_segment[4].cover.trim().toUpperCase().indexOf(',') > -1) {
                      var array_covers = transect_data[i].segment.stick_segment[4].cover.split(',')
                      array_covers = removeItem(array_covers, trees_name_normal)
                      transect_data[i].segment.stick_segment[4].cover = array_covers.toString()
                    } else {
                      if (transect_data[i].segment.stick_segment[4].cover.trim().toUpperCase().indexOf(TREES_NAME_UPPER) > -1) {
                        transect_data[i].segment.stick_segment[4].cover = ''
                      }
                    }
                  }
                  $scope.stick_segment_5_tree_image = icon_trees_normal
                } else {
                  console.log('Error 2990 Tree')
                }
              }
            }
          } else {
            console.log('error to construct transect')
          }
        }
        current_plot.land_cover_data.transect = transect_data
      } else {
        //console.log('Action ' + current_action)
        //console.log('Bare : ' + stick)
      }
      //console.log('After Trees Select !')
      //console.log(current_plot.land_cover_data.transect)
    }

    /* Action select Shrubs */
    $scope.select_Shrub = function (stick) {
      if (current_action == 'ADD_NEW' || current_action == 'EDIT_NEW'
        || current_action === 'ADD_OLD' || current_action === 'EDIT_OLD') {
        //console.log('Shrubs ' + stick)
        var image_url = ''
        if (stick.trim().toUpperCase() === STICK_1) {
          if (stick_1_bare == true) {
            //console.log('Not-Allowed by Bare')
            return
          }
          image_url = $scope.stick_segment_1_shrub_image
        } else if (stick.trim().toUpperCase() === STICK_2) {
          if (stick_2_bare == true) {
            //console.log('Not-Allowed by Bare')
            return
          }
          image_url = $scope.stick_segment_2_shrub_image
        } else if (stick.trim().toUpperCase() === STICK_3) {
          if (stick_3_bare == true) {
            //console.log('Not-Allowed by Bare')
            return
          }
          image_url = $scope.stick_segment_3_shrub_image
        } else if (stick.trim().toUpperCase() === STICK_4) {
          if (stick_4_bare == true) {
            //console.log('Not-Allowed by Bare')
            return
          }
          image_url = $scope.stick_segment_4_shrub_image
        } else if (stick.trim().toUpperCase() === STICK_5) {
          if (stick_5_bare == true) {
            //console.log('Not-Allowed by Bare')
            return
          }
          image_url = $scope.stick_segment_5_shrub_image
        }

        if (image_url === icon_shrubs_normal) {
          /* Load in */
          //console.log('Load')
          seeToast2('Shrub ', 2000)
          var transect_data = current_plot.land_cover_data.transect
          if (!isEmpty(transect_data) && transect_data.length == 20) {
            for (var i = 0; i < 20; i++) {
              if (transect_data[i].direction.trim().toUpperCase() === current_transect.trim().toUpperCase() &&
                transect_data[i].segment.range.trim().toUpperCase() === current_segment.trim().toUpperCase()) {
                transect_data[i].dominant_woody_species = current_plot.dominant_woody_species
                transect_data[i].dominant_woody_species_2 = current_plot.dominant_woody_species_2
                transect_data[i].dominant_nonwoody_species = current_plot.dominant_nonwoody_species
                transect_data[i].dominant_nonwoody_species_2 = current_plot.dominant_nonwoody_species_2

                if (stick.trim().toUpperCase() === STICK_1) {
                  transect_data[i].segment.stick_segment[0].index = 0
                  if (isEmpty(transect_data[i].segment.stick_segment[0].cover)) {
                    transect_data[i].segment.stick_segment[0].cover = shrubs_name_normal
                  } else {
                    if (transect_data[i].segment.stick_segment[0].cover.trim().toUpperCase().indexOf(',') > -1) {
                      var array_covers = transect_data[i].segment.stick_segment[0].cover.split(',')
                      array_covers = addItem(array_covers, shrubs_name_normal)
                      transect_data[i].segment.stick_segment[0].cover = array_covers.toString()
                    } else {
                      if (transect_data[i].segment.stick_segment[0].cover.trim().toUpperCase() === SHRUBS_NAME_UPPER
                        || transect_data[i].segment.stick_segment[0].cover.trim().toUpperCase() === SHRUBS_NAME_UPPER + ','
                        || transect_data[i].segment.stick_segment[0].cover.trim().toUpperCase() === ',' + SHRUBS_NAME_UPPER) {
                        //console.log('Da co - Ko them nua')
                      } else {
                        var array_covers = []
                        array_covers = addItem(array_covers, transect_data[i].segment.stick_segment[0].cover)
                        array_covers = addItem(array_covers, shrubs_name_normal)
                        transect_data[i].segment.stick_segment[0].cover = array_covers.toString()
                      }
                    }
                  }
                  $scope.stick_segment_1_shrub_image = icon_shrubs_selected
                } else if (stick.trim().toUpperCase() === STICK_2) {
                  transect_data[i].segment.stick_segment[1].index = 1
                  if (isEmpty(transect_data[i].segment.stick_segment[1].cover)) {
                    transect_data[i].segment.stick_segment[1].cover = shrubs_name_normal
                  } else {
                    if (transect_data[i].segment.stick_segment[1].cover.trim().toUpperCase().indexOf(',') > -1) {
                      var array_covers = transect_data[i].segment.stick_segment[1].cover.split(',')
                      array_covers = addItem(array_covers, shrubs_name_normal)
                      transect_data[i].segment.stick_segment[1].cover = array_covers.toString()
                    } else {
                      if (transect_data[i].segment.stick_segment[1].cover.trim().toUpperCase() === SHRUBS_NAME_UPPER
                        || transect_data[i].segment.stick_segment[1].cover.trim().toUpperCase() === SHRUBS_NAME_UPPER + ','
                        || transect_data[i].segment.stick_segment[1].cover.trim().toUpperCase() === ',' + SHRUBS_NAME_UPPER) {
                        //console.log('Da co - Ko them nua')
                      } else {
                        var array_covers = []
                        array_covers = addItem(array_covers, transect_data[i].segment.stick_segment[1].cover)
                        array_covers = addItem(array_covers, shrubs_name_normal)
                        transect_data[i].segment.stick_segment[1].cover = array_covers.toString()
                      }
                    }
                  }
                  $scope.stick_segment_2_shrub_image = icon_shrubs_selected
                } else if (stick.trim().toUpperCase() === STICK_3) {
                  transect_data[i].segment.stick_segment[2].index = 2
                  if (isEmpty(transect_data[i].segment.stick_segment[2].cover)) {
                    transect_data[i].segment.stick_segment[2].cover = shrubs_name_normal
                  } else {
                    if (transect_data[i].segment.stick_segment[2].cover.trim().toUpperCase().indexOf(',') > -1) {
                      var array_covers = transect_data[i].segment.stick_segment[2].cover.split(',')
                      array_covers = addItem(array_covers, shrubs_name_normal)
                      transect_data[i].segment.stick_segment[2].cover = array_covers.toString()
                    } else {
                      if (transect_data[i].segment.stick_segment[2].cover.trim().toUpperCase() === SHRUBS_NAME_UPPER
                        || transect_data[i].segment.stick_segment[2].cover.trim().toUpperCase() === SHRUBS_NAME_UPPER + ','
                        || transect_data[i].segment.stick_segment[2].cover.trim().toUpperCase() === ',' + SHRUBS_NAME_UPPER) {
                        //console.log('Da co - Ko them nua')
                      } else {
                        var array_covers = []
                        array_covers = addItem(array_covers, transect_data[i].segment.stick_segment[2].cover)
                        array_covers = addItem(array_covers, shrubs_name_normal)
                        transect_data[i].segment.stick_segment[2].cover = array_covers.toString()
                      }
                    }
                  }
                  $scope.stick_segment_3_shrub_image = icon_shrubs_selected
                } else if (stick.trim().toUpperCase() === STICK_4) {
                  transect_data[i].segment.stick_segment[3].index = 3
                  if (isEmpty(transect_data[i].segment.stick_segment[3].cover)) {
                    transect_data[i].segment.stick_segment[3].cover = shrubs_name_normal
                  } else {
                    if (transect_data[i].segment.stick_segment[3].cover.trim().toUpperCase().indexOf(',') > -1) {
                      var array_covers = transect_data[i].segment.stick_segment[3].cover.split(',')
                      array_covers = addItem(array_covers, shrubs_name_normal)
                      transect_data[i].segment.stick_segment[3].cover = array_covers.toString()
                    } else {
                      if (transect_data[i].segment.stick_segment[3].cover.trim().toUpperCase() === SHRUBS_NAME_UPPER
                        || transect_data[i].segment.stick_segment[3].cover.trim().toUpperCase() === SHRUBS_NAME_UPPER + ','
                        || transect_data[i].segment.stick_segment[3].cover.trim().toUpperCase() === ',' + SHRUBS_NAME_UPPER) {
                        //console.log('Da co - Ko them nua')
                      } else {
                        var array_covers = []
                        array_covers = addItem(array_covers, transect_data[i].segment.stick_segment[3].cover)
                        array_covers = addItem(array_covers, shrubs_name_normal)
                        transect_data[i].segment.stick_segment[3].cover = array_covers.toString()
                      }
                    }
                  }
                  $scope.stick_segment_4_shrub_image = icon_shrubs_selected
                } else if (stick.trim().toUpperCase() === STICK_5) {
                  transect_data[i].segment.stick_segment[4].index = 4
                  if (isEmpty(transect_data[i].segment.stick_segment[4].cover)) {
                    transect_data[i].segment.stick_segment[4].cover = shrubs_name_normal
                  } else {
                    if (transect_data[i].segment.stick_segment[4].cover.trim().toUpperCase().indexOf(',') > -1) {
                      var array_covers = transect_data[i].segment.stick_segment[4].cover.split(',')
                      array_covers = addItem(array_covers, shrubs_name_normal)
                      transect_data[i].segment.stick_segment[4].cover = array_covers.toString()
                    } else {
                      if (transect_data[i].segment.stick_segment[4].cover.trim().toUpperCase() === SHRUBS_NAME_UPPER
                        || transect_data[i].segment.stick_segment[4].cover.trim().toUpperCase() === SHRUBS_NAME_UPPER + ','
                        || transect_data[i].segment.stick_segment[4].cover.trim().toUpperCase() === ',' + SHRUBS_NAME_UPPER) {
                        //console.log('Da co - Ko them nua')
                      } else {
                        var array_covers = []
                        array_covers = addItem(array_covers, transect_data[i].segment.stick_segment[4].cover)
                        array_covers = addItem(array_covers, shrubs_name_normal)
                        transect_data[i].segment.stick_segment[4].cover = array_covers.toString()
                      }
                    }
                  }
                  $scope.stick_segment_5_shrub_image = icon_shrubs_selected
                } else {
                  console.log('Error 1442 Shrubs')
                }

                break
              }
            }
          } else {
            console.log('error to construct transect')
          }
          // console.log(transect_data)

        } else {
          /* Unload */
          //console.log('Unload')
          var transect_data = current_plot.land_cover_data.transect
          if (!isEmpty(transect_data) && transect_data.length == 20) {
            for (var i = 0; i < 20; i++) {
              if (transect_data[i].direction.trim().toUpperCase() === current_transect.trim().toUpperCase() &&
                transect_data[i].segment.range.trim().toUpperCase() === current_segment.trim().toUpperCase()) {
                transect_data[i].dominant_woody_species = current_plot.dominant_woody_species
                transect_data[i].dominant_woody_species_2 = current_plot.dominant_woody_species_2
                transect_data[i].dominant_nonwoody_species = current_plot.dominant_nonwoody_species
                transect_data[i].dominant_nonwoody_species_2 = current_plot.dominant_nonwoody_species_2

                if (stick.trim().toUpperCase() === STICK_1) {
                  transect_data[i].segment.stick_segment[0].index = 0
                  if (isEmpty(transect_data[i].segment.stick_segment[0].cover)) {
                  } else {
                    if (transect_data[i].segment.stick_segment[0].cover.trim().toUpperCase().indexOf(',') > -1) {
                      var array_covers = transect_data[i].segment.stick_segment[0].cover.split(',')
                      array_covers = removeItem(array_covers, shrubs_name_normal)
                      transect_data[i].segment.stick_segment[0].cover = array_covers.toString()
                    } else {
                      if (transect_data[i].segment.stick_segment[0].cover.trim().toUpperCase() === SHRUBS_NAME_UPPER
                        || transect_data[i].segment.stick_segment[0].cover.trim().toUpperCase() === SHRUBS_NAME_UPPER + ','
                        || transect_data[i].segment.stick_segment[0].cover.trim().toUpperCase() === ',' + SHRUBS_NAME_UPPER) {
                        transect_data[i].segment.stick_segment[0].cover = ''
                      }
                    }
                  }
                  $scope.stick_segment_1_shrub_image = icon_shrubs_normal
                } else if (stick.trim().toUpperCase() === STICK_2) {
                  transect_data[i].segment.stick_segment[1].index = 1
                  if (isEmpty(transect_data[i].segment.stick_segment[1].cover)) {
                  } else {
                    if (transect_data[i].segment.stick_segment[1].cover.trim().toUpperCase().indexOf(',') > -1) {
                      var array_covers = transect_data[i].segment.stick_segment[1].cover.split(',')
                      array_covers = removeItem(array_covers, shrubs_name_normal)
                      transect_data[i].segment.stick_segment[1].cover = array_covers.toString()
                    } else {
                      if (transect_data[i].segment.stick_segment[1].cover.trim().toUpperCase() === SHRUBS_NAME_UPPER
                        || transect_data[i].segment.stick_segment[1].cover.trim().toUpperCase() === SHRUBS_NAME_UPPER + ','
                        || transect_data[i].segment.stick_segment[1].cover.trim().toUpperCase() === ',' + SHRUBS_NAME_UPPER) {
                        transect_data[i].segment.stick_segment[1].cover = ''
                      }
                    }
                  }
                  $scope.stick_segment_2_shrub_image = icon_shrubs_normal
                } else if (stick.trim().toUpperCase() === STICK_3) {
                  transect_data[i].segment.stick_segment[2].index = 2
                  if (isEmpty(transect_data[i].segment.stick_segment[2].cover)) {
                  } else {
                    if (transect_data[i].segment.stick_segment[2].cover.trim().toUpperCase().indexOf(',') > -1) {
                      var array_covers = transect_data[i].segment.stick_segment[2].cover.split(',')
                      array_covers = removeItem(array_covers, shrubs_name_normal)
                      transect_data[i].segment.stick_segment[2].cover = array_covers.toString()
                    } else {
                      if (transect_data[i].segment.stick_segment[2].cover.trim().toUpperCase() === SHRUBS_NAME_UPPER
                        || transect_data[i].segment.stick_segment[2].cover.trim().toUpperCase() === SHRUBS_NAME_UPPER + ','
                        || transect_data[i].segment.stick_segment[2].cover.trim().toUpperCase() === ',' + SHRUBS_NAME_UPPER) {
                        transect_data[i].segment.stick_segment[2].cover = ''
                      }
                    }
                  }
                  $scope.stick_segment_3_shrub_image = icon_shrubs_normal
                } else if (stick.trim().toUpperCase() === STICK_4) {
                  transect_data[i].segment.stick_segment[3].index = 3
                  if (isEmpty(transect_data[i].segment.stick_segment[3].cover)) {
                  } else {
                    if (transect_data[i].segment.stick_segment[3].cover.trim().toUpperCase().indexOf(',') > -1) {
                      var array_covers = transect_data[i].segment.stick_segment[3].cover.split(',')
                      array_covers = removeItem(array_covers, shrubs_name_normal)
                      transect_data[i].segment.stick_segment[3].cover = array_covers.toString()
                    } else {
                      if (transect_data[i].segment.stick_segment[3].cover.trim().toUpperCase() === SHRUBS_NAME_UPPER
                        || transect_data[i].segment.stick_segment[3].cover.trim().toUpperCase() === SHRUBS_NAME_UPPER + ','
                        || transect_data[i].segment.stick_segment[3].cover.trim().toUpperCase() === ',' + SHRUBS_NAME_UPPER) {
                        transect_data[i].segment.stick_segment[3].cover = ''
                      }
                    }
                  }
                  $scope.stick_segment_4_shrub_image = icon_shrubs_normal
                } else if (stick.trim().toUpperCase() === STICK_5) {
                  transect_data[i].segment.stick_segment[4].index = 4
                  if (isEmpty(transect_data[i].segment.stick_segment[4].cover)) {
                  } else {
                    if (transect_data[i].segment.stick_segment[4].cover.trim().toUpperCase().indexOf(',') > -1) {
                      var array_covers = transect_data[i].segment.stick_segment[4].cover.split(',')
                      array_covers = removeItem(array_covers, shrubs_name_normal)
                      transect_data[i].segment.stick_segment[4].cover = array_covers.toString()
                    } else {
                      if (transect_data[i].segment.stick_segment[4].cover.trim().toUpperCase() === SHRUBS_NAME_UPPER
                        || transect_data[i].segment.stick_segment[4].cover.trim().toUpperCase() === SHRUBS_NAME_UPPER + ','
                        || transect_data[i].segment.stick_segment[4].cover.trim().toUpperCase() === ',' + SHRUBS_NAME_UPPER) {
                        transect_data[i].segment.stick_segment[4].cover = ''
                      }
                    }
                  }
                  $scope.stick_segment_5_shrub_image = icon_shrubs_normal
                } else {
                  console.log('Error 2990 Shrubs')
                }
              }
            }
          } else {
            console.log('error to construct transect')
          }
        }
        current_plot.land_cover_data.transect = transect_data
      } else {
        //console.log('Action ' + current_action)
        //console.log('Bare : ' + stick)
      }
      //console.log('After Shrubs Select !')
      //console.log(current_plot.land_cover_data.transect)
    }

    /* Action select sub_shrubs */
    $scope.select_Sub_Shrub = function (stick) {
      if (current_action == 'ADD_NEW' || current_action == 'EDIT_NEW'
        || current_action === 'ADD_OLD' || current_action === 'EDIT_OLD') {
        //console.log(sub_shrubs_name_normal + ' ' + stick)
        var image_url = ''
        if (stick.trim().toUpperCase() === STICK_1) {
          if (stick_1_bare == true) {
            //console.log('Not-Allowed by Bare')
            return
          }
          image_url = $scope.stick_segment_1_sub_shrub_image
        } else if (stick.trim().toUpperCase() === STICK_2) {
          if (stick_2_bare == true) {
            //console.log('Not-Allowed by Bare')
            return
          }
          image_url = $scope.stick_segment_2_sub_shrub_image
        } else if (stick.trim().toUpperCase() === STICK_3) {
          if (stick_3_bare == true) {
            //console.log('Not-Allowed by Bare')
            return
          }
          image_url = $scope.stick_segment_3_sub_shrub_image
        } else if (stick.trim().toUpperCase() === STICK_4) {
          if (stick_4_bare == true) {
            //console.log('Not-Allowed by Bare')
            return
          }
          image_url = $scope.stick_segment_4_sub_shrub_image
        } else if (stick.trim().toUpperCase() === STICK_5) {
          if (stick_5_bare == true) {
            //console.log('Not-Allowed by Bare')
            return
          }
          image_url = $scope.stick_segment_5_sub_shrub_image
        }

        if (image_url === icon_sub_shrubs_normal) {
          /* Load in */
          //console.log('Load')
          seeToast2(sub_shrubs_name_normal, 2000)
          var transect_data = current_plot.land_cover_data.transect
          if (!isEmpty(transect_data) && transect_data.length == 20) {
            for (var i = 0; i < 20; i++) {
              if (transect_data[i].direction.trim().toUpperCase() === current_transect.trim().toUpperCase() &&
                transect_data[i].segment.range.trim().toUpperCase() === current_segment.trim().toUpperCase()) {
                transect_data[i].dominant_woody_species = current_plot.dominant_woody_species
                transect_data[i].dominant_woody_species_2 = current_plot.dominant_woody_species_2
                transect_data[i].dominant_nonwoody_species = current_plot.dominant_nonwoody_species
                transect_data[i].dominant_nonwoody_species_2 = current_plot.dominant_nonwoody_species_2

                if (stick.trim().toUpperCase() === STICK_1) {
                  transect_data[i].segment.stick_segment[0].index = 0
                  if (isEmpty(transect_data[i].segment.stick_segment[0].cover)) {
                    transect_data[i].segment.stick_segment[0].cover = sub_shrubs_name_normal
                  } else {
                    if (transect_data[i].segment.stick_segment[0].cover.trim().toUpperCase().indexOf(',') > -1) {
                      var array_covers = transect_data[i].segment.stick_segment[0].cover.split(',')
                      array_covers = addItem(array_covers, sub_shrubs_name_normal)
                      transect_data[i].segment.stick_segment[0].cover = array_covers.toString()
                    } else {
                      if (transect_data[i].segment.stick_segment[0].cover.trim().toUpperCase().indexOf(SUB_SHRUBS_NAME_UPPER) > -1) {
                        //console.log('Da co - Ko them nua')
                      } else {
                        var array_covers = []
                        array_covers = addItem(array_covers, transect_data[i].segment.stick_segment[0].cover)
                        array_covers = addItem(array_covers, sub_shrubs_name_normal)
                        transect_data[i].segment.stick_segment[0].cover = array_covers.toString()
                      }
                    }
                  }
                  $scope.stick_segment_1_sub_shrub_image = icon_sub_shrubs_selected
                } else if (stick.trim().toUpperCase() === STICK_2) {
                  transect_data[i].segment.stick_segment[1].index = 1
                  if (isEmpty(transect_data[i].segment.stick_segment[1].cover)) {
                    transect_data[i].segment.stick_segment[1].cover = sub_shrubs_name_normal
                  } else {
                    if (transect_data[i].segment.stick_segment[1].cover.trim().toUpperCase().indexOf(',') > -1) {
                      var array_covers = transect_data[i].segment.stick_segment[1].cover.split(',')
                      array_covers = addItem(array_covers, sub_shrubs_name_normal)
                      transect_data[i].segment.stick_segment[1].cover = array_covers.toString()
                    } else {
                      if (transect_data[i].segment.stick_segment[1].cover.trim().toUpperCase().indexOf(SUB_SHRUBS_NAME_UPPER) > -1) {
                        //console.log('Da co - Ko them nua')
                      } else {
                        var array_covers = []
                        array_covers = addItem(array_covers, transect_data[i].segment.stick_segment[1].cover)
                        array_covers = addItem(array_covers, sub_shrubs_name_normal)
                        transect_data[i].segment.stick_segment[1].cover = array_covers.toString()
                      }
                    }
                  }
                  $scope.stick_segment_2_sub_shrub_image = icon_sub_shrubs_selected
                } else if (stick.trim().toUpperCase() === STICK_3) {
                  transect_data[i].segment.stick_segment[2].index = 2
                  if (isEmpty(transect_data[i].segment.stick_segment[2].cover)) {
                    transect_data[i].segment.stick_segment[2].cover = sub_shrubs_name_normal
                  } else {
                    if (transect_data[i].segment.stick_segment[2].cover.trim().toUpperCase().indexOf(',') > -1) {
                      var array_covers = transect_data[i].segment.stick_segment[2].cover.split(',')
                      array_covers = addItem(array_covers, sub_shrubs_name_normal)
                      transect_data[i].segment.stick_segment[2].cover = array_covers.toString()
                    } else {
                      if (transect_data[i].segment.stick_segment[2].cover.trim().toUpperCase().indexOf(SUB_SHRUBS_NAME_UPPER) > -1) {
                        //console.log('Da co - Ko them nua')
                      } else {
                        var array_covers = []
                        array_covers = addItem(array_covers, transect_data[i].segment.stick_segment[2].cover)
                        array_covers = addItem(array_covers, sub_shrubs_name_normal)
                        transect_data[i].segment.stick_segment[2].cover = array_covers.toString()
                      }
                    }
                  }
                  $scope.stick_segment_3_sub_shrub_image = icon_sub_shrubs_selected
                } else if (stick.trim().toUpperCase() === STICK_4) {
                  transect_data[i].segment.stick_segment[3].index = 3
                  if (isEmpty(transect_data[i].segment.stick_segment[3].cover)) {
                    transect_data[i].segment.stick_segment[3].cover = sub_shrubs_name_normal
                  } else {
                    if (transect_data[i].segment.stick_segment[3].cover.trim().toUpperCase().indexOf(',') > -1) {
                      var array_covers = transect_data[i].segment.stick_segment[3].cover.split(',')
                      array_covers = addItem(array_covers, sub_shrubs_name_normal)
                      transect_data[i].segment.stick_segment[3].cover = array_covers.toString()
                    } else {
                      if (transect_data[i].segment.stick_segment[3].cover.trim().toUpperCase().indexOf(SUB_SHRUBS_NAME_UPPER) > -1) {
                        //console.log('Da co - Ko them nua')
                      } else {
                        var array_covers = []
                        array_covers = addItem(array_covers, transect_data[i].segment.stick_segment[3].cover)
                        array_covers = addItem(array_covers, sub_shrubs_name_normal)
                        transect_data[i].segment.stick_segment[3].cover = array_covers.toString()
                      }
                    }
                  }
                  $scope.stick_segment_4_sub_shrub_image = icon_sub_shrubs_selected
                } else if (stick.trim().toUpperCase() === STICK_5) {
                  transect_data[i].segment.stick_segment[4].index = 4
                  if (isEmpty(transect_data[i].segment.stick_segment[4].cover)) {
                    transect_data[i].segment.stick_segment[4].cover = sub_shrubs_name_normal
                  } else {
                    if (transect_data[i].segment.stick_segment[4].cover.trim().toUpperCase().indexOf(',') > -1) {
                      var array_covers = transect_data[i].segment.stick_segment[4].cover.split(',')
                      array_covers = addItem(array_covers, sub_shrubs_name_normal)
                      transect_data[i].segment.stick_segment[4].cover = array_covers.toString()
                    } else {
                      if (transect_data[i].segment.stick_segment[4].cover.trim().toUpperCase().indexOf(SUB_SHRUBS_NAME_UPPER) > -1) {
                        //console.log('Da co - Ko them nua')
                      } else {
                        var array_covers = []
                        array_covers = addItem(array_covers, transect_data[i].segment.stick_segment[4].cover)
                        array_covers = addItem(array_covers, sub_shrubs_name_normal)
                        transect_data[i].segment.stick_segment[4].cover = array_covers.toString()
                      }
                    }
                  }
                  $scope.stick_segment_5_sub_shrub_image = icon_sub_shrubs_selected
                } else {
                  console.log('Error 1442 Sub-Shrubs')
                }

                break
              }
            }
          } else {
            console.log('error to construct transect')
          }
          // console.log(transect_data)

        } else {
          /* Unload */
          console.log('Unload')
          var transect_data = current_plot.land_cover_data.transect
          if (!isEmpty(transect_data) && transect_data.length == 20) {
            for (var i = 0; i < 20; i++) {
              if (transect_data[i].direction.trim().toUpperCase() === current_transect.trim().toUpperCase() &&
                transect_data[i].segment.range.trim().toUpperCase() === current_segment.trim().toUpperCase()) {
                transect_data[i].dominant_woody_species = current_plot.dominant_woody_species
                transect_data[i].dominant_woody_species_2 = current_plot.dominant_woody_species_2
                transect_data[i].dominant_nonwoody_species = current_plot.dominant_nonwoody_species
                transect_data[i].dominant_nonwoody_species_2 = current_plot.dominant_nonwoody_species_2

                if (stick.trim().toUpperCase() === STICK_1) {
                  transect_data[i].segment.stick_segment[0].index = 0
                  if (isEmpty(transect_data[i].segment.stick_segment[0].cover)) {
                  } else {
                    if (transect_data[i].segment.stick_segment[0].cover.trim().toUpperCase().indexOf(',') > -1) {
                      var array_covers = transect_data[i].segment.stick_segment[0].cover.split(',')
                      array_covers = removeItem(array_covers, sub_shrubs_name_normal)
                      transect_data[i].segment.stick_segment[0].cover = array_covers.toString()
                    } else {
                      if (transect_data[i].segment.stick_segment[0].cover.trim().toUpperCase().indexOf(SUB_SHRUBS_NAME_UPPER) > -1) {
                        transect_data[i].segment.stick_segment[0].cover = ''
                      }
                    }
                  }
                  $scope.stick_segment_1_sub_shrub_image = icon_sub_shrubs_normal
                } else if (stick.trim().toUpperCase() === STICK_2) {
                  transect_data[i].segment.stick_segment[1].index = 1
                  if (isEmpty(transect_data[i].segment.stick_segment[1].cover)) {
                  } else {
                    if (transect_data[i].segment.stick_segment[1].cover.trim().toUpperCase().indexOf(',') > -1) {
                      var array_covers = transect_data[i].segment.stick_segment[1].cover.split(',')
                      array_covers = removeItem(array_covers, sub_shrubs_name_normal)
                      transect_data[i].segment.stick_segment[1].cover = array_covers.toString()
                    } else {
                      if (transect_data[i].segment.stick_segment[1].cover.trim().toUpperCase().indexOf(SUB_SHRUBS_NAME_UPPER) > -1) {
                        transect_data[i].segment.stick_segment[1].cover = ''
                      }
                    }
                  }
                  $scope.stick_segment_2_sub_shrub_image = icon_sub_shrubs_normal
                } else if (stick.trim().toUpperCase() === STICK_3) {
                  transect_data[i].segment.stick_segment[2].index = 2
                  if (isEmpty(transect_data[i].segment.stick_segment[2].cover)) {
                  } else {
                    if (transect_data[i].segment.stick_segment[2].cover.trim().toUpperCase().indexOf(',') > -1) {
                      var array_covers = transect_data[i].segment.stick_segment[2].cover.split(',')
                      array_covers = removeItem(array_covers, sub_shrubs_name_normal)
                      transect_data[i].segment.stick_segment[2].cover = array_covers.toString()
                    } else {
                      if (transect_data[i].segment.stick_segment[2].cover.trim().toUpperCase().indexOf(SUB_SHRUBS_NAME_UPPER) > -1) {
                        transect_data[i].segment.stick_segment[2].cover = ''
                      }
                    }
                  }
                  $scope.stick_segment_3_sub_shrub_image = icon_sub_shrubs_normal
                } else if (stick.trim().toUpperCase() === STICK_4) {
                  transect_data[i].segment.stick_segment[3].index = 3
                  if (isEmpty(transect_data[i].segment.stick_segment[3].cover)) {
                  } else {
                    if (transect_data[i].segment.stick_segment[3].cover.trim().toUpperCase().indexOf(',') > -1) {
                      var array_covers = transect_data[i].segment.stick_segment[3].cover.split(',')
                      array_covers = removeItem(array_covers, sub_shrubs_name_normal)
                      transect_data[i].segment.stick_segment[3].cover = array_covers.toString()
                    } else {
                      if (transect_data[i].segment.stick_segment[3].cover.trim().toUpperCase().indexOf(SUB_SHRUBS_NAME_UPPER) > -1) {
                        transect_data[i].segment.stick_segment[3].cover = ''
                      }
                    }
                  }
                  $scope.stick_segment_4_sub_shrub_image = icon_sub_shrubs_normal
                } else if (stick.trim().toUpperCase() === STICK_5) {
                  transect_data[i].segment.stick_segment[4].index = 4
                  if (isEmpty(transect_data[i].segment.stick_segment[4].cover)) {
                  } else {
                    if (transect_data[i].segment.stick_segment[4].cover.trim().toUpperCase().indexOf(',') > -1) {
                      var array_covers = transect_data[i].segment.stick_segment[4].cover.split(',')
                      array_covers = removeItem(array_covers, sub_shrubs_name_normal)
                      transect_data[i].segment.stick_segment[4].cover = array_covers.toString()
                    } else {
                      if (transect_data[i].segment.stick_segment[4].cover.trim().toUpperCase().indexOf(SUB_SHRUBS_NAME_UPPER) > -1) {
                        transect_data[i].segment.stick_segment[4].cover = ''
                      }
                    }
                  }
                  $scope.stick_segment_5_sub_shrub_image = icon_sub_shrubs_normal
                } else {
                  console.log('Error 2990 Sub-Shrubs')
                }
              }
            }
          } else {
            console.log('error to construct transect')
          }
        }
        current_plot.land_cover_data.transect = transect_data
      } else {
        //console.log('Action ' + current_action)
        //console.log('Bare : ' + stick)
      }
      //console.log('After Sub-Shrubs Select !')
      //console.log(current_plot.land_cover_data.transect)
    }

    /* Action Select Plant Base */
    $scope.select_plant_base = function (stick) {
      if (current_action == 'ADD_NEW' || current_action == 'EDIT_NEW'
        || current_action === 'ADD_OLD' || current_action === 'EDIT_OLD') {
        //console.log('Plant Base ' + stick)
        var image_url = ''
        if (stick.trim().toUpperCase() === STICK_1) {
          if (stick_1_bare == true) {
            //console.log('Not-Allowed by Bare')
            return
          }
          image_url = $scope.stick_segment_1_plant_base_image
        } else if (stick.trim().toUpperCase() === STICK_2) {
          if (stick_2_bare == true) {
            //console.log('Not-Allowed by Bare')
            return
          }
          image_url = $scope.stick_segment_2_plant_base_image
        } else if (stick.trim().toUpperCase() === STICK_3) {
          if (stick_3_bare == true) {
            //console.log('Not-Allowed by Bare')
            return
          }
          image_url = $scope.stick_segment_3_plant_base_image
        } else if (stick.trim().toUpperCase() === STICK_4) {
          if (stick_4_bare == true) {
            //console.log('Not-Allowed by Bare')
            return
          }
          image_url = $scope.stick_segment_4_plant_base_image
        } else if (stick.trim().toUpperCase() === STICK_5) {
          if (stick_5_bare == true) {
            //console.log('Not-Allowed by Bare')
            return
          }
          image_url = $scope.stick_segment_5_plant_base_image
        }

        // console.log("Tai sao : " + icon_plant_base_normal)
        if (image_url === icon_plant_base_normal) {
          /* Load in */
          //console.log('Load')
          seeToast2('Plant base', 2000)
          var transect_data = current_plot.land_cover_data.transect
          if (!isEmpty(transect_data) && transect_data.length == 20) {
            for (var i = 0; i < 20; i++) {
              if (transect_data[i].direction.trim().toUpperCase() === current_transect.trim().toUpperCase() &&
                transect_data[i].segment.range.trim().toUpperCase() === current_segment.trim().toUpperCase()) {
                transect_data[i].dominant_woody_species = current_plot.dominant_woody_species
                transect_data[i].dominant_woody_species_2 = current_plot.dominant_woody_species_2
                transect_data[i].dominant_nonwoody_species = current_plot.dominant_nonwoody_species
                transect_data[i].dominant_nonwoody_species_2 = current_plot.dominant_nonwoody_species_2

                if (stick.trim().toUpperCase() === STICK_1) {
                  transect_data[i].segment.stick_segment[0].index = 0
                  if (isEmpty(transect_data[i].segment.stick_segment[0].cover)) {
                    transect_data[i].segment.stick_segment[0].cover = plant_base_name_normal
                  } else {
                    if (transect_data[i].segment.stick_segment[0].cover.trim().toUpperCase().indexOf(',') > -1) {
                      var array_covers = transect_data[i].segment.stick_segment[0].cover.split(',')
                      array_covers = addItem(array_covers, plant_base_name_normal)
                      transect_data[i].segment.stick_segment[0].cover = array_covers.toString()
                    } else {
                      if (transect_data[i].segment.stick_segment[0].cover.trim().toUpperCase().indexOf(PLANT_BASE_NAME_UPPER) > -1) {
                      } else {
                        var array_covers = []
                        array_covers = addItem(array_covers, transect_data[i].segment.stick_segment[0].cover)
                        array_covers = addItem(array_covers, plant_base_name_normal)
                        transect_data[i].segment.stick_segment[0].cover = array_covers.toString()
                      }
                    }
                  }
                  $scope.stick_segment_1_plant_base_image = icon_plant_base_selected
                } else if (stick.trim().toUpperCase() === STICK_2) {
                  transect_data[i].segment.stick_segment[1].index = 1
                  if (isEmpty(transect_data[i].segment.stick_segment[1].cover)) {
                    transect_data[i].segment.stick_segment[1].cover = plant_base_name_normal
                  } else {
                    if (transect_data[i].segment.stick_segment[1].cover.trim().toUpperCase().indexOf(',') > -1) {
                      var array_covers = transect_data[i].segment.stick_segment[1].cover.split(',')
                      array_covers = addItem(array_covers, plant_base_name_normal)
                      transect_data[i].segment.stick_segment[1].cover = array_covers.toString()
                    } else {
                      if (transect_data[i].segment.stick_segment[1].cover.trim().toUpperCase().indexOf(PLANT_BASE_NAME_UPPER) > -1) {
                      } else {
                        var array_covers = []
                        array_covers = addItem(array_covers, transect_data[i].segment.stick_segment[1].cover)
                        array_covers = addItem(array_covers, plant_base_name_normal)
                        transect_data[i].segment.stick_segment[1].cover = array_covers.toString()
                      }
                    }
                  }
                  $scope.stick_segment_2_plant_base_image = icon_plant_base_selected
                } else if (stick.trim().toUpperCase() === STICK_3) {
                  transect_data[i].segment.stick_segment[2].index = 2
                  if (isEmpty(transect_data[i].segment.stick_segment[2].cover)) {
                    transect_data[i].segment.stick_segment[2].cover = plant_base_name_normal
                  } else {
                    if (transect_data[i].segment.stick_segment[2].cover.trim().toUpperCase().indexOf(',') > -1) {
                      var array_covers = transect_data[i].segment.stick_segment[2].cover.split(',')
                      array_covers = addItem(array_covers, plant_base_name_normal)
                      transect_data[i].segment.stick_segment[2].cover = array_covers.toString()
                    } else {
                      if (transect_data[i].segment.stick_segment[2].cover.trim().toUpperCase().indexOf(PLANT_BASE_NAME_UPPER) > -1) {
                        // console.log("Da co - Ko them nua")
                      } else {
                        var array_covers = []
                        array_covers = addItem(array_covers, transect_data[i].segment.stick_segment[2].cover)
                        array_covers = addItem(array_covers, plant_base_name_normal)
                        transect_data[i].segment.stick_segment[2].cover = array_covers.toString()
                      }
                    }
                  }
                  $scope.stick_segment_3_plant_base_image = icon_plant_base_selected
                } else if (stick.trim().toUpperCase() === STICK_4) {
                  transect_data[i].segment.stick_segment[3].index = 3
                  if (isEmpty(transect_data[i].segment.stick_segment[3].cover)) {
                    transect_data[i].segment.stick_segment[3].cover = plant_base_name_normal
                  } else {
                    if (transect_data[i].segment.stick_segment[3].cover.trim().toUpperCase().indexOf(',') > -1) {
                      var array_covers = transect_data[i].segment.stick_segment[3].cover.split(',')
                      array_covers = addItem(array_covers, plant_base_name_normal)
                      transect_data[i].segment.stick_segment[3].cover = array_covers.toString()
                    } else {
                      if (transect_data[i].segment.stick_segment[3].cover.trim().toUpperCase().indexOf(PLANT_BASE_NAME_UPPER) > -1) {
                        // console.log("Da co - Ko them nua")
                      } else {
                        var array_covers = []
                        array_covers = addItem(array_covers, transect_data[i].segment.stick_segment[3].cover)
                        array_covers = addItem(array_covers, plant_base_name_normal)
                        transect_data[i].segment.stick_segment[3].cover = array_covers.toString()
                      }
                    }
                  }
                  $scope.stick_segment_4_plant_base_image = icon_plant_base_selected
                } else if (stick.trim().toUpperCase() === STICK_5) {
                  transect_data[i].segment.stick_segment[4].index = 4
                  if (isEmpty(transect_data[i].segment.stick_segment[4].cover)) {
                    transect_data[i].segment.stick_segment[4].cover = plant_base_name_normal
                  } else {
                    if (transect_data[i].segment.stick_segment[4].cover.trim().toUpperCase().indexOf(',') > -1) {
                      var array_covers = transect_data[i].segment.stick_segment[4].cover.split(',')
                      array_covers = addItem(array_covers, plant_base_name_normal)
                      transect_data[i].segment.stick_segment[4].cover = array_covers.toString()
                    } else {
                      if (transect_data[i].segment.stick_segment[4].cover.trim().toUpperCase().indexOf(PLANT_BASE_NAME_UPPER) > -1) {
                      } else {
                        var array_covers = []
                        array_covers = addItem(array_covers, transect_data[i].segment.stick_segment[4].cover)
                        array_covers = addItem(array_covers, plant_base_name_normal)
                        transect_data[i].segment.stick_segment[4].cover = array_covers.toString()
                      }
                    }
                  }
                  $scope.stick_segment_5_plant_base_image = icon_plant_base_selected
                } else {
                  console.log('Error 1442 Plant Base')
                }

                break
              }
            }
          } else {
            console.log('error to construct transect')
          }
          // console.log(transect_data)

        } else {
          /* Unload */
          //console.log('Unload')
          var transect_data = current_plot.land_cover_data.transect
          if (!isEmpty(transect_data) && transect_data.length == 20) {
            for (var i = 0; i < 20; i++) {
              if (transect_data[i].direction.trim().toUpperCase() === current_transect.trim().toUpperCase() &&
                transect_data[i].segment.range.trim().toUpperCase() === current_segment.trim().toUpperCase()) {
                transect_data[i].dominant_woody_species = current_plot.dominant_woody_species
                transect_data[i].dominant_woody_species_2 = current_plot.dominant_woody_species_2
                transect_data[i].dominant_nonwoody_species = current_plot.dominant_nonwoody_species
                transect_data[i].dominant_nonwoody_species_2 = current_plot.dominant_nonwoody_species_2

                if (stick.trim().toUpperCase() === STICK_1) {
                  transect_data[i].segment.stick_segment[0].index = 0
                  if (isEmpty(transect_data[i].segment.stick_segment[0].cover)) {
                  } else {
                    if (transect_data[i].segment.stick_segment[0].cover.trim().toUpperCase().indexOf(',') > -1) {
                      var array_covers = transect_data[i].segment.stick_segment[0].cover.split(',')
                      array_covers = removeItem(array_covers, plant_base_name_normal)
                      transect_data[i].segment.stick_segment[0].cover = array_covers.toString()
                    } else {
                      if (transect_data[i].segment.stick_segment[0].cover.trim().toUpperCase().indexOf(PLANT_BASE_NAME_UPPER) > -1) {
                        transect_data[i].segment.stick_segment[0].cover = ''
                      }
                    }
                  }
                  $scope.stick_segment_1_plant_base_image = icon_plant_base_normal
                } else if (stick.trim().toUpperCase() === STICK_2) {
                  transect_data[i].segment.stick_segment[1].index = 1
                  if (isEmpty(transect_data[i].segment.stick_segment[1].cover)) {
                  } else {
                    if (transect_data[i].segment.stick_segment[1].cover.trim().toUpperCase().indexOf(',') > -1) {
                      var array_covers = transect_data[i].segment.stick_segment[1].cover.split(',')
                      array_covers = removeItem(array_covers, plant_base_name_normal)
                      transect_data[i].segment.stick_segment[1].cover = array_covers.toString()
                    } else {
                      if (transect_data[i].segment.stick_segment[1].cover.trim().toUpperCase().indexOf(PLANT_BASE_NAME_UPPER) > -1) {
                        transect_data[i].segment.stick_segment[1].cover = ''
                      }
                    }
                  }
                  $scope.stick_segment_2_plant_base_image = icon_plant_base_normal
                } else if (stick.trim().toUpperCase() === STICK_3) {
                  transect_data[i].segment.stick_segment[2].index = 2
                  if (isEmpty(transect_data[i].segment.stick_segment[2].cover)) {
                  } else {
                    if (transect_data[i].segment.stick_segment[2].cover.trim().toUpperCase().indexOf(',') > -1) {
                      var array_covers = transect_data[i].segment.stick_segment[2].cover.split(',')
                      array_covers = removeItem(array_covers, plant_base_name_normal)
                      transect_data[i].segment.stick_segment[2].cover = array_covers.toString()
                    } else {
                      if (transect_data[i].segment.stick_segment[2].cover.trim().toUpperCase().indexOf(PLANT_BASE_NAME_UPPER) > -1) {
                        transect_data[i].segment.stick_segment[2].cover = ''
                      }
                    }
                  }
                  $scope.stick_segment_3_plant_base_image = icon_plant_base_normal
                } else if (stick.trim().toUpperCase() === STICK_4) {
                  transect_data[i].segment.stick_segment[3].index = 3
                  if (isEmpty(transect_data[i].segment.stick_segment[3].cover)) {
                  } else {
                    if (transect_data[i].segment.stick_segment[3].cover.trim().toUpperCase().indexOf(',') > -1) {
                      var array_covers = transect_data[i].segment.stick_segment[3].cover.split(',')
                      array_covers = removeItem(array_covers, plant_base_name_normal)
                      transect_data[i].segment.stick_segment[3].cover = array_covers.toString()
                    } else {
                      if (transect_data[i].segment.stick_segment[3].cover.trim().toUpperCase().indexOf(PLANT_BASE_NAME_UPPER) > -1) {
                        transect_data[i].segment.stick_segment[3].cover = ''
                      }
                    }
                  }
                  $scope.stick_segment_4_plant_base_image = icon_plant_base_normal
                } else if (stick.trim().toUpperCase() === STICK_5) {
                  transect_data[i].segment.stick_segment[4].index = 4
                  if (isEmpty(transect_data[i].segment.stick_segment[4].cover)) {
                  } else {
                    if (transect_data[i].segment.stick_segment[4].cover.trim().toUpperCase().indexOf(',') > -1) {
                      var array_covers = transect_data[i].segment.stick_segment[4].cover.split(',')
                      array_covers = removeItem(array_covers, plant_base_name_normal)
                      transect_data[i].segment.stick_segment[4].cover = array_covers.toString()
                    } else {
                      if (transect_data[i].segment.stick_segment[4].cover.trim().toUpperCase().indexOf(PLANT_BASE_NAME_UPPER) > -1) {
                        transect_data[i].segment.stick_segment[4].cover = ''
                      }
                    }
                  }
                  $scope.stick_segment_5_plant_base_image = icon_plant_base_normal
                } else {
                  console.log('Error 2990 Plant Base')
                }
              }
            }
          } else {
            console.log('error to construct transect')
          }
        }
        current_plot.land_cover_data.transect = transect_data
      } else {
        //console.log('Action ' + current_action)
        //console.log('Bare : ' + stick)
      }
      //console.log('After Plant Base Select !')
      //console.log(current_plot.land_cover_data.transect)
    }

    /* Action Select Perennial Grasses */
    $scope.select_perennial_grass = function (stick) {
      if (current_action == 'ADD_NEW' || current_action == 'EDIT_NEW'
        || current_action === 'ADD_OLD' || current_action === 'EDIT_OLD') {
        //console.log('Perennial Grasses ' + stick)
        var image_url = ''
        if (stick.trim().toUpperCase() === STICK_1) {
          if (stick_1_bare == true) {
            //console.log('Not-Allowed by Bare')
            return
          }
          image_url = $scope.stick_segment_1_perennial_grass_image
        } else if (stick.trim().toUpperCase() === STICK_2) {
          if (stick_2_bare == true) {
            //console.log('Not-Allowed by Bare')
            return
          }
          image_url = $scope.stick_segment_2_perennial_grass_image
        } else if (stick.trim().toUpperCase() === STICK_3) {
          if (stick_3_bare == true) {
            //console.log('Not-Allowed by Bare')
            return
          }
          image_url = $scope.stick_segment_3_perennial_grass_image
        } else if (stick.trim().toUpperCase() === STICK_4) {
          if (stick_4_bare == true) {
            //console.log('Not-Allowed by Bare')
            return
          }
          image_url = $scope.stick_segment_4_perennial_grass_image
        } else if (stick.trim().toUpperCase() === STICK_5) {
          if (stick_5_bare == true) {
            //console.log('Not-Allowed by Bare')
            return
          }
          image_url = $scope.stick_segment_5_perennial_grass_image
        }

        if (image_url === icon_perennial_grasses_normal) {
          /* Load in */
          //console.log('Load')
          seeToast2('Perennial grass ', 2000)
          var transect_data = current_plot.land_cover_data.transect
          if (!isEmpty(transect_data) && transect_data.length == 20) {
            for (var i = 0; i < 20; i++) {
              if (transect_data[i].direction.trim().toUpperCase() === current_transect.trim().toUpperCase() &&
                transect_data[i].segment.range.trim().toUpperCase() === current_segment.trim().toUpperCase()) {
                transect_data[i].dominant_woody_species = current_plot.dominant_woody_species
                transect_data[i].dominant_woody_species_2 = current_plot.dominant_woody_species_2
                transect_data[i].dominant_nonwoody_species = current_plot.dominant_nonwoody_species
                transect_data[i].dominant_nonwoody_species_2 = current_plot.dominant_nonwoody_species_2

                if (stick.trim().toUpperCase() === STICK_1) {
                  transect_data[i].segment.stick_segment[0].index = 0
                  if (isEmpty(transect_data[i].segment.stick_segment[0].cover)) {
                    transect_data[i].segment.stick_segment[0].cover = perennial_grasses_name_normal
                  } else {
                    if (transect_data[i].segment.stick_segment[0].cover.trim().toUpperCase().indexOf(',') > -1) {
                      var array_covers = transect_data[i].segment.stick_segment[0].cover.split(',')
                      array_covers = addItem(array_covers, perennial_grasses_name_normal)
                      transect_data[i].segment.stick_segment[0].cover = array_covers.toString()
                    } else {
                      if (transect_data[i].segment.stick_segment[0].cover.trim().toUpperCase().indexOf(PERENNIAL_GRASSES_NAME_UPPER) > -1) {
                        //console.log('Da co - Ko them nua')
                      } else {
                        var array_covers = []
                        array_covers = addItem(array_covers, transect_data[i].segment.stick_segment[0].cover)
                        array_covers = addItem(array_covers, perennial_grasses_name_normal)
                        transect_data[i].segment.stick_segment[0].cover = array_covers.toString()
                      }
                    }
                  }
                  $scope.stick_segment_1_perennial_grass_image = icon_perennial_grasses_selected
                } else if (stick.trim().toUpperCase() === STICK_2) {
                  transect_data[i].segment.stick_segment[1].index = 1
                  if (isEmpty(transect_data[i].segment.stick_segment[1].cover)) {
                    transect_data[i].segment.stick_segment[1].cover = perennial_grasses_name_normal
                  } else {
                    if (transect_data[i].segment.stick_segment[1].cover.trim().toUpperCase().indexOf(',') > -1) {
                      var array_covers = transect_data[i].segment.stick_segment[1].cover.split(',')
                      array_covers = addItem(array_covers, perennial_grasses_name_normal)
                      transect_data[i].segment.stick_segment[1].cover = array_covers.toString()
                    } else {
                      if (transect_data[i].segment.stick_segment[1].cover.trim().toUpperCase().indexOf(PERENNIAL_GRASSES_NAME_UPPER) > -1) {
                        //console.log('Da co - Ko them nua')
                      } else {
                        var array_covers = []
                        array_covers = addItem(array_covers, transect_data[i].segment.stick_segment[1].cover)
                        array_covers = addItem(array_covers, perennial_grasses_name_normal)
                        transect_data[i].segment.stick_segment[1].cover = array_covers.toString()
                      }
                    }
                  }
                  $scope.stick_segment_2_perennial_grass_image = icon_perennial_grasses_selected
                } else if (stick.trim().toUpperCase() === STICK_3) {
                  transect_data[i].segment.stick_segment[2].index = 2
                  if (isEmpty(transect_data[i].segment.stick_segment[2].cover)) {
                    transect_data[i].segment.stick_segment[2].cover = perennial_grasses_name_normal
                  } else {
                    if (transect_data[i].segment.stick_segment[2].cover.trim().toUpperCase().indexOf(',') > -1) {
                      var array_covers = transect_data[i].segment.stick_segment[2].cover.split(',')
                      array_covers = addItem(array_covers, perennial_grasses_name_normal)
                      transect_data[i].segment.stick_segment[2].cover = array_covers.toString()
                    } else {
                      if (transect_data[i].segment.stick_segment[2].cover.trim().toUpperCase().indexOf(PERENNIAL_GRASSES_NAME_UPPER) > -1) {
                        //console.log('Da co - Ko them nua')
                      } else {
                        var array_covers = []
                        array_covers = addItem(array_covers, transect_data[i].segment.stick_segment[2].cover)
                        array_covers = addItem(array_covers, perennial_grasses_name_normal)
                        transect_data[i].segment.stick_segment[2].cover = array_covers.toString()
                      }
                    }
                  }
                  $scope.stick_segment_3_perennial_grass_image = icon_perennial_grasses_selected
                } else if (stick.trim().toUpperCase() === STICK_4) {
                  transect_data[i].segment.stick_segment[3].index = 3
                  if (isEmpty(transect_data[i].segment.stick_segment[3].cover)) {
                    transect_data[i].segment.stick_segment[3].cover = perennial_grasses_name_normal
                  } else {
                    if (transect_data[i].segment.stick_segment[3].cover.trim().toUpperCase().indexOf(',') > -1) {
                      var array_covers = transect_data[i].segment.stick_segment[3].cover.split(',')
                      array_covers = addItem(array_covers, perennial_grasses_name_normal)
                      transect_data[i].segment.stick_segment[3].cover = array_covers.toString()
                    } else {
                      if (transect_data[i].segment.stick_segment[3].cover.trim().toUpperCase().indexOf(PERENNIAL_GRASSES_NAME_UPPER) > -1) {
                        //console.log('Da co - Ko them nua')
                      } else {
                        var array_covers = []
                        array_covers = addItem(array_covers, transect_data[i].segment.stick_segment[3].cover)
                        array_covers = addItem(array_covers, perennial_grasses_name_normal)
                        transect_data[i].segment.stick_segment[3].cover = array_covers.toString()
                      }
                    }
                  }
                  $scope.stick_segment_4_perennial_grass_image = icon_perennial_grasses_selected
                } else if (stick.trim().toUpperCase() === STICK_5) {
                  transect_data[i].segment.stick_segment[4].index = 4
                  if (isEmpty(transect_data[i].segment.stick_segment[4].cover)) {
                    transect_data[i].segment.stick_segment[4].cover = perennial_grasses_name_normal
                  } else {
                    if (transect_data[i].segment.stick_segment[4].cover.trim().toUpperCase().indexOf(',') > -1) {
                      var array_covers = transect_data[i].segment.stick_segment[4].cover.split(',')
                      array_covers = addItem(array_covers, perennial_grasses_name_normal)
                      transect_data[i].segment.stick_segment[4].cover = array_covers.toString()
                    } else {
                      if (transect_data[i].segment.stick_segment[4].cover.trim().toUpperCase().indexOf(PERENNIAL_GRASSES_NAME_UPPER) > -1) {
                        //console.log('Da co - Ko them nua')
                      } else {
                        var array_covers = []
                        array_covers = addItem(array_covers, transect_data[i].segment.stick_segment[4].cover)
                        array_covers = addItem(array_covers, perennial_grasses_name_normal)
                        transect_data[i].segment.stick_segment[4].cover = array_covers.toString()
                      }
                    }
                  }
                  $scope.stick_segment_5_perennial_grass_image = icon_perennial_grasses_selected
                } else {
                  console.log('Error 1442 Perennial grasses')
                }

                break
              }
            }
          } else {
            console.log('error to construct transect')
          }
          // console.log(transect_data)

        } else {
          /* Unload */
          //console.log('Unload')
          var transect_data = current_plot.land_cover_data.transect
          if (!isEmpty(transect_data) && transect_data.length == 20) {
            for (var i = 0; i < 20; i++) {
              if (transect_data[i].direction.trim().toUpperCase() === current_transect.trim().toUpperCase() &&
                transect_data[i].segment.range.trim().toUpperCase() === current_segment.trim().toUpperCase()) {
                transect_data[i].dominant_woody_species = current_plot.dominant_woody_species
                transect_data[i].dominant_woody_species_2 = current_plot.dominant_woody_species_2
                transect_data[i].dominant_nonwoody_species = current_plot.dominant_nonwoody_species
                transect_data[i].dominant_nonwoody_species_2 = current_plot.dominant_nonwoody_species_2

                if (stick.trim().toUpperCase() === STICK_1) {
                  transect_data[i].segment.stick_segment[0].index = 0
                  if (isEmpty(transect_data[i].segment.stick_segment[0].cover)) {
                  } else {
                    if (transect_data[i].segment.stick_segment[0].cover.trim().toUpperCase().indexOf(',') > -1) {
                      var array_covers = transect_data[i].segment.stick_segment[0].cover.split(',')
                      array_covers = removeItem(array_covers, perennial_grasses_name_normal)
                      transect_data[i].segment.stick_segment[0].cover = array_covers.toString()
                    } else {
                      if (transect_data[i].segment.stick_segment[0].cover.trim().toUpperCase().indexOf(PERENNIAL_GRASSES_NAME_UPPER) > -1) {
                        transect_data[i].segment.stick_segment[0].cover = ''
                      }
                    }
                  }
                  $scope.stick_segment_1_perennial_grass_image = icon_perennial_grasses_normal
                } else if (stick.trim().toUpperCase() === STICK_2) {
                  transect_data[i].segment.stick_segment[1].index = 1
                  if (isEmpty(transect_data[i].segment.stick_segment[1].cover)) {
                  } else {
                    if (transect_data[i].segment.stick_segment[1].cover.trim().toUpperCase().indexOf(',') > -1) {
                      var array_covers = transect_data[i].segment.stick_segment[1].cover.split(',')
                      array_covers = removeItem(array_covers, perennial_grasses_name_normal)
                      transect_data[i].segment.stick_segment[1].cover = array_covers.toString()
                    } else {
                      if (transect_data[i].segment.stick_segment[1].cover.trim().toUpperCase().indexOf(PERENNIAL_GRASSES_NAME_UPPER) > -1) {
                        transect_data[i].segment.stick_segment[1].cover = ''
                      }
                    }
                  }
                  $scope.stick_segment_2_perennial_grass_image = icon_perennial_grasses_normal
                } else if (stick.trim().toUpperCase() === STICK_3) {
                  transect_data[i].segment.stick_segment[2].index = 2
                  if (isEmpty(transect_data[i].segment.stick_segment[2].cover)) {
                  } else {
                    if (transect_data[i].segment.stick_segment[2].cover.trim().toUpperCase().indexOf(',') > -1) {
                      var array_covers = transect_data[i].segment.stick_segment[2].cover.split(',')
                      array_covers = removeItem(array_covers, perennial_grasses_name_normal)
                      transect_data[i].segment.stick_segment[2].cover = array_covers.toString()
                    } else {
                      if (transect_data[i].segment.stick_segment[2].cover.trim().toUpperCase().indexOf(PERENNIAL_GRASSES_NAME_UPPER) > -1) {
                        transect_data[i].segment.stick_segment[2].cover = ''
                      }
                    }
                  }
                  $scope.stick_segment_3_perennial_grass_image = icon_perennial_grasses_normal
                } else if (stick.trim().toUpperCase() === STICK_4) {
                  transect_data[i].segment.stick_segment[3].index = 3
                  if (isEmpty(transect_data[i].segment.stick_segment[3].cover)) {
                  } else {
                    if (transect_data[i].segment.stick_segment[3].cover.trim().toUpperCase().indexOf(',') > -1) {
                      var array_covers = transect_data[i].segment.stick_segment[3].cover.split(',')
                      array_covers = removeItem(array_covers, perennial_grasses_name_normal)
                      transect_data[i].segment.stick_segment[3].cover = array_covers.toString()
                    } else {
                      if (transect_data[i].segment.stick_segment[3].cover.trim().toUpperCase().indexOf(PERENNIAL_GRASSES_NAME_UPPER) > -1) {
                        transect_data[i].segment.stick_segment[3].cover = ''
                      }
                    }
                  }
                  $scope.stick_segment_4_perennial_grass_image = icon_perennial_grasses_normal
                } else if (stick.trim().toUpperCase() === STICK_5) {
                  transect_data[i].segment.stick_segment[4].index = 4
                  if (isEmpty(transect_data[i].segment.stick_segment[4].cover)) {
                  } else {
                    if (transect_data[i].segment.stick_segment[4].cover.trim().toUpperCase().indexOf(',') > -1) {
                      var array_covers = transect_data[i].segment.stick_segment[4].cover.split(',')
                      array_covers = removeItem(array_covers, perennial_grasses_name_normal)
                      transect_data[i].segment.stick_segment[4].cover = array_covers.toString()
                    } else {
                      if (transect_data[i].segment.stick_segment[4].cover.trim().toUpperCase().indexOf(PERENNIAL_GRASSES_NAME_UPPER) > -1) {
                        transect_data[i].segment.stick_segment[4].cover = ''
                      }
                    }
                  }
                  $scope.stick_segment_5_perennial_grass_image = icon_perennial_grasses_normal
                } else {
                  console.log('Error 2990 Perennial')
                }
              }
            }
          } else {
            console.log('error to construct transect')
          }
        }
        current_plot.land_cover_data.transect = transect_data
      } else {
        //console.log('Action ' + current_action)
        //console.log('Bare : ' + stick)
      }
      //console.log('After Perenial Select !')
      //console.log(current_plot.land_cover_data.transect)
    }

    /* Action Select Annual Plants */
    $scope.select_annual_grass = function (stick) {
      if (current_action == 'ADD_NEW' || current_action == 'EDIT_NEW'
        || current_action === 'ADD_OLD' || current_action === 'EDIT_OLD') {
        //console.log('Annual plants ' + stick)
        var image_url = ''
        if (stick.trim().toUpperCase() === STICK_1) {
          if (stick_1_bare == true) {
            //console.log('Not-Allowed by Bare')
            return
          }
          image_url = $scope.stick_segment_1_annual_grass_image
        } else if (stick.trim().toUpperCase() === STICK_2) {
          if (stick_2_bare == true) {
            //console.log('Not-Allowed by Bare')
            return
          }
          image_url = $scope.stick_segment_2_annual_grass_image
        } else if (stick.trim().toUpperCase() === STICK_3) {
          if (stick_3_bare == true) {
            //console.log('Not-Allowed by Bare')
            return
          }
          image_url = $scope.stick_segment_3_annual_grass_image
        } else if (stick.trim().toUpperCase() === STICK_4) {
          if (stick_4_bare == true) {
            //console.log('Not-Allowed by Bare')
            return
          }
          image_url = $scope.stick_segment_4_annual_grass_image
        } else if (stick.trim().toUpperCase() === STICK_5) {
          if (stick_5_bare == true) {
            //console.log('Not-Allowed by Bare')
            return
          }
          image_url = $scope.stick_segment_5_annual_grass_image
        }

        if (image_url === icon_annual_plant_normal) {
          /* Load in */
          //console.log('Load')
          seeToast2('Annual plant ', 2000)
          var transect_data = current_plot.land_cover_data.transect
          if (!isEmpty(transect_data) && transect_data.length == 20) {
            for (var i = 0; i < 20; i++) {
              if (transect_data[i].direction.trim().toUpperCase() === current_transect.trim().toUpperCase() &&
                transect_data[i].segment.range.trim().toUpperCase() === current_segment.trim().toUpperCase()) {
                transect_data[i].dominant_woody_species = current_plot.dominant_woody_species
                transect_data[i].dominant_woody_species_2 = current_plot.dominant_woody_species_2
                transect_data[i].dominant_nonwoody_species = current_plot.dominant_nonwoody_species
                transect_data[i].dominant_nonwoody_species_2 = current_plot.dominant_nonwoody_species_2

                if (stick.trim().toUpperCase() === STICK_1) {
                  transect_data[i].segment.stick_segment[0].index = 0
                  if (isEmpty(transect_data[i].segment.stick_segment[0].cover)) {
                    transect_data[i].segment.stick_segment[0].cover = annual_plant_name_normal
                  } else {
                    if (transect_data[i].segment.stick_segment[0].cover.trim().toUpperCase().indexOf(',') > -1) {
                      var array_covers = transect_data[i].segment.stick_segment[0].cover.split(',')
                      array_covers = addItem(array_covers, annual_plant_name_normal)
                      transect_data[i].segment.stick_segment[0].cover = array_covers.toString()
                    } else {
                      if (transect_data[i].segment.stick_segment[0].cover.trim().toUpperCase().indexOf(ANNUAL_PLANT_NAME_UPPER) > -1) {
                        //console.log('Da co - Ko them nua')
                      } else {
                        var array_covers = []
                        array_covers = addItem(array_covers, transect_data[i].segment.stick_segment[0].cover)
                        array_covers = addItem(array_covers, annual_plant_name_normal)
                        transect_data[i].segment.stick_segment[0].cover = array_covers.toString()
                      }
                    }
                  }
                  $scope.stick_segment_1_annual_grass_image = icon_annual_plant_selected
                } else if (stick.trim().toUpperCase() === STICK_2) {
                  transect_data[i].segment.stick_segment[1].index = 1
                  if (isEmpty(transect_data[i].segment.stick_segment[1].cover)) {
                    transect_data[i].segment.stick_segment[1].cover = annual_plant_name_normal
                  } else {
                    if (transect_data[i].segment.stick_segment[1].cover.trim().toUpperCase().indexOf(',') > -1) {
                      var array_covers = transect_data[i].segment.stick_segment[1].cover.split(',')
                      array_covers = addItem(array_covers, annual_plant_name_normal)
                      transect_data[i].segment.stick_segment[1].cover = array_covers.toString()
                    } else {
                      if (transect_data[i].segment.stick_segment[1].cover.trim().toUpperCase().indexOf(ANNUAL_PLANT_NAME_UPPER) > -1) {
                        //console.log('Da co - Ko them nua')
                      } else {
                        var array_covers = []
                        array_covers = addItem(array_covers, transect_data[i].segment.stick_segment[1].cover)
                        array_covers = addItem(array_covers, annual_plant_name_normal)
                        transect_data[i].segment.stick_segment[1].cover = array_covers.toString()
                      }
                    }
                  }
                  $scope.stick_segment_2_annual_grass_image = icon_annual_plant_selected
                } else if (stick.trim().toUpperCase() === STICK_3) {
                  transect_data[i].segment.stick_segment[2].index = 2
                  if (isEmpty(transect_data[i].segment.stick_segment[2].cover)) {
                    transect_data[i].segment.stick_segment[2].cover = annual_plant_name_normal
                  } else {
                    if (transect_data[i].segment.stick_segment[2].cover.trim().toUpperCase().indexOf(',') > -1) {
                      var array_covers = transect_data[i].segment.stick_segment[2].cover.split(',')
                      array_covers = addItem(array_covers, annual_plant_name_normal)
                      transect_data[i].segment.stick_segment[2].cover = array_covers.toString()
                    } else {
                      if (transect_data[i].segment.stick_segment[2].cover.trim().toUpperCase().indexOf(ANNUAL_PLANT_NAME_UPPER) > -1) {
                        //console.log('Da co - Ko them nua')
                      } else {
                        var array_covers = []
                        array_covers = addItem(array_covers, transect_data[i].segment.stick_segment[2].cover)
                        array_covers = addItem(array_covers, annual_plant_name_normal)
                        transect_data[i].segment.stick_segment[2].cover = array_covers.toString()
                      }
                    }
                  }
                  $scope.stick_segment_3_annual_grass_image = icon_annual_plant_selected
                } else if (stick.trim().toUpperCase() === STICK_4) {
                  transect_data[i].segment.stick_segment[3].index = 3
                  if (isEmpty(transect_data[i].segment.stick_segment[3].cover)) {
                    transect_data[i].segment.stick_segment[3].cover = annual_plant_name_normal
                  } else {
                    if (transect_data[i].segment.stick_segment[3].cover.trim().toUpperCase().indexOf(',') > -1) {
                      var array_covers = transect_data[i].segment.stick_segment[3].cover.split(',')
                      array_covers = addItem(array_covers, annual_plant_name_normal)
                      transect_data[i].segment.stick_segment[3].cover = array_covers.toString()
                    } else {
                      if (transect_data[i].segment.stick_segment[3].cover.trim().toUpperCase().indexOf(ANNUAL_PLANT_NAME_UPPER) > -1) {
                        //console.log('Da co - Ko them nua')
                      } else {
                        var array_covers = []
                        array_covers = addItem(array_covers, transect_data[i].segment.stick_segment[3].cover)
                        array_covers = addItem(array_covers, annual_plant_name_normal)
                        transect_data[i].segment.stick_segment[3].cover = array_covers.toString()
                      }
                    }
                  }
                  $scope.stick_segment_4_annual_grass_image = icon_annual_plant_selected
                } else if (stick.trim().toUpperCase() === STICK_5) {
                  transect_data[i].segment.stick_segment[4].index = 4
                  if (isEmpty(transect_data[i].segment.stick_segment[4].cover)) {
                    transect_data[i].segment.stick_segment[4].cover = annual_plant_name_normal
                  } else {
                    if (transect_data[i].segment.stick_segment[4].cover.trim().toUpperCase().indexOf(',') > -1) {
                      var array_covers = transect_data[i].segment.stick_segment[4].cover.split(',')
                      array_covers = addItem(array_covers, annual_plant_name_normal)
                      transect_data[i].segment.stick_segment[4].cover = array_covers.toString()
                    } else {
                      if (transect_data[i].segment.stick_segment[4].cover.trim().toUpperCase().indexOf(ANNUAL_PLANT_NAME_UPPER) > -1) {
                        //console.log('Da co - Ko them nua')
                      } else {
                        var array_covers = []
                        array_covers = addItem(array_covers, transect_data[i].segment.stick_segment[4].cover)
                        array_covers = addItem(array_covers, annual_plant_name_normal)
                        transect_data[i].segment.stick_segment[4].cover = array_covers.toString()
                      }
                    }
                  }
                  $scope.stick_segment_5_annual_grass_image = icon_annual_plant_selected
                } else {
                  console.log('Error 1442 Perennial grasses')
                }

                break
              }
            }
          } else {
            console.log('error to construct transect')
          }
          // console.log(transect_data)

        } else {
          /* Unload */
          //console.log('Unload')
          var transect_data = current_plot.land_cover_data.transect
          if (!isEmpty(transect_data) && transect_data.length == 20) {
            for (var i = 0; i < 20; i++) {
              if (transect_data[i].direction.trim().toUpperCase() === current_transect.trim().toUpperCase() &&
                transect_data[i].segment.range.trim().toUpperCase() === current_segment.trim().toUpperCase()) {
                transect_data[i].dominant_woody_species = current_plot.dominant_woody_species
                transect_data[i].dominant_woody_species_2 = current_plot.dominant_woody_species_2
                transect_data[i].dominant_nonwoody_species = current_plot.dominant_nonwoody_species
                transect_data[i].dominant_nonwoody_species_2 = current_plot.dominant_nonwoody_species_2

                if (stick.trim().toUpperCase() === STICK_1) {
                  transect_data[i].segment.stick_segment[0].index = 0
                  if (isEmpty(transect_data[i].segment.stick_segment[0].cover)) {
                  } else {
                    if (transect_data[i].segment.stick_segment[0].cover.trim().toUpperCase().indexOf(',') > -1) {
                      var array_covers = transect_data[i].segment.stick_segment[0].cover.split(',')
                      array_covers = removeItem(array_covers, annual_plant_name_normal)
                      transect_data[i].segment.stick_segment[0].cover = array_covers.toString()
                    } else {
                      if (transect_data[i].segment.stick_segment[0].cover.trim().toUpperCase().indexOf(ANNUAL_PLANT_NAME_UPPER) > -1) {
                        transect_data[i].segment.stick_segment[0].cover = ''
                      }
                    }
                  }
                  $scope.stick_segment_1_annual_grass_image = icon_annual_plant_normal
                } else if (stick.trim().toUpperCase() === STICK_2) {
                  transect_data[i].segment.stick_segment[1].index = 1
                  if (isEmpty(transect_data[i].segment.stick_segment[1].cover)) {
                  } else {
                    if (transect_data[i].segment.stick_segment[1].cover.trim().toUpperCase().indexOf(',') > -1) {
                      var array_covers = transect_data[i].segment.stick_segment[1].cover.split(',')
                      array_covers = removeItem(array_covers, annual_plant_name_normal)
                      transect_data[i].segment.stick_segment[1].cover = array_covers.toString()
                    } else {
                      if (transect_data[i].segment.stick_segment[1].cover.trim().toUpperCase().indexOf(ANNUAL_PLANT_NAME_UPPER) > -1) {
                        transect_data[i].segment.stick_segment[1].cover = ''
                      }
                    }
                  }
                  $scope.stick_segment_2_annual_grass_image = icon_annual_plant_normal
                } else if (stick.trim().toUpperCase() === STICK_3) {
                  transect_data[i].segment.stick_segment[2].index = 2
                  if (isEmpty(transect_data[i].segment.stick_segment[2].cover)) {
                  } else {
                    if (transect_data[i].segment.stick_segment[2].cover.trim().toUpperCase().indexOf(',') > -1) {
                      var array_covers = transect_data[i].segment.stick_segment[2].cover.split(',')
                      array_covers = removeItem(array_covers, annual_plant_name_normal)
                      transect_data[i].segment.stick_segment[2].cover = array_covers.toString()
                    } else {
                      if (transect_data[i].segment.stick_segment[2].cover.trim().toUpperCase().indexOf(ANNUAL_PLANT_NAME_UPPER) > -1) {
                        transect_data[i].segment.stick_segment[2].cover = ''
                      }
                    }
                  }
                  $scope.stick_segment_3_annual_grass_image = icon_annual_plant_normal
                } else if (stick.trim().toUpperCase() === STICK_4) {
                  transect_data[i].segment.stick_segment[3].index = 3
                  if (isEmpty(transect_data[i].segment.stick_segment[3].cover)) {
                  } else {
                    if (transect_data[i].segment.stick_segment[3].cover.trim().toUpperCase().indexOf(',') > -1) {
                      var array_covers = transect_data[i].segment.stick_segment[3].cover.split(',')
                      array_covers = removeItem(array_covers, annual_plant_name_normal)
                      transect_data[i].segment.stick_segment[3].cover = array_covers.toString()
                    } else {
                      if (transect_data[i].segment.stick_segment[3].cover.trim().toUpperCase().indexOf(ANNUAL_PLANT_NAME_UPPER) > -1) {
                        transect_data[i].segment.stick_segment[3].cover = ''
                      }
                    }
                  }
                  $scope.stick_segment_4_annual_grass_image = icon_annual_plant_normal
                } else if (stick.trim().toUpperCase() === STICK_5) {
                  transect_data[i].segment.stick_segment[4].index = 4
                  if (isEmpty(transect_data[i].segment.stick_segment[4].cover)) {
                  } else {
                    if (transect_data[i].segment.stick_segment[4].cover.trim().toUpperCase().indexOf(',') > -1) {
                      var array_covers = transect_data[i].segment.stick_segment[4].cover.split(',')
                      array_covers = removeItem(array_covers, annual_plant_name_normal)
                      transect_data[i].segment.stick_segment[4].cover = array_covers.toString()
                    } else {
                      if (transect_data[i].segment.stick_segment[4].cover.trim().toUpperCase().indexOf(ANNUAL_PLANT_NAME_UPPER) > -1) {
                        transect_data[i].segment.stick_segment[4].cover = ''
                      }
                    }
                  }

                  $scope.stick_segment_5_annual_grass_image = icon_annual_plant_normal
                } else {
                  console.log('Error 2990 Annual Plants')
                }
              }
            }
          } else {
            console.log('error to construct transect')
          }
        }
        current_plot.land_cover_data.transect = transect_data
      } else {
        //console.log('Action ' + current_action)
        //console.log('Bare : ' + stick)
      }
      //console.log('After Perenial Select !')
      //console.log(current_plot.land_cover_data.transect)
    }

    /* Action Select Herb Litter */
    $scope.select_herb = function (stick) {
      if (current_action == 'ADD_NEW' || current_action == 'EDIT_NEW'
        || current_action === 'ADD_OLD' || current_action === 'EDIT_OLD') {
        //console.log(' Herb Litter ' + stick)
        var image_url = ''
        if (stick.trim().toUpperCase() === STICK_1) {
          if (stick_1_bare == true) {
            //console.log('Not-Allowed by Bare')
            return
          }
          image_url = $scope.stick_segment_1_herb_image
        } else if (stick.trim().toUpperCase() === STICK_2) {
          if (stick_2_bare == true) {
            //console.log('Not-Allowed by Bare')
            return
          }
          image_url = $scope.stick_segment_2_herb_image
        } else if (stick.trim().toUpperCase() === STICK_3) {
          if (stick_3_bare == true) {
            //console.log('Not-Allowed by Bare')
            return
          }
          image_url = $scope.stick_segment_3_herb_image
        } else if (stick.trim().toUpperCase() === STICK_4) {
          if (stick_4_bare == true) {
            //console.log('Not-Allowed by Bare')
            return
          }
          image_url = $scope.stick_segment_4_herb_image
        } else if (stick.trim().toUpperCase() === STICK_5) {
          if (stick_5_bare == true) {
            //console.log('Not-Allowed by Bare')
            return
          }
          image_url = $scope.stick_segment_5_herb_image
        }

        if (image_url === icon_herb_litter_normal) {
          /* Load in */
          //console.log('Load')
          seeToast2('Herbaceous litter ', 2000)
          var transect_data = current_plot.land_cover_data.transect
          if (!isEmpty(transect_data) && transect_data.length == 20) {
            for (var i = 0; i < 20; i++) {
              if (transect_data[i].direction.trim().toUpperCase() === current_transect.trim().toUpperCase() &&
                transect_data[i].segment.range.trim().toUpperCase() === current_segment.trim().toUpperCase()) {
                transect_data[i].dominant_woody_species = current_plot.dominant_woody_species
                transect_data[i].dominant_woody_species_2 = current_plot.dominant_woody_species_2
                transect_data[i].dominant_nonwoody_species = current_plot.dominant_nonwoody_species
                transect_data[i].dominant_nonwoody_species_2 = current_plot.dominant_nonwoody_species_2

                if (stick.trim().toUpperCase() === STICK_1) {
                  transect_data[i].segment.stick_segment[0].index = 0
                  if (isEmpty(transect_data[i].segment.stick_segment[0].cover)) {
                    transect_data[i].segment.stick_segment[0].cover = herb_litter_name_normal
                  } else {
                    if (transect_data[i].segment.stick_segment[0].cover.trim().toUpperCase().indexOf(',') > -1) {
                      var array_covers = transect_data[i].segment.stick_segment[0].cover.split(',')
                      array_covers = addItem(array_covers, herb_litter_name_normal)
                      transect_data[i].segment.stick_segment[0].cover = array_covers.toString()
                    } else {
                      if (transect_data[i].segment.stick_segment[0].cover.trim().toUpperCase().indexOf(HERB_LITTER_NAME_UPPER) > -1) {
                        //console.log('Da co - Ko them nua')
                      } else {
                        var array_covers = []
                        array_covers = addItem(array_covers, transect_data[i].segment.stick_segment[0].cover)
                        array_covers = addItem(array_covers, herb_litter_name_normal)
                        transect_data[i].segment.stick_segment[0].cover = array_covers.toString()
                      }
                    }
                  }
                  $scope.stick_segment_1_herb_image = icon_herb_litter_selected
                } else if (stick.trim().toUpperCase() === STICK_2) {
                  transect_data[i].segment.stick_segment[1].index = 1
                  if (isEmpty(transect_data[i].segment.stick_segment[1].cover)) {
                    transect_data[i].segment.stick_segment[1].cover = herb_litter_name_normal
                  } else {
                    if (transect_data[i].segment.stick_segment[1].cover.trim().toUpperCase().indexOf(',') > -1) {
                      var array_covers = transect_data[i].segment.stick_segment[1].cover.split(',')
                      array_covers = addItem(array_covers, herb_litter_name_normal)
                      transect_data[i].segment.stick_segment[1].cover = array_covers.toString()
                    } else {
                      if (transect_data[i].segment.stick_segment[1].cover.trim().toUpperCase().indexOf(HERB_LITTER_NAME_UPPER) > -1) {
                        //console.log('Da co - Ko them nua')
                      } else {
                        var array_covers = []
                        array_covers = addItem(array_covers, transect_data[i].segment.stick_segment[1].cover)
                        array_covers = addItem(array_covers, herb_litter_name_normal)
                        transect_data[i].segment.stick_segment[1].cover = array_covers.toString()
                      }
                    }
                  }
                  $scope.stick_segment_2_herb_image = icon_herb_litter_selected
                } else if (stick.trim().toUpperCase() === STICK_3) {
                  transect_data[i].segment.stick_segment[2].index = 2
                  if (isEmpty(transect_data[i].segment.stick_segment[2].cover)) {
                    transect_data[i].segment.stick_segment[2].cover = herb_litter_name_normal
                  } else {
                    if (transect_data[i].segment.stick_segment[2].cover.trim().toUpperCase().indexOf(',') > -1) {
                      var array_covers = transect_data[i].segment.stick_segment[2].cover.split(',')
                      array_covers = addItem(array_covers, herb_litter_name_normal)
                      transect_data[i].segment.stick_segment[2].cover = array_covers.toString()
                    } else {
                      if (transect_data[i].segment.stick_segment[2].cover.trim().toUpperCase().indexOf(HERB_LITTER_NAME_UPPER) > -1) {
                        //console.log('Da co - Ko them nua')
                      } else {
                        var array_covers = []
                        array_covers = addItem(array_covers, transect_data[i].segment.stick_segment[2].cover)
                        array_covers = addItem(array_covers, herb_litter_name_normal)
                        transect_data[i].segment.stick_segment[2].cover = array_covers.toString()
                      }
                    }
                  }
                  $scope.stick_segment_3_herb_image = icon_herb_litter_selected
                } else if (stick.trim().toUpperCase() === STICK_4) {
                  transect_data[i].segment.stick_segment[3].index = 3
                  if (isEmpty(transect_data[i].segment.stick_segment[3].cover)) {
                    transect_data[i].segment.stick_segment[3].cover = herb_litter_name_normal
                  } else {
                    if (transect_data[i].segment.stick_segment[3].cover.trim().toUpperCase().indexOf(',') > -1) {
                      var array_covers = transect_data[i].segment.stick_segment[3].cover.split(',')
                      array_covers = addItem(array_covers, herb_litter_name_normal)
                      transect_data[i].segment.stick_segment[3].cover = array_covers.toString()
                    } else {
                      if (transect_data[i].segment.stick_segment[3].cover.trim().toUpperCase().indexOf(HERB_LITTER_NAME_UPPER) > -1) {
                        //console.log('Da co - Ko them nua')
                      } else {
                        var array_covers = []
                        array_covers = addItem(array_covers, transect_data[i].segment.stick_segment[3].cover)
                        array_covers = addItem(array_covers, herb_litter_name_normal)
                        transect_data[i].segment.stick_segment[3].cover = array_covers.toString()
                      }
                    }
                  }
                  $scope.stick_segment_4_herb_image = icon_herb_litter_selected
                } else if (stick.trim().toUpperCase() === STICK_5) {
                  transect_data[i].segment.stick_segment[4].index = 4
                  if (isEmpty(transect_data[i].segment.stick_segment[4].cover)) {
                    transect_data[i].segment.stick_segment[4].cover = herb_litter_name_normal
                  } else {
                    if (transect_data[i].segment.stick_segment[4].cover.trim().toUpperCase().indexOf(',') > -1) {
                      var array_covers = transect_data[i].segment.stick_segment[4].cover.split(',')
                      array_covers = addItem(array_covers, herb_litter_name_normal)
                      transect_data[i].segment.stick_segment[4].cover = array_covers.toString()
                    } else {
                      if (transect_data[i].segment.stick_segment[4].cover.trim().toUpperCase().indexOf(HERB_LITTER_NAME_UPPER) > -1) {
                        //console.log('Da co - Ko them nua')
                      } else {
                        var array_covers = []
                        array_covers = addItem(array_covers, transect_data[i].segment.stick_segment[4].cover)
                        array_covers = addItem(array_covers, herb_litter_name_normal)
                        transect_data[i].segment.stick_segment[4].cover = array_covers.toString()
                      }
                    }
                  }
                  $scope.stick_segment_5_herb_image = icon_herb_litter_selected
                } else {
                  console.log('Error 1442 Perennial grasses')
                }

                break
              }
            }
          } else {
            console.log('error to construct transect')
          }
          // console.log(transect_data)

        } else {
          /* Unload */
          //console.log('Unload')
          var transect_data = current_plot.land_cover_data.transect
          if (!isEmpty(transect_data) && transect_data.length == 20) {
            for (var i = 0; i < 20; i++) {
              if (transect_data[i].direction.trim().toUpperCase() === current_transect.trim().toUpperCase() &&
                transect_data[i].segment.range.trim().toUpperCase() === current_segment.trim().toUpperCase()) {
                transect_data[i].dominant_woody_species = current_plot.dominant_woody_species
                transect_data[i].dominant_woody_species_2 = current_plot.dominant_woody_species_2
                transect_data[i].dominant_nonwoody_species = current_plot.dominant_nonwoody_species
                transect_data[i].dominant_nonwoody_species_2 = current_plot.dominant_nonwoody_species_2

                if (stick.trim().toUpperCase() === STICK_1) {
                  transect_data[i].segment.stick_segment[0].index = 0
                  if (isEmpty(transect_data[i].segment.stick_segment[0].cover)) {
                  } else {
                    if (transect_data[i].segment.stick_segment[0].cover.trim().toUpperCase().indexOf(',') > -1) {
                      var array_covers = transect_data[i].segment.stick_segment[0].cover.split(',')
                      array_covers = removeItem(array_covers, herb_litter_name_normal)
                      transect_data[i].segment.stick_segment[0].cover = array_covers.toString()
                    } else {
                      if (transect_data[i].segment.stick_segment[0].cover.trim().toUpperCase().indexOf(HERB_LITTER_NAME_UPPER) > -1) {
                        transect_data[i].segment.stick_segment[0].cover = ''
                      }
                    }
                  }
                  $scope.stick_segment_1_herb_image = icon_herb_litter_normal
                } else if (stick.trim().toUpperCase() === STICK_2) {
                  transect_data[i].segment.stick_segment[1].index = 1
                  if (isEmpty(transect_data[i].segment.stick_segment[1].cover)) {
                  } else {
                    if (transect_data[i].segment.stick_segment[1].cover.trim().toUpperCase().indexOf(',') > -1) {
                      var array_covers = transect_data[i].segment.stick_segment[1].cover.split(',')
                      array_covers = removeItem(array_covers, herb_litter_name_normal)
                      transect_data[i].segment.stick_segment[1].cover = array_covers.toString()
                    } else {
                      if (transect_data[i].segment.stick_segment[1].cover.trim().toUpperCase().indexOf(HERB_LITTER_NAME_UPPER) > -1) {
                        transect_data[i].segment.stick_segment[1].cover = ''
                      }
                    }
                  }
                  $scope.stick_segment_2_herb_image = icon_herb_litter_normal
                } else if (stick.trim().toUpperCase() === STICK_3) {
                  transect_data[i].segment.stick_segment[2].index = 2
                  if (isEmpty(transect_data[i].segment.stick_segment[2].cover)) {
                  } else {
                    if (transect_data[i].segment.stick_segment[2].cover.trim().toUpperCase().indexOf(',') > -1) {
                      var array_covers = transect_data[i].segment.stick_segment[2].cover.split(',')
                      array_covers = removeItem(array_covers, herb_litter_name_normal)
                      transect_data[i].segment.stick_segment[2].cover = array_covers.toString()
                    } else {
                      if (transect_data[i].segment.stick_segment[2].cover.trim().toUpperCase().indexOf(HERB_LITTER_NAME_UPPER) > -1) {
                        transect_data[i].segment.stick_segment[2].cover = ''
                      }
                    }
                  }
                  $scope.stick_segment_3_herb_image = icon_herb_litter_normal
                } else if (stick.trim().toUpperCase() === STICK_4) {
                  transect_data[i].segment.stick_segment[3].index = 3
                  if (isEmpty(transect_data[i].segment.stick_segment[3].cover)) {
                  } else {
                    if (transect_data[i].segment.stick_segment[3].cover.trim().toUpperCase().indexOf(',') > -1) {
                      var array_covers = transect_data[i].segment.stick_segment[3].cover.split(',')
                      array_covers = removeItem(array_covers, herb_litter_name_normal)
                      transect_data[i].segment.stick_segment[3].cover = array_covers.toString()
                    } else {
                      if (transect_data[i].segment.stick_segment[3].cover.trim().toUpperCase().indexOf(HERB_LITTER_NAME_UPPER) > -1) {
                        transect_data[i].segment.stick_segment[3].cover = ''
                      }
                    }
                  }
                  $scope.stick_segment_4_herb_image = icon_herb_litter_normal
                } else if (stick.trim().toUpperCase() === STICK_5) {
                  transect_data[i].segment.stick_segment[4].index = 4
                  if (isEmpty(transect_data[i].segment.stick_segment[4].cover)) {
                  } else {
                    if (transect_data[i].segment.stick_segment[4].cover.trim().toUpperCase().indexOf(',') > -1) {
                      var array_covers = transect_data[i].segment.stick_segment[4].cover.split(',')
                      array_covers = removeItem(array_covers, herb_litter_name_normal)
                      transect_data[i].segment.stick_segment[4].cover = array_covers.toString()
                    } else {
                      if (transect_data[i].segment.stick_segment[4].cover.trim().toUpperCase().indexOf(HERB_LITTER_NAME_UPPER) > -1) {
                        transect_data[i].segment.stick_segment[4].cover = ''
                      }
                    }
                  }
                  $scope.stick_segment_5_herb_image = icon_herb_litter_normal
                } else {
                  console.log('Error 2990 Perennial')
                }
              }
            }
          } else {
            console.log('error to construct transect')
          }
        }
        current_plot.land_cover_data.transect = transect_data
      } else {
        //console.log('Action ' + current_action)
       // console.log('Bare : ' + stick)
      }
      //console.log('After Herb Litter Select !')
      //console.log(current_plot.land_cover_data.transect)
    }

    /* Action Select Wood Litter */
    $scope.select_woody = function (stick) {
      if (current_action == 'ADD_NEW' || current_action == 'EDIT_NEW'
        || current_action === 'ADD_OLD' || current_action === 'EDIT_OLD') {
        //console.log(' Woody  ' + stick)
        var image_url = ''
        if (stick.trim().toUpperCase() === STICK_1) {
          if (stick_1_bare == true) {
            //console.log('Not-Allowed by Bare')
            return
          }
          image_url = $scope.stick_segment_1_woody_image
        } else if (stick.trim().toUpperCase() === STICK_2) {
          if (stick_2_bare == true) {
            //console.log('Not-Allowed by Bare')
            return
          }
          image_url = $scope.stick_segment_2_woody_image
        } else if (stick.trim().toUpperCase() === STICK_3) {
          if (stick_3_bare == true) {
            //console.log('Not-Allowed by Bare')
            return
          }
          image_url = $scope.stick_segment_3_woody_image
        } else if (stick.trim().toUpperCase() === STICK_4) {
          if (stick_4_bare == true) {
            //console.log('Not-Allowed by Bare')
            return
          }
          image_url = $scope.stick_segment_4_woody_image
        } else if (stick.trim().toUpperCase() === STICK_5) {
          if (stick_5_bare == true) {
            //console.log('Not-Allowed by Bare')
            return
          }
          image_url = $scope.stick_segment_5_woody_image
        }

        if (image_url === icon_wood_litter_normal) {
          /* Load in */
          //console.log('Load')
          seeToast2('Woody litter ', 2000)
          var transect_data = current_plot.land_cover_data.transect
          if (!isEmpty(transect_data) && transect_data.length == 20) {
            for (var i = 0; i < 20; i++) {
              if (transect_data[i].direction.trim().toUpperCase() === current_transect.trim().toUpperCase() &&
                transect_data[i].segment.range.trim().toUpperCase() === current_segment.trim().toUpperCase()) {
                transect_data[i].dominant_woody_species = current_plot.dominant_woody_species
                transect_data[i].dominant_woody_species_2 = current_plot.dominant_woody_species_2
                transect_data[i].dominant_nonwoody_species = current_plot.dominant_nonwoody_species
                transect_data[i].dominant_nonwoody_species_2 = current_plot.dominant_nonwoody_species_2

                if (stick.trim().toUpperCase() === STICK_1) {
                  transect_data[i].segment.stick_segment[0].index = 0
                  if (isEmpty(transect_data[i].segment.stick_segment[0].cover)) {
                    transect_data[i].segment.stick_segment[0].cover = wood_litter_name_normal
                  } else {
                    if (transect_data[i].segment.stick_segment[0].cover.trim().toUpperCase().indexOf(',') > -1) {
                      var array_covers = transect_data[i].segment.stick_segment[0].cover.split(',')
                      array_covers = addItem(array_covers, wood_litter_name_normal)
                      transect_data[i].segment.stick_segment[0].cover = array_covers.toString()
                    } else {
                      if (transect_data[i].segment.stick_segment[0].cover.trim().toUpperCase().indexOf(WOOD_LITTER_NAME_UPPER) > -1) {
                        //console.log('Da co - Ko them nua')
                      } else {
                        var array_covers = []
                        array_covers = addItem(array_covers, transect_data[i].segment.stick_segment[0].cover)
                        array_covers = addItem(array_covers, wood_litter_name_normal)
                        transect_data[i].segment.stick_segment[0].cover = array_covers.toString()
                      }
                    }
                  }
                  $scope.stick_segment_1_woody_image = icon_wood_litter_selected
                } else if (stick.trim().toUpperCase() === STICK_2) {
                  transect_data[i].segment.stick_segment[1].index = 1
                  if (isEmpty(transect_data[i].segment.stick_segment[1].cover)) {
                    transect_data[i].segment.stick_segment[1].cover = wood_litter_name_normal
                  } else {
                    if (transect_data[i].segment.stick_segment[1].cover.trim().toUpperCase().indexOf(',') > -1) {
                      var array_covers = transect_data[i].segment.stick_segment[1].cover.split(',')
                      array_covers = addItem(array_covers, wood_litter_name_normal)
                      transect_data[i].segment.stick_segment[1].cover = array_covers.toString()
                    } else {
                      if (transect_data[i].segment.stick_segment[1].cover.trim().toUpperCase().indexOf(WOOD_LITTER_NAME_UPPER) > -1) {
                        //console.log('Da co - Ko them nua')
                      } else {
                        var array_covers = []
                        array_covers = addItem(array_covers, transect_data[i].segment.stick_segment[1].cover)
                        array_covers = addItem(array_covers, wood_litter_name_normal)
                        transect_data[i].segment.stick_segment[1].cover = array_covers.toString()
                      }
                    }
                  }
                  $scope.stick_segment_2_woody_image = icon_wood_litter_selected
                } else if (stick.trim().toUpperCase() === STICK_3) {
                  transect_data[i].segment.stick_segment[2].index = 2
                  if (isEmpty(transect_data[i].segment.stick_segment[2].cover)) {
                    transect_data[i].segment.stick_segment[2].cover = wood_litter_name_normal
                  } else {
                    if (transect_data[i].segment.stick_segment[2].cover.trim().toUpperCase().indexOf(',') > -1) {
                      var array_covers = transect_data[i].segment.stick_segment[2].cover.split(',')
                      array_covers = addItem(array_covers, wood_litter_name_normal)
                      transect_data[i].segment.stick_segment[2].cover = array_covers.toString()
                    } else {
                      if (transect_data[i].segment.stick_segment[2].cover.trim().toUpperCase().indexOf(WOOD_LITTER_NAME_UPPER) > -1) {
                        //console.log('Da co - Ko them nua')
                      } else {
                        var array_covers = []
                        array_covers = addItem(array_covers, transect_data[i].segment.stick_segment[2].cover)
                        array_covers = addItem(array_covers, wood_litter_name_normal)
                        transect_data[i].segment.stick_segment[2].cover = array_covers.toString()
                      }
                    }
                  }
                  $scope.stick_segment_3_woody_image = icon_wood_litter_selected
                } else if (stick.trim().toUpperCase() === STICK_4) {
                  transect_data[i].segment.stick_segment[3].index = 3
                  if (isEmpty(transect_data[i].segment.stick_segment[3].cover)) {
                    transect_data[i].segment.stick_segment[3].cover = wood_litter_name_normal
                  } else {
                    if (transect_data[i].segment.stick_segment[3].cover.trim().toUpperCase().indexOf(',') > -1) {
                      var array_covers = transect_data[i].segment.stick_segment[3].cover.split(',')
                      array_covers = addItem(array_covers, wood_litter_name_normal)
                      transect_data[i].segment.stick_segment[3].cover = array_covers.toString()
                    } else {
                      if (transect_data[i].segment.stick_segment[3].cover.trim().toUpperCase().indexOf(WOOD_LITTER_NAME_UPPER) > -1) {
                        //console.log('Da co - Ko them nua')
                      } else {
                        var array_covers = []
                        array_covers = addItem(array_covers, transect_data[i].segment.stick_segment[3].cover)
                        array_covers = addItem(array_covers, wood_litter_name_normal)
                        transect_data[i].segment.stick_segment[3].cover = array_covers.toString()
                      }
                    }
                  }
                  $scope.stick_segment_4_woody_image = icon_wood_litter_selected
                } else if (stick.trim().toUpperCase() === STICK_5) {
                  transect_data[i].segment.stick_segment[4].index = 4
                  if (isEmpty(transect_data[i].segment.stick_segment[4].cover)) {
                    transect_data[i].segment.stick_segment[4].cover = wood_litter_name_normal
                  } else {
                    if (transect_data[i].segment.stick_segment[4].cover.trim().toUpperCase().indexOf(',') > -1) {
                      var array_covers = transect_data[i].segment.stick_segment[4].cover.split(',')
                      array_covers = addItem(array_covers, wood_litter_name_normal)
                      transect_data[i].segment.stick_segment[4].cover = array_covers.toString()
                    } else {
                      if (transect_data[i].segment.stick_segment[4].cover.trim().toUpperCase().indexOf(WOOD_LITTER_NAME_UPPER) > -1) {
                        //console.log('Da co - Ko them nua')
                      } else {
                        var array_covers = []
                        array_covers = addItem(array_covers, transect_data[i].segment.stick_segment[4].cover)
                        array_covers = addItem(array_covers, wood_litter_name_normal)
                        transect_data[i].segment.stick_segment[4].cover = array_covers.toString()
                      }
                    }
                  }
                  $scope.stick_segment_5_woody_image = icon_wood_litter_selected
                } else {
                  console.log('Error 1442 Perennial grasses')
                }

                break
              }
            }
          } else {
            console.log('error to construct transect')
          }
          // console.log(transect_data)

        } else {
          /* Unload */
          //console.log('Unload')
          var transect_data = current_plot.land_cover_data.transect
          if (!isEmpty(transect_data) && transect_data.length == 20) {
            for (var i = 0; i < 20; i++) {
              if (transect_data[i].direction.trim().toUpperCase() === current_transect.trim().toUpperCase() &&
                transect_data[i].segment.range.trim().toUpperCase() === current_segment.trim().toUpperCase()) {
                transect_data[i].dominant_woody_species = current_plot.dominant_woody_species
                transect_data[i].dominant_woody_species_2 = current_plot.dominant_woody_species_2
                transect_data[i].dominant_nonwoody_species = current_plot.dominant_nonwoody_species
                transect_data[i].dominant_nonwoody_species_2 = current_plot.dominant_nonwoody_species_2

                if (stick.trim().toUpperCase() === STICK_1) {
                  transect_data[i].segment.stick_segment[0].index = 0
                  if (isEmpty(transect_data[i].segment.stick_segment[0].cover)) {
                  } else {
                    if (transect_data[i].segment.stick_segment[0].cover.trim().toUpperCase().indexOf(',') > -1) {
                      var array_covers = transect_data[i].segment.stick_segment[0].cover.split(',')
                      array_covers = removeItem(array_covers, wood_litter_name_normal)
                      transect_data[i].segment.stick_segment[0].cover = array_covers.toString()
                    } else {
                      if (transect_data[i].segment.stick_segment[0].cover.trim().toUpperCase().indexOf(WOOD_LITTER_NAME_UPPER) > -1) {
                        transect_data[i].segment.stick_segment[0].cover = ''
                      }
                    }
                  }
                  $scope.stick_segment_1_woody_image = icon_wood_litter_normal
                } else if (stick.trim().toUpperCase() === STICK_2) {
                  transect_data[i].segment.stick_segment[1].index = 1
                  if (isEmpty(transect_data[i].segment.stick_segment[1].cover)) {
                  } else {
                    if (transect_data[i].segment.stick_segment[1].cover.trim().toUpperCase().indexOf(',') > -1) {
                      var array_covers = transect_data[i].segment.stick_segment[1].cover.split(',')
                      array_covers = removeItem(array_covers, wood_litter_name_normal)
                      transect_data[i].segment.stick_segment[1].cover = array_covers.toString()
                    } else {
                      if (transect_data[i].segment.stick_segment[1].cover.trim().toUpperCase().indexOf(WOOD_LITTER_NAME_UPPER) > -1) {
                        transect_data[i].segment.stick_segment[1].cover = ''
                      }
                    }
                  }
                  $scope.stick_segment_2_woody_image = icon_wood_litter_normal
                } else if (stick.trim().toUpperCase() === STICK_3) {
                  transect_data[i].segment.stick_segment[2].index = 2
                  if (isEmpty(transect_data[i].segment.stick_segment[2].cover)) {
                  } else {
                    if (transect_data[i].segment.stick_segment[2].cover.trim().toUpperCase().indexOf(',') > -1) {
                      var array_covers = transect_data[i].segment.stick_segment[2].cover.split(',')
                      array_covers = removeItem(array_covers, wood_litter_name_normal)
                      transect_data[i].segment.stick_segment[2].cover = array_covers.toString()
                    } else {
                      if (transect_data[i].segment.stick_segment[2].cover.trim().toUpperCase().indexOf(WOOD_LITTER_NAME_UPPER) > -1) {
                        transect_data[i].segment.stick_segment[2].cover = ''
                      }
                    }
                  }
                  $scope.stick_segment_3_woody_image = icon_wood_litter_normal
                } else if (stick.trim().toUpperCase() === STICK_4) {
                  transect_data[i].segment.stick_segment[3].index = 3
                  if (isEmpty(transect_data[i].segment.stick_segment[3].cover)) {
                  } else {
                    if (transect_data[i].segment.stick_segment[3].cover.trim().toUpperCase().indexOf(',') > -1) {
                      var array_covers = transect_data[i].segment.stick_segment[3].cover.split(',')
                      array_covers = removeItem(array_covers, wood_litter_name_normal)
                      transect_data[i].segment.stick_segment[3].cover = array_covers.toString()
                    } else {
                      if (transect_data[i].segment.stick_segment[3].cover.trim().toUpperCase().indexOf(WOOD_LITTER_NAME_UPPER) > -1) {
                        transect_data[i].segment.stick_segment[3].cover = ''
                      }
                    }
                  }
                  $scope.stick_segment_4_woody_image = icon_wood_litter_normal
                } else if (stick.trim().toUpperCase() === STICK_5) {
                  transect_data[i].segment.stick_segment[4].index = 4
                  if (isEmpty(transect_data[i].segment.stick_segment[4].cover)) {
                  } else {
                    if (transect_data[i].segment.stick_segment[4].cover.trim().toUpperCase().indexOf(',') > -1) {
                      var array_covers = transect_data[i].segment.stick_segment[4].cover.split(',')
                      array_covers = removeItem(array_covers, wood_litter_name_normal)
                      transect_data[i].segment.stick_segment[4].cover = array_covers.toString()
                    } else {
                      if (transect_data[i].segment.stick_segment[4].cover.trim().toUpperCase().indexOf(WOOD_LITTER_NAME_UPPER) > -1) {
                        transect_data[i].segment.stick_segment[4].cover = ''
                      }
                    }
                  }
                  $scope.stick_segment_5_woody_image = icon_wood_litter_normal
                } else {
                  console.log('Error 2990 Perennial')
                }
              }
            }
          } else {
            console.log('error to construct transect')
          }
        }
        current_plot.land_cover_data.transect = transect_data
      } else {
        //console.log('Action ' + current_action)
        //console.log('Bare : ' + stick)
      }
      //console.log('After Wood Litter Select !')
      //console.log(current_plot.land_cover_data.transect)
    }

    /* Action Select Rock fragment */
    $scope.select_rock = function (stick) {
      if (current_action == 'ADD_NEW' || current_action == 'EDIT_NEW'
        || current_action === 'ADD_OLD' || current_action === 'EDIT_OLD') {
        //console.log('Rock  ' + stick)
        var image_url = ''
        if (stick.trim().toUpperCase() === STICK_1) {
          if (stick_1_bare == true) {
            //console.log('Not-Allowed by Bare')
            return
          }
          image_url = $scope.stick_segment_1_rock_image
        } else if (stick.trim().toUpperCase() === STICK_2) {
          if (stick_2_bare == true) {
            //console.log('Not-Allowed by Bare')
            return
          }
          image_url = $scope.stick_segment_2_rock_image
        } else if (stick.trim().toUpperCase() === STICK_3) {
          if (stick_3_bare == true) {
            //console.log('Not-Allowed by Bare')
            return
          }
          image_url = $scope.stick_segment_3_rock_image
        } else if (stick.trim().toUpperCase() === STICK_4) {
          if (stick_4_bare == true) {
            //console.log('Not-Allowed by Bare')
            return
          }
          image_url = $scope.stick_segment_4_rock_image
        } else if (stick.trim().toUpperCase() === STICK_5) {
          if (stick_5_bare == true) {
            //console.log('Not-Allowed by Bare')
            return
          }
          image_url = $scope.stick_segment_5_rock_image
        }

        if (image_url === icon_rock_fragment_normal) {
          /* Load in */
          //console.log('Load')
          seeToast2('Rock fragment ', 2000)
          var transect_data = current_plot.land_cover_data.transect
          if (!isEmpty(transect_data) && transect_data.length == 20) {
            for (var i = 0; i < 20; i++) {
              if (transect_data[i].direction.trim().toUpperCase() === current_transect.trim().toUpperCase() &&
                transect_data[i].segment.range.trim().toUpperCase() === current_segment.trim().toUpperCase()) {
                transect_data[i].dominant_woody_species = current_plot.dominant_woody_species
                transect_data[i].dominant_woody_species_2 = current_plot.dominant_woody_species_2
                transect_data[i].dominant_nonwoody_species = current_plot.dominant_nonwoody_species
                transect_data[i].dominant_nonwoody_species_2 = current_plot.dominant_nonwoody_species_2

                if (stick.trim().toUpperCase() === STICK_1) {
                  transect_data[i].segment.stick_segment[0].index = 0
                  if (isEmpty(transect_data[i].segment.stick_segment[0].cover)) {
                    transect_data[i].segment.stick_segment[0].cover = rock_fragment_name_normal
                  } else {
                    if (transect_data[i].segment.stick_segment[0].cover.trim().toUpperCase().indexOf(',') > -1) {
                      var array_covers = transect_data[i].segment.stick_segment[0].cover.split(',')
                      array_covers = addItem(array_covers, rock_fragment_name_normal)
                      transect_data[i].segment.stick_segment[0].cover = array_covers.toString()
                    } else {
                      if (transect_data[i].segment.stick_segment[0].cover.trim().toUpperCase().indexOf(ROCK_FRAGMENT_NAME_UPPER) > -1) {
                        //console.log('Da co - Ko them nua')
                      } else {
                        var array_covers = []
                        array_covers = addItem(array_covers, transect_data[i].segment.stick_segment[0].cover)
                        array_covers = addItem(array_covers, rock_fragment_name_normal)
                        transect_data[i].segment.stick_segment[0].cover = array_covers.toString()
                      }
                    }
                  }
                  $scope.stick_segment_1_rock_image = icon_rock_fragment_selected
                } else if (stick.trim().toUpperCase() === STICK_2) {
                  transect_data[i].segment.stick_segment[1].index = 1
                  if (isEmpty(transect_data[i].segment.stick_segment[1].cover)) {
                    transect_data[i].segment.stick_segment[1].cover = rock_fragment_name_normal
                  } else {
                    if (transect_data[i].segment.stick_segment[1].cover.trim().toUpperCase().indexOf(',') > -1) {
                      var array_covers = transect_data[i].segment.stick_segment[1].cover.split(',')
                      array_covers = addItem(array_covers, rock_fragment_name_normal)
                      transect_data[i].segment.stick_segment[1].cover = array_covers.toString()
                    } else {
                      if (transect_data[i].segment.stick_segment[1].cover.trim().toUpperCase().indexOf(ROCK_FRAGMENT_NAME_UPPER) > -1) {
                        // console.log('Da co - Ko them nua')
                      } else {
                        var array_covers = []
                        array_covers = addItem(array_covers, transect_data[i].segment.stick_segment[1].cover)
                        array_covers = addItem(array_covers, rock_fragment_name_normal)
                        transect_data[i].segment.stick_segment[1].cover = array_covers.toString()
                      }
                    }
                  }
                  $scope.stick_segment_2_rock_image = icon_rock_fragment_selected
                } else if (stick.trim().toUpperCase() === STICK_3) {
                  transect_data[i].segment.stick_segment[2].index = 2
                  if (isEmpty(transect_data[i].segment.stick_segment[2].cover)) {
                    transect_data[i].segment.stick_segment[2].cover = rock_fragment_name_normal
                  } else {
                    if (transect_data[i].segment.stick_segment[2].cover.trim().toUpperCase().indexOf(',') > -1) {
                      var array_covers = transect_data[i].segment.stick_segment[2].cover.split(',')
                      array_covers = addItem(array_covers, rock_fragment_name_normal)
                      transect_data[i].segment.stick_segment[2].cover = array_covers.toString()
                    } else {
                      if (transect_data[i].segment.stick_segment[2].cover.trim().toUpperCase().indexOf(ROCK_FRAGMENT_NAME_UPPER) > -1) {
                        // console.log('Da co - Ko them nua')
                      } else {
                        var array_covers = []
                        array_covers = addItem(array_covers, transect_data[i].segment.stick_segment[2].cover)
                        array_covers = addItem(array_covers, rock_fragment_name_normal)
                        transect_data[i].segment.stick_segment[2].cover = array_covers.toString()
                      }
                    }
                  }
                  $scope.stick_segment_3_rock_image = icon_rock_fragment_selected
                } else if (stick.trim().toUpperCase() === STICK_4) {
                  transect_data[i].segment.stick_segment[3].index = 3
                  if (isEmpty(transect_data[i].segment.stick_segment[3].cover)) {
                    transect_data[i].segment.stick_segment[3].cover = rock_fragment_name_normal
                  } else {
                    if (transect_data[i].segment.stick_segment[3].cover.trim().toUpperCase().indexOf(',') > -1) {
                      var array_covers = transect_data[i].segment.stick_segment[3].cover.split(',')
                      array_covers = addItem(array_covers, rock_fragment_name_normal)
                      transect_data[i].segment.stick_segment[3].cover = array_covers.toString()
                    } else {
                      if (transect_data[i].segment.stick_segment[3].cover.trim().toUpperCase().indexOf(ROCK_FRAGMENT_NAME_UPPER) > -1) {
                        // console.log('Da co - Ko them nua')
                      } else {
                        var array_covers = []
                        array_covers = addItem(array_covers, transect_data[i].segment.stick_segment[3].cover)
                        array_covers = addItem(array_covers, rock_fragment_name_normal)
                        transect_data[i].segment.stick_segment[3].cover = array_covers.toString()
                      }
                    }
                  }
                  $scope.stick_segment_4_rock_image = icon_rock_fragment_selected
                } else if (stick.trim().toUpperCase() === STICK_5) {
                  transect_data[i].segment.stick_segment[4].index = 4
                  if (isEmpty(transect_data[i].segment.stick_segment[4].cover)) {
                    transect_data[i].segment.stick_segment[4].cover = rock_fragment_name_normal
                  } else {
                    if (transect_data[i].segment.stick_segment[4].cover.trim().toUpperCase().indexOf(',') > -1) {
                      var array_covers = transect_data[i].segment.stick_segment[4].cover.split(',')
                      array_covers = addItem(array_covers, rock_fragment_name_normal)
                      transect_data[i].segment.stick_segment[4].cover = array_covers.toString()
                    } else {
                      if (transect_data[i].segment.stick_segment[4].cover.trim().toUpperCase().indexOf(ROCK_FRAGMENT_NAME_UPPER) > -1) {
                        // console.log('Da co - Ko them nua')
                      } else {
                        var array_covers = []
                        array_covers = addItem(array_covers, transect_data[i].segment.stick_segment[4].cover)
                        array_covers = addItem(array_covers, rock_fragment_name_normal)
                        transect_data[i].segment.stick_segment[4].cover = array_covers.toString()
                      }
                    }
                  }
                  $scope.stick_segment_5_rock_image = icon_rock_fragment_selected
                } else {
                  // console.log('Error 1442 Rock grasses')
                }

                break
              }
            }
          } else {
            console.log('error to construct transect')
          }
          // console.log(transect_data)

        } else {
          /* Unload */
          // console.log('Unload')
          var transect_data = current_plot.land_cover_data.transect
          if (!isEmpty(transect_data) && transect_data.length == 20) {
            for (var i = 0; i < 20; i++) {
              if (transect_data[i].direction.trim().toUpperCase() === current_transect.trim().toUpperCase() &&
                transect_data[i].segment.range.trim().toUpperCase() === current_segment.trim().toUpperCase()) {
                transect_data[i].dominant_woody_species = current_plot.dominant_woody_species
                transect_data[i].dominant_woody_species_2 = current_plot.dominant_woody_species_2
                transect_data[i].dominant_nonwoody_species = current_plot.dominant_nonwoody_species
                transect_data[i].dominant_nonwoody_species_2 = current_plot.dominant_nonwoody_species_2

                if (stick.trim().toUpperCase() === STICK_1) {
                  transect_data[i].segment.stick_segment[0].index = 0
                  if (isEmpty(transect_data[i].segment.stick_segment[0].cover)) {
                  } else {
                    if (transect_data[i].segment.stick_segment[0].cover.trim().toUpperCase().indexOf(',') > -1) {
                      var array_covers = transect_data[i].segment.stick_segment[0].cover.split(',')
                      array_covers = removeItem(array_covers, rock_fragment_name_normal)
                      transect_data[i].segment.stick_segment[0].cover = array_covers.toString()
                    } else {
                      if (transect_data[i].segment.stick_segment[0].cover.trim().toUpperCase().indexOf(ROCK_FRAGMENT_NAME_UPPER) > -1) {
                        transect_data[i].segment.stick_segment[0].cover = ''
                      }
                    }
                  }
                  $scope.stick_segment_1_rock_image = icon_rock_fragment_normal
                } else if (stick.trim().toUpperCase() === STICK_2) {
                  transect_data[i].segment.stick_segment[1].index = 1
                  if (isEmpty(transect_data[i].segment.stick_segment[1].cover)) {
                  } else {
                    if (transect_data[i].segment.stick_segment[1].cover.trim().toUpperCase().indexOf(',') > -1) {
                      var array_covers = transect_data[i].segment.stick_segment[1].cover.split(',')
                      array_covers = removeItem(array_covers, rock_fragment_name_normal)
                      transect_data[i].segment.stick_segment[1].cover = array_covers.toString()
                    } else {
                      if (transect_data[i].segment.stick_segment[1].cover.trim().toUpperCase().indexOf(ROCK_FRAGMENT_NAME_UPPER) > -1) {
                        transect_data[i].segment.stick_segment[1].cover = ''
                      }
                    }
                  }
                  $scope.stick_segment_2_rock_image = icon_rock_fragment_normal
                } else if (stick.trim().toUpperCase() === STICK_3) {
                  transect_data[i].segment.stick_segment[2].index = 2
                  if (isEmpty(transect_data[i].segment.stick_segment[2].cover)) {
                  } else {
                    if (transect_data[i].segment.stick_segment[2].cover.trim().toUpperCase().indexOf(',') > -1) {
                      var array_covers = transect_data[i].segment.stick_segment[2].cover.split(',')
                      array_covers = removeItem(array_covers, rock_fragment_name_normal)
                      transect_data[i].segment.stick_segment[2].cover = array_covers.toString()
                    } else {
                      if (transect_data[i].segment.stick_segment[2].cover.trim().toUpperCase().indexOf(ROCK_FRAGMENT_NAME_UPPER) > -1) {
                        transect_data[i].segment.stick_segment[2].cover = ''
                      }
                    }
                  }
                  $scope.stick_segment_3_rock_image = icon_rock_fragment_normal
                } else if (stick.trim().toUpperCase() === STICK_4) {
                  transect_data[i].segment.stick_segment[3].index = 3
                  if (isEmpty(transect_data[i].segment.stick_segment[3].cover)) {
                  } else {
                    if (transect_data[i].segment.stick_segment[3].cover.trim().toUpperCase().indexOf(',') > -1) {
                      var array_covers = transect_data[i].segment.stick_segment[3].cover.split(',')
                      array_covers = removeItem(array_covers, rock_fragment_name_normal)
                      transect_data[i].segment.stick_segment[3].cover = array_covers.toString()
                    } else {
                      if (transect_data[i].segment.stick_segment[3].cover.trim().toUpperCase().indexOf(ROCK_FRAGMENT_NAME_UPPER) > -1) {
                        transect_data[i].segment.stick_segment[3].cover = ''
                      }
                    }
                  }
                  $scope.stick_segment_4_rock_image = icon_rock_fragment_normal
                } else if (stick.trim().toUpperCase() === STICK_5) {
                  transect_data[i].segment.stick_segment[4].index = 4
                  if (isEmpty(transect_data[i].segment.stick_segment[4].cover)) {
                  } else {
                    if (transect_data[i].segment.stick_segment[4].cover.trim().toUpperCase().indexOf(',') > -1) {
                      var array_covers = transect_data[i].segment.stick_segment[4].cover.split(',')
                      array_covers = removeItem(array_covers, rock_fragment_name_normal)
                      transect_data[i].segment.stick_segment[4].cover = array_covers.toString()
                    } else {
                      if (transect_data[i].segment.stick_segment[4].cover.trim().toUpperCase().indexOf(ROCK_FRAGMENT_NAME_UPPER) > -1) {
                        transect_data[i].segment.stick_segment[4].cover = ''
                      }
                    }
                  }
                  $scope.stick_segment_5_rock_image = icon_rock_fragment_normal
                } else {
                  console.log('Error 2990 Rock')
                }
              }
            }
          } else {
            console.log('error to construct transect')
          }
        }
        current_plot.land_cover_data.transect = transect_data
      } else {
        // console.log('Action ' + current_action)
        // console.log('Bare : ' + stick)
      }
      // console.log('After Wood Litter Select !')
      //console.log(current_plot.land_cover_data.transect)
    }

    $ionicPlatform.registerBackButtonAction(function (event) {
      var current_page_for_back_button = window.localStorage.getItem('CURRENT_PAGE_FOR_BACK_BUTTON')

      if (current_page_for_back_button === 'LANDCOVER_TRANSECT_COVER_PAGE') {
        var confirmPopup = $ionicPopup.confirm({
          cssClass: 'remove-title-class',
          template: 'Discard changes ? (hint: use Up to save).',
          cancelText: 'No',
          okText: 'Yes'
        })
        confirmPopup.then(function (res) {
          if (res) {
            window.localStorage.setItem('CURRENT_PAGE_FOR_BACK_BUTTON', 'EMPTY')
            confirmPopup.close()
            
            if (current_transect == 'NORTH') {
              $state.go('landpks.landcover_north_transect')
            } else if (current_transect == 'EAST') {
              $state.go('landpks.landcover_east_transect')
            } else if (current_transect == 'SOUTH') {
              $state.go('landpks.landcover_south_transect')
            } else if (current_transect == 'WEST') {
              $state.go('landpks.landcover_west_transect')
            } else {
              $state.go('landpks.landcover_main_transect')
            }
            return
          } else {
            console.log('Cancel')
            return
          }
        })
        return
      } else {
        return
      }
    }, 400)
  })
  

  /****************************************/
  /** Main Transect Controller **/
  /****************************************/
  .controller('LandCover_Main_Transect_Ctrl', function ($scope, $state, $ionicLoading, $http, $ionicPopup, $ionicPlatform, $ionicHistory, plotListService) {
    //console.log("LandCover_Main_Transect_Ctrl")
    window.localStorage.setItem('CURRENT_PAGE_FOR_BACK_BUTTON', 'MAIN_LANDCOVER_PAGE')
    //var plot_name = window.localStorage.getItem('current_plot_name_landcover')
    //var recorder_name = window.localStorage.getItem('current_email_landcover')
    var current_plot = JSON.parse(window.localStorage.getItem('current_plot_data_landcover'))
    // console.log(current_plot.name)
    // console.log(window.localStorage.getItem('current_plot_data_landcover'))
    // console.log("action : " + window.localStorage.getItem('current_action_landcover'))
    // console.log("edit plot : " + window.localStorage.getItem('current_edit_plot_landcover'))
    var recorder_name = current_plot.recorder_name
    var plot_name = current_plot.name
    $scope.plot_name = getRealPlotName(recorder_name, plot_name)
    
    window.localStorage.setItem('current_display_plot_name_landcover', $scope.plot_name)
    var current_edit_plot_landcover = JSON.parse(window.localStorage.getItem('current_edit_plot_landcover'))
    var action = window.localStorage.getItem('current_action_landcover')
    
    var previous_page = window.localStorage.getItem('PREVIOUS_PAGE_LANDCOVER')
    previous_page = 'LIST_PLOT_PAGE'

    var current_notes_for_this_editting = window.localStorage.getItem(plot_name + '_CURRENT_NOTES_FOR_CURRENT_EDITTING_LANDCOVER')
    $scope.data = {}
    if (!isEmpty(current_notes_for_this_editting)){
      $scope.data.notes = current_notes_for_this_editting
    } else {
      $scope.data.notes = ''
    }
    if (APP_PRODUCT === 'PRODUCTION_VERSION'){
      $scope.link_data_portal = "http://portal.landpotential.org"
    } else {
      $scope.link_data_portal = "http://portallandpotential.businesscatalyst.com"
    }
    $scope.openDataPortal = function () {
      if (APP_PRODUCT === 'PRODUCTION_VERSION'){
        window.open('http://portal.landpotential.org', '_system', 'location=yes')
      } else {
        window.open('http://portallandpotential.businesscatalyst.com', '_system', 'location=yes')
      }
    }
    
    /* Doan nay dung de test thu nghiem - Xoa bo sau khi chay */
    if ((action === 'EDIT_OLD' || action === 'VIEW_OLD') && previous_page === 'LIST_PLOT_PAGE' && !isEmpty(current_edit_plot_landcover) && !isEmpty(current_plot)
      && ((current_plot.id != current_edit_plot_landcover.id) || (current_plot.name.trim().toUpperCase() !== current_edit_plot_landcover.name.trim().toUpperCase()))) {
      if (current_plot.has_land_cover == true
        && !isEmpty(current_plot.edit_land_cover_data)
        && !isEmpty(current_plot.edit_land_cover_status)) {
        current_edit_plot_landcover.id = current_plot.id
        current_edit_plot_landcover.dominant_woody_species = current_plot.dominant_woody_species
        current_edit_plot_landcover.dominant_woody_species_2 = current_plot.dominant_woody_species_2
        current_edit_plot_landcover.dominant_nonwoody_species = current_plot.dominant_nonwoody_species
        current_edit_plot_landcover.dominant_nonwoody_species_2 = current_plot.dominant_nonwoody_species_2
        current_edit_plot_landcover.has_land_cover = true
        current_edit_plot_landcover.im_src = current_plot.img_src
        current_edit_plot_landcover.name = current_plot.name
        current_edit_plot_landcover.recorder_name = current_plot.recorder_name
        current_edit_plot_landcover.land_cover_data = {}
        current_edit_plot_landcover.land_cover_data = current_plot.edit_land_cover_data
        for ( k in current_plot.edit_land_cover_status) {
          current_edit_plot_landcover[k] = current_plot.edit_land_cover_status[k]
        }
      }
    } else if ((action === 'ADD_NEW' || action === 'EDIT_NEW') && previous_page === 'LIST_PLOT_PAGE' && !isEmpty(current_edit_plot_landcover) && !isEmpty(current_plot)
      && ((current_plot.id != current_edit_plot_landcover.id) || (current_plot.name.trim().toUpperCase() !== current_edit_plot_landcover.name.trim().toUpperCase()))) {
      if (current_plot.has_land_cover == false
        && isEmpty(current_plot.edit_land_cover_data)
        && isEmpty(current_plot.edit_land_cover_status)) {
        // current_edit_plot_landcover = current_plot
        // console.log("setting edit equal to current")
        for (k in current_plot) {
          current_edit_plot_landcover[k] = current_plot[k]
        }
      }
    }

    /* End Testing */

    /* Cho nay can xu ly khi come back */
    if (previous_page === 'LIST_PLOT_PAGE' && current_plot.has_land_cover === true) {
      //console.log("Vao day ko ????")
      //action = 'ADD_OLD'
      window.localStorage.setItem('current_action_landcover', action)
      var selectedDate = window.localStorage.getItem('current_landcover_date')
        console.log("selectedDate : " + selectedDate)
        if (!isEmpty(selectedDate)){
          selectPreviouslySubmmittedDate(selectedDate);
        }
    }
    // console.log('Action : ' + action)

    var array_notes = []

    if (action === 'ADD_OLD' || action === 'EDIT_OLD') {
      $scope.previously_submitted_date = 'ADD_OLD'
      var array_consider_date = getDistictConsiderData(current_plot)
      array_notes = getNotesForColOfTransect(current_plot)
      $scope.array_consider_date = array_consider_date
    } else if (action === 'VIEW_OLD') {
      var array_consider_date = getDistictConsiderData(current_plot)
      array_notes = getNotesForColOfTransect(current_plot)
      $scope.array_consider_date = array_consider_date
      var current_view_landcover_plot_follow_date = window.localStorage.getItem('current_view_landcover_plot_follow_date')
      $scope.previously_submitted_date = current_view_landcover_plot_follow_date
      var selectedDate = window.localStorage.getItem('current_landcover_date')
        console.log("selectedDate : " + selectedDate)
        if (!isEmpty(selectedDate)){
          selectPreviouslySubmmittedDate(selectedDate);
        }
    }

    //console.log("NOTES")
    //console.log(array_notes[0]['notes'])

    /* Update 20160808 - Locked when LC submiited for that day */
    if (action === 'ADD_OLD' || action === 'EDIT_OLD'){
      d = new Date()
      var current_date = d.yyyymmdd()
      if (array_consider_date.indexOf(current_date) > -1){
        presentStatusComponent()
        // console.log("Check date : Existed landcover data for this date.Locked")
        displayComponentsWhenThisDataHasSubmittedLCData()
      } else {
        // console.log("Check date : Work normally")
        presentStatusComponent()
        presentStatusNavigatorButton()
      }
    } else {
      // console.log("Check date : Work normally")
      presentStatusComponent()
      presentStatusNavigatorButton()
    }

    /* Update 20160808 - Locked when LC submmited for that day */
    function displayComponentsWhenThisDataHasSubmittedLCData(){
      /* Allow select date list */
      //document.getElementById('previously_submitted_date').style.display = 'block'

      /* Lock submit button and summay button */
      document.getElementById('btnSubmitLandCover').style.display = 'block'
      document.getElementById('btnSubmitLandCover').disabled = true
      //document.getElementById('btnSummaryLandCover').style.display = 'block'
      //document.getElementById('btnSummaryLandCover').disabled = true

      /* Visible Navigation button */
      $scope.north_transect_status_img = 'img/North_Dim.png'
      $scope.south_transect_status_img = 'img/South_Dim.png'
      $scope.east_transect_status_img = 'img/East_Dim.png'
      $scope.west_transect_status_img = 'img/West_Dim.png'

      /* Disable TextFields */
      document.getElementById("dominant_woody").disabled = true;
      document.getElementById("dominant_woody_2").disabled = true;
      document.getElementById("dominant_nonwoody").disabled = true;
      document.getElementById("dominant_nonwoody_2").disabled = true;
    }

    function presentStatusNavigatorButton () {
      // console.log(" presentStatusNavigatorButton - action : " + action)
      if (action === 'REAL_VIEW_OLD') {
        $scope.north_transect_status_img = 'img/North_tick.png'
        $scope.south_transect_status_img = 'img/South_tick.png'
        $scope.east_transect_status_img = 'img/East_tick.png'
        $scope.west_transect_status_img = 'img/West_tick.png'
      } else if (action === 'VIEW_OLD') {
        $scope.north_transect_status_img = 'img/North_tick.png'
        $scope.south_transect_status_img = 'img/South_tick.png'
        $scope.east_transect_status_img = 'img/East_tick.png'
        $scope.west_transect_status_img = 'img/West_tick.png'
      } else if (action === 'ADD_NEW') {
        $scope.north_transect_status_img = 'img/North.png'
        $scope.south_transect_status_img = 'img/South.png'
        $scope.east_transect_status_img = 'img/East.png'
        $scope.west_transect_status_img = 'img/West.png'
      } else if (action === 'ADD_OLD') {
        $scope.north_transect_status_img = 'img/North.png'
        $scope.south_transect_status_img = 'img/South.png'
        $scope.east_transect_status_img = 'img/East.png'
        $scope.west_transect_status_img = 'img/West.png'
      } else if (action === 'EDIT_NEW') {
        if (current_plot.isComplete_North_5m === true
          && current_plot.isComplete_North_10m === true
          && current_plot.isComplete_North_15m === true
          && current_plot.isComplete_North_20m === true
          && current_plot.isComplete_North_25m === true) {
          $scope.north_transect_status_img = 'img/North_tick.png'
        } else if (((current_plot.isComplete_North_5m === false) || (isEmpty(current_plot.isComplete_North_5m)))
          && ((current_plot.isComplete_North_10m === false) || (isEmpty(current_plot.isComplete_North_10m)))
          && ((current_plot.isComplete_North_15m === false) || (isEmpty(current_plot.isComplete_North_15m)))
          && ((current_plot.isComplete_North_20m === false) || (isEmpty(current_plot.isComplete_North_20m)))
          && ((current_plot.isComplete_North_25m === false) || (isEmpty(current_plot.isComplete_North_25m)))){
          $scope.north_transect_status_img = 'img/North.png'
        } else{
          $scope.north_transect_status_img = 'img/North_tick_yellow.png'
        }

        if (current_plot.isComplete_East_5m === true
          && current_plot.isComplete_East_10m === true
          && current_plot.isComplete_East_15m === true
          && current_plot.isComplete_East_20m === true
          && current_plot.isComplete_East_25m === true) {
          $scope.east_transect_status_img = 'img/East_tick.png'
        } else if (((current_plot.isComplete_East_5m === false) || (isEmpty(current_plot.isComplete_East_5m)))
          && ((current_plot.isComplete_East_10m === false) || (isEmpty(current_plot.isComplete_East_10m)))
          && ((current_plot.isComplete_East_15m === false) || (isEmpty(current_plot.isComplete_East_15m)))
          && ((current_plot.isComplete_East_20m === false) || (isEmpty(current_plot.isComplete_East_20m)))
          && ((current_plot.isComplete_East_25m === false) || (isEmpty(current_plot.isComplete_East_25m)))){
          $scope.east_transect_status_img = 'img/East.png'
        } else {
          $scope.east_transect_status_img = 'img/East_tick_yellow.png'
        }

        if (current_plot.isComplete_South_5m === true
          && current_plot.isComplete_South_10m === true
          && current_plot.isComplete_South_15m === true
          && current_plot.isComplete_South_20m === true
          && current_plot.isComplete_South_25m === true) {
          $scope.south_transect_status_img = 'img/South_tick.png'
        } else if (((current_plot.isComplete_South_5m === false) || (isEmpty(current_plot.isComplete_South_5m)))
          && ((current_plot.isComplete_South_10m === false) || (isEmpty(current_plot.isComplete_South_10m)))
          && ((current_plot.isComplete_South_15m === false) || (isEmpty(current_plot.isComplete_South_15m)))
          && ((current_plot.isComplete_South_20m === false) || (isEmpty(current_plot.isComplete_South_20m)))
          && ((current_plot.isComplete_South_25m === false) || (isEmpty(current_plot.isComplete_South_25m)))){
          $scope.south_transect_status_img = 'img/South.png'
        } else {
          $scope.south_transect_status_img = 'img/South_tick_yellow.png'
        }

        if (current_plot.isComplete_West_5m === true
          && current_plot.isComplete_West_10m === true
          && current_plot.isComplete_West_15m === true
          && current_plot.isComplete_West_20m === true
          && current_plot.isComplete_West_25m === true) {
          $scope.west_transect_status_img = 'img/West_tick.png'
        } else if (((current_plot.isComplete_West_5m === false) || (isEmpty(current_plot.isComplete_West_5m)))
          && ((current_plot.isComplete_West_10m === false) || (isEmpty(current_plot.isComplete_West_10m)))
          && ((current_plot.isComplete_West_15m === false) || (isEmpty(current_plot.isComplete_West_15m)))
          && ((current_plot.isComplete_West_20m === false) || (isEmpty(current_plot.isComplete_West_20m)))
          && ((current_plot.isComplete_West_25m === false) || (isEmpty(current_plot.isComplete_West_25m)))){
          $scope.west_transect_status_img = 'img/West.png'
        } else{
          $scope.west_transect_status_img = 'img/West_tick_yellow.png'
        }
      } else if (action === 'EDIT_OLD') {
        current_edit_plot_landcover = JSON.parse(window.localStorage.getItem('current_edit_plot_landcover'))
        if (current_edit_plot_landcover.isComplete_North_5m === true
          && current_edit_plot_landcover.isComplete_North_10m === true
          && current_edit_plot_landcover.isComplete_North_15m === true
          && current_edit_plot_landcover.isComplete_North_20m === true
          && current_edit_plot_landcover.isComplete_North_25m === true) {
          $scope.north_transect_status_img = 'img/North_tick.png'
        } else if (((current_edit_plot_landcover.isComplete_North_5m === false) || (isEmpty(current_edit_plot_landcover.isComplete_North_5m)))
            && ((current_edit_plot_landcover.isComplete_North_10m === false) || (isEmpty(current_edit_plot_landcover.isComplete_North_10m)))
            && ((current_edit_plot_landcover.isComplete_North_15m === false) || (isEmpty(current_edit_plot_landcover.isComplete_North_15m)))
            && ((current_edit_plot_landcover.isComplete_North_20m === false) || (isEmpty(current_edit_plot_landcover.isComplete_North_20m)))
            && ((current_edit_plot_landcover.isComplete_North_25m === false) || (isEmpty(current_edit_plot_landcover.isComplete_North_25m)))){
          $scope.north_transect_status_img = 'img/North.png'
        } else{
          $scope.north_transect_status_img = 'img/North_tick_yellow.png'
        }

        if (current_edit_plot_landcover.isComplete_East_5m === true
          && current_edit_plot_landcover.isComplete_East_10m === true
          && current_edit_plot_landcover.isComplete_East_15m === true
          && current_edit_plot_landcover.isComplete_East_20m === true
          && current_edit_plot_landcover.isComplete_East_25m === true) {
          $scope.east_transect_status_img = 'img/East_tick.png'
        } else if (((current_edit_plot_landcover.isComplete_East_5m === false) || (isEmpty(current_edit_plot_landcover.isComplete_East_5m)))
            && ((current_edit_plot_landcover.isComplete_East_10m === false) || (isEmpty(current_edit_plot_landcover.isComplete_East_10m)))
            && ((current_edit_plot_landcover.isComplete_East_15m === false) || (isEmpty(current_edit_plot_landcover.isComplete_East_15m)))
            && ((current_edit_plot_landcover.isComplete_East_20m === false) || (isEmpty(current_edit_plot_landcover.isComplete_East_20m)))
            && ((current_edit_plot_landcover.isComplete_East_25m === false) || (isEmpty(current_edit_plot_landcover.isComplete_East_25m)))) {
          $scope.east_transect_status_img = 'img/East.png'
        } else {
          $scope.east_transect_status_img = 'img/East_tick_yellow.png'
        }

        if (current_edit_plot_landcover.isComplete_South_5m === true
          && current_edit_plot_landcover.isComplete_South_10m === true
          && current_edit_plot_landcover.isComplete_South_15m === true
          && current_edit_plot_landcover.isComplete_South_20m === true
          && current_edit_plot_landcover.isComplete_South_25m === true) {
          $scope.south_transect_status_img = 'img/South_tick.png'
        } else if (((current_edit_plot_landcover.isComplete_South_5m === false) || (isEmpty(current_edit_plot_landcover.isComplete_South_5m)))
            && ((current_edit_plot_landcover.isComplete_South_10m === false) || (isEmpty(current_edit_plot_landcover.isComplete_South_10m)))
            && ((current_edit_plot_landcover.isComplete_South_15m === false) || (isEmpty(current_edit_plot_landcover.isComplete_South_15m)))
            && ((current_edit_plot_landcover.isComplete_South_20m === false) || (isEmpty(current_edit_plot_landcover.isComplete_South_20m)))
            && ((current_edit_plot_landcover.isComplete_South_25m === false) || (isEmpty(current_edit_plot_landcover.isComplete_South_25m)))) {
          $scope.south_transect_status_img = 'img/South.png'
        } else{
          $scope.south_transect_status_img = 'img/South_tick_yellow.png'
        }

        if (current_edit_plot_landcover.isComplete_West_5m === true
          && current_edit_plot_landcover.isComplete_West_10m === true
          && current_edit_plot_landcover.isComplete_West_15m === true
          && current_edit_plot_landcover.isComplete_West_20m === true
          && current_edit_plot_landcover.isComplete_West_25m === true) {
          $scope.west_transect_status_img = 'img/West_tick.png'
        } else if (((current_edit_plot_landcover.isComplete_West_5m === false) || (isEmpty(current_edit_plot_landcover.isComplete_West_5m)))
            && ((current_edit_plot_landcover.isComplete_West_10m === false) || (isEmpty(current_edit_plot_landcover.isComplete_West_10m)))
            && ((current_edit_plot_landcover.isComplete_West_15m === false) || (isEmpty(current_edit_plot_landcover.isComplete_West_15m)))
            && ((current_edit_plot_landcover.isComplete_West_20m === false) || (isEmpty(current_edit_plot_landcover.isComplete_West_20m)))
            && ((current_edit_plot_landcover.isComplete_West_25m === false) || (isEmpty(current_edit_plot_landcover.isComplete_West_25m))))  {
          $scope.west_transect_status_img = 'img/West.png'
        } else {
          $scope.west_transect_status_img = 'img/West_tick_yellow.png'
        }
      }
    }

    var typeBrowser = getTypeWebBrowser()
    if (typeBrowser === 'CHROME' || typeBrowser === 'IE' || typeBrowser === 'FIREFOX') {
      document.getElementById('imgNorth').style = 'width:40%; height:90%'
      document.getElementById('imgEast').style = 'width:40%; height:90%'
      document.getElementById('imgSouth').style = 'width:40%; height:90%'
      document.getElementById('imgWest').style = 'width:40%; height:90%'
      document.getElementById('imgLandInfo').style = 'width:40%; height:90%'
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
              var current_notes_editting = window.localStorage.getItem(plot_name + '_CURRENT_NOTES_FOR_CURRENT_EDITTING_LANDCOVER')
              if (!isEmpty(current_notes_editting)
                    && action !== 'VIEW_OLD') {
                  $scope.data.notes = current_notes_editting
              }
              return
            }
          },
          {
            text: '<b>Save</b>',
            type: 'button-positive',
            onTap: function (e) {
              if (!$scope.data.notes) {
              } else {
                if (action !== 'VIEW_OLD')
                    window.localStorage.setItem(plot_name + '_CURRENT_NOTES_FOR_CURRENT_EDITTING_LANDCOVER',$scope.data.notes)
                return $scope.data.notes
              }
            }
          },

        ]
      })
      myPopup.then(function (res) {
        //console.log('Tapped!', res)
      })
    }

    $scope.submitLandCoverData = function () {
      var STATUS_LANDCOVER_DATA_COLLECTION_UPDATE = "FULL_DATA_20"
      //console.log(JSON.stringify(current_plot))
      var consider_submitting_plot = {}
      if (action === 'ADD_NEW' || action === 'EDIT_NEW') {
        consider_submitting_plot = current_plot
      } else if (action === 'ADD_OLD' || action === 'EDIT_OLD') {
        consider_submitting_plot = current_edit_plot_landcover
      } else {
        return
      }
      //console.log("consider_submitting_plot.id " + consider_submitting_plot.id)
      //console.log($scope.data.notes)
      if (!isEmpty($scope.data.notes)){
        consider_submitting_plot.notes = $scope.data.notes
      }
      //console.log(consider_submitting_plot.notes)
      /* Check consistent with LandInfo */
      var LIST_PLOTS_LANDINFO = JSON.parse(window.localStorage.getItem(recorder_name + '_' + 'LIST_LANDINFO_PLOTS'))
      var numberLandInfoPlots = LIST_PLOTS_LANDINFO.length
      var CURRENT_LANDINFO_PLOT = {}
      for (var index = 0; index < numberLandInfoPlots; index++) {
        if ((LIST_PLOTS_LANDINFO[index].name.trim().toUpperCase() === consider_submitting_plot.name.trim().toUpperCase())
          && (LIST_PLOTS_LANDINFO[index].recorder_name.trim().toUpperCase() === consider_submitting_plot.recorder_name.trim().toUpperCase())) {
          CURRENT_LANDINFO_PLOT = LIST_PLOTS_LANDINFO[index]
          break
        }
      }
      if (!isPlotInCloud(CURRENT_LANDINFO_PLOT)) {
        if (!isEmpty(CURRENT_LANDINFO_PLOT.status) && (CURRENT_LANDINFO_PLOT.status === 'UPLOADING' || CURRENT_LANDINFO_PLOT.status === 'CREATED')){
        } else {
          var infoPopup = $ionicPopup.alert({
            cssClass: 'remove-title-class',
            //template: 'The following are required for upload: <br/> * LandInfo plot (name : ' + getRealPlotName(recorder_name, consider_submitting_plot.name.trim()) + ')'
            template: 'You must also complete and submit LandInfo information in order to upload this plot'
          })
          infoPopup.then(function (res) {
            infoPopup.close()

          })
          return
        }
      }

      /* Force data to current_plot */
      // console.log('Before Submit : ')
      // console.log(consider_submitting_plot)
      if (isEmpty(consider_submitting_plot.name)) {
        alert('Name of plot is required !')
        return
      }
      if (isEmpty(consider_submitting_plot.recorder_name)) {
        alert('Recorder name of plot is required !')
        return
      }

      /* Check data in land_cover_data object */
      if (isEmpty(consider_submitting_plot.land_cover_data)) {
        var infoPopup = $ionicPopup.alert({
          cssClass: 'remove-title-class',
          template: 'LandCover data is not successful to submit'
        })
        infoPopup.then(function (res) {
          infoPopup.close()
        })
        return
      }
      consider_submitting_plot.land_cover_data.name = consider_submitting_plot.name
      consider_submitting_plot.land_cover_data.recorder_name = consider_submitting_plot.recorder_name
      d = new Date()
      var current_date = d.yyyymmdd()
      /* Force date data to current_plot */
      consider_submitting_plot.land_cover_data.date = current_date
      // console.log("DATE ::: " + consider_submitting_plot.land_cover_data.date)
      var transect_object = consider_submitting_plot.land_cover_data.transect
      var bo_perfect = true
      var message = 'There are some segments for which data have not been entered : '
      if (isEmpty(transect_object) || transect_object.length < 20 || isEmpty(transect_object.length)) {
        var infoPopup = $ionicPopup.alert({
          cssClass: 'remove-title-class',
          template: 'Required transects and segments are not successful'
        })
        infoPopup.then(function (res) {
          infoPopup.close()
        })
        return
      }

      /* Check North transect */
      if (consider_submitting_plot.isComplete_North_5m === false || isEmpty(consider_submitting_plot.isComplete_North_5m)) {
        bo_perfect = false
        message = message + ' North 5m ;'
      }
      if (consider_submitting_plot.isComplete_North_10m === false || isEmpty(consider_submitting_plot.isComplete_North_10m)) {
        bo_perfect = false
        message = message + ' North 10m ;'
      }
      if (consider_submitting_plot.isComplete_North_15m === false || isEmpty(consider_submitting_plot.isComplete_North_15m)) {
        bo_perfect = false
        message = message + ' North 15m ;'
      }
      if (consider_submitting_plot.isComplete_North_20m === false || isEmpty(consider_submitting_plot.isComplete_North_20m)) {
        bo_perfect = false
        message = message + ' North 20m ;'
      }
      if (consider_submitting_plot.isComplete_North_25m === false || isEmpty(consider_submitting_plot.isComplete_North_25m)) {
        bo_perfect = false
        message = message + ' North 25m ;'
      }

      /* Check south transect */
      if (consider_submitting_plot.isComplete_South_5m === false || isEmpty(consider_submitting_plot.isComplete_South_5m)) {
        bo_perfect = false
        message = message + ' South 5m ;'
      }
      if (consider_submitting_plot.isComplete_South_10m === false || isEmpty(consider_submitting_plot.isComplete_South_10m)) {
        bo_perfect = false
        message = message + ' South 10m ;'
      }
      if (consider_submitting_plot.isComplete_South_15m === false || isEmpty(consider_submitting_plot.isComplete_South_15m)) {
        bo_perfect = false
        message = message + ' South 15m ;'
      }
      if (consider_submitting_plot.isComplete_South_20m === false || isEmpty(consider_submitting_plot.isComplete_South_20m)) {
        bo_perfect = false
        message = message + ' South 20m ;'
      }
      if (consider_submitting_plot.isComplete_South_25m === false || isEmpty(consider_submitting_plot.isComplete_South_25m)) {
        bo_perfect = false
        message = message + ' South 25m ;'
      }

      /* Check east transect */
      if (consider_submitting_plot.isComplete_East_5m === false || isEmpty(consider_submitting_plot.isComplete_East_5m)) {
        bo_perfect = false
        message = message + ' East 5m ;'
      }
      if (consider_submitting_plot.isComplete_East_10m === false || isEmpty(consider_submitting_plot.isComplete_East_10m)) {
        bo_perfect = false
        message = message + ' East 10m ;'
      }
      if (consider_submitting_plot.isComplete_East_15m === false || isEmpty(consider_submitting_plot.isComplete_East_15m)) {
        bo_perfect = false
        message = message + ' East 15m ;'
      }
      if (consider_submitting_plot.isComplete_East_20m === false || isEmpty(consider_submitting_plot.isComplete_East_20m)) {
        bo_perfect = false
        message = message + ' East 20m ;'
      }
      if (consider_submitting_plot.isComplete_East_25m === false || isEmpty(consider_submitting_plot.isComplete_East_25m)) {
        bo_perfect = false
        message = message + ' East 25m ;'
      }

      /* Check west transect */
      if (consider_submitting_plot.isComplete_West_5m === false || isEmpty(consider_submitting_plot.isComplete_West_5m)) {
        bo_perfect = false
        message = message + ' West 5m ;'
      }
      if (consider_submitting_plot.isComplete_West_10m === false || isEmpty(consider_submitting_plot.isComplete_West_10m)) {
        bo_perfect = false
        message = message + ' West 10m ;'
      }
      if (consider_submitting_plot.isComplete_West_15m === false || isEmpty(consider_submitting_plot.isComplete_West_15m)) {
        bo_perfect = false
        message = message + ' West 15m ;'
      }
      if (consider_submitting_plot.isComplete_West_20m === false || isEmpty(consider_submitting_plot.isComplete_West_20m)) {
        bo_perfect = false
        message = message + ' West 20m ;'
      }
      if (consider_submitting_plot.isComplete_West_25m === false || isEmpty(consider_submitting_plot.isComplete_West_25m)) {
        bo_perfect = false
        message = message + ' West 25m ;'
      }

      if (bo_perfect === false) {
        STATUS_LANDCOVER_DATA_COLLECTION_UPDATE  = "NOT_FULL_DATA"
        /*
        var infoPopup = $ionicPopup.alert({
          cssClass: 'remove-title-class',
          template: message
        })
        infoPopup.then(function (res) {
          infoPopup.close()
        })
        */
      }

      if (STATUS_LANDCOVER_DATA_COLLECTION_UPDATE === "FULL_DATA_20"){
        if(checkNetConnection() === true){
            /* If NETWORK IS CONNECTED */
            var confirmPopup = $ionicPopup.confirm({
              title: 'Confirm',
              template: 'All LandCover data for plot ' + $scope.plot_name + ' is ready for submission. Do you want to submit it ?'
            })
            confirmPopup.then(function (res) {
              if (res) {
                confirmPopup.close()
                var count = 0
                $ionicLoading.show({
                  template: 'Submitting Plot. Please wait...'
                })

                var landcover_data = consider_submitting_plot.land_cover_data
                var transect_data = consider_submitting_plot.land_cover_data.transect

                //var dominant_woody_value_species = getDominantWoody(transect_data)
                var dominant_woody_value_species =  document.getElementById('dominant_woody').value
                var dominant_woody_value_species_2 =  document.getElementById('dominant_woody_2').value
                //var dominant_nonwoody_value_species = getDominantNonWoody(transect_data)
                var dominant_nonwoody_value_species = document.getElementById('dominant_nonwoody').value
                var dominant_nonwoody_value_species_2 = document.getElementById('dominant_nonwoody_2').value

                /* Check Token de make POST request 20160812 */
                var googleToken = ''
                /*if (checkGoogleAuthKey_StillWorking() == true){
                  googleToken = window.localStorage.getItem('current_json_auth_data_landcover')
                  console.log("Su dung Token :")
                  console.log(googleToken)
                } else {
                  if (window.cordova){
                    refresh_GoogleToken_Auth1_DEVICE($http)
                  } else {
                    refresh_GoogleToken_Auth1_Web()
                  }
                  alert("Application is requred to refresh Google Authentication to submit Plot. Please re-click submit button again")
                  $ionicLoading.hide()
                  return
                }*/

                /* Make delete firstly */
                var delete_result = delete_ALandCoverDataCollection_ForPlot_ByNamRecorderNameDate($http,consider_submitting_plot,googleToken)

                setTimeout(
    							function(){
                      /* End Check Token 20160812 */
                      var submit_each_part_result = true
                      var detail_error = {}
                      for (var i = 0; i < 20; i++) {
                        /* Preprocessing before submit */
                        if (isEmpty(transect_data[i].segment.canopy_gap)) {
                          transect_data[i].segment.canopy_gap = 'FALSE'
                        }
                        if (isEmpty(transect_data[i].segment.basal_gap)) {
                          transect_data[i].segment.basal_gap = 'FALSE'
                        }

                        /* End Preprocessing */
                        $http({
                          method: 'POST',
                          url: LANDPKS_API_ENDPOINT,
                          headers: {'Content-type': 'application/x-www-form-urlencoded',
                                    'X-Auth-Token':googleToken},

                          transformRequest: function (obj) {
                            var str = []
                            for (var p in obj)
                              str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
                            // console.log(str)
                            return str.join('&')
                          },
                          timeout: HTTP_TIME_OUT_CONNECTION,
                          data: {
                            action: 'put', object: 'landcover',version: LANDPKS_API_VERSION,source: 'landcover_mobile_app',
                            date: consider_submitting_plot.land_cover_data.date,
                            name: consider_submitting_plot.name, recorder_name: consider_submitting_plot.recorder_name,
                            notes : consider_submitting_plot.notes,
                            landinfo_plot_id: consider_submitting_plot.id, transect: transect_data[i].direction,
                            segment: transect_data[i].segment.range, canopy_height: transect_data[i].segment.canopy_height, canopy_gap: transect_data[i].segment.canopy_gap,
                            basal_gap: transect_data[i].segment.basal_gap, species_of_interest_1_count: transect_data[i].segment.species_of_interest_1_count,
                            species_of_interest_2_count: transect_data[i].segment.species_of_interest_2_count, species_1_density: transect_data[i].segment.species_of_interest_1_count,
                            species_2_density: transect_data[i].segment.species_of_interest_2_count,
                            species_of_interest_1: transect_data[i].species_of_interest_1,
                            species_of_interest_2: transect_data[i].species_of_interest_2,
                            dominant_woody_species: dominant_woody_value_species,
                            dominant_woody_species_2: dominant_woody_value_species_2,
                            dominant_nonwoody_species: dominant_nonwoody_value_species,
                            dominant_nonwoody_species_2: dominant_nonwoody_value_species_2,
                            stick_segment_0: transect_data[i].segment.stick_segment[0].cover,
                            stick_segment_1: transect_data[i].segment.stick_segment[1].cover,stick_segment_2: transect_data[i].segment.stick_segment[2].cover,
                            stick_segment_3: transect_data[i].segment.stick_segment[3].cover, stick_segment_4: transect_data[i].segment.stick_segment[4].cover
                          }
                        }).success(
                          function (data, status, headers, config) {
                            // console.log(status)
                          // $ionicLoading.hide()
                          }).error(function (err) {
                            detail_error =  err
                            submit_each_part_result = false
                            return
                          })
                      }

                      setTimeout(
                        function(){
                          if (submit_each_part_result == true){
                              $ionicLoading.hide()
                              consider_submitting_plot.has_land_cover = true
                              consider_submitting_plot.current_local_landcover_submitted_status = false
                              consider_submitting_plot.landcover_transects_status = "CLEAN"
                              consider_submitting_plot.dominant_woody_species = dominant_woody_value_species
                              consider_submitting_plot.dominant_woody_species_2 = dominant_woody_value_species_2
                              consider_submitting_plot.dominant_nonwoody_species = dominant_nonwoody_value_species
                              consider_submitting_plot.dominant_nonwoody_species_2 = dominant_nonwoody_value_species_2
                              for(var index = 0 ; index < 20 ; index++){
                                consider_submitting_plot.land_cover_data.transect[index].dominant_woody_species = dominant_woody_value_species
                                consider_submitting_plot.land_cover_data.transect[index].dominant_woody_species_2 = dominant_woody_value_species_2
                                consider_submitting_plot.land_cover_data.transect[index].dominant_nonwoody_species = dominant_nonwoody_value_species
                                consider_submitting_plot.land_cover_data.transect[index].dominant_nonwoody_species_2 = dominant_nonwoody_value_species_2
                                consider_submitting_plot.land_cover_data.transect[index].date = consider_submitting_plot.land_cover_data.date
                              }
                                
                            
                              var LIST_PLOTS = JSON.parse(window.localStorage.getItem(recorder_name + '_' + 'LIST_LANDINFO_PLOTS'))
                              var current_LandInfo_Plot = JSON.parse(window.localStorage.getItem('current_view_plot'))

                              consider_submitting_plot = plotListService.updateCoverObject(current_LandInfo_Plot.landCoverObject, consider_submitting_plot);
                              current_LandInfo_Plot.landCoverObject = consider_submitting_plot 
                              
                              //remove the edit object
                              delete current_LandInfo_Plot.landCoverObject["edit_land_cover_data"]
                              delete current_LandInfo_Plot.landCoverObject["edit_land_cover_status"]
                              current_LandInfo_Plot.landCoverObject.is_EDIT_OLD = "FALSE"       
                              
                              updatePlot_2(LIST_PLOTS, current_LandInfo_Plot)
                              window.localStorage.setItem('current_view_plot', JSON.stringify(current_LandInfo_Plot))
                              window.localStorage.setItem(recorder_name + '_' + 'LIST_LANDINFO_PLOTS', JSON.stringify(LIST_PLOTS));

                              $state.go('landpks.landinfo_site-home')
                          } else {
                              $ionicLoading.hide()
                              var err_message = ""
                              if (isEmpty(detail_error)){
                                err_message = ""
                              } else {
                                err_message = detail_error.error
                              }
                              var infoPopup = $ionicPopup.alert({
                                cssClass: 'remove-title-class',
                                template: 'Error in submit LandCover data. Please try it again. Detail : ' + err_message
                              })
                              infoPopup.then(function (res) {
                                infoPopup.close()
                              })
                          }
                        }
                      , 4000);
                }, 2000);

          } else {
             confirmPopup.close()
             return
          }
        })
        } else {
           /* If NETWORK IS NOT CONNECTED */
           var confirmPopup = $ionicPopup.confirm({
             title: 'Confirm',
             template: 'All LandCover data for plot ' + $scope.plot_name + ' is ready for submission. Do you want to submit it ?'
           })
           confirmPopup.then(function (res) {
             if (res) {
               confirmPopup.close()
               var infoPopup = $ionicPopup.alert({
                 cssClass: 'remove-title-class',
                 template: 'Transect data has been marked for background upload. You will receive a notification when upload is complete'
               })
               infoPopup.then(function (res) {
                 /* consider final dominant_woody_species and dominant_nonwoody_species */
                 consider_submitting_plot.dominant_woody_species = document.getElementById('dominant_woody').value
                 consider_submitting_plot.dominant_woody_species_2 = document.getElementById('dominant_woody_2').value
                 consider_submitting_plot.dominant_nonwoody_species = document.getElementById('dominant_nonwoody').value
                 consider_submitting_plot.dominant_nonwoody_species_2 = document.getElementById('dominant_nonwoody_2').value

                 //Add Plot to queue
                 addPending_LandCoverRecord_ToQueue(consider_submitting_plot)
                 // console.log("Action LA : " + action)
                 //console.log("Kiem tra")
                 //console.log(consider_submitting_plot)
                 if (action === 'ADD_NEW' || action==='EDIT_NEW'){
                   consider_submitting_plot.status = 'UPLOADING'
                   consider_submitting_plot.has_land_cover = true
                   consider_submitting_plot.current_local_landcover_submitted_status = false
                   consider_submitting_plot.landcover_transects_status = "CLEAN"
                   delete consider_submitting_plot.isComplete_East_5m
                   delete consider_submitting_plot.isComplete_East_10m
                   delete consider_submitting_plot.isComplete_East_15m
                   delete consider_submitting_plot.isComplete_East_20m
                   delete consider_submitting_plot.isComplete_East_25m
                   delete consider_submitting_plot.isComplete_West_5m
                   delete consider_submitting_plot.isComplete_West_10m
                   delete consider_submitting_plot.isComplete_West_15m
                   delete consider_submitting_plot.isComplete_West_20m
                   delete consider_submitting_plot.isComplete_West_25m
                   delete consider_submitting_plot.isComplete_North_5m
                   delete consider_submitting_plot.isComplete_North_10m
                   delete consider_submitting_plot.isComplete_North_15m
                   delete consider_submitting_plot.isComplete_North_20m
                   delete consider_submitting_plot.isComplete_North_25m
                   delete consider_submitting_plot.isComplete_South_5m
                   delete consider_submitting_plot.isComplete_South_10m
                   delete consider_submitting_plot.isComplete_South_15m
                   delete consider_submitting_plot.isComplete_South_20m
                   delete consider_submitting_plot.isComplete_South_25m

                   for(var index = 0 ; index < 20 ; index++){
                     consider_submitting_plot.land_cover_data.transect[index].date = consider_submitting_plot.land_cover_data.date
                     consider_submitting_plot.land_cover_data.transect[index].dominant_woody_species = consider_submitting_plot.dominant_woody_species
                     consider_submitting_plot.land_cover_data.transect[index].dominant_woody_species_2 = consider_submitting_plot.dominant_woody_species_2
                     consider_submitting_plot.land_cover_data.transect[index].dominant_nonwoody_species = consider_submitting_plot.dominant_nonwoody_species
                     consider_submitting_plot.land_cover_data.transect[index].dominant_nonwoody_species_2 = consider_submitting_plot.dominant_nonwoody_species_2
                     //console.log('Da ADD ' + index + ' : ' + consider_submitting_plot.dominant_woody_species +  ' : ' +  consider_submitting_plot.dominant_nonwoody_species)
                   }
                   consider_submitting_plot.img_src = icon_empty_checkmark
                   var LIST_PLOTS = JSON.parse(window.localStorage.getItem(recorder_name + '_' + 'LIST_LANDINFO_PLOTS'))
                   updatePlot_2(LIST_PLOTS, consider_submitting_plot)
                 } else if (action === 'ADD_OLD' || action === 'EDIT_OLD'){
                   var full_current_plot = JSON.parse(window.localStorage.getItem('current_plot_data_landcover'))
                   full_current_plot.edit_land_cover_data = {}
                   full_current_plot.edit_land_cover_status = {}
                   delete consider_submitting_plot.isComplete_East_5m
                   delete consider_submitting_plot.isComplete_East_10m
                   delete consider_submitting_plot.isComplete_East_15m
                   delete consider_submitting_plot.isComplete_East_20m
                   delete consider_submitting_plot.isComplete_East_25m
                   delete consider_submitting_plot.isComplete_West_5m
                   delete consider_submitting_plot.isComplete_West_10m
                   delete consider_submitting_plot.isComplete_West_15m
                   delete consider_submitting_plot.isComplete_West_20m
                   delete consider_submitting_plot.isComplete_West_25m
                   delete consider_submitting_plot.isComplete_North_5m
                   delete consider_submitting_plot.isComplete_North_10m
                   delete consider_submitting_plot.isComplete_North_15m
                   delete consider_submitting_plot.isComplete_North_20m
                   delete consider_submitting_plot.isComplete_North_25m
                   delete consider_submitting_plot.isComplete_South_5m
                   delete consider_submitting_plot.isComplete_South_10m
                   delete consider_submitting_plot.isComplete_South_15m
                   delete consider_submitting_plot.isComplete_South_20m
                   delete consider_submitting_plot.isComplete_South_25m
                   for(var index = 0; index < 20 ; index++){
                     consider_submitting_plot.land_cover_data.transect[index].date = consider_submitting_plot.land_cover_data.date
                     consider_submitting_plot.land_cover_data.transect[index].dominant_woody_species = consider_submitting_plot.dominant_woody_species
                     consider_submitting_plot.land_cover_data.transect[index].dominant_woody_species_2 = consider_submitting_plot.dominant_woody_species_2
                     consider_submitting_plot.land_cover_data.transect[index].dominant_nonwoody_species = consider_submitting_plot.dominant_nonwoody_species
                     consider_submitting_plot.land_cover_data.transect[index].dominant_nonwoody_species_2 = consider_submitting_plot.dominant_nonwoody_species_2
                     full_current_plot.land_cover_data.transect.push(consider_submitting_plot.land_cover_data.transect[index])
                     //console.log('Da ADD ' + index + ' : ' + consider_submitting_plot.dominant_woody_species +  ' : ' +  consider_submitting_plot.dominant_nonwoody_species)
                   }
                   full_current_plot.is_ADD_OLD = 'TRUE'
                   full_current_plot.is_EDIT_OLD = 'FALSE'
                   full_current_plot.landcover_transects_status = 'CLEAN'
                   full_current_plot.current_local_landcover_submitted_status = false
                   var LIST_PLOTS = JSON.parse(window.localStorage.getItem(recorder_name + '_' + 'LIST_LANDINFO_PLOTS'))
                   updatePlot_2(LIST_PLOTS, full_current_plot)

                 }
                 //console.log("Du lieu")
                 //console.log(LIST_PLOTS)
                 window.localStorage.setItem(recorder_name + '_' + 'LIST_LANDINFO_PLOTS_LANDCOVER', JSON.stringify(LIST_PLOTS))
                 /* Co the phai add them cac trang thai */
                 window.localStorage.setItem('current_view_plot_after_submit_landcover',JSON.stringify(consider_submitting_plot))
                 window.localStorage.setItem('landcover_submit_time_status','OFFLINE')
                 $state.go('landpks.landinfo_site-home')
               })
             } else {
               /* Do nothing */
             }
           })
        }
      } else {
        //Update 20170301 - New featurre LandCover - multiple uploaded
        if(checkNetConnection() === true){
          /* For Online Submit */
          if ((checkLandCover_Record_isCompleted_FullCases(consider_submitting_plot) === 'FRESHED')
              || (checkLandCover_Record_isCompleted_FullCases(consider_submitting_plot) === 'MESS_ALL')) {
                var infoPopup = $ionicPopup.alert({
                  cssClass: 'remove-title-class',
                  template: LCOVER_NOTIFICAION_CANNOTSUBMIT_NOTENOUGH_TRANSECTS_DATA
                })
                infoPopup.then(function (res) {
                  infoPopup.close()
                })
                return
          } else {
                procedure_submitALandCoverDataCollection_ForPlot_ONLINE($scope,$ionicPopup,$ionicLoading,$http,consider_submitting_plot,"NOT_FULL_DATA")

          }
        } else {
          // console.log("Submit UN-Full Offline")
          /* For Offline Submit */
          if ((checkLandCover_Record_isCompleted_FullCases(consider_submitting_plot) === 'FRESHED')
              || (checkLandCover_Record_isCompleted_FullCases(consider_submitting_plot) === 'MESS_ALL')) {
                var infoPopup = $ionicPopup.alert({
                  cssClass: 'remove-title-class',
                  template: LCOVER_NOTIFICAION_CANNOTSUBMIT_NOTENOUGH_TRANSECTS_DATA
                })
                infoPopup.then(function (res) {
                  infoPopup.close()
                })
                return
          } else {
              var completeMessage = getMessageTransectSegments_Completed(consider_submitting_plot)
        			var restMessage = getMessageTransectSegments_IN_Complete(consider_submitting_plot)
        			var confirmPopup = $ionicPopup.confirm({
        				title: 'Confirm',
        				template: restMessage + ' segments have not been completed, calculation will be displayed when all segments have been completed. <br/><br/>'  + completeMessage + ' are ready for submission. Do you want to submit them ? '
        			})
        			confirmPopup.then(function (res) {
        				if (res) {
        					confirmPopup.close()
                  var infoPopup = $ionicPopup.alert({
                    cssClass: 'remove-title-class',
                    template: 'Transect data has been marked for background upload. Upload process will be completed when device is online'
                  })
                  infoPopup.then(function (res) {
                    procedure_submitALandCoverDataCollection_ForPlot_OFFLINE($scope,$ionicPopup,$ionicLoading,$http,consider_submitting_plot,"NOT_FULL_DATA")

                    var current_plot_2 = JSON.parse(window.localStorage.getItem('current_plot_data_landcover'))
                    var current_edit_plot_landcover_2 = JSON.parse(window.localStorage.getItem('current_edit_plot_landcover'))
                    if (!isEmpty(current_plot_2)){
                      current_plot_2.current_local_landcover_submitted_status = true
                    }

                    if (!isEmpty(current_edit_plot_landcover_2)){
                        current_edit_plot_landcover_2.current_local_landcover_submitted_status = true
                    }
                    window.localStorage.setItem('current_plot_data_landcover',JSON.stringify(current_plot_2))
                    window.localStorage.setItem('current_edit_plot_landcover',JSON.stringify(current_edit_plot_landcover_2))

                    infoPopup.close()
                    return

                  });
                } else {
                  confirmPopup.close()
                  return
                }
              });
          }
        }
      }
    }

    function presentStatusComponent () {
      if (current_plot.has_land_cover == false) {
        document.getElementById('btnSubmitLandCover').style.display = 'block'
        //document.getElementById('btnSummaryLandCover').style.display = 'none'
        //document.getElementById('previously_submitted_date').style.display = 'none'
        if (isEmpty(current_plot.dominant_nonwoody_species)) {
          $scope.dominant_nonwoody_species = ''
        } else {
          $scope.dominant_nonwoody_species = current_plot.dominant_nonwoody_species
        }

        if (isEmpty(current_plot.dominant_nonwoody_species_2)) {
          $scope.dominant_nonwoody_species_2 = ''
        } else {
          $scope.dominant_nonwoody_species_2 = current_plot.dominant_nonwoody_species_2
        }

        if (isEmpty(current_plot.dominant_woody_species)) {
          $scope.dominant_woody_species = ''
        } else {
          $scope.dominant_woody_species = current_plot.dominant_woody_species
        }

        if (isEmpty(current_plot.dominant_woody_species_2)) {
          $scope.dominant_woody_species_2 = ''
        } else {
          $scope.dominant_woody_species_2 = current_plot.dominant_woody_species_2
        }

        current_plot.land_cover_data.name = current_plot.name
        current_plot.land_cover_data.recorder_name = current_plot.recorder_name
        d = new Date()
        var current_date = d.yyyymmdd()

        current_plot.land_cover_data.date = current_date

        var transect_data = current_plot.land_cover_data.transect

        var temp_transect
        // console.log(transect_data)

        if (isEmpty(transect_data) || transect_data.length < 20) {
          window.localStorage.setItem('current_action_landcover', 'ADD_NEW')
          var object_north_5m = getDefaultObject('NORTH', '5m')
          var object_north_10m = getDefaultObject('NORTH', '10m')
          var object_north_15m = getDefaultObject('NORTH', '15m')
          var object_north_20m = getDefaultObject('NORTH', '20m')
          var object_north_25m = getDefaultObject('NORTH', '25m')

          temp_transect = {
            transect_data: []
          }
          temp_transect.transect_data.push(
            object_north_5m, object_north_10m, object_north_15m, object_north_20m, object_north_25m
          )

          var object_east_5m = getDefaultObject('EAST', '5m')
          var object_east_10m = getDefaultObject('EAST', '10m')
          var object_east_15m = getDefaultObject('EAST', '15m')
          var object_east_20m = getDefaultObject('EAST', '20m')
          var object_east_25m = getDefaultObject('EAST', '25m')
          temp_transect.transect_data.push(
            object_east_5m, object_east_10m, object_east_15m, object_east_20m, object_east_25m
          )

          var object_south_5m = getDefaultObject('SOUTH', '5m')
          var object_south_10m = getDefaultObject('SOUTH', '10m')
          var object_south_15m = getDefaultObject('SOUTH', '15m')
          var object_south_20m = getDefaultObject('SOUTH', '20m')
          var object_south_25m = getDefaultObject('SOUTH', '25m')
          temp_transect.transect_data.push(
            object_south_5m, object_south_10m, object_south_15m, object_south_20m, object_south_25m
          )

          var object_west_5m = getDefaultObject('WEST', '5m')
          var object_west_10m = getDefaultObject('WEST', '10m')
          var object_west_15m = getDefaultObject('WEST', '15m')
          var object_west_20m = getDefaultObject('WEST', '20m')
          var object_west_25m = getDefaultObject('WEST', '25m')
          temp_transect.transect_data.push(
            object_west_5m, object_west_10m, object_west_15m, object_west_20m, object_west_25m
          )
          current_plot.land_cover_data.transect = temp_transect.transect_data
          window.localStorage.setItem('current_plot_data_landcover', JSON.stringify(current_plot))
        } else {
          if (current_plot.has_land_cover == false && current_plot.need_init == false) {
            action = 'EDIT_NEW'
            document.getElementById('btnSubmitLandCover').style.display = 'block'
            //document.getElementById('btnSummaryLandCover').style.display = 'none'
            //document.getElementById('previously_submitted_date').style.display = 'none'
            window.localStorage.setItem('current_action_landcover', action)
          }
        }
        //console.log(temp_transect)
        //console.log('Main Transect')
        //console.log(current_plot)
      } else {
        var sub_action = $scope.previously_submitted_date
        if (isEmpty(sub_action)) {
          sub_action = 'ADD_OLD'
        }

        if (sub_action == 'ADD_OLD') {
          document.getElementById('btnSubmitLandCover').style.display = 'block'
          /* old */
          //document.getElementById('btnSummaryLandCover').style.display = 'none'
          /* end */
          /* new */
          //document.getElementById('btnSummaryLandCover').style.display = 'block'
          //document.getElementById('btnSummaryLandCover').disabled = true
          /* end */
          //document.getElementById('previously_submitted_date').style.display = 'block'
          $scope.dominant_woody_species = ''
          $scope.dominant_nonwoody_species = ''
          $scope.dominant_woody_species_2 = ''
          $scope.dominant_nonwoody_species_2 = ''
          if (isEmpty(current_plot.is_ADD_OLD)) {
            current_plot.is_ADD_OLD = 'TRUE'
          }
          if (isEmpty(current_plot.is_EDIT_OLD)) {
            current_plot.is_EDIT_OLD = 'FALSE'
          }

          if (isEmpty(current_plot.dominant_nonwoody_species)) {
            $scope.dominant_nonwoody_species = ''
          } else {
            $scope.dominant_nonwoody_species = current_plot.dominant_nonwoody_species
          }

          if (isEmpty(current_plot.dominant_nonwoody_species_2)) {
            $scope.dominant_nonwoody_species_2 = ''
          } else {
            $scope.dominant_nonwoody_species_2 = current_plot.dominant_nonwoody_species_2
          }

          if (isEmpty(current_plot.dominant_woody_species)) {
            $scope.dominant_woody_species = ''
          } else {
            $scope.dominant_woody_species = current_plot.dominant_woody_species
          }

          if (isEmpty(current_plot.dominant_woody_species_2)) {
            $scope.dominant_woody_species_2 = ''
          } else {
            $scope.dominant_woody_species_2 = current_plot.dominant_woody_species_2
          }

          if (current_plot.is_ADD_OLD === 'TRUE' && current_plot.is_EDIT_OLD === 'FALSE') {
            action = 'ADD_OLD'
            window.localStorage.setItem('current_action_landcover', action)
            console.log('Day la ADD-OLD')

            var current_edit_plot_landcover = {}
            current_edit_plot_landcover.has_land_cover = current_plot.has_land_cover
            current_edit_plot_landcover.id = current_plot.id
            current_edit_plot_landcover.img_src = current_plot.img_src
            current_edit_plot_landcover.land_cover_data = {}
            current_edit_plot_landcover.name = current_plot.name
            current_edit_plot_landcover.recorder_name = current_plot.recorder_name

            current_plot.edit_land_cover_data = {}
            current_plot.edit_land_cover_data.name = current_plot.name
            current_plot.edit_land_cover_data.recorder_name = current_plot.recorder_name
            d = new Date()
            var current_date = d.yyyymmdd()

            current_plot.edit_land_cover_data.date = current_date
            current_plot.edit_land_cover_data.transect = []
            current_edit_plot_landcover.land_cover_data.transect = []
            current_edit_plot_landcover.land_cover_data.date = []

            var object_north_5m = getDefaultObject('NORTH', '5m')
            var object_north_10m = getDefaultObject('NORTH', '10m')
            var object_north_15m = getDefaultObject('NORTH', '15m')
            var object_north_20m = getDefaultObject('NORTH', '20m')
            var object_north_25m = getDefaultObject('NORTH', '25m')

            temp_transect = {
              transect_data: []
            }
            temp_transect.transect_data.push(
              object_north_5m, object_north_10m, object_north_15m, object_north_20m, object_north_25m
            )

            var object_east_5m = getDefaultObject('EAST', '5m')
            var object_east_10m = getDefaultObject('EAST', '10m')
            var object_east_15m = getDefaultObject('EAST', '15m')
            var object_east_20m = getDefaultObject('EAST', '20m')
            var object_east_25m = getDefaultObject('EAST', '25m')
            temp_transect.transect_data.push(
              object_east_5m, object_east_10m, object_east_15m, object_east_20m, object_east_25m
            )

            var object_south_5m = getDefaultObject('SOUTH', '5m')
            var object_south_10m = getDefaultObject('SOUTH', '10m')
            var object_south_15m = getDefaultObject('SOUTH', '15m')
            var object_south_20m = getDefaultObject('SOUTH', '20m')
            var object_south_25m = getDefaultObject('SOUTH', '25m')
            temp_transect.transect_data.push(
              object_south_5m, object_south_10m, object_south_15m, object_south_20m, object_south_25m
            )

            var object_west_5m = getDefaultObject('WEST', '5m')
            var object_west_10m = getDefaultObject('WEST', '10m')
            var object_west_15m = getDefaultObject('WEST', '15m')
            var object_west_20m = getDefaultObject('WEST', '20m')
            var object_west_25m = getDefaultObject('WEST', '25m')
            temp_transect.transect_data.push(
              object_west_5m, object_west_10m, object_west_15m, object_west_20m, object_west_25m
            )
            current_plot.edit_land_cover_data.transect = temp_transect.transect_data

            window.localStorage.setItem('current_plot_data_landcover', JSON.stringify(current_plot))
            current_edit_plot_landcover.land_cover_data = current_plot.edit_land_cover_data
            window.localStorage.setItem('current_edit_plot_landcover', JSON.stringify(current_edit_plot_landcover))
          } else if (current_plot.is_ADD_OLD === 'FALSE' && current_plot.is_EDIT_OLD === 'TRUE') {
            action = 'EDIT_OLD'
            window.localStorage.setItem('current_action_landcover', action)
            // console.log('Day la EDIT-OLD')

            var current_edit_plot_landcover = definedSingleEditingLandCoverObjectData(current_plot)
            current_edit_plot_landcover.land_cover_data = {}
            if (!isEmpty(current_plot.edit_land_cover_data)) {
              current_edit_plot_landcover.land_cover_data = current_plot.edit_land_cover_data
              if (!isEmpty(current_plot.edit_land_cover_status)){
                  if (!isEmpty(current_plot.edit_land_cover_status.isComplete_North_5m))
                      current_edit_plot_landcover.isComplete_North_5m = current_plot.edit_land_cover_status.isComplete_North_5m
                  if (!isEmpty(current_plot.edit_land_cover_status.isComplete_North_10m))
                      current_edit_plot_landcover.isComplete_North_10m = current_plot.edit_land_cover_status.isComplete_North_10m
                  if (!isEmpty(current_plot.edit_land_cover_status.isComplete_North_15m))
                      current_edit_plot_landcover.isComplete_North_15m = current_plot.edit_land_cover_status.isComplete_North_15m
                  if (!isEmpty(current_plot.edit_land_cover_status.isComplete_North_20m))
                      current_edit_plot_landcover.isComplete_North_20m = current_plot.edit_land_cover_status.isComplete_North_20m
                  if (!isEmpty(current_plot.edit_land_cover_status.isComplete_North_25m))
                      current_edit_plot_landcover.isComplete_North_25m = current_plot.edit_land_cover_status.isComplete_North_25m

                  if (!isEmpty(current_plot.edit_land_cover_status.isComplete_East_5m))
                      current_edit_plot_landcover.isComplete_East_5m = current_plot.edit_land_cover_status.isComplete_East_5m
                  if (!isEmpty(current_plot.edit_land_cover_status.isComplete_East_10m))
                      current_edit_plot_landcover.isComplete_East_10m = current_plot.edit_land_cover_status.isComplete_East_10m
                  if (!isEmpty(current_plot.edit_land_cover_status.isComplete_East_15m))
                      current_edit_plot_landcover.isComplete_East_15m = current_plot.edit_land_cover_status.isComplete_East_15m
                  if (!isEmpty(current_plot.edit_land_cover_status.isComplete_East_20m))
                      current_edit_plot_landcover.isComplete_East_20m = current_plot.edit_land_cover_status.isComplete_East_20m
                  if (!isEmpty(current_plot.edit_land_cover_status.isComplete_East_25m))
                      current_edit_plot_landcover.isComplete_East_25m = current_plot.edit_land_cover_status.isComplete_East_25m

                  if (!isEmpty(current_plot.edit_land_cover_status.isComplete_South_5m))
                      current_edit_plot_landcover.isComplete_South_5m = current_plot.edit_land_cover_status.isComplete_South_5m
                  if (!isEmpty(current_plot.edit_land_cover_status.isComplete_South_10m))
                      current_edit_plot_landcover.isComplete_South_10m = current_plot.edit_land_cover_status.isComplete_South_10m
                  if (!isEmpty(current_plot.edit_land_cover_status.isComplete_South_15m))
                      current_edit_plot_landcover.isComplete_South_15m = current_plot.edit_land_cover_status.isComplete_South_15m
                  if (!isEmpty(current_plot.edit_land_cover_status.isComplete_South_20m))
                      current_edit_plot_landcover.isComplete_South_20m = current_plot.edit_land_cover_status.isComplete_South_20m
                  if (!isEmpty(current_plot.edit_land_cover_status.isComplete_South_25m))
                      current_edit_plot_landcover.isComplete_South_25m = current_plot.edit_land_cover_status.isComplete_South_25m

                  if (!isEmpty(current_plot.edit_land_cover_status.isComplete_West_5m))
                      current_edit_plot_landcover.isComplete_West_5m = current_plot.edit_land_cover_status.isComplete_West_5m
                  if (!isEmpty(current_plot.edit_land_cover_status.isComplete_West_10m))
                      current_edit_plot_landcover.isComplete_West_10m = current_plot.edit_land_cover_status.isComplete_West_10m
                  if (!isEmpty(current_plot.edit_land_cover_status.isComplete_West_15m))
                      current_edit_plot_landcover.isComplete_West_15m = current_plot.edit_land_cover_status.isComplete_West_15m
                  if (!isEmpty(current_plot.edit_land_cover_status.isComplete_West_20m))
                      current_edit_plot_landcover.isComplete_West_20m = current_plot.edit_land_cover_status.isComplete_West_20m
                  if (!isEmpty(current_plot.edit_land_cover_status.isComplete_West_25m))
                      current_edit_plot_landcover.isComplete_West_25m = current_plot.edit_land_cover_status.isComplete_West_25m
              }
              window.localStorage.setItem('current_edit_plot_landcover', JSON.stringify(current_edit_plot_landcover))
              //console.log("Before Test")
              //console.log(current_edit_plot_landcover)
            } else {
              console.log('Consisten coding error')
            }
          }
          console.log('Phan biet ADD_OLD and EDIT_OLD : ' + action)
          console.log(current_plot)
          //console.log("After Test")
          //console.log(current_edit_plot_landcover)
          $scope.consider_date = ''

          /* Cho nay can sua de lay correct speices names */
          var editting_transect = current_plot.edit_land_cover_data.transect
          if (isEmpty(editting_transect)) {
            $scope.dominant_woody_species = ''
            $scope.dominant_nonwoody_species = ''
            $scope.dominant_woody_species_2 = ''
            $scope.dominant_nonwoody_species_2 = ''
          } else {
            $scope.dominant_woody_species = getDominantWoody(editting_transect)
            $scope.dominant_woody_species_2 = getDominantWoody_2(editting_transect)
            $scope.dominant_nonwoody_species = getDominantNonWoody(editting_transect)
            $scope.dominant_nonwoody_species_2 = getDominantNonWoody_2(editting_transect)
          }
        } else {
          // console.log("Setting action to VIEW_OLD")
          action = 'VIEW_OLD'

          if (!isEmpty(sub_action) && sub_action.length === 10) {
            $scope.previously_submitted_date = sub_action
          }
          // console.log('VIEW OLD ' + sub_action)
          // console.log(current_plot)
          document.getElementById('btnSubmitLandCover').style.display = 'none'
          /* old */
          //document.getElementById('btnSummaryLandCover').style.display = 'block'
          /* end */
          /* new */
          //document.getElementById('btnSummaryLandCover').style.display = 'block'
          //document.getElementById('btnSummaryLandCover').disabled = false
          /* end */
          //document.getElementById('previously_submitted_date').style.display = 'block'

          var current_view_plot_landcover = {}
          if (current_plot.land_cover_data.transect.length <= 20) {
            current_view_plot_landcover = current_plot
            window.localStorage.setItem('current_view_plot_landcover', JSON.stringify(current_view_plot_landcover))
          } else {
            // console.log(sub_action)
            current_view_plot_landcover = copyCurrentViewLandCoverObjectData(current_plot, sub_action)
            window.localStorage.setItem('current_view_plot_landcover', JSON.stringify(current_view_plot_landcover))
          }
          window.localStorage.setItem('current_action_landcover', action)

          if (isEmpty(current_view_plot_landcover.land_cover_data.transect[0].dominant_woody_species) == false) {
            $scope.dominant_woody_species = current_view_plot_landcover.land_cover_data.transect[0].dominant_woody_species
          } else {
            $scope.dominant_woody_species = ''
          }

          if (isEmpty(current_view_plot_landcover.land_cover_data.transect[0].dominant_woody_species_2) == false) {
            $scope.dominant_woody_species_2 = current_view_plot_landcover.land_cover_data.transect[0].dominant_woody_species_2
          } else {
            $scope.dominant_woody_species_2 = ''
          }

          if (isEmpty(current_view_plot_landcover.land_cover_data.transect[0].dominant_nonwoody_species) == false) {
            $scope.dominant_nonwoody_species = current_view_plot_landcover.land_cover_data.transect[0].dominant_nonwoody_species
          } else {
            $scope.dominant_nonwoody_species = ''
          }

          if (isEmpty(current_view_plot_landcover.land_cover_data.transect[0].dominant_nonwoody_species_2) == false) {
            $scope.dominant_nonwoody_species_2 = current_view_plot_landcover.land_cover_data.transect[0].dominant_nonwoody_species_2
          } else {
            $scope.dominant_nonwoody_species_2 = ''
          }

          var editting_transect = current_view_plot_landcover.land_cover_data.transect
          if (isEmpty(editting_transect)) {
            $scope.dominant_woody_species = ''
            $scope.dominant_nonwoody_species = ''
            $scope.dominant_woody_species_2 = ''
            $scope.dominant_nonwoody_species_2 = ''
          } else {
            $scope.dominant_woody_species = getDominantWoody(editting_transect)
            $scope.dominant_woody_species_2 = getDominantWoody_2(editting_transect)
            $scope.dominant_nonwoody_species = getDominantNonWoody(editting_transect)
            $scope.dominant_nonwoody_species_2 = getDominantNonWoody_2(editting_transect)
          }

          $scope.consider_date = ', ' + sub_action
        }
      }
    }

    $scope.goBack = function () {
      // console.log("Main_Transect_Ctrl - Back")
      // console.log("goBack : " + action)
      var current_action = window.localStorage.getItem('current_action_landcover')

      current_plot = JSON.parse(window.localStorage.getItem('current_plot_data_landcover'))
      current_edit_plot_landcover = JSON.parse(window.localStorage.getItem('current_edit_plot_landcover'))
      // console.log("goBack acton : " + current_action)
      // console.log("goBack plot : " + JSON.stringify(current_plot))
      // console.log("goBack edit_plot : " + JSON.stringify(current_edit_plot_landcover))

      var consider_saving_plot = {}
      if (action === 'ADD_NEW' || action === 'EDIT_NEW') {
          consider_saving_plot = current_plot
      } else if (action === 'ADD_OLD' || action === 'EDIT_OLD') {
          consider_saving_plot = current_edit_plot_landcover
      } else {
          //return
          $state.go('landpks.landinfo_site-home')
          return
      }

      if (isEmpty(consider_saving_plot)){
        consider_saving_plot = {}
      }
      //console.log(consider_saving_plot)
      consider_saving_plot.need_init = false

      var status = checkLandCover_Record_isCompleted_FullCases(consider_saving_plot)
      consider_saving_plot.landcover_transects_status = status
      //console.log("TRang thai : ")
      //console.log(status)
      //console.log(consider_saving_plot)

      consider_saving_plot.dominant_woody_species = document.getElementById('dominant_woody').value
      consider_saving_plot.dominant_woody_species_2 = document.getElementById('dominant_woody_2').value
      consider_saving_plot.dominant_nonwoody_species = document.getElementById('dominant_nonwoody').value
      consider_saving_plot.dominant_nonwoody_species_2 = document.getElementById('dominant_nonwoody_2').value
      if (current_action === 'ADD_NEW' || current_action ==='EDIT_NEW'){
        /*
        console.log(consider_saving_plot)
        console.log("Thu xem da on chua ???")
        console.log(checkLandCover_Record_isCompleted(consider_saving_plot))
        if (checkLandCover_Record_isCompleted(consider_saving_plot)== true){
          consider_saving_plot.total_is_completed = true
        } else {
          consider_saving_plot.total_is_completed = false
        }
        */

        for(var index = 0 ; index < 20 ; index++){
            consider_saving_plot.land_cover_data.transect[index].date = consider_saving_plot.land_cover_data.date
            consider_saving_plot.land_cover_data.transect[index].dominant_woody_species = consider_saving_plot.dominant_woody_species
            consider_saving_plot.land_cover_data.transect[index].dominant_woody_species_2 = consider_saving_plot.dominant_woody_species_2
            consider_saving_plot.land_cover_data.transect[index].dominant_nonwoody_species = consider_saving_plot.dominant_nonwoody_species
            consider_saving_plot.land_cover_data.transect[index].dominant_nonwoody_species_2 = consider_saving_plot.dominant_nonwoody_species_2
        }
        //copy the data to the current landinfo plot and save it
        //current_LandInfo_Plot = JSON.parse(window.localStorage.getItem('current_view_plot'))
        //for (key in consider_saving_plot) {
          //current_LandInfo_Plot[key] = consider_saving_plot[key]
        //}
        //console.log(current_LandInfo_Plot)
        var LIST_PLOTS = JSON.parse(window.localStorage.getItem(recorder_name + '_' + 'LIST_LANDINFO_PLOTS'))
        var current_LandInfo_Plot = JSON.parse(window.localStorage.getItem('current_view_plot'))
        current_LandInfo_Plot.landCoverObject = consider_saving_plot         
        updatePlot_2(LIST_PLOTS, current_LandInfo_Plot)
        window.localStorage.setItem(recorder_name + '_' + 'LIST_LANDINFO_PLOTS', JSON.stringify(LIST_PLOTS));
        window.localStorage.setItem('current_view_plot', JSON.stringify(current_LandInfo_Plot));

      } else if (current_action === 'ADD_OLD' || current_action === 'EDIT_OLD'){
        /*
        console.log("Thu xem da on chua ???")
        console.log(checkLandCover_Record_isCompleted(consider_saving_plot))
        if (checkLandCover_Record_isCompleted(consider_saving_plot)== true){
          full_current_plot.total_is_completed = true
        } else {
          full_current_plot.total_is_completed = false
        }
        */
        var full_current_plot = JSON.parse(window.localStorage.getItem('current_plot_data_landcover'))
        console.log("goBack : " + window.localStorage.getItem('current_plot_data_landcover'))
        //console.log(full_current_plot)
        //full_current_plot.edit_land_cover_data.edit_land_cover_status.landcover_transects_status =
        for(var index = 0; index < 20 ; index++){
            full_current_plot.edit_land_cover_data.transect[index].date = full_current_plot.edit_land_cover_data.date
            full_current_plot.edit_land_cover_data.transect[index].dominant_woody_species = document.getElementById('dominant_woody').value
            full_current_plot.edit_land_cover_data.transect[index].dominant_woody_species_2 = document.getElementById('dominant_woody_2').value
            full_current_plot.edit_land_cover_data.transect[index].dominant_nonwoody_species = document.getElementById('dominant_nonwoody').value
            full_current_plot.edit_land_cover_data.transect[index].dominant_nonwoody_species_2 = document.getElementById('dominant_nonwoody_2').value
        }
        full_current_plot.is_ADD_OLD = 'FALSE'
        full_current_plot.is_EDIT_OLD = 'TRUE'

        //console.log("TRang thai 2 : ")
        //console.log(status)
        full_current_plot.landcover_transects_status = status

        var LIST_PLOTS = JSON.parse(window.localStorage.getItem(recorder_name + '_' + 'LIST_LANDINFO_PLOTS'))
        var current_LandInfo_Plot = JSON.parse(window.localStorage.getItem('current_view_plot'))
        current_LandInfo_Plot.landCoverObject = full_current_plot 
        updatePlot_2(LIST_PLOTS, current_LandInfo_Plot)
        window.localStorage.setItem(recorder_name + '_' + 'LIST_LANDINFO_PLOTS', JSON.stringify(LIST_PLOTS));
        window.localStorage.setItem('current_view_plot', JSON.stringify(current_LandInfo_Plot));
        
      }
      $state.go('landpks.landinfo_site-data')
    }

    $scope.summaryLandCoverData = function () {
      $state.go('landpks.landcover_site_summary')
    }

    function selectPreviouslySubmmittedDate(date) {
      // console.log("DATE : " + date)
      $scope.previously_submitted_date = date
      if (date !== 'ADD_OLD' && date !== 'EDIT_OLD' && date !== 'ADD_NEW' && date !== 'EDIT_NEW'){
        window.localStorage.setItem('current_view_landcover_plot_follow_date', date)

        /*$scope.data.notes = ''
        for(var i = 0 ; i < array_notes.length; i++){
          if (date === array_notes[i]['date']){
            $scope.data.notes = array_notes[i]['notes']
          }
        }*/

      } else {
        /*var current_notes_editting = window.localStorage.getItem(plot_name + '_CURRENT_NOTES_FOR_CURRENT_EDITTING_LANDCOVER')
        if (!isEmpty(current_notes_editting)) {
          $scope.data.notes =  current_notes_editting
        } else {
          $scope.data.notes = ''
        }*/
      }


      /* Update 20160808 - Locked when LC submiited for that day */
      // console.log("Check Date")
      // console.log(date)
      if (date === 'ADD_OLD' || date === 'EDIT_OLD'){
        d = new Date()
        var current_date = d.yyyymmdd()
        if (array_consider_date.indexOf(current_date) > -1){
          presentStatusComponent()
          // console.log("Check date : Existed landcover data for this date.Locked")
          displayComponentsWhenThisDataHasSubmittedLCData()
        } else {
          // console.log("Check date : Work normally")
          presentStatusComponent()
          presentStatusNavigatorButton()

          /* Disable TextFields */
          document.getElementById("dominant_woody").disabled = false;
          document.getElementById("dominant_woody_2").disabled = false;
          document.getElementById("dominant_nonwoody").disabled = false;
          document.getElementById("dominant_nonwoody_2").disabled = false;
        }
      } else {
        // console.log("Check date : Work normally")
        presentStatusComponent()
        presentStatusNavigatorButton()
        /* Disable TextFields */
        document.getElementById("dominant_woody").disabled = true;
        document.getElementById("dominant_woody_2").disabled = true;
        document.getElementById("dominant_nonwoody").disabled = true;
        document.getElementById("dominant_nonwoody_2").disabled = true;
      }

    }
    /* Active a new object LandCover */
    $scope.goto_Navigator_Transect = function (compass) {
      // console.log("goto_Navigator_Transect")
      // console.log("action : " + action)
      var current_plot = JSON.parse(window.localStorage.getItem('current_plot_data_landcover'))
      current_plot.dominant_woody_species = document.getElementById('dominant_woody').value
      current_plot.dominant_woody_species_2 = document.getElementById('dominant_woody_2').value
      current_plot.dominant_nonwoody_species = document.getElementById('dominant_nonwoody').value
      current_plot.dominant_nonwoody_species_2 = document.getElementById('dominant_nonwoody_2').value
      window.localStorage.setItem('current_action_landcover', action)
      window.localStorage.setItem('current_plot_data_landcover', JSON.stringify(current_plot))
      $ionicHistory.nextViewOptions({
        disableBack: true
      });
      // console.log(current_plot)
      if (action == 'ADD_NEW' || action === 'EDIT_NEW') {
        if (compass == 'NORTH') {
          $state.go('landpks.landcover_north_transect')
        } else if (compass == 'SOUTH') {
          $state.go('landpks.landcover_south_transect')
        } else if (compass == 'WEST') {
          $state.go('landpks.landcover_west_transect')
        } else if (compass == 'EAST') {
          $state.go('landpks.landcover_east_transect')
        }
      } else if (action == 'VIEW_OLD') {
        // window.localStorage.setItem("current_plot_data",JSON.stringify(current_plot))
        var current_view_plot_landcover = JSON.parse(window.localStorage.getItem('current_view_plot_landcover'))
        current_view_plot_landcover.dominant_woody_species = current_plot.dominant_woody_species
        current_view_plot_landcover.dominant_woody_species_2 = current_plot.dominant_woody_species_2
        current_view_plot_landcover.dominant_nonwoody_species = current_plot.dominant_nonwoody_species
        current_view_plot_landcover.dominant_nonwoody_species_2 = current_plot.dominant_nonwoody_species_2
        window.localStorage.setItem('current_view_plot_landcover', JSON.stringify(current_view_plot_landcover))
        if (compass == 'NORTH') {
          $state.go('landpks.landcover_north_transect')
        } else if (compass == 'SOUTH') {
          $state.go('landpks.landcover_south_transect')
        } else if (compass == 'WEST') {
          $state.go('landpks.landcover_west_transect')
        } else if (compass == 'EAST') {
          $state.go('landpks.landcover_east_transect')
        }
      } else if (action === 'ADD_OLD' || action === 'EDIT_OLD') {
        /* Update 20160808 : check date */
        d = new Date()
        var current_date = d.yyyymmdd()
        if (array_consider_date.indexOf(current_date) > -1){
          // console.log("Check Date : Existed LC data today. Locked")
          return
        } else {
          var current_edit_plot_landcover = JSON.parse(window.localStorage.getItem('current_edit_plot_landcover'))
          current_edit_plot_landcover.dominant_woody_species = current_plot.dominant_woody_species
          current_edit_plot_landcover.dominant_woody_species_2 = current_plot.dominant_woody_species_2
          current_edit_plot_landcover.dominant_nonwoody_species = current_plot.dominant_nonwoody_species
          current_edit_plot_landcover.dominant_nonwoody_species_2 = current_plot.dominant_nonwoody_species_2
          window.localStorage.setItem('current_edit_plot_landcover', JSON.stringify(current_edit_plot_landcover))
          if (compass == 'NORTH') {
            $state.go('landpks.landcover_north_transect')
          } else if (compass == 'SOUTH') {
            $state.go('landpks.landcover_south_transect')
          } else if (compass == 'WEST') {
            $state.go('landpks.landcover_west_transect')
          } else if (compass == 'EAST') {
            $state.go('landpks.landcover_east_transect')
          }
        }
      } else {
      }
    }

    $scope.checkAndNext = function(event,item){
      var key = event.keyCode || event.which
      if (key == 13 || key == 9) {
        if (item === 'woody') {
          document.getElementById('dominant_woody_2').focus()
        } else if (item === 'woody_2') {
          document.getElementById('dominant_nonwoody').focus()
        } else if (item === 'nonwoody'){
          document.getElementById('dominant_nonwoody_2').focus()
        } else if (item === 'nonwoody_2') {
          //document.getElementById('btnSummaryLandCover').focus()
          //return
          if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.close()
          } else {
            //document.getElementById('btnSummaryLandCover').focus()
          }
        }
      }
    }

    $ionicPlatform.registerBackButtonAction(function (event) {
      var current_page_for_back_button = window.localStorage.getItem('CURRENT_PAGE_FOR_BACK_BUTTON')
      window.localStorage.setItem('CURRENT_PAGE_FOR_BACK_BUTTON', 'EMPTY')
      if (current_page_for_back_button === 'MAIN_LANDCOVER_PAGE') {
        $scope.goBack()
        return
      } else {
        return
      }
    }, 400)
  })
  // End Main_Transect_Ctrl
  
