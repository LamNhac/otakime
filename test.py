from re import L
from model import getManga


url = "Kawaii Kanojo-chan"
for item in getManga():
    if url == item.keyName:
       for key,value in item.chapter.items():
            print(key,value)