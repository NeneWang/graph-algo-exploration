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
        
        /**
         * 
         * @param {node} node 
         * @returns 
         */
        function traceBackPath(node){
            const path = [];
            // console.log(prev) 
            /**
             * {
                "a": null,
                "b": "a",
                "c": "e",
                "d": "a",
                "e": "d"
            }
             */
            while (node){
                // console.log("Node", node, node['id'], prev[node['id']])
                // Get the path from the source to the target
                const prevNode = prev[node['id']];
                
                if ( node['id'] == undefined || prevNode === null){
                    break;
                }

                // Ge the edge.
                const edge = edges.find(e => e.source === prevNode && e.target === node['id']);
                path.push(edge['id']);
                // path.push(node['id']);
                path.push(edge['source'])
                path.push(edge['target'])
                path.push(prevNode);

                node = {id: prevNode};
            }
            return path.reverse();
        }

        function getTable() {
            const table = {};
            for (let i = 0; i < nodes.length; i++) {
                const shortest_distance = dist[nodes[i].id];
                const prev_node = prev[nodes[i].id];
                table[nodes[i].id] = { shortest_distance, prev_node };
            }
            return table;
        }

        // Record the initial state
        history.push({
            step: history.length,
            highlighted_nodes: [sourceId],
            highlighted_edges: [],
            table: getTable(),
            dist: { ...dist },
            queue: priorityQueue.map(q => q.id)
        });

        while (priorityQueue.length > 0) {
            priorityQueue.sort((a, b) => a.dist - b.dist);
            const { id: u } = priorityQueue.shift();
            visited.add(u);

            // get the traceback.
            
            // Record when a node is visited
            if (verbose) {
                console.log(`Visiting node: ${u}, Distance: ${dist[u]}`);
            }
            
            edges.filter(edge => edge.source === u).forEach(edge => {
                const { target: v, value } = edge;
                // console.log('searching for', v, visited.has(v))
                const path = traceBackPath({id: u});
                
                const table = getTable();
            

                if (!visited.has(v)) {
                    const alt = dist[u] + value;
                    if (alt < dist[v]) {
                        dist[v] = alt;
                        prev[v] = u;
                        priorityQueue.push({ id: v, dist: alt });
                        const highlightNode = [...path, v, u];
                        // Record each update
                        history.push({
                            step: history.length,
                            highlighted_nodes: [...highlightNode],
                            highlighted_edges: [edge.id],
                            table: table,
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
            table: getTable(),
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
