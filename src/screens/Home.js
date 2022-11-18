import { ActivityIndicator, ActivityIndicatorComponent, Dimensions, FlatList, Image, Pressable, RefreshControl, ScrollView, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Text from '../components/text/text'
import { colors } from '../theme/colors'
import { spacing } from '../theme/spacing'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../components/Home/Header/Header'
import Search from '../components/Home/Search/Search'
import Slider from '../components/Home/Slider/Slider'
import { Entypo, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import CatagoryTitle from '../components/Home/CatagoryTitle/CatagoryTitle'
import { axios } from 'axios'
const width = Dimensions.get('window').width;

export default function Home() {
  const { container, catagory, catagoryImage, singleCatagoryText, catagoryListStyle } = styles;
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [catagories, setCatagories] = useState([]);
  const [shops, setShops] = useState([]);

  const getCatagories = () => {
    fetch('http://192.168.0.221:5000/services')
      .then((response) => response.json())
      .then((data) => {
        setRefreshing(false);
        // let newdata = catagories.concat(data);
        setCatagories(data);
      })
      .catch((error) => {
        console.error(error);
      })
  };
  const getShops = () => {
    setIsLoading(true)
    fetch(`http://192.168.0.221:5000/shops`)
      .then(res => res.json())
      .then(data => {
        setShops(data)
      }).catch(err => {
        console.log(err)
      }).finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    getCatagories();
    getShops();
  }, []);

  const SingleCatagory = ({ text, icon }) => {
    return (
      <View style={catagoryListStyle}>
        <Pressable onPress={() => console.log(text)} style={{ alignItems: 'center', justifyContent: 'center' }}>
          <View style={catagoryImage} >
            <Entypo name={icon} size={28} color={colors.orange} />
          </View>
          <View style={{ justifyContent: 'flex-start' }}>
            <Text preset='title' style={singleCatagoryText}>{text}</Text>
          </View>
        </Pressable>
      </View>
    )
  }

  const SingleShop = ({ shop }) => {
    const { name, image, rating, address, _id } = shop;
    const { locationAndRatingContainer, shopContainer, innerShopContainer, img, middleDiv, info, locationText, ratingText, bookmarkIcon } = styles;
    return (
      <Pressable style={shopContainer}>
        <View style={innerShopContainer}>
          <Image source={{ uri: image }} style={img} />
          <View style={middleDiv}>
            <Text preset='title'>{name}</Text>
            <Text preset='info'>{address}</Text>
            <View style={info} >
              <View style={locationAndRatingContainer}>
                {/* location still static*/}
                <Entypo name="location-pin" size={16} color={colors.orange} />
                <Text style={locationText}>1.2 km</Text>
              </View>
              <View style={locationAndRatingContainer}>
                {/* Rating showing based on realtime user rating */}
                <FontAwesome name="star-half-o" size={16} color={colors.orange} />
                <Text style={ratingText}>{rating.reduce((a, b) => a + b) / rating.length}</Text>
              </View>
            </View>
          </View>
        </View>
        <Pressable onPress={() => {
          console.log(_id)
        }}
          style={bookmarkIcon}>
          <MaterialCommunityIcons name="bookmark-minus" size={30} color={colors.orange} />
        </Pressable>

      </Pressable>
    )
  }
  return (
    <SafeAreaView style={{ flex: 1, marginHorizontal: spacing[2], }}>
      <ScrollView style={container} showsVerticalScrollIndicator={false} refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={getShops}
        />
      }>
        <Header />
        <Search />
        <Slider />
        {/* catagory list part*/}
        <FlatList
          data={catagories}
          horizontal={true}
          contentContainerStyle={catagory}
          showsHorizontalScrollIndicator={false}
          key={item => item.id}
          renderItem={({ item }) => (
            <SingleCatagory text={item.name} icon={item.icon} />
          )}
        />
        {/* divider */}
        <View style={{ height: 1, width: '100%', backgroundColor: '#f5f4f2', marginTop: 10 }} />
        {/* nearby salons part*/}
        <CatagoryTitle title="Nearby Your Location" btn="See All" />
        <View>
          {isLoading ? <ActivityIndicator /> :
            shops.slice(0, 3).map((shop, index) => {
              return (
                <SingleShop key={index} shop={shop} />
              )
            })
          }
        </View>
        {/* most popular part*/}
        <CatagoryTitle title="Most Popular" btn="See All" />
        <View>
          {isLoading ? <ActivityIndicator /> :
            shops.reverse().slice(0, 6).map((shop, index) => {
              return (
                <View key={index}>{
                  shop.rating.reduce((a, b) => a + b) / shop.rating.length > 4 ?
                    <SingleShop shop={shop} /> : <Text preset='info' style={{ position: 'absolute', top: 10, left: 10 }}>NO MORE SHOP IS THAT MUCH POPULAR</Text>
                }
                </View>
              )
            })
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  catagory: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing[2],
  },
  catagoryListStyle: {
    width: 90,
    height: 100,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  singleCatagory: {
    width: 80,
    height: 100,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: 10,
    marginTop: 5,
  },
  catagoryImage: {
    marginVertical: spacing[2],
    borderRadius: '50%',
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#FDF1DF",
  },
  singleCatagoryText: {
    marginTop: spacing[1],
    width: '100%',
  },
  nearbyHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  shopContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    marginVertical: 5,
    borderWidth: .4,
    backgroundColor: '#fff',
    borderColor: '#f5f4f2',
    borderRadius: 10,
    shadowColor: '#f5f4f2',
    shadowOffset: { width: 3, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  innerShopContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10
  },
  img: {
    width: 60,
    height: 60,
    borderRadius: 5
  },
  middleDiv: {
    marginHorizontal: 10,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    height: 60,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  locationText: {
    fontSize: 12,
    marginHorizontal: 5
  },
  locationAndRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 1
  },
  ratingText: {
    fontSize: 12,
    marginHorizontal: 5
  },
  bookmarkIcon: {
    alignSelf: 'flex-start',
    paddingHorizontal: 5,
  }

})