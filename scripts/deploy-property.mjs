import { spawn, spawnSync } from 'node:child_process';
import { setTimeout as wait } from 'node:timers/promises';

// Verify the actual built HTTP output before any production mutation.
function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: 'inherit' });
    child.once('error', reject);
    child.once('exit', code => code === 0 ? resolve() : reject(new Error(`${command} exited ${code}`)));
  });
}
let preview;
try {
  if (spawnSync('git', ['diff', '--quiet', 'HEAD']).status !== 0) throw new Error('Commit the website changes before deploying.');
  await run('npm', ['run', 'build:cf']);
  // Port 0 avoids collisions with existing developer previews.
  preview = spawn('npx', ['wrangler', 'dev', '--local', '--port', '0'], { stdio: ['ignore', 'pipe', 'pipe'] });
  const ready = new Promise((resolve, reject) => {
    let output = '';
    const timer = setTimeout(() => reject(new Error('Local verification preview did not become ready.')), 45000);
    const onData = chunk => {
      output += chunk.toString();
      const match = output.match(/Ready on (http:\/\/(?:localhost|127\.0\.0\.1):\d+)/);
      if (match) { clearTimeout(timer); resolve(match[1]); }
    };
    preview.stdout.on('data', onData);
    preview.stderr.on('data', onData);
    preview.once('error', err => { clearTimeout(timer); reject(err); });
    preview.once('exit', code => { clearTimeout(timer); reject(new Error(`Verification preview exited ${code}`)); });
  });
  const url = await ready;
  await run('python3', ['scripts/check-property-site.py', url]);
  preview.kill('SIGTERM');
  await wait(250);
  await run('npx', ['wrangler', 'deploy']);
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
} finally {
  preview?.kill('SIGTERM');
}
