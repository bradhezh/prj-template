import { Module } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "node:path";
import { format } from "node:util";

import conf from "@/conf";
import { HelloModule } from "@/hello/module";

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), conf.dist),
      exclude: [format("%s/{*path}", conf.ep.api)],
    }),
    HelloModule,
  ],
})
export class AppModule {}
