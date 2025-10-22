const { spawn } = require("child_process");

// Run the mcp-proxy CLI which, in turn, spawns the Perplexity MCP server.
const child = spawn(
  process.platform === "win32" ? "npx.cmd" : "npx",
  [
    "-y",
    "mcp-proxy",
    "--port", process.env.PORT || "8000",
    "--",
    "npx", "-y", "@perplexity-ai/mcp-server"
  ],
  { stdio: "inherit", env: process.env }
);

child.on("exit", (code) => process.exit(code ?? 1));
