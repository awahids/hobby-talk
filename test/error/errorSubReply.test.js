const SubReply = require('../../models/SubReply')
const Reply = require('../../models/Reply')
const SubReplyController = require('../../controllers/SubReplyController')
const httpMocks = require('node-mocks-http')

jest.mock("../../models/SubReply")
jest.mock('../../models/Reply')

let req, res, next;
const replyId = "616a97e2f8ee71e6330a64b1";


beforeEach(() => {
    req = httpMocks.createRequest();
    req.user = {
        id: "12345412948239432423"
    }
    req.params.replyId = replyId
    res = httpMocks.createResponse();
    next = jest.fn();

})



describe("SubReplyController.create", () => {

    it("should return 400 when item doesnt exist", async() => {
        Reply.findById.mockReturnValue(null);
        await SubReplyController.createSubReply(req, res, next);
        expect(res.statusCode).toBe(400)
        expect(res._isEndCalled()).toBeTruthy();
        expect(res._getJSONData().message).toBe("cannot find reply")
    });

    it("should return 400 when id is not object id", async() => {
        req.params.replyId = "123123123"
        await SubReplyController.createSubReply(req, res, next)
        expect(res.statusCode).toBe(400)
        expect(res._getJSONData().message).toBe("Reply not found or doesn't exist")
    })

    it("should handle errors in create", async() => {
        const rejectedPromise = Promise.reject();
        Reply.findById.mockReturnValue(rejectedPromise);
        await SubReplyController.createSubReply(req, res, next);
        expect(res.statusCode).toBe(500);
    });
});

describe("SubReplyController.readAll", () => {

    // it("should return 400 when item doesnt exist", async() => {
    //     let id = "123123123"
    //     let hasil = []
    //     SubReply.find.mockReturnValue(hasil);
    //     await SubReplyController.readAllSubReply(req, res, next);
    //     expect(res.statusCode).toBe(400)
    //     expect(res._isEndCalled()).toBeTruthy();
    //     expect(res._getJSONData().message).toBe("cannot find reply")
    // });

    it("should return 400 when id is not object id", async() => {
        req.params.replyId = "123123123"
        await SubReplyController.readAllSubReply(req, res, next)
        expect(res.statusCode).toBe(400)
        expect(res._getJSONData().message).toBe("Reply not found or doesn't exist")
    })

    it("should handle errors in create", async() => {
        const rejectedPromise = Promise.reject();
        Reply.findById.mockReturnValue(rejectedPromise);
        await SubReplyController.readAllSubReply(req, res, next);
        expect(res.statusCode).toBe(500);
    });
});

describe("SubReplyController.update", () => {

    it("should handle errors in create", async() => {
        const rejectedPromise = Promise.reject();
        Reply.findById.mockReturnValue(rejectedPromise);
        await SubReplyController.updateSubReply(req, res, next);
        expect(res.statusCode).toBe(500);
    });
});

describe("SubReplyController.delete", () => {

    it("should return 400 when item doesnt exist", async() => {
        SubReply.findById.mockReturnValue(null);
        await SubReplyController.deleteSubReply(req, res, next);
        expect(res.statusCode).toBe(400)
        expect(res._isEndCalled()).toBeTruthy();
        expect(res._getJSONData().message).toBe("cannot delete")
    });


    it("should handle errors in delete", async() => {
        const rejectedPromise = Promise.reject();
        SubReply.findById.mockReturnValue(rejectedPromise);
        await SubReplyController.deleteSubReply(req, res, next);
        expect(res.statusCode).toBe(500);
    });
});