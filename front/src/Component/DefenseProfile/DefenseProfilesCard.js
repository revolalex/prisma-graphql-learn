import { Card, Row, Col, Container, Form } from "react-bootstrap"
import { gql, useQuery } from '@apollo/client';
import { useEffect, useState } from "react";

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

    const [defenseProfiles, setDefenseProfiles] = useState([]);

    useEffect(() => {
        setDefenseProfiles(data?.getDefenseProfiles);
    }, [])

    const filterName = () => {
        const names = data?.getDefenseProfiles.map(el => el.postedBy.name)
        const uniqueChars = [...new Set(names)];
        return uniqueChars
    }
    const handleSelect = (e) => {
        const names = filterName()
        if (!names.includes(e.target.value)) {
            setDefenseProfiles(data?.getDefenseProfiles);
        } else {
            setDefenseProfiles(data?.getDefenseProfiles.filter(el => el.postedBy.name === e.target.value))
        }
    }
    return (
        <div>
            <Container>
                <h1>Defense Profil Card</h1>
                {loading && <span>Loading</span>}
                {data && defenseProfiles &&
                    <div>
                        <br />
                        <Form.Select aria-label="Default select example" onChange={handleSelect}>
                            {filterName().map(el =>
                                <option value={el}>{el}</option>
                            )}
                            <option value={"all"}>All</option>
                            <option selected >Choose a filter</option>
                        </Form.Select>
                        <br />
                        <Row xs={1} md={2} className="g-4">
                            {defenseProfiles.map((el) => (
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
                    </div>
                }
            </Container>
        </div>
    )
}

export default DefenseProfilesCard