import { Container } from 'react-bootstrap';
import { NavBarHeader } from './components/NavBarHeader';
import { BasicScreen } from './screens/BasicScreen';
import { ContextScreen } from './screens/ContextScreen';
import { MinSpanningTreeScreen } from './screens/MinSpanningTree';

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
  return (
    <div className="App">
      <Router>
        <NavBarHeader className="clickeable" />
        <Container fluid className='mx-auto col-md-8'>
          <Routes>
            <Route path="/" element={<BasicScreen />} />
            <Route path="/context" element={<ContextScreen />} />
            <Route path="/min-spanning-tree" element={<MinSpanningTreeScreen />} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
}

export default App;