import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ListGroup, ListGroupItem } from "reactstrap";
import getAllCategories from "../services/category-service";

export default function CategorySideMenu() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getAllCategories()
      .then((data) => {
        setCategories([...data]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      <ListGroup className="mt-5 shadow">
        <ListGroupItem tag={Link} to="/" action={true} className="border-0 rounded-0">
          All blogs
        </ListGroupItem>
        {categories &&
          categories.map((c, index) => {
            return (
              <ListGroupItem key={index} tag={Link} to={"/categories/" + c.categoryId} action={true} className="shadow rounded-0">
                {c.categoryTitle}
              </ListGroupItem>
            );
          })}
      </ListGroup>
    </div>
  );
}
