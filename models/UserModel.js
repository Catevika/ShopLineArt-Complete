import mongoose from 'mongoose';

const UserSchema = mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			min: 3,
			max: 20
		},
		email: {
			type: String,
			required: true,
			max: 50,
			unique: true
		},
		password: {
			type: String,
			required: true,
			min: 6
		},
		isAdmin: {
			type: Boolean,
			default: true
		}
	},
	{ timestamps: true }
);

const UserModel = mongoose.model('Users', UserSchema);

export default UserModel;
