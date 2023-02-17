import { Todo } from "./App";

const ToDoItem = ({ id, userId, title, completed }: Todo) => {
  return (
    <li>
      <p>Id: {id}</p>
      <p>Title: {title}</p>
      <p>UserId: {userId}</p>
      <p>Status: {completed ? "Completed" : "Not Completed"}</p>
    </li>
  );
};

export default ToDoItem;
