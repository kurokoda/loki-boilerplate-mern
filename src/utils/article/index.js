import moment from "moment";

export function getWinningHashtag(article) {
  const voting = article.get("voting").toJS();
  const yinVotes = voting.yin.votes;
  const yangVotes = voting.yang.votes;

  if (yinVotes === yangVotes) {
    return "#itsatie!";
  }
  if (yinVotes > yangVotes) {
    return voting.yin.hashtag;
  }
  return voting.yang.hashtag;
}

export function getWinningFaction(article) {
  const voting = article.get("voting").toJS();
  const yinVotes = voting.yin.votes;
  const yangVotes = voting.yang.votes;

  if (yinVotes === yangVotes) {
    return "tie";
  }
  if (yinVotes > yangVotes) {
    return "yin";
  }
  return "yang";
}

export function getVotePercent(article) {
  return {
    yin: article.get("voting").get("yin").get("score"),
    yang: article.get("voting").get("yang").get("score")
  };
}

moment.updateLocale("en", {
  relativeTime: {
    future: "%s",
    past: "THE VOTES ARE IN!",
    s: "%d secs until voting ends",
    m: "1 min until voting ends",
    mm: "%d mins until voting ends",
    h: "1 hr until voting ends",
    hh: "%d hrs until voting ends",
    d: "1 day until voting ends",
    dd: "%d days until voting ends",
    M: "1 mo until voting ends",
    MM: "%d mos until voting ends",
    y: "1 yr until voting ends",
    yy: "%d yrs until voting ends"
  }
});

export function getDaysUntilVotingClose(article) {
  const present = moment();
  const future = moment(new Date(article.get("closesAt"))); // Our date format violates Moment.js expectations.
  const minutes = future.diff(present, "minutes");
  const seconds = future.diff(present, "seconds");
  const isEnding = minutes < 60;
  const isEnded = seconds < 0;

  moment.relativeTimeThreshold("s", 60);
  moment.relativeTimeThreshold("m", 120);
  moment.relativeTimeThreshold("h", 49);

  const titleCase = str => str.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join(" ");

  const result = titleCase(future.from(present));
  return {result, isEnding, isEnded};
}

export function getRoute(article) {
  return `/${article.get("topic")}/${article.get("slug")}`.toLowerCase();
}

export function formatArticleSrcSetForTile(srcSet) {
  let result = "";
  srcSet.forEach((key, val) => {
    result += `${key} ${val},`;
  });
  result = result.substring(0, result.length - 1);
  return result;
}
