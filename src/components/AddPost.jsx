import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  Input,
  Label,
  Form,
  Button,
  Row,
} from "reactstrap";
import getAllCategories from "../services/category-service";

export default function AddPost() {
  const [categories, setCategories] = useState([]);
  const editor = useRef(null);
  const [content, setContent] = useState("");

  //To populate the categories
  useEffect(() => {
    getAllCategories()
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Container className="mt-2">
        <Row>
          <Col
            sm={{
              size: 6,
              offset: 3,
            }}
          >
            <Card className="rounded-0 card">
              <CardBody>
                <h3>Share your thoughts to the world</h3>
                <hr />
                <Form>
                  <div className="my-3">
                    <Label for="post--title">
                      <h5>Post title</h5>
                    </Label>
                    <Input
                      type="text"
                      id="post--title"
                      placeholder="Enter here"
                      className="rounded-0"
                    />
                  </div>
                  <div className="my-3">
                    <Label for="post--content">
                      <h5>Post content</h5>
                    </Label>
                    {/* <JoditEditor 
                        ref={editor}
                        value={content}
                        onChange={(newContent) => {setContent(newContent)}}
                        id="post--content"
                    /> */}
                    <Input 
                        type="textarea"
                        id="post--content"
                        placeholder="Start typing..."
                        style={{
                            height: "250px",
                            resize: "none"
                        }}
                        className="rounded-0"
                        />
                  </div>
                  <div className="my-3">
                    <Label for="post--category">
                      <h5>Post Category</h5>
                    </Label>
                    <Input
                      type="select"
                      id="post--category"
                      className="rounded-0"
                    >
                      {categories.map((category) => {
                        return (
                          <option
                            key={category.categoryId}
                            value={category.categoryId}
                          >
                            {category.categoryTitle}
                          </option>
                        );
                      })}
                    </Input>
                  </div>
                  <Container className="text-center">
                    <Button color="primary" className="rounded-0">
                      Create Post
                    </Button>
                    <Button
                      color="danger"
                      type="reset"
                      className="rounded-0 ms-2"
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
    </>
  );
}
