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

import { YouTubeStandaloneAndroid } from 'react-native-youtube';
import { YouTubeStandaloneIOS } from 'react-native-youtube';

import store from 'react-native-simple-store';
import { em, lineHeight, _ratioImageHeigh, _handleExternalUrl } from '../../core/helpers';


class NewsDetailScreen extends Component{
  
  constructor(props){
    super(props);
    this.state = {
      loading: false,
      data: [],
      gallerydata: [],
      gallerypage: 1,
      error: null,
      refreshing: false,
      newsid: "",
  }
}
componentWillMount = async ()=>{
  store.delete('deepLinkNewsId');
  const {newsid} = this.props.navigation.state.params;
  this.setState({
    newsid: newsid+""
  });
}
  SocialShare =()=>{
    Share.share({
      message: this.state.shareUrl,
      url: this.state.shareUrl,
      title: this.state.shareTitle
    }, {
      // Android only:
      dialogTitle: this.state.shareTitle,
    })
  }

  YouTube=()=>{
  if(Platform.OS === 'android') {
      YouTubeStandaloneAndroid.playVideo({
      apiKey: appVars.YoutubeAPIKey,     // Your YouTube Developer API Key
      videoId: this.state.YouTubeId,     // YouTube video ID
      autoplay: true,             // Autoplay the video
      })
    } else {
        YouTubeStandaloneIOS.playVideo(this.state.YouTubeId)
        .then(() => console.log('Standalone Player Exited'))
        .catch(errorMessage => console.error(errorMessage))
   }
  }

  static navigationOptions = ({ navigation }) => {
     const { params = {} } = navigation.state;
     console.log(params);
     if(params.YouTube) {
      return {
      headerRight: <View style={{flexDirection:"row"}}>
      <TouchableOpacity style={appStyles.iconWrapper} onPress={() => params.handleYouTube()}>
      <View style={appStyles.headerButttonOuter} >
      <View style={appStyles.headerButtton} >
      <Icon size={22} style={{marginLeft:0}} name={'youtube'} color={appVars.colorWhite}/>
      </View>
      </View>
     </TouchableOpacity>

     <TouchableOpacity style={appStyles.iconWrapper} onPress={() => params.handleSocialShare()}>
      <View style={appStyles.headerButttonOuter} >
      <View style={appStyles.headerButtton} >
      <Icon size={22} style={{marginLeft:-2}} name={'share-2'} color={appVars.colorWhite}/>
      </View>
      </View>
     </TouchableOpacity>

     
      </View>
      }
    } else {
      return {
        headerRight: <View style={{flexDirection:"row"}}>
          
       <TouchableOpacity style={appStyles.iconWrapper} onPress={() => params.handleSocialShare()}>
        <View style={appStyles.headerButttonOuter} >
        <View style={appStyles.headerButtton} >
        <Icon size={22} style={{marginLeft:-2}} name={'share-2'} color={appVars.colorWhite}/>
        </View>
        </View>
       </TouchableOpacity>
  
       
        </View>
        }
    }
 };


  componentDidMount = async ()=>{ 
    this.props.navigation.setParams({ 
      handleSocialShare: this.SocialShare,
      handleYouTube: this.YouTube,
    });    
     this.fetchdata(); 
  }



fetchdata = async () => {
  const navParams = this.props.navigation.state.params;
  const api = appVars.apiUrl+"/news/newsreader.html?authtoken="+appVars.apiKey+"&id="+navParams.newsid;
  let tempapi= api;
  this.setState({ loading: true});

    fetch(tempapi)
      .then(res => res.json())
      .then(res => {
        this.props.navigation.setParams({ 
          YouTube: res.response[0].youtube_id,
        }),
        this.setState({
          data: res.response || [],
          error: res.error || null,
          loading : false,
          refreshing: false,
          shareUrl: res.response[0].shareurl,
          shareTitle: res.response[0].headline,
          YouTubeId: res.response[0].youtube_id, 
        },()=>{
        });
      })
      .then(
        this.fetchgallerydata()
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
  
  console.log("api url",tempapi);
  this.setState({ loading: true});

      fetch(tempapi)
        .then(res => res.json())
        .then(res => {
          console.log("called gallery data",res);
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
      this.fetchgallerydata();
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

        <Text style={appStyles.subheadline}>{item.subheadline}</Text>
   

        

          {(item.teaser)?<HTMLView addLineBreaks={false} stylesheet={
          StyleSheet.create({
            p: {
              fontSize: em(0.875),
              lineHeight: lineHeight(0.875,150),
              fontFamily: appVars.fontText,
              color: appVars.colorBlack,
              marginBottom: em(0.875),
            },
            strong: {
              fontWeight: '700'
            },
            a: {
              color: appVars.colorMain,
              fontWeight: '700',
            },
            h3: {
              fontSize: em(1.250),
              lineHeight: lineHeight(1.250,120),
              fontFamily: appVars.fontHeadline,
              color: appVars.colorBlack,
              marginBottom: em(0.500),
            }
          })
          }
          value={item.teaser} onLinkPress={(url) => handleExternalUrl(url)} />:<View></View>}

          <HTMLView addLineBreaks={false} value={item.text} 
          
          stylesheet={appStyles}
          
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
            <Text style={appStyles.newsEditor}>{item.editor}</Text>
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
          return item.id;
          }}
        renderItem={({item}) => this.renderItem(item)}
       />
      </View>
    );
	}
}

export default NewsDetailScreen;