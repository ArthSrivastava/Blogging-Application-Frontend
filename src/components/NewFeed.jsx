import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  Col,
  Container,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
} from "reactstrap";
import { getAllPosts } from "../services/post-service";
import Post from "./Post";
export default function NewFeed() {
  const [postsData, setPostsData] = useState({
    content: [],
    totalElements: 0,
    pageNumber: 0,
    numberOfElementsOnSinglePage: 0,
    totalPages: 0,
    lastPage: false,
  })

  useEffect(() => {
    changePage()
  }, [])

  //change page
  const changePage = (pageNumber=0, pageSize=5) => {
    console.log("pageNumber:", pageNumber)
    console.log("postsData.pageNumber:", postsData.pageNumber)
    // console.log(JSON.stringify(postsData))
    if(pageNumber > postsData.pageNumber && postsData.lastPage) return
    if(pageNumber < postsData.pageNumber && postsData.pageNumber == 0) return

    getAllPosts(pageNumber, pageSize)
      .then((data) => {
        setPostsData(data)
        window.scroll(0, 0)
      })
      .catch((error) => {
        toast.error("Error in loading posts")
      })
  }

  return (
    <div>
      <Row>
        <Col
          md={{
            size: 10,
            offset: 1,
          }}
        >
          <h1>Total Blogs ({postsData?.totalElements})</h1>
          {postsData.content.map((post) => (
            <Post key={post.postId} post={post} />
          ))}

          <Container className="mt-3">
            <Pagination>
              <PaginationItem onClick={() => changePage(postsData.pageNumber - 1)} disabled={postsData.pageNumber == 0}>
                <PaginationLink previous>Previous</PaginationLink>
              </PaginationItem>
              {[...Array(postsData.totalPages)].map((item, index) => {
                return (
                  <PaginationItem onClick={() => changePage(index)} active={index == postsData.pageNumber} key={index}>
                    <PaginationLink>{index + 1}</PaginationLink>
                  </PaginationItem>
                )
              })}
              <PaginationItem onClick={() => changePage(postsData.pageNumber + 1)} disabled={postsData.lastPage}>
                <PaginationLink next>Next</PaginationLink>
              </PaginationItem>
            </Pagination>
          </Container>
        </Col>
      </Row>
    </div>
  );
}
