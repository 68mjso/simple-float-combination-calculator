import numpy

from config import config_min, config_max, config_target, config_using
import math
import socketio
from func import combination_util, combination_util_sorted
from import_data import core_arr, input_arr
from time import process_time


numpy.set_printoptions(precision=16)
sio = socketio.Client()


@sio.event
def connect():
    print("connection established")


found = False
using_arr = []
input_arr_1 = input_arr
total = 0

diff = numpy.subtract(config_max, config_min)
target_avg = numpy.float64((config_target - config_min) / diff)
r = 10 - config_using

try:
    f = open("output.txt", "w")
    f.write("")
    f.close()
except:
    f = open("output.txt", "x")
    f.close()
itr = math.floor(len(core_arr) / config_using)
time_start = process_time()
for i in range(itr):
    itr_core = core_arr[(config_using * i) : (config_using * (i + 1))]
    sum_core_arr = sum(itr_core) / 10
    diff_target = target_avg - sum_core_arr
    diff_avg = diff_target / (10 - len(core_arr)) * 10
    # Sort the input array
    arr = sorted(input_arr_1, key=lambda x: abs(diff_avg - x), reverse=False)
    n = len(arr)
    data = [0] * r
    # result = combination_util(
    #     core_arr=itr_core,
    #     arr=arr,
    #     data=data,
    #     start=0,
    #     end=n - 1,
    #     index=0,
    #     r=r,
    #     diff=diff,
    #     diff_target=diff_target,
    #     target_avg=target_avg,
    #     found=found,
    #     using_arr=using_arr
    # )
    result = combination_util_sorted(
        core_arr=itr_core,
        arr=arr,
        data=data,
        start=0,
        end=n - 1,
        index=0,
        r=r,
        diff=diff,
        diff_target=diff_target,
        target_avg=target_avg,
        found=found,
        using_arr=using_arr,
        remain=diff_target,
    )
    if result["result"] == True:
        using_arr = result["arr"]
        for item in using_arr:
            input_arr_1.remove(item)
        found = False
        using_arr = []

time_stop = process_time()
