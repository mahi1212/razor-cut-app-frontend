import { View, Text, ScrollView, FlatList, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import Search from '../components/Home/Search/Search'
import { spacing } from '../theme/spacing'
import PageHeader from '../components/Home/PageHeader/PageHeader'
import SingleShop from '../components/Home/SingleShop/SingleShop'
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors'
import { useEffect } from 'react'

export default function SearchPage() {
    const [searchText, setSearchText] = React.useState("")
    const [cart, setCart] = React.useState([])

    const [filterData, setFilterData] = React.useState([])
    const [masterData, setMasterData] = React.useState([])


    const fetchShops = () => {
        fetch(`http://192.168.0.121:5000/shops`)
            .then(res => res.json())
            .then(data => {
                // setSearchResults(data);
                setFilterData(data);
                setMasterData(data);
            }).catch(err => {
                console.log(err)
            })
    }
    useEffect(() => {
        fetchShops()
        return () => {
            // cleanup
        }
    }, [])

    const searchFilterFunction = (text) => {
        // Check if searched text is not blank
        if (text) {
            // Filter the masterDataSource
            // Update FilteredDataSource
            const newData = masterData.filter((item) => {
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
            setFilterData(masterData);
            setSearchText(text);
        }
    };

    return (
        <View style={{ flex: 1, marginHorizontal: spacing[2] }}>
            <PageHeader title="Search" />
            {/* search component */}
            <View style={{marginTop: -spacing[2]}}>
                <Search searchText={searchText} setSearchText={setSearchText} searchFilterFunction={searchFilterFunction} />
            </View>
            {/* showing data filtering by shop name*/}
            <FlatList
                data={filterData}
                renderItem={({ item, index }) =>
                    <SingleShop key={index} shop={item} cart={cart} setCart={setCart} visibleIcon={false} />
                }
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    )
}