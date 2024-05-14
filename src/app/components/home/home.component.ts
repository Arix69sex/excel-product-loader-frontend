import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/authService';
import { ProductService } from '../../services/productService';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule,
    FormsModule, HttpClientModule, CommonModule ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  products: any[] = [];

  constructor(private authService: AuthService, private router: Router, private productService: ProductService) {
  }

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    }

    this.productService.getProducts().subscribe(response => {
      console.log("response", response)
      this.products = response["products"];
    });
  }

  deleteProduct(productId: string): void {
    this.productService.deleteProduct(productId).subscribe(response => {
      console.log("response", response)
      const productToDelete = response.body
      const index = this.products.findIndex(product => product.id === productToDelete.id);
      if (index !== -1) {
        this.products.splice(index, 1);
      }
    });
  }
}
