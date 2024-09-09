import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { bookSchema }  from '@/schemas/bookSchema';
import dateFormat from '@/lib/dateFormat';

export async function GET() {
  try {
    const books = await prisma.book.findMany();
    const transformedBooks = books.map(book => ({
        ...book,
        publishedDate: dateFormat({ date: book.publishedDate.toDateString() })
    }));

    return NextResponse.json(transformedBooks);
  } catch (error) {
    console.error('Error fetching books:', error);
    return NextResponse.json({ error: 'Failed to fetch books' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { title, author, ISBN, publishedDate, genre } = await request.json();

    const parseResult = bookSchema.safeParse({ title, author, ISBN, publishedDate, genre });
    if (!parseResult.success) {
      return NextResponse.json({ error: parseResult.error.format() }, { status: 400 });
    }

    const formattedDate = new Date(publishedDate).toISOString();

    const newBook = await prisma.book.create({
      data: { title, author, ISBN, publishedDate: formattedDate, genre },
    });

    return NextResponse.json(newBook, { status: 201 });
  } catch (error) {
    console.error('Error creating books:', error);
    return NextResponse.json({ error: 'Failed to create book' }, { status: 500 });
  }
}
