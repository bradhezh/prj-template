const { format } = require("node:util");

const { app } = require("./app");
const { conf } = require("./conf");
const { message } = require("./message");

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
