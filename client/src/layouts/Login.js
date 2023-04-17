import React from "react";
import LoginCard from "../components/LoginCard"
import logo from '../icons/app_logo_with_name.svg';
import {Container, Image} from "react-bootstrap";

function Login() {
    return (
        // Following is used to make component fill the whole page
        <Container fluid className={"vh-100"} style={{backgroundColor: "#F0F2F5"}}>
            <Image src={logo} alt="Logo" className={"d-block mx-auto w-25 pt-3 pb-3"}/>
            <LoginCard></LoginCard>
        </Container>
    );
}

export default Login;
