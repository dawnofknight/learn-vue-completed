import { eq } from 'drizzle-orm';
import { initializeDatabase } from '../db/connection.js';
import { users } from '../db/schema.js';

let db;

// Initialize database connection
const initDB = async () => {
  if (!db) {
    const dbConnection = await initializeDatabase();
    db = dbConnection.db;
  }
  return db;
};

export const getAllUsers = async (req, res) => {
  try {
    const database = await initDB();
    const allUsers = await database.select().from(users);
    res.json(allUsers);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

export const getUserById = async (req, res) => {
  try {
    const database = await initDB();
    const { id } = req.params;
    const user = await database.select().from(users).where(eq(users.id, id));
    
    if (user.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(user[0]);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

export const createUser = async (req, res) => {
  try {
    const database = await initDB();
    const { name, email, age } = req.body;
    
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }
    
    const newUser = await database.insert(users).values({
      name,
      email,
      age: age || null
    });
    
    res.status(201).json({ id: newUser.insertId, name, email, age });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
};

export const updateUser = async (req, res) => {
  try {
    const database = await initDB();
    const { id } = req.params;
    const { name, email, age } = req.body;
    
    const updatedUser = await database
      .update(users)
      .set({ name, email, age, updated_at: new Date() })
      .where(eq(users.id, id));
    
    if (updatedUser.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const database = await initDB();
    const { id } = req.params;
    
    const deletedUser = await database.delete(users).where(eq(users.id, id));
    
    if (deletedUser.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
};