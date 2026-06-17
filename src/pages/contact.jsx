import PageTransition from "../Components/PageTransition";

export default function Contact() {
  return (
    <PageTransition>
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl">
          <h1 className="text-5xl font-bold text-(--text) mb-6">Contact</h1>
          <p className="text-lg text-(--muted) leading-relaxed mb-8">
            Wil je samenwerken, heb je een vraag, of wil je gewoon even hallo zeggen? Neem gerust contact op!
          </p>

          <div className="flex flex-col gap-4">
            {/* Email */}
            <a
              href="mailto:casperwinkel4@gmail.com"
              className="flex items-center gap-4 p-4 rounded-xl bg-(--surface) border border-(--bordercolor) hover:border-(--accent) hover:bg-(--accent)/5 transition-all group"
            >
              <div className="w-12 h-12 rounded-lg bg-(--accent)/10 flex items-center justify-center text-(--accent) group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-(--muted)">E-mail</p>
                <p className="text-(--text) font-medium group-hover:text-(--accent) transition-colors">casperwinkel4@gmail.com</p>
              </div>
            </a>
          </div>
        </div>
      </main>
    </PageTransition>
  );
}