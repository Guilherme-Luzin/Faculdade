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

  const [dadosBanco, setDadosBanco] = useState('');

  useEffect(() => {
    Repositorio_Servicos.obterTodos().then(itens => setDadosBanco(itens));
  }, [route]);

  // console.log(dadosBanco);
  return (
    <View style={styles.container}>
      <FlatList 
        showsVerticalScrollIndicator={false}
        data={dadosBanco}
        renderItem={( { itens } ) => {
            return(
                <View style={styles.task}>
                    <Text
                    style={styles.nomeTexo}>
                        {dadosBanco.titulo}
                    </Text>
                </View>
            )
        }}
      />

      <TouchableOpacity 
      style={styles.buttonNewTask}
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
  buttonNewTask:{
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
  task:{
    width: "133%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10
  },
  nomeTexo:{
      width:"75%",
      alignContent: "flex-start",
      backgroundColor: "#6a6a6b",
      padding: 12,
      paddingHorizontal: 20,
      borderRadius: 50,
      marginBottom: 5,
      marginRight: 15,
  },
})