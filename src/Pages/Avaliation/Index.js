import { 
    View,
    Text,
    BackHandler,
    Alert, 
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Animatable from 'react-native-animatable'
import { useNavigation } from '@react-navigation/native'
import { AirbnbRating } from 'react-native-ratings';

import Repositorio_LoginCadastro from '../../Repositorio/Repositorio_Sqlite/Repositorio_LoginCadastro'
import Repositorio_Servicos from '../../Repositorio/Repositorio_Sqlite/Repositorio_Servicos';

export default function Avaliation({ route }){
    const navigation = useNavigation();

    const [avaliacao, setAvaliacao] = useState(1)
    const [dadosBanco, setDadosBanco] = useState('')

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

    function SalvarAvaliacao(){
      dadosBanco.qtdVotos = dadosBanco.qtdVotos + 1
      dadosBanco.avaliacao = (dadosBanco.avaliacao + avaliacao) / dadosBanco.qtdVotos
      var aceito = 4
      var idAceito = 0
      var status = "Fechado"

      Repositorio_LoginCadastro.atualizarAvaliacaoDoUsuario(dadosBanco.avaliacao, dadosBanco.qtdVotos, dadosBanco.id)
      Repositorio_Servicos.atualizarAceitoIdAceito(aceito, idAceito, status, route.params.idServico)
      .then(alert("Avaliação enviada!")).then(navigation.navigate("Clients", dadosBanco))
    }

    useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    
    Repositorio_LoginCadastro.obterParaLogin(route.params.prestadorServico.email, route.params.prestadorServico.senha).then(itens => setDadosBanco(itens))
    return () =>
        BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, [route]);
    
    return(
        <Animatable.View style={styles.container}>
            <Text style={styles.titulo}>Avaliação de Serivço</Text>

            <AirbnbRating
            count={5}
            reviews={["Horrível", "Ruim", "Mediano", "Bom", "Excelente"]}
            defaultRating={1}
            size={20}
            onFinishRating={CompletaAvaliacao}
            />

            <TouchableOpacity 
            style={styles.button}>
            <Text style={styles.buttonText}
            onPress={SalvarAvaliacao}>Avaliar</Text>
            </TouchableOpacity>
        </Animatable.View>
    )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  titulo: {
    alignSelf: 'center',
    fontWeight: "bold",
    fontSize: 20,
    paddingBottom: 50
  },
  button:{
    marginTop: 550,
    backgroundColor: '#dbc500',
    width: '100%',
    borderRadius: 4,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText:{
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  },
})