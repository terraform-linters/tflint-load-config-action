import * as path from 'path'
import * as os from 'os'
import * as core from '@actions/core'
import {copyFile} from './copy'

async function run(): Promise<void> {
  const [owner, repo] = core.getInput('source-repo').split('/')

  const dstPath = core.getInput('destination-path') || path.join(os.homedir(), '.tflint.hcl')

  try {
    await copyFile({
      owner,
      repo,
      srcPath: core.getInput('source-path'),
      ref: core.getInput('source-ref'),
      dstPath,
      token: core.getInput('token')
    })

    core.setOutput('path', dstPath)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
