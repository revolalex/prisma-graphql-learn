import { Card, Container } from "react-bootstrap";
import MyNavbar from "../Component/Navbar/MyNabar";
import { Form, Button } from "react-bootstrap";
import { gql, useMutation } from '@apollo/client';
import { useState } from "react";
import { toast } from "react-toastify";
import WaveAnimationComponent from "../Component/Animation/WaveAnimation";

const CreateRisk = () => {
    const POSTRISK = gql`
      mutation postRisk($name: String!, $value: Int!) {
        postRisk(name: $name, value: $value) {
          name,
          value,
          postedBy {
            id,
            name,
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
    const [value, setValue] = useState("");

    const handleName = (e) => {
        setName(e.target.value);
    }

    const handleValue = (e) => {
        setValue(+e.target.value);
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
        setValue("");
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
        } else if (value === "") {
            toast.error("Please enter a value", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            const riskValue = +value
            postRisk({ variables: { name: name, value: riskValue } })
                .then(res => {
                    if (res.data) {
                        console.log(res)
                        notify("Risk created whith success")
                    }
                })
            resetInput()
        }

    }

    return (
        <div className="container-global-custom" style={{ minHeight: "100vh" }}>
            <WaveAnimationComponent />
            <MyNavbar />
            <br />
            <Container>
                <h1 style={{ textAlign: "center", color: "white" }}>Create Risk</h1>
                <br />
                <br />
                <Card style={{ maxWidth: "70%", margin: "auto", padding: "2em" }}>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Nom du risk</Form.Label>
                            <Form.Control type="name" placeholder="Enter name of the risk" value={name} onChange={handleName} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Valeur du risk</Form.Label>
                            <Form.Control type="number" placeholder="Enter Risk value" value={value} onChange={handleValue} />
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

export default CreateRisk;