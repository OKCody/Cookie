library(dplyr)
library(eply)

text <- read.delim('samples.txt', sep='\n')


sentences<-scan("samples.txt","character",sep="\n");
#Replace full stop and comma
sentences<-gsub("\\.","",sentences)
sentences<-gsub("\\,","",sentences)
#Split sentence
words<-strsplit(sentences," ")
#Calculate word frequencies

words.freq<-table(unlist(words));

thing <- cbind(names(words.freq),as.integer(words.freq))

thing <- as.data.frame(thing)

colnames(thing) <- c('word', 'freq');
thing <- data.frame(tolower(thing$word), as.numeric(thing$freq))
colnames(thing) <- c('word', 'freq');
thing <- data.frame(noquote(unquote(thing$word)), thing$freq)
colnames(thing) <- c('word', 'freq');

thing <- thing %>%
  group_by(word) %>%
  summarise(
    sum(freq)
  ) %>%
  data.frame(.)

colnames(thing) <- c('word', 'freq');

thing <- thing %>%
  arrange(., desc(freq))

# Overlapping Normal Distributions
p <- seq(0,.2,0.001)
x1 <- dnorm(p, 0.1889911, 0.01839651)
x2 <- dnorm(p, 0.00349634, 0.01384053) 
plot(range(p), range(x1,x2), type = "n") 
lines(p, x1, col = "red", lwd = 1) 
lines(p, x2, col = "blue", lwd = 1)
polygon(c(p,p[1]), c(pmin(x1,x2),0), col = "grey")


# -----

library(readr)
library(eply)
library(stringr)
library(rvest)
library(dplyr)

text <- read_file('Control.html')
text <- html_text(read_html(text))
text <- text %>%
  gsub("\\n"," ",.) %>%
  gsub("\\.","",.) %>%
  gsub("\\,","",.) %>%
  gsub('\\!',"",.) %>%
  str_replace(., '"', "")

words <- strsplit(text, " ")
words.freq <- table(unlist(words))
words.freq <- cbind(names(words.freq),as.integer(words.freq))
words.freq <- as.data.frame(words.freq)
colnames(words.freq) <- c('word', 'freq')
words.freq <- data.frame(tolower(words.freq$word), as.numeric(words.freq$freq))
colnames(words.freq) <- c('word', 'freq')
words.freq <- data.frame(tolower(words.freq$word), as.numeric(words.freq$freq))
colnames(words.freq) <- c('word', 'freq')

words.freq <- words.freq %>%
  group_by(word) %>%
  summarise(
    sum(freq)
  ) %>%
  data.frame(.) %>%
  filter(word != 'to',
         word != 'this',
         word != 'by',
         word != 'for',
         word != 'on',
         word != 'we',
         word != 'if',
         word != 'are',
         word != 'that',
         word != 'and',
         word != 'us',
         word != 'in',
         word != 'or',
         word != 'out',
         word != 'use',
         word != 'out',
         word != 'our',
         word != 'you',
         word != 'the',
         word != 'a',
         word != 'can',
         word != 'it',
         word != 'of',
         word != 'uses',
         word != 'with')

colnames(words.freq) <- c('word', 'freq')

sample <- words.freq %>%
  arrange(., desc(freq))

diff <- setdiff(notices$word, tail(sample$word,10600))
