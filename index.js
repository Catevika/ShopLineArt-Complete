import express from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

import authRoute from './routes/authRoute.js';

dotenv.config();
const app = express();
app.use(cors());

const connectDB = () => {
	try {
		const conn = mongoose.connect(process.env.MONGO_URI);
		console.log('\x1b[33m', `MongoDB Connected: ${conn.connection.host}`);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));

app.use('/', authRoute);

connectDB().then(() => {
	app.listen(process.env.EXPRESS_PORT || 8800);
	console.log('\x1b[33m', `Server running on port ${process.env.EXPRESS_PORT}`);
});

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/dist'));

	app.get('*', (req, res) =>
		res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
	);
}
