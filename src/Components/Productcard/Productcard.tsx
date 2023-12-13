import ImagePrpduct from "../Image_component/ImagePrpduct";
import Button from "../Ui/Button";
import { Iproducts } from "../Shared_Interfaces/Interfavess";
import { cutText } from "../utilis/Textslics";

interface Iprops {
  product: Iproducts;
}
const Productcard = ({ product }: Iprops) => {
  const { title, description, imageURL, price , category } = product;
  return (
    <div className="max-w-sm  text-white lg:max-w-lg mx-auto md:mx-auto lg:me-2 flex flex-col border rounded-md p-2 ">
      <ImagePrpduct
        src={imageURL}
        alt="product-image"
        className=" w-full rounded-lg mb-2 max-h-52  "
      />
      <h3>{title}</h3>
      <p>{cutText(description)}</p>
      <div className="circles flex items-center my-3 space-x-2">
        <div className="w-5 h-5 bg-indigo-700 rounded-full cursor-pointer"></div>
        <div className="w-5 h-5 bg-yellow-700 rounded-full cursor-pointer"></div>
        <div className="w-5 h-5 bg-red-700 rounded-full cursor-pointer"></div>
      </div>

      <div className="flex  items-center  justify-between">
        <span>${price}</span>

        <ImagePrpduct
          src={category.imageURL}
          className="w-14 h-14 rounded-full"
        />
      </div>

      <div className="flex justify-around mt-2 space-x-2 items-center">
        <Button
          width={"w-40"}
          className="bg-indigo-600"
        
        >
          Edit
        </Button>
        <Button
          width={"w-40"}
          className="bg-teal-600"
         
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default Productcard;
