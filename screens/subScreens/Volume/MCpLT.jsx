import React, { useState, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    StatusBar,
    Image,
    Text,
    View,
    StyleSheet,
    Keyboard,
    Platform,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
} from 'react-native';
import { Provider as PaperProvider, Button, TextInput, Surface, List } from "react-native-paper";


const ConvertMCpLT = ({ title, label }) => {
    const [Metro, setMetro] = React.useState("");
    const [MetroSalvo, setMetroSalvo] = React.useState("");
    const [MetroResultado, setMetroResultado] = React.useState("")
    const [MetroAntes, setMetroAntes] = React.useState("")



    const salvarMetro = async () => {

        AsyncStorage.setItem("@MetroAntes", Metro);
        AsyncStorage.setItem("@Metro", String(Metro * 1000));
        setMetroResultado(Metro * 1000)
        getMetro();

    };

    const getMetro = async () => {


        try {
            const value = await AsyncStorage.getItem("@Metro");
            const value2 = await AsyncStorage.getItem("@MetroAntes");
            if (value !== null) {
                // se o value for diferente de null, quer dizer que já havia sido salvo anteriormente.
                setMetroSalvo(value);
                setMetroAntes(value2);

            }
        } catch (e) {
            // error reading value
        }

    };

    useEffect(() => {
        // recuperando valor no momento que a tela é aberta
        getMetro();
    }, []);

    return (
        <View style={styles.view2}>
            <TextInput
                keyboardType='Numeric'
                title={title}
                label={label}
                value={Metro}
                onChangeText={(texto) => setMetro(texto)}
                style={styles.input}
            />
            <Button
                style={styles.botao}
                mode="elevated"
                onPress={() => {
                    if (Metro !== "") {
                        salvarMetro();
                        Keyboard.dismiss();
                    }
                }}
            >
                calcular
            </Button>
            <Text style={styles.texto}>Resultado: {MetroResultado} Litro(s)</Text>
            <Text style={styles.Historico}>Ultimo resultado: {MetroAntes} Metro cubicos(s) --- {MetroSalvo} Litro(s)</Text>
        </View>


    );

};


// FUNÇÃO PRINCIPAL
export default function LTpMC() {



    return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.viewPrincipal}>
                    <Text style={styles.title}>
                        Converta Metros cubicos para Litros
                    </Text>
                    <ConvertMCpLT />
                </View>
            </TouchableWithoutFeedback>
    )
}



const styles = StyleSheet.create({
    viewPrincipal: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#2E9C9C"

    },
    view2: {
        alignItems: "center"
    },
    title: {
        fontSize: 25,
        marginVertical: 2,
        color: "#144242",
        padding: 30,
        fontFamily: "Inter_900Black"
    },
    Historico: {
        fontSize: 12,
        marginVertical: 2,
        color: "#144242",
        padding: 30,
        fontFamily: "Inter_900Black"
    },
    subtitle: {
        fontSize: 14,
        color: "#408080",
    },
    texto: {
        fontSize: 25,
        color: '#144242',
        textAlign: "center",
        padding: 15,
        fontFamily: "Inter_900Black"
    },
    image: {
        flex: 1,
    },
    scrollview: {
        justifyContent: ''
    },
    input: {
        height: 50,
        width: 300,
        margin: 10,
        backgroundColor: "#D9DEDE",
        padding: 2,
        radius: 10,

    },
    botao: {
        backgroundColor: "#FCFF00",
        height: 40,
        width: 200,


    },
    surface: {
        height: 80,
        width: 340,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        borderRadius: 10,
        backgroundColor: "#144242",
    },
});