

import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import FullScreenModal from '../common/FullScreenModal'
import { commonStyles } from '../../constants/commonStyles'
import { useTypedSelector } from '../../hooks'
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import colors from '../../constants/colors'
import Icon from 'react-native-vector-icons/FontAwesome'
import InputText from '../common/InputText'
import FullButtonComponent from '../common/FullButtonComponent'
import { useDispatch, useSelector } from 'react-redux'
import ErrorMessage from '../common/ErrorMessage'
import { Transaction } from '../../../types'
import { insertTransaction, resetAddTransaction } from '../../redux/action/transactionAction'
import { updateCategory } from '../../redux/action/categoriesAction'
import { ActivityIndicator } from 'react-native-paper'

type AddTransactionProp = {
    isVisible: boolean
    onPress: () => void
}

const AddTransaction: React.FC<AddTransactionProp> = ({ isVisible, onPress }) => {
    const categories = useTypedSelector((state) => state.categories)
    const addTransaction = useTypedSelector((state) => state.addTransaction)
    const [selectRemainingBudget, setSelectRemainingBudget] = useState<number>(0)
    const [req, setReq] = useState<Transaction>({
        amount: 0,
        category_id: 0,
        date: new Date().getTime(),
        id: new Date().getTime(),
        note: '',
        type: Math.random() > 0.5 ? "Budget" : "Expense"
    })
    const [isValid, setIsValid] = useState<boolean>(false)
    const dispatch = useDispatch<any>()

    const inputData = (title: string, value: string, isValidate: boolean) => {
        if (title === "Amount") {
            if (value.length == 0) {
                setIsValid(false)
            } else {
                setReq((prev) => ({
                    ...prev,
                    amount: parseFloat(value)
                }))
                setIsValid(isValidate)
            }
        } else {
            setReq((prev) => ({
                ...prev,
                note: value
            }))
        }
    }

    useEffect(() => {
        if (addTransaction.isSuccess || addTransaction.isError) {
            setReq({
                amount: 0,
                category_id: 0,
                date: new Date().getTime(),
                id: new Date().getTime() + 100,
                note: '',
                type: Math.random() > 0.5 ? "Budget" : "Expense"
            })
            setSelectRemainingBudget(0)
            onPress()
        }
        return (() => {
            dispatch(resetAddTransaction())
        })
    }, [addTransaction.isSuccess, addTransaction.isError])

    const handleAddTransaction = () => {
        dispatch(insertTransaction(req))
        dispatch(updateCategory(req.category_id, { remainingBudget: selectRemainingBudget - req.amount }))
    }

    return (
        <FullScreenModal
            innerheight={460}
            margin={5}
            visibility={isVisible}
            title='Add Transaction'
            onPress={onPress}>
            <ScrollView contentContainerStyle={{ gap: 5 }}>
                <SelectDropdown
                    data={categories.data.length && categories.data.map((item: any) => item)}
                    onSelect={(selectedItem, index) => {
                        setSelectRemainingBudget(selectedItem.remainingBudget)
                        setReq((prev) => ({
                            ...prev,
                            category_id: selectedItem.id
                        }))
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
                    showsVerticalScrollIndicator={false}
                    dropdownStyle={styles.dropdownMenuStyle}
                />
                <Text>Remaning Budget: {selectRemainingBudget}</Text>
                <InputText
                    value={req.amount.toString()}
                    keyboardType='decimal-pad'
                    getInputData={inputData}
                    placeHolder='Amount'
                    title='Amount'
                    type='textInput'
                    isMandatory={true}
                />
                {req.amount > selectRemainingBudget && <ErrorMessage message='Amount should be less than remaining budget' />}
                <InputText
                    value={req.note}
                    keyboardType='default'
                    getInputData={inputData}
                    placeHolder='Notes'
                    title='Notes'
                    type='textInput'
                />

                <FullButtonComponent
                    buttonText='Submit'
                    buttonColor={colors.COLORPRIMARY}
                    disabled={selectRemainingBudget < req.amount}
                    onPress={() => handleAddTransaction()}
                />
            </ScrollView>
        </FullScreenModal>

    )
}

export default AddTransaction

const styles = StyleSheet.create({
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