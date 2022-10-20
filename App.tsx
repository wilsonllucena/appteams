import { ThemeProvider } from "styled-components"; // Para envolver a aplicação com o tema definido
import theme from "@theme/index";
import Groups from "@screens/Groups";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Groups />
    </ThemeProvider>
  );
}
