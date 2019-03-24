package main

import (
	"fmt"
	"errors"
	"os"
	"log"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
	"github.com/nu7hatch/gouuid"
)

type card struct {
	Front string `json:"front"`
	Back  string `json:"back"`
}

type cardToSave struct {
	Partition string `json:"partition"`
	Sort      string `json:"sort"`
	Front     string `json:"front"`
	Back      string `json:"back"`
}

// Response is of type APIGatewayProxyResponse since we're leveraging the
// AWS Lambda Proxy Request functionality (default behavior)
//
// https://serverless.com/framework/docs/providers/aws/events/apigateway/#lambda-proxy-integration
type Response events.APIGatewayProxyResponse

// Request is better
type Request events.APIGatewayProxyRequest

func getCard(id string) (cardToSave, error) {
	sess := session.Must(session.NewSession())
	svc := dynamodb.New(sess)

	fmt.Println("Trying to read from table: ", os.Getenv("TABLE_NAME"))

	result, err := svc.GetItem(&dynamodb.GetItemInput{
		TableName: aws.String(os.Getenv("TABLE_NAME")),
		Key: map[string]*dynamodb.AttributeValue{
			"partition": {
				S: aws.String(id),
			},
			"sort": {
				S: aws.String("0987654321:1234567890"),
			},
		},
	})
	card := cardToSave{}
	if result.Item == nil {
		log.Print("Result", result)
		return card, errors.New("Failed to find card")
	}

	fmt.Println("Result", result)

	if err != nil {
		fmt.Println("Query API call failed:")
		fmt.Println((err.Error()))
		return card, err
	}

	err = dynamodbattribute.UnmarshalMap(result.Item, &card)

	if err != nil {
		fmt.Println(err.Error())
		return card, err
	}
	log.Print(card)
	return card, err
}

func createNewCard(body card) (cardToSave, error) {
	sess := session.Must(session.NewSession())
	svc := dynamodb.New(sess)

	u, err := uuid.NewV4()

	cardToSave := cardToSave{
		Front: body.Front,
		Back: body.Back,
		Partition: fmt.Sprintf("card_%s", u),
		Sort: fmt.Sprintf("0987654321:1234567890"),
	}

	fmt.Println("card to add", cardToSave)

	av, err := dynamodbattribute.MarshalMap(cardToSave)

	if err != nil {
		fmt.Println("Got error marshalling map:")
		fmt.Println(err.Error())
		return cardToSave, err
	}

	input := &dynamodb.PutItemInput{
		Item:      av,
		TableName: aws.String(os.Getenv("TABLE_NAME")),
	}

	_, err = svc.PutItem(input)

	if err != nil {
		fmt.Println(err.Error())
	}

	return cardToSave, err
}
