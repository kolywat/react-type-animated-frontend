import { ThemeProvider } from "./context/ThemeContext";
import AppRouter from "./router/router";

const App = () => (
  <ThemeProvider>
    <AppRouter/>
  </ThemeProvider>
);

export default App;