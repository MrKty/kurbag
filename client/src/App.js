import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./layouts/Login";
import Signup from "./layouts/Signup";
import NotFound from "./layouts/NotFound";
import Blogs from "./layouts/Blogs";
import Jobs from "./layouts/Jobs";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/blogs" element={<Blogs/>}/>
                <Route path="/jobs" element={<Jobs/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </Router>
    );
}

export default App;
