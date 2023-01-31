import { Container } from "reactstrap";
import Base from "../components/Base";
import NewFeed from "../components/NewFeed";
export default function Home() {
  return (
    <Base>
      <Container className="mt-3">
        <NewFeed />
      </Container>
    </Base>
  );
}
