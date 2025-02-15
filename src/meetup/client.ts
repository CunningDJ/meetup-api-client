import axios, { AxiosPromise, AxiosResponse } from 'axios';
import { Event, EventType, Group, GroupEvent, ID, ProNetwork, SearchConnection, SearchSources } from './client.types';
import { EVENT_QUERY, GROUP_PAST_EVENTS_QUERY, GROUP_QUERY, GROUP_UPCOMING_EVENTS_QUERY, KEYWORD_SEARCH_QUERY, PRO_NETWORK_QUERY } from './queries';

/**
 * Client
 */
const axiosClient = axios.create({
  baseURL: 'https://api.meetup.com/gql',
  headers: {
    'Authorization': `Bearer ${process.env.MEETUP_API_SECRET}`
  }
});

/**
 * Base Query
 */
const queryMeetup = <V = object, RD = object>(query: string, variables?: V): AxiosPromise<RD> => (
  new Promise((resolve, reject) => {
    try {
      axiosClient.post('', { query, variables: JSON.stringify(variables) })
        .then(res => {
          // Transforming based on the GQL response inside the 'data' field
          res.data = res.data.data;
          resolve(res);
        })

    } catch (err) {
      reject(err);
    }
  })
);


/**
 * Query: Event
 * Response schema: https://www.meetup.com/api/schema/#Event
 */
type QueryEventVariables = {
  eventId: string;
}
type QueryEventRawResponse = {
  event: Event;
}

/**
 * Fetch the event data
 * @param {string} eventId ID of the event
 * @returns {Event} Event info
 */
export const queryEvent = async (eventId: string): AxiosPromise<Event> => {
  const rawResponse = await queryMeetup<QueryEventVariables, QueryEventRawResponse>(EVENT_QUERY, { eventId });
  const processedResponse: AxiosResponse<Event> = {
    ...rawResponse,
    data: rawResponse.data.event
  };
  return processedResponse;
};


/**
 * Query: Group
 * Response schema: https://www.meetup.com/api/schema/#Group
 */
type QueryGroupVariables = {
  urlname: string;
}
type QueryGroupEventsVariables = QueryGroupVariables & {
  eventCount: number;
}
type QueryGroupRawResponse = {
  groupByUrlname: Group;
}
/**
 * Fetch the group's data
 * @param {string} urlname Name of the Meetup group as it appears in the URL
 * @returns {Group} Group data
 */
export const queryGroup = async (urlname: string): AxiosPromise<Group> => {
  const rawResponse = await queryMeetup<QueryGroupVariables, QueryGroupRawResponse>(GROUP_QUERY, { urlname });
  const processedResponse: AxiosResponse<Group> = {
    ...rawResponse,
    data: rawResponse.data.groupByUrlname
  }
  return processedResponse;
};

/**
 * Query: Upcoming events by group
 */
type UpcomingEventsQueryRawResponse = {
  groupByUrlname: {
    id: ID;
    name: string;
    upcomingEvents: {
      edges: GroupEvent[];
    }
  }
}
type UpcomingEventsQueryProcessedResponse = {
  id: ID;
  name: string;
  upcomingEvents: GroupEvent[];
}
/**
 * Fetch the group's upcoming events
 * @param {string} urlname Name of the Meetup group as it appears in the URL
 * @param {number} eventCount How many upcoming events.  Default: 1000
 * @returns {UpcomingEventsQueryProcessedResponse} Upcoming events
 */
export const queryGroupUpcomingEvents = async (urlname: string, eventCount = 1000): AxiosPromise<UpcomingEventsQueryProcessedResponse> => {
  const response = await queryMeetup<QueryGroupEventsVariables, UpcomingEventsQueryRawResponse>(GROUP_UPCOMING_EVENTS_QUERY, { urlname, eventCount });
  const { data: { groupByUrlname } } = response;
  const processedResponse: AxiosResponse<UpcomingEventsQueryProcessedResponse> = {
    ...response,
    data: {
      ...groupByUrlname,
      upcomingEvents: groupByUrlname.upcomingEvents.edges.map(({ node }: any) => node)
    }
  };
  return processedResponse;
};


/**
 * Query: Past events by group
 */
type PastEventsQueryRawResponse = {
  groupByUrlname: {
    id: ID;
    name: string;
    pastEvents: {
      edges: GroupEvent[];
    }
  }
}
type PastEventsQueryProcessedResponse = {
  id: ID;
  name: string;
  pastEvents: GroupEvent[];
}
/**
 * Fetch the group's past events
 * @param {string} urlname Name of the Meetup group as it appears in the URL
 * @param {number} latestEventsCount How many of the group's latest events.  Default: 1000
 * @returns {PastEventsQueryProcessedResponse} Past events
 */
export const queryGroupPastEvents = async (urlname: string, latestEventsCount = 1000): AxiosPromise<PastEventsQueryProcessedResponse> => {
  const response = await queryMeetup<QueryGroupEventsVariables, PastEventsQueryRawResponse>(GROUP_PAST_EVENTS_QUERY, { urlname, eventCount: latestEventsCount });
  const { data: { groupByUrlname } } = response;
  const processedResponse: AxiosResponse<PastEventsQueryProcessedResponse> = {
    ...response,
    data: {
      ...groupByUrlname,
      pastEvents: groupByUrlname.pastEvents.edges.map(({ node }: any) => node)
    }
  };
  return processedResponse;
};

/**
 * Query: Meetup Health Check
 */
type HealthCheckQueryResponse = {
  healthCheck: 'pass' | 'fail'
}
const HEALTH_CHECK_QUERY = `
  query {
    healthCheck
  }
`;
/**
 * Run a health check ping for Meetup's API.  Will throw an error if the check fails
 */
export const queryHealthCheck = (): AxiosPromise<HealthCheckQueryResponse> => (
  queryMeetup<undefined, HealthCheckQueryResponse>(HEALTH_CHECK_QUERY)
);


/**
 * Query: keywordSearch
 * Response: https://www.meetup.com/api/schema/#SearchConnection
 */
type KeywordSearchResponse = SearchConnection;
type KeywordSearchVariables = {
  filter: {
    source: SearchSources;
    query: string;
    lat: number;
    lon: number;
    city?: string;
    state?: string;
    eventType?: EventType;
  }
}

/**
 * Run a keyword search in Meetup
 * @param {SearchSources} source Either EVENTS or GROUPS
 * @param {string} searchString The search string you want to use
 * @param {number} lat Latitude to base the search
 * @param {number} lon Longitude to base the search
 * @param {string} city City to base the search
 * @param {string} state State/Country region to base the search
 * @param {EventType} eventType ONLINE, PHYSICAL or HYBRID event
 * @returns {KeywordSearchResponse} Search results
 */
export const queryKeywordSearch = (source: SearchSources, searchString: string, lat = 40.7128, lon = -74.0060, city = "New York", state = "NY", eventType: EventType = "PHYSICAL"): AxiosPromise<KeywordSearchResponse> => (
  queryMeetup<KeywordSearchVariables, KeywordSearchResponse>(KEYWORD_SEARCH_QUERY, {
    filter: {
      source,
      query: searchString,
      lat,
      lon,
      city,
      state,
      eventType
    }
  })
);

/**
 * Query: proNetwork
 * Response: https://www.meetup.com/api/schema/#ProNetwork
 */
export type ProNetWorkResponse = ProNetwork;
type QueryProNetworkVariables = {
  id: string;
}

/**
 * Query the pro network for data.  Might need API KEY (see README) for this
 * @param {string} id Pro Network ID
 * @returns {ProNetWorkResponse} Pro Network info
 */
export const queryProNetwork = (id: string): AxiosPromise<ProNetWorkResponse> => (
  queryMeetup<QueryProNetworkVariables, ProNetWorkResponse>(PRO_NETWORK_QUERY, { id })
);