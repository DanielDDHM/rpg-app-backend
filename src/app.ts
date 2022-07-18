import cors from 'cors';
import express from 'express';
import "express-async-errors";
import 'dotenv/config';
const { PORT, NAME } = process.env

//APP
const app = express();

// Express middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// app use routes
app.use('/v1')

// one call for test
app.get('/health', (request, response) => {
  const user = String(NAME) || "User";
  return response.send({
    message: `Hello ${user}`,
    status: 'UP'
  });
});

app.listen(PORT, () => {
  console.log(`APP STARTED ON http://localhost:${PORT || 3000}`);
});
