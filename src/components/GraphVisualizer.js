import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GraphCanvas } from 'reagraph';
import { Dropdown, Tabs, Row, Col, Button, Form } from 'react-bootstrap';

function GraphVisualizer({  algorithms, examplesDatasets }) {

    const [selectedAlgorithm, setSelectedAlgorithm] = useState(
        algorithms[0].name
    )

    const [selectedExample, setSelectedExample] = useState(
        examplesDatasets[0]
    )

    const [step, setStep] = useState(0)
    const [nodes, setNodes] = useState(examplesDatasets[0].nodes)
    const [edges, setEdges] = useState(examplesDatasets[0].edges)
    const [isLoop, setIsLoop] = useState(false)

    const [isAlgorithmFinished, setIsAlgorithmFinished] = useState(false)
    const [speed, setSpeed] = useState(3);
    const [highlightedIds, setHighlightedIds] = useState([]);

    const [isRunning, setIsRunning] = useState(false)

    const [intervalId, setIntervalId] = useState(null);
    const [needsToReset, setNeedsToReset] = useState(false)
    const [isDirected, setIsDirected] = useState(true)
    

    const [history, setHistory] = useState([])

    const handleSelectAlgorithm = (event) => {
        setSelectedAlgorithm(event);
        setNeedsToReset(true)
    };

    const handleSpeedChange = (event) => {
        setSpeed(event.target.value);
    };


    // eslint-disable-next-line react-hooks/exhaustive-deps
    const nextStepAlgorithm = useCallback(async () => {
        if (needsToReset) {
            setStep(0)
            precalculateAlgorithmSteps(selectedAlgorithm, nodes, edges)
            setNeedsToReset(false)

        }
        if (step >= history.length) {
            handleFinishAlgorithm()
            return;
        }
        displayAlgorithmStep()

        setStep(step + 1)

    })


    const handleFinishAlgorithm = () => {

        setIsAlgorithmFinished(true)

        if (isLoop) {
            resetAlgorithm()


        } else {
            // stopAlgorithm()
        }
    }

    const prevStepAlgorithm = () => {
        if (step <= 0) {
            return;
        }
        setStep(step - 1)
        displayAlgorithmStep()
    }

    
    const precalculateAlgorithmSteps = (selectedAlgorithm, nodes, edges, { verbose = true } = {}) => {
        // To call when the dataset is changed, or the algorithm changes.
        // This will precalculate the steps for the algorithm.
        if (selectedAlgorithm) {
            const algorithm = algorithms.find(algo => algo.name === selectedAlgorithm);
            if (algorithm) {
                const history = algorithm.preCalculate(nodes, edges, { verbose });
                if(verbose) console.table(history)
                setHistory(history)
            }
        }
    }


    const displayAlgorithmStep = ({verbose=true}={}) => {
        if (step >= history.length) {
            handleFinishAlgorithm()
            return;
        }
        const currentStep = history[step]
        const toDisplay = [...currentStep.highlighted_nodes, ...currentStep.highlighted_edges]
        if(verbose) console.table(toDisplay)
        setHighlightedIds(toDisplay)

    }

    const resetAlgorithm = () => {
        setStep(0)
        setHighlightedIds([])
        setIsAlgorithmFinished(false)
        setIsDirected(selectedExample?.isDirected??false)
        console.log(selectedExample, 'isDirected')
        precalculateAlgorithmSteps( selectedAlgorithm, nodes, edges)
        // displayAlgorithmStep()
    }

    useEffect(() => {
        resetAlgorithm()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    const stepAlgorithmRef = useRef(nextStepAlgorithm);

    useEffect(() => {
        stepAlgorithmRef.current = nextStepAlgorithm;
    }, [nextStepAlgorithm]);

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

    /**
     * 
     * @param {string} newExample Example selected.
     */
    const handleExampleChange = async (newExample) => {
        const selectedDataset = examplesDatasets.find(
            (example) => example.name === newExample
        )

        setSelectedExample(selectedDataset)
        setNodes(selectedDataset.nodes)
        setEdges(selectedDataset.edges)
        setNeedsToReset(true)
        resetAlgorithm()

    }


    const conditionalProps = isDirected ? {} : { edgeArrowPosition: "none" }
    return (
        <div>
            <div className="visualizationsProblems">
                <Tabs>
                </Tabs>
            </div>
            <div style={{ position: "absolute", width: '90%', height: '25em' }}>
                <GraphCanvas
                
                    actives={highlightedIds}
                    {...conditionalProps}
                    edgeLabelPosition="above" labelType="all" nodes={nodes} edges={edges} contextMenu={({
                        data,
                        onClose
                    }) => <div>
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
                        <Button onClick={() => nextStepAlgorithm()} >Step</Button>
                        <Button onClick={() => prevStepAlgorithm()} >Prev</Button>
                        <Button onClick={() => resetAlgorithm()}  >Reset</Button>
                        <Button onClick={() => toggleLoop()} >{isLoop ? 'Is Loop' : 'No Loop'}</Button>
                    </Col>
                </Row>
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
    )
}

export default GraphVisualizer
