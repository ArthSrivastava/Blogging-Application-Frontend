import { Link } from "react-router-dom";
import { Card, CardBody, CardHeader, Container, Table } from "reactstrap";

export default function AboutView() {
  return (
    <Card className="mt-3 shadow-sm border-0 rounded-0">
      <CardHeader className="text-center">
        <h1>About me</h1>
      </CardHeader>
      <CardBody>
        <Container className="text-center">
          <img
            src="https://media.licdn.com/dms/image/C4D03AQFREFBIPie8xg/profile-displayphoto-shrink_200_200/0/1650052367448?e=1681344000&v=beta&t=LXZ78fY2GNlPos9pzveUBmB7aLE4wAgw37peYUlDDwg"
            height={200}
            width={200}
            className="shadow-sm rounded"
          />
        </Container>
        <Table className="text-center mt-2" striped responsive>
            <tbody>
                <tr>
                    <td><h3>Name</h3></td>
                    <td><h3>Arth Srivastava</h3></td>
                </tr>
                <tr>
                    <td><h3>LinkedIn</h3></td>
                    <td><Link to="https://www.linkedin.com/in/arth-srivastava/" className="btn btn-primary">LinkedIn</Link></td>
                </tr>
                <tr>
                    <td><h3>Github</h3></td>
                    <td><Link to="https://github.com/ArthSrivastava" className="btn btn-primary">Github</Link></td>
                </tr>
                <tr>
                    <td><h3>Twitter</h3></td>
                    <td><Link to="https://twitter.com/ArthSrivastava2" className="btn btn-primary">Twitter</Link></td>
                </tr>
            </tbody>
        </Table>
      </CardBody>
    </Card>
  );
}
