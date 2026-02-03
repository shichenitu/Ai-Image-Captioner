import { Component, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  // core three states
  selectedFile = signal<File | null>(null);
  caption = signal<string>('');
  isLoading = signal<boolean>(false);

  // inject HttpClient
  constructor(private http: HttpClient) {}

  onFileSelected(event: any) {
    this.selectedFile.set(event.target.files[0]);
  }

  onUpload() {
    const file = this.selectedFile();
    if (!file) return;

    this.isLoading.set(true); // loading
    
    const formData = new FormData();
    formData.append('file', file);

    // send the request
    this.http.post<{description: string}>('http://localhost:3000/upload', formData)
      .subscribe({
        next: (res) => {
          this.caption.set(res.description);
          this.isLoading.set(false); // finish loading
        },
        error: () => {
          alert('Failed upload');
          this.isLoading.set(false);
        }
      });
  }
}
