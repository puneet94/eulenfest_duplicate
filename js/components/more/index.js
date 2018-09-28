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
    ScrollView,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import appStyles from '../../appStyles';
import appVars from '../../appVars';
import HTMLView from 'react-native-htmlview';

import { em, lineHeight, _ratioImageHeigh, _handleExternalUrl } from '../../core/helpers';


class MoreListScreen extends Component{

render=()=>{

    return (
      
      <View style={appStyles.container}>
      <ScrollView style={appStyles.contenContainer}>
      <View>
        
        <View style={appStyles.contentElement}>
          
            <HTMLView addLineBreaks={true} value={appVars.htmlImpress} 
            stylesheet={appStyles}
            onLinkPress={(url) => _handleExternalUrl(url)} />
            </View>
        </View>
       </ScrollView>
      </View>
    );
	}
}

export default MoreListScreen;