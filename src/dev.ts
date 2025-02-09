import 'dotenv/config';
import fs from 'fs';

import { gqlResponseDebugLog, queryEvent, queryKeywordSearch, queryHealthCheck, queryGroup, queryProNetwork, queryGroupUpcomingEvents } from './meetup/client';
import { EVENT_QUERY, GROUP_QUERY, GROUP_UPCOMING_EVENTS_QUERY } from './meetup/queries';

function main() {
  // // HEALTH CHECK
  queryHealthCheck()
    .then(gqlResponseDebugLog)

  // // EVENT
  queryEvent("305391431")
    .then(gqlResponseDebugLog)

  // GROUP
  queryGroup('nycaiu')
    .then(gqlResponseDebugLog)

  // UPCOMING EVENTS
  queryGroupUpcomingEvents('nyctnb')
    .then(gqlResponseDebugLog)

  // Uncomment below to test these:

  // // KEYWORD SEARCH
  queryKeywordSearch("EVENTS", "tech events")
    .then(gqlResponseDebugLog)

  // // PRO NETWORK
  // queryProNetwork("some ID")
  // .then(gqlResponseDebugLog)
}

main();