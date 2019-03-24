package main

import (
	"encoding/json"
	"fmt"

	"github.com/aws/aws-lambda-go/lambda"
)

// PostHandler is our lambda handler invoked by the `lambda.Start` function call
func CreateCardHandler(request Request) (Response, error) {
	fmt.Println("Request body", request.Body)
	var card card
	json.Unmarshal([]byte(request.Body), &card)
	item, err := createNewCard(card)

	if err != nil {
		fmt.Println("Failed to create new card")
		fmt.Println(err.Error())
		return Response{Body: "Error", StatusCode: 500}, nil
	}

	fmt.Println("Created new card", item)
	result, _ := json.Marshal(card)
	return Response{Body: string(result), StatusCode: 200}, nil
}

func main() {
	lambda.Start(CreateCardHandler)
}
