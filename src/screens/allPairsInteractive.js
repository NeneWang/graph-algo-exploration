import React  from 'react';
import GraphVisualizer from '../components/GraphVisualizer';


const DIJIKSTRA_ALGORITHM = 'Dijikstra Algorithm';
const BELLMAN_FORD_ALGORITHM = 'Bellman Ford Algorithm';


    /**
    
    nodes: {
        id: 'n0',
        label: 'n0'
    },

    edgesDict: {
        id: '0=>1',
        source: 'n0',
        target: 'n1',
        label: '4',
        value: 4
    },

     * @param {list[nodesDict]} nodes 
     * @param {list[edgesDict]} edges 
    */
    const preComputeDijkstra = (nodes, edges, { verbose = true } = {}) => {
        const dist = {};
        const prev = {};
        const visited = new Set();
        const history = [];
        const sourceId = nodes[0].id;

        // Initialize distances and previous nodes
        nodes.forEach(node => {
            dist[node.id] = Infinity;
            prev[node.id] = null;
        });
        dist[sourceId] = 0;

        const priorityQueue = [{ id: sourceId, dist: 0 }];

        // Record the initial state
        history.push({
            step: history.length,
            highlighted_nodes: [sourceId],
            highlighted_edges: [],
            dist: { ...dist },
            queue: priorityQueue.map(q => q.id)
        });

        while (priorityQueue.length > 0) {
            priorityQueue.sort((a, b) => a.dist - b.dist);
            const { id: u } = priorityQueue.shift();
            visited.add(u);

            // Record when a node is visited
            if (verbose) {
                console.log(`Visiting node: ${u}, Distance: ${dist[u]}`);
            }

            edges.filter(edge => edge.source === u).forEach(edge => {
                const { target: v, value } = edge;
                if (!visited.has(v)) {
                    const alt = dist[u] + value;
                    if (alt < dist[v]) {
                        dist[v] = alt;
                        prev[v] = u;
                        priorityQueue.push({ id: v, dist: alt });

                        // Record each update
                        history.push({
                            step: history.length,
                            highlighted_nodes: [u, v],
                            highlighted_edges: [edge.id],
                            dist: { ...dist },
                            queue: priorityQueue.map(q => q.id)
                        });
                    }
                }
            });
        }

        // Record the final shortest paths using edges
        const finalEdges = [];
        for (const node in prev) {
            if (prev[node]) {
                const edge = edges.find(e => e.source === prev[node] && e.target === node);
                if (edge) {
                    finalEdges.push(edge.id);
                }
            }
        }

        history.push({
            step: history.length,
            highlighted_nodes: [...visited],
            highlighted_edges: finalEdges,
            dist: { ...dist },
            queue: []
        });

        return  history
    
    }

    /**
     * 
     * @param {list} nodes 
     * @param {*} edges 
     * @param {*} param3 
     * @returns 
     */
    function preComputeBellmanFord(nodes, edges,  { verbose = false } = {}) {
        const dist = {};
        const prev = {};
        const history = [];
        
        const sourceId = nodes[0].id;

        // Initialize distances and predecessors
        nodes.forEach(node => {
            dist[node.id] = Infinity;
            prev[node.id] = null;
        });
        dist[sourceId] = 0;
    
        history.push({
            step: history.length,
            highlighted_nodes: [sourceId],
            highlighted_edges: [],
            dist: { ...dist }
        });
    
        // Relax edges repeatedly
        for (let i = 1; i < nodes.length; i++) { // Repeat this |V| - 1 times
            let changed = false; // To track any changes in this iteration
            for (const edge of edges) {
                const { source: u, target: v, value: w } = edge;
                if (dist[u] + w < dist[v]) {
                    dist[v] = dist[u] + w;
                    prev[v] = u;
                    changed = true;
    
                    history.push({
                        step: history.length,
                        highlighted_nodes: [u, v],
                        highlighted_edges: [edge.id],
                        dist: { ...dist }
                    });
                }
            }
            // If no changes occur, algorithm can terminate early
            if (!changed) break;
        }
    
        // Check for negative weight cycles
        for (const edge of edges) {
            const { source: u, target: v, value: w } = edge;
            if (dist[u] + w < dist[v]) {
                console.error("Graph contains a negative weight cycle");
                return { hasNegativeCycle: true, history };
            }
        }
    
        // Prepare final step with all shortest paths
        const finalEdges = [];
        for (const node in prev) {
            if (prev[node]) {
                const edge = edges.find(e => e.source === prev[node] && e.target === node);
                if (edge) {
                    finalEdges.push(edge.id);
                }
            }
        }
    
        history.push({
            step: history.length,
            highlighted_nodes: Object.keys(dist),
            highlighted_edges: finalEdges,
            dist: { ...dist }
        });
    
        if (verbose) {
            console.log("Final distances from source:", dist);
            console.log("Predecessors in path:", prev);
        }
    
        return history;
    }

const algorithms = [
    {
        name: DIJIKSTRA_ALGORITHM,
        description: DIJIKSTRA_ALGORITHM,
        preCalculate: preComputeDijkstra
    },
    {
        name: BELLMAN_FORD_ALGORITHM,
        description: BELLMAN_FORD_ALGORITHM,
        preCalculate: preComputeBellmanFord
    }
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
