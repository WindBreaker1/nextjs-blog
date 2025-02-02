import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const JWT_SECRET = process.env.MY_JWT_SECRET;

export function verifyToken(req) {
  try {
    const authHeader = req.headers.get("authorization"); // Fix: Use `req.headers.get`
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new Error("Unauthorized: Token not provided");
    }

    const token = authHeader.split(' ')[1];
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    return null; // Fix: Return `null` instead of a Response object
  }
}
