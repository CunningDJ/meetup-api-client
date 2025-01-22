/**
 * GQL QUERY AND FRAGMENT STRINGS
 */

/**
 * GQL: FRAGMENTS
 */

const baseFragments = `
fragment onImage on Image {
  id
  baseUrl
  preview
  source
}

fragment onGroupSponsor on GroupSponsor {
  id
  logo
  image {
    ...onImage
  }
  name
  description
  url
}

fragment onMailchimpList on MailchimpList {
  id
  webId
  name
  selected
}

fragment onSocialNetwork on SocialNetwork {
  service
  url
  identifier
}

fragment onProNetwork on ProNetwork {
  id
  urlname
  name
  status
  link
  logo {
    ...onImage
  }
  description
  contactEmail
  externalUrl
  primaryAdmin {
    ...onUser
  }
  isMemberEmailShared
  socialNetworks {
    ...onSocialNetwork
  }
  mailchimpLists {
    ...onMailchimpList
  }
  sponsors { ...onGroupSponsor }
}

fragment onUser on User {
  id
  email
  name
  username
  bio
  gender
  isNew
  memberPhoto {
    ...onImage
  }
  isLeader
  isAdmin
  isOrganizer
  isProOrganizer
  timezone
  lat
  lon
  city
  state
  zip
  country
  joinTime
  preferredLocale
  stripeCustomerId
}
`.trim();

const venueBaseFragment = `
  fragment onVenue on Venue {
    id
    name
    address
    city
    state
    postalCode
    crossStreet
    country
    venueType
    lat
    lng
  }
`.trim();

const eventBaseFragment = `
  fragment onRsvpQuestion on RsvpQuestion {
    id
    question
    required
    answer
  }
  fragment onEvent on Event {
    id
    eventType
    token
    title
    eventUrl
    imageUrl
    shortUrl
    creatorMember {
      ...onUser
    }
    venue {
      ...onVenue
    }
    isFeatured
    shortDescription
    host {
      ...onUser
    }
    hostPhoto {
      ...onImage
    }
    maxTickets
    guestsAllowed
    numberOfAllowedGuests
    eventType
    howToFindUs
    group {
      ...onGroup
    }
    dateTime
    endTime
    timezone
    duration
    images  {
      ...onImage
    }
    status
    createdAt
    priceTier
    going
    waiting
    rsvpEventQuestion {
      ...onRsvpQuestion
    }
    isSaved
    isOnline
  }
`.trim();

const groupBaseFragment = `
  fragment onTopic on Topic {
    id
    name
    urlkey
  }

  fragment onTopicCategory on TopicCategory {
    id
    urlkey
    name
    color
    imageUrl
    defaultTopic {
      ...onTopic
    }
  }
  fragment onGroupVideo on GroupVideo {
    provider
    url
    key
  }
  fragment onGroupQuestion on GroupQuestion {
    id
    question
    sort
  }

  fragment onGroup on Group {
    id
    logo {
      ...onImage
    }
    isPrivate
    isMember
    isOrganizer
    isPrimaryOrganizer
    latitude
    longitude
    proJoinDate
    foundedDate
    topics {
      ...onTopic
    }
    topicCategory {
      ...onTopicCategory
    }
    description
    customMemberLabel
    name
    urlname
    timezone
    city
    state
    country
    zip
    groupPhoto {
      ...onImage
    }
    link
    proNetwork {
      ...onProNetwork
    }
    emailListAddress
    joinMode
    needsPhoto
    needsQuestions
    questions {
      ...onGroupQuestion
    }
    welcomeBlurb
    video {
      ...onGroupVideo
    }
    isNewGroup
    groupApprovalStatus
    featuredEvent {
      id
      eventType
      token
      title
      eventUrl
      imageUrl
      shortUrl
    }
    mailingListMode
    status
    organizer {
      ...onUser
    }
    socialNetworks {
      ...onSocialNetwork
    }
    allowMemberPhotoUploads
    canAddPhotos
    
    # sponsors
    # fundraising
    # stats
    # memberships
    # membershipSearch
    # eventSearch
    # groupAnalytics
    # membershipInsights
    # membershipDues
    # duesSettings
    # membershipMetadata
    # draftEvents
    # pastEvents
    # upcomingEvents
    # venues
    # stepUpInfo
    # experiments
    # featuredEventPhotos
  }
`.trim();


const eventFragments = `
  ${baseFragments}
  ${groupBaseFragment}
  ${venueBaseFragment}
  ${eventBaseFragment}
`.trim();

const groupFragments = `
  ${baseFragments}
  ${groupBaseFragment}
`.trim();

const keywordSearchFragments = `
  ${groupFragments}
  fragment onSearchConnection on SearchConnection {
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    count
    edges {
      cursor
      node {
        id
        result {
          ...onGroup
        }
      }
      recommendationId
      recommendationSource
    }
  }
`.trim();




/**
 * GQL: QUERIES
 */

/**
{"filter":{
  "query": "tech events",
  "lat":40,
  "lon": -80,
  "city": "New York",
  "state": "NY",
  "source":"EVENTS"
}}
 */

// Base Query Function
const gql = (fragments: string, queryString: string): string => `
  ${fragments}
  ${queryString}
`;

export const EVENT_QUERY = gql(eventFragments, `
  query($eventId: ID!) {
    event(id: $eventId) {
      ...onEvent
    }
  }
`);

export const GROUP_QUERY = gql(groupFragments, `
  query($urlname: String!) {
    groupByUrlname(urlname: $urlname) {
      ...onGroup
    }
  }
`);

export const KEYWORD_SEARCH_QUERY = gql(keywordSearchFragments, `
  query($filter: SearchConnectionFilter!) {
    keywordSearch(filter: $filter) {
      ...onSearchConnection
    }
  }
`);

export const PRO_NETWORK_QUERY = gql(baseFragments, `
  query($id: ID!) {
    proNetwork(id: $id) {
      ...onProNetwork
    }
  }
`);
