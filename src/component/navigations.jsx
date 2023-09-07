import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from "react-bootstrap/Container";
import React, { useState, useEffect } from "react";
export function Navigation() {
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("access_token") !== null) {
      setIsAuth(true);
    }
  }, [isAuth]);
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Nav className="me-auto">
          {isAuth ? (
            <>
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/chat">chat</Nav.Link>
            </>
          ) : null}
        </Nav>
        <Nav>
          {isAuth ? (
            <Nav.Link href="/logout">Logout</Nav.Link>
          ) : (
            <Nav.Link href="/login">Login</Nav.Link>
          )}
        </Nav>
        {!isAuth && <Nav.Link href="/signUp">Sign Up</Nav.Link>}
      </Container>
    </Navbar>
    //  <div>
    //    <Navbar bg="dark" variant="dark">
    //      <Navbar.Brand href="/">JWT Authentification</Navbar.Brand>
    //      <Nav className="me-auto">
    //        {isAuth ? <Nav.Link href="/">Home</Nav.Link> : null}
    //      </Nav>
    //      <Nav>
    //        {isAuth ? (
    //          <Nav.Link href="/logout">Logout</Nav.Link>
    //        ) : (
    //          <Nav.Link href="/login">Login</Nav.Link>
    //        )}
    //      </Nav>
    //      {!isAuth && <Nav.Link href="/signUp">Sign Up</Nav.Link>}
    //    </Navbar>
    //  </div>
  );
}
