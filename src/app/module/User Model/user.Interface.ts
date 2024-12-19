export interface userInterface {
    name: string,
    email: string,
    password: string,
    role: "admin" | "user",
    isBlocked: boolean
}

export interface loginInterface {
    email: string,
    password: string
}