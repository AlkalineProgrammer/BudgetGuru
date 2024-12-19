import React, { useState, useEffect, FC } from 'react';
import {
    View,
    Text,
    StyleSheet,
    StyleProp,
    TextStyle,
    ViewStyle,
    TextInput as PasswordTextStyle
} from 'react-native';
import { TextInput } from 'react-native-paper'
import Util from '../../utils';
import { commonStyles } from '../../constants/commonStyles';
import colors from '../../constants/colors';
import { IconButton } from 'react-native-paper';

type KeyboardType =
    | 'default'
    | 'number-pad'
    | 'decimal-pad'
    | 'numeric'
    | 'email-address'
    | 'phone-pad'
    | 'url';
type KeyboardTypeIOS =
    | 'ascii-capable'
    | 'numbers-and-punctuation'
    | 'name-phone-pad'
    | 'twitter'
    | 'web-search';
type KeyboardTypeAndroid = 'visible-password';

type KeyboardTypeOptions =
    | KeyboardType
    | KeyboardTypeAndroid
    | KeyboardTypeIOS;

interface InputTextType {
    title: string,
    type: "textInput" | "textArea" | "tele" | "secure",
    capitalize?: "none" | "sentences" | "words" | "characters" | undefined
    placeHolder: string,
    value: string,
    limit?: number,
    keyboardType: KeyboardTypeOptions,
    isEditable?: boolean,
    getInputData: ((title: string, value: string, isValidate: boolean) => void),
    isMandatory?: boolean,
    style?: StyleProp<ViewStyle>
}
const InputText: FC<InputTextType> = ({
    title,
    type,
    capitalize,
    placeHolder,
    value,
    limit,
    keyboardType,
    isEditable = true,
    getInputData,
    isMandatory = false,
    style
}) => {
    const [isPasswordSecure, setIsPasswordSecure] = useState(true)
    const onSetData = (title: string, value: string) => {
        if (title == 'Contact Number') {
            Util.verifyMobile(value) ?
                getInputData(title, value, Util.verifyMobile(value)) :
                getInputData(title, value, Util.verifyMobile(value))
        } else if (title == 'User Name' || title == 'Member Name') {
            Util.verifyAlpahbet(value) ?
                getInputData(title, value, Util.verifyAlpahbet(value)) :
                getInputData(title, value, Util.verifyAlpahbet(value))
        } else if (title == 'Email') {
            Util.verifyEmail(value) ?
                getInputData(title, value, Util.verifyEmail(value)) :
                getInputData(title, value, Util.verifyEmail(value))
        } else if (title == 'Amount') {
            Util.verifyNumber(value) ?
                getInputData(title, value, Util.verifyNumber(value)) :
                getInputData(title, value, Util.verifyNumber(value))
        } else if (title == 'Purchase Year') {
            var text = /^[0-9]+$/;
            var current_year = new Date().getFullYear();
            if (value.length != 4 || !text.test(value)) {
                getInputData(title, value, false)
            } else if (Number(value) < 1920 || Number(value) > current_year) {
                getInputData(title, value, false)
            } else {
                getInputData(title, value, true)
            }
        } else {
            Util.alphaNumeric(value) ?
                getInputData(title, value, Util.alphaNumeric(value)) :
                getInputData(title, value, Util.alphaNumeric(value))
        }

    }

    return (
        //main container
        <View style={commonStyles.betweenTwoView}>
            <View style={[commonStyles.row, { marginVertical: 5 }]}>
                <Text style={commonStyles.text15}>{title}</Text>
                {isMandatory && <Text style={commonStyles.text15Red}>{"*"}</Text>}
            </View>
            {type == 'textInput' ?
                (<TextInput
                    autoCapitalize={capitalize}
                    mode="outlined"
                    underlineColor="black"
                    placeholder={placeHolder}
                    theme={{ colors: { primary: '#1488CC' } }}
                    style={[commonStyles.inputText, style]}
                    outlineStyle={{ borderWidth: 0 }}
                    maxLength={limit}
                    defaultValue={value}
                    keyboardType={keyboardType}
                    onChangeText={(value) => onSetData(title, value)}
                    editable={isEditable}
                />) :
                type == 'textArea' ?
                    (<TextInput
                        label={title}
                        mode="outlined"
                        underlineColor="black"
                        placeholder={placeHolder}
                        placeholderTextColor={colors.GREYISH}
                        theme={{ colors: { primary: '#1488CC' } }}
                        style={[commonStyles.inputArea, style]}
                        defaultValue={value}
                        maxLength={limit}
                        autoCapitalize="none"
                        numberOfLines={20}
                        multiline={true}
                        keyboardType={keyboardType}
                        onChangeText={(value: string) => onSetData(title, value)}
                        editable={isEditable}
                    />) :
                    type == 'tele' ?
                        (
                            <View style={styles.mobileInput}>
                                <TextInput mode="outlined" outlineStyle={{ borderWidth: 0 }} style={[styles.defaultText, commonStyles.text18]} defaultValue={"+91"} editable={false} />
                                <TextInput
                                    mode="outlined"
                                    placeholder={placeHolder}
                                    theme={{ colors: { primary: '#1488CC' } }}
                                    style={[styles.inputNumber, commonStyles.text16]}
                                    maxLength={limit}
                                    outlineStyle={{ borderWidth: 0 }}
                                    defaultValue={value}
                                    keyboardType={keyboardType}
                                    onChangeText={(value) => onSetData(title, value)}
                                    editable={isEditable}
                                />
                            </View>
                        ) : type == "secure" ? (
                            <View style={{ width: "100%", flexDirection: 'row' }}>
                                <TextInput
                                    mode="outlined"
                                    secureTextEntry={isPasswordSecure}
                                    style={[commonStyles.inputText, { width: "100%" }, style]}
                                    onChangeText={(value: string) => onSetData(title, value)}
                                    defaultValue={value}
                                    outlineStyle={{ borderWidth: 0 }}
                                    underlineColorAndroid="transparent"
                                    placeholder={placeHolder}
                                    theme={{ colors: { primary: '#1488CC' } }}
                                    maxLength={limit}
                                    keyboardType={keyboardType}
                                    editable={isEditable}
                                />
                                <IconButton
                                    icon={isPasswordSecure ? "eye-off" : "eye"}
                                    size={28}
                                    onPress={() => { isPasswordSecure ? setIsPasswordSecure(false) : setIsPasswordSecure(true) }}
                                    style={{ margin: 3, position: 'absolute', right: 0 }}
                                    iconColor={colors.BLACK} />
                            </View>) : null
            }
        </View >

    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#e8f5fd'
    },
    defaultText: {
        borderBottomWidth: 1,
        borderColor: '#b3b3b3',
        alignSelf: 'auto',
        fontSize: 14,
        backgroundColor: 'transparent'
    },
    mobileInput: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        // marginTop: "auto",
        // marginBottom: "auto"
        // width: "50%"
    },
    inputNumber: {
        borderBottomWidth: 1,
        borderColor: '#b3b3b3',
        width: '80%',
        backgroundColor: 'transparent',
    },
    textView: {
        borderColor: '#b3b3b3',
        borderWidth: 1,
        borderRadius: 50,
        width: '100%',
        paddingLeft: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignSelf: 'center'
    },
    titleText: {
        marginLeft: 5,
        marginTop: 10,
        marginBottom: 10,
        fontFamily: "Montserrat-Regular"
    },
    titleText2: {
        marginLeft: 18,
        marginTop: 0,
        marginBottom: 10,
        fontFamily: "Montserrat-Regular",
        fontSize: 12
    },
    submitButtonText: {
        color: colors.WHITE,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

});

export default InputText;