import moment from "moment";

export function isArticleClosed(article) {
  return getDaysUntilVotingClose(article).isEnded;
}

export function isArticleActive(article, votes) {
  return !isArticleClosed(article) && !votes.get(article.get("slug"));
}

export function isVoteInSession(article, sessionVotes) {
  return (
    !isArticleClosed(article) && Boolean(sessionVotes.get(article.get("slug")))
  );
}

export function getTimeRemainingText(article) {
  const votingIsClosed = isArticleClosed(article);
  const votingResults = getDaysUntilVotingClose(article).result;
  const timeRemaining = votingResults
    .split(" ")
    .slice(0, 2)
    .join(" ");

  return votingIsClosed ? "CLOSED" : `${timeRemaining} LEFT`;
}

export function getTimeRemainingClassName(article) {
  return isArticleClosed(article) ? "closed" : "timeLeft";
}

export function getDaysUntilVotingClose(article) {
  const present = moment();
  const future = moment(new Date(article.get("closesAt")));
  //
  const months = future.diff(present, "months");
  const days = future.diff(present, "days");
  const hours = future.diff(present, "hours");
  const minutes = future.diff(present, "minutes");
  const seconds = future.diff(present, "seconds");
  //
  const isEnding = minutes < 60;
  const isEnded = seconds < 0;
  let result = "";
  //
  if (months > 0) {
    result = `${months} MONTH${months > 1 ? "S" : ""} UNTIL VOTING ENDS`;
  } else if (hours > 48) {
    result = `${days} DAYS UNTIL VOTING ENDS`;
  } else if (hours > 1) {
    result = `${hours} HOURS UNTIL VOTING ENDS`;
  } else if (minutes > 1) {
    result = `${minutes} MINUTES UNTIL VOTING ENDS`;
  } else if (seconds > 0) {
    result = `${seconds} SECONDS UNTIL VOTING ENDS`;
  } else {
    result = "THE VOTES ARE IN!";
  }
  return { result, isEnding, isEnded };
}

export function isEmpty(obj) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}
