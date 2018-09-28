import {StyleSheet, Platform, Dimensions} from 'react-native';
import appVars from './appVars';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import { em,lineHeight } from './core/helpers'

const x = Dimensions.get('window').width;
const y = Dimensions.get('window').height;

if(Platform.OS === 'android') {
  
  var formInput = {};
  var ePaperWrapperPlusHeight = 0;
  var statusBariOSHeight= 0;

  platformContainerStyles = {
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowRadius: StyleSheet.hairlineWidth,
    shadowOffset: {
      height: StyleSheet.hairlineWidth
    },
    elevation: 4
  };

} else {
  // ios
  var statusBariOSHeight=getStatusBarHeight();

  var formInput = { 
    borderBottomColor: appVars.colorMain, 
    borderBottomWidth: 1,
    padding: 5,
    fontSize: em(0.875),
  } 

  platformContainerStyles = {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#880b0b',
  };
}


module.exports = StyleSheet.create({

  formInput: formInput,

  // customheader

  statusBariOS: {
    height: statusBariOSHeight,
    backgroundColor: "#880b0b",
  },

  customHeader: {
    flex:1,
    backgroundColor: appVars.colorMain,
    justifyContent:"flex-end",
    ...platformContainerStyles
  },

  // adbanner
  adContainer: {
    flex:1,
    backgroundColor: appVars.colorWhite,
    borderTopColor: appVars.colorMain,
    borderTopWidth: 3.5,
  },
  listAd: {
    paddingTop: 3,
    paddingBottom: 3,
    justifyContent: 'center',
    alignItems: 'center', 
    flex: 1,
  },



  //newslist
  newsListInner: {
    paddingLeft: 10,
    width: (x * .75)-30,
  },
  newsListHeadline: {
    fontSize: em(1.25),
    fontFamily: appVars.fontMain,
    color: appVars.colorWhite,
    marginTop: 5,
    paddingRight: 25,
    marginRight: -20,
    paddingLeft: 6,
    marginLeft: -1,
    textAlignVertical: 'center',
    lineHeight: 28,
    backgroundColor: '#fdc803',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 2
  },
  newsListCity: {
    fontSize: em(0.875),
    fontFamily: appVars.fontMain,
    color: appVars.colorDarkGray,
  },
  newsListTeaser: {
    fontSize: em(0.875),
    lineHeight: lineHeight(0.875,140),
    fontFamily: appVars.fontText,
    color: appVars.colorDarkGray,
    margin:5,
  },
  newsDate: {
    fontSize: em(0.650),
    fontFamily: appVars.fontMain,
    color: appVars.colorWhite,
    padding: 2,
    width: 66,
    borderRadius: 5,
    marginTop: -1,
    marginLeft: -5,
    alignSelf: 'flex-start',
    backgroundColor: appVars.colorMain,
    textAlign: 'center',
    overflow: 'hidden',
  },
  
  newsTime: {
    fontSize: em(0.650),
    fontFamily: appVars.fontMain,
    color: appVars.colorWhite,
    padding: 2,
    width: 42,
    borderRadius: 5,
    marginTop: 0,
    marginLeft: 9,
    alignSelf: 'flex-start',
    backgroundColor: appVars.colorDarkGray,
    textAlign: 'center',
    overflow: 'hidden',
  },


//map

mapYou: {
  borderRadius: 5,
  borderColor: appVars.colorWhite,
  borderWidth: 3,
  marginTop: -3,
  backgroundColor: appVars.colorDarkGray,
},

mapDistance: {
  borderRadius: 5,
  borderColor: appVars.colorWhite,
  borderWidth: 3,
  backgroundColor: appVars.colorMain,
},

mapDistanceText: {
  fontSize: em(0.650),
  fontFamily: appVars.fontMain,
  color: appVars.colorWhite,
  margin: 2,
},


mapYouText: {
  fontSize: em(0.650),
  fontFamily: appVars.fontMain,
  color: appVars.colorWhite,
  margin: 2,
},

  //newsdetail
  topheadlineContainer: {
    backgroundColor: appVars.colorHighlight,
    alignSelf: 'center',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    padding: 5,
    marginTop: -23,
  },

  topheadline: {
    fontSize: em(0.75),
    lineHeight: lineHeight(0.750),
    fontFamily: appVars.fontMain,
    color: appVars.colorMain,
  },

  headline: {
    fontSize: em(2.000),
    fontFamily: appVars.fontMain,
    color: appVars.colorMain,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
    paddingLeft: 10,
    paddingRight: 10,
  },

  subheadline: {
    fontSize: em(1),
    fontFamily: appVars.fontSub,
    color: appVars.colorBlack,
    textAlign: 'center',
    marginBottom: em(0.500),
    paddingLeft: 10,
    paddingRight: 10,
  },
  imageContainer: {
    borderBottomWidth: 3,
    borderBottomColor: appVars.colorHighlight,
  },
  imagecopyright: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    fontSize: em(0.750),
    color: appVars.colorWhite,
    textShadowColor: appVars.colorBlack,
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
    fontFamily: appVars.fontSub,
    backgroundColor: 'transparent',
  },
  imagecaption: {
    marginTop: em(0.150),
    fontSize: em(0.875),
    fontFamily: appVars.fontSub,
    color: appVars.colorMain,
  },
  newsEditor: {
    fontSize: em(0.750),
    justifyContent: 'flex-end',
    fontFamily: appVars.fontMain,
    color: appVars.colorDarkGray,
  },

  galleryContainer: {
    flex: 1,
  },
  galleryItem: {
    flex: 1,
    height: (x * .25)-5,
    width: (x * .25)-5,
    margin: 1
  },

//headerbutton
headerButttonOuter: {
  borderColor: appVars.colorMain,
  borderWidth: 3,
  height: 43,
  width: 43,
  borderRadius:23,
  justifyContent: 'center',
  alignItems: 'center',
},
headerButtton: {
  backgroundColor: appVars.colorMain,
  borderColor: appVars.colorWhite,
  borderWidth: 3,
  height: 37,
  width: 37,
  borderRadius:20,
  justifyContent: 'center',
  alignItems: 'center',
},

//drawer

drawerContainer: {
  
  backgroundColor: "black",
  height: y,
},

drawerLogo: {
  width: null,
  height: 37,
  resizeMode: 'contain',
  marginTop: 10,
  marginBottom: 10,
  marginLeft: 15,
  marginRight: 15,
  },
  backgroundImage: {
    flex:1,
    height: 200,
    resizeMode: 'cover',
    width: null
    
   
},
drawerSeperator: {
  backgroundColor: appVars.colorDrawerSeperatorBackgroundColor,
  height: 6,
},

drawerItem: {
  alignItems: 'center',
  flexDirection: 'row',
  padding: 15,
},

drawerIcon: {
    color: appVars.colorMain,
    fontSize: 22,
    width: 25,
    height: 25,
    marginRight: 0,
    textAlign: 'center',
},

drawerLabel: {
  fontSize: 18,
  fontFamily: appVars.fontMain,
  color: appVars.colorWhite,
  paddingLeft: 8,
},

//header
  headerWrapper: {
    backgroundColor: appVars.colorMain,
  },
  headerTitle: {
    fontFamily: appVars.fontMain,
    color: appVars.colorWhite,
    fontSize: 20,
  },
  iconWrapper: {
    flex:1,
    width: 66,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerIcon: {
      color: appVars.colorWhite,
      fontSize: 20,
      textAlign: 'center',
  },
  
  //imageModel
  imageModelHeader: {
    height: 55,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  imageModelHeaderClose: {
    margin: 15,
    color: appVars.colorWhite,
  },

  //timeline
  timelineElement: {
    paddingLeft: 10,
  },

  // generall stuff
  container: {
    flex: 1,
    backgroundColor: appVars.colorWhite,
  },
  contenContainer: {
    flex: 1,
    backgroundColor: appVars.colorWhite,
  },
  contentSeperator: {
    backgroundColor: appVars.colorSeperatorColor,
    height: 5,
  },
  contentElement: {
    margin: 10,
  }, 
  submit: {
    fontSize: em(1),
    fontFamily: appVars.fontMain,
    color: appVars.colorWhite,
  },
  imageBorder: {
    padding: 3,
    backgroundColor: appVars.colorWhite,
    borderColor: appVars.colorHighlight,
    borderWidth: 1,
  },
  ActivityIndicatorFullscreenContainer: {
    flex: 1,
    backgroundColor: appVars.colorWhite,
    justifyContent: 'center',
    alignItems: 'center',
  },

  ePaperActivityIndicator: {
    flex: 1,
    backgroundColor:'rgba(255, 255, 255, 0.8)',
  },
  iOSToast: {
    backgroundColor:appVars.colorDrawerSeperatorBackgroundColor,
    borderRadius: 5,
    padding: 10,
  },
  iOSToastText: {
    color: appVars.colorBlack,
  },
  p: {
    fontSize: em(0.875),
    lineHeight: lineHeight(0.875,150),
    fontFamily: appVars.fontText,
    color: appVars.colorBlack,
    marginBottom: em(0.875),
    paddingLeft: 20,
    paddingRight: 20,
  },
  strong: {
    fontWeight: '700'
  },
  a: {
    color: appVars.colorMain,
    fontWeight: '700',
  },
  city: {
    fontSize: em(0.875),
    fontFamily: appVars.fontMain,
    color: '#333',
  },
  h3: {
    fontSize: em(1.250),
    lineHeight: lineHeight(1.250,120),
    fontFamily: appVars.fontHeadline,
    color: appVars.colorBlack,
    marginBottom: em(0.500),
  },
  ul: {
    fontSize: em(0.875),
    lineHeight: lineHeight(0.875,150),
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: -20,
  },
  li: {
    fontFamily: appVars.fontMain,
    color: appVars.colorBlack,
  }
});