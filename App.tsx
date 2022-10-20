import { ThemeProvider } from "styled-components"; // Para envolver a aplicação com o tema definido
import { useFonts, Roboto_400Regular, Roboto_700Bold } from "@expo-google-fonts/roboto";
import theme from "@theme/index";
import Groups from "@screens/Groups";
import { ActivityIndicator } from "react-native";

export default function App() {
 const [ fontsLoaded ] = useFonts({ Roboto_400Regular,Roboto_700Bold });
  return (
    <ThemeProvider theme={theme}>
      { fontsLoaded ? <Groups /> : <ActivityIndicator />}
    </ThemeProvider>
  );
}
