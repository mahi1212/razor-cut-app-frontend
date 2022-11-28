import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import Search from '../components/Home/Search/Search'
import { SafeAreaView } from 'react-native-safe-area-context'
import { spacing } from '../theme/spacing'
import PageHeader from '../components/Home/PageHeader/PageHeader'
import SingleShop from '../components/Home/SingleShop/SingleShop'

export default function SearchPage() {
    const [searchText, setSearchText] = React.useState("")
    const [searchResults, setSearchResults] = React.useState([])

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
    console.log(searchResults)
    return (
        <View style={{ flex: 1, marginHorizontal: spacing[2] }}>
            <PageHeader title="Search" />
            <View style={{ marginTop: -15 }}>
                <Search searchText={searchText} setSearchText={setSearchText} />
            </View>
            <Text>
                {
                    searchResults.filter((item) => {
                        return item.name.toLowerCase().includes(searchText.toLowerCase())
                    }
                    ).map((item) => {
                        return (
                            <SingleShop key={item.id} shop={item} cart={''} />
                        )
                    }
                    )
                }
            </Text>
        </View>
    )
}