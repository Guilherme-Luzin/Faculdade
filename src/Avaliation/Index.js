import { 
    View,
    Text,
    BackHandler,
    Alert, 
} from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Animatable from 'react-native-animatable'
import { useNavigation } from '@react-navigation/native'
import { AirbnbRating } from 'react-native-ratings';

export default function Avaliation({ route }){
    const navigation = useNavigation();

    const [avaliacao, setAvaliacao] = useState(1)

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
      
    function CompletaAvaliacao(rating) {
        setAvaliacao(rating)
      }

    useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    
    return () =>
        BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, [route]);
    
    return(
        <Animatable.View>
            <Text>Avaliação de Serivço</Text>

            <AirbnbRating
            count={5}
            reviews={["Horrível", "Ruim", "Mediano", "Bom", "Excelente"]}
            defaultRating={1}
            size={20}
            onFinishRating={CompletaAvaliacao}
            />
        </Animatable.View>
    )
}