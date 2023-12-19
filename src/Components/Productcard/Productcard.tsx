import ImagePrpduct from "../Image_component/ImagePrpduct";
import Button from "../Ui/Button";
import { Iproducts } from "../Shared_Interfaces/Interfavess";
import { cutText } from "../utilis/Textslics";
import Circle from "../Circles/Circle";

interface Iprops {
  product: Iproducts;
  setEditproduct:(product:Iproducts)=>void
  openModalEdit:()=>void ,
  setindexproduct:(val:number)=>void,
  idx:number
}


const Productcard = ({ product , setEditproduct , openModalEdit , setindexproduct , idx}: Iprops) => {

  /* _______________ Edit Handeler _________ */

const editHandeler = ()=>{
  setEditproduct(product)
  openModalEdit()
  setindexproduct(idx)
  
}
  const { title, description, imageURL, price , category , colors } = product;
  const circles = colors.map(color => <Circle key={color} color={color} />)
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
  {circles}
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
        onClick={editHandeler
        }
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


