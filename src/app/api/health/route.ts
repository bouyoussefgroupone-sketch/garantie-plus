export async function GET() {
  return Response.json({
    status: "ok",
    service: "garantie-plus",
    timestamp: new Date().toISOString()
  });
}
