import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/productService';
import { AuthService } from '../../services/authService';

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

  editProductForm: FormGroup;

  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private authService: AuthService) {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    }
    this.editProductForm = this.fb.group({
      handle: ["", [Validators.required]],
      title: ["", [Validators.required]],
      description: ["", [Validators.required]],
      sku: [0, [Validators.required,]],
      grams: [0, [Validators.required,]],
      stock: [0, [Validators.required, ]],
      price: [0, [Validators.required, ]],
      comparePrice: [0, [Validators.required ]],
      barcode: [0, [Validators.required, ]]
    });
   }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id') ?? "";
    this.productService.getProductById(this.productId);

    this.productService.getProductById(this.productId).subscribe(response => {
      response["product"];
      console.log("response", response["product"])
      this.editProductForm = this.fb.group({
        handle: [response["product"].handle, [Validators.required]],
        title: [response["product"].title, [Validators.required]],
        description: [response["product"].description, [Validators.required]],
        sku: [response["product"].sku, [Validators.required,]],
        grams: [response["product"].grams, [Validators.required,]],
        stock: [response["product"].stock, [Validators.required, ]],
        price: [response["product"].price, [Validators.required, ]],
        comparePrice: [response["product"].comparePrice, [Validators.required ]],
        barcode: [response["product"].barcode, [Validators.required, ]]
      });
    })

  }

  onSubmit(): void {
    if (this.editProductForm.valid) {
      const productData = this.editProductForm.value;
      this.productService.updateProduct(this.productId, productData).subscribe(() => {
        this.router.navigate(['/home']);
      });
    } else {
    }
  }
}
