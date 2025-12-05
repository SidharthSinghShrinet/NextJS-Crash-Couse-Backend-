import fs from "fs";
import todoData from "../../db.json";
import path from "path";
export function GET() {
  return Response.json(todoData);
}

export async function POST(request) {
  let filepath = path.join(process.cwd(), "app", "db.json");
  let todo = await request.json();
  let createTodo = {
    id: crypto.randomUUID(),
    text: todo.text,
    complete: false,
  };
  todoData.push(createTodo);
  fs.writeFile(filepath, JSON.stringify(todoData, null, 2), "utf-8", (err) => {
    if (err) {
      console.log(err);
    }
    console.log("File updated successfully");
  });
  return Response.json(todoData);
}
