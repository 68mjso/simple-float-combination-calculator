import numpy
from config import *
from colorama import Back
import math
numpy.set_printoptions(precision=16)

global found
global currentN
global total

found = 0
currentN = 0
total = 0

coreFile = open('core.txt','r')
inputFile = open('input.txt', 'r')

raw_core_arr = coreFile.read().split(',')
core_arr = []
if len(raw_core_arr) > 1:
    core_arr = [numpy.float64(i) for i in raw_core_arr]

raw_input_arr = inputFile.read().split(',')
input_arr = [numpy.float64(i) for i in raw_input_arr]

sumCore = sum(core_arr)
diff = max-min
target_avg = numpy.float64((target - min) / diff)
diff_avg = (target_avg - sum(core_arr)/10)/(10 - len(core_arr))*10

arr = input_arr
# arr = sorted(input_arr,key=lambda x:abs(diff_avg-x),reverse = False)
total = round(math.factorial(len(arr))/math.factorial(10)*math.factorial(len(arr)-10))
if(len(core_arr) > 0):
    arr = numpy.append(core_arr,arr)

def printProgressBar (iteration, total, prefix = '', suffix = '', decimals = 1, length = 100, fill = '█', printEnd = "\r"):
    """
    Call in a loop to create terminal progress bar
    @params:
        iteration   - Required  : current iteration (Int)
        total       - Required  : total iterations (Int)
        prefix      - Optional  : prefix string (Str)
        suffix      - Optional  : suffix string (Str)
        decimals    - Optional  : positive number of decimals in percent complete (Int)
        length      - Optional  : character length of bar (Int)
        fill        - Optional  : bar fill character (Str)
        printEnd    - Optional  : end character (e.g. "\r", "\r\n") (Str)
    """
    percent = ("{0:." + str(decimals) + "f}").format(100 * (iteration / float(total)))
    filledLength = int(length * iteration // total)
    bar = fill * filledLength + '-' * (length - filledLength)
    print(f'\r{prefix} |{bar}| {percent}% {suffix} Found: {found}', end = printEnd)
    # Print New Line on Complete
    if iteration == total: 
        print()

def combinationUtil(arr, data, start, end, index, r):
    global currentN
    global found
    if (index == r):
        rsum = sum(data)
        currentN += 1
        printProgressBar(currentN,total)
        # print(data,str(numpy.float64(numpy.float64(rsum/10)*diff+min)))
        if(numpy.float32(numpy.float64(rsum/10)) == numpy.float32(target_avg)):
            if(numpy.float32(numpy.float64(rsum/10)*diff+min) == numpy.float32(target)):
                found = found + 1
                print(data,Back.GREEN + str(numpy.float64(numpy.float64(rsum/10)*diff+min)))
                f = open("output.txt", "a")
                f.write(' '.join([str(elem) for elem in data]))
                f.write(' = ')
                f.write(str(numpy.float64(numpy.float64(rsum/10)*diff+min)))
                f.write("\n")
                f.close()
                return True
        return
    i = start
    while(i <= end and end - i + 1 >= r - index):
        data[index] = arr[i]
        combinationUtil(arr, data, i + 1, end, index + 1, r)
        i += 1

def printCombination(arr, n, r):
    print('start')
    print('avg: ',target_avg)
    print('core_avg: ',sum(core_arr)/10)
    print('diff_avg: ',diff_avg)
    data = [0]*r
    try:
        f = open("output.txt", "w")
        f.write("")
        f.close()
    except:
        f = open("output.txt", "x")
        f.close()
    combinationUtil(arr, data, 0, n - 1, 0, r)
    print('end')

r = 10
n = len(arr)
printCombination(arr, n, r)
