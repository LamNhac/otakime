a = []
with open("test.txt",'r') as file:
    _list = file.read()
    i = 0
    a.append(_list.split("\n"))

a = a[0]
_dict = {}
i = 0
for item in a:
    i = i+1
    _dict.update({
        f"code{i}": item
    })
print(_dict)

