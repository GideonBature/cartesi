import { createApp } from "@deroll/app";
import { createWallet } from "@deroll/wallet";

const app = createApp({ url: process.env.ROLLUP_HTTP_SERVER_URL || "http://127.0.0.1:5004" });

const wallet = createWallet();
app.addAdvanceHandler(wallet.handler);

app.start().catch( (e) => {
  console.error(e);
  process.exit(1);
});