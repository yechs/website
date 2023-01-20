#!/usr/bin/env python3

import argparse
import os
import json
from PIL import Image

IMAGE_PREFIXES = ('.jpg', '.jpeg', '.png')
# TARGET_WIDTHS = [1920, 1440, 1024, 768, 640, 320]
TARGET_WIDTHS = [1920, 1440, 1024, 640, 320]
BASE_DIR = '/img/gallery/'

parser = argparse.ArgumentParser(
    prog='srcset',
    description='Generate srcset resized version of images',
    epilog='Text at the bottom of help'
)
parser.add_argument('dirname', help='Directory to process')
args = parser.parse_args()

# Recursively list all files
images = []
for (dirpath, dirnames, filenames) in os.walk(args.dirname):
    filenames.sort()
    images.extend([os.path.join(dirpath, x) for x in filenames])
    break  # only first level

# The JSON output for the gallery config
outputs = []

for filename in images:
    if not filename.endswith(IMAGE_PREFIXES):
        # skip non-image files
        continue
    if filename.endswith(tuple(f'w{i}' for i in IMAGE_PREFIXES)):
        # skip the resized version
        continue

    print(filename)
    filename_no_ext, ext = os.path.splitext(filename)

    im = Image.open(filename)
    width, height = im.size

    # this removes the EXIF and TIFF data
    # Note that it also changes the color profile to sRGB (which is Display P3 by default on iOS)
    # same below
    im_resized = im.resize((width, height), Image.ANTIALIAS)
    im_resized.save(f"{filename_no_ext}-srcw{ext}")

    srcset = [{
        "src": os.path.join(BASE_DIR, f"{filename_no_ext}-srcw{ext}"),
        "width": width,
        "height": height,
    }]
    for target_width in TARGET_WIDTHS:
        if width <= target_width:
            continue

        target_height = int(height * target_width / width)
        im_resized = im.resize((target_width, target_height), Image.ANTIALIAS)
        im_resized.save(f"{filename_no_ext}-{target_width}w{ext}")

        srcset.append({
            "src": os.path.join(BASE_DIR, f"{filename_no_ext}-{target_width}w{ext}"),
            "width": target_width,
            "height": target_height,
        })

    im.close()

    outputs.append({
        "src": os.path.join(BASE_DIR, f"{filename_no_ext}-srcw{ext}"),
        "title": "TODO title",
        "description": "TODO description",
        "width": width,
        "height": height,
        "srcSet": srcset,
    })

print("")
print("JSON Configuration:")
print(json.dumps(outputs)[1:-1])  # remove the [ and ] at the beginning and end
print("")
print("Don't forget to run jpegoptim on the images.")
print(f"jpegoptim -s --all-progressive {args.dirname}/*.jpg")
print(f"jpegoptim -s --all-normal {args.dirname}/*.jpg")
