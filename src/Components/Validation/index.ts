interface Objdata  {
    title: string,
    description: string,
    imageURL: string,
    price: string,
}
export const errValidation=(product:Objdata)=>
{
    const validateUrl = /\.(jpeg|jpg|gif|png|bmp|svg|webp)$/i.test(product.imageURL)
    const errors:Objdata = {
        title: '',
        description: '',
        imageURL: '',
        price: ''
    }
    if(!product.title.trim() || product.title.length<10 ||product.title.length>80){
        errors.title="product title must be between 10 and 80 charachters";
    }
    if(!product.description.trim() || product.description.length<10 ||product.description.length>800){
        errors.description="product title must be between 10 and 800 charachtersdescriptio"
    }
    if(!product.imageURL.trim() || !validateUrl){
        errors.imageURL="image url is required"
    }
    if(!product.price.trim() || isNaN(Number(product.price))){
        errors.price="valid price is required"
    }
    return errors
}
