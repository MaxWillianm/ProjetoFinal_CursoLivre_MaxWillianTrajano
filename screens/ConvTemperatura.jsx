import React, { useState, useEffect } from 'react';
import {
    Image,
    Text,
    View,
    StyleSheet,
} from 'react-native';
import { Provider as PaperProvider, Button, Surface } from "react-native-paper";
import {
    useFonts,
    Inter_900Black,
} from '@expo-google-fonts/inter';


// FUNÇÃO PRINCIPAL
export default function ConvTemperatura({ navigation }) {
    let [fontsLoaded] = useFonts({
        Inter_900Black,
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={styles.viewPrincipal}>

            <Text style={styles.texto}>Selecione o conversor desejado
            </Text>
            <Surface style={styles.surface}>
                <Image style={styles.image} source={require('../images/celsius.png')}></Image>
                <Button
                    style={styles.botao}
                    mode="elevated"
                    onPress={() => navigation.navigate('CELpFR')}>
                    Celsius para Fahrenheit
                </Button>
            </Surface>

            <Surface style={styles.surface}>
                <Image style={styles.image} source={require('../images/fahrenheit.png')}></Image>
                <Button
                    style={styles.botao}
                    mode="elevated"
                    onPress={() => navigation.navigate('FRpCEL')}>
                    Fahrenheit para Celsius
                </Button>
            </Surface>

            <Surface style={styles.surface}>
                <Image style={styles.image} source={require('../images/kelvin.png')}></Image>
                <Button
                    style={styles.botao}
                    mode="elevated"
                    onPress={() => navigation.navigate('CELpKEL')}>
                    Celsius para Kelvin
                </Button>
            </Surface>
        </View>
    )
}

const styles = StyleSheet.create({
    viewPrincipal: {
        flex: 1,
        justifyContent: "flex-start",
        backgroundColor: "#2E9C9C"

    },
    title: {
        fontSize: 35,
        marginVertical: 2,
        color: "#5F9494",


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
        flex: 0,
        width: 50,
        height: 50,
        margin: 0,
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
        flex: 0,
        flexDirection: "row",
        height: 100,
        width: 325,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        margin: 15,
        borderRadius: 10,
        backgroundColor: "#83E7E6",

    },
});