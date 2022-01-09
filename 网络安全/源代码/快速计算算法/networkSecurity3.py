from tkinter import *
import tkinter as tk
import tkinter.messagebox as messagebox
# 自定义大整数
import myInt


# 求逆元
def inverse(m, n):
    for i in range(n):
        if ((m * i) % n) == 1:
            return i
    print("a,b不互素，逆元不存在")
    return -1


# 窗体程序
class Application(Frame):
    # 初始化
    def __init__(self, master=None):
        Frame.__init__(self, master)
        self.grid()
        self.createWidgets()

    # 窗体组件
    def createWidgets(self):
        self.place(x=55, y=55)
        self.label1 = Label(self,text="第1个值 ",font=18,bg='#eddd9e')
        self.label1.grid(row=2,column=1)
        self.label2 = Label(self,text="第2个值 ",font=18,bg='#eddd9e')
        self.label2.grid(row=4,column=1)
        self.inputName1 = Entry(self)
        self.inputName1.grid(row=2,column=2,ipady=6)
        self.inputName2 = Entry(self)
        self.inputName2.grid(row=4,column=2,ipady=6)

        self.alertButton1 = Button(self, text='求解大吉1',font=18,bg='#c9d8cd', command=self.ques1)
        self.alertButton1.grid(row=1, column=3,padx=16)
        self.alertButton2 = Button(self, text='求解大吉2',font=18,bg='#c9d8cd', command=self.ques2)
        self.alertButton2.grid(row=3, column=3)
        self.alertButton3 = Button(self, text='求解大吉3',font=18,bg='#c9d8cd', command=self.ques3)
        self.alertButton3.grid(row=5, column=3)

    '''
    函数名称：实验一
    函数功能：求最大公因数
    设计思路：使用欧几里得算法，如果a或b为0，则直接返回最大公因数0
    '''
    def ques1(self):
        a = myInt.my_int(self.inputName1.get())
        b = myInt.my_int(self.inputName2.get())
        r = -1
        # 若为负数，将其转为正数
        if a < 0:
            a = -a
        if b < 0:
            b = -b
        if a == b:
            print(f"最大公因数为{a}")
            messagebox.showinfo('问题1', f'最大公因数为{a}')
        elif a == 0 or b == 0:
            print(f"最大公因数为0")
            messagebox.showinfo('问题1', f"最大公因数为0")
        else:
            # 欧几里得算法
            while r != 0:
                r = a % b
                a = b
                b = r
            print(f"最大公因数为：{a}")
            messagebox.showinfo('问题1', f"最大公因数为：{a}")

    '''
    函数名称：实验二
    函数功能：求逆元
    设计思路：利用for循环测试从1到b的每一个数，如果该数与a相乘模b得到1，
    那么该数为a在模b下的逆元，循环结束都未得到逆元，则说明a和b不互素，没有逆元存在
    '''
    def ques2(self):
        a = myInt.my_int(self.inputName1.get())
        b = myInt.my_int(self.inputName2.get())
        num = inverse(a, b)
        if num == -1:
            print("err")
            messagebox.showinfo('问题2', "err")
        else:
            print(f"逆元为：{num}")
            messagebox.showinfo('问题2', f"逆元为：{num}")

    '''
    函数名称：实验三
    函数功能：求解中国剩余定理
    设计思路：定义数组b[],m[]，分别用来存储同余式x≡bmodm中的bi、mi。
    定义数组M[],Mi为所以m的积除以mi。定义_M[],_M[i]为M[i]模m[i]的逆元。
    然后可以轻松得到x=b1*_M1M1+b2_M2M2+…+bk_Mk*Mk。
    '''
    def ques3(self):
        b_num = self.inputName1.get().split()
        m_num = self.inputName2.get().split()
        nn = []
        inverseElem = []
        m_num_product = 1
        for i in m_num:
            m_num_product = m_num_product * myInt.my_int(i)

        for i in m_num:
            nn.append(m_num_product // myInt.my_int(i))

        for i in range(len(m_num)):
            inverseElem.append(inverse(nn[i], myInt.my_int(m_num[i])))

        x = 0
        for i in range(len(m_num)):
            x += myInt.my_int(b_num[i]) * nn[i] * inverseElem[i]

        x = x % m_num_product
        print(f"同余组的解为：{x}")
        messagebox.showinfo('问题3', f"同余组的解为：{x}")


window = tk.Tk()
window.geometry('500x300')
window.resizable(0,0)
window.configure(bg = '#eddd9e')
app = Application()
# 设置窗口标题:
app.master.title('网络安全3')
app.configure(bg = '#eddd9e')
# 主消息循环:
app.mainloop()
