import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { commonStyles } from '../../constants/commonStyles'
import PropTypes from 'prop-types'
type ListBannerComponentProp = {
    type: "footer" | "header" | undefined,
    headerMsg: string
}
const ListBannerComponent: FC<ListBannerComponentProp> = ({
    type,
    headerMsg
}) => {
    return (
        <View>
            {type === 'footer' ?
                <Text style={[commonStyles.text15, styles.footerList]}>You have reached end of the list.</Text>
                :
                <Text style={[commonStyles.text15, styles.footerList]}>{headerMsg}</Text>}
        </View>
    )
}

export default ListBannerComponent

const styles = StyleSheet.create({
    footerList: {
        margin: 10,
        textAlign: 'center',
        fontWeight: '600'
    }
})