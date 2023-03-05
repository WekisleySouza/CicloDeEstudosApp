import React, { Component } from "react"
import { StyleSheet, View, Text, FlatList } from "react-native"
import { readPrimaryActivities } from "../../../functions/crud"
import { defaultStyles } from "../../../styles/defaultStyles"
import ActivityButon from "./ActivityButon"

export default class Cicle extends Component{

    constructor(props){
        super(props)

        this.state = {
            primaryActivity: [],
            updated: 0
        }

        this.chargeStates()
    }
    
    chargeStates = () => {
        readPrimaryActivities().then(data => {
            if(data != null){
                let newState = this.state
                newState.primaryActivity = data
                this.setState(newState)
            }
        })
    }

    nextScreen = activity => {
        if(activity.item.hasSubcategory){
            this.props.navigation.navigate('SecundaryCicle', activity)
        } else {
            this.props.navigation.navigate('ActivityProgress', activity)
        }
    }

    render(){
        return (
            <View style={[styles.container, defaultStyles.background]}>
                <View style={styles.headerContainer}>
                    <Text style={[styles.headerText, defaultStyles.text]}>Ciclo</Text>
                </View>
                <View style={styles.bodyContainer}>
                    <FlatList
                        data={this.state.primaryActivity}
                        keyExtractor={value => value.id}
                        renderItem={value => <ActivityButon proxFunc={() => this.nextScreen({...value, index: value.index + 'p' })} activity={{...value, index: value.index + 'p' }}/>}
                        style={styles.flatListContainer}
                    />
                </View>
            </View>
        )
    }
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
        fontSize: 23,
    },
    bodyContainer: {
        flex: 6,
        alignItems: 'center',
    },
    flatListContainer: {
        flex: 1,
        width: '90%'
    },
})