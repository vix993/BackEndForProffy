import express from 'express';
import cors from 'cors';
import routes from './routes';

const port = process.env.PORT || 8080;

const app = express();

app.use(cors());

app.use(express.json());

app.use(routes);

app.listen(port);

// GET: ACESS STUFF
// POST: CREATE STUFF
// PUT: UPDATE STUFF
// DELETE: DELETE STUFF

// REQUEST BODY: DATA FOR REQUEST VALIDATION
// Route Params: Identifying which resource needs to be edited e.g.: app.delete('/users/:id')
// Query Params: Order, sort, pagify