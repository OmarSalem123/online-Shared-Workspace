import { z } from "zod";

export const FormSchema = z.object({
    email: z.string().describe("Email").email({message: "Invalid Email"}),
    password: z.string().describe("Password").min(1, 'password is required')

});

export const createWorkspaceFormSchema = z.object({
    workspaceName: z.string().describe("Workspace Name").min(1, "Workspace name must be min of 1 character"),
    file: z.any(),
})