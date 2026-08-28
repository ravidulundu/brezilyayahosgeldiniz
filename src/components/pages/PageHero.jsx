export function PageHero({ title, text, image, imageAlt = title }) {
  return (
    <section className="page-hero">
      {image && <img src={image} alt={imageAlt} />}
      <div className="page-hero-shade" />
      <div className="container">
        <h1>{title}</h1>
        {text && <p>{text}</p>}
      </div>
    </section>
  );
}
