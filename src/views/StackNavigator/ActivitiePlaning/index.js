import React, { Component, useState } from "react"
import { StyleSheet, View, Text, TouchableOpacity, Image, FlatList, Alert } from "react-native"
import PopupAdd from "../../../components/PopupAdd"
import { readSecundaryActivities, saveSecundaryActivities } from "../../../functions/crud"
import { defaultStyles } from "../../../styles/defaultStyles"

export default class Activities extends Component {
    
    constructor(props){
        super(props)

        this.state = {
            inFocus: null,
            showPopupEditTask: false,
            showPopupNewTask: false,
            freeHour: this.props.route.params.hours,
            secundaryActivities: [],
            activitiesToShow: []
        }

        this.chargeStates()
    }

    chargeStates = () => {
        readSecundaryActivities().then(data => {
            if(data != null){
                let newState = this.state
                const categoryId = this.props.route.params.id
                newState.secundaryActivities = data
                newState.activitiesToShow = data.filter(value => categoryId == value.subcategoryOf)
                this.setState(newState)
                this.updateFreeHour()
            }
        })
    }

    updateFreeHour = () => {
        let newState = this.state
        newState.freeHour = this.props.route.params.hours - newState.activitiesToShow.reduce((acumulator, value) => {
            return acumulator + value.hours
        }, 0)
        this.setState(newState)
    }

    changeShowPopupNewTask = () => {
        let newState = this.state
        newState.showPopupNewTask = !newState.showPopupNewTask
        this.setState(newState)
        this.updateFreeHour()
    }

    changeShowPopupEditTask = (id) => {
        let newState = this.state
        newState.showPopupEditTask = !newState.showPopupEditTask
        newState.inFocus = id
        this.setState(newState) 
        this.updateFreeHour()
    }

    newActivitie = (name, hour, subcategory) => {
        let lengthList = this.state.secundaryActivities.length
        if(hour <= this.state.freeHour){
            this.state.secundaryActivities.push({
                id: lengthList != 0 ? this.state.secundaryActivities[lengthList - 1].id + 1 : 0,
                name: name,
                hours: parseInt(hour),
                completeHours: 0,
                hasSubcategory: subcategory,
                subcategoryOf: this.props.route.params.id
            })
        }else{
            Alert.alert('Erro!', 'Você não tem tempo.')
        }
        this.changeShowPopupNewTask()
        saveSecundaryActivities(this.state.secundaryActivities)
        this.chargeStates()
    }

    editActivity = (id, name, hour, subcategory) => {
        let newState = this.state
        const act = newState.secundaryActivities.filter(value => value.id == id)[0]
        if(hour <= this.state.freeHour || hour <= act.hours){
            newState.secundaryActivities = newState.secundaryActivities.map(value => {
            if(id == value.id){
                return {
                    id: value.id,
                    name: name,
                    hours: parseInt(hour),
                    completeHours: value.completeHours,
                    hasSubcategory: subcategory,
                    subcategoryOf: this.props.route.params.id
            }
            } else {
                return value
            }
            })
            this.setState(newState)
        }else{
            Alert.alert('Erro!', 'Você não temmm tempo.')
        }
        this.changeShowPopupEditTask()
        saveSecundaryActivities(this.state.secundaryActivities)
        this.chargeStates()
    }

    excludeActivity = (id) => {
        let newState = this.state
        newState.secundaryActivities = newState.secundaryActivities.filter(value => id != value.id)
        this.setState(newState)
        this.changeShowPopupEditTask()
        saveSecundaryActivities(this.state.secundaryActivities)
        this.chargeStates()
    }

    goToActivity = activitie => {
        this.props.navigation.navigate('ActivitiePlaning2', activitie)
    }

    activitie = (activitie) => {
        const act = activitie.item
        const hourText = activitie.item.hours > 1 ? 'horas' : 'hora'

        const activitieStartContainer = (
                <View style={styles.activitieStartContainer}>
                    <Text style={[styles.activitieText, defaultStyles.text]}>{act.name}</Text>
                </View>
        )

        return (
            <View key={activitie.index} style={[styles.activitieContainer, defaultStyles.separationLines]}>
                {
                    act.hasSubcategory
                    ?   (
                            <TouchableOpacity
                                style={{ flex: 5 }}
                                onPress={() => this.goToActivity(act)}
                            >
                                {activitieStartContainer}
                            </TouchableOpacity>
                        )
                    :   activitieStartContainer
                }   
                <View style={styles.activitieMidContainer}>
                    <Text style={[styles.activitieText, defaultStyles.text]}>{act.hours} {hourText}</Text>
                </View>
                <View style={styles.activitieEndContainer}>
                    <TouchableOpacity
                        onPress={() => this.changeShowPopupEditTask(act.id)}
                    >
                        <Image
                            source={require('../../../icons/pencil.png')}
                            style={{
                                height: 23,
                                width: 23
                            }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    render(){
        return (
            <View style={[styles.container, defaultStyles.background]}>
                {
                    this.state.showPopupNewTask
                    ?   <PopupAdd saveNew={this.newActivitie} deleteNew={this.changeShowPopupNewTask}/>
                    :   false 
                }
                {
                    this.state.showPopupEditTask
                    ?   <PopupAdd save={this.editActivity} delete={this.excludeActivity} idActivity={this.state.inFocus}/>
                    :   false 
                }
                <View style={styles.headerContainer}>
                    <Text style={[styles.headerText, defaultStyles.text]}>{this.props.route.params.name}</Text>
                </View>
                <View style={styles.bodyHeaderContainer}>
                    <Text style={[styles.bodyHeaderText, defaultStyles.text]}>Horas disponíveis: {this.state.freeHour}</Text>
                </View>
                <View style={styles.bodyContainer}>
                    <FlatList
                        data={this.state.activitiesToShow}
                        keyExtractor={item => item.id}
                        renderItem={item => this.activitie(item)}
                        style={styles.flatList}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={this.changeShowPopupNewTask}>
                        <Image
                            source={require('../../../icons/plus.png')}
                            style={{
                                width: 40,
                                height: 40
                            }}
                        />
                    </TouchableOpacity>
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
    bodyHeaderContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    bodyHeaderText: {
        fontSize: 23
    },
    bodyContainer: {
        flex: 6,
        alignItems: 'center',
    },
    buttonContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    flatList: {
        width: '90%',
    },
    activitieContainer: {
        width: '100%',
        height: 65,
        flexDirection: 'row',
        marginBottom: 15,
    },
    activitieText: {
        fontSize: 20,
    },
    activitieStartContainer: {
        flex: 5,
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingLeft: 10,
    },
    activitieMidContainer: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    activitieEndContainer: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
})