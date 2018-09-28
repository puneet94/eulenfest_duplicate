"use strict"
import React, { PureComponent } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
    Alert
} from 'react-native';
import appStyles from '../../appStyles';
import appVars from '../../appVars';
import { NavigationActions } from 'react-navigation';
import { em_s, lineHeight_s, handleExternalUrl } from '../../core/helpers';
import YouTube from 'react-native-youtube'


export default class Webcam extends PureComponent{
    constructor(props){
        super(props);
        
    }
    
    componentWillMount = async ()=>{

      }
      
    
    
    render = ()=>{
        
        return <View style={{flex:1, backgroundColor: appVars.colorWhite, borderTopColor: appVars.colorMain, borderTopWidth: 1, }} >

                <YouTube
                videoId={'GBwpjr6-il4'}   

                apiKey={'AIzaSyCL8gi0vuVd8fi2I63XHZ1IstTS40dkYlI'}
                                play={true}             
                fullscreen={false}       
                loop={false}

                onReady={e => this.setState({ isReady: true })}
                onChangeState={e => this.setState({ status: e.state })}
                onError={e => this.setState({ error: e.error })}
                style={{ height: 200, width: 300 }}
            />


        </View>
    }
}