export interface Note {
    id: string | null;
    title: string | null;
    username: string | null;
    content: string | null;
    pinned: boolean | null;
}

export const defaultNote: Note = {
    id: "0",
    title: "Title",
    username: "gian",
    content: "Content",
    pinned: false,
};
