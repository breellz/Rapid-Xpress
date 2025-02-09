import { main } from "./app"


const start = async () => {
  const port = process.env.PORT;
  const app = await main();
  app.listen(port, () => {
    console.log("server is running on port " + port);
  });
}

start()