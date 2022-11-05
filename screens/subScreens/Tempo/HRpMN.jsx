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


const ConvertHRpMN = ({ title, label }) => {
    const [Hora, setHora] = React.useState("");
    const [HoraSalvo, setHoraSalvo] = React.useState("");
    const [HoraResultado, setHoraResultado] = React.useState("")
    const [HoraAntes, setHoraAntes] = React.useState("")



    const salvarHora = async () => {

        AsyncStorage.setItem("@HoraAntes", Hora);
        AsyncStorage.setItem("@Hora", String(Hora * 60));
        setHoraResultado(Hora * 60)
        getHora();

    };

    const getHora = async () => {


        try {
            const value = await AsyncStorage.getItem("@Hora");
            const value2 = await AsyncStorage.getItem("@HoraAntes");
            if (value !== null) {
                // se o value for diferente de null, quer dizer que já havia sido salvo anteriormente.
                setHoraSalvo(value);
                setHoraAntes(value2);

            }
        } catch (e) {
            // error reading value
        }

    };

    useEffect(() => {
        // recuperando valor no momento que a tela é aberta
        getHora();
    }, []);

    return (
        <View View style={styles.view2}>
            <TextInput
                keyboardType='Numeric'
                title={title}
                label={label}
                value={Hora}
                onChangeText={(texto) => setHora(texto)}
                style={styles.input}
            />
            <Button
                style={styles.botao}
                mode="elevated"
                onPress={() => {
                    if (Hora !== "") {
                        salvarHora();
                        Keyboard.dismiss();
                    }
                }}
            >
                calcular
            </Button>
            <Text style={styles.texto}>Resultado: {HoraResultado} Minutos</Text>
            <Text style={styles.Historico}>Ultimo resultado: {HoraAntes} Hora(s) --- {HoraSalvo} Minuto(s)</Text>
        </View>


    );

};


// FUNÇÃO PRINCIPAL
export default function HRpMN() {



    return (
    
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.viewPrincipal}>
                    <Text style={styles.title}>
                        Converta Hora para Minuto
                    </Text>
                    <ConvertHRpMN />
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