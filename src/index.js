import { ProxyServer } from "@modelcontextprotocol/sdk/server/proxy.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { SSEClientTransport } from "@modelcontextprotocol/sdk/client/sse.js";

const remoteTransport = new SSEClientTransport(
  new URL("https://mcp.hasdata.com/api/mcp"),
  {
    eventSourceInitDict: {
      headers: {
        "x-api-key": process.env.HASDATA_API_KEY 
      }
    }
  }
);

const transport = new StdioServerTransport();
const proxy = new ProxyServer(transport, remoteTransport);

await proxy.listen();
console.error("HasData Cloud Redirect is active!");
