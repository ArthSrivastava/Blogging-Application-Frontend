import { useState } from "react";
import { toast } from "react-toastify";
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import Base from "../components/Base";
import { login } from "../services/user_service";
export default function Login() {
  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: ""
  })

  //Handling change in input fields
  function handleLoginData(event) {
    setLoginDetails(prevLoginDetails => {
      return {
        ...prevLoginDetails,
        [event.target.name]: event.target.value
      }
    })
  }

  //For resetting the form
  function resetForm() {
      setLoginDetails({
        username: "",
        password: ""
      })
  }

  //Submitting the form
  function submitForm(event) {
    event.preventDefault()
    console.log(loginDetails)
    //validation
    if(loginDetails.username.trim() == "" || loginDetails.password.trim() == "") {
      toast.error("Enter valid username or password!")
      return;
    }

    //send to server
    login(loginDetails).then((jwtTokenData) => {
      toast.success("User logged in successfully!")
    }).catch((respError) => {
      if(respError.response.status == 404 || respError.response.status == 400) {
        toast.error(respError.response.data.message)
      } else {
        toast.error("Something went wrong on the server!")
      }
    })
  }
  return (
    <Base>
      <Container>
        <Row>
          <Col sm={
            {
              size:6, offset:3
            }
          }>
            <Card color="dark" inverse className="mt-5">
              <CardHeader>
                <h3>Login</h3>
              </CardHeader>
              <CardBody>
                <Form onSubmit={submitForm}>
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input 
                      type="email"
                      id="email" 
                      placeholder="Enter here" 
                      onChange={handleLoginData} 
                      name="username" 
                      value={loginDetails.username}
                      />
                  </FormGroup>
                  <FormGroup>
                    <Label for="password">Password</Label>
                    <Input 
                      type="password"
                      id="password"
                      placeholder="Enter here" 
                      onChange={handleLoginData} 
                      name="password" 
                      value={loginDetails.password}
                      />
                  </FormGroup>
                  <Container className="text-center">
                    <Button color="light" outline>Login</Button>
                    <Button color="secondary" outline className="ms-2" onClick={resetForm}>Reset</Button>
                  </Container>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Base>
  );
}
