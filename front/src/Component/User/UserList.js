import { Row, Col, Container } from "react-bootstrap"
import { gql, useQuery, useMutation } from '@apollo/client';
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import './UserList.css'
import { DeleteUser, GetUsers } from "../../Queries/UserQueries";


const UserList = () => {

    const [deleteUser] = useMutation(DeleteUser, {
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

    const { loading, data, refetch } = useQuery(GetUsers, {
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
    const [users, setUsers] = useState();

    // useEffect
    useEffect(() => {
        if (data) { setUsers(data?.getUsers) }
    }, [data])

    useEffect(() => {
        refetch()
    }, [])

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
        deleteUser({ variables: { id } }).then((res) => {
            if (res.data) {
                notify(`User deleted with succes`)
                refetch()
            }
        })
    }

    const style = { color: 'blue' }

    if (loading) {
        return <span>Loading</span>
    }

    return (
        <div style={{ paddingBottom: "100px" }}>
            <Container style={{ width: "70%", margin: "auto" }}>
                <br />
                <h1 style={{ textAlign: "center", color: "white" }}>Users List</h1>
                <br />
                {data?.getUsers && users &&
                    <Row xs={1} md={2} className="g-4">
                        <br />
                        <br />
                        {users.map((el) => (
                            <Col key={el.id}>
                                <div class="user-card">
                                    <img src="https://www.nautec.com/wp-content/uploads/2018/04/placeholder-person.png" alt="" />
                                    <h2>Name: {el.name}
                                        <span style={{ marginLeft: "50px", cursor: "pointer" }}>
                                            <i value={el.id} className="bi bi-trash3" onClick={handleDelete}></i>
                                        </span>                                      
                                    </h2>
                                    <div class="cont">
                                        <p>
                                            User Id: <span style={style}>{el.id}</span>
                                            <br />
                                            User Role: <span style={style}>{el.role}</span>
                                            <br />
                                            User Role: <span style={style}>{el.role}</span>
                                            <br />
                                            @ <span style={style}>{el.email}</span>
                                        </p>
                                    </div>
                                </div>
                                {/* <Card>
                                    <Card.Header as="h5">
                                        {el.name}
                                        <span style={{ position: "absolute", right: "10px" }}>
                                            <i value={el.id} className="bi bi-trash3" onClick={handleDelete}></i>
                                        </span>
                                    </Card.Header>
                                    <Card.Body>
                                        <Card.Title>User name:<span>{el.name}</span></Card.Title>
                                        <Card.Text>
                                            User Id:
                                            <span style={style}>{el.id}</span>
                                        </Card.Text>
                                        <Card.Text>
                                            User Role:
                                            <span style={style}>{el.role}</span>
                                        </Card.Text>
                                        <Card.Link href="#">{el.email}</Card.Link>
                                    </Card.Body>
                                </Card> */}
                            </Col>
                        ))}
                    </Row>
                }
            </Container>
        </div>
    )
}

export default UserList