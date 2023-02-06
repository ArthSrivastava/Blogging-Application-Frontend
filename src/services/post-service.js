import { myAxios, privateAxios } from "./helper"

export const makePost = (postData) => {
    return privateAxios.post(`/user/${postData.userId}/category/${postData.categoryId}/posts`, postData).then(response => response.data)
}

export const getAllPosts = (pageNumber=0, pageSize=5) => {
    return myAxios.get(`/posts?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=addedDate&sortOrder=desc`).then(response => response.data)
}

export const getPostByPostId = (postId) => {
    return myAxios.get(`/posts/${postId}`).then(response => response.data)
}

export const uploadImage = (image, postId) => {
    const formData = new FormData()
    formData.append("image", image)
    return privateAxios.post(`/posts/image/upload/${postId}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(response => response.data)
}

//get posts by category
export const getPostsByCategory = (categoryId) => {
    return myAxios.get(`/category/${categoryId}/posts`).then(response => response.data)
}

//get posts by user
export const getPostsByUser = (userId) => {
    return privateAxios.get(`/user/${userId}/posts`).then(response => response.data)
}

//delete post
export const deletePostService = (postId) => {
    return privateAxios.delete(`/posts/${postId}`).then(response => response.data)
}

//update post
export const updatePost = (post, postId) => {
    return privateAxios.put(`/posts/${postId}`, post).then(response => response.data)
}