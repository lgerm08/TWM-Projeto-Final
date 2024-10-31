import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavBar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
  <Container>
    {/* Logo no canto esquerdo */}
    <Navbar.Brand href="/">
      <img
        src="/assets/logo.png" // Substitua pelo caminho do seu logo
        alt="Logo"
        width="40" // Ajuste o tamanho conforme necessário
        height="40"
        className="d-inline-block align-top"
      />
    </Navbar.Brand>

    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/matricula">Matrícula</Nav.Link>
        <Nav.Link href="/cadastro">Cadastrar Personal</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
  );
}

export default NavBar;