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
const width = Dimensions.get('window').width;
export default function Home() {
  const { container, catagory, singleCatagory, catagoryImage, singleCatagoryText } = styles;
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

  // const ItemSeparatorView = () => {
  //   return (
  //     <View
  //       style={{
  //         height: 1,
  //         width: '100%',
  //         backgroundColor: '#C8C8C8',
  //       }}
  //     />
  //   );
  // };

  const SingleCatagory = ({ text, name }) => {
    return (
      <View style={singleCatagory}>
        <Pressable onPress={() => console.log(text)}>
          <View style={catagoryImage} >
            <Entypo name={name} size={28} color={colors.orange} />
          </View>
          <Text preset='title' style={singleCatagoryText}>{text}</Text>
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
        <View style={catagory}>
          <SingleCatagory text="Haircuts" name="scissors" />
          <SingleCatagory text="Make Up" name="flat-brush" />
          <SingleCatagory text="Manicure" name="hand" />
          <SingleCatagory text="Massage" name="man" />
        </View>
        {/* divider */}
        <View style={{ height: 1, width: '100%', backgroundColor: '#f5f4f2', marginVertical: 35 }} />


      </ScrollView>
      {/* <FlatList
      data={userData}
      keyExtractor={(item, index) => index.toString()}
      ItemSeparatorComponent={ItemSeparatorView}
      enableEmptySections={true}
      renderItem={ItemView}
    /> */}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  catagory: {
    flexDirection: 'row',
    width: width,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  singleCatagory: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    marginTop: 30,
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
  }
})