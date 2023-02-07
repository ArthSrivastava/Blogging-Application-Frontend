import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import Base from "../components/Base";
import { doLogin } from "../services/auth/auth_service";
import { login } from "../services/user_service";
import userContext from "../context/userContext";

export default function Login() {

  const userContextData = useContext(userContext)
  
  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: ""
  })

  const navigate = useNavigate()
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
    console.log("clicking",loginDetails)
    //validation
    if(loginDetails.username.trim() == "" || loginDetails.password.trim() == "") {
      toast.error("Enter valid username or password!")
      return;
    }

    //send to server
    login(loginDetails).then((data) => {
      doLogin(data, () => {
        navigate("/user/dashboard")
        console.log(userContextData)
        userContextData.setUser({
          data: data.user,
          login: true
        })
        toast.success("Login successful!")
      })
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
            <Card className="mt-5 card border-0 rounded-0">
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
                    <Button color="primary" outline>Login</Button>
                    <Button color="danger" outline className="ms-2" onClick={resetForm}>Reset</Button>
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
