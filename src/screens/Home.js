import { ActivityIndicator, Pressable, RefreshControl, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Text from '../components/Text/Text'
import { colors } from '../theme/colors'
import { spacing } from '../theme/spacing'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../components/Home/Header/Header'
import Slider from '../components/Home/Slider/Slider'
// icons package
import { Entypo } from '@expo/vector-icons';
import { catagoryList } from '../components/Home/CatagoryBox/CatagoryList';
import { LogBox } from 'react-native';
import CatagoryBox from '../components/Home/CatagoryBox/CatagoryBox'

import Image from 'react-native-image-progress';
import AsyncStorage from '@react-native-async-storage/async-storage'
import NavigationSearch from '../components/Home/Search/NavigationSearch'
import SingleShop from '../components/Home/SingleShop/SingleShop'

export default function Home({ navigation }) {
  // for watching loading and refreshing state
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // 
  const [status, setStatus] = useState('All'); // for keeping status of tab
  const [datalist, setdataList] = useState(shops); // for keeping data of shops

  const [shops, setShops] = useState([]);
  const [cart, setCart] = useState([])
  // console.log(cart)

  // const saveCart = async () => {
  //   try {
  //     await AsyncStorage.setItem('cart', JSON.stringify(cart))
  //     alert('Added to cart')
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  // // get cart items from async storage
  // const getCart = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem('cart')
  //     // console.log(value)
  //     setCart(JSON.parse(value))
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }
  // useEffect(() => {
  //   async function temp() {
  //     await getCart();
  //   }
  //   temp();
  //   return () => {}
  // }, [])

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
        <Header cart={cart} />
        {/* <Search /> */}
        <NavigationSearch />
        <Slider />
        {/* catagory list part*/}
        <CatagoryBox />
        {/* divider */}
        <View style={{ height: 1, width: '100%', backgroundColor: '#f5f4f2', marginTop: 10 }} />
        {/* suggested salons part*/}
        <CatagoryTitle title="Suggested For You" btn="See All" />
        <ScrollStatusBar />
        <View style={{ flex: 1 }}>
          {isLoading ? <ActivityIndicator /> :
            (datalist ? datalist.slice(0, 3).map((shop, index) => {
              return (
                <SingleShop key={index} shop={shop} cart={cart} setCart={setCart} visibleIcon={true} />
              )
            }) : <Text> <Entypo name='hand' ></Entypo>Tap and select to see your nearby shops</Text>)
          }
        </View>
        {/* most popular part*/}
        <CatagoryTitle title="Most Popular" btn="See All" />
        <View>
          {isLoading ? <ActivityIndicator /> :
            (datalist && datalist.slice(0, 3).map((shop, index) => {
              return (
                <View key={index}>{
                  // summing the rating array and dividing by the length of the array
                  shop.rating.reduce((a, b) => a + b) / shop.rating.length > 4 ?
                    <SingleShop shop={shop} cart={cart} setCart={setCart} visibleIcon={true} /> : <Text preset='info' style={{ position: 'absolute', top: 10, left: 10 }}>NO MORE SHOP IS THAT MUCH POPULAR</Text>
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
    width: 65,
    height: 65,
    borderRadius: 5
  },
  middleDiv: {
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    height: 60,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  avgTimeText: {
    fontSize: 12,
    marginHorizontal: 5
  },
  avgTimeAndRatingContainer: {
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