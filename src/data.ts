/* Data dummy. Struktur & isi disalin dari data/KarsaData.kt di repo (seed prototipe),
   dengan waktu relatif ditulis statis. Semua nama/NIM fiktif. */
import legal from "./legal.json";

export const ME = {
  name: "Nadia Putri Maharani",
  email: "nadia.putri@students.untidar.ac.id",
  nim: "2310114028",
  fakultas: "Fakultas Ilmu Komputer",
  prodi: "Sistem Informasi",
  kelas: "SI-4B",
};
export const maskNim = (nim: string) => nim.slice(0, 2) + "•".repeat(Math.max(nim.length - 5, 0)) + nim.slice(-3);
export const nimLabel = (nim: string) => `NIM ••••${nim.slice(-4)}`;

export type CourseTone = "brand" | "butter" | "leaf" | "tide" | "plum" | "clay";
export const COURSES: {
  id: string; name: string; kelas: string; members: number; locked: boolean; pjMe: boolean; pjOther: string; tone: CourseTone;
}[] = [
  { id: "c1", name: "Basis Data Lanjut", kelas: "SI-4B", members: 38, locked: false, pjMe: true, pjOther: "Dimas Aryo", tone: "brand" },
  { id: "c2", name: "Pemrograman Web", kelas: "SI-4B", members: 38, locked: false, pjMe: true, pjOther: "Salsabila Nur", tone: "tide" },
  { id: "c3", name: "Interaksi Manusia & Komputer", kelas: "SI-4B", members: 36, locked: true, pjMe: false, pjOther: "Raka Pratama", tone: "plum" },
  { id: "c4", name: "Statistika Terapan", kelas: "SI-4A", members: 41, locked: false, pjMe: false, pjOther: "Salsabila Nur", tone: "leaf" },
  { id: "c5", name: "Etika Profesi TI", kelas: "SI-4B", members: 38, locked: true, pjMe: true, pjOther: "Raka Pratama", tone: "butter" },
];

export const STUDENTS = [
  ["Aulia Rahmawati", "2310114002"], ["Bagas Setiawan", "2310114007"], ["Cahya Ningrum", "2310114011"],
  ["Dimas Aryo Wibowo", "2310114015"], ["Eka Fitriani", "2310114019"], ["Fajar Nugroho", "2310114023"],
  ["Gita Permata Sari", "2310114031"], ["Hanif Maulana", "2310114036"], ["Intan Kusuma Dewi", "2310114040"],
  ["Jihan Aprilia", "2310114044"], ["Kevin Santoso", "2310114047"], ["Laras Wulandari", "2310114052"],
  ["Muhammad Rizky", "2310114058"], ["Nabila Zahra", "2310114061"],
].map(([name, nim]) => ({ name, nim }));

export const CATEGORIES = [
  "Bertanya di kelas", "Menjawab pertanyaan", "Aktif dalam diskusi kelompok", "Presentasi / paparan",
  "Membantu teman belajar", "Mengerjakan soal di depan kelas", "Ide atau usulan konstruktif",
];

export const HISTORY = [
  { day: "Hari ini", date: "21 Nov", items: [
    { poin: 3, name: "Aulia Rahmawati", nim: "2310114002", cat: "Menjawab pertanyaan", course: "Basis Data Lanjut", kelas: "SI-4B", time: "09.12", note: "Menjelaskan beda 3NF dan BCNF dengan contoh tabel pesanan." },
    { poin: 2, name: "Dimas Aryo Wibowo", nim: "2310114015", cat: "Bertanya di kelas", course: "Basis Data Lanjut", kelas: "SI-4B", time: "08.41" },
  ]},
  { day: "Kemarin", date: "20 Nov", items: [
    { poin: 4, name: "Intan Kusuma Dewi", nim: "2310114040", cat: "Presentasi / paparan", course: "Pemrograman Web", kelas: "SI-4B", time: "13.20", note: "Presentasi prototipe Figma 7 menit, runtut dan rapi." },
    { poin: 1, name: "Bagas Setiawan", nim: "2310114007", cat: "Aktif dalam diskusi kelompok", course: "Pemrograman Web", kelas: "SI-4B", time: "10.05" },
    { poin: 3, name: "Nabila Zahra", nim: "2310114061", cat: "Membantu teman belajar", course: "Basis Data Lanjut", kelas: "SI-4B", time: "09.30", note: "Mengajari teman satu kelompok menulis query JOIN." },
  ]},
  { day: "Sabtu", date: "18 Nov", items: [
    { poin: 3, name: "Kevin Santoso", nim: "2310114047", cat: "Ide atau usulan konstruktif", course: "Pemrograman Web", kelas: "SI-4B", time: "11.00", note: "Mengusulkan skema pembagian modul tugas kelompok." },
  ]},
];

export const REPORT_COURSES = [
  { id: "c1", name: "Basis Data Lanjut", code: "SI401", pj: "Dimas Aryo", total: 9, entries: [
    { poin: 3, cat: "Menjawab pertanyaan", date: "21 Nov 2026", time: "10.30", note: "Menjawab pertanyaan dosen tentang indeks komposit." },
    { poin: 4, cat: "Presentasi / paparan", date: "19 Nov 2026", time: "09.15", note: "Presentasi rancangan ERD kelompok 3." },
    { poin: 2, cat: "Bertanya di kelas", date: "15 Nov 2026", time: "08.50" },
  ]},
  { id: "c2", name: "Pemrograman Web", code: "SI402", pj: "Salsabila Nur", total: 9, entries: [
    { poin: 3, cat: "Ide atau usulan konstruktif", date: "20 Nov 2026", time: "13.10", note: "Usulan struktur komponen untuk proyek akhir." },
    { poin: 2, cat: "Aktif dalam diskusi kelompok", date: "17 Nov 2026", time: "10.40" },
    { poin: 4, cat: "Membantu teman belajar", date: "12 Nov 2026", time: "10.00", note: "Membantu 3 teman debugging routing." },
  ]},
  { id: "c3", name: "Interaksi Manusia & Komputer", code: "SI403", pj: "Raka Pratama", total: 2, entries: [
    { poin: 2, cat: "Bertanya di kelas", date: "18 Nov 2026", time: "14.00" },
  ]},
  { id: "c5", name: "Etika Profesi TI", code: "SI405", pj: "Raka Pratama", total: 6, entries: [
    { poin: 3, cat: "Mengerjakan soal di depan kelas", date: "16 Nov 2026", time: "11.25" },
    { poin: 3, cat: "Aktif dalam diskusi kelompok", date: "9 Nov 2026", time: "11.25", note: "Diskusi dilema etika AI di kelas." },
  ]},
];

export const RANK_OPTIONS = ["Semua matkul", "Basis Data Lanjut", "Pemrograman Web", "Interaksi Manusia & Komputer", "Etika Profesi TI"];
export const RANK_ROWS = [
  { name: "Aulia Rahmawati", nim: "2310114002", total: 33 },
  { name: "Intan Kusuma Dewi", nim: "2310114040", total: 32 },
  { name: "Eka Fitriani", nim: "2310114019", total: 31 },
  { name: "Nadia Putri Maharani", nim: "2310114028", total: 28, me: true },
  { name: "Fajar Nugroho", nim: "2310114023", total: 28 },
  { name: "Nabila Zahra", nim: "2310114061", total: 29 },
  { name: "Gita Permata Sari", nim: "2310114031", total: 21 },
  { name: "Dimas Aryo Wibowo", nim: "2310114015", total: 20 },
  { name: "Cahya Ningrum", nim: "2310114011", total: 22 },
  { name: "Laras Wulandari", nim: "2310114052", total: 19 },
].sort((a, b) => b.total - a.total || a.name.localeCompare(b.name));

export type Article = {
  id: string; title: string; author: string; prodi: string; when: string; readers: number; tag: string; comments: number; body: string;
};
export const ARTICLES: Article[] = [
  {
    id: "a1", title: "Normalisasi tanpa pusing: dari 1NF sampai BCNF lewat satu studi kasus",
    author: "Rafi Hidayat", prodi: "Sistem Informasi", when: "Kemarin", readers: 214, tag: "Basis Data", comments: 5,
    body: `Banyak dari kita menghafal definisi normalisasi, tetapi baru paham ketika melihat satu tabel yang *berantakan* dirapikan langkah demi langkah. Catatan ini memakai satu kasus: tabel pesanan kantin kampus.
## Mulai dari tabel yang berantakan
Bayangkan satu tabel \`pesanan\` yang menyimpan nama pembeli, daftar menu (dipisah koma), harga, dan nama penjual dalam satu baris. Masalahnya jelas: satu sel berisi banyak nilai, dan nama penjual berulang di mana-mana.
## 1NF: satu sel, satu nilai
Pecah daftar menu menjadi baris-baris terpisah. Setiap baris hanya memuat satu menu untuk satu pesanan.
- Hilangkan kolom berisi daftar
- Tentukan kunci utama gabungan: \`id_pesanan\` + \`id_menu\`
- Pastikan tidak ada grup berulang
## 2NF dan 3NF: buang ketergantungan yang tidak perlu
Harga menu hanya bergantung pada \`id_menu\`, bukan pada pesanan. Pindahkan ke tabel \`menu\`. Nama penjual bergantung pada menu, bukan pesanan, jadi pindahkan lagi ke tabel \`penjual\`.
> Aturan praktis: setiap kolom harus menjawab satu pertanyaan, "ini fakta tentang apa?"
## BCNF: kapan perlu?
Jika ada determinan yang bukan kunci kandidat, pecah lagi. Di kasus kantin, hal ini muncul ketika satu penjual hanya menempati satu kios. Coba periksa sendiri dan diskusikan di kolom komentar.`,
  },
  {
    id: "a2", title: "Kapan sebenarnya kita butuh useMemo? Catatan dari proyek akhir Pemrograman Web",
    author: "Salsabila Nur", prodi: "Sistem Informasi", when: "2 hari lalu", readers: 156, tag: "Pemrograman Web", comments: 2,
    body: `Waktu mengerjakan proyek akhir, saya sempat membungkus semua hitungan dengan \`useMemo\`. Hasilnya kode jadi sulit dibaca dan performa tidak berubah.
## Ukur dulu, optimalkan kemudian
Gunakan React Profiler. Jika sebuah komponen render kurang dari 1 ms, memoization justru menambah beban.
- Hitungan berat, misalnya memfilter 10.000 baris data
- Objek atau fungsi yang dikirim ke komponen anak yang sudah di-*memo*
> Optimasi tanpa pengukuran hanyalah dekorasi.`,
  },
  {
    id: "a3", title: "Menyusun kuesioner usability yang tidak menggiring jawaban",
    author: "Raka Pratama", prodi: "Sistem Informasi", when: "3 hari lalu", readers: 98, tag: "IMK", comments: 1,
    body: `Pertanyaan seperti "Seberapa mudah aplikasi ini digunakan?" sudah menggiring responden ke jawaban positif. Berikut tiga cara membuatnya lebih netral.
## Gunakan skala yang seimbang
Sediakan pilihan negatif dan positif dalam jumlah sama, misalnya sangat sulit sampai sangat mudah.`,
  },
  {
    id: "a4", title: "Uji hipotesis dalam 10 menit: memilih uji-t atau Mann-Whitney",
    author: "Dimas Aryo", prodi: "Sistem Informasi", when: "5 hari lalu", readers: 87, tag: "Statistika", comments: 0,
    body: `Sebelum membuka SPSS, jawab dua pertanyaan: apakah datamu berdistribusi normal, dan apakah sampelnya independen?`,
  },
];
export const excerpt = (body: string) => {
  const p = body.split("\n").map((x) => x.trim()).find((x) => x && !/^(#|>|-|```)/.test(x)) ?? "";
  return p.replace(/[*`_]|\[([^\]]+)\]\([^)]+\)/g, "$1");
};

export const COMMENTS = [
  { id: "k1", author: "Aulia Rahmawati", when: "20 jam lalu", text: "Bagian BCNF-nya jelas banget, makasih Kak! Studi kasus kantin lebih mudah dibayangkan daripada slide dosen.", replies: [
    { author: "Rafi Hidayat", when: "18 jam lalu", text: "Sama-sama Aulia! Kalau mau latihan, coba normalisasi tabel peminjaman buku perpustakaan.", writer: true },
    { author: "Bagas Setiawan", when: "15 jam lalu", text: "Nah itu juga muncul di kuis tahun lalu." },
  ]},
  { id: "k4", author: "Hanif Maulana", when: "9 jam lalu", text: "Kalau ada ketergantungan multivalued, lanjut ke 4NF ya?", replies: [
    { author: "Rafi Hidayat", when: "7 jam lalu", text: "Betul. Akan saya bahas di tulisan lanjutan.", writer: true },
  ]},
];

export const MY_POSTS = [
  { status: "draft", title: "Catatan indeks komposit untuk query yang lambat", when: "2 jam lalu" },
  { status: "published", title: "Rangkuman ERD: dari kebutuhan bisnis ke tabel", when: "3 hari lalu", readers: 64, comments: 4 },
  { status: "archived", title: "Panduan Git untuk tugas kelompok", when: "2 minggu lalu" },
];

export const CHAT: { id: string; from: "pj" | "me" | "other"; name?: string; text: string; time: string; pinned?: boolean; deleted?: boolean; hidden?: boolean; reply?: { name: string; text: string }; edited?: boolean; day?: string }[] = [
  { id: "1", from: "other", name: "Dimas Aryo", text: "Pengumuman: kuis normalisasi hari Kamis pukul 10.00 di Lab 3. Bawa kalkulator dan kartu mahasiswa.", time: "07.12", pinned: true, day: "Kemarin" },
  { id: "2", from: "other", name: "Aulia Rahmawati", text: "Kak, materi kuisnya sampai bab berapa ya?", time: "08.40", day: "Hari ini" },
  { id: "3", from: "other", name: "Dimas Aryo", text: "Sampai bab 4 (normalisasi). Slide-nya sudah ada di drive kelas.", time: "08.43", reply: { name: "Aulia Rahmawati", text: "Kak, materi kuisnya sampai bab berapa ya?" } },
  { id: "4", from: "other", name: "Intan Kusuma Dewi", text: "Ada yang punya catatan BCNF? Aku ketinggalan pertemuan kemarin.", time: "10.02" },
  { id: "5", from: "other", name: "Nabila Zahra", text: "", time: "10.40", deleted: true },
  { id: "6", from: "me", text: "Ringkasannya juga sudah kutulis di Karsa Lib, cari judul 'Normalisasi tanpa pusing'.", time: "11.55", edited: true },
  { id: "7", from: "other", name: "Aulia Rahmawati", text: "Mantap, langsung kubaca!", time: "12.30" },
];

export const LEGAL = legal as {
  terms: { title: string; summary: string; sections: { h: string; p: string[] }[] };
  privacy: { title: string; summary: string; sections: { h: string; p: string[] }[] };
};
export const LEGAL_VERSION = "1.1";
export const LEGAL_EFFECTIVE = "6 Oktober 2026";
export const LEGAL_CONTACT = "admin@sikarsa.id";
