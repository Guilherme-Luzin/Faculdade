import React, { useState } from 'react'
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput 
} from 'react-native'

import * as Animatable from 'react-native-animatable'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

import Repositorio_LoginCadastro from '../../Repositorio/Repositorio_LoginCadastro'

export default function SignIn() {
  const navigation = useNavigation();

  const [senha, setSenha] = useState('');
  const [esconderSenha, setEsconderSenha] = useState(true);
  const [email, setEmail] = useState('');
  const [dadosBanco, setDadosBanco] = useState('');

  function VerificaLogin(){
    if(email == '' && senha == ''){ 
      return alert("Usuário ou Senha Inválido(s)"); 
    }
    try{
      Repositorio_LoginCadastro.obterParaLogin(email, senha).then(dados => setDadosBanco(dados));

      if(dadosBanco == null || dadosBanco.email != email || dadosBanco.senha != senha){
        return alert("Usuário ou Senha Inválido(s)");
    }
      navigation.navigate('Home')
    }
    catch(erro){
      alert(`Erro [${erro}] ao validar login`)
    }
  }
  return (
    <View style={styles.container}>

      <Animatable.View animation='fadeInLeft' delay={500} style={styles.containerHeader}>
        <Text style={styles.message}>Bem-Vindo(a)</Text>
      </Animatable.View>

      <Animatable.View animation='fadeInUp' delay={500} style={styles.containerForm}>
        <Text style={styles.title}>Email</Text>
        <TextInput 
        autoCapitalize='none'
        keyboardType='email-address'
        placeholder='exemplo@exemplo.exemplo' 
        style={styles.input}
        value={email}
        onChangeText={ (valorEmail) => setEmail(valorEmail)}
        />

        <Text style={styles.title}>Senha</Text>
        <View style={styles.inputArea}>
          <TextInput 
          placeholder='Sua senha'
          autoCapitalize='none'
          style={styles.inputAreaText}
          value={senha}
          onChangeText={ (valorSenha) => setSenha(valorSenha) }
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
        onPress={ () => VerificaLogin() }>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity 
        style={styles.buttonRegister}
        onPress={ () => navigation.navigate('SignUp') } >
          <Text style={styles.registerText}>Não possui uma conta? Cadastre-se</Text>
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
    marginTop: '14%',
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
    color: '#fff',
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
  }
})
