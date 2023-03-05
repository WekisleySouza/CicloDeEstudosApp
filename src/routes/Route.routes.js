import { NavigationContainer } from "@react-navigation/native"
import StackRoute from './Stack.routes'

export default props => {
    return (
        <NavigationContainer>
            <StackRoute/>
        </NavigationContainer>
    )
}