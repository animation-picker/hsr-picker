import os
from PIL import Image

def convert_jpg_to_webp(input_directory, output_directory):
    for root, dirs, files in os.walk(input_directory):
        for file in files:
            if file.endswith(".jpg"):
                img = Image.open(os.path.join(root, file))
                webp_file = os.path.join(output_directory, os.path.splitext(file)[0] + '.webp')
                img.save(webp_file, 'webp')
                
                # for json
                print('"'+os.path.splitext(file)[0]+'\": \" \",')

                # for pool
                # print('\''+os.path.splitext(file)[0]+'\',')

# 使用函数
convert_jpg_to_webp('../img/', '../webp')