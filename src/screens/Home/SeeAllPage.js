import { View, Text, FlatList, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import PageHeader from '../../components/Home/PageHeader/PageHeader';
import Search from '../../components/Home/Search/Search';
import { spacing } from '../../theme/spacing';
import SingleShop from '../../components/Home/SingleShop/SingleShop';
import { colors } from '../../theme/colors';
import { catagoryList } from '../../components/Home/CatagoryBox/CatagoryList';
import themeContext from '../../config/themeContext';
import { useContext } from 'react';

export default function SeeAll({ route }) {
  const [status, setStatus] = useState('All');
  const [searchText, setSearchText] = React.useState("")
  const [filterData, setFilterData] = React.useState([])
  const [shops, setShops] = useState([]);
  const [cart, setCart] = useState([])
  const { title } = route.params;

      //mode
      const theme= useContext(themeContext)
  // console.log(title)

  const getShops = () => {
    fetch(`http://172.20.10.2:5000/shops`)
      .then(res => res.json())
      .then(data => {
        setShops(data)
        setFilterData(data);
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
      fetch(`http://172.20.10.2:5000/catagoryShops/${status}`)
        .then(res => res.json())
        .then(data => {
          setFilterData(data);
          setShops(data);
        }).catch(err => {
          console.log(err)
        })
    }
  }

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Filter the shops data
      // Update Filtered data
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
      // Update Filtereddata with shops data
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
    <SafeAreaView  style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView >
        <PageHeader title={title} />
        <ScrollStatusBar />
        <View style={{ paddingHorizontal: spacing[2] }}>
          <Search searchText={searchText} setSearchText={setSearchText} searchFilterFunction={searchFilterFunction} />
        </View>
        {/* showing shops in flatlist */}
        {
          title === 'Most Popular' ? (
            filterData.map((shop, index) => {
              const sum = shop.review.reduce((total, review) => total + review.rating, 0);
              const average = sum / shop.review.length;
              return (
                <View key={index}>{
                  // Checking if the average rating is greater than 4
                  average > 4 ?
                    <SingleShop shop={shop} cart={cart} setCart={setCart} visibleIcon={true} avg={average} />
                    : null
                }
                </View>
              )
            })
          ) : (
            // showing suggested shops in 
            filterData.map((shop, index) => {
              const sum = shop.review.reduce((total, review) => total + review.rating, 0);
              const average = sum / shop.review.length;
              return (
                <View key={index}>{
                    <SingleShop shop={shop} cart={cart} setCart={setCart} visibleIcon={true} avg={average} />
                }
                </View>
              )
            })
          )
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
  container:{
    flex:1,
  }
})