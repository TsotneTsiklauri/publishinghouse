import { Data } from "@angular/router";


export class Book{
    id!:string;
  name!:string;
  price!:number;
  tags?: string[];
  favorite!:boolean;
  imageUrl!: string;
  author!: string[];



}