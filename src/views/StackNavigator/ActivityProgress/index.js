import React, { Component } from "react"
import { StyleSheet, View, Text, Touchable, TouchableOpacity } from "react-native"
import CheckBox from "../../../components/CheckBox"
import { decreasePrimaryActivity, decreaseSecundaryActivity, decreaseTertiaryActivity, increasePrimaryActivity, increaseSecundaryActivity, increaseTertiaryActivity } from "../../../functions/crud"
import { defaultStyles } from "../../../styles/defaultStyles"

export default class ActivityProgress extends Component {
    constructor(props){
        super(props)

        this.state = {
            activity: { ...this.props.route.params.item },
        }

    }

    getCheckboxes = (complete, hours) => {
        let acumulator = 0
        const rows = Array(hours).fill(0).map((value, index) => {
            acumulator += 1
            return acumulator <= complete
                ?   <View key={index} style={styles.checkBox}><CheckBox checked /></View>
                :   <View key={index + 'a'} style={styles.checkBox}><CheckBox /></View>
        }, 0)
        return (
            <View style={styles.checkBoxesContainer}>
                {rows}
            </View>
        )
    }

    minusAction = () => {
        if(this.state.activity.completeHours > 0){
            let  newState = this.state
            newState.activity.completeHours -= 1
            this.setState(newState)
            this.decrease()
        }
    }
    
    plusAction = () => {
        if(this.state.activity.completeHours < this.state.activity.hours){
            let  newState = this.state
            newState.activity.completeHours += 1
            this.setState(newState)
            this.increase()
        }
    }

    increase = () => {
        if(this.props.route.params.index.includes('p')){
            increasePrimaryActivity(this.props.route.params.item.id)
        } else if (this.props.route.params.index.includes('s')){
            increaseSecundaryActivity(this.props.route.params.item.id)
        } else if (this.props.route.params.index.includes('t')){
            increaseTertiaryActivity(this.props.route.params.item.id)
        }
    }

    decrease = () => {
        if(this.props.route.params.index.includes('p')){
            decreasePrimaryActivity(this.props.route.params.item.id)
        } else if (this.props.route.params.index.includes('s')){
            decreaseSecundaryActivity(this.props.route.params.item.id)
        } else if (this.props.route.params.index.includes('t')){
            decreaseTertiaryActivity(this.props.route.params.item.id)
        }
    }

    render(){
        return (
            <View style={[styles.container, defaultStyles.background]}>
                <View style={styles.headerContainer}>
                    <Text style={[styles.headerText, defaultStyles.text]}>{this.state.activity.name}</Text>
                </View>
                <View style={styles.bodyContainer}>
                        <View style={[styles.bodyTopContainer, defaultStyles.bottomLine]}>
                            <View style={styles.bodyHeaderStartContainer}>
                                <Text style={[defaultStyles.text]}>Progresso</Text>
                            </View>
                            <View style={styles.bodyHeaderEndContainer}>
                                <View style={styles.minusContainer}>
                                    <TouchableOpacity onPress={this.minusAction}>
                                        <Text style={styles.signal}>-</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.plusContainer}>
                                    <TouchableOpacity onPress={this.plusAction}>
                                        <Text style={styles.signal}>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    <View style={styles.bodyBottomContainer}>
                        {this.getCheckboxes(this.state.activity.completeHours, this.state.activity.hours)}
                    </View>
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
        flex: 3,
        alignItems: 'center',
    },
    bodyTopContainer: {
        flex: 1,
        width: '90%',
        justifyContent: 'flex-end',
        paddingLeft: 5,
        flexDirection: 'row',
    },
    bodyHeaderStartContainer: {
        flex: 1,
    },
    bodyHeaderEndContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    minusContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',

    },
    plusContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    signal: {
        fontSize: 25,
        color: '#EEF0EB',
    },
    bodyTopText: {
        fontSize: 14,
    },
    bodyBottomContainer: {
        flex: 17,
        width: '85%',
    },
    checkBoxesContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        flexGrow: 12,
        flexWrap: 'wrap',
        paddingTop: 25,
    }, 
    checkBox: {
        height: 30,
        width: 30,
        alignItems: 'center',
        justifyContent: 'center',
    }
})