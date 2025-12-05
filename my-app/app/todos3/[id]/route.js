"use server";
// // "use client";
// // import { use } from "react";
// import todoData from "../../db.json";
// // export async function GET(_, context) {
// //   console.log(context);
// // let { id } = await props.params;
// // let filteredData = todoData.find((todo) => todo.id == id);
// // console.log(filteredData);
// // return (
// // <div>
// //   <h1>Todo Details for ID: {filteredData.id}</h1>
// //   <p>Text: {filteredData.text}</p>
// // </div>
// // <div>Todo Details Page</div>
// // );
// // }
// // export default function Page(props) {
// //   let { id } = use(props.params);
// //   const filteredData = todoData.find((todo) => todo.id == id);
// //   console.log(filteredData);
// //   return (
// //     <>
// //       {filteredData ? (
// //         <div>
// //           <h1>Todo Details for ID: {filteredData.id}</h1>
// //           <p>Text: {filteredData.text}</p>
// //         </div>
// //       ) : (
// //         <p>No todo found</p>
// //       )}
// //     </>
// //   );
// // }

// export async function GET(request, context) {
//   console.log(todoData);
//   console.log(request);
//   console.log(context);
//   // const { id } = params;
//   // const filteredData = todoData.find((todo) => todo.id == id);
//   // console.log(filteredData);
//   // return new Response(JSON.stringify(filteredData), {
//   //   headers: {
//   //     "Content-Type": "application/json",
//   //   },
//   // });
//   return new Response("Todo Details Page");
// }

import todoData from "../../db.json";

export async function GET(request, context) {
  let { id } = await context.params;
  const filteredData = todoData.find((todo) => todo.id == id);
  if (!filteredData) return new Response("No todo found", { status: 404 });
  return new Response(JSON.stringify(filteredData), {
    headers: {
      "Content-Type": "application/json",
    },
    status: 200,
    statusText: "Ok Bro!",
  });
}
