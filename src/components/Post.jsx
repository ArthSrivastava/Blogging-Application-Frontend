import { Link } from "react-router-dom";
import { Button, Card, CardBody, CardText } from "reactstrap";

export default function Post(props) {

    return (
        <Card className="border-0 shadow-sm mt-3">
            <CardBody>
                <h1><i>{props.post.title}</i></h1>
                <CardText dangerouslySetInnerHTML={{
                    __html: props.post.content.substring(0, 60) + "..."
                }}>
                </CardText>
                <Link className="btn btn-dark" to={"/posts/" + props.post.postId}>Read More</Link>
            </CardBody>
        </Card>
    )
}