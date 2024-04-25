import React from 'react';
import { FeatureCard } from '../components/FeaturedCard';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


// Import Router Link.
import { Link } from 'react-router-dom';

const featuredProblems = [
  {
    path: '/min-spanning-tree',
    title: 'Min Spanning Tree',
    img: '/img/minimumspanningtree.png',
    description: "CLRS 23",
    tags: ['Kruskal Algorithm', 'Prim Algorithm']
  },
  {
    path: '/single-source-shortest-path',
    title: 'Single Source Shortest Path',
    img: '/img/single-source-shortest-path.png',
    description: "CLRS 24",
    tags: ['Bellman Ford', 'Dijkstra']
  },
  {
    path: '/all-pairs-shortest-path',
    title: 'All Pairs Shortest Path',
    img: '/img/all-pairs-shortest-path.png',
    description: "CLRS 25",
    tags: ['Floyd Warshall']
  },
  {
    path: '/maximum-flow',
    title: 'Maximum Flow',
    img: '/img/maximum-flow.png',
    description: "CLRS 26",
    tags: ['Ford Fulkerson', 'Edmonds Karp']
  },
  {
    path: '/shortest-path-searching',
    title: 'Shortest Path Searching.',
    img: '/img/shortest-path-searching.png',
    description: "",
    tags: ['A*', 'D*', 'Dijkstra']
  },
  {
    path: '/adversarial-search',
    title: 'Adversarial Search',
    img: '/img/adversarial-search.png',
    description: "",
    tags: ['alpha-beta pruning']
  },


]

export const BasicScreen = () => (
  <>

    {/* Have a table of cards */}
    {/* Rows */}
    <br />
    <h3>Choose Your Own Poison</h3>

    <Row xs={2} md={3} lg={4} className="g-5">
      {featuredProblems.map((_, idx) => (
        <Col key={idx}>
          <Link to={featuredProblems[idx].path}>

            <FeatureCard
              title={featuredProblems[idx].title}
              imageSrc={process.env.PUBLIC_URL + featuredProblems[idx].img}
              description={featuredProblems[idx].description}
              tags = {featuredProblems[idx].tags}
            ></FeatureCard>
          </Link>
        </Col>
      ))}
    </Row>
  </>
);