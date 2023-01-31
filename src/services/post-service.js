import { myAxios, privateAxios } from "./helper"

export const makePost = (postData) => {
    return privateAxios.post(`/user/${postData.userId}/category/${postData.categoryId}/posts`, postData).then(response => response.data)
}

export const getAllPosts = (pageNumber=0, pageSize=5) => {
    return myAxios.get(`/posts?pageNumber=${pageNumber}&pageSize=${pageSize}`).then(response => response.data)
}