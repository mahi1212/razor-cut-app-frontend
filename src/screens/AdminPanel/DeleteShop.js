import { View, SafeAreaView, ScrollView, Image } from 'react-native'
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import Text from '../../components/Text/Text';
import SingleShop from '../../components/Home/SingleShop/SingleShop';
import { RefreshControl } from 'react-native-gesture-handler';
export default function DeleteShop() {
  // get all shops
  const [shops, setShops] = useState([]);
  const getShops = () => {
    // 192.168.0.221
    fetch(`http://192.168.0.221:5000/shops`)
      .then((res) => res.json())
      .then((data) => {
        setShops(data);
      })
      .catch((err) => {
        console.log(err);
      })
  };
  // delete shop
  getShops();

  const onRefresh = React.useCallback(() => {
    getShops();
  }, []);
  return (
    <SafeAreaView refreshControl={
      <RefreshControl onRefresh={onRefresh} />
    } 
    style={{ flex: 1 }}>
      <ScrollView >
        {
          shops.map((shop) => {
            var sum = shop.review.reduce((total, review) => total + review.rating, 0);
            if(sum === 0) { shop.review.length = 1 }
            var average = sum / shop.review.length;
            // console.log(average)
            return (
              <SingleShop
                key={shop._id}
                shop={shop}
                avg={average}
                deleteIcon={true}
              />
            )
          })
        }
      </ScrollView>
    </SafeAreaView>
  )
}