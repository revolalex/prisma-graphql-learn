import { Card, Container } from "react-bootstrap";
import MyNavbar from "../Component/Navbar/MyNabar";
import { Form, Button } from "react-bootstrap";
import { gql, useMutation } from '@apollo/client';
import { useState } from "react";
import { toast } from "react-toastify";

const CreateDefenseProfil = () => {


    const POSTRISK = gql`
    #   mutation postRisk($name: String!, $value: Int!) {
    #     postRisk(name: $name, value: $value) {
    #       name,
    #       value,
    #       postedBy {
    #         id,
    #         name,
    #       }
    #     }
    #   }
    mutation postDefenseProfile($name: String!, $level: String!) {
        postDefenseProfile(name:$name, level:$level) {
            id,
            name,
            postedBy{
                name
            }
        }
    }   
    `;

    const [postRisk] = useMutation(POSTRISK);

    //  postRisk({ variables: { name: name, value: value} })
    //         .then(res => {})

    const [name, setName] = useState();
    const [level, setLevel] = useState();
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
    const resetInput=()=>{
        setName("");
        setLevel("");
    }

    const handleClick = (e) => {
        e.preventDefault();
        postRisk({ variables: { name: name, level: level } })
            .then(res => {
                console.log(res)
                notify("Defense profile created whith success")
                resetInput()
            })
    }

    return (
        <div className="container-global-custom" style={{ minHeight: "100vh" }}>
            <MyNavbar />
            <br />
            <Container>
                <h1>Create Defense Profil</h1>
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
                            <Form.Control type="text" placeholder="Enter level" value={level} onChange={handleLevel} />
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