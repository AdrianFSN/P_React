function handleTags(tagsList) {
  const tags = tagsList.map((tag) => {
    return `${tag}`;
  });
  return tags.join(" ");
}

export default handleTags;
