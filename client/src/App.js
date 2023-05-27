import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./layouts/Login";
import Messages from "./layouts/Messages";
import Signup from "./layouts/Signup";
import NotFound from "./layouts/NotFound";
import Blogs from "./layouts/Blogs";
import Jobs from "./layouts/Jobs";
import Notifications from "./layouts/Notifications";
import CareerExpertApplications from "./layouts/CareerExpertApplications";
import BlogEditor from "./layouts/BlogEditor";
import OrganizationCreator from "./layouts/OrganizationCreator";
import OrganizationHomePage from "./layouts/OrganizationHomePage";
import OrganizationEmployeePage from "./layouts/OrganizationEmployeePage";
import BlogViewer from "./layouts/BlogViewer";
import RecruiterViewer from "./layouts/RecruiterViewer";
import Profile from "./layouts/Profile";
import HomePage from "./layouts/HomePage";
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

const firebaseConfig = {
    // Your Firebase configuration object
    storageBucket: 'gs://cs353db.appspot.com/'
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/home" element={<Blogs/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/blogs" element={<Blogs/>}/>
                <Route path="/jobs" element={<Jobs/>}/>
                <Route path="/notifications" element={<Notifications/>}/>
                <Route path="/messages" element={<Messages/>}/>
                <Route path="/approve-applications" element={<CareerExpertApplications/>}/>
                <Route path="/write-blog" element={<BlogEditor/>}/>
                <Route path="/create-organization" element={<OrganizationCreator/>}/>
                <Route path="/org-home" element={<OrganizationHomePage/>}/>
                <Route path="/home" element={<HomePage/>}/>
                <Route path="/org-employees" element={<OrganizationEmployeePage/>}/>
                <Route path="/blog-viewer" element={<BlogViewer/>}/>
                <Route path="/recruiter-view" element={<RecruiterViewer/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </Router>
    );
}

export default App;
