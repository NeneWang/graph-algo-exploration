/**
 * TODO: SpanningTreeAbout
 * - Add Basic Information about what it attempts to do.
 * - Compare different solutions pseudocde
 * - Compare performance.
 * - Add references.
 */

import React from 'react';

export function SpanningTreeAbout() {
    return (
        <>
            <h1>About Minimum Spanning Tree</h1>
            <section>
            </section>
            <section>
                <h2>Comparing MST Algorithms</h2>
                <article>
                    <h3>Kruskal's Algorithm</h3>
                    <p>Pseudocode:</p>
                    <pre>
                        {`1. Sort all the edges in non-decreasing order of their weight.
2. Pick the smallest edge. Check if it forms a cycle with the spanning tree formed so far. If cycle is not formed, include this edge.
3. Repeat step 2 until there are (V-1) edges in the spanning tree.`}
                    </pre>
                    <p>Performance: O(E log E) or O(E log V)</p>
                </article>
                <article>
                    <h3>Prim's Algorithm</h3>
                    <p>Pseudocode:</p>
                    <pre>
                        {`1. Initialize a tree with a single vertex, chosen arbitrarily from the graph.
2. Grow the tree by one edge: of the edges that connect the tree to vertices not yet in the tree, find the minimum-weight edge, and transfer it to the tree.
3. Repeat step 2 until all vertices are in the tree.`}
                    </pre>
                    <p>Performance: O(E log V) using a binary heap and adjacency list</p>
                </article>
            </section>
            <section>
                <h2>References</h2>
                <ul>
                    {/* <li><a href="https://example.com">Graph Theory by Example.com</a></li>
                    <li><a href="https://example.com">Algorithm Analysis by Example.com</a></li> */}
                    <li><a href="https://leetcode.com/tag/minimum-spanning-tree/">Leetcode Minimum Spanning Tree</a></li>
                </ul>
            </section>
        </>
    );
}
