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


const ConvertMPHpKM = ({ title, label }) => {
    const [MPH, setMPH] = React.useState("");
    const [MPHSalvo, setMPHSalvo] = React.useState("");
    const [MPHResultado, setMPHResultado] = React.useState("")
    const [MPHAntes, setMPHAntes] = React.useState("")



    const salvarMPH = async () => {

        AsyncStorage.setItem("@MPHAntes", MPH);
        AsyncStorage.setItem("@MPH", String(MPH * 1.60));
        setMPHResultado(MPH * 1.60)
        getMPH();

    };

    const getMPH = async () => {


        try {
            const value = await AsyncStorage.getItem("@MPH");
            const value2 = await AsyncStorage.getItem("@MPHAntes");
            if (value !== null) {
                // se o value for diferente de null, quer dizer que já havia sido salvo anteriormente.
                setMPHSalvo(value);
                setMPHAntes(value2);

            }
        } catch (e) {
            // error reading value
        }

    };

    useEffect(() => {
        // recuperando valor no momento que a tela é aberta
        getMPH();
    }, []);

    return (
        <View style={styles.view2}>
            <TextInput
                keyboardType='Numeric'
                title={title}
                label={label}
                value={MPH}
                onChangeText={(texto) => setMPH(texto)}
                style={styles.input}
            />
            <Button
                style={styles.botao}
                mode="elevated"
                onPress={() => {
                    if (MPH !== "") {
                        salvarMPH();
                        Keyboard.dismiss();
                    }
                }}
            >
                calcular
            </Button>
            <Text style={styles.texto}>Resultado: {MPHResultado} Km/h por Hora</Text>
            <Text style={styles.Historico}>Ultimo resultado: {MPHAntes} MPH --- {MPHSalvo} Km/h</Text>
        </View>


    );

};


// FUNÇÃO PRINCIPAL
export default function HRpMN() {



    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.viewPrincipal}>
                <Text style={styles.title}>
                Insira o valor em Milhas por hora a ser convertido
                </Text>
                <ConvertMPHpKM />
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
        fontSize: 23,
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