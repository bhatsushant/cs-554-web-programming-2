import React from "react";
import { Link } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import {ReactComponent as Logo} from '../assets/logo.svg';
import '../styles/Navbar.css'

const NavBar = () => {
    return (
            <Navbar bg="dark" variant="dark">
                <div className='nav-container'>
                    <Navbar.Brand>
                        <Link to='/' aria-label="Marvel Logo">                        
                            <Logo />
                        </Link>
                    </Navbar.Brand>
                    <Nav className="nav-links">
                            <Link className="nav-links bigger" to='/characters/page/0'>CHARACTERS</Link>
                    </Nav>
                    <Nav className="nav-links">
                            <Link className="nav-links bigger" to='/comics/page/0'>COMICS</Link>
                    </Nav>
                    <Nav className="nav-links">
                            <Link className="nav-links bigger" to='/series/page/0'>SERIES</Link>
                    </Nav>
                </div>
            </Navbar>
    )
}

export default NavBar;