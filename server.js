const app = require("./app");
const mongoose = require("mongoose");

const DB =
  "mongodb+srv://afzalaziz01:meaN7odifH0mRoCD@cluster-1.xr1xwh8.mongodb.net/main?retryWrites=true&w=majority&appName=Cluster-1";
//const DB_password = 'meaN7odifH0mRoCD';

mongoose.connect(DB).then(() => {
  console.log("DB connection successful!");
});

const port = 7860;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

module.exports = mongoose;
