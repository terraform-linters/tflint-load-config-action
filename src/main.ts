import * as core from '@actions/core'
import {copyFile} from './copy'

async function run(): Promise<void> {
  const [owner, repo] = core.getInput('source-repo').split('/')

  try {
    core.setOutput(
      'path',
      await copyFile({
        owner,
        repo,
        srcPath: core.getInput('source-path'),
        srcFilename: core.getInput('source-filename'),
        ref: core.getInput('source-ref'),
        dstPath: core.getInput('destination-path'),
        dstFilename: core.getInput('destination-filename'),
        token: core.getInput('token')
      })
    )
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
