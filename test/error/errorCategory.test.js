const Category = require('../../models/Categories')
const CategoryController = require('../../controllers/Categories')
const httpMocks = require('node-mocks-http')
const newCategory = require('../mock/category/create-mockCategory.json')
const allCategory = require('../mock/category/all-category.json')

jest.mock("../../models/Categories")

beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
})

describe("CategoryController.readAll", () => {

    it("should handle errors in readAll", async() => {
        const errorMessage = {
            status: "error",
            message: "server Error",
        };
        const rejectedPromise = Promise.reject(errorMessage);
        Category.find.mockReturnValue(rejectedPromise);
        await CategoryController.readAll(req, res, next);
        expect(res.statusCode).toBe(500);
    });
});

describe("CategoryController.create", () => {

    it("should handle errors in create", async() => {
        const rejectedPromise = Promise.reject();
        Category.create.mockReturnValue(rejectedPromise);
        await CategoryController.create(req, res, next);
        expect(res.statusCode).toBe(500);
    });
});

describe("CategoryController.update", () => {

    it("should handle errors in update", async() => {
        const rejectedPromise = Promise.reject();
        Category.findById.mockReturnValue(rejectedPromise);
        await CategoryController.update(req, res, next);
        expect(res.statusCode).toBe(500);
    });
});

describe("CategoryController.delete", () => {

    it("should handle errors in delete", async() => {
        const rejectedPromise = Promise.reject();
        Category.deleteOne.mockReturnValue(rejectedPromise);
        await CategoryController.delete(req, res, next);
        expect(res.statusCode).toBe(500);
    });
});