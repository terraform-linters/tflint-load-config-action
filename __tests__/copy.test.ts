import path from 'path'
import fs from 'fs'

import {copyFile} from '../src/copy'

process.env.CI &&
  test('it downloads a file', async () => {
    const [owner, repo] = (process.env.GITHUB_REPOSITORY as string).split('/')
    const filePath = await copyFile({
      owner,
      repo,
      srcPath: 'fixtures',
      srcFilename: '.tflint.hcl',
      ref: 'main',
      dstPath: process.env.RUNNER_TEMP as string,
      dstFilename: '.tflint.hcl'
    })

    expect(await fs.promises.readFile(filePath, 'utf8')).toEqual(
      await fs.promises.readFile(
        path.resolve(__dirname, '../fixtures/.tflint.hcl'),
        'utf8'
      )
    )
  })
