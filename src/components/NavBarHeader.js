import { Navbar, Container, Button } from 'react-bootstrap';
import { signInWithGoogle, signOut } from '../authentication';
import { useNavigate } from 'react-router-dom';
import { BsAppIndicator } from 'react-icons/bs';

export const NavBarHeader = () => {
  const navigate = useNavigate();
  const userName = sessionStorage.getItem('user');


  const handleLogin = () => {
    signInWithGoogle(navigate);
  };

  const handleLogout = () => {
    signOut(navigate);
  };


  return (
    <Navbar className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand
          onClick={() => navigate('/')}
        >
          <BsAppIndicator /> Graph Problems
        </Navbar.Brand>
        {userName ?
          (
            <div className="ms-auto">

              {/* Some pdding */}
              <Button className="" variant="outline-secondary"
                onClick={handleLogout}
              >
                Logout
              </Button>

            </div>

          )
          :
          (
            <>

              {/* <Button className="ms-auto" variant="outline-primary"
                onClick={handleLogin}
              >
                Login
              </Button> */}
            </>
          )
        }
      </Container>
    </Navbar>
  )
}