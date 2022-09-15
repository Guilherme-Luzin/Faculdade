import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'

import Begin from '../Begin/Index';
import Clients from '../Clients/Index';
import Profile from '../Profile/Index';

const Tab = createBottomTabNavigator();

export default function Home() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle:{
          position: 'absolute',
          backgroundColor: '#dbc500',
          borderWidth: 0,
          borderRadius: 5
        },
        tabBarInactiveTintColor: '#000',
        tabBarActiveTintColor: '#fff'
      }}
    >

      <Tab.Screen 
        name='Begin'
        component={Begin}
        options={{
          headerTitle:'Inicio',
          headerStyle:{
            backgroundColor: '#dbc500'
          },
          tabBarIcon: ({color, size, focused}) => {
            if(focused){
              return <Ionicons name='home' size={size} color={color} />
            }

            return <Ionicons name='home-outline' size={size} color={color} />
          }
        }}
      />

      <Tab.Screen 
        name='Clients'
        component={Clients}
        options={{
          headerTitle:'Clientes',
          headerStyle:{
            backgroundColor: '#dbc500'
          },
          tabBarIcon: ({color, size, focused}) => {
            if(focused){
              return <Ionicons name='chatbubbles' size={size} color={color} />
            }

            return <Ionicons name='chatbubbles-outline' size={size} color={color} />
          }
        }}
      />

      <Tab.Screen 
        name='Profile'
        component={Profile}
        options={{
          headerTitle:'Meu Perfil',
          headerStyle:{
            backgroundColor: '#dbc500'
          },
          tabBarIcon: ({color, size, focused}) => {
            if(focused){
              return <Ionicons name='person' size={size} color={color} />
            }

            return <Ionicons name='person-outline' size={size} color={color} />
          }
        }}
      />
    </Tab.Navigator>
  )
}