import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import 'dotenv/config';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10);

  // Create Test User
  const testUser = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      name: 'Test User',
      password: hashedPassword,
      phoneNumber: '+998901234567',
      image: 'https://ui-avatars.com/api/?name=Test+User&background=random',
    },
  });

  console.log('Test user created:', testUser.email);

  // Clear existing data
  await prisma.notification.deleteMany({});
  await prisma.readingProgress.deleteMany({});
  await prisma.bookmark.deleteMany({});
  await prisma.favorite.deleteMany({});
  await prisma.chapter.deleteMany({});
  await prisma.book.deleteMany({});
  await prisma.category.deleteMany({});
  
  console.log('Existing data cleared.');

  // Create Categories
  const personalDev = await prisma.category.create({ data: { name: 'Shaxsiy Rivojlanish' } });
  const fiction = await prisma.category.create({ data: { name: 'Badiiy Adabiyot' } });
  const classic = await prisma.category.create({ data: { name: 'Klassika' } });
  const manga = await prisma.category.create({ data: { name: 'Manga' } });

  // --- KLASSIKA ---

  await prisma.book.create({
    data: {
      title: 'Odam bo\'lish qiyin',
      author: 'O\'lmas Umarbekov',
      description: 'Abdulla ismli yigitning hayot yo\'li haqidagi mashhur asar.',
      coverImage: '/uploads/odam_bolish_qiyin.jpg',
      rating: 4.9,
      totalPages: 320,
      readTime: '8h 30m',
      categoryId: classic.id,
      chapters: {
        create: [
          { title: 'Muqaddima', order: 1, content: '<p>Asar Shoh Muslim haqidagi rivoyat bilan boshlanadi...</p>' }
        ]
      }
    }
  });

  await prisma.book.create({
    data: {
      title: 'Sariq devni minib',
      author: 'Xudoyberdi To\'xtaboyev',
      description: 'Sehrli qalpoqcha haqidagi qiziqarli sarguzasht.',
      coverImage: '/uploads/sariq_devni_minib.jpg',
      rating: 4.8,
      totalPages: 280,
      readTime: '6h 00m',
      categoryId: classic.id,
      chapters: {
        create: [
          { title: 'Sehrli qalpoqcha', order: 1, content: '<p>Hoshimjon sehrli qalpoqchani topib oladi...</p>' }
        ]
      }
    }
  });

  await prisma.book.create({
    data: {
      title: 'Kecha va kunduz',
      author: 'Cho\'lpon',
      description: 'Zebining fojiali taqdiri haqidagi klassik asar.',
      coverImage: '/uploads/kecha_va_kunduz.jpg',
      rating: 5.0,
      totalPages: 350,
      readTime: '9h 00m',
      categoryId: classic.id,
      chapters: {
        create: [
          { title: 'Bahor nafasi', order: 1, content: '<p>Zebining begubor orzulari...</p>' }
        ]
      }
    }
  });

  // --- SHAXSIY RIVOJLANISH ---

  await prisma.book.create({
    data: {
      title: 'Atomic Habits',
      author: 'James Clear',
      description: 'Kichik odatlarning katta kuchi.',
      coverImage: '/uploads/atomic_habits.jpg',
      rating: 4.8,
      totalPages: 320,
      readTime: '8h 20m',
      categoryId: personalDev.id,
      chapters: {
        create: [
          { title: 'The Fundamentals', order: 1, content: '<p>Habits are compound interest...</p>' }
        ]
      }
    }
  });

  await prisma.book.create({
    data: {
      title: '7 ko\'nikma',
      author: 'Stephen Covey',
      description: 'Muvaffaqiyatli insonlarning 7 ta asosiy tamoyili.',
      coverImage: '/uploads/7_habits.jpg',
      rating: 4.7,
      totalPages: 432,
      readTime: '11h 00m',
      categoryId: personalDev.id,
      chapters: {
        create: [
          { title: 'Be Proactive', order: 1, content: '<p>O\'zingiz uchun mas\'uliyat oling...</p>' }
        ]
      }
    }
  });

  // --- BADIIY ADABIYOT ---

  await prisma.book.create({
    data: {
      title: 'Alkimyogar',
      author: 'Paulo Coelho',
      description: 'Xazina qidirgan cho\'pon yigit sarguzashti.',
      coverImage: '/uploads/alkimyogar.jpg',
      rating: 4.8,
      totalPages: 197,
      readTime: '4h 30m',
      categoryId: fiction.id,
      chapters: {
        create: [
          { title: 'Sayohat boshlanishi', order: 1, content: '<p>Santyago Misr tomon yo\'l oladi...</p>' }
        ]
      }
    }
  });

  await prisma.book.create({
    data: {
      title: '1984',
      author: 'George Orwell',
      description: 'Totalitar tuzum haqidagi antiutopiya.',
      coverImage: '/uploads/1984.jpg',
      rating: 4.9,
      totalPages: 328,
      readTime: '9h 15m',
      categoryId: fiction.id,
      chapters: {
        create: [
          { title: 'Nazorat', order: 1, content: '<p>Katta Og\'a seni kuzatmoqda...</p>' }
        ]
      }
    }
  });

  // --- MANGA ---

  await prisma.book.create({
    data: {
      title: 'Naruto',
      author: 'Masashi Kishimoto',
      description: 'Ninja Naruto Uzumakining sarguzashtlari. U o\'z qishlog\'ining eng kuchli ninjasi - Hokage bo\'lishni orzu qiladi.',
      coverImage: 'https://m.media-amazon.com/images/M/MV5BNTk3MDA1ZjAtNTRhYS00YzNiLTgwOGEtYWRmYTQ3NjA0NTAwXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
      rating: 4.9,
      totalPages: 700,
      readTime: '24h 00m',
      categoryId: manga.id,
      chapters: {
        create: [
          { 
            title: '1-bob: Naruto Uzumaki!!', 
            order: 1, 
            content: `
              <div class="space-y-6">
                <p>Konoha qishlog'ida yashovchi yetim bola Naruto Uzumaki hamma tomonidan yakkalangan va nafratlanilgan. Buning sababi uning ichiga to'qqiz quyruqli tulki - Kurama muhrlangan edi.</p>
                <img src="https://static.wikia.nocookie.net/naruto/images/d/d1/Hokage_Rock_Graffiti.png" alt="Hokage Rock Graffiti" class="rounded-lg shadow-xl mx-auto border-4 border-primary/20" />
                <p>Naruto e'tiborni jalb qilish uchun Hokage toshlarini bo'yab tashlaydi. U o'zining kelajakda eng kuchli Hokage bo'lishini va hamma uni tan olishini isbotlamoqchi.</p>
                <img src="https://static.wikia.nocookie.net/naruto/images/7/7c/Iruka_protects_Naruto.png" alt="Iruka protects Naruto" class="rounded-lg shadow-xl mx-auto border-4 border-primary/20" />
                <p>Mizuki ismli xoin uni aldab, maxfiy muhrlar o'ralgan o'ramni o'g'irlatadi. Biroq, Iruka sensei o'z hayotini xavfga qo'yib Narutoni qutqaradi. Bu Narutoga kuch beradi.</p>
                <img src="https://static.wikia.nocookie.net/naruto/images/0/0b/Multi_Shadow_Clone_Technique.png" alt="Multi Shadow Clone" class="rounded-lg shadow-xl mx-auto border-4 border-primary/20" />
                <p>Naruto o'zi o'rgangan yangi texnika - "Tajuu Kage Bunshin no Jutsu" (Ko'p sonli soya nusxalari) texnikasini qo'llab, Mizukini mag'lub etadi.</p>
              </div>
            ` 
          },
          {
            title: '2-bob: Konohamaru',
            order: 2,
            content: '<p>Naruto uchinchi Hokagening nabirasi Konohamaru bilan tanishadi...</p>'
          }
        ]
      }
    }
  });

  await prisma.book.create({
    data: {
      title: 'O\'lim Daftari',
      author: 'Tsugumi Ohba',
      description: 'Genial o\'quvchi Light Yagami qo\'liga tushgan sirli daftar yordamida dunyoni jinoyatchilardan tozalashga qaror qiladi.',
      coverImage: 'https://www.debaser.it/resize.aspx?path=%2Ffiles%2F2020%2F51021.jpg',
      rating: 5.0,
      totalPages: 108,
      readTime: '12h 00m',
      categoryId: manga.id,
      chapters: {
        create: [
          { 
            title: '1-bob: Zerikish', 
            order: 1, 
            content: `
              <div class="space-y-6">
                <p>Light Yagami - o'ta aqlli, lekin hayotdan zerikkan o'quvchi. Bir kuni u maktab hovlisida sirli qora daftarni topib oladi.</p>
                <img src="https://static.wikia.nocookie.net/deathnote/images/e/e0/Light_finds_the_Death_Note.png" alt="Light finds Death Note" class="rounded-lg shadow-xl mx-auto border-4 border-primary/20" />
                <p>Daftar ichidagi qoidalarga ko'ra, kimning ismi u yerga yozilsa, o'sha inson vafot etadi. Light bunga dastlab ishonmaydi, lekin sinab ko'rgach, daftarning kuchi haqiqat ekanligini tushunadi.</p>
                <img src="https://static.wikia.nocookie.net/deathnote/images/8/8e/Ryuk_Manga_Debut.png" alt="Ryuk appearance" class="rounded-lg shadow-xl mx-auto border-4 border-primary/20" />
                <p>Besh kundan keyin daftarning asl egasi - Shinigami (O'lim xudosi) Ryuk paydo bo'ladi. U Lightning qisqa vaqt ichida qanchalik ko'p odamni o'ldirganidan hayratga tushadi.</p>
                <p>Light o'zini "Yangi dunyo Xudosi" deb e'lon qiladi va barcha jinoyatchilarni yo'q qilishga ahd qiladi.</p>
              </div>
            ` 
          }
        ]
      }
    }
  });

  await prisma.book.create({
    data: {
      title: 'Titanlarga Hujum',
      author: 'Hajime Isayama',
      description: 'Insoniyat ulkan Titanlardan himoyalanish uchun devorlar ortida yashashga majbur. Bir kuni ulkan Titan paydo bo\'lib, bu tinchlikni buzadi.',
      coverImage: 'https://kenuz.uz/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdkxtnixyb%2Fimage%2Fupload%2Fv1739357810%2FMovie%2Ftdjgldek9fisjetkqvih.jpg&w=750&q=75',
      rating: 4.9,
      totalPages: 139,
      readTime: '15h 00m',
      categoryId: manga.id,
      chapters: {
        create: [
          { 
            title: '1-bob: Senga, 2000 yildan so\'ng', 
            order: 1, 
            content: `
              <div class="space-y-6">
                <p>Insoniyat 100 yildan beri 50 metrlik devorlar ortida titanlardan himoyalanib kelmoqda. Eren Yeager esa bu "qafas"da yashashdan charchagan.</p>
                <img src="https://static.wikia.nocookie.net/attackontitan/images/c/c5/Colossal_Titan_looming_over_Shiganshina.jpg" alt="Colossal Titan" class="rounded-lg shadow-xl mx-auto border-4 border-primary/20" />
                <p>To'satdan, 60 metrlik "Ulkan Titan" (Colossal Titan) paydo bo'ladi va devorni buzib tashlaydi. Shiganshina shahriga titanlar bostirib kiradi.</p>
                <img src="https://static.wikia.nocookie.net/attackontitan/images/4/4e/Smiling_Titan_kills_Carla.png" alt="Smiling Titan kills Carla" class="rounded-lg shadow-xl mx-auto border-4 border-primary/20" />
                <p>Hujum paytida Erenning onasi xarobalar ostida qolib ketadi va ko'z o'ngida Titan tomonidan yeb yuboriladi. Eren barcha titanlarni yo'q qilishga qasam ichadi.</p>
              </div>
            ` 
          }
        ]
      }
    }
  });

  console.log('Database re-seeded with all books! 🚀');

  await prisma.notification.create({
    data: {
      userId: testUser.id,
      title: 'Yangilanish',
      message: 'Kutubxonadagi barcha kitoblar va rasmlar qayta yuklandi.',
      type: 'success',
    }
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
