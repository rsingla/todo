package main

import "github.com/gofiber/fiber/v2"

func updateTodos(c *fiber.Ctx) error {
	id, _ := c.ParamsInt("id")

	todo := Todo{}

	c.BodyParser(&todo)

	for i, t := range todos {
		if t.ID == id {
			if todo.Title != "" {
				todos[i].Title = todo.Title
			}
			if todo.Body != "" {
				todos[i].Body = todo.Body
			}
			todos[i].Done = true
			break
		}
	}

	return c.JSON(todos)
}

func getTodos(c *fiber.Ctx) error {
	return c.JSON(todos)
}

func createTodo(c *fiber.Ctx) error {
	payload := Todo{}

	err := c.BodyParser(&payload)
	if err != nil {
		return err
	}
	payload.ID = len(todos) + 1
	todos = append(todos, payload)

	return c.JSON(payload)
}
