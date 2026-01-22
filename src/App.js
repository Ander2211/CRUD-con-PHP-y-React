import logo from './logo.svg';
import './App.css';
import Navbar from "./components/partials/Navbar";
import { BrowserRouter } from "react-router-dom";
import Router from "./components/router/Router";
import { CookiesProvider } from "react-cookie";

function App() {
  
  return (
    <CookiesProvider>
      <BrowserRouter>
        <Navbar/>
        <Router/>
      </BrowserRouter>
    </CookiesProvider>
  );
}

export default App;
