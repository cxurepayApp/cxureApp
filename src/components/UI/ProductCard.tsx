import { Card } from "../../types/component"

const ProductCard = (props:Card) => {
  return (
   <>
   <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-[#e2e4fa] rounded-2xl px-8 pt-8 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1">
              <div className="bg-blue-300 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                {props.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
               {props.title}
              </h3>
              <p className="text-gray-600">
               {props.description}
              </p>
              <img src={props.image} alt="" className="mt-6 " />
            </div>
   </div>
   </>
  )
}

export default ProductCard