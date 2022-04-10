import { Card, Row, Col, Container } from "react-bootstrap"
import { gql, useQuery } from '@apollo/client';

const DefenseProfilesCard = () => {

    const GETDEFPROFILE = gql`
    query{
        getDefenseProfiles{
            id,
            name,
            level,
            postedBy{
                id,
                name,
                email
            }
        }        
    }`;
    const { loading, data } = useQuery(GETDEFPROFILE);
    const style = { color: 'blue' }
    return (
        <div>
            <Container>
                <h1>Defense Profil Card</h1>
                {loading && <span>Loading</span>}
                {data &&
                    <Row xs={1} md={2} className="g-4">
                        {data.getDefenseProfiles.map((el) => (
                            <Col>
                                <Card style={{ backgroundColor: '#FRD' }}>
                                    <Card.Body>
                                        <Card.Title>{el.name}</Card.Title>
                                        <Card.Text>
                                            <p>Level de Défense:
                                                <span style={style}>{el.level}</span>
                                            </p>
                                            <p>Propriétaire du profile d défense:
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

export default DefenseProfilesCard