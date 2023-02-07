import { useState } from "react";
import { toast } from "react-toastify";
import {
  Card,
  CardBody,
  CardHeader,
  Container,
  FormGroup,
  Input,
  Label,
  Form,
  Button,
  Row,
  Col,
  FormFeedback,
} from "reactstrap";
import Base from "../components/Base";
import { signUp } from "../services/user_service";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    about: "",
  });

  const [errors, setErrors] = useState({
    error: "",
    hasError: false,
  });
  //Handle form inputs
  function handleChange(event) {
    // console.log(formData);
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }

  //Resets the data and fields
  function resetData() {
    setFormData({
      name: "",
      email: "",
      password: "",
      about: "",
    });
    resetError();
  }
  function resetError() {
    setErrors({
      error: "",
      hasError: false,
    });
  }

  //submitting the form
  function submitForm(event) {
    event.preventDefault();
    console.log(formData);

    //Validation

    //Submitting to server

    signUp(formData)
      .then((resp) => {
        console.log(resp);
        toast.success("User registered successfully!");
        resetData();
      })
      .catch((respError) => {
        // console.log(error)
        setErrors({
          error: respError,
          hasError: true,
        });
        toast.error("Enter all data correctly!");
      });
  }
  return (
    <Base>
      <Container>
        <Row className="mt-3">
          <Col
            sm={{
              size: 6,
              offset: 3,
            }}
          >
            <Card className="card border-0 shadow-sm rounded-0">
              <CardHeader>
                <h3>Register Here</h3>
              </CardHeader>

              <CardBody>
                <Form onSubmit={submitForm}>
                  <FormGroup>
                    <Label for="name">Name</Label>
                    <Input
                      type="text"
                      id="name"
                      placeholder="Enter here"
                      onChange={handleChange}
                      name="name"
                      value={formData.name}
                      invalid={
                        errors.hasError && errors.error.response.data.name
                          ? true
                          : false
                      }
                    />
                    <FormFeedback>
                      {errors.hasError && errors.error.response.data.name}
                    </FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input
                      type="email"
                      id="email"
                      placeholder="Enter here"
                      onChange={handleChange}
                      name="email"
                      value={formData.email}
                      invalid={
                        errors.hasError && errors.error.response.data.email
                          ? true
                          : false
                      }
                    />
                    <FormFeedback>
                      {errors.hasError && errors.error.response.data.email}
                    </FormFeedback>
                  </FormGroup>

                  <FormGroup>
                    <Label for="password">Password</Label>
                    <Input
                      type="password"
                      id="password"
                      placeholder="Enter here"
                      onChange={handleChange}
                      name="password"
                      value={formData.password}
                      invalid={
                        errors.hasError && errors.error.response.data.password
                          ? true
                          : false
                      }
                    />
                    <FormFeedback>
                      {errors.hasError && errors.error.response.data.password}
                    </FormFeedback>
                  </FormGroup>

                  <FormGroup>
                    <Label for="about">About</Label>
                    <Input
                      type="textarea"
                      id="textarea"
                      placeholder="Enter here"
                      style={{ height: "150px" }}
                      onChange={handleChange}
                      name="about"
                      value={formData.about}
                      invalid={
                        errors.hasError && errors.error.response.data.about
                          ? true
                          : false
                      }
                    />
                    <FormFeedback>
                      {errors.hasError && errors.error.response.data.about}
                    </FormFeedback>
                  </FormGroup>

                  <Container className="text-center">
                    <Button color="primary">
                      Signup
                    </Button>
                    <Button
                      color="danger"
                      type="reset"
                      className="ms-2"
                      onClick={resetData}
                    >
                      Reset
                    </Button>
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
