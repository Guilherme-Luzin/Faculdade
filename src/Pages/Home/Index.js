import {
  Alert,
  BackHandler,
} from 'react-native'
import React, { useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'

import Begin from '../Begin/Index';
import Clients from '../Clients/Index';
import Profile from '../Profile/Index';

const Tab = createBottomTabNavigator();

export default function Home({ route }) {

  const usuario = route.params;

  const backAction = () => {
    Alert.alert("Atenção!", "Tem certeza que deseja sair do App?", [
      {
        text: "Cancelar",
        onPress: () => null,
        style: "cancel"
      },
      { text: "Sim", onPress: () => BackHandler.exitApp() }
    ]);
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarStyle:{
          position: 'absolute',
          backgroundColor: '#dbc500',
          borderWidth: 0,
          borderRadius: 5
        },
        tabBarInactiveTintColor: '#000',
        tabBarActiveTintColor: '#fff'
      })}
    >

      <Tab.Screen 
        name='Begin'
        component={Begin}
        initialParams={{ usuario }}
        options={{
          headerTitle:`Olá ${usuario.nome} - ${usuario.categoria}`,
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
        initialParams={{ usuario }}
        options={{
          headerTitle:'Serviços aceitos / Meus serviços',
          headerStyle:{
            backgroundColor: '#dbc500',
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
        initialParams={{ usuario }}
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