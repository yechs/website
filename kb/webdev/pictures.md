# Picture Preprocessing

## Required Tools

- [ImageMagick](https://imagemagick.org)
- [exiftool](https://exiftool.org)
- [Python 3](https://www.python.org)
  - The [Pillow](https://pypi.org/project/Pillow/) library
- [jpegoptim](https://github.com/tjko/jpegoptim)
- [optipng](https://optipng.sourceforge.net)

## Convert from heic to jpg

By default, Apple devices now store pictures in [HEIF format](https://en.wikipedia.org/wiki/High_Efficiency_Image_File_Format) (ending in e.g. `.heic`).
However, as of now (Jan 2023), no browsers support HEIF ([source](https://caniuse.com/heif)).
So, we have to convert these pictures to a better-supported format. One format is [jpg](https://en.wikipedia.org/wiki/JPEG).

To do so, we use the imagemagick [mogrify](https://imagemagick.org/script/mogrify.php) command to convert images to jpg in batch.

```console
magick mogrify -monitor -format jpg *.HEIC
```

## Rename files

An optional step is to rename all the files according to the time they are taken. This helps organize the pictures by time.

The following command recursively renames all files in the target directory to the format of `2022-06/20220602_162412.jpg`.

```console
exiftool -r '-FileName<CreateDate' -d '%Y-%m/%Y%m%d_%H%M%S%%-c.%%le' <path/to/target>
```

It is adapted from a [stack exchange post](https://superuser.com/questions/205417/sort-and-rename-images-by-date-in-exif-info).

## Purge EXIF and TIFF data

Before uploading your photo, it may contain sensitive EXIF and TIFF data (time taken, device, geo location, ...) that you want to remove.
You can use the following `exiftool` command to remove all EXIF and TIFF data of all pictures in current directory.

```console
exiftool -all= .
```

Alternatively, you can also preserve certain fields while removing the rest. For example, the following command preserves the `artist` field.

```console
exiftool -all= -tagsfromfile @ -artist
```

## Responsive Images

In modern web development, the concept of [responsive images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images) help devices with different screen sizes and resolutions to load only what is necessary.

For the gallery of this website, I have written a [python script](https://github.com/yechs/website/blob/main/static/img/gallery/srcset.py) to generate responsive images of different widths (1920, 1440, 1024, 640, 320 pixels). These values are inspired from a [blog post](https://medium.com/hceverything/applying-srcset-choosing-the-right-sizes-for-responsive-images-at-different-breakpoints-a0433450a4a3).

Note that the script also removes EXIF and TIFF data. Also, it changes the color profile to sRGB (which may originally be Display P3 for iOS devices).

```console
python srcset.py
```

## Compression

It is also important to compress all images so they take less time to load and save bandwidth.

The following command optimizes all JPEG images. Although for most cases progressive images take less space, it may also be possible that a normal image takes less space. So you may want to run the command twice.

```console
jpegoptim -s --all-progressive ./*.jpg")
jpegoptim -s --all-normal ./*.jpg")

```

For png files, you may use [optipng](https://optipng.sourceforge.net).
