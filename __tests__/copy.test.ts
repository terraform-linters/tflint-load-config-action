import path from 'path'
import fs from 'fs'

import {copyFile} from '../src/copy'

process.env.CI &&
  test('it downloads a file', async () => {
    const [owner, repo] = (process.env.GITHUB_REPOSITORY as string).split('/')
    
    const filePath = await copyFile({
      owner,
      repo,
      srcPath: 'fixtures/.tflint.hcl',
      ref: 'main',
      dstPath: path.join(process.env.RUNNER_TEMP, '.tflint.hcl')
    })

    expect(await fs.promises.readFile(filePath, 'utf8')).toEqual(
      await fs.promises.readFile(
        path.resolve(__dirname, '../fixtures/.tflint.hcl'),
        'utf8'
      )
    )
  })
