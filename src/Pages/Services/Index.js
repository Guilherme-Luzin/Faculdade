import { 
  View, 
  Text, 
  BackHandler, 
  Alert 
} from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

export default function Services() {
  const navigation = useNavigation();

  const backAction = () => {
    Alert.alert("Atenção!", "Os dados não salvos serão perdidos, deseja realmente voltar?", [
      {
        text: "Cancelar",
        onPress: () => null,
        style: "cancel"
      },
      { text: "Sim", onPress: () => navigation.goBack() }
    ]);
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);
  return (
    <View>
      <Text>Services</Text>
    </View>
  )
}