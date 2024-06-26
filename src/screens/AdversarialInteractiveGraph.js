import React from 'react';
import GraphVisualizer from '../components/GraphVisualizer';


const DIJIKSTRA_ALGORITHM = 'Dijikstra Algorithm';
const BELLMAN_FORD_ALGORITHM = 'Bellman Ford Algorithm';

/**
 * Adversarial Search with Alpha-Beta Pruning
 * 
 * @param {Array} nodes - Array of node objects {id: 'node_id', label: 'node_label', values: number}
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
            };
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

        recordHistory(nodeId, highlightedNodes, highlightedEdges, value, alpha, beta, maximizingPlayer, 'Traversing Node');
        if (maximizingPlayer) {
            value = -Infinity;
            for (const edge of nodeEdges) {
                highlightedEdges.push(edge.id);

                const result = alphaBeta(edge.target, alpha, beta, false, edge);
                value = Math.max(value, result);
                alpha = Math.max(alpha, value);

                if (alpha >= beta) {
                    recordHistory(nodeId, highlightedNodes, highlightedEdges, value, alpha, beta, maximizingPlayer, 'Maximizing Pruning');
                    break; // Beta pruning
                } else {
                    recordHistory(nodeId, highlightedNodes, highlightedEdges, value, alpha, beta, maximizingPlayer, 'Maximizing Node');
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
                    recordHistory(nodeId, highlightedNodes, highlightedEdges, value, alpha, beta, maximizingPlayer, 'Minimizing Pruning');
                    break; // Alpha pruning
                } else {
                    recordHistory(nodeId, highlightedNodes, highlightedEdges, value, alpha, beta, maximizingPlayer, 'Minimizing Node');
                }
            }
        }

        return value;
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
        name: " 2, 3, 5, 9, 0, 1, 7, 5",
        nodes: [
            { id: 'ABCDEFGH', label: 'ABCDEFGH', value: null },
            { id: 'ABCD', label: 'ABCD', value: null },
            { id: 'EFGH', label: 'EFGH', value: null },
            { id: 'AB', label: 'AB', value: null },
            { id: 'CD', label: 'CD', value: null },
            { id: 'EF', label: 'EF', value: null },
            { id: 'GH', label: 'GH', value: null },
            { id: 'A', label: 'A', value: 2 },
            { id: 'B', label: 'B', value: 3 },
            { id: 'C', label: 'C', value: 5 },
            { id: 'D', label: 'D', value: 9 },
            { id: 'E', label: 'E', value: 0 },
            { id: 'F', label: 'F', value: 1 },
            { id: 'G', label: 'G', value: 7 },
            { id: 'H', label: 'H', value: 5 },
            // Also add the non leaf nodes pairing (a, b), (c, d)... (g, h)
        ],
        edges: [
            { id: 'ABCDEFGH -> ABCD', source: 'ABCDEFGH', target: 'ABCD', label: '> ABCD' },
            { id: 'ABCDEFGH -> EFGH', source: 'ABCDEFGH', target: 'EFGH', label: '> EFGH' },
            { id: 'ABCD -> AB', source: 'ABCD', target: 'AB', label: '> AB' },
            { id: 'ABCD -> CD', source: 'ABCD', target: 'CD', label: '> CD' },
            { id: 'EFGH -> EF', source: 'EFGH', target: 'EF', label: '> EF' },
            { id: 'EFGH -> GH', source: 'EFGH', target: 'GH', label: '> GH' },
            { id: 'AB -> A', source: 'AB', target: 'A', label: '> A' },
            { id: 'AB -> B', source: 'AB', target: 'B', label: '> B' },
            { id: 'CD -> C', source: 'CD', target: 'C', label: '> C' },
            { id: 'CD -> D', source: 'CD', target: 'D', label: '> D' },
            { id: 'EF -> E', source: 'EF', target: 'E', label: '> E' },
            { id: 'EF -> F', source: 'EF', target: 'F', label: '> F' },
            { id: 'GH -> G', source: 'GH', target: 'G', label: '> G' },
            { id: 'GH -> H', source: 'GH', target: 'H', label: '> H' }
        ],
        desc_img: [
            'https://www.webpagescreenshot.info/image-url/ArWcsfuwE'
        ],
        desc: [
            'Figure 1: https://www.mygreatlearning.com/blog/alpha-beta-pruning-in-ai/'
        ]
    },
    {
        name: "distinct_multiple_children",
        // A2 B7 C15 D2 E7 F9 G4 H4 I10 J11 H2 L15 M7
        nodes: [
            { id: 'ABCDEFGHIJKLM', label: 'ABCDEFGHIJKLM', value: null },
            { id: 'ABCD', label: 'ABCD', value: null },
            { id: 'EFGH', label: 'EFGH', value: null },
            { id: 'IJKLM', label: 'IJKLM', value: null },
            { id: 'AB', label: 'AB', value: null },
            { id: 'FG', lFGel: 'AB', value: null },
            { id: 'IJ', label: 'IJ', value: null },
            { id: 'KLM', label: 'KLM', value: null },
            { id: 'A', label: 'A', value: 2 },
            { id: 'B', label: 'B', value: 7 },
            { id: 'c', label: 'C', value: 15 },
            { id: 'D', label: 'D', value: 2 },
            { id: 'E', label: 'E', value: 7 },
            { id: 'F', label: 'F', value: 9 },
            { id: 'G', label: 'G', value: 4 },
            { id: 'H', label: 'H', value: 4 },
            { id: 'I', label: 'I', value: 10 },
            { id: 'J', label: 'J', value: 11 },
            { id: 'K', label: 'K', value: 2 },
            { id: 'L', label: 'L', value: 15 },
            { id: 'M', label: 'M', value: 7 },
        ],
        edges: [
            { id: 'ABCDEFGHIJKLM -> ABCD', source: 'ABCDEFGHIJKLM', target: 'ABCD', label: '> ABCD' },
            { id: 'ABCDEFGHIJKLM -> EFGH', source: 'ABCDEFGHIJKLM', target: 'EFGH', label: '> EFGH' },
            { id: 'ABCDEFGHIJKLM -> IJKLM', source: 'ABCDEFGHIJKLM', target: 'IJKLM', label: '> IJKLM' },
            {id: 'ABCD -> AB', source: 'ABCD', target: 'AB', label: '> AB' },
            {id: 'ABCD -> IJ', source: 'ABCD', target: 'IJ', label: '> IJ' },
            {id: 'IJKLM -> KLM', source: 'IJKLM', target: 'KLM', label: '> KLM' },
            {id: 'EFGH -> FG', source: 'EFGH', target: 'FG', label: '> FG' },

            {id: 'ABCD->C', source: 'ABCD', target: 'C', label: '> C'},
            {id: 'ABCD->D', source: 'ABCD', target: 'D', label: '> D'},
            {id: 'EFGH->E', source: 'EFGH', target: 'E', label: '> E'},
            {id: 'EFGH->H', source: 'EFGH', target: 'H', label: '> H'},
            {id: 'IJ->I', source: 'IJ', target: 'I', label: '> I'},
            {id: 'IJ->J', source: 'IJ', target: 'J', label: '> J'},
            {id: 'KLM->K', source: 'KLM', target: 'K', label: '> K'},
            {id: 'KLM->L', source: 'KLM', target: 'L', label: '> L'},
            {id: 'KLM->M', source: 'KLM', target: 'M', label: '> M'},
            {id: 'AB->A', source: 'AB', target: 'A', label: '> A'},
            {id: 'AB->B', source: 'AB', target: 'B', label: '> B'},
            {id: 'FG->F', source: 'FG', target: 'F', label: '> F'},
            {id: 'FG->G', source: 'FG', target: 'G', label: '> G'},
        ],
        desc_img: [
            'https://www.webpagescreenshot.info/image-url/KtcW8brny'
        ],
        desc: [
            'Figure 1: https://stackoverflow.com/questions/59974673/minimax-question-regarding-alpha-beta-pruning'
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
