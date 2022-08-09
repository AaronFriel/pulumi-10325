import { LocalWorkspace } from '@pulumi/pulumi/automation';
import path from 'path';
import { Opt, Secrets } from './stacks/test-project';

// We should check these are not undefined. For sake of example, we ! assert they are defined:
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID!;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY!;

async function stackUp(opt: Opt, secrets: Secrets) {
  console.log('getting stack', opt.stackName);
  const stack = await LocalWorkspace.createOrSelectStack({
    stackName: opt.stackName,
    workDir: path.join(__dirname, 'stacks', 'test-project'),
  });
  await stack.setConfig('opt', { value: JSON.stringify(opt) });
  await stack.setConfig('secrets', {
    secret: true,
    value: JSON.stringify(secrets),
  });
  console.log('stack up');
  await stack.up({ onOutput: console.log });
}

async function main() {
  await Promise.all(
    [1, 2, 3, 4].map((x) =>
      stackUp(
        { stackName: `stack-${x}` },
        {
          AWS_ACCESS_KEY_ID,
          AWS_SECRET_ACCESS_KEY,
        },
      ),
    ),
  );
}
main();
