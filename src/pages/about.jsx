import PageTransition from "../Components/PageTransition";

export default function About() {
  return (
    <PageTransition>
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl">
          <h1 className="text-5xl font-bold text-(--text) mb-6">Over Mij</h1>
          <p className="text-lg text-(--muted) leading-relaxed">
            Hier komt straks info over jou: je bio, skills, ervaring en meer.
          </p>
        </div>
      </main>
    </PageTransition>
  );
}