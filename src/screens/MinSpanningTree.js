import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GraphCanvas } from 'reagraph';
import { Dropdown, Tabs, Tab, Row, Col, Button, Form } from 'react-bootstrap';




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
        name: 'Kruskal Algorithm',
        description: 'Kruskal Algorithm'
    },
    {
        name: 'Prim Algorithm',
        description: 'Prim Algorithm'
    }
]

const examples = [
    {
        name: 'Default Example'
    },
    {
        name: 'IA. 21.4'
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




export function MinSpanningTreeScreen() {

    const [currentTheme, setCurrentTheme] = useState(regularTheme)
    const [selectedAlgorithm, setSelectedAlgorithm] = useState(
        algorithms[0].name
    )

    const [selectedExample, setSelectedExample] = useState(
        examples[0].name
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
    const [highlightedNodes, setHighlightedNodes] = useState([]);
    const [minimumSpanningTreeEdges, setMinimumSpanningTreeEdges] = useState([])

    const [edgestStack, setEdgesStack] = useState([])
    const [isRunning, setIsRunning] = useState(false)

    const [intervalId, setIntervalId] = useState(null);



    const handleSelectAlgorithm = (event) => {
        setSelectedAlgorithm(event.target.value);
    };

    const handleSpeedChange = (event) => {
        setSpeed(event.target.value);
    };



    const createSmallestEdgesHeap = () => {
        // Create a copy of edges.
        const tempEdges = [...edges]
        let tempEdgestStack = tempEdges.sort((a, b) => a.value - b.value)


        setEdgesStack(tempEdgestStack)
        console.log("Edges Stack", tempEdgestStack)
    }
    const delay = ms => new Promise(res => setTimeout(res, ms));
    const markRedTransaction = (edgeTarget) => {
        /**
         * No idea where the bug is here. It seems to break the edges id references.
         */
        // Finds and sets repeated node color to  fill?: string; red

        const nodeSource = edgeTarget.source
        const nodeTarget = edgeTarget.target

        const isEdgeSourceInHighligted = highlightedNodes.includes(nodeSource.id)
        const isEdgeTargetInHighligted = highlightedNodes.includes(edgeTarget.id)


        const newNodes = nodes.map((node) => {
            if (node.id === nodeSource.id && isEdgeSourceInHighligted) {
                return {
                    ...node,
                    fill: '#ff0e0e'
                }
            }
            if (node.id === nodeTarget.id && isEdgeTargetInHighligted) {
                return {
                    ...node,
                    fill: '#ff0e0e'
                }
            }
            return node
        });

        console.log("New Nodes", newNodes)

        setNodes(newNodes)

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
        switch (selectedAlgorithm) {
            case 'Kruskal Algorithm':
                if (edgestStack.length === 0) {
                    console.log("No more edges")
                    handleFinishAlgorithm()
                    break;
                }
                setStep(step + 1)
                // Run the Kruskal, whereas it would highlight the edges ( if not creates an cycle)
                const topEdge = edgestStack.shift()
                setEdgesStack(edgestStack)
                const sourceNodeId = topEdge.source
                const targetNodeId = topEdge.target

                // If any of source or target is on the highlightedIds, then it would create a cycle
                if (highlightedIds.includes(sourceNodeId) && highlightedIds.includes(targetNodeId)) {
                    // Make a small animation where it highlights the line, and remove after 100 seconds.

                    const beforeHighlight = [...highlightedIds];

                    setHighlightedIds([...highlightedIds, topEdge.id, sourceNodeId, targetNodeId])
                    // markRedTransaction(
                    //     removeTop
                    // )

                    await delay(100);
                    setHighlightedIds(beforeHighlight)


                    console.log("Cycle Detected")
                    break;
                }

                setMinimumSpanningTreeEdges([...minimumSpanningTreeEdges, topEdge])
                setHighlightedIds([...highlightedIds, topEdge.id, sourceNodeId, targetNodeId])


                break;
            case 'Prim Algorithm':
                console.log("Prim Algorithm")
                break;
            default:
                break;
        }


    })

    const resetAlgorithm = () => {
        setStep(0)
        setHighlightedIds([])
        setEdgesStack([])
        setIsAlgorithmFinished(false)
        setIsRunning(false)
        setMinimumSpanningTreeEdges([])


        if (selectedAlgorithm === 'Kruskal Algorithm') {
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
                            theme: currentTheme,
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
                        {edgestStack && edgestStack.length > 0 && (
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
                                <Dropdown onSelect={handleSelectAlgorithm}>
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
                                <Dropdown onSelect={(event) => setSelectedExample(event)}>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        {selectedExample}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        {examples.map((example, index) => (
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
