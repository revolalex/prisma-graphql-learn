import { Card, Container } from "react-bootstrap";
import MyNavbar from "../Component/Navbar/MyNabar";
import { Form, Button } from "react-bootstrap";
import { gql, useMutation } from '@apollo/client';
import { useState } from "react";
import { toast } from "react-toastify";
import WaveAnimationComponent from "../Component/Animation/WaveAnimation";

const CreateDefenseProfil = () => {

    const POSTRISK = gql`
    mutation postDefenseProfile($name: String!, $level: String!) {
        postDefenseProfile(name:$name, level:$level) {
            id,
            name,
            level,
            postedBy{
                name
            }
        }
    }   
    `;

    const [postRisk] = useMutation(POSTRISK, {
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

    const [name, setName] = useState("");
    const [level, setLevel] = useState("");
    const handleName = (e) => {
        setName(e.target.value);
    }

    const handleLevel = (e) => {
        setLevel(e.target.value);
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
    const resetInput = () => {
        setName("");
        setLevel("");
    }

    const handleClick = (e) => {
        e.preventDefault();
        if (name === "") {
            toast.error("Please enter a name", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else if (level === "") {
            toast.error("Please enter a level", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            postRisk({ variables: { name: name, level: level } })
                .then(res => {
                    if(res.data){
                        notify("Defense profile created whith success")
                    }
                    resetInput()
                })
        }
    }

    return (
        <div className="container-global-custom" style={{ minHeight: "100vh" }}>
            <WaveAnimationComponent />
            <MyNavbar />
            <br />
            <Container>
                <h1 style={{ textAlign: "center", color: "white" }}>Create Defense Profil</h1>
                <br />
                <br />
                <Card style={{ maxWidth: "70%", margin: "auto", padding: "2em" }}>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Nom du defense profil</Form.Label>
                            <Form.Control type="name" placeholder="Enter name of the defense profile" value={name} onChange={handleName} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Level du défense profil</Form.Label>
                            <br />
                            <Form.Text>Must be  LOW | MEDIUM | HIGH</Form.Text>
                            <Form.Select aria-label="Select a level" onChange={handleLevel}>
                                <option>Open this select menu</option>
                                <option value="LOW">LOW</option>
                                <option value="MEDIUM">MEDIUM</option>
                                <option value="HIGH">HIGH</option>
                            </Form.Select>
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={handleClick}>
                            Submit
                        </Button>
                    </Form>
                </Card>
            </Container>

        </div>
    );
}

export default CreateDefenseProfil;