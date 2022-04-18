import { Container, Navbar, Nav } from 'react-bootstrap'
import { Link } from "react-router-dom";
import "./MyNavbar.css"

const MyNavbar = () => {
  const role = localStorage.getItem('role');
  const userName = localStorage.getItem("userName")
  const id = localStorage.getItem("userId")
  const linkStyle = { color: "rgb(13, 200, 249)", textDecoration: "none" }
  const userInfoStyle = { color: "rgb(40 240 191)" }
  const userRole = localStorage.getItem('role');
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Nav className="me-auto">
          <Link className='myLink' style={linkStyle} to="/risks">Risks</Link>
          <Link className='myLink' style={linkStyle} to="/defense-profil">Defense Profil</Link>
          <Link className='myLink' style={linkStyle} to="/risk">Create risk</Link>
          <Link className='myLink' style={linkStyle} to="/post-defense">Create Defense Profil</Link>
          {userRole === "ADMIN" && <Nav.Link><Link style={linkStyle} to="/users">Users List</Link></Nav.Link>}
        </Nav>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text style={userInfoStyle}>
            Name: {userName}
          </Navbar.Text>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Navbar.Text style={userInfoStyle}>
            Id: {id}
          </Navbar.Text>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Navbar.Text style={userInfoStyle}>
            Role: {role}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
export default MyNavbar
