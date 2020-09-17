import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Input} from 'react-native-elements';
import {Button} from 'react-native-elements';
import {PermissionsAndroid} from 'react-native';
import Ussd, {ussdEventEmitter} from 'react-native-ussd';
import Loader from 'react-native-multi-loader';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {Toast} from 'native-base';

const DirectTopUp = () => {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');
  const [line, setLine] = useState('08161341234');
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    // Update the document title using the browser API
    const eventListener = ussdEventEmitter.addListener('ussdEvent', (event) => {
      setLoading(false);
      console.log(event.ussdReply);
      Toast.show({
        text: event.ussdReply,
        buttonText: 'Okay',
        duration: 5000,
      });
    });
    return () => {
      eventListener.remove();
    };
  });

  const dial = async (code) => {
    setLoading(true);
    console.log(code);
    let granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CALL_PHONE,
      {
        title: 'I need to make some calls',
        message: 'Give me permission to make calls ',
      },
    );

    if (granted) {
      console.log('CAN Make Calls');
      Ussd.dial(code); //add your dilaing code instead of *#456#
    } else {
      console.log('CALL MAKING Permission Denied');
    }
  };
  return (
    <View style={styles.centeredView}>
      <View style={styles.mainView}>
        <Input
          placeholder="Enter Token"
          errorStyle={{color: 'red'}}
          errorMessage=""
          label="Customer Token :"
          labelStyle={styles.label}
          inputContainerStyle={styles.input}
          onChangeText={(value) => {
            setToken(value);
          }}
        />
        <Button
          title="Fund Customer"
          titleStyle={styles.btnTitle}
          buttonStyle={styles.btnStyle}
          type="outline"
          onPress={() => {
            dial(`*878*3*${token}#`);
          }}
        />
      </View>
      <Loader
        visible={loading}
        textLoader="Please wait"
        loaderType="default"
        textType="default"
      />
    </View>
  );
};

export default DirectTopUp;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  mainView: {
    margin: 20,

    borderRadius: 10,
    alignItems: 'center',
    width: widthPercentageToDP('95%'),
  },
  input: {
    borderColor: 'green',
    borderWidth: 1,
    borderRadius: 5,
  },
  btnStyle: {
    backgroundColor: '#4AA43D',
    width: widthPercentageToDP('90%'),
    height: heightPercentageToDP('10%'),
    borderColor: 'green',
    marginVertical: 10,
  },

  btnTitle: {
    color: '#fff',
  },
});
