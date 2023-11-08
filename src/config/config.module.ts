import { Module, Global, DynamicModule } from '@nestjs/common';

interface Options {
  path: string;
}
@Global()
@Module({})
export class ConfigModule {
  static forRoot(options: Options): DynamicModule {
    return {
      module: ConfigModule,
      providers: [
        {
          provide: 'config',
          useValue: 'aaaaa' + options.path,
        },
      ],
      exports: [
        {
          provide: 'config',
          useValue: 'aaaaa' + options.path,
        },
      ],
    };
  }
}
