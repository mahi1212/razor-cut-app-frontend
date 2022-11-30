import { View, Text, FlatList, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import PageHeader from '../components/Home/PageHeader/PageHeader';
import Search from '../components/Home/Search/Search';
import { spacing } from '../theme/spacing';
import SingleShop from '../components/Home/SingleShop/SingleShop';
import { colors } from '../theme/colors';
import { catagoryList } from '../components/Home/CatagoryBox/CatagoryList';

export default function SeeAll({ route }) {
  const [status, setStatus] = useState('All');
  const [searchText, setSearchText] = React.useState("")


  const [filterData, setFilterData] = React.useState([])
  const [masterData, setMasterData] = React.useState([])

  const [shops, setShops] = useState([]);
  
  const { title } = route.params;
  const [cart, setCart] = useState([])

  const getShops = () => {
    fetch(`http://192.168.0.221:5000/shops`)
      .then(res => res.json())
      .then(data => {
        setShops(data)
        setFilterData(data);
        setMasterData(data);
      }).catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    getShops();
    setStatusFilter(status);
    return () => {
      // cleanup
    }
  }, []);

  // filtering data by active status tab
  const setStatusFilter = status => {
    if (status === 'All') {
      getShops();
    } else {
      fetch(`http://192.168.0.221:5000/catagoryShops/${status}`)
        .then(res => res.json())
        .then(data => {
          setFilterData(data);
          setShops(data);
        }).catch(err => {
          console.log(err)
        })
    }
  }

  // console.log(title)
  // console.log(datalist)
  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = shops.filter((item) => {
        // Applying filter for the inserted text in search bar
        // making sure bith got matched
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1; // if true then it will be in the list
      });
      setFilterData(newData);
      setSearchText(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilterData(shops);
      setSearchText(text);
    }
  };

  // const text = title
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

  return (
    <SafeAreaView >
      <ScrollView >
        <PageHeader title={title} />
        <ScrollStatusBar />
        <View style={{ paddingHorizontal: spacing[2] }}>
          <Search searchText={searchText} setSearchText={setSearchText} searchFilterFunction={searchFilterFunction} />
        </View>
        {/* showing shops in flatlist */}
        {
          shops.length > 0 ?
            <FlatList
              data={filterData}
              renderItem={({ item }) => <SingleShop shop={item} />}
              keyExtractor={item => item._id}
            />
            :
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text preset='title' style={{ color: colors.darkOrange }}>No Shops Found</Text>
            </View>
        }
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  flatListContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
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