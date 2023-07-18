from keybert import KeyBERT
import re
import spacy
from spacy.lang.en.stop_words import STOP_WORDS
from collections import Counter
nlp = spacy.load("en_core_web_sm")


def cleanDocument(doc):
    doc = re.sub('\n', ' ', doc)
    doc_ = ''
    wordList = doc.split()
    doc1 = ''
    for word in wordList:
        valid_word = True
        for ch in word:

            if not ch.isalnum():
                valid_word = False
                break
        if(valid_word == True):
            doc1 += word + " "

    spacy_doc = nlp(doc1)
    # removing URLS, Emails, Stop Words
    data = ' '.join([str(token)
                    for token in spacy_doc if token.like_url == False and token.like_email == False and token not in STOP_WORDS])
    # Removing very frequent words
    cnt = Counter()
    wordList = data.split()
    for word in wordList:
        cnt[word] += 1
    FREQWORDS = set([w for (w, wc) in cnt.most_common(10)])
    data = ' '.join([word for word in wordList if word not in FREQWORDS])
    f = open("demofile2.txt", "w")
    f.write(data)
    f.close()

    return data


def extract_NER_tags(data):
    doc = nlp(data)
    ner_keywords = set()

    # print entities
    for ent in doc.ents:
        if(ent.label_ == 'ORG'):
            ner_keywords.add(ent.text)
        # print(ent.text, ent.start_char, ent.end_char, ent.label_)
    return ner_keywords


def extract_keywords(data):

    kw_model = KeyBERT()
    data = cleanDocument(data)
    all_keywords = []

    keywords1 = kw_model.extract_keywords(
        data, keyphrase_ngram_range=(1, 1), use_mmr=True, diversity=0.7)

    keywords2 = kw_model.extract_keywords(
        data, keyphrase_ngram_range=(1, 2), use_mmr=True, diversity=0.9)
    NER_KEYWORDS = extract_NER_tags(data)
    all_keywords = [word[0]
                    for word in keywords1] + [word for word in NER_KEYWORDS]

    print(all_keywords)

    return all_keywords
