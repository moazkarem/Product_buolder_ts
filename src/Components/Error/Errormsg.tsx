interface Iprops{
    msg:string
}
const Errormsg = ({msg}:Iprops) => {
  return (
<div>

    {msg ? <span className="text-red-600   font-semibold text-sm ">{msg}</span>:null}
</div>

  )
}

export default Errormsg;