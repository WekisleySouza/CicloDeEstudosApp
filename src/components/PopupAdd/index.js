import React, { useState } from "react"
import { Modal, StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-native"
import { defaultStyles } from "../../styles/defaultStyles"
import CheckBox from "../CheckBox"

export default props => {
    let [title, setTitle] = useState('')
    let [hours, setHours] = useState('')
    let [subCategory, setSubCategory] = useState(false)

    return (
        <Modal
            transparent={true}
        >
            <View style={styles.container}>
                <View style={[styles.popupContainer, defaultStyles.popupWindow]}>
                    <View style={styles.inputsContainer}>
                        <View style={styles.titleInputContainer}>
                            <View style={styles.textContainer}>
                                <Text style={[styles.titleText, defaultStyles.text]}>Título:</Text>
                            </View>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    cursorColor='rgba(198, 46, 101, 0.5)'
                                    style={[styles.textInput, defaultStyles.textInput]}
                                    onChangeText={text => setTitle(text)}
                                />
                            </View>
                        </View>
                        <View style={styles.hourInputContainer}>
                            <View style={styles.textContainer}>
                                <Text style={[styles.titleText, defaultStyles.text]}>Horas:</Text>
                            </View>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    cursorColor='rgba(198, 46, 101, 0.5)'
                                    style={[styles.textInput, defaultStyles.textInput]}
                                    onChangeText={text => setHours(text)}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={styles.buttonsContainer}>
                            {
                                !props.notShowSubcategory
                                ?   (
                                    <View style={styles.topContainer}>
                                        <View style={styles.startTopContainer}>
                                            <Text style={[styles.startTopText, defaultStyles.text]}>Possui categoria:</Text>
                                        </View>
                                        <View style={styles.endTopContainer}>
                                            <CheckBox checked={subCategory} func={() => setSubCategory(!subCategory)} />
                                        </View>
                                    </View>
                                    )
                                :   false
                            }
                        <View style={styles.bottomContainer}>
                            <View style={styles.startBottomContainer}>
                                <TouchableOpacity
                                    onPress={() => {
                                        if(props.deleteNew){
                                            props.deleteNew()
                                        }
                                        if(props.delete){
                                            props.delete(props.idActivity)
                                        }
                                    }}
                                >
                                    <View style={[styles.button, defaultStyles.button]}>
                                        <Text style={[styles.buttonText, defaultStyles.text]}>Excluir</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.endBottomContainer}>
                                <TouchableOpacity
                                    onPress={() => {
                                        if(props.saveNew){
                                            props.saveNew(title, hours, subCategory)
                                        }
                                        if(props.save){
                                            props.save(props.idActivity, title, hours, subCategory)
                                        }
                                    }}
                                >
                                    <View style={[styles.button, defaultStyles.button]}>
                                        <Text style={[styles.buttonText, defaultStyles.text]}>Salvar</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    popupContainer: {
        height: '55%',
        width: '80%',
        borderRadius: 10,
    },
    inputsContainer: {
        flex: 2,
    },
    titleInputContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '20%',
    },
    textContainer: {
        flex: 1,
        width: '85%',
    },
    inputContainer: {
        flex: 1,
        width: '85%',
    },
    titleText: {
        fontSize: 20,
    },
    textInput: {
        height: 40,
        width: '100%',
        borderRadius: 9,
        paddingLeft: 10,
    },
    hourInputContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonsContainer: {
        flex: 1,
    },
    topContainer: {
        flex: 4,
        flexDirection: 'row',
    },
    bottomContainer: {
        flex: 5,
        flexDirection: 'row',
    },
    startTopContainer: {
        flex: 3,
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingLeft: 20,
    },
    startTopText: {
        fontSize: 15,
    },
    endTopContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    startBottomContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    endBottomContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 32,
        width: 80,
        borderRadius: 8,
    },
    buttonText: {
        fontSize: 20
    }
})