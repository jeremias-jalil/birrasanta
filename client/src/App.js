import "./App.css";
import { Route } from "react-router";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import Home from "./views/Home";
import User from "./views/User";
import Dial from "./components/Dial/Dial";

const mdTheme = createTheme({
  palette: {
    primary: {
      main: "#DE0903",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={mdTheme}>
      <div>
        <Route exact path="/" component={Home} />
        <Route path="/user/:id" component={User} />
        <Dial />
      </div>
    </ThemeProvider>
  );
}

export default App;
