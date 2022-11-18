import { ActivityIndicator, ActivityIndicatorComponent, Dimensions, FlatList, Image, Pressable, RefreshControl, ScrollView, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Text from '../components/text/text'
import { colors } from '../theme/colors'
import { spacing } from '../theme/spacing'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../components/Home/Header/Header'
import Search from '../components/Home/Search/Search'
import Slider from '../components/Home/Slider/Slider'
import { Entypo } from '@expo/vector-icons';
import CatagoryTitle from '../components/Home/CatagoryTitle/CatagoryTitle'
import { catagoryList } from '../components/Home/CatagoryTitle/CatagoryList'
import { axios } from 'axios'
const width = Dimensions.get('window').width;

export default function Home() {
  const { container, catagory, catagoryImage, singleCatagoryText, catagoryListStyle } = styles;
  const [refreshing, setRefreshing] = useState(false);

  const [catagories, setCatagories] = useState([]);
  const [shops, setShops] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // const getServices = async () => {
  //   // https://test-service-m5rg.onrender.com/
  //   try {
  //     const res = await axios.get('https://test-service-m5rg.onrender.com/services');
  //     setCatagories(res.data);
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }
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
    const { name, image, rating, address, id } = shop;
    return (
      <Pressable style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, marginVertical: 5 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal:10}}>
          <Image source={{ uri: image }} style={{ width: 60, height: 60, borderRadius: 5 }} />
          <View style={{ marginLeft: 10, marginHorizontal: 10, paddingHorizontal: 10, justifyContent: 'space-between', alignItems:'flex-start', height: 60, }}>
            <Text preset='title' style={{ fontSize: 16 }}>{name}</Text>
            <Text preset='info' style={{ fontSize: 12, }}>{address}</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontSize: 12, color: '#000' }}>4.5</Text>
          <Entypo name="star" size={16} color={colors.orange} />
        </View>
      </Pressable>
    )
  }
  return (
    <SafeAreaView style={{ flex: 1, marginHorizontal: spacing[2], }}>
      <ScrollView style={container} refreshControl={
        <RefreshControl
          refreshing={refreshing}
        // onRefresh={loadCatagories}
        />
      }>
        <Header />
        <Search />
        <Slider />
        {/* catagory list*/}
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

        <View style={{ height: 1, width: '100%', backgroundColor: '#f5f4f2', marginTop: 15 }} />
        {/* nearby salons */}
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
  }

})