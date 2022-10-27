import React, { useState } from 'react'
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput, 
  Modal,
  Pressable 
} from 'react-native'

import * as Animatable from 'react-native-animatable'
import { 
  Ionicons, 
  MaterialIcons
 } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

export default function SignUp() {
  const navigation = useNavigation();

  const [modal, setModal] = useState(false);
  const [campo, setCampo] = useState('');
  const [nomeCadastro, setNomeCadastro] = useState('');
  const [emailCadastro, setEmailCadastro] = useState('');
  const [senhaCadastro, setSenhaCadastro] = useState('');
  const [esconderSenha, setEsconderSenha] = useState(true);
  const [celularCadastro, setCelularCadastro] = useState('');

  function FormataCelular(celular){
    return celular.replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{5})(\d)/, '$1-$2')
            .replace(/(-\d{4})\d+?$/, '$1');
  }

  function CadastroBotao(){
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!reg.test(emailCadastro)){
      return alert("email no formato inválido: exemplo@exemplo.exemplo");
    }
    var celularFormatado = celularCadastro.replace(' ', '').replace('(', '').replace(')', '').replace('-', '')
    if(nomeCadastro == '' || emailCadastro == '' || senhaCadastro == '' || celularCadastro == ''){
      return alert("Preencha todos os campos")
    }
    const dadosUsuario = { nomeCadastro, emailCadastro, senhaCadastro, celularFormatado }
    navigation.navigate('Categoria', dadosUsuario)
  }

  return (
    <View style={styles.container}>

      <Animatable.View animation='fadeInLeft' delay={500} style={styles.containerHeader}>
        <Text style={styles.message}>Cadastro de Usuário</Text>
      </Animatable.View>

      <Animatable.View animation='fadeInUp' delay={500} style={styles.containerForm}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modal}
          onRequestClose={() => {
            setModal(!modal);
          }}
        >
          <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>O campo {campo} é obrigatório</Text>
            <Pressable
              style={[styles.buttonModal, styles.buttonClose]}
              onPress={() => setModal(!modal)}
            >
              <Text style={styles.textStyle}>Ok</Text>
            </Pressable>
          </View>
        </View>
        </Modal>

        <Text style={styles.title}>Nome de Usuário</Text>
        <View style={styles.inputArea}>
          <TextInput 
          autoCapitalize='words'
          style={styles.inputAreaText}
          placeholder='Nome de Usuário'
          value={nomeCadastro}
          onChangeText={ (valorNome) => setNomeCadastro(valorNome)} 
          />

          <TouchableOpacity 
          style={styles.icon}
          onPress={() => {setModal(!modal), setCampo('Nome')}}
          disabled={nomeCadastro == '' ? false : true}>
            { nomeCadastro == '' 
              ? <MaterialIcons name='error-outline' size={25} color='#ff0000'/>
              : ''
            }
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>Telefone Celular</Text>
        <View style={styles.inputArea}>
          <TextInput 
          keyboardType='number-pad'
          placeholder='(99) 9 9999-9999'
          style={styles.inputAreaText}
          value={celularCadastro}
          onChangeText={ (valorCelular) => setCelularCadastro(FormataCelular(valorCelular))} 
          />

          <TouchableOpacity 
          style={styles.icon}
          onPress={() => {setModal(!modal), setCampo('Telefone Celular')}}
          disabled={celularCadastro == '' ? false : true}>
            { celularCadastro == '' 
              ? <MaterialIcons name='error-outline' size={25} color='#ff0000'/>
              : ''
            }
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>Email</Text>
        <View style={styles.inputArea}>
          <TextInput 
          autoCapitalize='none'
          keyboardType='email-address'
          placeholder='exemplo@exemplo.exemplo' 
          style={styles.inputAreaText}
          value={emailCadastro}
          onChangeText={ (valorEmail) => setEmailCadastro(valorEmail)}
          />

          <TouchableOpacity 
          style={styles.icon}
          onPress={() => {setModal(!modal), setCampo('Email')}}
          disabled={emailCadastro == '' ? false : true}>
            { emailCadastro == '' 
              ? <MaterialIcons name='error-outline' size={25} color='#ff0000'/>
              : ''
            }
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>Senha</Text>
        <View style={styles.inputArea}>
          <TextInput 
          autoCapitalize='none'
          placeholder='Sua senha' 
          style={styles.inputAreaText}
          value={senhaCadastro}
          onChangeText={ (valorSenha) => setSenhaCadastro(valorSenha) }
          secureTextEntry={esconderSenha}
          />

          <TouchableOpacity 
          style={styles.icon}
          onPress={ () => setEsconderSenha(!esconderSenha) }>
            { esconderSenha 
              ? <Ionicons name='eye' size={25} color='#dbc500'/>
              : <Ionicons name='eye-off' size={25} color='#dbc500'/>
            }
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
        style={styles.button}
        onPress={CadastroBotao}>
          <Text style={styles.buttonText}>Avançar</Text>
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
  input:{
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 12,
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
  buttonRegister:{
    marginTop: 14,
    alignSelf: 'center'
  },
  registerText:{
    color: '#a1a1a1'
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
  icon:{
    width: '10%',
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  buttonModal: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonClose: {
    backgroundColor: "#dbc500",
    width: '100%'
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
