import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// ANGULAR FORM MODULES
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// SHARED ANGULAR MATERIAL MODULES
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [
    // FORM MODULES
    FormsModule,
    ReactiveFormsModule,
    // ANGULAR MATERIAL MODULES
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
  ],
})
export class SharedModule {}
