import React from 'react';
import { GraphCanvas } from 'reagraph';

const simpleNodes = [
    {
        id: 'n-1',
        label: 'alpha'
    },
    {
        id: 'n-2',
        label: 'beta'
    }
]

const simpleEdges = [
    {
        id: '1->2',
        source: 'n-1',
        target: 'n-2',
        label: 'Edge 1-2'
    }
]

export const ContextScreen = () => <>

    <div style={{ position: "fixed", width: '50%', height: '50%' }}>
        <GraphCanvas nodes={simpleNodes} edges={simpleEdges} contextMenu={({
            data,
            onClose
        }) => <div style={{
            background: 'white',
            width: 150,
            border: 'solid 1px blue',
            borderRadius: 2,
            padding: 5,
            textAlign: 'center'
        }}>
                <h1>{data.label}</h1>
                <button onClick={onClose}>Close Menu</button>
            </div>} />
    </div>
</>
