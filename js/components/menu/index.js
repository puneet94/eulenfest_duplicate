'use strict';
import React, { Component } from 'react';
import{Text,Image,ScrollView,View,TouchableOpacity} from "react-native";
import { DrawerNavigator,StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Feather';

//import SettingsScreen from "../settings";
import NewsListScreen from "../newslist";
import InfosListScreen from "../infos";
import MoreListScreen from "../more";
import ProgramsScreen from "../programs";
import WebcamScreen from "../webcam";
import DrawerContainer from "./DrawerContainer";

import NewsDetailScreen from "../newsdetail";
import ProgramDetailScreen from "../programdetail";
import ImageViewerScreen from "../imageviewer";
import LocationMapScreen from  "../locationmap";

import appVars from '../../appVars';
import appStyles from '../../appStyles';

import Header from "../header";

const createCompWithHeader = (Comp,headerTitle)=>{
  return (props)=>{
    return (
      <View style={{flex:1}}>
        <Header {...props} headerTitle={headerTitle}/>
          <View style={{flex:9}}>
            <Comp {...props}/>
          </View>      
      </View>
    );
  }
};

 
const Menu = DrawerNavigator({
  News: StackNavigator({
    NewsList:{
      screen: createCompWithHeader(NewsListScreen,appVars.labelNewsList.toUpperCase()),
      navigationOptions:{
        header: null
      }
    },
    NewsDetail: {
      screen: NewsDetailScreen,
      navigationOptions : ({ navigation }) => ({
        headerLeft: (
          <TouchableOpacity style={appStyles.iconWrapper} onPress={() => navigation.goBack()}>
          <View style={appStyles.headerButttonOuter}>
             <View style={appStyles.headerButtton} ><Icon size={22} name={'arrow-left'} color={appVars.colorWhite}/></View>
          </View>
        </TouchableOpacity>
      ),

        headerTransparent: true,
        headerStyle: {
          marginTop: appVars.statusBar,
          borderBottomWidth: 0, 
        },
        headerTintColor: appVars.colorMain,
      }),

    },
    ImageViewer: {
      screen: ImageViewerScreen,
      navigationOptions : ({ navigation }) => ({
        headerLeft: (<TouchableOpacity style={appStyles.iconWrapper} onPress={() => navigation.goBack()}>
        <View style={appStyles.headerButttonOuter}>
           <View style={appStyles.headerButtton} ><Icon size={22} name={'arrow-left'} color={appVars.colorWhite}/></View>
        </View>
      </TouchableOpacity>),
        headerTransparent: true,
        headerStyle: {
          marginTop: appVars.statusBar,
          borderBottomWidth: 0, 
        },
        headerTintColor: appVars.colorMain,   
      }),
    }
  }),

  Programs: StackNavigator({
    ProgramsList:{
      screen: ProgramsScreen,
      navigationOptions: ({ navigation }) => ({
        header: <View style={{height:60}}>
        <Header navigation={navigation} headerTitle={appVars.labelProgramList.toUpperCase()}/>
        </View>,
      }),
    },
    ProgramDetail:{
      screen: ProgramDetailScreen,
      navigationOptions : ({ navigation }) => ({
        headerLeft: (
          <TouchableOpacity style={appStyles.iconWrapper} onPress={() => navigation.goBack()}>
          <View style={appStyles.headerButttonOuter}>
             <View style={appStyles.headerButtton} ><Icon size={22} name={'arrow-left'} color={appVars.colorWhite}/></View>
          </View>
        </TouchableOpacity>
      ),
        headerTransparent: true,
        headerStyle: {
          marginTop: appVars.statusBar,
          borderBottomWidth: 0,
           },
        headerTintColor: appVars.colorWhite,   
      }),
    },
  
    ImageViewer: {
      screen: ImageViewerScreen,
      navigationOptions : ({ navigation }) => ({
        headerLeft: (<TouchableOpacity style={appStyles.iconWrapper} onPress={() => navigation.goBack()}>
        <View style={appStyles.headerButttonOuter}>
           <View style={appStyles.headerButtton} ><Icon size={22} name={'arrow-left'} color={appVars.colorWhite}/></View>
        </View>
      </TouchableOpacity>),
        headerTransparent: true,
        headerStyle: {
          marginTop: appVars.statusBar,
          borderBottomWidth: 0, 
        },
        headerTintColor: appVars.colorMain,   
      }),
    }
  }),

  Infos: StackNavigator({
    InfosList:{
      screen: InfosListScreen,
      navigationOptions: ({ navigation }) => ({
        header: <View style={{height:60}}>
        <Header navigation={navigation} headerTitle={appVars.labelInfos.toUpperCase()}/>
        </View>,
      }),
    },
    ImageViewer: {
      screen: ImageViewerScreen,
      navigationOptions : ({ navigation }) => ({
        headerLeft: (<TouchableOpacity style={appStyles.iconWrapper} onPress={() => navigation.goBack()}>
        <View style={appStyles.headerButttonOuter}>
           <View style={appStyles.headerButtton} ><Icon size={22} name={'arrow-left'} color={appVars.colorWhite}/></View>
        </View>
      </TouchableOpacity>),
        headerTransparent: true,
        headerStyle: {
          marginTop: appVars.statusBar,
          borderBottomWidth: 0, 
        },
        headerTintColor: appVars.colorMain,   
      }),
    },
    MoreList:{
      screen: MoreListScreen,
      navigationOptions: ({ navigation }) => ({
        header: <View style={{height:60}}>
        <Header navigation={navigation} headerTitle={appVars.labelImprint.toUpperCase()}/>
        </View>,
      }),
    },
    LocationMap: {
      screen: LocationMapScreen,
      navigationOptions : ({ navigation }) => ({
        headerLeft: (
          <TouchableOpacity style={appStyles.iconWrapper} onPress={() => navigation.goBack()}>
          <View style={appStyles.headerButttonOuter}>
             <View style={appStyles.headerButtton} ><Icon size={22} name={'arrow-left'} color={appVars.colorWhite}/></View>
          </View>
        </TouchableOpacity>
      ),
        headerTransparent: true,
        headerStyle: {
          marginTop: appVars.statusBar,
          borderBottomWidth: 0,
        },
        headerTintColor: appVars.colorWhite,   
      }),
    }
  }),
  /*Settings: {
    screen:createCompWithHeader(SettingsScreen,appVars.labelSettings.toUpperCase()),
    
  },*/
  },
  {
    contentComponent: DrawerContainer,
    drawerWidth: appVars.drawerWidth,
  }
);

export default Menu;