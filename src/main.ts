import path from 'path';
import { fileURLToPath } from 'url';

import cors from 'cors';
import dotenv from 'dotenv';
import 'express-async-errors';
import express, { Express, Request, Response } from 'express';

import rpcRoutes from './api/rpc/routes.js';
import { errorHandler } from './middleware/errors.js';
import routes from './api/routes.js';
import connect from './utils/connect.js';
import {
  restResponseTimeHistogram,
  startMetricsServer,
} from './utils/metrics.js';

import swaggerDocs from './utils/swagger.js';

dotenv.config();

const app: Express = express();

const PORT = process.env.port || 3001;

app.use(cors());
app.options('*', cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/static', express.static(path.join(__dirname, 'public')));

app.get('/', (_req: Request, res: Response) => {
  res.send('Welcome to the Block Explorer');
});

app.use('/api/', routes);
app.use('/api/rpc', rpcRoutes);

app.use(errorHandler);

app.listen(PORT, async () => {
  console.log(`Server is running at http://localhost:${PORT}`);

  await connect();

  startMetricsServer();

  swaggerDocs(app, PORT);
});
