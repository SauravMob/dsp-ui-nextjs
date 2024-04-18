import { regexEmail } from "@/components/constants/regexConstants"
import { z } from "zod"

export const formSchema = z.object({
    username: z.string().min(1, { message: "Required Field!" }).regex(regexEmail, "Email is invalid"),
    password: z.string().min(1, { message: "Required Field!" }).min(6, { message: "Password length should be atleast 6" })
})

export type LoginFormData = z.infer<typeof formSchema>