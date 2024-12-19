import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import SafeScreen from '../../components/common/SafeScreen'
import ArrowHeader from '../../components/common/ArrowHeader'
import { useNavigation } from '@react-navigation/native'
import Card from '../../components/common/Card'
import { Category } from '../../../types'
import { PieChart, pieDataItem } from 'react-native-gifted-charts'
import { useTypedSelector } from '../../hooks'
import { pieChartData } from '../../components/charts/ChartQuery'
import { commonStyles } from '../../constants/commonStyles'

// @ts-ignore
const BudgetList: FC = () => {
    const navigation = useNavigation()
    const [pieData, setPieData] = useState<pieDataItem[]>([])
    const categories = useTypedSelector((state) => state.categories)
    useEffect(() => {
        setPieData(pieChartData(categories.data))
    }, [])
    return (
        <SafeScreen>
            <ArrowHeader
                onPress={() => navigation.goBack()}
                side='left'
                title='Budget Creator'
            />
            <View style={{ flexDirection: "row", gap: 5, justifyContent: 'space-between' }}>
                <View style={{ width: '30%', marginTop: 15 }}>
                    <PieChart
                        donut
                        showText
                        textColor="white"
                        innerRadius={50}
                        textBackgroundColor="white"
                        textBackgroundRadius={30}
                        data={pieData}
                        focusOnPress
                        inwardExtraLengthForFocused={30}
                    />

                </View>
                <View style={{ alignSelf: 'center' }}>
                    {pieData.map((ele) => {
                        return (
                            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                                <View style={{ width: 10, height: 10, backgroundColor: ele.color }} />
                                <Text>{ele?.name}</Text>
                            </View>
                        )
                    })}
                </View>
            </View>
            <View style={{ width: "100%", height: 400, position: 'absolute', bottom: 0 }}>
                <Text style={[commonStyles.text18, { marginHorizontal: 8, padding: 8 }]}>List of Allocated Budget</Text>
                <FlatList
                    data={categories.data}
                    key={(key: any) => key}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <Card style={{ width: "95%", gap: 8, margin: 10 }}>
                            <Text>Category: {item.name}</Text>
                            <Text>Remaining Budget: {item.remainingBudget}</Text>
                            <Text>Total Budget: {item.totalBudget}</Text>
                        </Card>
                    )}
                />
            </View>
        </SafeScreen>
    )
}

export default BudgetList

const styles = StyleSheet.create({})