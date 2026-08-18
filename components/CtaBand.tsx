import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Props = {
  title: string;
  subtitle?: string;
  label?: string;
};

export default function CtaBand({
  title,
  subtitle,
  label = "Demander un audit gratuit",
}: Props) {
  return (
    <section className="bg-terracotta">
      <div className="container py-20 md:py-28">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-coral">
            Audit gratuit
          </p>
          <div className="mt-4 h-px w-10 bg-coral" aria-hidden="true" />
          <h2 className="mt-6 text-4xl leading-tight text-white md:text-5xl">
            {title}
          </h2>
          {subtitle ? (
            <p className="mt-5 max-w-xl leading-relaxed text-white/85">
              {subtitle}
            </p>
          ) : null}
          <Link href="/contact" className="btn-on-dark mt-9">
            {label}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
