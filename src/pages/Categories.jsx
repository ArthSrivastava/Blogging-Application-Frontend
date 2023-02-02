import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Base from "../components/Base";
import { getPostsByCategory } from "../services/post-service";
import { Container, Row, Col } from "reactstrap";
import CategorySideMenu from "../components/CategorySideMenu";
import Post from "../components/Post";
export default function Categories() {
    
    const {categoryId} = useParams()
    const [posts, setPosts] = useState([])
    useEffect(() => {
        getPostsByCategory(categoryId).then((data) => {
            // console.log(data)
            setPosts([...data.content])
        }).catch(error => {
            console.log(error)
        })
    }, [categoryId])
    return (
        <Base>
            <Container className="mt-3">
        <Row>
          <Col className="pt-2" md={
            {
              size: 2
            }
          }
          >
            <CategorySideMenu />
          </Col>
          <Col md={
            {
              size: 10
            }
          }>
            <h1>Total blogs ({posts.length})</h1>
            {
                posts && posts.map((post, index) => {
                    return (
                        <Post post={post} key={index}/>
                    )
                })
            }
            {
                posts.length==0 && <h1>No posts available</h1>
            }
          </Col>
        </Row>
      </Container>
        </Base>
    )
}