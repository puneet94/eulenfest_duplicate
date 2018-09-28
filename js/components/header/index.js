'use strict';
import React, { Component } from 'react';
import OneSignal from 'react-native-onesignal'; // Import package from node modules

import{Text,View,Image,TouchableWithoutFeedback,Platform,StyleSheet,TouchableOpacity} from "react-native";
import appVars from '../../appVars';
import appStyles from '../../appStyles';
import Icon from 'react-native-vector-icons/Feather';
import { NavigationActions } from 'react-navigation'

export default class Header extends Component{

    constructor(props){
        super(props);
        this.state = {
            bell: 'bell',
            switch: false,
            userPushnotification: true,
        };


    }

    componentWillMount() {

        }

    componentDidMount() {
        OneSignal.getPermissionSubscriptionState((status) => {
            
            
            
            
            if(status.subscriptionEnabled=="true") {                
                this.setState({
                    bell: 'bell',
                    switch: false,
                    });
            } else {
                this.setState({
                    bell: 'bell-off',
                    switch: true,
                    });
            }
        });

        }



            _setOneSignalSetStatus(INT) {
                

                this.setState({userPushnotification: INT});

                if(this.state.switch===true) {
                    this.setState({
                        bell: 'bell',
                        switch: false,
                        });
                        OneSignal.setSubscription(true);
                    } else {
                        this.setState({
                            bell: 'bell-off',
                            switch: true,
                            });
                            OneSignal.setSubscription(false);
                    }

            } 

    render (){

        const {navigation} = this.props;
        
  

        return (
        <View style={appStyles.customHeader}>
            <View style={{flex:1,flexDirection:"row", alignItems:"center"}} >
                <View style={{paddingLeft:18}}>
                    <TouchableWithoutFeedback  onPress={() => { navigation.toggleDrawer();}}>
                            <Image source={require('../../../assets/images/m_burger.png')} style={{width: 48, height:48}}/>
                    </TouchableWithoutFeedback>
                </View>
                <View style={{flex:1, flexDirection:"row", paddingLeft: 24, alignItems:"center",justifyContent: 'space-between'}} >
                    <Text style={{fontSize:26,color:appVars.colorWhite,fontFamily:appVars.fontMain}}>{this.props.headerTitle}</Text>            
                    
    

                </View>
                <View style={{alignItems: 'flex-end'}} />

                    <TouchableOpacity activeOpacity = { .5 } onPress={() => this._setOneSignalSetStatus(this.state.switch)}>
                    <Icon name={this.state.bell} style={[appStyles.headerIcon,{paddingRight: 10}]} />
                    </TouchableOpacity>


                        <TouchableOpacity activeOpacity = { .5 } onPress={() => navigation.navigate('MoreList')}>
                        <Icon name="more-vertical" style={[appStyles.headerIcon,{paddingRight: 10}]} />
                        </TouchableOpacity>
                </View>
                    
   
        </View>
        
                   
    );	
    }
    }
    

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'red',
      ...platformContainerStyles
    },
   
  });