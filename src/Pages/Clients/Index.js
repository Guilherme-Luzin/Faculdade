import { 
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  Modal,
  Pressable
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import * as Animatable from 'react-native-animatable'

import Repositorio_Servicos from '../../Repositorio/Repositorio_Sqlite/Repositorio_Servicos'
import Repositorio_LoginCadastro from '../../Repositorio/Repositorio_Sqlite/Repositorio_LoginCadastro'

export default function Clients({ route }) {
  const navigation = useNavigation();

  const [dadosBanco, setDadosBanco] = useState([]);
  const [modal, setModal] = useState(false);
  const [servicoModal, setServicoModal] = useState('');
  const [seuServicos, setSeuServico] = useState([]);
  const [editaConclui, setEditaConclui] = useState('');
  const [deletaDescarta, setDeletaDescarta] = useState('');
  const [aceitosConcluidos, setAceitosConcluidos] = useState('');
  const [prestadorServico, setPrestadorServico] = useState('');
  const [idUsuario, setIdUsuario] = useState(0);
  
  function FormataCelular(celular){
    return celular?.replace(/\D/g, '')
            ?.replace(/(\d{2})(\d)/, '($1) $2')
            ?.replace(/(\d{5})(\d)/, '$1-$2')
            ?.replace(/(-\d{4})\d+?$/, '$1');
  }

  function FormataCep(cep){
    return cep?.replace(/\D/g, '')
              ?.replace(/(\d{5})(\d)/, '$1-$2')
              ?.replace(/(-\d{3})\d+?$/, '$1');
  }

  function DescartarServico(servico){
    Alert.alert("Atenção!", "Tem certeza que deseja descartar o serviço selecionado?", [
      {
        text: "Cancelar",
        onPress: () => null,
        style: "cancel"
      },
      { text: "Sim", onPress: () => { servico.idAceito = null, servico.aceito = 0, servico.status = "Aberto"
        Repositorio_Servicos.atualizarAceitoIdAceito(servico.aceito, servico.idAceito, servico.status, servico.id)
        .then(alert("Serviço descartado com sucesso"))
        .then(setModal(!modal))
        .then(navigation.navigate("Clients"))} 
      }
    ]);
  }

  function ConcluirServico(servico){
    servico.aceito = 3
    servico.status = "Concluido"

    Repositorio_Servicos.atualizarAceitoIdAceito(servico.aceito, servico.idAceito, servico.status, servico.id)
    .then(alert("Parabéns, você concluiu seu serviço!"))
    .then(setModal(!modal))
    .then(navigation.navigate("Clients"))
  }

  function DeletarServico(id){
    if(servicoModal.aceito == 1){
      return alert("Não é possível deletar serviços já aceitos")
    }

    Alert.alert("Atenção!", "Tem certeza que deseja deletar o serviço selecionado?", [
      {
        text: "Cancelar",
        onPress: () => null,
        style: "cancel"
      },
      { text: "Sim", onPress: () => Repositorio_Servicos.deletarServico(id)
                                    .then(alert("Serviço deletado com sucesso"))
                                    .then(setModal(!modal))
                                    .then(navigation.navigate("Clients")) 
      }
    ]);
  }

  function EditarServico(servico){
    if(servico.aceito == 1 || servico.aceito == 4){
      return alert("Não é possível editar serviços já aceitos / fechados")
    }
    if(servicoModal.aceito == 3){
      var idServico = servicoModal.id
      var dadosServicoUsuario = {prestadorServico, idServico}
      return navigation.navigate("Avaliation", dadosServicoUsuario)
    }
    
    navigation.navigate("Services", servicoModal)
  }

  function ApertaServico(item){
      if(item.idUsuario == idUsuario){
        if(item.aceito == 3){
          setEditaConclui("Avaliar")
          setDeletaDescarta("Deletar")
        }
        else{
          setEditaConclui("Editar")
          setDeletaDescarta("Deletar")
        }
       } 
       else {
        setEditaConclui("Concluir") 
        setDeletaDescarta("Descartar")
       }
       setModal(!modal), setServicoModal(item)

       if(item.idAceito != null && item.idAceito != 0 && item.idAceito != undefined){
        Repositorio_LoginCadastro.obterPorId(item.idAceito).then(itens => setPrestadorServico(itens))
      }
  }

  function ApertaMeusServicos(item){
    if(item.aceito == 3){
      setEditaConclui("Avaliar")
      setDeletaDescarta("Deletar")
    }
    else{
      setEditaConclui("Editar")
      setDeletaDescarta("Deletar")
    }
    setModal(!modal)
    setServicoModal(item)
    
    if(item.idAceito != null && item.idAceito != 0 && item.idAceito != undefined){
      Repositorio_LoginCadastro.obterPorId(item.idAceito).then(itens => setPrestadorServico(itens))
    }
  }

  useEffect(() => {
    (route.params.usuario.id == null || route.params.usuario.id == 0 || route.params.usuario.id == undefined)
    ? Repositorio_LoginCadastro.obterParaLogin(route.params.usuario.email, route.params.usuario.senha).then(itens => setIdUsuario(itens.id))
    : setIdUsuario(route.params.usuario.id)
    

    route.params.usuario.categoria != "Cliente"
    ? Repositorio_Servicos.obterAceitosPeloUsuario(idUsuario).then(itens => setDadosBanco(itens)).then(setAceitosConcluidos("Aceito por você"))
    : Repositorio_Servicos.obterConcluidosDoUsuario(idUsuario).then(itens => setDadosBanco(itens)).then(setAceitosConcluidos("Concluido por terceiros"));

    Repositorio_Servicos.obterTodosDoUsuario(idUsuario).then(itens => setSeuServico(itens))

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
            <Text style={styles.modalText}>{servicoModal.descricaoServico}</Text>
            
            <Text style={styles.modalSubTitle}>Nome do cliente:</Text>
            <Text style={styles.modalText}>{servicoModal.nome}</Text>

            <Text style={styles.modalSubTitle}>Número do cliente:</Text>
            <Text style={styles.modalText}>{FormataCelular(servicoModal.celular?.toString())}</Text>

            <Text style={styles.modalSubTitle}>Endereço:</Text>
            <Text style={styles.modalText}>{servicoModal.endereco} - {FormataCep(servicoModal.cep?.toString())}</Text>

            <Text style={styles.modalSubTitle}>Valor Do Serviço:</Text>
            <Text style={styles.modalText}>{servicoModal.valorServico}</Text>

            <Text style={styles.modalSubTitle}>Status Do Serviço:</Text>
            <Text style={styles.modalText}>{servicoModal.status}</Text>

            <Text style={styles.modalSubTitle}>Avaliação do Prestador de serviço:</Text>
            <Text style={styles.modalText}>{prestadorServico.avaliacao?.toFixed(1).toString()}</Text>
            
            <View style={styles.containerButtonModal}>
              <Pressable
                style={[styles.buttonModal, styles.buttonConclui]}
                onPress={() => servicoModal.idUsuario == idUsuario
                  ? EditarServico(servicoModal)
                  : ConcluirServico(servicoModal)}
              >
                <Text style={styles.textStyle}>{editaConclui}</Text>
              </Pressable>
              <Pressable
                style={[styles.buttonModal, styles.buttonClose]}
                onPress={() => setModal(!modal)}
              >
                <Text style={styles.textStyle}>Fechar</Text>
              </Pressable>
              <Pressable
                style={[styles.buttonModal, styles.buttonDelete]}
                onPress={() => servicoModal.idUsuario == idUsuario
                  ? DeletarServico(servicoModal.id)
                  : DescartarServico(servicoModal)}
              >
                <Text style={styles.textStyle}>{deletaDescarta}</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <Text style={styles.titulo}>Serviços {aceitosConcluidos}</Text>
      <FlatList 
        showsVerticalScrollIndicator={false}
        data={dadosBanco}
        renderItem={( { item } ) => {
            return(
                <Animatable.View animation='fadeInLeft' delay={250} style={styles.Servico}>
                    <Text
                    onPress={() => ApertaServico(item)}
                    style={styles.nomeTexo}>
                      {item.titulo} - {item.descricaoServico} - Valor: {item.valorServico} - Status: {item.status}
                    </Text>
                    <Text
                    onPress={() => ApertaServico(item)}
                    style={styles.enderecoTexto}>
                      {item.endereco} - {FormataCep(item.cep?.toString())}
                    </Text>
                    <Text 
                    onPress={() => ApertaServico(item)}
                    style={styles.subTexto}>
                        Numero do Cliente: {FormataCelular(item.celular?.toString())} | Nome: {item.nome}
                    </Text>
                </Animatable.View>
            )
        }}
      />

      <Text style={styles.titulo}>Meus Serviços</Text>
      <FlatList 
        showsVerticalScrollIndicator={false}
        data={seuServicos}
        renderItem={( { item } ) => {
            return(
                <Animatable.View animation='fadeInLeft' delay={250} style={styles.Servico}>
                    <Text
                    onPress={() => ApertaMeusServicos(item)}
                    style={styles.nomeTexo}>
                      {item.titulo} - {item.descricaoServico} - Valor: {item.valorServico} - Status: {item.status}
                    </Text>
                    <Text
                    onPress={() => ApertaMeusServicos(item)}
                    style={styles.enderecoTexto}>
                      {item.endereco} - {FormataCep(item.cep?.toString())}
                    </Text>
                </Animatable.View>
            )
        }}
      />
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
  titulo: {
    fontWeight: "bold",
    fontSize: 20
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
  buttonConclui: {
    backgroundColor: "green",
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