if [ -z "$1" ]
  then
    echo "No argument supplied"
  else
    for var in "$@"
    do
      mkdir "ex${var}"
    done
fi
