import { privateAxios } from "./helper"

export const createComment = (comment) => {
    return privateAxios.post(`/user/${comment.userId}/post/${comment.pId}/comments`, comment).then(response => response.data)
}