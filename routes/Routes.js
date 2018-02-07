import React from 'react';
import { StackNavigator } from 'react-navigation';
import Home from '../pages/Home';

const HomeScreen = ({ navigation }) => (
  <Home 
    // navigation={() => navigation.navigate('Details')}
  />
);

const Routes = StackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      headerTitle: 'CRYPTOCURRENCIES',
    },
  }
});

export default Routes;

