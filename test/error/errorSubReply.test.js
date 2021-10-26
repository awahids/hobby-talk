const SubReply = require('../../models/SubReply')
const Reply = require('../../models/Reply')
const SubReplyController = require('../../controllers/SubReplyController')
const httpMocks = require('node-mocks-http')

jest.mock("../../models/SubReply")
jest.mock('../../models/Reply')

let req, res, next;
const replyId = "12345412948239432423";

beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
})

describe("SubReplyController.readAll", () => {

    it("should handle errors in readAllSubReply", async() => {
        const rejectedPromise = Promise.reject();
        SubReply.find.mockReturnValue(rejectedPromise);
        await SubReplyController.readAllSubReply(req, res, next);
        expect(res.statusCode).toBe(500);
    });
});