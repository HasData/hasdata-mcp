import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { SSEClientTransport } from "@modelcontextprotocol/sdk/client/sse.js";
import { ListToolsRequestSchema, CallToolRequestSchema } from "@modelcontextprotocol/sdk/types.js";

const apiKey = process.env.HASDATA_API_KEY;

const remoteTransport = new SSEClientTransport(
  new URL("https://mcp.hasdata.com/api/mcp"),
  {
    eventSourceInitDict: {
      headers: {
        "x-api-key": apiKey
      }
    }
  }
);

const server = new Server(
  { name: "hasdata-mcp-bridge", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

try {
  console.error("Connecting to HasData Cloud...");
  await remoteTransport.start();
  console.error("Cloud connection established!");

  server.setRequestHandler(ListToolsRequestSchema, async (request) => {
    console.error("Forwarding ListTools request...");
    return await remoteTransport.sendRequest(request);
  });

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    console.error(`Forwarding CallTool: ${request.params.name}`);
    return await remoteTransport.sendRequest(request);
  });

} catch (error) {
  console.error("CRITICAL: Could not connect to Cloud:", error.message);
  server.setRequestHandler(ListToolsRequestSchema, async () => ({ tools: [] }));
}

const transport = new StdioServerTransport();
await server.connect(transport);
