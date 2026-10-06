#!/usr/bin/env python3
# /// script
# requires-python = ">=3.11"
# dependencies = ["pillow==12.3.0"]
# ///

import argparse
import json
import re
from pathlib import Path

from PIL import Image


TARGET_WIDTHS = (1920, 1440, 1024, 640, 320)
IMAGE_SUFFIXES = {'.jpg', '.jpeg', '.png'}
GENERATED_STEM = re.compile(r'-(?:src|\d+)w$')


def public_url(path: Path, public_root: Path) -> str:
    return f'/{path.resolve().relative_to(public_root).as_posix()}'


def main() -> None:
    parser = argparse.ArgumentParser(
        description='Generate responsive gallery images and JSON metadata.'
    )
    parser.add_argument('directory', type=Path, help='Gallery directory to process')
    args = parser.parse_args()

    public_root = Path('public').resolve()
    directory = args.directory.resolve()
    directory.relative_to(public_root)
    outputs = []

    for source in sorted(directory.iterdir()):
        if (
            not source.is_file()
            or source.suffix.lower() not in IMAGE_SUFFIXES
            or GENERATED_STEM.search(source.stem)
        ):
            continue

        with Image.open(source) as image:
            width, height = image.size
            original = source.with_name(f'{source.stem}-srcw{source.suffix}')
            image.save(original)

            srcset = [
                {
                    'src': public_url(original, public_root),
                    'width': width,
                    'height': height,
                }
            ]

            for target_width in TARGET_WIDTHS:
                if width <= target_width:
                    continue

                target_height = round(height * target_width / width)
                resized = image.resize(
                    (target_width, target_height), Image.Resampling.LANCZOS
                )
                output = source.with_name(
                    f'{source.stem}-{target_width}w{source.suffix}'
                )
                resized.save(output)
                srcset.append(
                    {
                        'src': public_url(output, public_root),
                        'width': target_width,
                        'height': target_height,
                    }
                )

        outputs.append(
            {
                'src': public_url(original, public_root),
                'title': 'TODO title',
                'description': 'TODO description',
                'width': width,
                'height': height,
                'srcSet': srcset,
            }
        )

    print(json.dumps(outputs, indent=2))


if __name__ == '__main__':
    main()
