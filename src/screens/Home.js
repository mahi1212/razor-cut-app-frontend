import { ActivityIndicator, ActivityIndicatorComponent, Dimensions, FlatList, Image, Pressable, RefreshControl, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Text from '../components/text/text'
import { colors } from '../theme/colors'
import { spacing } from '../theme/spacing'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../components/Home/Header/Header'
import Search from '../components/Home/Search/Search'
import Slider from '../components/Home/Slider/Slider'
import { Entypo, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { catagoryList } from '../components/Home/CatagoryBox/CatagoryList';
import { LogBox } from 'react-native';
import CatagoryBox from '../components/Home/CatagoryBox/CatagoryBox'


export default function Home() {
  // for watching loading and refreshing state
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // 
  const [status, setStatus] = useState('All'); // for keeping status of tab
  const [datalist, setdataList] = useState(shops); // for keeping data of shops
  const [shops, setShops] = useState([]);
  // add to cart
  const [cart, setCart] = useState([])
  console.log(cart)

  const getShops = () => {
    setIsLoading(true)
    fetch(`http://192.168.0.221:5000/shops`)
      .then(res => res.json())
      .then(data => {
        setShops(data)
        setRefreshing(false)
      }).catch(err => {
        console.log(err)
      }).finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    // ignore warning of FlatList in console
    LogBox.ignoreLogs(['VirtualizedLists should never be nested', 'Require cycle:']);
    getShops();
    setStatusFilter(status);
  }, []);

  // filtering data by active status tab
  const setStatusFilter = status => {
    setIsLoading(true)
    if (status === 'All') {
      setdataList(shops);
      setIsLoading(false)
    } else {
      const newData = shops.filter(item => item.status === status);
      setdataList(newData);
      setIsLoading(false)
    }
  }

  // catagory list Title and see all - Common component
  function CatagoryTitle({ title, btn }) {
    const { headerContainer, textStyle, btnStyle } = styles;
    return (
      <View>
        <View style={headerContainer}>
          <Text preset='title' style={textStyle}>{title}</Text>
          <Pressable onPress={() => console.log('See all Pressed')

          } style={{ padding: 10 }}>
            <Text preset='title' style={btnStyle}>{btn}</Text>
          </Pressable>
        </View>
      </View >
    )
  }

  // status tab scrolling- Common component
  const ScrollStatusBar = () => {
    const { flatListContainer, activeCatagoryButton, catagoryButton, selectedItemText, normalItemText } = styles;
    return (
      <ScrollView horizontal={true} contentContainerStyle={flatListContainer} showsHorizontalScrollIndicator={false}>
        {
          catagoryList.map((item, index) => {
            return (
              <TouchableOpacity key={index}
                style={item.status === status ? activeCatagoryButton : catagoryButton}
                onPress={() => {
                  // console.log(`Pressed in ${item.status}`)
                  setStatus(item.status)
                  setStatusFilter(item.status)
                }
                }
              >
                <Text preset='title' style={item.status === status ? selectedItemText : normalItemText}>{item.status}</Text>
              </TouchableOpacity>
            )
          })
        }
      </ScrollView>
    )
  }

  // single shop design - Common component
  const SingleShop = ({ shop }) => {


    const { name, image, rating, address, _id } = shop;
    const { locationAndRatingContainer, shopContainer, innerShopContainer, img, middleDiv, info, locationText, ratingText, bookmarkIcon } = styles;
    return (
      <Pressable style={shopContainer}>

        <View style={innerShopContainer}>
          <Image source={{ uri: image }} style={img} />
          {/* middle part */}
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
        {/* bookmark icon | last half of SingleShop component*/}
        {
          cart.includes(_id) ?
            <Pressable
              onPress={() => {
                const newCart = cart.filter(item => item !== _id)
                setCart(newCart)
              }}
              style={bookmarkIcon}>
              <MaterialCommunityIcons name="bookmark-minus" size={30} color={colors.orange} />
            </Pressable>
            :
            <Pressable
              onPress={() => {
                setCart([...cart, _id])
              }}
              style={styles.removeBookmarkIcon}>
              <MaterialCommunityIcons name="bookmark-plus" size={30} color={colors.orange} />
            </Pressable>
        }
      </Pressable>
    )
  }

  // call setStatusFilter function for once in layout opening
  const executeOnLoad = () => {
    setStatusFilter('All');
  };
  // Here is main function code 
  return (
    <SafeAreaView style={{ flex: 1, marginHorizontal: spacing[2] }} onLayout={executeOnLoad}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false} refreshControl={
        <RefreshControl
          // every refresh call getShops function
          refreshing={refreshing}
          onRefresh={getShops}
        />
      }>
        <Header />
        <Search />
        <Slider />
        {/* catagory list part*/}
        <CatagoryBox />
        {/* divider */}
        <View style={{ height: 1, width: '100%', backgroundColor: '#f5f4f2', marginTop: 10 }} />
        {/* nearby salons part*/}
        <CatagoryTitle title="Nearby Your Location" btn="See All" />
        <ScrollStatusBar />
        <View style={{ flex: 1 }}>
          {isLoading ? <ActivityIndicator /> :
            (datalist ? datalist.slice(0, 3).map((shop, index) => {
              return (
                <SingleShop key={index} shop={shop} />
              )
            }) : <Text> <Entypo name='hand' ></Entypo>Tap and select to see your nearby shops</Text>)
          }
        </View>
        {/* most popular part*/}
        <CatagoryTitle title="Most Popular" btn="See All" />
        <View>
          {isLoading ? <ActivityIndicator /> :
            (datalist && datalist.reverse().slice(0, 3).map((shop, index) => {
              return (
                <View key={index}>{
                  // summing the rating array and dividing by the length of the array
                  shop.rating.reduce((a, b) => a + b) / shop.rating.length > 4 ?
                    <SingleShop shop={shop} /> : <Text preset='info' style={{ position: 'absolute', top: 10, left: 10 }}>NO MORE SHOP IS THAT MUCH POPULAR</Text>
                }
                </View>
              )
            }))
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

// Styles for home screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    padding: 5,
  },
  removeBookmarkIcon: {
    alignSelf: 'flex-start',
    padding: 5,
  },
  flatListContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textStyle: {
    marginVertical: 15,
    fontSize: 18,
    marginLeft: 5
  },
  btnStyle: {
    fontWeight: '800',
    color: colors.darkOrange
  },
  activeCatagoryButton: {
    width: 100,
    backgroundColor: colors.darkOrange,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: '50%',
    marginHorizontal: 3,
  },
  catagoryButton: {
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: '50%',
    marginHorizontal: 3,
    borderWidth: 1,
    borderColor: colors.darkOrange,
  },
  selectedItemText: {
    color: colors.white,
  },
  normalItemText: {
    color: colors.orange,
  },

})