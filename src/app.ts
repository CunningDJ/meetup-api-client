import 'dotenv/config';

import { gqlResponseLog, queryEvent, queryKeywordSearch, queryHealthCheck, queryGroup, queryProNetwork } from './meetup/client';

function main() {
  // HEALTH CHECK
  queryHealthCheck()
    .then(gqlResponseLog)

  // EVENT
  queryEvent("305391431")
    .then(gqlResponseLog)

  // GROUP
  queryGroup('nycaiu')
    .then(gqlResponseLog)

  // Uncomment below to test these:

  // // KEYWORD SEARCH
  // queryKeywordSearch("EVENTS", "tech events")
  // .then(gqlResponseLog)

  // // PRO NETWORK
  // queryProNetwork("some ID")
  // .then(gqlResponseLog)
}

main();