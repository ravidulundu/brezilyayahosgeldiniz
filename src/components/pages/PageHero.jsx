export function PageHero({ title, text, image, imageAlt = title }) {
  return (
    <section className="page-hero">
      {image && (
        <img
          src={image}
          srcSet={`${image.replace(/\.webp$/, "-800.webp")} 800w, ${image} 1024w`}
          sizes="100vw"
          alt={imageAlt}
          fetchPriority="high"
        />
      )}
      <div className="page-hero-shade" />
      <div className="container">
        <h1>{title}</h1>
        {text && <p>{text}</p>}
      </div>
    </section>
  );
}
