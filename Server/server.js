const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors({ origin: 'http://localhost:127.0.0.1:8080' }));

const PORT = process.env.PORT || 8080;
const users = [
  {
    id: "1",
    email: "ahmadalihafeez24@gmail.com",
    password: "@Sublime123"
  }
];

app.use(bodyParser.json());
const SECRET_KEY = 'your_secret_key';

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  const user = users.find(user => user.email === email && user.password === password);

  if (!user) {
    return res.status(400).send('User not found or password is incorrect');
  }


  const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });

  res.status(200).send({ auth: true, token: token });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
