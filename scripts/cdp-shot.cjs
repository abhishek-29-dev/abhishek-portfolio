/* CDP screenshot capture — connects to an existing CDP page target,
   skips the boot screen via keypress, waits for home, screenshots. */
const WebSocket = require("ws");

const CDP_PORT = process.env.CDP_PORT || "9223";
const OUT = process.argv[2] || "shot.png";

async function main() {
  const targets = await fetch(`http://127.0.0.1:${CDP_PORT}/json`).then((r) => r.json());
  const page = targets.find((t) => t.type === "page" && t.url.includes("5173"));
  if (!page) throw new Error("no page target found");

  const ws = new WebSocket(page.webSocketDebuggerUrl, { maxPayload: 64 * 1024 * 1024 });
  let id = 0;
  const pending = new Map();
  const send = (method, params = {}) =>
    new Promise((resolve, reject) => {
      const msgId = ++id;
      pending.set(msgId, { resolve, reject });
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });

  ws.on("message", (data) => {
    const msg = JSON.parse(data.toString());
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      if (msg.error) reject(new Error(msg.error.message));
      else resolve(msg.result);
    }
  });

  await new Promise((resolve) => ws.on("open", resolve));

  await send("Page.enable");
  await send("Runtime.enable");
  await send("Emulation.setDeviceMetricsOverride", {
    width: 1366,
    height: 768,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await send("Page.reload", { ignoreCache: true });
  await new Promise((r) => setTimeout(r, 500));
  // skip boot screen
  await send("Input.dispatchKeyEvent", { type: "keyDown", key: "Enter", code: "Enter" });
  await send("Input.dispatchKeyEvent", { type: "keyUp", key: "Enter", code: "Enter" });
  // let boot fade + auto home run
  await new Promise((r) => setTimeout(r, 2800));

  const result = await send("Page.captureScreenshot", { format: "png", fromSurface: true });
  require("fs").writeFileSync(OUT, Buffer.from(result.data, "base64"));
  console.log("saved", OUT);
  ws.close();
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});