const tbody = document.querySelector("tbody")
const nameProd = document.querySelector("#name")
const desc = document.querySelector("#desc")
const amount = document.querySelector("#amount")
const type = document.querySelector("#type")
const addItem = document.querySelector("#addItem")


let prodts = []

addItem.onclick = () => {
    
    if(nameProd.value==="" || desc.value==="" || amount.value===""){
        return alert("Preencha todos os campos!")
    }

    prodts.push({
        name: nameProd.value,
        desc: desc.value,
        amount: Math.abs(amount.value).toFixed(2),
        type: type.value
    })

    setProdtsBD()
    loadProdts()

    nameProd.value=""
    desc.value=""
    amount.value=""
}

function deleteProdt (index) {
    prodts.splice(index, 1)
    setProdtsBD()
    loadProdts()
}

function insertProdt(i, index) {
    let tr = document.createElement("tr");

    tr.innerHTML = `
        <td> ${i.name} </td>
        <td class="columnAmount"> R$ ${i.amount} </td>
        <td class="columnType">
            ${i.type === "Sim"
                ? '<i class="bx bxs-chevron-up-circle"></i>'
                : '<i class="bx bxs-chevron-down-circle"></i>'
            }
        </td>
        <td class="columnAction">
            <button onclick="deleteProdt(${index})" class="btnDelete"><i class="bx bx-trash"></i></button>
        </td>
    `;

    tbody.appendChild(tr)
}


function loadProdts(){
    prodts = getProdtsBD();

    tbody.innerHTML = "";

    prodts.forEach((i, index) => {
        insertProdt(i, index);
    });
}

const getProdtsBD = () => JSON.parse(localStorage.getItem("db_prodts")) ?? [];
const setProdtsBD = () => localStorage.setItem("db_prodts", JSON.stringify(prodts));

loadProdts()