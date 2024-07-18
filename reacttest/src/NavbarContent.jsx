import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React, {Component} from 'react';
class NavbarContent extends Component {
    state = {}
    render() {
        return (
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/Pagination">Movie</Nav.Link>
                        <Nav.Link href="/button">Button</Nav.Link>
                        <Nav.Link href="/ChatRegistration">Chat</Nav.Link>
                        <Nav.Link href="/Product">Product</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        );
    }
}

export default NavbarContent;