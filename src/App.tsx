import { ChangeEvent, FormEvent, useState } from "react";
import {
  CategData,
  Productdata,
  colors__circle,
  dataInputs,
} from "./Components/Data/data";
import Productcard from "./Components/Productcard/Productcard";
import Modal from "./Components/Ui/Modal";
import Button from "./Components/Ui/Button";
import Input from "./Components/Ui/Input";
import { Iproducts } from "./Components/Shared_Interfaces/Interfavess";
import { errValidation } from "./Components/Validation";
import Errormsg from "./Components/Error/Errormsg";
import Circle from "./Components/Circles/Circle";
import Selectmenue from "./Components/Ui/Selectmenue";
import { Tproductsname } from "./Components/Types/Types";

const App = () => {
  const defaultobj = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: [],
    category: {
      name: "",
      imageURL: "",
    },
  };
  const [tempColor, setTempColor] = useState<string[]>([]);
  const [Myproductsarr, setMyproductsarr] = useState(Productdata);
  const[indexproduct , setindexproduct]=useState<number>(0)
  const [selected, setSelected] = useState(CategData[0]);
  const [editproduct , setEditproduct] = useState<Iproducts>(defaultobj)
  const [isOpenEdit, setisOpenEdit] = useState(false);
  const [isOpenDel, setisOpenDel] = useState(false);
  const[productdescripe ,setproductdescripe] = useState<Iproducts>(defaultobj)
    /*_______________________________ function Modals Edit_____________ */
    function closeModalEdit() {
      setisOpenEdit(false);
    }
  
    function openModalEdit() {
      setisOpenEdit(true);
    }
      /*_______________________________ function Modals delete */
      function closeModalDel() {
        setisOpenDel(false);
      }
    
      function openModalDel() {
        setisOpenDel(true);
      }
  const Myproducts = Myproductsarr.map((product , idx) => (
    <Productcard setproductdescripe={setproductdescripe} key={product.id} product={product} idx={idx} setindexproduct={setindexproduct} setEditproduct={setEditproduct} openModalEdit={openModalEdit} openModalDel={openModalDel} />
  ));

  


  
  const circles = colors__circle.map((color) => (
    <Circle
      onClick={() => {
        if (tempColor.includes(color)) {
          setTempColor((prev) => prev.filter((item) => item !== color));
          return;
        }
        setTempColor((prev) => [...prev, color]);
      }}
      key={color}
      color={color}
    />
  ));




  const [products, setproducts] = useState<Iproducts>(defaultobj);
  const [errObj, seterrObj] = useState({
    title: "",
    description: "",
    imageURL: "",
    price: "",

  });

  const changeHandeler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setproducts({
      ...products,
      [name]: value,
    });

    seterrObj({
      ...errObj,
      [name]: "",
    });
  };

  const inputs = dataInputs.map((input) => (
    <div key={input.id} className="flex flex-col">
      <label
        htmlFor={input.id}
        className="mb-[1px] font-medium text-sm text-gray-700"
      >
        {input.label}
      </label>
      <Input
        onChange={changeHandeler}
        name={input.name}
        value={products[input.name]}
        type={input.type}
        id={input.id}
      />
      <Errormsg msg={errObj[input.name]} />
    </div>
  ));

  const submitHandeler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { title, description, imageURL, price } = products;
    const errors = errValidation({
      title,
      description,
      imageURL,
      price,

    });
    const hasErrmesg =
      Object.values(errors).some((val) => val === "") &&
      Object.values(errors).every((val) => val === "");
    if (!hasErrmesg) {
seterrObj(errors)
      return;
    }

    setMyproductsarr((prev) => [
      ...prev,
      {
        ...products,
        colors: tempColor,
        id: Math.ceil(Math.random() * 100).toString(),
        category: selected,
      },
    ]);
    setproducts(defaultobj);
    setTempColor([]);
    closeModal();
  };

  const canselHandeler = () => {
    setproducts(defaultobj);
    closeModal();
  };
  /*__________Modal Functions ____________ */
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

/* ______________________________ EDIT SUBMIT HANDELER ______*/





const EditSubmitHandeler = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const { title, description, imageURL, price } = editproduct;
  const errors = errValidation({
    title,
    description,
    imageURL,
    price,

  });
  const hasErrmesg =
    Object.values(errors).some((val) => val === "") &&
    Object.values(errors).every((val) => val === "");
  if (!hasErrmesg) {
seterrObj(errors)
    return;
  }

  setMyproductsarr((prev) => [
    ...prev,
    {
      ...products,
      colors: tempColor,
      id: Math.ceil(Math.random() * 100).toString(),
      category: selected,
    },
  ]);
  const update = [...Myproductsarr]
  update[indexproduct]={...editproduct , colors:tempColor.concat(editproduct.colors)}
  setMyproductsarr(update)

  setEditproduct(defaultobj);
  setTempColor([]);
  closeModalEdit();
};

const changeEditHandeler = (e: ChangeEvent<HTMLInputElement>) => {
  const { value, name } = e.target;
  setEditproduct({
    ...editproduct,
    [name]: value,
  });

  seterrObj({
    ...errObj,
    [name]: "",
  });
};

const repeatInputsEdit = (id:string , name:Tproductsname , label:string)=>{
  return(
    <div className="flex flex-col">
  <label
htmlFor={id}
className="mb-[1px] font-medium text-sm text-gray-700"
>
{label}
</label>
<Input
onChange={changeEditHandeler}
name={name}
value={editproduct[name]}
type={'text'}
id={id}
/>
<Errormsg msg={''} />
  </div>
  )
}

const removeHandeler = ()=>{
   const filterd = Myproductsarr.filter(product => product.id !== editproduct.id)
   setMyproductsarr(filterd)
   closeModalDel()

}
  return (
    <main className="container mx-auto">
      <Button width={"w-52"} className={"bg-red-500  m-5"} onClick={openModal}>
        Open modal
      </Button>
      <div className="m-5 grid grid-cols-1 md:gap-4 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {Myproducts}
      </div>
      /*_________________________________ ADD PRODUCT MODAL */
      <Modal closeModal={closeModal} isOpen={isOpen} title="Add New Product">
        <form onSubmit={submitHandeler} className="space-y-3">
          {inputs}
          <Selectmenue selected={selected} setSelected={setSelected} />
          <div className="circles flex items-center my-3 space-x-2">
            {circles}
          </div>
          <div className="circles flex-wrap flex items-center my-3 space-x-2">
            {tempColor.map((item) => (
              <div
                key={item}
                className="p-1  m-1 rounded-md text-xs text-white flex flex-wrap"
                style={{ backgroundColor: item }}
              >
                {item}
              </div>
            ))}
          </div>

          <div className="space-x-3  flex justify-center items-center">
            <Button width={"w-44"} className="bg-gray-900 ">
              Submit
            </Button>
            <Button
              width={"w-44"}
              className="bg-gray-300 "
              onClick={canselHandeler}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>



      /*_________________________________ Edit PRODUCT MODAL */
      <Modal closeModal={closeModalEdit} isOpen={isOpenEdit} title="Edit  Product" >
        <form onSubmit={EditSubmitHandeler} className="space-y-3">
         {repeatInputsEdit('title' ,'title' , 'Title')}
         {repeatInputsEdit('description' ,'description' , 'product description')}
         {repeatInputsEdit('imageURL' ,'imageURL' , 'Product Image Url')}
         {repeatInputsEdit('price' ,'price' , 'product price')}
       
           <Selectmenue selected={editproduct.category} setSelected={(value)=>setEditproduct({...editproduct , category:value})} />  
          <div className="circles flex items-center my-3 space-x-2">
            {circles}
          </div> 
           <div className="circles flex-wrap flex items-center my-3 space-x-2">
            {tempColor.concat(editproduct.colors).map((item) => (
              <div
                key={item}
                className="p-1  m-1 rounded-md text-xs text-white flex flex-wrap"
                style={{ backgroundColor: item }}
              >
                {item}
              </div>
            ))}
          </div>

          <div className="space-x-3  flex justify-center items-center">
            <Button width={"w-44"} className="bg-gray-900 ">
              Submit
            </Button>
            <Button
              width={"w-44"}
              className="bg-gray-300 "
              onClick={canselHandeler}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>




      /*_________________________________ DELETE PRODUCT MODAL */
      <Modal closeModal={closeModalDel} isOpen={isOpenDel} title="Delete  Product" >
        <form onSubmit={EditSubmitHandeler} className="space-y-3">
   <p>{productdescripe.description}</p>

          <div className="space-x-3  flex justify-center items-center">
            <Button width={"w-44"} className="bg-gray-900 "
            onClick={removeHandeler}
            >
              Yes , Remove
            </Button>
            <Button
              width={"w-44"}
              className="bg-gray-300 "
              onClick={()=>setisOpenDel(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </main>
  );
};

export default App;
