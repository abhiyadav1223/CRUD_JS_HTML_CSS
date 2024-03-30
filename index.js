var getData = [];
PersonDataAry = [];
var aryNewForEdit = [];
var editIndexObj = 0;
var onEditPersonID = 0;
var Person_ID = 1000;
var onChangeAry = []
itemSetInArray();
function itemSetInArray() {
    PersonDataAry = JSON.parse(localStorage.getItem("PersonData"));
}
function dataInLocalStorege() {
    let data = JSON.stringify(PersonDataAry);
    localStorage.setItem("PersonData", data);
}
dataShowFun(0);
function dataShowFun(x) {
    if (x == 0) {
        getData = JSON.parse(localStorage.getItem("PersonData"));
    }
    else if (x == 1) {
        getData = onChangeAry;
    }
    const table = document.getElementById("tableId");
    getData && getData.map((value) => {
        const tr = document.createElement("tr");
        const td1 = document.createElement("td");
        td1.className = "pt-3";
        const td2 = document.createElement("td");
        // td2.className = "pt-3";
        const img = document.createElement("img");
        img.src = value.usrImg;
        img.className = "imgLogo";
        const td3 = document.createElement("td");
        td3.className = "pt-3";
        const td4 = document.createElement("td");
        td4.className = "pt-3";
        const td5 = document.createElement("td");
        td5.className = "pt-3";
        const td6 = document.createElement("td");
        td6.className = "pt-3";
        const td7 = document.createElement("td");
        td6.className = "pt-3";
        const i1 = document.createElement("i");
        i1.className = "fa-solid fa-pen pt-2 penIcon";
        i1.setAttribute("onclick", "onEdit(event)");
        i1.setAttribute("name", value.srno);
        const td8 = document.createElement("td");
        td6.className = "pt-3";
        const i2 = document.createElement("i");
        i2.className = "fa-solid fa-trash pt-2 deleteIcon";
        i2.setAttribute("onclick", "onDelete(event)");
        i2.setAttribute("name", value.srno);

        td1.textContent = value.srno;
        td3.textContent = value.usrName;
        td4.textContent = value.usrEmail;
        td5.textContent = value.usrPhone;
        td6.textContent = value.usrLocation;

        tr.appendChild(td1);
        tr.appendChild(td2);
        td2.appendChild(img)
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);
        tr.appendChild(td7);
        td7.appendChild(i1);
        tr.appendChild(td8);
        td8.appendChild(i2);
        table.appendChild(tr);
    })
}
function addData() {
    document.getElementById("BoxList").style = "display:none;";
    document.getElementById("addData").style = "display:flex;";
}
function onSubmitFun() {
    const val1 = document.getElementById("inp1").value;
    const val2 = document.getElementById("inp2").value;
    const val3 = document.getElementById("inp3").value;
    const val4 = document.getElementById("inp4").value;
    // const val5 = document.getElementById("inp5").value;
    var Parent = document.getElementById("tableId");
    while (Parent.hasChildNodes()) {
        Parent.removeChild(Parent.firstChild);
    }
    if (val1.length == 0 || val2.length == 0 || val3.length == 0 || val4.length == 0 || !val2.includes("@")) {
        alert("Please fill the blank input");
    } else {
        PersonDataAry.push({
            srno: lastPersonId(),
            usrImg: "https://img.freepik.com/premium-vector/anonymous-user-circle-icon-vector-illustration-flat-style-with-long-shadow_520826-1931.jpg?w=740",
            usrName: val1,
            usrEmail: val2,
            usrPhone: val3,
            usrLocation: val4,
        });
        dataInLocalStorege();
        dataShowFun();
        Person_ID++;
        document.getElementById("BoxList").style = "display:block;";
        document.getElementById("addData").style = "display:none;";
        location.reload();
    }
}

function onDelete(event) {
    if (confirm("are you want to sure ? ")) {
        deleteRowValue = event.target.getAttribute("name");
        dataforDelete = JSON.parse(localStorage.getItem("PersonData"));
        aryNew = dataforDelete.filter((val) => {
            return (val.srno != deleteRowValue)
        })
        let data = JSON.stringify(aryNew);
        localStorage.setItem("PersonData", data);
        location.reload();
    }
}
function onEdit(event) {
    editRowValue = event.target.getAttribute("name");
    document.getElementById("BoxList").style = "display:none;";
    document.getElementById("EditData").style = "display:flex;";
    EditdataforDelete = JSON.parse(localStorage.getItem("PersonData"));
    aryNewForEdit = EditdataforDelete.filter((val, a = 0) => {
        if (val.srno == editRowValue) {
            editIndexObj = a;
            onEditPersonID = val.srno;
            return val;
        }
        else {
            a++;
        }
    })
    document.getElementById("inp1E").value = aryNewForEdit[0].usrName;
    document.getElementById("inp2E").value = aryNewForEdit[0].usrEmail;
    document.getElementById("inp3E").value = aryNewForEdit[0].usrPhone;
    document.getElementById("inp4E").value = aryNewForEdit[0].usrLocation;
}

function onEditSubmitFun() {
    EditdataSet = JSON.parse(localStorage.getItem("PersonData"));
    const val1E = document.getElementById("inp1E").value;
    const val2E = document.getElementById("inp2E").value;
    const val3E = document.getElementById("inp3E").value;
    const val4E = document.getElementById("inp4E").value;

    editDataSetObj = {
        srno: onEditPersonID,
        usrImg: "https://img.freepik.com/premium-vector/anonymous-user-circle-icon-vector-illustration-flat-style-with-long-shadow_520826-1931.jpg?w=740",
        usrName: val1E,
        usrEmail: val2E,
        usrPhone: val3E,
        usrLocation: val4E,
    }
    console.log(editIndexObj + " -");
    EditdataSet[editIndexObj] = editDataSetObj;

    let dataE = JSON.stringify(EditdataSet);
    localStorage.setItem("PersonData", dataE);
    location.reload();
}
function lastPersonId() {
    x = 0
    for (i of PersonDataAry) {
        x = i.srno;
    }
    console.log(x)
    return x + 1;
}

function OnBackFun(valOfButton) {
    if (valOfButton == 0) {
        document.getElementById("BoxList").style = "display:block;";
        document.getElementById("addData").style = "display:none;";
    } else {
        document.getElementById("BoxList").style = "display:block;";
        document.getElementById("EditData").style = "display:none;";
    }
}

function dataSearch() {
    var valueOfBar = document.getElementById("inputSearch").value;
    onChangeAry = PersonDataAry.filter((val) => {
        if (val.usrName.toLowerCase().includes(valueOfBar.toLowerCase()) || val.usrEmail.toLowerCase().includes(valueOfBar.toLowerCase()) || val.usrPhone.toLowerCase().includes(valueOfBar.toLowerCase()) || val.usrLocation.toLowerCase().includes(valueOfBar.toLowerCase())) {
            return val;
        }
    })
    var Parent = document.getElementById("tableId");
    while (Parent.hasChildNodes()) {
        Parent.removeChild(Parent.firstChild);
    }
    dataShowFun(1);
}
