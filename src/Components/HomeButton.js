import React, {useEffect, useState} from 'react';
import {Image} from 'react-native';

export const Buttons = [
  {
    title: 'Airtime',
    img: <Image source={require('../assets/Group11.png')} />,
  },
  {
    title: 'Voucher',
    img: <Image source={require('../assets/Group12.png')} />,
  },
  {
    title: 'Bills',
    img: <Image source={require('../assets/Group5.png')} />,
  },
  {
    title: 'Product Codes',
    img: <Image source={require('../assets/Group5.png')} />,
  },
  {
    title: 'Settings',
    img: <Image source={require('../assets/Group5.png')} />,
  },
];
