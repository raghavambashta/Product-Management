import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { IProduct } from "./product";
import { ProductService } from "./product.service";


@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit{
    imageWidth = 50;
    imageMargin = 2;
    pageTitle:string = 'Product List';
    showImage:boolean = false;
    errorMessage:string = ''

    private _listFilter:string = ''
    
    get listFilter():string{
        return this._listFilter;
    }
    set listFilter(value:string){
        this._listFilter = value;
        console.log(this._listFilter)
        this.filteredProducts = this.performFilter(value)
    }
    filteredProducts: IProduct[] = []
    products: IProduct[] = [];

      constructor (private productService: ProductService){}

      performFilter (filterBy:string) : IProduct[]{
        filterBy = filterBy.toLowerCase();
        return this.products.filter((product: IProduct) =>
            product.productName.toLowerCase().includes(filterBy ))
      }

      toggleImage(): void{
        this.showImage = !this.showImage;
      }

      ngOnInit(): void {
        this.productService.getProducts().subscribe({
          next: products => {
            this.products = products;
            this.filteredProducts = this.products;
          },
          error: err => this.errorMessage = err
        });
        
      }


      onRatingClicked(message:string):void{
        
      } 
      

}