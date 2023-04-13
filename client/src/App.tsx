import { Box, List, ThemeIcon } from "@mantine/core";
import useSWR from "swr";
import AddTodo from "./components/AddTodo";
import { CheckCircleFillIcon } from "@primer/octicons-react";


export interface Todo {
  id: number;
  title: string;
  body: string;
  done: boolean;
}

export const ENDPOINT = "http://localhost:4000/api";

const fetcher = (url: string) =>
  fetch(`${ENDPOINT}/${url}`).then((res) => res.json());

function App() {
  const { data, mutate } = useSWR<Todo[]>("todos", fetcher);

  async function markTodoAsDone(id: number) {
    const updated = await fetch(`${ENDPOINT}/todo/${id}/done`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((r) => r.json());

    mutate(updated);
  }

  return (
    <Box
      sx={(theme) => ({
        padding: "2rem",
        width: "100%",
        maxWidth: "40rem",
        margin: "0 auto",
      })}
    >
      <List spacing="xs" size="sm" mb={12} center>
        {data?.map((todo) => {
          return (
            <List.Item
              onClick={() => markTodoAsDone(todo.id)}
              key={`todo__${todo.id}`}
              icon={
                todo.done ? (
                  <ThemeIcon color="teal" radius="xl" size={24}>
                    <CheckCircleFillIcon size={20} />
                  </ThemeIcon>
                ) : (
                  <ThemeIcon color="gray" radius="xl" size={24}>
                    <CheckCircleFillIcon size={20} />
                  </ThemeIcon>
                )
              }
            >
              {todo.title}
            </List.Item>
          );
        })}
      </List>

      <AddTodo mutate={mutate}></AddTodo>
    </Box>
  );
}

export default App;
