import { Card, Row, Col, Container, Form } from "react-bootstrap"
import { gql, useQuery, useMutation } from '@apollo/client';
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';

const DefenseProfilesCard = () => {

    const GETDEFENSEPROFILES = gql`
    query{
        getDefenseProfiles{
            id,
            name,
            level,
            postedBy{
                id,
                name,
                email,
                role,
            }
        }        
    }`;

    const DELETE_DEF_PROFILE = gql`
    mutation deleteDefenseProfile($id: ID!){
        deleteDefenseProfile(id:$id){
            id,
        }
    }`;


    const [deleteDefProfile] = useMutation(DELETE_DEF_PROFILE, {
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

    const { loading, data, refetch} = useQuery(GETDEFENSEPROFILES,{
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

    const [defenseProfiles, setDefenseProfiles] = useState([]);

    useEffect(() => {
        if (data) { setDefenseProfiles(data?.getDefenseProfiles) }
        ;
    }, [data])

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
            setDefenseProfiles(data?.getDefenseProfiles.filter(el => el.postedBy?.name === e.target.value))
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
        deleteDefProfile({ variables: { id } }).then((res) => {
            console.log(res)
            if (res.data) {
                notify(`Defense profile deleted with succes`)
                refetch()
            }
        })
    }
    const userId = localStorage.getItem('userId');
    return (
        <div>
            <Container style={{ width: "70%", margin: "auto" }}>
                <br />
                <h1 style={{ textAlign: "center", color: "white" }}>Defense Profil List</h1>

                {loading && !data &&
                    <span>Loading</span>
                }
                <br />
                {data?.getDefenseProfiles && defenseProfiles &&
                    <div>
                        <Form.Select aria-label="Default select example" onChange={handleSelect} defaultValue="all">
                            {filterName().map(el =>
                                <option key={el} value={el}>{el}</option>
                            )}
                            <option  value={"all"}>All</option>
                        </Form.Select>
                        <br />
                        <Row xs={1} md={2} className="g-4">
                            {defenseProfiles.map((el) => (
                                <Col key={el.id}>
                                    <Card>
                                        <Card.Header as="h5">
                                            {el.name}
                                            {el.postedBy?.id === userId &&
                                                <span style={{ position: "absolute", right: "10px" }}>
                                                    {/* <i class="bi bi-pencil"></i>
                                                    &nbsp; &nbsp; &nbsp; */}
                                                    <i value={el.id} className="bi bi-trash3" onClick={handleDelete}></i>
                                                </span>
                                            }
                                        </Card.Header>
                                        <Card.Body>
                                            <Card.Title>Level de défense:<span style={style}>{el.level}</span></Card.Title>
                                            <Card.Text>
                                                Propriétaire du profile de défense:
                                                <span style={style}>{el.postedBy?.name}</span>
                                            </Card.Text>
                                            <Card.Text>
                                                Id du propriétaire
                                                <span style={style}>{el.postedBy?.id}</span>
                                            </Card.Text>
                                            <Card.Text>
                                                <span style={style}>{el.postedBy?.email}</span>
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