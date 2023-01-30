import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Text from "../../components/Text/Text";
import { colors } from "../../theme/colors";
import { spacing } from "../../theme/spacing";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Home/Header/Header";
import Slider from "../../components/Home/Slider/Slider";
// icons package
import { Entypo } from "@expo/vector-icons";
import { catagoryList } from "../../components/Home/CatagoryBox/CatagoryList";
import { LogBox } from "react-native";
import CatagoryBox from "../../components/Home/CatagoryBox/CatagoryBox";

import Image from "react-native-image-progress";
import NavigationSearch from "../../components/Home/Search/NavigationSearch";
import SingleShop from "../../components/Home/SingleShop/SingleShop";
import CatagoryTitle from "../../components/Home/CatagoryTitle/CatagoryTitle";

export default function Home() {
  // for watching loading and refreshing state
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState("All"); // for keeping status of tab

  const [shops, setShops] = useState([]);
  const [cart, setCart] = useState([]);


  const getShops = () => {
    setIsLoading(true);
    // 192.168.0.221
    fetch(`http://192.168.0.221:5000/shops`)
      .then((res) => res.json())
      .then((data) => {
        setShops(data);
        setRefreshing(false);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    // ignore warning of FlatList in console
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
    getShops();
    setStatusFilter(status);
  }, []);

  // console.log(cart)
  console.log(shops)


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


  const setStatusFilter = (status) => {
    setIsLoading(true);
    if (status === "All") {
      getShops();
    } else {
      setIsLoading(true);
      // https://good-pink-ant-slip.cyclic.app/
      fetch(`http://192.168.0.221:5000/catagoryShops/${status}`)
        .then((res) => res.json())
        .then((data) => {
          setShops(data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  // status tab scrolling- Common component
  const ScrollStatusBar = () => {
    const {
      flatListContainer,
      activeCatagoryButton,
      catagoryButton,
      selectedItemText,
      normalItemText,
    } = styles;
    return (
      <ScrollView
        horizontal={true}
        contentContainerStyle={flatListContainer}
        showsHorizontalScrollIndicator={false}
      >
        {catagoryList.map((item, index) => {
          return (
            // under suggested for you title
            <TouchableOpacity
              key={index}
              style={
                item.status === status ? activeCatagoryButton : catagoryButton
              }
              onPress={() => {
                // console.log(`Pressed in ${item.status}`)
                setStatus(item.status);
                setStatusFilter(item.status);
              }}
            >

              <Text
                preset="title"
                style={
                  item.status === status ? selectedItemText : normalItemText
                }
              >
                {item.status}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  };

  // Here is main function code
  return (
    <SafeAreaView style={{ flex: 1, marginHorizontal: spacing[2] }} onLayout={refreshing}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            // every refresh call getShops function
            refreshing={refreshing}
            onRefresh={getShops}
          />
        }
      >
        <Header cart={cart} />
        <NavigationSearch />
        <Slider />
        {/* catagory list part*/}
        <CatagoryBox />
        {/* divider */}
        <View
          style={{
            height: 1,
            width: "100%",
            backgroundColor: "#f5f4f2",
            marginTop: 10,
          }}
        />
        {/* suggested salons part*/}
        <CatagoryTitle title="Suggested For You" btn="See All" />
        <ScrollStatusBar />
        <View style={{ flex: 1 }}>
        {isLoading ? (
            <ActivityIndicator />
          ) : (
            shops &&
            shops
              .slice(0, 3)
              .map((shop, index) => {
                const sum = shop.review.reduce((total, review) => total + review.rating, 0);
                const average = sum / shop.review.length;
                return (
                  <View key={index}>
                    {
                      average > 4 ?
                        (
                          <SingleShop
                            shop={shop}
                            cart={cart}
                            setCart={setCart}
                            visibleIcon={true}
                            avg={average}
                          />
                        )
                        : (
                          <Text
                            preset="info"
                            style={{ position: "absolute", top: 10, left: 10 }}
                          >
                            NO MORE SHOP IS THAT MUCH POPULAR
                          </Text>
                        )
                    }
                  </View>
                );
              })
          )}
        </View>
        {/* most popular part*/}
        <CatagoryTitle title="Most Popular" btn="See All" />
        <View>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            shops &&
            shops
              .reverse()
              .slice(0, 5)
              .map((shop, index) => {
                const sum = shop.review.reduce((total, review) => total + review.rating, 0);
                const average = sum / shop.review.length;
                return (
                  <View key={index}>
                    {
                      average > 4 ?
                        (
                          <SingleShop
                            shop={shop}
                            cart={cart}
                            setCart={setCart}
                            visibleIcon={true}
                            avg={average}
                          />
                        )
                        : (
                          <Text
                            preset="info"
                            style={{ position: "absolute", top: 10, left: 10 }}
                          >
                            NO MORE SHOP IS THAT MUCH POPULAR
                          </Text>
                        )
                    }
                  </View>
                );
              })
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Styles for home screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  nearbyHeading: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  shopContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    marginVertical: 5,
    borderWidth: 0.4,
    backgroundColor: "#fff",
    borderColor: "#f5f4f2",
    borderRadius: 10,
    shadowColor: "#f5f4f2",
    shadowOffset: { width: 3, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  innerShopContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
  },
  img: {
    width: 65,
    height: 65,
    borderRadius: 5,
  },
  middleDiv: {
    paddingHorizontal: 10,
    justifyContent: "space-between",
    alignItems: "flex-start",
    height: 60,
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
  },
  avgTimeText: {
    fontSize: 12,
    marginHorizontal: 5,
  },
  avgTimeAndRatingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 1,
  },
  ratingText: {
    fontSize: 12,
    marginHorizontal: 5,
  },
  bookmarkIcon: {
    alignSelf: "flex-start",
    padding: 5,
  },
  removeBookmarkIcon: {
    alignSelf: "flex-start",
    padding: 5,
  },
  flatListContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  activeCatagoryButton: {
    width: 100,
    backgroundColor: colors.darkOrange,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: "50%",
    marginHorizontal: 3,
  },
  catagoryButton: {
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: "50%",
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
});
