import React from 'react';
import { GraphCanvas } from 'reagraph';

export const BasicScreen = () => (
  <>
    <h1>Visualize some Graph Algorithms</h1>
    <GraphCanvas
      nodes={[
        {
          id: 'n-1',
          label: '1'
        },
        {
          id: 'n-2',
          label: '2'
        }
      ]}
      edges={[
        {
          id: '1->2',
          source: 'n-1',
          target: 'n-2',
          label: 'Edge 1-2'
        }
      ]}
    />
  </>
);