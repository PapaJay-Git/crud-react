'use client'; 

import { useState } from 'react';
import Link from 'next/link';
import Alert from '@/components/Alert';
import Title from '@/components/Title';

export default function CreateBookPage() {

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [ISBN, setISBN] = useState('');
  const [publishedDate, setPublishedDate] = useState('');
  const [genre, setGenre] = useState('');
  const [showAlert, setShowAlert] = useState<Boolean>(false);
  const [alertType, setAlertType] = useState<'success' | 'error' | 'warning'>('success');
  const [alertMessage, setShowMessage] = useState<string | null>(null);

  
  const [isCreating, setIsCreating] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!confirm('Are you sure you want to create this book?')) {
       return false;
    }

    setIsCreating(true);
    
    const bookData = {
      title,
      author,
      ISBN,
      publishedDate,
      genre,
    };

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

        setShowAlert(true);
        setAlertType('success');
        setShowMessage('Book created successfully!');
      } else {
        const result = await response.json();
        setShowAlert(true);
        setAlertType('warning');
        setShowMessage(result.message);
      }
    } catch (error) {
        setShowAlert(true);
        setAlertType('error');
        setShowMessage("Error creating book");
    }
    setIsCreating(false);
  };

  const inputFields = {
    title: {
      label: 'Title',
      type: 'text',
      value: title,
      onChange: (e) => setTitle(e.target.value),
      required: true,
    },
    author: {
      label: 'Author',
      type: 'text',
      value: author,
      onChange: (e) => setAuthor(e.target.value),
      required: true,
    },
    ISBN: {
      label: 'ISBN',
      type: 'text',
      value: ISBN,
      onChange: (e) => setISBN(e.target.value),
      required: true,
    },
    publishedDate: {
      label: 'Published Date',
      type: 'date',
      value: publishedDate,
      onChange: (e) => setPublishedDate(e.target.value),
      required: true,
    },
    genre: {
      label: 'Genre',
      type: 'text',
      value: genre,
      onChange: (e) => setGenre(e.target.value),
      required: true,
    }
  }

  return (
    <div >
        <Title>MY BOOK COLLECTION</Title>
        <Alert type={alertType} message={alertMessage} showAlert={showAlert} setShowAlert={setShowAlert} />
        <form onSubmit={handleSubmit} className='tracking-widest text-base font-semibold'>
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
