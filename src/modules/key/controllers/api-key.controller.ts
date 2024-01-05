import { Controller, Get } from '@nestjs/common';
import { ApiKeyService } from '../services';

@Controller('api-key')
export class ApiKeyController {
  constructor(private readonly apiKeyService: ApiKeyService) {}

  @Get()
  async getApiKey(): Promise<any> {
    return await this.apiKeyService.findById([]);
  }
}
