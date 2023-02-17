import "./styles.css";
import { useState, useEffect } from "react";
import axios from "axios";
import ToDoItem from "./ToDoItem";

export interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

export default function App() {
  const [datas, setDatas] = useState<Todo[]>([]);
  const [result, setResult] = useState<Todo[]>([]);
  const [search, setSearch] = useState("");

  const debounce = (func, delay) => {
    let timerId;
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      func();
    }, delay);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/todos"
        );
        setDatas(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const filterResults = datas.filter(({ title }) =>
      title.toLowerCase().includes(search.toLowerCase())
    );
    setResult(filterResults.reverse().slice(0, 10));
  }, [datas, search]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <form onSubmit={(event) => event.preventDefault()}>
        <label htmlFor="searchbox">Search Box: </label>
        <input
          type="text"
          id="searchbox"
          value={search}
          onChange={handleSearch}
        />
      </form>
      <ul>
        {result.map(({ userId, id, title, completed }) => (
          <ToDoItem
            key={id}
            id={id}
            userId={userId}
            title={title}
            completed={completed}
          />
        ))}
      </ul>
    </div>
  );
}
