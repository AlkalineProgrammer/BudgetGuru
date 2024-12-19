import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Modal, Image, TouchableOpacity } from 'react-native';
import { Card, IconButton, Avatar, Divider } from 'react-native-paper';
import colors from '../../constants/colors';
import { commonStyles } from '../../constants/commonStyles';

interface FullScreenModalProps {
    visibility: boolean;
    innerheight: number;
    margin: number;
    onPress: () => void;
    children: React.ReactNode;
    title: string
}

const FullScreenModal: React.FC<FullScreenModalProps> = (props) => {
    return (
        <View>
            <Modal
                animationType='fade'
                transparent
                visible={props.visibility}
            >
                <View style={styles.centeredView}>
                    <View style={{ flex: 1, justifyContent: "center" }}>
                        <Card style={{ marginHorizontal: 20, borderRadius: 10, padding: 10, height: props.innerheight, margin: props.margin }}>
                            <IconButton
                                icon="close"
                                iconColor={colors.COLORPRIMARY}
                                size={22}
                                onPress={props.onPress}
                            />
                            <View style={{ justifyContent: 'center', alignSelf: 'center' }}>
                                <Text style={commonStyles.text18Bold}>{props.title}</Text>
                            </View>
                            {props.children}
                        </Card>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

export default FullScreenModal;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 10
    },

    CardView: {
        marginHorizontal: 20,
        borderRadius: 10,
        paddingTop: 10,
        alignSelf: "center"
    }
});

