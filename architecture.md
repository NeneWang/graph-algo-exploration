For completing the algorithms we have to also design how they work.

- [x] Overal Plan
  - [ ] Add Design Questions
- [ ] Write Down Pseudocode Algorithms
  - [ ] Lets learn for Single Source

## Some Design Questions

- How about the length of the code? Is there a way to pack the code in a manner that is easier to modify?


Here is what we will do. It will calculate all the steps from before:

1. Keep an array that tracks the following per each step.

Structure
```
// Example
[
    {
        step: 0,
        highlighted_nodes: [node1, node2, node3],
        highlighted_edges: [edge1, edge2],
        // Other variables for debuging. (not necessarily. and this depends on the algorithm) You can just dump it here, because memory is cheap.
    }
]

```

This is ideal because we can go to the past as well. And things can be precalculated at the start.

    The key steps (After) abstracting the logic into history records can be seen that the clear ones are when 

    - reset algorithm
    - precalculateAlgorithmSteps
## For Single Source Shortest Path here a general js.


```js
import React from 'react'

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

function GraphVisualizer(precalculateAlgorithmSteps, resetAlgorithm, history) {

    
    const [step, setStep] = useState(0)
    const [nodes, setNodes] = useState(simpleNodes)
    const [edges, setEdges] = useState(simpleEdges)
    const [isLoop, setIsLoop] = useState(false)

    const [isAlgorithmFinished, setIsAlgorithmFinished] = useState(false)
    const [speed, setSpeed] = useState(3);
    const [highlightedIds, setHighlightedIds] = useState([]);

    const [isRunning, setIsRunning] = useState(false)

    const [intervalId, setIntervalId] = useState(null);
    const [needsToReset, setNeedsToReset] = useState(false)

    const handleSelectAlgorithm = (event) => {
        setSelectedAlgorithm(event);
        setNeedsToReset(true)
    };

    const handleSpeedChange = (event) => {
        setSpeed(event.target.value);
    };

    
    const nextStepAlgorithm = useCallback(async () => {
        if (needsToReset) {
            precalculateAlgorithmSteps()
            setNeedsToReset(false)
            
        }
        if (step >= history.length) {
            handleFinishAlgorithm()
            return;
        }
        displayAlgorithmStep()

        setStep(step + 1)

    })

    const prevStepAlgorithm = () => {
        if (step <= 0) {
            return;
        }
        setStep(step - 1)
        displayAlgorithmStep()
    }

    const displayAlgorithmStep = () => {
        if (step >= history.length) {
            handleFinishAlgorithm()
            return;
        }
        const currentStep = history[step]
        setHighlightedIds([...currentStep.highlighted_nodes, ...currentStep.highlighted_edges])
        
    }

    const resetAlgorithm = () => {
        setStep(0)
        setHighlightedIds([])
        setIsAlgorithmFinished(false)
        precalculateAlgorithmSteps()
        // displayAlgorithmStep()
    }

    useEffect(() => {
        precalculateAlgorithmSteps()
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

    }


  return (
    <
                <div className="visualizationsProblems">
                    <Tabs>
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




```



### Dikiistra's Algorithm

1. Initialize the following variables:
    a. `distData: Dict[{shortestDistance, previosVertex}]`: an array with shortest distance found so far together with the previous vertex that leads to the shortest path.
    b. `visited[]`: a boolean array to keep track of visited vertices, initialized to false for all vertices.
    c. `priorityQueue`: a priority queue to store the vertices with their corresponding distances from the source.

2. Add the source vertex to the priority queue with distance 0.

3. While the priority queue is not empty:
    a. Extract the vertex `u` with the smallest distance from the priority queue.
    b. If `visited[u]` is true, continue to the next iteration.
    c. Mark `u` as visited by setting `visited[u]` to true.

    d. For each neighbor `v` of vertex `u`:
        i. If `visited[v]` is true, continue to the next neighbor.
        ii. Calculate the new distance to `v` via `u` as `newDist = dist[u] + weight(u, v)`.
        iii. If `newDist` is less than `dist[v]`:
            - Update `dist[v][shortestDistance]` to `newDist`.
            - Update `dist[v][previousVertex]` to `u`.
            - Add `v` to the priority queue with the updated distance.

4. After exiting the loop, the `dist[]` array will contain the shortest distances from the source to all other vertices.

5. Return `dist[]` as the output.
6. Pseudocode should also include the initialization of the `dist[]` array and the priority queue.


- Lets first create the code generator for each. (which should occur on start.)
- Once this can be done we can already prepopulate others using this idea of an glrotihm that just records all the future and now actions.


How `nodes` and `edges` are expected as:

```js
const simpleNodes = [
    {
        id: 'n0',
        label: 'n0'
    },
    {
        id: 'n1',
        label: 'n1'
    },
    ...
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
    ...
]

```

- Search for: `highlightedIds`


HIghlighted edges doesnt seem to be working?

### Bellman Ford Algorithm

```python

```


## All Pair Shortest Path

### Floyd Warshall Algorithm

```python

```


## Shortest Path Searching

### A* Search

```python

```

### Dijkstra's Algorithm

```python

```

### D*

```python

```


## Adversarial Search


Will this work?

```
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
        ]
    }
];
```

given:



### Minimax

```python

```

### Alpha Beta Prunning

```python

```

