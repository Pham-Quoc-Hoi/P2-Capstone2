function Validation() {
    this.kiemTraRong = function (error, value, mess) {
        if (value == "") {
            getEle(error).innerHTML = mess;
            getEle(error).style.display = "block";
            return false;
        }
        getEle(error).innerHTML = "";
        getEle(error).style.display = "none";
        return true;
    }

    this.kiemTraSoAm = function (error, value, mess) {
        if (value <= 0) {
            getEle(error).innerHTML = mess;
            getEle(error).style.display = "block";
            return false;
        }
        getEle(error).innerHTML = "";
        getEle(error).style.display = "none";
        return true;

    }

    this.kiemTraChon = function (idSelect, errorId, mess) {
        if (getEle(idSelect).selectedIndex !== 0) {
            getEle(errorId).innerHTML = "";
            getEle(errorId).style.display = "none";
            return true;
        }

        getEle(errorId).innerHTML = mess;
        getEle(errorId).style.display = "block";
        return false;
    };
}
