/**
 * Petites icônes du site, dessinées au trait (même épaisseur, mêmes arrondis)
 * pour rester cohérentes entre elles. Elles prennent la couleur du texte.
 * Aucune bibliothèque d'icônes n'est chargée : le site n'en utilise que dix.
 */
type IconProps = { className?: string; size?: number };

function Trait({
  children,
  className,
  size = 20,
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function IconArrow(props: IconProps) {
  return (
    <Trait {...props}>
      <path d="M4.5 12h15M13.5 6l6 6-6 6" />
    </Trait>
  );
}

export function IconPhone(props: IconProps) {
  return (
    <Trait {...props}>
      <path d="M6.6 3.5h2.5l1.5 4-2 1.4a12 12 0 0 0 6.5 6.5l1.4-2 4 1.5v2.5a2.1 2.1 0 0 1-2.3 2.1A17.3 17.3 0 0 1 4.5 5.8a2.1 2.1 0 0 1 2.1-2.3Z" />
    </Trait>
  );
}

export function IconMail(props: IconProps) {
  return (
    <Trait {...props}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2.2" />
      <path d="m4.5 7.5 7.5 5.6 7.5-5.6" />
    </Trait>
  );
}

export function IconPin(props: IconProps) {
  return (
    <Trait {...props}>
      <path d="M12 21s6.5-5.4 6.5-10.6a6.5 6.5 0 0 0-13 0C5.5 15.6 12 21 12 21Z" />
      <circle cx="12" cy="10.3" r="2.3" />
    </Trait>
  );
}

export function IconClock(props: IconProps) {
  return (
    <Trait {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </Trait>
  );
}

export function IconInstagram(props: IconProps) {
  return (
    <Trait {...props}>
      <rect x="4" y="4" width="16" height="16" rx="4.5" />
      <circle cx="12" cy="12" r="3.6" />
      <path d="M16.6 7.4h.01" />
    </Trait>
  );
}

export function IconCheck(props: IconProps) {
  return (
    <Trait {...props}>
      <path d="m5 12.5 4.3 4.3L19 7.2" />
    </Trait>
  );
}

export function IconMinus(props: IconProps) {
  return (
    <Trait {...props}>
      <path d="M7 12h10" />
    </Trait>
  );
}

export function IconMenu(props: IconProps) {
  return (
    <Trait {...props}>
      <path d="M4 8.5h16M4 15.5h16" />
    </Trait>
  );
}

export function IconClose(props: IconProps) {
  return (
    <Trait {...props}>
      <path d="m6 6 12 12M18 6 6 18" />
    </Trait>
  );
}

/** Logo WhatsApp (forme pleine, c'est une marque : on ne la redessine pas) */
export function IconWhatsApp({ className, size = 20 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

/** Cinq étoiles pleines (note Google) */
export function Stars({ className }: { className?: string }) {
  return (
    <span className={`stars ${className ?? ""}`} aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} viewBox="0 0 20 20" width="15" height="15" fill="currentColor">
          <path d="M10 1.6l2.47 5.2 5.68.66-4.2 3.9 1.12 5.62L10 14.2l-5.07 2.78 1.12-5.62-4.2-3.9 5.68-.66L10 1.6z" />
        </svg>
      ))}
    </span>
  );
}
