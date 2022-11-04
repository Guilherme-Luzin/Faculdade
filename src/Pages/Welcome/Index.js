import React from 'react'
import { 
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native'

import * as Animatable from 'react-native-animatable'
import { useNavigation } from '@react-navigation/native'

export default function Welcome() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>

      <View style={styles.containerLogo}>
        <Animatable.Image
        animation='flipInY' 
          source={require('../../Assets/logo.png')}
          style={{width: '100%'}}
          resizeMode='contain'
        />
      </View>

      <Animatable.View delay={600} animation="fadeInUp" style={styles.containerForm}>
      <Text style={styles.title}>Bem-Vindo ao GetNinja</Text>
        <Text style={styles.text}>Faça Login ou Cadastre-se para Começar</Text>

        <TouchableOpacity 
        style={styles.button}
        onPress={ () => navigation.navigate('SignIn')}>
          <Text style={styles.buttonText}>Acessar</Text>
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
  containerLogo:{
    flex: 2,
    backgroundColor: '#dbc500',
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerForm:{
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: '5%',
    paddingEnd: '5%',
  },
  title:{
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 28,
    marginBottom: 12,
  },
  text:{
    color: '#a1a1a1'
  },
  button:{
    position: 'absolute',
    backgroundColor: '#dbc500',
    borderRadius: 50,
    paddingVertical: 8,
    width: '60%',
    alignSelf: 'center',
    bottom: '15%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText:{
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  }
})
