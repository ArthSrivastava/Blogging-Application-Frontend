import { Container } from "reactstrap";
import Base from "../components/Base";
import NewFeed from "../components/NewFeed";
import {Row, Col} from "reactstrap"
import CategorySideMenu from "../components/CategorySideMenu";
export default function Home() {
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
            <NewFeed />
          </Col>
        </Row>
      </Container>
    </Base>
  );
}
