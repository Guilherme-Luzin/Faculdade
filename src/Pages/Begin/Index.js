import { 
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons'

export default function Begin() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity 
      style={styles.buttonNewTask}
      onPress={() => navigation.navigate("Services")}>
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
  }
})