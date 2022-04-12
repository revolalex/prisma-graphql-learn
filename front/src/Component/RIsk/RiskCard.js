import { Card, Row, Col, Container, Form } from "react-bootstrap"
import { gql, useQuery } from '@apollo/client';
import { useEffect, useState } from "react";

const RiskCard = () => {
    const GETRISKS = gql`
    query{
        getRisks{
            id,
            name,
            value, 
            postedBy{id,name,email}
        }
    }`;
    const { loading, data } = useQuery(GETRISKS);
    const style = { color: 'blue' }

    const [risks, setRisks] = useState([]);

    useEffect(() => {
        if(data){setRisks(data?.getRisks)}
        // setRisks(data?.getRisks);
    }, [])

    const filterName = () => {
        const names = data?.getRisks.map(el => el.postedBy.name)
        const uniqueChars = [...new Set(names)];
        return uniqueChars
    }
    const handleSelect = (e) => {
        const names = filterName()
        if(!names.includes(e.target.value)){
            setRisks(data?.getRisks);
        }else{
            setRisks(data.getRisks.filter(el => el.postedBy.name === e.target.value))
        }
    }
    return (
        <div style={{ paddingBottom: "100px" }}>
            <Container>
                <h1>Risk Card</h1>
                <br />
                <Form.Select aria-label="Choose a owner to filter risk" onChange={handleSelect}>
                    {filterName().map(el =>
                        <option value={el}>{el}</option>
                    )}
                    <option  value="all">All</option>
                    <option selected >Choose a filter</option>
                </Form.Select>
                <br /> 
                {loading && <span>Loading</span>}
                {risks &&
                    <Row xs={1} md={2} className="g-4">
                        {risks.map((el) => (
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