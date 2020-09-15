import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {PermissionsAndroid, TouchableOpacity} from 'react-native';
import Ussd, {ussdEventEmitter} from 'react-native-ussd';

const App = () => {
  useEffect(() => {
    // Update the document title using the browser API
    const eventListener = ussdEventEmitter.addListener('ussdEvent', (event) => {
      console.log(event.ussdReply);
    });
  });

  const dial = async () => {
    let granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CALL_PHONE,
      {
        title: 'I need to make some calls',
        message: 'Give me permission to make calls ',
      },
    );

    if (granted) {
      console.log('CAN Make Calls');
      Ussd.dial('*878*45#'); //add your dilaing code instead of *#456#
    } else {
      console.log('CALL MAKING Permission Denied');
    }
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          dial();
        }}>
        <Text>press me</Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;
