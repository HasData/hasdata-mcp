import { Server } from "@modelcontextprotocol/sdk/server/index.js";
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

await remoteTransport.start();

const server = new Server(
  { name: "hasdata-mcp", version: "1.0.0" },
  { capabilities: {} }
);

server.setNotificationHandler = remoteTransport.onnotification;
server.setRequestHandler = async (request) => {
  return await remoteTransport.sendRequest(request);
};

const transport = new StdioServerTransport();
await server.connect(transport);
