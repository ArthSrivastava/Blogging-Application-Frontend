import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Base from "../components/Base";
import { getCurrentUserData } from "../services/auth/auth_service";
import { getPostByPostId, updatePost } from "../services/post-service";
import { toast } from "react-toastify";
import JoditEditor from "jodit-react";
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
import { privateAxios } from "../services/helper";

export default function UpdateBlog() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState(null);

  //For Jodit editor
  const editor = useRef(null);
  const [content, setContent] = useState("");

  useEffect(() => {
    getPostByPostId(postId)
      .then((data) => {
        setPost({
          ...data,
          categoryId: data.category.categoryId,
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in loading posts");
      });
    setUser(getCurrentUserData());

    getAllCategories()
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (post && user && post.user.id != user.id) {
      toast.error("You are not authorized to view this post!");
      navigate("/");
    }
  }, [post]);

  const handleChange = (event) => {
    setPost({
      ...post,
      [event.target.name]: event.target.value,
    });
  };

  const submitUpdatePost = (event) => {
    event.preventDefault();
    updatePost({
      ...post,
      category: {
        categoryId: post.categoryId
      },
    }, postId)
      .then((data) => {
        console.log(data);
        toast.success("Post updated successfully!");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in updating post!");
      });
  };

  function getJSX() {
    return (
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
                <Form onSubmit={submitUpdatePost}>
                  <div className="my-3">
                    <Label for="post--title">
                      <h5>Post title</h5>
                    </Label>
                    <Input
                      type="text"
                      id="post--title"
                      placeholder="Enter here"
                      className="rounded-0"
                      value={post.title}
                      onChange={handleChange}
                      name="title"
                    />
                  </div>
                  <div className="my-3">
                    <Label for="post--content">
                      <h5>Post content</h5>
                    </Label>
                    <JoditEditor
                      ref={editor}
                      value={post.content}
                      onChange={(newContent) =>
                        setPost({ ...post, content: newContent })
                      }
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
                    <Label for="image">
                      <h5>Post Image</h5>
                    </Label>
                    <Input
                      type="file"
                      id="image"
                      className="rounded-0"
                      onChange={""}
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
                      onChange={handleChange}
                      value={post.categoryId}
                      name="categoryId"
                    >
                      <option disabled value={0}>
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
                      Update Post
                    </Button>
                    <Button
                      color="danger"
                      type="reset"
                      className="rounded-0 ms-2"
                      onClick={""}
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
    );
  }
  return <Base>{post && getJSX()}</Base>;
}
