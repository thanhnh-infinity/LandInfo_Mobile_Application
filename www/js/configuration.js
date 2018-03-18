/* Control Test or Production */
var APP_PRODUCT = 'TEST_VERSION'
//var APP_PRODUCT = 'PRODUCTION_VERSION'

/* For Testing */
var LANDPKS_API_ENDPOINT = "http://test-landpks.appspot.com/query";
var LANDPKS_STATICS_FILE_UPLOAD_IMG = "http://files-storage.landpotential.org/APEX/External_Tools/LandPKS_Upload_Image/LandPKS_Upload_Image.php"
var LANDPKS_LANDINFO_IMAGES_STORE_DIR = "http://files-storage.landpotential.org/APEX/External_Tools/LandPKS_Upload_Image/images/"

//var LANDPKS_API_ENDPOINT = "http://127.0.0.1:8080/query";
//var LANDPKS_STATICS_FILE_UPLOAD_IMG = "http://128.123.177.13/APEX/External_PHP_Project/LandPKS_Upload_Image/LandPKS_Upload_Image.php"
//var LANDPKS_LANDINFO_IMAGES_STORE_DIR = "http://128.123.177.13/APEX/External_PHP_Project/LandPKS_Upload_Image/images/"


/* For production */
//var LANDPKS_API_ENDPOINT = "http://api.landpotential.org/query";
//var LANDPKS_STATICS_FILE_UPLOAD_IMG = "http://files-storage.landpotential.org/APEX/External_Tools/LandPKS_Upload_Image/LandPKS_Upload_Image.php"
//var LANDPKS_LANDINFO_IMAGES_STORE_DIR = "http://files-storage.landpotential.org/APEX/External_Tools/LandPKS_Upload_Image/images/"

//var GOOGLE_MAP_API_GET_IMAGE_PER_LOCATION = "https://maps.googleapis.com/maps/api/staticmap?center=32.2738,-106.7472&zoom=15&size=400x400&maptype=satellite&markers=color:blue%7Clabel:S%7C32.2738,-106.7472&key=AIzaSyA_2Ftrj_3vdy_6N6TU9tzZARGhsIiUb-4"

var GOOGLE_MAP_API_GET_IMAGE_PER_LOCATION = "https://maps.googleapis.com/maps/api/staticmap"

/******Global App***********/
var LANDPKS_METADATA_URL = "js/metadata/lpks_labels_metadata.json"
var LANDPKS_MOBILE_APP_VERSION = '3.0.1'
var LANDPKS_MOBIEL_APP_PUBLISH_DATE = '15 Mar 2018'
var LANDPKS_API_VERSION = '0.2.2'
var LANDPKS_COL_API_VERSION_HAS_CURSOR = ['0.2','0.2.1','0.2.2','0.3']
var LANDINFO_COUNT_PLOTS_LOAD = 200
var LANDCOVER_LANDINFO_QUANTITY_LOAD = 200
var LANDINFO_PLOTS_LOAD_CURSOR = -9900000
var GOOGLE_CHECK_NETWORK_ENPOINT = "https://www.googleapis.com/auth/urlshortener";
var GOOGLE_CLIENT_ID = "254673914223-tv4pvoig9ouql2puvsuigmiuabaj87u8.apps.googleusercontent.com"
var GOOGLE_SINGIN_SCOPES = "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile"
var RUN_GOOGLE_CHECK_TOKEN_PROCESS = false
var RUN_BACKGROUND_PROCESS_TO_SUBMIT_PLOT = false
var GOOGLE_CLIENT_SECRET = "VIlyqfrpXMNJCx5gJREdftaz"
var LOCATION_SERVICE_OPTION = { maximumAge: 3000, timeout: 120000, enableHighAccuracy: true};

/* For Google Map Image per location */
var GOOLGE_STATIC_MAP_API_KEY = "AIzaSyA_2Ftrj_3vdy_6N6TU9tzZARGhsIiUb-4"
var PARAMS_GOOGLE_MAP_IMAGE_SIZE = "300x150"
var PARAMS_GOOGLE_MAP_IMAGE_ZOOM = "15"
var PARAMS_GOOGLE_MAP_MAP_TYPE = "satellite"
var PARAMS_MAKER_LABEL_GOOGLE_MAP_IMAGE = "color:blue%7Clabel:Test Maker%7C"

/* Photo Options */


/***Configuration for Images Quality****/
var LANDPKS_LANDINFO_IMAGE_WIDTH_SIZE = 640
var LANDPKS_LANDINFO_IMAGE_HEIGHT_SIZE = 480
var LANDPKS_LANDINFO_IMAGE_QUALITY_100 = 100
var LANDPKS_LANDINFO_IMAGE_QUALITY_1 = 1
var LANDPKS_LANDINFO_IMAGE_FILE_EXTENTION = 'image/jpeg'

var UNITED_STATES_METRIC_STANDARD = "US_METRICS"
var ENGLISH_METRIC_STANDARD = "EN_METRICS"
var METRIC_CENTIMES = "CM"
var CENTIMES_LOWERCASE = "cm"
var METRIC_METERS = "M"
var METRIC_INCHES = "IN"
var METRIC_FEET = "FT"
var DEGREE_C = "D_C"
var DEGREE_F = "D_F"


/* Static label data , take from Common JSON File */
/* Read data from common file : lpks_labels_metadata.js */
/* Fill data to data file */
var META_DATA = {}

var LABEL_0_1CM_US = '0-1 cm'
var LABEL_1_10CM_US = '1-10 cm'
var LABEL_10_20CM_US = '10-20 cm'
var LABEL_20_50CM_US = '20-50 cm'
var LABEL_50_70CM_US = '50-70 cm'
var LABEL_70_100CM_US = '70-100 cm'
var LABEL_100_120CM_US = '100-120 cm'

var LABEL_0_1CM_EN = '0-0.5 in'
var LABEL_1_10CM_EN = '0.5-4 in'
var LABEL_10_20CM_EN = '4-8 in'
var LABEL_20_50CM_EN = '8-20 in'
var LABEL_50_70CM_EN = '20-28 in'
var LABEL_70_100CM_EN = '28-40 in'
var LABEL_100_120CM_EN = '40-47 in'

var LABEL_SEGMENT_5M_US = '5m'
var LABEL_SEGMENT_10M_US = '10m'
var LABEL_SEGMENT_15M_US = '15m'
var LABEL_SEGMENT_20M_US = '20m'
var LABEL_SEGMENT_25M_US = '25m'

var LABEL_SEGMENT_5M_EN = '16.4ft'
var LABEL_SEGMENT_10M_EN = '32.8ft'
var LABEL_SEGMENT_15M_EN = '49.2ft'
var LABEL_SEGMENT_20M_EN = '65.6ft'
var LABEL_SEGMENT_25M_EN = '82ft'


var LINFO_LCOVER_P_FLOODED = ''
var LINFO_SCON_P_VERTICAL = ''
var LINFO_SCON_P_NO_VERTICAL = ''
var LINFO_SCON_P_LABEL = ''
var LINFO_LUSE_P_LABEL = ''
var LINFO_LCOVER_P_LABEL = ''
var PLOT_DELETE_ON_CLOUDS_MESSAGE = ''
var PLOT_DELETE_ON_DEVICE_MESSAGE = ''
var REVIEW_PLOT_MESS_TOP = ''
var LINFO_CONFIRM_SUBMIT_MESSGE_TESTPLOT = ''
var LINFO_CONFIRM_SUBMIT_MESSGE_NON_TESTPLOT =  ''
var LCOVER_NOTIFICAION_CANNOTSUBMIT_NOTENOUGH_TRANSECTS_DATA = ''
var TAKE_PHOTO_ERROR_MESSAGE_ON_WEB_APP = ''
var UNABLE_GET_QUICK_CLIMATE = ''
var LINFO_SCON_P_VERTICAL_EN = ''
var LINFO_SCON_P_NO_VERTICAL_EN = ''

var LIST_OF_LANGUGAGES = [{code:'en',name:'English'},{code:'de',name:'German'}]

$.getJSON(LANDPKS_METADATA_URL, function(data) {
  if (typeof data != 'undefined'){
    META_DATA = data
    LINFO_LCOVER_P_FLOODED = META_DATA.landinfo_common.flooding
    LINFO_SCON_P_VERTICAL = META_DATA.landinfo_common.surface_cracking
    LINFO_SCON_P_VERTICAL_PART_1 = META_DATA.landinfo_common.surface_cracking_part_1
    LINFO_SCON_P_VERTICAL_PART_2 = META_DATA.landinfo_common.surface_cracking_part_2
    LINFO_SCON_P_NO_VERTICAL = META_DATA.landinfo_app.no_surface_cracking
    LINFO_SCON_P_VERTICAL_EN = META_DATA.landinfo_common.surface_cracking_en
    LINFO_SCON_P_VERTICAL_EN_PART_1 = META_DATA.landinfo_common.surface_cracking_en_part_1
    LINFO_SCON_P_VERTICAL_EN_PART_2 = META_DATA.landinfo_common.surface_cracking_en_part_2
    LINFO_SCON_P_NO_VERTICAL_EN = META_DATA.landinfo_app.no_surface_cracking_en
    LINFO_SCON_P_LABEL = META_DATA.landinfo_common.soil_description_heading
    LINFO_LUSE_P_LABEL = META_DATA.landinfo_common.grazing
    LINFO_LCOVER_P_LABEL = META_DATA.landinfo_common.land_cover_heading
    PLOT_DELETE_ON_CLOUDS_MESSAGE = META_DATA.landinfo_app.plot_delele_on_clouds_message
    PLOT_DELETE_ON_DEVICE_MESSAGE = META_DATA.landinfo_app.plot_delele_on_device_message
    REVIEW_PLOT_MESS_TOP = META_DATA.landinfo_app.review_plot_mess_top
    LINFO_CONFIRM_SUBMIT_MESSGE_TESTPLOT = META_DATA.landinfo_app.linfo_confirm_submit_message_testplot
    LINFO_CONFIRM_SUBMIT_MESSGE_NON_TESTPLOT = META_DATA.landinfo_app.linfo_confirm_submit_message_non_testplot
    LCOVER_NOTIFICAION_CANNOTSUBMIT_NOTENOUGH_TRANSECTS_DATA = META_DATA.landinfo_app.lcover_notification_cannotsubmit_notenough_transects_data
    LABEL_0_1CM_US = META_DATA.landinfo_app.layer_1_cm
    LABEL_1_10CM_US = META_DATA.landinfo_app.layer_2_cm
    LABEL_10_20CM_US = META_DATA.landinfo_app.layer_3_cm
    LABEL_20_50CM_US = META_DATA.landinfo_app.layer_4_cm
    LABEL_50_70CM_US = META_DATA.landinfo_app.layer_5_cm
    LABEL_70_100CM_US = META_DATA.landinfo_app.layer_6_cm
    LABEL_100_120CM_US = META_DATA.landinfo_app.layer_7_cm
    LABEL_0_1CM_EN = META_DATA.landinfo_app.layer_1_in
    LABEL_1_10CM_EN = META_DATA.landinfo_app.layer_2_in
    LABEL_10_20CM_EN = META_DATA.landinfo_app.layer_3_in
    LABEL_20_50CM_EN = META_DATA.landinfo_app.layer_4_in
    LABEL_50_70CM_EN = META_DATA.landinfo_app.layer_5_in
    LABEL_70_100CM_EN = META_DATA.landinfo_app.layer_6_in
    LABEL_100_120CM_EN = META_DATA.landinfo_app.layer_7_in
    LABEL_SEGMENT_5M_US = META_DATA.landcover_common.segment_range_1
    LABEL_SEGMENT_10M_US = META_DATA.landcover_common.segment_range_2
    LABEL_SEGMENT_15M_US = META_DATA.landcover_common.segment_range_3
    LABEL_SEGMENT_20M_US = META_DATA.landcover_common.segment_range_4
    LABEL_SEGMENT_25M_US = META_DATA.landcover_common.segment_range_5
    LABEL_SEGMENT_5M_EN = META_DATA.landcover_app.segment_range_1_en
    LABEL_SEGMENT_10M_EN = META_DATA.landcover_app.segment_range_2_en
    LABEL_SEGMENT_15M_EN = META_DATA.landcover_app.segment_range_3_en
    LABEL_SEGMENT_20M_EN = META_DATA.landcover_app.segment_range_4_en
    LABEL_SEGMENT_25M_EN = META_DATA.landcover_app.segment_range_5_en
    TAKE_PHOTO_ERROR_MESSAGE_ON_WEB_APP = META_DATA.landinfo_app.take_photo_error_message_on_web_app
    UNABLE_GET_QUICK_CLIMATE = META_DATA.landinfo_app.unable_get_quick_climate
  } else {
    LINFO_LCOVER_P_FLOODED = 'Flooded > 2 weeks/year'
    LINFO_SCON_P_VERTICAL = 'Vertical cracks when dry at least 5mm wide and 25cm deep'
    LINFO_SCON_P_VERTICAL_PART_1 = 'Vertical cracks when dry at least'
    LINFO_SCON_P_VERTICAL_PART_2 = '5mm wide and 25cm deep'
    LINFO_SCON_P_NO_VERTICAL  = 'No vertical cracks when dry at least 5mm wide and 25cm deep'
    LINFO_SCON_P_VERTICAL_EN = 'Vertical cracks when dry at least 1/4 in wide and 10 in deep'
    LINFO_SCON_P_VERTICAL_EN_PART_1 = 'Vertical cracks when dry at least'
    LINFO_SCON_P_VERTICAL_EN_PART_2 = '1/4 in wide and 10 in deep'
    LINFO_SCON_P_NO_VERTICAL_EN = 'No vertical cracks when dry at least 1/4 in wide and 10 in deep'
    LINFO_SCON_P_LABEL = 'Soil Observations'
    LINFO_LUSE_P_LABEL = 'Grazing'
    LINFO_LCOVER_P_LABEL = 'Land Use'
    PLOT_DELETE_ON_CLOUDS_MESSAGE = 'Do you wish to remove all LandInfo data and LandCover data for this plot from this device ?'
    PLOT_DELETE_ON_DEVICE_MESSAGE = 'All LandInfo and LandCover data will be deleted from the phone. This cannot be undone. Do you wish to continue?'
    REVIEW_PLOT_MESS_TOP = 'Plot data can be viewed and edited at '
    LINFO_CONFIRM_SUBMIT_MESSGE_TESTPLOT = 'You have indicated that this is a practice plot. Your data will not be available for download and cannot be edited on the Data Portal. Plot information will be deleted after 30 days. <br/><br/> Do you wish to continue?'
    LINFO_CONFIRM_SUBMIT_MESSGE_NON_TESTPLOT = 'Confirm submit. Submitted data may become publicly available. After submitting data, data can only be edited by the user on the Data Portal (portal.landpotential.org). <br/><br/> Do you wish to continue?'
    LCOVER_NOTIFICAION_CANNOTSUBMIT_NOTENOUGH_TRANSECTS_DATA = 'No transect data has been entered. Plot cannot be submitted. Please enter data to submit plot.'
    LABEL_0_1CM_US = '0-1 cm'
    LABEL_1_10CM_US = '1-10 cm'
    LABEL_10_20CM_US = '10-20 cm'
    LABEL_20_50CM_US = '20-50 cm'
    LABEL_50_70CM_US = '50-70 cm'
    LABEL_70_100CM_US = '70-100 cm'
    LABEL_100_120CM_US = '100-120 cm'
    LABEL_0_1CM_EN = '0-0.5 in'
    LABEL_1_10CM_EN = '0.5-4 in'
    LABEL_10_20CM_EN = '4-8 in'
    LABEL_20_50CM_EN = '8-20 in'
    LABEL_50_70CM_EN = '20-28 in'
    LABEL_70_100CM_EN = '28-40 in'
    LABEL_100_120CM_EN = '40-47 in'
    LABEL_SEGMENT_5M_US = '5m'
    LABEL_SEGMENT_10M_US = '10m'
    LABEL_SEGMENT_15M_US = '15m'
    LABEL_SEGMENT_20M_US = '20m'
    LABEL_SEGMENT_25M_US = '25m'
    LABEL_SEGMENT_5M_EN = '16.4ft'
    LABEL_SEGMENT_10M_EN = '32.8ft'
    LABEL_SEGMENT_15M_EN = '49.2ft'
    LABEL_SEGMENT_20M_EN = '65.6ft'
    LABEL_SEGMENT_25M_EN = '82ft'
    TAKE_PHOTO_ERROR_MESSAGE_ON_WEB_APP = 'The Camera function is unavailable on the web version.'
    UNABLE_GET_QUICK_CLIMATE = 'Climate data is currently unavailable.'
  }
});