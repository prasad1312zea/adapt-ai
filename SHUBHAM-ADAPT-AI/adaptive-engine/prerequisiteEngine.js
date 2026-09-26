const prerequisites = {
  graphs: ["trees"],
  trees: ["linkedList"],
  bst: ["trees"],
  linkedList: ["arrays"],
  recursion: ["arrays"]
};

function getPrerequisites(concept) {
  return prerequisites[concept] || [];
}

module.exports = {
  getPrerequisites
};