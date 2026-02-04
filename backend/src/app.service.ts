import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class AppService {
  private openai = new OpenAI({
    apiKey: '你的_OPENAI_API_KEY_换成真的', 
  });

  async analyzeImage(file: Express.Multer.File): Promise<string> {
    if (!file) throw new Error('No file uploaded');

    const base64Image = file.buffer.toString('base64');

    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-4o-mini", 
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: "Describe this image in one concise sentence." },
              {
                type: "image_url",
                image_url: {
                  url: `data:${file.mimetype};base64,${base64Image}`,
                },
              },
            ],
          },
        ],
      });

      return response.choices[0].message.content || 'AI could not describe this image.';
    } catch (error) {
      console.error('OpenAI Error:', error);
      throw new Error('AI service failed');
    }
  }
}