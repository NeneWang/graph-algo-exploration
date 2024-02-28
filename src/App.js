import { Container } from 'react-bootstrap';
import { NavBarHeader } from './components/NavBarHeader';
import { BasicScreen } from './screens/BasicScreen';
import { ContextScreen } from './screens/ContextScreen';

import './global.css';



import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ user, children }) => {
  console.log(user, 'user')
  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  const userName = sessionStorage.getItem('user');
  return (
    <div className="App">
      <Router>
        <NavBarHeader className="clickeable" />
        <Container fluid className='mx-auto col-md-8'>
          <Routes>
            <Route path="/" element={<BasicScreen />} />
            <Route path="/context" element={<ContextScreen />} />
          </Routes>
        </Container>

        <footer className="py-3" style={{ position: "absolute", bottom: 0, width: "100vw" }}>
          <Container className='text-center'>
            <small className="text-muted">&copy; 2024</small>
          </Container>
        </footer>
      </Router>
    </div>
  );
}

export default App;