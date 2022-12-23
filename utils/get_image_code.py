from PIL import Image
import numpy as np

im = Image.open('C:\\Users\\79270\Desktop\ВУЗ\Третий курс\Пятый сем\Верстка\Курсач\\utils\drawings\cow.gif')
im_matrix = np.array(im)

a = []

for i in range(32):
    for j in range(32):
        a.append(0 if im_matrix[i][j]==1 else 1)

print(a)