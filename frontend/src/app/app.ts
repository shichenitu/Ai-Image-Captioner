import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Api } from './services/api';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  selectedFile: File | null = null;
  caption: string = '';
  
  constructor(private apiService: Api){}

  onFileSelected(event: any){
    this.selectedFile = event.target.files[0];
  }

  onUpload(){
    this.apiService.uploadImage(this.selectedFile!).subscribe({
      next: (response) => {
        this.caption = response.description;
      }
    })
  }

}
