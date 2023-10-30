const app = require("./app");

const port = process.env.PORT || 5174;

app.listen(port, () => {
  console.log("[+] car doctor server running ....");
  console.log(`[+] on http//localhost:${port}`);
});
