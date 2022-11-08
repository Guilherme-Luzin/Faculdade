import { 
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
  Modal,
  Pressable
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'

import Repositorio_Servicos from '../../Repositorio/Repositorio_Sqlite/Repositorio_Servicos'

export default function Begin({ route }) {
  const navigation = useNavigation();

  const [dadosBanco, setDadosBanco] = useState([]);
  const [modal, setModal] = useState(false);
  const [servicoModal, setServicoModal] = useState('');
  
  function FormataCelular(celular){
    return celular.replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{5})(\d)/, '$1-$2')
            .replace(/(-\d{4})\d+?$/, '$1');
  }

  function AlertaDeChat(celular){
    return alert(`O recurso de chat ainda está em desenvolvimento, por favor pegue o número do cliente e chame por meio externo - Número do Cliente: [${FormataCelular(celular)}]`)
  }

  function deletarServico(id){
    Repositorio_Servicos.deletarServico(id)
    .then(alert("Serviço deletado com sucesso"))
    .then(setModal(!modal))
    .then(navigation.navigate("Begin"))
  }

  useEffect(() => {
    Repositorio_Servicos.obterComUsuario().then(itens => setDadosBanco(itens));
  }, [route]);

  return (
    <View style={styles.container}>

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
            <Text style={styles.modalTitle}>Detalhes Do Serviço</Text>
            
            <Text style={styles.modalSubTitle}>titulo:</Text>
            <Text style={styles.modalText}>{servicoModal.titulo}</Text>
            
            <Text style={styles.modalSubTitle}>Descriçao:</Text>
            <Text style={styles.modalText}>{servicoModal.descricao}</Text>
            
            <Text style={styles.modalSubTitle}>Nome do cliente:</Text>
            <Text style={styles.modalText}>{servicoModal.nome}</Text>

            <Text style={styles.modalSubTitle}>Número do cliente:</Text>
            <Text style={styles.modalText}>{servicoModal.celular}</Text>

            <Text style={styles.modalSubTitle}>Endereço:</Text>
            <Text style={styles.modalText}>{servicoModal.endereco} - {servicoModal.cep}</Text>

            <Text style={styles.modalSubTitle}>Valor Do Serviço:</Text>
            <Text style={styles.modalText}>{servicoModal.valorServico}</Text>
            
            <View style={styles.containerButtonModal}>
              <Pressable
                style={[styles.buttonModal, styles.buttonClose]}
                onPress={() => AlertaDeChat(servicoModal.celular.toString())}
              >
                <Text style={styles.textStyle}>Aceitar</Text>
              </Pressable>
              <Pressable
                style={[styles.buttonModal, styles.buttonClose]}
                onPress={() => setModal(!modal)}
              >
                <Text style={styles.textStyle}>Fechar</Text>
              </Pressable>
              <Pressable
                style={[styles.buttonModal, styles.buttonEdit]}
                onPress={() => AlertaDeChat(servicoModal.celular.toString())}
              >
                <Text style={styles.textStyle}>Editar</Text>
              </Pressable>
              <Pressable
                style={[styles.buttonModal, styles.buttonDelete]}
                onPress={() => servicoModal.nome == route.params.usuario.nome
                  ? deletarServico(servicoModal.id)
                  : alert('Somente o criador do serviço pode deletá-lo')}
              >
                <Text style={styles.textStyle}>Deletar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <FlatList 
        showsVerticalScrollIndicator={false}
        data={dadosBanco}
        renderItem={( { item } ) => {
            return(
                <View style={styles.Servico}>
                    <Text
                    onPress={() => {setModal(!modal), setServicoModal(item)}}
                    style={styles.nomeTexo}>
                      {item.titulo} - {item.descricao} - Valor: {item.valorServico}
                    </Text>
                    <Text
                    onPress={() => {setModal(!modal), setServicoModal(item)}}
                    style={styles.enderecoTexto}>
                      {item.endereco} - {item.cep}
                    </Text>
                    <Text 
                    onPress={() => {setModal(!modal), setServicoModal(item)}}
                    style={styles.subTexto}>
                        Numero do Cliente: {FormataCelular(item.celular.toString())} | Nome: {item.nome}
                    </Text>
                </View>
            )
        }}
      />

      <TouchableOpacity 
      style={styles.buttonNewServico}
      onPress={() => navigation.navigate("Services", route.params.usuario)}>
          <Text style={styles.iconButton}>
            <AntDesign name="plus" size={24} color="black" />
          </Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  buttonNewServico:{
    width: 60,
    height: 60,
    position: "absolute",
    bottom: 70,
    left: 315,
    backgroundColor: "#dbc500",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  iconButton:{
    color:"#ffffff",
    fontSize: 20,
    fontWeight: "bold"
  },
  Servico:{
    width: "133%",
    backgroundColor: "#253bfa",
    flexDirection: "column",
    justifyContent: "space-between",
    marginTop: 10
  },
  nomeTexo:{
    width:"75%",
    alignContent: "flex-start",
    padding: 12,
    paddingHorizontal: 20,
    marginBottom: 5,
    marginRight: 15,
    color: "#fff",
    fontSize: 20
  },
  subTexto:{
    width:"75%",
    alignContent: "flex-start",
    color: "#fff",
    padding: 12,
    paddingHorizontal: 20,
    marginRight: 15,
    marginTop: -15,
    color: "#fff",
    fontSize: 15
  },
  enderecoTexto:{
  width:"75%",
  alignContent: "flex-start",
  color: "#fff",
  padding: 12,
  paddingHorizontal: 20,
  marginRight: 15,
  marginTop: -20,
  color: "#fff",
  fontSize: 20
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
  buttonDelete: {
    backgroundColor: "red",
    width: '100%',
  },
  buttonEdit: {
    backgroundColor: "blue",
    width: '100%',
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 10,
    textAlign: "center",
    fontSize: 16,
  },
  modalTitle: {
    marginBottom: 20,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  modalSubTitle: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  containerButtonModal: {
    width: "35%",
    flexDirection: "row",
  }
})