import { css, StyleSheet } from "aphrodite/no-important";
import React from "react";
import { getIncrementedElementName } from "../../utils/collection";

export const blackTapeText = string => {
  return string.split(" ").map(word => {
    const sanitizedWord = word.replace("\\s", "");
    if (sanitizedWord.length) {
      return (
        <span
          key={getIncrementedElementName("blackTapeText")}
          className={css(styles.blackTape)}
        >
          {`${sanitizedWord} `}
        </span>
      );
    }
    return null;
  });
};

const styles = StyleSheet.create({
  blackTape: {
    backgroundColor: "black",
    color: "white",
    padding: "2px",
    fontWeight: "600",
    boxShadow: "black 8px 0px 0px 0px, black -7px 0px 0px 0px"
  }
});

// TODO This 'utility' file should be a React Component
