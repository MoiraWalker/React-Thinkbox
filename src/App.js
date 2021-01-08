import './App.scss';
import { Routes }  from './routes';
import { BrowserRouter as Router } from 'react-router-dom';
import { NavBar} from "./components/nav/navbar";
import BurgerBarContextProvider from "./context/burgerBarContextProvider";

function App() {
  return (
    <div className="App">
        <Router>
            <BurgerBarContextProvider>
                <nav>
                    <NavBar/>
                </nav>
                <main>
                    <Routes/>
                </main>
            </BurgerBarContextProvider>

        </Router>
    </div>
  );
}

export default App;
