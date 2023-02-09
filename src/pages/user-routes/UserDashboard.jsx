import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { Container } from "reactstrap"
import AddPost from "../../components/AddPost"
import Base from "../../components/Base"
import Post from "../../components/Post"
import { doLogout, getCurrentUserData } from "../../services/auth/auth_service"
import { deletePostService, getPostsByUser } from "../../services/post-service"
export default function UserDashboard() {
    const [user, setUser] = useState({})
    const [posts, setPosts] = useState([])
    const [loggedIn, setLoggedIn] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        setUser(getCurrentUserData())

        getPostsByUser(getCurrentUserData().id).then((data) => {
            setPosts([...data.content])
            setLoggedIn(true)
        }).catch(error => {
            console.log(error)
            if(error.response.data.message == "JWT token has expired!") {
                autoLogout()
                return
            }
            toast.error("Error in loading posts!")
        })
        
    }, [])

    const autoLogout = () => {
        doLogout(() => {
            navigate("/home")
        })
        setLoggedIn(false)
        toast.error("Please sign in again to continue!")
    }

    function deletePost(postId) {
        deletePostService(postId).then((data) => {
            console.log(data)
            toast.success("Post deleted successfully!")
            let newPosts = posts.filter(p => p.postId != postId)
            setPosts([...newPosts])
        }).catch(error => {
            autoLogout()
            toast.error("Unable to delete post!")
        })
    }
    return (
        <Base>
        <Container>
            <AddPost />
            <h1 className="my-3">Posts count ({posts.length})</h1>
            {
                posts.map((post, index) => {
                    return (
                        <Post post={post} key={index} deletePost={deletePost}/>
                    )
                })
            }
            </Container>
        </Base>
    )
}