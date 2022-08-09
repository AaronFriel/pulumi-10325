import * as pulumi from '@pulumi/pulumi'
import * as aws from '@pulumi/aws';
import { Region } from '@pulumi/aws';

// We define & export these interfaces to allow TypeScript to type-check that we set the right config.
export interface Opt {
  stackName: string,
};

// As above, but we'll inform the Pulumi engine that these should be encrypted (marked as secret).
export interface Secrets {
  AWS_ACCESS_KEY_ID: string;
  AWS_SECRET_ACCESS_KEY: string;
}

const opt = new pulumi.Config().requireObject<Opt>("opt");
// This ensures these values are marked secret in state:
const secrets = new pulumi.Config().requireSecretObject<Secrets>("opt");

const awsProvider = new aws.Provider('aws-provider', {
  accessKey: secrets.AWS_ACCESS_KEY_ID,
  secretKey: secrets.AWS_SECRET_ACCESS_KEY,
  region: Region.EUWest2,
});
// Passing configuration into the stack by reference:
awsProvider.id.apply(() => console.log(`Created provider for stack ${opt.stackName}`));
