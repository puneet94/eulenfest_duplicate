"use strict"
import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Platform,
    TouchableOpacity,
    Dimensions,
    RefreshControl,
    Button,
    Share,
    Modal,
    ListView,
    Image,
    Alert
} from 'react-native';
import HTMLView from 'react-native-htmlview';
import Icon from 'react-native-vector-icons/Feather';

import appStyles from '../../appStyles';
import appVars from '../../appVars';
import { NavigationActions } from 'react-navigation';
import {getEventEntry} from "../../services/dataService";

import store from 'react-native-simple-store';
import { em, lineHeight, _ratioImageHeigh, _handleExternalUrl } from '../../core/helpers';


class ProgramDetailScreen extends Component{
  
  constructor(props){
    super(props);
    this.state = {
      loading: false,
      data: [],
      gallerydata: [],
      gallerypage: 1,
      error: null,
      refreshing: false,
  }
}


  
  static navigationOptions = ({ navigation }) => {
     const { params = {} } = navigation.state;  
      return {
      headerRight: <View style={{flexDirection:"row"}}>
                   <TouchableOpacity style={appStyles.iconWrapper} onPress={() => params.openMapScreen()}>
                   <View style={appStyles.headerButttonOuter} >
                   <View style={appStyles.headerButtton} >
                   <Icon size={18} style={{marginLeft:0}} name={'map'} color={appVars.colorWhite}/>
                    </View>
                    </View>
                  </TouchableOpacity>
                  
                  </View>
                  
      }
 };

  componentDidMount = async ()=>{
   
    this.props.navigation.setParams({ 
      handleSocialShare: this.SocialShare,
      openMapScreen: this.openMapScreen,
    });    
     this.fetchdata(); 
  }

openMapScreen = async () =>{
  const [long,lat] = this.state.data[0].longlat.split(",");
  const location = this.state.data[0].location;
  //console.log("latitide longitude",long,lat)
  const { navigation } = this.props;
  navigation.navigate('LocationMap',{lat,long,location});    
 }

fetchdata = async () => {
  
  const eventId = this.props.navigation.state.params.eventId;
  this.setState({ loading: true});

  getEventEntry(eventId)
      .then(res => res.json())
      .then(res => {
        //console.log("program detail",res);
        this.setState({
          data: res.response || [],
          error: res.error || null,
          loading : false,
          refreshing: false,
        },()=>{
        });
      })
      .then(
        //this.fetchgallerydata()
      )
      .catch(error => {
        this.setState({ error, loading: false });
      })
};

fetchgallerydata = async () => {
  const navParams = this.props.navigation.state.params; 
  const { gallerypage } = this.state;
  const api = appVars.apiUrl+"/gallery.html?authtoken="+appVars.apiKey+"&id="+navParams.newsid;
  let tempapi= api+"&limit=8&page_n122=" + this.state.gallerypage.toString();  
  this.setState({ loading: true});

      fetch(tempapi)
        .then(res => res.json())
        .then(res => {
          
          this.setState({
            gallerydata: [...this.state.gallerydata, ...res.response],
            error: res.error || null,
            loading : false,
            refreshing: false
          })
        })
        .catch(error => {
          this.setState({ error, loading: false });
        });

};

  handleRefresh = () =>{
    this.setState({
      refreshing:true,
    }, ()=>{
      this.fetchdata();
    })
  }

  handlePageEnd = ()=>{
    this.setState({
      gallerypage: this.state.gallerypage+1,
    }, ()=>{
      //this.fetchgallerydata();
    });
  }

  openImageViewer = async (item)=>{
        const { navigation } = this.props;
        navigation.navigate('ImageViewer', {item: item});
  }

  openGalleryViewer = async (item,index)=>{
    const navParams = this.props.navigation.state.params;     
    const { navigation } = this.props;
    navigation.navigate('ImageViewer', {item: item, newsid: navParams.newsid,initialPage:index,images:this.state.gallerydata});
  }

  renderGalleryItem  = (item,index) =>{
   
    return(
      <TouchableOpacity style={appStyles.galleryItem} key={index} activeOpacity={0.5} onPress={()=>this.openGalleryViewer(item,index)}>
        <View style={appStyles.imageBorder}>
          <Image style={{backgroundColor: appVars.colorSeperatorColor, resizeMode: 'contain', width: (appVars.screenX*0.25)-15, height: (appVars.screenX*0.25)-15}} source={{uri: appVars.apiUrl +"/"+item.img.src} } />
        </View>
      </TouchableOpacity>
    )
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
    
    <View style={appStyles.topheadlineContainer}><Text style={appStyles.topheadline}>{item.date.toUpperCase()}</Text></View>

    <View style={appStyles.contentElement}>

    <Text style={appStyles.headline}>{item.headline}</Text>

      <Text style={[appStyles.subheadline,{fontSize:em(1), marginBottom: em(0.500)}]}>{item.subheadline}</Text>
 

        <HTMLView addLineBreaks={false} value={item.text} 
        
        stylesheet={appStyles}
        bullet={'\n· '}
        onLinkPress={(url) => _handleExternalUrl(url)} />
        
          <FlatList
          data={this.state.gallerydata}
          numColumns={4}
          keyExtractor={(item,index)=> {
              return item.img.src;
            }}
          renderItem={({item,index}) => this.renderGalleryItem(item,index)}
          />
        <View style={{flex: 1, flexDirection: 'row', justifyContent:'space-between'}}>
          {(item.imagecopyright)?<Text style={appStyles.newsEditor}>Foto: {item.imagecopyright}</Text>:<View></View>}
          <Text style={appStyles.newsEditor}></Text>
        </View>
        </View>
    </View>

  );
}

	render = ()=>{


    return (
      <View style={appStyles.contenContainer}>
      <FlatList
        data={this.state.data}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh}
            colors={[appVars.colorMain]}
          />
          }
        onEndReachedThreshold={.5}
        onEndReached={this.handlePageEnd}
        keyExtractor={(item,index)=> {
          return `list-item-${index}`
          }}
        renderItem={({item}) => this.renderItem(item)}
       />
      </View>
    );
	}
}

export default ProgramDetailScreen;