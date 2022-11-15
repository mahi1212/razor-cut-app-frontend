import { FlatList, RefreshControl, ScrollView, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Text from '../components/text/text'
import { colors } from '../theme/colors'
import { spacing } from '../theme/spacing'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../components/Home/Header/Header'
import Search from '../components/Home/Search/Search'
import Slider from '../components/Home/Slider/Slider'

export default function Home() {
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
  return (
    <SafeAreaView style={{ flex: 1, marginHorizontal: spacing[2], }}>
      <ScrollView style={styles.container} refreshControl={
        <RefreshControl
          refreshing={refreshing}
          // onRefresh={loadUserData}
        />
      }>
        <Header />
        <Search />
        <Slider />
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
    paddingHorizontal: spacing[1],
  },
})