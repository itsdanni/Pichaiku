/**
 * Instance of the FullClient to test.
 */
var fullClient = new retinaSDK.FullClient(apiKey);

/**
 * Instance of the LiteClient to test.
 */
var liteClient = new retinaSDK.LiteClient(apiKey);

/**
 * Simple expression used for testing expression endpoints.
 * @type {{sub: *[]}}
 */
var expression = {
    "sub": [{
        "term": "jaguar"
    }, {
        "positions": [2, 3, 4, 5, 6]
    }]
};

/**
 * Example texts to use during tests.
 */
var texts = {};

texts["Vienna"] = "Vienna is the capital and largest city of Austria, and one of the nine states of Austria. Vienna"
    + " is Austria's primary city, with a population of about 1.8 million (2.6 million within the metropolitan area,"
    + " nearly one third of Austria's population), and its cultural, economic, and political centre. It is the"
    + " 7th-largest city by population within city limits in the European Union.";

texts["Tokyo"] = "Tokyo, officially Tokyo Metropolis, is one of the 47 prefectures of Japan, and is both the capital"
    + " and largest city of Japan. The Greater Tokyo Area is the most populous metropolitan area in the world. It is"
    + " the seat of the Emperor of Japan and the Japanese government. Tokyo is in the Kantō region on the southeastern"
    + " side of the main island Honshu and includes the Izu Islands and Ogasawara Islands. Formerly known as Edo, it"
    + " has been the de facto seat of government since 1603 when Shogun Tokugawa Ieyasu made the city his"
    + " headquarters. It officially became the capital after Emperor Meiji moved his seat to the city from the old"
    + " capital of Kyoto in 1868; at that time Edo was renamed Tokyo.";

texts["SanFrancisco"] = "San Francisco, officially the City and County of San Francisco, is the cultural,"
    + " commercial, and financial center of Northern California and the only consolidated city-county in California."
    + " San Francisco is the fourth-most populous city in California, after Los Angeles, San Diego and San Jose, and"
    + " the 13th-most populous city in the United States — with a Census-estimated 2014 population of 852,469. The"
    + " city and its surrounding areas are known as the San Francisco Bay Area, and are a part of the larger OMB"
    + " designated San Jose-San Francisco-Oakland combined statistical area, the fifth most populous in the nation"
    + " with an estimated population of 8.6 million.";

texts["Neuron"] = "A neuron is an electrically excitable cell that processes and transmits information through"
    + " electrical and chemical signals. These signals between neurons occur via synapses, specialized connections"
    + " with other cells. Neurons can connect to each other to form neural networks. Neurons are the core components"
    + " of the brain and spinal cord of the central nervous system (CNS), and of the ganglia of the peripheral nervous"
    + " system (PNS). Specialized types of neurons include: sensory neurons which respond to touch, sound, light and"
    + " all other stimuli affecting the cells of the sensory organs that then send signals to the spinal cord and"
    + " brain, motor neurons that receive signals from the brain and spinal cord to cause muscle contractions and"
    + " affect glandular outputs, and interneurons which connect neurons to other neurons within the same region of"
    + " the brain, or spinal cord in neural networks.";

texts["Synapse"] = "Chemical synapses are biological junctions through which neurons signal to each other and to"
    + " non-neuronal cells such as those in muscles or glands. Chemical synapses allow neurons to form circuits within"
    + " the central nervous system. They are crucial to the biological computations that underlie perception and"
    + " thought. They allow the nervous system to connect to and control other systems of the body.";

texts["Neocortex"] = "The neocortex (Latin for \"new bark\" or \"new rind\"), also called the neopallium (\"new"
    + " mantle\") and isocortex (\"equal rind\"), is a part of the mammalian brain. In the human brain, it is the"
    + " largest part of the cerebral cortex which covers the two cerebral hemispheres, with the allocortex making up"
    + " the rest. The neocortex is made up of six layers, labelled from the outer in, I to VI. In humans, the"
    + " neocortex is involved in higher functions such as sensory perception, generation of motor commands, spatial"
    + " reasoning, conscious thought and language.";

texts["ISS"] = "The International Space Station (ISS) is a space station, or a habitable artificial satellite, in"
    + " low Earth orbit. Its first component launched into orbit in 1998, and the ISS is now the largest artificial"
    + " body in orbit and can often be seen with the naked eye from Earth. The ISS consists of pressurised modules,"
    + " external trusses, solar arrays, and other components. ISS components have been launched by Russian Proton and"
    + " Soyuz rockets as well as American Space Shuttles.";

texts["Mir"] = "Mir was a space station that operated in low Earth orbit from 1986 to 2001, owned by the Soviet"
    + " Union and later by Russia. Mir was the first modular space station and was assembled in orbit from 1986 to"
    + " 1996. It had a greater mass than any previous spacecraft. Until 21 March 2001 it was the largest artificial"
    + " satellite in orbit, succeeded by the International Space Station after Mir's orbit decayed. The station served"
    + " as a microgravity research laboratory in which crews conducted experiments in biology, human biology, physics,"
    + " astronomy, meteorology and spacecraft systems with a goal of developing technologies required for permanent"
    + " occupation of space.";

texts["Skylab"] = "Skylab was a space station launched and operated by NASA and was the United States' first space"
    + " station. Skylab orbited Earth from 1973 to 1979, and included a workshop, a solar observatory, and other"
    + " systems. It was launched unmanned by a modified Saturn V rocket, with a weight of 169,950 pounds (77 t). Three"
    + " manned missions to the station, conducted between 1973 and 1974 using the Apollo Command/Service Module (CSM)"
    + " atop the smaller Saturn IB, each delivered a three-astronaut crew. On the last two manned missions, an"
    + " additional Apollo / Saturn IB stood by ready to rescue the crew in orbit if it was needed.";

/**
 * Tests comparing two strings with the liteClient and no callback.
 */
QUnit.asyncTest("liteClient.compare, two strings, no callback", function (assert) {
    assert.expect(1);
    var similarity = liteClient.compare(texts["Skylab"], texts["ISS"]);
    assert.ok(similarity > 0.1, "Return valid cosine similarity");
    QUnit.start();
});

/**
 * Tests comparing two strings with the liteClient and callback function.
 */
QUnit.asyncTest("liteClient.compare, two strings, callback function", function (assert) {
    assert.expect(1);
    var success = function (similarity) {
        assert.ok(similarity > 0.1, "Return valid cosine similarity");
        QUnit.start();
    };
    liteClient.compare(texts["Skylab"], texts["ISS"], success);
});

/**
 * Tests comparing two strings with the liteClient and callback object.
 */
QUnit.asyncTest("liteClient.compare, two strings, callback object", function (assert) {
    assert.expect(1);
    var success = function (similarity) {
        assert.ok(similarity > 0.1, "Return valid cosine similarity");
        QUnit.start();
    };
    liteClient.compare(texts["Skylab"], texts["ISS"], {
        success: success, error: function () {
        }
    });
});

/**
 * Tests retrieving similar terms for a term string with the liteClient and no callback.
 */
QUnit.asyncTest("liteClient.getSimilarTerms, term string, no callback", function (assert) {
    assert.expect(2);
    var termString = "test";
    var similarTerms = liteClient.getSimilarTerms(termString);
    assert.ok(similarTerms.length == 20, "Return 20 similar terms.");
    assert.equal(similarTerms[0], termString, "Most similar term is query term.");
    QUnit.start();
});

/**
 * Tests retrieving similar terms for a term string with the liteClient and callback function.
 */
QUnit.asyncTest("liteClient.getSimilarTerms, term string, callback function", function (assert) {
    assert.expect(2);
    var termString = "test";
    var success = function (similarTerms) {
        assert.ok(similarTerms.length == 20, "Return 20 similar terms.");
        assert.equal(similarTerms[0], termString, "Most similar term is query term.");
        QUnit.start();
    };
    liteClient.getSimilarTerms(termString, success);
});

/**
 * Tests retrieving similar terms for a term string with the liteClient and callback object.
 */
QUnit.asyncTest("liteClient.getSimilarTerms, term string, callback object", function (assert) {
    assert.expect(2);
    var termString = "test";
    var success = function (similarTerms) {
        assert.ok(similarTerms.length == 20, "Return 20 similar terms.");
        assert.equal(similarTerms[0], termString, "Most similar term is query term.");
        QUnit.start();
    };
    liteClient.getSimilarTerms(termString, {
        success: success, error: function () {
        }
    });
});

/**
 * Tests retrieving Retinas with no callback.
 */
QUnit.asyncTest("fullclient.getRetinas, no params, no callback", function (assert) {
    assert.expect(2);
    var retinas = fullClient.getRetinas();
    assert.ok(retinas.length > 1, "Return multiple Retinas.");
    assert.ok(typeof retinas[0].description == 'string', "First returned Retina contains a description field");
    QUnit.start();
});

/**
 * Tests retrieving Retinas with a callback function.
 */
QUnit.asyncTest("fullclient.getRetinas, no params, callback function", function (assert) {
    assert.expect(2);
    var success = function (retinas) {
        assert.ok(retinas.length > 1, "Return multiple Retinas.");
        assert.ok(typeof retinas[0].description == 'string', "First returned Retina contains a description field");
        QUnit.start();
    };
    fullClient.getRetinas(success);
});

/**
 * Tests retrieving Retinas with a callbacks object.
 */
QUnit.asyncTest("fullclient.getRetinas, no params, callbacks object", function (assert) {
    assert.expect(2);
    var success = function (retinas) {
        assert.ok(retinas.length > 1, "Return multiple Retinas.");
        assert.ok(typeof retinas[0].description == 'string', "First returned Retina contains a description field");
        QUnit.start();
    };
    fullClient.getRetinas({
        success: success, error: function () {
        }
    });
});

/**
 * Tests retrieving a specific Retina with no callback.
 */
QUnit.asyncTest("fullclient.getRetinas, specific Retina, no callback", function (assert) {
    assert.expect(2);
    var retina = "en_associative";
    var retinas = fullClient.getRetinas({retina_name: retina});
    assert.equal(retinas[0].retinaName, retina, "Return specific Retina.");
    assert.ok(retinas.length == 1, "Return single Retina.");
    QUnit.start();
});

/**
 * Tests retrieving a specific Retina with a callback function.
 */
QUnit.asyncTest("fullclient.getRetinas, specific Retina, callback function", function (assert) {
    assert.expect(2);
    var retina = "en_associative";
    var success = function (retinas) {
        assert.equal(retinas[0].retinaName, retina, "Return specific Retina.");
        assert.ok(retinas.length == 1, "Return single Retina.");
        QUnit.start();
    };
    fullClient.getRetinas({retina_name: retina}, success);
});

/**
 * Tests retrieving a specific Retina with a callbacks object.
 */
QUnit.asyncTest("fullclient.getRetinas, specific Retina, callbacks object", function (assert) {
    assert.expect(2);
    var retina = "en_associative";
    var success = function (retinas) {
        assert.equal(retinas[0].retinaName, retina, "Return specific Retina.");
        assert.ok(retinas.length == 1, "Return single Retina.");
        QUnit.start();
    };
    fullClient.getRetinas({retina_name: retina}, {
        success: success, error: function () {
        }
    });
});

/**
 * Tests retrieving all terms with no callback.
 */
QUnit.asyncTest("fullclient.getTerms, no params, no callback", function (assert) {
    assert.expect(2);
    var terms = fullClient.getTerms();
    assert.ok(terms.length > 1, "Return multiple terms.");
    assert.ok(typeof terms[0].term != "undefined", "Return terms contain a term field.");
    QUnit.start();
});

/**
 * Tests retrieving all terms with a callback function.
 */
QUnit.asyncTest("fullclient.getTerms, no params, callback function", function (assert) {
    assert.expect(2);
    var success = function (terms) {
        assert.ok(terms.length > 1, "Return multiple terms.");
        assert.ok(typeof terms[0].term != "undefined", "Return terms contain a term field.");
        QUnit.start();
    };
    fullClient.getTerms(success);
});

/**
 * Tests retrieving all terms with a callbacks object.
 */
QUnit.asyncTest("fullclient.getTerms, no params, callbacks object", function (assert) {
    assert.expect(2);
    var success = function (terms) {
        assert.ok(terms.length > 1, "Return multiple terms.");
        assert.ok(typeof terms[0].term != "undefined", "Return terms contain a term field.");
        QUnit.start();
    };
    fullClient.getTerms({
        success: success, error: function () {
        }
    });
});

/**
 * Tests retrieving a specific term with no callback.
 */
QUnit.asyncTest("fullclient.getTerms, specific term, no callback", function (assert) {
    assert.expect(1);
    var termString = "test";
    var term = fullClient.getTerms(termString);
    assert.equal(term[0].term, termString, "Return specific term.");
    QUnit.start();
});

/**
 * Tests retrieving a specific term with a callback function.
 */
QUnit.asyncTest("fullclient.getTerms, specific term, callback function", function (assert) {
    assert.expect(1);
    var termString = "test";
    var success = function (term) {
        assert.equal(term[0].term, termString, "Return specific term.");
        QUnit.start();
    };
    fullClient.getTerms(termString, success);
});

/**
 * Tests retrieving a specific term with a callbacks object.
 */
QUnit.asyncTest("fullclient.getTerms, specific term, callbacks object", function (assert) {
    assert.expect(1);
    var termString = "test";
    var success = function (term) {
        assert.equal(term[0].term, termString, "Return specific term.");
        QUnit.start();
    };
    fullClient.getTerms(termString, {
        success: success, error: function () {
        }
    });
});

/**
 * Tests retrieving terms with params and no callback.
 */
QUnit.asyncTest("fullclient.getTerms, with params, no callback", function (assert) {
    assert.expect(2);
    var termString = "abc*";
    var length = 20;
    var terms = fullClient.getTerms({term: termString, start_index: 0, max_results: length});
    assert.ok(terms.length == length, "Return fixed number of terms.");
    assert.equal(terms[0].term.substr(0, 3), termString.substr(0, 3), "Return term matching wildcard query.");
    QUnit.start();
});

/**
 * Tests retrieving terms with params and a callback function.
 */
QUnit.asyncTest("fullclient.getTerms, with params, callback function", function (assert) {
    assert.expect(2);
    var termString = "abc*";
    var length = 20;
    var success = function (terms) {
        assert.ok(terms.length == length, "Return fixed number of terms.");
        assert.equal(terms[0].term.substr(0, 3), termString.substr(0, 3), "Return term matching wildcard query.");
        QUnit.start();
    };
    fullClient.getTerms({term: termString, start_index: 0, max_results: length}, success);
});

/**
 * Tests retrieving terms with params and a callbacks object.
 */
QUnit.asyncTest("fullclient.getTerms, with params, callbacks object", function (assert) {
    assert.expect(2);
    var termString = "abc*";
    var length = 20;
    var success = function (terms) {
        assert.ok(terms.length == length, "Return fixed number of terms.");
        assert.equal(terms[0].term.substr(0, 3), termString.substr(0, 3), "Return term matching wildcard query.");
        QUnit.start();
    };
    fullClient.getTerms({term: termString, start_index: 0, max_results: length}, {
        success: success, error: function () {
        }
    });
});

/**
 * Tests retrieving contexts for terms with term string and no callback.
 */
QUnit.asyncTest("fullclient.getContextsForTerm, term string, no callback", function (assert) {
    assert.expect(2);
    var termString = "test";
    var contexts = fullClient.getContextsForTerm(termString);
    assert.ok(contexts.length > 1, "Return multiple contexts.");
    assert.ok(typeof contexts[0].context_id != 'undefined', "Contexts has an ID.");
    QUnit.start();
});

/**
 * Tests retrieving contexts for terms with term string and callback function.
 */
QUnit.asyncTest("fullclient.getContextsForTerm, term string, callback function", function (assert) {
    assert.expect(2);
    var termString = "test";
    var success = function (contexts) {
        assert.ok(contexts.length > 1, "Return multiple contexts.");
        assert.ok(typeof contexts[0].context_id != 'undefined', "Contexts has an ID.");
        QUnit.start();
    };
    fullClient.getContextsForTerm(termString, success);
});

/**
 * Tests retrieving contexts for terms with term string and callback object.
 */
QUnit.asyncTest("fullclient.getContextsForTerm, term string, callbacks object", function (assert) {
    assert.expect(2);
    var termString = "test";
    var success = function (contexts) {
        assert.ok(contexts.length > 1, "Return multiple contexts.");
        assert.ok(typeof contexts[0].context_id != 'undefined', "Contexts has an ID.");
        QUnit.start();
    };
    fullClient.getContextsForTerm(termString, {
        success: success, error: function () {
        }
    });
});

/**
 * Tests retrieving contexts for terms with params and no callback.
 */
QUnit.asyncTest("fullclient.getContextsForTerm, with params, no callback", function (assert) {
    assert.expect(3);
    var termString = "test";
    var length = 2;
    var contexts = fullClient.getContextsForTerm({term: termString, max_results: length, get_fingerprint: true});
    assert.ok(contexts.length > 1, "Return multiple contexts.");
    assert.ok(contexts.length == length, "Return fixed number of contexts.");
    assert.ok(contexts[0].fingerprint.positions.length > 1, "Contexts contain fingerprints.");
    QUnit.start();
});

/**
 * Tests retrieving contexts for terms with params and callback function.
 */
QUnit.asyncTest("fullclient.getContextsForTerm, with params, callback function", function (assert) {
    assert.expect(3);
    var termString = "test";
    var length = 2;
    var success = function (contexts) {
        assert.ok(contexts.length > 1, "Return multiple contexts.");
        assert.ok(contexts.length == length, "Return fixed number of contexts.");
        assert.ok(contexts[0].fingerprint.positions.length > 1, "Contexts contain fingerprints.");
        QUnit.start();
    };
    fullClient.getContextsForTerm({term: termString, max_results: length, get_fingerprint: true}, success);
});

/**
 * Tests retrieving contexts for terms with params and callback object.
 */
QUnit.asyncTest("fullclient.getContextsForTerm, with params, callbacks object", function (assert) {
    assert.expect(3);
    var termString = "test";
    var length = 2;
    var success = function (contexts) {
        assert.ok(contexts.length > 1, "Return multiple contexts.");
        assert.ok(contexts.length == length, "Return fixed number of contexts.");
        assert.ok(contexts[0].fingerprint.positions.length > 1, "Contexts contain fingerprints.");
        QUnit.start();
    };
    fullClient.getContextsForTerm({term: termString, max_results: length, get_fingerprint: true}, {
        success: success, error: function () {
        }
    });
});

/**
 * Tests retrieving similar terms for a term string and no callback.
 */
QUnit.asyncTest("fullclient.getSimilarTermsForTerm, term string, no callback", function (assert) {
    assert.expect(2);
    var termString = "test";
    var similarTerms = fullClient.getSimilarTermsForTerm(termString);
    assert.ok(similarTerms.length > 1, "Return multiple similar terms.");
    assert.equal(similarTerms[0].term, termString, "Most similar term is query term.");
    QUnit.start();
});

/**
 * Tests retrieving similar terms for a term string and callback function.
 */
QUnit.asyncTest("fullclient.getSimilarTermsForTerm, term string, callback function", function (assert) {
    assert.expect(2);
    var termString = "test";
    var success = function (similarTerms) {
        assert.ok(similarTerms.length > 1, "Return multiple similar terms.");
        assert.equal(similarTerms[0].term, termString, "Most similar term is query term.");
        QUnit.start();
    };
    fullClient.getSimilarTermsForTerm(termString, success);
});

/**
 * Tests retrieving similar terms for a term string and callback object.
 */
QUnit.asyncTest("fullclient.getSimilarTermsForTerm, term string, callback object", function (assert) {
    assert.expect(2);
    var termString = "test";
    var success = function (similarTerms) {
        assert.ok(similarTerms.length > 1, "Return multiple similar terms.");
        assert.equal(similarTerms[0].term, termString, "Most similar term is query term.");
        QUnit.start();
    };
    fullClient.getSimilarTermsForTerm(termString, {
        success: success, error: function () {
        }
    });
});

/**
 * Tests retrieving similar terms for a terms object with params and no callback.
 */
QUnit.asyncTest("fullclient.getSimilarTermsForTerm, with params, no callback", function (assert) {
    assert.expect(3);
    var termString = "test";
    var similarTerms = fullClient.getSimilarTermsForTerm({term: termString, get_fingerprint: true});
    assert.ok(similarTerms.length > 1, "Return multiple similar terms.");
    assert.equal(similarTerms[0].term, termString, "Most similar term is query term.");
    assert.ok(similarTerms[0].fingerprint.positions.length > 1, "Similar term contains fingerprints.");
    QUnit.start();
});

/**
 * Tests retrieving similar terms for a terms object with params and callback function.
 */
QUnit.asyncTest("fullclient.getSimilarTermsForTerm, with params, callback function", function (assert) {
    assert.expect(3);
    var termString = "test";
    var success = function (similarTerms) {
        assert.ok(similarTerms.length > 1, "Return multiple similar terms.");
        assert.equal(similarTerms[0].term, termString, "Most similar term is query term.");
        assert.ok(similarTerms[0].fingerprint.positions.length > 1, "Similar term contains fingerprints.");
        QUnit.start();
    };
    fullClient.getSimilarTermsForTerm({term: termString, get_fingerprint: true}, success);
});

/**
 * Tests retrieving similar terms for a terms object with params and callback object.
 */
QUnit.asyncTest("fullclient.getSimilarTermsForTerm, with params, callback object", function (assert) {
    assert.expect(3);
    var termString = "test";
    var success = function (similarTerms) {
        assert.ok(similarTerms.length > 1, "Return multiple similar terms.");
        assert.equal(similarTerms[0].term, termString, "Most similar term is query term.");
        assert.ok(similarTerms[0].fingerprint.positions.length > 1, "Similar term contains fingerprints.");
        QUnit.start();
    };
    fullClient.getSimilarTermsForTerm({term: termString, get_fingerprint: true}, {
        success: success, error: function () {
        }
    });
});

QUnit.asyncTest("fullclient.getFingerprintForText, text string, callback function", function (assert) {
    assert.expect(1);
    var success = function (positions) {
        assert.ok(positions.length > 1, "Return fingerprint.");
        QUnit.start();
    };
    fullClient.getFingerprintForText(texts["Vienna"], success);
});

QUnit.asyncTest("fullclient.getFingerprintForText, with params, callbacks object", function (assert) {
    assert.expect(1);
    var success = function (positions) {
        assert.ok(positions.length > 1, "Return fingerprint.");
        QUnit.start();
    };
    fullClient.getFingerprintForText({text: texts["Vienna"]}, {
        success: success, error: function () {
        }
    });
});

QUnit.asyncTest("fullclient.getTokensForText, text string, callback function", function (assert) {
    assert.expect(1);
    var success = function (tokens) {
        assert.ok(tokens.length > 1, "Return tokens.");
        QUnit.start();
    };
    fullClient.getTokensForText(texts["Vienna"], success);
});

QUnit.asyncTest("fullclient.getTokensForText, with params, callbacks object", function (assert) {
    assert.expect(1);
    var success = function (tokens) {
        assert.ok(tokens.length > 1, "Return tokens.");
        QUnit.start();
    };
    fullClient.getTokensForText({body: {text: texts["Vienna"]}}, {
        success: success, error: function () {
        }
    });
});

QUnit.asyncTest("fullclient.getTokensForText, with params, callback function", function (assert) {
    assert.expect(1);
    var success = function (tokens) {
        assert.ok(tokens[0].length < 20, "Return reduced tokens.");
        QUnit.start();
    };
    fullClient.getTokensForText({body: texts["Vienna"], POStags: "NN"}, success);
});

QUnit.asyncTest("fullclient.getSlicesForText, text string, callback function", function (assert) {
    assert.expect(3);
    var success = function (slices) {
        assert.ok(slices.length > 1, "Return multiple slices.");
        assert.ok(slices[0].text.indexOf("synapse") > -1, "First slice contains synapse text");
        assert.ok(slices[1].text.indexOf("Skylab") > -1, "Second slice contains Skylab text");
        QUnit.start();
    };
    fullClient.getSlicesForText(texts["Synapse"] + texts["Skylab"], success);
});

QUnit.asyncTest("fullclient.getFingerprintsForTexts, string array, callback function", function (assert) {
    assert.expect(3);
    var success = function (fingerprints) {
        assert.ok(fingerprints.length > 1, "Return multiple fingerprints.");
        assert.ok(fingerprints[0].positions.length > 1, "Fingerprint 1 contains positions.");
        assert.ok(fingerprints[1].positions.length > 1, "Fingerprint 2 contains positions.");
        QUnit.start();
    };
    fullClient.getFingerprintsForTexts([texts["Synapse"], texts["Skylab"]], success);
});

QUnit.asyncTest("fullclient.getLanguageForText, text string, callback function", function (assert) {
    assert.expect(1);
    var success = function (language) {
        assert.ok(language.iso_tag == "en", "Return correct language.");
        QUnit.start();
    };
    fullClient.getLanguageForText(texts["Synapse"], success);
});

QUnit.asyncTest("testGetFingerprintForExpression", function (assert) {
    assert.expect(1);
    var success = function (positions) {
        assert.ok(positions.length > 1, "Fingerprint contains positions.");
        QUnit.start();
    };
    fullClient.getFingerprintForExpression({expression: expression}, success);
});

QUnit.asyncTest("testGetContextsForExpression", function (assert) {
    assert.expect(2);
    var success = function (contexts) {
        assert.ok(contexts.length > 1, "Return multiple contexts.");
        assert.ok(typeof contexts[0].context_id != 'undefined', "Contexts has an ID.");
        QUnit.start();
    };
    fullClient.getContextsForExpression({expression: expression}, success);
});

QUnit.asyncTest("testGetSimilarTermsForExpression", function (assert) {
    assert.expect(2);
    var success = function (similarTerms) {
        assert.ok(similarTerms.length > 1, "Return multiple similar terms.");
        assert.ok(typeof similarTerms[0].term == 'string', "Similar term contains a term field.");
        QUnit.start();
    };
    fullClient.getSimilarTermsForExpression({expression: expression}, success);
});

QUnit.asyncTest("testGetFingerprintsForExpressions", function (assert) {
    assert.expect(3);
    var success = function (fingerprints) {
        assert.ok(fingerprints.length > 1, "Return multiple fingerprints.");
        assert.ok(fingerprints[0].positions.length > 1, "Fingerprint 1 contains positions.");
        assert.ok(fingerprints[1].positions.length > 1, "Fingerprint 2 contains positions.");
        QUnit.start();
    };
    fullClient.getFingerprintsForExpressions({expressions: [expression, expression]}, success);
});

QUnit.asyncTest("testGetContextsForExpressions", function (assert) {
    assert.expect(2);
    var success = function (contextLists) {
        assert.ok(contextLists.length > 1, "Return multiple contexts.");
        assert.ok(typeof contextLists[0][0].context_id != 'undefined', "Contexts has an ID.");
        QUnit.start();
    };
    fullClient.getContextsForExpressions({expressions: [expression, expression]}, success);
});

QUnit.asyncTest("testGetSimilarTermsForExpressions", function (assert) {
    assert.expect(2);
    var success = function (similarTermsLists) {
        assert.ok(similarTermsLists.length > 1, "Return multiple similar terms.");
        assert.ok(typeof similarTermsLists[0][0].term == 'string', "Similar term contains a term field.");
        QUnit.start();
    };
    fullClient.getSimilarTermsForExpressions({expressions: [expression, expression]}, success);
});

QUnit.asyncTest("testCompare", function (assert) {
    assert.expect(1);
    var success = function (comparisonMetric) {
        assert.ok(comparisonMetric.cosineSimilarity > 0.1, "Return valid cosine similarity");
        QUnit.start();
    };
    fullClient.compare({comparison: [{text: texts["Synapse"]}, {text: texts["Skylab"]}]}, success);
});

QUnit.asyncTest("testCompareBulk", function (assert) {
    assert.expect(1);
    var success = function (comparisonMetrics) {
        var cosine1 = comparisonMetrics[0].cosineSimilarity;
        var cosine2 = comparisonMetrics[1].cosineSimilarity;
        assert.ok(cosine1 < cosine2, "Return valid cosine similarities");
        QUnit.start();
    };
    var comparison1 = [{text: texts["Synapse"]}, {text: texts["Skylab"]}];
    var comparison2 = [{text: texts["Mir"]}, {text: texts["Skylab"]}];
    fullClient.compareBulk({comparisons: [comparison1, comparison2]}, success);
});

QUnit.asyncTest("testImageForExpression", function (assert) {
    assert.expect(2);
    var success = function (image) {
        assert.ok(image != null, "Return a non-null object");
        assert.ok(image.length > 1, "Image string seems plausibly valid");
        var i = new Image();
        i.src = 'data:image/png;base64,' + image;
        QUnit.start();
    };
    fullClient.getImage({expression: {text: texts["Synapse"]}}, success);
});

QUnit.asyncTest("testImagesShouldThrowError", function (assert) {
    assert.expect(1);
    try {
        fullClient.getImages({text: "test"});
    } catch (e) {
        assert.ok(true, "Catch exception due to malformed request");
    }
    QUnit.start();
});