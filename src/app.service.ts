// Import the required modules and classes
import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import axios from 'axios';

@Injectable()
export class AppService {
  async getLogo(response: Response, tid: string): Promise<any> {
    try {
      const fileUrl =
        'https://sportteamslogo.com/api?key=64f10b2f920f42b6ae1270b302cf2817&size=big&tid=' +
        tid;

      const fileResponse = await axios.get(fileUrl, {
        responseType: 'stream',
      });

      response.setHeader('Content-Type', 'application/octet-stream');
      response.setHeader(
        'Content-Disposition',
        `attachment; filename=${tid}.png`,
      );

      fileResponse.data.pipe(response);
    } catch (error) {
      console.error('Error downloading file:', error.message);
      response.status(500).send('Failed to download the file.');
    }
  }
}
