# AI Image Captioner (Backend) 

This is the server-side service for the AI Image Captioner. It is built with **NestJS** and acts as a secure bridge between the frontend and the **OpenAI Vision API**.

---

## Core Features
* **File Upload Handling**: Uses `Multer` to intercept and process image files from the frontend.
* **AI Integration**: Connects to OpenAI's `gpt-4o` model to analyze image content.
* **Data Transformation**: Converts binary image data into a format compatible with AI models.
* **Error Handling**: Manages API communication and provides clear feedback to the frontend.

---

## Technology Stack
* **Framework**: NestJS (Node.js).
* **Language**: TypeScript.
* **API**: OpenAI SDK.
* **Middleware**: `FileInterceptor` (for file uploads).

---

## Core Technical Logic
The backend follows a clean **Controller-Service** architecture:
1.  **Controller Layer**: I defined a `POST /upload` endpoint. It uses an **Interceptor** to catch the image file from the request.
2.  **Service Layer**: The `AppService` contains the main logic. It processes the file buffer and sends it to OpenAI with specific prompts.
3.  **Security**: By processing AI requests on the backend, I ensured that the **OpenAI API Key** remains hidden from the client side.

---

## How to Run
1.  **Environment Setup**:
    Create a `.env` file in the root directory and add your key:
    ```env
    OPENAI_API_KEY=your_key_here
    ```
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Start the server**:
    ```bash
    npm run start:dev
    ```
*The server will run at `http://localhost:3000`.*