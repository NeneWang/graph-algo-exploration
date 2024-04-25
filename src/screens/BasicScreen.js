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
  }
]

export const BasicScreen = () => (
  <>

    {/* Have a table of cards */}
    {/* Rows */}

    <Row xs={2} md={2} lg={3} className="g-5">
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