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

ARTIFACT_FOLDER=response/
rm -rf ${ARTIFACT_FOLDER}
mkdir -p ${ARTIFACT_FOLDER}

CSRF_RESPONSE=$(curl -i --silent "$BASE_URL"/api/auth/csrf)
CSRF_TOKEN=$(echo "$CSRF_RESPONSE" | grep -m1 "csrfToken" | sed 's/^{//' | sed 's/}$//' | cut -d '"' -f4)
CSRF_COOKIE=$(echo "$CSRF_RESPONSE" | grep -m1 "$CSRF_TOKEN" | sed 's/set-cookie: //g' | tr -d "[:blank:]" | tr -d '\n' | cut -d ";" -f1)

AUTH_RESPONSE=$(curl -i --silent -H "cookie: ${CSRF_COOKIE}" -d "email=${EMAIL}&password=${PASSWORD}&csrfToken=${CSRF_TOKEN}" "$BASE_URL"/api/auth/callback/credentials)
AUTH_COOKIE=$(echo "$AUTH_RESPONSE" | grep -m1 "authjs.session-token" | sed 's/set-cookie: //g' | tr -d "[:blank:]" | tr -d '\n' | cut -d ";" -f1)

BOOKING_DELETION_RESPONSE=$(curl -i --silent -X DELETE -H 'Content-Type: application/json' -H "cookie: ${AUTH_COOKIE}" "$BASE_URL"/api/cron/booking)
BOOKING_DELETION_RESPONSE_CODE=$(echo "$BOOKING_DELETION_RESPONSE" | grep -m1 "HTTP" | cut -d ' ' -f2)
BOOKING_DELETION_MESSAGE=$(echo "$BOOKING_DELETION_RESPONSE" | grep -o '"message":"[^"]*"' | cut -d '"' -f4)
BOOKING_DELETION_RESPONSE_DATA=$(echo "$BOOKING_DELETION_RESPONSE" | sed -n '/^{/,/}$/p')

printf 'Booking Deletion Cron Job results:\n - Response code: [%s]\n - Response Message: [%s]\n' "$BOOKING_DELETION_RESPONSE_CODE" "$BOOKING_DELETION_MESSAGE"

APPOINTMENT_DELETION_RESPONSE=$(curl -i --silent -X DELETE -H 'Content-Type: application/json' -H "cookie: ${AUTH_COOKIE}" "$BASE_URL"/api/cron/appointment)
APPOINTMENT_DELETION_RESPONSE_CODE=$(echo "$APPOINTMENT_DELETION_RESPONSE" | grep -m1 "HTTP" | cut -d ' ' -f2)
APPOINTMENT_DELETION_MESSAGE=$(echo "$APPOINTMENT_DELETION_RESPONSE" | grep -o '"message":"[^"]*"' | cut -d '"' -f4)
APPOINTMENT_DELETION_RESPONSE_DATA=$(echo "$APPOINTMENT_DELETION_RESPONSE" | sed -n '/^{/,/}$/p')

printf 'Appointment Deletion Cron Job results:\n - Response code: [%s]\n - Response Message: [%s]\n' "$APPOINTMENT_DELETION_RESPONSE_CODE" "$APPOINTMENT_DELETION_MESSAGE"

APPOINTMENT_GENERATION_RESPONSE=$(curl -i --silent -X POST -H 'Content-Type: application/json' -H "cookie: ${AUTH_COOKIE}" "$BASE_URL"/api/cron/appointment)
APPOINTMENT_GENERATION_RESPONSE_CODE=$(echo "$APPOINTMENT_GENERATION_RESPONSE" | grep -m1 "HTTP" | cut -d ' ' -f2)
APPOINTMENT_GENERATION_MESSAGE=$(echo "$APPOINTMENT_GENERATION_RESPONSE" | grep -o '"message":"[^"]*"' | cut -d '"' -f4)
APPOINTMENT_GENERATION_RESPONSE_DATA=$(echo "$APPOINTMENT_GENERATION_RESPONSE" | sed -n '/^{/,/}$/p')

printf 'Appointment Generation Cron Job results:\n - Response code: [%s]\n - Response Message: [%s]\n' "$APPOINTMENT_GENERATION_RESPONSE_CODE" "$APPOINTMENT_GENERATION_MESSAGE"

if [ "$VERBOSE" = true ]; then
	echo "$CSRF_RESPONSE" >${ARTIFACT_FOLDER}csrf_response.txt
	echo "$AUTH_RESPONSE" >${ARTIFACT_FOLDER}auth_response.txt
	echo "$BOOKING_DELETION_RESPONSE" >${ARTIFACT_FOLDER}booking_deletion_response.txt
	echo "$APPOINTMENT_DELETION_RESPONSE" >${ARTIFACT_FOLDER}appointment_deletion_response.txt
	echo "$APPOINTMENT_GENERATION_RESPONSE" >${ARTIFACT_FOLDER}appointment_generation_response.txt
fi

if [[ "$COOKIEDATA" == true ]]; then
	printf '{"CSRF_TOKEN": "%s", "CSRF_COOKIE": "%s", "AUTH_COOKIE": "%s", "BOOKING_DELETION_RESPONSE_CODE": %s, "BOOKING_DELETION_RESPONSE_DATA": %s, "APPOINTMENT_DELETION_RESPONSE_CODE": %s, "APPOINTMENT_DELETION_RESPONSE_DATA": %s, "APPOINTMENT_GENERATION_RESPONSE_CODE": %s, "APPOINTMENT_GENERATION_RESPONSE_DATA": %s}' \
		"$CSRF_TOKEN" "$CSRF_COOKIE" "$AUTH_COOKIE" "$BOOKING_DELETION_RESPONSE_CODE" "$BOOKING_DELETION_RESPONSE_DATA" "$APPOINTMENT_DELETION_RESPONSE_CODE" "$APPOINTMENT_DELETION_RESPONSE_DATA" "$APPOINTMENT_GENERATION_RESPONSE_CODE" "$APPOINTMENT_GENERATION_RESPONSE_DATA" >${ARTIFACT_FOLDER}response.json
	exit 0
fi

printf '{"BOOKING_DELETION_RESPONSE_CODE": %s, "BOOKING_DELETION_RESPONSE_DATA":%s, "APPOINTMENT_DELETION_RESPONSE_CODE": %s, "APPOINTMENT_DELETION_RESPONSE_DATA":%s, "APPOINTMENT_GENERATION_RESPONSE_CODE": %s, "APPOINTMENT_GENERATION_RESPONSE_DATA":%s}' \
	"$BOOKING_DELETION_RESPONSE_CODE" "$BOOKING_DELETION_RESPONSE_DATA" "$APPOINTMENT_DELETION_RESPONSE_CODE" "$APPOINTMENT_DELETION_RESPONSE_DATA" "$APPOINTMENT_GENERATION_RESPONSE_CODE" "$APPOINTMENT_GENERATION_RESPONSE_DATA" >${ARTIFACT_FOLDER}response.json
exit 0
