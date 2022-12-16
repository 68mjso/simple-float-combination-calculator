import struct
import numpy
from config import *
from ibm2ieee import *
numpy.set_printoptions(precision=16)
inputFile = open('input.txt', 'r')

raw_input_arr = inputFile.read().split(',')
arr = [numpy.float64(i) for i in raw_input_arr]

diff = max-min

target_avg = numpy.float64((target + min) / diff)

def printCombination(arr, n, r):
    data = [0]*r
    combinationUtil(arr, data, 0, n - 1, 0, r)


def combinationUtil(arr, data, start, end, index, r):
    if (index == r):
        rsum = 0
        for j in range(r):
            rsum += data[j]
        if(numpy.float32(numpy.float64(rsum/10)) == numpy.float32(target_avg)):
            if(numpy.float32(numpy.float64(rsum/10)*diff-min) == numpy.float32(target)):
                print(data,numpy.float32(numpy.float64(rsum/10)*diff-min))
                return True
        return
    i = start
    while(i <= end and end - i + 1 >= r - index):
        data[index] = arr[i]
        result = combinationUtil(arr, data, i + 1, end, index + 1, r)
        if(result == True):
            break
        i += 1


r = 10
n = len(arr)
printCombination(arr, n, r)
