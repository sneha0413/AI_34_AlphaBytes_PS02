const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { NlpManager } = require("node-nlp");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const manager = new NlpManager({ languages: ["en"] });

manager.addDocument("en", "Hello", "greeting");
manager.addDocument("en", "How are you?", "greeting");
manager.addAnswer("en", "greeting", "Hello! How can I assist you?");

(async () => {
  await manager.train();
  manager.save();
})();

app.post("/chat", async (req, res) => {
  const { message } = req.body;
  const response = await manager.process("en", message);
  res.json({ reply: response.answer || "Sorry, I don't understand." });
});

app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
