export default interface IComment {
    id?: string;
    user_id: string;
    publication_id: string;
    message: string;
    date?: string;
}