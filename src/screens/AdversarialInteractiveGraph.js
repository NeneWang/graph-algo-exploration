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
function preComputeAlphaBeta(nodes, edges, { verbose = false } = {}) {
    const history = [];
    const nodeValues = nodes.reduce((acc, node) => ({ ...acc, [node.id]: node.value }), {});

    function alphaBeta(nodeId, alpha, beta, maximizingPlayer, parentEdge = null) {


        const nodeEdges = edges.filter(edge => edge.source === nodeId);
        let value;

        if (!nodeEdges.length) { // Assume leaf node
            value = nodeValues[nodeId];
            recordHistory(nodeId, [nodeId], [], value, alpha, beta, maximizingPlayer, 'Leaf Node');
            return value;
        }

        let highlightedNodes = [nodeId];
        let highlightedEdges = parentEdge ? [parentEdge.id] : [];



        function getTable(value, alpha, beta, maximizingPlayer, message) {
            const table = {};
            table[nodeId] = {
                alpha: alpha,
                beta: beta,
                maximizingPlayer: maximizingPlayer,
                value: value,
                parentEdgeId: parentEdge ? parentEdge.id : null,
                message: message
            }

            return table;
        }


        function recordHistory(nodeId, highlightedNodes, highlightedEdges, value, alpha, beta, maximizingPlayer, message = null) {
            history.push({
                step: history.length,
                highlighted_nodes: highlightedNodes ? highlightedNodes : [nodeId],
                highlighted_edges: highlightedEdges ? highlightedEdges : [],
                table: getTable(value, alpha, beta, maximizingPlayer, message),
            });
        }



        if (maximizingPlayer) {
            value = -Infinity;
            for (const edge of nodeEdges) {
                highlightedEdges.push(edge.id);
                const result = alphaBeta(edge.target, alpha, beta, false, edge);
                value = Math.max(value, result);
                alpha = Math.max(alpha, value);
                recordHistory(nodeId, highlightedNodes, highlightedEdges, value, alpha, beta, maximizingPlayer, 'Maximizing');
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
                recordHistory(nodeId, highlightedNodes, highlightedEdges, value, alpha, beta, maximizingPlayer, 'Minimizing');
                if (beta <= alpha) {
                    break; // Alpha pruning
                }
            }
        }

        return value;
    }
    // Start the algorithm
    const rootNodeId = nodes[0].id; // Assuming the first node is the root
    console.log("nodes", nodes, "edges", edges, "rootNodeId", rootNodeId)
    const finalValue = alphaBeta(rootNodeId, -Infinity, Infinity, true);

    if (verbose) {
        console.log("Final Evaluation: ", finalValue);
        console.log("History: ", history);
    }

    return history;
}



const algorithms = [
    {
        name: 'Alpha-Beta Pruning',
        // eslint-disable-next-line no-multi-str
        description: 'Alpha-Beta Pruning is a search algorithm that seeks to decrease the number of nodes that are evaluated by the minimax algorithm in its search tree. \n\
        It is an adversarial search algorithm used commonly for two-player games. It stops evaluating a move when at least one possibility has been found that proves the move to be worse than a previously examined move. Such moves need not be evaluated further.',
        preCalculate: preComputeAlphaBeta
    }
]

const exampleDatasets = [
    {
        name: "Adversarial Search with Pruning Example",
        nodes: [
            { id: 'A', label: 'A' },  // Root node
            { id: 'B', label: 'B' },
            { id: 'C', label: 'C' },
            { id: 'D', label: 'D' },
            { id: 'E', label: 'E' },
            { id: 'F', label: 'F' },
            { id: 'G', label: 'G' },
            { id: 'H', label: 'H' },
            { id: 'I', label: 'I' },
            { id: 'J', label: 'J' },
            { id: 'K', label: 'K' },
            { id: 'L', label: 'L' }
        ],
        edges: [
            { id: 'A->B', source: 'A', target: 'B', label: 'A->B' },
            { id: 'A->C', source: 'A', target: 'C', label: 'A->C' },
            { id: 'B->D', source: 'B', target: 'D', label: 'B->D' },
            { id: 'B->E', source: 'B', target: 'E', label: 'B->E' },
            { id: 'C->F', source: 'C', target: 'F', label: 'C->F' },
            { id: 'C->G', source: 'C', target: 'G', label: 'C->G' },
            { id: 'D->H', source: 'D', target: 'H', label: '3', value: 3 },
            { id: 'D->I', source: 'D', target: 'I', label: '5', value: 5 },
            { id: 'E->J', source: 'E', target: 'J', label: '6', value: 6 },
            { id: 'E->K', source: 'E', target: 'K', label: '9', value: 9 },
            { id: 'F->L', source: 'F', target: 'L', label: '1', value: 1 }
            // Note: Node G and its descendants are pruned and not expanded.
        ]
    }
];



export function AdversarialInteractiveGraph() {
    return (
        <>
            <GraphVisualizer
                algorithms={algorithms}
                examplesDatasets={exampleDatasets}
            />


        </>
    )

}
