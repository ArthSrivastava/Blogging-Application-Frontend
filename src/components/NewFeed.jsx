import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
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
  });

  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    changePage(currentPage);
  }, [currentPage]);

  //change page
  const changePage = (pageNumber = 0, pageSize = 5) => {
    if (pageNumber > postsData.pageNumber && postsData.lastPage) return;
    if (pageNumber < postsData.pageNumber && postsData.pageNumber == 0) return;

    getAllPosts(pageNumber, pageSize)
      .then((data) => {
        setPostsData({
          ...data,
          content: [...postsData.content, ...data.content],
        });
        // window.scroll(0, 0)
      })
      .catch((error) => {
        toast.error("Error in loading posts");
      });
  };

  //change page infinite
  const pageChangeInfinite = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div>
      <Row>
        <Col>
          <h1>Total Blogs ({postsData?.totalElements})</h1>

          {/* Infinite Scroll */}
          <InfiniteScroll
            dataLength={postsData.content.length}
            next={pageChangeInfinite}
            hasMore={!postsData.lastPage}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {postsData.content.map((post) => (
              <Post key={post.postId} post={post} />
            ))}
          </InfiniteScroll>

          {/* Pagination */}
          {/* <Container className="mt-3">
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
          </Container> */}
        </Col>
      </Row>
    </div>
  );
}
