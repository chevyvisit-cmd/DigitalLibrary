This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Loyihani Deploy qilish (O'zbekcha)

### 1. Ma'lumotlar bazasini sozlash
Vercel-da SQLite ishlamaydi. Shuning uchun PostgreSQL-dan foydalanish kerak:
- [Neon.tech](https://neon.tech/) yoki [Supabase](https://supabase.com/) saytidan tekin PostgreSQL bazasini yarating.
- `DATABASE_URL` ni oling.

### 2. GitHub-ga yuklash
Terminalda quyidagi buyruqlarni bajaring:
```bash
git add .
git commit -m "Deployga tayyor"
# GitHub-da yangi repo yarating va uni ulab, push qiling
git remote add origin https://github.com/FOYDALANUVCHI_NOMI/REPO_NOMI.git
git push -u origin master
```

### 3. Vercel-ga joylash
- [Vercel](https://vercel.com/) saytiga kiring.
- GitHub orqali login qiling.
- "Add New" -> "Project" ni tanlang.
- GitHub repozitoriyangizni import qiling.
- **Environment Variables** bo'limiga `DATABASE_URL` va `NEXTAUTH_SECRET` ni qo'shing.
- "Deploy" tugmasini bosing.

### Muhim eslatma
`public/uploads` papkasiga rasm yuklash serverda ishlamaydi. Rasmlar uchun Cloudinary yoki Supabase Storage ishlatish tavsiya etiladi.
