[![HasData_bannner](src/banner.png)](https://docs.hasdata.com/mcp-server/?utm_source=github&utm_medium=syndication&utm_campaign=mcp&utm_content=hasdata-mcp-readme)

# HasData MCP Server

[![MCP Compatible](https://img.shields.io/badge/MCP-Compatible-6366f1?style=flat-square)](https://modelcontextprotocol.io)
[![Tools](https://img.shields.io/badge/Tools-68-10b981?style=flat-square)](#tools)
- [Prompts and resources](#prompts-and-resources)
[![Transport](https://img.shields.io/badge/Transport-Streamable%20HTTP-0ea5e9?style=flat-square)](https://mcp.hasdata.com/mcp)
[![hasdata-mcp MCP server](https://glama.ai/mcp/servers/HasData/hasdata-mcp/badges/score.svg)](https://glama.ai/mcp/servers/HasData/hasdata-mcp)
[![MCP Badge](https://lobehub.com/badge/mcp/hasdata-hasdata-mcp)](https://lobehub.com/mcp/hasdata-hasdata-mcp)

Model Context Protocol server for [HasData](https://hasdata.com/?utm_source=github&utm_medium=syndication&utm_campaign=mcp&utm_content=hasdata-mcp-readme) scraping and search APIs. Connect any MCP-compatible AI client to ready-to-use data tools across search, e-commerce, maps, travel, real estate, jobs and social, or pick a single site from the [standalone servers](#one-site-per-server).

---

## Quick Start

Two ways to authenticate:

- **OAuth (recommended).** Connect the server and sign in with your HasData account in the browser — no key to copy around.
- **API key.** Send your key in the `x-api-key` header. Get it from the [HasData dashboard](https://app.hasdata.com?utm_source=github&utm_medium=syndication&utm_campaign=mcp&utm_content=hasdata-mcp-readme).

**Claude Desktop / Claude.ai.** Go to **Settings → Connectors → Add custom connector** and enter:

```
https://mcp.hasdata.com/mcp
```

You'll be prompted to sign in with OAuth. Prefer an API key? Add to `claude_desktop_config.json` instead:

```json
{
  "mcpServers": {
    "hasdata": {
      "type": "http",
      "url": "https://mcp.hasdata.com/mcp",
      "headers": {
        "x-api-key": "<your-api-key>"
      }
    }
  }
}
```

**Claude Code.** With OAuth:

```bash
claude mcp add --transport http hasdata https://mcp.hasdata.com/mcp
claude mcp login hasdata
```

(or run `/mcp` inside a session and pick **Authenticate**). With an API key:

```bash
claude mcp add --transport http hasdata https://mcp.hasdata.com/mcp --header "x-api-key: <your-api-key>"
```

**Cursor.** Add to `~/.cursor/mcp.json` or `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "hasdata": {
      "url": "https://mcp.hasdata.com/mcp",
      "headers": {
        "x-api-key": "<your-api-key>"
      }
    }
  }
}
```

**Cline.** Add the hasdata server to your Cline MCP settings file:

```json
{
  "mcpServers": {
    "hasdata": {
      "url": "https://mcp.hasdata.com/mcp",
      "type": "streamableHttp",
      "headers": {
        "x-api-key": "<your-api-key>"
      },
      "disabled": false      
    }
  }
}
```

**Any other MCP client** that supports streamable HTTP:

| Field | Value |
|---|---|
| URL | `https://mcp.hasdata.com/mcp` |
| Transport | HTTP (streamable) |
| Auth | OAuth sign-in, or header `x-api-key: <your-api-key>` |

Requests without OAuth or a valid key return `401 Unauthorized`.

Need fewer tools in your client? Limit the exposed APIs with the `apis` query parameter, e.g. `https://mcp.hasdata.com/mcp?apis=amazon,google_maps`. The `apis` key for every site is listed in [One site per server](#one-site-per-server).

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

Any client that supports the [MCP streamable HTTP transport](https://modelcontextprotocol.io/specification/2025-03-26/basic/transports#streamable-http) will work.

---

## Tools

Tools across search, e-commerce, maps, travel, real estate, jobs, social, and more. Every group below also ships as standalone servers, one per site, with the same tools behind a shorter URL.

### Web

| Tool | Description |
|---|---|
| `web_scraping_web_scraping` | Scrape any URL with optional parameters |

Standalone server for this group: [web-scraping-mcp](https://github.com/HasData/web-scraping-mcp).

### Google

| Tool | Description |
|---|---|
| `google_serp_serp` | Google Search results |
| `google_serp_serp_light` | Google Search results (lightweight) |
| `google_serp_news` | Google News results |
| `google_serp_shopping` | Google Shopping results |
| `google_serp_events` | Google Events results |
| `google_serp_product` | Google product details |
| `google_serp_immersive_product` | Google immersive product details |
| `google_serp_ai_overview` | Google AI Overview results |
| `google_serp_ai_mode` | Google AI Mode results |
| `google_serp_short_videos` | Google Short Videos results (TikTok, Shorts, Reels) |
| `google_images_images` | Google Image Search results |
| `google_maps_search` | Google Maps search |
| `google_maps_place` | Place details by `placeId` |
| `google_maps_reviews` | Place reviews |
| `google_maps_photos` | Place photos |
| `google_maps_posts` | Place posts (offers, events, announcements) |
| `google_maps_contributor_reviews` | Reviews by contributor ID |
| `google_scholar_scholar` | Google Scholar search results |
| `google_scholar_cite` | Citation formats for a Scholar result |
| `google_scholar_case_law` | Full text of a Scholar case law opinion |
| `google_trends_search` | Google Trends data |
| `google_travel_flights` | Google Flights results |
| `google_travel_flights_deals` | Flight deals from a plain-language trip description |
| `google_travel_hotels` | Google Hotels results |

Standalone servers for this group: [google-search-mcp](https://github.com/HasData/google-search-mcp) (all `google_serp_*` tools), [google-images-mcp](https://github.com/HasData/google-images-mcp), [google-maps-mcp](https://github.com/HasData/google-maps-mcp), [google-scholar-mcp](https://github.com/HasData/google-scholar-mcp), [google-trends-mcp](https://github.com/HasData/google-trends-mcp), [google-flights-mcp](https://github.com/HasData/google-flights-mcp), [google-flights-deals-mcp](https://github.com/HasData/google-flights-deals-mcp), [google-hotels-mcp](https://github.com/HasData/google-hotels-mcp).

### Other search engines

| Tool | Description |
|---|---|
| `bing_serp` | Bing Search results |
| `duckduckgo_serp` | DuckDuckGo Search results |

Standalone servers for this group: [bing-mcp](https://github.com/HasData/bing-mcp), [duckduckgo-mcp](https://github.com/HasData/duckduckgo-mcp).

### AI answer engines

| Tool | Description |
|---|---|
| `chatgpt_chat` | ChatGPT answer with the web sources it cited |
| `perplexity_chat` | Perplexity answer with its citations |

Standalone server for this group: [chatgpt-mcp](https://github.com/HasData/chatgpt-mcp).

### E-commerce

| Tool | Description |
|---|---|
| `amazon_search` | Amazon search results |
| `amazon_product` | Amazon product details by ASIN |
| `amazon_reviews` | Amazon product reviews |
| `amazon_seller` | Amazon seller storefront profile |
| `amazon_seller_products` | Amazon seller catalog products |
| `walmart_search` | Walmart search results |
| `walmart_product` | Walmart product details |
| `walmart_reviews` | Walmart product reviews |
| `shopify_products` | Shopify store products |
| `shopify_collections` | Shopify store collections |

Standalone servers for this group: [amazon-mcp](https://github.com/HasData/amazon-mcp), [walmart-mcp](https://github.com/HasData/walmart-mcp), [shopify-mcp](https://github.com/HasData/shopify-mcp).

### Real Estate

| Tool | Description |
|---|---|
| `zillow_listing` | Zillow listing search |
| `zillow_property` | Zillow property details |
| `redfin_listing` | Redfin listing search |
| `redfin_property` | Redfin property details |

Standalone servers for this group: [zillow-mcp](https://github.com/HasData/zillow-mcp), [redfin-mcp](https://github.com/HasData/redfin-mcp).

### Jobs

| Tool | Description |
|---|---|
| `indeed_listing` | Indeed job listings |
| `indeed_job` | Indeed job details |
| `glassdoor_listing` | Glassdoor job listings |
| `glassdoor_job` | Glassdoor job details |

Standalone servers for this group: [indeed-mcp](https://github.com/HasData/indeed-mcp), [glassdoor-mcp](https://github.com/HasData/glassdoor-mcp).

### Travel & Local

| Tool | Description |
|---|---|
| `airbnb_listing` | Airbnb listings by location and dates |
| `airbnb_property` | Airbnb listing details |
| `booking_search` | Booking.com accommodation search |
| `booking_place` | Booking.com property details |
| `yelp_search` | Yelp search results |
| `yelp_place` | Yelp place details |
| `yelp_reviews` | Yelp place reviews |
| `yellowpages_search` | YellowPages search results |
| `yellowpages_place` | YellowPages place details |

Standalone servers for this group: [airbnb-mcp](https://github.com/HasData/airbnb-mcp), [booking-mcp](https://github.com/HasData/booking-mcp), [yelp-mcp](https://github.com/HasData/yelp-mcp), [yellowpages-mcp](https://github.com/HasData/yellowpages-mcp).

### Social & Video

| Tool | Description |
|---|---|
| `facebook_profile` | Facebook public page or profile details |
| `instagram_profile` | Instagram public profile details |
| `instagram_posts` | Instagram public account posts |
| `instagram_comments` | Comments on an Instagram post |
| `tiktok_profile` | TikTok public profile details |
| `tiktok_posts` | TikTok account videos |
| `tiktok_search` | TikTok search for videos or users |
| `tiktok_comments` | TikTok video comments |
| `youtube_search` | YouTube search results |
| `youtube_video` | YouTube video details |
| `youtube_channel` | YouTube channel data |
| `youtube_transcript` | YouTube video transcript |

Standalone servers for this group: [facebook-mcp](https://github.com/HasData/facebook-mcp), [instagram-mcp](https://github.com/HasData/instagram-mcp), [tiktok-mcp](https://github.com/HasData/tiktok-mcp), [youtube-mcp](https://github.com/HasData/youtube-mcp).

---

## Prompts and resources

The server ships 20 prompts, ready-made workflows a client can offer instead of making the user compose a tool call.

| Prompt | What it does |
| --- | --- |
| `google_search` | Search Google and summarize the top organic results. |
| `google_news` | Find recent news coverage on a topic. |
| `google_shopping` | Compare product offers from Google Shopping. |
| `google_short_videos` | Find short videos about a topic. |
| `google_ai_mode` | Get Google AI Mode's answer with its sources. |
| `google_maps_search` | Find businesses and places on Google Maps. |
| `google_maps_reviews` | Summarize what reviewers say about a place. |
| `zillow_listings` | Find homes for sale, for rent or sold in an area. |
| `zillow_property` | Get the full details of one Zillow property. |
| `google_trends` | See how interest in a topic changes over time. |
| `instagram_profile` | Look up a public Instagram profile. |
| `scrape_web_page` | Fetch any public web page and summarize its content. |
| `indeed_hiring_map` | See where a role is being hired for and at what salary. |
| `youtube_search` | Find YouTube videos and channels about a topic. |
| `youtube_transcript` | Summarize what is said in a YouTube video. |
| `tiktok_trend` | See what is being posted on TikTok about a topic. |
| `tiktok_profile` | Look up a public TikTok profile. |
| `amazon_product_research` | Compare Amazon offers for a product by price, rating and review count. |
| `yelp_reputation` | Pull a business's rating and recent review themes. |
| `google_flights` | Compare flight options between two airports. |

Alongside them the server exposes 151 resources, one per parameter whose accepted values are a fixed list, across 28 services. Reading one is cheaper than learning the vocabulary from a rejected call, and it costs no credits. Each URI is `hasdata://<service>/<parameter>`, and `resources/list` returns the current set.

| Service | Parameters with a fixed list |
| --- | ---: |
| `redfin` | 30 |
| `booking` | 16 |
| `zillow` | 11 |
| `google_serp` | 10 |
| `youtube` | 10 |
| `amazon` | 7 |
| `google_travel` | 7 |
| `bing` | 5 |
| `duckduckgo` | 5 |
| `glassdoor` | 5 |
| `google_images` | 5 |
| `google_trends` | 5 |
| `google_maps` | 4 |
| `google_scholar` | 4 |
| `google_travel_flights` | 4 |
| `indeed` | 4 |
| `google_travel_flights_deals` | 3 |
| `walmart` | 3 |
| `web_scraping` | 2 |
| `yellowpages` | 2 |
| `yelp` | 2 |
| `amazon_reviews` | 1 |
| `amazon_search` | 1 |
| `facebook` | 1 |
| `google_travel_hotels` | 1 |
| `tiktok` | 1 |
| `walmart_reviews` | 1 |
| `walmart_search` | 1 |

Both lists are served without an API key, so a client can read them before a user has signed up.

## One site per server

If your agent only needs one site, use its standalone server instead of the full set. Each one is the same hosted endpoint filtered with the `apis` parameter, so the tools, the schemas and the billing are identical, and the model sees a short tool list. Every standalone server also ships as an npm and a PyPI package for clients that want a local stdio launcher, and is listed in the [official MCP registry](https://registry.modelcontextprotocol.io) under `com.hasdata/<name>`.

| Site | Repository | npm | PyPI | `apis` key |
|---|---|---|---|---|
| Airbnb | [airbnb-mcp](https://github.com/HasData/airbnb-mcp) | `@hasdata/airbnb-mcp` | `hasdata-airbnb-mcp` | `airbnb` |
| Amazon | [amazon-mcp](https://github.com/HasData/amazon-mcp) | `@hasdata/amazon-mcp` | `hasdata-amazon-mcp` | `amazon` |
| Bing | [bing-mcp](https://github.com/HasData/bing-mcp) | `@hasdata/bing-mcp` | `hasdata-bing-mcp` | `bing` |
| Booking.com | [booking-mcp](https://github.com/HasData/booking-mcp) | `@hasdata/booking-mcp` | `hasdata-booking-mcp` | `booking` |
| DuckDuckGo | [duckduckgo-mcp](https://github.com/HasData/duckduckgo-mcp) | `@hasdata/duckduckgo-mcp` | `hasdata-duckduckgo-mcp` | `duckduckgo` |
| Facebook | [facebook-mcp](https://github.com/HasData/facebook-mcp) | `@hasdata/facebook-mcp` | `hasdata-facebook-mcp` | `facebook` |
| Glassdoor | [glassdoor-mcp](https://github.com/HasData/glassdoor-mcp) | `@hasdata/glassdoor-mcp` | `hasdata-glassdoor-mcp` | `glassdoor` |
| Google Flights | [google-flights-mcp](https://github.com/HasData/google-flights-mcp) | `@hasdata/google-flights-mcp` | `hasdata-google-flights-mcp` | `google_travel_flights` |
| Google Hotels | [google-hotels-mcp](https://github.com/HasData/google-hotels-mcp) | `@hasdata/google-hotels-mcp` | `hasdata-google-hotels-mcp` | `google_travel_hotels` |
| Google Images | [google-images-mcp](https://github.com/HasData/google-images-mcp) | `@hasdata/google-images-mcp` | `hasdata-google-images-mcp` | `google_images` |
| Google Maps | [google-maps-mcp](https://github.com/HasData/google-maps-mcp) | `@hasdata/google-maps-mcp` | `hasdata-google-maps-mcp` | `google_maps` |
| Google Scholar | [google-scholar-mcp](https://github.com/HasData/google-scholar-mcp) | `@hasdata/google-scholar-mcp` | `hasdata-google-scholar-mcp` | `google_scholar` |
| Google Search | [google-search-mcp](https://github.com/HasData/google-search-mcp) | `@hasdata/google-search-mcp` | `hasdata-google-search-mcp` | `google_serp` |
| Google Trends | [google-trends-mcp](https://github.com/HasData/google-trends-mcp) | `@hasdata/google-trends-mcp` | `hasdata-google-trends-mcp` | `google_trends` |
| Indeed | [indeed-mcp](https://github.com/HasData/indeed-mcp) | `@hasdata/indeed-mcp` | `hasdata-indeed-mcp` | `indeed` |
| Instagram | [instagram-mcp](https://github.com/HasData/instagram-mcp) | `@hasdata/instagram-mcp` | `hasdata-instagram-mcp` | `instagram` |
| Redfin | [redfin-mcp](https://github.com/HasData/redfin-mcp) | `@hasdata/redfin-mcp` | `hasdata-redfin-mcp` | `redfin` |
| Shopify | [shopify-mcp](https://github.com/HasData/shopify-mcp) | `@hasdata/shopify-mcp` | `hasdata-shopify-mcp` | `shopify` |
| TikTok | [tiktok-mcp](https://github.com/HasData/tiktok-mcp) | `@hasdata/tiktok-mcp` | `hasdata-tiktok-mcp` | `tiktok` |
| Walmart | [walmart-mcp](https://github.com/HasData/walmart-mcp) | `@hasdata/walmart-mcp` | `hasdata-walmart-mcp` | `walmart` |
| Web Scraping | [web-scraping-mcp](https://github.com/HasData/web-scraping-mcp) | `@hasdata/web-scraping-mcp` | `hasdata-web-scraping-mcp` | `web_scraping` |
| Yellow Pages | [yellowpages-mcp](https://github.com/HasData/yellowpages-mcp) | `@hasdata/yellowpages-mcp` | `hasdata-yellowpages-mcp` | `yellowpages` |
| Yelp | [yelp-mcp](https://github.com/HasData/yelp-mcp) | `@hasdata/yelp-mcp` | `hasdata-yelp-mcp` | `yelp` |
| YouTube | [youtube-mcp](https://github.com/HasData/youtube-mcp) | `@hasdata/youtube-mcp` | `hasdata-youtube-mcp` | `youtube` |
| Zillow | [zillow-mcp](https://github.com/HasData/zillow-mcp) | `@hasdata/zillow-mcp` | `hasdata-zillow-mcp` | `zillow` |

The remote URL for any of them is `https://mcp.hasdata.com/mcp?apis=<key>`, and keys can be combined with commas.

---

## Why HasData

A lot of scraping APIs hand you back raw HTML and call it a day. With JavaScript-heavy sites, half of them just time out. HasData's tools return parsed JSON specific to each site, so the model gets structured fields it can actually work with, not a blob of markup to wade through.

A few things worth knowing before you start:

- **Each tool is site-specific.** `amazon_product` knows about ASINs, variants, and seller data. `google_maps_place` knows about hours, coordinates, and ratings. You're not calling a generic scraper and hoping for the best.
- **It's a remote server.** Nothing runs locally. No Node process, no version pinning, no cold starts on your machine.
- **Credits work the same as the REST API.** If you're already a HasData customer, your existing balance and rate limits apply here too.
- **Two ways to authenticate.** Sign in once with OAuth, or send the `x-api-key` header on every call — both work against the same endpoint.

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
See [Credits and Concurrency](https://hasdata.com/prices?utm_source=github&utm_medium=syndication&utm_campaign=mcp&utm_content=hasdata-mcp-readme) for details.

---

## Resources

- [HasData API Docs](https://docs.hasdata.com/mcp-server/?utm_source=github&utm_medium=syndication&utm_campaign=mcp&utm_content=hasdata-mcp-readme)
- [Dashboard](https://app.hasdata.com?utm_source=github&utm_medium=syndication&utm_campaign=mcp&utm_content=hasdata-mcp-readme)
- [support@hasdata.com](mailto:support@hasdata.com)
- [Discord](https://discord.com/invite/kckPcEdGWs) 
