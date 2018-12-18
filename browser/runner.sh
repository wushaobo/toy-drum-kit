set -e

sed -i "s|api-url=\"###\"|api-url=\"${API_URL}\"|g" /usr/share/nginx/html/index.html

nginx -g "daemon off;"
