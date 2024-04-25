import { Card, Badge } from "react-bootstrap";

export const FeatureCard = ({ imageSrc, title, description, tags }) => {
    return (
        <Card className="feature-card">
            <Card.Img variant="top" src={imageSrc} />
            <Card.Body>
                <Card.Title className="centered-title-card">{title}</Card.Title>

                <Card.Text>
                    {description}
                </Card.Text>
                
                {tags && tags.map((tag, index) => (
                    <Badge key={index} bg="secondary" style={{marginRight: 10}}>
                        {tag}
                    </Badge>
                ))}
            </Card.Body>
        </Card>
    )
};