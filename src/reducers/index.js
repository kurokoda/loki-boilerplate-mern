import articlePageData from "./articlePageData";
import homePageData from "./homePageData";
import resultPageData from "./resultPageData";
import sessionVotes from "./sessionVotes";
import topicPageData from "./topicPageData";
import votes from "./votes";
import votingModules from "./votingModules";

const rehydrated = (state = false, action) => {
  switch (action.type) {
    case "persist/REHYDRATE":
      return true;
    default:
      return state;
  }
};

export default {
  articlePageData,
  homePageData,
  resultPageData,
  sessionVotes,
  topicPageData,
  rehydrated,
  votes,
  votingModules
};
