// src/app/api/login/route.ts
import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function POST(request: Request) {
  const { userId, password } = await request.json();

  if (!userId || !password) {
    return NextResponse.json({ message: 'UserID and Password are required' }, { status: 400 });
  }

  try {
    const query = 'SELECT * FROM users WHERE user_id = ? AND password = ?';
    const [rows] = await db.query(query, [userId, password]);

    if (Array.isArray(rows) && rows.length > 0) {
      return NextResponse.json({ message: 'Login successful' }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Invalid UserID or Password' }, { status: 401 });
    }
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}
