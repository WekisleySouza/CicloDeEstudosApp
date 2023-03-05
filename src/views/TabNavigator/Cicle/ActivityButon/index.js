import React, { Component } from "react"
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { increasePrimaryActivity, increaseSecundaryActivity, increaseTertiaryActivity } from "../../../../functions/crud"
import { defaultStyles } from "../../../../styles/defaultStyles"

export default class ActivityButton extends Component {
    constructor(props){
        super(props)
        this.state = {
            complete: props.activity.item.completeHours,
            hours: props.activity.item.hours
        }

    }
    
    plusAction = () => {
        if(this.state.complete < this.state.hours){
            let newState = this.state
            newState.complete += 1
            this.setState(newState)
            this.increase()
        }
    }

    increase = () => {
        if(this.props.activity.index.includes('p')){
            increasePrimaryActivity()
        } else if (this.props.activity.index.includes('s')){
            increaseSecundaryActivity()
        } else if (this.props.activity.index.includes('t')){
            increaseTertiaryActivity()
        }
    }

    getEndContainer = (complete, hours) => {
        let component = false

        if(this.state.complete == this.state.hours){
            component = (
                <View style={styles.endContainer}>
                    <Image
                        source={require('../../../../icons/check.png')}
                        style={{
                            height: 20,
                            width: 20
                        }}
                    />
                </View>
            )
        } else if(!this.props.activity.item.hasSubcategory) {
            component = (
                <View style={styles.endContainer}>
                    <View style={styles.proportionHoursContainer}>
                        <Text style={[styles.proportionHoursText, defaultStyles.text]}>{complete}/{hours}</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.plusContainer}
                        onPress={() => this.plusAction()}
                    >
                        <View>
                            <Text style={[styles.plusText, defaultStyles.text]}>+</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            )
        } else {
            component = (
                <View style={styles.endContainer}>
                    <View style={styles.proportionHoursContainer}>
                        <Text style={[styles.proportionHoursText, defaultStyles.text]}>{complete}/{hours}</Text>
                    </View>
                    <View style={styles.plusContainer}/>
                </View>
            )
        }

        return component
    }

    getStartContainer = () => {
        return (
            <TouchableOpacity 
                style={styles.startContainer}
                onPress={this.props.proxFunc}
            >
                <View>
                    <Text style={[styles.startText, defaultStyles.text]}>{this.props.activity.item.name}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    render(){
        return (
            <View style={[styles.container, defaultStyles.separationLines]}>
                {this.getStartContainer()}
                {this.getEndContainer(this.state.complete, this.state.hours)}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
       height: 55,
       width: '100%',
       marginBottom: 20,
       flexDirection: 'row',
    },
    startContainer: {
        flex: 2,
        justifyContent: 'center',
        paddingLeft: 10
    },
    startText: {
        fontSize: 20,
    },
    endContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    proportionHoursContainer: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    proportionHoursText: {
        fontSize: 15,

    },
    plusContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    plusText: {
        fontSize: 25,

    },
})