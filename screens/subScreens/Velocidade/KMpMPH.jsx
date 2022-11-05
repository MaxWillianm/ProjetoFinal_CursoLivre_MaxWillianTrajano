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


const ConvertKMpMPH = ({ title, label }) => {
    const [KM, setKM] = React.useState("");
    const [KMSalvo, setKMSalvo] = React.useState("");
    const [KMResultado, setKMResultado] = React.useState(0)
    const [KMAntes, setKMAntes] = React.useState("")



    const salvarKM = async () => {

        AsyncStorage.setItem("@KMAntes", KM);
        AsyncStorage.setItem("@KM", String(KM * 0.62));
        setKMResultado(KM * 0.62)
        getKM();

    };

    const getKM = async () => {


        try {
            const value = await AsyncStorage.getItem("@KM");
            const value2 = await AsyncStorage.getItem("@KMAntes");
            if (value !== null) {
                // se o value for diferente de null, quer dizer que já havia sido salvo anteriormente.
                setKMSalvo(value);
                setKMAntes(value2);

            }
        } catch (e) {
            // error reading value
        }

    };

    useEffect(() => {
        // recuperando valor no momento que a tela é aberta
        getKM();
    }, []);

    return (
        <View style={styles.view2}>
            <TextInput
                keyboardType='Numeric'
                title={title}
                label={label}
                value={KM}
                onChangeText={(texto) => setKM(texto)}
                style={styles.input}
            />
            <Button
                style={styles.botao}
                mode="elevated"
                onPress={() => {
                    if (KM !== "") {
                        salvarKM();
                        Keyboard.dismiss();
                    }
                }}
            >
                calcular
            </Button>
            <Text style={styles.texto}>Resultado: {parseFloat(KMResultado).toFixed(2)} Milhas por hora</Text>
            <Text style={styles.Historico}>Ultimo resultado: {KMAntes} Km/h --- {parseFloat(KMSalvo).toFixed(2)} Milhas por hora</Text>
        </View>


    );

};


// FUNÇÃO PRINCIPAL
export default function KMpMPH() {



    return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.viewPrincipal}>
                    <Text style={styles.title}>
                        Converta Km/h para Milhas por hora
                    </Text>
                    <ConvertKMpMPH />
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