# AniHub

Welcome to the revamped AniHub project!

![Alt text](https://github.com/Kurler3/anihub-next/public/homepage.png)

## Overview

This project is a special journey for me, and I'm excited to share it with you. It's an anime-focused community platform where users can search for anime, connect with other enthusiasts, create watchlists, and engage in discussions.

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/Kurler3/anihub-next.git
    ```

2. **Navigate to the project directory:**

    ```bash
    cd anihub-next
    ```

3. **Install dependencies:**

    ```bash
    npm install
    ```

4. **Generate Prisma:**

    ```bash
    npx prisma generate
    ```

## Setting up Environment Variables

Create a `.env` file in the root of your project and add the following variables:

```env
DATABASE_URL=your_database_url
NEXT_PUBLIC_APP_URL=your_app_url
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Supabase Configuration

To use this project, you need to create a new project on Supabase. Retrieve the SUPABASE_URL and SUPABASE_ANON_KEY from your project settings and set them as the values for NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env file.

## Usage

Run the development server:

```bash
npm run dev
```

Open your browser and navigate to http://localhost:3000 to explore AniHub!
