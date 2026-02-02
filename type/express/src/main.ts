declare const module: any;

import { createServer } from "http";
import { format } from "node:util";

import { app } from "@/app";
import conf from "@/conf";
import { message } from "@/message";

function bootstrap() {
  console.log(conf.env);

  const server = createServer(app);
  app.listen(conf.port, () => {
    console.log(format(message.started, conf.port));
  });

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => server.close());
  }
}
void bootstrap();
