import random, string

def generate_random_id(length=4):
    pools = [char for char in random.choices(string.ascii_uppercase, k=length)]
    return "".join(pools)