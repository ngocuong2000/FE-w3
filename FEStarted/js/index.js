/* eslint-disable no-undef */
// $(document).ready(function () {
//     const $body = $('body');
//     $.get('/components/header.html', data => {$body.append(data); $body.append(data)})
// });

$(document).ready(function() { 
    $("#user_outer_layer_id").mouseover(function() { $("#overlay_id").css('visibility', 'visible'); });


    $("#user_outer_layer_id").mouseout(function() { $("#overlay_id").css('visibility', 'hidden'); });

    $("#overlay_id").mouseover(function() { $("#overlay_id").css('visibility', 'visible'); });

    $("#overlay_id").mouseout(function() { $("#overlay_id").css('visibility', 'hidden'); });
});


//add cart
var allproduct = []
const btns = $('.btn-product')
const parent_btns = $('.main__list-outside')

var allcoast = 0
for (let i = 0; i < btns.length; i++) {
    $(btns[i]).click(() => {
        var add = true
        var quantity = 1
        var parent = $('.main__list-outside .product')[i]
        var name = parent.children[0].innerText
        var coast = parseInt(parent.children[1].children[0].children[1].innerText).toFixed(2)
        var total = (parseInt(quantity) * coast).toFixed(2)
        var infoProduct = new Array(name, coast, quantity, total)
        allcoast += parseInt(total)
        allcoast = parseInt(allcoast)

        for (let i = 0; i < allproduct.length; i++) {
            if (name === allproduct[i][0]) {
                add = false
                allproduct[i][2] += 1
                allproduct[i][3] = parseInt(allproduct[i][2] * allproduct[i][1]).toFixed(2)
                console.log(allproduct)
                break
            }
        }
        if (add) {
            allproduct.push(infoProduct)
        }

        sessionStorage.setItem("allproduct", JSON.stringify(allproduct))//đẩy dữ liệu lên kho lưu trữ tạm thời
       
        if(allproduct.length>0){
            cart()
            showProduct()
            totalproduct()
        }
        
        

    })
}



function totalproduct() {

    $('.coast-total span:nth(1)').text(allcoast)

}

// function showProduct() {
//     var allproduct = JSON.parse(sessionStorage.getItem("allproduct"))
//     if (allproduct) {
//         var show = document.querySelector('#showProduct')
//         var tr = ""

//         for (let i = 0; i < allproduct.length; i++) {
//             if (show) {
//                 tr += `
//                         <tr>
//                             <td><span class="name"> ${allproduct[i][0]} </span></td>
//                             <td><span class="quantity">${allproduct[i][2]} </span></td>
//                             <td><span class="coast">$ ${allproduct[i][1]}</span></td>
//                             <td><span class="total">$ ${allproduct[i][3]} </span></td>
//                             <td>
//                                 <span onclick="deleteProduct(this)" class="delete">xóa</span>
//                             </td>
//                         <tr>
//                         `
//             }

//         }
//         show.innerHTML = tr
//     }
// }

function deleteProduct(e) {

    for (let i = 0; i < allproduct.length; ++i) {
        if (e.parentElement.parentElement.children[0].children[0].innerText == allproduct[i][0]) {
            console.log(allproduct[i][0])
            console.log(e.parentElement.parentElement.children[0].children[0].innerText)
            allcoast -= allproduct[i][1]
            allproduct.splice(i, 1)
            sessionStorage.setItem("allproduct", JSON.stringify(allproduct))
            totalproduct()
            showProduct()
        }
    }
}

// document.querySelector('.deleteAll').onclick=()=>{
// allproduct = []
// sessionStorage.setItem("allproduct", JSON.stringify(allproduct))
// allcoast = 0
// showProduct()
// totalproduct()
// }

function deleteAll(){
    allproduct = []
    sessionStorage.setItem("allproduct", JSON.stringify(allproduct))
    allcoast = 0
    showProduct()
    totalproduct()
}
 
function showProduct() {
    var allproduct = JSON.parse(sessionStorage.getItem("allproduct"))
    if (allproduct) {
        var show = document.querySelector('#showProduct')
        var tr = ""

        for (let i = 0; i < allproduct.length; i++) {
            if (show) {
                tr += `
                        <tr>
                            <td><span class="name"> ${allproduct[i][0]} </span></td>
                            <td>
                            <input type="text" class="quantity" value="${allproduct[i][2]}"/>
                            </td>
                            <td><span class="coast">$ ${allproduct[i][1]}</span></td>
                            <td><span class="total">$ ${allproduct[i][3]} </span></td>
                            <td>
                                <span onclick="deleteProduct(this)" class="delete">xóa</span>
                            </td>
                        <tr>
                        `
            }

        }
        
        show.innerHTML = tr
    }
}


document.querySelector('.cart-picture').onclick=()=>{
document.querySelector('.show-cart-111').classList.toggle('hien')
}
document.querySelector('#x-button').onclick=()=>{
    document.querySelector('.show-cart-111').classList.remove('hien')
}



function cart(){
    var tables = ""
    tables= `
                                        <table>
                                            <tr>
                                                <th> <span>tên sản phẩm</span></th>
                                                <th> <span>số lượng</span></th>
                                                <th> <span>đơn giá</span></th>
                                                <th> <span>thành tiền</span></th>
                                            </tr>
                                            <tbody id="showProduct"></tbody>
                                            <tr class="trlast">
                                                <th><span>Sub Total</span></th>
                                                <th>
                                                    <p class="coast-total"><span>$</span><span>0</span><span>.00</span></p>
                                                </th>
                                                <th><span class="deleteAll" onclick="deleteAll()" >Delete All</span></th>
                                            </tr>
                                        </table> `  
    document.querySelector('.list-product').innerHTML=tables
}
