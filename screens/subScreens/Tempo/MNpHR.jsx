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


const ConvertMNpHR = ({ title, label }) => {
    const [Minuto, setMinuto] = React.useState("");
    const [MinutoSalvo, setMinutoSalvo] = React.useState("");
    const [MinutoResultado, setMinutoResultado] = React.useState("")
    const [MinutoAntes, setMinutoAntes] = React.useState("")



    const salvarMinuto = async () => {

        AsyncStorage.setItem("@MinutoAntes", Minuto);
        AsyncStorage.setItem("@Minuto", String(Minuto / 60));
        setMinutoResultado(Minuto / 60)
        getMinuto();

    };

    const getMinuto = async () => {


        try {
            const value = await AsyncStorage.getItem("@Minuto");
            const value2 = await AsyncStorage.getItem("@MinutoAntes");
            if (value !== null) {
                // se o value for diferente de null, quer dizer que já havia sido salvo anteriormente.
                setMinutoSalvo(value);
                setMinutoAntes(value2);

            }
        } catch (e) {
            // error reading value
        }

    };

    useEffect(() => {
        // recuperando valor no momento que a tela é aberta
        getMinuto();
    }, []);

    return (
        <View style={styles.view2}>
            <TextInput
                keyboardType='Numeric'
                title={title}
                label={label}
                value={Minuto}
                onChangeText={(texto) => setMinuto(texto)}
                style={styles.input}
            />
            <Button
                style={styles.botao}
                mode="elevated"
                onPress={() => {
                    if (Minuto !== "") {
                        salvarMinuto();
                        Keyboard.dismiss();
                    }
                }}
            >
                calcular
            </Button>
            <Text style={styles.texto}>Resultado: {parseFloat(MinutoResultado).toFixed(2)} Hora(s)</Text>
            <Text style={styles.Historico}>Ultimo resultado: {MinutoAntes} Minuto(s) --- {parseFloat(MinutoSalvo).toFixed(2)} Hora(s)</Text>
        </View>


    );

};


// FUNÇÃO PRINCIPAL
export default function MNpHR() {



    return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.viewPrincipal}>
                    <Text style={styles.title}>
                        Converta Minuto para Hora
                    </Text>
                    <ConvertMNpHR />
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