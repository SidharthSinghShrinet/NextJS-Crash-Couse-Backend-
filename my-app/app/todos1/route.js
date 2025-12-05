export function GET() {
  console.log("Running GET Route Handler...");
  return new Response(JSON.stringify({ message: "You got the job" }), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
