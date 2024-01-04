import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { SearchConfigService } from './search.provider';
import { MetadataKey } from '@/core';

@Module({
  imports: [
    ElasticsearchModule.registerAsync({
      useClass: SearchConfigService,
      inject: [SearchConfigService]
    })
  ],
  providers: [
    {
      provide: MetadataKey.ELASTICSEARCH,
      useClass: SearchConfigService
    },
    SearchConfigService
  ],
  exports: [SearchModule, SearchConfigService, MetadataKey.ELASTICSEARCH]
})
export class SearchModule {}
