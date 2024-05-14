import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/productService';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [ReactiveFormsModule,
    FormsModule, HttpClientModule, CommonModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit{
  productId: string = ""
  product: any = {
    "handle": "",
    "title": "",
    "barcode": "",
    "price": "",
    "comparePrice": "",
    "grams": "",
    "stock": "",
    "description": ""
  };

  editProductForm: FormGroup;

  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router, private fb: FormBuilder) {
    this.editProductForm = this.fb.group({

    });
   }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id') ?? "";
    this.productService.getProductById(this.productId);

    this.productService.getProductById(this.productId).subscribe(response => {
      this.product = response["product"];
      this.editProductForm = this.fb.group({
        handle: [this.product.handle, [Validators.required]],
        title: [this.product.title, [Validators.required]],
        description: [this.product.description, [Validators.required]],
        sku: [this.product.sku, [Validators.required,]],
        grams: [this.product.grams, [Validators.required,]],
        stock: [this.product.stock, [Validators.required, ]],
        price: [this.product.price, [Validators.required, ]],
        comparePrice: [this.product.comparePrice, [Validators.required, ]],
        barcode: [this.product.barcode, [Validators.required, ]]
      });
    })

  }

  onSubmit(): void {
    if (this.editProductForm.valid) {
      this.productService.updateProduct(this.productId, this.product).subscribe(response => {
        this.product = response["product"];
        this.router.navigate(['/home']);
      });
    } else {
    }
  }
}
