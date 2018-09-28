import React, {Component} from 'react';
import {Platform, StyleSheet, View, StatusBar, Text} from 'react-native';

import appVars from './appVars';
import appStyles from './appStyles';
import MenuScreen from './components/menu';
import AdBanner from "./components/adbanner";

const eulenfestApp = ()=>{
  if (Text.defaultProps == null) Text.defaultProps = {};
  Text.defaultProps.allowFontScaling = false;
  return (
  <View style={{flex:1}}>
  <View style={appStyles.statusBariOS}></View>
    <View style={{flex:9}}>
      <MenuScreen/>
    </View>
    <View style={{flex:1}}>
      <AdBanner/>
    </View>
  </View>
)
}

export default eulenfestApp;