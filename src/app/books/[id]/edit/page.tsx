"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Alert from '@/components/Alert';
import Title from '@/components/Title';
import Loading from '@/components/Loading';


const EditBookPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [title, setTitle] = useState<string | null>(null);
  const [author, setAuthor] = useState<string | null>(null);
  const [ISBN, setISBN] = useState<string | null>(null);
  const [publishedDate, setPublishedDate] = useState<string | null>(null);
  const [genre, setGenre] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [notfound, setNotfound] = useState(false);
  const [isUpdating, setisUpdating] = useState(false);

  const [showAlert, setShowAlert] = useState<Boolean>(false);
  const [alertType, setAlertType] = useState<'success' | 'error' | 'warning'>('success');
  const [alertMessage, setShowMessage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBook() {
      try {
        const response = await fetch(`/api/books/${id}`);
        console.log("respone" + response);
        if (!response.ok) {
          throw new Error('Failed to fetch book');
        }
        const data = await response.json();
        if (!data) {
          setNotfound(true);
          return;
        }

        setTitle(data.title);
        setAuthor(data.author);
        setISBN(data.ISBN);
        setPublishedDate(data.publishedDate);
        setGenre(data.genre);

      } catch (error) {
        setNotfound(true);
        setShowAlert(true);
        setAlertType('error');
        setShowMessage('Failed fetching book.');
        
      } finally {
        setLoading(false);
      }
    }

    fetchBook();
  }, [id]);

  const inputFields = {
    title: {
      label: 'Title',
      type: 'text',
      value: title || '',
      onChange: (e) => setTitle(e.target.value),
      required: true,
    },
    author: {
      label: 'Author',
      type: 'text',
      value: author || '',
      onChange: (e) => setAuthor(e.target.value),
      required: true,
    },
    ISBN: {
      label: 'ISBN',
      type: 'text',
      value: ISBN || '',
      onChange: (e) => setISBN(e.target.value),
      required: true,
    },
    publishedDate: {
      label: 'Published Date',
      type: 'date',
      value: publishedDate || '',
      onChange: (e) => setPublishedDate(e.target.value),
      required: true,
    },
    genre: {
      label: 'Genre',
      type: 'text',
      value: genre || '',
      onChange: (e) => setGenre(e.target.value),
      required: true,
    },
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!confirm('Are you sure you want to update this book?')) {
        return false;
    }

    setisUpdating(true);
 

    const updatedBook = {
      title: title || '',
      author: author || '',
      ISBN: ISBN || '',
      publishedDate: publishedDate || '',
      genre: genre || '',
    };

    try {
      const response = await fetch(`/api/books/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedBook),
      });

      if (response.ok) {
        setShowAlert(true);
        setAlertType('success');
        setShowMessage('Book updated successfully!');
      } else {
        const result = await response.json();
        setShowAlert(true);
        setAlertType('warning');
        setShowMessage(result.message);
      }
    } catch (error) {
        setShowAlert(true);
        setAlertType('error');
        setShowMessage("Error updating book");
    }
    setisUpdating(false);
  };

  if (loading) {
    return <Loading />;
  }

  if (notfound) {
    return <div>Book not found</div>;
  }

  return (
    <div>
        <Title>EDIT BOOK</Title>
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
            <button type="submit" disabled={isUpdating} className='btn btn-neutral me-2 font-bold'>
                {isUpdating ? 'UPDATING...' : 'UPDATE'}
            </button>
            <Link href="/books" className='btn font-bold'>
                BACK
            </Link>
        </form>
    </div>
  );
};

export default EditBookPage;
