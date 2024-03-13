import socketio
from combinate import combination_calculator
import numpy

sio = socketio.AsyncServer(async_mode="asgi", cors_allowed_origins="*")

app = socketio.ASGIApp(sio)


@sio.event
def connect(namespace, sid, data):
    print("connection established")


@sio.on("calculate-combination")
def handle_calculate_combination(sid, data):
    core_arr = []
    input_arr = []
    raw_core_arr = data["core_arr"].split(",")
    raw_input_arr = data["input_arr"].split(",")
    core_arr = [numpy.float64(i) for i in raw_core_arr]
    input_arr = [numpy.float64(i) for i in raw_input_arr if i not in input_arr]
    result = combination_calculator(core_arr=core_arr, input_arr=input_arr)
    print("calculate_combination")
    pass
