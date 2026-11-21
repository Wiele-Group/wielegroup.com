// Historical sample access no longer collects any personal information.
export async function POST() {
  return Response.json({ message: "Listing examples are public. Open the example directly." }, {
    status: 410, headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex" }
  });
}
