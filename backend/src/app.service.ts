import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config'; // to read the password of .env
import OpenAI from 'openai';

@Injectable()
export class AppService {

  private openai: OpenAI; // private variable: for storing the OpenAI instance

  constructor(private configService: ConfigService){
    this.openai = new OpenAI({
      apiKey: this.configService.get<string>('OPENAI_API_KEY') // apiKey: to be added
    })
  }


}
