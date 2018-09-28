"use strict"
import React, { PureComponent } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
    Alert,
    PanResponder
} from 'react-native';
import Carousel from "react-native-snap-carousel";
import appStyles from '../../appStyles';
import appVars from '../../appVars';
import { NavigationActions } from 'react-navigation';
import { _handleExternalUrl } from '../../core/helpers';

export default class AdBanner extends PureComponent{
    constructor(props){
        super(props);
        this.adScrollIndex = 0;
        this.state = {
            bannerAds: []
        }
    }
    
    componentWillMount = async ()=>{

        let bannerAds = await this._fetchBannerAds();
        bannerAds = await bannerAds.json();

        this.setState({
            bannerAds: bannerAds.response
        },()=>{
            
        });
        
      }
      
    _fetchBannerAds = ()=>{
        const apiAd = appVars.apiUrl+"/ads.html?authtoken="+appVars.apiKey+"&pid="+appVars.apiAdArchives;
        return fetch(apiAd);
      }
      
    _renderItem =  ({item,index}) => {
        return(
            <View style={appStyles.listAd} key={item.singleSRC} >
                <TouchableOpacity activeOpacity = { .5 } onPress={()=> _handleExternalUrl(item.url)}>
                    <Image
                    source={{uri: appVars.apiUrl +"/"+item.singleSRC }}
                    style={{flex:1, width: appVars.screenX, resizeMode: 'contain'}}
                    />
                </TouchableOpacity>
            </View>
        );
    };

    render = ()=>{
        
        return <View style={appStyles.adContainer} >
        <Carousel
              ref={(c) => { this._carousel = c; }}
              data={this.state.bannerAds}
              loop={true}
              scrollEnabled={false}
              autoplay={true}
              autoplayDelay={1000}
              autoplayInterval={5000}
              renderItem={this._renderItem}
              sliderWidth={appVars.screenX}
              itemWidth={appVars.screenX}
              onSnapToItem={(index) => this.setState({ activeSlide: index }) }
            />
        </View>
    }
}