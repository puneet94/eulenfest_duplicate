"use strict"
import React, { Component } from 'react';
import {
    View,
    Text,
    StatusBar,
    FlatList,
    StyleSheet,
    Platform,
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
    WebView,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import AwseomeIcon from 'react-native-vector-icons/FontAwesome';
import appStyles from '../../appStyles';
import appVars from '../../appVars';
import store from 'react-native-simple-store';
import { em_s, lineHeight_s, handleExternalUrl } from '../../core/helpers';
import {getNewsList} from "../../services/dataService";

import SplashScreen from 'react-native-splash-screen'

class NewsListScreen extends Component{
  
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
      bannerAds: [],
      bannerAdsUrl: [],
      bannerAdsWidth: [],
      bannerAdsHeight: [],
      fontSize: appVars.baseUnit,      
    }

  }
  componentWillMount = async ()=>{
    let fontSize = Number.parseInt(await store.get('fontSize'),10);
    
      if(fontSize){
        this.setState({
          fontSize
        });
      }
    
  }

    
  componentDidMount  = async () => {
    this.fetchdata(); 
  }

  fetchdata = async () => {
    const { page } = this.state;
    
    
    
    this.setState({ loading: true});
    if(page===1){
      this.setState({ refreshing: true});
      
      getNewsList(page)
        .then(res => res.json())
        .then(res => {
          this.setState({
            data: res.response || [],
            error: res.error || null,
            loading : false,
            refreshing: false,
          },()=>{
            setTimeout(()=>{
              if(this.newsList && this.newsList.scrollToOffset){
                this.newsList.scrollToOffset({ x:0,y:0,animated: true });
              }
            },10);
          });
        })
        .catch(error => {
          this.setState({ error, loading: false });
        })
      } else {
        
        getNewsList(page)
          .then(res => res.json())
          .then(res => {
            if(Platform.OS === 'android') {  SplashScreen.hide(); }
            this.setState({
              data: [...this.state.data, ...res.response],
              error: res.error || null,
              loading : false,
              refreshing: false,
            })
          })
          .catch(error => {
            if(Platform.OS === 'android') {  SplashScreen.hide(); }
            this.setState({ error, loading: false });
          });
      }
  };

  handleRefresh = () =>{
    this.setState({
      page: 1,
      refreshing:true
    }, ()=>{
      this.fetchdata();
    })
  }

  handlePageEnd = ()=>{
    this.setState({
      page: this.state.page+1,
    }, ()=>{
      this.fetchdata();
    });
  }

  ratioImageHeigh = (width,height,multiplicate) =>{
    return height*(appVars.screenX*multiplicate/width);
  }

  fetchBannerAds = ()=>{
    const apiAd = appVars.apiUrl+"/ads.html?authtoken="+appVars.apiKey+"&pid="+appVars.apiAdArchives;
    return fetch(apiAd);
  }

  renderSeparator = () =>{
    
    return(
      <View style={appStyles.contentSeperator}/>
    );
  }

  handleClick = async (item)=>{
    this.setState({
      currentItem: item.id
    });

    const { navigation } = this.props;
    navigation.navigate('NewsDetail', {newsid: item.id});
  }
  renderItemNext = (item,index) => {

    var fields = item["date"].split(' | ');

    var date = fields[0];
    var time = fields[1];

    return (
      <View style={appStyles.timelineElement}>
    
      {index===0&&<View style={{height:10}}/>}

      <TouchableOpacity activeOpacity = { .5 } onPress={ ()=>this.handleClick(item)}>
      <View style={{flexDirection:"row"}}>

        <View style={{flex:2,flexDirection:"column",alignItems:"center",paddingRight: 10}}>
        <Text style={appStyles.newsDate}>{date}</Text>
        <View style={{flex:1,backgroundColor: appVars.colorMain,width:3.5}} />
        <Text style={appStyles.newsTime}>{time}</Text>
        <View style={{flex:4,backgroundColor: appVars.colorMain,width:3.5}} />


        
        <View style={{height: 66,width: 66, alignItems:"center", borderRadius:33,borderColor:appVars.colorMain,borderWidth:3}} >
        {item.picture&&<Image style={{height: 60,width: 60, borderRadius:30,borderColor:"white",borderWidth:3}} source={{uri: appVars.apiUrl +"/"+item.picture.img.src} }/>}
        </View>

        <View style={{flex:1,backgroundColor: appVars.colorMain,width:3.5}} />



        <View style={{flex:9,backgroundColor: appVars.colorMain,width:3.5}} />
          
        </View>
        
        <View style={{flex:9,marginHorizontal:8,marginBottom:10,position:"relative"}}>
          <View style={{
            transform: [{rotate: '-90deg'}],
            width: 0,
            position:"absolute",
            left: -21,
            top:13,
            height: 0,
            backgroundColor: 'transparent',
            borderStyle: 'solid',
            borderLeftWidth: 14,
            borderRightWidth: 14,
            borderBottomWidth: 14,
            borderLeftColor: 'transparent',
            borderRightColor: 'transparent',
            borderBottomColor: '#fdc803',
             }}>

          </View>
          
          <View style={{borderWidth:1,borderColor:appVars.colorLightGray,  borderRadius:5,paddingTop:0}}>
          

            <Text style={appStyles.newsListHeadline} numberOfLines={1}>
              {item.headline.toUpperCase()}
            </Text>
            <Text style={appStyles.newsListTeaser} numberOfLines={4}>{item.text.replace(/<{1}[^<>]{1,}>{1}/g,"")}</Text>
          </View>
        </View>
      </View>
      </TouchableOpacity>
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
        onEndReached={this.handlePageEnd}
        onEndReachedThreshold={1}
        ref={(ref) => { this.newsList = ref; }}
        keyExtractor={(item,index)=> {
          return item.id;
          }}
        renderItem={({item,index}) => this.renderItemNext(item,index)}
       />
       </View>
       </View>
    );
	}
}

export default NewsListScreen;