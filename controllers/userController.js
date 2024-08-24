import User from '../models/user.js';// userController.js


// controllers/userController.js

export const getAllUsers = (req, res) => {
  // function implementation
};

// Export other functions as needed
export const createUser = (req, res) => {
  // function implementation
};

export const deleteUser = (req, res) => {
  // function implementation
};
export const getUserById = (req, res) => {
  // function implementation
};// controllers/userController.js

export const updateUser = (req, res) => {
  // function implementation
};

// Export other functions as needed



// Other exports




import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userRegistrationSchema, userLoginSchema } from '../middlewares/validation.js';

export const registerUser = async (req, res) => {
  try {
    const { error } = userRegistrationSchema.validate(req.body);
    if (error) return res.status(400).json({ status: 400, response: 'Bad Request', message: error.details[0].message });

    const { first_name, last_name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ first_name, last_name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({
      status: 201,
      response: 'Created',
      message: 'User created successfully',
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({ status: 500, response: 'Internal Server Error', message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { error } = userLoginSchema.validate(req.body);
    if (error) return res.status(400).json({ status: 400, response: 'Bad Request', message: error.details[0].message });

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ status: 401, response: 'Unauthorized', message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ status: 401, response: 'Unauthorized', message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      status: 200,
      response: 'OK',
      message: 'Login successful',
      data: { token },
    });
  } catch (error) {
    res.status(500).json({ status: 500, response: 'Internal Server Error', message: error.message });
  }
};const getUsersWithStreams = async (req, res) => {
  try {
    const users = await db.collection('users').aggregate([
      {
        $lookup: {
          from: "streams",
          localField: "id",
          foreignField: "user_id",
          as: "streams"
        }
      }
    ]).toArray();
    
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getUsersWithStreams };

