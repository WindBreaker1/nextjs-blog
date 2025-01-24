"use client";

import UserForm from "@/components/userForm/userForm";
import Link from "next/link";

export default function Home() {

  return (
    <div className="page">
      <h1>Home Page</h1>
      <UserForm />
      <Link href="/blog">Go to Blog</Link>
    </div>
  );
}
