import { FlatList, View } from 'react-native'
import React from 'react'
import Text from '../../components/Text/Text'
import PageHeader from '../../components/Home/PageHeader/PageHeader'
import Search from '../../components/Home/Search/Search'
import { spacing } from '../../theme/spacing'
import SingleShop from '../../components/Home/SingleShop/SingleShop'

export default function CatagoryPage({ route }) {
    const { text } = route.params
    const [searchText, setSearchText] = React.useState("")
    const [searchResults, setSearchResults] = React.useState([])
    const [cart, setCart] = React.useState([])
    React.useEffect(() => {
        fetch(`https://razor-cut-backend.onrender.com/shops`)
            .then(res => res.json())
            .then(data => {
                setSearchResults(data)
            }).catch(err => {
                console.log(err)
            })
    }, [])
    const searchFilterFunction = (text) => {
        console.log(text)
    }
    return (
        <View style={{ marginHorizontal: spacing[3] }}>
            <PageHeader title={text} />
            <View style={{ marginTop: -spacing[2] }}>
                <Search searchText={searchText} setSearchText={setSearchText} searchFilterFunction={searchFilterFunction} />
            </View>
            {
                // shop that contains the catagoryName(status in database) text
                searchResults.filter((item) => {
                    return item.status.toLowerCase().includes(text.toLowerCase())
                }
                ).map((item, index) => {
                    // filter by search text
                    if (item.name.toLowerCase().includes(searchText.toLowerCase())) {
                        return (
                            <SingleShop key={index.toString()} shop={item} cart={cart} setCart={setCart} />
                        )
                    }
                })
                // well done mahi :D
            }

        </View>
    )
}