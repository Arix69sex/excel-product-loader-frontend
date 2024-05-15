import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/productService';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../services/authService';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [ReactiveFormsModule,
    FormsModule, HttpClientModule, CommonModule],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css'
})
export class CreateProductComponent implements OnInit{
  productId: string = ""

  createProductForm: FormGroup;

  constructor(private productService: ProductService, private router: Router, private fb: FormBuilder, private authService: AuthService) {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    }

    this.createProductForm = this.fb.group({
      handle: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      sku: [0, [Validators.required, Validators.min(1)]],
      grams: [0, [Validators.required, Validators.min(1)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      price: [0, [Validators.required, Validators.min(0.01)]],
      comparePrice: [0, [Validators.required, Validators.min(0)]],
      barcode: [0, [Validators.required, Validators.min(1)]]
    });
   }

   ngOnInit(): void {
   }
   
   onSubmit(): void {
    if (this.createProductForm.valid) {
      const productData = this.createProductForm.value;
      this.productService.createProduct(productData).subscribe(()=> {
        this.router.navigate(['/home']);
      });
    } else {
      console.log("Invalid form.", this.createProductForm)
    }
  }
  }
