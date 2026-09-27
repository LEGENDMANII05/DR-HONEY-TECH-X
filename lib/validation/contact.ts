import { z } from 'zod';
export const contactSchema=z.object({name:z.string().trim().min(2).max(80),email:z.string().email().max(160),whatsapp:z.string().trim().min(7).max(30),service:z.enum(['Bot Development','AI Development','Automation','Website Development','Promotion','Collaboration','Other']),message:z.string().trim().min(10).max(3000)});
