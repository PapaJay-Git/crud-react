import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { bookSchema }  from '@/schemas/bookSchema';
import dateFormat from '@/lib/dateFormat';
import { formatZodErrors } from '@/lib/formatZodErrors';

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
    return NextResponse.json({ error: 'Failed to fetch book. Please try again later.' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, author, ISBN, publishedDate, genre } = await request.json();

    const parseResult = bookSchema.safeParse({ title, author, ISBN, publishedDate, genre });
    if (!parseResult.success) {
      const formatedZodErrors = formatZodErrors(parseResult.error);
    
      console.log(formatedZodErrors);
      return NextResponse.json(formatedZodErrors, { status: 400 });
    }

    const formattedDate = new Date(publishedDate).toISOString();

    const newBook = await prisma.book.create({
      data: { title, author, ISBN, publishedDate: formattedDate, genre },
    });

    return NextResponse.json(newBook, { status: 201 });
  } catch (error) {
    console.error('Error creating books:', error);
    return NextResponse.json({ error: 'Failed to create book. Please try again later.' }, { status: 500 });
  }
}
