import { Input, Button, Space } from "antd";
import { useState } from "react";

type TodoFormProps = {
  onAdd: (title: string) => void;
};

export const TodoForm = ({ onAdd }: TodoFormProps) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title);
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: "8px" }}>
      <Space.Compact style={{ width: "300px" }}>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="新しい TODO を入力"
        />
        <Button type="primary" htmlType="submit">
          追加
        </Button>
      </Space.Compact>
    </form>
  );
};
