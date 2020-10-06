import React, {useState, useEffect} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Buttons} from '../Components/HomeButton';
import {Button} from 'react-native-elements';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import SplashScreen from 'react-native-splash-screen';
import {PermissionsAndroid} from 'react-native';
import Ussd, {ussdEventEmitter} from 'react-native-ussd';
import {Toast} from 'native-base';
import {Input} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import Loader from 'react-native-multi-loader';

const Login = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const {isReg, userToken} = useSelector((state) => state);
  const [pin, setPin] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (userToken === {}) {
      navigation.navigate('Reg');
    }
  }, [userToken]);

  useEffect(() => {
    SplashScreen.hide();
    // Update the document title using the browser API
    const eventListener = ussdEventEmitter.addListener('ussdEvent', (event) => {
      setLoading(false);
      setPin('');
      Toast.show({
        text: event.ussdReply,
        buttonText: 'Okay',
        duration: 5000,
      });

      navigation.navigate('Home');
    });
    return () => {
      eventListener.remove();
    };
  }, []);

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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.image}>
          <Image
            source={require('../assets/splash_icon.png')}
            style={styles.img}
            resizeMode="contain"
          />
          <Input
            placeholder="Enter Pin"
            errorStyle={{color: 'red'}}
            textContentType="password"
            secureTextEntry={true}
            label="Pin :"
            labelStyle={styles.label}
            value={pin}
            keyboardType="number-pad"
            inputContainerStyle={styles.input}
            onChangeText={(value) => {
              setPin(value);
            }}
          />
        </View>

        <Button
          title="Continue"
          titleStyle={styles.btnTitle}
          buttonStyle={styles.btnStyle}
          type="outline"
          onPress={() => {
            if (pin === '') {
              Toast.show({
                text: 'Please Enter Pin',
                buttonText: 'Okay',
                duration: 3000,
              });
            } else {
              dial(`*878*${userToken.token}${pin}#`);
            }
          }}
        />
        <Loader
          visible={loading}
          textLoader="Please wait"
          loaderType="default"
          textType="default"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  btnStyle: {
    backgroundColor: '#4AA43D',
    width: widthPercentageToDP('93%'),
    height: heightPercentageToDP('10%'),
    borderColor: 'green',
    marginVertical: 10,
    alignSelf: 'center',
  },
  modalBtn: {
    backgroundColor: '#4AA43D',
    width: widthPercentageToDP('80%'),
    height: heightPercentageToDP('10%'),
    borderColor: 'green',
    marginVertical: 10,
  },
  btnTitle: {
    color: '#fff',
  },
  image: {
    height: heightPercentageToDP(80),
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  img: {
    height: heightPercentageToDP(25),
    width: widthPercentageToDP(80),
  },
  input: {
    borderColor: 'green',
    borderWidth: 1,
    borderRadius: 5,
  },
});
