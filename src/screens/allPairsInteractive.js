import React from 'react';
import GraphVisualizer from '../components/GraphVisualizer';


/**
 * All-Pairs Shortest Path with Floyd-Warshall Algorithm
 *
 * @param {Array} nodes - Array of node objects {id: 'node_id', label: 'node_label'}
 * @param {Array} edges - Array of edge objects {id: 'edge_id', source: 'source_id', target: 'target_id', value: number}
 * @param {Object} options - Contains the verbose parameter for logging
 * @returns {Array} - Array of history objects detailing each computation step
 */
function preComputeFloydWarshall(nodes, edges, { verbose = false } = {}) {
    const history = [];
    const dist = {};
    const next = {};

    // Initialize distances with Infinity and set the diagonal to zero
    nodes.forEach(node => {
        dist[node.id] = {};
        next[node.id] = {};

        nodes.forEach(innerNode => {
            dist[node.id][innerNode.id] = node.id === innerNode.id ? 0 : Infinity;
            next[node.id][innerNode.id] = null;
        });
    });

    // Add the direct distances from the edge list
    edges.forEach(edge => {
        const { source, target, value } = edge;
        dist[source][target] = value;
        next[source][target] = target;
        history.push({
            step: history.length,
            highlighted_nodes: [source, target],
            highlighted_edges: [edge.id],
            dist: JSON.parse(JSON.stringify(dist)),
            table: createTableData(),
        });
    });

    // Apply Floyd-Warshall algorithm
    nodes.forEach(k => {
        const kId = k.id;
        nodes.forEach(i => {
            const iId = i.id;
            nodes.forEach(j => {
                const jId = j.id;
                const newDist = dist[iId][kId] + dist[kId][jId];

                if (newDist < dist[iId][jId]) {
                    dist[iId][jId] = newDist;
                    next[iId][jId] = next[iId][kId];

                    history.push({
                        step: history.length,
                        highlighted_nodes: [iId, kId, jId],
                        highlighted_edges: [],
                        dist: JSON.parse(JSON.stringify(dist)),
                        table: createTableData(),
                    });
                }
            });
        });
    });

    function createTableData() {
        // Add dist and next to tableData next to each other, with different names.
        /** expected:
         * {
         *  '1_distance': { '1': 0, '2': 3, '3': 8, '4': 7, '5': -4 },
         * '1_next': { '1': null, '2': '2', '3': '5', '4': '2', '5': '5' },
         * '2_distance': { '1': 3, '2': 0, '3': 4, '4': 1, '5': -4 },
         * ...
         * }
        */

        
        const tableData = {};

        // Adding some space.
        const space = '=========';
        let distanceRow = []
        nodes.forEach(i =>{
            distanceRow.push(space)
        });
        tableData['= Distance ='] = distanceRow


        nodes.forEach(i => {
            const iId = i.id;
            tableData[`${iId}_distance`] = dist[iId];
        });
        
        // Adding some space.
        let nextRow = []
        nodes.forEach(i =>{
            nextRow.push(space)
        });
        tableData['= Next ='] = nextRow

        nodes.forEach(i => {
            const iId = i.id;
            tableData[`${iId}_next`] = next[iId];
        });
        return tableData;

    }

    // Highlight the final paths
    const finalEdges = [];
    nodes.forEach(i => {
        nodes.forEach(j => {
            if (next[i.id][j.id] !== null) {
                let current = i.id;
                while (current !== j.id) {
                    const nextNode = next[current][j.id];
                    // eslint-disable-next-line no-loop-func
                    const edge = edges.find(e => e.source === current && e.target === nextNode);
                    if (edge && !finalEdges.includes(edge.id)) {
                        finalEdges.push(edge.id);
                    }
                    current = nextNode;
                }
            }
        });
    });

    history.push({
        step: history.length,
        highlighted_nodes: nodes.map(n => n.id),
        highlighted_edges: finalEdges,
        dist: JSON.parse(JSON.stringify(dist)),
        table: createTableData(),
    });

    if (verbose) {
        console.log("Final shortest paths:", dist);
    }

    // console.log('history')
    // // console.table(history)
    // console.log(dist)
    // console.log(next)

    return history;
}


const algorithms = [
    {
        name: "Floyd-Warshall Algorithm",
        description: "ALL Pairs Interactive",
        preCalculate: preComputeFloydWarshall
    },
]

const examplesDatasets = [
    // 25.1
    {
        name: "CLRS Figure 25.1",
        isDirected: true,
        nodes: [
            {
                id: '1',
                label: '1'
            },
            {
                id: '2',
                label: '2'
            },
            {
                id: '3',
                label: '3'
            },
            {
                id: '4',
                label: '4'
            },
            {
                id: '5',
                label: '5'
            }
        ],
        edges: [
            {
                id: '1=>2',
                source: '1',
                target: '2',
                label: '3',
                value: 3
            },
            {
                id: '1=>3',
                source: '1',
                target: '3',
                label: '8',
                value: 8
            },
            {
                id: '1=>5',
                source: '1',
                target: '5',
                label: -4,
                value: -4
            },
            {
                id: '2=>5',
                source: '2',
                target: '5',
                label: '7',
                value: 7
            },
            {
                id: '2=>4',
                source: '2',
                target: '4',
                label: '1',
                value: 1
            },
            {
                id: '3=>2',
                source: '3',
                target: '2',
                label: '4',
                value: 4
            },
            {
                id: '4=>1',
                source: '4',
                target: '1',
                label: '2',
                value: 2
            },
            {
                id: '4=>3',
                source: '4',
                target: '3',
                label: '-5',
                value: -5
            },
            {
                id: '5=>4',
                source: '5',
                target: '4',
                label: '6',
                value: 6
            }
        ]
    },
    // 25.2

    {
        name: "Dijikstra Path Sample",
        isDirected: false,
        nodes: [
            {
                id: 'a',
                label: 'a'
            },
            {
                id: 'b',
                label: 'b'
            },
            {
                id: 'c',
                label: 'c'
            },
            {
                id: 'd',
                label: 'd'
            },
            {
                id: 'e',
                label: 'e'
            }
        ],
        edges: [
            {
                id: 'a--b',
                source: 'a',
                target: 'b',
                label: '6',
                value: 6
            },
            {
                id: 'a--d',
                source: 'a',
                target: 'd',
                label: '1',
                value: 1
            },
            {
                id: 'b--c',
                source: 'b',
                target: 'c',
                label: '5',
                value: 5
            },
            {
                id: 'b--d',
                source: 'b',
                target: 'd',
                label: '2',
                varlue: 2
            },
            {
                id: 'b--e',
                source: 'b',
                target: 'e',
                label: '2',
                value: 2
            },
            {
                id: 'd--e',
                source: 'd',
                target: 'e',
                label: '1',
                value: 1
            },
            {
                id: 'e--c',
                source: 'e',
                target: 'c',
                label: '5',
                value: 5

            }
        ]
    },
    {
        name: "CLRS Figure 22.6",

        isDirected: true,
        nodes: [
            {
                id: 's',
                label: 's'
            },
            {
                id: 't',
                label: 't'
            },
            {
                id: 'x',
                label: 'x'
            },
            {
                id: 'y',
                label: 'y'
            },
            {
                id: 'z',
                label: 'z'
            }
        ],
        edges: [
            {
                id: 's=>t',
                source: 's',
                target: 't',
                label: '10',
                value: 10
            },
            {
                id: 's=>y',
                source: 's',
                target: 'y',
                label: '5',
            },
            {
                id: 't=>x',
                source: 't',
                target: 'x',
                label: '1',
                value: 1
            },
            {
                id: 't=>y',
                source: 't',
                target: 'y',
                label: '2',
                value: 2
            },
            {
                id: 'x=>z',
                source: 'x',
                target: 'z',
                label: '4',
                value: 4
            },
            {
                id: 'y=>t',
                source: 'y',
                target: 't',
                label: '3',
                value: 3
            },
            {
                id: 'y=>x',
                source: 'y',
                target: 'x',
                label: '9',
                value: 9
            },
            {
                id: 'y=>z',
                source: 'y',
                target: 'z',
                label: '2',
                value: 2
            },
            {
                id: 'z=>s',
                source: 'z',
                target: 's',
                label: '7',
                value: 7
            },
            {
                id: 'z=>x',
                source: 'z',
                target: 'x',
                label: '6',
                value: 6
            }
        ]

    },
]



export function AllPairsInteractive() {
    return (
        <>
            <GraphVisualizer
                algorithms={algorithms}
                examplesDatasets={examplesDatasets}
            />


        </>
    )

}
