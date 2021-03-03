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
  ./"$outputFilename"
  rm "$outputFilename"
fi

rm "$filename"
