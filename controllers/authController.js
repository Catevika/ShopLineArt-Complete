import bcrypt from 'bcrypt';
import UserModel from '../models/UserModel.js';
import jwt from 'jsonwebtoken';

// Register a new user
export const registerUser = async (req, res) => {
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(req.body.password, salt);
	req.body.password = hashedPassword;
	const newUser = new UserModel(req.body);
	const { email } = req.body;
	try {
		const oldUser = await UserModel.findOne({ email });
		if (oldUser) {
			return res.status(400).json('This email is already registered!');
		}

		const user = await newUser.save();
		const token = jwt.sign(
			{ email: user.email, id: user._id },
			process.env.JWT_KEY,
			{ expiresIn: '10h' }
		);
		console.log({ token });
		res.status(200).json({ user, token });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Login user with password
export const loginUser = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await UserModel.findOne({ email });
		if (user) {
			const validity = await bcrypt.compare(password, user.password);
			if (!validity) {
				res.status(400).json('Wrong password');
			} else {
				const token = jwt.sign(
					{ email: user.email, id: user._id },
					process.env.JWT_KEY,
					{ expiresIn: '10h' }
				);
				res.status(200).json({ user, token });
			}
		} else {
			res.status(404).json('User does not exist');
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
