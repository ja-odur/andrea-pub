#!/bin/bash

filename="$TMPDIR$(uuidgen).py"

touch "$filename"

while IFS= read -r line
do
  echo "$line" >> "$filename"

done < "${1:-/dev/stdin}"

timeout "$TIMEOUT" python "$filename"

if [[ "$?" -eq "124" ]]; then
    echo "The code timed out. Allowed running time is ${TIMEOUT} seconds." 1>&2
fi

rm "$filename"
