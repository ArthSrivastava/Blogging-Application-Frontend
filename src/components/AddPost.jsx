import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
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
import { getCurrentUserData } from "../services/auth/auth_service";
import getAllCategories from "../services/category-service";
import { makePost, uploadImage } from "../services/post-service";

export default function AddPost() {
  const [categories, setCategories] = useState([])
  const [loggedInUser, setLoggedInUser] = useState(undefined)

  //For Jodit editor
  const editor = useRef(null);
  const [content, setContent] = useState("")

  const [postData, setPostData] = useState({
    title: "",
    content: "",
    categoryId: 0,
  });

  const [image, setImage] = useState(null)

  //Handle input field changes
  function fieldChanged(event) {
    setPostData((prevPostData) => {
      return {
        ...prevPostData,
        [event.target.name]: event.target.value,
      };
    });
  }

  //To populate the categories and current user
  useEffect(() => {
    let currentUserId = getCurrentUserData().id;
    setLoggedInUser(currentUserId);

    getAllCategories()
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //Submit the form
  function createPost(event) {
    event.preventDefault();

    //frontend validations
    if (postData.categoryId === "") {
      toast.error("Category must be selected!");
      return;
    }
    if (postData.content === "") {
      toast.error("Post content cannot be empty!");
      return;
    }
    if (postData.title === "") {
      toast.error("You must provide a title to the post!");
      return;
    }

    //submit on server
    postData["userId"] = loggedInUser;
    makePost(postData)
      .then((data) => {

        uploadImage(image, data.postId).catch((error) => {
          console.log(error)
          toast.error("Unable to upload the image")
        })
        toast.success("Post created successfully!");
        resetForm();
      })
      .catch((error) => {
        console.log(error)
        toast.error("Some error occurred!");
      });
  }

  //To handle the input changes in Jodit Editor
  function handleChangedContent(data) {
    setContent(data);
    setPostData((prevPostData) => {
      return {
        ...prevPostData,
        content: data,
      };
    });
  }

  //Reset the form
  function resetForm() {
    setContent("")
    setPostData({
      title: "",
      content: "",
      categoryId: 0,
    });
    setImage(null)
  }

  //handle file change input
  function handleFileChange(event) {
    if(!event.target.files[0].type.startsWith("image")) {
      toast.error("Please select an image file!")
      return
    }
    setImage(event.target.files[0])
  }

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
                <Form onSubmit={createPost}>
                  <div className="my-3">
                    <Label for="post--title">
                      <h5>Post title</h5>
                    </Label>
                    <Input
                      type="text"
                      id="post--title"
                      placeholder="Enter here"
                      className="rounded-0"
                      value={postData.title}
                      onChange={fieldChanged}
                      name="title"
                    />
                  </div>
                  <div className="my-3">
                    <Label for="post--content">
                      <h5>Post content</h5>
                    </Label>
                    <JoditEditor
                      ref={editor}
                      value={content}
                      onChange={(content) => handleChangedContent(content)}
                      id="post--content"
                      className="rounded-0"
                    />
                    {/* <Input
                      type="textarea"
                      id="post--content"
                      placeholder="Start typing..."
                      style={{
                        height: "250px",
                        resize: "none",
                      }}
                      className="rounded-0"
                      value={postData.content}
                      onChange={fieldChanged}
                      name="content"
                    /> */}
                  </div>

                  <div className="mt-3">
                    <Label for="image"><h5>Post Image</h5></Label>
                      <Input type="file" id="image" className="rounded-0" onChange={handleFileChange}/>
                  </div>

                  <div className="my-3">
                    <Label for="post--category">
                      <h5>Post Category</h5>
                    </Label>
                    <Input
                      type="select"
                      id="post--category"
                      className="rounded-0"
                      onChange={fieldChanged}
                      defaultValue={postData.categoryId}
                      name="categoryId"
                    >
                      <option disabled value={postData.categoryId}>
                        --Select Category--
                      </option>
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
                      onClick={resetForm}
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
