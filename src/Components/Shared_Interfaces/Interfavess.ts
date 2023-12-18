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
  name:'title' | 'description' | 'imageURL' | 'price' ,
  label:string,
  type:string,

}
export interface Icateg{
  id:string,
  name:string,
  imageURL: string;
}