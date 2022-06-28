const express = require('express');
const dotenv = require("dotenv");
const signupRoute = require('./routes/signupRoute');

const routes = require("./routes");
const cors = require('cors');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID;
const twilioClient = require('twilio')(accountSid, authToken);

const app = express();
app.use(express.json());
app.use(cors());

app.post('/', (req, res) => {
  const { message, user: sender, type, members } = req.body;

  if(type === 'message.new') {
      members
          .filter((member) => member.user_id !== sender.id)
          .forEach(({ user }) => {
              if(!user.online) {
                  twilioClient.messages.create({
                      body: `You have a new message from ${message.user.fullName} - ${message.text}`,
                      messagingServiceSid: messagingServiceSid,
                      to: user.phoneNumber
                  })
                      .then(() => console.log('Message sent!'))
                      .catch((err) => console.log(err));
              }
          })

          return res.status(200).send('Message sent!');
  }

  return res.status(200).send('Not a new message request');
});
app.use("/auth/signup", signupRoute);
app.use("/auth/login", signupRoute);

// app.use('/auth', authRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));