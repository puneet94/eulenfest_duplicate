"use strict"
import React, { Component } from 'react';
import {
    View,
    Text,
    StatusBar,
    FlatList,
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableOpacity,
    PermissionsAndroid,
    Dimensions,
    RefreshControl,
    Alert,
    ActivityIndicator,
    ToastAndroid,
    Linking,
    Button,
    Image,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import appStyles from '../../appStyles';
import appVars from '../../appVars';
import HTMLView from 'react-native-htmlview';

import { em, lineHeight, _ratioImageHeigh, _handleExternalUrl } from '../../core/helpers';

import { createMaterialTopTabNavigator } from 'react-navigation';

const objInfos  = [
  { archive: '/share/app/eulenfest/eulenfest_app_stargast.php', subMenuLabel: 'Stargast'},
  { archive: '/share/app/eulenfest/eulenfest_app_tombola.php', subMenuLabel: 'Tombola'},
  { archive: '/share/app/eulenfest/eulenfest_app_vo.php', subMenuLabel: 'VO Sonntag'},
];

const navigatorObject = {};

const infosListComponent = (screenId)=>{
  return (props) => <InfosListScreen {...props} screenId={screenId} />
}

for(let i =0;i<objInfos.length;i++){

  navigatorObject[objInfos[i].subMenuLabel] = {
    screen: infosListComponent(objInfos[i].archive)
  
  }
}

const InfosFeedNavigator = createMaterialTopTabNavigator(navigatorObject, {
  tabBarPosition: 'top',
  animationEnabled: true,
  lazyLoad: true,
  tabBarOptions: {
    scrollEnabled: true,
    showIcon: false,
    upperCaseLabel:true,
    style: {
      backgroundColor: appVars.colorHighlight,
    },
    labelStyle : {
      color: appVars.colorBlack,
      fontFamily: appVars.fontMain,
      fontSize: em(1.25)
    },
    indicatorStyle:{
      backgroundColor: appVars.colorActive,
    }
  },
});

class InfosListScreen extends Component{
  
  constructor(props){
    super(props);
    this.state = {
      loading: false,
      data: [],
      page: 1,
      error: null,
      refreshing: false,
      downloading: false,
      currentItem: null,
      selectedArchive: this.props.screenId,
    }

  }
  componentWillMount = async ()=>{

      this.fetchdata(); 
   
  }


  openImageViewer = async (item)=>{
    const { navigation } = this.props;
    navigation.navigate('ImageViewer', {item: item});
  }

  fetchdata = async () => {
    const { page } = this.state;
    var archive=this.state.selectedArchive;
  
    const api = appVars.apiUrl+archive;
    
    this.setState({ loading: true});
        
      fetch(api)
        .then(res => res.json())
        .then(res => {
          
          this.setState({
            data: res.response || [],
            error: res.error || null,
            loading : false,
            refreshing: false,
          },()=>{
            
          });
        })
        .catch(error => {
          this.setState({ error, loading: false });
        })
      
  };

  handleRefresh = () =>{
    this.setState({
      page: 1,
      refreshing:true
    }, ()=>{
      this.fetchdata();
    })
  }




  renderItem = (item) =>{

    return(
  
      <View>
      <TouchableOpacity style={appStyles.imageContainer} activeOpacity={0.5} onPress={this.openImageViewer.bind(this,item)}>
        <View>
          <Image 
          style={{backgroundColor: appVars.colorSeperatorColor, width: ((appVars.screenX)), height: _ratioImageHeigh(item.width,item.height,1)}}
          source={{uri: appVars.apiUrl +"/"+item.singleSRC} }
          />
        </View>
      </TouchableOpacity>
        
      <View style={appStyles.contentElement}>
  
      <Text style={appStyles.headline}>{item.headline}</Text>
  
        <Text style={[appStyles.subheadline,{fontSize:em(1), marginBottom: em(0.500)}]}>{item.subheadline}</Text>
   
  
          <HTMLView addLineBreaks={false} value={item.text} 
          stylesheet={appStyles}
          bullet={'\n· '}
          
          onLinkPress={(url) => _handleExternalUrl(url)} />
          
          <View style={{flex: 1, flexDirection: 'row', justifyContent:'space-between'}}>
            {(item.imagecopyright)?<Text style={appStyles.newsEditor}>Foto: {item.imagecopyright}</Text>:<View></View>}
            <Text style={appStyles.newsEditor}></Text>
          </View>
          </View>
      </View>
  
    );
  }

render=()=>{

    return (
      
      <View style={appStyles.container}>
      <View style={appStyles.contenContainer}>
      <FlatList
        data={this.state.data}
        numColumns={1}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh}
            colors={[appVars.colorMain]}
          />
        }
        keyExtractor={(item,index)=> {
          return item.headline;
          }}
        renderItem={({item,index}) => this.renderItem(item,index)}
        />
       </View>
      </View>
    );
	}
}

export default InfosFeedNavigator;