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

EXPIRED_BOOKING_DELETION_RESPONSE=$(curl -i --silent -X DELETE -H 'Content-Type: application/json' -H "cookie: ${AUTH_COOKIE}" "$BASE_URL"/api/cron/booking)
EXPIRED_BOOKING_DELETION_RESPONSE_CODE=$(echo "$EXPIRED_BOOKING_DELETION_RESPONSE" | grep -m1 "HTTP" | cut -d ' ' -f2)
EXPIRED_BOOKING_DELETION_MESSAGE=$(echo "$EXPIRED_BOOKING_DELETION_RESPONSE" | grep -o '"message":"[^"]*"' | cut -d '"' -f4)
EXPIRED_BOOKING_DELETION_RESPONSE_DATA=$(echo "$EXPIRED_BOOKING_DELETION_RESPONSE" | sed -n '/^{/,/}$/p')

printf 'Expired booking deletion cron job results:\n - Response code: [%s]\n - Response message: [%s]\n' "$EXPIRED_BOOKING_DELETION_RESPONSE_CODE" "$EXPIRED_BOOKING_DELETION_MESSAGE"

EXPIRED_APPOINTMENT_DELETION_RESPONSE=$(curl -i --silent -X DELETE -H 'Content-Type: application/json' -H "cookie: ${AUTH_COOKIE}" "$BASE_URL"/api/cron/appointment)
EXPIRED_APPOINTMENT_DELETION_RESPONSE_CODE=$(echo "$EXPIRED_APPOINTMENT_DELETION_RESPONSE" | grep -m1 "HTTP" | cut -d ' ' -f2)
EXPIRED_APPOINTMENT_DELETION_MESSAGE=$(echo "$EXPIRED_APPOINTMENT_DELETION_RESPONSE" | grep -o '"message":"[^"]*"' | cut -d '"' -f4)
EXPIRED_APPOINTMENT_DELETION_RESPONSE_DATA=$(echo "$EXPIRED_APPOINTMENT_DELETION_RESPONSE" | sed -n '/^{/,/}$/p')

printf 'Expired appointment deletion cron job results:\n - Response code: [%s]\n - Response message: [%s]\n' "$EXPIRED_APPOINTMENT_DELETION_RESPONSE_CODE" "$EXPIRED_APPOINTMENT_DELETION_MESSAGE"

NEW_APPOINTMENT_GENERATION_RESPONSE=$(curl -i --silent -X POST -H 'Content-Type: application/json' -H "cookie: ${AUTH_COOKIE}" "$BASE_URL"/api/cron/appointment)
NEW_APPOINTMENT_GENERATION_RESPONSE_CODE=$(echo "$NEW_APPOINTMENT_GENERATION_RESPONSE" | grep -m1 "HTTP" | cut -d ' ' -f2)
NEW_APPOINTMENT_GENERATION_MESSAGE=$(echo "$NEW_APPOINTMENT_GENERATION_RESPONSE" | grep -o '"message":"[^"]*"' | cut -d '"' -f4)
NEW_APPOINTMENT_GENERATION_RESPONSE_DATA=$(echo "$NEW_APPOINTMENT_GENERATION_RESPONSE" | sed -n '/^{/,/}$/p')

printf 'New appointment generation cron job results:\n - Response code: [%s]\n - Response message: [%s]\n' "$NEW_APPOINTMENT_GENERATION_RESPONSE_CODE" "$NEW_APPOINTMENT_GENERATION_MESSAGE"

if [ "$VERBOSE" = true ]; then
	echo "$CSRF_RESPONSE" >${ARTIFACT_FOLDER}csrf_response.txt
	echo "$AUTH_RESPONSE" >${ARTIFACT_FOLDER}auth_response.txt
	echo "$EXPIRED_BOOKING_DELETION_RESPONSE" >${ARTIFACT_FOLDER}expired_booking_deletion_response.txt
	echo "$EXPIRED_APPOINTMENT_DELETION_RESPONSE" >${ARTIFACT_FOLDER}expired_appointment_deletion_response.txt
	echo "$NEW_APPOINTMENT_GENERATION_RESPONSE" >${ARTIFACT_FOLDER}new_appointment_generation_response.txt
fi

if [[ "$COOKIEDATA" == true ]]; then
	printf '{"csrfToken": "%s", "csrfCookie": "%s", "authCookie": "%s", "expiredBookingDeletionResponseCode": %s, "expiredBookingDeletionResponseData": %s, "expiredAppointmentDeletionResponseCode": %s, "expiredAppointmentDeletionResponseData": %s, "newAppointmentGenerationResponseCode": %s, "newAppointmentGenerationResponseData": %s}' \
		"$CSRF_TOKEN" "$CSRF_COOKIE" "$AUTH_COOKIE" "$EXPIRED_BOOKING_DELETION_RESPONSE_CODE" "$EXPIRED_BOOKING_DELETION_RESPONSE_DATA" "$EXPIRED_APPOINTMENT_DELETION_RESPONSE_CODE" "$EXPIRED_APPOINTMENT_DELETION_RESPONSE_DATA" "$NEW_APPOINTMENT_GENERATION_RESPONSE_CODE" "$NEW_APPOINTMENT_GENERATION_RESPONSE_DATA" >${ARTIFACT_FOLDER}response.json
	exit 0
fi

printf '{"expiredBookingDeletionResponseCode": %s, "expiredBookingDeletionResponseData":%s, "expiredAppointmentDeletionResponseCode": %s, "expiredAppointmentDeletionResponseData":%s, "newAppointmentGenerationResponseCode": %s, "newAppointmentGenerationResponseData":%s}' \
	"$EXPIRED_BOOKING_DELETION_RESPONSE_CODE" "$EXPIRED_BOOKING_DELETION_RESPONSE_DATA" "$EXPIRED_APPOINTMENT_DELETION_RESPONSE_CODE" "$EXPIRED_APPOINTMENT_DELETION_RESPONSE_DATA" "$NEW_APPOINTMENT_GENERATION_RESPONSE_CODE" "$NEW_APPOINTMENT_GENERATION_RESPONSE_DATA" >${ARTIFACT_FOLDER}response.json
exit 0
