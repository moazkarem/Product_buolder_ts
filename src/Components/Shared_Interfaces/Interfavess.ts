export interface Iproducts{
    id?: string;
    title: string;
    description: string;
    imageURL: string;
    price: string;
    colors: string[];
    category: {
      name: string;
      imageURL: string;
    };
  }
export interface Iinputs{
  id:string ,
  name:string,
  label:string,
  type:string,
}