import { HttpClient } from './HttpClient';

const PAT = process.env.PAT

export interface IGetPrs {
    Execute(owner: string, repo: string): Promise<{}[]>
}

interface GhPr {
    number: number,
    state: string,
    title: string,
    created_at: string,
    updated_at: string,
    closed_at: string,
    merged_at: string,
    user: { login: string },
}

export class GetPrs implements IGetPrs {
    public async Execute(owner: string, repo: string): Promise<{
        number: number,
        state: string,
        title: string,
        user: string
        created_at: string,
        updated_at: string,
        closed_at: string,
        merged_at: string,
    }[]> {
        const client = new HttpClient("https://api.github.com/repos")
        const prs = await client.Get<GhPr[]>(`/${owner}/${repo}/pulls?state=all`, PAT)

        return prs.data
            .map(pr => ({
                number: pr.number,
                state: pr.state,
                title: pr.title,
                user: pr.user.login,
                created_at: pr.created_at,
                updated_at: pr.updated_at,
                closed_at: pr.closed_at,
                merged_at: pr.merged_at,
            }))
    }

    // {
    //     url: 'https://api.github.com/repos/maisiesadler/transaction-api/pulls/5',
    //     id: 123,
    //     node_id: '123',
    //     html_url: 'https://github.com/maisiesadler/transaction-api/pull/5',
    //     diff_url: 'https://github.com/maisiesadler/transaction-api/pull/5.diff',
    //     patch_url: 'https://github.com/maisiesadler/transaction-api/pull/5.patch',
    //     issue_url: 'https://api.github.com/repos/maisiesadler/transaction-api/issues/5',
    //     number: 5,
    //     state: 'closed',
    //     locked: false,
    //     title: 'Move slack endpoint to ./transaction-api',
    //     user: [Object],
    //     body: null,
    //     created_at: '2021-10-15T07:07:16Z',
    //     updated_at: '2021-10-15T07:07:43Z',
    //     closed_at: '2021-10-15T07:07:21Z',
    //     merged_at: '2021-10-15T07:07:21Z',
    //     merge_commit_sha: '123',
    //     assignee: null,
    //     assignees: [],
    //     requested_reviewers: [],
    //     requested_teams: [],
    //     labels: [],
    //     milestone: null,
    //     draft: false,
    //     commits_url: 'https://api.github.com/repos/maisiesadler/transaction-api/pulls/5/commits',
    //     review_comments_url: 'https://api.github.com/repos/maisiesadler/transaction-api/pulls/5/comments',
    //     review_comment_url: 'https://api.github.com/repos/maisiesadler/transaction-api/pulls/comments{/number}',
    //     comments_url: 'https://api.github.com/repos/maisiesadler/transaction-api/issues/5/comments',
    //     statuses_url: 'https://api.github.com/repos/maisiesadler/transaction-api/statuses/123',
    //     head: [Object],
    //     base: [Object],
    //     _links: [Object],
    //     author_association: 'OWNER',
    //     auto_merge: null,
    //     active_lock_reason: null
    //   }
}
