import { useState, useEffect } from "react";
import { Layout, Typography, List, Card, Space, Switch } from "antd";
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
  const [todos, setTodos] = useState<Todo[]>([]);
  const [hideCompleted, setHideCompleted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("todos");
    if (stored) {
      setTodos(JSON.parse(stored));
    }
  }, []);

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

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
  const filteredTodos = hideCompleted
    ? todos.filter((todo) => !todo.completed)
    : todos;

  return (
    <>
      <Layout
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          width: "100%",
        }}
      >
        <Header
          style={{
            alignItems: "center",
            background: "transparent",
            textAlign: "center",
          }}
        >
          <Title style={{ color: "#000", margin: 0 }}>My TODO List</Title>
        </Header>

        <Content
          style={{
            width: "100%",
            maxWidth: "600px",
            padding: "24px",
            background: "#fff",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: "8px",
          }}
        >
          <TodoForm onAdd={addTodo} />
          <Space
            style={{ marginTop: "20px" }}
            direction="vertical"
            size={"middle"}
          >
            <Switch
              checked={hideCompleted}
              onChange={(checked) => setHideCompleted(checked)}
            />
            <span>完了したタスクを非表示</span>
          </Space>

          <List
            dataSource={filteredTodos}
            locale={{ emptyText: "TODO がありません。" }}
            style={{ width: "100%", maxWidth: "600px", marginTop: "20px" }}
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
        </Content>
      </Layout>
    </>
  );
}

export default App;
