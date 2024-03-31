import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Button from "react-bootstrap/Button";
import { Table } from "react-bootstrap";

function App() {
  const [todoItems, setTodoItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      fetch("http://localhost:5015/TodoItems")
        .then((response) => response.json())
        .then((data) => setTodoItems(data));
    } catch (e) {
      console.log("Error", e);
    }
  };

  // delete todo item
  const deleteItem = async (id) => {
    try {
      fetch(`http://localhost:5015/TodoItems?id=${id}`, {
        method: "delete",
      }).then(() => fetchItems());
    } catch (e) {
      console.log("Error", e);
    }
  };

  // update todo item
  const updateTodoItem = async (todoItem) => {
    try {
      fetch(`http://localhost:5015/TodoItems/${id}`, {
        method: "put",
        body: todoItem,
      }).then(() => fetchItems());
    } catch (e) {
      console.log("Error", e);
    }
  };

  return (
    <>
      {todoItems.length > 0 ? (
        <Table striped="columns">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {todoItems.map((item) => {
              console.log(item);
              const { id, name, isComplete } = item;
              return (
                <tr key={`todoItem-${id}`}>
                  <td>{id}</td>
                  <td>{name}</td>
                  <td>{isComplete == true ? "Completed" : "Not completed"}</td>
                  <td className="action-buttons">
                    <Button
                      variant="primary"
                      onClick={() =>
                        updateTodoItem({
                          ...item,
                          name: `updated -${item.name}`,
                          isComplete: `${
                            item.isComplete == true ? false : true
                          }`,
                        })
                      }
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => deleteItem(item.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      ) : (
        <div>
          <h3>There are no todo items to show</h3>
        </div>
      )}
    </>
  );
}

export default App;
