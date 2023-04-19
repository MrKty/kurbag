import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./layouts/Login";
import Signup from "./layouts/Signup";
import NotFound from "./layouts/NotFound";
import Blogs from "./layouts/Blogs";
import Jobs from "./layouts/Jobs";
import CareerExpertApplications from "./layouts/CareerExpertApplications";
import BlogEditor from "./layouts/BlogEditor";
import OrganizationCreator from "./layouts/OrganizationCreator";
import OrganizationHomePage from "./layouts/OrganizationHomePage";
import OrganizationEmployeePage from "./layouts/OrganizationEmployeePage";
import BlogViewer from "./layouts/BlogViewer";
import RecruiterViewer from "./layouts/RecruiterViewer";


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/blogs" element={<Blogs/>}/>
                <Route path="/jobs" element={<Jobs/>}/>
                <Route path="/approve-applications" element={<CareerExpertApplications/>}/>
                <Route path="/write-blog" element={<BlogEditor/>}/>
                <Route path="/create-organization" element={<OrganizationCreator/>}/>
                <Route path="/org-home" element={<OrganizationHomePage/>}/>
                <Route path="/org-employees" element={<OrganizationEmployeePage/>}/>
                <Route path="/blog-viewer" element={<BlogViewer/>}/>
                <Route path="/recruiter-view" element={<RecruiterViewer/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </Router>
    );
}

export default App;
