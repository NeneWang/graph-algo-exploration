import React from 'react';

// Import Router Link.
import { Link } from 'react-router-dom';

export const BasicScreen = () => (
  <>
    <h1>Visualize some Graph Algorithms</h1>
    <Link to="/min-spanning-tree">Min Spanning Tree</Link>
  </>
);