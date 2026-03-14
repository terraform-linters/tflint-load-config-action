import * as fs from 'fs'

import {Octokit} from '@octokit/rest'

type GetContentDataType = {
  content: string
}

interface CopyFileParameters {
  owner: string
  repo: string
  srcPath: string
  dstPath: string
  ref?: string
  token?: string
}

export async function copyFile({
  owner,
  repo,
  srcPath,
  ref,
  dstPath,
  token
}: CopyFileParameters): Promise<string> {
  const octokit = new Octokit({
    auth: token
  })

  const {data} = (await octokit.rest.repos.getContent({
    owner,
    repo,
    path: srcPath,
    ...(ref ? {ref} : {})
  })) as {data: GetContentDataType}

  await fs.promises.writeFile(
    dstPath,
    Buffer.from(data.content, 'base64').toString('utf8')
  )

  return dstPath
}
