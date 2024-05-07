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

## For Single Source Shortest Path


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


### Minimax

```python

```

### Alpha Beta Prunning

```python

```

