"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

type LoginButtonProps = {
  variant?: "header" | "admin";
};

export default function LoginButton({ variant = "header" }: LoginButtonProps) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <span className="text-sm text-[var(--muted)]">Cargando…</span>
    );
  }

  if (session?.user?.isAdmin) {
    return (
      <div className="flex items-center gap-2">
        {variant === "header" ? (
          <Link href="/admin" className="btn-ghost text-sm">
            Admin
          </Link>
        ) : null}
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/" })}
          className="btn-ghost text-sm"
        >
          Salir
        </button>
      </div>
    );
  }

  if (variant === "admin") {
    return (
      <button
        type="button"
        onClick={() => signIn("google", { callbackUrl: "/admin" })}
        className="btn-primary"
      >
        Entrar con Google
      </button>
    );
  }

  return (
    <Link href="/admin/login" className="btn-ghost text-sm">
      Admin
    </Link>
  );
}
