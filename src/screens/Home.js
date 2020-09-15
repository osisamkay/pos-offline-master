import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import AwesomeButton from 'react-native-really-awesome-button';

const Home = () => {
  const [loading, setLoading] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <text>iushihi</text>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // backgroundColor: 'red',
  },
  btnStyle: {
    backgroundColor: '#fff',
    width: widthPercentageToDP('85%'),
    height: heightPercentageToDP('7%'),
  },
  btnStyle2: {
    backgroundColor: '#000',
    width: widthPercentageToDP('85%'),
    height: heightPercentageToDP('7%'),
  },
  btnTitle: {
    color: 'black',
  },
});
