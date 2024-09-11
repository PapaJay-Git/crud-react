
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import dateFormat from '@/lib/dateFormat';
import { bookSchema } from '@/schemas/bookSchema';
import { formatZodErrors } from '@/lib/formatZodErrors';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try{
    const { id } = params;
    const book = await prisma.book.findUnique({
      where: { id: parseInt(id) }, 
    });
  
    if (!book) {
      return NextResponse.json({ error: 'Book not found' }, { status: 404 });
    }

    const transformedBook ={
        ...book,
        publishedDate: dateFormat({ date: book.publishedDate.toDateString() })
    };
  
    return NextResponse.json(transformedBook);
  }catch(error){
    return NextResponse.json({ error: 'Error fetching book' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try{
        const { title, author, ISBN, publishedDate, genre } = await request.json();

        const parseResult = bookSchema.safeParse({ title, author, ISBN, publishedDate, genre });
        if (!parseResult.success) {
          const formatedZodErrors = formatZodErrors(parseResult.error);
    
          console.log(formatedZodErrors);
          return NextResponse.json(formatedZodErrors, { status: 400 });
        }
    
        const formattedDate = new Date(publishedDate).toISOString();

        const updatedBook = await prisma.book.update({
            where: { id: parseInt(params.id) },
            data: { title, author, ISBN, publishedDate: formattedDate, genre },
        });
        return NextResponse.json(updatedBook);
      }catch(error){
        console.log(error);
        return NextResponse.json({ error: 'Error updating book' }, { status: 500 });
      }
}

export async function DELETE(reuqest: Request, { params }: { params: { id: string } }) {
    try{
        await prisma.book.delete({ where: { id: parseInt(params.id) } });
        return NextResponse.json({ message: 'Book deleted' });
      }catch(error){
        console.log(error);
        return NextResponse.json({ error: 'Error deleting book' }, { status: 500 });
      }
      
}

