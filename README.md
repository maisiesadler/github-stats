# GitHub Stats

## Set Up

Install packages using `npm i`

Set environment variable `PAT` to personal access token for private repos

## Programs

Get stats about...

### PRs - Get percentiles for Time to Close

To get pulls for https://github.com/abc/xyz

```sh
npm run prs --owner=abc --repo=xyz
```

Or

```sh
npm run prs --repo=abc/xyz
```

Example Output:

```
Got 18 PRs
50th percentile closed in 3 days and 23 hours and 58 minutes and 34 seconds
75th percentile closed in 9 days and 4 minutes and 25 seconds
95th percentile closed in 27 days and 23 hours and 56 minutes and 44 seconds
```
