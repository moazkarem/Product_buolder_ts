import {InputHTMLAttributes} from 'react'
interface Iprops extends InputHTMLAttributes<HTMLInputElement>{
}
const Input = ({...rest}:Iprops) => {
  return (

    <input  className="border-2 border-gray-300" {...rest}/>

  )
}

export default Input;