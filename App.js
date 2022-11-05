import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import { Provider as PaperProvider, Button, TextInput } from "react-native-paper";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TelaSeleção from './screens/TelaSeleção';
import ConvMassa from './screens/ConvMassa';
import ConvVelocidade from './screens/ConvVelocidade';
import ConvTempo from './screens/ConvTempo';
import ConvVolume from './screens/ConvVolume';
import ConvTemperatura from './screens/ConvTemperatura';
import KpG from './screens/subScreens/Massa/KpG';
import GpK from './screens/subScreens/Massa/GpK';
import KMpMPH from './screens/subScreens/Velocidade/KMpMPH';
import MPHpKM from './screens/subScreens/Velocidade/MPHpKM';
import HRpMN from './screens/subScreens/Tempo/HRpMN';
import MNpHR from './screens/subScreens/Tempo/MNpHR';
import LTpMC from './screens/subScreens/Volume/LTpMC';
import MCpLT from './screens/subScreens/Volume/MCpLT';
import CELpFR from './screens/subScreens/Temperatura/CELpFR';
import FRpCEL from './screens/subScreens/Temperatura/FRpCEL';
import CELpKEL from './screens/subScreens/Temperatura/CELpKEL';


const Stack = createNativeStackNavigator();

export default function App() {
  return (


    <PaperProvider>
      <NavigationContainer>
        <StatusBar style="light" translucent={true} />
        <View style={{ flex: 1 }} >
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="TelaSeleção" component={TelaSeleção}
              options={{
                headerStyle: {
                  backgroundColor: "#35D672",
                },
                title: "Bem vindo",
              }} />
            <Stack.Screen name="ConvMassa" component={ConvMassa}
              options={{
                headerStyle: {
                  backgroundColor: "#35D672",
                },
                title: "Conversor de Massa",
              }}
            />
            <Stack.Screen name="ConvVelocidade" component={ConvVelocidade}
              options={{
                headerStyle: {
                  backgroundColor: "#35D672",
                },
                title: "Conversor de Velocidade",
              }}
            />
            <Stack.Screen name="ConvTempo" component={ConvTempo} 
            options={{
              headerStyle: {
                backgroundColor: "#35D672",
              },
              title: "Conversor de Tempo",
            }}/>
            <Stack.Screen name="ConvVolume" component={ConvVolume} 
            options={{
              headerStyle: {
                backgroundColor: "#35D672",
              },
              title: "Conversor de Volume",
            }}/>
            <Stack.Screen name="ConvTemperatura" component={ConvTemperatura} 
            options={{
              headerStyle: {
                backgroundColor: "#35D672",
              },
              title: "Conversor de Temperatura",
            }}/>
            <Stack.Screen name="KpG" component={KpG} 
            options={{
              headerStyle: {
                backgroundColor: "#35D672",
              },
              title: "Kilograma para Gramas",
            }}/>
            <Stack.Screen name="GpK" component={GpK} 
            options={{
              headerStyle: {
                backgroundColor: "#35D672",
              },
              title: "Grama para Kilograma",
            }}/>
            <Stack.Screen name="KMpMPH" component={KMpMPH} 
            options={{
              headerStyle: {
                backgroundColor: "#35D672",
              },
              title: "Km/h para MPH",
            }}/>
            <Stack.Screen name="MPHpKM" component={MPHpKM} 
            options={{
              headerStyle: {
                backgroundColor: "#35D672",
              },
              title: "MPH para Km/h",
            }}/>
            <Stack.Screen name="HRpMN" component={HRpMN} 
            options={{
              headerStyle: {
                backgroundColor: "#35D672",
              },
              title: "Hora para Minutos",
            }}/>
            <Stack.Screen name="MNpHR" component={MNpHR} 
            options={{
              headerStyle: {
                backgroundColor: "#35D672",
              },
              title: "Minutos para Horas",
            }}/>
            <Stack.Screen name="LTpMC" component={LTpMC} 
            options={{
              headerStyle: {
                backgroundColor: "#35D672",
              },
              title: "Litros para Metro cubico",
            }}/>
            <Stack.Screen name="MCpLT" component={MCpLT} 
            options={{
              headerStyle: {
                backgroundColor: "#35D672",
              },
              title: "Metro cubico para Litro",
            }}/>
            <Stack.Screen name="CELpFR" component={CELpFR} 
            options={{
              headerStyle: {
                backgroundColor: "#35D672",
              },
              title: "Celsius para Fahrenheit",
            }}/>
            <Stack.Screen name="FRpCEL" component={FRpCEL} 
            options={{
              headerStyle: {
                backgroundColor: "#35D672",
              },
              title: "Fahrenheit para Celsius",
            }}/>
            <Stack.Screen name="CELpKEL" component={CELpKEL} 
            options={{
              headerStyle: {
                backgroundColor: "#35D672",
              },
              title: "Kelvin para Celsius",
            }}/>

          </Stack.Navigator>
        </View>
      </NavigationContainer>
    </PaperProvider >

  );
}

const styles = StyleSheet.create({
  viewPrincipal: {
  },
});
