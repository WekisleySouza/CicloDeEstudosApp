import React, { Component } from "react"
import { StyleSheet, View, Text, FlatList } from "react-native"
import { readTertiaryActivities } from "../../../functions/crud"
import { defaultStyles } from "../../../styles/defaultStyles"
import ActivityButon from "../../TabNavigator/Cicle/ActivityButon"

export default class Cicle extends Component{

    constructor(props){
        super(props)

        this.state = {
            tertiaryActivity: [],
            activitiesToShow: []
        }

        console.log(this.props.route.params.item.id)

        this.chargeStates()
    }

    chargeStates = () => {
        readTertiaryActivities().then(data => {
            if(data != null){
                let newState = this.state
                const categoryId = this.props.route.params.item.id
                newState.tertiaryActivity = data
                newState.activitiesToShow = data.filter(value => categoryId == value.subcategoryOf)
                this.setState(newState)
            }
        })
    }

    nextScreen = activity => {
        this.props.navigation.navigate('ActivityProgress', activity)
    }

    render(){
        return (
            <View style={[styles.container, defaultStyles.background]}>
                <View style={styles.headerContainer}>
                    <Text style={[styles.headerText, defaultStyles.text]}>{this.props.route.params.item.name}</Text>
                </View>
                <View style={styles.bodyContainer}>
                    <FlatList
                        data={this.state.activitiesToShow}
                        keyExtractor={value => value.id}
                        renderItem={value => <ActivityButon proxFunc={() => this.nextScreen({...value, index: value.index + 't' })} activity={{...value, index: value.index + 't' }}/>}
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