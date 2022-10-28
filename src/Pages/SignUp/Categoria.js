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
import { useNavigation } from '@react-navigation/native'
import { MaterialIcons } from '@expo/vector-icons'
import {Picker} from '@react-native-picker/picker';

import Repositorio_LoginCadastro from '../../Repositorio/Repositorio_Sqlite/Repositorio_LoginCadastro'

export default function Categoria({ route }) {
  const navigation = useNavigation();

  const [modal, setModal] = useState(false);
  const [campo, setCampo] = useState('');
  const nome = route.params.nomeCadastro;
  const email = route.params.emailCadastro;
  const celular = route.params.celularFormatado;
  const senha = route.params.senhaCadastro;

  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState('');

  function FinalizaCadastro(){
    if(categoria == '' || (descricao == '' && categoria != 'Cliente')){
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

        <Text style={styles.title}>Selecione a Categoria</Text>
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

          <TouchableOpacity 
          style={styles.icon}
          onPress={() => {setModal(!modal), setCampo('categoria')}}
          disabled={categoria == '' ? false : true}>
            { categoria == '' 
              ? <MaterialIcons name='error-outline' size={25} color='#ff0000'/>
              : ''
            }
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>Descrição da Categoria</Text>
        <View style={styles.inputArea}>
          <TextInput
          editable={categoria === 'Cliente' ? false : true} 
          placeholder='Escreva uma breve descrição do que você faz (Não necessário para clientes)' 
          multiline={true}
          style={styles.inputDescricao}
          value={descricao}
          onChangeText={ (valorDescricao) => setDescricao(valorDescricao) }
          />

          <TouchableOpacity 
          style={styles.iconDescricao}
          onPress={() => {setModal(!modal), setCampo('Descrição da categoria')}}
          disabled={descricao == '' ? false : true}>
            { descricao == '' 
              ? <MaterialIcons name='error-outline' size={25} color='#ff0000'/>
              : ''
            }
          </TouchableOpacity>
        </View>

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
    // borderBottomWidth: 1,
    height: 40,
    marginBottom: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconDescricao:{
    width: '10%',
    height: 40,
    marginBottom: 12,
    justifyContent: 'center',
    alignItems: 'center'
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
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
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
  },
  pickerStyle: {
    width: '100%',
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 12,
    fontSize: 16,
  }
})
