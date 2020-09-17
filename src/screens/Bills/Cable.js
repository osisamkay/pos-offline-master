import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {Button} from 'react-native-elements';
import {PermissionsAndroid} from 'react-native';
import Ussd, {ussdEventEmitter} from 'react-native-ussd';
import Loader from 'react-native-multi-loader';
import {Toast} from 'native-base';

const Cable = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');
  const [line, setLine] = useState('08161341234');
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    // Update the document title using the browser API
    const eventListener = ussdEventEmitter.addListener('ussdEvent', (event) => {
      setLoading(false);
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
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Button
            title="Direct Request from Customer"
            titleStyle={styles.btnTitle}
            buttonStyle={styles.modalBtn}
            type="outline"
            onPress={() => {
              navigation.navigate('DirectCable');
            }}
          />
          <Button
            title="Direct to Customer"
            titleStyle={styles.btnTitle}
            buttonStyle={styles.modalBtn}
            type="outline"
            onPress={() => {
              navigation.navigate('DirectTopUp');
            }}
          />
        </View>
      </View>
      <Loader
        visible={loading}
        textLoader="Please wait"
        loaderType="default"
        textType="default"
      />
    </SafeAreaView>
  );
};

export default Cable;

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#4aa43d14',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    width: widthPercentageToDP('95%'),
  },
  modalBtn: {
    backgroundColor: '#4AA43D',
    width: widthPercentageToDP('80%'),
    height: heightPercentageToDP('10%'),
    borderColor: 'green',
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  btnTitle: {
    color: '#fff',
  },
});
