import { FlatList, View } from 'react-native'
import React from 'react'
import Text from '../components/Text/Text'
import PageHeader from '../components/Home/PageHeader/PageHeader'
import Search from '../components/Home/Search/Search'
import { spacing } from '../theme/spacing'
import SingleShop from '../components/Home/SingleShop/SingleShop'

export default function CatagoryPage({ route }) {
    const { text } = route.params
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
        <View style={{ marginHorizontal: spacing[3] }}>
            <PageHeader title={text} />
            <View style={{marginTop: -spacing[2]}}>
                <Search searchText={searchText} setSearchText={setSearchText} />
            </View>
            {
                // shop that contains the catagory text
                searchResults.filter((item) => {
                    return item.status.toLowerCase().includes(text.toLowerCase())
                }
                ).map((item) => {
                    return (
                        <View style={{
                            width: '100%',
                            marginTop: spacing[3]
                        }}>
                            <SingleShop key={item.name} shop={item} cart={cart} setCart={setCart} visibleIcon={false} />
                            {/* {item.name} */}
                        </View>
                    )
                })
            }
            
        </View>
    )
}