import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GraphCanvas } from 'reagraph';
import { Dropdown, Tabs, Tab, Row, Col, Button, Form } from 'react-bootstrap';


const PRIMS_ALGORITHM = 'Prim Algorithm'
const KRUSKAL_ALGORITHM = 'Kruskal Algorithm'

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
        name: KRUSKAL_ALGORITHM,
        description: KRUSKAL_ALGORITHM
    },
    {
        name: PRIMS_ALGORITHM,
        description: PRIMS_ALGORITHM
    }
]

const examplesDatasets = [
    {
        name: 'Default Example',
        nodes: simpleNodes,
        edges: simpleEdges

    },
    {
        name: 'IA. 21.4',
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
        name: 'Smaller'
    },
    {
        name: 'Larger'
    }
]



const regularTheme = {
    node: {
        fill: '#45f248',
    }
}

function hasCycle(edges) {
    const disjointSet = {};

    function find(node) {
        if (disjointSet[node] === undefined)
            return node;
        return find(disjointSet[node]);
    }

    function union(source, target) {
        const sourceRoot = find(source);
        const targetRoot = find(target);
        if (sourceRoot !== targetRoot) {
            disjointSet[sourceRoot] = targetRoot;
            return false;
        }
        return true;
    }

    for (const edge of edges) {
        const { source, target } = edge;
        if (union(source, target)) {
            return true;
        }
    }

    return false;
}



export function MinSpanningTreeScreen() {

    const [selectedAlgorithm, setSelectedAlgorithm] = useState(
        algorithms[0].name
    )

    const [selectedExample, setSelectedExample] = useState(
        examplesDatasets[0]
    )

    const [step, setStep] = useState(0)
    const [nodes, setNodes] = useState(simpleNodes)
    const [edges, setEdges] = useState(simpleEdges)
    const [isLoop, setIsLoop] = useState(false)

    const [isAlgorithmFinished, setIsAlgorithmFinished] = useState(false)
    const [speed, setSpeed] = useState(3);
    const [key, setKey] = useState('Graph');
    const [highlightedIds, setHighlightedIds] = useState([
    ]);
    const [highlightEdges, setHighlightEdges] = useState([]);
    const [minimumSpanningTreeEdges, setMinimumSpanningTreeEdges] = useState([])

    const [edgestStack, setEdgesStack] = useState([])
    const [primsVisitedNodes, setPrimsVisitedNodes] = useState([]);
    const [isRunning, setIsRunning] = useState(false)

    const [intervalId, setIntervalId] = useState(null);



    const handleSelectAlgorithm = (event) => {
        console.log("Selected Algorithm", event)
        setSelectedAlgorithm(event);
    };

    const handleSpeedChange = (event) => {
        setSpeed(event.target.value);
    };



    const createSmallestEdgesHeap = () => {
        // Create a copy of edges.
        console.log("Selected Example", selectedExample)
        const tempEdges = [...selectedExample.edges]
        let tempEdgestStack = tempEdges.sort((a, b) => a.value - b.value)


        setEdgesStack(tempEdgestStack)
        console.log("Edges Stack", tempEdgestStack)
    }
    const delay = ms => new Promise(res => setTimeout(res, ms));

    /**
     * 
     * @param {string} newExample Example selected.
     */
    const handleExampleChange = async (newExample) => {
        console.log(
            "Attempting to change example to:" + newExample

        )
        const selectedDataset = examplesDatasets.find(
            (example) => example.name === newExample
        )

        console.log("Selected Example", selectedDataset)
        setSelectedExample(selectedDataset)
        setNodes(selectedDataset.nodes)
        setEdges(selectedDataset.edges)
        

    }

    const handleFinishAlgorithm = () => {

        setIsAlgorithmFinished(true)

        if (isLoop) {
            resetAlgorithm()

        } else {
            stopAlgorithm()
        }
    }


    // eslint-disable-next-line react-hooks/exhaustive-deps
    const stepAlgorithm = useCallback(async () => {
        console.log("Step Algorithm", selectedAlgorithm, step)
        console.log("Nodes", nodes)
        switch (selectedAlgorithm) {
            case KRUSKAL_ALGORITHM:
                
                if (edgestStack.length === 0) {
                    handleFinishAlgorithm()
                    break;
                }
                

                setStep(step + 1)
                const topEdge = edgestStack.shift()
                setEdgesStack(edgestStack)
                const sourceNodeId = topEdge.source
                const targetNodeId = topEdge.target
                const test_edges = [...highlightEdges, topEdge]
                console.log("Test Edges", hasCycle(test_edges), test_edges)
                if (hasCycle(test_edges)) {
                    const beforeHighlight = [...highlightedIds];
                    setHighlightedIds([...highlightedIds, topEdge.id, sourceNodeId, targetNodeId])
                    await delay(100);
                    setHighlightedIds(beforeHighlight)
                    console.log("Cycle Detected")
                    break;
                }
                setHighlightEdges([...highlightEdges, topEdge])

                setMinimumSpanningTreeEdges([...minimumSpanningTreeEdges, topEdge])
                setHighlightedIds([...highlightedIds, topEdge.id, sourceNodeId, targetNodeId])
                break;

            case PRIMS_ALGORITHM:
                console.log("Prim Algorithm visited prims nodes", primsVisitedNodes)
                if (primsVisitedNodes.length === nodes.length) {
                    handleFinishAlgorithm()
                    break;
                }
                setStep(step + 1)
                // Get neighboring of visited ids edges.
                const validNeighboringEdges = []
                for (const nodeId of primsVisitedNodes) {
                    const nodeEdges = edges.filter(edge => edge.source === nodeId || edge.target === nodeId)
                    // Push the edges that are not already in the neighboring edges and not in visited edges
                    
                    for (const edge of nodeEdges) {
                        if (primsVisitedNodes.includes(edge.source) && primsVisitedNodes.includes(edge.target)) {
                            continue;
                        }
                        if (validNeighboringEdges.includes(edge)) {
                            continue;
                        }
                        validNeighboringEdges.push(edge)
                    }
                                 

                }

                // Filter the edges that are connected to the visited nodes.
                console.log("Neighboring Edges", validNeighboringEdges)
                // Find the smallest edge that is not in the visited nodes.
                // Sort the connected edges by value.
                const sortedConnectedEdges = validNeighboringEdges.sort((a, b) => a.value - b.value);
                const smallestEdge = sortedConnectedEdges[0];
                if (!smallestEdge) {
                    console.log("No more edges")
                    handleFinishAlgorithm()
                    break;
                }
                setHighlightEdges([...highlightEdges, smallestEdge])
                setMinimumSpanningTreeEdges([...minimumSpanningTreeEdges, smallestEdge])
                
                // Set smallest edge.

                setHighlightedIds([...highlightedIds, smallestEdge.id, smallestEdge.source, smallestEdge.target])
                // Add to prims visited nodes ONLY if the node is not already in the visited nodes.
                if (!primsVisitedNodes.includes(smallestEdge.source)) {
                    setPrimsVisitedNodes([...primsVisitedNodes, smallestEdge.source])
                }
                if (!primsVisitedNodes.includes(smallestEdge.target)) {
                    setPrimsVisitedNodes([...primsVisitedNodes, smallestEdge.target])
                }


                break;
            default:
                break;
        }


    })

    const resetAlgorithm = () => {
        console.log("Reset algorithm using dataset", selectedExample)
        setStep(0)
        setHighlightedIds([])
        setEdgesStack([])

        setIsAlgorithmFinished(false)
        setIsRunning(false)
        setMinimumSpanningTreeEdges([])
        setHighlightEdges([])
        
        
        if (selectedAlgorithm === KRUSKAL_ALGORITHM) {
            
            createSmallestEdgesHeap()
        }
        if (selectedAlgorithm === PRIMS_ALGORITHM) {
            // Set the first node as visited
            setPrimsVisitedNodes([nodes[0].id])
            setHighlightedIds([nodes[0].id])
            createSmallestEdgesHeap()

        }
    }

    useEffect(() => {
        createSmallestEdgesHeap()
    }, [])


    const stepAlgorithmRef = useRef(stepAlgorithm);

    useEffect(() => {
        stepAlgorithmRef.current = stepAlgorithm;
    }, [stepAlgorithm]);

    const startAlgorithm = () => {
        setIsRunning(true);
        const id = setInterval(() => stepAlgorithmRef.current(), 2000 / speed); // speed is in seconds
        setIntervalId(id);
    };

    const stopAlgorithm = () => {
        setIsRunning(false);
        clearInterval(intervalId);
    };

    const toggleLoop = () => {
        setIsLoop(!isLoop);
    }


    return (
        <>
            <div>
                <div className="visualizationsProblems">
                    <Tabs
                        id="controlled-tab-example"
                        activeKey={key}
                        onSelect={(k) => setKey(k)}
                    >
                        <Tab eventKey="Graph" title="Graph" />
                        <Tab eventKey="Connected Cities" title="Connected Cities" />
                        <Tab eventKey="Min Cost" title="Min Cost" />
                    </Tabs>
                </div>
                <div style={{ position: "absolute", width: '90%', height: '25em' }}>
                    <GraphCanvas
                        actives={highlightedIds}
                        edgeArrowPosition="none" edgeLabelPosition="above" labelType="all" nodes={nodes} edges={edges} contextMenu={({
                            data,
                            onClose
                        }) => <div style={{
                            background: 'white',
                            width: 150,
                            theme: regularTheme,
                            border: 'solid 1px blue',
                            borderRadius: 2,
                            padding: 5,
                            textAlign: 'center'
                        }}>
                                <h1>{data.label}</h1>
                                <button onClick={onClose}>Close Menu</button>
                            </div>} />
                </div>


                <div className="controls">

                    <Row>
                        <Col>
                            Speed: {speed}x
                            <Form.Control
                                type="range"
                                min="1"
                                max="10"
                                step="1"
                                value={speed}
                                onChange={handleSpeedChange}
                            />
                        </Col>

                        <Col >
                            Step: {step}
                            {isAlgorithmFinished &&
                                <span> - Finished</span>}
                            <br />

                            <Button onClick={isRunning ? stopAlgorithm : startAlgorithm}>
                                {isRunning ? 'Stop' : 'Start'}
                            </Button>
                            <Button onClick={() => stepAlgorithm()} >Step</Button>
                            <Button onClick={() => resetAlgorithm()}  >Reset</Button>
                            <Button onClick={() => toggleLoop()} >{isLoop ? 'Is Loop' : 'No Loop'}</Button>
                        </Col>
                    </Row>
                    <hr />
                    <Row>

                        {/* Step 1: Sort all edges in increasing order of their edge weights.
Step 2: Pick the smallest edge. */}
                        {/* Create a table */}
                        {(selectedAlgorithm == KRUSKAL_ALGORITHM) && edgestStack && edgestStack.length > 0 && (
                            <>
                                Smallest Edges Heap

                                <table>
                                    <thead>
                                        <tr>
                                            <th>Edge</th>
                                            <th>Weight</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {edgestStack.map((edge, index) => (
                                            <tr key={index}>
                                                <td>{edge.id}</td>
                                                <td>{edge.value}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </>
                        )}
                    </Row>
                    {minimumSpanningTreeEdges && minimumSpanningTreeEdges.length > 0 &&
                        <Row>
                            <br />
                            {/* Show the Minimum Spanning Tree */}
                            <h3>Minimum Spanning Tree</h3>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Edge</th>
                                        <th>Weight</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {minimumSpanningTreeEdges.map((edge, index) => (
                                        <tr key={index}>
                                            <td>{edge.id}</td>
                                            <td>{edge.value}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>


                        </Row>}

                    <hr />
                    <Row>
                        <Col>
                            <div className="algorithms">
                                <Dropdown onSelect={async (event) => {
                                    handleSelectAlgorithm(event);
                                    // resetAlgorithm()
                                }}>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        {selectedAlgorithm}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        {algorithms.map((algorithm, index) => (
                                            <Dropdown.Item key={index} eventKey={algorithm.name}>{algorithm.name}</Dropdown.Item>
                                        ))}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </Col>

                        <Col>
                            <div className="examples">
                                <Dropdown onSelect={(event) => handleExampleChange(event)}>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        {selectedExample.name}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        {examplesDatasets.map((example, index) => (
                                            <Dropdown.Item key={index} eventKey={example.name}>{example.name}</Dropdown.Item>
                                        ))}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </Col>
                    </Row>
                    <br />
                    <small className="text-muted">&copy; 2024</small>
                    <br />
                </div>

            </div>


        </>
    )
}
