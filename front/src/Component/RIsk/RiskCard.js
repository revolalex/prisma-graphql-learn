import { Card, Row, Col, Container, Form } from "react-bootstrap"
import { gql, useQuery, useMutation } from '@apollo/client';
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';

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
    const { loading, data, refetch } = useQuery(GETRISKS,{
         // handle errors
         onError(err) {
            const error = `${err}`.split(':').reverse()[0];
            return toast.error(error, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        },

    });

    const DELETE_RISK = gql`
    mutation deleteRisk($id: ID!){
        deleteRisk(id:$id){
            id,
        }
    }`;

    const [deleteRisk] = useMutation(DELETE_RISK, {
        // handle errors
        onError(err) {
            const error = `${err}`.split(':').reverse()[0];
            return toast.error(error, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        },
    });

    const style = { color: 'blue' }

    const [risks, setRisks] = useState([]);

    useEffect(() => {
        if (data) { setRisks(data?.getRisks) }
    }, [data])

    const filterName = () => {
        const names = data?.getRisks.map(el => el.postedBy.name)
        const uniqueChars = [...new Set(names)];
        return uniqueChars
    }

    const handleSelect = (e) => {
        const names = filterName()
        if (!names.includes(e.target.value)) {
            setRisks(data?.getRisks);
        } else {
            setRisks(data.getRisks.filter(el => el.postedBy.name === e.target.value))
        }
    }
    
    const notify = (text) => {
        toast.success(text, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    const handleDelete = (e) => {
        const id = e.target.attributes.value.value
        console.log(id)
        deleteRisk({ variables: { id } }).then((res) => {
            console.log(res)
            if (res.data) {
                notify(`Risk deleted with succes`)
                refetch()
            }
        })
    }

    const userId = localStorage.getItem('userId')
    return (
        <div style={{ paddingBottom: "100px" }}>
            <Container style={{ width: "70%", margin: "auto" }}>
                <br />
                <h1 style={{ textAlign: "center", color: "white" }}>Risk Card</h1>
                {loading && <span>Loading</span>}
                <br />
                <Form.Select aria-label="Choose a owner to filter risk" onChange={handleSelect}>
                    {filterName().map(el =>
                        <option value={el}>{el}</option>
                    )}
                    <option value="all">All</option>
                    <option selected >Choose a filter</option>
                </Form.Select>
                <br />
                {risks &&
                    <Row xs={1} md={2} className="g-4">
                        {risks.map((el) => (
                            <Col>
                                <Card>
                                    <Card.Header as="h5">
                                        {el.name}
                                        {el.postedBy.id === userId &&
                                            <span style={{ position: "absolute", right: "10px" }}>
                                                {/* <i class="bi bi-pencil"></i>
                                                    &nbsp; &nbsp; &nbsp; */}
                                                <i value={el.id} class="bi bi-trash3" onClick={handleDelete}></i>
                                            </span>
                                        }
                                    </Card.Header>
                                    <Card.Body>
                                        <Card.Title>Level de Défense:<span style={style}>{el.value}</span></Card.Title>
                                        <Card.Text>
                                            Propriétaire du profile d défense:
                                            <span style={style}>{el.postedBy.name}</span>
                                        </Card.Text>
                                        <Card.Link href="#">{el.postedBy.email}</Card.Link>
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