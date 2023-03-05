import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import TabRoute from './Tab.routes'
import ActivitiePlaning from "../views/StackNavigator/ActivitiePlaning"
import ActivitiePlaning2 from "../views/StackNavigator/ActivitiePlaning2"
import ActivityProgress from "../views/StackNavigator/ActivityProgress"
import SecundaryCicle from "../views/StackNavigator/SecundaryCicle"
import TertiaryCicle from "../views/StackNavigator/TertiaryCicle"

const Stack = createNativeStackNavigator()

function getScreens(){
    const stacks = [
        {name: 'TabRoute', component: TabRoute},
        {name: 'ActivitiePlaning', component: ActivitiePlaning},
        {name: 'ActivitiePlaning2', component: ActivitiePlaning2},
        {name: 'ActivityProgress', component: ActivityProgress},
        {name: 'SecundaryCicle', component: SecundaryCicle},
        {name: 'TertiaryCicle', component: TertiaryCicle},
    ]

    return stacks.map((value, index) => {
        return (
            <Stack.Screen
                key={index}
                name={value.name}
                component={value.component}
            />
        )
    })
}

export default function App(){
    return (
        <Stack.Navigator
            initialRouteName='TabRoute'
            screenOptions={({route}) => ({
                headerShown: false,
            })}
        >
            {getScreens()}
        </Stack.Navigator>
    )
}