
import { Octokit } from 'octokit'
import fs from 'fs/promises'
import path from 'path'

const GITHUB_TOKEN = process.env.GITHUB_TOKEN || ''
const GITHUB_REPO = process.env.GITHUB_REPO || '' // 格式: username/repo
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || 'main'

const octokit = new Octokit({ auth: GITHUB_TOKEN })

// 提交更新到GitHub
export async function commitAndPush(commitMessage: string, filesToCommit: string[]): Promise<string | null> {
  if (!GITHUB_TOKEN || !GITHUB_REPO) {
    console.warn('GitHub配置未完成，跳过提交')
    return null
  }

  try {
    const [owner, repo] = GITHUB_REPO.split('/')
    
    // 获取当前分支的最新提交
    const { data: refData } = await octokit.rest.git.getRef({
      owner,
      repo,
      ref: `heads/${GITHUB_BRANCH}`
    })
    
    const baseTreeSha = refData.object.sha
    
    // 创建新的树
    const tree = await Promise.all(
      filesToCommit.map(async filePath => {
        const content = await fs.readFile(filePath, 'utf-8')
        const { data: blobData } = await octokit.rest.git.createBlob({
          owner,
          repo,
          content,
          encoding: 'utf-8'
        })
        
        return {
          path: path.relative(process.cwd(), filePath),
          mode: '100644' as const,
          type: 'blob' as const,
          sha: blobData.sha
        }
      })
    )
    
    const { data: treeData } = await octokit.rest.git.createTree({
      owner,
      repo,
      base_tree: baseTreeSha,
      tree
    })
    
    // 创建新提交
    const { data: commitData } = await octokit.rest.git.createCommit({
      owner,
      repo,
      message: commitMessage,
      tree: treeData.sha,
      parents: [baseTreeSha]
    })
    
    // 更新分支引用
    await octokit.rest.git.updateRef({
      owner,
      repo,
      ref: `heads/${GITHUB_BRANCH}`,
      sha: commitData.sha
    })
    
    console.log(`提交成功: ${commitData.sha}`)
    return commitData.sha
  } catch (error) {
    console.error('GitHub提交失败:', error)
    return null
  }
}

// 创建新的GitHub仓库
export async function createNewRepo(repoName: string, description: string): Promise<string | null> {
  if (!GITHUB_TOKEN) return null

  try {
    const { data } = await octokit.rest.repos.createForAuthenticatedUser({
      name: repoName,
      description,
      private: false,
      auto_init: true
    })
    
    console.log(`仓库创建成功: ${data.html_url}`)
    return data.html_url
  } catch (error) {
    console.error('仓库创建失败:', error)
    return null
  }
}

// 触发Vercel部署
export async function triggerVercelDeployment(projectId: string, vercelToken: string): Promise<boolean> {
  try {
    const response = await fetch(`https://api.vercel.com/v1/integrations/deploy/${projectId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${vercelToken}`
      }
    })
    
    return response.ok
  } catch (error) {
    console.error('Vercel部署触发失败:', error)
    return false
  }
}
