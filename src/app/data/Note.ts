export interface Note {
    id: string | null;
    title: string | null;
    author: string | null;
    content: string | null;
    pinned: boolean | null;
}

export const defaultNote: Note = {
    id: "0",
    title: "Title",
    author: "gian",
    content: "Content",
    pinned: false,
};
