import { Productdata } from "./Components/Data/data"
import Productcard from "./Components/Productcard/Productcard"

const Myproducts = Productdata.map((product)=> <Productcard key={product.id} product={product} />)
const App = () => {
  return (
    <main className="container mx-auto">
   <div className=" m-5 grid grid-cols-1 md:gap-4 md:grid-cols-2 lg:grid-cols-3 gap-3">
     {Myproducts}
    </div>
    </main>
 
  )
}

export default App
