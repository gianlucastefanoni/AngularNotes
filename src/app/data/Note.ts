export interface Note {
    id: string | null;
    title: string | null;
    author: string | null;
    content: string | null;
}

export const defaultNote: Note = {
    id: "0",
    title: "Title",
    author: "gian",
    content: "Content",
};
