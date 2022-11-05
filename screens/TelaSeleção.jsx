import {
    Image,
    Text,
    View,
    StyleSheet,
    ScrollView,
} from 'react-native';
import { Provider as PaperProvider, Button, Surface } from "react-native-paper";


const BlocoSelecao = ({ value, buttonPress, image }) => {
    return (
        <Surface onPress elevation={5} style={styles.surface}>
            <Image style={styles.image} source={image}></Image>
            <Text style={styles.textoSurface}>{value}</Text>
            <Button onPress={buttonPress} style={styles.botao} mode="elevated" >ENTRAR</Button>
        </Surface>
    )
}

export default function TelaSeleção({ navigation }) {
    return (
        <ScrollView>
            <PaperProvider>
                <View style={styles.viewPrincipal}>
                    <BlocoSelecao image={require('../images/balance.png')} value={'Massa'} buttonPress={() => navigation.navigate('ConvMassa')} />
                    <BlocoSelecao image={require('../images/speedometer.png')} value={'Velocidade'} buttonPress={() => navigation.navigate('ConvVelocidade')} />
                    <BlocoSelecao image={require('../images/clock.png')} value={'Tempo'} buttonPress={() => navigation.navigate('ConvTempo')} />
                    <BlocoSelecao image={require('../images/beaker.png')} value={'Volume'} buttonPress={() => navigation.navigate('ConvVolume')} />
                    <BlocoSelecao image={require('../images/warm.png')} value={'Temperatura'} buttonPress={() => navigation.navigate('ConvTemperatura')} />
                </View>
            </PaperProvider>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    viewPrincipal: {
        flex: 0,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#2E9C9C"

    },
    image: {
        flex: 0,
        width: 70,
        height: 70

    },
    botao: {
        backgroundColor: "#FCFF00",
        height: 40,
        width: 200,

    },
    surface: {
        padding: 5,
        height: 200,
        width: 325,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        borderRadius: 10,
        backgroundColor: "#83E7E6",

    },
    textoSurface: {
        padding: 8,
        fontSize: 30,
    }
});