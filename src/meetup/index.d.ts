
/**
 * Basic Meetup API GQL Types
 */
export type ID = string;
export type EventType = "ONLINE" | "PHYSICAL" | "HYBRID";
// https://www.meetup.com/api/schema/#Image
export type Image = {
  id: ID;
  baseUrl: string;
  preview: string;
  source: string;
}

const UsState = "AL" | "AK" | "AZ" | "AR" | "CA" | "CO" | "CT" | "DE" | "FL" | "GA" | "HI" | "ID" | "IL" | "IN" | "IA" | "KS" | "KY" | "LA" | "ME" | "MD" | "MA" | "MI" | "MN" | "MS" | "MO" | "MT" | "NE" | "NV" | "NH" | "NJ" | "NM" | "NY" | "NC" | "ND" | "OH" | "OK" | "OR" | "PA" | "RI" | "SC" | "SD" | "TN" | "TX" | "UT" | "VT" | "VA" | "WA" | "WV" | "WI" | "WY";

// https://www.meetup.com/api/schema/#MemberStatus
type MemberStatus =
  "ACTIVE" |
  "BLOCKED" |
  "BOUNCED" |
  "INVISIBLE" |
  "PENDING" |
  "PENDREMOVED" |
  "PREREGISTERED" |
  "REMOVED" |
  "UNVERIFIED";

type MemberGender =
  "FEMALE" |
  "MALE" |
  "NONE" |
  "NOT_CHECKED" |
  "OTHER";

type ReasonForJoining =
  "PRACTICE_HOBBY" |
  "BUILD_PROFESSIONAL_NETWORK" |
  "SOCIALIZING" |
  "MAKING_FRIENDS";

type EventStatus =
  "PUBLISHED" |
  "DRAFT" |
  "CANCELLED" |
  "CANCELLED_PERM" |
  "AUTOSCHED" |
  "ACTIVE" |
  "PAST";

type ProNetworkStatus = "ACTIVE" | "INACTIVE" | "FROZEN";

type EventPriceTier =
  "FREE" |
  "PAID";

type Topic = {
  id: ID;
  name: string;
  urlkey: string;
};

type TopicCategory = {
  id: ID;
  urlkey: string;
  name: string;
  color: string;
  imageUrl: string;
  defaultTopic: Topic;
};

type GroupVideoProvider = "YOUTUBE" | "VIMEO" | "OTHER";

type GroupVideo = {
  provider: GroupVideoProvider;
  url: string;
  key: string;
}

// https://www.meetup.com/api/schema/#ProNetwork
type ProNetwork = {
  id: ID;
  urlname: string;
  name: string;
  status: ProNetworkStatus;
  link: string;
  logo: Image;
  description: string;
  contactEmail: string;
  externalUrl: string;
  primaryAdmin: User;
  isMemberEmailShared: boolean;
  sponsors: GroupSponsor[];
  socialNetworks: SocialNetwork[];
  mailchimpLists: MailchimpList[];
};


type GroupQuestion = {
  id: ID;
  question: string;
  sort: number;
}

// https://www.meetup.com/api/schema/#User
export type User = {
  id: ID;
  email: string;
  name: string;
  username: string;
  bio: string;
  gender: MemberGender;
  isNew: boolean;
  memberPhoto: Image;
  isLeader: boolean;
  isAdmin: boolean;
  isOrganizer: boolean;
  isProOrganizer: boolean;
  timezone: string;
  lat: number;
  lon: number;
  city: string;
  state: string;
  zip: string;
  country: string;
  joinTime: string; // datestring
  preferredLocale: string;
  stripeCustomerId: string;
};

// https://www.meetup.com/api/schema/#Venue
type Venue = {
  id: ID;
  name: string;
  address: string;
  city: string;
  state: UsState
  postalCode: string;
  crossStreet: string;
  country: string;
  venueType: string;
  lat: number;
  lon: number;
};

type RsvpQuestion = {
  id: ID;
  question: string;
  required: boolean;
  answer: string;
}

// https://www.meetup.com/api/schema/#Event
export type Event = {
  id: ID; //	Alphanumeric identifier for the event
  eventType: EventType;
  token: string; //	Calculated identifier for an autoscheduled event
  title: string; //	Title of the event
  topics: Topic[];
  creatorMember: User;
  venue: Venue;
  eventUrl: string; //	Name used for the event's web address on meetup.com. Must be between 6 and 60 characters
  imageUrl: string;
  shortUrl: string;
  isFeatured: boolean;
  shortDescription: string; //	Short description of the event
  host: User;
  hostPhoto: Image;
  maxTickets: number;
  guestsAllowed: boolean;
  numberOfAllowedGuests: number;
  eventType: EventType;
  howToFindUs: string;
  group: Group;
  dateTime: Date; // datestring
  endTime: string; // datestring
  timezone: string;
  duration: number;
  venue: Venue;
  images: Image[];
  // onlineVenue: (OnlineVenue)	If event is online
  status: EventStatus;
  // timeStatus: (EventTimeStatus)	Time Status of the event
  createdAt: Date: // datestring
  priceTier: EventPriceTier;
  going: number;
  waiting: number;
  rsvpEventQuestion: RsvpQuestion;
  isSaved: boolean;
  isOnline: boolean;


  // fees: (Fees)	Fees of the event
  // taxType: (String)	Type of tax for payment
  //   donation: (Donation)	Donation of the event
  // maxTickets: (Int)REQUIRED	Maximum amount of tickets available for the event
  //   waitlistMode: (WaitlistMode)REQUIRED	Waitlist handling when RSVP limit is reached
  // going: (Int)REQUIRED	Numbers of participants
  // waiting: (Int)REQUIRED	Number of waitlisted members
  // tickets(
  //   input: TicketsConnectionInput
  // ): (EventTicketsConnection)REQUIRED	List of tickets
  // rsvpSearch(
  //   input: ConnectionInput
  //   filter: RsvpSearchFilterREQUIRED
  // ): (RsvpSearchConnection)REQUIRED	Search for members RSVP's in this event
  // attendingTicket: (Ticket)	Ticket of the requester
  // isDeletable: (Boolean)REQUIRED	True whenver the event may be deleted by the requesting user.
  //     isNetworkEvent: (Boolean)REQUIRED	True if the event is part of a network event
  // hostRsvps(
  //   input: ConnectionInput
  // ): (HostRsvpsConnection)REQUIRED	A list of RSVP's for hosts of the event
  // uiActions: (EventUiActions)REQUIRED	The actions that a member can take on the event
  // rsvpEventQuestion: (RsvpQuestion)	Event RSVP question details
  // rsvpSurveySettings: (RsvpSurveySettings)	Pro event RSVP survey settings
  // rsvpState: (RsvpState)	The state of the current user's RSVP for this event
  // rsvpSettings: (RsvpOpenSettings)	Settings for when members can rsvp
  // comments(
  //   offset: IntREQUIRED
  //   limit: IntREQUIRED
  //   sortOrder: SortOrder
  // ): (EventCommentConnection)REQUIRED	Event comments
  // commentLikes(
  //   id: IDREQUIRED
  //   inReplyTo: String
  //   offset: IntREQUIRED
  //   limit: IntREQUIRED
  //   sortOrder: SortOrder
  // ): (EventCommentLikerConnection)REQUIRED	Event comment likers
  // photoAlbum: (EventPhotoAlbum)	Event photo album
  // isProEmailShared: (Boolean)	True whenever the member shares email with pro network
  // descriptionImageUrls: ([String])	List of image URLs parsed from event description
  // attributes: (EventAttributesConnection)REQUIRED	Attrbutes associated with the event
  // proCompleteRsvp: (ProCompleteRsvp)REQUIRED	Pro event complete RSVP details
  // calendarExportUrls: (CalendarExportUrls)	A collection of links for exporting event information to an external calendar system for a given member
  //   covidPrecautions: (CovidPrecautions)REQUIRED	Organizer defined COVID - 19 precautions
  // speakerDetails: (SpeakerDetails)	Speaker details
  // fundraising: (EventFundraising)	Settings related to fundraising
  // feeSettings: (EventFeeSettings)	Optional organizer - defined fee payment settings
  // zoomMeetingId: (ID)	A Zoom meeting ID if the event is online and uses Zoom integration.
  //   series: (Series)	If this event is part of a series, this field describes that series
  // isNewGroup: (Boolean)	Indicates if the group has been recently created
  // isFeatured: (Boolean)REQUIRED	Returns true of the event is a featured event
  // template: (EventTemplate)	If an event was created from a template, the template metadata.
  //   creatorMember: (User)	Indicates member who created the event
  // networkEvent: (NetworkEvent)	Network event details
  // ratings: (EventRatings)REQUIRED	Summary of ratings for Event.Values will only be returned for members that are able to see them
  // rsvpAvailability: (EventRsvpAvailability)REQUIRED	State of general RSVP availability for the event.For a per member list of actions a member can perform on an event see
  // attendeeInsights: (AttendeeInsights)	Attendee insights
  // reasonsForJoining: (ReasonForJoining)REQUIRED	A select set of reasons for joining based on the current member's selected reasons for joining and other members attending.
  // venues: ([EventVenue])	Returns all venues for an event.Will return a list of 1 venue for online or inperson Hybrid events will have 2 entries
  // promotions: (EventPromotion)REQUIRED	Promotions defined for this event.
}

export type EventShort = Pick<Event, "id" | "eventType" | "token" | "title" | "eventUrl" | "imageUrl" | "shortUrl">;

export type ConnectionInput = {
  first: number; //	Returns up to the first n elements from the list
  last: number; //	Returns up to the last n elements from the list
  after: string; //	Returns the elements that come after the specified cursor
  before: string; //	Returns the elements that come before the specified cursor
  reverse: string; //	Reverse the order of the underlying list
}

export type GroupSponsor = {
  id: ID;
  logo: string;
  image: Image;
  name: string;
  description: string;
  url: string;
}

export type SocialNetworkService =
  "FACEBOOK" |
  "TWITTER" |
  "FLICKR" |
  "TUMBLR" |
  "INSTAGRAM" |
  "LINKEDIN" |
  "TIKTOK" |
  "OTHER";

export type SocialNetwork = {
  service: SocialNetworkService;
  url: string;
  identifier: string;
}
export type MailchimpList = {
  id: ID;
  webId: ID;
  name: string;
  selected: boolean;
}

export type PageInfo = {
  hasNextPage: boolean; //	A boolean value that indicates whether the end of the list was reached (only relevant when paginating forward through a list)
  hasPreviousPage: boolean; //	A boolean value that indicates whether the beginning of the list was reached (only relevant when paginating backwards through a list)
  startCursor: string; //	A cursor that represents the first edge in the list of edges for this query
  endCursor: string;
};

export type SearchNode = Event | Group;

export type SearchResult = {
  id: ID;
  result: SearchNode;
}

export type SearchResultEdge = {
  cursor: string;
  node: SearchResult;
  recommendationId: string;
  recommendationSource: string;
}

export type SearchConnection = {
  pageInfo: PageInfo;
  count: number;
  edges: SearchResultEdge[];
}

export type SearchSources = "EVENTS" | "GROUPS";

// https://www.meetup.com/api/schema/#Group
export type Group = {
  id: ID;
  logo: Image;
  isPrivate: boolean;
  isMember: boolean;
  isOrganizer: boolean;
  isPrimaryOrganizer: boolean;
  latitude: number;
  longitude: number;
  proJoinDate: Date;
  foundedDate: Date;
  topics: Topic;
  topicCategory: TopicCategory;
  description: string;
  customMemberLabel: string;
  name: string;
  urlname: string;
  timezone: string;
  city: string;
  state: string;
  country: string;
  zip: string;
  groupPhoto: Image;
  link: string;
  proNetwork: ProNetwork;
  sponsors: GroupSponsor[];
  stats: GroupStats;
  memberships: GroupUserConnection;
  membershipSearch: MembershipSearchConnection;
  eventSearch: GroupEventSearchConnection;
  emailListAddress: string;
  joinMode: GroupJoinMode;
  needsPhoto: boolean;
  needsQuestions: boolean;
  questions: GroupQuestion[];
  welcomeBlurb: string;
  membershipDues: DuesCheckoutSettings;
  duesSettings: DuesSettings;
  membershipMetadata: GroupMembership;
  draftEvents: DraftEventConnection;
  pastEvents: PastEventConnection;
  upcomingEvents: UpcomingEventsConnection;
  video: GroupVideo;
  venues: GroupVenueConnection;
  stepUpInfo: StepUpInfo;
  experiments: ExperimentPayload;
  featuredEventPhotos: FeaturedEventPhotoConnection;
  isNewGroup: boolean;
  groupApprovalStatus: GroupApprovalStatus;
  featuredEvent: EventShort;
  fundraising: GroupFundraising;
  mailingListMode: GroupMailingListMode;
  status: GroupStatus;
  organizer: User;
  socialNetworks: SocialNetwork[];
  membershipInsights: MembershipInsights;
  allowMemberPhotoUploads: boolean;
  canAddPhotos: boolean;
  groupAnalytics: GroupAnalytics;
}