import { GET_ALL_CATEGORIES_URL, myAxios } from "./helper";

export default function getAllCategories() {
    return myAxios.get(GET_ALL_CATEGORIES_URL)
                    .then(response => response.data)
}