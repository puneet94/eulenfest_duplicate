import React from 'react'
import { WebView, Modal, StyleSheet, ImageBackground,Text, View, ScrollView, Image, TouchableHighlight,TouchableWithoutFeedback,Platform,Linking} from 'react-native'
import OneSignal from 'react-native-onesignal';

import appVars from '../../appVars';
import appStyles from '../../appStyles';

import { NavigationActions } from 'react-navigation'
import { YouTubeStandaloneAndroid } from 'react-native-youtube';
import { YouTubeStandaloneIOS } from 'react-native-youtube';


import AwseomeIcon from 'react-native-vector-icons/FontAwesome';

import store from 'react-native-simple-store';

class DrawerContainer extends React.Component {


  _handleURLRout = (url)=>{
    const route = url.replace(/.*?:\/\//g, '');
    const id = route.match(/\/([^\/]+)\/?$/)[1];
    const routeName = route.split('/')[0];
    const routeName2 = route.split('/')[1];
    console.log(routeName);
    console.log(routeName2);
    console.log(id);
    if(routeName2=="newsfeed"){
      this.naviagatePage(id);
    }
    
  }
  componentWillMount = async ()=> {
  
    OneSignal.init(appVars.OneSignalKey);

    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
    
    let newsid = await store.get('deepLinkNewsId'); 
   
    store.delete('deepLinkNewsId');
    if(newsid){
      this.naviagatePage(newsid);
    }
    if (Platform.OS === 'android') {
      Linking.getInitialURL().then(url => {
        console.log(url);
        if(url){
          this._handleURLRout(url);
        }
        
      });
    } else {
        Linking.addEventListener('url', (event)=>{
          console.log("hit hit hit22222222222222222");
          console.log(event.url);
          if(event.url){
            this._handleURLRout(event.url);
          }
        });
      }
}

componentWillUnmount=()=> {
   OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);


    
      Linking.removeEventListener('url', (event)=>{
        console.log("wheevevte");
        console.log(event);
      });
    
}


onReceived(notification) {
  
}
naviagatePage = (newsid)=>{
  const { navigation } = this.props;
  navigation.navigate('NewsDetail', {newsid});
}

onOpened=(openResult)=> {
  this.naviagatePage(openResult.notification.payload.additionalData.newsid);  
}

onRegistered(notifData) {
  
}

_youtube() {
  if(Platform.OS === 'android') {
      YouTubeStandaloneAndroid.playVideo({
      apiKey: appVars.YoutubeAPIKey,     // Your YouTube Developer API Key
      videoId: 'GBwpjr6-il4',     // YouTube video ID
      autoplay: true,             // Autoplay the video
      })
    } else {
        YouTubeStandaloneIOS.playVideo('GBwpjr6-il4')
        .then(() => console.log('Standalone Player Exited'))
        .catch(errorMessage => console.error(errorMessage))
   }



}

onIds(device) {

}

  isActiveClass = (key)=>{

    if(this.props.activeItemKey.toLowerCase()===key.toLowerCase()){
      return {
        color: appVars.colorHighlight
      };
    }

  }
  render = ()=> {

    const { navigation } = this.props
    return (
    <ScrollView style={appStyles.drawerContainer}>
     <Image source={require('../../../assets/images/eulenfestbg.png')}
                style={appStyles.backgroundImage}
                
                />
      <TouchableWithoutFeedback onPress={() => navigation.navigate('NewsList')} >
        <View style={appStyles.drawerItem}>
          <AwseomeIcon name="angle-right" style={appStyles.drawerIcon}/>
          <Text style={[appStyles.drawerLabel,this.isActiveClass('News')]}>{appVars.labelNewsList.toUpperCase()}</Text>
        </View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={() => navigation.navigate('ProgramsList')} >
       <View style={appStyles.drawerItem}>
          <AwseomeIcon name="angle-right" style={appStyles.drawerIcon}/>
          <Text style={[appStyles.drawerLabel,this.isActiveClass('Programs')]}>{appVars.labelProgramList.toUpperCase()}</Text>
        </View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={() => navigation.navigate('InfosList')} >
        <View style={appStyles.drawerItem}>
          <AwseomeIcon name="angle-right" style={appStyles.drawerIcon}/>
          <Text style={[appStyles.drawerLabel,this.isActiveClass('Infos')]}>{appVars.labelInfos.toUpperCase()}</Text>
        </View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={() => this._youtube()} style={this.isActiveClass('settings')}>
        <View style={[appStyles.drawerItem,this.isActiveClass('webcam')]}>
          <AwseomeIcon name="angle-right" style={appStyles.drawerIcon}/>
          <Text style={appStyles.drawerLabel}>{appVars.labelWebcam.toUpperCase()}</Text>
        </View>
      </TouchableWithoutFeedback>
      


    </ScrollView>
    )
  }
}
export default DrawerContainer;

//adb shell input keyevent 82