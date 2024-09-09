// src/app/books/page.tsx
"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Alert from '@/components/Alert';
import Title from '@/components/Title';
import Loading from '@/components/Loading';

type Book = {
  id: number;
  title: string;
  author: string;
  ISBN: string;
  publishedDate: string;
  genre: string;
};

const BooksPage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<Boolean>(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showAlert, setShowAlert] = useState<Boolean>(false);
  const [alertType, setAlertType] = useState<'success' | 'error' | 'warning'>('success');
  const [alertMessage, setShowMessage] = useState<string | null>(null);


  async function fetchBooks() {
    try {
      const response = await fetch('/api/books');
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      setShowAlert(true);
      setAlertType('error');
      setShowMessage('Error fetching books');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDelete = async (id: string | number) => {
    if (confirm('Are you sure you want to delete this book?')) {
      setIsDeleting(true);
      try {
        const response = await fetch(`/api/books/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setShowAlert(true);
          setAlertType('success');
          setShowMessage('Book deleted successfully');
          fetchBooks();
        } else {
          setShowAlert(true);
          setAlertType('error');
          setShowMessage('Deletion Failed');
        }
      } catch (error) {
        setShowAlert(true);
        setAlertType('error');
        setShowMessage('Deletion Failed');
      } finally {
        setIsDeleting(false);
      }
    }
  };


  if (loading) {
    return <Loading />;
  }

  return (
    <div className='bg-inherit'>
      <Title>MY BOOK COLLECTION</Title>
      <Alert type={alertType} message={alertMessage} showAlert={showAlert} setShowAlert={setShowAlert} />
      <Link href="/books/create" className='btn font-bold tracking-widest'>CREATE</Link>
      <div className="mt-5 border p-3 tracking-widest overflow-x-auto">
        <table className="table table-lg">
          <thead className=' text-black font-bold text-base py-3'>
            <tr>
              <th>ID</th>
              <th>TITLE</th>
              <th>AUTHO</th>
              <th>ISBN</th>
              <th>PUBLISHED DATE</th>
              <th>GENRE</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {books.map(book => (
              <tr key={book.id}>
                <th>{book.id}</th>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.ISBN}</td>
                <td>{book.publishedDate}</td>
                <td>{book.genre}</td>
                <td>
                  <Link href={`/books/${book.id}/edit`} className='btn font-bold tracking-widest m-2'>EDIT</Link>
                  <button onClick={() => handleDelete(book.id)} disabled={isDeleting} className='btn btn-error font-bold tracking-widest m-2'>
                    {isDeleting ? 'DELETING...' : 'DELETE'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BooksPage;
