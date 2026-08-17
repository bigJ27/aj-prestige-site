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
      <div className="container flex flex-col items-center gap-6 py-16 text-center md:py-20">
        <h2 className="max-w-3xl text-3xl text-white md:text-4xl">{title}</h2>
        {subtitle ? (
          <p className="max-w-xl text-white/85">{subtitle}</p>
        ) : null}
        <Link href="/contact" className="btn-on-dark">
          {label}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
