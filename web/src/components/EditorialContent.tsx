import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "./DesignIcons";
import styles from "./EditorialContent.module.css";

export function ContentNavigation({ title, items }: {
  title: string;
  items: { id: string; label: string }[];
}) {
  return (
    <nav className={styles.contents} aria-label={`${title} 목차`}>
      <span className="eyebrow">CONTENTS</span>
      <p>{title}</p>
      <ol>
        {items.map((item, index) => (
          <li key={item.id}>
            <a href={`#${item.id}`}>
              <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <span>{item.label}</span>
              <ArrowRight width="15" height="15" />
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function ContentHeading({ number, title, id }: { number: string; title: string; id?: string }) {
  return (
    <div className={styles.heading}>
      <span aria-hidden="true">{number}</span>
      <h2 id={id}>{title}</h2>
    </div>
  );
}

export function ServiceContact({ title, href, label }: { title: string; href: string; label: string }) {
  return (
    <div className={styles.contact}>
      <div><span className="eyebrow">LET’S TALK</span><h2>{title}</h2></div>
      <Link href={href} className="btn-primary">{label}<ArrowUpRight width="20" height="20" /></Link>
    </div>
  );
}
