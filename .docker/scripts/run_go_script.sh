#!/bin/bash

filename="$TMPDIR$(uuidgen).go"

touch "$filename"

while IFS= read -r line
do
  echo "$line" >> "$filename"

done < "${1:-/dev/stdin}"

timeout "$TIMEOUT" go run "$filename"

if [[ "$?" -eq "124" ]]; then
    echo "The code timed out. allowed is ${TIMEOUT} seconds." 1>&2
fi

rm "$filename"
