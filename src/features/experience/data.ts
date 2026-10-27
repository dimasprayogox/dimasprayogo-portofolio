import { Experience } from "@/types";

export const MOCK_EXPERIENCES: Experience[] = [
  {
    id: "1",
    role: "Software Engineer (Magang)",
    company: "PT. Marstech Global",
    period: "Juli 2025 – September 2025",
    location: "Madiun, Jawa Timur, Indonesia",
    description: [
      "Berkontribusi dalam pengembangan aplikasi web berbasis Next.js untuk sistem manajemen aset perusahaan manufaktur.",
      "Mengembangkan fitur berdasarkan kebutuhan multi-role user, termasuk pengelolaan aset dan hak akses pengguna.",
      "Menerapkan komponen reusable dan struktur kode yang terorganisir untuk mendukung pengembangan dan pemeliharaan aplikasi.",
      "Berkolaborasi dengan tim dalam proses analisis kebutuhan, pengembangan, debugging, dan pengujian aplikasi.",
      "Melakukan troubleshooting dan perbaikan bug untuk meningkatkan stabilitas dan fungsionalitas aplikasi.",
    ],
    skills: ["Next.js", "Express.js", "Knex", "MySQL", "JavaScript", "Troubleshooting"],
  },
  {
    id: "2",
    role: "IT Support Staff (Magang)",
    company: "UPT Komputer Universitas PGRI Madiun",
    period: "November 2020 – Maret 2021",
    location: "Madiun, Jawa Timur, Indonesia",
    description: [
      "Merancang dan mengembangkan sistem, termasuk desain web dan pembuatan database.",
      "Membantu perbaikan dan perakitan perangkat keras seperti komputer dan printer, serta mengatasi troubleshooting sistem operasi dan aplikasi komputer.",
      "Berkomunikasi secara efektif dengan atasan dan rekan kerja untuk kebutuhan proyek dan penyelesaian tugas-tugas yang diberikan oleh atasan.",
      "Mengelola dan memastikan kelancaran operasional harian di lingkungan Universitas PGRI Madiun.",
    ],
    skills: ["Web Design", "Database", "Hardware Repair", "Troubleshooting", "System Support"],
  },
];
