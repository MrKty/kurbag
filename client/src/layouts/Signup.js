import React from 'react';
import SignupCard from "../components/SignupCard";
import {Container, Image} from "react-bootstrap";
import logo from "../icons/app_logo_with_name.svg";

const Signup = () => {
    return (
        <Container fluid style={{backgroundColor: "#F0F2F5"}}>
            <Image src={logo} alt="Logo" className={"d-block mx-auto w-25 pt-3 pb-3"}/>
            <SignupCard/>
        </Container>
    );
};

export default Signup;