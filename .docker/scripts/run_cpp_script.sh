#!/bin/bash

baseFilename="$TMPDIR$(uuidgen)"
filename="${baseFilename}.cpp"
outputFilename="${baseFilename}.out"

touch "$filename"

while IFS= read -r line
do
  echo "$line" >> "$filename"

done < "${1:-/dev/stdin}"

g++ -Wall -std=c++17 "$filename" -o "$outputFilename"

if [[ -f "$outputFilename" ]]; then

  timeout "$TIMEOUT" ./"$outputFilename"

  if [[ "$?" -eq "124" ]]; then
    echo "The code timed out. allowed is ${TIMEOUT} seconds." 1>&2
  fi
  rm "$outputFilename"
fi

rm "$filename"
