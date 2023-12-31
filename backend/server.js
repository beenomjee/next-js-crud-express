import app from "./app.js";
import { connect } from "./db/index.js";

// port
const port = process.env.PORT || 3000;
app.listen(port, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`Server listening on ${port}`);
  connect();
});
