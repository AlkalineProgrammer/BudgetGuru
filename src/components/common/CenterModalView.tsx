import React, { FC, ReactNode, } from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import { Card } from 'react-native-paper';
type CenterModalViewProp = {
    height: number,
    margin: number,
    children: ReactNode,
    visibility: boolean
}

const CenterModalView: FC<CenterModalViewProp> = ({
    height,
    margin,
    children,
    visibility
}) => {
    return (
        <View>
            <Modal
                animationType='fade'
                transparent
                visible={visibility}
            >
                <View style={styles.centeredView}>
                    <View style={{ flex: 1, justifyContent: "center" }}>
                        <Card style={{ marginHorizontal: 20, borderRadius: 10, padding: 10, height, margin }}>
                            {children}
                        </Card>
                    </View>
                </View>
            </Modal>
        </View>

    );
}

export default CenterModalView;

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
