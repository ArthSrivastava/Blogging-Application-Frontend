import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, CardText } from "reactstrap";
import { getCurrentUserData, isLoggedIn } from "../services/auth/auth_service";
import userContext from "../context/userContext"
export default function Post(props) {

    const [loggedIn, setLoggedIn] = useState(false)
    const [user, setUser] = useState({})
    const userContextData = useContext(userContext)
    useEffect(() => {
        setLoggedIn(isLoggedIn())
        setUser(getCurrentUserData())
    }, [])

    return (
        <Card className="border-0 shadow-sm mt-3">
            <CardBody>
                <h1><i>{props.post.title}</i></h1>
                <CardText dangerouslySetInnerHTML={{
                    __html: props.post.content.substring(0, 60) + "..."
                }}>
                </CardText>
                <Link className="btn btn-dark" to={"/posts/" + props.post.postId}>Read More</Link>
                {(loggedIn && props.post.user.id == user.id) ? <Button className="ms-2" color="danger" onClick={() => props.deletePost(props.post.postId)}>Delete</Button> : ""}
            </CardBody>
        </Card>
    )
}