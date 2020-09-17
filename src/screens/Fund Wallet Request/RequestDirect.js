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

const RequestDirect = () => {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [line, setLine] = useState('08161341234');
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    // Update the document title using the browser API
    const eventListener = ussdEventEmitter.addListener('ussdEvent', (event) => {
      setLoading(false);
      console.log(event.ussdReply);
    });
    return () => {
      eventListener.remove();
    };
  });

  const dial = async () => {
    setLoading(true);
    console.log(`*878*34*${line}*${amount}#`);
    let granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CALL_PHONE,
      {
        title: 'I need to make some calls',
        message: 'Give me permission to make calls ',
      },
    );

    if (granted) {
      console.log('CAN Make Calls');
      Ussd.dial(`*878*34*${line}*${amount}`); //add your dilaing code instead of *#456#
    } else {
      console.log('CALL MAKING Permission Denied');
    }
  };
  return (
    <View style={styles.centeredView}>
      <View style={styles.mainView}>
        <Input
          placeholder="Input the amount you wish to fund"
          errorStyle={{color: 'red'}}
          errorMessage=""
          label="Amount :"
          labelStyle={styles.label}
          inputContainerStyle={styles.input}
          onChangeText={(value) => {
            setAmount(value);
          }}
        />
        <Button
          title="Fund Wallet"
          titleStyle={styles.btnTitle}
          buttonStyle={styles.btnStyle}
          type="outline"
          onPress={() => {
            dial();
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

export default RequestDirect;

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
