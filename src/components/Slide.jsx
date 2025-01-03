import PropTypes from "prop-types";

export default function Slide({ title, subtitle }) {
  return (
    <section className="flex items-center justify-center bg-blue-500 text-white">
      <div className="mx-auto my-16 w-11/12 max-w-screen-xl space-y-4 text-center sm:my-20 md:my-24 lg:my-28">
        <h2 className="text-3xl font-semibold sm:text-4xl md:text-5xl">
          {title}
        </h2>
        <p className="mx-auto max-w-prose">{subtitle}</p>
      </div>
    </section>
  );
}

Slide.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};
