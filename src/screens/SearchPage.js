import { View, Text, ScrollView, FlatList } from 'react-native'
import React from 'react'
import Search from '../components/Home/Search/Search'
import { spacing } from '../theme/spacing'
import PageHeader from '../components/Home/PageHeader/PageHeader'
import SingleShop from '../components/Home/SingleShop/SingleShop'

export default function SearchPage() {
    const [searchText, setSearchText] = React.useState("")
    const [searchResults, setSearchResults] = React.useState([])
    const [cart, setCart] = React.useState([])
    React.useEffect(() => {
        if (searchText.length > 0) {
            fetch(`http://192.168.0.221:5000/shops`)
                .then(res => res.json())
                .then(data => {
                    setSearchResults(data)
                }).catch(err => {
                    console.log(err)
                })
        }
    }, [searchText])

    return (
        <View style={{ flex: 1, marginHorizontal: spacing[2] }}>
            <PageHeader title="Search" />
            {/* search component */}
            <View style={{ marginTop: -15 }}>
                <Search searchText={searchText} setSearchText={setSearchText} />
            </View>
            {/* showing data filtering by shop name*/}
            <Text>
                {
                    searchResults.filter((item) => {
                        return item.name.toLowerCase().includes(searchText.toLowerCase())
                    }
                    ).map((item) => {
                        return (
                            <FlatList
                                data={searchResults}
                                contentContainerStyle={{  width: '100%'}}
                                renderItem={({ item }) => 
                                    <SingleShop key={item.name} shop={item} cart={cart} setCart={setCart} visibleIcon={false} />
                                }
                                keyExtractor={item => item.name}
                            />
                        )
                    }
                    )
                }
            </Text>
        </View>
    )
}