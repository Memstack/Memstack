package main

import (
	"encoding/json"

	"github.com/aws/aws-lambda-go/lambda"
)

// Response is of type APIGatewayProxyResponse since we're leveraging the
// AWS Lambda Proxy Request functionality (default behavior)
//
// https://serverless.com/framework/docs/providers/aws/events/apigateway/#lambda-proxy-integration

// APIError for bad things
type APIError struct {
	Message string `json:"message"`
}

// Handler is our lambda handler invoked by the `lambda.Start` function call
func GetCardHandler(request Request) (Response, error) {
	id := request.PathParameters["id"]

	card, err := getCard(id)

	if err != nil {

		apiErrorJSON, _ := json.Marshal(err.Error())

		resp := Response{
			StatusCode: 404,
			Body:       string(apiErrorJSON),
		}

		return resp, nil
	}

	jsonitems, _ := json.Marshal(card)

	resp := Response{
		StatusCode: 200,
		Body:       string(jsonitems),
		Headers: map[string]string{
			"Content-Type": "application/json",
		},
	}

	return resp, nil
}

func main() {
	lambda.Start(GetCardHandler)
}
