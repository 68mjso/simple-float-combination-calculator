import numpy

core_file = open("core.txt", "r")
input_file = open("input.txt", "r")

# Handle convert core array
raw_core_arr = core_file.read().split(",")
core_arr = []
if len(raw_core_arr) > 1:
    core_arr = [numpy.float64(i) for i in raw_core_arr]

# Handle convert input array
raw_input_arr = input_file.read().split(",")
input_arr = [numpy.float64(i) for i in raw_input_arr]
