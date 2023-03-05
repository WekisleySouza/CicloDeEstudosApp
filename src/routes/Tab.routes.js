import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Cicle from '../views/TabNavigator/Cicle'
import Activities from '../views/TabNavigator/Activities'
import History from '../views/TabNavigator/History'
import { View, Image } from "react-native"
import { defaultStyles } from "../styles/defaultStyles"

const Tab = createBottomTabNavigator()

function getBackground(){
    return (
        <View style={[{
            flex: 1,
        }, defaultStyles.bottomTab]}/>
    )
}

function getIcon(name){
    const history = require('../icons/history.png')
    const activities = require('../icons/activities.png')
    const cicle = require('../icons/cicle.png')
    
    let img = cicle

    if(name == 'history') { img = history }
    if(name == 'activities') { img = activities }

    return (
        <View>
            <Image
                source={img}
                style={{
                    width: 30,
                    height: 30,
                }}
            />
        </View>
    )
}

function getTabScreens(){
    const tabs = [
        {name: 'History', component: History, icon: 'history'},
        {name: 'Cicle', component: Cicle, icon: 'cicle'},
        {name: 'Activities', component: Activities, icon: 'activities'},
    ]
    return tabs.map((value, index) => {
        return (
            <Tab.Screen 
                key={index}
                name={value.name}
                component={value.component}
                options={({route}) => ({
                    tabBarIcon: () => getIcon(value.icon)
                })}
            />
        )
    })
}

export default function App(){
    return (
        <Tab.Navigator
            initialRouteName="Cicle"
            screenOptions={({ route }) => ({
                tabBarBackground: () => getBackground(),
                tabBarShowLabel: false,
                headerShown: false,
            })}
        >
            {getTabScreens()}
        </Tab.Navigator>
    )
}