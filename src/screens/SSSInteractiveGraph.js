import React, { useState } from 'react';
import GraphVisualizer from '../components/GraphVisualizer';


const DIJIKSTRA_ALGORITHM = 'Dijikstra Algorithm';

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
    {
        id: '0->1',
        source: 'n0',
        target: 'n1',
        label: '4',
        value: 4
    },
    {
        id: '0->3',
        source: 'n0',
        target: 'n3',
        label: '6',
        value: 6
    },
    {
        id: '0->4',
        source: 'n0',
        target: 'n4',
        label: '6',
        value: 6
    },
    {
        id: '0->2',
        source: 'n0',
        target: 'n2',
        label: '4',
        value: 4
    },
    {
        id: '1->2',
        source: 'n1',
        target: 'n2',
        label: '2',
        value: 2
    },
    {
        id: '2->3',
        source: 'n2',
        target: 'n3',
        label: '8',
        value: 8
    },
    {
        id: '3->4',
        source: 'n3',
        target: 'n4',
        label: '9',
        value: 9
    }
]

const algorithms = [
    {
        name: DIJIKSTRA_ALGORITHM,
        description: DIJIKSTRA_ALGORITHM
    },
]

const examplesDatasets = [
{
        name: 'Default Example',
        nodes: simpleNodes,
        edges: simpleEdges

    },
    {
        name: 'CLRS. 21.4',
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
            },
            {
                id: 'f',
                label: 'f'
            },
            {
                id: 'g',
                label: 'g'
            },
            {
                id: 'h',
                label: 'h'
            },
            {
                id: 'i',
                label: 'i'
            }
        ],
        edges: [
            {
                id: 'a->b',
                source: 'a',
                target: 'b',
                label: '4',
                value: 4
            },
            {
                id: 'a->h',
                source: 'a',
                target: 'h',
                label: '8',
                value: 8
            },
            {
                id: 'b->c',
                source: 'b',
                target: 'c',
                label: '8',
                value: 8
            },
            {
                id: 'b->h',
                source: 'b',
                target: 'h',
                label: '11',
                value: 11
            },
            {
                id: 'c->d',
                source: 'c',
                target: 'd',
                label: '7',
                value: 7
            },
            {
                id: 'c->f',
                source: 'c',
                target: 'f',
                label: '4',
                value: 4
            },
            {
                id: 'c->i',
                source: 'c',
                target: 'i',
                label: '2',
                value: 2
            },
            {
                id: 'd->e',
                source: 'd',
                target: 'e',
                label: '9',
                value: 9
            },
            {
                id: 'd->f',
                source: 'd',
                target: 'f',
                label: '14',
                value: 14
            },
            {
                id: 'e->f',
                source: 'e',
                target: 'f',
                label: '10',
                value: 10
            },
            {
                id: 'f->g',
                source: 'f',
                target: 'g',
                label: '2',
                value: 2

            },
            {
                id: 'g->h',
                source: 'g',
                target: 'h',
                label: '1',
                value: 1,
            },
            {
                id: 'g->i',
                source: 'g',
                target: 'i',
                label: '6',
                value: 6
            },
            {
                id: 'h->i',
                source: 'h',
                target: 'i',
                label: '7',
                value: 7
            }
        ]
    },
    {
        name: 'Cities',

        nodes: [
            {
                id: 'New York',
                label: 'New York'
            },
            {
                id: 'Los Angeles',
                label: 'Los Angeles'
            },
            {
                id: 'Chicago',
                label: 'Chicago'
            },
            {
                id: 'San Francisco',
                label: 'San Francisco'
            },
            {
                id: 'Houston',
                label: 'Houston'
            },
            {
                id: 'Miami',
                label: 'Miami'
            },
            {
                id: 'Seattle',
                label: 'Seattle'
            },
        ],
        edges: [
            {
                id: 'New York->Los Angeles',
                source: 'New York',
                target: 'Los Angeles',
                label: '2789',
                value: 2789
            },
            {
                id: 'New York->Chicago',
                source: 'New York',
                target: 'Chicago',
                label: '789',
                value: 789
            },
            {
                id: 'Los Angeles->Chicago',
                source: 'Los Angeles',
                target: 'Chicago',
                label: '2015',
                value: 2015
            },
            {
                id: 'Los Angeles->San Francisco',
                source: 'Los Angeles',
                target: 'San Francisco',
                label: '383',
                value: 383
            },
            {
                id: 'Chicago->Houston',
                source: 'Chicago',
                target: 'Houston',
                label: '1085',
                value: 1085
            },
            {
                id: 'San Francisco->Seattle',
                source: 'San Francisco',
                target: 'Seattle',
                label: '807',
                value: 807
            },
            {
                id: 'Houston->Miami',
                source: 'Houston',
                target: 'Miami',
                label: '1420',
                value: 1420
            },
            {
                id: 'Miami->New York',
                source: 'Miami',
                target: 'New York',
                label: '1300',
                value: 1300
            },
            {
                id: 'Seattle->Chicago',
                source: 'Seattle',
                target: 'Chicago',
                label: '2065',
                value: 2065
            },
            {
                id: 'Houston->Los Angeles',
                source: 'Houston',
                target: 'Los Angeles',
                label: '1543',
                value: 1543
            }
        ],
    }
]



export function SingleShortestPathInteractive() {


    // TODO KEEP Here
    const precalculateAlgorithmSteps = (selectedAlgorithm, nodes, edges, { verbose = true } = {}) => {
        // To call when the dataset is changed, or the algorithm changes.
        // This will precalculate the steps for the algorithm.

        switch (selectedAlgorithm) {
            case DIJIKSTRA_ALGORITHM:
                const precomputedSteps = preComputeDijkstra(nodes, edges)
                if (verbose) console.log("Precomputed Steps", precomputedSteps)
                setHistory(precomputedSteps)
                break;
            default:
                break;
        }
    }

    const [history, setHistory] = useState([])

    // TODO Keep here.
    /**
    
    nodes: {
        id: 'n0',
        label: 'n0'
    },

    edgesDict: {
        id: '0->1',
        source: 'n0',
        target: 'n1',
        label: '4',
        value: 4
    },

     * @param {list[nodesDict]} nodes 
     * @param {list[edgesDict]} edges 
    */
    const preComputeDijkstra = (nodesIn, edgesIn, { verbose = false } = {}) => {
        let nodes = [...nodesIn];
        let edges = [...edgesIn]; // Use this for global edge data
        if (verbose) {
            console.log("Started with nodes", nodes);
            console.log("Started with edges", edges);
        }
        if (nodes.length === 0 || edges.length === 0) {
            return;
        }

        const ComputeHistory = [];
        let visited = [];
        let priorityQueue = [];
        let distData = {};

        // Initialize the priority queue
        priorityQueue.push(nodes[0]);
        visited.push(nodes[0].id);
        distData[nodes[0].id] = { shortestDistance: 0, previousVertex: null };

        ComputeHistory.push({
            step: ComputeHistory.length,
            highlighted_nodes: [nodes[0].id],
            highlighted_edges: [],

            algorithm: 'Dijkstra',
            visited: [...visited],
            distData: { ...distData },
            priorityQueue: [...priorityQueue]
        });


        while (priorityQueue.length > 0) {
            let currentNode = priorityQueue.shift();
            let neighbors = edges.filter(edge => edge.source === currentNode.id);


            visited.push(currentNode.id);
            // Show in history this as a new step as well.
            // Check for the traces of how it got there..
            const { traceEdges, currentEdge } = getEdgesTrace(currentNode, edges, currentNode, distData, nodes);


            ComputeHistory.push({
                step: ComputeHistory.length,
                highlighted_nodes: [...visited],
                highlighted_edges: [...traceEdges.map(e => e.id), currentEdge?.id ?? currentNode],

                algorithm: 'Dijkstra',
                visited: [...visited],
                distData: { ...distData },
                priorityQueue: [...priorityQueue]
            });

            for (let index = 0; index < neighbors.length; index++) {
                const neighbor = neighbors[index];
                const neighborNode = nodes.find(node => node.id === neighbor.target);
                const currentDistance = distData[currentNode.id].shortestDistance + neighbor.value;


                if (visited.includes(neighborNode.id)) {
                    if (currentDistance < distData[neighborNode.id].shortestDistance) {
                        distData[neighborNode.id].shortestDistance = currentDistance;
                        distData[neighborNode.id].previousVertex = currentNode.id;
                    }
                } else {
                    distData[neighborNode.id] = { shortestDistance: currentDistance, previousVertex: currentNode.id };
                    priorityQueue.push(neighborNode);

                }

                const { traceEdges, currentEdge } = getEdgesTrace(neighborNode, edges, currentNode, distData, nodes);

                ComputeHistory.push({
                    step: ComputeHistory.length,
                    highlighted_nodes: [...visited],
                    highlighted_edges: [...traceEdges.map(e => e.id), currentEdge.id],

                    algorithm: 'Dijkstra',
                    visited: [...visited],
                    distData: { ...distData },
                    priorityQueue: [...priorityQueue]
                });
            }
        }

        // Show the final result of the algorithm of the most optimal edges.
        let minimumSpanningTreeEdges = [];
        for (const node in distData) {
            if (distData[node].previousVertex) {
                const edge = edges.find(e => e.source === distData[node].previousVertex && e.target === node);
                minimumSpanningTreeEdges.push(edge);
            }
        }

        ComputeHistory.push({
            step: ComputeHistory.length,
            highlighted_nodes: [...visited],
            highlighted_edges: minimumSpanningTreeEdges.map(e => e.id),

            algorithm: 'Dijkstra',
            visited: [...visited],
            distData: { ...distData },
            priorityQueue: [...priorityQueue]
        });


        return ComputeHistory;
    };



    return (
        <>
            <GraphVisualizer precalculateAlgorithmSteps={precalculateAlgorithmSteps} 
                history={history}
                initialDisplayNodes={simpleNodes}
                initialDisplayEdges={simpleEdges}
                algorithms={algorithms}
                examplesDatasets={examplesDatasets}
            />


        </>
    )

    function getEdgesTrace(neighborNode, edges, currentNode, distData, nodes) {
        let currentTraceNode = neighborNode;
        const currentEdge = edges.find(e => e.source === currentNode.id && e.target === neighborNode.id);
        const trace = [];
        const traceEdges = [];
        while (currentTraceNode) {
            trace.push(currentTraceNode.id);
            const previousVertex = distData[currentTraceNode.id].previousVertex;
            if (previousVertex) {
                // eslint-disable-next-line no-loop-func
                let edge = edges.find(e => e.source === previousVertex && e.target === currentTraceNode.id);

                if (edge) {
                    traceEdges.push(edge);
                }
                currentTraceNode = nodes.find(node => node.id === previousVertex);
            } else {
                currentTraceNode = null;
            }
        }
        return { traceEdges, currentEdge };
    }
}
