import numpy
from config import *
numpy.set_printoptions(precision=16)

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

arr = sorted(input_arr,key=lambda x:abs(diff_avg-x),reverse = False)
if(len(core_arr) > 0):
    arr = numpy.append(core_arr,arr)

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
def combinationUtil(arr, data, start, end, index, r):
    if (index == r):
        rsum = sum(data)
        print(data,numpy.float64(numpy.float64(rsum/10)*diff+min))
        if(numpy.float32(numpy.float64(rsum/10)) == numpy.float32(target_avg)):
            if(numpy.float32(numpy.float64(rsum/10)*diff+min) == numpy.float32(target)):
                print(data,numpy.float64(numpy.float64(rsum/10)*diff+min))
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
r = 10
n = len(arr)
printCombination(arr, n, r)
