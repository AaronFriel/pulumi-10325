import { LocalWorkspace } from '@pulumi/pulumi/automation';
import * as aws from '@pulumi/aws';
import { Region } from '@pulumi/aws';

const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;

async function stackUp(opt: { stackName: string }) {
  console.log('getting stack', opt.stackName);
  const stack = await LocalWorkspace.createOrSelectStack({
    projectName: 'test-project',
    stackName: opt.stackName,
    program: async () => {
      // Passing configuration into the stack by reference:
      const awsProvider = new aws.Provider('aws-provider', {
        accessKey: AWS_ACCESS_KEY_ID,
        secretKey: AWS_SECRET_ACCESS_KEY,
        region: Region.EUWest2,
      });
      awsProvider.id.apply(() => console.log(`Created provider for stack ${opt.stackName}`));
    },
  });
  console.log('stack up');
  await stack.up({ onOutput: console.log });
}

async function main() {
  await Promise.all(
    [1, 2, 3, 4].map((x) => stackUp({ stackName: `stack-${x}` })),
  );
}
main();
