import { Card, Row, Col, Container } from "react-bootstrap"
import { gql, useQuery } from '@apollo/client';

const RiskCard = () => {

    const GETRISKS = gql`
    query{
    getRisks{
      id,
      name,
      value, 
      postedBy{
        id,
        name,
        email
      }
    }
    }`;
    const { loading, error, data } = useQuery(GETRISKS);
    const style = { color: 'blue' }

    return (
        <div style={{paddingBottom:"100px"}}>
            <Container>
                <h1>Risk Card</h1>
                {loading && <span>Loading</span>}
                {data &&
                    <Row xs={1} md={2} className="g-4">
                        {data.getRisks.map((el) => (
                            <Col>
                                <Card style={{ backgroundColor: '#FRD' }}>
                                    <Card.Body>
                                        <Card.Title>{el.name}</Card.Title>
                                        <Card.Text>
                                            <p>Valeur du risk:
                                                <span style={style}>{el.value}</span>
                                            </p>
                                            <p>Propriétaire du risk:
                                                <span style={style}>{el.postedBy.name}</span>
                                            </p>
                                            <p>Email:
                                                <span style={style}>{el.postedBy.email}</span>
                                            </p>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                }
            </Container>
        </div>
    )
}

export default RiskCard