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


const ConvertCELpFR = ({ title, label }) => {
    const [Celsius, setCelsius] = React.useState("");
    const [CelsiusSalvo, setCelsiusSalvo] = React.useState("");
    const [CelsiusResultado, setCelsiusResultado] = React.useState("")
    const [CelsiusAntes, setCelsiusAntes] = React.useState("")



    const salvarCelsius = async () => {

        AsyncStorage.setItem("@CelsiusAntes", Celsius);
        AsyncStorage.setItem("@Celsius", String(Celsius * 1.8 + 32));
        setCelsiusResultado((Celsius * 1.8) + 32)
        getCelsius();

    };

    const getCelsius = async () => {


        try {
            const value = await AsyncStorage.getItem("@Celsius");
            const value2 = await AsyncStorage.getItem("@CelsiusAntes");
            if (value !== null) {
                // se o value for diferente de null, quer dizer que já havia sido salvo anteriormente.
                setCelsiusSalvo(value);
                setCelsiusAntes(value2);

            }
        } catch (e) {
            // error reading value
        }

    };

    useEffect(() => {
        // recuperando valor no momento que a tela é aberta
        getCelsius();
    }, []);

    return (
        <View style={styles.view2}>
            <TextInput
                keyboardType='Numeric'
                title={title}
                label={label}
                value={Celsius}
                onChangeText={(texto) => setCelsius(texto)}
                style={styles.input}
            />
            <Button
                style={styles.botao}
                mode="elevated"
                onPress={() => {
                    if (Celsius !== "") {
                        salvarCelsius();
                        Keyboard.dismiss();
                    }
                }}
            >
                calcular
            </Button>
            <Text style={styles.texto}>Resultado: {parseFloat(CelsiusResultado).toFixed(1)}° Fahrenheit</Text>
            <Text style={styles.Historico}>Ultimo resultado: {CelsiusAntes}° Celsius --- {parseFloat(CelsiusSalvo).toFixed(1)}° Fahrenheit</Text>
        </View>


    );

};


// FUNÇÃO PRINCIPAL
export default function CELpFR() {
    return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.viewPrincipal}>
                    <Text style={styles.title}>
                        Converta Celsius para Fahrenheit
                    </Text>
                    <ConvertCELpFR />
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
        fontSize: 23,
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