function ProductService() {

    // Lấy thông tin SP
    this.getListProductApi = function () {
        return axios({
            url: "https://637b69c310a6f23f7fa80f9d.mockapi.io/api/ProductCapstone",
            method: "GET"
        })
    }

    // Thêm mới
    this.addProductApi = function (product) {
        return axios({
            url: "https://637b69c310a6f23f7fa80f9d.mockapi.io/api/ProductCapstone",
            method: "POST",
            data: product
        })
    }

    // Xóa
    this.deleteProductApi = function (id) {
        return axios({
            url: `https://637b69c310a6f23f7fa80f9d.mockapi.io/api/ProductCapstone/${id}`,
            method: "DELETE",
        });
    };

    // Lấy thông tin chi tiết
    this.getProductByIdApi = function (id) {
        return axios({
            url: `https://637b69c310a6f23f7fa80f9d.mockapi.io/api/ProductCapstone/${id}`,
            method: "GET",
        });
    };

    // Update SP
    this.updateProductApi = function (product) {
        return axios({
            url: `https://637b69c310a6f23f7fa80f9d.mockapi.io/api/ProductCapstone/${product.id}`,
            method: "PUT",
            data: product,
        });
    };
}
