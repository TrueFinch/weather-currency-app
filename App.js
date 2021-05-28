import * as React from 'react';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import Constants from 'expo-constants';

// You can import from local files
import AssetExample from './components/AssetExample';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './screens/Home';
import Week from './screens/Week';
import About from './screens/About';
import { getWeather, weatherData, getBtcCurrency } from './utils/utils'

const Tab = createBottomTabNavigator();

export default class App extends React.Component{
  state = {
    isLoaded: false,
  }

  async componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        Promise.all([
          getBtcCurrency(), 
          getWeather(position.coords.latitude, position.coords.longitude)
        ])
          .then((result) => {
            this.setState({
              isLoaded: true,
            })
          })
        console.log('latitude: ', position.coords.latitude, '; longitude: ', position.coords.longitude);
      },
      (error) => {
        console.log(error)
      }
    )
  }

  render () {
    if (!this.state.isLoaded) {
      return (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName = '';
              if (route.name == 'Home') {
                iconName = focused ? 'ios-home' : 'ios-home-outline';
              } else if (route.name == 'Week') {
                iconName = focused ? 'ios-calendar' : 'ios-calendar-outline';
              } else if (route.name == 'About') {
                iconName = focused
                  ? 'ios-information-circle'
                  : 'ios-information-circle-outline';
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            showLabel: false,
            activeTintColor: 'blue',
            inactiveTintColor: 'gray',
          }}>
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Week" component={Week} />
          <Tab.Screen name="About" component={About} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
