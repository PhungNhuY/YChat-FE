#!/bin/sh

# Replace env vars in JavaScript files
echo "Replacing env vars in JS"
for file in /usr/share/nginx/html/assets/*.js;
do
  echo "Processing $file ...";

  # Use the existing JS file as template
  if [ ! -f $file.tmpl.js ]; then
    cp $file $file.tmpl.js
  fi

  envsubst '$VITE_API_BASE_URL,$VITE_WS_URL' < $file.tmpl.js > $file

  rm -f $file.tmpl.js
done

echo "Starting Nginx"
nginx -g 'daemon off;'
