import React from 'react';
import SignupCard from "../components/SignupCard";
import {Container, Image} from "react-bootstrap";
import logo from "../icons/app_logo_with_name.svg";
import OrganizationCreationCard from "../components/OrganizationCreationCard";

const OrganizationCreator = () => {
    return (
        <Container fluid style={{backgroundColor: "#F0F2F5"}}>
            <Image src={logo} alt="Logo" className={"d-block mx-auto w-25 pt-2 pb-2"}/>
            <OrganizationCreationCard/>
        </Container>
    );
};

export default OrganizationCreator;