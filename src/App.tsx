import { useState } from "react";
import { Productdata, dataInputs } from "./Components/Data/data";
import Productcard from "./Components/Productcard/Productcard";
import Modal from "./Components/Ui/Modal";
import Button from "./Components/Ui/Button";
import Input from "./Components/Ui/Input";
const Myproducts = Productdata.map((product) => (
  <Productcard key={product.id} product={product} />
));
const inputs = dataInputs.map((input) => (
  <div key={input.id} className="flex flex-col">
    <label htmlFor={input.id}>{input.label}</label>
    <Input type={input.type} id={input.id} />
  </div>
));
const App = () => {
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
        {inputs}
        <div className="space-x-2 flex justify-center items-center">
          <Button width={"w-64"} className="bg-gray-900" onClick={closeModal}>
            Submit
          </Button>
         
        </div>
      </Modal>
    </main>
  );
};

export default App;
