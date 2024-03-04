import React from 'react';
import { GraphCanvas } from 'reagraph';

const simpleNodes = [
    {
        id: 'n0',
        label: 'n0'
    },
    {
        id: 'n1',
        label: 'n1'
    },
    {
        id: 'n2',
        label: 'n2'
    },
    {
        id: 'n3',
        label: 'n3'
    },
    {
        id: 'n4',
        label: 'n4'
    },
]

const simpleEdges = [
    
    // 0 -> 1: 4, 
    // 0 -> 3, 6
    // 0 -> 4, 6
    // 0 -> 2, 4
    
    // 1 -> 2, 2
    // 2 -> 3, 8
    // 3 -> 4, 9
    {
        id: '0->1',
        source: 'n0',
        target: 'n1',
        label: '4'
    },
    {
        id: '0->3',
        source: 'n0',
        target: 'n3',
        label: '6'
    },
    {
        id: '0->4',
        source: 'n0',
        target: 'n4',
        label: '6'
    },
    {
        id: '0->2',
        source: 'n0',
        target: 'n2',
        label: '4'
    },
    {
        id: '1->2',
        source: 'n1',
        target: 'n2',
        label: '2'
    },
    {
        id: '2->3',
        source: 'n2',
        target: 'n3',
        label: '8'
    },
    {
        id: '3->4',
        source: 'n3',
        target: 'n4',
        label: '9'
    }
]

export const MinSpanningTreeScreen = () => <>
    <div>
        <div className="visualizationsProblems">
            <button>Graph</button>
            <button>Connected Cities</button>
            <button>Min Cost</button>
        </div>
        <div style={{ position: "fixed", width: '90%', height: '50%' }}>
            <GraphCanvas edgeArrowPosition="none" edgeLabelPosition="above" labelType="all" nodes={simpleNodes} edges={simpleEdges} contextMenu={({
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
    </div>
</>
