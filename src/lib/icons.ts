import {
  Activity, ArrowLeft, ArrowRight, BadgeCheck, Ban, Bold, BookOpen, BookOpenText, Building2, Check, ChevronDown,
  ChevronRight, CircleCheck, Clock, Code, Copy, Crown, EllipsisVertical, ExternalLink, Eye, EyeOff, Feather,
  FileChartColumn, FileText, FileUp, Flag, GraduationCap, Heading1, Heading2, History, Inbox, Info, Italic, Link2,
  List, LoaderCircle, Lock, LockOpen, LogOut, MessageCircle, MessagesSquare, NotebookPen, PenLine, Pencil, Pin,
  Quote, RefreshCw, Reply, Save, ScanSearch, Search, SearchX, Send, Share2, ShieldAlert, ShieldCheck, Signal,
  Sparkles, Trash2, TriangleAlert, Trophy, Upload, UserPen, UserRound, Users, Wifi, X, Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type IconCategory = "Navigasi" | "Aksi" | "Status" | "Konten" | "Komunitas";
export const ICON_CATEGORIES: IconCategory[] = ["Navigasi", "Aksi", "Status", "Konten", "Komunitas"];

export type KarsaIcon = { name: string; Icon: LucideIcon; cat: IconCategory; tags: string };

const i = (name: string, Icon: LucideIcon, cat: IconCategory, tags = ""): KarsaIcon => ({ name, Icon, cat, tags });

export const ICONS: KarsaIcon[] = [
  // Navigasi
  i("BookOpen", BookOpen, "Navigasi", "karsa lib perpustakaan tab"),
  i("MessagesSquare", MessagesSquare, "Navigasi", "grup obrolan tab"),
  i("PenLine", PenLine, "Navigasi", "input poin tulis tab"),
  i("Activity", Activity, "Navigasi", "aktivitas tab"),
  i("Trophy", Trophy, "Navigasi", "poinku peringkat tab"),
  i("UserRound", UserRound, "Navigasi", "akun profil tab"),
  i("ArrowLeft", ArrowLeft, "Navigasi", "kembali back"),
  i("ArrowRight", ArrowRight, "Navigasi", "lanjut next"),
  i("ChevronRight", ChevronRight, "Navigasi", "panah baris"),
  i("ChevronDown", ChevronDown, "Navigasi", "dropdown pilih"),
  i("EllipsisVertical", EllipsisVertical, "Navigasi", "menu titik tiga more"),
  i("ExternalLink", ExternalLink, "Navigasi", "buka tautan luar"),
  // Aksi
  i("Search", Search, "Aksi", "cari pencarian"),
  i("SearchX", SearchX, "Aksi", "tidak ketemu kosong"),
  i("ScanSearch", ScanSearch, "Aksi", "pindai periksa"),
  i("Pencil", Pencil, "Aksi", "edit ubah"),
  i("Trash2", Trash2, "Aksi", "hapus delete"),
  i("Copy", Copy, "Aksi", "salin copy"),
  i("Save", Save, "Aksi", "simpan"),
  i("Send", Send, "Aksi", "kirim"),
  i("Share2", Share2, "Aksi", "bagikan share"),
  i("Reply", Reply, "Aksi", "balas"),
  i("Upload", Upload, "Aksi", "unggah"),
  i("FileUp", FileUp, "Aksi", "impor docx berkas"),
  i("RefreshCw", RefreshCw, "Aksi", "muat ulang coba lagi"),
  i("Pin", Pin, "Aksi", "sematkan"),
  i("Flag", Flag, "Aksi", "laporkan"),
  i("LogOut", LogOut, "Aksi", "keluar logout"),
  i("X", X, "Aksi", "tutup batal"),
  i("Check", Check, "Aksi", "centang selesai"),
  // Status
  i("CircleCheck", CircleCheck, "Status", "sukses berhasil"),
  i("TriangleAlert", TriangleAlert, "Status", "peringatan warning"),
  i("Info", Info, "Status", "informasi"),
  i("ShieldAlert", ShieldAlert, "Status", "bahaya moderasi"),
  i("ShieldCheck", ShieldCheck, "Status", "aman terverifikasi"),
  i("BadgeCheck", BadgeCheck, "Status", "terverifikasi penulis"),
  i("Ban", Ban, "Status", "blokir"),
  i("Lock", Lock, "Status", "kunci terkunci"),
  i("LockOpen", LockOpen, "Status", "buka kunci"),
  i("Eye", Eye, "Status", "lihat tampilkan"),
  i("EyeOff", EyeOff, "Status", "sembunyikan"),
  i("LoaderCircle", LoaderCircle, "Status", "memuat loading spinner"),
  i("Clock", Clock, "Status", "waktu menunggu"),
  i("Wifi", Wifi, "Status", "koneksi jaringan"),
  i("Signal", Signal, "Status", "sinyal"),
  // Konten
  i("FileText", FileText, "Konten", "artikel dokumen"),
  i("FileChartColumn", FileChartColumn, "Konten", "laporan grafik"),
  i("NotebookPen", NotebookPen, "Konten", "tulisan saya catatan"),
  i("BookOpenText", BookOpenText, "Konten", "baca materi"),
  i("Feather", Feather, "Konten", "penulis bulu"),
  i("Sparkles", Sparkles, "Konten", "teman baca ai ringkasan"),
  i("Inbox", Inbox, "Konten", "kotak kosong"),
  i("History", History, "Konten", "riwayat"),
  i("Heading1", Heading1, "Konten", "editor judul h1"),
  i("Heading2", Heading2, "Konten", "editor subjudul h2"),
  i("Bold", Bold, "Konten", "editor tebal"),
  i("Italic", Italic, "Konten", "editor miring"),
  i("Code", Code, "Konten", "editor kode"),
  i("List", List, "Konten", "editor daftar"),
  i("Quote", Quote, "Konten", "editor kutipan"),
  i("Link2", Link2, "Konten", "editor tautan"),
  // Komunitas
  i("Users", Users, "Komunitas", "anggota grup"),
  i("UserPen", UserPen, "Komunitas", "profil penulis"),
  i("MessageCircle", MessageCircle, "Komunitas", "komentar diskusi"),
  i("GraduationCap", GraduationCap, "Komunitas", "prodi mahasiswa kampus"),
  i("Building2", Building2, "Komunitas", "fakultas gedung"),
  i("Crown", Crown, "Komunitas", "juara 1 peringkat"),
  i("Zap", Zap, "Komunitas", "poin cepat"),
];
