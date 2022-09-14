import { createNativeStackNavigator }from '@react-navigation/native-stack'

import Welcome from '../Pages/Welcome/Index';
import SignIn from '../Pages/SignIn/Index';

const Stack = createNativeStackNavigator();

export default function Routes(){
    return(
        <Stack.Navigator>
            <Stack.Screen 
                name='Welcome'
                component={Welcome}
                options={{/*headerTitle: "Bem Vindo"*/ headerShown: false}}
            />

            <Stack.Screen 
                name='SignIn'
                component={SignIn}
                options={{/*headerTitle: "Bem Vindo"*/ headerShown: false}}
            />
        </Stack.Navigator>
    )
}
