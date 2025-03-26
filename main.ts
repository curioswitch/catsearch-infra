import { App } from "cdktf";
import { CatSearchStack } from "./stacks/catsearch/index.js";
import { SysadminStack } from "./stacks/sysadmin/index.js";

const app = new App();

new SysadminStack(app);

new CatSearchStack(app, {
  environment: "dev",
  project: "catsearch-dev",
  domain: "alpha.catsearch.curioswitch.org",
});

new CatSearchStack(app, {
  environment: "prod",
  project: "catsearch-prod",
  domain: "catsearch.curioswitch.org",
});

app.synth();
