import React, { Component,PureComponent } from 'react';
import { Dimensions, StyleSheet, View, Text, Platform } from 'react-native';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

import appVars from '../../appVars';
import appStyles from '../../appStyles';
import Icon from 'react-native-vector-icons/Feather';


const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.003;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


class Example extends PureComponent {

  constructor(props) {
	super(props);
    this.state = {
 
          latitude: parseFloat(this.props.navigation.state.params.long),
					longitude: parseFloat(this.props.navigation.state.params.lat),
					location: this.props.navigation.state.params.location,			
					coordinates: [],
     
		};

    this.mapView = null;
  }


  componentWillMount() {
			
	navigator.geolocation.getCurrentPosition(
	  (position) => {
		
		this.setState({
			userLatitude: position.coords.latitude,
			userLongitude: position.coords.longitude,
			userAccuracy: position.coords.accuracy,
			userLocationAvailable: true,
			error: null,
		});
		

	  },
	  (error) => this.setState({ error: error.message }),
	  { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
	);


	}
	
	distance(int) {
		if(this.state.distance <= 1) {
			return int*1000+' METER';
		} else {
			 return Math.round(int * 100) / 100+' KM'


			 
		}
	}
 

  render() {


	const origin = {latitude: this.state.latitude, longitude: this.state.longitude};
	const destination = {latitude: this.state.userLatitude, longitude: this.state.userLongitude};

    return (
		
      <MapView
        initialRegion={{
          latitude: this.state.latitude,
          longitude: this.state.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
			}}
				customMapStyle = {appVars.objMapstyle}

				style={StyleSheet.absoluteFill}
				showsUserLocation
				followsUserLocation={true}
        ref={c => this.mapView = c}
      >
 			
			
 			<MapView.Marker
			 key = {0}
						coordinate={{
							latitude: origin.latitude,
							longitude: origin.longitude
						}}
						
						title={this.props.navigation.state.params.name}
						description={this.props.navigation.state.params.subname}>
				
				<View style={{justifyContent: 'center',alignItems: 'center'}}>
				{this.state.distance?<View style={appStyles.mapDistance}><Text style={appStyles.mapDistanceText}>{this.distance(this.state.distance)}</Text></View>
				:<View style={appStyles.headerButtton} ><Icon size={22} name={'map-pin'} color={appVars.colorWhite}/></View>}
					<View style={appStyles.mapYou}><Text style={appStyles.mapYouText}>{this.state.location}</Text></View>
				</View>
					
			</MapView.Marker>

		{this.state.userLocationAvailable &&		
		
					[/*
					<MapView.Marker
						key = {1}
						coordinate={{
							latitude: destination.latitude,
							longitude: destination.longitude
						}}
						title={this.props.navigation.state.params.name}
						description={this.props.navigation.state.params.subname}>
						<View style={{justifyContent: 'center',alignItems: 'center',}}>
             <View style={appStyles.headerButtton} ><Icon size={22} name={'crosshair'} color={appVars.colorWhite}/></View>
						 <View style={appStyles.mapYou}><Text style={appStyles.mapYouText}>START</Text></View>
						 </View>
					</MapView.Marker>,*/
          <MapViewDirections
            key={2}
						origin={origin}
						destination={destination}
						waypoints={ (this.state.coordinates.length > 2) ? this.state.coordinates.slice(1, -1): null}
						mode = {"walking"}
						apikey={appVars.MAPS_API_KEY}
						strokeWidth={3}
						strokeColor={appVars.colorMain}
            onStart={(params) => {
              
            }}
            onReady={(result) => {
							this.setState({
								distance: result.distance,
							}),
              this.mapView.fitToCoordinates(result.coordinates, {
                edgePadding: {
                  right: (width / 22)+appVars.mapBoundingBox,
                  bottom: (height / 22)+appVars.mapBoundingBox,
                  left: (width / 22)+appVars.mapBoundingBox,
                  top: (height / 22)+appVars.mapBoundingBox	,
                }
              });
            }}
            onError={(errorMessage) => {
            }}
          />
		 ]}
      </MapView>
    );
  }
}

export default Example;