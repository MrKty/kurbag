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
import Analysis from "./layouts/Analysis";
import HomePage from "./layouts/HomePage";
import Admin from "./layouts/Admin";
import PreviousBlogs from "./layouts/PreviousBlogs";
import CvPool from "./layouts/CvPool";
import CreateEventPage from "./layouts/CreateEventPage";
import ViewEventsPage from "./layouts/ViewEventsPage";
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import CreateJob from "./layouts/CreateJob";
import OrganizationProfile from "./layouts/OrganizationProfile";
import AdminLogin from "./layouts/AdminLogin";


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
                <Route path="/login" element={<Login/>}/>
                <Route path="/admin-login" element={<AdminLogin/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/blogs" element={<Blogs/>}/>
                <Route path="/jobs" element={<Jobs/>}/>
                <Route path="/create-event" element={<CreateEventPage/>}/>
                <Route path="/create-job" element={<CreateJob/>}/>
                <Route path="/view-events" element={<ViewEventsPage/>}/>
                <Route path="/cv-pool" element={<CvPool/>}/>
                <Route path="/notifications" element={<Notifications/>}/>
                <Route path="/messages" element={<Messages/>}/>
                <Route path="/approve-applications" element={<CareerExpertApplications/>}/>
                <Route path="/write-blog" element={<BlogEditor/>}/>
                <Route path="/create-organization" element={<OrganizationCreator/>}/>
                <Route path="/org-home" element={<OrganizationHomePage/>}/>
                <Route path="/home" element={<HomePage/>}/>
                <Route path="/org-employees" element={<OrganizationEmployeePage/>}/>
                <Route path="/blog-viewer/:id" element={<BlogViewer/>}/>
                <Route path="/previous-blogs" element={<PreviousBlogs/>}/>
                <Route path="/recruiter-view" element={<RecruiterViewer/>}/>
                <Route path="/profile/:id" element={<Profile/>}/>
                <Route path="/analysis" element={<Analysis/>}/>
                <Route path="/admin" element={<Admin/>}/>
                <Route path="/org-profile" element={<OrganizationProfile/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </Router>
    );
}

export default App;
