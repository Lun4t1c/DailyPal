export interface TodoModel{
    id: number,
    title: string,
    remind: Date | null,
    deadline: Date | null
}