import { Card, Container } from "react-bootstrap";
import MyNavbar from "../Component/Navbar/MyNabar";
import { Form, Button } from "react-bootstrap";
import { gql, useMutation } from '@apollo/client';
import { useState } from "react";

const CreateRisk = () => {

    const POSTRISK = gql`
      mutation postRisk($name: String!, $value: String!) {
        postRisk(name: $name, value: $value) {
          name,
          value,
          id
          postedBy {
            id,
            name,
          }
        }
      }
    `;
     const [postRisk] = useMutation(POSTRISK);

    //  postRisk({ variables: { name: name, value: value} })
    //         .then(res => {})

    const [name, setName] = useState();
    const [value, setValue] = useState();
    const handleName = (e) => {
        setName(e.target.value);
    }

    const handleValue = (e) => {
        setValue(e.target.value);
    }
    const handleClick=(e)=>{
        e.preventDefault();
        
        console.log(name, value)
        postRisk({ variables: { name: name, value: value} })
            .then(res => {console.log(res)})
    }
    return (
        <div className="container-global-custom" style={{ minHeight: "100vh" }}>
            <MyNavbar />
            <br/>
            <Container>
                <h1>Create Risk</h1>
                <br/>
                <br/>
                <Card style={{maxWidth:"70%", margin:"auto", padding:"2em"}}>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Nom du risk</Form.Label>
                            <Form.Control type="name" placeholder="Enter name of the risk" value={name} onChange={handleName}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Valeur du risk</Form.Label>
                            <Form.Control type="value" placeholder="Enter Risk value" value={value} onChange={handleValue} />
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