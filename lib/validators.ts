import { z } from "zod";

export const AuthSchema = z.object({
  email: z.string().email("请输入有效的邮箱地址"),
  password: z.string().min(8, "密码至少需要 8 位字符"),
});

export type AuthInput = z.infer<typeof AuthSchema>;
