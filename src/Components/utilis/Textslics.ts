export const cutText = (text:string):string=>{
   return text.length >=40?`${text.slice(0 , 40)} ...`:text
}