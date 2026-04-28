[![HasData_bannner](src/banner.png)](https://docs.hasdata.com/mcp-server/?utm_source=github&utm_medium=syndication&utm_campaign=mcp)

# HasData MCP Server

[![MCP Compatible](https://img.shields.io/badge/MCP-Compatible-6366f1?style=flat-square)](https://modelcontextprotocol.io)
[![Tools](https://img.shields.io/badge/Tools-40-10b981?style=flat-square)](#tools)
[![Transport](https://img.shields.io/badge/Transport-Streamable%20HTTP-0ea5e9?style=flat-square)](https://mcp.hasdata.com/api/mcp)

Model Context Protocol server for [HasData](https://hasdata.com/?utm_source=github&utm_medium=syndication&utm_campaign=mcp) scraping and search APIs. Connect any MCP-compatible AI client to 40 ready-to-use data tools.

---

## Quick Start

**Claude Desktop.** Add to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "hasdata": {
      "type": "http",
      "url": "https://mcp.hasdata.com/api/mcp",
      "headers": {
        "x-api-key": "<your-api-key>"
      }
    }
  }
}
```

**Claude Code:**

```bash
claude mcp add hasdata -t http https://mcp.hasdata.com/api/mcp --header "x-api-key: <your-api-key>"
```

**Cursor.** Add to `~/.cursor/mcp.json` or `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "hasdata": {
      "url": "https://mcp.hasdata.com/api/mcp",
      "headers": {
        "x-api-key": "<your-api-key>"
      }
    }
  }
}
```

**Any other MCP client** that supports streamable HTTP with custom headers:

| Field | Value |
|---|---|
| URL | `https://mcp.hasdata.com/api/mcp` |
| Transport | HTTP (streamable) |
| Header | `x-api-key: <your-api-key>` |

Get your API key from the [HasData dashboard](https://app.hasdata.com). Requests without a valid key return `401 Unauthorized`.

---

## What you can do with it

```
"Find the cheapest flights from NYC to London next month and compare prices."
"Monitor iPhone 16 prices on Amazon across the last 7 days."
"Pull all 5-star reviews for this product ASIN and summarize the common themes."
"Get me all software engineer job postings in Berlin from Indeed and Glassdoor."
"Find the top-rated Italian restaurants in Chicago using Google Maps."
"What are people searching for related to 'AI agents' on Google Trends this week?"
```

No scraping code. No proxies to manage. No parsing logic. Just ask.

---

## Compatible clients

| Client | Supported |
|---|---|
| Claude Desktop | ✅ |
| Claude Code | ✅ |
| Claude.ai (web) | ✅ |
| Cursor | ✅ |
| Windsurf | ✅ |
| VS Code (GitHub Copilot) | ✅ |
| Gemini CLI | ✅ |
| Custom agents (OpenAI, LangChain, etc.) | ✅ |

Any client that supports the [MCP streamable HTTP transport](https://modelcontextprotocol.io/specification/2025-03-26/basic/transports#streamable-http) with custom headers will work.

---

## Tools

40 tools across search, e-commerce, maps, travel, real estate, and more.

### Web

| Tool | Description |
|---|---|
| `web_scraping_web_scraping` | Scrape any URL with optional parameters |

### Google

| Tool | Description |
|---|---|
| `google_serp_serp` | Google Search results |
| `google_serp_serp_light` | Google Search results (lightweight) |
| `google_serp_news` | Google News results |
| `google_serp_shopping` | Google Shopping results |
| `google_serp_images_images` | Google Image Search results |
| `google_serp_events` | Google Events results |
| `google_serp_product` | Google product details |
| `google_serp_immersive_product` | Google immersive product details |
| `google_serp_ai_overview` | Google AI Overview results |
| `google_serp_ai_mode` | Google AI Mode results |
| `google_maps_search` | Google Maps search |
| `google_maps_place` | Place details by `placeId` |
| `google_maps_reviews` | Place reviews |
| `google_maps_photos` | Place photos |
| `google_maps_contributor_reviews` | Reviews by contributor ID |
| `google_trends_search` | Google Trends data |
| `google_travel_flights` | Google Flights results |
| `bing_serp` | Bing Search results |

### E-commerce

| Tool | Description |
|---|---|
| `amazon_search` | Amazon search results |
| `amazon_product` | Amazon product details by ASIN |
| `amazon_reviews` | Amazon product reviews |
| `shopify_products` | Shopify store products |
| `shopify_collections` | Shopify store collections |

### Real Estate

| Tool | Description |
|---|---|
| `zillow_listing` | Zillow listing search |
| `zillow_property` | Zillow property details |
| `redfin_listing` | Redfin listing search |
| `redfin_property` | Redfin property details |

### Jobs

| Tool | Description |
|---|---|
| `indeed_listing` | Indeed job listings |
| `indeed_job` | Indeed job details |
| `glassdoor_listing` | Glassdoor job listings |
| `glassdoor_job` | Glassdoor job details |

### Travel & Local

| Tool | Description |
|---|---|
| `airbnb_listing` | Airbnb listings by location and dates |
| `airbnb_property` | Airbnb listing details |
| `yelp_search` | Yelp search results |
| `yelp_place` | Yelp place details |
| `yellowpages_search` | YellowPages search results |
| `yellowpages_place` | YellowPages place details |

### Social

| Tool | Description |
|---|---|
| `instagram_profile` | Instagram public profile details |

---

## Why HasData

A lot of scraping APIs hand you back raw HTML and call it a day. With JavaScript-heavy sites, half of them just time out. HasData's tools return parsed JSON specific to each site, so the model gets structured fields it can actually work with, not a blob of markup to wade through.

A few things worth knowing before you start:

- **Each tool is site-specific.** `amazon_product` knows about ASINs, variants, and seller data. `google_maps_place` knows about hours, coordinates, and ratings. You're not calling a generic scraper and hoping for the best.
- **It's a remote server.** Nothing runs locally. No Node process, no version pinning, no cold starts on your machine.
- **Credits work the same as the REST API.** If you're already a HasData customer, your existing balance and rate limits apply here too.
- **Authentication is per-request.** The `x-api-key` header goes on every call. There's no session or token exchange.

---

## Use cases

**Competitive intelligence.** Point `amazon_search` and `google_serp_shopping` at the same query and let the model compare pricing, ranking, and review counts across both. Runs in one prompt.

**Lead generation.** `google_maps_search` by keyword and city returns business names, addresses, phone numbers, and ratings. Stack it with `yellowpages_search` for broader coverage.

**Market research.** `google_trends_search` plus `google_serp_news` in the same session gives you both the search volume signal and the editorial context behind it.

**Real estate.** `zillow_listing` accepts filters for beds, baths, price range, and listing type. The model can pull a filtered list and summarize it without you touching a browser.

**Recruiting.** `indeed_listing` and `glassdoor_listing` both take location and keyword. Run both and the model can deduplicate and rank by recency.

**Travel.** `google_travel_flights` returns structured itineraries with prices, stops, and duration. Combine it with `airbnb_listing` for a full trip plan in one conversation.

---

## Billing

Each tool call uses HasData credits the same way a direct API call would.
See [Credits and Concurrency](https://hasdata.com/prices) for details.

---

## Resources

- [HasData API Docs](https://docs.hasdata.com/mcp-server/?utm_source=github&utm_medium=syndication&utm_campaign=mcp)
- [Dashboard](https://app.hasdata.com)
- [support@hasdata.com](mailto:support@hasdata.com)
- [Discord](https://discord.com/invite/kckPcEdGWs) 