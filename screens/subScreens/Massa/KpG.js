import React, { useState, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    Text,
    View,
    StyleSheet,
    Keyboard,
    TouchableWithoutFeedback,
} from 'react-native';
import { Provider as PaperProvider, Button, TextInput } from "react-native-paper";

const ConvertKpG = ({ title, label }) => {
    const [Kilo, setKilo] = React.useState("");
    const [KiloSalvo, setKiloSalvo] = React.useState("");
    const [KiloResultado, setKiloResultado] = React.useState("")
    const [KiloAntes, setKiloAntes] = React.useState("")


    const salvarKilo = async () => {

        AsyncStorage.setItem("@KiloAntes", Kilo);
        AsyncStorage.setItem("@Kilo", String(Kilo * 1000));
        setKiloResultado(Kilo * 1000)
        getKilo();
    };

    const getKilo = async () => {


        try {
            const value = await AsyncStorage.getItem("@Kilo");
            const value2 = await AsyncStorage.getItem("@KiloAntes");
            if (value !== null) {
                // se o value for diferente de null, quer dizer que já havia sido salvo anteriormente.
                setKiloSalvo(value);
                setKiloAntes(value2);
            }
        } catch (e) {
            // error reading value
        }

    };

    useEffect(() => {
        // recuperando valor no momento que a tela é aberta
        getKilo();
    }, []);

    return (
        <View style={styles.view2}>
            <TextInput
                keyboardType='Numeric'
                title={title}
                label={label}
                value={Kilo}
                onChangeText={(texto) => setKilo(texto)}
                style={styles.input}
            />
            <Button
                style={styles.botao}
                mode="elevated"
                onPress={() => {
                    if (Kilo !== "") {
                        salvarKilo();
                        Keyboard.dismiss();
                    }
                }}
            >
                calcular
            </Button>
            <Text style={styles.texto}>Resultado: {KiloResultado} Grama(s)</Text>
            <Text style={styles.Historico}>Ultimo resultado: {KiloAntes} Kilo(s) --- {KiloSalvo} Grama(s)</Text>
        </View>


    );

};


// FUNÇÃO PRINCIPAL
export default function KpG() {
    return (

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.viewPrincipal}>
                <Text style={styles.title}>
                    Insira o valor em Kilogramas a ser convertido
                </Text>
                <ConvertKpG />
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
        fontSize: 22,
        marginVertical: 30,
        color: "#144242",
        padding: 10,
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