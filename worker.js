export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const cors = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    };
    if (request.method === "OPTIONS") return new Response(null, { headers: cors });
    const json = (data, status=200) => new Response(JSON.stringify(data), {
      status, headers: { ...cors, "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" }
    });
    try {
      if (url.pathname === "/api/health" && request.method === "GET") {
        const row = await env.DB.prepare("SELECT 1 AS connected").first();
        return json({ success: true, service: "LuxuryBid API", database: row?.connected === 1 ? "connected" : "error" });
      }
      if (url.pathname === "/api/auctions" && request.method === "GET") {
        const result = await env.DB.prepare(`
          SELECT a.id, a.product_id, a.title, a.bid_increment, a.starts_at, a.ends_at, a.status,
                 p.name AS product_name, p.description, p.image_url, p.starting_price
          FROM auctions a JOIN products p ON p.id = a.product_id
          WHERE a.status = 'active' AND p.status = 'active'
          ORDER BY a.ends_at ASC
        `).all();
        return json({ success: true, auctions: result.results ?? [] });
      }
      return json({ success: false, message: "LuxuryBid API is running.", endpoints: ["/api/health", "/api/auctions"] }, 404);
    } catch (error) {
      return json({ success: false, message: "Server error. Check the Worker logs." }, 500);
    }
  }
};

