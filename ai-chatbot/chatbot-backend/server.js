const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { NlpManager } = require("node-nlp");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Initialize NLP Manager
const manager = new NlpManager({ languages: ["en"] });

// ✅ Add More Training Data

// Greetings
manager.addDocument("en", "Hello", "greeting");
manager.addDocument("en", "Hi", "greeting");
manager.addDocument("en", "Hey", "greeting");
manager.addDocument("en", "How are you?", "greeting");
manager.addAnswer("en", "greeting", "Hello! How can I assist you?");
manager.addAnswer("en", "greeting", "Hi there! What do you need help with?");

// Appointment Booking
manager.addDocument("en", "I want to book an appointment", "appointment");
manager.addDocument("en", "How can I schedule an appointment?", "appointment");
manager.addDocument("en", "Book a doctor for me", "appointment");
manager.addAnswer("en", "appointment", "Sure! Please provide the date and time for your appointment.");

// Medical Advice
manager.addDocument("en", "What should I do for a fever?", "medical_advice");
manager.addDocument("en", "How to cure a headache?", "medical_advice");
manager.addDocument("en", "I have a cough, what should I do?", "medical_advice");
manager.addAnswer("en", "medical_advice", "I'm not a doctor, but I recommend consulting a physician. Do you need help booking an appointment?");

// Contact Information
manager.addDocument("en", "How can I contact support?", "contact");
manager.addDocument("en", "Give me the customer service number", "contact");
manager.addAnswer("en", "contact", "You can contact support at +1 234 567 890 or email us at support@medslots.com");

// Train & Save
(async () => {
  console.log("Training AI Model... Please wait...");
  await manager.train();
  manager.save();
  console.log("AI Training Completed!");
})();

// Chatbot Endpoint
app.post("/chat", async (req, res) => {
  const { message } = req.body;
  const response = await manager.process("en", message);
  res.json({ reply: response.answer || "Sorry, I don't understand. Can you rephrase?" });
});

// Start Server
app.listen(PORT, () => console.log(`✅ Backend running at http://localhost:${PORT}`));
