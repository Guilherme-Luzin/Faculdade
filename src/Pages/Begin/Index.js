import { 
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'

import Repositorio_Servicos from '../../Repositorio/Repositorio_Sqlite/Repositorio_Servicos'

export default function Begin({ route }) {
  const navigation = useNavigation();

  const [dadosBanco, setDadosBanco] = useState([]);

  useEffect(() => {
    Repositorio_Servicos.obterComUsuario().then(itens => setDadosBanco(itens));
  }, [route]);

  // console.log(dadosBanco);
  return (
    <View style={styles.container}>
      <FlatList 
        showsVerticalScrollIndicator={false}
        data={dadosBanco}
        renderItem={( { item } ) => {
            return(
                <View style={styles.Servico}>
                    <Text
                    style={styles.nomeTexo}>
                      {item.titulo} - {item.descricao} - Valor: {item.valorServico}
                    </Text>
                    <Text style={styles.subTexto}>
                        Numero do Cliente: {item.celular} | Nome: {item.nome}
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
    flexDirection: "column",
    justifyContent: "space-between",
    marginTop: 10
  },
  nomeTexo:{
      width:"75%",
      alignContent: "flex-start",
      backgroundColor: "#253bfa",
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
      backgroundColor: "#253bfa",
      color: "#fff",
      padding: 12,
      paddingHorizontal: 20,
      marginRight: 15,
      marginTop: -20,
      color: "#fff",
      fontSize: 15
  }
})