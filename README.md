# Portfolio Management API
API ini memungkinkan pengguna untuk mengelola portofolio, termasuk menambahkan, memperbarui, dan menghapus proyek terkait. Aplikasi ini menggunakan **Node.js**, **Express**, dan **Sequelize ORM** dengan **MySQL** sebagai basis data.

## Prasyarat

- Node.js
- MySQL
- Sequelize CLI

## Langkah-langkah Instalasi

### 1. Clone Repository

Clone repository ini ke dalam lokal Anda:

```bash
git clone <repository-url>
cd <nama-folder-repository>
```
### 2. Install Dependensi

Jalankan perintah berikut untuk menginstal dependensi:

```bash
npm install
```
### 3. Konfigurasi Database

Buat file `.env` di root folder dan tambahkan konfigurasi database Anda:

```plaintext
DB_HOST=yourhost
DB_USER=yourroot
DB_PASSWORD=yourpassword
DB_NAME=yourdatabase
DB_DIALECT=mysql
DB_PORT=yourport
```
### 4. Membuat Database

Gunakan perintah berikut untuk membuat database:

```bash
npx sequelize-cli db:create
```

### 5. Migrasi Database

Jalankan migrasi untuk membuat tabel yang diperlukan dalam database:

```bash
npx sequelize-cli db:migrate
```
### 6. Menjalankan Seeder (Opsional)

Untuk mengisi data awal pada tabel `Users` dan `Portfolios`, jalankan seed berikut:

```bash
npx sequelize-cli db:seed:all
```
### 7. Menjalankan Server

Jalankan server lokal menggunakan perintah berikut:

```bash
npm run dev
```

Server akan berjalan pada `http://localhost:3000`.

---
## Endpoint API

### Users
- **POST** `/users` - Menambahkan user baru.
- **GET** `/users` - Mengambil semua data user.
- **GET** `/users/:id` - Mengambil data user berdasarkan ID.
- **PUT** `/users/:id` - Memperbarui data user berdasarkan ID.
- **DELETE** `/users/:id` - Menghapus user berdasarkan ID.
### Portfolios
- **POST** `/portfolios` - Menambahkan portfolio baru.
- **GET** `/portfolios` - Mengambil semua data portfolio.
- **GET** `/portfolios/:id` - Mengambil data portfolio berdasarkan ID.
- **PUT** `/portfolios/:id` - Memperbarui data portfolio berdasarkan ID.
- **DELETE** `/portfolios/:id` - Menghapus portfolio berdasarkan ID.