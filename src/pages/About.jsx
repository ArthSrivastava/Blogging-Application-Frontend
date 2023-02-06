import AboutView from "../components/AboutView";
import Base from "../components/Base";
import { Container } from "reactstrap";
export default function About() {
  return (
    <Base>
      <Container>
        <AboutView />
      </Container>
    </Base>
  );
}
