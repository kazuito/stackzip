import z from "zod";

const SecretEnvSchema = z.object({
  GITHUB_TOKEN: z.string().min(1, "GITHUB_TOKEN is required"),
});

export const env = {
  secret: SecretEnvSchema.parse(process.env),
};
