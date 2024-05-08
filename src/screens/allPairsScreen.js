import React, { useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
// import {SingleShortestPathInteractive} from './SSSInteractiveGraph';
import {allPairsInteractive} from './allPairsInteractive';
// import { SpanningTreeAbout } from './SpanningTreeAbout';
// import { SpanningTreeProblems } from './SpanningTreeProblems';

export function AllPairsShortestPathScreen() {

    const [key, setKey] = useState('interactive-graph');

    return (
        <>
            <div>
            <h1>All-Pairs Shortest Path Problem</h1>
            <p>Given a graph with weighted edges as input, the All-Pairs Shortest Path Problem aims to find the shortest path between every pair of nodes. The expected output is a matrix where each entry represents the shortest distance between a pair of nodes.</p>


                <div className="visualizationsProblems">
                    <Tabs
                        id="controlled-tab-example"
                        activeKey={key}
                        onSelect={(k) => setKey(k)}
                    >
                        <Tab eventKey="interactive-graph" title="Interactive Graph" />
                        <Tab eventKey="about" title="About" />
                        <Tab eventKey="problems" title="Problems" />
                    </Tabs>
                </div>
                {/* Show if tab ==  */}
                {key === 'interactive-graph' && <allPairsInteractive />}
                {/* {key === 'about' && <SpanningTreeAbout />}
                {key === 'problems' && <SpanningTreeProblems />} */}


            </div>

            <br />
            <br />


        </>
    )
}
