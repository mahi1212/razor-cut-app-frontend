import { Dimensions, FlatList, Image, Pressable, RefreshControl, ScrollView, StyleSheet, View } from 'react-native'
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
import { catagoryList, singleCatagoryList } from '../components/Home/CatagoryTitle/CatagoryList'
const width = Dimensions.get('window').width;

export default function Home() {
  const { container, catagory, catagoryImage, singleCatagoryText,catagoryListStyle } = styles;
  const [refreshing, setRefreshing] = useState(false);
  // const [userData, setUserData] = useState([]);
  // useEffect(() => {
  //   loadUserData();
  // }, []);

  // const loadUserData = () => {
  //   fetch('https://randomuser.me/api/?results=8')
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setRefreshing(false);
  //       var newdata = userData.concat(data);
  //       setUserData(newdata);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

  // const ItemView = ({ item }) => {
  //   return (
  //     <Text
  //       style={{
  //         fontSize: 20,
  //         padding: 10,
  //       }}>
  //       {item.id}: {item.name}
  //     </Text>
  //   );
  // };

  // {/* <FlatList
  //     data={userData}
  //     keyExtractor={(item, index) => index.toString()}
  //     ItemSeparatorComponent={ItemSeparatorView}
  //     enableEmptySections={true}
  //     renderItem={ItemView}
  //   /> */}

  const SingleCatagory = ({ text, icon }) => {
    return (
      <View style={catagoryListStyle}>
        <Pressable onPress={() => console.log(text)} style={{alignItems: 'center', justifyContent: 'center'}}>
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
  return (
    <SafeAreaView style={{ flex: 1, marginHorizontal: spacing[2], }}>
      <ScrollView style={container} refreshControl={
        <RefreshControl
          refreshing={refreshing}
        // onRefresh={loadUserData}
        />
      }>
        <Header />
        <Search />
        <Slider />
        {/* catagory list*/}
        <FlatList
          data={singleCatagoryList}
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
    width: 89,
    height: 100,
    borderRadius: 10,
    marginHorizontal: spacing[1],
    marginRight: spacing[2],
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