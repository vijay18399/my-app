import React from "react";
import * as ReactDOM from 'react-dom/client';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import Home from "./pages/Home";
import TodoApp from "./pages/TodoApp/TodoApp";
import WeatherApp from "./pages/WeatherApp/WeatherApp";
import AuthApp from "./pages/AuthApp/AuthApp";
import ReactHookForm from './pages/ReactHookForm/ReactHookForm'
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
                    </Routes>
                </div>
            </Router>
        );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);