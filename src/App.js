import { Container } from 'react-bootstrap';
import { NavBarHeader } from './components/NavBarHeader';
import { BasicScreen } from './screens/BasicScreen';
import { ContextScreen } from './screens/ContextScreen';
import { MinSpanningTreeScreen } from './screens/MinSpanningTree';
import { SingleShortesPathScreen } from './screens/singleShortestPath';
import { AllPairsShortestPathScreen } from './screens/allPairsScreen';


import './global.css';



import { BrowserRouter as Router, Routes, Route, Navigate, RouterProvider } from 'react-router-dom';

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
        <NavBarHeader className="clickeable" />
        <Container fluid className='mx-auto col-md-10'>
          <Routes>
            <Route path="/" element={<BasicScreen />} />
            <Route path="/context" element={<ContextScreen />} />
            <Route path="/min-spanning-tree" element={<MinSpanningTreeScreen />} />
            <Route path="/single-source-shortest-path" element={<SingleShortesPathScreen />} />
            <Route path="/all-pairs-shortest-path" element={<AllPairsShortestPathScreen />} />

          </Routes>
        </Container>
    </div>
  );
}

export default App;