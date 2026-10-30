import { Project } from "@/types";

export const MOCK_PROJECTS: Project[] = [
  {
    id: "1",
    slug: "decentrashare-blockchain",
    title: "DecentraShare – Sistem File Sharing Berbasis Blockchain",
    description:
      "Sistem file sharing berbasis web yang mengintegrasikan PostgreSQL, IPFS, dan blockchain Ethereum untuk pengelolaan file dan metadata terdesentralisasi.",
    longDescription:
      "Merancang dan mengembangkan sistem file sharing berbasis web yang mengintegrasikan database PostgreSQL, IPFS, dan blockchain Ethereum untuk pengelolaan file dan metadata. Mengembangkan backend REST API menggunakan Express.js, TypeScript, dan Prisma ORM serta mengimplementasikan smart contract menggunakan Solidity untuk pencatatan metadata file pada blockchain. Mengintegrasikan IPFS dan MetaMask untuk penyimpanan file terdesentralisasi serta autentikasi dan transaksi berbasis blockchain.",
    tags: [
      "SvelteKit",
      "Express.js",
      "TypeScript",
      "Prisma ORM",
      "PostgreSQL",
      "Solidity",
      "Ethereum",
      "IPFS",
      "MetaMask",
    ],
    githubUrl: "https://github.com/dimasprayogox",
    demoUrl: "",
    imageUrl:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80",
    ],
    featured: true,
    orderIndex: 0,
    createdAt: "2026-07-01T00:00:00.000Z",
  },
  {
    id: "2",
    slug: "work-order-asset-management",
    title: "Work Order – Sistem Manajemen Aset dan Work Order",
    description:
      "Sistem CMMS berbasis web untuk pengelolaan dan proses maintenance aset perusahaan manufaktur dengan role-based access.",
    longDescription:
      "Mengembangkan sistem CMMS berbasis web untuk pengelolaan dan proses maintenance aset pada perusahaan manufaktur. Membangun fitur manajemen aset, work order, dan role-based access. Mengembangkan aplikasi secara end-to-end, mulai dari perancangan, implementasi, hingga pengujian dibawah pengawasan Project Manager PT. Marstech Global.",
    tags: ["Next.js", "Express.js", "Knex", "MySQL"],
    githubUrl: "https://github.com/dimasprayogox",
    demoUrl: "",
    imageUrl:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    ],
    featured: true,
    orderIndex: 1,
    createdAt: "2025-09-01T00:00:00.000Z",
  },
];
