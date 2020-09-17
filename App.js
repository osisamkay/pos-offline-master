import 'react-native-gesture-handler';
import * as React from 'react';
import {Root} from 'native-base';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Text, TouchableOpacity, Image} from 'react-native';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import FundRequestRoute from './Routes/FundRequestRoutes';
import Home from './src/screens/Home';
import RequestDirect from './src/screens/Fund Wallet Request/RequestDirect';
import CardRequest from './src/screens/Fund Wallet Request/CardRequest';
import AirtimeRoute from './Routes/AirtimeRoute';
import VoucherRoutes from './Routes/VoucherRoute';
import BillsRoute from './Routes/BillsRoute';
import ElectricityRoute from './Routes/ElectricityRoute';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          options={{
            headerStyle: {
              backgroundColor: '#fff',
              elevation: 0,
              shadowOpacity: 0,
              borderBottomWidth: 0,
            },
            headerRight: () => (
              <Text
                style={{
                  marginRight: 10,
                  fontSize: heightPercentageToDP('3.5%'),
                }}>
                Hello User
              </Text>
            ),
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Home');
                }}>
                <Image
                  source={require('./src/assets/Menu.png')}
                  style={{
                    width: widthPercentageToDP('10%'),
                    height: heightPercentageToDP('10%'),
                    marginLeft: 10,
                  }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            ),
            headerTitleStyle: {
              display: 'none',
            },
            // headerShown: false,
          }}
          component={Home}
        />
        <Stack.Screen
          name="RequestDirect"
          options={{
            title: 'Direct Purchase',
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: '#4AA43D',
            },
          }}
          component={RequestDirect}
        />
        <Stack.Screen
          name="CardRequest"
          options={{
            title: 'Card',
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: '#4AA43D',
            },
          }}
          component={CardRequest}
        />
        <Stack.Screen
          name="Airtime"
          options={{
            headerShown: false,
          }}
          component={AirtimeRoute}
        />
        <Stack.Screen
          name="Voucher"
          options={{
            headerShown: false,
          }}
          component={VoucherRoutes}
        />
        <Stack.Screen
          name="Bills"
          options={{
            headerShown: false,
          }}
          component={BillsRoute}
        />
        <Stack.Screen
          name="Electricity"
          options={{
            headerShown: false,
          }}
          component={ElectricityRoute}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// export default App;

export default () => (
  <Root>
    <App />
  </Root>
);
