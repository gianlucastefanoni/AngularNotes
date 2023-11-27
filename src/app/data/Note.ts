export interface Note {
    id: string;
    title: string;
    author: string;
    content: string;
}

export const defaultNote: Note = {
    id: "0",
    title: "Title",
    author: "gian",
    content: "Content",
};
