import React, { useState } from "react";
import { useForm } from "@mantine/form";
import { Modal, Group, Button, TextInput, Textarea } from "@mantine/core";
import { KeyedMutator } from "swr";
import { Todo, ENDPOINT } from "../App";

function AddTodo({ mutate }: {mutate: KeyedMutator<Todo[]>}) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");

  const form = useForm({
    initialValues: {
      title: "",
      body: "",
    },
  });

async function createTodo(values: { title: string; body: string }) {

    const updated = await fetch(`${ENDPOINT}/todo`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
    }).then((res) => res.json());
   
    mutate(updated);
    form.reset();
    setOpen(false);
}


  return (
    <>
      <Modal opened={open} onClose={() => setOpen(false)} title="Create todo">
       <form onSubmit={form.onSubmit(createTodo)}>
        <TextInput required mb={12} label="Todo" placeholder="What do you want to do?" 
        {...form.getInputProps("title")}
        />
        <Textarea required mb={12} label="Body" placeholder="Please add description?" 
        {...form.getInputProps("body")} />
        <Button fullWidth mt={4} type="submit"> Create Todo </Button>
       </form>
      </Modal>
      <Group position="center">
        <Button fullWidth mb={12} onClick={() => setOpen(true)}>Add Todo</Button>
      </Group>
    </>
  );
}

export default AddTodo;
