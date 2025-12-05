import fs from "fs";
import todoData from "../../../db.json";
import path from "path";

export function GET() {
  return Response.json(todoData);
}

export async function PUT(request, context) {
  let { id } = await context.params;
  let filepath = path.join(process.cwd(), "app", "db.json");
  let { text, complete } = await request.json();
  let updatedTodo = {
    id,
    text,
    complete,
  };
  const index = todoData.findIndex((todo) => todo.id == id);
  if (index === -1) {
    return Response.json("No Todo Found...");
  }
  todoData.splice(index, 1, updatedTodo);
  fs.writeFile(filepath, JSON.stringify(todoData, null, 2), "utf-8", () => {
    console.log("Todo update successfully");
  });
  return Response.json(todoData);
}
