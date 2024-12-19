import React, { Component, FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { commonStyles } from '../../constants/commonStyles';

type ErrorMessageProp = {
    message: string
}
const ErrorMessage: FC<ErrorMessageProp> = ({ message }) => {
    return (
        <>
            <Text style={[commonStyles.text12Red, { marginLeft: 10 }]}>{message}</Text>
        </>
    );
}

export default ErrorMessage;
const styles = StyleSheet.create({

})