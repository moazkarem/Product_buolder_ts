import { ChangeEvent, FormEvent, useState } from "react";
import { Productdata, dataInputs } from "./Components/Data/data";
import Productcard from "./Components/Productcard/Productcard";
import Modal from "./Components/Ui/Modal";
import Button from "./Components/Ui/Button";
import Input from "./Components/Ui/Input";
import { Iproducts } from "./Components/Shared_Interfaces/Interfavess";
import { errFunction } from "./Components/Validation";
const Myproducts = Productdata.map((product) => (
  <Productcard key={product.id} product={product} />
));



const App = () => {
  const defaultobj = {
    title: '',
      description: '',
      imageURL: '',
      price: '',
      colors:[],
      category:{
        name:'',
        imageURL:''
      }
  }
  const [products , setproducts] = useState<Iproducts>( defaultobj)
/*______________ Handeler Functions ________ */
  const changeHandeler = (e:ChangeEvent<HTMLInputElement>)=>{
    const {value , name} = e.target
    setproducts({
     ...products ,
     [name]: value
    })

   
}




/*______________ Handeler Functions ________ */
const inputs = dataInputs.map((input) => (
  <div key={input.id} className="flex flex-col">
    <label htmlFor={input.id} className="mb-[1px] font-medium text-sm text-gray-700">{input.label}</label>
    <Input onChange={changeHandeler} name={input.name} value={products[input.name]} type={input.type} id={input.id} />
  </div>
));


const submitHandeler = (e:FormEvent<HTMLFormElement>)=>{
 e.preventDefault();
 const errors =errFunction({title:products.title , description:products.description , imageURL:products.imageURL , price:products.price})
 console.log(errors);

 
 
}

const canselHandeler = ()=>{
  setproducts(defaultobj)
  closeModal()
}
/*__________Modal Functions ____________ */
  const [isOpen, setIsOpen] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    console.log("Modal opened!");
    setIsOpen(true);
  }
 
 
  return (
    <main className="container mx-auto">
      <Button width={"w-52"} className={"bg-red-500  m-5"} onClick={openModal}>
        Open modal
      </Button>
      <div className="m-5 grid grid-cols-1 md:gap-4 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {Myproducts}
      </div>
      <Modal closeModal={closeModal} isOpen={isOpen} title="Add New Product">
      <form onSubmit={submitHandeler} className="space-y-3">
      {inputs}
      <div className="space-x-3  flex justify-center items-center">
          <Button width={"w-44"} className="bg-gray-900 " onClick={closeModal}>
            Submit
          </Button>
          <Button width={"w-44"} className="bg-gray-300 " onClick={canselHandeler}>
            Cancel
          </Button>
         
        </div>
      </form>
       
      </Modal>
    </main>
  );
};

export default App;
