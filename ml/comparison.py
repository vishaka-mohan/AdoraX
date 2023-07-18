import spacy
from sematch.semantic.similarity import YagoTypeSimilarity
sim = YagoTypeSimilarity()
nlp = spacy.load('en_core_web_md')
token = lambda word: nlp(word)[0]  # shortcut to convert string to spacy.Token
score_words = lambda w1, w2: token(w1).similarity(token(w2))

# # score_words("pilot", "airplane")      # 0.5998
# # score_words("student", "university")  # 0.7238
# # score_words("cat", "dog")             # 0.8017
# # score_words("cat", "airplane")        # 0.2654
# # score_words("student", "apple")       # 0.0928



# def score_words(w1, w2):
#     return token(w1).similarity(token(w2))

# # print(score_words("girl", "beauty"))


# from sematch.semantic.similarity import WordNetSimilarity
# wns = WordNetSimilarity()
# import nltk
# nltk.download('omw-1.4')


# #from nltk.corpus import wordnet as wns
# #wns.word_similarity('dog', 'cat', 'li')
# s = 0
# t1 = ["smartphone",
# "mobiles"
# ,
# "mobile"
# ,
# "samsung"
# ,
# "flagships"
# ,
# "tablets"
# ,
# "mobiles"
# ,
# "samsung"
# ]

# t2 = ["technology"
# ,
# "mobiles"
# ,
# "phone", 
# "smartphone",
# "camera"]


def score(data):

    print("data here")

    print(data)

    t1 = data["pubTags"]
    t2 = data["advTags"]


    if(len(t1) == 0 or len(t2) == 0):
        return 0


    s = 0
    for i in t1:
        for j in t2:
            # w1 = wns.synset(i+'.n.01')
            # w2 = wns.synset(j + '.n.01')
            # print(wns.word_similarity(i, j, 'wpath'))
            # s += wns.word_similarity(i, j, 'wpath')
            s += token(i).similarity(token(j))
            x = sim.word2yago(i)# e.g. 'http://dbpedia.org/class/yago/Dancer109989502'
            y = sim.word2yago(j)
            #s += sim.yago_similarity(x, y, 'wpath')
    print(s/(len(t1)*len(t2)))

    return s/(len(t1)*len(t2))

# score(t1, t2)


# from sematch.semantic.similarity import EntitySimilarity
# sim = EntitySimilarity()
# print(sim.similarity('https://www.91mobiles.com/','https://www.91mobiles.com/')) #0.409923677282

# print(sim.yago_similarity('http://dbpedia.org/class/yago/Dancer109989502', 
#                         'http://dbpedia.org/class/yago/Actor109765278', 'wpath'))



