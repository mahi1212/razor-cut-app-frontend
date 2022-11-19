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
import { catagoryList } from '../components/Home/CatagoryTitle/CatagoryList';
import { LogBox } from 'react-native';



export default function Home() {
  const { container, catagory, catagoryImage, singleCatagoryText, catagoryListStyle } = styles;
  // for watching loading and refreshing state
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // 
  const [status, setStatus] = useState('All'); // for keeping status of tab
  const [datalist, setdataList] = useState(data);
  const [data, setData] = useState([]);

  const [catagories, setCatagories] = useState([]);
  const [shops, setShops] = useState([]);

  const getTest = () => {
    fetch(`http://192.168.0.221:5000/test`)
      .then(res => res.json())
      .then(data => {
        setData(data)
      }).catch(err => {
        console.log(err)
      })
  }

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
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    getCatagories();
    getShops();
    getTest();
    setStatusFilter(status);
  }, []);

  const setStatusFilter = status => {
    setIsLoading(true)
    if (status === 'All') {
      setdataList(data);
      setIsLoading(false)
    } else {
      const newData = data.filter(item => item.status === status);
      setdataList(newData);
      setIsLoading(false)
    }
  }

  // call it for the first time
  const executeOnLoad = () => {
    setStatusFilter('All');
  };

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

        <Pressable
          onPress={() => { console.log(_id) }}
          style={bookmarkIcon}>
          <MaterialCommunityIcons name="bookmark-minus" size={30} color={colors.orange} />
        </Pressable>

      </Pressable>
    )
  }

  // Here is main function code 
  return (
    <SafeAreaView style={{ flex: 1, marginHorizontal: spacing[2], }} onLayout={executeOnLoad}>
      <ScrollView style={container} showsVerticalScrollIndicator={false} refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={getTest}
        />
      }>
        <Header />
        <Search />
        <Slider />
        {/* catagory list part*/}
        <View style={{ flex: 1 }}>
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
        </View>
        {/* divider */}
        <View style={{ height: 1, width: '100%', backgroundColor: '#f5f4f2', marginTop: 10 }} />
        {/* nearby salons part*/}
        <CatagoryTitle title="Nearby Your Location" btn="See All" />
        <ScrollStatusBar />
        <View style={{ flex: 1 }}>
          {isLoading ? <ActivityIndicator /> :
            (datalist ? datalist.slice(0, 5).map((shop, index) => {
              return (
                <SingleShop key={index} shop={shop} />
              )
            }) : <Text> <Entypo name='hand' ></Entypo>Tap and select to see your nearby shops</Text>)
          }
          {/* <FlatList
            data={datalist}
            keyExtractor={item => item.status}
            renderItem={renderShops}
            extraData={status}
          /> */}
        </View>
        {/* most popular part*/}
        <CatagoryTitle title="Most Popular" btn="See All" />
        <View>
          {isLoading ? <ActivityIndicator /> :
            (datalist && datalist.reverse().slice(0,3).map((shop, index) => {
              return (
                <View key={index}>{
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