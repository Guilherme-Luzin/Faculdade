import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput,
  Alert
} from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Animatable from 'react-native-animatable'
import {Picker} from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons'; 

import Repositorio_LoginCadastro from '../../Repositorio/Repositorio_Sqlite/Repositorio_LoginCadastro'

export default function Profile({ route }) {
  const navigation = useNavigation();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [celular, setCelular] = useState('');
  const [categoria, setCategoria] = useState('');
  const [descricao, setDescricao] = useState('');
  const [idUsuario, setIdUsuario] = useState(0);

  function FormataCelular(celular){
    return celular.replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{5})(\d)/, '$1-$2')
            .replace(/(-\d{4})\d+?$/, '$1');
  }

  function AtualizarPerfil(){
    if(nome == '' || email == '' || celular == '' || categoria == '' || (descricao == '' && categoria != 'Cliente')){
      return alert("Preencha todos os campos")
    }
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!reg.test(email)){
      return alert("email no formato inválido: exemplo@exemplo.exemplo");
    }
    var celularFormatado = celular.replace(' ', '').replace('(', '').replace(')', '').replace('-', '')

    const dadosUsuario = { nome, email, celularFormatado, categoria, descricao }
    Repositorio_LoginCadastro.atualizarUsuario(dadosUsuario, idUsuario)
    .then(alert("Dados atualizados com sucesso"))
  }

  function FazerLogout(){
    Alert.alert("Atenção!", "Tem certeza que deseja sair da conta?", [
      {
        text: "Cancelar",
        onPress: () => null,
        style: "cancel"
      },
      { text: "Sim", onPress: () => navigation.navigate("Welcome") }
    ]);
  }

  useEffect(() => {
    Repositorio_LoginCadastro.obterParaLogin(route.params.usuario.email, route.params.usuario.senha)
    .then(dados => {setIdUsuario(dados.id), 
                    setNome(dados.nome),
                    setEmail(dados.email),
                    setCelular(FormataCelular(dados.celular.toString())),
                    setCategoria(dados.categoria),
                    setDescricao(dados.descricao)})
  }, [route]);

  return (
    <View style={styles.container}>
      <Animatable.View animation='fadeInLeft' delay={500} style={styles.containerHeader}>
        <Text style={styles.message}>Olá {nome}</Text>
        
        <TouchableOpacity
         onPress={FazerLogout}>
          <Text style={styles.messageLogout}>
            <AntDesign name="logout" size={24} color="white" /> Sair
          </Text>
        </TouchableOpacity>

      </Animatable.View>

      <Animatable.View animation='fadeInUp' delay={500} style={styles.containerForm}>
      <Text style={styles.title}>Nome</Text>
        <View style={styles.inputArea}>
          <TextInput 
          autoCapitalize='words'
          style={styles.inputAreaText}
          placeholder='Seu Nome'
          value={nome}
          onChangeText={ (valorNome) => setNome(valorNome)} 
          />
        </View>

        <Text style={styles.title}>email</Text>
        <View style={styles.inputArea}>
          <TextInput 
          editable={false}
          style={styles.inputAreaEmail}
          placeholder='exemplo@exemplo.exemplo'
          value={email}
          onChangeText={ (valorEmail) => setEmail(valorEmail)} 
          />
        </View>

        <Text style={styles.title}>Telefone Celular</Text>
        <View style={styles.inputArea}>
          <TextInput 
          keyboardType='number-pad'
          style={styles.inputAreaText}
          placeholder='(99) 9 9999-9999'
          value={celular}
          onChangeText={ (valorCelular) => setCelular(FormataCelular(valorCelular))} 
          />
        </View>

        <Text style={styles.title}>Categoria</Text>
        <View style={styles.inputArea}>
          <Picker selectedValue={categoria}
            onValueChange={(itemValue, itemIndex) =>
            setCategoria(itemValue)}
            style={styles.pickerStyle}>
                <Picker.Item label='Selecione sua categoria' value='' />
                <Picker.Item label='Cliente' value='Cliente'/>
                <Picker.Item label='Desenvolvedor' value='Desenvolvedor'/>
                <Picker.Item label='Encanador' value='Encanador'/>
                <Picker.Item label='Pedreiro' value='Pedreiro'/>
                <Picker.Item label='Outros' value='Outros'/>
          </Picker>
        </View>

        <Text style={styles.title}>Descrição da Categoria</Text>
        <View style={styles.inputArea}>
          <TextInput 
          style={styles.inputDescricao}
          editable={categoria === 'Cliente' ? false : true} 
          placeholder='Escreva uma breve descrição do que você faz (Não necessário para clientes)' 
          multiline={true}
          value={categoria === 'Cliente' ? '' : descricao}
          onChangeText={ (valorDescricao) => setDescricao(valorDescricao)} 
          />
        </View>

        <TouchableOpacity 
        style={styles.button}>
          <Text style={styles.buttonText}
          onPress={AtualizarPerfil}>Atualizar Perfil</Text>
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
    marginStart: "5%",
    flexDirection: "row",
  },
  message:{
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff'
  },
  messageLogout:{
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    paddingLeft: 155
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
    marginTop: 18
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
    fontSize: 16
  },
  inputAreaEmail:{
    width: '100%',
    borderBottomWidth: 1,
    height: 40,
    fontSize: 16,
    backgroundColor: "#ebebeb",
  },
  inputDescricao:{
    width: '100%',
    height: 40,
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
  pickerStyle: {
    width: '100%',
    marginBottom: 12,
    fontSize: 16,
  },
  button:{
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