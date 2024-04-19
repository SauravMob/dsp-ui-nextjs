import { regexEmail, regexPhone } from "@/components/constants/regexConstants"
import { z } from "zod"

export const formSchema = z.object({
    username: z.string().min(1, { message: "Required Field!" }).regex(regexEmail, "Email is invalid"),
    password: z.string().min(1, { message: "Required Field!" }).min(6, { message: "Password length should be atleast 6" }),
    company: z.string().min(1, { message: "Required Field!" }),
    phone: z.string().min(1, { message: "Required Field!" }).regex(regexPhone, "Invalid phone number").max(16, { message: "Enter a valid phone number!" }),
    country: z.string().min(1, { message: "Required Field!" }),
    captchaToken: z.string().min(1, { message: "Please verify you are not a bot." }),
    organizationId: z.number()
})

export type SignupFormData = z.infer<typeof formSchema>