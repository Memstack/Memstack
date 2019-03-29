package main

import (
	"errors"
	"fmt"
	"log"
	"os"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
)

// Card is what it says on the tin
type Card struct {
	*Item
	Front string `json:"Front"`
	Back  string `json:"Back"`
}

// Deck contains a collection of cards
type Deck struct {
	*Item
	Title string `json:"Title"`
}

// Item is the base DynamoDB item
type Item struct {
	DeckId       string `json:"DeckId"`
	CardDeckInfo string `json:"CardDeckInfo"`
}

// Response is of type APIGatewayProxyResponse since we're leveraging the
// AWS Lambda Proxy Request functionality (default behavior)
//
// https://serverless.com/framework/docs/providers/aws/events/apigateway/#lambda-proxy-integration
type Response events.APIGatewayProxyResponse

// Request is better
type Request events.APIGatewayProxyRequest

func getDeck(deckID string) (Deck, error) {
	return Deck{}, nil
}

func getCardsInDeck(deckID string) ([]Card, error) {
	sess := session.Must(session.NewSession())
	svc := dynamodb.New(sess)

	fmt.Println("Trying to read from table: ", os.Getenv("TABLE_NAME"))

	queryInput := &dynamodb.QueryInput{
		TableName: aws.String(os.Getenv("TABLE_NAME")),
		KeyConditions: map[string]*dynamodb.Condition{
			"DeckId": {
				ComparisonOperator: aws.String("EQ"),
				AttributeValueList: []*dynamodb.AttributeValue{
					{
						S: aws.String(deckID),
					},
				},
			},
			"CardDeckInfo": {
				ComparisonOperator: aws.String("BEGINS_WITH"),
				AttributeValueList: []*dynamodb.AttributeValue{
					{
						S: aws.String("Card"),
					},
				},
			},
		},
	}

	result, err := svc.Query(queryInput)

	cards := []Card{}

	if result.Items == nil {
		log.Print("Result", result)
		return cards, errors.New("Failed to find card")
	}

	fmt.Println("Result", result)

	if err != nil {
		fmt.Println("Query API call failed:")
		fmt.Println((err.Error()))
		return cards, err
	}

	err = dynamodbattribute.UnmarshalListOfMaps(result.Items, &cards)

	if err != nil {
		fmt.Println(err.Error())
		return cards, err
	}
	log.Print(cards)
	return cards, err
}
