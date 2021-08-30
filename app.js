let btnGrp = document.getElementById("btnGrp");
let product = document.getElementById("product");
let cardbox=document.querySelector('.row');
let btnSpinner=document.querySelector("#btn-spinner");
let productSpinner=document.querySelector("#product-spinner");
async function makeup() {
    let fetching = await fetch('http://makeup-api.herokuapp.com/api/v1/products.json');
    let res = fetching.json();
    let data = await res;
    let typeArr = [];
    btnSpinner.style.display='none';
    data.forEach(element => {
        let type = element.product_type;
        collectTypes(typeArr, type);
    });
    showBtn(typeArr, data);
    console.log(typeArr);
    console.log(typeArr.length);

}
makeup();
function collectTypes(typeArr, type) {
    if (typeArr.indexOf(type) === -1) {
        typeArr.push(type);
    }
}
function showBtn(btnArr) {
    btnGrp.innerHTML='';
    btnArr.forEach(btnText => {
        let btn = `<button type="button" class="btn btn-outline-secondary m-1" onclick="findThis(this.innerText)">${btnText}</button>`;
        btnGrp.innerHTML += btn;
    });
}
function findThis(btnText) {
    productSpinner.style.display='inline-block';
    cardbox.innerHTML=''
    fetch('http://makeup-api.herokuapp.com/api/v1/products.json')
        .then(res => res.json())
        .then(data => {
           productSpinner.style.display='none';
            data.forEach(ele => {
                if (ele.product_type === btnText) {
                    let product=`
                    <div class="col">
                <div class="d-flex justify-content-center container mt-5">
                    <div class="card p-3 bg-white"><i class="fa fa-apple"></i>
                        <div class="about-product text-center mt-2"><img src="${ele.image_link}" class="img-fluid" style="min-width:300px;">
                            <div class="mt-3">
                                <h4 class="d-block text-start">${ele.name}</h4>
                                <h6 class="d-block text-start mt-0 text-black-50">brand : ${ele.brand}</h6>
                            </div>
                        </div>
                        <div class="stats mt-2">
                            <div class="d-flex justify-content-between p-price"><span>price</span><span>${ele.price_sign}${ele.price}</span></div>
                        </div>
                        <a href="${ele.product_link}" target="_blink" class="btn btn-secondary rouned-1 mt-3">Details</a>
                    </div>
                </div>
            </div>
                    `;
                    cardbox.innerHTML +=product;
                }
            })
        })
        .catch(err=>console.log(err))
}
