import {ResponseError} from "../exception/response-error.js";

export const validate = (schema, request) => {
    const result = schema.validate(request, {
        abortEarly: false,
    });

    if (result.error) {
        // new ResponseError(400, "Bad Request", errors);
        throw result.error;
    } else {
        return result.value;
    }
}