# Meetup API Client
I had trouble finding a useful client library for Meetup's GQL API, so I made one, complete with Typescript types. Feel free to send PRs or let me know if there's something you think can be added or improved!

# Setup
1. Apply for and get an approved [Meetup API Client secret](https://www.meetup.com/api/oauth/list/)
1. [Install nvm](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating)
1. `nvm install`
1. `npm install -g yarn`
1. `yarn install`
1. Copy `cp .env.example .env`
1. Add `MEETUP_API_SECRET` value to .env - the **Secret** value **[here](https://www.meetup.com/api/oauth/list/)** (needs an approved key first - see Step 1)

# Quick Start
1. `nvm use`
2. `yarn install`
3. `yarn dev`

# Contributing
The [app.ts](src/app.ts) file currently contains sample uses of the GQL query [client functions](src/meetup/client.ts) for quick experimentation.  Feel free to look over and expand upon the [Typescript types](src/meetup/index.d.ts), [GQL queries and fragments](src/meetup/queries.ts), or both.  

I'm also open to other ideas on how to expand on this - this currently stands primarily as a library of client functions to make use of the Meetup API, but I could see new features and improvements (e.g. storage, caching, retry logic, error handling, nicer logging) being built in or adjacent to it.

# Meetup API: Background
The query system is based on Meetup API's [GQL schema](https://www.meetup.com/api/schema/#graphQl-schema).  It uses an axios version of this query:

```bash
query='query { self { id name } }'
curl -X POST https://api.meetup.com/gql \
  -H 'Authorization: Bearer {YOUR_TOKEN}' \
  -H 'Content-Type: application/json' \
  -d @- <<EOF
    {"query": "$query"}
```

Which comes out to basically this:
```typescript
const axiosClient = axios.create({
  baseURL: 'https://api.meetup.com/gql',
  headers: {
    'Authorization': `Bearer ${process.env.MEETUP_API_TOKEN}`
  }
});

export const queryMeetup = (gqlQuery: string): AxiosPromise => {
  return axiosClient.post('', {'query': gqlQuery});
}
```
