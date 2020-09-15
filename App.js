import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './src/screens/Home';
import {Text, TouchableOpacity, Image} from 'react-native';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';

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
                  navigation.navigate('HomePages');
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
