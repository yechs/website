#!/usr/bin/env python3
# /// script
# requires-python = ">=3.11"
# dependencies = ["cairosvg==2.8.2", "pillow==12.3.0"]
# ///

"""Generate the ICO fallback from public/favicon.svg."""

import argparse
import struct
from io import BytesIO
from pathlib import Path

import cairosvg
from PIL import Image


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--check', action='store_true', help='Check without writing')
    args = parser.parse_args()
    root = Path(__file__).resolve().parent.parent
    svg = (root / 'public/favicon.svg').read_bytes()
    sizes = (16, 32, 48)
    images = []
    for size in sizes:
        png = cairosvg.svg2png(bytestring=svg, output_width=size, output_height=size)
        with Image.open(BytesIO(png)) as image:
            images.append(image.convert('RGBA'))

    # Package separately rendered PNG frames; avoid BMP alpha/mask ambiguity.
    frames = []
    for image in images:
        frame = BytesIO()
        image.save(frame, format='PNG')
        frames.append(frame.getvalue())
    directory = bytearray(struct.pack('<HHH', 0, 1, len(sizes)))
    offset = 6 + 16 * len(sizes)
    for size, frame in zip(sizes, frames):
        directory.extend(struct.pack('<BBBBHHII', size, size, 0, 0, 1, 32,
                                     len(frame), offset))
        offset += len(frame)
    ico = bytes(directory) + b''.join(frames)
    # Decode every frame using the same Pillow environment as the gallery tool.
    with Image.open(BytesIO(ico)) as decoded:
        for size, expected in zip(sizes, images):
            actual = decoded.ico.getimage((size, size)).convert('RGBA')
            if actual.tobytes() != expected.tobytes():
                raise ValueError(f'ICO frame {size}px failed round-trip validation')
    outputs = {'favicon.ico': ico}
    for name, contents in outputs.items():
        output = root / 'public' / name
        if args.check:
            if not output.exists() or output.read_bytes() != contents:
                parser.exit(1, f'{output} is stale; run npm run generate:favicon\n')
        else:
            output.write_bytes(contents)
        print(f'{"Verified" if args.check else "Generated"} public/{name}')


if __name__ == '__main__':
    main()
