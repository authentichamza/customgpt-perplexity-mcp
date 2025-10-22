// Launch a stdio→HTTP MCP proxy that spawns the Perplexity MCP CLI.
// Exposes a Streamable-HTTP endpoint on process.env.PORT (Heroku).
const { spawn } = require("child_process");
const { createProxyServer } = require("mcp-streamablehttp-proxy");

// Command to run the Perplexity MCP server (both names work per README):
// - "npx -y @perplexity-ai/mcp-server"
// - or "npx -y perplexity-mcp"
const childCmd = process.platform === "win32" ? "npx.cmd" : "npx";
const childArgs = ["-y", "@perplexity-ai/mcp-server"];

const server = createProxyServer({
  spawn: () =>
    spawn(childCmd, childArgs, {
      stdio: ["pipe", "pipe", "inherit"],
      env: {
        ...process.env,
        // Required by Perplexity MCP:
        // PERPLEXITY_API_KEY must be set in Heroku Config Vars
      }
    }),
  port: process.env.PORT || 8000,         // Heroku provides PORT
  path: "/mcp"                            // Your MCP HTTP endpoint
});

server.start().then(() => {
  console.log(`MCP Streamable-HTTP proxy listening on /mcp`);
});
