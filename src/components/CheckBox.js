import React from "react"
import { Image, StyleSheet, TouchableOpacity, View } from "react-native"
import { defaultStyles } from "../styles/defaultStyles"

export default props => {
    return (
        <TouchableOpacity onPress={props.func}>
            <View style={[styles.container, defaultStyles.checkBox]}>
                {
                    props.checked
                    ?   <Image
                            source={require('../icons/check.png')}
                            style={{
                                height: 16,
                                width: 16
                            }}
                        />
                    : false
                }
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 20,
        width: 20,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },
})