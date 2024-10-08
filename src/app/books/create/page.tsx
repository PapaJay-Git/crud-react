'use client'; 

import { useState, ChangeEvent } from 'react';
import Link from 'next/link';
import Alert from '@/components/Alert';
import Title from '@/components/Title';
import { AlertType } from '@/types/types';

export default function CreateBookPage() {

  const [title, setTitle] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [ISBN, setISBN] = useState<string>('');
  const [publishedDate, setPublishedDate] = useState<string>('');
  const [genre, setGenre] = useState<string>('');
  const [alertData, setAlertData] = useState<AlertType>({ show: false, type: 'success', message: null });

  const [isCreating, setIsCreating] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!confirm('Are you sure you want to create this book?')) {
       return false;
    }

    setIsCreating(true);
    
    const bookData = { title, author, ISBN, publishedDate, genre };

    try {
      const response = await fetch('/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
      });

      if (response.ok) {
        setTitle('');
        setAuthor('');
        setISBN('');
        setPublishedDate('');
        setGenre('');

        setAlertData({ show: true, type: 'success', message: 'Book created successfully!' })
      } else {
        const result = await response.json();
        setAlertData({ show: true, type: 'warning', message: result.errorMessage || 'An error occurred' })
      }
    } catch (error) {
        setAlertData({ show: true, type: 'error', message: 'An unexpected error occurred' })
    }
    setIsCreating(false);
  };

  const inputFields = {
    title: {
      label: 'Title',
      type: 'text',
      value: title,
      onChange: (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value),
      required: true,
    },
    author: {
      label: 'Author',
      type: 'text',
      value: author,
      onChange: (e: ChangeEvent<HTMLInputElement>) => setAuthor(e.target.value),
      required: true,
    },
    ISBN: {
      label: 'ISBN',
      type: 'text',
      value: ISBN,
      onChange: (e: ChangeEvent<HTMLInputElement>) => setISBN(e.target.value),
      required: true,
    },
    publishedDate: {
      label: 'Published Date',
      type: 'date',
      value: publishedDate,
      onChange: (e: ChangeEvent<HTMLInputElement>) => setPublishedDate(e.target.value),
      required: true,
    },
    genre: {
      label: 'Genre',
      type: 'text',
      value: genre,
      onChange: (e: ChangeEvent<HTMLInputElement>) => setGenre(e.target.value),
      required: true,
    }
  }

  return (
    <div >
        <Title>CREATE BOOK</Title>
        <Alert alertData={alertData} setAlertData={setAlertData} />

        <form onSubmit={handleSubmit} className='tracking-widest text-base font-semibold px-2 md:px-0 pb-10'>
            <div className='flex flex-wrap gap-3 mb-5'>
            {Object.entries(inputFields).map(([key, field]) => (
            <label key={key}>
                {field.label}:<br/>
                <input
                type={field.type}
                value={field.value}
                onChange={field.onChange}
                required={field.required}
                className='input input-bordered w-full max-w-sm my-3'
                />
                <br />
            </label>
            ))}
            </div>
            <button type="submit" disabled={isCreating} className='btn btn-neutral me-2 font-bold'>
                {isCreating ? 'CREARTING...' : 'CREATE'}
            </button>
            <Link href="/books" className='btn font-bold'>BACK</Link>
        </form>
    </div>
  );
}
