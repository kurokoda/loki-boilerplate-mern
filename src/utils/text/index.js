export const truncateText = (input, maxLength) => {
  let output = input.slice();
  if (output.length > maxLength) {
    output = output.slice(0, maxLength);
    output = output.slice(0, output.lastIndexOf(" "));
    output += "...";
  }
  return output;
};
