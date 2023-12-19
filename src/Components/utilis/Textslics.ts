export const cutText = (text:string):string=>{
   return text.length >=40?`${text.slice(0 , 40)} ...`:text
}

export const cutPrice = (price:string):string=>{
   return price.length>4?`${price.slice(0,3)}` + ',' +  `${price.slice(3,-1)}`:price
}