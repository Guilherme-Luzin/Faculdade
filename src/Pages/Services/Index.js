import { 
  View, 
  Text, 
  BackHandler, 
  Alert,
  StyleSheet, 
  TouchableOpacity, 
  TextInput,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import * as Animatable from 'react-native-animatable'

import Repositorio_Servicos from '../../Repositorio/Repositorio_Sqlite/Repositorio_Servicos'
import Repositorio_LoginCadastro from '../../Repositorio/Repositorio_Sqlite/Repositorio_LoginCadastro'

export default function Services({ route }) {
  const navigation = useNavigation();

  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [valorServico, setValorServico] = useState('');
  const [endereco, setEndereco] = useState('');
  const [cep, setCep] = useState('');
  const [idUsuario, setIdUsuario] = useState(0);

  function FormataCep(cep){
    return cep.replace(/\D/g, '')
              .replace(/(\d{5})(\d)/, '$1-$2')
              .replace(/(-\d{3})\d+?$/, '$1');
  }

  function CadastroBotao(){
    if(titulo == '' || descricao == '' || valorServico == '' || endereco == '' || cep == ''){
      return alert("Preencha todos os campos")
    }

    setIdUsuario(route.params.id);
    if(idUsuario === undefined || idUsuario === null || idUsuario === '' || idUsuario === 0){
      Repositorio_LoginCadastro.obterParaLogin(route.params.email, route.params.senha).then(dados => setIdUsuario(dados.id))
      
      if(idUsuario === 0){
        return alert("Erro ao salvar tente novamente")
      }
    }

    var cepFormatado = cep.replace(' ', '').replace('-', '')
    const dadosServico = { titulo, descricao, endereco, cepFormatado, valorServico, idUsuario }
    Repositorio_Servicos.incluirServico(dadosServico)

    navigation.navigate("Begin", dadosServico)
  }
  
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
    <View style={styles.container}>
      <Animatable.View animation='fadeInLeft' delay={500} style={styles.containerHeader}>
        <Text style={styles.message}>Cadastro de Serviço</Text>
      </Animatable.View>

      <Animatable.View animation='fadeInUp' delay={500} style={styles.containerForm}>
      <Text style={styles.title}>Titulo do Seriço</Text>
        <View style={styles.inputArea}>
          <TextInput 
          style={styles.inputAreaText}
          placeholder='Titulo do serviço'
          value={titulo}
          onChangeText={ (valorTitulo) => setTitulo(valorTitulo)} 
          />
        </View>

        <Text style={styles.title}>Descrição do que deseja</Text>
        <View style={styles.inputArea}>
          <TextInput 
          autoCapitalize='characters'
          style={styles.inputDescricao}
          multiline={true}
          placeholder='Quero um serviço que...'
          value={descricao}
          onChangeText={ (valorDescricao) => setDescricao(valorDescricao)} 
          />
        </View>

        <Text style={styles.title}>Valor Desejado</Text>
        <View style={styles.inputArea}>
          <TextInput 
          keyboardType='number-pad'
          style={styles.inputAreaText}
          placeholder='Valor que deseja pagar ou receber'
          value={valorServico}
          onChangeText={ (valorInputServico) => setValorServico(valorInputServico)} 
          />
        </View>

        <Text style={styles.title}>Endereço do Serviço</Text>
        <View style={styles.inputArea}>
          <TextInput 
          style={styles.inputAreaText}
          placeholder='Digite um endereço'
          value={endereco}
          onChangeText={ (valorEndereco) => setEndereco(valorEndereco)} 
          />
        </View>

        <Text style={styles.title}>CEP</Text>
        <View style={styles.inputArea}>
          <TextInput 
          keyboardType='number-pad'
          style={styles.inputAreaText}
          placeholder='00000-000'
          value={cep}
          onChangeText={ (valorCep) => setCep(FormataCep(valorCep))} 
          />
        </View>

        <TouchableOpacity 
        style={styles.button}
        onPress={CadastroBotao}>
          <Text style={styles.buttonText}>Cadastrar Serviço</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#dbc500'
  },
  containerHeader:{
    marginTop: '5%',
    marginBottom: '8%',
    paddingStart: '5%'
  },
  message:{
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff'
  },
  containerForm:{
    backgroundColor: '#fff',
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: '5%',
    paddingEnd: '5%'
  }, 
  title:{
    fontSize: 20,
    marginTop: 28
  },
  inputArea:{
    flexDirection: 'row',
    width: '90%',
    alignItems: 'center'
  },
  inputAreaText:{
    width: '100%',
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 12,
    fontSize: 16
  },
  inputDescricao:{
    width: '100%',
    height: 40,
    marginBottom: 12,
    fontSize: 16,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    height: 100,
    marginBottom: 12,
    paddingLeft: 10,
    paddingBottom: 50,
    fontSize: 16
  },
  button:{
    backgroundColor: '#dbc500',
    width: '100%',
    borderRadius: 4,
    paddingVertical: 8,
    marginTop: 14,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText:{
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold'
  },
})