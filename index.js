var users, items
let itemsData = [] 
function getData() {
    fetch('api.json')
    .then(response => response.json())
    .then(data => {
        console.log("data",data)
        itemsData = data.items;
        items = data.items.length;
        users = data.users.length;
        displayProducts(data.products);
        displayBrands(data.brands);
        displayItems(data.items);
    }).catch(error=>{console.log(error)});
}

document.addEventListener("DOMContentLoaded",getData() );

function displayProducts(data){
    const prodCards = document.getElementById("products-cards");

    prodCards.innerHTML = ''

    data.forEach(prod => {
        const Ptemplate = `
            <div class=" m-2">    
                <img src=${prod.image} alt=${prod.category} style="height:130px; width: 8.5rem; border-radius:50%">
                <h5 class="mx-5 mt-2">${prod.category}</h5>
            </div>
        `;
        prodCards.insertAdjacentHTML('beforeend', Ptemplate);
    });
}
function displayBrands(data){
    const brandCards = document.getElementById("brands-cards");

    brandCards.innerHTML = ''

    data.forEach(brand => {
        const Btemplate = `
            <div class= "mx-2 mt-2" style="border-radius: 50%; ">    
            <img src=${brand.logo} alt=${brand.name} style="height:130px; width: 8rem; border-radius: 50%">
            <h6 class="mx-3 mt-2">${brand.name}</h6>
            <p class="small muted mx-5">${brand.timing}</p>
            </div>
        `;
        brandCards.insertAdjacentHTML('beforeend', Btemplate);
    });
}
function displayItems(data){
    const itemsCards = document.getElementById("items-cards");

    itemsCards.innerHTML = '';

    data.forEach((item, index) => {
        console.log('card iNDEX',index);
        const Itemplate = `
        <div class="card" style="width: 20rem; margin:10px">
            <img class="card-img-top" src = ${item.image}  alt="Movie" style="height: 15rem; width: max-width; ">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                    <h5 class= "card-title"> ${item.name}</h5>
                    <span class = "btn btn-success rounded p-1">${item.rating}<span style = "font-size: x-large">&Star;</span></span>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                    <p class="card-text">${item.details}</p>
                    <p><span style = "color : #787A91 ">&#8377;${item.cost}</span> <br/> <b>${item.timing}&nbsp;min</b></p>
                </div>
            </div>
            <div class="d-flex justify-content-around align-items-center mb-2">
            <button class="btn btn-danger delbtn" data-toggle="modal" data-target="#DelModal" onclick="deleteItem(${index})" >
                Delete
            </button>
        </div>       
        <div class="modal fade" id="DelModal" tabindex="-1" role="dialog" aria-labelledby="DeleteModal" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <p class="modal-body">Are you sure you want to delete <span id="delItem"></span>?</p>
                        <div class="modal-footer">
                            <button class="btn p-2 px-4 m-4" type="button" style="background-color: #FF7E8B; color: white;" id="yesDel">Yes</button>
                            <button class="btn p-2 px-4 m-4" type="button" style="background-color: #787A91; color: white;" id="noDel">No</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        itemsCards.insertAdjacentHTML('beforeend', Itemplate);
        // <button type="button" class="btn btn-success col-auto addToCart" data-index="${index}" onclick="addToCart(${index})"><i><img src="assets/images/addToCart.png" width="25px" height="25px"></i> Add To Cart</button>
    });
}

document.getElementById('login').addEventListener('click',() => {
    $('#LogInModal').modal('show');
});

document.getElementById('signup').addEventListener('click',() => {
    $('#SignUpModal').modal('show');
});

document.getElementById('filter').addEventListener('click',() => {
    $('#filterModal').modal('show');
});

document.getElementById('add').addEventListener('click', () => {
    $('#addModal').modal('show');
})



// $('#noDel').click(function () {
//     $('#DelModal').modal('hide');
// })

$("#closeBtn").click(function () {
    $("#filterModal").modal("hide");
});

document.getElementById('clearAll').addEventListener('click',() => {
    var ele = document.querySelectorAll("input[type=radio]");
   for(var i=0;i<ele.length;i++){
      ele[i].checked = false;
   }
})
 
const otp = document.getElementById('otp');
const passIp= document.getElementById('passIp');
const loginBtn = document.getElementById('loginBtn');
const welcomeDiv = document.getElementById('welcomeDiv');
const userName = document.getElementById('userName');

document.querySelector("#createAcc").addEventListener('click', () => addUsers());

function addUsers() {
    const fname = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phno = document.getElementById('phno').value;
    const pwd = document.getElementById('pwd').value;
    console.log(fname, email, phno, pwd);
    if(!fname || !email || !phno || !pwd){
        alert('All fields are mandatory!!')
        return;
    }
    
    fetch('http://localhost:3000/users',{
        method: 'POST',
        headers:  {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id : `u${users+1}`,
        name : fname,
        phoneNo : phno,
        emailId : email,
        password : pwd
        }),
    }).then(resp => {
        console.log("RESponse",resp);
    }).catch(error => {
        console.log(error);
    });
   
}

otp.addEventListener('click', () => {
    const phnoIp = document.querySelector('#phnoIp').value;
    console.log("input",phnoIp)
  fetch('http://localhost:3000/users')
    .then(resp => resp.json())
    .then(userData => {
        console.log('login',userData)
        var phFound = userData.find(user => user.phoneNo === phnoIp);
        var loggedIn = false
        console.log("phone number:", phFound);

        if (phFound) {
            passIp.style.display = 'block';
            const passw = phFound.password;
            console.log("passw", passw);
            
            loginBtn.addEventListener('click', () =>{
                
                const pwd = document.querySelector('#passIp input').value;
                if(pwd === passw){
                    document.getElementById('login').style.display = 'none';
                    document.getElementById('signup').style.display = 'none';
                    welcomeDiv.style.display = 'flex';
                    welcomeDiv.style.alignItems = 'center';
                    welcomeDiv.style.justifyContent = 'space-evenly';
                    userName.textContent = phFound.name;
                }
                else{
                    console.log('naah')
                }
                $('#LogInModal').modal('hide');
            });
        }     
    })
    .catch(error => console.log(error));
});

document.getElementById('logoutBtn').addEventListener('click', () => {
    console.log('logged out!')
    welcomeDiv.style.display = 'none';
    document.getElementById('login').style.display = 'block';
    document.getElementById('signup').style.display = 'block';
});

document.getElementById('applyFilter').addEventListener('click', () => {
        const filterSelect = document.querySelector('input[type="radio"][name="filter"]:checked').value;
        fetchFilteredItems(filterSelect);
        $('#filterModal').modal('hide');
});

function fetchFilteredItems(filter){
    console.log(filter);
    var apiUrl = ''
    document.getElementById('filterVal').textContent = 'Filtered by '+filter;
    switch(filter){
        case 'timing' :
            apiUrl = 'http://localhost:3000/items?_sort=timing&_order=desc'
            break;
        case 'rating' : 
            apiUrl = 'http://localhost:3000/items?_sort=rating&_order=desc'
            break;
        case 'costHigh' : 
            apiUrl = 'http://localhost:3000/items?_sort=cost&_order=desc'
            break;
        case 'costLow' : 
            apiUrl = 'http://localhost:3000/items?_sort=cost&_order=asc'
    }
    fetch(apiUrl)
    .then(response => response.json())
    .then(data =>{
        displayItems(data);
    })
    .catch(error => {
        console.error(error);
    });
    
}

document.getElementById('addItem').addEventListener('click', () => addItems());

function addItems() {
    const Iname = document.getElementById('itemName').value; 
    const Icat = document.getElementById('itemCat').value;
    const Irate = document.getElementById('itemRating').value;
    const Itime = document.getElementById('itemTime').value;
    const Icost = document.getElementById('itemCost').value;
    const Iimg = document.getElementById('itemImg').value;
    console.log("Item added: ", Iname, Icat, Irate, Itime, Icost, Iimg);
    //C:\fakepath\pesto.jpg
    var src = Iimg.slice(12);
    console.log("img src",src);
    fetch('http://localhost:3000/items',{
        method: 'POST',
        headers:  {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name : Iname,
            image : `assets/images/${src}`,
            details: "Neque porro quisquam est qui dolorem ipsum...",
            rating : Irate, 
            timing : Itime,
            cost: Icost
        }),
    }).then(resp => {
        console.log("RESponse",resp);
    }).catch(error => {
        console.log(error);
    });

}


function openDelModal(){
    return new Promise((resolve) => {
        $('#DelModal').modal('show');
        document.getElementById('yesDel').addEventListener('click', () => {
            $('#DelModal').modal('hide'); 
            resolve('yes');
        });
        document.getElementById('noDel').addEventListener('click', () => {
            $('#DelModal').modal('hide'); 
            resolve('no');
        });
    });
}


async function deleteItem(id){
    console.log('delete called', id)
    console.log(`http://localhost:3000/items/${id}`);
    const resultDel = await openDelModal();
    if(resultDel === 'yes'){
        console.log('deleted');
        fetch(`http://localhost:3000/items/${id}`,{
            method: "DELETE"
        })
        console.log('total items', items)
        console.log('current id', id)
        for(let i = 0 ; i < items-id; i++){
            console.log('follow up index ',i+id)
            let updatedId = i+id;
            console.log(updatedId);
            let callId = updatedId+1;
            console.log(callId);
            fetch(`http://localhost:3000/items/${callId}`,{
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: updatedId
                })
            })
        }
       
    } else if(resultDel === 'no') {
        console.log('not deleted')
    }
}


function fetchItems(id){
    try{
        fetch(`http://localhost:3000/items/${id}`)
        .then(resp => resp.json())
        .then(data => {return data})
    } catch (error) {
        console.error(error);
        return [];
    }
}
 
function fetchCartItems(){
    try {
        fetch('http://localhost:3000/addToCart')
        .then(resp => resp.json())
        .then(data => {return data});
    } catch (error) {
        console.error(error);
        return [];
    }
}



// ------------------------------------------------------------
const container = document.getElementById('items-cards');
container.addEventListener('click', async (event) => {
    event.preventDefault();
    if(event.target.classList.contains('addToCart')){

        const itemToAdd = event.target.getAttribute('data-index');
        const updatedItemId = parseInt(itemToAdd, 10) + 1;
        console.log('add to cart',updatedItemId);
        try {
            const result = fetchItems(updatedItemId);
            const cart =  fetchCartItems();
            console.log("items", result);
            const postCartITem = await fetch('http://localhost:3000/addToCart',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(result),
            })
            // .then(() => {
            //     if(cart.find(item => item.id === result.id )){
            //         alert('Item already exists in cart');
            //     } else {
            //         openNav();
            //     }
                
            // }).catch(error => {
            //     console.log(error);
            // });
            console.log(postCartITem);
        } catch (error) {
            console.error(error);
        }
    }
    

});

async function openNav(){
    document.getElementById('atcDiv').style.width = "350px";
    document.getElementById('mainComp').style.marginRight = "350px";
   
    const content = document.getElementById('CartContent');

    content.innerHTML = '';

    cartResults = await fetchCartItems();
    cartResults.forEach(item => {
        const cartTemplate = `
            <div class="card m-2">
            
                <div class="card-body d-flex justify-content-start align-items-start p-1" >
                    <span class="img-wrapper" style = " width: 100px; height: 100px "><img src=${item.image} width='100px' height='100px' /> &nbsp;&nbsp;</span>
                    <span class="d-flex justify-content-around align-items-center">
                        <h5 style="color : #111;">${item.name}</h5> 
                        <button class="btn removeItem" ><i><img src="assets/images/remove.png" width="20px" height="20px"/></i></button>
                    <span/> 
                </div>
                <div class="card-footer d-flex justify-content-between align-items-center">
                    <p style="color : #111;">Quantity: 
                        <select class="qty" data-item-cost="${item.cost}">
                            <option value="1" selected>1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </p>
                    <p style="color : #111;">&#8377;<span class="totalCost">${item.cost}</span></p>
                </div>
            </div>
        `;
        content.insertAdjacentHTML('beforeend', cartTemplate);
    });
    const tq = content.querySelector('.qty');
    const tc = content.querySelector('.totalCost');

    tq.addEventListener('change', () => {
        updateCart(tq, tc)
    });


}

function updateCart(tq, tc){
    const selectedQty = parseInt(tq.value);
    const itemCost = parseInt(tq.getAttribute('data-item-cost'));
    const tcost = selectedQty * itemCost;
    console.log("tcost",tcost)
    tc.textContent = tcost;
}

var CardCont = document.getElementById('CartContent');
CardCont.addEventListener('click', (event) => {
    if(event.target.classList.contains('removeItem')){
        var buttonClicked = event.target
        buttonClicked.parentElement.parentElement.parentElement.remove();
    };
})
 
document.getElementById('closeNavBtn').addEventListener('click', () => {
    document.getElementById('atcDiv').style.width = "0";
    document.getElementById('mainComp').style.marginRight = "0";
})
