import { type Card } from "../../types/component";

const ProductCard = (props: Card) => {
  return (
    <div
      className={`${props.bgColor} rounded-2xl px-8 pt-8 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 h-full flex flex-col`}
    >
      {/* Icon */}
       <div
        className={`${props.iconBg} w-14 h-14 rounded-xl flex items-center justify-center mb-6`}
      >
        {props.icon}
      </div>

      {/* Title & Description */}
      <h3 className="text-xl font-semibold text-gray-900 mb-3 ">
        {props.title}
      </h3>
      <p className="text-gray-600">{props.description}</p>

      {/* Image pinned to bottom */}
      <div className="mt-auto flex justify-center">
        <img
          src={props.image}
          alt={props.title}
          className="mt-6 object-contain max-w-full"
        />
      </div>
    </div>
  );
};

export default ProductCard;
