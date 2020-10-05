import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Input} from 'react-native-elements';
import {Button} from 'react-native-elements';
import {PermissionsAndroid} from 'react-native';
import Ussd, {ussdEventEmitter} from 'react-native-ussd';
import Loader from 'react-native-multi-loader';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {Toast, Picker, Icon} from 'native-base';
import RNFetchBlob from 'rn-fetch-blob';

const Voucher = () => {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');
  const [cableNumber, setCableNumber] = useState('');
  const [line, setLine] = useState('08161341234');
  const [selectedValue, setSelectedValue] = useState('--select Cable--');
  const [modalVisible, setModalVisible] = useState(false);
  const [pin, setPin] = useState('');
  const [devices, setDevices] = useState([]);

  useEffect(() => {
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
  const onValueChange = (value) => {
    setSelectedValue(value);
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <View style={styles.centeredView}>
          <View style={styles.mainView}>
            <Text style={styles.header}>Voucher</Text>
            <View style={styles.pickerStyle}>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{width: undefined}}
                placeholder="Select your SIM"
                placeholderStyle={{color: '#bfc6ea'}}
                selectedValue={selectedValue}
                onValueChange={onValueChange}>
                <Picker.Item label="-- Select Cable --" value="key0" />
                <Picker.Item label="Dstv" value="100" />
                <Picker.Item label="GoTv" value="200" />
              </Picker>
            </View>

            <Input
              placeholder="Enter Amount"
              errorStyle={{color: 'red'}}
              errorMessage=""
              label="Amount :"
              labelStyle={styles.label}
              inputContainerStyle={styles.input}
              keyboardType="numeric"
              onChangeText={(value) => {
                setCableNumber(value);
              }}
            />
            <Input
              placeholder="Enter Pin"
              errorStyle={{color: 'red'}}
              textContentType="password"
              secureTextEntry={true}
              label="Pin :"
              labelStyle={styles.label}
              inputContainerStyle={styles.input}
              onChangeText={(value) => {
                setPin(value);
              }}
            />

            <Button
              title="Fund Cable"
              titleStyle={styles.btnTitle}
              buttonStyle={styles.btnStyle}
              type="outline"
              onPress={() => {
                if (
                  selectedValue === '--Select Cable--' ||
                  cableNumber === '' ||
                  pin === ''
                ) {
                  Toast.show({
                    text: 'Please Enter All Parameters',
                    buttonText: 'Okay',
                    duration: 5000,
                  });
                } else {
                  dial(`*878*404*${selectedValue}*${cableNumber}*${pin}#`);
                }
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default Voucher;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  mainView: {
    // margin: 20,

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
  header: {
    color: '#4AA43D',
    fontSize: heightPercentageToDP('5%'),
    marginBottom: 30,
  },
  pickerStyle: {
    width: widthPercentageToDP('90%'),

    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 4,
    marginBottom: 20,
  },
});
