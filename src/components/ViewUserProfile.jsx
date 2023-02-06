import { Container, Card, CardHeader, CardBody, Table } from "reactstrap";

export default function ViewUserProfile({ user }) {
  return (
    <Card className="rounded-0 shadow-sm border-0 mt-3">
      <CardHeader>
        <h1>Profile Info</h1>
      </CardHeader>
      <CardBody>
        <Container>
          <img
            src="/src/assets/profile-logo.png"
            alt="profileImage"
            style={{
              maxWidth: "30vw",
              maxHeight: "30vh",
            }}
          />
        </Container>
        <Table responsive striped>
          <tbody>
            <tr>
              <td>User ID</td>
              <td>{user.data.id}</td>
            </tr>
            <tr>
              <td>Name</td>
              <td>{user.data.name}</td>
            </tr>
            <tr>
              <td>About</td>
              <td>{user.data.about}</td>
            </tr>
            <tr>
              <td>Roles</td>
              <td>
                {user.data.roles.map((role) => {
                  return <div key={role.id}>{role.name}</div>;
                })}
              </td>
            </tr>
          </tbody>
        </Table>
      </CardBody>
    </Card>
  );
}
