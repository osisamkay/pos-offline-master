import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Text, TouchableOpacity, Image} from 'react-native';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import Voucher from '../src/screens/Voucher/Voucher';
import Bills from '../src/screens/Bills/Bills';
import Cable from '../src/screens/Bills/Cable';
import DirectCable from '../src/screens/Bills/DirectCable';
import DirectCustomer from '../src/screens/Bills/DirectCustomer';
import Settings from '../src/screens/Settings/Settings';

const Stack = createStackNavigator();

const SettingRoute = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Settings"
        options={{
          title: 'Settings',
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: '#4AA43D',
          },
        }}
        component={Settings}
      />
      <Stack.Screen
        name="cable"
        options={{
          title: 'Cable TV Subscription',
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: '#4AA43D',
          },
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Home');
              }}>
              <Image
                source={require('../src/assets/Home.png')}
                style={{
                  width: widthPercentageToDP('8%'),
                  height: heightPercentageToDP('8%'),
                  marginRight: 10,
                }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          ),
        }}
        component={Cable}
      />
      <Stack.Screen
        name="DirectCable"
        options={{
          title: 'Cable TV Subscription',
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: '#4AA43D',
          },
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Home');
              }}>
              <Image
                source={require('../src/assets/Home.png')}
                style={{
                  width: widthPercentageToDP('8%'),
                  height: heightPercentageToDP('8%'),
                  marginRight: 10,
                }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          ),
        }}
        component={DirectCable}
      />
      <Stack.Screen
        name="DirectCustomer"
        options={{
          title: 'Cable TV Subscription',
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: '#4AA43D',
          },
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Home');
              }}>
              <Image
                source={require('../src/assets/Home.png')}
                style={{
                  width: widthPercentageToDP('8%'),
                  height: heightPercentageToDP('8%'),
                  marginRight: 10,
                }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          ),
        }}
        component={DirectCustomer}
      />
    </Stack.Navigator>
  );
};

export default SettingRoute;
