import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function Login(){
    return(
        <View style={styles.conttainer}>
            <Text style={styles.textoNome}>Nome do App</Text>
            <Text style={styles.texto}>Bem Vindo</Text>
            <TouchableOpacity style={styles.botao}>
                <Text style={styles.textoTouchable}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.botao}>
                <Text style={styles.textoTouchable}>Cadastro</Text>
            </TouchableOpacity>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    conttainer: {
        flex: 1,
        backgroundColor: '#ffb914',
        alignItems: 'center',
    },
    header: {
        backgroundColor: '#000',
    },
    textoNome: {
        color: '#000',
        fontSize: 35,
        paddingTop: 35,
    },
    texto: {
        color: '#fff',
        alignSelf: 'center',
        fontSize: 30,
        marginBottom: 50,
        paddingTop: 120,
    },
    botao: {
        alignItems: 'center',
        backgroundColor: '#2a1919',
        padding: 10,
        margin: 5,
        width:200,
        height: 50,
        borderRadius: 50,
    },
    textoTouchable: {
        color: '#fff',
        fontSize: 20
    }
})
