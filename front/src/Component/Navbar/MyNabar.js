import { Container, Navbar, Nav } from 'react-bootstrap'
import { Link } from "react-router-dom";

const MyNavbar = () => {
  const userName = localStorage.getItem("userName")
  const id = localStorage.getItem("userId")
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Nav className="me-auto">
          <Nav.Link ><Link to="/risks">Risks</Link></Nav.Link>
          <Nav.Link><Link to="/defense-profil">Defense Profil</Link></Nav.Link>
          <Nav.Link><Link to="/risk">Create risk</Link></Nav.Link>
          <Nav.Link><Link to="/post-defense">Create Defense Profil</Link></Nav.Link>

          
        </Nav>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            User name: {userName}
          </Navbar.Text>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Navbar.Text>
            Id: {id}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
export default MyNavbar
