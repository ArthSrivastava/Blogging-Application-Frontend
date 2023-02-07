import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Card,
  CardBody,
  CardText,
  Col,
  Container,
  Input,
  Row,
  Button,
} from "reactstrap";
import Base from "../components/Base";
import { getCurrentUserData } from "../services/auth/auth_service";
import { createComment } from "../services/comment-service";
import { BASE_URL } from "../services/helper";
import { getPostByPostId } from "../services/post-service";

export default function PostPage() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState({
    userId: getCurrentUserData()?.id,
    content: "",
    pId: postId,
  });

  useEffect(() => {
    getPostByPostId(postId)
      .then((data) => {
        setPost(data);
      })
      .catch((error) => {
        toast.error("Some error occurred, the post cannot be loaded!");
      });
  }, []);

  function getDate(addedDate) {
    const date = new Date(addedDate);
    const d = date.getDate();
    const m = date.toLocaleString("default", { month: "long" });
    const y = date.getUTCFullYear();
    return d + " " + m + ", " + y;
  }

  //Handle onChange on comment
  function commentChange(event) {
    setComment((prevComment) => {
      return {
        ...prevComment,
        content: event.target.value,
      };
    });
  }

  //Handle submit comment button
  function submitComment(event) {
    event.preventDefault();
    if (comment.content.trim() == "") {
      toast.error("Comment cannot be empty!");
      return;
    }
    createComment(comment)
      .then((data) => {
        console.log(data);
        setPost((prevPost) => {
          return {
            ...prevPost,
            comments: [...prevPost.comments, data],
          };
        });
        setComment((prevComment) => {
          return {
            ...prevComment,
            content: "",
          };
        });
        toast.success("Comment added successfully!");
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data.status == 401) {
          toast.error(error.response.data.message + " You are not logged in");
        } else {
          toast.error("Something went wrong! Unable to add your comment!");
        }
      });
  }

  return (
    <Base>
      <Container>
        {/* <Link to="/">Home</Link> */}
        <Row className="mt-3">
          <Col md={{ size: 12 }}>
            <Card className="rounded-0 shadow ps-2 border-0">
              {post && (
                <CardBody>
                  <CardText>
                    Posted by <b>{post.user.name}</b> on{" "}
                    <b>{getDate(post.addedDate)}</b>
                  </CardText>
                  <CardText>
                    <span className="text-muted">
                      {post.category.categoryTitle}
                    </span>
                  </CardText>
                  <hr />
                  <CardText className="mt-3">
                    <h1>{post.title}</h1>
                  </CardText>
                  {post.imageName != "default.png" && (
                    <div
                      className="img-container shadow mt-3"
                      style={{ maxWidth: "50%" }}
                    >
                      <img
                        src={BASE_URL + "/posts/image/" + post.imageName}
                        alt="post-image"
                        className="img-fluid"
                      />
                    </div>
                  )}
                  <CardText
                    className="mt-3"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                </CardBody>
              )}
            </Card>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col
            md={{
              size: 12,
            }}
          >
            <Card className="ps-2 rounded-0 border-0 shadow-sm">
              {post && <h2 className="mt-3 ms-3">Comments ({post.comments.length})</h2>}
              <CardBody className="mt-2 border-0">
                <Input
                  type="textarea"
                  placeholder="Enter comment here"
                  className="rounded-0"
                  style={{
                    height: "100px",
                    resize: "none",
                  }}
                  onChange={commentChange}
                  value={comment.content}
                />
                <Button
                  className="mt-3 rounded-0"
                  color="primary"
                  onClick={submitComment}
                  outline
                >
                  Submit
                </Button>
              </CardBody>
              {post &&
                post.comments.map((c, index) => {
                  return (
                    <CardText key={index} className="p-0 ms-3">
                      <b>
                        {c.user.name} ({c.user.email})
                      </b>
                      : {c.content}
                    </CardText>
                  );
                })}
            </Card>
          </Col>
        </Row>
      </Container>
    </Base>
  );
}
