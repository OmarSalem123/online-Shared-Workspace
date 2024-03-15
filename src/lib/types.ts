import { z } from "zod";

export const FormSchema = z.object({
    email: z.string().describe("Email").email({message: "Invalid Email"}),
    password: z.string().describe("Password").min(1, 'password is required')

});

export const CreateWorkspaceFormSchema = z.object({
    workspaceName: z.string().describe("Workspace Name").min(1, "Workspace name must be min of 1 character"),
    logo: z.any(),
})

export const UploadBannerFormSchema = z.object({
    banner: z.string().describe('Banner Image'),
})