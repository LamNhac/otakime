from datetime import datetime
import os
historyLogs = []
gitPush = "git "
with open("historyLogs.txt","a", encoding="utf-8") as file:
    time = datetime.now()
    file.writelines(f"{time} // sheessh - Create \n")
    os.system()
