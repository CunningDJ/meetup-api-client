# Meetup API Prototype

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
Import `queryMeetup` from the `meetupClient.ts` file, and add the desired [GQL query string](https://www.meetup.com/api/schema/#graphQl-schema) as the argument.

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
