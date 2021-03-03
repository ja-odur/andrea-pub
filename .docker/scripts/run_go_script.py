#!/usr/bin/env python

from __future__ import print_function
import os
import sys
import uuid


stdin = ""
for line in sys.stdin.readlines():
    stdin += "%s\n" % line

tmp_file = "%s%s" % (os.environ["TMPDIR"], "%s.go" % uuid.uuid4())
try:
    f = open(tmp_file, 'w')
    print(stdin, file=f)
    f.close()
    os.execlp("go", "go", "run", tmp_file)
finally:
    print("removing file")
    sss
    os.remove(tmp_file)
