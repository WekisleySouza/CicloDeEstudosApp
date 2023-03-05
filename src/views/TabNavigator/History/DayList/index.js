import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { defaultStyles } from '../../../../styles/defaultStyles'

getTotalHours = allActtivities => {
    return allActtivities.reduce((previousValue, currentValue) => previousValue + currentValue.time, 0)
}

export default props => {
    const dayList = props.dayList.item
    const textHour = getTotalHours(dayList.activities) > 1 ? 'horas' : 'hora'

    activities = activities => {
        return activities.map((activitie, index) => {
            const textHour = activitie.time > 1 ? 'horas' : 'hora  '
            return (
                <View key={index} style={styles.activitieContainer}>
                    <View style={styles.activitieStartContainer}>
                        <Text style={[styles.activitieText, defaultStyles.text]}>{activitie.name}</Text>
                    </View>
                    <View style={styles.activitieEndContainer}>
                        <Text style={[styles.activitieText, defaultStyles.text]}>{activitie.time} {textHour}</Text>
                    </View>
                </View>
            )
        })

    }

    return (
        <View style={styles.container}>
            <View style={[styles.headerContainer, defaultStyles.separationLines]}>
                <View style={styles.headerStartContainer}>
                    <Text style={[styles.headerText, defaultStyles.text]}>{dayList.date}</Text>
                </View>
                <View style={styles.headerEndContainer}>
                    <Text style={[styles.headerText, defaultStyles.text]}>{getTotalHours(dayList.activities) + ' ' + textHour}</Text>
                </View>
            </View>
            <View style={styles.bodyContainer}>
                {activities(dayList.activities)}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    headerContainer: {
        height: 25,
        width: '100%',
        flexDirection: 'row',
    },
    headerStartContainer: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        paddingLeft: 10,
        paddingBottom: 2,
    },
    headerText: {
        fontSize: 12,
    },
    headerEndContainer: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        paddingRight: 10,
        paddingBottom: 2,
    },
    bodyContainer: {
        width: '100%',
        marginBottom: 35,
    },
    activitieContainer: {
        width: '100%',
        height: 35,
        flexDirection: 'row',
        marginTop: 8,
    },
    activitieText: {
        fontSize: 18,
    },
    activitieStartContainer: {
        flex: 3,
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingLeft: 20,

    },
    activitieEndContainer: {
        flex: 2,
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingRight: 20,
    },
})