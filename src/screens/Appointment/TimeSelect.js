import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Switch } from 'react-native';

export default function TimeSelect() {
    const [checked1, setChecked1] = useState(false);
    const [checked2, setChecked2] = useState(false);
    const [checked3, setChecked3] = useState(false);
    const [checked4, setChecked4] = useState(false);
    const [checked5, setChecked5] = useState(false);
    const [checked6, setChecked6] = useState(false);
    const [checked7, setChecked7] = useState(false);
    const [checked8, setChecked8] = useState(false);
    const [checked9, setChecked9] = useState(false);
    const [checked10, setChecked10] = useState(false);
    const [checked11, setChecked11] = useState(false);
    const [checked12, setChecked12] = useState(false);
    const [checkedCount, setCheckedCount] = useState(0);
    const handleCheck = (value, setChecked) => {
        if (checkedCount < 2) {
          setChecked(!value);
          setCheckedCount(checkedCount + 1);
        }
      }
    return (
        <View>
            {/* 8-11 */}
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                <View style={{ alignItems: 'center' }}>
                    <Text>8:00-9:00</Text>
                    <Switch
                        value={checked1}
                        onValueChange={() => handleCheck(checked1, setChecked1)}
                    />
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Text>9:00-10:00</Text>
                    <Switch
                        value={checked2}
                        onValueChange={() => handleCheck(checked2, setChecked2)}
                    />
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Text>10:00-11:00</Text>
                    <Switch
                        value={checked3}
                        onValueChange={() => handleCheck(checked3, setChecked3)}
                    />
                </View>
            </View>
            {/* 11-14 */}
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginTop: 10 }}>
                <View style={{ alignItems: 'center' }}>
                    <Text>11:00-12:00</Text>
                    <Switch
                        value={checked4}
                        onValueChange={setChecked4}
                    />
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Text>12:00-13:00</Text>
                    <Switch
                        value={checked5}
                        onValueChange={setChecked5}
                    />
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Text>13:00-14:00</Text>
                    <Switch
                        value={checked6}
                        onValueChange={setChecked6}
                    />
                </View>

            </View>
            {/* 15-18 */}
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginTop: 10 }}>
                <View style={{ alignItems: 'center' }}>
                    <Text>15:00-16:00</Text>
                    <Switch
                        value={checked7}
                        onValueChange={setChecked7}
                    />
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Text>16:00-17:00</Text>
                    <Switch
                        value={checked8}
                        onValueChange={setChecked8}
                    />
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Text>17:00-18:00</Text>
                    <Switch
                        value={checked9}
                        onValueChange={setChecked9}
                    />
                </View>
            </View>
            {/* 19-22 */}
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginTop: 10 }}>
                <View style={{ alignItems: 'center' }}>
                    <Text>19:00-20:00</Text>
                    <Switch
                        value={checked10}
                        onValueChange={setChecked10}
                    />
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Text>20:00-21:00</Text>
                    <Switch
                        value={checked11}
                        onValueChange={setChecked11}
                    />
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Text>21:00-22:00</Text>
                    <Switch
                        value={checked12}
                        onValueChange={setChecked12}
                    />
                </View>
            </View>
        </View>

    )
}