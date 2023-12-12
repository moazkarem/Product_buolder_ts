import { ButtonHTMLAttributes, ReactNode } from "react";

interface Iprops extends ButtonHTMLAttributes<HTMLButtonElement> {
    children:ReactNode
    clasName:string ,
    width?:"w-52" | "w-40"
  
}
const Button = ({children , clasName , width , ...rest}:Iprops) => {
  return (
    <div>
<button  className={`${clasName} ${width}   p-1 rounded-md text-white`}  {...rest}>
    {children}
</button>
    </div>
  )
}

export default Button;