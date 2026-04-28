import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { ListToolsRequestSchema, CallToolRequestSchema } from "@modelcontextprotocol/sdk/types.js";

const HASDATA_ENDPOINT = "https://mcp.hasdata.com/api/mcp";
const API_KEY = process.env.HASDATA_API_KEY;

const server = new Server(
  { name: "hasdata-mcp-bridge", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

async function forwardToHasData(request) {
  const cleanRequest = {
    jsonrpc: "2.0",
    id: request.id ?? Math.floor(Math.random() * 1000),
    method: request.method,
    params: request.params || {}
  };

  const response = await fetch(HASDATA_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
      'Accept': 'application/json, text/event-stream'
    },
    body: JSON.stringify(cleanRequest)
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(`HasData API error: ${response.status} - ${JSON.stringify(responseData)}`);
  }

  return responseData;
}

server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  try {
    console.error("Fetching tools from HasData...");
    const data = await forwardToHasData(request);
    return data.result; 
  } catch (error) {
    console.error("Failed to fetch tools:", error.message);
    return { tools: [] };
  }
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  try {
    console.error(`Calling tool: ${request.params.name}`);
    const data = await forwardToHasData(request);
    return data.result;
  } catch (error) {
    console.error("Tool execution failed:", error.message);
    throw error;
  }
});

const transport = new StdioServerTransport();
await server.connect(transport);
console.error("HasData Manual Bridge is online!");
