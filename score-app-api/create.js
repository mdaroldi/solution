import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context, callback) {
    const data = JSON.parse(event.body);
    const params = {
        TableName: "base_b",
        Item: {
            cpf: event.requestContext.identity.cognitoIdentityId,
            requestId: uuid.v1(),
            age: data.age,
            possessions: data.possessions,
            address: data.address,
            income: data.income,
            createdAt: Date.now()
        }
    };

    try {
        await dynamoDbLib.call("put", params);
        callback(null, success(params.Item));
    } catch (e) {
        callback(null, failure({ status: false }));
    }
}