package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
)

type Todo struct {
	ID    int    `json:"id"`
	Title string `json:"title"`
	Done  bool   `json:"done"`
	Body  string `json:"body"`
}

var todos []Todo

func main() {
	app := fiber.New()

	app.Get("/", healthCheck)

	app.Get("/api/todos", getTodos)

	app.Patch("/api/todo/:id/done", updateTodos)

	app.Post("/api/todo", createTodo)

	log.Fatal(app.Listen(":3000"))
}

func healthCheck(c *fiber.Ctx) error {
	return c.SendString("Hello, World!")
}
