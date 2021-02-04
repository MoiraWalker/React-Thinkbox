import './App.scss';
import { Routes }  from './routes';
import { BrowserRouter as Router } from 'react-router-dom';
import { NavBar} from "./components/nav/navbar";
import BurgerBarContextProvider from "./context/burgerBarContextProvider";
import { AuthContextProvider } from "./context/authContextProvider/index";

function App() {
  return (
    <div className="App">
        <Router>
            <AuthContextProvider>
                <BurgerBarContextProvider>
                    <nav>
                        <NavBar/>
                    </nav>
                    <main>
                        <Routes/>
                    </main>
                </BurgerBarContextProvider>
            </AuthContextProvider>
        </Router>
    </div>
  );
}

export default App;
