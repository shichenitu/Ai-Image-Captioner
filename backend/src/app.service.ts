import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config'; 
import OpenAI from 'openai';

@Injectable()
export class AppService {
  private openai: OpenAI; 

  constructor(private configService: ConfigService){
    this.openai = new OpenAI({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'), 
    })
  }


  async analyzeImage(file: Express.Multer.File): Promise<string>{
    const base64Image = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;

    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text", text: "Describe this image in English, show selling points to attact consumers"
              },
              {
                type: "image_url",
                image_url: {
                  url: base64Image
                }
              }
            ]
          }
        ]
      })
      return response.choices.pop()?.message.content ?? "Failed to load the content."
    } catch (error) {
      console.error(error);
      return 'There is an error.'
  }

}
}

