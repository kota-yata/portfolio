#!/bin/sh

set -eu

project_dir=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
temporary_dir=$(mktemp -d "${TMPDIR:-/tmp}/portfolio-assets.XXXXXX")
build_dir="$temporary_dir/dist"
dist_dir="$project_dir/dist"
trap 'rm -rf "$temporary_dir"' EXIT HUP INT TERM

mkdir -p "$build_dir/i18n"
cp -R "$project_dir/assets" "$build_dir/assets"
cp -R "$project_dir/fonts" "$build_dir/fonts"

hash_file() {
    if command -v sha256sum >/dev/null 2>&1; then
        sha256sum "$1" | cut -c1-12
    else
        shasum -a 256 "$1" | cut -c1-12
    fi
}

hashed_copy() {
    source_path=$1
    source_dir=$(dirname -- "$source_path")
    source_name=$(basename -- "$source_path")
    stem=${source_name%.*}
    extension=${source_name##*.}
    hash=$(hash_file "$project_dir/$source_path")

    if [ "$source_dir" = "." ]; then
        output_path="$stem.$hash-hashed.$extension"
    else
        output_path="$source_dir/$stem.$hash-hashed.$extension"
    fi

    cp "$project_dir/$source_path" "$build_dir/$output_path"
    printf '%s\n' "$output_path"
}

style_path=$(hashed_copy "style.css")
script_path=$(hashed_copy "script.js")
print_path=$(hashed_copy "print.js")
english_path=$(hashed_copy "i18n/en.js")
japanese_path=$(hashed_copy "i18n/ja.js")

sed -E \
    -e "s#href=\"style(\.[[:xdigit:]]{12}(-hashed)?)?\.css\"#href=\"$style_path\"#" \
    -e "s#src=\"script(\.[[:xdigit:]]{12}(-hashed)?)?\.js\"#src=\"$script_path\"#" \
    -e "s#src=\"print(\.[[:xdigit:]]{12}(-hashed)?)?\.js\"#src=\"$print_path\"#" \
    -e "s#src=\"i18n/en(\.[[:xdigit:]]{12}(-hashed)?)?\.js\"#src=\"$english_path\"#" \
    -e "s#src=\"i18n/ja(\.[[:xdigit:]]{12}(-hashed)?)?\.js\"#src=\"$japanese_path\"#" \
    "$project_dir/index.html" > "$build_dir/index.html"

if [ -e "$dist_dir" ]; then
    rm -rf -- "$dist_dir"
fi
mv "$build_dir" "$dist_dir"

printf 'Built static site in %s\n' "$dist_dir"
