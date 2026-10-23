import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import Reveal from "@/components/Reveal";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";

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
    <section className="pb-3 md:pb-5" aria-label="Demander un audit gratuit">
      <div className="panel-dark">
        <div className="cta-glow" aria-hidden="true" />
        <Reveal className="cta-panel">
          <h2 className="display mx-auto max-w-3xl">{title}</h2>
          {subtitle ? <p className="lead lead-dark">{subtitle}</p> : null}
          <div className="cta-actions">
            <Link href="/contact" className="btn btn-primary btn-lg">
              {label}
              <ArrowRight className="arrow h-4 w-4" aria-hidden="true" />
            </Link>
            <a href={`tel:${PHONE_TEL}`} className="btn btn-ghost-dark btn-lg">
              <Phone className="h-4 w-4" aria-hidden="true" />
              {PHONE_DISPLAY}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
