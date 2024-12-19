import { ActivityIndicator, BackHandler, Button, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC, useEffect, useRef, useState } from 'react'
import SafeScreen from '../../components/common/SafeScreen'
import { useNavigation } from '@react-navigation/native'
import colors from '../../constants/colors'
import TransactionList from '../../components/transactions/TransactionList'
import { TransactionSummary } from '../../components/transactions/TransactionSummary'
import { Category, Transaction, TransactionsByMonth } from '../../../types'
import { getTransaction } from '../../redux/action/transactionAction'
import { getCategories } from '../../redux/action/categoriesAction'
import { useTypedSelector } from '../../hooks'
import AddTransaction from '../../components/transactions/AddTransaction'
import Card from '../../components/common/Card'
import { useDispatch } from 'react-redux'
import { IconButton } from 'react-native-paper'
import ArrowHeader from '../../components/common/ArrowHeader'
import SelectDropdown from 'react-native-select-dropdown'
import Icon from 'react-native-vector-icons/FontAwesome'
import { commonStyles } from '../../constants/commonStyles'
import { Logout } from '../../redux/action/logoutAction'
type DashBoardProp = {

}

const DashBoard: FC<DashBoardProp> = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch<any>()
    const dropDownRef = useRef<any>()
    const [dbLoaded, setDbLoaded] = React.useState<boolean>(false);
    const transaction = useTypedSelector((state) => state.transactions)
    const categories = useTypedSelector((state) => state.categories) || null
    const [selectedCategoryId, setSelectedCategoryId] = useState<number>(0)
    const [addModalVisile, setAddModalVisible] = useState<boolean>(false)
    const [transactionsByMonth, setTransactionsByMonth] =
        React.useState<TransactionsByMonth>({
            totalExpenses: 0,
            totalBudget: 0,
        });
    useEffect(() => {
        getData().then(() => (setDbLoaded(true)))
            .catch((e) => console.log(e))
    }, [])

    useEffect(() => {
        const backAction = () => {
            BackHandler.exitApp()
            return true;
        };
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );
        return () => backHandler.remove();
    }, []);

    async function getData() {
        try {
            await dispatch(getTransaction("?_sort=date&_order=desc")),
                await dispatch(getCategories(''))
            // Get the start and end of the current month in JavaScript Date format
            const now = new Date();
            const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
            const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

            // Filter transactions to include only those within the current month
            const filteredTransactions = transaction.data && transaction.data.filter((transaction: any) => {
                const transactionDate = new Date(transaction.date * 1000); // Convert Unix timestamp to Date
                return transactionDate >= startOfMonth && transactionDate <= endOfMonth;
            });

            // Calculate total expenses and total Budget for the month
            const totalExpenses = filteredTransactions
                .filter((transaction: any) => transaction.type === "Expense")
                .reduce((sum: any, transaction: any) => sum + transaction.amount, 0);

            const totalBudget = filteredTransactions
                .filter((transaction: any) => transaction.type === "Budget")
                .reduce((sum: any, transaction: any) => sum + transaction.amount, 0);

            // Set the aggregated data for the current month
            setTransactionsByMonth({ totalExpenses, totalBudget });
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
    if (!dbLoaded)
        return (
            <View style={{ flex: 1 }}>
                <ActivityIndicator size={"large"} />
                <Text>Loading Database...</Text>
            </View>
        );

    return (
        <React.Suspense
            fallback={
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size={"large"} />
                    <Text>Loading Database...</Text>
                </View>
            }
        >
            <SafeScreen>
                <ArrowHeader
                    onPress={() => dispatch(Logout())}
                    side='right'
                    title='Budget Guru'
                />
                <ScrollView
                    contentContainerStyle={{
                        padding: 15,
                        gap: 10,
                        paddingVertical: Platform.OS === "ios" ? 170 : 16,
                    }}
                >
                    <View style={{ padding: 5, margin: 5 }}>
                        <TransactionSummary
                            totalExpenses={transactionsByMonth.totalExpenses}
                            totalBudget={transactionsByMonth.totalBudget}
                        />
                    </View>
                    <Card>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[commonStyles.text15, { fontWeight: 'bold' }]}>Sort By</Text>
                                <IconButton
                                    icon={'filter-check-outline'}
                                    size={24}
                                    iconColor={colors.COLORPRIMARY}
                                    style={{ margin: 0, padding: 0 }}
                                />
                            </View>
                            <IconButton
                                icon={'minus-circle-outline'}
                                size={24}
                                iconColor={colors.COLORPRIMARY}
                                style={{ margin: 0, padding: 0 }}
                                onPress={() => {
                                    setSelectedCategoryId(0)
                                    dropDownRef.current.reset()
                                }}
                            />
                        </View>
                        {categories && <SelectDropdown
                            ref={dropDownRef}
                            data={categories.data.length && categories.data.map((item: any) => item)}
                            onSelect={(selectedItem, index) => {
                                setSelectedCategoryId(selectedItem.id)
                            }}

                            renderButton={(selectedItem, isOpened) => {
                                return (
                                    <View style={styles.dropdownButtonStyle}>
                                        <Text style={styles.dropdownButtonTxtStyle}>
                                            {(selectedItem && selectedItem.name) || 'Select Category'}
                                        </Text>
                                        <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
                                    </View>
                                );
                            }}
                            renderItem={(item, index, isSelected) => {
                                return (
                                    <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
                                        <Text style={styles.dropdownItemTxtStyle}>{item.name}</Text>
                                    </View>
                                );
                            }}
                            showsVerticalScrollIndicator={true}
                            dropdownStyle={styles.dropdownMenuStyle}

                        />}
                    </Card>
                    <TransactionList
                        categories={categories.data}
                        transactions={selectedCategoryId != 0 ? transaction.data && transaction.data.filter((ele: Transaction) => selectedCategoryId == ele.category_id) : transaction.data}
                    />

                </ScrollView>
                <IconButton
                    icon={'plus'}
                    iconColor='white'
                    style={{
                        backgroundColor: colors.COLORPRIMARY,
                        position: 'absolute',
                        right: 12,
                        bottom: 30
                    }}
                    size={35}
                    onPress={() => setAddModalVisible(true)}
                />
                <IconButton
                    icon={'view-list-outline'}
                    iconColor='white'
                    style={{
                        backgroundColor: colors.COLORPRIMARY,
                        position: 'absolute',
                        right: 12,
                        bottom: 100
                    }}
                    size={35}
                    onPress={() => navigation.navigate("BudgetList")}
                />
                <AddTransaction isVisible={addModalVisile} onPress={() => setAddModalVisible(false)} />
            </SafeScreen>
        </React.Suspense>
    )
}

export default DashBoard

const styles = StyleSheet.create({
    backDrop: {
        width: "100%",
        height: 200,
        borderBottomLeftRadius: "50%",
        borderBottomRightRadius: "50%",
        backgroundColor: colors.COLORPRIMARY
    },
    quickAccessCard: {
        flexWrap: 'wrap',
        marginHorizontal: 15,
        flexDirection: 'row',
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        justifyContent: 'center',
        marginBottom: 10,
        alignSelf: 'center',
        position: 'absolute',
        top: 130,
        padding: 10,
        minHeight: 150,
    },
    userNameText: {
        position: 'absolute',
        top: 80,
        textAlign: 'left',
        color: colors.WHITE,
        fontSize: 20,
        marginLeft: 10
    },
    periodTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 15,
    },
    bottomText: {
        color: colors.COLORPRIMARY,
        fontSize: 14,
        textDecorationLine: "underline",
        textAlign: 'center',
        width: '100%',
        marginTop: 10
    },
    dropdownButtonStyle: {
        marginTop: 10,
        width: '100%',
        height: 50,
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 12,
    },
    dropdownButtonTxtStyle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '500',
        color: 'black',

    },
    dropdownButtonArrowStyle: {
        fontSize: 28,
    },
    dropdownButtonIconStyle: {
        fontSize: 28,
        marginRight: 8,
    },
    dropdownMenuStyle: {
        backgroundColor: '#E9ECEF',
        borderRadius: 8,
        height: 150

    },
    dropdownItemStyle: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
        color: 'black',
    },
    dropdownItemTxtStyle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '500',
        color: 'black',
    },
    dropdownItemIconStyle: {
        fontSize: 28,
        marginRight: 8,
    },
})