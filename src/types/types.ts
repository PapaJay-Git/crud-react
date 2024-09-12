

export type AlertType = {
    show: boolean;
    type: 'success' | 'error' | 'warning';
    message: string | null;
};

export type BookType = {
    id: number;
    title: string;
    author: string;
    ISBN: string;
    publishedDate: string;
    genre: string;
};