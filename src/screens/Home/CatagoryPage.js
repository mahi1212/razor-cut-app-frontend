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
        fetch(`http://172.20.10.2:5000/shops`)
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
                        const sum = item.review.reduce((total, review) => total + review.rating, 0);
                        const average = sum / item.review.length;
                        return (
                            <SingleShop key={index.toString()} shop={item} avg={average} cart={cart} setCart={setCart} />
                        )
                    }
                })
                // well done mahi :D
            }

        </View>
    )
}