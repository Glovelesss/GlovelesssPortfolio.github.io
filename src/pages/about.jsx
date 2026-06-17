import PageTransition from "../Components/PageTransition";

export default function About() {
  return (
    <PageTransition>
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl">
          <h1 className="text-5xl font-bold text-(--text) mb-6">Over Mij</h1>
          <p className="text-lg text-(--muted) leading-relaxed mb-6">
            Ik ben 19 jaar oud en woon in Houten. Ik heb ervaring met het ontwikkelen van interactieve ervaringen en applicaties met behulp van diverse technologieën.
          </p>
          <h2 className="text-2xl font-semibold text-(--text) mb-4">Skills & Ervaring</h2>
          <ul className="list-disc list-inside text-lg text-(--muted) leading-relaxed space-y-2">
            <li>Unreal Engine</li>
            <li>Unity</li>
            <li>C#</li>
            <li>TypeScript</li>
            <li>XR Development</li>
          </ul>
        </div>
      </main>
    </PageTransition>
  );
}