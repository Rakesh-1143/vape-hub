import { useRef, useState } from "react";
import { useMotionValue, useSpring } from "motion/react";
import * as m from "motion/react-m";
import { ArrowUpRight, Phone } from "lucide-react";
import { useMediaQuery } from "../../../lib/useMediaQuery";
import { categories, type ProductCategory } from "../data/content";
import { store } from "../data/store";
import { CategoryVisual } from "./CategoryVisual";
function CategoryCard({
  category,
  select,
}: {
  category: ProductCategory;
  select: (id: string) => void;
}) {
  const finePointer = useMediaQuery("(hover: hover) and (pointer: fine)");
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const enabled = finePointer && !reduced;
  const box = useRef<DOMRect | null>(null);
  const x = useMotionValue(0),
    y = useMotionValue(0);
  const rotateX = useSpring(x, { stiffness: 180, damping: 25 });
  const rotateY = useSpring(y, { stiffness: 180, damping: 25 });
  return (
    <m.a
      href={`#category-${category.id}`}
      className={`universe-card tone-${category.accent}`}
      onClick={() => select(category.id)}
      style={{ rotateX, rotateY }}
      onPointerEnter={(event) => {
        box.current = event.currentTarget.getBoundingClientRect();
      }}
      onPointerMove={(event) => {
        const rect = box.current;
        if (enabled && rect) {
          x.set(-((event.clientY - rect.top) / rect.height - 0.5) * 5);
          y.set(((event.clientX - rect.left) / rect.width - 0.5) * 5);
        }
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      onBlur={() => {
        x.set(0);
        y.set(0);
      }}
    >
      <div className="universe-art">
        <CategoryVisual kind={category.kind} />
      </div>
      <div className="universe-copy">
        <h3>{category.name}</h3>
        <p>{category.description}</p>
        <span>
          Explore <ArrowUpRight size={18} aria-hidden="true" />
        </span>
      </div>
    </m.a>
  );
}
export function ProductCategories() {
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <section
      id="collection"
      className="product-universe"
      aria-labelledby="collection-title"
    >
      <div className="universe-heading">
        <h2 id="collection-title">
          A world of
          <br />
          possibilities.
        </h2>
        <div>
          <p>
            Explore our product categories.
            <br />
            See the current selection in store.
          </p>
          <a href="#our-store" className="text-link">
            Visit the store <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </div>
      </div>
      <div className="universe-grid">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            select={setSelected}
          />
        ))}
      </div>
      <div className="category-details">
        {categories.map((category) => (
          <article
            id={`category-${category.id}`}
            key={category.id}
            hidden={selected !== category.id}
            aria-label={`${category.name} information`}
          >
            <h3>{category.name}</h3>
            <p>
              {category.guidance} Selection changes; call for current
              availability.
            </p>
            <a className="text-link" href={store.telephone}>
              Call the store <Phone size={16} aria-hidden="true" />
            </a>
          </article>
        ))}
      </div>
      <p className="universe-note">
        Illustrations are original category studies. No prices or live inventory
        are shown.
      </p>
    </section>
  );
}
