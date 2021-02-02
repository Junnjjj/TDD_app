const productController = require("../../controller/products")
const productModel = require('../../models/Product')
const httpMocks = require('node-mocks-http')
const newProduct = require('../data/new-product.json')

//Mock 함수 생성
productModel.create = jest.fn();

let req,res,next;

beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();    
})

describe("Product Controller Create", ()=>{

    beforeEach(()=>{
        req.body = newProduct
    })
    test("should have a createproduct function", () => {
        expect(typeof productController.createProduct).toBe("function");
    })
    test("should call ProductModel.create", async ()=>{

        await productController.createProduct(req, res, next);
        expect(productModel.create).toBeCalledWith(newProduct);
    })
    test("should return 201 response code", async () => {
        await productController.createProduct(req, res, next);
        expect(res.statusCode).toBe(201);
        expect(res._isEndCalled()).toBeTruthy();
    })
    test("should return json body in response", async () => {
        productModel.create.mockReturnValue(newProduct)
        await productController.createProduct(req, res, next);
        expect(res._getJSONData()).toStrictEqual(newProduct)
    })
    test("should hanlde errors", async () => {
        const errorMessage = {message : "description property missing"}
        //Promise Pending 을 받는걸 방지하기 위해서
        // 비동기 요청에 대한 결과 값은
        // 성공일 땐 메소드 실행 resolve
        const rejectPromise = Promise.reject(errorMessage)
        productModel.create.mockReturnValue(rejectPromise)
        await productController.createProduct(req, res, next);
        expect(next).toBeCalledWith(errorMessage);
    })
})