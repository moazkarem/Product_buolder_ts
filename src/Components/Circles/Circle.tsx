import { HTMLAttributes } from "react";

interface Iprops extends HTMLAttributes<HTMLSpanElement>{
    color:string
}
const Circle = ({color , ...rest}:Iprops) => {
  return (<span  className="w-5 h-5 block rounded-full cursor-pointer" style={{backgroundColor:color}} {...rest}/>
  )
}

export default Circle;