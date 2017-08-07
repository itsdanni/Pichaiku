# RetinaSDK.js - A JavaScript Client for the Cortical.io Retina API

Pure JavaScript wrapper library for the [Cortical.io API](http://api.cortical.io/). Register for a [free Cortical.io 
API key](http://www.cortical.io/resources_apikey.html) and include RetinaSDK.js to add language intelligence to any 
browser-based application.

## Introduction

Cortical.io's Retina API allows the user to perform semantic operations on text. One can for example:

* measure the semantic similarity between two written entities
* create a semantic classifier based on positive and negative example texts
* extract keywords from a text
* divide a text into sub-sections corresponding to semantic changes
* extract terms from a text based on part of speech tags

The meaning of terms and texts is stored in a sparse binary representation that allows the user to apply logical 
operators to refine the semantic representation of a concept.

You can read more about the technology at the [documentation page](http://documentation.cortical.io/intro.html).

To access the API, you will need to register for an [API key](http://www.cortical.io/resources_apikey.html).

## Installation

Download and include `retina-sdk-1.0.js` (development version) or `retina-sdk-1.0.min.js` (production version) in an 
HTML document.

    <script src="/path/to/retina-sdk-1.0.js"></script>

Once the script has loaded, the global object retinaSDK will be created from which you can instantiate the client 
with a valid API Key.

## Usage

**RetinaSDK.js** offers two abstractions of the Cortical.io Retina API, a lightweight module that offers simplified 
access to the most common and useful API functions available and a full version module that gives the user complete 
control over various parameter settings and complete access to all API endpoints.
 
### LiteClient Module

The LiteClient module is sufficient for most applications and offers the ability to quickly and easily 
compute keywords for a text, semantically compare two texts, retrieve similar terms, create category filters for 
semantic filtering and generate semantic fingerprints of a given text. To get started, create an instance of the 
lightweight client by passing your API key as follows:  

```javascript
/* Create "lightweight" LiteClient instance */
var liteClient = retinaSDK.LiteClient(your_api_key)
```

Once you've created a client instance, you can start using it to make calls to the Retina API:

```javascript
/* Retrieve similar terms */
liteClient.getSimilarTerms("javascript");
> ["javascript", "browser", "html", "browsers", "api", "xml", "functionality", "microsoft", "runtime", "perl", "implementations", "css", "software", "unix", "files", "gui", "server", "plugin", "internet explorer", "linux"]

/* Return keywords of a text */
liteClient.getKeywords("Vienna is the capital and largest city of Austria, and one of the nine states of Austria");
> ["austria", "vienna"]

/* Compute a semantic fingerprint for an input text */
liteClient.getFingerprint("apple")
> Array[328]

/* Compute the similarity between two texts */
liteClient.compare("apple", "microsoft")
> 0.4024390243902438

/* Compute the similarity between two fingerprints */
var appleFP = liteClient.getFingerprint("apple")
var microsoftFP = liteClient.getFingerprint("microsoft")
liteClient.compare(appleFP, microsoftFP)
> 0.4024390243902438

/* Compute the similarity between a fingerprint and a text */
var appleFP = liteClient.getFingerprint("apple")
liteClient.compare(appleFP, "microsoft")
> 0.4024390243902438

/* Construct a composite Fingerprint from an array of texts to use for semantic filtering */
var neurologyFilter = liteClient.createCategoryFilter(["neuron", "synapse", "neocortex"])
console.log(neurologyFilter)
> Array[677]

/* Use the neurologyFilter computed above to compare and classify new texts. */ 
liteClient.compare(neurologyFilter, "skylab")
> 0.056544622895956895 // low semantic similarity -> negative classification
liteClient.compare(neurologyFilter, "cortical column")
> 0.35455851788907006 // high semantic similarity -> positive classification
```

#### Callbacks

The above examples show basic use of the LiteClient without callback functions to process the responses. But since 
each call to the LiteClient results in an HTTP request being made to the Cortical.io API, it is highly recommended 
to pass a callback function as part of each method call to handle the resulting response. While the callback 
parameter is technically optional, if it is missing, the HTTP requests made will block code execution until 
a response is received, which can result in poor application performance.

Callbacks can either be a single function or an object with two named functions, success and error, which will 
process normal responses or deal with failed requests. If only a single function is passed, it will be assumed to be 
the success function and failed requests will result in an exception.

```javascript
/* Asynchronously retrieve similar terms with a callback function */
liteClient.getSimilarTerms("javascript", function(similarTerms) {
    console.log(similarTerms)
});

/* Asynchronously retrieve similar terms with an object containing success and error callbacks */
liteClient.getSimilarTerms("javascript", {success: function(similarTerms) {
    console.log(similarTerms)
}, error: function(response){
    // handle error
}});
```

### FullClient Module

The FullClient module provides complete access to the entire Retina API and allows for more flexibility in configuring 
request parameters than the LiteClient module. Some functionality included with the FullClient not available in the 
LiteClient are operations on expressions, images and bulk requests. A full listing of the FullClient's methods is 
provided below (Available Functions and Parameters).

As with the LiteClient, the FullClient must be instantiated with a valid Cortical.io API key:

```javascript
/* Create FullClient instance */
var fullClient = retinaSDK.FullClient(your_api_key)
```

Additional parameters can also be passed when creating a FullClient instance to specify the host address (in case you
 have access to your own Retina API service, for example by running your own [AWS](https://aws.amazon.com/marketplace/seller-profile?id=c88ca878-a648-464c-b29b-38ba057bd2f5) or [Azure instance](https://azure.microsoft.com/en-us/marketplace/partners/cortical-io/cortical-io-retinaservice-eng-gen/)) and Retina name, so you can 
 configure a specific Retina for subsequent calls.
 
```javascript
/* Create FullClient instance with explicit server address and Retina name */
var fullClient = retinaSDK.FullClient(your_api_key, "http://api.cortical.io/rest/", "en_associative")
```

#### Semantic Expressions

The semantic fingerprint is the basic unit within the Retina API. A text or a term can be resolved into a fingerprint
 using the API. Fingerprints can also be combined in *expressions*, and a number of methods
 expect input in our expression language. This is explained in more detail [here](http://documentation.cortical.io/the_power_of_expressions.html). 

Expressions are essentially `json` strings with reserved keys: `term`, `text`, and `positions`.
In the following example, we note that the `compare` function takes a list of two such expressions as arguments. 
In JavaScript we can create a list of two objects with (in this case) `term` elements.

```javascript
fullClient.compare({comparison: [{"term": "synapse"}, {"term": "skylab"}]})
> Object {euclideanDistance: 0.9679144385026738, sizeRight: 146, overlappingLeftRight: 0.02631578947368421, overlappingRightLeft: 0.0410958904109589, weightedScoring: 0.6719223186964691…}
```

Expressions can also be connected to each other with the operators `and`, `or` and `sub`:
 
```javascript
/* Subtract the meaning of tiger from the term 'jaguar' to compute a Fingerprint composed of the car-related meaning of 'jaguar' */
fullClient.getFingerprintForExpression({expression: {"sub": [{"term": "jaguar"}, {"term": "tiger"}]}})
```

#### Callbacks

As with the LiteClient, all calls to the FullClient accept an optional callback parameter that can either be a single
 function or an object with two named functions, success and error, which will process normal responses or deal with 
 failed requests. If only a single function is passed, it will be assumed to be the success function and failed 
 requests will result in an exception.

#### Available Functions and Parameters

<table class="table table-bordered table-striped">
	<thead>
		<tr>
			<th style="">Method</th>
			<th style="">Description</th>
			<th style="">Required Parameters</th>
			<th style="">Optional Parameters</th>
		</tr>
	</thead>
	<tbody>
		<tr>
    		<td>getRetinas</td>
    		<td>Returns information about Retinas as an array of Retina objects</td>
    		<td>none</td>
    		<td>retina_name (string)</td>
    	</tr>
    	<tr>
			<td>getTerms</td>
			<td>Returns information about terms as an array of term objects</td>
			<td>none</td>
			<td>term (string), start_index (number), max_results (number), get_fingerprint (boolean)</td>
		</tr>
		<tr>
			<td>getContextsForTerm</td>
			<td>Returns an array of all the contexts for a given term</td>
			<td>term (string)</td>
			<td>start_index (number), max_results (number), get_fingerprint (boolean)</td>
		</tr>
		<tr>
			<td>getSimilarTermsForTerm</td>
			<td>Returns an array of similar terms for the specified input term</td>
			<td>term (string)</td>
			<td>context_id (number), start_index (number), max_results (number), pos_type (string), get_fingerprint 
			(boolean)</td>
		</tr>
		<tr>
			<td>getFingerprintForText</td>
			<td>Returns a Retina representation (a Fingerprint) of the input text</td>
			<td>text (string)</td>
			<td>none</td>
		</tr>
		<tr>
			<td>getKeywordsForText</td>
			<td>Returns an array of keywords from the input text</td>
			<td>text (string)</td>
			<td>none</td>
		</tr>
		<tr>
			<td>getTokensForText</td>
			<td>Returns an array of sentences (each of which is a comma-separated list of tokens) from an input 
			text</td>
			<td>text (string)</td>
			<td>pos_tags (string)</td>
		</tr>
		<tr>
			<td>getSlicesForText</td>
			<td>Returns an array of text objects corresponding to the input text, divided according to topic changes</td>
			<td>text (string)</td>
			<td>pos_tags (string)</td>
		</tr>
		<tr>
			<td>getFingerprintsForTexts</td>
			<td>Returns an array of Retina representations (Fingerprints) of each input text</td>
			<td>texts (array of strings)</td>
			<td>sparsity (number)</td>
		</tr>
		<tr>
			<td>getLanguageForText</td>
			<td>Returns an object containing information about the language of the specified text</td>
			<td>text (string)</td>
			<td>none</td>
		</tr>
		<tr>
			<td>getFingerprintForExpression</td>
			<td>Returns a Retina representation (a Fingerprint) of the input expression</td>
			<td>expression (JSON object encapsulating a Semantic Expression)</td>
			<td>sparsity (number)</td>
		</tr>
		<tr>
			<td>getContextsForExpression</td>
			<td>Returns an array of contexts for the input expression</td>
			<td>expression (JSON object encapsulating a Semantic Expression)</td>
			<td>start_index (number), max_results (number), get_fingerprint (boolean), sparsity (number)</td>
		</tr>
		<tr>
			<td>getSimilarTermsForExpression</td>
			<td>Returns an array of similar terms for the input expression</td>
			<td>expression (JSON object encapsulating a Semantic Expression)</td>
			<td>context_id (number), start_index (number), max_results (number), pos_type (string), sparsity (number), get_fingerprint (boolean)</td>
		</tr>
		<tr>
			<td>getFingerprintsForExpressions</td>
			<td>Returns an array of Retina representations (Fingerprints) for an array of input expressions</td>
			<td>expressions (array of JSON objects encapsulating Semantic Expressions)</td>
			<td>sparsity (number)</td>
		</tr>
		<tr>
			<td>getContextsForExpressions</td>
			<td>Returns an array of context arrays for the input expressions</td>
			<td>expressions (array of JSON objects encapsulating Semantic Expressions)</td>
			<td>start_index (number), max_results (number), sparsity (number), get_fingerprint (boolean)</td>
		</tr>
		<tr>
			<td>getSimilarTermsForExpressions</td>
			<td>Returns an array of Term object arrays containing similar terms corresponding to the input array of 
			expressions</td>
			<td>expressions (array of JSON objects encapsulating Semantic Expressions)</td>
			<td>context_id (number), start_index (number), max_results (number), pos_type (string), sparsity (number), get_fingerprint (boolean)</td>
		</tr>
		<tr>
			<td>compare</td>
			<td>Returns an object containing distance and similarity measures of the two input expression</td>
			<td>comparison (array of JSON object pair encapsulating Semantic Expressions to compare)</td>
			<td>none</td>
		</tr>
		<tr>
			<td>compareBulk</td>
			<td>Returns an array of objects containing distance and similarity measures of the input array of 
			expressions to compare</td>
			<td>comparisons (array of JSON object pairs encapsulating Semantic Expressions to compare)</td>
			<td>none</td>
		</tr>
		<tr>
			<td>getImage</td>
			<td>Returns a visualization as an encoded string of the input expression</td>
			<td>expression (JSON object encapsulating a Semantic Expression)</td>
			<td>image_scalar (number), plot_shape (string), image_encoding (string), sparsity (number)</td>
		</tr>
		<tr>
			<td>getImages</td>
			<td>Returns an array of visualizations as encoded string of the input expressions</td>
			<td>expressions (array of JSON objects encapsulating Semantic Expressions)</td>
			<td>image_scalar (number), plot_shape (string), image_encoding (string), sparsity (number), 
			get_fingerprint (boolean)</td>
		</tr>
		<tr>
			<td>compareImage</td>
			<td>Returns an overlay image for the two input elements specified by a JSON array containing two 
			expressions</td>
			<td>expressions (array of two JSON objects encapsulating two Semantic Expressions)</td>
			<td>image_scalar (number), plot_shape (string), image_encoding (string)</td>
		</tr>
		<tr>
			<td>createCategoryFilter</td>
			<td>Returns a Semantic Fingerprint used to filter texts by together positive and negative examples of 
			texts that should be positively and negatively classified by the filter</td>
			<td>filter_name (string), positive_examples (array of strings representing positive examples for the 
			filter)</td>
			<td>negative_examples (array of strings representing negative examples for the 
			filter)</td>
		</tr>
	</tbody>
</table>

#### FullClient Examples

```javascript
/* Create FullClient instance */
var fullClient = retinaSDK.FullClient(your_api_key)

/* Retrieve an array of all available Retinas */
fullClient.getRetinas(callback)

/* Retrieve information about a specific term */
fullClient.getTerms({term: "javascript"}, callback)

/* Get contexts for a given term */
fullClient.getContextsForTerm({term: "javascript", max_results: 3}, callback)

/* Get similar terms and their Fingerprints for a given term */
fullClient.getSimilarTermsForTerm({term: "javascript", get_fingerprint: true}, callback)

/* Encode a text into a Semantic Fingerprint */
fullClient.getFingerprintForText({"text": "JavaScript is a dynamically typed object-oriented programming language"}, callback)

/* Return keywords from a text */
fullClient.getKeywordsForText({"text": "JavaScript is a dynamically typed object-oriented programming language"}, callback)

/* Returns tokens from an input text */
fullClient.getTokensForText({"text": "JavaScript is a dynamically typed object-oriented programming language", pos_tags: "NN, NNP"}, callback)

/* Slice the input text according to semantic changes (works best on larger texts of at least several sentences) */
fullClient.getSlicesForText({"text": text}, callback)

/* Return Semantic Fingerprints for numerous texts in a single call */
fullClient.getFingerprintsForTexts({"texts": ["first text", "second text"]}, callback)

/* Detect the language for an input text */
fullClient.getLanguageForText({"text": "Dieser Text ist auf Deutsch"}, callback)

/* Return the Fingerprint for an input expression */
fullClient.getFingerprintForExpression({expression: {"text": "JavaScript is a dynamically typed object-oriented programming language"}}, callback)

/* Return contexts for an input expression */
fullClient.getContextsForExpression({expression: {"text": "JavaScript is a dynamically typed object-oriented programming language"}}, callback)

/* Return similar terms for an input expression */
fullClient.getSimilarTermsForExpression({expression: {"text": "JavaScript is a dynamically typed object-oriented programming language"}}, callback)

/* Return Fingerprints for multiple semantic expressions */
fullClient.getFingerprintsForExpressions({expressions: [{"text": "first text"}, {"text": "second text"}]}, callback)

/* Return contexts for multiple semantic expressions */
fullClient.getContextsForExpressions({expressions: [{"text": "first text"}, {"text": "second text"}]}, callback)

/* Return similar terms for multiple semantic expressions */
fullClient.getSimilarTermsForExpressions({expressions: [{"text": "first text"}, {"text": "second text"}]}, callback)

/* Compute the semantic similarity of two input expressions */
fullClient.compare({comparison: [{term: "synapse"}, {term: "skylab"}]}, callback)

/* Make multiple comparisons in a single call */
var comparison1 = [{"term": "synapse"}, {"term": "skylab"}];
var comparison2 = [{"term": "mir"}, {"text": "skylab was a space station"}];
fullClient.compareBulk({comparisons: [comparison1, comparison2]}, callback);

/* Create an image from an expression */
fullClient.getImage({expression: {"term": "test"}}, callback)

/* Create multiple images from multiple expressions in a single call */
fullClient.getImages({expressions: [{"text": "first text"}, {"text": "second text"}]}, callback)

/* Create a composite image showing the visual overlap between two expressions */
fullClient.compareImage({expressions: [{"text": "first text"}, {"text": "second text"}]}, callback)

/* Create a filter Fingerprint from example texts that should "pass through" the filter */
fullClient.createCategoryFilter({filter_name: "test", positive_examples: ["JavaScript is a dynamically typed object-oriented programming language", "jQuery is a cross-platform JavaScript library designed to simplify the client-side scripting of HTML."]}, callback)

```

## Support

For further documentation about the Retina API and information on Cortical.io's `Retina` technology please see our 
[Knowledge Base](http://www.cortical.io/resources_tutorials.html). Also the `test` folder contains more examples of how to use the 
client modules. 

If you have any questions or problems please visit our [forum](http://www.cortical.io/resources_forum.html).

### Changelog

<B>v 1.0.0</B>

* Initial release.