import React, { useState } from 'react'
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    TextInput 
} from 'react-native'

import * as Animatable from 'react-native-animatable'
import { useNavigation } from '@react-navigation/native'

import Repositorio_LoginCadastro from '../../Repositorio/Repositorio_Sqlite/Repositorio_LoginCadastro'

export default function Categoria({ route }) {
  const navigation = useNavigation();

  const nome = route.params.nomeCadastro;
  const email = route.params.emailCadastro;
  const celular = route.params.celularFormatado;
  const senha = route.params.senhaCadastro;

  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState('');

  function FinalizaCadastro(){
    if(categoria == '' || descricao == ''){
      return alert("Preencha todos os campos");
    }
    try{
      const dadosUsuario = {nome, email, celular, senha, categoria, descricao}
      // console.log(`${dadosUsuario.nome}, ${dadosUsuario.email}, ${dadosUsuario.celular}, 
      // ${dadosUsuario.senha}, ${dadosUsuario.categoria}, ${dadosUsuario.descricao}`)
      Repositorio_LoginCadastro.incluirUsuario(dadosUsuario)
      .then(response => alert("Cadastrado realizado com sucesso"))
      .then(response => navigation.navigate('Home'));
    }
    catch(erro){
      alert(`Erro [${erro}] ao realizar cadastro`)
    }
  }

  return (
    <View style={styles.container}>

      <Animatable.View animation='fadeInLeft' delay={500} style={styles.containerHeader}>
        <Text style={styles.message}>Cadastro de Categoria</Text>
      </Animatable.View>

      <Animatable.View animation='fadeInUp' delay={500} style={styles.containerForm}>
        <Text style={styles.title}>Selecione a Categoria</Text>
        <TextInput 
          placeholder='Sua Categoria' 
          style={styles.input}
          value={categoria}
          onChangeText={ (valorCategoria) => setCategoria(valorCategoria) }
          />

        <Text style={styles.title}>Descrição da Categoria</Text>
        <TextInput 
        placeholder='Escreva uma breve descrição do que você faz' 
        multiline={true}
        style={styles.inputDescricao}
        value={descricao}
        onChangeText={ (valorDescricao) => setDescricao(valorDescricao) }
        />

        <TouchableOpacity 
        style={styles.button}
        onPress={() => FinalizaCadastro()}>
          <Text style={styles.buttonText}>Cadastre-se</Text>
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
  inputDescricao:{
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
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  },
})
