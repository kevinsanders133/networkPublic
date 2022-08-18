export default interface IPublication {
    id: string,
    user_id: string,
    message: string,
    date: string,
    likes: number,
    paths: string[],
    isLiked: boolean
}