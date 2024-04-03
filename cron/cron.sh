#!/bin/bash

while getopts ":e:p:u:vc" opt; do
	case $opt in
	e)
		EMAIL="${OPTARG#*=}"
		;;
	p)
		PASSWORD="${OPTARG#*=}"
		;;
	u)
		BASE_URL="$OPTARG"
		;;
	v)
		VERBOSE=true
		;;
	c)
		COOKIEDATA=true
		;;
	\?)
		echo "Invalid option: -$OPTARG" >&2
		exit 1
		;;
	:)
		echo "Option -$OPTARG requires an argument." >&2
		exit 1
		;;
	esac
done

if [ -z "$EMAIL" ] || [ -z "$PASSWORD" ] || [ -z "$BASE_URL" ]; then
	echo "Usage: $0 -e <email> -p <password> -u <base_url> [-v]"
	exit 1
fi
# Thil will be the folder which will get uploaded as artifact
RESPONSE_FOLDER=response/
rm -rf ${RESPONSE_FOLDER}
mkdir -p ${RESPONSE_FOLDER}

CSRF_RESPONSE=$(curl -i --silent "$BASE_URL"/api/auth/csrf)
CSRF_TOKEN=$(echo "$CSRF_RESPONSE" | grep -m1 "csrfToken" | sed 's/^{//' | sed 's/}$//' | cut -d '"' -f4)
CSRF_COOKIE=$(echo "$CSRF_RESPONSE" | grep -m1 "$CSRF_TOKEN" | sed 's/set-cookie: //g' | tr -d "[:blank:]" | tr -d '\n' | cut -d ";" -f1)

SESSION_RESPONSE=$(curl -i --silent -H "cookie: ${CSRF_COOKIE}" -d "email=${EMAIL}&password=${PASSWORD}&csrfToken=${CSRF_TOKEN}" "$BASE_URL"/api/auth/callback/credentials)
SESSION_COOKIE=$(echo "$SESSION_RESPONSE" | grep -m1 "authjs.session-token" | sed 's/set-cookie: //g' | tr -d "[:blank:]" | tr -d '\n' | cut -d ";" -f1)

DELETE_RESPONSE=$(curl -i --silent -X DELETE -H 'Content-Type: application/json' -H "cookie: ${SESSION_COOKIE}" "$BASE_URL"/api/cron/appointment)
DELETE_RESPONSE_CODE=$(echo "$DELETE_RESPONSE" | grep -m1 "HTTP" | cut -d ' ' -f2)
DELETE_MESSAGE=$(echo "$DELETE_RESPONSE" | grep -o '"message":"[^"]*"' | cut -d '"' -f4)
DELETE_RESPONSE_DATA=$(echo "$DELETE_RESPONSE" | sed -n '/^{/,/}$/p')

printf 'Appointment Delete Cron Job results:\n - Response code: [%s]\n - Response Message: [%s]\n' "$DELETE_RESPONSE_CODE" "$DELETE_MESSAGE"

POST_RESPONSE=$(curl -i --silent -X POST -H 'Content-Type: application/json' -H "cookie: ${SESSION_COOKIE}" "$BASE_URL"/api/cron/appointment)
POST_RESPONSE_CODE=$(echo "$POST_RESPONSE" | grep -m1 "HTTP" | cut -d ' ' -f2)
POST_MESSAGE=$(echo "$POST_RESPONSE" | grep -o '"message":"[^"]*"' | cut -d '"' -f4)
POST_RESPONSE_DATA=$(echo "$POST_RESPONSE" | sed -n '/^{/,/}$/p')

printf 'Appointment Create Cron Job results:\n - Response code: [%s]\n - Response Message: [%s]\n' "$POST_RESPONSE_CODE" "$POST_MESSAGE"

if [ "$VERBOSE" = true ]; then
	echo "$CSRF_RESPONSE" >${RESPONSE_FOLDER}csrf_response.txt
	echo "$SESSION_RESPONSE" >${RESPONSE_FOLDER}session_response.txt
	echo "$DELETE_RESPONSE" >${RESPONSE_FOLDER}delete_response.txt
	echo "$POST_RESPONSE" >${RESPONSE_FOLDER}post_response.txt
fi

if [[ "$COOKIEDATA" == true ]]; then
	printf '{"CSRF_TOKEN": "%s", "CSRF_COOKIE": "%s", "SESSION_COOKIE": "%s", "DELETE_RESPONSE_CODE": %s, "DELETE_RESPONSE_DATA": %s, "POST_RESPONSE_CODE": %s, "POST_RESPONSE_DATA": %s}' \
		"$CSRF_TOKEN" "$CSRF_COOKIE" "$SESSION_COOKIE" "$DELETE_RESPONSE_CODE" "$DELETE_RESPONSE_DATA" "$POST_RESPONSE_CODE" "$POST_RESPONSE_DATA" >${RESPONSE_FOLDER}response.json
	exit 0
fi

printf '{"DELETE_RESPONSE_CODE": %s, "DELETE_RESPONSE_DATA":%s, "POST_RESPONSE_CODE": %s, "POST_RESPONSE_DATA":%s}' \
	"$DELETE_RESPONSE_CODE" "$DELETE_RESPONSE_DATA" "$POST_RESPONSE_CODE" "$POST_RESPONSE_DATA" >${RESPONSE_FOLDER}response.json
exit 0
