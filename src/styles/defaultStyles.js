import { StyleSheet } from "react-native"

const defaultStyles = StyleSheet.create({
    text: {
        color: '#EEF0EB',
    },
    separationLines: {
        borderBottomColor: 'rgba(198, 46, 101, 0.15)',
        borderBottomWidth: 1,
    },
    bottomLine: {
        borderBottomColor: 'rgb(198, 46, 101)',
        borderBottomWidth: 3,
    },
    popupWindow: {
        backgroundColor: '#252627',
        borderColor: 'rgba(198, 46, 101, 0.5)',
        borderWidth: 3,
    },
    textInput: {
        color: '#EEF0EB',
        backgroundColor: 'rgba(198, 46, 101, 0.15)',
        borderBottomColor: 'rgba(198, 46, 101, 0.5)',
        borderBottomWidth: 3,
    },
    button: {
        backgroundColor: 'rgba(198, 46, 101, 0.5)',
    },
    checkBox: {
        backgroundColor: 'rgba(198, 46, 101, 0.15)',
        borderColor: 'rgba(198, 46, 101, 0.5)',
        borderWidth: 1,
    },
    bottomTab: {
        backgroundColor: '#C62E65',
    },
    background: {
        backgroundColor: '#252627',
    }
})

export { defaultStyles }