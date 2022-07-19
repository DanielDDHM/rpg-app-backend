import Fastify from 'fastify'
import 'dotenv/config'
import cors from '@fastify/cors';
import routes from './routes';
const { PORT } = process.env

const app = Fastify()
// for log input inside fastify {logger: true}

app.register(cors, {
  origin: '*'
})

routes(app)
// Declare a route
app.get('/health', async (_request, _reply) => ({
  status: 'UP',
  message: 'Hello World',
}));

// Run the server!
app.listen({ port: Number(PORT) || 3000 }, function (err, address) {
  console.log(`APP STARTED ON http://localhost:${PORT || 3000}`);
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
})