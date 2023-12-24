import React, { useContext } from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from './providers/auth-provider';


function NavBar() {
    const { user, signIn, signOut } = useContext(AuthContext)
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#home">My Blog</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <li className='hello-message'>{user ? `hello ${user.userName}` : ''}</li>
                        {/* Use Link with className 'nav-link' */}
                        <Link to="/" className="nav-link">Home</Link>
                        <Link to="/posts" className="nav-link">Posts</Link>

                        {user && (
                            <Link to="/admin" className="nav-link">Admin</Link>
                        )}
                        <li className='nav-link'><a>{user ? <button onClick={signOut} >sign out </button> : <button onClick={signIn} >sign in </button>}</a></li>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Posts</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
export default NavBar;
