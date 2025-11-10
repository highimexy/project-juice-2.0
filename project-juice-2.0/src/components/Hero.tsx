type HeroProps = {
  title?: string;
  description?: string;
};

function Hero({ title = "Title", description = "Description" }: HeroProps) {
  return (
    <>
      <div className="content-wrapper-left">
        <h1 className="hero-h1">{title}</h1>
        <p>{description}</p>
      </div>
    </>
  );
}
 
export default Hero;
