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

export default function Categoria() {
  const navigation = useNavigation();

  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState('');

  function FinalizaCadastro(){
    alert('Cadastro realizado com sucesso')
    navigation.navigate('Home')
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
