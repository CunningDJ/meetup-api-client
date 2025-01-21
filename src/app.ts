import 'dotenv/config';

import { gqlResponseDebugLog, queryEvent, queryKeywordSearch, queryHealthCheck, queryGroup, queryProNetwork } from './meetup/client';

function main() {
  // HEALTH CHECK
  queryHealthCheck()
    .then(gqlResponseDebugLog)

  // EVENT
  queryEvent("305391431")
    .then(gqlResponseDebugLog)

  // GROUP
  queryGroup('nycaiu')
    .then(gqlResponseDebugLog)

  // Uncomment below to test these:

  // // KEYWORD SEARCH
  // queryKeywordSearch("EVENTS", "tech events")
  // .then(gqlResponseDebugLog)

  // // PRO NETWORK
  // queryProNetwork("some ID")
  // .then(gqlResponseDebugLog)
}

main();