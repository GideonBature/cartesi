import { createApp } from "@deroll/app";
import { createWallet } from "@deroll/wallet";
import { hexToString, stringToHex } from "viem";


const app = createApp({ url: process.env.ROLLUP_HTTP_SERVER_URL || "http://127.0.0.1:5004" });

const wallet = createWallet();
app.addAdvanceHandler(wallet.handler);

app.addInspectHandler( async ({payload}) => {
  const url = hexToString(payload).split("/");
  console.log("Inspect calls: ", url);
  const eth_balance = wallet.etherBalanceOf(<string>url[1]);
  await app.createReport({ payload: stringToHex(String(eth_balance)) });
})

app.start().catch( (e) => {
  console.error(e);
  process.exit(1);
});