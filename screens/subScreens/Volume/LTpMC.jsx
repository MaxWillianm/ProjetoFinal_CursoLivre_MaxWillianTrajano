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


const ConvertLTpMC = ({ title, label }) => {
    const [Litro, setLitro] = React.useState("");
    const [LitroSalvo, setLitroSalvo] = React.useState("");
    const [LitroResultado, setLitroResultado] = React.useState("")
    const [LitroAntes, setLitroAntes] = React.useState("")



    const salvarLitro = async () => {

        AsyncStorage.setItem("@LitroAntes", Litro);
        AsyncStorage.setItem("@Litro", String(Litro / 1000));
        setLitroResultado(Litro / 1000)
        getLitro();

    };

    const getLitro = async () => {


        try {
            const value = await AsyncStorage.getItem("@Litro");
            const value2 = await AsyncStorage.getItem("@LitroAntes");
            if (value !== null) {
                // se o value for diferente de null, quer dizer que já havia sido salvo anteriormente.
                setLitroSalvo(value);
                setLitroAntes(value2);

            }
        } catch (e) {
            // error reading value
        }

    };

    useEffect(() => {
        // recuperando valor no momento que a tela é aberta
        getLitro();
    }, []);

    return (
        <View style={styles.view2}>
            <TextInput
                keyboardType='Numeric'
                title={title}
                label={label}
                value={Litro}
                onChangeText={(texto) => setLitro(texto)}
                style={styles.input}
            />
            <Button
                style={styles.botao}
                mode="elevated"
                onPress={() => {
                    if (Litro !== "") {
                        salvarLitro();
                        Keyboard.dismiss();
                    }
                }}
            >
                calcular
            </Button>
            <Text style={styles.texto}>Resultado: {LitroResultado} M³</Text>
            <Text style={styles.Historico}>Ultimo resultado: {LitroAntes} Litro(s) --- {LitroSalvo} Metro(s) cubico(s)</Text>
        </View>


    );

};


// FUNÇÃO PRINCIPAL
export default function LTpMC() {



    return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.viewPrincipal}>
                    <Text style={styles.title}>
                        Converta Litros para Metros cubicos
                    </Text>
                    <ConvertLTpMC />
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