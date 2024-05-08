import React, { useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import {SingleShortestPathInteractive} from './SSSInteractiveGraph';
// import { SpanningTreeAbout } from './SpanningTreeAbout';
// import { SpanningTreeProblems } from './SpanningTreeProblems';

export function SingleShortesPathScreen() {

    const [key, setKey] = useState('interactive-graph');

    return (
        <>
            <div>
                <h1>Single Source Shortest Path</h1>
                <p>
                    Given a graph G D .V; E/, we want to find a shortest path from a given source vertex `s` inside `V` to each vertex in `V` .
                </p>

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
                {key === 'interactive-graph' && <SingleShortestPathInteractive />}
                {/* {key === 'about' && <SpanningTreeAbout />}
                {key === 'problems' && <SpanningTreeProblems />} */}


            </div>

            <br />
            <br />


        </>
    )
}
