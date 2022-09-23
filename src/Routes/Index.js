import { createNativeStackNavigator }from '@react-navigation/native-stack'

import Welcome from '../Pages/Welcome/Index';
import SignIn from '../Pages/SignIn/Index';
import SignUp from '../Pages/SignUp/Index';
import Home from '../Pages/Home/Index';
import Categoria from '../Pages/SignUp/Categoria';

const Stack = createNativeStackNavigator();

export default function Routes(){
    return(
        <Stack.Navigator>
            <Stack.Screen 
                name='Welcome'
                component={Welcome}
                options={{headerShown: false}}
            />

            <Stack.Screen 
                name='SignIn'
                component={SignIn}
                options={{headerShown: false}}
            />

            <Stack.Screen 
                name='SignUp'
                component={SignUp}
                options={{headerShown: false}}
            />

            <Stack.Screen 
                name='Home'
                component={Home}
                options={{headerShown: false}}
            />

            <Stack.Screen 
                name='Categoria'
                component={Categoria}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    )
}
