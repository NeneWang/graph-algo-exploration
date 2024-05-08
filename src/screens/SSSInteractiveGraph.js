import React from 'react';
import GraphVisualizer from '../components/GraphVisualizer';


const DIJIKSTRA_ALGORITHM = 'Dijikstra Algorithm';
const BELLMAN_FORD_ALGORITHM = 'Bellman Ford Algorithm';


/**
 * Adversarial Search with Alpha-Beta Pruning
 * 
 * @param {Array} nodes - Array of node objects {id: 'node_id', label: 'node_label'}
 * @param {Array} edges - Array of edge objects {id: 'edge_id', source: 'source_id', target: 'target_id', value: number}
 * @param {Object} options - Contains the verbose parameter for logging
 * @returns {Array} - Array of history objects detailing each computation step
 */
function preComputeDijkstra(nodes, edges, { verbose = false } = {}) {
    const history = [];
    const nodeValues = nodes.reduce((acc, node) => ({ ...acc, [node.id]: node.value }), {});

    function alphaBeta(nodeId, alpha, beta, maximizingPlayer, parentEdge = null) {
        const nodeEdges = edges.filter(edge => edge.source === nodeId);
        let value;

        if (!nodeEdges.length) { // Assume leaf node
            value = nodeValues[nodeId];
            recordHistory(nodeId, null, parentEdge, value, alpha, beta, maximizingPlayer);
            return value;
        }

        let highlightedNodes = [nodeId];
        let highlightedEdges = parentEdge ? [parentEdge.id] : [];

        if (maximizingPlayer) {
            value = -Infinity;
            for (const edge of nodeEdges) {
                highlightedEdges.push(edge.id);
                const result = alphaBeta(edge.target, alpha, beta, false, edge);
                value = Math.max(value, result);
                alpha = Math.max(alpha, value);
                if (alpha >= beta) {
                    break; // Beta pruning
                }
            }
        } else {
            value = Infinity;
            for (const edge of nodeEdges) {
                highlightedEdges.push(edge.id);
                const result = alphaBeta(edge.target, alpha, beta, true, edge);
                value = Math.min(value, result);
                beta = Math.min(beta, value);
                if (beta <= alpha) {
                    break; // Alpha pruning
                }
            }
        }

        recordHistory(nodeId, highlightedNodes, highlightedEdges, value, alpha, beta, maximizingPlayer);
        return value;
    }

    function recordHistory(nodeId, highlightedNodes, highlightedEdges, value, alpha, beta, maximizingPlayer) {
        history.push({
            step: history.length,
            highlighted_nodes: highlightedNodes ? highlightedNodes : [nodeId],
            highlighted_edges: highlightedEdges ? highlightedEdges : [],
            value: value,
            alpha: alpha,
            beta: beta,
            maximizingPlayer: maximizingPlayer
        });
    }

    // Start the algorithm
    const rootNodeId = nodes[0].id; // Assuming the first node is the root
    const finalValue = alphaBeta(rootNodeId, -Infinity, Infinity, true);

    if (verbose) {
        console.log("Final Evaluation: ", finalValue);
        console.log("History: ", history);
    }

    return history;
}


/**
 * 
 * @param {list} nodes 
 * @param {*} edges 
 * @param {*} param3 
 * @returns 
 */
function preComputeBellmanFord(nodes, edges, { verbose = false } = {}) {
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

    }
]



export function SingleShortestPathInteractive() {
    return (
        <>
            <GraphVisualizer
                algorithms={algorithms}
                examplesDatasets={examplesDatasets}
            />


        </>
    )

}
