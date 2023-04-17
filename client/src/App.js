import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./layouts/Login";
import Signup from "./layouts/Signup";
import NotFound from "./layouts/NotFound";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </Router>
    );
}

export default App;
