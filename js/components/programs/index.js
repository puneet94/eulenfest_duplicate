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
import Icon from 'react-native-vector-icons/Feather';
import { em } from '../../core/helpers';
import { createMaterialTopTabNavigator } from 'react-navigation';
import {getEventList} from "../../services/dataService";
const navigatorObject = {};
const programListComponent = (screenId)=>{
  return (props) => <ProgramListScreen {...props} screenId={screenId} />
}
for(let i =0;i<appVars.EventCategories.length;i++){
  
  navigatorObject[appVars.EventCategories[i].subMenuLabel] = {
    screen: programListComponent(appVars.EventCategories[i].archive)
  }
}

const ProgramFeedNavigator = createMaterialTopTabNavigator(navigatorObject, {
  tabBarPosition: 'top',
  animationEnabled: true,
  lazyLoad: true,
  tabBarOptions: {
    scrollEnabled: true,
    showIcon: false,
    upperCaseLabel:true,
    tabStyle: {
      width: appVars.screenX/3,
    },
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

class ProgramListScreen extends Component{
  
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
      fontSize: appVars.baseUnit,      
    }

  }
  componentWillMount = async ()=>{

      this.fetchdata(); 
   
  }



  fetchdata = async () => {
    const { page } = this.state;
    var archive=this.state.selectedArchive;
    
    
    this.setState({ loading: true});
    if(page===1){
      this.setState({ refreshing: true});
      
      getEventList(archive,page)
        .then(res => res.json())
        .then(res => {
          //console.log(res);
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
        
        getEventList(archive,page)
          .then(res => res.json())
          .then(res => {
            
            this.setState({
              data: [...this.state.data, ...res.response],
              error: res.error || null,
              loading : false,
              refreshing: false,
            })
          })
          .catch(error => {
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

  

  

  handleClick = async (item)=>{

    
    this.setState({
      currentItem: item.id
    });

    const { navigation } = this.props;
    navigation.navigate('ProgramDetail', {eventId: item.id});
  }
  renderItemNext = (item,index) => {

    return (

      <View style={appStyles.timelineElement}>
      {index===0&&<View style={{height:10}}/>}

      <TouchableOpacity activeOpacity = { .5 } onPress={ ()=>this.handleClick(item)}>
      <View style={{flexDirection:"row"}}>

        <View style={{flex:2,flexDirection:"column",alignItems:"center",paddingRight: 10}}>
        <Text style={appStyles.newsDate}>{item.time}</Text>
        <View style={{flex:4,backgroundColor: appVars.colorMain,width:3.5}} />
          
        <View style={{height: 66,width: 66, alignItems:"center", borderRadius:33,borderColor:appVars.colorMain,borderWidth:3}} >
        {item.picture&&<Image style={{height: 60,width: 60, borderRadius:30,borderColor:"white",borderWidth:3}} source={{uri: appVars.apiUrl +"/"+item.picture.img.src} }/>}
        </View>

        <View style={{flex:10,backgroundColor: appVars.colorMain,width:3.5}} />

        </View>
        <View style={{flex:9,marginHorizontal:8,marginBottom:10,position:"relative"}}>
          <View style={{
            transform: [{rotate: '-90deg'}],
            width: 0,
            position:"absolute",
            left: -21,
            top:30,
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

          <View style={{borderWidth:1,borderColor:appVars.colorLightGray,borderRadius:5,marginTop:18}}>
          

          <Text style={appStyles.newsListHeadline} numberOfLines={1}>
            {item.headline.toUpperCase()}
          </Text>
          
          <Text style={appStyles.newsListTeaser} numberOfLines={1}>{item.location}</Text>

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
        onEndReachedThreshold={0.1}
        ref={(ref) => { this.newsList = ref; }}
        keyExtractor={(item,index)=> {
          return item.id;
          }}
        renderItem={({item,index}) => this.renderItemNext(item,index)}
        
        ListFooterComponent={()=><View style={{paddingBottom:100}}/>}
       />
       </View>
      </View>
    );
	}
}

export default ProgramFeedNavigator;