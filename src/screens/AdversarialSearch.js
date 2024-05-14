import React, { useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
// import {SingleShortestPathInteractive} from './SSSInteractiveGraph';
import { AdversarialInteractiveGraph } from './AdversarialInteractiveGraph';
// import { SpanningTreeAbout } from './SpanningTreeAbout';
// import { SpanningTreeProblems } from './SpanningTreeProblems';

export function AdversarialSearchScreen() {

    const [key, setKey] = useState('interactive-graph');

    return (
        <>
            <div>
                <br />
                <h3>Adversarial Search</h3>
                <br />
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
                {key === 'interactive-graph' && <AdversarialInteractiveGraph />}
                {/* {key === 'about' && <SpanningTreeAbout />}
                {key === 'problems' && <SpanningTreeProblems />} */}


            </div>

            <br />
            <br />


        </>
    )
}
