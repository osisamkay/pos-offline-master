import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Text, TouchableOpacity, Image} from 'react-native';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import Airtime from '../src/screens/Airtime/Airtime';
import DirectTopUp from '../src/screens/Airtime/DirectTopUp';
import DirectRecharge from '../src/screens/Airtime/DirectRecharge';
import Voucher from '../src/screens/Voucher/Voucher';

const Stack = createStackNavigator();

const VoucherRoutes = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Voucher"
        options={{
          title: 'Voucher',
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: '#4AA43D',
          },
        }}
        component={Voucher}
      />
      {/* <Stack.Screen
        name="DirectTopUp"
        options={{
          title: 'Direct TopUp',
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
        component={DirectTopUp}
      /> */}
    </Stack.Navigator>
  );
};

export default VoucherRoutes;
