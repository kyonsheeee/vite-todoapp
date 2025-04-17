import { Checkbox, Button, Space, Typography } from "antd";
const { Text } = Typography;

type TodoItemProps = {
  id: number;
  title: string;
  completed: boolean;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
};

export const TodoItem = ({
  id,
  title,
  completed,
  onToggle,
  onDelete,
}: TodoItemProps) => {
  return (
    <>
      <Space style={{ justifyContent: "space-between", width: "100%" }}>
        <Space>
          <Checkbox checked={completed} onChange={() => onToggle(id)} />
          <Text delete={completed}>{title}</Text>
        </Space>
        <Button danger onClick={() => onDelete(id)}>
          削除
        </Button>
      </Space>
    </>
  );
};
