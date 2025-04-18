import { GithubProvider } from "@cdktf/provider-github/lib/provider/index.js";
import { GoogleBetaProvider } from "@cdktf/provider-google-beta/lib/provider/index.js";
import { DataGoogleBillingAccount } from "@cdktf/provider-google/lib/data-google-billing-account/index.js";
import { DataGoogleOrganization } from "@cdktf/provider-google/lib/data-google-organization/index.js";
import { GoogleProvider } from "@cdktf/provider-google/lib/provider/index.js";
import { Bootstrap } from "@curioswitch/cdktf-constructs";
import { GcsBackend, TerraformStack } from "cdktf";
import type { Construct } from "constructs";

export class SysadminStack extends TerraformStack {
  constructor(scope: Construct) {
    super(scope, "sysadmin");

    new GithubProvider(this, "github", {
      owner: "curioswitch",
    });

    new GoogleProvider(this, "google", {
      project: "catsearch-sysadmin",
      region: "asia-northeast1",
    });

    const googleBeta = new GoogleBetaProvider(this, "google-beta", {
      project: "catsearch-sysadmin",
      region: "asia-northeast1",
    });

    const org = new DataGoogleOrganization(this, "curioswitch-org", {
      domain: "curioswitch.org",
    });

    const billing = new DataGoogleBillingAccount(this, "curioswitch-billing", {
      displayName: "curioswitch-billing",
    });

    const bootstrap = new Bootstrap(this, {
      name: "catsearch",
      organizationId: org.orgId,
      billingAccountId: billing.id,
      githubOrg: "curioswitch",
      domain: "catsearch.curioswitch.org",
      appRepositoryConfig: {
        description: "A cat searcher",
        hasIssues: true,
        hasProjects: true,
        hasWiki: false,
        homepageUrl: "https://catsearch.curioswitch.org",
      },
      googleBeta,
    });

    if (false) {
      new GcsBackend(this, {
        bucket: bootstrap.sysadminProject.tfstateBucketName,
      });
    }
  }
}
