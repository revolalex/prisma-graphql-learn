import { Card, Row, Col, Container, Form, OverlayTrigger, Tooltip } from "react-bootstrap"
import { useQuery, useMutation } from '@apollo/client';
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { GetRisks, DeleteRisk } from "../../Queries/RiskQuerie";

const RiskCard = () => {
    const { loading, data, refetch } = useQuery(GetRisks, {
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

    const [deleteRisk] = useMutation(DeleteRisk, {
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

    // state
    const [risks, setRisks] = useState([]);

    // uesEffect
    useEffect(() => {
        if (data) { setRisks(data?.getRisks) }
    }, [data])
    
    useEffect(() => {
        refetch()
    },[])

    // filter the name of owner risk
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

    // popup toast
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

    // delete risk
    const handleDelete = (e) => {
        const id = e.target.attributes.value.value
        deleteRisk({ variables: { id } }).then((res) => {
            if (res.data) {
                notify(`Risk deleted with succes`)
                refetch()
            }
        })
    }

    const style = { color: 'blue' }
    const userId = localStorage.getItem('userId')

    return (
        <div style={{ paddingBottom: "100px" }}>
            <Container style={{ width: "70%", margin: "auto" }}>
                <br />
                <h1 style={{ textAlign: "center", color: "white" }}>Risk Lists</h1>
                {loading &&
                    <span>Loading</span>
                }
                <br />
                <Form.Select aria-label="Choose a owner to filter risk" onChange={handleSelect} defaultValue="all">
                    {filterName().map(el =>
                        <option key={el} value={el}>{el}</option>
                    )}
                    <option value="all">All</option>
                </Form.Select>
                <br />
                {risks && data?.getRisks &&
                    <Row xs={1} md={2} className="g-4">
                        {risks.map((el) => (
                            <Col key={el.id}>
                                <Card className="my-card">
                                    <Card.Header as="h5">
                                        {el.name}
                                        <span style={{ position: "absolute", right: "10px" }}>
                                            {/* <i class="bi bi-pencil"></i>
                                                    &nbsp; &nbsp; &nbsp; */}
                                            <OverlayTrigger
                                                overlay={
                                                    <Tooltip id="tooltip-disabled">
                                                        {el.postedBy?.id === userId
                                                            ? "You can delete it because you are the owner"
                                                            : <span className="d-inline-block">
                                                                <i class="bi bi-exclamation-triangle"></i>
                                                                You can't delete it, you are not the owner, try you will see the request is protect with permissions
                                                            </span>
                                                        }
                                                    </Tooltip>}
                                            >
                                                <span className="d-inline-block">
                                                    <i
                                                        style={el.postedBy?.id === userId ? { color: "red" } : { fontSize: "12px" }}
                                                        value={el.id}
                                                        className="bi bi-trash3"
                                                        onClick={handleDelete}
                                                    >
                                                    </i>
                                                </span>
                                            </OverlayTrigger>
                                        </span>
                                    </Card.Header>
                                    <Card.Body>
                                        <Card.Title>Level de Défense:<span style={style}>{el.value}</span></Card.Title>
                                        <Card.Text>
                                            Propriétaire du Risk:
                                            <span style={style}>{el.postedBy.name}</span>
                                        </Card.Text>
                                        <Card.Text>
                                            Id du propriétaire
                                            <span style={style}>{el.postedBy.id}</span>
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