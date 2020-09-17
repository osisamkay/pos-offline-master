import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Text, TouchableOpacity, Image} from 'react-native';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import RequestDirect from '../src/screens/Fund Wallet Request/RequestDirect';
import Home from '../src/screens/Home';

const Stack = createStackNavigator();

const FundRequestRoute = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="RequestDirect"
        options={{title: 'Request Direct'}}
        component={RequestDirect}
      />
    </Stack.Navigator>
  );
};

export default FundRequestRoute;
