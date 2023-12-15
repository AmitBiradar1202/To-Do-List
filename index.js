import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let items = [
  { id: 1, title: "Buy milk" },
  { id: 2, title: "Finish homework" },
];

app.get("/", (req, res) => {
  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
  });
});

app.post("/add", (req, res) => {
  const item = req.body.newItem;
  items.push({ title: item });
  res.redirect("/");
});

app.post("/edit",async (req, res) => {
  const updatedItemId=req.body["updatedItemId"];
  const updatedItemTitle=req.body["updatedItemTitle"];

  try{
    await db.query("UPDATE items SET title=$1 WHERE id=$2 ",[updatedItemTitle,updatedItemId]);
    redirect("/");
  }
  catch(err){
    
    console.log(err);
  }

});

app.post("/delete", (req, res) => {});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
