import React, {useState, useEffect} from 'react';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
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
import {useDispatch, useSelector} from 'react-redux';
import {regUser} from '../Action/Action';

const Reg = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const {isReg} = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isReg === true) {
      navigation.navigate('Home');
    }
  }, [isReg]);

  useEffect(() => {
    SplashScreen.hide();
    // Update the document title using the browser API
    const eventListener = ussdEventEmitter.addListener('ussdEvent', (event) => {
      setLoading(false);
      console.log(event.ussdReply);
      dispatch(regUser({token: '00002'}));
      Toast.show({
        text: event.ussdReply,
        buttonText: 'Okay',
        duration: 5000,
      });
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
      <View style={styles.image}>
        <Image
          source={require('../assets/splash_icon.png')}
          style={styles.img}
          resizeMode="contain"
        />
      </View>

      <Button
        title="Continue"
        titleStyle={styles.btnTitle}
        buttonStyle={styles.btnStyle}
        type="outline"
        onPress={() => {
          //   navigation.navigate('Home');
          dial('*878*300#');
        }}
      />
    </SafeAreaView>
  );
};

export default Reg;

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
});
