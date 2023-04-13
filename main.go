package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
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

	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
		AllowHeaders: "Origin, Content-Type, Accept",
	}))

	app.Get("/", healthCheck)

	app.Get("/api/todos", getTodos)

	app.Patch("/api/todo/:id/done", updateTodos)

	app.Post("/api/todo", createTodo)

	log.Fatal(app.Listen(":4000"))
}

func healthCheck(c *fiber.Ctx) error {
	return c.SendString("Hello, World!")
}
