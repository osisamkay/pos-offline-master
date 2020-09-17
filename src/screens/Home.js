import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Modal,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import {PermissionsAndroid} from 'react-native';
import Ussd, {ussdEventEmitter} from 'react-native-ussd';
import {Button} from 'react-native-elements';
import {fundLinks} from '../Components/FundModal';
import Loader from 'react-native-multi-loader';
import {Buttons} from '../Components/HomeButton';

const Home = ({navigation}) => {
  const [loading, setLoading] = useState(false);
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
        <Button
          title="Fund Wallet"
          titleStyle={styles.btnTitle}
          buttonStyle={styles.btnStyle}
          type="outline"
          onPress={() => {
            // navigation.navigate('login');
            setModalVisible(true);
          }}
        />
        <View style={styles.ViewBtn}>
          {Buttons.map((data) => {
            return (
              <TouchableOpacity
                key={data.title}
                style={styles.clickable}
                onPress={() => {
                  data.title === 'Airtime'
                    ? navigation.navigate('Airtime')
                    : data.title === 'Voucher'
                    ? navigation.navigate('Voucher')
                    : '';
                }}>
                <View>{data.img}</View>
                <View>
                  <Text
                    style={{
                      textAlign: 'center',
                      paddingTop: 10,
                      color: '#327529',
                    }}>
                    {data.title}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {fundLinks.map((data) => {
              return (
                <View key={data.title}>
                  <Button
                    title={data.title}
                    titleStyle={styles.btnTitle}
                    buttonStyle={styles.modalBtn}
                    type="outline"
                    onPress={() => {
                      if (data.title === 'Request Direct') {
                        setModalVisible(false);
                        navigation.navigate('RequestDirect');
                      } else if (data.title === 'Bank') {
                        dial('*878*999#');
                      } else {
                        setModalVisible(false);
                        navigation.navigate('CardRequest');
                      }
                    }}
                  />
                </View>
              );
            })}
          </View>
        </View>
      </Modal>
      <Loader visible={loading} loaderType="default" textType="default" />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  btnStyle: {
    backgroundColor: '#4AA43D',
    width: widthPercentageToDP('93%'),
    height: heightPercentageToDP('10%'),
    borderColor: 'green',
    marginVertical: 10,
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#4aa43d14',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: widthPercentageToDP('95%'),
  },
  clickable: {
    borderWidth: 1,
    width: widthPercentageToDP('25%'),
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#327529',
    padding: 10,
  },
  ViewBtn: {
    flexDirection: 'row',
    width: widthPercentageToDP('93%'),
    justifyContent: 'space-between',
    marginTop: 50,
  },
});
