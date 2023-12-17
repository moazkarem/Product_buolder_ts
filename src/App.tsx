import { ChangeEvent, FormEvent, useState } from "react";
import {
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

const App = () => {
  const [tempColor, setTempColor] = useState<string[]>([]);
  const [Myproductsarr, setMyproductsarr] = useState(Productdata);

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
  const Myproducts = Myproductsarr.map((product) => (
    <Productcard key={product.id} product={product} />
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
      seterrObj(errors);
      return;
    }

    setMyproductsarr((prev) => [
      ...prev,
      {
        ...products,
        colors: tempColor,
        id: Math.ceil(Math.random() * 100).toString(),
      },
    ]);
    setproducts(defaultobj);
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
    </main>
  );
};

export default App;
