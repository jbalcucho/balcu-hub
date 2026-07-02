import LoginButton from "@/components/LoginButton";

export default function AdminLoginPage() {
  return (
    <main className="container-app flex min-h-[70vh] items-center justify-center py-16">
      <section className="card w-full max-w-md text-center">
        <p className="text-sm uppercase tracking-[0.2em] text-[var(--muted)]">
          Admin
        </p>
        <h1 className="hero-title mt-2 text-3xl font-semibold">
          Balcu Hub
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
          Solo la cuenta autorizada puede gestionar publicaciones y ver el panel
          de administración.
        </p>
        <div className="mt-6 flex justify-center">
          <LoginButton variant="admin" />
        </div>
      </section>
    </main>
  );
}
