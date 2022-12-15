let productService = new ProductService();
let validation = new Validation();

function getEle(id) {
    return document.getElementById(id);
}

// reset giao diện
function reGiaoDien() {
    getEle("namePro").value = "";
    getEle("nameError").style.display = "none";

    getEle("pricePro").value = "";
    getEle("priceError").style.display = "none";

    getEle("screenP").value = "";
    getEle("scrError").style.display = "none";

    getEle("frontPro").value = "";
    getEle("frontError").style.display = "none";

    getEle("backPro").value = "";
    getEle("backError").style.display = "none";

    getEle("imgPro").value = "";
    getEle("imgError").style.display = "none";

    getEle("descrPro").value = "";
    getEle("descrError").style.display = "none";

    getEle("typePro").value = "Loại";
    getEle("typeError").style.display = "none";
}

// renderHTML sản phẩm hiện tại
function getListProduct() {
    productService.getListProductApi()
        .then(function (result) {
            renderHTML(result.data);
        })
        .catch(function (error) {
            console.log(error);
        });
}
getListProduct();

function renderHTML(data) {
    var content = "";

    data.forEach(function (product, index) {
        content += `
        <tr>
            <td>${index + 1}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.screen}</td>
            <td>${product.backCamera}</td>
            <td>${product.frontCamera}</td>
            <td>${product.desc}</td>
            <td>${product.type}</td>
            <td>
                <button class="btn btn-warning" data-toggle="modal" data-target="#myModal" onclick="editProduct('${product.id}')">Edit</button>
                <button class="btn btn-danger" onclick="deleteProduct('${product.id}')">Delete</button>
            </td>
        </tr>
    `;
    });

    getEle("danhSachSP").innerHTML = content;
}

// Click nút Edit
function editProduct(id) {
    reGiaoDien();
    // console.log(id);
    var title = "Chỉnh sửa sản phẩm";
    getEle("headerModal").innerHTML = title;

    var button = `<button class="btn btn-warning" onclick="updateProduct(${id})">Cập nhật Product</button>`;
    getEle("btnAction").innerHTML = button;

    productService.getProductByIdApi(id)
        .then(function (success) {
            var product = success.data;
            getEle("namePro").value = product.name;
            getEle("pricePro").value = product.price;
            getEle("screenP").value = product.screen;
            getEle("frontPro").value = product.frontCamera;
            getEle("backPro").value = product.backCamera;
            getEle("imgPro").value = product.img;
            getEle("descrPro").value = product.desc;
            getEle("typePro").value = product.type;
        })
        .catch(function (error) {
            console.log(error);
        })
}

/**
 * Cập nhật lại value
 */
function updateProduct(id) {
    var namePro = getEle("namePro").value;
    var pricePro = getEle("pricePro").value;
    var screenP = getEle("screenP").value;
    var frontPro = getEle("frontPro").value;
    var backPro = getEle("backPro").value;
    var imgPro = getEle("imgPro").value;
    var descrPro = getEle("descrPro").value;
    var typePro = getEle("typePro").value;

    var prodt = new Product(id, namePro, pricePro, screenP, backPro, frontPro, imgPro, descrPro, typePro);
    // var prodt = getInfo();
    productService.updateProductApi(prodt)
        .then(function () {
            alert("Update Success!");
            getListProduct();
            document.getElementsByClassName("close")[0].click();
        })
        .catch(function (error) {
            console.log(error);
        });
}

// Xóa sản phẩm
function deleteProduct(id) {
    productService.deleteProductApi(id)
        .then(function (success) {
            alert("Delete Success!");
            getListProduct();
        })
        .catch(function (error) {
            console.log(error);
        });
}


// Click nút Thêm
/**
 * Đổi nội dung thẻ headerModel
 * Đổi action nút
 */


getEle("addPro").onclick = () => {
    reGiaoDien();

    var title = "Thêm Sản Phẩm";
    getEle("headerModal").innerHTML = title;

    var button = `<button class="btn btn-success" onclick="themMoi()">Thêm sản phẩm mới</button>`;
    getEle("btnAction").innerHTML = button;

}




/**
 * Thêm mới sản phẩm
 * + Thành công, => In ra bảng danh sách
 * + Thất bại => In ra lỗi
 */

function themMoi() {
    // console.log(123);
    var prodt = getInfo(true);
    if (prodt) {
        productService.addProductApi(prodt)
            .then(function (success) {
                // alert("Add Success!");
                getListProduct();
                document.getElementsByClassName("close")[0].click();
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

/**
 * Get Info
 * - DOM tới các id
 * - Tạo đối tượng NV
 * - Sau đó trả về đối tượng
 *
 */

function getInfo(isAdd) {
    var namePro = getEle("namePro").value;
    var pricePro = getEle("pricePro").value;
    var screenP = getEle("screenP").value;
    var backPro = getEle("backPro").value;
    var frontPro = getEle("frontPro").value;
    var imgPro = getEle("imgPro").value;
    var descrPro = getEle("descrPro").value;
    var typePro = getEle("typePro").value;

    var flag = true;
    //Name
    flag &= validation.kiemTraRong("nameError", namePro, "Vui lòng không để trống");

    // Price
    flag &= validation.kiemTraRong("priceError", pricePro, "Vui lòng không để trống");
    flag &= validation.kiemTraSoAm("priceError", pricePro, "Vui lòng nhập giá đúng!")

    // Screen
    flag &= validation.kiemTraRong("scrError", screenP, "Vui lòng không để trống");

    // frontCamera
    flag &= validation.kiemTraRong("frontError", frontPro, "Vui lòng không để trống");

    // backCamera
    flag &= validation.kiemTraRong("backError", backPro, "Vui lòng không để trống");

    // Image
    flag &= validation.kiemTraRong("imgError", imgPro, "Vui lòng không để trống");

    // desciption
    flag &= validation.kiemTraRong("descrError", descrPro, "Vui lòng không để trống");

    // type
    flag &= validation.kiemTraChon("typePro", "typeError", "Vui lòng chọn");

    if (flag == true) {
        var prodt = new Product("", namePro, pricePro, screenP, backPro, frontPro, imgPro, descrPro, typePro);
        return prodt;
    }

}
