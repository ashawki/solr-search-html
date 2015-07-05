**"Solr Search"** is a simple HTML interface for searching documents which are indexed by Apache Solr (TM).

A quick overview about "Solr Search" can be found here: ["Solr Search" Quick Overview](http://htmlpreview.github.io/?https://github.com/ashawki/solr-search-html/blob/master/solr_search/docs/quick_overview.html) 

To **download** the latest version of "Solr Search" (1.0.20140329):

+ Browse in "master" branch to solr_search/release/1.0.20140329 folder.
+ Download "solr_search.zip" file.

Or, simply, use the following link: [solr_search.zip](https://github.com/ashawki/solr-search-html/blob/master/solr_search/release/1.0.20140329/solr_search.zip?raw=true)

**Quick steps to use "Solr Search":**

+ Expand "**solr_search.zip**" into a directory which is accessible by HTTP (for example, a directory which is served by the same web-server which hosts your Solr search server).
+ If needed, edit "**<solr-search-directory>/js/solr_search.js**":
  + Modify the value of "solrUrl" variable (in the second line) as needed, in order to point to the correct URL of the target Solr server.
+ Use your web browser to access the hosted directory of "Solr Search".
  + For example: http://localhost:8983/solr-search/
