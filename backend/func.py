import numpy
from config import config_min, config_target, config_target_min, config_target_max
from ieee_754 import ieee_754_conversion
from time import process_time

check_target = numpy.float32(config_target)
convert_target = ieee_754_conversion(config_target)


# def combination_util(
#     core_arr: list,
#     arr: list,
#     data: list,
#     start: int,
#     end: int,
#     index: int,
#     r: int,
#     diff,
#     diff_target,
#     target_avg,
#     found: bool,
#     using_arr: list,
# ):
#     if index == r - 1:
#         result_sum = sum(data) / 10
#         result_diff = (diff_target - result_sum) * 10
#         if result_diff < min(arr):
#             return {"result": False, "arr": using_arr}
#         sorted_arr = sorted(arr, key=lambda x: abs(result_diff - x), reverse=False)
#         sliced_arr = sorted_arr[0:2]
#         for n in sliced_arr:
#             if n in data:
#                 continue
#             data[index] = n
#             print_arr = core_arr + data
#             avg_result = numpy.float64(sum(print_arr) / 10) * diff + config_min
#             convert_result = ieee_754_conversion(avg_result)
#             if avg_result >= config_target_min and avg_result <= config_target_max:
#                 f = open("output.txt", "a")
#                 f.write("Combination: \n")
#                 f.write(f"Core Array: {' '.join([(str(elem)) for elem in core_arr])}\n")
#                 f.write(f"Input Array: {' '.join([(str(elem)) for elem in data])} \n")
#                 f.write(f"Raw Sum: {avg_result}\n")
#                 f.write(f"Converted Sum: {convert_result} \n")
#                 f.write("\n")
#                 f.close()
#                 found = True
#                 using_arr = data
#                 return {"result": True, "arr": using_arr}
#         data[index] = 0
#         return {"result": False, "arr": []}
#     i = start
#     while i <= end and end - i + 1 >= r - index:
#         data[index] = arr[i]
#         result = combination_util(
#             core_arr=core_arr,
#             arr=arr,
#             data=data,
#             start=i + 1,
#             end=end,
#             index=index + 1,
#             r=r,
#             diff=diff,
#             diff_target=diff_target,
#             target_avg=target_avg,
#             found=found,
#             using_arr=using_arr,
#         )
#         if result["result"] == True:
#             return {"result": True, "arr": result["arr"]}
#         i += 1
#     return {"result": found, "arr": using_arr}


def combination_util_sorted(
    core_arr: list,
    arr: list,
    data: list,
    start: int,
    end: int,
    index: int,
    r: int,
    diff,
    diff_target,
    target_avg,
    found: bool,
    using_arr: list,
    remain,
    time_start,
    timeout,
):
    time_diff = round(process_time() - time_start)
    if time_diff == timeout:
        return {
            "result": True,
            "arr": [],
            "sum_result": "",
            "converted_sum_result": "",
        }
    if index == r - 2 and min(arr) + max(arr) < remain:
        return {
            "result": False,
            "arr": using_arr,
            "sum_result": "",
            "converted_sum_result": "",
        }
    if index == r - 1:
        result_sum = numpy.sum(data) / 10
        result_diff = (diff_target - result_sum) * 10
        if result_diff < min(arr) or result_diff > 1:
            return {
                "result": False,
                "arr": using_arr,
                "sum_result": "",
                "converted_sum_result": "",
            }
        sorted_arr = sorted(arr, key=lambda x: abs(result_diff - x), reverse=False)
        sliced_arr = sorted_arr[0:2]
        for n in sliced_arr:
            if n in data:
                continue
            data[index] = n
            print_arr = core_arr + data
            avg_result = numpy.float64(numpy.sum(print_arr) / 10) * diff + config_min
            convert_result = ieee_754_conversion(avg_result)
            if avg_result >= config_target_min and avg_result <= config_target_max:
                # f = open("output.txt", "a")
                # f.write("Combination: \n")
                # f.write(f"Core Array: {' '.join([(str(elem)) for elem in core_arr])}\n")
                # f.write(f"Input Array: {' '.join([(str(elem)) for elem in data])} \n")
                # f.write(f"Raw Sum: {avg_result}\n")
                # f.write(f"Converted Sum: {convert_result} \n")
                # f.write("\n")
                # f.close()
                found = True
                using_arr = data
                return {
                    "result": True,
                    "arr": using_arr,
                    "sum_result": str(avg_result),
                    "converted_sum_result": str(convert_result),
                }
        data[index] = 0
        return {
            "result": False,
            "arr": [],
            "sum_result": "",
            "converted_sum_result": "",
        }
    i = start
    while i <= end and end - i + 1 >= r - index:
        data[index] = arr[i]
        remain_result = remain - (arr[i] / 10)
        avg_float_remain = remain / (r - index - 1) * 10
        remain_arr = arr.copy()
        remain_arr.remove(arr[i])
        remain_arr = sorted(
            remain_arr, key=lambda x: abs(avg_float_remain - x), reverse=False
        )
        result = combination_util_sorted(
            core_arr=core_arr,
            arr=remain_arr,
            data=data,
            start=i,
            end=len(remain_arr) - 1,
            index=index + 1,
            r=r,
            diff=diff,
            diff_target=diff_target,
            target_avg=target_avg,
            found=found,
            using_arr=using_arr,
            remain=remain_result,
            time_start=time_start,
            timeout=timeout,
        )
        if result["result"] == True:
            return {
                "result": True,
                "arr": result["arr"],
                "sum_result": result["sum_result"],
                "converted_sum_result": result["converted_sum_result"],
            }
        i += 1
    return {"result": found, "arr": using_arr}
