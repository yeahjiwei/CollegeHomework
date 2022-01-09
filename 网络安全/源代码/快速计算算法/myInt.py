import sys

max_int = sys.maxsize
print(max_int)
num_tuple = ('0', '1', '2', '3', '4', '5', '6', '7', '8', '9')


def my_int(input_string):
    total_num = 0
    is_minus = False
    string = input_string.strip()
    if string.startswith('-'):
        is_minus = True
        string = string[1:]

    for s in string:
        if s not in num_tuple:
            print("input error")
            return 0
        num = ord(s) - ord('0')
        total_num = total_num * 10 + num
        if total_num > max_int:
            total_num = max_int
            break

    return total_num * -1 if is_minus else total_num
