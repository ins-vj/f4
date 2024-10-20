// src/app/api/register/route.ts
import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function POST(request: Request) {
  const { userId, mobileNumber, password } = await request.json();

  if (!userId || !mobileNumber || !password) {
    return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
  }

  try {
    const query = 'INSERT INTO users (user_id, mobile_number, password) VALUES (?, ?, ?)';
    const values = [userId, mobileNumber, password];
    await db.query(query, values);

    return NextResponse.json({ message: 'User registered successfully' }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}
