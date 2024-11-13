import { View, StyleSheet, Dimensions, ActivityIndicator, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function Discover() {
  const [location, setLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null); 
  const [errorMsg, setErrorMsg] = useState(null);
  const mapRef = useRef(null); // Reference to MapView

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    })();
  }, []);

  if (!location) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Google Places Autocomplete Input */}
      <View style={styles.searchContainer}>
        <GooglePlacesAutocomplete
          placeholder="Search for a location"
          onPress={(data, details = null) => {
            // Store selected location in temporary state
            const { lat, lng } = details.geometry.location;
            setSelectedLocation({ latitude: lat, longitude: lng });
          }}
          query={{
            key: 'AIzaSyBIk_EtPUwxCbu-Yf9JNVtxo10c6oAThhU',
            language: 'en',
          }}
          fetchDetails={true} // Fetch details for getting the lat/lng
          styles={{
            textInputContainer: {
              flex: 1,
              paddingHorizontal: 10,
              borderRadius: 10,
            },
            textInput: {
              height: 50,
              borderRadius: 10,
              padding: 10,
              fontSize: 16,
            },
            listView: {
              backgroundColor: 'white',
              borderRadius: 10,
              position: 'absolute',
              top: 60, // Position the dropdown below the search bar
              width: '100%',
            },
          }}
          textInputProps={{
            placeholderTextColor: 'grey',
            returnKeyType: 'search',
          }}
        />
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => {
            if (selectedLocation) {
              setLocation(selectedLocation);
              mapRef.current.animateToRegion({
                latitude: selectedLocation.latitude,
                longitude: selectedLocation.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              });
            }
          }}
        >
          <AntDesign name="search1" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <MapView
        ref={mapRef} // Attach ref to MapView
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {/* Marker for User's Current or Searched Location */}
        <Marker
          coordinate={{ latitude: location.latitude, longitude: location.longitude }}
          title="You are here"
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    position: 'absolute',
    top: '10%', // Adjust this to move the search bar lower
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  searchButton: {
    padding: 10,
    backgroundColor: "black",
    borderRadius: 5,
    marginLeft: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});


