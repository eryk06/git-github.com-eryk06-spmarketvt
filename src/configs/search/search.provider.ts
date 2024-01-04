import { Injectable } from '@nestjs/common';
import {
  ElasticsearchModuleOptions,
  ElasticsearchOptionsFactory
} from '@nestjs/elasticsearch';

@Injectable()
export class SearchConfigService implements ElasticsearchOptionsFactory {
  createElasticsearchOptions():
    | ElasticsearchModuleOptions
    | Promise<ElasticsearchModuleOptions> {
    return {
      node: 'http://localhost:9200',
      maxRetries: 10,
      requestTimeout: 60000,
      sniffOnStart: true
    };
  }
}
