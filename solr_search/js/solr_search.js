//------------------------------------------------------------------------------
var solrUrl = 'http://' + document.location.hostname + ':8983/solr/';
var solrServletAdminCores = 'admin/cores';
var solrServletSelect = 'select';
//------------------------------------------------------------------------------
var STRING_TRUE = "true";
var STRING_FALSE = "false";
//------------------------------------------------------------------------------
var HIGHLIGHTING_SENTINEL_START = "__SS_HS__";	// Solr-Search highlighting start
var HIGHLIGHTING_SENTINEL_START_RE = new RegExp(HIGHLIGHTING_SENTINEL_START, 'g');
var HIGHLIGHTING_SENTINEL_END = "__SS_HE__";	// Solr-Search highlighting end
var HIGHLIGHTING_SENTINEL_END_RE = new RegExp(HIGHLIGHTING_SENTINEL_END, 'g');
//------------------------------------------------------------------------------
var DEFAULT_NUMBER_OF_RESULTS_PER_PAGE = '10';
var DEFAULT_RESULTS_HYPERLINK = true;
var DEFAULT_RESULTS_SNIPPET_NUMBERS = true;
var DEFAULT_RESULTS_DIRECTORIES = false;
var DEFAULT_RESULTS_FONT_FAMILY = 'monospace';
var DEFAULT_RESULTS_FONT_SIZE = '90%';
var DEFAULT_RESULTS_FONT_COLOR = '#0080C0';
var DEFAULT_RESULTS_SELECTED_FONT_COLOR = '#FFFFFF';
var DEFAULT_RESULTS_SELECTED_BG_COLOR = '#0080C0';
var DEFAULT_HIGHLIGHTING_ENABLED = true;
var DEFAULT_HIGHLIGHTING_MAX_NUMBER_OF_SNIPPETS = '100';
var DEFAULT_HIGHLIGHTING_SNIPPET_LENGTH = '2048';
var DEFAULT_HIGHLIGHTING_MAX_ANALYZED_CHARACTERS = '104857600';
//var DEFAULT_HIGHLIGHTING_PRE = '%3Cspan%2Bstyle%253D%22background-color%253Ayellow%253B%22%3E';
//var DEFAULT_HIGHLIGHTING_POST = '%3C%252Fspan%3E';
//var DEFAULT_HIGHLIGHTING_PRE = '<span+style%3D"background-color%3Ayellow%3B">';
//var DEFAULT_HIGHLIGHTING_POST = '<%2Fspan>';
var DEFAULT_HIGHLIGHTING_PRE = '<span style="background-color:yellow">';
var DEFAULT_HIGHLIGHTING_POST = '</span>';
var DEFAULT_HIGHLIGHTING_FONT_FAMILY = 'sans-serif';
var DEFAULT_HIGHLIGHTING_FONT_SIZE = '90%';
var DEFAULT_HIGHLIGHTING_FONT_COLOR = '#000';
//------------------------------------------------------------------------------
var DIV_TOGGLE_OPEN = "&nbsp;&gt;&gt;&nbsp;";
var DIV_TOGGLE_CLOSE = "&nbsp;&lt;&lt;&nbsp;";
var DIV_TOGGLE_UP = "&nbsp;˄&nbsp;";
var DIV_TOGGLE_DOWN = "&nbsp;˅&nbsp;";
//var DIV_TOGGLE_OPEN_ALL_PARTS = "&nbsp;&gt;&gt;&gt;&nbsp;";
//var DIV_TOGGLE_CLOSE_ALL_PARTS = "&nbsp;&lt;&lt;&lt;&nbsp;";
//------------------------------------------------------------------------------
function setCSSClassPropertValues(cssClass, cssProperties, cssValues) {
	var documentCSSRules = document.styleSheets[0]['cssRules'];
	if (null == documentCSSRules) { documentCSSRules = document.styleSheets[0]['rules']; }
	if (documentCSSRules) {
		for (var i = 0, l1 = documentCSSRules.length; i < l1; ++i) {
			var cssRule = documentCSSRules[i];
			if (cssClass == cssRule.selectorText) {
				for (var j = 0, l2 = cssProperties.length; j < l2; ++j) {
					cssRule.style[(cssProperties[j])] = (cssValues[j]);
				}
				break;
			}
		}
	}
}
//------------------------------------------------------------------------------
function solrSearchEscapeHTML(value) {
	var textareaHTMLEscape = document.getElementById("textarea_html_escape");
	textareaHTMLEscape.textContent = value;
	textareaHTMLEscape.value = value;
	return textareaHTMLEscape.innerHTML;
}
//------------------------------------------------------------------------------
function isPositiveInteger(stringValue) {
	var isPositiveInteger = true;
	var intValue = parseInt(stringValue);
	if (isNaN(intValue)) {
		isPositiveInteger = false;
	} else if (intValue <= 0) {
		isPositiveInteger = false;
	}
	return isPositiveInteger;
}
//------------------------------------------------------------------------------
function appendANDIfNotEmpty(solr_query) {
	return (((null == solr_query) || ("" == solr_query)) ? (solr_query) : (solr_query + "+AND+"));
}
//------------------------------------------------------------------------------
function validateOptions() {
	var validateOptionsValue = true;
	//--------------------------------------------------------------------------
	if (false == isPositiveInteger(document.form_left.options_results_per_page.value)) {
		validateOptionsValue = false;
		window.alert('Invalid value in "Number of results per page" field.');
	}
	//--------------------------------------------------------------------------
	if (false == isPositiveInteger(document.form_left.options_snippets_maximum.value)) {
		validateOptionsValue = false;
		window.alert('Invalid value in "Max. number of snippets" field.');
	}
	//--------------------------------------------------------------------------
	if (false == isPositiveInteger(document.form_left.options_snippet_length.value)) {
		validateOptionsValue = false;
		window.alert('Invalid value in "Snippet length" field.');
	}
	//--------------------------------------------------------------------------
	if (false == isPositiveInteger(document.form_left.options_analyzed_chars_maximum.value)) {
		validateOptionsValue = false;
		window.alert('Invalid value in "Max. analyzed characters" field.');
	}
	//--------------------------------------------------------------------------
	return validateOptionsValue;
}
//------------------------------------------------------------------------------
function optionsSave() {
	if (validateOptions()) {
		setCookie("options_results_per_page", parseInt(document.form_left.options_results_per_page.value), 365 * 100);
		setCookie("options_results_hyperlink", document.form_left.options_results_hyperlink.checked, 365 * 100);
		setCookie("options_results_snippet_numbers", document.form_left.options_results_snippet_numbers.checked, 365 * 100);
		setCookie("options_results_directories", document.form_left.options_results_directories.checked, 365 * 100);
		setCookie("options_results_font_family", document.form_left.options_results_font_family.value, 365 * 100);
		setCookie("options_results_font_size", document.form_left.options_results_font_size.value, 365 * 100);
		setCookie("options_results_font_color", document.form_left.options_results_font_color.value, 365 * 100);
		setCookie("options_results_selected_font_color", document.form_left.options_results_selected_font_color.value, 365 * 100);
		setCookie("options_results_selected_bg_color", document.form_left.options_results_selected_bg_color.value, 365 * 100);
		setCookie("options_highlighting_enabled", document.form_left.options_highlighting_enabled.checked, 365 * 100);
		setCookie("options_snippets_maximum", parseInt(document.form_left.options_snippets_maximum.value), 365 * 100);
		setCookie("options_snippet_length", parseInt(document.form_left.options_snippet_length.value), 365 * 100);
		setCookie("options_analyzed_chars_maximum", parseInt(document.form_left.options_analyzed_chars_maximum.value), 365 * 100);
		setCookie("options_highlighting_pre", document.form_left.options_highlighting_pre.value, 365 * 100);
		setCookie("options_highlighting_post", document.form_left.options_highlighting_post.value, 365 * 100);
		setCookie("options_highlighting_font_family", document.form_left.options_highlighting_font_family.value, 365 * 100);
		setCookie("options_highlighting_font_size", document.form_left.options_highlighting_font_size.value, 365 * 100);
		setCookie("options_highlighting_font_color", document.form_left.options_highlighting_font_color.value, 365 * 100);
	}
}
function optionsLoad() {
	var cookieValue = "";
	cookieValue = getCookie("options_results_per_page");
	document.form_left.options_results_per_page.value = ((null == cookieValue) || ("" == cookieValue)) ? DEFAULT_NUMBER_OF_RESULTS_PER_PAGE : cookieValue;
	cookieValue = getCookie("options_results_hyperlink");
	document.form_left.options_results_hyperlink.checked = ((null == cookieValue) || ("" == cookieValue)) ? DEFAULT_RESULTS_HYPERLINK : (STRING_TRUE == cookieValue);
	cookieValue = getCookie("options_results_snippet_numbers");
	document.form_left.options_results_snippet_numbers.checked = ((null == cookieValue) || ("" == cookieValue)) ? DEFAULT_RESULTS_SNIPPET_NUMBERS : (STRING_TRUE == cookieValue);
	cookieValue = getCookie("options_results_directories");
	document.form_left.options_results_directories.checked = ((null == cookieValue) || ("" == cookieValue)) ? DEFAULT_RESULTS_DIRECTORIES : (STRING_TRUE == cookieValue);
	cookieValue = getCookie("options_results_font_family");
	document.form_left.options_results_font_family.value = ((null == cookieValue) || ("" == cookieValue)) ? DEFAULT_RESULTS_FONT_FAMILY : cookieValue;
	cookieValue = getCookie("options_results_font_size");
	document.form_left.options_results_font_size.value = ((null == cookieValue) || ("" == cookieValue)) ? DEFAULT_RESULTS_FONT_SIZE : cookieValue;
	cookieValue = getCookie("options_results_font_color");
	document.form_left.options_results_font_color.value = ((null == cookieValue) || ("" == cookieValue)) ? DEFAULT_RESULTS_FONT_COLOR : cookieValue;
	cookieValue = getCookie("options_results_selected_font_color");
	document.form_left.options_results_selected_font_color.value = ((null == cookieValue) || ("" == cookieValue)) ? DEFAULT_RESULTS_SELECTED_FONT_COLOR : cookieValue;
	cookieValue = getCookie("options_results_selected_bg_color");
	document.form_left.options_results_selected_bg_color.value = ((null == cookieValue) || ("" == cookieValue)) ? DEFAULT_RESULTS_SELECTED_BG_COLOR : cookieValue;
	cookieValue = getCookie("options_highlighting_enabled");
	document.form_left.options_highlighting_enabled.checked = ((null == cookieValue) || ("" == cookieValue)) ? DEFAULT_HIGHLIGHTING_ENABLED : (STRING_TRUE == cookieValue);
	cookieValue = getCookie("options_snippets_maximum");
	document.form_left.options_snippets_maximum.value = ((null == cookieValue) || ("" == cookieValue)) ? DEFAULT_HIGHLIGHTING_MAX_NUMBER_OF_SNIPPETS : cookieValue;
	cookieValue = getCookie("options_snippet_length");
	document.form_left.options_snippet_length.value = ((null == cookieValue) || ("" == cookieValue)) ? DEFAULT_HIGHLIGHTING_SNIPPET_LENGTH : cookieValue;
	cookieValue = getCookie("options_analyzed_chars_maximum");
	document.form_left.options_analyzed_chars_maximum.value = ((null == cookieValue) || ("" == cookieValue)) ? DEFAULT_HIGHLIGHTING_MAX_ANALYZED_CHARACTERS : cookieValue;
	cookieValue = getCookie("options_highlighting_pre");
	document.form_left.options_highlighting_pre.value = ((null == cookieValue) || ("" == cookieValue)) ? DEFAULT_HIGHLIGHTING_PRE : cookieValue;
	cookieValue = getCookie("options_highlighting_post");
	document.form_left.options_highlighting_post.value = ((null == cookieValue) || ("" == cookieValue)) ? DEFAULT_HIGHLIGHTING_POST : cookieValue;
	cookieValue = getCookie("options_highlighting_font_family");
	document.form_left.options_highlighting_font_family.value = ((null == cookieValue) || ("" == cookieValue)) ? DEFAULT_HIGHLIGHTING_FONT_FAMILY : cookieValue;
	cookieValue = getCookie("options_highlighting_font_size");
	document.form_left.options_highlighting_font_size.value = ((null == cookieValue) || ("" == cookieValue)) ? DEFAULT_HIGHLIGHTING_FONT_SIZE : cookieValue;
	cookieValue = getCookie("options_highlighting_font_color");
	document.form_left.options_highlighting_font_color.value = ((null == cookieValue) || ("" == cookieValue)) ? DEFAULT_HIGHLIGHTING_FONT_COLOR : cookieValue;
}
function optionsDefaults() {
	document.form_left.options_results_per_page.value = DEFAULT_NUMBER_OF_RESULTS_PER_PAGE;
	document.form_left.options_results_hyperlink.checked = DEFAULT_RESULTS_HYPERLINK;
	document.form_left.options_results_snippet_numbers.checked = DEFAULT_RESULTS_SNIPPET_NUMBERS;
	document.form_left.options_results_directories.checked = DEFAULT_RESULTS_DIRECTORIES;
	document.form_left.options_results_font_family.value = DEFAULT_RESULTS_FONT_FAMILY;
	document.form_left.options_results_font_size.value = DEFAULT_RESULTS_FONT_SIZE;
	document.form_left.options_results_font_color.value = DEFAULT_RESULTS_FONT_COLOR;
	document.form_left.options_results_selected_font_color.value = DEFAULT_RESULTS_SELECTED_FONT_COLOR;
	document.form_left.options_results_selected_bg_color.value = DEFAULT_RESULTS_SELECTED_BG_COLOR;	
	document.form_left.options_highlighting_enabled.checked = DEFAULT_HIGHLIGHTING_ENABLED;
	document.form_left.options_snippets_maximum.value = DEFAULT_HIGHLIGHTING_MAX_NUMBER_OF_SNIPPETS;
	document.form_left.options_snippet_length.value = DEFAULT_HIGHLIGHTING_SNIPPET_LENGTH;
	document.form_left.options_analyzed_chars_maximum.value = DEFAULT_HIGHLIGHTING_MAX_ANALYZED_CHARACTERS;
	document.form_left.options_highlighting_pre.value = DEFAULT_HIGHLIGHTING_PRE;
	document.form_left.options_highlighting_post.value = DEFAULT_HIGHLIGHTING_POST;
	document.form_left.options_highlighting_font_family.value = DEFAULT_HIGHLIGHTING_FONT_FAMILY;
	document.form_left.options_highlighting_font_size.value = DEFAULT_HIGHLIGHTING_FONT_SIZE;
	document.form_left.options_highlighting_font_color.value = DEFAULT_HIGHLIGHTING_FONT_COLOR;
}
//------------------------------------------------------------------------------
//var highlightResultsArrowSpanOpenInnerHtml = "&gt;&gt;";
//var highlightResultsArrowSpanCloseInnerHtml = "&lt;&lt;";
//var highlightResultsArrowSpanOpenInnerHtml = "&#x00BB;";
//var highlightResultsArrowSpanCloseInnerHtml = "&#x00AB;";
var resultDivIdPrefix = "result_";
var highlightResultsDivIdPrefix = "result_h_";
//var highlightResultsArrowSpanIdPrefix = "result_highlight_arrow_";
//------------------------------------------------------------------------------
var NULL_VALUE = "(null)";
//------------------------------------------------------------------------------
function getSearchCore() {
	return  ((0 > document.form_left.solr_cores_search.selectedIndex)
				? ("")
				: (document.form_left.solr_cores_search.options[document.form_left.solr_cores_search.selectedIndex].value));
}
//------------------------------------------------------------------------------
function getFreeSearchCore() {
	return  ((0 > document.form_left.solr_cores_free_search.selectedIndex)
				? ("")
				: (document.form_left.solr_cores_free_search.options[document.form_left.solr_cores_free_search.selectedIndex].value));
}
//------------------------------------------------------------------------------
var TAB_INDEX_SEARCH = 0;
var TAB_INDEX_FREE_SEARCH = 1;
var TAB_INDEX_OPTIONS = 2;
//------------------------------------------------------------------------------
function setLeftFormActiveTab(tabIndex) {
	var validationPassed = true;
	if (("tab_button_selected" == document.getElementById("tab_button_options").className)
		&& (TAB_INDEX_OPTIONS != tabIndex)) {
		validationPassed = validateOptions();
	}
	//--------------------------------------------------------------------------
	if (validationPassed) {
		if ((tabIndex < TAB_INDEX_SEARCH) || (tabIndex > TAB_INDEX_OPTIONS)) {
			tabIndex = TAB_INDEX_SEARCH;
		}
		//----------------------------------------------------------------------
		switch (tabIndex) {
			case TAB_INDEX_SEARCH: {
				document.getElementById("tab_button_search_form").className = "tab_button_selected";
				document.getElementById("tab_button_free_search").className = "tab_button_not_selected";
				document.getElementById("tab_button_options").className = "tab_button_not_selected";
				document.getElementById("tab_div_search_form").className = "tab_div_selected";
				document.getElementById("tab_div_free_search").className = "tab_div_not_selected";
				document.getElementById("tab_div_options").className = "tab_div_not_selected";
			}
			break;
			case TAB_INDEX_FREE_SEARCH: {
				document.getElementById("tab_button_search_form").className = "tab_button_not_selected";
				document.getElementById("tab_button_free_search").className = "tab_button_selected";
				document.getElementById("tab_button_options").className = "tab_button_not_selected";
				document.getElementById("tab_div_search_form").className = "tab_div_not_selected";
				document.getElementById("tab_div_free_search").className = "tab_div_selected";
				document.getElementById("tab_div_options").className = "tab_div_not_selected";
			}
			break;
			case TAB_INDEX_OPTIONS: {
				document.getElementById("tab_button_search_form").className = "tab_button_not_selected";
				document.getElementById("tab_button_free_search").className = "tab_button_not_selected";
				document.getElementById("tab_button_options").className = "tab_button_selected";
				document.getElementById("tab_div_search_form").className = "tab_div_not_selected";
				document.getElementById("tab_div_free_search").className = "tab_div_not_selected";
				document.getElementById("tab_div_options").className = "tab_div_selected";
			}
			break;
		}
	}
}
//------------------------------------------------------------------------------
function onBodyLoad_SolrSearch() {
	optionsLoad();
	//--------------------------------------------------------------------------
	setLeftFormActiveTab(TAB_INDEX_SEARCH);
//	setLeftFormActiveTab(TAB_INDEX_FREE_SEARCH);
//	setLeftFormActiveTab(TAB_INDEX_OPTIONS);
	//--------------------------------------------------------------------------
	var options = {
		dataType: 'json'
	};
	//--------------------------------------------------------------------------
	options.url = solrUrl + solrServletAdminCores + '?wt=json';
	jQuery.ajax(options).done(handleAdminCoresResults).fail(handleAdminCoresResultsError);
}
//------------------------------------------------------------------------------
function handleAdminCoresResults(data) {
	//window.console && console.log && console.log(data);
	if (null != data.status) {
		for (var solrCore in data.status) {
			var solrCoreOption = new Option(data.status[solrCore].name, solrCore);
			solrCoreOption.selected = data.status[solrCore].isDefaultCore;
			document.form_left.solr_cores_search.options.add(solrCoreOption);
			solrCoreOption = new Option(data.status[solrCore].name, solrCore);
			solrCoreOption.selected = data.status[solrCore].isDefaultCore;
			document.form_left.solr_cores_free_search.options.add(solrCoreOption);
		}
	}
}
//------------------------------------------------------------------------------
function handleAdminCoresResultsError(jqXHR, textStatus, errorThrown) {
	if (window.console && console.log) {
	    console.log("handleAdminCoresResultsError:");
	    //console.log("\tjqXHR: " + jqXHR);
	    console.log("\tjqXHR.responseText: " + ((null == jqXHR) ? (NULL_VALUE) : ((null == jqXHR.responseText) ? (NULL_VALUE) : (jqXHR.responseText))));
	    //console.log("\ttextStatus:" + textStatus);
	    //console.log("\terrorThrown:" + errorThrown);
	} else {
		window.alert("handleAdminCoresResultsError:\n\tjqXHR.responseText: " + ((null == jqXHR) ? (NULL_VALUE) : ((null == jqXHR.responseText) ? (NULL_VALUE) : (jqXHR.responseText))));
	}
}
//------------------------------------------------------------------------------
function searchStart() {
	document.getElementById("docs").innerHTML = "";
	document.getElementById("highlighting_snippets").innerHTML = "";
	//--------------------------------------------------------------------------
	toggleDocsList(false, true);
	//--------------------------------------------------------------------------
	document.results_page_form.style.display = "none";
	document.getElementById("results_page_range_total").innerHTML = "&nbsp;&nbsp;";
	document.getElementById("pager-header").style.backgroundImage = 'url(images/ajax-loader.gif)';
}
function searchEnd() {
	document.getElementById("pager-header").style.backgroundImage = 'none';
}
//------------------------------------------------------------------------------
//function highlightStart(highlightResultsArrowSpanId) {
//	document.getElementById(highlightResultsArrowSpanId).innerHTML = "&nbsp;&nbsp;&nbsp;";
//	document.getElementById(highlightResultsArrowSpanId).style.backgroundImage = 'url(images/ajax-loader.gif)';
//}
function highlightStart() {
	document.getElementById("highlighting_snippets").innerHTML = "&nbsp;";
	document.getElementById("highlighting_snippets").style.backgroundImage = 'url(images/ajax-loader.gif)';
}
//function highlightEnd(highlightResultsArrowSpanId) {
//	document.getElementById(highlightResultsArrowSpanId).style.backgroundImage = 'none';
//	document.getElementById(highlightResultsArrowSpanId).innerHTML = highlightResultsArrowSpanCloseInnerHtml;
//}
function highlightEnd(highlightResultsDivId) {
	document.getElementById("highlighting_snippets").style.backgroundImage = 'none';
		//	document.body.style.cursor = 'wait';
		//	var highlightingSnippetsNode = document.getElementById(highlightResultsDivId);
		//	var searchResultNode = highlightingSnippetsNode.parentNode;
		//	highlightingSnippetsNode = searchResultNode.removeChild(highlightingSnippetsNode);
		//	document.getElementById("highlighting_snippets").appendChild(highlightingSnippetsNode);
	document.getElementById("highlighting_snippets").innerHTML = document.getElementById(highlightResultsDivId).innerHTML;
		//	document.body.style.cursor = 'default';
}
//------------------------------------------------------------------------------
var CONST_RESULTS_EMPTY = "0 result(s)";
function ResultsRangeTotal(start, rows, numFound) {
	var resultsRangeTotal = CONST_RESULTS_EMPTY;
	if (numFound > 0) {
		if (numFound > rows) {
			resultsRangeTotal = ("(" + (start + 1) + " - " + ((numFound < (start + rows)) ? (numFound) : (start + rows)) + ") / " + numFound + " result(s)");
		} else {
			resultsRangeTotal = (numFound + " result(s)");
		}
	}
	return resultsRangeTotal;
}
//function ResultsPreviousPage(start, rows, numFound) {
//	resultsPreviousPage = '<form name="current_page_form" style="display:inline-block;float:right;">';
//	if (numFound > rows) {
//		if (0 < start) {
//			//resultsPreviousPage = '<span class="cursor_pointer" onclick="searchGoToPage(' + (start - rows) + ', ' + rows + ');">&#x00AB;</span>&nbsp;';
//			resultsPreviousPage += '<span class="cursor_pointer" onclick="searchGoToPage(' + (start - rows) + ', ' + rows + ');">&lt;&lt;</span>';
//		}
//	}
//	return resultsPreviousPage;
//}
//function ResultsCurrentPage(start, rows, numFound) {
//	var resultsCurrentPage = '';
//	if (numFound > rows) {
//		resultsCurrentPage = '<span> page </span>'
//								+ '<input type="text" name="results_page_number" class="current_page_text" value=' + ((start / rows) + 1) + '>'
//								+ '<input type="button" class="current_page_button" value="GO" onclick="searchGoToPageNumber(' + document.current_page_form.results_page_number.value + ', ' + rows + ', ' + numFound + ');"> ';
//	}
//	return resultsCurrentPage;
//}
//function ResultsNextPage(start, rows, numFound) {
//	resultsNextPage = '';
//	if (numFound > (start + rows)) {
//		//resultsNextPage = '&nbsp;<span class="cursor_pointer" onclick="searchGoToPage(' + (start + rows) + ', ' + rows + ');">&#x00BB;</span> ';
//		resultsNextPage = '<span class="cursor_pointer" onclick="searchGoToPage(' + (start + rows) + ', ' + rows + ');">&gt;&gt;</span> ';
//	}
//	resultsNextPage += '</form>'
//	return resultsNextPage;
//}
//------------------------------------------------------------------------------
//function escapeSingleAndDoubleQuotes(stringValue) {
//	//return stringValue.replace(/'/g, "\\'").replace(/"/g, '\\"');	
//	return stringValue.replace(/'/g, "\\'");	
//}
//------------------------------------------------------------------------------
////function search(file_path_query, file_content_query, whole_word) {
//function search(solrCore, file_path_query, file_content_query) {
////	if ((document.form_left.solr_cores_search.length <= 0)
////		|| (document.form_left.solr_cores_search.selectedIndex < 0)) {
////		window.alert('Please select a collection.');
////	} else {
//		var q_value = "";
//		var q_value_content = "";
//		if (false == document.form_left.options_results_directories.checked) {
//			q_value = "id%3A%2F.*%5B%5E%5C%2F%5D%2F";	// (id:/.*[^\/]/ AND ) : id does not end with '/' character
//		}
//		if ((null != file_path_query) && ("" != file_path_query)) {
//			//q_value = "url%3A" + escapeSingleAndDoubleQuotes(file_path_query);
//			q_value_content = "url%3A" + encodeURIComponent(file_path_query);
//			if ((null != q_value) && ("" != q_value)) {
//				q_value += "+AND+";
//			}
//			q_value += q_value_content;
//		}
//		if ((null != file_content_query) && ("" != file_content_query)) {
//			if ((null != q_value) && ("" != q_value)) {
//				q_value += "+AND+";
//			}
//			//if (whole_word) {
//			//	//q_value += "content%3A" + escapeSingleAndDoubleQuotes(file_content_query);
//			//	q_value += "content%3A" + encodeURIComponent(file_content_query);
//			//} else {
//			//	//q_value += "content%3A*" + escapeSingleAndDoubleQuotes(file_content_query) + "*";
//			//	q_value += "content%3A*" + encodeURIComponent(file_content_query) + "*";
//			//}
//			q_value_content = "content%3A" + encodeURIComponent(file_content_query); 
//			q_value += q_value_content;
//		}
//		//----------------------------------------------------------------------
//		if ((null != q_value) && ("" != q_value)) {
//			searchStart();
//			//------------------------------------------------------------------
//			document.getElementById("file_path_query").innerHTML = file_path_query;
//			document.getElementById("file_content_query").innerHTML = file_content_query;
//			document.getElementById("collection_query").innerHTML = solrCore;
//			//document.getElementById("whole_word_query").innerHTML = whole_word ? "Yes" : "No";
//			//------------------------------------------------------------------
//			document.getElementById("docs").innerHTML = "";
//			//document.getElementById("pager-header").innerHTML = CONST_RESULTS_EMPTY;
//			//------------------------------------------------------------------
//			var options = {
//				dataType: 'json'
//			};
//			options.url = solrUrl + (("" == solrCore) ? ("") : (solrCore + "/")) + solrServletSelect + '?q=' + q_value + '&fl=id%2Curl%2Ctstamp&start=0&rows=' + (parseInt(document.form_left.options_results_per_page.value)) + '&wt=json&json.wrf=?';
//			//------------------------------------------------------------------
//			jQuery.ajax(options).done(getSearchResultsHandler(solrCore, q_value, q_value_content)).fail(getSearchResultsErrorHandler(options.url));
//		} else {
//			window.alert('Please enter search criteria.');
//		}
////	}
//}
//------------------------------------------------------------------------------
function search(solrCore, file_path_query, file_content_query, filter_query) {
	var q_value = "";
	var q_value_content = "";
	var fq_value = "";
	//----------------------------------------------------------------------
	if (false == document.form_left.options_results_directories.checked) {
		fq_value = "id%3A%2F.*%5B%5E%5C%2F%5D%2F";	// (id:/.*[^\/]/ AND ) : id does not end with '/' character
	}
	//----------------------------------------------------------------------
	if ((null != file_path_query) && ("" != file_path_query)) {
		q_value_content = "url%3A" + encodeURIComponent(file_path_query);
//		if ((null != q_value) && ("" != q_value)) {
//			q_value += "+AND+";
//		}
		q_value = appendANDIfNotEmpty(q_value);
		q_value += q_value_content;
	}
	if ((null != file_content_query) && ("" != file_content_query)) {
//		if ((null != q_value) && ("" != q_value)) {
//			q_value += "+AND+";
//		}
		q_value_content = "content%3A" + encodeURIComponent(file_content_query); 
		q_value = appendANDIfNotEmpty(q_value);
		q_value += q_value_content;
	}
	//----------------------------------------------------------------------
	if ((null != filter_query) && ("" != filter_query)) {
//		if ((null != fq_value) && ("" != fq_value)) {
//			fq_value += "+AND+";
//		}
		fq_value = appendANDIfNotEmpty(fq_value);
		var filterQueryURIComponentEncoded = encodeURIComponent(filter_query);
		fq_value += "(url%3A" + filterQueryURIComponentEncoded + "+OR+content%3A" + filterQueryURIComponentEncoded + ")";
	}
	//----------------------------------------------------------------------
	if ((null != q_value) && ("" != q_value)) {
		start_search(file_path_query, file_content_query, "", filter_query, solrCore, q_value, q_value_content, fq_value);
	} else {
		window.alert('Please enter search criteria.');
	}
}
//------------------------------------------------------------------------------
function search_free(solrCore, free_query, filter_query) {
	var q_value = "";
	var q_value_content = "";
	var fq_value = "";
	//----------------------------------------------------------------------
//	if (false == document.form_left.options_results_directories.checked) {
//		fq_value = "id%3A%2F.*%5B%5E%5C%2F%5D%2F";	// (id:/.*[^\/]/ AND ) : id does not end with '/' character
//	}
	//----------------------------------------------------------------------
	if ((null != free_query) && ("" != free_query)) {
		q_value_content = encodeURIComponent(free_query);
//		if ((null != q_value) && ("" != q_value)) {
//			q_value += "+AND+";
//		}
		q_value = appendANDIfNotEmpty(q_value);
		q_value += q_value_content;
	}
	//----------------------------------------------------------------------
	if ((null != filter_query) && ("" != filter_query)) {
//		if ((null != fq_value) && ("" != fq_value)) {
//			fq_value += "+AND+";
//		}
		fq_value = appendANDIfNotEmpty(fq_value);
		fq_value += encodeURIComponent(filter_query);
	}
	//----------------------------------------------------------------------
	if ((null != q_value) && ("" != q_value)) {
		start_search("", "", free_query, filter_query, solrCore, q_value, q_value_content, fq_value);
	} else {
		window.alert('Please enter search criteria.');
	}
}
//------------------------------------------------------------------------------
function start_search(file_path_query, file_content_query, free_query, filter_query, solrCore, q_value, q_value_content, fq_value) {
	searchStart();
	//--------------------------------------------------------------------------
	document.getElementById("file_path_query").innerHTML = file_path_query;
	document.getElementById("file_content_query").innerHTML = file_content_query;
	document.getElementById("free_query").innerHTML = free_query;
	document.getElementById("filter_query").innerHTML = filter_query;
	document.getElementById("collection_query").innerHTML = solrCore;
	//--------------------------------------------------------------------------
	var options = {
		dataType: 'json'
	};
	options.url = solrUrl + (("" == solrCore) ? ("") : (solrCore + "/")) + solrServletSelect
					+ '?q=' + q_value
					+ (((null != fq_value) && ("" != fq_value)) ? ("&fq=" + fq_value) : (""))
					+ '&fl=id%2Curl%2Ctstamp&start=0&rows=' + (parseInt(document.form_left.options_results_per_page.value)) + '&wt=json&json.wrf=?';
	document.getElementById("solr_select_url").innerHTML = options.url;
	//--------------------------------------------------------------------------
	jQuery.ajax(options).done(getSearchResultsHandler(solrCore, q_value, q_value_content, fq_value)).fail(getSearchResultsErrorHandler(options.url));
}
//------------------------------------------------------------------------------
function getSearchResultsHandler(solrCore, q_value, q_value_content, fq_value) {
	return function(data) { handleSearchResults(solrCore, q_value, q_value_content, fq_value, data); }
}
//------------------------------------------------------------------------------
function handleSearchResults(solrCore, q_value, q_value_content, fq_value, data) {
	//window.console && console.log && console.log(data);
	//document.getElementById("solr_q").innerHTML = data.responseHeader.params.q;
	document.getElementById("solr_q").innerHTML = q_value;
	document.getElementById("solr_q_content").innerHTML = q_value_content;
	document.getElementById("solr_fq").innerHTML = fq_value;
	document.getElementById("collection_query").innerHTML = solrCore;
	//--------------------------------------------------------------------------
//	document.getElementById("pager-header").innerHTML = ResultsRangeTotal(data.response.start, (parseInt(document.form_left.options_results_per_page.value)), data.response.numFound)
//														+ ResultsPreviousPage(data.response.start, (parseInt(document.form_left.options_results_per_page.value)), data.response.numFound)
//														+ ResultsCurrentPage(data.response.start, (parseInt(document.form_left.options_results_per_page.value)), data.response.numFound)
//														+ ResultsNextPage(data.response.start, (parseInt(document.form_left.options_results_per_page.value)), data.response.numFound);
	var start = data.response.start;
	var rows = parseInt(data.responseHeader.params.rows);
	var numFound = data.response.numFound;
	document.getElementById("results_page_range_total").innerHTML = ResultsRangeTotal(data.response.start, rows, data.response.numFound);
	if (numFound > rows) {
		//document.getElementById("results_page_previous").style.display = (((numFound > rows) && (0 < start)) ? ("inline") : ("none"));
		document.getElementById("results_page_previous").className = (((numFound > rows) && (0 < start)) ? ("cursor_pointer") : ("none"));
		//document.getElementById("results_page_previous").setAttribute('onclick', (((numFound > rows) && (0 < start)) ? ("searchGoToPage(" + (start - rows) + ', ' + rows + ");") : ("")));
		document.getElementById("results_page_previous").onclick = ((numFound > rows) && (0 < start)) ? (function() { searchGoToPage((start - rows), rows); }) : (null);
		document.results_page_form.results_page_number.value = ((start / rows) + 1);
		document.getElementById("results_page_last").innerHTML = " / " + (Math.ceil(numFound / rows));
		//document.results_page_form.results_page_go_button.setAttribute('onclick', "searchGoToPageNumber(" + rows + ", " + numFound + ");");
		document.results_page_form.results_page_go_button.onclick = function() { searchGoToPageNumber(rows , numFound); };
		//document.getElementById("results_page_next").style.display = ((numFound > (start + rows)) ? ("inline") : ("none"));
		document.getElementById("results_page_next").className = ((numFound > (start + rows)) ? ("cursor_pointer") : ("none"));
		//document.getElementById("results_page_next").setAttribute('onclick', ((numFound > (start + rows)) ? ("searchGoToPage(" + (start + rows) + ", " + rows + ");") : ("")));
		document.getElementById("results_page_next").onclick = (numFound > (start + rows)) ? (function() { searchGoToPage((start + rows), rows); }) : (null);
		document.results_page_form.style.display = "inline-block";
	} else {
		//document.getElementById("results_page_previous").setAttribute('onclick', "");
		//document.results_page_form.results_page_go_button.setAttribute('onclick', "");
		//document.getElementById("results_page_next").setAttribute('onclick', "");
		document.getElementById("results_page_previous").onclick = null;
		document.results_page_form.results_page_go_button.onclick = null;
		document.getElementById("results_page_next").onclick = null;
	}
	//--------------------------------------------------------------------------
	if (0 < data.response.docs.length) {
//		setCSSClassPropertValues('.search_result_url', ['font-family', 'font-size', 'color'],
//									[ document.form_left.options_results_font_family.value,
//									  document.form_left.options_results_font_size.value,
//									  document.form_left.options_results_font_color.value
//									]);
		setCSSClassPropertValues('.search_result', ['font-family', 'font-size', 'color'],
				[ document.form_left.options_results_font_family.value,
				  document.form_left.options_results_font_size.value,
				  document.form_left.options_results_font_color.value,
				]);
		setCSSClassPropertValues('.search_result_selected', ['font-family', 'font-size', 'color', 'background-color'],
				[ document.form_left.options_results_font_family.value,
				  document.form_left.options_results_font_size.value,
				  document.form_left.options_results_selected_font_color.value,
				  document.form_left.options_results_selected_bg_color.value
				]);
	}
	//--------------------------------------------------------------------------
	var searchResults = "";
	for (var i = 0, l = data.response.docs.length; i < l; ++i) {
		searchResults += '<div id=\'' + (resultDivIdPrefix + (i + 1)) + '\' class="search_result" onclick="onSearchResultClick(event, this, \'' + data.response.docs[i].id + '\', ' + i + ');">'
//			+ '<h3 class="search_result_url">'
				+ ((document.form_left.options_results_hyperlink.checked) ? ('<a href="' + decodeURI(data.response.docs[i].url) + '" target="_blank" class="search_result_url">') : (''))
				+ decodeURI(data.response.docs[i].url)
				+ ((document.form_left.options_results_hyperlink.checked) ? ('</a>') : (' '))
//				+ ((document.form_left.options_highlighting_enabled.checked)
//						? ('<span id=\'' + highlightResultsArrowSpanIdPrefix + (i + 1) + '\' class="background_no_repeat cursor_pointer highlight_results_arrow" onclick="highlight(event, \'' + data.response.docs[i].id + '\', ' + i + ');">' + highlightResultsArrowSpanOpenInnerHtml + '</span>') //+ '<span onclick="highlight(\'' + data.responseHeader.params.q + '\', \'' + data.response.docs[i].id + '\', \'result_' + (i + 1) + '\');">&gt;&gt;</span>'
//						: (''))
//			+ '</h3>'
			+ '<div class="search_result_time_stamp">' + data.response.docs[i].tstamp + '</div>'
			+ '<div id=\'' + (highlightResultsDivIdPrefix + (i + 1)) + '\' class=\'search_result_highlight_hidden\'></div>'
			+ '</div>';
	}
	document.getElementById("docs").innerHTML = searchResults;
	//--------------------------------------------------------------------------
	searchEnd();
}
//------------------------------------------------------------------------------
function getSearchResultsErrorHandler(url) {
	return function(data, textStatus, jqXHR) { handleSearchResultsError(url, data, textStatus, jqXHR) }
}
//------------------------------------------------------------------------------
function handleSearchResultsError(url, jqXHR, textStatus, errorThrown) {
	searchEnd();
	document.getElementById("results_page_range_total").innerHTML = "<span class='error'>" + CONST_RESULTS_EMPTY + "</span>";
	//--------------------------------------------------------------------------
	if (window.console && console.log) {
	    console.log("handleSearchResultsError:");
	    console.log("\turl: " + url);
	    //console.log("\tjqXHR: " + jqXHR);
	    console.log("\tjqXHR.responseText: " + ((null == jqXHR) ? (NULL_VALUE) : ((null == jqXHR.responseText) ? (NULL_VALUE) : (jqXHR.responseText))));
	    //console.log("\ttextStatus:" + textStatus);
	    //console.log("\terrorThrown:" + errorThrown);
	} else {
		window.alert("handleSearchResultsError:\n\turl: " + url + "\n\tjqXHR.responseText: " + ((null == jqXHR) ? (NULL_VALUE) : ((null == jqXHR.responseText) ? (NULL_VALUE) : (jqXHR.responseText))));
	}
}
//------------------------------------------------------------------------------
function selectSearchResult(searchResultElement) {
	var allResultNodes = searchResultElement.parentNode.childNodes;
	for (var childNodeIndex=0, allResultNodesLength=allResultNodes.length; childNodeIndex < allResultNodesLength; ++childNodeIndex) {
		allResultNodes[childNodeIndex].className = "search_result";
	} 
	searchResultElement.className = "search_result_selected";
}
//------------------------------------------------------------------------------
function onSearchResultClick(event, element, resultSolrId, resultIndex) {
//	if ((null != event)
//		&& (null != event.currentTarget)
//		&& (null != event.currentTarget.id)) {
//		if (0 == event.currentTarget.id.indexOf(resultDivIdPrefix)) {
//			var resultIndex = event.currentTarget.id.substring(resultDivIdPrefix.length);
//			selectSearchResult(event.currentTarget);
			selectSearchResult(element);
			highlight(event, resultSolrId, resultIndex);
//		}
//	}
}
//------------------------------------------------------------------------------
function searchGoToPageNumber(rows, numFound) {
	var pageNumber = document.results_page_form.results_page_number.value;
	if (false == isPositiveInteger(pageNumber)) {
		window.alert('Incorrect page number.');
	} else {
		var start = ((pageNumber - 1) * rows);
		if (start < numFound) {
			searchGoToPage(start, rows)
		} else {
			window.alert('Incorrect page number.');
		}
	}
}
//------------------------------------------------------------------------------
function searchGoToPage(start, rows) {
	searchStart();
	//--------------------------------------------------------------------------
	var q_value = document.getElementById("solr_q").innerHTML;
	var q_value_content = document.getElementById("solr_q_content").innerHTML;
	var fq_value = document.getElementById("solr_fq").innerHTML;
	var solrCore = document.getElementById("collection_query").innerHTML;
	//--------------------------------------------------------------------------
	var options = {
		dataType: 'json'
	};
	//--------------------------------------------------------------------------
	if ((null != q_value) && ("" != q_value)) {
		//options.url = solrUrl + getCurrentCore() + "/" + solrServletSelect + '?q=' + encodeURIComponent(q) + '&fl=id%2Curl%2Ctstamp&start=' + start + '&rows=' + rows + '&wt=json&json.wrf=?';
		//options.url = solrUrl + getCurrentCore() + "/" + solrServletSelect + '?q=' + q_value + '&fl=id%2Curl%2Ctstamp&start=' + start + '&rows=' + rows + '&wt=json&json.wrf=?';
		options.url = solrUrl + (("" == solrCore) ? ("") : (solrCore + "/")) + solrServletSelect
						+ '?q=' + q_value
						+ (((null != fq_value) && ("" != fq_value)) ? ("&fq=" + fq_value) : (""))
						+ '&fl=id%2Curl%2Ctstamp&start=' + start + '&rows=' + rows + '&wt=json&json.wrf=?';
		document.getElementById("solr_select_url").innerHTML = options.url;
		jQuery.ajax(options).done(getSearchResultsHandler(solrCore, q_value, q_value_content, fq_value)).fail(getSearchResultsErrorHandler(options.url));
	} else {
		if (window.console && console.log) {
		    console.log("searchGoToPage: Unexpected error - empty query.");
		} else {
			window.alert("searchGoToPage: Unexpected error - empty query.");
		}
	}
}
//------------------------------------------------------------------------------
function highlight(event, resultSolrId, resultIndex) {
	var highlightResultsDivId = highlightResultsDivIdPrefix + (resultIndex + 1);
//	var highlightResultsArrowSpanId = highlightResultsArrowSpanIdPrefix + (resultIndex + 1);
	//--------------------------------------------------------------------------
	var q_value_content = document.getElementById("solr_q_content").innerHTML;
	if ((null == q_value_content) || ("" == q_value_content)) {
		q_value_content = document.getElementById("solr_q").innerHTML;
	}
	var solrCore = document.getElementById("collection_query").innerHTML;
	//--------------------------------------------------------------------------
	var highlightResultsDivIdElement = document.getElementById(highlightResultsDivId);
	//--------------------------------------------------------------------------
	//highlightStart(highlightResultsArrowSpanId);
	highlightStart();
//	highlightResultsDivIdElement.style.display = ((highlightResultsDivIdElement.style.display == "block") ? ("none") : ("block"));  
	//highlightEnd(highlightResultsArrowSpanId);
	//--------------------------------------------------------------------------
	if (highlightResultsDivIdElement.innerHTML == "") {
//		highlightStart(highlightResultsArrowSpanId);
		//----------------------------------------------------------------------
		var options = {
			dataType: 'json'
		};
		//----------------------------------------------------------------------
		if ((null != q_value_content) && ("" != q_value_content)) {
			//options.url = solrUrl + getCurrentCore() + "/" + solrServletSelect + '?q=id%3A%22' + encodeURIComponent(resultSolrId) + '%22+AND+' + encodeURIComponent(q) + '&fl=id&hl=true&hl.fl=content&hl.snippets=100&hl.fragsize=2048&hl.maxAnalyzedChars=10485760&hl.simple.pre=<span+style%3D"background-color%3Ayellow%3B">&hl.simple.post=<%2Fspan>&wt=json&json.wrf=?';
			//options.url = solrUrl + getCurrentCore() + "/" + solrServletSelect + '?q=id%3A%22' + encodeURIComponent(resultSolrId) + '%22+AND+' + q_value_content + '&fl=id&hl=true&hl.fl=content&hl.snippets=100&hl.fragsize=2048&hl.maxAnalyzedChars=10485760&hl.simple.pre=<span+style%3D"background-color%3Ayellow%3B">&hl.simple.post=<%2Fspan>&wt=json&json.wrf=?';
//			options.url = solrUrl + (("" == solrCore) ? ("") : (solrCore + "/")) + solrServletSelect
//							+ '?q=id%3A%22' + encodeURIComponent(resultSolrId) + '%22+AND+' + q_value_content
//							+ '&fl=id&hl=true&hl.fl=content'
//							+ '&hl.snippets=' + (parseInt(document.form_left.options_snippets_maximum.value))
//							+ '&hl.fragsize=' + (parseInt(document.form_left.options_snippet_length.value))
//							+ '&hl.maxAnalyzedChars=' + (parseInt(document.form_left.options_analyzed_chars_maximum.value))
//							+ '&hl.simple.pre=' + (document.form_left.options_highlighting_pre.value)
//							+ '&hl.simple.post=<%2Fspan>' + (document.form_left.options_highlighting_post.value)
//							+ '&wt=json&json.wrf=?';
			options.url = solrUrl + (("" == solrCore) ? ("") : (solrCore + "/")) + solrServletSelect
							+ '?q=' + q_value_content
							+ '&fq=id%3A%22' + encodeURIComponent(resultSolrId) + '%22'
							+ '&fl=id&hl=true&hl.fl=content'
							+ '&hl.snippets=' + (parseInt(document.form_left.options_snippets_maximum.value))
							+ '&hl.fragsize=' + (parseInt(document.form_left.options_snippet_length.value))
							+ '&hl.maxAnalyzedChars=' + (parseInt(document.form_left.options_analyzed_chars_maximum.value))
							+ '&hl.simple.pre=' + (HIGHLIGHTING_SENTINEL_START)
							+ '&hl.simple.post=' + (HIGHLIGHTING_SENTINEL_END)
							+ '&wt=json&json.wrf=?';
			document.getElementById("solr_select_url_highlight").innerHTML = options.url;
//			var windowHighlighting = null;
//			if (event.shiftKey) {
//				windowHighlighting = window.open('highlight.html', '_blank');
//			}
//			jQuery.ajax(options).done(getHighlightResultsHandler(resultIndex, windowHighlighting)).fail(getHighlightResultsErrorHandler(resultIndex, options.url));
			jQuery.ajax(options).done(getHighlightResultsHandler(resultIndex)).fail(getHighlightResultsErrorHandler(resultIndex, options.url));
		} else {
			window.alert('Unexpected empty query for highlighting.');
		}
	} else {
//		var highlightResultsArrowSpanElement = document.getElementById(highlightResultsArrowSpanId);
//		highlightResultsArrowSpanElement.innerHTML = ((highlightResultsDivIdElement.style.display == "block") ? (highlightResultsArrowSpanCloseInnerHtml) : (highlightResultsArrowSpanOpenInnerHtml));
		highlightEnd(highlightResultsDivId);
	}
}
//------------------------------------------------------------------------------
//function getHighlightResultsHandler(resultIndex, windowHighlighting) {
//	return function(data, textStatus, jqXHR) { handleHighlightResults(resultIndex, windowHighlighting, data, textStatus, jqXHR) }
//}
function getHighlightResultsHandler(resultIndex) {
	return function(data, textStatus, jqXHR) { handleHighlightResults(resultIndex, data, textStatus, jqXHR) }
}
//------------------------------------------------------------------------------
//function handleHighlightResults(resultIndex, windowHighlighting, data, textStatus, jqXHR) {
function handleHighlightResults(resultIndex, data, textStatus, jqXHR) {
	var highlightResultsDivId = highlightResultsDivIdPrefix + (resultIndex + 1);
	//window.console && console.log && console.log(data);
	if (data.response.docs.length > 0) {
		setCSSClassPropertValues('.highlight_results_div', ['font-family', 'font-size', 'color'],
									[ document.form_left.options_highlighting_font_family.value,
									  document.form_left.options_highlighting_font_size.value,
									  document.form_left.options_highlighting_font_color.value
									]);
		//----------------------------------------------------------------------
		var doc = data.response.docs[0];
		if (data.highlighting && data.highlighting[doc.id] && data.highlighting[doc.id]['content']) {
			var highlightingArray = data.highlighting[doc.id]['content'];
			var snippetsContent = "";
			for (var i = 0, l = highlightingArray.length; i < l; ++i) {
//				if (i > 0) {
//					snippetsContent +=  "<hr>";
//				}
				var htmlEscapedSnippet = solrSearchEscapeHTML(highlightingArray[i]);
				htmlEscapedSnippet = htmlEscapedSnippet.replace(HIGHLIGHTING_SENTINEL_START_RE, document.form_left.options_highlighting_pre.value);
				htmlEscapedSnippet = htmlEscapedSnippet.replace(HIGHLIGHTING_SENTINEL_END_RE, document.form_left.options_highlighting_post.value);
				snippetsContent += "<div id=\"" + highlightResultsDivId + "_" + (i + 1) + "\""
								+ (((htmlEscapedSnippet).search(/[\u0600-\u06FF]+/) < 0) ? ("") : ("style='direction:rtl'"))	// Unicode range for Arabic
								+ "class='highlight_results_div'>"
								+ ((document.form_left.options_results_snippet_numbers.checked) ?  ("<b>[" + (i + 1) + "] { ... </b>") : (""))
								+ htmlEscapedSnippet
								+ ((document.form_left.options_results_snippet_numbers.checked) ?  (" <b>... }</b></div>") : (""))
								+ "</div>";
			}
//			if (null == windowHighlighting) {
				document.getElementById(highlightResultsDivId).innerHTML = snippetsContent;
//			} else {
//				windowHighlighting.document.body.innerHTML = snippetsContent;
//			}
			//document.getElementById(highlightResultsDivId).style.direction = highlightResultsDivDirection;  
		} else {
			document.getElementById(highlightResultsDivId).innerHTML = "<span class='information'>Occurences not found.</span>";
		}
	} else {
		document.getElementById(highlightResultsDivId).innerHTML = "<span class='information'>Occurences not found.</span>";
	}
	//--------------------------------------------------------------------------
	//highlightEnd(highlightResultsArrowSpanIdPrefix + (resultIndex + 1));
	highlightEnd(highlightResultsDivId);
}
//------------------------------------------------------------------------------
function getHighlightResultsErrorHandler(resultIndex, url) {
	return function(data, textStatus, jqXHR) { handleHighlightResultsError(resultIndex, url, data, textStatus, jqXHR) }
}
//------------------------------------------------------------------------------
function handleHighlightResultsError(resultIndex, url, jqXHR, textStatus, errorThrown) {
//	highlightEnd(highlightResultsArrowSpanIdPrefix + (resultIndex + 1));
	var highlightResultsDivId = highlightResultsDivIdPrefix + (resultIndex + 1);
	document.getElementById(highlightResultsDivId).innerHTML = "<span class='highlight_results_error'>" + (((null == jqXHR) && (null == jqXHR.responseText)) ? "(Error)" : (jqXHR.responseText)) + "</span>";
	highlightEnd(highlightResultsDivId);
	//--------------------------------------------------------------------------
	if (window.console && console.log) {
	    console.log("handleHighlightResultsError:");
	    console.log("\turl: " + url);
	    //console.log("\tjqXHR: " + jqXHR);
	    console.log("\tjqXHR.responseText: " + (((null == jqXHR) && (null == jqXHR.responseText)) ? "(null)" : (jqXHR.responseText)));
	    //console.log("\ttextStatus:" + textStatus);
	    //console.log("\terrorThrown:" + errorThrown);
	} else {
		window.alert("handleHighlightResultsError:\n\turl: " + url + "\n\tjqXHR.responseText: " + ((null == jqXHR) ? (NULL_VALUE) : ((null == jqXHR.responseText) ? (NULL_VALUE) : (jqXHR.responseText))));
	}
}
//------------------------------------------------------------------------------
function toggleHeader(requiredClose, requiredOpen) {
//	if (632 > document.getElementById("highlighting_snippets").getBoundingClientRect().left) {
	if (DIV_TOGGLE_DOWN == document.getElementById("toggle_header").innerHTML) {
		if (requiredOpen) {
//			document.getElementById("highlighting_snippets").style.left = "0px";
			document.getElementById("left").style.top = "90px";
			document.getElementById("right").style.top = "90px";
			document.getElementById("toggle_header").innerHTML = DIV_TOGGLE_UP;
		}
	} else {
		if (requiredClose) {
			document.getElementById("left").style.top = "14px";
			document.getElementById("right").style.top = "14px";
			document.getElementById("toggle_header").innerHTML = DIV_TOGGLE_DOWN;
		}
	}
}
function toggleLeftForm(requiredClose, requiredOpen) {
//	if (0 == document.getElementById("right").getBoundingClientRect().left) {
	if (DIV_TOGGLE_OPEN == document.getElementById("toggle_left").innerHTML) {
		if (requiredOpen) {
			document.getElementById("right").style.left = "323px";
			document.getElementById("toggle_left").innerHTML = DIV_TOGGLE_CLOSE;
		}
	} else {
		if (requiredClose) {
			document.getElementById("right").style.left = "0px";
			document.getElementById("toggle_left").innerHTML = DIV_TOGGLE_OPEN;
		}
	}
}
function toggleDocsList(requiredClose, requiredOpen) {
//	if (632 > document.getElementById("highlighting_snippets").getBoundingClientRect().left) {
	if (DIV_TOGGLE_OPEN == document.getElementById("toggle_docs_list").innerHTML) {
		if (requiredOpen) {
			document.getElementById("highlighting_snippets").style.left = "300px";
			document.getElementById("toggle_docs_list").innerHTML = DIV_TOGGLE_CLOSE;
		}
	} else {
		if (requiredClose) {
			document.getElementById("highlighting_snippets").style.left = "0px";
			document.getElementById("toggle_docs_list").innerHTML = DIV_TOGGLE_OPEN;
		}
	}
}
function toggleAllParts(requiredOpen) {
	if (requiredOpen) {
		toggleHeader(false, true);
		toggleLeftForm(false, true);
		toggleDocsList(false, true);
	} else {
		toggleHeader(true, false);
		toggleLeftForm(true, false);
		toggleDocsList(true, false);
	}
}
//------------------------------------------------------------------------------
function getSelectionParentElement() {
	var selectionParentElement = null;
    if (document.selection) {
    	selectionParentElement = document.selection.createRange().parentElement();
    } else {
    	var selection = window.getSelection();
    	if (selection.rangeCount > 0) {
    		selectionParentElement = selection.getRangeAt(0).startContainer.parentNode; 
    	}
    }
    return selectionParentElement;
}
function removeSelection() {
	if (document.selection) {
		document.selection.empty();
	} else if (window.getSelection) {
		window.getSelection().removeAllRanges();	
	}
}
function selectTextInElement(element) {
	if (document.selection) {
		var range = document.body.createTextRange();
		range.moveToElementText(element);
		range.select();
	} else if (window.getSelection) {
		var range = document.createRange();
		range.selectNode(element);
		window.getSelection().addRange(range);
	}
}
function selectTextInElementById(elementId) {
	selectTextInElement(document.getElementById(elementId))
}
//------------------------------------------------------------------------------
function selectCurrentSnippet() {
	var selectionParentElement = getSelectionParentElement();
	if (null != selectionParentElement) {
		var parentHighlightingSnippetsElement = null;
		if ("highlighting_snippets" == selectionParentElement.id) {
			parentHighlightingSnippetsElement = selectionParentElement;
		} else {
			var parentElement = selectionParentElement.parentNode;
			while (null != parentElement) {
				if ("highlighting_snippets" == parentElement.id) {
					parentHighlightingSnippetsElement = parentElement;
					break;
				}
				parentElement = parentElement.parentNode;
			}
		}
		if (null != parentHighlightingSnippetsElement) {
			removeSelection();
			selectTextInElement(selectionParentElement);
		}
	}
}
function selectAllSnippets() {
	removeSelection();
	selectTextInElementById("highlighting_snippets")
}
//------------------------------------------------------------------------------
