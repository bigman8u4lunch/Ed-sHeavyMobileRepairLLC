import Image from "next/image";

export default function PageHeader({
  title,
  subtitle,
  image,
  imageAlt,
}: {
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
}) {
  return (
    <section className="page-header has-image">
      <div className="page-header-bg">
        <Image src={image} alt={imageAlt} fill style={{ objectFit: "cover" }} priority />
      </div>
      <div className="container page-header-content">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
    </section>
  );
}
