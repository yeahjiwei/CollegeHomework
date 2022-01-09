import networkx as nx
import matplotlib.pyplot as plt
import random

node_list = {1: (0, 1), 2: (1, 1), 3: (1, 0), 4: (0, 0), 5: (2, 1), 6: (2, 0)}
edge_list1 = [(1, 2), (1, 4), (1, 3), (2, 5), (3, 6), (5, 6)]
edge_list2 = [(1, 2), (1, 4), (1, 3), (2, 3), (2, 5), (2, 6), (3, 4), (3, 6), (5, 6)]

G = nx.Graph()
G.add_edges_from(edge_list1)
# 未上色的图
nx.draw(G, pos=node_list, with_labels=True, font_size=30, node_size=850, width=3)
plt.show()
G.clear()
G.add_edges_from(edge_list2)
nx.draw(G, pos=node_list, with_labels=True, font_size=30, node_size=850, width=3)
plt.show()

map_num = int(input("Bob选择想要验证的地图编号(1,2)："))
if map_num == 2:
    ans_num = int(input("Alice选择对应答案编号(1,2)："))
else:
    ans_num = 1
print("********************************************")

time = 1
while True:

    all_node_color = ["#FFDAB9", "#1e3124", "#708090", "#6495ED", "#8470FF", "#FFFF00",
                      "#FFD700", "#FF00FF", "#90EE90", "#0b2d64", "#8B6914", "#CD3333"]

    node_color_type = []
    for i in range(3):
        index = random.randint(0, len(all_node_color) - 1)
        node_color_type.append(all_node_color[index])
        all_node_color.pop(index)
    if map_num == 1:
        node_color = [node_color_type[0], node_color_type[1], node_color_type[2],
                      node_color_type[1], node_color_type[2], node_color_type[0]]
    if map_num == 2:
        if ans_num == 1:
            node_color = [node_color_type[0], node_color_type[1], node_color_type[2],
                          node_color_type[1], node_color_type[2], node_color_type[0]]
        else:
            node_color = [node_color_type[0], node_color_type[1], node_color_type[1],
                          node_color_type[2], node_color_type[2], node_color_type[0]]

    nodeBob1, nodeBob2 = input(f"Bob第 \033[34m{time}\033[0m 次输入想要验证的边：").split()

    colorAlice = []
    colorAlice.append(node_color[int(nodeBob1) - 1])
    colorAlice.append(node_color[int(nodeBob2) - 1])

    G_Alice = nx.Graph()
    G_Alice.add_nodes_from([int(nodeBob1), int(nodeBob2)])
    G_Alice.add_edge(int(nodeBob1), int(nodeBob2))
    nx.draw(G_Alice, pos=node_list, with_labels=True, node_color=colorAlice,
            font_size=30, node_size=850, width=3)
    plt.show()
    print(f"Alice第 \033[34m{time}\033[0m 次展示节点颜色：\033[34m{colorAlice}\033[0m")
    print("--------------------------------------------")
    time += 1
