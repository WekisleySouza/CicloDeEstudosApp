import React from "react"
import { FlatList, StyleSheet, Text, View } from "react-native"
import { defaultStyles } from "../../../styles/defaultStyles"
import DayList from "./DayList"

export default props => {
    const history = [
        {
            date: '03/03/2023',
            activities: [
                {name: 'Matemática', time: 10},
                {name: 'Biologia', time: 20},
                {name: 'História', time: 20},
            ]
        },
        {
            date: '02/03/2023',
            activities: [
                {name: 'Física', time: 30}
            ]
        },
        {
            date: '01/03/2023',
            activities: [
                {name: 'Matemática', time: 30}
            ]
        },
    ]

    return (
        <View style={[styles.container, defaultStyles.background]}>
            <View style={styles.headerContainer}>
                <Text style={[styles.headerText, defaultStyles.text]}>Histórico</Text>
            </View>
            <View style={styles.bodyContainer}>
                <FlatList
                    data={history}
                    keyExtractor={item => item.date}
                    renderItem={item => <DayList dayList={item}/>}
                    style={styles.flatList}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 10,
    },
    headerText: {
        fontSize: 23
    },
    bodyContainer: {
        flex: 8,
        alignItems: 'center',
    },
    flatList: {
        flex: 1,
        width: '90%',
    },
})