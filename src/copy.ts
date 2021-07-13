import * as fs from 'fs'
import * as path from 'path'

import {Octokit} from '@octokit/rest'

type GetContentDataType = {
  content: string
}

interface CopyFileParameters {
  owner: string
  repo: string
  srcPath: string
  srcFilename: string
  ref: string
  dstPath: string
  dstFilename: string
  token?: string
}

export async function copyFile({
  owner,
  repo,
  srcPath,
  srcFilename,
  ref,
  dstPath,
  dstFilename,
  token
}: CopyFileParameters): Promise<string> {
  const octokit = new Octokit({
    auth: token
  })

  const {data} = (await octokit.rest.repos.getContent({
    owner,
    repo,
    path: path.join(srcPath, srcFilename),
    ref
  })) as {data: GetContentDataType}

  const configFilePath = path.resolve(dstPath, dstFilename)

  await fs.promises.writeFile(configFilePath, Buffer.from(data.content, 'base64').toString('utf8'))

  return configFilePath
}
