/**
 * TODO:
 * 1. Add Practice Problems that use 
 * 2. Add Problems that might use Spanning Tree (Leetcode, Codeforces, etc.)
 */

import React from "react";
import Editor from "@monaco-editor/react";
import { Tabs, Tab } from 'react-bootstrap';


export function SpanningTreeProblems() {

    const CONNECTING_CITIES_STARTER = 'CONNECTING_CITIES_STARTER';
    const CONNECIING_CITIES_SOLUTION = 'CONNECIING_CITIES_SOLUTION';
    const code = {
        CONNECTING_CITIES_STARTER: "class Solution:\n\
    def minimumCost(self, n: int, connections: List[List[int]]) -> int:\n\
        ",
        CONNECIING_CITIES_SOLUTION: "class UnionFind:\n\
        \n\
            def __init__(self, n: int):\n\
                self.root = [i for i in range(n)]\n\
                self.rank = [1 for _ in range(n)]\n\
                self.group = n\n\
        \n\
            def find(self, x: int) -> int:\n\
                if self.root[x] != x: self.root[x] = self.find(self.root[x])\n\
                return self.root[x]\n\
            \n\
            def union(self, x: int, y: int) -> None:\n\
                root_x, root_y = self.find(x), self.find(y)\n\
                if root_x == root_y: return\n\
                if self.rank[root_x] > self.rank[root_y]:\n\
                    self.root[root_y] = root_x\n\
                elif self.rank[root_x] < self.rank[root_y]:\n\
                    self.root[root_x] = root_y\n\
                else:\n\
                    self.root[root_y] = root_x\n\
                    self.rank[root_x] += 1\n\
                self.group -= 1\n\
        \n\
            def are_connected(self, x: int, y: int) -> bool:\n\
                return self.find(x) == self.find(y)\n\
        \n\
        \n\
        class Solution:\n\
            def minimumCost(self, n: int, connections: List[List[int]]) -> int:\n\
                uf = UnionFind(n)\n\
                connections.sort(key= lambda x : x[2])\n\
                cost = 0\n\
                for u, v, w in connections:\n\
                    if not uf.are_connected(u - 1, v - 1):\n\
                        uf.union(u - 1, v - 1)\n\
                        cost += w\n\
                return cost if uf.group == 1 else -1\n\
        "


    }
    const SETTINGS = {
        language: "python",
        theme: "vs-dark",
        value: code[CONNECTING_CITIES_STARTER],
        height: "40em"
    }

    console.log("CODE STARTER", CONNECTING_CITIES_STARTER)
    console.log(code[CONNECTING_CITIES_STARTER])
    console.log(code)

    return (
        <>
            <h1>Minimum Spanning Tree Practice Problems</h1>
            <section>
                <h2>Problems Taken From</h2>
                <ul>
                    <li><a href="https://leetcode.com/tag/minimum-spanning-tree/">Leetcode Minimum Spanning Tree</a></li>
                </ul>

                <section>
                    <h4>1135. Connecting Cities With Minimum Cost</h4>
                    <p>
                        There are n cities labeled from 1 to n. You are given the integer n and an array connections where connections[i] = [xi, yi, costi] indicates that the cost of connecting city xi and city yi (bidirectional connection) is costi.
                        Return the minimum cost to connect all the n cities such that there is at least one path between each pair of cities. If it is impossible to connect all the n cities, return -1,
                        The cost is the sum of the connections' costs used.
                    </p>
                    <p>
                        <img src="https://assets.leetcode.com/uploads/2019/04/20/1314_ex2.png" alt="" /> <br />
                        Example 1:
                        Input: n = 3, connections = [[1,2,5],[1,3,6],[2,3,1]]
                        Output: 6
                        Explanation: Choosing any 2 edges will connect all cities so we choose the minimum 2.
                    </p>
                    <p>
                        <img src="https://assets.leetcode.com/uploads/2019/04/20/1314_ex1.png" alt="" /> <br />
                        Input: n = 4, connections = [[1,2,3],[3,4,4]]
                        Output: -1
                        Explanation: There is no way to connect all cities even if all edges are used.
                    </p>
                    <Tabs>
                        <Tab eventKey="python" title="Python">
                            <Editor
                                height={SETTINGS["height"]}
                                language="python"
                                theme="vs-dark"
                                value={code[CONNECTING_CITIES_STARTER]}
                            />
                        </Tab>
                        <Tab eventKey='python-soltion' title='Solution'>
                            <Editor
                                height={SETTINGS["height"]}
                                language="python"
                                theme="vs-dark"
                                value={code[CONNECIING_CITIES_SOLUTION]}
                            />
                        </Tab>
                    </Tabs>

                </section>


            </section>


        </>
    )
}


