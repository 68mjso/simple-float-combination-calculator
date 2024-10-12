import threading
import asyncio
import socketio
import numpy
from collections import Counter
import math
from config import config_min, config_max, config_target, config_using
from func import combination_util_sorted
from time import process_time

sio = socketio.AsyncServer(async_mode="asgi", cors_allowed_origins="*")
app = socketio.ASGIApp(sio)

numpy.set_printoptions(precision=16)


@sio.event
def connect(namespace, sid, data):
    print("connection established")


def calculate_combination_task(sid, data, loop):
    # Function that contains the core logic, extracted from the async method
    core_arr = []
    input_arr = []
    input_timeout = int(data["timeout"])
    raw_core_arr = data["core_arr"].split(",")
    raw_input_arr = data["input_arr"].split(",")
    core_arr = [numpy.float64(i) for i in raw_core_arr]
    input_arr = [numpy.float64(i) for i in raw_input_arr if i not in input_arr]
    temp = Counter(input_arr)
    input_arr = [*temp]
    found = False
    using_arr = []
    result_arr = []
    input_arr_1 = input_arr
    diff = numpy.subtract(config_max, config_min)
    target_avg = numpy.float64((config_target - config_min) / diff)
    r = 10 - config_using
    itr = math.floor(len(core_arr) / config_using)

    for i in range(itr):
        time_start = process_time()
        itr_core = core_arr[(config_using * i) : (config_using * (i + 1))]
        sum_core_arr = sum(itr_core) / 10
        diff_target = target_avg - sum_core_arr
        diff_avg = diff_target / (10 - len(itr_core)) * 10
        arr = sorted(input_arr_1, key=lambda x: abs(diff_avg - x), reverse=False)
        n = len(arr)
        data = [0] * r
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
            time_start=time_start,
            timeout=input_timeout,
        )
        if result["result"] == True:
            using_arr = result["arr"]
            for item in using_arr:
                input_arr_1.remove(item)
            found = False
            using_arr = []
            result_arr.append(
                {
                    "core_arr": itr_core,
                    "input_arr": result["arr"],
                    "sum_result": result["sum_result"],
                    "converted_sum_result": result["converted_sum_result"],
                }
            )
            # Emit intermediate results
            asyncio.run_coroutine_threadsafe(
                sio.emit(
                    "combination-result",
                    {
                        "result": result_arr,
                        "completed": False,
                    },
                    to=sid,
                ),
                loop,
            )
        asyncio.run_coroutine_threadsafe(sio.sleep(0), loop)

    # Final result emit
    asyncio.run_coroutine_threadsafe(
        sio.emit(
            "combination-result",
            {
                "result": result_arr,
                "completed": True,
            },
            to=sid,
        ),
        loop,
    )
    print("Calculation completed")


@sio.on("calculate-combination")
async def handle_calculate_combination(sid, data):
    print("Starting calculation task")
    loop = asyncio.get_event_loop()
    # Start the calculation in a new thread
    thread = threading.Thread(target=calculate_combination_task, args=(sid, data, loop))
    thread.start()
    await sio.sleep(0)
