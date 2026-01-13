declare const module: any;

import { format } from "node:util";

import { app } from "@/app";
import conf from "@/conf";
import { message } from "@/message";

async function bootstrap() {
  console.log(conf.env);

  app.listen(conf.port, () => {
    console.log(format(message.started, conf.port));
  });

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
void bootstrap();
