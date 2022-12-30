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

arr = input_arr
# if(len(core_arr) > 0):
#     arr = numpy.append(core_arr,input_arr)
sumCore = sum(core_arr)
diff = max-min

target_avg = numpy.float64((target - min) / diff)
def printCombination(arr, n, r):
    print('start')
    print('avg: ',target_avg)
    print('core_avg: ',sum(core_arr)/10)
    print('diff_avg: ',(target_avg - sum(core_arr)/10)/(10 - len(core_arr))*10)
    data = [0]*r
    combinationUtil(arr, data, 0, n - 1, 0, r)
    print('end')


def combinationUtil(arr, data, start, end, index, r):
    if (index == r):
        rsum = sum(data) + sumCore
        if(numpy.float32(numpy.float64(rsum/10)) == numpy.float32(target_avg)):
            if(numpy.float32(numpy.float64(rsum/10)*diff+min) == numpy.float32(target)):
                print(data,numpy.float64(numpy.float64(rsum/10)*diff+min))
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
