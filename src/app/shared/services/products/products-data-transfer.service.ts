import { Injectable } from '@angular/core';
import { BehaviorSubject, map, take } from 'rxjs';
import { getAllProductsResponse } from 'src/app/models/products/response/getAllProductsResponse';

@Injectable({
  providedIn: 'root'
})
export class ProductsDataTransferService {

  public productsDataEmitter$ =
    new BehaviorSubject<Array<getAllProductsResponse> | null>(null);

  public productsDatas: Array<getAllProductsResponse> = [];

  setProductsDatas(products: Array<getAllProductsResponse>): void{
    if(products){
      this.productsDataEmitter$.next(products);
      this.getProductsDatas();
    }
  }
  getProductsDatas() {
    this.productsDataEmitter$
    .pipe(
      take(1),
      map((data) => data?.filter((product) => product.amount > 0))
    )
    .subscribe({
      next: (response) => {
        if(response) {
          this.productsDatas = response;
        }
      },
    });
    return this.productsDatas;
  }
}
