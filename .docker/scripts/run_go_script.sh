#!/bin/bash

filename="$TMPDIR$(uuidgen).go"

touch "$filename"

while IFS= read -r line
do
  echo "$line" >> "$filename"

done < "${1:-/dev/stdin}"

go run "$filename"

rm "$filename"
