import React from "react";
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Home from "./pages/Home/Home";
import TodoApp from "./pages/TodoApp/TodoApp";
import WeatherApp from "./pages/WeatherApp/WeatherApp";
import AuthApp from "./pages/AuthApp/AuthApp";
import FormikForm from "./pages/FormikForm/FormikForm";
import ReadMe from './pages/ReadMe/ReadMe';
import DictionaryApp from './pages/DictionaryApp/DictionaryApp';
import NumberLogin from './pages/NumberLogin/NumberLogin';
import './index.css';
 const App = ()=> {
        return (
            <Router>
                <div className="App">
                    <Routes>
                        <Route path="/"  element={<Home />}></Route>
                        <Route path="/todo-app"  element={<TodoApp />}></Route>
                        <Route path="/weather-app"  element={<WeatherApp />}></Route>
                        <Route path="/auth-app"  element={<AuthApp />}></Route> 
                        <Route path="/formic-form"  element={<FormikForm />}></Route>  
                        <Route path="/dictionary"  element={<DictionaryApp />}></Route>   
                        <Route path="/readme"  element={<ReadMe />}></Route>  
                        <Route path="/login"  element={<NumberLogin />}></Route>   
                    </Routes>
                </div>
            </Router>
        );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);