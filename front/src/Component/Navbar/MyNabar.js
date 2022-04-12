import { Container, Navbar, Nav } from 'react-bootstrap'
import { Link } from "react-router-dom";

const MyNavbar = () => {
  const userName = localStorage.getItem("userName")
  const id = localStorage.getItem("userId")
  const linkStyle={color:"#79cee4", textDecoration:"none"}
  const userInfoStyle={color:"rgb(40 240 191)"}
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Nav className="me-auto">
          <Nav.Link  ><Link style={linkStyle} to="/risks">Risks</Link></Nav.Link>
          <Nav.Link><Link style={linkStyle} to="/defense-profil">Defense Profil</Link></Nav.Link>
          <Nav.Link><Link style={linkStyle} to="/risk">Create risk</Link></Nav.Link>
          <Nav.Link><Link style={linkStyle} to="/post-defense">Create Defense Profil</Link></Nav.Link>

          
        </Nav>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text style={userInfoStyle}>
            Name: {userName}
          </Navbar.Text>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Navbar.Text style={userInfoStyle}>
            Id: {id}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
export default MyNavbar
