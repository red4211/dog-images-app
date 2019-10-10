import React from "react";
function SuggestionsList(props) {
  if (
    props.showSuggestions &&
    props.searchText &&
    props.filteredSuggestions.length > 0
  ) {
    const list = props.filteredSuggestions.map((suggestion, index) => {
      let className;
      if (index === props.activeSuggestion) {
        className = "suggestion-active";
      }

      return (
        <li className={className} key={suggestion} onClick={props.hClick}>
          {suggestion}
        </li>
      );
    });

    return <ul className="suggestions">{list}</ul>;
  } else {
    return null;
  }
}
export default SuggestionsList;
