import { useState, useEffect } from "react";
import { Layout, Typography, List, Card } from "antd";
import { TodoItem } from "./components/TodoItem";
import { TodoForm } from "./components/TodoForm";

const { Header, Content } = Layout;
const { Title } = Typography;

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const addTodo = (title: string) => {
    const newTodo = {
      id: Date.now(),
      title,
      completed: false,
    };
    setTodos((prev) => [...prev, newTodo]);
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      <Layout style={{ minHeight: "100vh", padding: "20px" }}>
        <Header style={{ background: "transparent", textAlign: "center" }}>
          <Title style={{ color: "#000", margin: 0 }}>My TODO List</Title>
        </Header>

        <Content
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <TodoForm onAdd={addTodo} />
          <div style={{ width: "100%", maxWidth: "600px", marginTop: "20px" }}>
            <List
              dataSource={todos}
              locale={{ emptyText: "TODO がありません。" }}
              renderItem={(todo) => (
                <List.Item>
                  <Card style={{ width: "100%" }}>
                    <TodoItem
                      {...todo}
                      onToggle={toggleTodo}
                      onDelete={deleteTodo}
                    />
                  </Card>
                </List.Item>
              )}
            />
          </div>
        </Content>
      </Layout>
    </>
  );
}

export default App;
