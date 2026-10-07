#!/usr/bin/env python3
# /// script
# requires-python = ">=3.11"
# dependencies = ["pillow==12.3.0"]
# ///

"""Render the default social image from the site's identity portrait."""

import argparse
from io import BytesIO
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parent.parent
OUTPUT = ROOT / 'public/og-image.jpg'
PORTRAIT_SOURCE = ROOT / 'src/images/portrait.webp'
SIZE = (1200, 630)
SCALE = 2
# Match global.css and the homepage's stronger muted-text value.
COLORS = {
    'canvas': '#ffffff',
    'ink': '#242a30',
    'muted': '#58616c',
    'blue': '#24558a',
}
# Identity copy follows src/components/home/Identity.astro. Keep it factual
# and broad: this default image represents the site, not a particular paper.
NAME = 'Ye Shu'
ROLE = 'PhD student in Computer Science'
AFFILIATION = 'UC San Diego'
RESEARCH = ('Network security and', 'Internet measurement')
DOMAIN = 'shuye.dev'


def font(family: str, weight: int, size: int) -> ImageFont.FreeTypeFont:
    if family == 'source-serif-4':
        filename = f'{family}-latin-{weight}-normal.woff'
        package = '@fontsource'
    else:
        filename = f'{family}-latin-wght-normal.woff2'
        package = '@fontsource-variable'
    path = ROOT / 'node_modules' / package / family / 'files' / filename
    if not path.is_file():
        raise SystemExit(f'Missing site font: {path}. Run npm ci first.')
    face = ImageFont.truetype(str(path), size * SCALE)
    if package == '@fontsource-variable':
        face.set_variation_by_axes([weight])
    return face


def render() -> bytes:
    image = Image.new(
        'RGB', tuple(value * SCALE for value in SIZE), COLORS['canvas']
    )
    draw = ImageDraw.Draw(image)

    def text(
        value: str, position: tuple[int, int], face: ImageFont.FreeTypeFont,
        color: str, max_width: int,
    ) -> None:
        x, y = (coordinate * SCALE for coordinate in position)
        bounds = draw.textbbox((x, y), value, font=face, anchor='lt')
        if (
            bounds[2] - bounds[0] > max_width * SCALE
            or bounds[3] > SIZE[1] * SCALE
        ):
            raise ValueError(f'Text exceeds the composition: {value}')
        draw.text((x, y), value, font=face, fill=color, anchor='lt')

    # Reuse the already approved crop, without another crop or retouch.
    with Image.open(PORTRAIT_SOURCE) as source:
        if source.width != source.height:
            raise ValueError('The homepage portrait must remain square.')
        portrait = source.convert('RGB').resize(
            (294 * SCALE, 294 * SCALE), Image.Resampling.LANCZOS
        )
        image.paste(portrait, (76 * SCALE, 128 * SCALE))

    text(NAME, (420, 128), font('source-serif-4', 600, 108), COLORS['ink'], 704)
    metadata = font('ibm-plex-sans', 400, 34)
    reading = font('source-sans-3', 400, 34)
    text(ROLE, (420, 248), metadata, COLORS['ink'], 704)
    text(AFFILIATION, (420, 296), metadata, COLORS['muted'], 704)
    for index, line in enumerate(RESEARCH):
        text(line, (420, 366 + index * 48), reading, COLORS['ink'], 704)
    # Keep the domain in the identity's reading column, not a detached footer.
    text(
        DOMAIN, (420, 478), font('ibm-plex-sans', 600, 28), COLORS['blue'],
        704,
    )

    image = image.resize(SIZE, Image.Resampling.LANCZOS)
    output = BytesIO()
    image.save(
        output, format='JPEG', quality=94, subsampling=0, optimize=True,
        comment=(
            b'Deterministic Pillow composition; portrait: src/images/portrait.webp; '
            b'fonts: @fontsource Source Serif 4; @fontsource-variable Source Sans 3 '
            b'and IBM Plex Sans; '
            b'no AI generation.'
        ),
    )
    result = output.getvalue()
    with Image.open(BytesIO(result)) as decoded:
        if (
            decoded.size != SIZE or decoded.mode != 'RGB'
            or decoded.format != 'JPEG'
        ):
            raise ValueError('Invalid Open Graph image output.')
    return result


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--check', action='store_true', help='Verify without writing')
    parser.add_argument(
        '--output', type=Path, default=OUTPUT, help='Optional preview path'
    )
    args = parser.parse_args()
    contents = render()
    if args.check:
        if not args.output.is_file() or args.output.read_bytes() != contents:
            parser.exit(1, 'OG image is stale; run uv run scripts/generate_og.py\n')
    else:
        args.output.write_bytes(contents)
    print(
        f'{"Verified" if args.check else "Generated"} {args.output}'
        f' (1200×630 JPEG, {len(contents):,} bytes)'
    )


if __name__ == '__main__':
    main()
