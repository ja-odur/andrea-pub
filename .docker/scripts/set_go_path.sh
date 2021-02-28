if [[ -z "$GOPATH" ]]; then
  echo "GOPATH is empty"
  exit 1
fi

#if grep -q ":$GOPATH:" <<< ":$PATH:"; then
#  echo "GOPATH already set"
#  exit
#fi

if [[ -s /etc/environment ]]; then
  echo "GOPATH already set"
else
  echo "PATH=$GOPATH:$PATH" >> /etc/profile
  echo "PATH=$GOPATH:$PATH" >> /etc/environment
  echo "go path set"
fi
