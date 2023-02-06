import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Base from "../../components/Base"
import { getCurrentUserData, isLoggedIn } from "../../services/auth/auth_service"
import {Container, Card, CardHeader, CardBody, Table} from "reactstrap"
import ViewUserProfile from "../../components/ViewUserProfile"
export default function ProfileInfo() {

    const [user, setUser] = useState(null)
    const navigate = useNavigate()
    useEffect(() => {
        setUser({
            data: getCurrentUserData(),
            loggedIn: isLoggedIn()
        })

        if(!isLoggedIn()) {
            navigate("/login")
        }
    }, [])

    const generateJSX = () => {
        return (
            <Container className="text-center">
                <ViewUserProfile user={user} />
            </Container>
        )
    }
    return (
        <Base>
            <h1>{user && generateJSX()}</h1>
        </Base>
    )
}